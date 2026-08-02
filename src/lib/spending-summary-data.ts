import type { ExpenseRow } from "../schemas/index.js";

export function calculateSpendingSummary(
  expenses: ExpenseRow[],
): {
  totalAmount: number;
  expenseCount: number;
  categoryTotals: Record<string, number>;
} {
  let totalAmount = 0;
  const categoryTotals: Record<string, number> = {};

  for (const expense of expenses) {
    totalAmount += expense.amount;

    categoryTotals[expense.category] =
      (categoryTotals[expense.category] ?? 0) +
      expense.amount;
  }

  return {
    totalAmount,
    expenseCount: expenses.length,
    categoryTotals,
  };
}
