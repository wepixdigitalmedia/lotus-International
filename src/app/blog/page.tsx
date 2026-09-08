import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogs } from "@/lib/blogService";
import { BLOG_CATEGORIES, BlogPost } from "@/types/blog";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Send,
  Layers,
} from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: "Garment Manufacturing & Knitwear Export Insights | The Lotus International",
  description: "Industry insights, sustainable apparel manufacturing guides, textile technology, and buyer resources from Tirupur's premier knitwear exporter.",
  keywords: "knitwear manufacturing blog, apparel export guide, Tirupur garment factory insights, sustainable textiles, organic cotton manufacturing",
  openGraph: {
    title: "Lotus International Blog | Apparel Export & Manufacturing Insights",
    description: "Expert articles on sustainable knitwear manufacturing, Tirupur apparel export, fabric GSM, and OEM/ODM private label production.",
    type: "website",
    url: "https://thelotusinternational.com/blog",
  },
  alternates: {
    canonical: "https://thelotusinternational.com/blog",
  },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category || "All";

  const allBlogs = await getPublishedBlogs();

  const filteredBlogs =
    currentCategory === "All"
      ? allBlogs
      : allBlogs.filter((b) => b.category === currentCategory);

  const featuredPost = allBlogs.find((b) => b.featured) || allBlogs[0];
  const gridPosts = filteredBlogs.filter((b) => b.id !== featuredPost?.id || currentCategory !== "All");

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Editorial Header */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-gold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lotus Knowledge Hub</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-ink tracking-tight">
            Apparel Manufacturing & <br className="hidden sm:block" />
            <span className="italic font-normal">Export Intelligence</span>
          </h1>

          <p className="max-w-2xl mx-auto text-brand-ink/70 text-sm sm:text-base leading-relaxed">
            Essential perspectives on sustainable textiles, zero-liquid discharge dyeing, private label sourcing, and knitwear engineering from Tirupur, India.
          </p>
        </div>
      </section>

      {/* Featured Hero Article (Only on All or if present) */}
      {featuredPost && currentCategory === "All" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-3xl border border-black/5 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[300px] lg:min-h-[440px]">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt || featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-ink/90 backdrop-blur-md text-brand-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                  Featured Story
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-white via-white to-brand-bg/30">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-xs text-brand-ink/60">
                    <span className="bg-brand-ink/5 text-brand-ink px-2.5 py-0.5 rounded-md font-medium">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ink hover:text-brand-gold transition line-clamp-3 leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-brand-ink/70 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {featuredPost.author.avatar && (
                      <img
                        src={featuredPost.author.avatar}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover border border-black/10"
                      />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-brand-ink">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {featuredPost.author.role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-ink hover:text-brand-gold transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 space-x-2 scrollbar-none">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              currentCategory === "All"
                ? "bg-brand-ink text-white shadow-md"
                : "bg-white text-brand-ink/70 hover:text-brand-ink border border-black/5 hover:bg-gray-50"
            }`}
          >
            All Insights ({allBlogs.length})
          </Link>
          {BLOG_CATEGORIES.map((cat) => {
            const count = allBlogs.filter((b) => b.category === cat).length;
            if (count === 0 && currentCategory !== cat) return null;
            return (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  currentCategory === cat
                    ? "bg-brand-ink text-white shadow-md"
                    : "bg-white text-brand-ink/70 hover:text-brand-ink border border-black/5 hover:bg-gray-50"
                }`}
              >
                {cat} ({count})
              </Link>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {gridPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-black/5 shadow-sm space-y-3">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-brand-ink">
              No articles in this category yet
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We are frequently publishing new factory guides and supply chain insights. Check back shortly.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-2 text-xs font-semibold text-brand-gold hover:underline"
            >
              ← View all articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="relative aspect-video overflow-hidden bg-gray-100 block"
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.coverImageAlt || blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-brand-ink text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {blog.category}
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-2 text-[11px] text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </span>
                      {blog.tags && blog.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="truncate">{blog.tags[0]}</span>
                        </>
                      )}
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h3 className="font-serif text-xl font-bold text-brand-ink group-hover:text-brand-gold transition line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-brand-ink/70 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-brand-ink/60">
                      {blog.author.name}
                    </span>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-ink group-hover:text-brand-gold transition"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Sourcing / Buyer CTA Card */}
        <div className="mt-16 bg-gradient-to-r from-brand-ink via-[#1A2E26] to-brand-ink text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Partner With Lotus International
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Looking for a Sedex-Compliant Knitwear Manufacturer in Tirupur?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              We specialize in custom private-label garment export for retailers and global brands. Discuss your tech packs, MOQ requirements, and custom fabric blends with our team.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-ink font-semibold px-6 py-3 rounded-xl text-xs shadow-lg transition flex items-center space-x-2"
              >
                <span>Request a Quote (RFQ)</span>
                <Send className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/manufacturing"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-xs border border-white/20 transition"
              >
                Explore Factory Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
