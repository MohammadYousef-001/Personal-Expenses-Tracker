import type { McpServer } from "@modelcontextprotocol/server";

import { createExpense } from "../lib/add-expense-data.js";
import {
  readExpenses,
  writeExpenses,
} from "../lib/expenses-file.js";
import { addExpenseInputSchema } from "../schemas/index.js";

export function registerAddExpenseTool(server: McpServer): void {
  server.registerTool(
    "add_expense",
    {
      description: "add a new expense",
      inputSchema: addExpenseInputSchema,
    },
    async ({ amount, category, date, description }) => {
      try {
        const expenses = await readExpenses();

        const newExpense = createExpense(
          expenses,
          amount,
          category,
          date,
          description,
        );

        expenses.push(newExpense);

        await writeExpenses(expenses);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  expense: newExpense,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        const reason =
          error instanceof Error
            ? error.message
            : "unknown error";

        console.error(`add_expense failed: ${reason}`);

        return {
          content: [
            {
              type: "text",
              text: "could not add expense",
            },
          ],
          isError: true,
        };
      }
    },
  );
}