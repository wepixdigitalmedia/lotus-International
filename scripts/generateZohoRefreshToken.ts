/**
 * Lotus International - Zoho CRM Token Exchange Helper
 * 
 * Usage:
 *   npx tsx scripts/generateZohoRefreshToken.ts <GRANT_CODE> [REDIRECT_URI]
 * 
 * Or if ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET are already in .env.local:
 *   npx tsx scripts/generateZohoRefreshToken.ts 1000.xxxxxxxxx
 */

import * as fs from "fs";
import * as path from "path";

function loadEnvFile(): Record<string, string> {
  const envPath = path.resolve(process.cwd(), ".env.local");
  const env: Record<string, string> = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const idx = trimmed.indexOf("=");
        if (idx !== -1) {
          const key = trimmed.substring(0, idx).trim();
          const val = trimmed.substring(idx + 1).trim();
          env[key] = val;
        }
      }
    });
  }
  return env;
}

async function main() {
  const args = process.argv.slice(2);
  const grantCode = args[0];
  const redirectUriArg = args[1];

  const env = loadEnvFile();
  const clientId = process.env.ZOHO_CLIENT_ID || env["ZOHO_CLIENT_ID"];
  const clientSecret = process.env.ZOHO_CLIENT_SECRET || env["ZOHO_CLIENT_SECRET"];
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || env["ZOHO_ACCOUNTS_URL"] || "https://accounts.zoho.in";

  console.log("\n========================================================");
  console.log("  LOTUS INTERNATIONAL - ZOHO REFRESH TOKEN GENERATOR   ");
  console.log("========================================================\n");

  if (!grantCode) {
    console.error("❌ Error: Please provide the Grant Code from the Zoho API Console.");
    console.log("\nUsage:\n  npx tsx scripts/generateZohoRefreshToken.ts <GRANT_CODE>\n");
    console.log("Example:\n  npx tsx scripts/generateZohoRefreshToken.ts 1000.a1b2c3d4e5f6...\n");
    process.exit(1);
  }

  if (!clientId || !clientSecret || clientId.includes("your_") || clientSecret.includes("your_")) {
    console.error("❌ Error: ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET must be set in .env.local first.");
    console.log("\nPlease add your Client ID and Client Secret to .env.local and run this command again.\n");
    process.exit(1);
  }

  try {
    const baseParams: Record<string, string> = {
      code: grantCode.trim(),
      client_id: clientId.trim(),
      client_secret: clientSecret.trim(),
      grant_type: "authorization_code",
    };

    if (redirectUriArg) {
      baseParams.redirect_uri = redirectUriArg.trim();
    }

    let response = await fetch(`${accountsUrl}/oauth/v2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(baseParams).toString(),
    });

    let data = await response.json();

    // If invalid_redirect_uri occurs, try with or without redirect_uri
    if (data.error === "invalid_redirect_uri" && !redirectUriArg) {
      const fallbackParams = { ...baseParams, redirect_uri: "https://api-console.zoho.in/" };
      const fallbackResp = await fetch(`${accountsUrl}/oauth/v2/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fallbackParams).toString(),
      });
      data = await fallbackResp.json();
    }

    if (data.error) {
      console.error("❌ Zoho OAuth Error:", data.error);
      if (data.error === "invalid_code") {
        console.error("👉 Tip: Grant codes expire after 10 minutes and can only be used ONCE. Please generate a fresh code in the Zoho API Console.");
      } else if (data.error === "invalid_redirect_uri") {
        console.error(`👉 Tip: The redirect URI '${redirectUriArg || "default"}' does not match the Authorized Redirect URI in your Zoho Client. Pass your exact URI as the 2nd argument:`);
        console.error(`   npx tsx scripts/generateZohoRefreshToken.ts <GRANT_CODE> <EXACT_REDIRECT_URI>`);
      }
      process.exit(1);
    }

    if (!data.refresh_token) {
      console.warn("⚠️ Warning: No refresh_token returned. Response was:", data);
      console.log("👉 Make sure when generating the code in Zoho Console you requested offline access or lead scopes.");
      process.exit(1);
    }

    console.log("✅ SUCCESS! Refresh Token Generated:\n");
    console.log(`   ZOHO_REFRESH_TOKEN=${data.refresh_token}\n`);
    console.log("--------------------------------------------------------");
    console.log("Copy and paste this into your .env.local file:");
    console.log(`ZOHO_REFRESH_TOKEN=${data.refresh_token}`);
    console.log("--------------------------------------------------------\n");

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("❌ Network or Execution Error:", errorMsg);
  }
}

main();
