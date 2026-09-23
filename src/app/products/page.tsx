"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS, Product, ProductCategory, ProductDepartment } from "@/data/db";
import { getAllProducts } from "@/lib/productService";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import {
  SlidersHorizontal,
  RefreshCw,
  Search,
  X,
  ChevronDown,
  Filter,
  Check,
  Layers,
  Sparkles,
  ArrowUpDown,
  Scissors,
  Scale,
  ShoppingBag,
} from "lucide-react";

// Department / Division definitions
const DEPARTMENTS: { label: string; value: string }[] = [
  { label: "All Collections", value: "All" },
  { label: "Men's Apparel", value: "Men" },
  { label: "Women's Apparel", value: "Women" },
  { label: "Nature Polo Club", value: "Nature Polo Club" },
];

// All exact categories with user-friendly display titles
const CATEGORIES: { label: string; value: string; department: string }[] = [
  { label: "All Categories", value: "All", department: "All" },
  { label: "Men's Crewneck & Tees", value: "Men's Crewneck", department: "Men" },
  { label: "Mens Polo Shirts", value: "Mens Polo", department: "Men" },
  { label: "Mens Sport & Active", value: "Mens Sport", department: "Men" },
  { label: "Mens New Arrivals", value: "Mens New", department: "Men" },
  { label: "Women's Sportwear", value: "Women's Sportwear", department: "Women" },
  { label: "Women's Sleepwear & Lounge", value: "Women's Sleepwear", department: "Women" },
  { label: "Nature Polo Club", value: "Nature Polo Club", department: "Nature Polo Club" },
];

// Garment Types in catalog
const GARMENT_TYPES = [
  "All",
  "T-Shirt",
  "Polo Shirt",
  "Activewear",
  "Sleepwear Set",
  "Night Dress",
  "Track Pants",
  "Shorts",
  "Hoodies & Sweatshirts",
];

// Key Fabric compositions for B2B buyers
const FABRIC_FILTERS = [
  { label: "All Fabrics", value: "All" },
  { label: "100% Cotton / Combed", value: "100% Cotton" },
  { label: "Cotton Jersey", value: "Cotton Jersey" },
  { label: "Pique Knit", value: "Pique" },
  { label: "Polyester / Dry-Fit", value: "Polyester" },
  { label: "Spandex / Elastane Blend", value: "Spandex" },
  { label: "Viscose / Modal Blend", value: "Viscose" },
  { label: "Fleece & French Terry", value: "Terry" },
];

// GSM Ranges
const GSM_RANGES = [
  { label: "All Weights", value: "All" },
  { label: "Lightweight (< 180 GSM)", value: "light" },
  { label: "Midweight (180 - 220 GSM)", value: "mid" },
  { label: "Heavyweight (> 220 GSM)", value: "heavy" },
];

// MOQ Ranges
const MOQ_OPTIONS = [
  { label: "All Quantities", value: "All" },
  { label: "Low MOQ (≤ 500 pcs)", value: "low" },
  { label: "Export Standard (1000+ pcs)", value: "standard" },
];

function extractGsmNumber(gsmStr: string): number {
  const match = gsmStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 180;
}

function ProductsCatalogue() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedFabric, setSelectedFabric] = useState<string>("All");
  const [selectedGsmRange, setSelectedGsmRange] = useState<string>("All");
  const [selectedMoq, setSelectedMoq] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");

  // Mobile drawer filter state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Load from database / sync
  useEffect(() => {
    getAllProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setAllProducts(data);
        }
      })
      .catch((e) => console.warn("Failed to load products from service:", e));
  }, []);

  // Sync with URL Search Params on mount or change
  useEffect(() => {
    const catParam = searchParams.get("category");
    const deptParam = searchParams.get("department");

    if (deptParam && ["Men", "Women", "Nature Polo Club"].includes(deptParam)) {
      setSelectedDepartment(deptParam);
    }

    if (catParam) {
      if (catParam === "Men" || catParam === "Women" || catParam === "Nature Polo Club") {
        setSelectedDepartment(catParam);
        setSelectedCategory("All");
      } else {
        const found = CATEGORIES.find(
          (c) =>
            c.value.toLowerCase() === catParam.toLowerCase() ||
            c.label.toLowerCase() === catParam.toLowerCase()
        );
        if (found) {
          setSelectedCategory(found.value);
          if (found.department !== "All") {
            setSelectedDepartment(found.department);
          }
        }
      }
    }
  }, [searchParams]);

  // Compute product counts per department
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allProducts.length, Men: 0, Women: 0, "Nature Polo Club": 0 };
    allProducts.forEach((p) => {
      const dept =
        p.department ||
        (p.category?.toLowerCase().includes("women")
          ? "Women"
          : p.category?.toLowerCase().includes("nature")
          ? "Nature Polo Club"
          : "Men");
      if (counts[dept] !== undefined) {
        counts[dept]++;
      }
    });
    return counts;
  }, [allProducts]);

  // Compute product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allProducts.length };
    CATEGORIES.forEach((c) => {
      if (c.value !== "All") {
        counts[c.value] = allProducts.filter(
          (p) => p.category?.toLowerCase() === c.value.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, [allProducts]);

  // Handle department change
  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    // If selected category does not belong to new department, reset category to All
    if (dept !== "All" && selectedCategory !== "All") {
      const catObj = CATEGORIES.find((c) => c.value === selectedCategory);
      if (catObj && catObj.department !== dept && catObj.department !== "All") {
        setSelectedCategory("All");
      }
    }
  };

  // Handle category change
  const handleCategoryChange = (catValue: string) => {
    setSelectedCategory(catValue);
    if (catValue === "All") return;
    const catObj = CATEGORIES.find((c) => c.value === catValue);
    if (catObj && catObj.department !== "All") {
      setSelectedDepartment(catObj.department);
    }
  };

  // Filter products multi-dimensionally
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesFabric = p.fabric?.toLowerCase().includes(query);
        const matchesType = p.type?.toLowerCase().includes(query);
        const matchesCategory = p.category?.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        const matchesFeatures = p.features?.some((f) => f.toLowerCase().includes(query));
        const matchesGsm = p.gsm?.toLowerCase().includes(query);

        if (
          !matchesName &&
          !matchesFabric &&
          !matchesType &&
          !matchesCategory &&
          !matchesDesc &&
          !matchesFeatures &&
          !matchesGsm
        ) {
          return false;
        }
      }

      // 2. Department Filter
      if (selectedDepartment !== "All") {
        const productDept =
          p.department ||
          (p.category?.toLowerCase().includes("women")
            ? "Women"
            : p.category?.toLowerCase().includes("nature")
            ? "Nature Polo Club"
            : "Men");
        if (productDept !== selectedDepartment) {
          return false;
        }
      }

      // 3. Category Filter
      if (selectedCategory !== "All") {
        if (p.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 4. Garment Type Filter
      if (selectedType !== "All") {
        if (!p.type?.toLowerCase().includes(selectedType.toLowerCase())) {
          return false;
        }
      }

      // 5. Fabric Filter
      if (selectedFabric !== "All") {
        if (!p.fabric?.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
      }

      // 6. GSM Range Filter
      if (selectedGsmRange !== "All") {
        const gsmVal = extractGsmNumber(p.gsm);
        if (selectedGsmRange === "light" && gsmVal >= 180) return false;
        if (selectedGsmRange === "mid" && (gsmVal < 180 || gsmVal > 220)) return false;
        if (selectedGsmRange === "heavy" && gsmVal <= 220) return false;
      }

      // 7. MOQ Filter
      if (selectedMoq !== "All") {
        if (selectedMoq === "low" && p.moq > 500) return false;
        if (selectedMoq === "standard" && p.moq < 1000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "moq-low") return a.moq - b.moq;
      if (sortBy === "moq-high") return b.moq - a.moq;
      if (sortBy === "gsm-low") return extractGsmNumber(a.gsm) - extractGsmNumber(b.gsm);
      if (sortBy === "gsm-high") return extractGsmNumber(b.gsm) - extractGsmNumber(a.gsm);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [
    allProducts,
    searchQuery,
    selectedDepartment,
    selectedCategory,
    selectedType,
    selectedFabric,
    selectedGsmRange,
    selectedMoq,
    sortBy,
  ]);

  // Count active filters (excluding default)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedDepartment !== "All") count++;
    if (selectedCategory !== "All") count++;
    if (selectedType !== "All") count++;
    if (selectedFabric !== "All") count++;
    if (selectedGsmRange !== "All") count++;
    if (selectedMoq !== "All") count++;
    return count;
  }, [
    searchQuery,
    selectedDepartment,
    selectedCategory,
    selectedType,
    selectedFabric,
    selectedGsmRange,
    selectedMoq,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("All");
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedFabric("All");
    setSelectedGsmRange("All");
    setSelectedMoq("All");
    setSortBy("default");
  };

  // Visible category pills based on selected department
  const visibleCategories = useMemo(() => {
    if (selectedDepartment === "All") return CATEGORIES;
    return CATEGORIES.filter(
      (c) => c.department === selectedDepartment || c.value === "All"
    );
  }, [selectedDepartment]);

  return (
    <div className="page-transition min-h-screen pb-24 bg-brand-bg text-brand-ink">
      
      {/* Header / Hero */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/products.jpg"
            alt="Lotus International Export Catalogue"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/15 border border-brand-accent/30">
              <Sparkles className="w-3 h-3" />
              <span>B2B Export & Private Label Directory</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold leading-tight">
              Export Knitwear & Loungewear Silhouettes
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <p className="text-xs md:text-sm text-brand-bg/80 max-w-2xl font-medium leading-relaxed">
              Explore 190+ export-grade base styles across Men’s, Women’s, and Sustainable lines.
              Engineered with ISO/Sedex compliance, custom dye specs, high color-fastness, and low MOQs.
            </p>
          </ScrollReveal>

          {/* Quick Department Selector Pills */}
          <ScrollReveal delay={0.2}>
            <div className="pt-2 flex flex-wrap gap-2">
              {DEPARTMENTS.map((dept) => {
                const isSelected = selectedDepartment === dept.value;
                const count = departmentCounts[dept.value] || 0;
                return (
                  <button
                    key={dept.value}
                    onClick={() => handleDepartmentChange(dept.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-brand-accent text-white shadow-md scale-102"
                        : "bg-white/10 hover:bg-white/20 text-white/90 border border-white/15 backdrop-blur-xs"
                    }`}
                  >
                    <span>{dept.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? "bg-white/25 text-white" : "bg-white/15 text-white/70"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-6">
          
          {/* Top Control Bar: Search + Category Pills + Mobile Filter Trigger */}
          <div className="bg-white border border-brand-light-grey/85 rounded-2xl p-4 md:p-5 shadow-xs space-y-4">
            
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-brand-grey absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by silhouette, fabric, GSM, style..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-brand-bg border border-brand-light-grey text-xs text-brand-ink placeholder:text-brand-grey/70 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:bg-white transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey hover:text-brand-ink cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Button & Sort */}
              <div className="flex items-center gap-2 justify-between md:justify-end">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-brand-light-grey bg-brand-bg text-xs font-bold text-brand-ink hover:bg-brand-light-grey/40 cursor-pointer shadow-2xs"
                >
                  <Filter className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-brand-accent text-white text-[9px] font-bold flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Selector */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-brand-grey hidden sm:block" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-brand-bg border border-brand-light-grey text-xs font-semibold text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent cursor-pointer"
                  >
                    <option value="default">Sort: Recommended</option>
                    <option value="moq-low">MOQ: Low to High</option>
                    <option value="moq-high">MOQ: High to Low</option>
                    <option value="gsm-low">GSM: Lightweight First</option>
                    <option value="gsm-high">GSM: Heavyweight First</option>
                    <option value="name-asc">Alphabetical (A - Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Horizontal Category Quick Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-brand-light-grey/60 pt-3">
              {visibleCategories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                const count = categoryCounts[cat.value] || 0;
                return (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-brand-ink text-brand-bg shadow-xs"
                        : "bg-brand-bg text-brand-ink/80 hover:bg-brand-light-grey/50 border border-brand-light-grey/60"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? "bg-white/20 text-brand-bg" : "bg-black/5 text-brand-grey"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 bg-white/70 backdrop-blur-xs border border-brand-light-grey/60 p-3 rounded-xl text-xs">
              <span className="text-[10px] font-bold text-brand-grey uppercase tracking-wider mr-1">
                Active Filters ({activeFiltersCount}):
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold text-[11px]">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="hover:text-brand-ink cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedDepartment !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold text-[11px]">
                  Dept: {selectedDepartment}
                  <button onClick={() => setSelectedDepartment("All")} className="hover:text-brand-ink cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold text-[11px]">
                  Category: {CATEGORIES.find((c) => c.value === selectedCategory)?.label || selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} className="hover:text-brand-ink cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedType !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold text-[11px]">
                  Type: {selectedType}
                  <button onClick={() => setSelectedType("All")} className="hover:text-brand-ink cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedFabric !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold text-[11px]">
                  Fabric: {FABRIC_FILTERS.find((f) => f.value === selectedFabric)?.label || selectedFabric}
                  <button onClick={() => setSelectedFabric("All")} className="hover:text-brand-ink cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedGsmRange !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold text-[11px]">
                  GSM: {GSM_RANGES.find((g) => g.value === selectedGsmRange)?.label}
                  <button onClick={() => setSelectedGsmRange("All")} className="hover:text-brand-ink cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedMoq !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold text-[11px]">
                  MOQ: {MOQ_OPTIONS.find((m) => m.value === selectedMoq)?.label}
                  <button onClick={() => setSelectedMoq("All")} className="hover:text-brand-ink cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="ml-auto text-[10px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Reset All
              </button>
            </div>
          )}

          {/* Main Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0 bg-white border border-brand-light-grey/85 rounded-2xl p-6 shadow-xs sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-brand-light-grey">
                <div className="flex items-center gap-2 font-serif-heading font-bold text-brand-ink text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                  <span>B2B Specification Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[9px] font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accent-hover transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Department Filter */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink block">
                  Department
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept.value}
                      onClick={() => handleDepartmentChange(dept.value)}
                      className={`px-2.5 py-1.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer truncate ${
                        selectedDepartment === dept.value
                          ? "bg-brand-accent text-white shadow-xs"
                          : "bg-brand-bg text-brand-ink hover:bg-brand-light-grey/40 border border-brand-light-grey/60"
                      }`}
                    >
                      {dept.value === "All" ? "All Divisions" : dept.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Garment Type Filter */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink flex items-center gap-1.5">
                  <Scissors className="w-3 h-3 text-brand-accent" />
                  <span>Garment Silhouette</span>
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-brand-bg text-brand-ink border border-brand-light-grey px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-accent cursor-pointer"
                >
                  {GARMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type === "All" ? "All Silhouettes" : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fabric Base Filter */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-brand-accent" />
                  <span>Fabric Composition</span>
                </label>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="w-full bg-brand-bg text-brand-ink border border-brand-light-grey px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-accent cursor-pointer"
                >
                  {FABRIC_FILTERS.map((fabric) => (
                    <option key={fabric.value} value={fabric.value}>
                      {fabric.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fabric Weight (GSM) */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink flex items-center gap-1.5">
                  <Scale className="w-3 h-3 text-brand-accent" />
                  <span>Fabric Weight (GSM)</span>
                </label>
                <div className="space-y-1">
                  {GSM_RANGES.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setSelectedGsmRange(range.value)}
                      className={`w-full px-3 py-1.5 rounded-lg text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        selectedGsmRange === range.value
                          ? "bg-brand-accent/15 text-brand-accent font-bold"
                          : "text-brand-ink hover:bg-brand-bg"
                      }`}
                    >
                      <span>{range.label}</span>
                      {selectedGsmRange === range.value && <Check className="w-3 h-3 text-brand-accent" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* MOQ Filter */}
              <div className="space-y-2.5 pt-2 border-t border-brand-light-grey/60">
                <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink flex items-center gap-1.5">
                  <ShoppingBag className="w-3 h-3 text-brand-accent" />
                  <span>Minimum Order Quantity (MOQ)</span>
                </label>
                <div className="space-y-1">
                  {MOQ_OPTIONS.map((moq) => (
                    <button
                      key={moq.value}
                      onClick={() => setSelectedMoq(moq.value)}
                      className={`w-full px-3 py-1.5 rounded-lg text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        selectedMoq === moq.value
                          ? "bg-brand-accent/15 text-brand-accent font-bold"
                          : "text-brand-ink hover:bg-brand-bg"
                      }`}
                    >
                      <span>{moq.label}</span>
                      {selectedMoq === moq.value && <Check className="w-3 h-3 text-brand-accent" />}
                    </button>
                  ))}
                </div>
              </div>

            </aside>

            {/* Products Grid Column */}
            <div className="flex-grow w-full space-y-4">
              
              {/* Product Counter / Summary */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-brand-grey font-medium">
                  Showing <span className="font-bold text-brand-ink">{filteredProducts.length}</span> of{" "}
                  <span className="font-bold text-brand-ink">{allProducts.length}</span> verified styles
                  {selectedDepartment !== "All" && ` (${selectedDepartment})`}
                </p>
                <p className="text-[11px] text-brand-grey/80 hidden sm:block">
                  All styles ready for tech-pack customization & private labeling
                </p>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                    <ScrollReveal key={product.id}>
                      <ProductCard product={product} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-brand-light-grey rounded-2xl p-12 text-center shadow-xs space-y-4">
                  <div className="w-12 h-12 rounded-full bg-brand-light-grey/40 text-brand-grey mx-auto flex items-center justify-center">
                    <Filter className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif-heading text-base font-bold text-brand-ink">
                      No silhouettes match your current filters
                    </h3>
                    <p className="text-xs text-brand-grey mt-1 max-w-sm mx-auto">
                      Try clearing some filters or searching with different keywords like &ldquo;Polo&rdquo;, &ldquo;Cotton&rdquo;, or &ldquo;Sleepwear&rdquo;.
                    </p>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-brand-ink/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-light-grey">
              <div className="flex items-center gap-2 font-serif-heading font-bold text-brand-ink text-sm">
                <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                <span>Filter Catalogue</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-brand-grey hover:text-brand-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink block">
                Department
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept.value}
                    onClick={() => handleDepartmentChange(dept.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedDepartment === dept.value
                        ? "bg-brand-accent text-white"
                        : "bg-brand-bg text-brand-ink border border-brand-light-grey/60"
                    }`}
                  >
                    {dept.value === "All" ? "All" : dept.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Garment Type */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink block">
                Garment Silhouette
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-brand-bg text-brand-ink border border-brand-light-grey px-3 py-2 rounded-xl text-xs font-semibold"
              >
                {GARMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Fabric */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink block">
                Fabric Base
              </label>
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="w-full bg-brand-bg text-brand-ink border border-brand-light-grey px-3 py-2 rounded-xl text-xs font-semibold"
              >
                {FABRIC_FILTERS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* GSM */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-brand-ink block">
                Fabric Weight (GSM)
              </label>
              <div className="space-y-1">
                {GSM_RANGES.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedGsmRange(range.value)}
                    className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between ${
                      selectedGsmRange === range.value
                        ? "bg-brand-accent/15 text-brand-accent font-bold"
                        : "text-brand-ink hover:bg-brand-bg"
                    }`}
                  >
                    <span>{range.label}</span>
                    {selectedGsmRange === range.value && <Check className="w-3.5 h-3.5 text-brand-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-brand-light-grey space-y-2 mt-auto">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-brand-accent text-white text-xs font-bold uppercase tracking-wider text-center shadow-md cursor-pointer"
              >
                Show {filteredProducts.length} Silhouettes
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2.5 rounded-xl border border-brand-light-grey text-brand-grey text-xs font-semibold text-center hover:bg-brand-bg cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-ink">
          <div className="text-xs font-bold tracking-widest uppercase text-brand-accent animate-pulse">
            Loading Export Catalogue...
          </div>
        </div>
      }
    >
      <ProductsCatalogue />
    </Suspense>
  );
}
