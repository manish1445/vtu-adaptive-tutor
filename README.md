# VTU Adaptive Tutor

## Setup
1. `cp .env.example .env` and fill in `DATABASE_URL` and `GOOGLE_GENERATIVE_AI_API_KEY`
2. `npm install` (also runs `prisma generate` automatically)
3. `npx prisma db push`   # creates the tables (schema changed, so this is required)
4. `npm run dev`

## What changed vs the original
- Removed duplicate `.js` files (page, layout, prisma); everything is TypeScript now
- Schema: fixed generator, added Question options/answer, `Attempt` table, fixed `TopicProgress`
- Answers are checked on the server; the correct answer is no longer sent to the browser
- `graph.ts` now uses the AI model to diagnose the mistake and write a hint
- Added `prisma.config.ts`, `tsconfig.json`, `lib/engine.ts`, `.env.example`, `.gitignore`
- `/api/triage` returns per-topic mastery (weakest first)
