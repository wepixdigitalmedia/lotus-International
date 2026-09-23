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
  defaultCategory: Product["category"] = "Men's Crewneck"
): Product[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headerRow = parseCSVRow(lines[0]).map((h) => h.toLowerCase().trim());

  let nameIdx = headerRow.findIndex(
    (h) => h.includes("product") || h.includes("name") || h.includes("style")
  );
  if (nameIdx === -1) {
    nameIdx = headerRow.includes("s.no") ? 1 : 0;
  }

  let imageIdx = headerRow.findIndex(
    (h, idx) =>
      idx > nameIdx &&
      (h.includes("image") || h.includes("url") || h.includes("photo") || h === "")
  );
  if (imageIdx === -1) imageIdx = nameIdx + 1;

  let materialIdx = headerRow.findIndex(
    (h) => h.includes("material") || h.includes("fabric")
  );
  if (materialIdx === -1) materialIdx = imageIdx + 1;

  let gsmIdx = headerRow.findIndex(
    (h) => h.includes("gsm") || h.includes("weight")
  );
  if (gsmIdx === -1) gsmIdx = materialIdx + 1;

  let designIdx = headerRow.findIndex(
    (h) =>
      h.includes("design") ||
      h.includes("work") ||
      h.includes("print") ||
      h.includes("feature")
  );
  if (designIdx === -1) designIdx = gsmIdx + 1;

  let moqIdx = headerRow.findIndex(
    (h) => h.includes("moq") || h.includes("quantity")
  );
  if (moqIdx === -1) moqIdx = designIdx + 1;

  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRow(lines[i]);
    if (!row || row.length <= nameIdx) continue;

    const productName = row[nameIdx]?.replace(/^"|"$/g, "").trim();
    if (
      !productName ||
      productName.toLowerCase() === "product name" ||
      productName.toLowerCase() === "s.no"
    ) {
      continue;
    }

    const imageUrl = row[imageIdx]?.replace(/^"|"$/g, "").trim() || "";
    const material = row[materialIdx]?.replace(/^"|"$/g, "").trim() || "100% Cotton";
    const gsm = row[gsmIdx]?.replace(/^"|"$/g, "").trim() || "180 GSM";
    const designWork = row[designIdx]?.replace(/^"|"$/g, "").trim() || "";
    const rawMoq = row[moqIdx]?.replace(/^"|"$/g, "").trim() || "1000";

    const moqMatch = rawMoq.match(/\d+/);
    const moqNumber = moqMatch ? parseInt(moqMatch[0], 10) : 1000;

    const lowerName = productName.toLowerCase();
    const lowerGsm = gsm.toLowerCase();

    // Determine Garment Type
    let type = "T-Shirt";
    if (lowerName.includes("track pant") || lowerName.includes("tracks")) {
      type = "Track Pants";
    } else if (lowerName.includes("dress")) {
      type = "Sport Dress";
    } else if (lowerName.includes("tank")) {
      type = "Tank Top";
    } else if (lowerName.includes("vest")) {
      type = "Active Vest";
    } else if (lowerName.includes("top")) {
      type = "Active Top";
    } else if (lowerName.includes("polo")) {
      type = "Polo Shirt";
    } else if (lowerName.includes("hoodie") || lowerName.includes("pull over")) {
      type = "Pull Over";
    }

    // Determine Fit
    let fit = "Regular Fit";
    if (lowerName.includes("oversized") || lowerName.includes("baggy")) {
      fit = "Oversized Relaxed Fit";
    } else if (
      lowerName.includes("compression") ||
      lowerName.includes("compress") ||
      lowerName.includes("tight")
    ) {
      fit = "Compression Athletic Fit";
    } else if (lowerName.includes("slim")) {
      fit = "Slim Fit";
    } else if (lowerName.includes("boxy")) {
      fit = "Boxy Fit";
    } else if (lowerName.includes("straight")) {
      fit = "Straight Leg Fit";
    } else if (lowerName.includes("cuffed")) {
      fit = "Cuffed Ankle Fit";
    } else if (lowerName.includes("club")) {
      fit = "Athletic Club Fit";
    } else if (lowerName.includes("stride")) {
      fit = "Ergonomic Stride Fit";
    }

    const features: string[] = [];
    if (designWork) {
      designWork
        .split(/[;,]/)
        .map((f) => f.trim())
        .filter((f) => f.length > 0)
        .forEach((f) => features.push(f));
    }
    features.push(`${material} Construction`);
    features.push(`Fabric Weight: ${gsm.includes("GSM") ? gsm : `${gsm} GSM`}`);
    features.push("Pre-shrunk, bio-washed export standard");

    const description = `Export-grade ${productName.toLowerCase()} crafted from ${material} (${gsm}). Engineered for superior comfort, color fastness, and durability. Features ${designWork || "custom printing and embroidery options"}. Ideal for international private label collections.`;

    const cleanSlug = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const catPrefix = defaultCategory.toLowerCase().slice(0, 1);
    const id = `${catPrefix}-${cleanSlug}-${Date.now().toString().slice(-4)}-${i}`;

    const department: Product["department"] =
      defaultCategory.toLowerCase().includes("women")
        ? "Women"
        : defaultCategory.toLowerCase().includes("nature")
        ? "Nature Polo Club"
        : "Men";

    const product: Product = {
      id,
      name: productName,
      category: defaultCategory,
      department,
      type,
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
      tags: ["Custom Manufacturing", "Export Quality", "B2B Supply", defaultCategory],
      specs: {
        fit,
        weave: lowerGsm.includes("pique")
          ? "Pique Knit"
          : lowerGsm.includes("honey")
          ? "Honeycomb Knit"
          : lowerGsm.includes("rib")
          ? "Durby Rib Knit"
          : lowerGsm.includes("terry")
          ? "French Terry Loopback"
          : lowerGsm.includes("fleece")
          ? "Brushed Fleece"
          : lowerGsm.includes("mesh")
          ? "Active Mesh Knit"
          : "Single Jersey Knit",
        dyeing: "Reactive Low-Impact Dye / Export Standard",
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
    const { sheetUrl, csvText, category = "Men's Crewneck" } = body;

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
