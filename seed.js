import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { calculateStudentMastery } from './engine.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });



async function main() {
console.log('Cleaning old data...');
await prisma.mistake.deleteMany();
await prisma.question.deleteMany();
await prisma.topic.deleteMany();
await prisma.module.deleteMany();
await prisma.user.deleteMany();

console.log('Creating test user...');
const user = await prisma.user.create({
data: { name: 'Manish' }
});

console.log('Seeding VTU Module 4 (Trees)...');
const module4 = await prisma.module.create({
data: {
number: 4,
name: 'Trees',
topics: {
create: [
{
name: 'AVL Tree Rotations',
questions: {
create: [
{ text: 'What is the balance factor of an AVL tree node?', difficultyLevel: 1 },
{ text: 'Perform a Left-Right rotation.', difficultyLevel: 2 }
]
}
},
{
name: 'Spanning Trees',
questions: {
create: [
{ text: 'Find the minimum spanning tree using Kruskal.', difficultyLevel: 3 }
]
}
}
]
}
},
include: { topics: { include: { questions: true } } }
});

console.log('Simulating a wrong answer on AVL Tree Rotations...');
const targetQuestion = module4.topics[0].questions[0];

await prisma.mistake.create({
data: {
userId: user.id,
questionId: targetQuestion.id,
isCorrect: false
}
});

console.log('\n--- RUNNING MASTERY ENGINE ---\n');
const result = await calculateStudentMastery(user.id);
console.dir(result, { depth: null });
}

main()
.then(async () => {
await prisma.$disconnect();
})
.catch(async (e) => {
console.error(e);
await prisma.$disconnect();
process.exit(1);
});