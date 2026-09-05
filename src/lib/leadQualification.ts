/**
 * Lotus International - Lead Qualification & Verification Engine
 * 
 * Implements client-approved deterministic business rules:
 * - Minimum MOQ: From 10 Pcs (Sampling, capsule batches, and bulk accepted)
 * - Preferred Countries: UAE, Middle East, All European Countries, US Markets
 * - Restricted Countries: Ghana, Syria, Ukraine (Instant Red Flag)
 * - Business Types: All types preferred (Brand, Wholesaler, Retailer, Sourcing Agency, etc.)
 * - Timeline: All timelines accepted (Immediate, 1-3 months, 3-6 months, etc.)
 * 
 * Classification Logic:
 * - 🟢 QUALIFIED (Green): All eligibility criteria pass
 * - 🟡 NEEDS REVIEW (Yellow): At least 2 criteria pass (routed to merchandising desk)
 * - 🔴 NOT QUALIFIED (Red): All criteria fail, OR restricted country, OR < 10 pcs
 */

export type QualificationTier = "GREEN" | "YELLOW" | "RED";

export interface RuleResult {
  rule: string;
  result: "PASS" | "WARN" | "FAIL";
  detail: string;
}

export interface LeadQualificationInput {
  name: string;
  email: string;
  company?: string;
  country: string;
  category?: string;
  quantity: string | number;
  timeline?: string;
  businessType?: string;
  message?: string;
  techPackAttached?: boolean;
  selectedProductIds?: string[];
}

export interface LeadQualificationOutput {
  tier: QualificationTier;
  tierLabel: string;
  score: number; // 0 to 100
  isBusinessEmail: boolean;
  parsedQuantity: number;
  isAboveMoq: boolean;
  rulesApplied: RuleResult[];
  reason: string;
  recommendedAction: string;
}

// Common free consumer email domains
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
  "rediffmail.com",
  "live.com",
  "msn.com",
]);

// Client-restricted countries (Instant Disqualification)
const RESTRICTED_COUNTRIES = new Set([
  "ghana",
  "syria",
  "ukraine",
]);

// Client-preferred export markets: UAE, Middle East, Europe, US/North America
const PREFERRED_REGIONS = new Set([
  // Middle East & GCC
  "united arab emirates",
  "uae",
  "dubai",
  "abu dhabi",
  "saudi arabia",
  "qatar",
  "oman",
  "kuwait",
  "bahrain",
  // US & North America
  "united states",
  "usa",
  "us",
  "canada",
  // European Countries
  "united kingdom",
  "uk",
  "germany",
  "france",
  "italy",
  "spain",
  "netherlands",
  "belgium",
  "switzerland",
  "sweden",
  "denmark",
  "norway",
  "finland",
  "ireland",
  "austria",
  "poland",
  "portugal",
  "greece",
  "czech republic",
  "romania",
  "hungary",
  // Other High-Volume Markets
  "australia",
  "new zealand",
  "japan",
  "singapore",
]);

/**
 * Check whether an email is a corporate business domain or personal free provider
 */
export function checkIsBusinessEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1]?.trim().toLowerCase();
  return !FREE_EMAIL_DOMAINS.has(domain);
}

/**
 * Parses user quantity strings or dropdown ranges into a representative numeric lower bound
 */
export function parseQuantity(rawQty: string | number): number {
  if (typeof rawQty === "number") return rawQty;
  if (!rawQty) return 0;

  const normalized = rawQty.toLowerCase().replace(/,/g, "").trim();

  // Match pattern like "< 10"
  if (normalized.includes("<") && normalized.includes("10")) {
    return 5;
  }

  // Match numbers
  const numbers = normalized.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    return parseInt(numbers[0], 10);
  }

  return 0;
}

/**
 * Main Lead Qualification Function based on Client Matrix
 */
export function qualifyLead(input: LeadQualificationInput): LeadQualificationOutput {
  const rulesApplied: RuleResult[] = [];
  let passCount = 0;
  let hasRestrictedCountry = false;

  const country = (input.country || "").trim().toLowerCase();
  const email = (input.email || "").trim().toLowerCase();
  const isBusiness = checkIsBusinessEmail(email);
  const qty = parseQuantity(input.quantity);

  // 1. Restricted Country Check (Instant Hard Fail)
  if (RESTRICTED_COUNTRIES.has(country)) {
    hasRestrictedCountry = true;
    rulesApplied.push({
      rule: "country_restriction",
      result: "FAIL",
      detail: `Country (${input.country}) is on client restricted list (Ghana, Syria, Ukraine)`,
    });
  }

  // 2. Minimum Order Quantity (MOQ) Rule: From 10 Pcs
  let moqPass = false;
  if (qty >= 10) {
    moqPass = true;
    passCount++;
    rulesApplied.push({
      rule: "moq_eligibility",
      result: "PASS",
      detail: `Order volume (${qty} pcs) meets client minimum MOQ requirement (≥ 10 pcs)`,
    });
  } else if (qty > 0 && qty < 10) {
    rulesApplied.push({
      rule: "moq_eligibility",
      result: "FAIL",
      detail: `Quantity (${qty} pcs) is below client minimum threshold (10 pcs)`,
    });
  } else {
    // Unspecified or custom
    rulesApplied.push({
      rule: "moq_eligibility",
      result: "WARN",
      detail: `Quantity not specified or custom discussion requested (${input.quantity})`,
    });
  }

  // 3. Geographic Market Rule: UAE, Middle East, Europe, US
  let regionPass = false;
  if (hasRestrictedCountry) {
    regionPass = false;
  } else if (PREFERRED_REGIONS.has(country) || Array.from(PREFERRED_REGIONS).some((r) => country.includes(r))) {
    regionPass = true;
    passCount++;
    rulesApplied.push({
      rule: "preferred_market",
      result: "PASS",
      detail: `Client preferred export territory: ${input.country}`,
    });
  } else if (country.length >= 2) {
    rulesApplied.push({
      rule: "preferred_market",
      result: "WARN",
      detail: `Secondary export market (${input.country}) - subject to review`,
    });
  } else {
    rulesApplied.push({
      rule: "preferred_market",
      result: "WARN",
      detail: "Country not specified",
    });
  }

  // 4. Business Type Rule: All Types Preferred
  let bizTypePass = false;
  const bizType = (input.businessType || "").trim();
  if (bizType.length > 0) {
    bizTypePass = true;
    passCount++;
    rulesApplied.push({
      rule: "business_type",
      result: "PASS",
      detail: `Accepted business type: ${bizType}`,
    });
  } else {
    rulesApplied.push({
      rule: "business_type",
      result: "WARN",
      detail: "Business type not selected",
    });
  }

  // 5. Order Timeline Rule: All Timelines Accepted
  let timelinePass = false;
  const timeline = (input.timeline || "").trim();
  if (timeline.length > 0) {
    timelinePass = true;
    passCount++;
    rulesApplied.push({
      rule: "timeline_feasibility",
      result: "PASS",
      detail: `Timeline requirement: ${timeline} (flexible factory scheduling)`,
    });
  } else {
    rulesApplied.push({
      rule: "timeline_feasibility",
      result: "WARN",
      detail: "Timeline not specified",
    });
  }

  // 6. Business Email Check
  if (isBusiness) {
    rulesApplied.push({
      rule: "business_email",
      result: "PASS",
      detail: `Corporate email domain detected (${email.split("@")[1]})`,
    });
  } else {
    rulesApplied.push({
      rule: "business_email",
      result: "WARN",
      detail: `Consumer free email (${email.split("@")[1] || "unknown"})`,
    });
  }

  // Determine Qualification Tier based on Client Formula:
  // - Qualified: All eligibility pass (at least 4 primary criteria pass, no restriction)
  // - Needs Review: At least 2 criteria pass
  // - Not Qualified: All criteria fail OR restricted country OR < 10 pcs
  let tier: QualificationTier = "YELLOW";
  let tierLabel = "Needs Review";
  let score = Math.round((passCount / 4) * 100);
  let reason = "Inquiry meets partial criteria; routed to merchandising review queue.";
  let recommendedAction = "Review specifications and prepare custom quotation within 1 business day.";

  if (hasRestrictedCountry) {
    tier = "RED";
    tierLabel = "Not Qualified (Restricted Region)";
    score = 0;
    reason = `Inquiry originated from restricted territory (${input.country}).`;
    recommendedAction = "De-prioritize in CRM pipeline; polite automated response.";
  } else if (qty > 0 && qty < 10) {
    tier = "RED";
    tierLabel = "Not Qualified (Below 10 Pcs)";
    score = 15;
    reason = "Requested volume is below client 10-piece minimum.";
    recommendedAction = "Automated email regarding minimum order threshold.";
  } else if (passCount >= 4 && !hasRestrictedCountry) {
    tier = "GREEN";
    tierLabel = "Qualified (High Priority)";
    score = isBusiness ? 100 : 90;
    reason = "All client qualification criteria passed (MOQ ≥ 10 pcs, preferred region, valid business profile & timeline).";
    recommendedAction = "Fast-track to sales desk; initiate priority WhatsApp follow-up.";
  } else if (passCount >= 2) {
    tier = "YELLOW";
    tierLabel = "Needs Review";
    score = Math.max(50, score);
    reason = "Meets key criteria (at least 2 parameters passed); requires standard merchandising verification.";
    recommendedAction = "Assign to standard merchandising desk for review within 24 hours.";
  } else {
    tier = "RED";
    tierLabel = "Not Qualified";
    score = Math.min(30, score);
    reason = "Inquiry failed multiple client eligibility criteria.";
    recommendedAction = "Log in CRM without triggering urgent sales alerts.";
  }

  return {
    tier,
    tierLabel,
    score,
    isBusinessEmail: isBusiness,
    parsedQuantity: qty,
    isAboveMoq: moqPass,
    rulesApplied,
    reason,
    recommendedAction,
  };
}
