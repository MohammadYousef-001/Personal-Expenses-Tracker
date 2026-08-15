# Week 5 Manual Test Plan

## Overview

This test plan covers the three P0 tools in the Personal Expense Tracker MCP

- `add_expense`
- `list_expenses`
- `get_spending_summary`

The tests are written before running them

The result and evidence columns are left empty for now and will be completed after testing

## Test Cases

| id | tool | setup | input | expected | result | evidence |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | add_expense | make sure `data/expenses.csv` exists | valid amount category date and description | a new expense is added successfully to the CSV file |  |  |
| T02 | add_expense | normal CSV file | amount is `-25` | the request is rejected because the amount must be positive |  |  |
| T03 | add_expense | normal CSV file | date is `2026-99-99` | the request is rejected because the date is not a real calendar date |  |  |
| T04 | list_expenses | CSV contains expense records | `{}` | the tool returns the default list of expenses without crashing |  |  |
| T05 | list_expenses | CSV contains groceries and other categories | category is `groceries` | only matching grocery expenses are returned |  |  |
| T06 | list_expenses | normal CSV file | month is `2026-99` | the request is rejected because the month is invalid |  |  |
| T07 | get_spending_summary | CSV contains expenses for the selected month | month is `2026-08` | the tool returns the correct total amount expense count and category totals |  |  |
| T08 | get_spending_summary | normal CSV file | month is `2026-99` | the request is rejected because the month is invalid |  |  |
| T09 | list_expenses | temporarily use an empty CSV with the correct header | `{}` | the tool handles empty data safely and does not crash |  |  |
| T10 | add_expense | temporarily rename the CSV file | valid expense input | the tool fails safely with a short error and does not expose a stack trace |  |  |

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

### list_expenses

Example input

```json
{
  "month": "2026-08",
  "category": "groceries"
}
```

### get_spending_summary

Example input

```json
{
  "month": "2026-08"
}
```

## Invalid Input Examples

### add_expense negative amount

```json
{
  "amount": -25,
  "category": "groceries",
  "date": "2026-08-12"
}
```

### add_expense invalid real date

```json
{
  "amount": 25,
  "category": "groceries",
  "date": "2026-99-99"
}
```

### list_expenses invalid month

```json
{
  "month": "2026-99"
}
```

### get_spending_summary invalid month

```json
{
  "month": "2026-99"
}
```

## Empty Data Test

For the empty data test keep the CSV header but remove the expense rows temporarily

The tool should return an empty result instead of crashing

## Data Source Unavailable Test

The current P0 tools do not use the network so there is no real network timeout to test

To test safe failure I will temporarily rename `data/expenses.csv` and call a tool that needs the file

The tool should return a short safe error instead of exposing internal system details

After the test the CSV file will be renamed back to its original name

## Fixture Reset Steps

Before testing make a backup of `data/expenses.csv`

After testing restore the original CSV so test expenses do not stay in the project

Any expense created during the `add_expense` happy path test should be removed after the evidence is collected

The result and evidence columns will be completed after all manual tests are run in MCP Inspector
