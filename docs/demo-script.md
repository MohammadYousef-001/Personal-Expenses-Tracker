# Personal Expense Tracker MCP - Demo Script

This guide gives you a clear five-minute plan. Read the **Say** sections aloud and follow the action steps in order.

## 0:40-1:10 - Architecture

MCP Client
→ Zod Validation
→ Expense Tool
→ Data Logic
→ data/expenses.csv

The deck has exactly five slides:

1. Title
2. Problem
3. Architecture
4. Tools
5. Next steps and questions

## Before You Start

Complete this checklist before the audience arrives:

1. Open the project folder.
2. Run `npm install` before the event.
3. Run `npm test` and confirm that all tests pass.
4. Run `npm run inspect` and keep the terminal open.
5. Connect MCP Inspector to the server.
6. Open the Tools section and confirm that all five tools are visible.
7. Keep `examples/conversations.md` open so you can copy the exact prompts.
8. Open the slides on slide 1.
9. Close unrelated windows and notifications.
10. Prepare a five-minute timer.

Do not change the code during the demo. The goal is to show the working project, not to explain every source file.

## 0:00-0:40 - Problem

### Show

Start on slide 1. Move to slide 2 after the first two sentences.

### Say

> Hello. This is my Personal Expense Tracker MCP server. It gives an AI assistant five focused tools for working with personal expenses.
>
> People often keep expenses in notes or messages. This makes expenses difficult to find, manage, and summarize. My project gives the model a small set of safe actions for storing and reviewing expenses. It cannot choose a file, run a command, or access the internet.

### Main point

The problem is not only storing expenses. The server must also limit what an AI client is allowed to do.

### Time check

Move to slide 3 by `0:40`.

If you are late, remove this sentence:

> This makes expenses difficult to find, manage, and summarize.

## 0:40-1:10 - Architecture

### Show

Show slide 3 and point from left to right.

```text
MCP Client
-> Zod Validation
-> Expense Tool
-> Data Logic
-> data/expenses.csv
```

### Say

> The MCP client sends a tool request. Zod validates the input before the request reaches the expense logic. The selected tool can perform only its defined action. The data logic reads or safely writes one fixed local file: `data/expenses.csv`.
>
> Categories are cleaned with trim and lowercase. Dates are checked as real calendar dates. Write operations use a queue, and update or delete operations safely replace the CSV file.

### What each part means

- **MCP Client:** Sends the tool request.
- **Zod Validation:** Rejects missing, invalid, or unexpected input.
- **Expense Tool:** Allows one focused action.
- **Data Logic:** Reads, validates, or safely changes expense rows.
- **CSV File:** Stores all expenses at one fixed local path.

Do not explain every TypeScript file. The diagram and this short explanation are enough.

### Time check

Start the live demo by `1:10`.

## 1:10-3:30 - Live Demo

### Introduce the tools

Show slide 4 for about ten seconds.

### Say

> The server has five tools. `add_expense`, `update_expense`, and `delete_expense` can change expense data. `list_expenses` and `get_spending_summary` are read-only. I will now use two normal-language prompts.

Switch from the slides to your MCP client or Inspector.

### Prompt 1 - Add an expense

**Target time:** `1:20-2:15`

Rehearsal 1: 4:52

Rehearsal 2: 4:43

Expected tool:

`add_expense`

Expected input:

```json
{
  "amount": 25,
  "category": "groceries",
  "date": "2026-08-16",
  "description": "milk and bread"
}
```

### Point to

- `success: true`
- the new expense ID
- amount `25`
- category `groceries`
- date `2026-08-16`

### Say after the result

> The server validated the amount, date, category, and description. It created a unique UUID and saved one expense. The category is stored in lowercase.

The ID changes each time. This is correct because every new expense needs a unique ID.

### Prompt 2 - Find the expense

**Target time:** `2:15-3:10`

Copy this exact prompt from `examples/conversations.md`:

> Using the Personal Expense Tracker, show me my groceries expenses for August 2026.

Expected tool:

`list_expenses`

Expected input:

```json
{
  "month": "2026-08",
  "category": "groceries"
}
```

### Point to

- the month and category filters
- the matching expense from prompt 1
- the result count
- `truncated: false`

The count may be greater than one if you used prompt 1 during rehearsal. That is not an error.

### Say after the result

> The list tool used the month and category filters. It returned the matching local rows. The output is bounded, so a large file cannot create an unlimited response.

### Close the live section

**Target time:** `3:10-3:30`

### Say

> The other tools use the same validation and fixed storage. Update changes one matching expense ID. Delete removes one matching expense ID. Summary calculates totals without changing the CSV file.

Return to slide 5.

### Backup Prompt

Use this only if a primary prompt fails, the client is slow, or you need a fast result.

> Using the Personal Expense Tracker, show how much I spent in August 2026 and which category had the highest total.

Expected tool:

`get_spending_summary`

Expected input:

```json
{
  "month": "2026-08"
}
```

The exact total can change after adding expenses. Do not promise a fixed number before running the tool.

## 3:30-4:30 - Next Steps

### Show

Show slide 5.

### Say

> The current version is intentionally local and single-user. Possible future improvements are optional encrypted backup, clearer spending charts, and a safe CSV import preview.
>
> I would keep the local mode because it is useful for privacy and for working without internet access. Every new feature would keep the same strict validation and limited permissions.

If you are ahead of time, add:

> I would test new features against damaged CSV data, invalid input, and repeated tool calls before using them with real expenses.

If you are behind time, skip the extra sentence. Do not cut the live demo.

## 4:30-5:00 - Finish

Stay on slide 5.

### Say

> The project provides five focused expense tools with strict input validation, safe local storage, bounded output, and limited permissions. It is useful without giving the AI client unnecessary access.
>
> Thank you. I am ready for questions.

Stop speaking after this. Do not start another tool call.

## Offline Backup

The MCP server and CSV file work locally. They do not need Wi-Fi after dependencies and Inspector are ready.

### Prepare before the event

1. Run `npm install` while you have Wi-Fi.
2. Run `npm run inspect` before the demo.
3. Keep Inspector and its terminal open.
4. Confirm that `data/expenses.csv` contains the fixture rows.
5. Keep this guide available offline.

### If Wi-Fi fails

1. Do not close the working Inspector window.
2. Explain that the expense server uses local storage.
3. Open Inspector's Tools section.
4. Select `get_spending_summary`.
5. Enter:

   ```json
   {
     "month": "2026-08"
   }
   ```

6. Run the tool.
7. Show the result from the local fixture CSV.

This fixtures-only path reads `data/expenses.csv`. It does not need a network request.

## If Something Goes Wrong

- **A call takes more than 15 seconds:** Use the backup prompt.
- **Inspector disconnects:** Reconnect once. Do not debug for more than 20 seconds.
- **The list contains repeated groceries rows:** Explain that the add prompt was used during rehearsal.
- **The CSV is damaged:** Explain that the server fails safely instead of deleting data. Switch to a clean prepared clone.
- **You are running late:** Shorten the next-steps section. Keep the live demo.
- **You finish early:** Use the optional next-steps sentence. Do not add a third live tool call.

## Rehearsal

Use a timer from the first word until "ready for questions."

| Rehearsal | Total time | Inspector tool time | Result |
| --- | ---: | ---: | --- |
| 1 | 4:52 | 5.51 seconds | Both live calls worked. |
| 2 | 4:43 | 4.74 seconds | Both live calls worked. |

Both rehearsals used a disposable clone. The main fixture CSV was not changed. Both rehearsals stayed under five minutes.

## Final Checklist

- Slides are open on slide 1.
- MCP Inspector is connected.
- All five tools are visible.
- The two exact live prompts are ready.
- The backup prompt is ready.
- The local fixture CSV is present.
- The terminal stays open.
- The timer is ready.
- The offline backup is ready.
