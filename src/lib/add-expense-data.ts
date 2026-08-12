import { randomUUID } from "node:crypto";

import type { ExpenseRow } from "../schemas/index.js";

export function createExpense(
  amount: number,
  category: string,
  date: string,
  description?: string,
): ExpenseRow {
  return {
    id: randomUUID(),
    amount,
    category: category.toLowerCase(),
    date,
    description: description ?? "",
  };
}
