import { NextResponse } from "next/server";
import * as z from "zod";
import { qualifyLead } from "@/lib/leadQualification";
import { createZohoLead } from "@/lib/zohoCrm";

const consultationSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(3),
  topic: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = consultationSchema.parse(body);

    // Run qualification on consultation request
    const qualification = qualifyLead({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      country: "International (Consultation)",
      category: validatedData.topic,
      quantity: 500, // Nominal consultation default
      timeline: "Immediate / Consultation",
      message: `Consultation Booked for ${validatedData.date} at ${validatedData.time}. Service: ${validatedData.topic}. Notes: ${validatedData.notes || "None"}`,
    });

    console.log("---- RECEIVED B2B CONSULTATION BOOKING ----");
    console.log("Client:", `${validatedData.name} (${validatedData.email}) - ${validatedData.phone}`);
    console.log("Company / Topic:", `${validatedData.company} | ${validatedData.topic}`);
    console.log("Preferred Schedule:", `${validatedData.date} @ ${validatedData.time}`);
    console.log(`Lead Tier: ${qualification.tier} (${qualification.score}/100)`);
    console.log("------------------------------------------");

    // Automatically sync lead into Zoho CRM
    const zohoResult = await createZohoLead({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      phone: validatedData.phone,
      category: validatedData.topic,
      leadSource: "Website B2B Consultation",
      message: validatedData.notes,
      qualification,
      consultationDetails: {
        service: validatedData.topic,
        targetDate: validatedData.date,
        preferredTime: validatedData.time,
        notes: validatedData.notes,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Consultation booked successfully. Meeting link will be emailed shortly.",
      bookingId: `CNS-${Math.floor(100000 + Math.random() * 900000)}`,
      zohoCrm: {
        synced: zohoResult.success,
        leadId: zohoResult.leadId,
        simulated: zohoResult.simulated ?? false,
      },
    });
  } catch (error) {
    console.error("Consultation booking validation failed:", error);
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
