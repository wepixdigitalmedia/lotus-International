"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product, PRODUCTS } from "@/data/db";
import {
  getAllProducts,
  saveProduct,
  deleteProduct,
} from "@/lib/productService";
import {
  Shirt,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  X,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  FileSpreadsheet,
  UploadCloud,
  Loader2,
  Check,
  RefreshCw,
  Table,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Men's Crewneck",
  "Mens Polo",
  "Mens Sport",
  "Mens New",
  "Women's Sportwear",
  "Women's Sleepwear",
  "Nature Polo Club",
  "Men",
  "Women",
] as const;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"default" | "moq-low" | "moq-high">("default");

  // Single Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<string>("Men's Crewneck");
  const [formType, setFormType] = useState("");
  const [formFabric, setFormFabric] = useState("");
  const [formGsm, setFormGsm] = useState("");
  const [formMoq, setFormMoq] = useState(500);
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formFeatures, setFormFeatures] = useState("");

  // Bulk Import States
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkMode, setBulkMode] = useState<"sheet" | "csv">("sheet");
  const [bulkSheetUrl, setBulkSheetUrl] = useState(
    "https://docs.google.com/spreadsheets/d/1zAIsq_BqP3Khrnj_pxC0LAXiJT2AZJZdEgzPKlNlPxY/edit?usp=sharing"
  );
  const [bulkCsvText, setBulkCsvText] = useState("");
  const [bulkCategory, setBulkCategory] = useState<string>("Men's Crewneck");
  const [bulkParsedProducts, setBulkParsedProducts] = useState<Product[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [bulkImportProgress, setBulkImportProgress] = useState(0);
  const [bulkError, setBulkError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (e) {
      console.error("Failed to load products:", e);
      setProducts(PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("Men's Crewneck");
    setFormType("T-Shirt");
    setFormFabric("100% Combed Organic Cotton");
    setFormGsm("180 GSM");
    setFormMoq(500);
    setFormDescription("Premium knitwear crafted with fine-gauge yarn for luxury retail.");
    setFormImage("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80");
    setFormFeatures("Breathable organic jersey, Pre-shrunk finish, Reinforced collar stitch");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormType(prod.type);
    setFormFabric(prod.fabric);
    setFormGsm(prod.gsm);
    setFormMoq(prod.moq);
    setFormDescription(prod.description || "");
    setFormImage(prod.image);
    setFormFeatures(prod.features ? prod.features.join(", ") : "");
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const featuresArray = formFeatures
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const payload: Partial<Product> = {
        name: formName,
        category: formCategory,
        type: formType,
        fabric: formFabric,
        gsm: formGsm,
        moq: Number(formMoq) || 500,
        description: formDescription,
        image: formImage || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        images: formImage ? [formImage] : [],
        features: featuresArray,
        colors: editingProduct?.colors || [
          { name: "Navy", hex: "#1B2A4A" },
          { name: "White", hex: "#FFFFFF" },
        ],
        specs: editingProduct?.specs || {
          fit: "Regular",
          weave: "Pique / Single Jersey",
          dyeing: "Reactive Dyed",
          shrinkage: "< 3%",
          leadTime: "30-45 Days",
        },
      };

      await saveProduct(payload, editingProduct?.id);
      showToast(editingProduct ? "Product updated successfully" : "Product added successfully");
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      console.error("Save product error:", err);
      alert("Failed to save product: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteProduct(deleteConfirmId);
      showToast("Product deleted successfully");
      setDeleteConfirmId(null);
      loadData();
    } catch (err: any) {
      console.error("Delete product error:", err);
      alert("Failed to delete product: " + err.message);
    }
  };

  // Bulk parse sheet / csv handler
  const handleParseBulkData = async () => {
    setIsParsing(true);
    setBulkError(null);
    setBulkParsedProducts([]);
    try {
      const res = await fetch("/api/admin/parse-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetUrl: bulkMode === "sheet" ? bulkSheetUrl : undefined,
          csvText: bulkMode === "csv" ? bulkCsvText : undefined,
          category: bulkCategory,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to parse spreadsheet.");
      }

      setBulkParsedProducts(data.products || []);
    } catch (err: any) {
      console.error("Bulk parse error:", err);
      setBulkError(err.message || "Failed to parse data.");
    } finally {
      setIsParsing(false);
    }
  };

  // Bulk import commit handler
  const handleCommitBulkImport = async () => {
    if (bulkParsedProducts.length === 0) return;
    setIsImporting(true);
    setBulkImportProgress(0);

    let savedCount = 0;
    try {
      for (let i = 0; i < bulkParsedProducts.length; i++) {
        const item = bulkParsedProducts[i];
        await saveProduct(item);
        savedCount++;
        setBulkImportProgress(Math.round((savedCount / bulkParsedProducts.length) * 100));
      }

      showToast(`Successfully imported ${savedCount} products into database & website!`);
      setIsBulkModalOpen(false);
      setBulkParsedProducts([]);
      await loadData();
    } catch (err: any) {
      console.error("Bulk import commit error:", err);
      alert("Error during bulk import: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  // Filter & Sort
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "moq-low") return a.moq - b.moq;
    if (sortBy === "moq-high") return b.moq - a.moq;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-400 px-4 py-3 rounded-xl border border-amber-500/30 shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Catalog Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {filteredProducts.length} items found
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            Apparel Products Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage styles, fabric blends, GSM, minimum order quantities (MOQ), and specs for international buyers.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => {
              setBulkError(null);
              setIsBulkModalOpen(true);
            }}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 font-semibold text-xs transition-colors shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-600" />
            <span>Bulk Import (Excel / Sheets)</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Product Style</span>
          </button>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? products.length
              : products.filter((p) => p.category === cat).length;
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 ${
                isActive
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-amber-700 text-amber-100" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name, fabric (e.g. Pique, French Terry) or garment type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="moq-low">MOQ: Low to High</option>
              <option value="moq-high">MOQ: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={loadData}
            title="Refresh list"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Product Table Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
            <span>Loading product catalog...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center space-y-3">
            <Shirt className="w-10 h-10 text-slate-300" />
            <p className="font-semibold text-slate-700">No products found matching your search</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-amber-700 hover:underline text-xs"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Product Style</th>
                  <th className="py-3.5 px-4">Category / Type</th>
                  <th className="py-3.5 px-4">Fabric & GSM</th>
                  <th className="py-3.5 px-4">MOQ</th>
                  <th className="py-3.5 px-4">Features & Specs</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 hover:text-amber-700 transition-colors">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            ID: {p.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-1">
                        {p.category}
                      </span>
                      <div className="text-[11px] text-slate-500">{p.type}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{p.fabric}</div>
                      <div className="text-[11px] text-amber-700 font-semibold">{p.gsm}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{p.moq.toLocaleString()} pcs</div>
                      <div className="text-[10px] text-slate-400">per colorway</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="truncate text-slate-600 text-[11px]">
                        {p.features?.join(" • ") || "Custom printing & embroidery"}
                      </div>
                      {p.specs?.fit && (
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Fit: {p.specs.fit}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link
                          href={`/products/${p.id}`}
                          target="_blank"
                          title="View on live website"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          title="Edit Product"
                          className="p-1.5 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          title="Delete Product"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bulk Import Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Bulk Import Products (Sheets / Excel / CSV)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload an entire collection directly to your catalog and database.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode selection tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setBulkMode("sheet")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  bulkMode === "sheet"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Google Sheet Sharing Link
              </button>
              <button
                type="button"
                onClick={() => setBulkMode("csv")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  bulkMode === "csv"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Paste CSV / Raw Text
              </button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assign Category
                  </label>
                  <select
                    value={bulkCategory}
                    onChange={(e: any) => setBulkCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Men's Crewneck">Men&apos;s Crewneck</option>
                    <option value="Mens Polo">Mens Polo</option>
                    <option value="Mens Sport">Mens Sport</option>
                    <option value="Mens New">Mens New</option>
                    <option value="Women's Sportwear">Women&apos;s Sportwear</option>
                    <option value="Women's Sleepwear">Women&apos;s Sleepwear</option>
                    <option value="Nature Polo Club">Nature Polo Club</option>
                    <option value="Men">Men (General)</option>
                    <option value="Women">Women (General)</option>
                  </select>
                </div>
              </div>

              {bulkMode === "sheet" ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Google Sheet URL (Ensure link sharing is set to &ldquo;Anyone with the link can view&rdquo;)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={bulkSheetUrl}
                      onChange={(e) => setBulkSheetUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/.../edit?usp=sharing"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleParseBulkData}
                      disabled={isParsing || !bulkSheetUrl}
                      className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shrink-0 flex items-center space-x-1.5"
                    >
                      {isParsing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Fetching...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Fetch &amp; Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Paste CSV Data (Header: Product Name, Image URL, Material, Fabric GSM, Design/Work, MOQ)
                  </label>
                  <textarea
                    rows={5}
                    value={bulkCsvText}
                    onChange={(e) => setBulkCsvText(e.target.value)}
                    placeholder="Product Name,Image URL,Material,Fabric GSM,Design/Work,MOQ&#10;Mens Crew Neck,https://...,100% Cotton,180 GSM,Screen Print,1000"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleParseBulkData}
                      disabled={isParsing || !bulkCsvText.trim()}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5"
                    >
                      {isParsing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Parsing...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Parse &amp; Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {bulkError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{bulkError}</span>
                </div>
              )}

              {/* Preview Table */}
              {bulkParsedProducts.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <Table className="w-4 h-4 text-emerald-600" />
                      <span>Found {bulkParsedProducts.length} Products Ready to Import</span>
                    </span>
                    <span className="text-[11px] text-slate-400">Review items below before saving</span>
                  </div>

                  <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                        <tr>
                          <th className="p-2.5">Style</th>
                          <th className="p-2.5">Fabric &amp; GSM</th>
                          <th className="p-2.5">Design / Features</th>
                          <th className="p-2.5">MOQ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bulkParsedProducts.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 flex items-center space-x-2">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-7 h-7 rounded object-cover border border-slate-200 shrink-0"
                                />
                              )}
                              <span className="font-semibold text-slate-800">{item.name}</span>
                            </td>
                            <td className="p-2.5 text-slate-600">
                              {item.fabric} <span className="text-amber-700 font-medium">({item.gsm})</span>
                            </td>
                            <td className="p-2.5 text-slate-500 truncate max-w-xs">
                              {item.features?.join(", ") || "Standard"}
                            </td>
                            <td className="p-2.5 font-bold text-slate-800">{item.moq} pcs</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Progress bar when saving */}
                  {isImporting && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Uploading to Firestore database &amp; catalog...</span>
                        <span className="font-bold">{bulkImportProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full transition-all duration-200"
                          style={{ width: `${bulkImportProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                Data will be validated, saved to Firestore, and displayed on the website.
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsBulkModalOpen(false)}
                  disabled={isImporting}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCommitBulkImport}
                  disabled={bulkParsedProducts.length === 0 || isImporting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center space-x-1.5"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Products...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Import All {bulkParsedProducts.length} Products</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? "Edit Product Style" : "Add New Product Style"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Men's Pique Polo"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e: any) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Men's Crewneck">Men&apos;s Crewneck</option>
                    <option value="Mens Polo">Mens Polo</option>
                    <option value="Mens Sport">Mens Sport</option>
                    <option value="Mens New">Mens New</option>
                    <option value="Women's Sportwear">Women&apos;s Sportwear</option>
                    <option value="Women's Sleepwear">Women&apos;s Sleepwear</option>
                    <option value="Nature Polo Club">Nature Polo Club</option>
                    <option value="Men">Men (General)</option>
                    <option value="Women">Women (General)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Garment Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="e.g. Polo Shirt, T-Shirt, Hoodie"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    value={formFabric}
                    onChange={(e) => setFormFabric(e.target.value)}
                    placeholder="e.g. 100% Combed Cotton"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GSM (Weight)
                  </label>
                  <input
                    type="text"
                    value={formGsm}
                    onChange={(e) => setFormGsm(e.target.value)}
                    placeholder="e.g. 220 GSM"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    MOQ (Pieces)
                  </label>
                  <input
                    type="number"
                    value={formMoq}
                    onChange={(e) => setFormMoq(Number(e.target.value))}
                    placeholder="500"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Image URL (ImageKit / CDN)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://ik.imagekit.io/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed buyer description, yarn specifications, export packaging..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  placeholder="e.g. Pre-shrunk, Anti-pilling, Organic dyes"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Delete Product Style?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                This action will remove the product style from the catalog.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
