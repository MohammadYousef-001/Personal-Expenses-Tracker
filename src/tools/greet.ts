import type { McpServer } from "@modelcontextprotocol/server";

import { greetInputSchema } from "../schemas/greet.js";

/**
 * Week 1 starter tool — proves your stack, Inspector, and Zod validation work.
 * Keep this tool until your Week 2 project tools are registered and verified.
 */

//*******  HOW TO CREATE A TOOL  **********//
// to create a tool we must create a file in the tools folder, 
// create a schema for the input we want to validate, 
// create a function to register the tool and call the schema to validate the input,
//  and call the register function in the createServer function in index.ts
export function registerGreetTool(server: McpServer): void {
  server.registerTool(
    "say_hello", //the tool name we want to register 
    {
      description:
        "return a greeting message using the input name from the user",
      inputSchema: greetInputSchema, //call the schema we created in greet.ts to validate the input
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
    },
    async ({ name }) => { //must be same variable name in file greet.ts and greet.js
      return {
        content: [
          {
            type: "text",
            text: `Hello, ${name}! Your MCP server is running, I am Mohammad .`, //$ means the actual value of the variable not variable name
          },
        ],
      };
    },
  );
}
