# Threat Model: Personal Expense Tracker MCP

## Assets

- data/expenses.csv - the single source of truth for all expense records
- Tool responses returned to the model
- The local filesystem outside ./data
- API tokens / secrets - none exist in this project

## Trust Boundaries

- Model to tool arguments: every argument passed to add_expense, list_expenses, and get_spending_summary comes from the model, not a trusted human
- Tool to filesystem: add_expense writes to data/expenses.csv, list_expenses and get_spending_summary read from it
- Tool to network: not applicable, this project has no outbound fetch or API calls

## Top 5 Risks

1. Path traversal via csvPath - a custom file path could escape the data folder
2. Unbounded list_expenses results - large CSV could bloat the model context
3. Malformed CSV rows breaking the read path
4. Invalid add_expense input silently corrupting the fixture
5. Oversized single field values inflating a row

## Mitigations This Week

- Path traversal: resolveDataPath restricts every file path to ./data
- Unbounded results: add a hard cap on returned rows in list_expenses
- Malformed rows: expenseRowSchema validates every row, skips invalid ones
- Invalid input: addExpenseInputSchema validates before any write
- Oversized fields: add max length bounds to description and category

## Out of Scope

- SSRF protections - no outbound network calls in this project
- Secret management - no API keys or credentials used
- Multi-user access control - single-user student project
- Concurrent write protection - acceptable risk for single-client use
