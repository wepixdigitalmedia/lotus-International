import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { BlogPost, BlogFormData } from "@/types/blog";
import { INITIAL_BLOGS } from "@/data/initialBlogs";

const BLOG_COLLECTION = "blogs";

/**
 * Generate clean URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculate approximate reading time in minutes
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Fetch all published blogs for public view
 */
export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      where("published", "==", true)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return INITIAL_BLOGS.filter((b) => b.published);
    }

    const firestoreBlogs = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as BlogPost[];

    // Sort by latest publication date
    return firestoreBlogs.sort(
      (a, b) => (b.publishedAt || b.createdAt || 0) - (a.publishedAt || a.createdAt || 0)
    );
  } catch (error) {
    console.warn("Firestore fetch fallback to initial blogs:", error);
    return INITIAL_BLOGS.filter((b) => b.published);
  }
}

/**
 * Fetch single blog by slug (used for dynamic route & SEO metadata)
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      where("slug", "==", slug)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docData = snapshot.docs[0];
      return { id: docData.id, ...docData.data() } as BlogPost;
    }

    // Fallback to initial blogs
    const matched = INITIAL_BLOGS.find((b) => b.slug === slug);
    return matched || null;
  } catch (error) {
    console.warn("Firestore fetch slug fallback:", error);
    const matched = INITIAL_BLOGS.find((b) => b.slug === slug);
    return matched || null;
  }
}

/**
 * Fetch all blogs (including drafts) for admin dashboard
 */
export async function getAllBlogsForAdmin(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, BLOG_COLLECTION));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return INITIAL_BLOGS;
    }

    const firestoreBlogs = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as BlogPost[];

    return firestoreBlogs.sort(
      (a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0)
    );
  } catch (error) {
    console.warn("Firestore fetch fallback for admin:", error);
    return INITIAL_BLOGS;
  }
}

/**
 * Fetch a single blog by its unique ID
 */
export async function getBlogById(id: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, BLOG_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }

    const matched = INITIAL_BLOGS.find((b) => b.id === id);
    return matched || null;
  } catch (error) {
    console.warn("Firestore getDoc error fallback:", error);
    const matched = INITIAL_BLOGS.find((b) => b.id === id);
    return matched || null;
  }
}

/**
 * Helper to remove undefined properties recursively so Firestore setDoc does not fail
 */
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

/**
 * Create or update a blog post
 */
export async function saveBlogPost(
  formData: BlogFormData,
  existingId?: string
): Promise<string> {
  const now = Date.now();
  const id = existingId || doc(collection(db, BLOG_COLLECTION)).id;

  const rawPayload: BlogPost = {
    ...formData,
    id,
    slug: formData.slug || generateSlug(formData.title),
    readTime: calculateReadTime(formData.content),
    createdAt: (formData as any).createdAt || now,
    updatedAt: now,
    publishedAt: formData.published ? (formData.publishedAt || now) : undefined,
  };

  const cleanPayload = removeUndefined(rawPayload);

  const docRef = doc(db, BLOG_COLLECTION, id);
  await setDoc(docRef, cleanPayload, { merge: true });

  return id;
}

/**
 * Delete a blog post by ID
 */
export async function deleteBlogPost(id: string): Promise<void> {
  const docRef = doc(db, BLOG_COLLECTION, id);
  await deleteDoc(docRef);
}
