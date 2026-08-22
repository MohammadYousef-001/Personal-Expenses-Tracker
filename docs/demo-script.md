# Personal Expense Tracker MCP - Demo Script

This is a simple script for a 3-5 minute demo. Follow it in order. Do not add extra explanations during the live demo.

## Goal

Show that a person can use normal language to save and review expenses. Also show that the MCP server validates input and only works with its fixed local CSV file.

## Slides

- [Demo slides - PDF](./demo-slides.pdf)
- [Demo slides - PowerPoint](./demo-slides.pptx)

## Before the demo

Do these steps before the audience arrives:

1. Open the project folder.
2. Run `npm install` while Wi-Fi is available.
3. Run `npm test` and confirm that all tests pass.
4. Run `npm run inspect` and keep the terminal and Inspector open.
5. In Inspector, connect to the server and open the Tools section.
6. Confirm that the five tools are visible.
7. Keep `examples/conversations.md` open so you can copy the exact prompts.
8. Keep `data/expenses.csv` unchanged during the presentation, except for the expense added by live prompt 1.
9. Put your phone on silent and close unrelated windows.
10. Start a five-minute timer when you begin speaking.

## Slide order

The slide deck has exactly five slides:

1. Title
2. Problem
3. Architecture
4. Tools
5. Next steps

## Timed speaking plan

### 0:00-0:40 - The problem - slides 1 and 2

**Show slide 1. Say:**

> Hello. This is my Personal Expense Tracker MCP server. It lets an AI assistant save and review personal expenses with five focused tools.

After about 15 seconds, move to slide 2.

**Show slide 2. Say:**

> People often write expenses in notes or messages. Those records are easy to lose and hard to total. My project gives the assistant a small and safe set of actions. It can work with expense data, but it cannot choose a file, run a command, or access the internet.

**Time check:** You should reach the next slide by `0:40`. If you are late, remove the sentence about notes and messages.

### 0:40-1:10 - Architecture - slide 3

**Show slide 3. Point from left to right. Say:**

> The MCP client sends a tool request. Zod checks the input. The selected expense tool calls the data logic. The data logic reads or safely writes one fixed file: `data/expenses.csv`. Categories are cleaned, dates are checked as real calendar dates, and write operations are put in a queue. The server returns short results to the client.

Do not explain every source file. The diagram is enough.

**Time check:** Start the live demo by `1:10`.

### 1:10-3:30 - Live tool calls - slide 4 and Inspector

Keep slide 4 visible for about 10 seconds.

**Say:**

> The server has five tools. Add, update, and delete can change expense data. List and summary only read data. I will use two normal-language prompts.

Switch to the MCP client or Inspector.

#### Live prompt 1 - target time: 1:20-2:15

Copy this exact prompt from `examples/conversations.md`:

> Using the Personal Expense Tracker, add a $25 groceries expense for milk and bread on August 16, 2026.

Wait for the result. Point to `success: true`, the new ID, and the lowercase category.

**Say:**

> The server validated the amount, date, category, and description. It created a unique ID and saved one local expense.

If the result is slow for more than 15 seconds, move to the backup plan below. Do not spend the whole demo fixing the client.

#### Live prompt 2 - target time: 2:15-3:10

Copy this exact prompt from `examples/conversations.md`:

> Using the Personal Expense Tracker, show me my groceries expenses for August 2026.

Wait for the result. Point to the month, category, count, and the expense added in prompt 1.

**Say:**

> The list tool used both filters and returned matching rows. Its output is bounded, so a very large file cannot create an unlimited response.

#### Close the live section - target time: 3:10-3:30

**Say:**

> The other tools use the same validation and fixed storage. Update changes one matching ID. Delete removes one matching ID. Summary calculates totals without changing the file.

Return to the slides.

### 3:30-4:30 - What I would build next - slide 5

**Show slide 5. Say:**

> The current version is intentionally local and single-user. Next, I would add optional encrypted backup, clearer spending charts, and a safe CSV import preview. I would keep validation and limited tool permissions in front of every new feature. I would also keep the local-only mode because it is useful when privacy or internet access matters.

If you are ahead of time, add:

> I would test each new feature against damaged data and repeated tool calls before I trusted it with real expenses.

If you are behind time, skip that extra sentence.

### 4:30-5:00 - Ready for questions - stay on slide 5

**Say:**

> The main result is a small MCP server that is useful, tested, and limited to one job. It has five expense tools, strict input checks, safe local storage, and no open-world access. Thank you. I am ready for questions.

Stop speaking. Do not start another tool call.

## The exact live prompts

Use exactly these two prompts in this order:

1. `Using the Personal Expense Tracker, add a $25 groceries expense for milk and bread on August 16, 2026.`
2. `Using the Personal Expense Tracker, show me my groceries expenses for August 2026.`

They are copied from `examples/conversations.md`.

## One backup prompt

Use this only when a live prompt fails or when you need a fast result:

`Using the Personal Expense Tracker, show how much I spent in August 2026 and which category had the highest total.`

This prompt calls `get_spending_summary` with month `2026-08`. The fixture CSV already contains August expenses, so the result does not depend on the expense added during the demo.

## Offline backup plan

The expense server and CSV are local. They do not need Wi-Fi after dependencies are installed.

Before leaving for the demo:

1. Run `npm install` while online.
2. Run `npm run inspect` while online and keep Inspector open.
3. Confirm that `data/expenses.csv` contains the three fixture rows.
4. Keep the backup prompt copied in a plain text file or on this page.

If Wi-Fi fails during the demo:

1. Do not close the working Inspector window.
2. Explain: "This server is local, so the expense tools still work offline."
3. Use the backup prompt.
4. If the model client is unavailable, open Inspector's Tools section directly.
5. Select `get_spending_summary`.
6. Enter the local fixture input:

   ```json
   {
     "month": "2026-08"
   }
   ```

7. Run the tool and show the local result.

This is the fixtures-only path. It reads `data/expenses.csv` and does not need a network request.

## Failure rules

- If a tool call takes more than 15 seconds, use the backup prompt.
- If Inspector disconnects, reconnect once. Do not debug for more than 20 seconds.
- If the add call already ran during rehearsal, that is okay. The list count may be higher, but the call still works.
- If the CSV is damaged, do not repair it during the demo. Explain that the server fails safely instead of deleting data, then use a clean prepared clone.
- If you reach 4:30 late, shorten the next-steps speech. Never remove the live demo.

## Rehearsal record

Use a timer from the first word to "ready for questions."

| Rehearsal | Full dry-run time | Inspector tool time | Live calls worked? | What changed |
| --- | ---: | ---: | --- | --- |
| 1 | 4:52 | 5.51 seconds | Yes | Shortened the tools explanation. |
| 2 | 4:43 | 4.74 seconds | Yes | Paused less between the result and explanation. |

Both rehearsals used a disposable clone, so the main fixture CSV was not changed. Both stayed under five minutes. The five-slide deck was kept because the live demo still had more than two minutes.

## Final 30-second check

- Slides open on slide 1.
- Inspector connected.
- Tools list visible.
- Exact prompts ready to copy.
- Fixture CSV present.
- Timer ready.
- Offline backup ready.
