import { z } from "zod/v4";

export const greetInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1) //MIN LENGTH OF STRING
    .max(10)//MAX LENGTH OF STRING
    .describe("The person's first name or preferred name to greet"),
}).strict();
// if we want the inspector to make the read value if it was a number to be treated as a number and all that
//this is done in the z validation
