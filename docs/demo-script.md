# Personal Expense Tracker MCP - Demo Script

## 0:00-0:40 - Problem

People often keep expenses in notes or messages which makes them difficult to manage and summarize.

The Personal Expense Tracker MCP gives a model a small set of safe tools for storing and reviewing expenses.

## 0:40-1:10 - Architecture

MCP Client
→ Zod Validation
→ Expense Tool
→ Data Logic
→ data/expenses.csv

All inputs are validated before reaching the expense file.

The server uses one fixed local CSV file.

## 1:10-3:30 - Live Demo

### Prompt 1

Using the Personal Expense Tracker, add a $25 groceries expense for milk and bread on August 16, 2026.

Expected tool:

`add_expense`

### Prompt 2

Using the Personal Expense Tracker, show me my groceries expenses for August 2026.

Expected tool:

`list_expenses`

### Backup Prompt

Using the Personal Expense Tracker, show how much I spent in August 2026 and which category had the highest total.

Expected tool:

`get_spending_summary`

## 3:30-4:30 - Next Steps

Possible future improvements:

- encrypted backup
- spending charts
- safe CSV import
- keep the local mode for privacy

## 4:30-5:00 - Finish

The project provides five focused expense tools with input validation safe local storage and limited permissions.

Ready for questions.

## Offline Backup

The MCP server and CSV file work locally.

If Wi-Fi is unavailable I can use MCP Inspector directly with the local `data/expenses.csv` fixture data.

## Rehearsal

Rehearsal 1: 4:52

Rehearsal 2: 4:43

Both were under 5 minutes.
