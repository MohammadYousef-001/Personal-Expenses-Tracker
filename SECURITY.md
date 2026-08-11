# Security Policy

## Supported Versions

Only the current version of this repository is supported. This is a student project so older versions and forks do not receive security fixes.

## Reporting a Vulnerability

If you find a security issue in this project please contact:

[mohammad-jaradat@nextflows.academy](mailto:mohammad-jaradat@nextflows.academy) mentor

Do not open a public GitHub Issue for security reports. Email the mentor directly so the issue can be reviewed before any details are shared publicly.

## Hardening Summary Week 4

This section summarizes the main security changes made during Week 4. Full details are in `docs/threat-model.md`.

- Validated: `add_expense` inputs are checked with Zod. Date and month values use strict formats and expense amounts have a maximum limit.
- Capped: `list_expenses` returns at most 10 expense rows in one response to avoid very large outputs.
- Path restricted: the project only uses the fixed file `data/expenses.csv`. The tools do not accept a custom file path which reduces path traversal risk.
- CSV validation: every row read from the CSV file is checked with `expenseRowSchema` before it is used.
- Safe errors: tool errors shown to the model are short and simple while detailed errors stay in the local console.
- Network safety: the current P0 expense tools do not make network requests or accept user provided URLs. The shared HTTP helper uses a timeout if it is used by future tools.