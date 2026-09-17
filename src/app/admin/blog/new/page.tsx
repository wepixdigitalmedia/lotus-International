"use client";

import React from "react";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <BlogEditor isNew={true} />
    </div>
  );
}
