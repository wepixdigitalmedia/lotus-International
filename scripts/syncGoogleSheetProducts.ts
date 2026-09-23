/**
 * Script to fetch products directly from all tabs of the Google Sheet or CSV and generate/sync structured Product data.
 * Usage: npx tsx scripts/syncGoogleSheetProducts.ts
 */

import * as fs from "fs";
import * as path from "path";
import { Product } from "../src/data/db";

const SPREADSHEET_ID = "1zAIsq_BqP3Khrnj_pxC0LAXiJT2AZJZdEgzPKlNlPxY";

const TABS = [
  {
    name: "Men's Crewneck",
    gid: "578776581",
    category: "Men" as Product["category"],
  },
  {
    name: "Women's Sportwear",
    gid: "481715423",
    category: "Women" as Product["category"],
  },
];

// Helper to slugify product names with unique identifiers
function generateSlug(name: string, category: string, index: number): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const catPrefix = category.toLowerCase().slice(0, 1);
  return `${catPrefix}-${base}-${index}`;
}

// Helper to split CSV row taking quotes into account
function parseRow(rowStr: string): string[] {
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

export function parseCSVToProducts(
  csvText: string,
  defaultCategory: Product["category"] = "Men"
): Product[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headerRow = parseRow(lines[0]).map((h) => h.toLowerCase().trim());

  // Smart column mapping
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
    const row = parseRow(lines[i]);
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
    const lowerMaterial = material.toLowerCase();
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

    // Build features list
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

    // Generate technical copy
    const description = `Export-grade ${productName.toLowerCase()} crafted from ${material} (${gsm}). Engineered with high-durability performance yarn, flexible seams, and long-lasting color fastness. Features ${designWork || "custom printing and embroidery options"}. Ideal for international private label collections.`;

    const id = generateSlug(productName, defaultCategory, i);

    const product: Product = {
      id,
      name: productName,
      category: defaultCategory,
      type,
      fabric: material,
      gsm: gsm.includes("GSM") ? gsm : `${gsm} GSM`,
      description,
      features,
      image: imageUrl,
      images: [imageUrl],
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

async function run() {
  console.log("Fetching all collection tabs from Google Sheet...");
  const allProducts: Product[] = [];

  for (const tab of TABS) {
    const tabUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${tab.gid}`;
    console.log(`Fetching tab: ${tab.name} (${tabUrl})`);

    try {
      const res = await fetch(tabUrl);
      if (!res.ok) {
        console.error(`Failed to fetch tab ${tab.name}: ${res.statusText}`);
        continue;
      }
      const csvData = await res.text();
      const parsed = parseCSVToProducts(csvData, tab.category);
      console.log(`-> Loaded ${parsed.length} products for ${tab.name}`);
      allProducts.push(...parsed);
    } catch (e) {
      console.error(`Error loading tab ${tab.name}:`, e);
    }
  }

  console.log(`\nTotal products collected across all tabs: ${allProducts.length}`);

  const outputPath = path.join(__dirname, "../src/data/importedProducts.json");
  fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), "utf-8");
  console.log(`Saved updated dataset to ${outputPath}`);
}

if (require.main === module) {
  run();
}
