import type { ExpenseRow } from "../schemas/index.js";

export function filterExpenses(
  expenses: ExpenseRow[],
  month?: string,
  category?: string,
): ExpenseRow[] {
  return expenses.filter((expense) => {
    const matchesMonth =
      month === undefined || expense.date.startsWith(month);

    const matchesCategory =
      category === undefined ||
      expense.category.toLowerCase() === category.toLowerCase();

    return matchesMonth && matchesCategory;
  });
}