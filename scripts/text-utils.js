const ACRONYMS = new Set([
  "ABO","ACTH","AFB","AFP","AIH","ALT","AMH","ANA","APTT","AST","BUN","CA","CBC","CD4",
  "CEA","CMV","CPK","CRP","CSF","DHEA","DNA","ESR","FSH","FT3","FT4","GDM","G6PD","HbA1c",
  "HB","HBSAG","HCG","HCV","HDL","HIV","HLA","HPV","HSV","IFA","IGA","IGE","IGG","IGM","INR",
  "KFT","LDH","LDL","LFT","LH","MIS","PAPP-A","PCOS","PCR","PPBS","PSA","PT","RA","RBC","RNA",
  "RPR","SGOT","SGPT","SLE","STI","T3","T4","TIBC","TORCH","TPO","TSH","VDRL","WBC","ZN","HEP",
  "IGD","IGA1","AB","IU","MG","ML","DL","KOH","EDTA","NIPT","GTT","OGTT",
]);

const LOWER_WORDS = new Set(["of", "and", "in", "with", "for", "to", "a", "the", "vs"]);

function titleCaseWord(word) {
  const bare = word.replace(/[^A-Za-z0-9]/g, "");
  if (!bare) return word;
  if (ACRONYMS.has(bare.toUpperCase()) && bare.length <= 6) return word.toUpperCase();
  if (LOWER_WORDS.has(bare.toLowerCase())) return word.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function smartTitleCase(name) {
  if (name !== name.toUpperCase()) return name; // already mixed/proper case, leave as-is
  return name
    .split(/(\s+|,|\/|-)/)
    .map((chunk) => (/^[\s,/-]+$/.test(chunk) ? chunk : titleCaseWord(chunk)))
    .join("")
    .replace(/^./, (c) => c.toUpperCase());
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[(),/]/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

module.exports = { smartTitleCase, slugify };
