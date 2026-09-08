export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich HTML
  coverImage: string;
  coverImageAlt?: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  published: boolean;
  featured?: boolean;
  readTime: string; // e.g. "5 min read"
  createdAt: number; // timestamp ms
  updatedAt: number; // timestamp ms
  publishedAt?: number; // timestamp ms

  // SEO Specific Fields
  seoTitle?: string;
  seoDescription?: string;
  focusKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export type BlogFormData = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;

export const BLOG_CATEGORIES = [
  "Sustainable Manufacturing",
  "Knitwear & Fabric Tech",
  "Private Label & Export",
  "Industry Trends",
  "Compliance & Quality",
  "Factory Insights",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
