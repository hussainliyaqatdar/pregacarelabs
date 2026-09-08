const XLSX = require("xlsx");
const path = require("path");

const file = path.join(__dirname, "..", "CMS Catalog.xlsx");
const wb = XLSX.readFile(file);

console.log("Sheet names:", wb.SheetNames);

for (const name of wb.SheetNames) {
  const sheet = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  console.log(`\n--- Sheet: ${name} (${rows.length} rows) ---`);
  if (rows.length > 0) {
    console.log("Columns:", Object.keys(rows[0]));
    console.log("First 3 rows:", JSON.stringify(rows.slice(0, 3), null, 2));
  }
}
