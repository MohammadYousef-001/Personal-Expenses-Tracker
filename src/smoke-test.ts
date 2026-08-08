import { readExpenses } from "./lib/expenses-file.js";

const rows = await readExpenses();
console.log("Loaded", rows.length, "rows");
console.log(rows);
