# Threat Model

## Assets

The main assets in this project are:

- `data/expenses.csv`, which stores all expense records.
- Expense data such as amount, category, date, and description.
- The local filesystem used by the MCP server.
- Tool responses that return expense information.
- The MCP server and its registered tools.

The project currently does not use login tokens, API keys, or bank credentials.

## Trust Boundaries

1. **Model to tools**  
   The model sends values such as amount, category, date, month, and description. These inputs must be validated before use.

2. **Tools to CSV file**  
   The tools read from and write to `data/expenses.csv`. The file may contain invalid or manually changed data.

3. **CSV file to tool response**  
   Data read from the CSV is returned through the tools. Large amounts of data may create slow or large responses.

4. **Tools to network**  
   The current expense tools do not need network access. The project has an HTTP helper, so future network requests must be controlled.

## Top 5 Risks

### 1. Invalid date or month input
The current schemas check the length of dates and months, but the format can be checked more strictly. Bad values may cause wrong filters or summaries.For get_spending_summary, an invalid month value could cause incorrect filtering and an inaccurate spending summary

### 2. Very large amount input
The amount must be positive, but there is no maximum value. Very large values may create unrealistic spending totals.

### 3. Large CSV file or response
The project reads the full CSV file into memory. A very large file may make the tools slow or use too much memory.

### 4. Damaged CSV data
The CSV file can be manually changed. Missing columns or invalid rows may cause the tools to fail or return wrong data.

### 5. Unsafe future network requests
The current P0 tools do not use the network. However, a future tool that accepts any URL could access an unsafe address or return too much data.

## Mitigations This Week

- Improve Zod validation so dates only accept `YYYY-MM-DD` and months only accept `YYYY-MM`.
- For get_spending_summary, getSpendingSummaryInputSchema now validates the optional month and only accepts valid YYYY-MM values with months from 01 to 12.
- Add a reasonable maximum value for expense amounts.
- Keep `list_expenses` responses limited to 10 expenses and avoid returning unnecessary data.
- Continue validating every CSV row with `expenseRowSchema` before using it.
- Keep user-facing error messages simple while logging detailed errors in the console.
- Do not allow the current expense tools to accept user-provided URLs.
- If network tools are added later, allow only expected URLs, use timeouts, and limit large responses. The current HTTP helper already uses a timeout.

## Out of Scope

Authentication, bank integration, payment processing, cloud database security, advanced permissions, encryption of the CSV file, and support for very large datasets are outside the scope of this small local single-user project.
