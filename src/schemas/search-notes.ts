import { z } from "zod/v4";
// Tool: search_notes
export const searchNotesInputSchema = z.object({
  query: z
    .string()
    .min(1)
    .max(200)
    .describe("Keyword or phrase to search for inside notes and FAQ files"),

  limit: z
    .number()
    .int()
    .positive()
    .max(20)
    .optional()
    .describe("Maximum number of matching snippets to return, defaults to 5"),
});