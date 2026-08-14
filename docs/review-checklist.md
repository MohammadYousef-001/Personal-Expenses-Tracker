Peer Review Checklist

Student: Rafeef Sholy
Reviewer: Leena Abd Alrahman
Project: Personal Expense Tracker MCP
Tool Reviewed: get_spending_summary



*Reviewer:* Leena Abd Alrahman
*Student:* Rafeef Sholy

# Peer Review Checklist

## Review Findings

## 1. Schemas — Are the inputs and outputs defined correctly?

The tool uses `getSpendingSummaryInputSchema` with Zod validation.

- `month` is correctly defined as an optional string with `YYYY-MM` format validation and `.describe()`.
- Minor issue: month range validation (01-12) is not checked.
- Output contains the required fields: `month`, `totalAmount`, `expenseCount`, and `categoryTotals`.

 Tool                    Input Schema                Output Schema 

 get_spending_summary    Correct  Correct format     no output schema validation 


## 2. Error Handling — What happens if an error occurs or an invalid input is provided?

The `get_spending_summary` tool uses a `try/catch` block to handle runtime errors without crashing the MCP server. Errors are logged using `console.error` and returned with `isError: true`.

Invalid inputs are validated using `getSpendingSummaryInputSchema`, which checks the optional `month` field and `YYYY-MM` format.

A minor issue is that the validation checks the format only and does not verify valid month values (e.g., `2026-99`).

 Check                      Result 

 Runtime error handling     Yes 
 Invalid input validation   Yes 
 Month range validation     Needs improvement 

 ## 3. Secrets — Are there any API keys or secrets in the code?

No API keys, passwords, tokens, or sensitive credentials were found in the reviewed files.

The project uses a local CSV file (`data/expenses.csv`) and does not require external services or authentication.

## 4. Data Allowlists — Do the tools only allow approved data sources?

The `get_spending_summary` tool only accesses the approved local data source:

`data/expenses.csv`

The CSV path is fixed inside the code, and users cannot provide custom file paths. This prevents unauthorized file access and path traversal risks.

 Check                               Result 

 Uses approved data source only       Yes 
 Access limited to project data file  Yes 
 User can provide custom paths        No 
 Path traversal risk                  Blocked 
 External data sources used           No 

 ## 5. Demo Path — Can the tool be demonstrated from start to finish without issues?

The `get_spending_summary` tool follows the expected demo flow.

The tool can start from receiving a month input, reading real expense data from `data/expenses.csv`, filtering expenses by month, calculating the summary, and returning the spending results.

 Requirement                             Result 

 Tool starts successfully                 Pass 
 Tool reads real CSV data                 Pass 
 Month filtering works                    Pass 
 Spending summary is generated correctly  Pass 
 Works without internet                   Pass 

 ## 6. P0 Tool Demo

The `get_spending_summary` tool was demonstrated successfully during the peer review.

The tool appeared in MCP Inspector, accepted valid input, read expense data from the CSV file, and returned the expected spending summary.

 Requirement                          Result 
------
 Tool visible in Inspector            Pass 
 Valid request executed successfully  Pass 
 Real data used                       Pass 
 Correct summary returned             Pass 

---

## 7. Attack Rejection — Invalid Input Test

An invalid request was tested by providing an incorrect month format.

Example:

```json
{
  "month": "August"
}
Test                                Result
Invalid input rejected              Pass
Schema validation works             Pass
Tool prevented invalid execution    Pass

# Final Verdict

The project has a strong foundation.

The `get_spending_summary` tool is implemented, tested, and working correctly through MCP Inspector.

Main observations:

- Input validation, error handling, and security controls are implemented correctly.
- The tool successfully reads real CSV data and generates accurate spending summaries.
- Minor improvements are needed for stricter month validation and output schema validation.

The project is ready for the required demo.

*Reviewer: Leena Abd Alrahman*
