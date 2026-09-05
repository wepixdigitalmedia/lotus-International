/**
 * Lotus International - POC Lead Qualification Suite (15 Test Enquiries)
 * 
 * Run with: npx tsx scripts/testLeadQualification.ts
 */

import { qualifyLead, LeadQualificationInput, QualificationTier } from "../src/lib/leadQualification";

interface TestCase {
  id: number;
  name: string;
  categoryName: string;
  input: LeadQualificationInput;
  expectedTier: QualificationTier;
  expectedMinScore?: number;
  expectedMaxScore?: number;
}

const TEST_SUITE: TestCase[] = [
  {
    id: 1,
    name: "Tier-1 EU Wholesale Brand (Hugo Boss Sourcing)",
    categoryName: "High-Volume Target Market",
    input: {
      name: "Marcus Weber",
      email: "marcus.weber@hugoboss-sourcing.com",
      company: "Hugo Boss Group",
      country: "Germany",
      category: "Men's Classic Pique Polo",
      quantity: "5000",
      timeline: "1-3 months",
      businessType: "Brand",
      message: "Looking for OEKO-TEX certified 220 GSM pique polos for SS26 retail collection in Europe.",
      techPackAttached: true,
    },
    expectedTier: "GREEN",
    expectedMinScore: 85,
  },
  {
    id: 2,
    name: "US Streetwear Brand (Sampling / Capsule Order)",
    categoryName: "High-Value Custom Program",
    input: {
      name: "Tyler Jenkins",
      email: "tyler@kith-studio.com",
      company: "Kith Apparel",
      country: "United States",
      category: "Men's Premium Heavyweight Hoodie",
      quantity: "800",
      timeline: "Immediate",
      businessType: "Brand",
      message: "400 GSM custom fleece hoodie program with custom puff printing and neck tags.",
      techPackAttached: true,
    },
    expectedTier: "GREEN",
    expectedMinScore: 85,
  },
  {
    id: 3,
    name: "Valid UK Buyer using Free Gmail Account",
    categoryName: "Legitimate Buyer with Consumer Email",
    input: {
      name: "Sarah Jenkins",
      email: "sarah.jenkins.fashion@gmail.com",
      company: "London Studio Label",
      country: "United Kingdom",
      category: "Women's Organic Slub T-Shirt",
      quantity: "1200",
      timeline: "1-3 months",
      businessType: "Brand",
      message: "Looking for GOTS organic cotton slub tees for UK boutique launch.",
      techPackAttached: false,
    },
    expectedTier: "YELLOW",
    expectedMinScore: 55,
  },
  {
    id: 4,
    name: "Retail Shopper Wanting Single Piece",
    categoryName: "B2C Consumer / Sub-MOQ",
    input: {
      name: "Rahul Sharma",
      email: "rahul99@yahoo.com",
      company: "Self",
      country: "India",
      category: "Men's Classic Pique Polo",
      quantity: "1",
      timeline: "Immediate",
      businessType: "Individual",
      message: "Want to buy 1 black polo for personal use. What is price?",
      techPackAttached: false,
    },
    expectedTier: "RED",
    expectedMaxScore: 30,
  },
  {
    id: 5,
    name: "Restricted / Sanctioned Country (Ghana)",
    categoryName: "Compliance / Restricted List",
    input: {
      name: "Kofi Mensah",
      email: "kofi@accra-textiles.com",
      company: "Gold Coast Apparel",
      country: "Ghana",
      category: "Men's Classic Pique Polo",
      quantity: "10000",
      timeline: "1-3 months",
      businessType: "Wholesaler",
      message: "Urgent shipment of 10k polos to Tema port.",
      techPackAttached: true,
    },
    expectedTier: "RED",
    expectedMaxScore: 0,
  },
  {
    id: 6,
    name: "Restricted / Embargo Country (Syria)",
    categoryName: "Compliance / Restricted List",
    input: {
      name: "Tariq Al-Halabi",
      email: "tariq@damascus-knits.sy",
      company: "Levant Garments",
      country: "Syria",
      category: "Women's Organic Slub T-Shirt",
      quantity: "2000",
      timeline: "3-6 months",
      businessType: "Wholesaler",
      message: "Export quote request.",
      techPackAttached: false,
    },
    expectedTier: "RED",
    expectedMaxScore: 0,
  },
  {
    id: 7,
    name: "Restricted / Embargo Country (Ukraine)",
    categoryName: "Compliance / Restricted List",
    input: {
      name: "Oksana Ivanova",
      email: "oksana@kyiv-trade.ua",
      company: "Dnipro Retail",
      country: "Ukraine",
      category: "Kids' Organic Cotton Play Tee",
      quantity: "5000",
      timeline: "Immediate",
      businessType: "Retailer",
      message: "Quotation needed for organic cotton kids tees.",
      techPackAttached: false,
    },
    expectedTier: "RED",
    expectedMaxScore: 0,
  },
  {
    id: 8,
    name: "UAE Luxury Private Label / Retailer",
    categoryName: "Middle East GCC Priority Market",
    input: {
      name: "Rashid Al-Maktoum",
      email: "sourcing@dubaimall-luxury.ae",
      company: "Al-Shaya Luxury Retail",
      country: "United Arab Emirates",
      category: "Nature Polo Club Signature Polo",
      quantity: "500",
      timeline: "Immediate",
      businessType: "Retailer",
      message: "Need 500 pcs custom branded organic pique polos for Dubai boutique rollout.",
      techPackAttached: true,
    },
    expectedTier: "GREEN",
    expectedMinScore: 85,
  },
  {
    id: 9,
    name: "French Boutique Capsule Sampling Batch",
    categoryName: "Sampling & Low MOQ Program (>=10 pcs)",
    input: {
      name: "Claire Dubois",
      email: "claire@atelier-paris.fr",
      company: "Atelier Parisien",
      country: "France",
      category: "Kids' Comfort Rib Knit Romper",
      quantity: "25",
      timeline: "1-3 months",
      businessType: "Brand",
      message: "We need 25 prototype sample units across 3 colorways before committing to 3,000 unit production.",
      techPackAttached: true,
    },
    expectedTier: "GREEN",
    expectedMinScore: 70,
  },
  {
    id: 10,
    name: "Global Sourcing Agency / Buying House",
    categoryName: "Enterprise Sourcing Network",
    input: {
      name: "David Chen",
      email: "d.chen@global-sourcing-network.com",
      company: "Global Sourcing Network Ltd",
      country: "United States",
      category: "Men's Classic Pique Polo",
      quantity: "25000",
      timeline: "3-6 months",
      businessType: "Sourcing Agency",
      message: "RFP for 25k units per month across US retail client network. Sedex 4-pillar audit required.",
      techPackAttached: true,
    },
    expectedTier: "GREEN",
    expectedMinScore: 90,
  },
  {
    id: 11,
    name: "Canadian Startup with Free Outlook Email",
    categoryName: "Micro Batch with Consumer Email",
    input: {
      name: "Liam O'Connor",
      email: "liam.apparel.startup@outlook.com",
      company: "Northern Fits",
      country: "Canada",
      category: "Men's Premium Heavyweight Hoodie",
      quantity: "15",
      timeline: "Immediate",
      businessType: "Startup",
      message: "Need 15 sample hoodies for photoshoot before Kickstarter campaign.",
      techPackAttached: false,
    },
    expectedTier: "YELLOW",
    expectedMinScore: 40,
  },
  {
    id: 12,
    name: "Zero Quantity Input / Invalid Data",
    categoryName: "Edge Case & Error Handling",
    input: {
      name: "Test User",
      email: "test@company.de",
      company: "Test Corp",
      country: "Germany",
      category: "Men's Classic Pique Polo",
      quantity: "0",
      timeline: "Flexible",
      businessType: "Other",
      message: "Testing system",
      techPackAttached: false,
    },
    expectedTier: "RED",
    expectedMaxScore: 30,
  },
  {
    id: 13,
    name: "Nordic Sustainable Fashion Label",
    categoryName: "European Eco-Certification Lead",
    input: {
      name: "Astrid Lindgren",
      email: "astrid@stockholm-eco.se",
      company: "Stockholm Eco Wear AB",
      country: "Sweden",
      category: "Women's Organic Slub T-Shirt",
      quantity: "3500",
      timeline: "1-3 months",
      businessType: "Brand",
      message: "Must be 100% GOTS organic cotton and zero-discharge dyed. High priority summer collection.",
      techPackAttached: true,
    },
    expectedTier: "GREEN",
    expectedMinScore: 90,
  },
  {
    id: 14,
    name: "Australian Sportswear Wholesaler",
    categoryName: "Oceania Apparel Market",
    input: {
      name: "Jack Thompson",
      email: "jack@aussie-sportswear.com.au",
      company: "Pacific Apparel Co",
      country: "Australia",
      category: "Men's Classic Pique Polo",
      quantity: "4000",
      timeline: "3-6 months",
      businessType: "Wholesaler",
      message: "Looking for long-term contract manufacturing partner for sportswear polo lines.",
      techPackAttached: true,
    },
    expectedTier: "GREEN",
    expectedMinScore: 85,
  },
  {
    id: 15,
    name: "Irrelevant Spam / Marketing Pitch",
    categoryName: "Spam & Disqualification",
    input: {
      name: "Alexey Promo",
      email: "alexey@best-crypto-seo.xyz",
      company: "CryptoSEO Boost",
      country: "Russia",
      category: "Other",
      quantity: "100",
      timeline: "Immediate",
      businessType: "Other",
      message: "Boost your website Google ranking in 7 days! Visit our crypto exchange link here.",
      techPackAttached: false,
    },
    expectedTier: "RED",
    expectedMaxScore: 30,
  },
];

console.log("================================================================================");
console.log("       LOTUS INTERNATIONAL — PROOF OF CONCEPT (POC) QUALIFICATION SUITE        ");
console.log("                             15 TEST ENQUIRIES                                  ");
console.log("================================================================================\n");

let passedCount = 0;
let failedCount = 0;

TEST_SUITE.forEach((tc) => {
  const result = qualifyLead(tc.input);

  const tierMatch = result.tier === tc.expectedTier;
  const scoreMatch =
    (tc.expectedMinScore === undefined || result.score >= tc.expectedMinScore) &&
    (tc.expectedMaxScore === undefined || result.score <= tc.expectedMaxScore);

  const isSuccess = tierMatch && scoreMatch;

  if (isSuccess) {
    passedCount++;
  } else {
    failedCount++;
  }

  const icon = result.tier === "GREEN" ? "🟢" : result.tier === "YELLOW" ? "🟡" : "🔴";
  const statusBadge = isSuccess ? "✅ PASS" : "❌ FAIL";

  console.log(`[TEST #${tc.id}] ${tc.name} (${tc.categoryName})`);
  console.log(`  Input: ${tc.input.name} | ${tc.input.email} | ${tc.input.country} | Qty: ${tc.input.quantity}`);
  console.log(`  Result: ${icon} ${result.tier} (${result.score}/100) — Expected: ${tc.expectedTier}`);
  console.log(`  Reason: ${result.reason}`);
  console.log(`  Action: ${result.recommendedAction}`);
  console.log(`  Status: ${statusBadge}\n`);
});

console.log("================================================================================");
console.log(`  POC TEST SUMMARY: ${passedCount} / ${TEST_SUITE.length} PASSED (${Math.round((passedCount / TEST_SUITE.length) * 100)}% Accuracy)`);
console.log("================================================================================");

if (failedCount === 0) {
  console.log("\n🎉 ALL 15 QUALIFICATION SCENARIOS PASSED WITH 100% ACCURACY!");
} else {
  console.log(`\n⚠️  ${failedCount} scenario(s) require threshold fine-tuning.`);
}
