import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

/**
* Calculates mastery per module and identifies the weakest topic.
* @param {string} userId
*/
export async function calculateStudentMastery(userId) {
// 1. Fetch all modules with topics and questions
const modules = await prisma.module.findMany({
include: {
topics: {
include: {
questions: {
include: {
mistakes: {
where: { userId: userId },
orderBy: { timestamp: 'desc' }
}
}
}
}
}
}
});

let weakestTopic = null;
let lowestTopicScore = 101;

const dashboard = modules.map((mod) => {
let moduleScoreSum = 0;
let totalTopics = mod.topics.length;

const topicBreakdown = mod.topics.map((topic) => {
let score = 50; // Neutral baseline

topic.questions.forEach((q) => {
const attempts = q.mistakes;
if (attempts.length === 0) return;

// The most recent attempt carries the most weight
const latest = attempts[0];
if (latest.isCorrect) {
// If they got it right after failing previously, smaller gain
score += attempts.length > 1 ? 5 : 15;
} else {
score -= 10;
}
});

// Clamp score between 0% and 100%
const finalTopicScore = Math.max(0, Math.min(100, score));

if (finalTopicScore < lowestTopicScore) {
lowestTopicScore = finalTopicScore;
weakestTopic = {
topicId: topic.id,
topicName: topic.name,
moduleNumber: mod.number,
score: finalTopicScore
};
}

return {
id: topic.id,
name: topic.name,
score: finalTopicScore
};
});

const moduleAverage = totalTopics > 0
? Math.round(topicBreakdown.reduce((acc, t) => acc + t.score, 0) / totalTopics)
: 0;

return {
moduleNumber: mod.number,
moduleName: mod.name,
mastery: moduleAverage,
topics: topicBreakdown
};
});

return {
dashboard,
triageTarget: weakestTopic
};
}