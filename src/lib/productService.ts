import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import { Product, PRODUCTS } from "@/data/db";

const PRODUCTS_COLLECTION = "products";
const LOCAL_STORAGE_KEY = "lotus_custom_products";

// Helper to sanitize undefined values before saving to Firestore
function removeUndefined<T extends Record<string, any>>(obj: T): T {
  const result: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val !== undefined) {
      if (val && typeof val === "object" && !Array.isArray(val)) {
        result[key] = removeUndefined(val);
      } else {
        result[key] = val;
      }
    }
  }
  return result;
}

function getLocalCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalCustomProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

/**
 * Fetch all products (Firestore + local overrides + defaults)
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const firestoreProducts = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Product[];

      // Merge with default products if any are missing
      const existingIds = new Set(firestoreProducts.map((p) => p.id));
      const combined = [
        ...firestoreProducts,
        ...PRODUCTS.filter((p) => !existingIds.has(p.id)),
      ];
      return combined;
    }
  } catch (error) {
    console.warn("Firestore products fetch fallback to db & localStorage:", error);
  }

  // Fallback to local custom products merged with base PRODUCTS
  const localProducts = getLocalCustomProducts();
  const localIds = new Set(localProducts.map((p) => p.id));
  const baseRemaining = PRODUCTS.filter((p) => !localIds.has(p.id));
  return [...localProducts, ...baseRemaining];
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
  } catch (error) {
    console.warn("Firestore getProduct error:", error);
  }

  // Check local overrides
  const localProducts = getLocalCustomProducts();
  const localMatch = localProducts.find((p) => p.id === id);
  if (localMatch) return localMatch;

  // Fallback to static PRODUCTS
  return PRODUCTS.find((p) => p.id === id) || null;
}

/**
 * Create or update a product
 */
export async function saveProduct(
  productData: Partial<Product>,
  existingId?: string
): Promise<string> {
  const id =
    existingId ||
    productData.id ||
    `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const fullProduct: Product = {
    id,
    name: productData.name || "Untitled Product",
    category: productData.category || "Men",
    type: productData.type || "Garment",
    fabric: productData.fabric || "Cotton",
    gsm: productData.gsm || "180 GSM",
    description: productData.description || "",
    features: productData.features || [],
    image:
      productData.image ||
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    images:
      productData.images && productData.images.length > 0
        ? productData.images
        : [
            productData.image ||
              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
          ],
    colors: productData.colors || [
      { name: "Navy", hex: "#1B2A4A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    moq: productData.moq || 500,
    tags: productData.tags || [],
    specs: productData.specs || {
      fit: "Regular",
      weave: "Pique / Single Jersey",
      dyeing: "Reactive Dyed",
      shrinkage: "< 4%",
      leadTime: "30-45 Days",
    },
  };

  const clean = removeUndefined(fullProduct);

  // Try Firestore
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await setDoc(docRef, clean, { merge: true });
  } catch (error) {
    console.warn("Firestore saveProduct fallback to localStorage:", error);
  }

  // Always update local cache as well
  const locals = getLocalCustomProducts();
  const existingIdx = locals.findIndex((p) => p.id === id);
  if (existingIdx >= 0) {
    locals[existingIdx] = fullProduct;
  } else {
    locals.unshift(fullProduct);
  }
  saveLocalCustomProducts(locals);

  return id;
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn("Firestore deleteProduct fallback to localStorage:", error);
  }

  const locals = getLocalCustomProducts().filter((p) => p.id !== id);
  saveLocalCustomProducts(locals);
}
