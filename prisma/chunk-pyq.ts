import { randomUUID } from "node:crypto";
import { embed } from "ai";
import { prisma } from "../src/lib/prisma";
import { embeddingModel } from "../src/lib/ai";
import { pyqData } from "./pyq-data";

// Small delay between calls to stay polite with rate limits.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  let inserted = 0;
  let skipped = 0;
  let failed = 0;

  for (const entry of pyqData) {
    const module = await prisma.module.findFirst({
      where: { number: entry.moduleNumber },
    });

    if (!module) {
      console.warn(`No module found for number ${entry.moduleNumber}, skipping: "${entry.content.slice(0, 50)}..."`);
      failed++;
      continue;
    }

    const topic = await prisma.topic.findFirst({
      where: { moduleId: module.id, name: entry.topicName },
    });

    if (!topic) {
      console.warn(`No topic "${entry.topicName}" in module ${entry.moduleNumber}, skipping: "${entry.content.slice(0, 50)}..."`);
      failed++;
      continue;
    }

    // Idempotency check: skip if this exact content is already chunked for this topic.
    const existing = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM "SourceChunk"
      WHERE "topicId" = ${topic.id} AND content = ${entry.content}
      LIMIT 1
    `;

    if (existing.length > 0) {
      console.log(`Skip (exists): ${entry.topicName} > "${entry.content.slice(0, 40)}..."`);
      skipped++;
      continue;
    }

    try {
      const { embedding } = await embed({
        model: embeddingModel,
        value: entry.content,
      });

      const id = randomUUID();
      const vectorLiteral = `[${embedding.join(",")}]`;

      await prisma.$executeRaw`
        INSERT INTO "SourceChunk" (id, "moduleId", "topicId", "sourceType", content, embedding, "createdAt")
        VALUES (${id}, ${module.id}, ${topic.id}, 'pyq', ${entry.content}, ${vectorLiteral}::vector, NOW())
      `;

      console.log(`Added: ${entry.topicName} > "${entry.content.slice(0, 40)}..."`);
      inserted++;
    } catch (err) {
      console.error(`Failed on "${entry.content.slice(0, 40)}...":`, err instanceof Error ? err.message : err);
      failed++;
    }

    // Small pause to avoid hammering the embedding API.
    await sleep(300);
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}, Failed: ${failed}, Total: ${pyqData.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });