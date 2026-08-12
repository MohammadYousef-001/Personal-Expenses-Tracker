# Week 4 Peer Review Checklist

**Reviewer name:** Mohammad Altaher
**Review date:** 2026-08-12
**Project:** Personal Expense Tracker MCP

## Live Demo Notes

Demoed list_expenses live to Mohammad in MCP Inspector. Walked him through the tool structure, showed it uses a fixed CSV file path (no URLs, no secrets), and that results were already capped at a maximum of 10 records.

## Attack Demo

Tested list_expenses with month set to 2026-99 (invalid month value outside 01-12). At the time of the demo, this was incorrectly returning an empty result instead of a validation error. Mohammad flagged this as something to fix.

## Peer Feedback (Mohammad Altaher)

**What worked well:**
The list_expenses tool already has good basic protection because it uses a fixed CSV file path, does not use URLs or secrets, and limits the returned records to 10.

**Issues found:**
1. No maximum length on the category filter, so very large category input could be accepted.
2. Default result count was too high when no filter was provided.
3. No byte cap on the total response size, so a large number of matching records with long text could produce an oversized response.

**Recommended fixes:**
1. Add a maximum length for the category filter to reject very large input.
2. Use a smaller default number of results, such as 4, when no filter is provided.
3. Add a byte cap so the total response size stays limited even if the returned records contain a lot of text.

Mohammad's exact words: "Yes great job. However I also have some feedback about your code: add a maximum length for the category to avoid very large input, use a smaller default number of results such as 4 when no filter is provided, and add a byte cap so the total response size stays limited even if the returned records contain a lot of text. Otherwise all good."

## Action Items

| Action | Owner | Due Date |
|---|---|---|
| Add stricter month validation (reject values outside 01-12) | Baraa | 2026-08-12 |
| Add byte cap on list_expenses response (64 KB) | Baraa | 2026-08-12 |
| Reduce default result count to 4 when no filter provided | Baraa | 2026-08-12 |
| Confirm category filter max length is covered by existing enum validation | Baraa | 2026-08-12 |

## Fix Confirmation

After the fixes were pushed, Mohammad re-tested list_expenses with month 2026-99 in the Inspector and confirmed the input was now correctly rejected with a clear validation error ("Month must use YYYY-MM format with month 01-12"). Mohammad confirmed: "well done."
