/**
 * Script to fetch products directly from a published Google Sheet or CSV and generate/sync structured Product data.
 * Usage: npx tsx scripts/syncGoogleSheetProducts.ts [optional_google_sheet_url_or_csv]
 */

import * as fs from "fs";
import * as path from "path";
import { Product } from "../src/data/db";

const DEFAULT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1zAIsq_BqP3Khrnj_pxC0LAXiJT2AZJZdEgzPKlNlPxY/export?format=csv";

// Helper to slugify product names with unique identifiers
function generateSlug(name: string, index: number): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${index}`;
}

export function parseCSVToProducts(csvText: string, defaultCategory: Product["category"] = "Men"): Product[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headerLine = lines[0];
  const products: Product[] = [];

  // Helper to split CSV row taking quotes into account
  const parseRow = (rowStr: string): string[] => {
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
  };

  for (let i = 1; i < lines.length; i++) {
    const row = parseRow(lines[i]);
    if (row.length < 2 || !row[0]) continue;

    const productName = row[0].replace(/^"|"$/g, "").trim();
    const imageUrl = row[1]?.replace(/^"|"$/g, "").trim() || "";
    const material = row[2]?.replace(/^"|"$/g, "").trim() || "100% Cotton";
    const gsm = row[3]?.replace(/^"|"$/g, "").trim() || "180 GSM";
    const designWork = row[4]?.replace(/^"|"$/g, "").trim() || "";
    const rawMoq = row[5]?.replace(/^"|"$/g, "").trim() || "1000";

    // Extract numerical MOQ
    const moqMatch = rawMoq.match(/\d+/);
    const moqNumber = moqMatch ? parseInt(moqMatch[0], 10) : 1000;

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
    features.push(`Weight: ${gsm}`);
    features.push("Pre-shrunk, bio-washed export standard");

    // Generate descriptive technical copy
    const description = `Export-grade ${productName.toLowerCase()} crafted from ${material} (${gsm}). Engineered for superior comfort, color fastness, and durability. Features ${designWork || "custom printing and embroidery options"}. Ideal for international private label collections.`;

    const id = generateSlug(productName, 28 - i > 0 ? 28 - i : i);

    const product: Product = {
      id,
      name: productName,
      category: defaultCategory,
      type: productName.toLowerCase().includes("hoodie")
        ? "Sweatshirt"
        : productName.toLowerCase().includes("polo")
        ? "Polo Shirt"
        : "T-Shirt",
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

async function run() {
  const targetUrl = process.argv[2] || DEFAULT_SHEET_URL;
  console.log(`Fetching sheet data from: ${targetUrl}`);

  try {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch sheet: ${res.statusText}`);
    }
    const csvData = await res.text();
    const products = parseCSVToProducts(csvData, "Men");

    console.log(`Parsed ${products.length} products successfully.`);
    console.log("Sample product:", JSON.stringify(products[0], null, 2));

    const outputPath = path.join(__dirname, "../src/data/importedProducts.json");
    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), "utf-8");
    console.log(`Saved imported products to ${outputPath}`);
  } catch (err) {
    console.error("Error executing sync script:", err);
  }
}

if (require.main === module) {
  run();
}
