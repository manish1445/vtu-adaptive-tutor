import { NextResponse } from "next/server";
import { appGraph } from "@/lib/agent/graph";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, questionId, selectedIndex, timeTakenMs } = await request.json();

    if (
      typeof userId !== "string" ||
      !userId ||
      typeof questionId !== "string" ||
      !Number.isInteger(selectedIndex)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (!/^[A-Za-z0-9_-]{8,64}$/.test(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid user id" },
        { status: 400 }
      );
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }
    if (selectedIndex < 0 || selectedIndex >= question.options.length) {
      return NextResponse.json(
        { success: false, error: "Invalid option" },
        { status: 400 }
      );
    }

    // Optional timing, clamped to 0 to 1 hour.
    const timeTaken = Number.isFinite(timeTakenMs)
      ? Math.min(Math.max(Math.round(timeTakenMs), 0), 3_600_000)
      : null;

    // The server decides correctness, never the client.
    const isCorrect = selectedIndex === question.correctOptionIndex;
    const studentAnswer = question.options[selectedIndex];
    const correctAnswer = question.options[question.correctOptionIndex];

    let aiFeedback = "Great job!";
    let misconception: string | null = null;

    if (!isCorrect) {
      const finalState = await appGraph.invoke({
        userId,
        appContext: "vtu_engineering",
        topicId: question.topicId,
        questionText: question.text,
        studentAnswer,
        correctAnswer,
        explanation: question.explanation,
        masteryScore: 50,
        misconceptionFlag: null,
        feedback: "",
        messages: [],
      });
      misconception = finalState.misconceptionFlag;
      aiFeedback = finalState.feedback;
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, name: "Student" },
    });

    await prisma.$transaction([
      prisma.attempt.create({
        data: {
          userId,
          questionId,
          selectedIndex,
          studentAnswer,
          isCorrect,
          misconception,
          timeTakenMs: timeTaken,
        },
      }),
      prisma.topicProgress.upsert({
        where: { userId_topicId: { userId, topicId: question.topicId } },
        create: {
          userId,
          topicId: question.topicId,
          attempts: 1,
          correct: isCorrect ? 1 : 0,
          mistakes: isCorrect ? 0 : 1,
        },
        update: {
          attempts: { increment: 1 },
          correct: { increment: isCorrect ? 1 : 0 },
          mistakes: { increment: isCorrect ? 0 : 1 },
          lastAttempted: new Date(),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      isCorrect,
      correctOptionIndex: question.correctOptionIndex,
      explanation: question.explanation,
      aiFeedback,
      misconception,
    });
  } catch (error) {
    console.error("Error processing answer:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}