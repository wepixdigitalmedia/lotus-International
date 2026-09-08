"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BlogPost,
  BlogFormData,
  BLOG_CATEGORIES,
} from "@/types/blog";
import { generateSlug, saveBlogPost } from "@/lib/blogService";
import {
  Save,
  Eye,
  Edit3,
  Search,
  Globe,
  Tag,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Heading1,
  Heading2,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";

interface BlogEditorProps {
  initialPost?: BlogPost;
  isNew?: boolean;
}

export default function BlogEditor({ initialPost, isNew = false }: BlogEditorProps) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [autoSlug, setAutoSlug] = useState(isNew);
  const [category, setCategory] = useState(initialPost?.category || BLOG_CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage ||
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
  );
  const [coverImageAlt, setCoverImageAlt] = useState(initialPost?.coverImageAlt || "");
  const [authorName, setAuthorName] = useState(
    initialPost?.author?.name || "The Lotus International Editorial Team"
  );
  const [authorRole, setAuthorRole] = useState(
    initialPost?.author?.role || "Apparel Export & Sustainability Specialists"
  );
  const [tagsInput, setTagsInput] = useState(initialPost?.tags?.join(", ") || "");
  const [published, setPublished] = useState(initialPost?.published ?? true);
  const [featured, setFeatured] = useState(initialPost?.featured ?? false);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription || "");
  const [focusKeywords, setFocusKeywords] = useState(
    initialPost?.focusKeywords?.join(", ") || ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(initialPost?.canonicalUrl || "");

  // UI state
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle Title change & auto slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (autoSlug) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Quick markdown insertion helper
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;

    setContent(text.substring(0, start) + replacement + text.substring(end));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected.length || 4)
      );
    }, 50);
  };

  const handleSave = async (publishStatus?: boolean) => {
    if (!title.trim()) {
      setErrorMessage("Please enter an article title.");
      return;
    }
    if (!content.trim()) {
      setErrorMessage("Please enter article content.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const finalPublished = publishStatus !== undefined ? publishStatus : published;
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const keywords = focusKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const payload: BlogFormData = {
        title,
        slug: slug || generateSlug(title),
        category,
        excerpt: excerpt || content.slice(0, 160) + "...",
        content,
        coverImage,
        coverImageAlt: coverImageAlt || title,
        author: {
          name: authorName,
          role: authorRole,
        },
        tags,
        published: finalPublished,
        featured,
        readTime: "5 min read",
        seoTitle: seoTitle || `${title} | The Lotus International`,
        seoDescription: seoDescription || excerpt || title,
        focusKeywords: keywords,
        canonicalUrl: canonicalUrl || undefined,
        ogImage: coverImage,
      };

      const savedId = await saveBlogPost(payload, initialPost?.id);
      setSaveSuccess(true);
      setTimeout(() => {
        router.push("/admin/blog");
      }, 1200);
    } catch (err: any) {
      console.error("Save error:", err);
      setErrorMessage(err.message || "Failed to save blog post.");
    } finally {
      setIsSaving(false);
    }
  };

  const calculatedSeoTitle = seoTitle || (title ? `${title} | The Lotus International` : "Article Title | The Lotus International");
  const calculatedSeoDesc = seoDescription || excerpt || "Article preview and insights from The Lotus International apparel export team.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-black/5 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ink">
            {isNew ? "Create New SEO Article" : `Edit Article: ${title || "Untitled"}`}
          </h1>
          <p className="text-xs sm:text-sm text-brand-ink/60 mt-1">
            Write, optimize for search engines, and publish to Lotus International Blog.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-4 py-2 text-sm text-brand-ink/70 hover:text-brand-ink bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave(false)}
            className="px-4 py-2 text-sm text-brand-ink bg-white border border-black/10 hover:bg-gray-50 rounded-xl font-medium shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            Save as Draft
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave(true)}
            className="px-5 py-2 text-sm text-white bg-brand-ink hover:bg-black rounded-xl font-medium shadow-md hover:shadow-lg transition flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Publish Article"}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Article saved successfully! Redirecting to dashboard...</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Title & Slug Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-black/5 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-2">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. The Ultimate Guide to Sustainable Knitwear Manufacturing in Tirupur"
                className="w-full px-4 py-3 text-lg font-medium rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20 focus:border-brand-ink transition"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-brand-ink/80 uppercase tracking-wider">
                  URL Slug (Permanent Link)
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-xs text-brand-gold hover:underline"
                >
                  {autoSlug ? "Auto-generating (Click to edit)" : "Manual mode"}
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-black/10 bg-gray-50/70 overflow-hidden text-sm">
                <span className="pl-3 pr-1 text-gray-400 select-none text-xs font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  disabled={autoSlug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="sustainable-knitwear-manufacturing-guide"
                  className="w-full py-2.5 pr-4 bg-transparent focus:outline-none font-mono text-xs text-brand-ink"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-2">
                Article Excerpt / Summary
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling 1-2 sentence hook for the blog card and search previews..."
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20 focus:border-brand-ink text-sm transition"
              />
            </div>
          </div>

          {/* Content Editor with Formatting Toolbar */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${
                    activeTab === "edit"
                      ? "bg-brand-ink text-white"
                      : "text-brand-ink/60 hover:text-brand-ink bg-white border border-black/5"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${
                    activeTab === "preview"
                      ? "bg-brand-ink text-white"
                      : "text-brand-ink/60 hover:text-brand-ink bg-white border border-black/5"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>

              {activeTab === "edit" && (
                <div className="flex items-center space-x-1 text-gray-500">
                  <button
                    type="button"
                    title="Heading 2"
                    onClick={() => insertFormatting("\n## ", "\n")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <Heading1 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Heading 3"
                    onClick={() => insertFormatting("\n### ", "\n")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Bold"
                    onClick={() => insertFormatting("**", "**")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Italic"
                    onClick={() => insertFormatting("*", "*")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Bullet List"
                    onClick={() => insertFormatting("\n- ", "")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Blockquote"
                    onClick={() => insertFormatting("\n> ", "")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Code Block"
                    onClick={() => insertFormatting("\n```\n", "\n```\n")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Link"
                    onClick={() => insertFormatting("[link text](", ")")}
                    className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-6">
              {activeTab === "edit" ? (
                <textarea
                  id="content-textarea"
                  rows={18}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article in Markdown or HTML... Use ## for section headings, - for bullet points, > for callouts."
                  className="w-full px-4 py-3 font-mono text-sm leading-relaxed rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20 focus:border-brand-ink transition resize-y"
                />
              ) : (
                <div className="prose prose-stone max-w-none min-h-[400px] p-4 bg-brand-bg/30 rounded-xl">
                  {content ? (
                    <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-brand-ink/90">
                      {content}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No content written yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Google Search Result Simulator Card */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-brand-ink">
              <Search className="w-4 h-4 text-brand-gold" />
              <h3 className="font-semibold text-sm">Google Search Snippet Preview</h3>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70 font-sans space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                <span className="w-4 h-4 rounded-full bg-brand-ink/10 flex items-center justify-center text-[9px] font-bold text-brand-ink">
                  L
                </span>
                <span className="text-gray-600">The Lotus International</span>
                <span>›</span>
                <span className="text-gray-400 truncate max-w-[200px]">
                  blog › {slug || "article-slug"}
                </span>
              </div>
              <h4 className="text-blue-700 hover:underline text-base font-medium line-clamp-1 cursor-pointer">
                {calculatedSeoTitle}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {calculatedSeoDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Category & SEO Fields */}
        <div className="space-y-6">
          {/* Publishing & Visibility Settings */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-brand-ink border-b border-black/5 pb-2">
              Publishing Options
            </h3>

            {/* Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-brand-ink">Published Status</p>
                <p className="text-[11px] text-gray-500">Make visible on public blog</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Featured */}
            <div className="flex items-center justify-between pt-2 border-t border-black/5">
              <div>
                <p className="text-xs font-semibold text-brand-ink">Hero Featured</p>
                <p className="text-[11px] text-gray-500">Pin to top hero banner</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold"></div>
              </label>
            </div>

            {/* Category */}
            <div className="pt-2 border-t border-black/5">
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white text-xs font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              >
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="pt-2 border-t border-black/5">
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Tags (Comma separated)
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Organic Cotton, Tirupur, GOTS"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
                />
              </div>
            </div>
          </div>

          {/* Cover Media Card */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-brand-ink border-b border-black/5 pb-2">
              Featured Image
            </h3>
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Cover Image URL
              </label>
              <div className="relative">
                <ImageIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
                />
              </div>
            </div>

            {coverImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-black/10 bg-gray-100">
                <img
                  src={coverImage}
                  alt={coverImageAlt || "Article cover"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Image Alt Text (SEO)
              </label>
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                placeholder="Descriptive text for screen readers & Google Images"
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              />
            </div>
          </div>

          {/* Author Details Card */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-brand-ink border-b border-black/5 pb-2">
              Author Info
            </h3>
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Author Role / Title
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              />
            </div>
          </div>

          {/* Dedicated SEO Settings Card */}
          <div className="bg-white p-6 rounded-2xl border border-brand-gold/30 shadow-sm space-y-4 bg-gradient-to-br from-white to-brand-gold/5">
            <div className="flex items-center space-x-2 text-brand-ink border-b border-black/5 pb-2">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <h3 className="font-semibold text-sm">Search Engine Optimization (SEO)</h3>
            </div>

            {/* Custom Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-brand-ink/80 uppercase tracking-wider">
                  SEO Meta Title
                </label>
                <span
                  className={`text-[10px] ${
                    seoTitle.length > 60 ? "text-amber-600 font-semibold" : "text-gray-400"
                  }`}
                >
                  {seoTitle.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Leave blank to use article title"
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              />
            </div>

            {/* Custom Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-brand-ink/80 uppercase tracking-wider">
                  SEO Meta Description
                </label>
                <span
                  className={`text-[10px] ${
                    seoDescription.length > 160 ? "text-amber-600 font-semibold" : "text-gray-400"
                  }`}
                >
                  {seoDescription.length}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Leave blank to use excerpt"
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              />
            </div>

            {/* Focus Keywords */}
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Focus Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={focusKeywords}
                onChange={(e) => setFocusKeywords(e.target.value)}
                placeholder="knitwear manufacturer, private label export"
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Canonical URL (Optional)
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://thelotusinternational.com/blog/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-brand-ink/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
