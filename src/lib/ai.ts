import { google } from "@ai-sdk/google";

// Override with GEMINI_MODEL in .env if you want to switch models.
export const model = google(process.env.GEMINI_MODEL ?? "gemini-3.5-flash");
