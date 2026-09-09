const fs = require("fs");
const path = require("path");
const { smartTitleCase, slugify } = require("./text-utils");
const { fallbackDescription, cleanName } = require("./fallback-descriptions");
const curatedDescriptions = require("./test-descriptions");
const packagesContent = require("./packages-content");
const { estimateEta, DEFAULT_ETA } = require("./eta");

const rawTests = require("./raw/tests-raw.json");
// "Thyroid Panel (T3, T4, TSH)" (PKG-TP) removed at the business's request -
// each constituent test remains individually bookable.
const EXCLUDED_PACKAGE_CODES = new Set(["PKG-TP"]);
const rawPackages = require("./raw/packages-raw.json").filter((p) => !EXCLUDED_PACKAGE_CODES.has(p.Code));

// ---- category heuristics for individual tests (xlsx has no category column) ----
const CATEGORY_RULES = [
  [/thyroid|\btsh\b|\bt3\b|\bt4\b/i, "Thyroid"],
  [/glucose|sugar|hba1c|insulin|diabet/i, "Diabetes & Metabolic"],
  [/liver|bilirubin|\balt\b|\bast\b|\bsgot\b|\bsgpt\b|hepat/i, "Liver Health"],
  [/kidney|creatinine|\bbun\b|urea\b/i, "Kidney Health"],
  [/vitamin/i, "Vitamins & Nutrition"],
  [/cbc|haemoglobin|hemoglobin|platelet|anaemia|anemia|iron|ferritin|\besr\b/i, "Blood & Anaemia"],
  [/lipid|cholesterol|triglyceride|cardiac|troponin|\bck\b|heart/i, "Heart Health"],
  [/lh\b|fsh\b|estradiol|testosterone|prolactin|\bamh\b|progesterone|pcos|fertility|semen|hcg/i, "Hormones & Fertility"],
  [/hiv|hbsag|hepatitis|hcv|vdrl|sti\b|std\b|widal|torch|dengue|malaria|typhoid|culture/i, "Infection Screening"],
  [/\bana\b|rheumatoid|autoimmune|lupus|\bcrp\b/i, "Autoimmune & Inflammation"],
  [/allerg|\bige\b/i, "Allergy"],
  [/\bpsa\b|\bca 125\b|\bafp\b|tumour|tumor|\bcea\b|cancer/i, "Cancer Markers"],
  [/urine|urinalysis|urinary/i, "Urine Tests"],
  [/stool|faecal|fecal/i, "Stool Tests"],
  [/pregnan|antenatal|trimester|marker test/i, "Pregnancy Care"],
];

// A handful of tests need a category the general regex rules can't infer
// correctly (e.g. "glucose" would otherwise route the gestational-specific
// GTT into Diabetes & Metabolic instead of Pregnancy Care). Checked first.
const CATEGORY_OVERRIDES = {
  NIPT: "Pregnancy Care",
  "NIPT WITH MICRODELETION": "Pregnancy Care",
  "ORAL GLUCOSE TOLERANCE TEST - GESTATIONAL": "Pregnancy Care",
  "GESTATIONAL GLUCOSE TOLERANCE (GTT) -3, PLASMA": "Pregnancy Care",
};

function categorize(name) {
  if (CATEGORY_OVERRIDES[name.toUpperCase()]) return CATEGORY_OVERRIDES[name.toUpperCase()];
  for (const [pattern, cat] of CATEGORY_RULES) {
    if (pattern.test(name)) return cat;
  }
  return "General Health";
}

// ---- build tests ----
const seenSlugs = new Map();
function uniqueSlug(base) {
  const count = seenSlugs.get(base) || 0;
  seenSlugs.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

const tests = rawTests.map((row) => {
  const rawName = String(row["Test Name"]).trim();
  const displayName = smartTitleCase(rawName);
  const description = curatedDescriptions[rawName] || fallbackDescription(displayName);
  const isCurated = Boolean(curatedDescriptions[rawName]);
  return {
    id: String(row.Code),
    slug: uniqueSlug(slugify(displayName)),
    name: displayName,
    rawName,
    code: String(row.Code),
    price: Number(row["MRP (Rs.)"]) || 0,
    mrp: null, // no separate discounted price exists in source data for individual tests
    type: row.Type,
    popular: row.Type === "Routine",
    curated: isCurated,
    category: categorize(rawName),
    sampleType: "Blood",
    description,
    eta: estimateEta(rawName).label,
  };
});

// lookup index for constituent-test matching
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const testsByNormalizedName = new Map();
tests.forEach((t) => {
  const key = normalize(t.rawName);
  if (!testsByNormalizedName.has(key)) testsByNormalizedName.set(key, t);
});

// Known naming mismatches between the PDF's constituent-test bullet text and
// the CMS catalog's exact test names (different spelling/word order/aliasing).
const MANUAL_ALIASES = {
  "fasting blood sugar": "glucose fasting fluoride plasma",
  "hba1c": "glycosylated hemoglobin",
  "hba1c gdm screening": "glycosylated hemoglobin",
  "post prandial blood sugar": "glucose post prandial plasma",
  "crp quantitative serum": "c reactive protein crp serum quantitative",
};

function tokenSet(s) {
  return new Set(normalize(s).split(" ").filter((w) => w.length > 2));
}

function findConstituentMatch(constituentName) {
  const norm = normalize(constituentName);
  if (testsByNormalizedName.has(norm)) return testsByNormalizedName.get(norm);
  if (MANUAL_ALIASES[norm] && testsByNormalizedName.has(MANUAL_ALIASES[norm])) {
    return testsByNormalizedName.get(MANUAL_ALIASES[norm]);
  }
  // fallback: substring containment either direction
  for (const t of tests) {
    const tn = normalize(t.rawName);
    if (tn.includes(norm) || norm.includes(tn)) return t;
  }
  // fallback: strong token-set overlap (handles reordered/re-spelled names)
  const wanted = tokenSet(constituentName);
  let best = null;
  let bestScore = 0;
  for (const t of tests) {
    const have = tokenSet(t.rawName);
    const intersection = [...wanted].filter((w) => have.has(w)).length;
    const score = intersection / Math.max(wanted.size, 1);
    if (score > bestScore) {
      bestScore = score;
      best = t;
    }
  }
  return bestScore >= 0.7 ? best : null;
}

// ---- build packages ----
const unmatchedConstituents = [];
const packagesWithoutContent = [];

const packages = rawPackages.map((row) => {
  const name = String(row["Package Name"]).trim();
  const content = packagesContent[name];
  if (!content) packagesWithoutContent.push(name);

  const constituents = (content?.constituents || []).map((cName) => {
    const match = findConstituentMatch(cName);
    if (!match) unmatchedConstituents.push(`${name} -> ${cName}`);
    return { name: cName, slug: match?.slug || null, price: match?.price ?? null };
  });

  const price = Number(row["Package Price (Rs.)"]) || 0;
  const mrp = content?.mrp && content.mrp > price ? content.mrp : null;

  // A package's report is only complete once its slowest constituent test
  // is done, so its ETA is the widest range among everything it includes.
  const constituentEtas = (content?.constituents || []).map((cName) => estimateEta(cName));
  const packageEta = constituentEtas.length
    ? constituentEtas.reduce((slowest, e) => (e.weight > slowest.weight ? e : slowest), constituentEtas[0])
    : DEFAULT_ETA;

  return {
    id: row.Code,
    slug: slugify(name),
    name,
    code: row.Code,
    category: row.Category,
    price,
    mrp,
    tagline: content?.tagline || row.Category,
    description: content?.description || `A curated ${row.Category.toLowerCase()} test package. Full details coming soon - please call us for the complete list of included tests.`,
    constituents,
    needsContent: !content,
    eta: packageEta.label,
  };
});

// ---- write output ----
const outDir = path.join(__dirname, "..", "data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "tests.json"), JSON.stringify(tests, null, 2));
fs.writeFileSync(path.join(outDir, "packages.json"), JSON.stringify(packages, null, 2));

// ---- report ----
const curatedCount = tests.filter((t) => t.curated).length;
console.log(`Tests: ${tests.length} total, ${curatedCount} curated, ${tests.length - curatedCount} auto-generated`);
console.log(`Packages: ${packages.length} total, ${packagesWithoutContent.length} missing PDF content`);
if (packagesWithoutContent.length) console.log("  Missing content for:", packagesWithoutContent);
console.log(`Constituent links: ${unmatchedConstituents.length} unmatched out of ${packages.reduce((s, p) => s + p.constituents.length, 0)}`);
if (unmatchedConstituents.length) console.log("  Unmatched:\n  " + unmatchedConstituents.join("\n  "));
