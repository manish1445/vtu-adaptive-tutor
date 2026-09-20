import { prisma } from "@/lib/prisma";

export const SUBJECT = "Discrete Mathematical Structures";

// PLACEHOLDER catalog: edit module/topic names to match the official VTU syllabus.
export const CATALOG: { module: number; moduleName: string; topics: string[] }[] = [
  {
    module: 1,
    moduleName: "Module 1: Fundamentals of Logic",
    topics: [
      "Propositions and Logical Connectives",
      "Logical Equivalence and Laws of Logic",
      "Rules of Inference",
      "Quantifiers and Predicates",
    ],
  },
  {
    module: 2,
    moduleName: "Module 2: Integers and Counting",
    topics: [
      "Mathematical Induction",
      "Recursive Definitions",
      "Permutations and Combinations",
      "Binomial Theorem",
    ],
  },
  {
    module: 3,
    moduleName: "Module 3: Relations and Functions",
    topics: [
      "Relations and Their Properties",
      "Equivalence Relations and Partial Orders",
      "Hasse Diagrams and Lattices",
      "Functions and the Pigeonhole Principle",
    ],
  },
  {
    module: 4,
    moduleName: "Module 4: Recurrence Relations and Generating Functions",
    topics: [
      "Inclusion-Exclusion Principle",
      "Generating Functions",
      "First-Order Recurrence Relations",
      "Second-Order Linear Recurrence Relations",
    ],
  },
  {
    module: 5,
    moduleName: "Module 5: Groups and Algebraic Structures",
    topics: [
      "Groups and Subgroups",
      "Cosets and Lagrange's Theorem",
      "Homomorphisms and Isomorphisms",
      "Rings and Fields",
    ],
  },
];

let ensured = false;

// Creates any missing modules/topics so there is a catalog to choose from.
export async function ensureCatalog() {
  if (ensured) return;
  for (const m of CATALOG) {
    const mod =
      (await prisma.module.findFirst({ where: { name: m.moduleName } })) ??
      (await prisma.module.create({
        data: { number: m.module, name: m.moduleName },
      }));
    for (const name of m.topics) {
      const exists = await prisma.topic.findFirst({
        where: { name, moduleId: mod.id },
      });
      if (!exists) {
        await prisma.topic.create({ data: { name, moduleId: mod.id } });
      }
    }
  }
  ensured = true;
}