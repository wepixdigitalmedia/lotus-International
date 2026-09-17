"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { getAllBlogsForAdmin } from "@/lib/blogService";
import { getAllProducts } from "@/lib/productService";
import { BlogPost } from "@/types/blog";
import { Product } from "@/data/db";
import {
  FileText,
  Shirt,
  Inbox,
  TrendingUp,
  PlusCircle,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Factory,
  Award,
  Layers,
  Edit2,
  Eye,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [loadedBlogs, loadedProducts] = await Promise.all([
          getAllBlogsForAdmin(),
          getAllProducts(),
        ]);
        setBlogs(loadedBlogs);
        setProducts(loadedProducts);
      } catch (e) {
        console.error("Failed to load dashboard data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const publishedBlogsCount = blogs.filter((b) => b.published).length;
  const draftBlogsCount = blogs.filter((b) => !b.published).length;

  const menCount = products.filter((p) => p.category === "Men").length;
  const womenCount = products.filter((p) => p.category === "Women").length;
  const kidsCount = products.filter((p) => p.category === "Kids").length;
  const poloClubCount = products.filter((p) => p.category === "Nature Polo Club").length;

  const userName = user?.displayName || user?.email?.split("@")[0] || "Administrator";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lotus Manufacturing & Content Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              Welcome back, {userName}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Control your B2B export website, manage the apparel catalog, publish SEO-optimized industry articles, and monitor inbound buyer inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-md hover:shadow-amber-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write Article</span>
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
            >
              <Shirt className="w-4 h-4 text-amber-400" />
              <span>Catalog</span>
            </Link>
          </div>
        </div>

        {/* Subtle decorative background gradient */}
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Blog Articles */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <Link
              href="/admin/blog"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Blog Articles
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {loading ? "..." : blogs.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">total posts</span>
          </div>
          <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span className="flex items-center space-x-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{publishedBlogsCount} Published</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-700 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{draftBlogsCount} Drafts</span>
            </span>
          </div>
        </div>

        {/* Card 2: Products Catalog */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Shirt className="w-5 h-5" />
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Catalog Styles
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {loading ? "..." : products.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">live garments</span>
          </div>
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 truncate">
            <span>Men ({menCount})</span>
            <span>•</span>
            <span>Women ({womenCount})</span>
            <span>•</span>
            <span>Kids ({kidsCount})</span>
          </div>
        </div>

        {/* Card 3: Buyer Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center space-x-1"
            >
              <span>Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Buyer Inquiries
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">B2B RFQ</span>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 truncate">
            Automated Zoho CRM routing & qualification
          </p>
        </div>

        {/* Card 4: Factory Capacity */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-purple-600">Tirupur Hub</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Annual Capacity
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">5.2M</span>
            <span className="text-xs text-slate-500 font-medium">pieces / year</span>
          </div>
          <div className="flex items-center space-x-1 mt-3 pt-3 border-t border-slate-100 text-xs text-emerald-700 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>Sedex, OEKO-TEX & GOTS</span>
          </div>
        </div>
      </div>

      {/* Main Split: Recent Articles & Catalog Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Articles & Quick Post Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Recent Blog Articles
                </h2>
                <p className="text-xs text-slate-500">
                  Manage articles, SEO previews, and publication status
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Post</span>
                </Link>
                <Link
                  href="/admin/blog"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  View All ({blogs.length})
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Loading articles...
              </div>
            ) : blogs.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <FileText className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-sm font-medium">No blog articles published yet</p>
                <Link
                  href="/admin/blog/new"
                  className="inline-block px-4 py-2 text-xs font-semibold text-white bg-amber-600 rounded-lg"
                >
                  Create Your First Post
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {blogs.slice(0, 4).map((post) => (
                  <div
                    key={post.id}
                    className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-xl transition-colors"
                  >
                    <div className="min-w-0 pr-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            post.published
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {post.category}
                        </span>
                      </div>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="text-sm font-semibold text-slate-900 hover:text-amber-700 transition-colors truncate block"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                        /blog/{post.slug}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Public Post"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Catalog Highlights */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Apparel Catalog Highlights
                </h2>
                <p className="text-xs text-slate-500">
                  Active styles available for private label buyers and wholesalers
                </p>
              </div>
              <Link
                href="/admin/products"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors bg-slate-50/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.fabric}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                      <span>MOQ: {item.moq} pcs</span>
                      <Link
                        href={`/products/${item.id}`}
                        target="_blank"
                        className="text-amber-600 hover:underline flex items-center space-x-0.5"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Links & Factory Stats */}
        <div className="space-y-6">
          {/* Quick Action Hub */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl border border-amber-500/20 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Admin Shortcuts</span>
            </h3>

            <div className="space-y-2">
              <Link
                href="/admin/blog/new"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-200/60 hover:border-amber-400 transition-colors group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Draft Article
                    </p>
                    <p className="text-[10px] text-slate-500">
                      With SEO meta & tags
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-200/60 hover:border-amber-400 transition-colors group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Apparel Inventory
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Edit fabrics & MOQ
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </Link>

              <Link
                href="/admin/inquiries"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-200/60 hover:border-amber-400 transition-colors group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Inbox className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Buyer RFQ Pipeline
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Review quote leads
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Plant Operational Stats */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center space-x-1.5">
              <Factory className="w-4 h-4 text-slate-600" />
              <span>Plant Operations</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Headquarters</span>
                <span className="font-semibold text-slate-900">Tirupur, India</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Compliance</span>
                <span className="font-semibold text-emerald-700">Sedex / WRAP</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Lead Time</span>
                <span className="font-semibold text-slate-900">30-45 Days</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2">
                <span className="text-slate-600 font-medium">On-Time Delivery</span>
                <span className="font-semibold text-emerald-700">99.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
