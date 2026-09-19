import { generateText, Output } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { model } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topicName =
      typeof body?.topicName === "string" && body.topicName.trim()
        ? body.topicName.trim().slice(0, 100)
        : "Discrete Mathematical Structures";

    const { output } = await generateText({
      model,
      output: Output.object({ schema: questionSchema }),
      prompt: `You are a VTU engineering professor. Generate a challenging multiple-choice question for the topic: ${topicName}. Ensure it aligns with 2nd-year engineering difficulty.`,
    });

    // Find or create the module/topic this question belongs to.
    let topic = await prisma.topic.findFirst({ where: { name: topicName } });
    if (!topic) {
      const mod =
        (await prisma.module.findFirst({ where: { name: topicName } })) ??
        (await prisma.module.create({ data: { number: 1, name: topicName } }));
      topic = await prisma.topic.create({
        data: { name: topicName, moduleId: mod.id },
      });
    }

    // Save the question (with its answer) server-side.
    const saved = await prisma.question.create({
      data: {
        topicId: topic.id,
        text: output.question,
        options: output.options,
        correctOptionIndex: output.correctOptionIndex,
        explanation: output.explanation,
      },
    });

    // Send the question WITHOUT the answer or explanation.
    return NextResponse.json({
      success: true,
      question: { id: saved.id, text: saved.text, options: saved.options },
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate question" },
      { status: 500 }
    );
  }
}
