const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "CMS Catalog.xlsx");
const wb = XLSX.readFile(file);

const tests = XLSX.utils.sheet_to_json(wb.Sheets["Tests"], { defval: "" });
const packages = XLSX.utils.sheet_to_json(wb.Sheets["Packages"], { defval: "" });

const outDir = path.join(__dirname, "raw");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "tests-raw.json"), JSON.stringify(tests, null, 2));
fs.writeFileSync(path.join(outDir, "packages-raw.json"), JSON.stringify(packages, null, 2));

console.log("Tests:", tests.length, "Packages:", packages.length);

// unique Type values
console.log("Test types:", [...new Set(tests.map((t) => t.Type))]);
console.log("Package categories:", [...new Set(packages.map((p) => p.Category))]);
console.log("Package types:", [...new Set(packages.map((p) => p.Type))]);

// duplicate test names?
const nameCounts = {};
tests.forEach((t) => {
  nameCounts[t["Test Name"]] = (nameCounts[t["Test Name"]] || 0) + 1;
});
const dupes = Object.entries(nameCounts).filter(([, c]) => c > 1);
console.log("Duplicate test names:", dupes.length);
