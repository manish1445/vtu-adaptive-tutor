import { prisma } from "@/lib/prisma";
import { CATALOG } from "@/lib/catalog";

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

export type NextTopic = {
  topic: { id: string; name: string };
  reason: "weak" | "new" | "review";
  masteryPercent: number | null;
  attempts: number;
};

type Counts = { correct: number; attempts: number };

// Smoothed accuracy so 1 out of 1 does not look like mastery.
const score = (p: Counts) => (p.correct + 1) / (p.attempts + 2);

// Chooses the next topic for a student:
// 1) a clearly weak topic (2+ attempts, under 50% correct),
// 2) otherwise a topic they have never tried,
// 3) otherwise the lowest-scoring topic for review.
export async function pickNextTopic(userId: string): Promise<NextTopic | null> {
  const names = CATALOG.flatMap((m) => m.topics);
  const topics = await prisma.topic.findMany({ where: { name: { in: names } } });
  if (topics.length === 0) return null;

  const progress = await prisma.topicProgress.findMany({
    where: { userId, topicId: { in: topics.map((t) => t.id) } },
  });
  const progressByTopic = new Map(progress.map((p) => [p.topicId, p]));
  const topicById = new Map(topics.map((t) => [t.id, t]));

  const build = (
    topicId: string,
    reason: NextTopic["reason"]
  ): NextTopic => {
    const t = topicById.get(topicId)!;
    const p = progressByTopic.get(topicId);
    const attempts = p?.attempts ?? 0;
    return {
      topic: { id: t.id, name: t.name },
      reason,
      masteryPercent:
        p && attempts > 0 ? Math.round((p.correct / attempts) * 100) : null,
      attempts,
    };
  };

  const tried = progress.filter((p) => p.attempts > 0);

  const weak = tried
    .filter((p) => p.attempts >= 2 && p.correct / p.attempts < 0.5)
    .sort((a, b) => score(a) - score(b));
  if (weak.length > 0) return build(weak[0].topicId, "weak");

  const untried = topics.filter((t) => (progressByTopic.get(t.id)?.attempts ?? 0) === 0);
  if (untried.length > 0) {
    const pick = untried[Math.floor(Math.random() * untried.length)];
    return build(pick.id, "new");
  }

  const lowest = [...tried].sort((a, b) => score(a) - score(b))[0];
  return build(lowest.topicId, "review");
}