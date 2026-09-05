/**
 * Zoho CRM REST API v7 Integration Client for Lotus International
 * 
 * Supports:
 * - Server-to-server OAuth 2.0 automatic token refresh and in-memory caching
 * - Pushing leads from RFQ submissions and B2B Consultation requests
 * - Full Lead Qualification tagging (🟢 GREEN, 🟡 YELLOW, 🔴 RED), scoring & audit trails
 * - Graceful fallback simulation when credentials are not yet configured in .env.local
 */

import { LeadQualificationOutput } from "./leadQualification";

export interface ZohoLeadPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  website?: string;
  businessType?: string;
  category?: string;
  quantity?: string | number;
  timeline?: string;
  message?: string;
  leadSource?: string;
  qualification?: LeadQualificationOutput;
  consultationDetails?: {
    service: string;
    targetDate: string;
    preferredTime: string;
    notes?: string;
  };
}

export interface ZohoSyncResult {
  success: boolean;
  leadId?: string;
  simulated?: boolean;
  message: string;
  error?: string;
}

// In-memory token cache
let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * Retrieves an active OAuth 2.0 access token, refreshing if expired.
 */
async function getZohoAccessToken(): Promise<string | null> {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.in";

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  // Check if current cached token is still valid (with 60s buffer)
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  try {
    const params = new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    });

    const response = await fetch(`${accountsUrl}/oauth/v2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Zoho CRM] Token refresh failed:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    if (data.access_token) {
      cachedAccessToken = data.access_token;
      const expiresInSec = data.expires_in || 3600;
      tokenExpiresAt = Date.now() + expiresInSec * 1000;
      return cachedAccessToken;
    }

    console.error("[Zoho CRM] No access token in response:", data);
    return null;
  } catch (err) {
    console.error("[Zoho CRM] Error getting access token:", err);
    return null;
  }
}

/**
 * Splits a full name into First and Last name (Zoho requires Last_Name).
 */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: "", lastName: parts[0] };
  }
  const firstName = parts.slice(0, -1).join(" ");
  const lastName = parts[parts.length - 1];
  return { firstName, lastName };
}

/**
 * Dispatches a qualified lead record directly to the Zoho CRM Leads module.
 */
export async function createZohoLead(payload: ZohoLeadPayload): Promise<ZohoSyncResult> {
  const apiDomain = process.env.ZOHO_API_DOMAIN || "https://www.zohoapis.in";
  const accessToken = await getZohoAccessToken();

  const { firstName, lastName } = splitName(payload.name);
  const qual = payload.qualification;

  // Build rich description containing full B2B details & qualification audit
  const descriptionLines = [
    `=== LOTUS INTERNATIONAL B2B INQUIRY ===`,
    `Contact Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Company: ${payload.company || "Not provided"} [${payload.businessType || "Unspecified"}]`,
    `Country: ${payload.country || "Not provided"}`,
    `Website: ${payload.website || "Not provided"}`,
    `Product Interest: ${payload.category || "General Inquiries"}`,
    `Order Quantity: ${payload.quantity || "Not specified"}`,
    `Timeline: ${payload.timeline || "Not specified"}`,
  ];

  if (payload.consultationDetails) {
    descriptionLines.push(
      ``,
      `--- B2B Consultation Details ---`,
      `Service: ${payload.consultationDetails.service}`,
      `Requested Date: ${payload.consultationDetails.targetDate}`,
      `Requested Time: ${payload.consultationDetails.preferredTime}`,
      `Notes: ${payload.consultationDetails.notes || "None"}`
    );
  }

  if (payload.message) {
    descriptionLines.push(``, `--- Buyer Message ---`, payload.message);
  }

  if (qual) {
    descriptionLines.push(
      ``,
      `--- Lead Qualification Summary ---`,
      `Tier: ${qual.tier} (${qual.tierLabel})`,
      `Score: ${qual.score}/100`,
      `Action: ${qual.recommendedAction}`,
      `Reason: ${qual.reason}`,
      `Audit Rules: ${JSON.stringify(qual.rulesApplied)}`
    );
  }

  const fullDescription = descriptionLines.join("\n");

  // Determine standard Zoho CRM Lead Status & Rating based on Qualification Tier
  let leadStatus = "New";
  let rating = "Warm";

  if (qual) {
    if (qual.tier === "GREEN") {
      leadStatus = "Qualified";
      rating = "Hot";
    } else if (qual.tier === "YELLOW") {
      leadStatus = "Attempted to Contact";
      rating = "Warm";
    } else {
      leadStatus = "Not Qualified";
      rating = "Cold";
    }
  }

  // If Zoho credentials are not yet configured in .env.local, log simulation and return success
  if (!accessToken) {
    const mockId = `ZOHO-SIM-${Date.now().toString().slice(-6)}`;
    console.log(`[Zoho CRM Simulation] Lead processed successfully:`);
    console.log(`  Lead ID: ${mockId}`);
    console.log(`  Name: ${payload.name} (${payload.email})`);
    console.log(`  Company: ${payload.company || "N/A"} [${payload.country || "N/A"}]`);
    console.log(`  Lead Tier: ${qual?.tier || "YELLOW"} | Score: ${qual?.score ?? 70}/100`);
    console.log(`  Lead Status: ${leadStatus} | Rating: ${rating}`);
    console.log(`  (To connect live Zoho CRM, add ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN to .env.local)`);

    return {
      success: true,
      leadId: mockId,
      simulated: true,
      message: "Lead qualified and processed in simulation mode (Zoho credentials pending).",
    };
  }

  // Construct Zoho CRM Lead payload
  const leadData: Record<string, string | number | boolean | undefined> = {
    First_Name: firstName,
    Last_Name: lastName,
    Email: payload.email,
    Company: payload.company || "Independent Buyer",
    Phone: payload.phone,
    Country: payload.country,
    Website: payload.website,
    Lead_Source: payload.leadSource || "Website RFQ Form",
    Description: fullDescription,
    Lead_Status: leadStatus,
    Rating: rating,
    // Custom Fields (will populate if configured in your Zoho CRM layout)
    Lead_Tier: qual?.tier,
    Lead_Score: qual?.score,
    Order_Quantity: payload.quantity ? String(payload.quantity) : undefined,
    Product_Category: payload.category,
    Target_Timeline: payload.timeline,
    Business_Type: payload.businessType,
    Qualification_Reason: qual?.reason,
  };

  // Remove undefined fields
  Object.keys(leadData).forEach((key) => {
    if (leadData[key] === undefined) {
      delete leadData[key];
    }
  });

  try {
    const crmResponse = await fetch(`${apiDomain}/crm/v7/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [leadData],
        trigger: ["workflow", "blueprint", "approval"],
      }),
    });

    const result = await crmResponse.json();

    if (!crmResponse.ok) {
      console.error("[Zoho CRM API Error]", result);
      return {
        success: false,
        message: "Zoho CRM API request failed",
        error: JSON.stringify(result),
      };
    }

    const firstItem = result.data?.[0];
    if (firstItem && firstItem.code === "SUCCESS") {
      const createdId = firstItem.details?.id;
      console.log(`[Zoho CRM] Successfully created Lead record with ID: ${createdId}`);
      return {
        success: true,
        leadId: createdId,
        message: "Lead successfully synchronized to Zoho CRM.",
      };
    }

    console.warn("[Zoho CRM] Unexpected response format:", result);
    return {
      success: false,
      message: firstItem?.message || "Failed to create lead in Zoho CRM",
      error: JSON.stringify(result),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Zoho CRM] Exception during lead creation:", errorMsg);
    return {
      success: false,
      message: "Network error communicating with Zoho CRM",
      error: errorMsg,
    };
  }
}
