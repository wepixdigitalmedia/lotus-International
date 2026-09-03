/**
 * Client-side integration helper for Zoho SalesIQ JavaScript API
 */

declare global {
  interface Window {
    $zoho?: {
      salesiq?: {
        ready?: (callback: () => void) => void;
        visitor?: {
          name?: (name: string) => void;
          email?: (email: string) => void;
          contactnumber?: (phone: string) => void;
          info?: (data: Record<string, string | number | boolean>) => void;
        };
        customfield?: {
          add?: (fieldKey: string, fieldValue: string | number | boolean) => void;
        };
        chat?: {
          start?: () => void;
        };
        floatwindow?: {
          visible?: (state: "show" | "hide") => void;
        };
      };
    };
  }
}

/**
 * Safely passes qualified lead profile data into the Zoho SalesIQ visitor context.
 * This links their web session, chat history, and qualification tier directly in Zoho CRM.
 */
export function syncVisitorWithSalesIQ(data: {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  qualificationTier?: "GREEN" | "YELLOW" | "RED";
  orderQuantity?: string | number;
  productCategory?: string;
}) {
  if (typeof window === "undefined" || !window.$zoho?.salesiq) {
    return;
  }

  const siq = window.$zoho.salesiq;

  try {
    if (data.name && siq.visitor?.name) {
      siq.visitor.name(data.name);
    }
    if (data.email && siq.visitor?.email) {
      siq.visitor.email(data.email);
    }
    if (data.phone && siq.visitor?.contactnumber) {
      siq.visitor.contactnumber(data.phone);
    }

    // Set contextual visitor info
    const infoPayload: Record<string, string | number | boolean> = {};
    if (data.company) infoPayload["Company"] = data.company;
    if (data.country) infoPayload["Country"] = data.country;
    if (data.productCategory) infoPayload["Product_Interest"] = data.productCategory;
    if (data.orderQuantity) infoPayload["Quantity"] = String(data.orderQuantity);
    if (data.qualificationTier) infoPayload["Lead_Tier"] = data.qualificationTier;

    if (Object.keys(infoPayload).length > 0 && siq.visitor?.info) {
      siq.visitor.info(infoPayload);
    }

    // Custom fields in SalesIQ
    if (data.qualificationTier && siq.customfield?.add) {
      siq.customfield.add("Lead_Tier", data.qualificationTier);
    }
  } catch (err) {
    console.warn("Zoho SalesIQ sync error:", err);
  }
}
