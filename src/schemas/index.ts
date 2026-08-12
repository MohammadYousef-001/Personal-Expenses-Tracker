import { z } from "zod/v4";

export const addExpenseInputSchema = z.object({
  amount: z
    .number()
    .positive()
    .max(1000000)
    .describe("The expense amount, a positive number up to 1,000,000"),

  category: z
    .enum(["Food", "Transport", "Bills", "Entertainment", "Health", "Other"])
    .describe("The expense category, one of a fixed set of values"),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format")
    .describe("The expense date in YYYY-MM-DD format"),

  description: z
    .string()
    .min(1)
    .max(100)
    .optional()
    .describe("A short optional description of the expense, max 100 characters"),
});

export const listExpensesInputSchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month must use YYYY-MM format with month 01-12")
    .optional()
    .describe("The month to filter by in YYYY-MM format"),

  category: z
    .enum(["Food", "Transport", "Bills", "Entertainment", "Health", "Other"])
    .optional()
    .describe("The category to filter by"),
});

export const getSpendingSummaryInputSchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Month must use YYYY-MM format")
    .optional()
    .describe("The month to summarise in YYYY-MM format"),
});

//csv row validation schema
//This checks that every expense loaded from the CSV has:
//id amount category date description
export const expenseRowSchema = z.object({
  id: z.string().min(1).optional(),

  amount: z.coerce.number().positive().max(1000000),

  category: z.string().min(1).max(30),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format"),

  description: z.string().max(100),
});

export type ExpenseRow = z.infer<typeof expenseRowSchema>;