/**
 * Lotus International - Lead Qualification & Verification Engine
 * 
 * Implements deterministic business rules to classify leads into 3 tiers:
 * - GREEN (High Priority): Instant routing to senior export merchandising team
 * - YELLOW (Manual Review): Placed in standard queue for review within 1 business day
 * - RED (Low Priority / Auto-Filter): Below MOQ, retail, or invalid inquiries
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

// Top priority export regions
const TIER_1_COUNTRIES = new Set([
  "united states",
  "usa",
  "us",
  "canada",
  "united kingdom",
  "uk",
  "germany",
  "france",
  "italy",
  "spain",
  "netherlands",
  "australia",
  "new zealand",
  "united arab emirates",
  "uae",
  "saudi arabia",
  "qatar",
  "japan",
  "sweden",
  "denmark",
  "norway",
  "finland",
  "switzerland",
  "belgium",
  "ireland",
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

  // Match pattern like "< 500", "under 500"
  if (normalized.includes("<") || normalized.includes("under") || normalized.includes("micro")) {
    const num = parseInt(normalized.replace(/[^0-9]/g, ""), 10);
    return num ? Math.min(num, 499) : 250;
  }

  // Match ranges like "500 - 1000", "1000 - 5000", "2500 - 5000", "10000+"
  const numbers = normalized.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    return parseInt(numbers[0], 10);
  }

  return 0;
}

/**
 * Main Lead Qualification Function
 */
export function qualifyLead(input: LeadQualificationInput): LeadQualificationOutput {
  const rulesApplied: RuleResult[] = [];
  let score = 50; // Starting baseline

  const email = (input.email || "").trim().toLowerCase();
  const isBusiness = checkIsBusinessEmail(email);
  const qty = parseQuantity(input.quantity);
  const country = (input.country || "").trim().toLowerCase();
  const isTier1Country = TIER_1_COUNTRIES.has(country);

  // 1. Email Domain Rule
  if (isBusiness) {
    score += 15;
    rulesApplied.push({
      rule: "business_email",
      result: "PASS",
      detail: `Corporate domain detected (${email.split("@")[1]})`,
    });
  } else {
    score -= 10;
    rulesApplied.push({
      rule: "business_email",
      result: "WARN",
      detail: `Free consumer email provider (${email.split("@")[1] || "unknown"})`,
    });
  }

  // 2. Minimum Order Quantity (MOQ) Hard Rule
  let moqFail = false;
  let isAboveMoq = true;

  if (qty > 0 && qty < 500) {
    moqFail = true;
    isAboveMoq = false;
    score -= 40;
    rulesApplied.push({
      rule: "moq_threshold",
      result: "FAIL",
      detail: `Quantity (${qty} pcs) is below factory minimum order threshold (500 pcs)`,
    });
  } else if (qty >= 2500) {
    score += 25;
    rulesApplied.push({
      rule: "moq_threshold",
      result: "PASS",
      detail: `High volume export order (${qty}+ pcs)`,
    });
  } else if (qty >= 500) {
    score += 10;
    rulesApplied.push({
      rule: "moq_threshold",
      result: "PASS",
      detail: `Meets standard factory minimum order volume (${qty} pcs)`,
    });
  } else {
    rulesApplied.push({
      rule: "moq_threshold",
      result: "WARN",
      detail: `Unspecified or ambiguous quantity (${input.quantity})`,
    });
  }

  // 3. Geographic Market Rule
  if (isTier1Country) {
    score += 15;
    rulesApplied.push({
      rule: "geographic_market",
      result: "PASS",
      detail: `Top-priority export region (${input.country})`,
    });
  } else {
    rulesApplied.push({
      rule: "geographic_market",
      result: "WARN",
      detail: `Secondary or emerging export destination (${input.country})`,
    });
  }

  // 4. Business Type Rule
  const bizType = (input.businessType || "").toLowerCase();
  if (bizType.includes("brand") || bizType.includes("retail") || bizType.includes("wholesal") || bizType.includes("buying")) {
    score += 15;
    rulesApplied.push({
      rule: "business_type",
      result: "PASS",
      detail: `Qualified B2B buyer category: ${input.businessType}`,
    });
  } else if (bizType.includes("startup") || bizType.includes("boutique")) {
    score += 5;
    rulesApplied.push({
      rule: "business_type",
      result: "WARN",
      detail: `Emerging / boutique buyer category: ${input.businessType}`,
    });
  }

  // 5. Tech Pack Bonus
  if (input.techPackAttached) {
    score += 10;
    rulesApplied.push({
      rule: "tech_pack",
      result: "PASS",
      detail: "Complete technical specifications / tech pack provided",
    });
  }

  // 6. Timeline Validation
  const timeline = (input.timeline || "").toLowerCase();
  if (timeline.includes("< 14") || timeline.includes("immediate") || timeline.includes("1 week")) {
    score -= 20;
    rulesApplied.push({
      rule: "lead_time",
      result: "FAIL",
      detail: "Requested timeline under 14 days is not feasible for custom knitwear export manufacturing",
    });
  }

  // Final Tier Assignment
  let tier: QualificationTier = "YELLOW";
  let tierLabel = "Manual Review Queue";
  let reason = "Enquiry meets basic parameters but requires merchandising assessment.";
  let recommendedAction = "Queue for general merchandising desk review within 24 hours.";

  if (moqFail) {
    tier = "RED";
    tierLabel = "Auto-Filtered / Low Priority";
    reason = "Requested volume is below factory minimum order quantity (500 pcs).";
    recommendedAction = "Send automated polite response with catalog and MOQ guidelines; tag as Low Priority in CRM.";
  } else if (score >= 70 && isAboveMoq) {
    tier = "GREEN";
    tierLabel = "High Priority Export Lead";
    reason = isBusiness
      ? "Verified corporate buyer meeting high-volume export criteria."
      : "High-volume inquiry from key export territory.";
    recommendedAction = "Route immediately to Senior Export Manager; initiate high-priority WhatsApp follow-up.";
  } else if (score < 40) {
    tier = "RED";
    tierLabel = "Low Priority / Disqualified";
    reason = "Enquiry failed multiple qualification criteria.";
    recommendedAction = "Log in CRM under unassigned review queue without alerting active sales reps.";
  }

  return {
    tier,
    tierLabel,
    score: Math.max(0, Math.min(100, score)),
    isBusinessEmail: isBusiness,
    parsedQuantity: qty,
    isAboveMoq,
    rulesApplied,
    reason,
    recommendedAction,
  };
}
