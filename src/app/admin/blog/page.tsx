"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { BlogPost, BLOG_CATEGORIES } from "@/types/blog";
import {
  getAllBlogsForAdmin,
  deleteBlogPost,
  saveBlogPost,
} from "@/lib/blogService";
import {
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit2,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  Sparkles,
  AlertCircle,
  Globe,
} from "lucide-react";

export default function AdminBlogDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Published" | "Draft">("All");

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const data = await getAllBlogsForAdmin();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs for admin:", err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTogglePublish = async (blog: BlogPost) => {
    try {
      const updatedStatus = !blog.published;
      await saveBlogPost(
        {
          ...blog,
          published: updatedStatus,
          publishedAt: updatedStatus ? (blog.publishedAt || Date.now()) : undefined,
        },
        blog.id
      );

      setActionMessage(
        `Article "${blog.title.slice(0, 30)}..." marked as ${
          updatedStatus ? "Published" : "Draft"
        }.`
      );
      setTimeout(() => setActionMessage(null), 3000);
      fetchBlogs();
    } catch (err: any) {
      console.error("Toggle publish error:", err);
      alert("Failed to update status: " + err.message);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteBlogPost(deletingId);
      setActionMessage("Article successfully deleted.");
      setTimeout(() => setActionMessage(null), 3000);
      setDeleteModalOpen(false);
      setDeletingId(null);
      fetchBlogs();
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Failed to delete article: " + err.message);
    }
  };

  // Filtering
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Published" && blog.published) ||
      (statusFilter === "Draft" && !blog.published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.published).length;
  const draftCount = blogs.filter((b) => !b.published).length;

  return (
    <div className="space-y-8">
        {/* Banner with Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 bg-brand-ink text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                Content Engine & SEO Management
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
                Lotus Blog Articles
              </h1>
              <p className="text-xs text-gray-300 mt-1">
                Publish high-ranking manufacturing insights, buyer guides, and sustainability whitepapers.
              </p>
            </div>

            <div className="pt-4 mt-2">
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-ink font-semibold px-4 py-2 rounded-xl text-xs shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-ink/60 uppercase">Published</span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-brand-ink mt-3">{publishedCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">Live on website & Google index</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-ink/60 uppercase">Drafts</span>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-brand-ink mt-3">{draftCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">In progress & pending review</p>
          </div>
        </div>

        {actionMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, tag..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
            {/* Status Pills */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs">
              {(["All", "Published", "Draft"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                    statusFilter === status
                      ? "bg-white text-brand-ink shadow-xs"
                      : "text-gray-500 hover:text-brand-ink"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-black/10 bg-white text-xs text-brand-ink focus:outline-none"
            >
              <option value="All">All Categories</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          {isLoadingBlogs ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-ink mb-2"></div>
              <p className="text-xs text-gray-500">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="text-sm font-medium text-brand-ink">No articles found</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                No blog posts matched your filters. Create a new article or adjust your search.
              </p>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center space-x-1.5 text-xs text-brand-gold hover:underline font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create first article</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-brand-ink">
                <thead className="bg-gray-50 border-b border-black/5 text-[11px] font-semibold text-brand-ink/70 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Article</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">SEO Preview</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-sans">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 max-w-md">
                          {blog.coverImage && (
                            <img
                              src={blog.coverImage}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover border border-black/10 shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-brand-ink truncate">
                              {blog.title}
                            </p>
                            <p className="text-[11px] text-gray-400 font-mono truncate">
                              /blog/{blog.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-brand-ink/5 text-brand-ink px-2.5 py-1 rounded-md text-[11px] font-medium">
                          {blog.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(blog)}
                          title="Click to toggle status"
                          className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer ${
                            blog.published
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              blog.published ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          <span>{blog.published ? "Published" : "Draft"}</span>
                        </button>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 text-[11px] text-gray-500">
                          <Globe className="w-3.5 h-3.5 text-brand-gold" />
                          <span className="truncate max-w-[150px]">
                            {blog.seoTitle ? "Optimized" : "Default"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        {blog.published && (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            title="View Public Post"
                            className="p-1.5 text-gray-400 hover:text-brand-ink inline-block transition"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}

                        <Link
                          href={`/admin/blog/edit/${blog.id}`}
                          title="Edit Article"
                          className="p-1.5 text-gray-400 hover:text-brand-ink inline-block transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => {
                            setDeletingId(blog.id);
                            setDeleteModalOpen(true);
                          }}
                          title="Delete Article"
                          className="p-1.5 text-gray-400 hover:text-red-600 inline-block transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base text-brand-ink">Delete Article?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to delete this article? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeletingId(null);
                }}
                className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
