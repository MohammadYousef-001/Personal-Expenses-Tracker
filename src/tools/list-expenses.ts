import type { McpServer } from "@modelcontextprotocol/server";
import { readExpenses } from "../lib/expenses-file.js";
import { filterExpenses } from "../lib/list-expenses-data.js";
import { listExpensesInputSchema } from "../schemas/index.js";

const MAX_RESULTS = 10;

export function registerListExpensesTool(server: McpServer): void {
  server.registerTool(
    "list_expenses",
    {
      description: "list expenses with optional filters",
      inputSchema: listExpensesInputSchema,
    },
    async ({ month, category }) => {
      try {
        const expenses = await readExpenses();
        const filteredExpenses = filterExpenses(expenses, month, category);

        const result = {
          expenses: filteredExpenses.slice(0, MAX_RESULTS),
          count: Math.min(filteredExpenses.length, MAX_RESULTS),
          totalMatches: filteredExpenses.length,
          truncated: filteredExpenses.length > MAX_RESULTS,
          message:
            filteredExpenses.length === 0
              ? "no matching expenses found"
              : "matching expenses found",
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const reason = error instanceof Error ? error.message : "unknown error";
        console.error(`list_expenses failed: ${reason}`);
        return {
          content: [
            {
              type: "text",
              text: "could not list expenses",
            },
          ],
          isError: true,
        };
      }
    },
  );
}