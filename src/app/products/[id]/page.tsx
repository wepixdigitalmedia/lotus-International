"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/db";
import { useInquiry } from "@/components/InquiryProvider";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  FileText,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Maximize2,
  X,
  Clock,
  Layers,
  Cpu,
} from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToInquiry, isInInquiry, removeFromInquiry } = useInquiry();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "compliance" | "shipping">("specs");

  if (!product) {
    notFound();
  }

  const added = isInInquiry(product.id);
  const imagesList = product.images && product.images.length >= 3 
    ? product.images 
    : [product.image, product.image, product.image];

  const handleInquiryToggle = () => {
    if (added) {
      removeFromInquiry(product.id);
    } else {
      addToInquiry({
        id: product.id,
        name: product.name,
        category: product.category,
        fabric: product.fabric,
        image: imagesList[activeImageIndex] || product.image,
        gsm: product.gsm,
      });
    }
  };

  return (
    <div className="page-transition min-h-screen pb-24 bg-[#FAF7F2] text-brand-ink">
      
      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[88vh] aspect-[3/4] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagesList[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Top Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-brand-light-grey/60 py-3.5 mt-4 sm:mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-grey">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-brand-light-grey" />
            <Link href="/products" className="hover:text-brand-accent transition-colors">Catalogue</Link>
            <ChevronRight className="w-3 h-3 text-brand-light-grey" />
            <span className="text-brand-ink font-extrabold line-clamp-1">{product.name}</span>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent hover:text-brand-accent-hover transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Catalogue</span>
          </Link>
        </div>
      </div>

      {/* Main PDP Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Preview & Thumbnails (Cols 1 to 7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Full Viewport Preview Image (Aspect 3:4) */}
            <ScrollReveal className="relative w-full aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-brand-light-grey/80 shadow-md group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagesList[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-white/90 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest text-brand-ink px-3 py-1.5 rounded-full border border-brand-light-grey/60 shadow-xs">
                  {product.category}
                </span>
                <span className="bg-brand-ink/90 backdrop-blur-md text-[10px] font-bold text-white px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3 text-brand-accent" />
                  <span>MOQ {product.moq} Pcs</span>
                </span>
              </div>

              {/* Fullscreen Viewport Zoom Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-brand-ink shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="Expand Full Viewport"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </ScrollReveal>

            {/* Thumbnail Navigation Strip (Min 3 Images) */}
            <ScrollReveal delay={0.1} className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {imagesList.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white ${
                    activeImageIndex === index
                      ? "border-brand-accent ring-2 ring-brand-accent/30 shadow-md scale-102"
                      : "border-brand-light-grey/80 opacity-70 hover:opacity-100 hover:border-brand-accent/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`${product.name} angle ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {activeImageIndex === index && (
                    <div className="absolute inset-0 bg-brand-accent/10 border-2 border-brand-accent rounded-xl pointer-events-none" />
                  )}
                </button>
              ))}
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Sticky Product Details (Cols 8 to 12) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Header Info */}
            <ScrollReveal className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
                  {product.type} Silhouette
                </span>
                <span className="text-xs font-semibold text-brand-sage flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>OEKO-TEX Certified</span>
                </span>
              </div>

              <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-ink leading-tight">
                {product.name}
              </h1>

              {/* B2B Spec Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-brand-grey font-medium">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-brand-light-grey/70 shadow-2xs">
                  Fabric: <strong className="text-brand-ink">{product.fabric}</strong>
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-brand-light-grey/70 shadow-2xs">
                  Weight: <strong className="text-brand-accent">{product.gsm}</strong>
                </span>
              </div>
            </ScrollReveal>



            {/* Specs Summary Grid */}
            <ScrollReveal delay={0.1} className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-brand-light-grey/70 shadow-2xs">
                <span className="text-[10px] font-bold text-brand-grey uppercase tracking-wider block">Minimum Order</span>
                <span className="text-sm font-extrabold text-brand-accent mt-0.5 block">{product.moq} Pieces</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-brand-light-grey/70 shadow-2xs">
                <span className="text-[10px] font-bold text-brand-grey uppercase tracking-wider block">Lead Time</span>
                <span className="text-sm font-extrabold text-brand-ink mt-0.5 block">{product.specs?.leadTime || "30-45 Days"}</span>
              </div>
            </ScrollReveal>

            {/* Overview & Key Customization Features */}
            <ScrollReveal delay={0.15} className="space-y-3">
              <h3 className="text-xs font-bold tracking-widest uppercase text-brand-ink">
                Silhouette Overview
              </h3>
              <p className="text-xs sm:text-sm text-brand-grey leading-relaxed font-normal">
                {product.description}
              </p>

              <div className="pt-2 space-y-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-ink font-medium">
                    <span className="w-5 h-5 rounded-full bg-brand-sage/15 text-brand-sage flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal delay={0.2} className="space-y-3 pt-4 border-t border-brand-light-grey/60">
              <button
                onClick={handleInquiryToggle}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 border cursor-pointer ${
                  added
                    ? "bg-brand-sage border-brand-sage text-white"
                    : "border-brand-accent bg-brand-accent text-white hover:bg-brand-accent-hover hover:shadow-brand-accent/20"
                }`}
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>{added ? "Added to RFQ List (Click to Remove)" : "Add to RFQ List"}</span>
              </button>

              <Link
                href="/contact"
                className="w-full py-3.5 px-6 rounded-2xl bg-white border border-brand-ink/15 hover:border-brand-accent hover:text-brand-accent text-brand-ink font-bold text-xs tracking-wider uppercase text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-2xs"
              >
                <FileText className="w-4 h-4" />
                <span>Configure Custom Tech Pack</span>
              </Link>
            </ScrollReveal>

            {/* Tabbed Specs Accordion */}
            <ScrollReveal delay={0.25} className="pt-4">
              <div className="flex border-b border-brand-light-grey/80 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors ${
                    activeTab === "specs"
                      ? "border-brand-accent text-brand-accent"
                      : "border-transparent text-brand-grey hover:text-brand-ink"
                  }`}
                >
                  Tech Specs
                </button>
                <button
                  onClick={() => setActiveTab("compliance")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors ${
                    activeTab === "compliance"
                      ? "border-brand-accent text-brand-accent"
                      : "border-transparent text-brand-grey hover:text-brand-ink"
                  }`}
                >
                  Compliance
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2.5 px-3 border-b-2 transition-colors ${
                    activeTab === "shipping"
                      ? "border-brand-accent text-brand-accent"
                      : "border-transparent text-brand-grey hover:text-brand-ink"
                  }`}
                >
                  Shipping
                </button>
              </div>

              <div className="pt-4 text-xs text-brand-grey space-y-2">
                {activeTab === "specs" && (
                  <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-brand-light-grey/70">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-grey block">Fit Style</span>
                      <strong className="text-brand-ink">{product.specs?.fit || "Custom Specification"}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-grey block">Knit Weave</span>
                      <strong className="text-brand-ink">{product.specs?.weave || "Premium Knit"}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-grey block">Dye Process</span>
                      <strong className="text-brand-ink">{product.specs?.dyeing || "Reactive Dye"}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-grey block">Shrinkage</span>
                      <strong className="text-brand-ink">{product.specs?.shrinkage || "< 2%"}</strong>
                    </div>
                  </div>
                )}

                {activeTab === "compliance" && (
                  <div className="bg-white p-4 rounded-xl border border-brand-light-grey/70 space-y-2">
                    <p className="flex items-center gap-2 text-brand-ink font-semibold">
                      <Award className="w-4 h-4 text-brand-accent" />
                      <span>Sedex 4-Pillar & GOTS Certified Campus</span>
                    </p>
                    <p className="leading-relaxed">
                      All raw cotton yarns pass OEKO-TEX Standard 100 toxicity and metal tunnel safety inspection prior to garment finishing.
                    </p>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="bg-white p-4 rounded-xl border border-brand-light-grey/70 space-y-2">
                    <p className="flex items-center gap-2 text-brand-ink font-semibold">
                      <Truck className="w-4 h-4 text-brand-accent" />
                      <span>Avinashi Factory Dispatch (Tirupur)</span>
                    </p>
                    <p className="leading-relaxed">
                      Direct FOB / CIF container loading via Tuticorin, Chennai, or Cochin ports with complete export documentation.
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>

          </div>

        </div>
      </div>
    </div>
  );
}
