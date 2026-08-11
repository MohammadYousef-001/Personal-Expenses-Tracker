# Security Policy

## Supported Versions

Only the current version of this repository (the main branch) is supported. This is a student project built for a single cohort; there are no older release branches receiving security fixes.

## Reporting a Vulnerability

If you find a security issue in this project, please contact:

mohammad-jaradat@nextflows.academy (mentor)

Do not open a public GitHub Issue for security reports - email the mentor directly so the issue can be reviewed before any details are made public.

## Hardening Summary (Week 4)

This section summarizes what was allowlisted, validated, or capped during the Week 4 hardening pass. Full details are in docs/threat-model.md.

- Validated: all add_expense fields now use strict Zod schemas, category is a fixed enum, date and month use strict regex patterns, and amount and description have upper bounds.
- Capped: list_expenses returns at most 10 rows per call, with a truncated flag so the caller knows if more results exist.
- Path-restricted: all file access is hardcoded to data/expenses.csv, no tool accepts a custom file path, which removes path traversal as an attack surface entirely.
- Graceful failure: missing or empty CSV data returns an empty result instead of crashing, invalid input is rejected by Zod before it reaches any file operation.
- No timeouts / no allowlisted hosts: not applicable, this project makes no outbound network or fetch calls.
