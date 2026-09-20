import { generateText, Output } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { model } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { SUBJECT, ensureCatalog } from "@/lib/catalog";
import { pickNextTopic } from "@/lib/engine";

const questionSchema = z.object({
  question: z.string().describe("The academic question based on the VTU topic"),
  options: z.array(z.string()).length(4).describe("4 multiple choice options"),
  correctOptionIndex: z
    .number()
    .int()
    .min(0)
    .max(3)
    .describe("The array index of the correct answer (0-3)"),
  explanation: z.string().describe("A brief explanation of why the answer is correct"),
});

const QUESTION_TYPES = ["definition", "conceptual", "calculation"] as const;
const DIFFICULTY_LABEL: Record<number, string> = { 1: "easy", 2: "medium", 3: "hard" };
const USER_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

function difficultyFor(masteryPercent: number | null): number {
  if (masteryPercent === null) return 2;
  if (masteryPercent < 40) return 1;
  if (masteryPercent < 75) return 2;
  return 3;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body?.userId;
    if (typeof userId !== "string" || !USER_ID_RE.test(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid user id" },
        { status: 400 }
      );
    }

    await ensureCatalog();

    const next = await pickNextTopic(userId);
    if (!next) {
      return NextResponse.json(
        { success: false, error: "No topics available" },
        { status: 500 }
      );
    }

    const difficulty = difficultyFor(next.masteryPercent);

    // If the student showed a misconception on this topic before, target it.
    const lastMiss = await prisma.attempt.findFirst({
      where: {
        userId,
        misconception: { not: null },
        question: { topicId: next.topic.id },
      },
      orderBy: { timestamp: "desc" },
      select: { misconception: true },
    });

    const questionType = lastMiss
      ? "conceptual"
      : QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)];

    const prompt = `You are a VTU engineering professor. Generate ONE multiple-choice question on the topic "${next.topic.name}" from the subject "${SUBJECT}" (VTU, 2nd-year engineering).
Difficulty: ${DIFFICULTY_LABEL[difficulty]}.
Question type: ${questionType} (definition = recall of a definition or statement; conceptual = tests understanding and common confusions; calculation = needs a short worked computation).
${
  lastMiss?.misconception
    ? `The student previously showed this misconception: "${lastMiss.misconception}". Write a question whose wrong options tempt exactly that kind of mistake, so we can check whether it persists.`
    : ""
}
Exactly one option must be correct.`;

    const { output } = await generateText({
      model,
      output: Output.object({ schema: questionSchema }),
      prompt,
    });

    const saved = await prisma.question.create({
      data: {
        topicId: next.topic.id,
        text: output.question,
        options: output.options,
        correctOptionIndex: output.correctOptionIndex,
        explanation: output.explanation,
        difficultyLevel: difficulty,
        questionType,
      },
    });

    // Send the question WITHOUT the answer or explanation.
    return NextResponse.json({
      success: true,
      question: { id: saved.id, text: saved.text, options: saved.options },
      meta: {
        topicName: next.topic.name,
        difficulty: DIFFICULTY_LABEL[difficulty],
        questionType,
        reason: next.reason,
      },
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    const text = String((error as { message?: string })?.message ?? "");
    const status = (error as { statusCode?: number })?.statusCode;
    if (status === 429 || text.toLowerCase().includes("quota")) {
      return NextResponse.json(
        {
          success: false,
          error: "AI quota reached. Try again later or switch the model in .env.",
        },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to generate question" },
      { status: 500 }
    );
  }
}