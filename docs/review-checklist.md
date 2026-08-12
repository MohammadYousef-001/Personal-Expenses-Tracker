# Add Expense Peer Review Report

## Review Information

**Project:** Personal Expense Tracker MCP

**Tool reviewed:** `add_expense`

**Peer reviewer:** Baraa Mohsen

**Tool owner:** Mohammad Yousef

**Review date:** 12-08-2026

**Due date for action items:** End of Week 4

## Overview

The `add_expense` tool was reviewed to check its input validation security behavior category consistency date handling CSV writing and expense ID generation

The tool already had good basic protection because it used Zod validation a fixed CSV path and short error messages

The peer first tested the current behavior of the tool and then reviewed areas that could be improved

## Input Validation Testing

The peer tested different invalid inputs to make sure the tool rejects unsafe or incorrect values before saving them

### Negative Amount

A negative amount was tested and rejected because the amount must be positive

Example

```json
{
  "amount": -25,
  "category": "groceries",
  "date": "2026-08-12",
  "description": "test"
}
```

The input was rejected by the validation

This is important because an expense should not have a negative value and invalid amounts could affect the spending summary and total calculations

### Zero Amount

An amount of zero was also tested

The input was rejected because the amount must be positive

This keeps the stored expense data meaningful and prevents invalid expense records from being added

### Wrong Date Format

The peer tested a date with the wrong format

Example

```json
{
  "amount": 25,
  "category": "groceries",
  "date": "abcdefghij",
  "description": "security test"
}
```

The request was rejected because the date must follow the `YYYY-MM-DD` format

This prevents random text or malformed dates from being stored in the CSV file

### Long Category and Description

The peer also tested category and description values that were longer than the allowed limits

These inputs were rejected by Zod validation

This helps keep the input controlled and prevents very large unnecessary text from being stored

## Problem 1 Real Date Validation

### Problem

The old validation checked the date format but did not fully check if the date was a real calendar date

For example

```text
2026-99-99
```

has the same basic format as

```text
2026-08-12
```

but it is not a real date

This could create incorrect data and later affect month filtering spending summaries and other date based operations

### Solution

The date validation was improved so it checks both the `YYYY-MM-DD` format and whether the date is a real calendar date

Examples

```text
2026-99-99
```

is rejected

```text
2026-02-29
```

is rejected because 2026 is not a leap year

```text
2028-02-29
```

is accepted because it is a valid leap year date

### Why This Solution Was Used

This keeps the current Zod validation structure simple while making the date validation more accurate

The invalid date is rejected before any file operation happens so incorrect date data cannot reach the CSV file

## Problem 2 Category Normalization

### Problem

The old `add_expense` code saved the category exactly as the user entered it

For example

```text
Bills
bills
BILLS
```

could all be stored as different values

This creates a consistency problem

The `list_expenses` tool can compare categories without caring about uppercase or lowercase but the spending summary uses the stored category value directly

This means the spending summary could show

```text
Bills 50
bills 30
BILLS 20
```

instead of treating them as one category

```text
bills 100
```

### Solution

The category is now converted to lowercase before the expense is stored

For example

```text
Bills
```

becomes

```text
bills
```

and

```text
BILLS
```

also becomes

```text
bills
```

### Why This Solution Was Used

This keeps category values consistent across the project

It also helps `add_expense` `list_expenses` and `get_spending_summary` work correctly together because the same category is not split into different versions because of uppercase or lowercase letters

The solution is simple and does not require changing the project structure

## Problem 3 Reading and Rewriting the Whole CSV

### Old Behavior

The old `add_expense` flow was

```text
read the whole csv file
create the new expense
add the new expense to the expenses array
rewrite the whole csv file
```

The tool first used `readExpenses()` to load all existing expenses

Then it added the new expense to the array

After that it used `writeExpenses()` to create the full CSV content again and replace the existing file

### Why This Was a Problem

This works for a small student project but it is less efficient

Every time one expense is added the program reads every existing expense and then writes every expense back to the file

For example if the CSV contains 5000 expenses the tool reads all 5000 rows and rewrites all 5001 rows just to add one new expense

This creates unnecessary file operations and becomes less efficient as the file grows

### Solution

The code was changed so the new expense is appended directly to `data/expenses.csv`

The new flow is

```text
validate the input
create the new expense
convert only the new expense to csv format
append only the new row
```

### Why This Solution Was Used

Appending is more suitable for an operation that only adds one new record

It reduces unnecessary file reading and writing and keeps the logic simple

The existing CSV columns and header are still preserved

The tool now only adds the new expense instead of rebuilding the whole file

## Problem 4 Expense ID Generation

### Old Behavior

The old code generated the expense ID using the number of existing expenses plus one

For example

```text
5 current expenses
new id = expense-006
```

This can create duplicate IDs if a row is manually deleted

For example if the CSV contains

```text
expense-001
expense-002
expense-003
expense-004
expense-005
```

and `expense-003` is manually deleted there are only four rows left

If the system uses the number of rows plus one the next generated ID could become

```text
expense-005
```

even though that ID already exists

This can create duplicate IDs and make it difficult to identify expense records correctly

### Solution

The ID generation was changed to use Node.js `randomUUID()`

```ts
import { randomUUID } from "node:crypto";
```

The ID is now created using

```ts
id: randomUUID()
```

This generates a unique ID for every new expense

### Why This Solution Was Used

The ID no longer depends on the number of rows in the CSV file

Deleting an old expense does not affect future IDs

It also works well with the new append method because the tool can create a unique ID without reading the full CSV file first

## Error Handling Review

The existing short error handling approach was kept

The tool returns a short and simple error message to the model while detailed errors stay in the local console for debugging

This prevents internal system information and stack traces from being exposed to the model

## Reviewer Feedback

Baraa reviewed the `add_expense` tool including input validation date handling category handling CSV writing ID generation and error handling

### What Worked

- Zod rejected negative and zero amounts
- invalid date formats were rejected
- long category and description inputs were rejected
- the tool used a fixed CSV file path
- error messages returned to the model were short and did not expose internal details

### Issues Found

- the date validation checked the format but did not fully check if the date was a real calendar date
- categories were stored exactly as entered which could create duplicate category names with different letter cases
- adding one expense required reading and rewriting the whole CSV file
- expense IDs depended on the number of current rows which could create duplicate IDs if rows were manually deleted

### Recommended Fixes

- validate that the date is a real calendar date
- normalize categories before storing them
- append only the new expense row instead of rewriting the complete CSV
- use a unique ID method that does not depend on the number of existing rows

## Action Items

### Action Item 1

**Issue:** Real calendar date validation was missing

**Owner:** Mohammad Yousef

**Action:** Add real calendar date validation while keeping the existing `YYYY-MM-DD` format

**Due date:** End of Week 4

**Status:** Completed

### Action Item 2

**Issue:** Categories could be stored using different uppercase and lowercase forms

**Owner:** Mohammad Yousef

**Action:** Normalize categories to lowercase before storing them

**Due date:** End of Week 4

**Status:** Completed

### Action Item 3

**Issue:** The whole CSV file was read and rewritten when adding one expense

**Owner:** Mohammad Yousef

**Action:** Change the file handling so only the new expense row is appended

**Due date:** End of Week 4

**Status:** Completed

### Action Item 4

**Issue:** IDs depended on the number of existing CSV rows

**Owner:** Mohammad Yousef

**Action:** Replace the old ID method with `randomUUID()`

**Due date:** End of Week 4

**Status:** Completed

## Final Result

After the peer review and fixes the `add_expense` tool now

- rejects negative and zero amounts
- rejects wrong date formats
- rejects impossible calendar dates
- rejects very long category and description values
- normalizes categories to lowercase
- appends new expenses instead of rewriting the whole CSV file
- uses `randomUUID()` for unique expense IDs
- keeps short and safe error messages

The changes were kept simple and followed the same structure and coding level as the existing project

## Peer Confirmation

**Reviewer:** Baraa Mohsen

**Final status:** The fixes were reviewed and the identified issues were resolved no remaining P0 issues were found in `add_expense`