import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/data/db";

// Helper to convert Google Sheet URL to direct CSV export link
function getCsvExportUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("docs.google.com") && parsed.pathname.includes("/spreadsheets/d/")) {
      const parts = parsed.pathname.split("/");
      const dIndex = parts.indexOf("d");
      if (dIndex !== -1 && parts[dIndex + 1]) {
        const sheetId = parts[dIndex + 1];
        let gid = parsed.searchParams.get("gid");
        if (!gid && parsed.hash) {
          const match = parsed.hash.match(/gid=([0-9]+)/);
          if (match) gid = match[1];
        }
        if (gid) {
          return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        }
        return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      }
    }
  } catch (e) {
    // Return original url if parsing fails
  }
  return url;
}

function parseCSVRow(rowStr: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < rowStr.length; i++) {
    const char = rowStr[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSVToProducts(
  csvText: string,
  defaultCategory: Product["category"] = "Men"
): Product[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRow(lines[i]);
    if (row.length < 2 || !row[0]) continue;

    const productName = row[0].replace(/^"|"$/g, "").trim();
    if (!productName || productName.toLowerCase() === "product name") continue;

    const imageUrl = row[1]?.replace(/^"|"$/g, "").trim() || "";
    const material = row[2]?.replace(/^"|"$/g, "").trim() || "100% Cotton";
    const gsm = row[3]?.replace(/^"|"$/g, "").trim() || "180 GSM";
    const designWork = row[4]?.replace(/^"|"$/g, "").trim() || "";
    const rawMoq = row[5]?.replace(/^"|"$/g, "").trim() || "1000";

    const moqMatch = rawMoq.match(/\d+/);
    const moqNumber = moqMatch ? parseInt(moqMatch[0], 10) : 1000;

    const features: string[] = [];
    if (designWork) {
      designWork
        .split(/[;,]/)
        .map((f) => f.trim())
        .filter((f) => f.length > 0)
        .forEach((f) => features.push(f));
    }
    features.push(`${material} Construction`);
    features.push(`Weight: ${gsm}`);
    features.push("Pre-shrunk, bio-washed export standard");

    const description = `Export-grade ${productName.toLowerCase()} crafted from ${material} (${gsm}). Engineered for superior comfort, color fastness, and durability. Features ${designWork || "custom printing and embroidery options"}. Ideal for international private label collections.`;

    const cleanSlug = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const id = `${cleanSlug}-${Date.now().toString().slice(-4)}-${i}`;

    const product: Product = {
      id,
      name: productName,
      category: defaultCategory,
      type: productName.toLowerCase().includes("hoodie")
        ? "Sweatshirt"
        : productName.toLowerCase().includes("polo")
        ? "Polo Shirt"
        : productName.toLowerCase().includes("romper")
        ? "Loungewear"
        : "T-Shirt",
      fabric: material,
      gsm: gsm.includes("GSM") ? gsm : `${gsm} GSM`,
      description,
      features,
      image: imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      images: [
        imageUrl ||
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      ],
      colors: [
        { name: "Black Charcoal", hex: "#1A1A1A" },
        { name: "Navy Blue", hex: "#1B2A4A" },
        { name: "Pure White", hex: "#FFFFFF" },
        { name: "Heather Grey", hex: "#A8A8A8" },
      ],
      moq: moqNumber,
      tags: ["Custom Manufacturing", "Export Quality", "B2B Supply"],
      specs: {
        fit: productName.toLowerCase().includes("slim")
          ? "Slim Fit"
          : productName.toLowerCase().includes("body")
          ? "Body Fit"
          : productName.toLowerCase().includes("compression")
          ? "Compression Athletic Fit"
          : "Tailored Regular Fit",
        weave: gsm.toLowerCase().includes("pique")
          ? "Pique Knit"
          : gsm.toLowerCase().includes("honey")
          ? "Honeycomb Knit"
          : "Single Jersey Knit",
        dyeing: "Reactive Low-Impact Dye / OEKO-TEX Standard",
        shrinkage: "< 3% ISO standard",
        leadTime: "30-45 Days Bulk Delivery",
      },
    };

    products.push(product);
  }

  return products;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sheetUrl, csvText, category = "Men" } = body;

    let rawCsv = csvText;

    if (sheetUrl) {
      const exportUrl = getCsvExportUrl(sheetUrl);
      const res = await fetch(exportUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      if (!res.ok) {
        return NextResponse.json(
          {
            error: `Failed to fetch Google Sheet. Please ensure 'Anyone with the link can view' is enabled. (Status: ${res.status})`,
          },
          { status: 400 }
        );
      }

      rawCsv = await res.text();
    }

    if (!rawCsv || typeof rawCsv !== "string") {
      return NextResponse.json(
        { error: "No CSV content or valid Google Sheet URL provided." },
        { status: 400 }
      );
    }

    const products = parseCSVToProducts(rawCsv, category);

    if (products.length === 0) {
      return NextResponse.json(
        {
          error:
            "No valid product rows were found. Please check that row 1 contains headers (Product Name, Image URL, Material, GSM, Design/Work, MOQ).",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    console.error("Sheet parse error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse spreadsheet data." },
      { status: 500 }
    );
  }
}
