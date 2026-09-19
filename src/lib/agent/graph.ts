import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import type { BaseMessage } from "@langchain/core/messages";
import { generateText, Output } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai";

export const TutorState = Annotation.Root({
  userId: Annotation<string>(),
  appContext: Annotation<string>(),
  topicId: Annotation<string>(),
  questionText: Annotation<string>(),
  studentAnswer: Annotation<string>(),
  correctAnswer: Annotation<string>(),
  explanation: Annotation<string>(),
  masteryScore: Annotation<number>(),
  misconceptionFlag: Annotation<string | null>(),
  feedback: Annotation<string>(),
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});

type State = typeof TutorState.State;

// Node 1: work out WHAT the student misunderstood.
// Nodes return only the fields they change (not the whole state).
async function diagnosticGrader(state: State) {
  try {
    const { output } = await generateText({
      model,
      output: Output.object({
        schema: z.object({
          misconception: z
            .string()
            .describe("One short sentence naming the likely misconception"),
        }),
      }),
      prompt: `You are a VTU engineering tutor diagnosing a student's mistake.
Question: ${state.questionText}
Student chose: ${state.studentAnswer}
Correct answer: ${state.correctAnswer}
Reference explanation: ${state.explanation}

In one short sentence, name the misconception that most likely led to the wrong choice.`,
    });
    return { misconceptionFlag: output.misconception };
  } catch (error) {
    console.error("diagnosticGrader failed:", error);
    // Still route to the tutor so the student gets a hint.
    return { misconceptionFlag: "Review the core definition for this concept." };
  }
}

// Node 2: turn the diagnosis into a Socratic hint (does NOT reveal the answer).
async function socraticTutor(state: State) {
  try {
    const { output } = await generateText({
      model,
      output: Output.object({
        schema: z.object({
          hint: z.string().describe("A short Socratic hint, max 2 sentences"),
        }),
      }),
      prompt: `You are a Socratic engineering tutor.
Question: ${state.questionText}
Student chose: ${state.studentAnswer}
Diagnosed misconception: ${state.misconceptionFlag}

Write a short guiding hint (max 2 sentences) that helps the student rethink the problem.
Do NOT state the correct answer.`,
    });
    return { feedback: output.hint };
  } catch (error) {
    console.error("socraticTutor failed:", error);
    return {
      feedback: `Let's rethink this: ${state.misconceptionFlag ?? "check the definitions again."}`,
    };
  }
}

// Node 3: used when no misconception was found.
async function orchestrator() {
  return { feedback: "Nice work! Moving on to the next concept." };
}

const workflow = new StateGraph(TutorState)
  .addNode("grader", diagnosticGrader)
  .addNode("tutor", socraticTutor)
  .addNode("orchestrator", orchestrator)
  .addEdge(START, "grader")
  .addConditionalEdges("grader", (state) =>
    state.misconceptionFlag ? "tutor" : "orchestrator"
  )
  .addEdge("tutor", END)
  .addEdge("orchestrator", END);

export const appGraph = workflow.compile();
