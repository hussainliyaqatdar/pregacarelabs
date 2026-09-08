// Common clinical abbreviations and lay terms that don't literally appear in
// the CMS catalog's test/package names, mapped to the slug(s) they should
// resolve to. Search checks this before falling back to fuzzy text matching,
// so "FBS" finds "Glucose Fasting, Fluoride Plasma" even though the catalog
// name never spells out the abbreviation.
export const ALIASES: Record<string, string[]> = {
  fbs: ["glucose-fasting-fluoride-plasma"],
  "fasting sugar": ["glucose-fasting-fluoride-plasma"],
  "fasting blood sugar": ["glucose-fasting-fluoride-plasma"],
  ppbs: ["glucose-post-prandial-plasma"],
  "pp sugar": ["glucose-post-prandial-plasma"],
  "post prandial sugar": ["glucose-post-prandial-plasma"],
  hba1c: ["glycosylated-hemoglobin-hba1c"],
  "hba1c test": ["glycosylated-hemoglobin-hba1c"],
  a1c: ["glycosylated-hemoglobin-hba1c"],
  "glycosylated hb": ["glycosylated-hemoglobin-hba1c"],
  kft: ["kidney-function-test"],
  rft: ["kidney-function-test"],
  "renal function test": ["kidney-function-test"],
  lft: ["liver-function-profile-serum"],
  "liver panel": ["liver-function-profile-serum"],
  tft: ["thyroid-panel-ii-ft3-ft4-tsh-serum", "thyroid-panel-tsh-serum"],
  "thyroid profile": ["thyroid-panel-ii-ft3-ft4-tsh-serum", "thyroid-panel-tsh-serum"],
  "thyroid test": ["thyroid-panel-ii-ft3-ft4-tsh-serum", "thyroid-panel-tsh-serum"],
  tsh: ["tsh-3rd-gen-ultrasensitive-serum", "thyroid-panel-tsh-serum"],
  "vit d": ["vitamin-d-total-25-hydroxyvitamin-d-serum"],
  "vitamin d test": ["vitamin-d-total-25-hydroxyvitamin-d-serum"],
  "vit b12": ["vitamin-b12-cyanocobalamine-serum"],
  b12: ["vitamin-b12-cyanocobalamine-serum"],
  cbc: ["cbc-with-esr-cbcpsesr", "cbc-5-edta-whole-blood"],
  "complete blood count": ["cbc-with-esr-cbcpsesr", "cbc-5-edta-whole-blood"],
  esr: ["erythrocyte-sedimentation-rate-esr"],
  crp: ["c-reactive-protein-crp-serum-quantitative"],
  lipid: ["lipid-profile-serum"],
  cholesterol: ["lipid-profile-serum"],
  "lipid test": ["lipid-profile-serum"],
  pt: ["prothrombin-time-pt-inr-citrate-plasma"],
  inr: ["prothrombin-time-pt-inr-citrate-plasma"],
  "pt inr": ["prothrombin-time-pt-inr-citrate-plasma"],
  aptt: ["activated-partial-thromboplastin-time-aptt"],
  "clotting test": ["prothrombin-time-pt-inr-citrate-plasma", "activated-partial-thromboplastin-time-aptt"],
  hb: ["hemoglobin-by-cyanmethaemoglobin"],
  haemoglobin: ["hemoglobin-by-cyanmethaemoglobin"],
  hemoglobin: ["hemoglobin-by-cyanmethaemoglobin"],
  psa: ["prostate-specific-antigen-psa-serum"],
  afp: ["alpha-fetoprotein-afp-serum"],
  "iron studies": ["serum-iron-and-tibc-studies"],
  tibc: ["serum-iron-and-tibc-studies"],
  "blood group": ["abo-group-rh-type-edta-whole-blood"],
  "blood grouping": ["abo-group-rh-type-edta-whole-blood"],
  "double marker": ["double-marker-test-serum"],
  "quadruple marker": ["quadruple-marker-test-serum"],
  "quad marker": ["quadruple-marker-test-serum"],
  torch: ["torch-igg-igm-evaluation-serum"],
  ana: ["anti-nuclear-antibody-ana-ifa-serum"],
  rf: ["rheumatoid-factor-serum"],
  "rheumatoid factor test": ["rheumatoid-factor-serum"],
  ige: ["total-ige-serum"],
  "uric acid test": ["uric-acid-serum"],
  fsh: ["follicle-stimulating-hormone-fsh-serum"],
  lh: ["luteinizing-hormone-lh-serum"],
  amh: ["amh-mis-serum"],
  hcg: ["hcg-serum"],
  "pregnancy test": ["hcg-serum"],
  hiv: ["hiv-antibodies-serum"],
  hbsag: ["hepatitis-b-surface-antigen-hbsag-serum"],
  "hepatitis b": ["hepatitis-b-surface-antigen-hbsag-serum"],
  hcv: ["hcv-antibodies-serum"],
  "hepatitis c": ["hcv-antibodies-serum"],
  vdrl: ["torch-igg-igm-evaluation-serum"],
  widal: ["widal-test-serum"],
  typhoid: ["widal-test-serum"],
  urine: ["urinalysis"],
  "urine test": ["urinalysis"],
  "urine culture": ["culture-urine-with-susceptibility"],
};

const NORMALIZED_ALIASES: Record<string, string[]> = Object.fromEntries(
  Object.entries(ALIASES).map(([k, v]) => [k.toLowerCase().trim(), v])
);

export function aliasMatchSlugs(query: string): string[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  if (NORMALIZED_ALIASES[q]) return NORMALIZED_ALIASES[q];
  // allow the alias to match as a whole word within a longer query too
  for (const [alias, slugs] of Object.entries(NORMALIZED_ALIASES)) {
    const pattern = new RegExp(`(^|\\s)${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`);
    if (pattern.test(q)) return slugs;
  }
  return [];
}
