# Threat Model

## Assets

The main things we need to protect in this project are:

- `data/expenses.csv` because it stores all saved expense data.
- Expense information such as amount, category, date, and description.
- The local machine files because the MCP server reads from and writes to a local CSV file.
- Tool responses because they return expense information to the model and the user.
- The MCP server because it controls the expense tools.

This project does not currently use login tokens, API keys, or bank account details.

## Trust boundaries

The main trust boundaries in this project are:

1. **Model to tool arguments**
   - The model sends values such as `amount`, `category`, `date`, `month`, and `description`.
   - These values should not be trusted directly.
   - They should be checked before the tool uses them.

2. **Tool to local CSV file**
   - The tools read from and write to `data/expenses.csv`.
   - The CSV file may contain wrong or damaged data.
   - The data should be checked after it is read.

3. **CSV data back to the tool response**
   - Data from the CSV is used in the tool response.
   - If there is too much data, the response may become too large or slow.

4. **Tool to network**
   - The current expense tools do not need network access.
   - The project has an HTTP helper, so future network tools should only use expected URLs and should have a timeout.

## Top 5 risks

### 1. Invalid date or month input

The current schemas check the length of dates and months, but this does not fully check the format.

For example, `add_expense` expects a date in `YYYY-MM-DD` format, but another 10-character value may still pass the current check.

**What could happen:**
- Wrong expense data may be saved.
- Filters may not work correctly.
- Spending summaries may give wrong results.

### 2. Very large amount input

The `amount` must be a positive number, but there is no maximum value now.

A very large amount could be saved in the CSV and make the totals unrealistic.

**What could happen:**
- Spending totals may be wrong or unrealistic.
- Bad data may be stored in the CSV.

### 3. Large CSV file or too many expenses

The project reads the full CSV file into memory.

The `add_expense` tool also reads the full file and then writes the full file again.

If the file becomes very large, the server may become slow or use too much memory.

**What could happen:**
- Tools may respond slowly.
- Memory use may become high.
- Reading or writing the file may fail.

### 4. Damaged or manually changed CSV data

The CSV file is stored on the local machine, so it can be changed outside the MCP server.

Someone could remove columns, change values, or add invalid rows.

**What could happen:**
- The tools may fail when reading the file.
- Wrong expense data may be returned.
- New expenses may not be saved correctly.

### 5. Unsafe future network requests

The current expense tools do not use the network, but the project has an HTTP helper.

If a future tool accepts any URL from the model and sends a request to it without checks, it could access an unexpected internal or external address.

**What could happen:**
- The server may contact a URL it should not access.
- A request may take too long.
- A very large response may use too much memory.

## Mitigations this week

### Risk 1: Invalid date or month input

I will improve the Zod validation.

- Dates will only accept `YYYY-MM-DD`.
- Month filters will only accept `YYYY-MM`.
- Invalid values will be rejected before the tool reads or writes the CSV file.

This keeps the validation simple and inside the current schema file.

### Risk 2: Very large amount input

I will add a reasonable maximum amount in the Zod schema.

For example, the project can reject amounts above `1,000,000`.

This helps stop unrealistic values from being saved.

### Risk 3: Large CSV file or large responses

I will keep tool responses small.

- `list_expenses` already returns only the first 10 matching expenses.
- I will keep this limit.
- If needed, I can also add a simple file-size or record-count check before adding more expenses.

This is enough for this project because it is made for small personal expense data.

### Risk 4: Damaged CSV data

I will keep validating every CSV row with Zod after reading the file.

The project already uses `expenseRowSchema` to check each row.

If the CSV has a problem, the tool should return a simple error message to the user, while the detailed error can stay in the console for debugging.

### Risk 5: Unsafe future network requests

The current expense tools will not accept URLs from the user or model.

If network access is added later:

- Only known and expected URLs should be allowed.
- Requests should use a timeout.
- Large responses should be limited before they are fully processed.
- The current HTTP helper already uses an 8-second timeout by default.

For the current P0 expense tools, network access is not needed.

## Out of scope

The following things are outside the scope of this student project:

- User login and multiple user accounts.
- Bank account integration.
- Payment processing.
- Encrypting the local CSV file.
- Cloud database security.
- Advanced user roles and permissions.
- Full protection if someone already has direct access to the local machine.
- Support for millions of expense records.

These are out of scope because this is a small local single-user MCP expense tracker.

The main goal this week is to protect tool input, expense data, tool responses, and basic file operations without adding advanced systems that the project does not need.
