import { NextResponse } from "next/server";
import * as z from "zod";
import { qualifyLead } from "@/lib/leadQualification";
import { createZohoLead } from "@/lib/zohoCrm";

const rfqSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2),
  businessType: z.string().optional(),
  website: z.string().optional(),
  leadSource: z.string().optional(),
  category: z.string().min(1),
  quantity: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(10),
  honeypot: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      fabric: z.string(),
    })
  ).optional(),
  techPackName: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Anti-spam honeypot check: if filled, quietly reject without error
    if (body.honeypot && body.honeypot.trim().length > 0) {
      console.warn("Spam honeypot triggered on /api/rfq. Submission ignored.");
      return NextResponse.json({
        success: true,
        message: "RFQ received successfully.",
        submissionId: `RFQ-SPAM-FILTERED`,
      });
    }

    const validatedData = rfqSchema.parse(body);

    // Run deterministic 3-tier lead qualification engine
    const qualification = qualifyLead({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      country: validatedData.country,
      category: validatedData.category,
      quantity: validatedData.quantity,
      timeline: validatedData.timeline,
      businessType: validatedData.businessType,
      message: validatedData.message,
      techPackAttached: Boolean(validatedData.techPackName),
      selectedProductIds: validatedData.items?.map((i) => i.id),
    });

    console.log("---- RECEIVED RFQ INQUIRY ----");
    console.log("Contact:", `${validatedData.name} (${validatedData.email}) - ${validatedData.phone || "No phone"}`);
    console.log("Company:", `${validatedData.company} [${validatedData.businessType || "Unspecified"}]`);
    console.log("Country / Website:", `${validatedData.country} | ${validatedData.website || "N/A"}`);
    console.log("Source:", validatedData.leadSource || "Website Direct");
    console.log(`Lead Qualification Tier: ${qualification.tier} (${qualification.score}/100)`);
    console.log("Action:", qualification.recommendedAction);
    console.log("Rules Audit:", JSON.stringify(qualification.rulesApplied));
    console.log("-------------------------------");

    // Automatically sync qualified lead into Zoho CRM
    const zohoResult = await createZohoLead({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      phone: validatedData.phone,
      country: validatedData.country,
      website: validatedData.website,
      businessType: validatedData.businessType,
      category: validatedData.category,
      quantity: validatedData.quantity,
      timeline: validatedData.timeline,
      message: validatedData.message,
      leadSource: validatedData.leadSource || "Website RFQ Form",
      qualification,
    });

    return NextResponse.json({
      success: true,
      message: "RFQ received successfully. Our merchandising desk will follow up in 1 business day.",
      submissionId: `RFQ-${Math.floor(100000 + Math.random() * 900000)}`,
      zohoCrm: {
        synced: zohoResult.success,
        leadId: zohoResult.leadId,
        simulated: zohoResult.simulated ?? false,
      },
      qualification: {
        tier: qualification.tier,
        tierLabel: qualification.tierLabel,
        score: qualification.score,
        reason: qualification.reason,
        recommendedAction: qualification.recommendedAction,
        isBusinessEmail: qualification.isBusinessEmail,
        isAboveMoq: qualification.isAboveMoq,
        rulesApplied: qualification.rulesApplied,
      },
    });
  } catch (error) {
    console.error("RFQ validation failed:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
