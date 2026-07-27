import type { McpServer } from "@modelcontextprotocol/server";

import { listExpensesInputSchema } from "../schemas/index.js";

export function registerListExpensesTool(server: McpServer): void {
  server.registerTool(
    "list_expenses",
    {
      description: "list expenses with optional filters",
      inputSchema: listExpensesInputSchema,
    },
    async ({ month, category }) => {
      return {
        content: [
          {
            type: "text",
            text: `expenses listed month ${month} category ${category}`,
          },
        ],
      };
    },
  );
}