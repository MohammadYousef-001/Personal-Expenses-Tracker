\# Week 5 Manual Test Plan



\## Overview



This test plan covers the three P0 tools in the Personal Expense Tracker MCP



\- `add\_expense`

\- `list\_expenses`

\- `get\_spending\_summary`



The tests were written before running them



All test cases were executed using MCP Inspector



All test cases passed



\## Test Cases



| id | tool | setup | input | expected | result | evidence |

| --- | --- | --- | --- | --- | --- | --- |

| T01 | add\_expense | make sure `data/expenses.csv` exists | valid amount category date and description | a new expense is added successfully to the CSV file | PASS | \[evidence PDF](evidence/evidence.pdf) |

| T02 | add\_expense | normal CSV file | amount is `-25` | the request is rejected because the amount must be positive | PASS | \[evidence PDF](evidence/evidence.pdf) |

| T03 | add\_expense | normal CSV file | date is `2026-99-99` | the request is rejected because the date is not a real calendar date | PASS | \[evidence PDF](evidence/evidence.pdf) |

| T04 | add\_expense | normal CSV file | leave the required fields empty | the request is rejected by input validation and no expense is added | PASS | \[evidence PDF](evidence/evidence.pdf) |

| T05 | list\_expenses | CSV contains groceries and other categories | category is `groceries` | only matching grocery expenses are returned | PASS | tested successfully in MCP Inspector |

| T06 | list\_expenses | normal CSV file | month is `2026-99` | the request is rejected because the month is invalid | PASS | tested successfully in MCP Inspector |

| T07 | get\_spending\_summary | CSV contains expenses for the selected month | month is `2026-08` | the tool returns the correct total amount expense count and category totals | PASS | tested successfully in MCP Inspector |

| T08 | get\_spending\_summary | normal CSV file | month is `2026-99` | the request is rejected because the month is invalid | PASS | tested successfully in MCP Inspector |

| T09 | list\_expenses | temporarily use an empty CSV with the correct header | `{}` | the tool handles empty data safely and does not crash | PASS | tested successfully in MCP Inspector |

| T10 | MCP server | disconnect the local MCP server to simulate an offline server | try to access a P0 tool from Inspector | P0 tools are unavailable while the MCP server is offline | PASS | offline server test completed successfully |

| L01 | list\_expenses | CSV has expenses for 2026-08 including Bills category | `{ "month": "2026-08", "category": "Bills" }` | returns only matching Bills expenses for that month | PASS | \[evidence PDF](evidence/evidence.pdf) |

| L02 | list\_expenses | normal CSV file | `{ "month": "2026-99" }` | rejected: "Month must use YYYY-MM format with month 01-12" | PASS | \[evidence PDF](evidence/evidence.pdf) |

| L03 | list\_expenses | normal CSV file, filter with no matches | `{ "category": "Other" }` (no month) | returns empty result `count: 0`, message "no matching expenses found", no crash | PASS | \[evidence PDF](evidence/evidence.pdf) |



\## Happy Path Inputs



\### add\_expense



The existing example file can be reused



`examples/add-expense.json`



Example input



```json

{

&#x20; "amount": 25,

&#x20; "category": "groceries",

&#x20; "date": "2026-08-12",

&#x20; "description": "milk and bread"

}

```



Result



`PASS`



The expense was added successfully



Evidence



\[evidence PDF](evidence/evidence.pdf)



\### list\_expenses



Example input



```json

{

&#x20; "month": "2026-08",

&#x20; "category": "groceries"

}

```



Result



`PASS`



The tool returned the matching grocery expenses successfully



\### get\_spending\_summary



Example input



```json

{

&#x20; "month": "2026-08"

}

```



Result



`PASS`



The tool returned the spending summary including the total amount expense count and category totals



\## Invalid Input Tests



\### add\_expense negative amount



Input



```json

{

&#x20; "amount": -25,

&#x20; "category": "groceries",

&#x20; "date": "2026-08-12"

}

```



Expected



The request should be rejected because an expense amount must be positive



Result



`PASS`



The invalid amount was rejected



Evidence



\[evidence PDF](evidence/evidence.pdf)



\### add\_expense invalid real date



Input



```json

{

&#x20; "amount": 25,

&#x20; "category": "groceries",

&#x20; "date": "2026-99-99"

}

```



Expected



The request should be rejected because the date is not a real calendar date



Result



`PASS`



The invalid date was rejected



Evidence



\[evidence PDF](evidence/evidence.pdf)



\### add\_expense empty required fields



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



\[evidence PDF](evidence/evidence.pdf)



\### list\_expenses invalid month



Input



```json

{

&#x20; "month": "2026-99"

}

```



Expected



The request should be rejected because the month must be between `01` and `12`



Result



`PASS`



The invalid month was rejected



\### get\_spending\_summary invalid month



Input



```json

{

&#x20; "month": "2026-99"

}

```



Expected



The request should be rejected because the month is invalid



Result



`PASS`



The invalid month was rejected



\### list\_expenses happy path with category and month filter



Input



```json

{

&#x20; "month": "2026-08",

&#x20; "category": "Bills"

}

```



Expected



Only matching Bills expenses for that month are returned



Result



`PASS`



The tool returned exactly one matching expense



Evidence



\[evidence PDF](evidence/evidence.pdf)



\### list\_expenses invalid month format



Input



```json

{

&#x20; "month": "2026-99",

&#x20; "category": "Bills"

}

```



Expected



The request should be rejected because the month must use `YYYY-MM` format with month `01-12`



Result



`PASS`



The invalid month was rejected with a clear validation error



Evidence



\[evidence PDF](evidence/evidence.pdf)



\## Empty Data Test



The CSV file was temporarily changed so it contained only the correct header and no expense rows



`list\_expenses` was then called using



```json

{}

```



Expected



The tool should return an empty result and should not crash



Result



`PASS`



The tool handled the empty CSV safely and did not crash



The original CSV data was restored after the test



A second empty-result case was also tested using a category filter with no matching data (`{ "category": "Other" }`), which returned `count: 0` and the message "no matching expenses found" without crashing



\## Offline Server Test



The current P0 tools do not depend on an external network API



The local MCP server was disconnected to simulate an offline server



After the server was disconnected MCP Inspector could no longer access the P0 tools



Expected



The tools should be unavailable while the MCP server is offline



Result



`PASS`



The tools became unavailable when the MCP server was disconnected



The MCP server was reconnected after the test



\## Evidence



Evidence was captured from MCP Inspector for these test cases



\- T01 successful `add\_expense` happy path

\- T02 negative amount validation rejection

\- T03 impossible calendar date validation rejection

\- T04 empty required fields validation rejection

\- L01 successful `list\_expenses` happy path with month and category filter

\- L02 `list\_expenses` invalid month validation rejection

\- L03 `list\_expenses` empty result with no matching data



The screenshots for these test cases are included in one PDF file



\[Open the Week 5 manual test evidence PDF](evidence/evidence.pdf)



The remaining test cases were also executed manually in MCP Inspector and marked PASS in the test table



\## Fixture Reset



A backup of `data/expenses.csv` was kept before tests that modified the fixture



The CSV file was restored after the tests



Temporary test data was removed so the project returned to a clean state



\## Final Result



All thirteen manual test cases passed



The three P0 tools worked correctly for normal inputs invalid inputs and empty data



The MCP server also behaved correctly when disconnected for the simulated offline test

