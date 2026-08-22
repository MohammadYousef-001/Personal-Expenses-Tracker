# Personal Expense Tracker MCP

A Model Context Protocol (MCP) server for recording personal expenses, viewing filtered expense data, and generating monthly spending summaries. It is designed to let an AI assistant provide a focused expense-management workflow without requiring a separate web or mobile application.

## Features

- Add an expense with an amount, category, date, and optional description.
- List expenses, optionally filtered by month or category.
- Generate a spending summary for a selected month.
- Validate tool inputs with Zod for clear, consistent requests.
- Run locally as an MCP server over standard input/output (stdio).

## Available tools 

| Tool | Description | Inputs |
| --- | --- | --- |
| `add_expense` | Adds a new expense. | `amount`, `category`, `date`, `description` (optional) |
| `list_expenses` | Lists expenses with optional filters. | `month` (optional), `category` (optional) |
| `get_spending_summary` | Creates a spending summary. | `month` (optional) |

### Input formats

- Dates use `YYYY-MM-DD`, for example `2026-07-30`.
- Month filters use `YYYY-MM`, for example `2026-07`.
- Expense amounts must be positive numbers.

## Requirements

- [Node.js](https://nodejs.org/) 20 or later
- npm

## Getting started

1. Clone the repository and open the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

The server runs over stdio, so it is intended to be launched by an MCP-compatible client rather than opened in a browser. Server status messages are written to standard error to keep the MCP connection clean.

## Test with MCP Inspector

Use MCP Inspector to connect to the server locally and invoke its tools:

```bash
npm run inspect
```

## Example workflow

An assistant can use the tools in a short conversation such as:

1. “I spent £25 on groceries today.” → call `add_expense`.
2. “Show me my grocery expenses this month.” → call `list_expenses` with a category and month.
3. “How much have I spent this month?” → call `get_spending_summary`.

Example `add_expense` input:

```json
{
  "amount": 25,
  "category": "groceries",
  "date": "2026-07-30",
  "description": "Weekly shop"
}
```
For full example conversations showing tool calls and expected answers, see [examples/conversations.md](examples/conversations.md)

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the MCP server in development mode. |
| `npm start` | Starts the MCP server. |
| `npm run inspect` | Opens MCP Inspector connected to the local server. |
| `npm run check:schema` | Runs the project schema check. |

## Scope

This project focuses on a simple, single-user expense-tracking workflow. It does not include bank integrations, authentication, a full graphical interface, automatic transaction imports, or advanced financial forecasting.

## License

## License

MIT — see [LICENSE](LICENSE) for details
