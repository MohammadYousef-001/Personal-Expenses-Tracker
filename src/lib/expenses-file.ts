import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

import {
  expenseRowSchema,
  type ExpenseRow,
} from "../schemas/index.js";

export const expensesFilePath = path.resolve(
  process.cwd(),
  "data",
  "expenses.csv",
);

export async function readExpenses(): Promise<ExpenseRow[]> {
  const csvText = await readFile(expensesFilePath, "utf-8");

  const parsedRows: unknown[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return parsedRows.map((row) => expenseRowSchema.parse(row));
}

export async function writeExpenses(
  expenses: ExpenseRow[],
): Promise<void> {
  const csvText = stringify(expenses, {
    header: true,
    columns: [
      "id",
      "amount",
      "category",
      "date",
      "description",
    ],
  });

  await writeFile(expensesFilePath, csvText, "utf-8");
}