import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGreetTool } from "./tools/greet.js"; //here we import the register function to register tools





// Week 2: import and register your project tools here, for example:
// import { registerSearchNotesTool } from "./tools/search-notes.js";
// import { registerListNotesTool } from "./tools/list-notes.js";
// import { registerAddNoteTool } from "./tools/add-note.js";

/**
 * Factory used by stdio (and later HTTP) so every connection gets a fresh server.
 * Register all tools inside this function — never on a shared global instance.
 */
function createServer(): McpServer // <- this means server of type mcp
 {
  const server = new McpServer({
    name: "mcprepo",
    version: "0.1.0",
  });

  registerGreetTool(server); // here we register the tool, by calling a function that registers the tool

  // Week 2 — register your multi-tool skeleton (stubs are OK)
  // registerSearchNotesTool(server);
  // registerListNotesTool(server);
  // registerAddNoteTool(server);

  return server;
}

void serveStdio(createServer);
console.error("mcprepo MCP server running on stdio");


// in any tool we want to create we must do 3 things
// 1. create a schema for the input we want to validate
// 2. create a function to register the tool and call the schema to validate the input
// 3. call the register function in the createServer function in index.ts
