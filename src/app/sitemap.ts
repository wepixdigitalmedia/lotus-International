import { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/blogService";
import { getAllProducts } from "@/lib/productService";
import { SITE_URL } from "@/lib/seo";

// Ensure Next.js regenerates the sitemap dynamically and keeps it fresh
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

// Baseline release date for static pages to avoid misleading search engines with new Date() every request
const STATIC_CONTENT_LASTMOD = new Date("2026-10-01T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Static core routes (canonical only, excluding redirect routes like /certificates & /csr)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        "https://ik.imagekit.io/wepix/lotus%20international/banner/banner%20image%20LI%2001.webp",
      ],
    },
    {
      url: `${baseUrl}/products`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/private-label`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nature-polo-club`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/manufacturing`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/infrastructure`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sustainability`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/women-empowerment`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clients`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trust`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_CONTENT_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // Dynamic Blog Posts with cover images and actual publish/update timestamps
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getPublishedBlogs();
    blogRoutes = blogs.map((blog) => {
      const lastModTimestamp =
        blog.updatedAt || blog.publishedAt || blog.createdAt;
      const images: string[] = [];
      if (blog.coverImage) images.push(blog.coverImage);
      if (blog.ogImage && blog.ogImage !== blog.coverImage) images.push(blog.ogImage);

      return {
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: lastModTimestamp ? new Date(lastModTimestamp) : STATIC_CONTENT_LASTMOD,
        changeFrequency: "weekly",
        priority: 0.85,
        images: images.length > 0 ? images : undefined,
      };
    });
  } catch (err) {
    console.error("Error generating blog sitemap:", err);
  }

  // Dynamic Products with image gallery attachments for Google Image indexing
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((product) => {
      const rawImages = [
        product.image,
        ...(product.images || []),
      ].filter(Boolean) as string[];

      const uniqueImages = Array.from(new Set(rawImages));

      return {
        url: `${baseUrl}/products/${product.id}`,
        lastModified: (product as any).updatedAt
          ? new Date((product as any).updatedAt)
          : STATIC_CONTENT_LASTMOD,
        changeFrequency: "weekly",
        priority: 0.8,
        images: uniqueImages.length > 0 ? uniqueImages.slice(0, 5) : undefined,
      };
    });
  } catch (err) {
    console.error("Error generating product sitemap:", err);
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
