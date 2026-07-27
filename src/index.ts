import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGreetTool } from "./tools/greet.js";

// Week 2: import the project tools
import { registerAddExpenseTool } from "./tools/add-expense.js";
import { registerListExpensesTool } from "./tools/list-expenses.js";
import { registerGetSpendingSummaryTool } from "./tools/get-spending-summary.js";


/**
 * Factory used by stdio so every connection gets a fresh server.
 * Register all tools inside this function.
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: "personal-expense-tracker",
    version: "0.1.0",
  });

  registerGreetTool(server);

  // Week 2: register the Personal Expense Tracker tools
  registerAddExpenseTool(server);
  registerListExpensesTool(server);
  registerGetSpendingSummaryTool(server);

  return server;
}

void serveStdio(createServer);

console.error("Personal Expense Tracker MCP server running on stdio");

// For every tool, we do 3 things:
//
// 1. Create a schema to validate the tool input.
//
// 2. Create a function that registers the tool
//    and uses the schema.
//
// 3. Import and call the register function
//    inside createServer() in index.ts.