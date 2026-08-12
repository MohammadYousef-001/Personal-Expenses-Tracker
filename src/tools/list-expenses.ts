import type { McpServer } from "@modelcontextprotocol/server";
import { readExpenses } from "../lib/expenses-file.js";
import { filterExpenses } from "../lib/list-expenses-data.js";
import { listExpensesInputSchema } from "../schemas/index.js";

const MAX_RESULTS = 10;
const DEFAULT_RESULTS = 4;
const MAX_RESPONSE_BYTES = 64 * 1024;

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

        const hasFilters = month !== undefined || category !== undefined;
        const limit = hasFilters ? MAX_RESULTS : DEFAULT_RESULTS;

        const result = {
          expenses: filteredExpenses.slice(0, limit),
          count: Math.min(filteredExpenses.length, limit),
          totalMatches: filteredExpenses.length,
          truncated: filteredExpenses.length > limit,
          message:
            filteredExpenses.length === 0
              ? "no matching expenses found"
              : "matching expenses found",
        };

        const body = JSON.stringify(result, null, 2);

        if (Buffer.byteLength(body, "utf8") > MAX_RESPONSE_BYTES) {
          console.error("list_expenses failed: response too large");
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

        return {
          content: [
            {
              type: "text",
              text: body,
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