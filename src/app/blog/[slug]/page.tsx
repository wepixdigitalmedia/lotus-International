import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogService";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Send,
  Sparkles,
  ChevronRight,
  Check,
  Tag,
} from "lucide-react";

export const revalidate = 60; // ISR

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | The Lotus International",
    };
  }

  const title = blog.seoTitle || `${blog.title} | The Lotus International`;
  const description = blog.seoDescription || blog.excerpt;
  const url = blog.canonicalUrl || `https://thelotusinternational.com/blog/${blog.slug}`;
  const imageUrl = blog.ogImage || blog.coverImage;

  return {
    title,
    description,
    keywords: blog.focusKeywords?.length
      ? blog.focusKeywords.join(", ")
      : `${blog.category}, garment manufacturing, knitwear exporter, Tirupur, ${blog.tags?.join(", ")}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "The Lotus International",
      type: "article",
      publishedTime: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined,
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      authors: [blog.author.name],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.coverImageAlt || blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getPublishedBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  // JSON-LD Structured Data Schema for Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: [blog.coverImage],
    datePublished: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: blog.author.name,
      jobTitle: blog.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "The Lotus International",
      logo: {
        "@type": "ImageObject",
        url: "https://thelotusinternational.com/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thelotusinternational.com/blog/${blog.slug}`,
    },
    keywords: blog.tags?.join(", "),
    articleSection: blog.category,
  };

  const currentUrl = `https://thelotusinternational.com/blog/${blog.slug}`;
  const shareText = encodeURIComponent(`${blog.title} - The Lotus International`);

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-black/5 bg-white/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center space-x-2 text-xs text-brand-ink/60 overflow-x-auto">
            <Link href="/" className="hover:text-brand-ink transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-black/20" />
            <Link href="/blog" className="hover:text-brand-ink transition">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-black/20" />
            <Link
              href={`/blog?category=${encodeURIComponent(blog.category)}`}
              className="hover:text-brand-ink transition truncate"
            >
              {blog.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-black/20" />
            <span className="text-brand-ink font-medium truncate max-w-[200px] sm:max-w-xs">
              {blog.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-brand-ink text-brand-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-xs text-brand-ink/50 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{blog.readTime}</span>
            </span>
            <span className="text-xs text-brand-ink/50 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink tracking-tight leading-tight">
            {blog.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed font-sans font-light">
            {blog.excerpt}
          </p>

          {/* Author info & Social Share Bar */}
          <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              {blog.author.avatar && (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-black/10 shadow-xs"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-brand-ink">
                  {blog.author.name}
                </p>
                <p className="text-xs text-brand-ink/60">
                  {blog.author.role}
                </p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-brand-ink/50 font-medium mr-1">
                Share:
              </span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="w-8 h-8 rounded-full bg-white border border-black/10 text-brand-ink hover:text-blue-600 hover:border-blue-600 flex items-center justify-center transition shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X (Twitter)"
                className="w-8 h-8 rounded-full bg-white border border-black/10 text-brand-ink hover:text-black hover:border-black flex items-center justify-center transition shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share via WhatsApp"
                className="w-8 h-8 rounded-full bg-white border border-black/10 text-brand-ink hover:text-emerald-600 hover:border-emerald-600 flex items-center justify-center transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative aspect-video sm:aspect-21/9 rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-gray-100">
          <img
            src={blog.coverImage}
            alt={blog.coverImageAlt || blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        {blog.coverImageAlt && (
          <p className="text-[11px] text-brand-ink/50 text-center mt-2 italic">
            {blog.coverImageAlt}
          </p>
        )}
      </div>

      {/* Article Body Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <article className="prose prose-stone max-w-none text-brand-ink leading-relaxed space-y-6 font-sans">
          {/* Formatted Content Rendering */}
          <div className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed text-brand-ink/85 space-y-4">
            {blog.content}
          </div>
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-black/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-brand-ink/60 uppercase tracking-wider flex items-center space-x-1 mr-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Tags:</span>
              </span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-black/10 text-brand-ink text-xs px-3 py-1 rounded-full shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sourcing / Factory Call to Action Box */}
        <div className="mt-14 bg-gradient-to-br from-brand-ink to-[#15231C] text-white rounded-2xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Tirupur Knitwear Export
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              Have a Knitwear Manufacturing Project?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
              From organic cotton single jersey to custom-dyed heavyweight fleece hoodies, our team delivers complete OEM/ODM manufacturing with Sedex and GOTS compliance.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-ink font-semibold px-5 py-2.5 rounded-xl text-xs shadow-md transition flex items-center space-x-2"
              >
                <span>Request a Quote (RFQ)</span>
                <Send className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/products"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-xs border border-white/20 transition"
              >
                View Apparel Catalog
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Related Articles Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-white border-t border-black/5 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Recommended Reading
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ink mt-1">
                  Related Manufacturing Insights
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-semibold text-brand-ink hover:text-brand-gold transition flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relBlog) => (
                <article
                  key={relBlog.id}
                  className="bg-brand-bg/40 rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <Link
                    href={`/blog/${relBlog.slug}`}
                    className="relative aspect-video overflow-hidden bg-gray-100 block"
                  >
                    <img
                      src={relBlog.coverImage}
                      alt={relBlog.coverImageAlt || relBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-brand-ink text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                      {relBlog.category}
                    </div>
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <p className="text-[10px] text-gray-400 font-mono">
                        {relBlog.readTime}
                      </p>
                      <Link href={`/blog/${relBlog.slug}`}>
                        <h3 className="font-serif text-base font-bold text-brand-ink group-hover:text-brand-gold transition line-clamp-2 leading-snug">
                          {relBlog.title}
                        </h3>
                      </Link>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-gray-500">
                        {relBlog.author.name}
                      </span>
                      <Link
                        href={`/blog/${relBlog.slug}`}
                        className="font-bold text-brand-ink group-hover:text-brand-gold transition"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
