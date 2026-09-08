"use client";

import React, { useEffect, useState, use } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import BlogEditor from "@/components/admin/BlogEditor";
import { BlogPost } from "@/types/blog";
import { getBlogById } from "@/lib/blogService";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBlogById(resolvedParams.id);
        setBlog(data);
      } catch (e) {
        console.error("Failed to load blog:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg/40">
        <AdminHeader />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-ink"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-brand-bg/40">
        <AdminHeader />
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-brand-ink">Article Not Found</h2>
          <p className="text-xs text-gray-500">
            The article ID <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">{resolvedParams.id}</code> could not be found.
          </p>
          <Link
            href="/admin/blog"
            className="inline-flex items-center space-x-1.5 text-xs text-brand-ink font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg/40">
      <AdminHeader />
      <BlogEditor initialPost={blog} isNew={false} />
    </div>
  );
}
