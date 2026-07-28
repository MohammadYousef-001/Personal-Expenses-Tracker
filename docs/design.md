# Personal Expense Tracker MCP

## 1. Project Pitch

The Personal Expense Tracker MCP helps individuals record and organise their daily expenses in one place. It is designed for users who want a simple way to monitor spending and review expenses by category or month. The MCP exposes tools that allow an AI assistant to add expenses, retrieve stored expenses, generate spending summaries, create monthly budget plans, and export expense reports. The project provides a practical expense-management experience without requiring a complete web or mobile application.

---

## 2. User & Demo Story

During Demo Day, a user tells the AI assistant, “I spent £25 on groceries today.” The AI assistant calls the `add_expense` tool, which validates and saves the expense. Later, the user asks, “Show me all my grocery expenses this month,” so the AI calls `list_expenses` using the grocery category and current month as filters. Finally, the user asks, “How much have I spent this month?” and the AI calls `get_spending_summary`, returning the total amount spent and a breakdown of spending by category.

---

## 3. Tool Inventory

| Tool Name | Description | Inputs | Output Shape | Priority |
|---|---|---|---|---|
| `add_expense` | Records a new expense. | `amount`, `category`, `date`, `description` | `{ id, amount, category, date, description }` | **P0** |
| `list_expenses` | Returns stored expenses with optional filters. | `month` optional, `category` optional | `[{ id, amount, category, date, description }]` | **P0** |
| `get_spending_summary` | Calculates total spending and totals by category. | `month` optional | `{ totalSpent, categoryTotals, month }` | **P0** |
| `create_budget_plan` | Creates a simple monthly budget plan. | `name`, `totalAmount`, `month` | `{ id, name, totalAmount, month }` | **P1** |
| `list_budget_plans` | Returns all created budget plans. | None | `[{ id, name, totalAmount, month }]` | **P1** |
| `export_expense_report` | Exports stored expenses as a report. | `format` optional | `{ fileName, format, message }` | **P1** |

---

## 4. Tool Priorities

### P0 — Required for Demo Day

- `add_expense`
- `list_expenses`
- `get_spending_summary`

### P1 — Optional Features

- `create_budget_plan`
- `list_budget_plans`
- `export_expense_report`

---

## 5. Out of Scope

The following features will not be included in the first version of the project:

- **External API integrations**, including bank APIs, payment services, and automatic transaction imports.
- **User authentication and multiple user accounts**; the project will operate as a simple single-user expense tracker.
- **A full web or mobile user interface**; users will interact with the expense tracker through an AI assistant and MCP tools.
- **Advanced financial features**, such as recurring payments, debt tracking, investment management, and financial forecasting.
- **Cloud synchronisation and real-time data sharing** across multiple devices.

---

## 6. Success Criteria

- [ ] A user can add a new expense, and the expense is saved successfully.
- [ ] A user can retrieve expenses filtered by month or category.
- [ ] A user can generate an accurate spending summary showing total spending and spending by category.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Invalid or missing user input may cause errors or prevent expenses from being stored correctly. | Validate all tool inputs using Zod and return clear error messages when inputs are invalid. |
| Calculation errors may produce incorrect spending summaries. | Keep the calculations simple and test the summary totals against known fixture expense data. |
