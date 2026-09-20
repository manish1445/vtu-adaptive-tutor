import { google } from "@ai-sdk/google";

// Override with GEMINI_MODEL in .env if you want to switch models.
export const model = google(process.env.GEMINI_MODEL ?? "gemini-3.5-flash");

// Used for embedding SourceChunk rows for RAG retrieval.
// outputDimensionality truncates the native 3072-dim output to 768 (matches our schema).
export const embeddingModel = google.textEmbeddingModel("gemini-embedding-001");