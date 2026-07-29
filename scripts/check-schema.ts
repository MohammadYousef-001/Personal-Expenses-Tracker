import {
  addExpenseInputSchema,
  getSpendingSummaryInputSchema,
  listExpensesInputSchema,
} from "../src/schemas/index.ts";

addExpenseInputSchema.parse({
  amount: 25.5,
  category: "Food",
  date: "2026-07-28",
  description: "Lunch",
});

listExpensesInputSchema.parse({ month: "2026-07" });
getSpendingSummaryInputSchema.parse({ month: "2026-07" });

console.log("All expense schemas are valid.");
