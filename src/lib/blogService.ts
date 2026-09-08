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
      where("published", "==", true),
      orderBy("publishedAt", "desc")
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return INITIAL_BLOGS.filter((b) => b.published);
    }

    const firestoreBlogs = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as BlogPost[];

    return firestoreBlogs;
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
    const q = query(
      collection(db, BLOG_COLLECTION),
      orderBy("updatedAt", "desc")
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return INITIAL_BLOGS;
    }

    const firestoreBlogs = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as BlogPost[];

    return firestoreBlogs;
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
 * Create or update a blog post
 */
export async function saveBlogPost(
  formData: BlogFormData,
  existingId?: string
): Promise<string> {
  const now = Date.now();
  const id = existingId || doc(collection(db, BLOG_COLLECTION)).id;

  const postPayload: BlogPost = {
    ...formData,
    id,
    slug: formData.slug || generateSlug(formData.title),
    readTime: calculateReadTime(formData.content),
    createdAt: now,
    updatedAt: now,
    publishedAt: formData.published ? (formData.publishedAt || now) : undefined,
  };

  const docRef = doc(db, BLOG_COLLECTION, id);
  await setDoc(docRef, postPayload, { merge: true });

  return id;
}

/**
 * Delete a blog post by ID
 */
export async function deleteBlogPost(id: string): Promise<void> {
  const docRef = doc(db, BLOG_COLLECTION, id);
  await deleteDoc(docRef);
}
