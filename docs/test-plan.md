# Week 5 Manual Test Plan

## Overview

This test plan covers the three P0 tools in the Personal Expense Tracker MCP

- `add_expense`
- `list_expenses`
- `get_spending_summary`

The tests were written before running them

All test cases were executed using MCP Inspector

All test cases passed

## Test Cases

| id | tool | setup | input | expected | result | evidence |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | add_expense | make sure `data/expenses.csv` exists | valid amount category date and description | a new expense is added successfully to the CSV file | PASS | [evidence PDF](evidence/evidence.pdf) |
| T02 | add_expense | normal CSV file | amount is `-25` | the request is rejected because the amount must be positive | PASS | [evidence PDF](evidence/evidence.pdf) |
| T03 | add_expense | normal CSV file | date is `2026-99-99` | the request is rejected because the date is not a real calendar date | PASS | [evidence PDF](evidence/evidence.pdf) |
| T04 | add_expense | normal CSV file | leave the required fields empty | the request is rejected by input validation and no expense is added | PASS | [evidence PDF](evidence/evidence.pdf) |
| T05 | list_expenses | CSV contains groceries and other categories | category is `groceries` | only matching grocery expenses are returned | PASS | tested successfully in MCP Inspector |
| T06 | list_expenses | normal CSV file | month is `2026-99` | the request is rejected because the month is invalid | PASS | tested successfully in MCP Inspector |
| T07 | get_spending_summary | CSV contains expenses for the selected month | month is `2026-08` | the tool returns the correct total amount expense count and category totals | PASS | tested successfully in MCP Inspector |
| T08 | get_spending_summary | normal CSV file | month is `2026-99` | the request is rejected because the month is invalid | PASS | tested successfully in MCP Inspector |
| T09 | list_expenses | temporarily use an empty CSV with the correct header | `{}` | the tool handles empty data safely and does not crash | PASS | tested successfully in MCP Inspector |
| T10 | MCP server | disconnect the local MCP server to simulate an offline server | try to access a P0 tool from Inspector | P0 tools are unavailable while the MCP server is offline | PASS | offline server test completed successfully |

## Happy Path Inputs

### add_expense

The existing example file can be reused

`examples/add-expense.json`

Example input

```json
{
  "amount": 25,
  "category": "groceries",
  "date": "2026-08-12",
  "description": "milk and bread"
}
```

Result

`PASS`

The expense was added successfully

Evidence

[evidence PDF](evidence/evidence.pdf)

### list_expenses

Example input

```json
{
  "month": "2026-08",
  "category": "groceries"
}
```

Result

`PASS`

The tool returned the matching grocery expenses successfully

### get_spending_summary

Example input

```json
{
  "month": "2026-08"
}
```

Result

`PASS`

The tool returned the spending summary including the total amount expense count and category totals

## Invalid Input Tests

### add_expense negative amount

Input

```json
{
  "amount": -25,
  "category": "groceries",
  "date": "2026-08-12"
}
```

Expected

The request should be rejected because an expense amount must be positive

Result

`PASS`

The invalid amount was rejected

Evidence

[evidence PDF](evidence/evidence.pdf)

### add_expense invalid real date

Input

```json
{
  "amount": 25,
  "category": "groceries",
  "date": "2026-99-99"
}
```

Expected

The request should be rejected because the date is not a real calendar date

Result

`PASS`

The invalid date was rejected

Evidence

[evidence PDF](evidence/evidence.pdf)

### add_expense empty required fields

Input

```json
{}
```

Expected

The request should be rejected because the required fields are missing

Result

`PASS`

The request was rejected by input validation and no expense was added

Evidence

[evidence PDF](evidence/evidence.pdf)

### list_expenses invalid month

Input

```json
{
  "month": "2026-99"
}
```

Expected

The request should be rejected because the month must be between `01` and `12`

Result

`PASS`

The invalid month was rejected

### get_spending_summary invalid month

Input

```json
{
  "month": "2026-99"
}
```

Expected

The request should be rejected because the month is invalid

Result

`PASS`

The invalid month was rejected

## Empty Data Test

The CSV file was temporarily changed so it contained only the correct header and no expense rows

`list_expenses` was then called using

```json
{}
```

Expected

The tool should return an empty result and should not crash

Result

`PASS`

The tool handled the empty CSV safely and did not crash

The original CSV data was restored after the test

## Offline Server Test

The current P0 tools do not depend on an external network API

The local MCP server was disconnected to simulate an offline server

After the server was disconnected MCP Inspector could no longer access the P0 tools

Expected

The tools should be unavailable while the MCP server is offline

Result

`PASS`

The tools became unavailable when the MCP server was disconnected

The MCP server was reconnected after the test

## Evidence

Evidence was captured from MCP Inspector for these test cases

- T01 successful `add_expense` happy path
- T02 negative amount validation rejection
- T03 impossible calendar date validation rejection
- T04 empty required fields validation rejection

### get_spending_summary Evidence — Rafeef

The `get_spending_summary` tool was manually tested in MCP Inspector for the following cases:

- T07 Happy path using month `2026-08` — PASS
- T08 Invalid month using `2026-99` — PASS
- Additional empty-result test using month `2026-12` — PASS

The empty-result test returned `totalAmount: 0`, `expenseCount: 0`, an empty `categoryTotals`, and the message `no matching expenses found`.

[Open get_spending_summary test evidence PDF](./evidence/rafeef-spending-summary-evidence.pdf)

docs/evidence/rafeef-spending-summary-evidence.pdf
The screenshots for these test cases are included in one PDF file

[Open the Week 5 manual test evidence PDF](evidence/evidence.pdf)

The remaining test cases were also executed manually in MCP Inspector and marked PASS in the test table

## Fixture Reset

A backup of `data/expenses.csv` was kept before tests that modified the fixture

The CSV file was restored after the tests

Temporary test data was removed so the project returned to a clean state

## Final Result

All ten manual test cases passed

The three P0 tools worked correctly for normal inputs invalid inputs and empty data

The MCP server also behaved correctly when disconnected for the simulated offline test

The project is ready to move to the next Week 5 documentation step
