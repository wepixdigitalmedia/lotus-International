/**
 * Lotus International - Zoho CRM Live Connection Test
 * 
 * Tests the live connection to Zoho CRM REST API v7 using credentials in .env.local
 */

import * as fs from "fs";
import * as path from "path";

// Load .env.local manually for the script
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        process.env[key] = val;
      }
    }
  });
}

import { createZohoLead } from "../src/lib/zohoCrm";
import { qualifyLead } from "../src/lib/leadQualification";

async function testConnection() {
  console.log("\n========================================================");
  console.log("  LOTUS INTERNATIONAL - ZOHO CRM LIVE CONNECTION TEST  ");
  console.log("========================================================\n");

  const sampleLead = {
    name: "Test Verification Lead",
    email: "test.buyer@lotus-international.com",
    company: "Lotus Global Verification Inc.",
    phone: "+91 9876543210",
    country: "India",
    category: "Men's Classic Pique Polo",
    quantity: "1500",
    timeline: "30-60 days",
    businessType: "Wholesale Brand",
    message: "Automated verification lead from Lotus International setup wizard.",
    leadSource: "API Verification Test",
  };

  console.log("1. Running AI Lead Qualification Matrix...");
  const qualification = qualifyLead({
    name: sampleLead.name,
    email: sampleLead.email,
    company: sampleLead.company,
    country: sampleLead.country,
    category: sampleLead.category,
    quantity: sampleLead.quantity,
    timeline: sampleLead.timeline,
    businessType: sampleLead.businessType,
  });

  console.log(`   Lead Tier:  ${qualification.tier} (${qualification.tierLabel})`);
  console.log(`   Lead Score: ${qualification.score}/100\n`);

  console.log("2. Sending Lead directly to Zoho CRM REST API v7...");
  const result = await createZohoLead({
    ...sampleLead,
    qualification,
  });

  console.log("\n--------------------------------------------------------");
  if (result.success && !result.simulated) {
    console.log("🎉 SUCCESS! Connected to live Zoho CRM!");
    console.log(`   Created Record ID: ${result.leadId}`);
    console.log(`   Message: ${result.message}`);
    console.log("\nYou can now check your Zoho CRM 'Leads' module to see this new lead!");
  } else if (result.simulated) {
    console.log("⚠️ Ran in simulation mode:", result.message);
  } else {
    console.error("❌ Failed to create Zoho lead:", result.message);
    if (result.error) console.error("   Details:", result.error);
  }
  console.log("--------------------------------------------------------\n");
}

testConnection();
