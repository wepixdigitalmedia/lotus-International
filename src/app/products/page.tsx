"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, Product } from "@/data/db";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { SlidersHorizontal, RefreshCw } from "lucide-react";

const CATEGORIES = ["All", "Men", "Women", "Kids", "Nature Polo Club"];
const FABRICS = ["All", "Organic Cotton", "Combed Cotton Pique", "French Terry", "Bamboo Blend"];

function ProductsCatalogue() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);

  // Sync with search query when loaded
  useEffect(() => {
    const category = searchParams.get("category");
    if (category && CATEGORIES.includes(category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Fabric
    if (selectedFabric !== "All") {
      result = result.filter((p) =>
        p.fabric.toLowerCase().includes(selectedFabric.toLowerCase().trim())
      );
    }

    // Sorting
    if (sortBy === "moq-low") {
      result.sort((a, b) => a.moq - b.moq);
    } else if (sortBy === "moq-high") {
      result.sort((a, b) => b.moq - a.moq);
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedFabric, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedFabric("All");
    setSortBy("default");
  };

  return (
    <div className="page-transition min-h-screen pb-24 bg-brand-bg text-brand-ink">
      
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/products.jpg"
            alt="Export Knitwear & Loungewear Silhouettes"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-3">
          <ScrollReveal>
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/15 border border-brand-accent/30 px-3 py-1 rounded-full w-max">
              B2B Private Label Catalogue
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold leading-tight">
              Export Knitwear & Loungewear Silhouettes
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-xs md:text-sm text-brand-bg/85 max-w-2xl font-medium leading-relaxed">
              Browse our high-compliance base structures. All styles support custom size grids, 
              private label tagging, custom GSM fabrics, printing, and embroidery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Filter & Grid Layout */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* 1. FILTER SIDEBAR (Desktop) / TOP ROW */}
            <div className="w-full lg:w-64 shrink-0 bg-white border border-brand-light-grey/85 rounded-2xl p-6 shadow-sm lg:sticky lg:top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-brand-light-grey mb-6">
                <div className="flex items-center gap-2 font-serif-heading font-bold text-brand-ink text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                  <span>Configure Catalog</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[9px] font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accent-hover transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6 space-y-3">
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-ink">Category</h4>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? "bg-brand-accent text-brand-bg shadow-sm"
                          : "bg-brand-bg text-brand-ink border border-brand-light-grey/60 hover:bg-brand-light-grey/30"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Filter */}
              <div className="mb-6 space-y-3">
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-ink">Fabric Base</h4>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {FABRICS.map((fabric) => (
                    <button
                      key={fabric}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                        selectedFabric === fabric
                          ? "bg-brand-accent text-brand-bg shadow-sm"
                          : "bg-brand-bg text-brand-ink border border-brand-light-grey/60 hover:bg-brand-light-grey/30"
                      }`}
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort selector */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-ink">Sort Specifications</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-brand-bg text-brand-ink border border-brand-light-grey/60 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-accent"
                >
                  <option value="default">Standard Catalog</option>
                  <option value="moq-low">MOQ: Low to High</option>
                  <option value="moq-high">MOQ: High to Low</option>
                </select>
              </div>
            </div>

            {/* 2. PRODUCTS GRID */}
            <div className="flex-grow w-full">
              <div className="flex justify-between items-center mb-6">
                <p className="text-xs text-brand-grey font-medium">
                  Showing <span className="font-semibold text-brand-ink">{filteredProducts.length}</span> verified styles
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                    <ScrollReveal key={product.id}>
                      <ProductCard product={product} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-brand-light-grey rounded-2xl p-12 text-center shadow-sm">
                  <p className="text-brand-grey text-sm mb-4">No silhouettes match your selection.</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg text-xs font-semibold transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-ink">
        <div className="text-xs font-bold tracking-widest uppercase text-brand-accent animate-pulse">Loading Catalogue...</div>
      </div>
    }>
      <ProductsCatalogue />
    </Suspense>
  );
}
