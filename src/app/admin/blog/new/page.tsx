"use client";

import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-brand-bg/40">
      <AdminHeader />
      <BlogEditor isNew={true} />
    </div>
  );
}
