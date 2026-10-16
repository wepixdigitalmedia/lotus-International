import { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/blogService";
import { getAllProducts } from "@/lib/productService";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Static core routes (canonical only, excluding redirect routes like /certificates & /csr)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/private-label`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nature-polo-club`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/manufacturing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/infrastructure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sustainability`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/women-empowerment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clients`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trust`,
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic Blog Posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getPublishedBlogs();
    blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  } catch (err) {
    console.error("Error generating blog sitemap:", err);
  }

  // Dynamic Products
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Error generating product sitemap:", err);
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
