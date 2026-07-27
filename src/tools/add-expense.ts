import type { McpServer } from "@modelcontextprotocol/server";

import { addExpenseInputSchema } from "../schemas/index.js";

export function registerAddExpenseTool(server: McpServer): void {
  server.registerTool(
    "add_expense",
    {
      description: "add a new expense",
      inputSchema: addExpenseInputSchema,
    },
    async ({ amount, category, date, description }) => {
      return {
        content: [
          {
            type: "text",
            text: `expense added amount ${amount} category ${category} date ${date} description ${description}`,
          },
        ],
      };
    },
  );
}