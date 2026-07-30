import { z } from "zod/v4";
// Tool: list_notes
export const listNotesInputSchema = z.object({
  folder: z
    .string()
    .min(1)
    .max(200)
    .optional()
    .describe("Relative folder to list (default: notes)"),
});
