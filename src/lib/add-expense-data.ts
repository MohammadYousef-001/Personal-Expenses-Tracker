import type { ExpenseRow } from "../schemas/index.js";

export function createExpense(
  expenses: ExpenseRow[],
  amount: number,
  category: string,
  date: string,
  description?: string,
): ExpenseRow {
  const nextNumber = expenses.length + 1;

  return {
    id: `expense-${String(nextNumber).padStart(3, "0")}`,
    amount,
    category,
    date,
    description: description ?? "",
  };
}