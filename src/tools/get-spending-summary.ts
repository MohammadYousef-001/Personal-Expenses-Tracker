import type { McpServer } from "@modelcontextprotocol/server";

import { getSpendingSummaryInputSchema } from "../schemas/index.js";

export function registerGetSpendingSummaryTool(server: McpServer): void {
  server.registerTool(
    "get_spending_summary",
    {
      description: "get a spending summary",
      inputSchema: getSpendingSummaryInputSchema,
    },
    async ({ month }) => {
      return {
        content: [
          {
            type: "text",
            text: `spending summary created for month ${month}`,
          },
        ],
      };
    },
  );
}