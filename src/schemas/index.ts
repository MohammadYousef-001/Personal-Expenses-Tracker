import { z } from "zod/v4";

export const addExpenseInputSchema = z.object({
  amount: z
    .number()
    .positive()
    .describe("The expense amount"),

  category: z
    .string()
    .min(1)
    .max(30)
    .describe("The expense category"),

  date: z
    .string()
    .min(10)
    .max(10)
    .describe("The expense date in YYYY-MM-DD format"),

  description: z
    .string()
    .min(1)
    .max(100)
    .optional()
    .describe("A short optional description of the expense"),
});

export const listExpensesInputSchema = z.object({
  month: z
    .string()
    .min(7)
    .max(7)
    .optional()
    .describe("The month to filter by in YYYY-MM format"),

  category: z
    .string()
    .min(1)
    .max(30)
    .optional()
    .describe("The category to filter by"),
});

export const getSpendingSummaryInputSchema = z.object({
  month: z
    .string()
    .min(7)
    .max(7)
    .optional()
    .describe("The month to summarise in YYYY-MM format"),


    
});

//csv row validation schema 
//This checks that every expense loaded from the CSV has:
//id amount category date description
export const expenseRowSchema = z.object({
  id: z.string().min(1),

  amount: z.coerce.number().positive(),

  category: z.string().min(1).max(30),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format"),

  description: z.string(),
});

export type ExpenseRow = z.infer<typeof expenseRowSchema>;