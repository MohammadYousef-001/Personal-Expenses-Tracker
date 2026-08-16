//the shared bridge between your tools and the real CSV data
import { appendFile, readFile } from "node:fs/promises";
import path from "node:path";

import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

import {
  expenseRowSchema,
  type ExpenseRow,
} from "../schemas/index.js";

// Fixed, non-configurable path — no tool ever passes in a custom csvPath,
// which is what prevents path traversal here rather than validating one.
export const expensesFilePath = path.resolve(
  process.cwd(),
  "data",
  "expenses.csv",
);

export async function readExpenses(): Promise<ExpenseRow[]> {
  let csvText: string;

  try {
    csvText = await readFile(expensesFilePath, "utf-8");
  } catch (error) {
    // Missing file is a valid "no data yet" state, not a crash.
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const parsedRows: unknown[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return parsedRows.map((row) => expenseRowSchema.parse(row));
}

export async function appendExpense(
  expense: ExpenseRow,
): Promise<void> {
  const csvText = stringify([expense], {
    columns: [
      "id",
      "amount",
      "category",
      "date",
      "description",
    ],
  });

  await appendFile(expensesFilePath, csvText, "utf-8");
}
