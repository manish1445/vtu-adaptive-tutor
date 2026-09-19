import { prisma } from "@/lib/prisma";

export type TopicMastery = {
  topicId: string;
  topicName: string;
  attempts: number;
  correct: number;
  mistakes: number;
  masteryPercent: number;
  status: "weak" | "developing" | "strong";
};

export async function calculateStudentMastery(userId: string) {
  const rows = await prisma.topicProgress.findMany({
    where: { userId },
    include: { topic: true },
  });

  const topics: TopicMastery[] = rows
    .map((r) => {
      const masteryPercent =
        r.attempts === 0 ? 0 : Math.round((r.correct / r.attempts) * 100);
      const status: TopicMastery["status"] =
        masteryPercent < 50 ? "weak" : masteryPercent < 80 ? "developing" : "strong";
      return {
        topicId: r.topicId,
        topicName: r.topic.name,
        attempts: r.attempts,
        correct: r.correct,
        mistakes: r.mistakes,
        masteryPercent,
        status,
      };
    })
    .sort((a, b) => a.masteryPercent - b.masteryPercent); // weakest first

  return { userId, topics };
}
