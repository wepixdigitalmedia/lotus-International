/**
 * Script to fetch products directly from all 7 tabs of the Google Sheet and generate structured Product data.
 * Usage: npx tsx scripts/syncGoogleSheetProducts.ts
 */

import * as fs from "fs";
import * as path from "path";
import { Product, ProductDepartment } from "../src/data/db";

const SPREADSHEET_ID = "1zAIsq_BqP3Khrnj_pxC0LAXiJT2AZJZdEgzPKlNlPxY";

export interface TabConfig {
  name: string;
  gid: string;
  category: string;
  department: ProductDepartment;
  defaultType?: string;
}

export const TABS: TabConfig[] = [
  {
    name: "men's crewneck",
    gid: "578776581",
    category: "Men's Crewneck",
    department: "Men",
    defaultType: "T-Shirt",
  },
  {
    name: "Mens Polo",
    gid: "1731297355",
    category: "Mens Polo",
    department: "Men",
    defaultType: "Polo Shirt",
  },
  {
    name: "Mens Sport",
    gid: "990306102",
    category: "Mens Sport",
    department: "Men",
    defaultType: "Activewear",
  },
  {
    name: "Mens New",
    gid: "2050417113",
    category: "Mens New",
    department: "Men",
    defaultType: "Apparel",
  },
  {
    name: "Women's Sportwear",
    gid: "481715423",
    category: "Women's Sportwear",
    department: "Women",
    defaultType: "Sportswear",
  },
  {
    name: "Women's Sleepwear",
    gid: "2106942905",
    category: "Women's Sleepwear",
    department: "Women",
    defaultType: "Sleepwear Set",
  },
  {
    name: "Nature Polo",
    gid: "1760599654",
    category: "Nature Polo Club",
    department: "Nature Polo Club",
    defaultType: "Polo Shirt",
  },
];

// Helper to parse CSV properly handling quotes and commas
export function parseCSVRows(csvText: string): string[][] {
  const rows: string[][] = [];
  const lines = csvText.split(/\r?\n/);
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        currentRow.push(currentField.trim());
        currentField = "";
      } else {
        currentField += char;
      }
    }

    if (insideQuotes) {
      // Line break inside a quoted field
      currentField += "\n";
    } else {
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
    }
  }

  if (currentRow.length > 0 && currentRow.some((f) => f.length > 0)) {
    rows.push(currentRow);
  }

  return rows;
}

export function cleanString(val?: string): string {
  if (!val) return "";
  return val.replace(/^["']|["']$/g, "").trim();
}

export function parseTabProducts(csvText: string, config: TabConfig): Product[] {
  const rows = parseCSVRows(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().trim());

  // Determine column indexes based on headers
  let nameIdx = headers.findIndex(
    (h) => h.includes("product") && (h.includes("name") || h.includes("style"))
  );
  if (nameIdx === -1) {
    nameIdx = headers.findIndex((h) => h === "product name" || h === "name");
  }
  if (nameIdx === -1) {
    nameIdx = headers[0] === "s.no" || headers[0] === "" ? 1 : 0;
  }

  let imageIdx = headers.findIndex(
    (h, idx) =>
      idx !== nameIdx &&
      (h.includes("image") || h.includes("url") || h.includes("photo") || (h === "" && idx > 0))
  );
  if (imageIdx === -1) {
    imageIdx = nameIdx + 1;
  }

  let materialIdx = headers.findIndex(
    (h) => h.includes("material") || (h.includes("fabric") && !h.includes("gsm") && !h.includes("weight"))
  );
  let gsmIdx = headers.findIndex(
    (h) => h.includes("gsm") || h.includes("weight")
  );
  let designIdx = headers.findIndex(
    (h) => h.includes("design") || h.includes("work") || h.includes("print") || h.includes("highlights")
  );
  let moqIdx = headers.findIndex(
    (h) => h.includes("moq") || h.includes("quantity")
  );
  let descIdx = headers.findIndex((h) => h.includes("description"));
  let fitIdx = headers.findIndex((h) => h === "fit");
  let typeIdx = headers.findIndex((h) => h === "product type" || h === "garment type");
  let featuresIdx = headers.findIndex((h) => h === "features" || h === "product highlights");

  const products: Product[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length <= nameIdx) continue;

    const productName = cleanString(row[nameIdx]);
    if (!productName || productName.toLowerCase() === "product name" || productName.toLowerCase() === "s.no") {
      continue;
    }

    // Identify image URL
    let imageUrl = imageIdx !== -1 && row[imageIdx] ? cleanString(row[imageIdx]) : "";
    if (!imageUrl || !imageUrl.startsWith("http")) {
      const urlCol = row.find((c) => c && c.startsWith("http"));
      if (urlCol) imageUrl = cleanString(urlCol);
    }

    const material = materialIdx !== -1 && row[materialIdx] ? cleanString(row[materialIdx]) : "100% Cotton";
    const gsm = gsmIdx !== -1 && row[gsmIdx] ? cleanString(row[gsmIdx]) : "180 - 200 GSM";
    const designWork = designIdx !== -1 && row[designIdx] ? cleanString(row[designIdx]) : "";
    const rawMoq = moqIdx !== -1 && row[moqIdx] ? cleanString(row[moqIdx]) : "1000";
    const explicitDesc = descIdx !== -1 && row[descIdx] ? cleanString(row[descIdx]) : "";
    const explicitFit = fitIdx !== -1 && row[fitIdx] ? cleanString(row[fitIdx]) : "";
    const explicitType = typeIdx !== -1 && row[typeIdx] ? cleanString(row[typeIdx]) : "";
    const explicitFeatures = featuresIdx !== -1 && row[featuresIdx] ? cleanString(row[featuresIdx]) : "";

    // Parse MOQ number
    const moqMatch = rawMoq.match(/\d+/);
    const moqNumber = moqMatch ? parseInt(moqMatch[0], 10) : 1000;

    const lowerName = productName.toLowerCase();
    const lowerMaterial = material.toLowerCase();
    const lowerGsm = gsm.toLowerCase();

    // Determine Garment Type
    let type = explicitType || config.defaultType || "Garment";
    if (lowerName.includes("track pant") || lowerName.includes("tracks") || lowerName.includes("jogger")) {
      type = "Track Pants";
    } else if (lowerName.includes("short")) {
      type = "Shorts";
    } else if (lowerName.includes("hoody") || lowerName.includes("hoodie") || lowerName.includes("sweatshirt")) {
      type = "Hoodies & Sweatshirts";
    } else if (lowerName.includes("sleepwear") || lowerName.includes("lounge set") || lowerName.includes("nightwear")) {
      type = "Sleepwear Set";
    } else if (lowerName.includes("night dress") || lowerName.includes("robe")) {
      type = "Night Dress";
    } else if (lowerName.includes("dress")) {
      type = "Dress";
    } else if (lowerName.includes("tank")) {
      type = "Tank Top";
    } else if (lowerName.includes("vest")) {
      type = "Active Vest";
    } else if (lowerName.includes("top")) {
      type = "Active Top";
    } else if (lowerName.includes("polo")) {
      type = "Polo Shirt";
    } else if (lowerName.includes("crew neck") || lowerName.includes("t shirt") || lowerName.includes("t-shirt") || lowerName.includes("tee")) {
      type = "T-Shirt";
    }

    // Determine Fit
    let fit = explicitFit || "Regular Fit";
    if (!explicitFit) {
      if (lowerName.includes("oversized") || lowerName.includes("baggy") || lowerName.includes("broad fit")) {
        fit = "Oversized Relaxed Fit";
      } else if (lowerName.includes("compression") || lowerName.includes("compress") || lowerName.includes("tight fit")) {
        fit = "Compression Athletic Fit";
      } else if (lowerName.includes("slim fit") || lowerName.includes("flexi fit")) {
        fit = "Slim Fit";
      } else if (lowerName.includes("boxy") || lowerName.includes("box fit")) {
        fit = "Boxy Fit";
      } else if (lowerName.includes("straight")) {
        fit = "Straight Leg Fit";
      } else if (lowerName.includes("cuffed") || lowerName.includes("jog fit")) {
        fit = "Cuffed Ankle Fit";
      } else if (lowerName.includes("club")) {
        fit = "Athletic Club Fit";
      } else if (lowerName.includes("stride")) {
        fit = "Ergonomic Stride Fit";
      }
    }

    // Build features
    const features: string[] = [];
    if (explicitFeatures) {
      explicitFeatures
        .split(/[;,]/)
        .map((f) => f.trim())
        .filter((f) => f.length > 0)
        .forEach((f) => features.push(f));
    } else if (designWork) {
      designWork
        .split(/[;,]/)
        .map((f) => f.trim())
        .filter((f) => f.length > 0)
        .forEach((f) => features.push(f));
    }
    if (features.length < 3) {
      features.push(`${material} Construction`);
      features.push(`Fabric Weight: ${gsm.includes("GSM") ? gsm : `${gsm} GSM`}`);
      features.push("Pre-shrunk, bio-washed export standard");
    }

    // Technical Description
    const description =
      explicitDesc ||
      `Export-grade ${productName.toLowerCase()} crafted from ${material} (${gsm.includes("GSM") ? gsm : `${gsm} GSM`}). Engineered with high-durability performance yarn, flexible seams, and long-lasting color fastness. Features ${designWork || "custom printing and embroidery options"}. Ideal for international private label collections.`;

    const slug = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const tabCode = config.category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 8);
    const id = `${tabCode}-${slug}-${i}`;

    const formattedGsm = gsm.includes("GSM") ? gsm : `${gsm} GSM`;

    const product: Product = {
      id,
      name: productName,
      category: config.category,
      department: config.department,
      type,
      fabric: material,
      gsm: formattedGsm,
      description,
      features,
      image: imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      images: [
        imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      ],
      colors: [
        { name: "Black Charcoal", hex: "#1A1A1A" },
        { name: "Navy Blue", hex: "#1B2A4A" },
        { name: "Pure White", hex: "#FFFFFF" },
        { name: "Heather Grey", hex: "#A8A8A8" },
      ],
      moq: moqNumber,
      tags: [
        "Export Quality",
        "B2B Supply",
        "Custom Manufacturing",
        config.category,
        config.department,
        type,
      ],
      specs: {
        fit,
        weave: lowerGsm.includes("pique") || lowerMaterial.includes("pique")
          ? "Pique Knit"
          : lowerGsm.includes("honey")
          ? "Honeycomb Knit"
          : lowerGsm.includes("rib")
          ? "Durby Rib Knit"
          : lowerGsm.includes("terry") || lowerMaterial.includes("terry")
          ? "French Terry Loopback"
          : lowerGsm.includes("fleece") || lowerMaterial.includes("fleece")
          ? "Brushed Fleece"
          : lowerGsm.includes("mesh") || lowerMaterial.includes("mesh")
          ? "Active Mesh Knit"
          : lowerMaterial.includes("interlock")
          ? "Interlock Knit"
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

export async function syncAllGoogleSheetProducts(): Promise<Product[]> {
  console.log("Fetching all 7 collection tabs from Google Sheet...");
  const allProducts: Product[] = [];
  const categoryCounts: Record<string, number> = {};

  for (const config of TABS) {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${config.gid}`;
    console.log(`Fetching tab: ${config.name} (Category: "${config.category}", Dept: "${config.department}")...`);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to fetch tab ${config.name}: ${res.statusText}`);
        continue;
      }
      const csvData = await res.text();
      const parsed = parseTabProducts(csvData, config);
      console.log(`-> Loaded ${parsed.length} products for ${config.name}`);
      categoryCounts[config.category] = parsed.length;
      allProducts.push(...parsed);
    } catch (e) {
      console.error(`Error loading tab ${config.name}:`, e);
    }
  }

  console.log(`\nTotal products collected across all tabs: ${allProducts.length}`);
  console.table(categoryCounts);

  const outputPath = path.join(__dirname, "../src/data/importedProducts.json");
  fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), "utf-8");
  console.log(`Saved updated dataset to ${outputPath}`);

  return allProducts;
}

if (require.main === module) {
  syncAllGoogleSheetProducts();
}
