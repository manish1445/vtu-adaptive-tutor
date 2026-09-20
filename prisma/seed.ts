import { prisma } from '../src/lib/prisma';



// Only ADDS topics that don't already exist under their module.
// Safe to run multiple times — skips topics that already exist by name.
const additions = [
  {
    moduleNumber: 1,
    topics: [
      'Tautology, Contradiction, Contingency',
      'Direct and Indirect Proofs',
    ],
  },
  {
    moduleNumber: 3,
    topics: [
      'Cartesian Product of Sets',
    ],
  },
  {
    moduleNumber: 4,
    topics: [
      'Derangements',
      'Rook Polynomials',
      'Arrangements with Forbidden Positions',
    ],
  },
];

async function main() {
  for (const group of additions) {
    const module = await prisma.module.findFirst({
      where: { number: group.moduleNumber },
    });

    if (!module) {
      console.warn(`No module found with number ${group.moduleNumber}, skipping`);
      continue;
    }

    for (const topicName of group.topics) {
      const existing = await prisma.topic.findFirst({
        where: { moduleId: module.id, name: topicName },
      });

      if (existing) {
        console.log(`Skip (exists): ${module.name} > ${topicName}`);
        continue;
      }

      await prisma.topic.create({
        data: { moduleId: module.id, name: topicName },
      });
      console.log(`Added: ${module.name} > ${topicName}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });