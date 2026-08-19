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

  // csv-stringify appends a trailing newline after THIS row, but it has no
  // idea whether the file we're appending to already ends in one. If the
  // last existing line is missing its trailing newline, appendFile glues
  // our new row directly onto the end of it — merging two 5-column rows
  // into a single malformed line (this is exactly what caused the
  // "Invalid Record Length: columns length is 5, got 9" error). So we
  // check first and insert a newline ourselves if needed.
  let needsLeadingNewline = false;

  try {
    const existing = await readFile(expensesFilePath, "utf-8");
    needsLeadingNewline = existing.length > 0 && !existing.endsWith("\n");
  } catch (error) {
    // File doesn't exist yet — appendFile will create it fresh, nothing
    // to guard against here.
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      throw error;
    }
  }

  await appendFile(
    expensesFilePath,
    (needsLeadingNewline ? "\n" : "") + csvText,
    "utf-8",
  );
}