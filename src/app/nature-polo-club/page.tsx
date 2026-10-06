"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useInquiry } from "@/components/InquiryProvider";
import { PRODUCTS, Product } from "@/data/db";
import {
  Sparkles,
  Mail,
  Send,
  CheckCircle2,
  Leaf,
  Heart,
  Recycle,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sun,
  Palette,
  Check,
  Award,
  Maximize2,
  Droplets,
  Trees,
  SlidersHorizontal,
} from "lucide-react";

// Quality & Anatomical Detailing Benchmarks (Matching the 3 Circular Previews)
const QUALITY_BENCHMARKS = [
  {
    id: "collar-detail",
    number: "01",
    title: "Anti-Curl Collar & Reinforced Placket",
    previewLabel: "Top Detail Preview",
    subtitle: "Engineered 1x1 Jacquard Rib",
    desc: "Reinforced collar stand with internal fusing prevents edge-curling after 50+ wash cycles. Clean 2-button box placket with cross-stitched shatterproof pearl buttons and soft neck tape.",
    highlights: [
      "Zero-curl anti-roll collar architecture",
      "Reinforced 2-button fused box placket",
      "Soft interior neck tape comfort band",
    ],
  },
  {
    id: "embroidery-detail",
    number: "02",
    title: "High-Density Stag Crest Embroidery",
    previewLabel: "Emblem Detail Preview",
    subtitle: "12,000+ Precision Needle Stitches",
    desc: "The iconic Nature Polo Club stag crest is embroidered with micro-calibrated threads for ultra-crisp relief, zero fabric puckering on the pique knit, and complete colorfast fastness.",
    highlights: [
      "12,000+ micro-density stitch count",
      "Pucker-free backing for skin comfort",
      "Chlorine and wash-proof colorfast threads",
    ],
  },
  {
    id: "fabric-detail",
    number: "03",
    title: "220 GSM Combed Micro-Pique Knit",
    previewLabel: "Fabric Detail Preview",
    subtitle: "100% Ring-Spun Long-Staple Cotton",
    desc: "Knitted on high-gauge circular machines using combed compact cotton. Bio-polishing enzymes eliminate surface fuzz, delivering a silky handfeel, high breathability, and <3% shrinkage.",
    highlights: [
      "220–240 GSM breathable honeycomb structure",
      "Bio-enzyme wash for anti-pilling silk finish",
      "Pre-shrunk dimensional stability (<3%)",
    ],
  },
];

// Eco & Sustainability Pillars
const SUSTAINABILITY_PILLARS = [
  {
    icon: <Droplets className="w-6 h-6 text-brand-accent" />,
    badge: "Staff Welfare",
    title: "Safe Drinking Water",
    desc: "We provide clean, purified safe drinking water to our staff and labourers, ensuring everyday health, hydration, and workplace wellness.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
    badge: "Soil Preservation",
    title: "Waste Water Recycling",
    desc: "To preserve soil contamination from waste waters, we recycle responsibly through closed-loop systems to reduce our overall carbon footprints.",
  },
  {
    icon: <Trees className="w-6 h-6 text-brand-accent" />,
    badge: "Green Ecosystem",
    title: "Tree & Plant Cultivation",
    desc: "By planting more number of trees and plants inside of our factory premises, we actively cultivate a safe, lush, and bio-diverse ecosystem.",
  },
  {
    icon: <Sun className="w-6 h-6 text-brand-accent" />,
    badge: "Clean Energy",
    title: "100% Solar-Powered Loops",
    desc: "Our primary knitting, sewing, and steam ironing floor operations are powered entirely by captive rooftop solar photovoltaic arrays.",
  },
];

export default function NaturePoloClubPage() {
  const { openConsultation } = useInquiry();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // Filter all Nature Polo Club products from the catalog database
  const catalogProducts: Product[] = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        p.category === "Nature Polo Club" ||
        p.department === "Nature Polo Club" ||
        (p.tags && p.tags.includes("Nature Polo Club"))
    );
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="page-transition bg-[#FAF7F2] text-brand-ink min-h-screen pb-24">
      
      {/* 1. BRAND HERO SECTION WITH TRANSPARENT LOGO & EMBLEM */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-28 relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[3.5rem] shadow-2xl">
        {/* Subtle background texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/nature-polo.jpg"
            alt="Nature Polo Club Atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/90 to-brand-ink/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            
            {/* Transparent Brand Stag Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/nature-polo/logo_transparent.png"
                  alt="Nature Polo Club Transparent Stag Logo"
                  className="w-full h-full object-contain filter drop-shadow-md brightness-110"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/15 text-xs font-bold tracking-widest text-brand-accent uppercase mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> In-House Sustainable Benchmark Brand
            </div>
            
            <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-tight">
              Nature Polo Club
            </h1>
            
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-accent font-medium italic mb-6">
              &ldquo;Nature Polo — Perfection in Every Stitch.&rdquo;
            </p>
            
            <p className="text-xs sm:text-sm md:text-base text-brand-bg/80 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
              Lotus International’s premier private-label knitwear collection. Combining European micro-pique craftsmanship, zero-curl collar stands, and 100% solar-powered organic cotton manufacturing in Tirupur, India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#catalog-collection"
                className="px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-brand-accent/30 flex items-center gap-2 group cursor-pointer"
              >
                <span>View Product Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={openConsultation}
                className="px-8 py-4 rounded-full border border-white/25 hover:border-brand-accent hover:text-brand-accent text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Request Sourcing Quote
              </button>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* 2. EDITORIAL BRAND BANNER & CREST SHOWCASE */}
      <section className="py-16 md:py-20 bg-white border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Brand Banner Graphic */}
            <div className="lg:col-span-6">
              <ScrollReveal className="relative group">
                <div className="relative rounded-3xl overflow-hidden bg-brand-ink shadow-2xl border border-brand-light-grey/60 aspect-[4/3] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/nature-polo/nature_polo_brand_banner.jpg"
                    alt="Nature Polo Club Brand Banner - Perfection in Every Stitch"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Brand Philosophy Details */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1 rounded-full inline-block mb-2">
                  Brand Philosophy
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-brand-ink leading-tight">
                  Crafted for Modern Elegance &amp; Eco Mindfulness
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-xs sm:text-sm text-brand-grey leading-relaxed font-medium">
                  <strong>Nature Polo Club</strong> was founded to demonstrate that high-volume knitwear export can achieve bespoke tailoring standards. Each polo is engineered with high-density compact combed cotton yarns, delivering maximum dimensional stability (&lt;3% shrinkage) and high-definition stitch uniformity.
                </p>
                <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mt-3 font-medium">
                  From custom dye lab formulations to needle-detection gate validation, Nature Polo Club represents the pinnacle of Tirupur garment craftsmanship.
                </p>
              </ScrollReveal>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-brand-bg border border-brand-light-grey/80">
                  <span className="text-xs font-bold text-brand-ink block mb-0.5 font-serif-heading">Zero-Curl Collar</span>
                  <p className="text-[11px] text-brand-grey leading-tight">Engineered ribs that stay flat after 50+ washes.</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-bg border border-brand-light-grey/80">
                  <span className="text-xs font-bold text-brand-ink block mb-0.5 font-serif-heading">Solar Knitted</span>
                  <p className="text-[11px] text-brand-grey leading-tight">100% renewable power on factory floors.</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-bg border border-brand-light-grey/80">
                  <span className="text-xs font-bold text-brand-ink block mb-0.5 font-serif-heading">D65 Colorfast</span>
                  <p className="text-[11px] text-brand-grey leading-tight">ISO-certified reactive eco dye locking.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCT QUALITY & ANATOMICAL BENCHMARK (With 3 Rounded Callouts Preview) */}
      <section className="py-20 md:py-28 bg-[#FAF7F2] border-b border-brand-light-grey/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Quality Engineering &amp; Anatomy
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-4">
                Engineered Precision in Every Stitch
              </h2>
              <p className="text-xs md:text-sm text-brand-grey font-medium leading-relaxed max-w-2xl mx-auto">
                Explore the anatomical craftsmanship of the Nature Polo — engineered with zero-roll anti-curl collar fusing, high-density 12,000+ stitch embroidery, and 220 GSM combed compact micro-pique.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: The Interactive Quality & Rounded Preview Image */}
            <div className="lg:col-span-6">
              <ScrollReveal className="relative group">
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-brand-light-grey/80 aspect-[4/3] flex items-center justify-center p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/nature-polo/nature_polo_quality_preview.jpg"
                    alt="Nature Polo Club Product Quality and Rounded Detailing Preview"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Expand / Zoom Button */}
                  <button
                    onClick={() => setActiveModalImage("/images/nature-polo/nature_polo_quality_preview.jpg")}
                    className="absolute top-4 right-4 px-3.5 py-2 rounded-full bg-brand-ink/85 hover:bg-brand-accent text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-lg transition-all flex items-center gap-1.5 cursor-pointer opacity-90 group-hover:opacity-100"
                    title="Click to Zoom Full Resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspect Quality</span>
                  </button>

                  {/* Subtle corner badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-brand-accent text-white tracking-widest uppercase shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> 3-Point Quality Architecture
                    </span>
                  </div>
                </div>

                {/* 3 Quick Spec Pill Badges below the image */}
                <div className="grid grid-cols-3 gap-2.5 mt-4">
                  <div className="bg-white/90 border border-brand-light-grey rounded-xl p-2.5 text-center shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-brand-grey block">Collar Stand</span>
                    <strong className="text-xs font-serif-heading text-brand-ink">Zero-Roll Fused</strong>
                  </div>
                  <div className="bg-white/90 border border-brand-light-grey rounded-xl p-2.5 text-center shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-brand-grey block">Emblem</span>
                    <strong className="text-xs font-serif-heading text-brand-ink">12,000+ Stitches</strong>
                  </div>
                  <div className="bg-white/90 border border-brand-light-grey rounded-xl p-2.5 text-center shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-brand-grey block">Fabric Weave</span>
                    <strong className="text-xs font-serif-heading text-brand-ink">220 GSM Pique</strong>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: 3 Detailed Benchmark Callout Cards */}
            <div className="lg:col-span-6 space-y-4">
              {QUALITY_BENCHMARKS.map((bench, idx) => (
                <ScrollReveal
                  key={bench.id}
                  delay={idx * 0.1}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-brand-light-grey/80 shadow-xs hover:shadow-md hover:border-brand-accent/40 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                      {bench.number}
                    </div>

                    <div className="flex-grow space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors leading-tight">
                          {bench.title}
                        </h3>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 uppercase tracking-wider">
                          {bench.previewLabel}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-brand-accent">
                        {bench.subtitle}
                      </p>

                      <p className="text-xs text-brand-grey leading-relaxed font-medium pt-0.5">
                        {bench.desc}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 text-[11px] text-brand-ink/85 font-medium">
                        {bench.highlights.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-brand-accent shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              {/* Sourcing Buttons */}
              <ScrollReveal delay={0.35} className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={openConsultation}
                  className="px-6 py-3 rounded-full bg-brand-ink hover:bg-brand-accent text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Quality Swatch Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#catalog-collection"
                  className="px-6 py-3 rounded-full bg-white hover:bg-brand-bg text-brand-ink border border-brand-light-grey font-bold text-xs tracking-wider uppercase transition-colors"
                >
                  View Product Catalog
                </a>
              </ScrollReveal>

            </div>

          </div>

        </div>
      </section>

      {/* 4. CLEAN E-COMMERCE PRODUCT CATALOG GRID (Only Image & Title, Clicking Opens Product Details) */}
      <section id="catalog-collection" className="py-20 md:py-24 bg-white border-t border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-brand-light-grey/70 gap-4">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" /> Catalog Styles
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink">
                Nature Polo Product Catalog
              </h2>
              <p className="text-xs md:text-sm text-brand-grey mt-2 font-medium">
                Click any product to view complete technical specifications, GSM weight, weave options, and request a factory quote.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <span className="text-xs font-bold text-brand-grey bg-brand-bg px-4 py-2 rounded-xl border border-brand-light-grey">
                {catalogProducts.length} Export Styles Available
              </span>
            </ScrollReveal>
          </div>

          {/* Clean E-Commerce Grid: Image + Title Only */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {catalogProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={Math.min(idx * 0.04, 0.25)}>
                <Link
                  href={`/products/${product.id}`}
                  className="group block bg-[#FAF7F2] rounded-2xl md:rounded-3xl p-3 sm:p-4 border border-brand-light-grey/80 hover:border-brand-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Product Image Box */}
                  <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-white mb-3 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Subtle Overlay on Hover */}
                    <div className="absolute inset-0 bg-brand-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    {/* View Details Tag */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-brand-ink/90 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      View Specs →
                    </div>
                  </div>

                  {/* Clean Minimal Product Title Only */}
                  <div className="px-1 pt-1 text-center sm:text-left">
                    <h3 className="font-serif-heading text-sm sm:text-base font-bold text-brand-ink group-hover:text-brand-accent transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SUSTAINABLE MANUFACTURING & ECOSYSTEM COMMITMENT */}
      <section className="py-20 md:py-24 bg-[#FAF7F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Environmental Stewardship
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-4">
                Our Commitment to Sustainable Manufacturing
              </h2>
              {/* EXACT USER-REQUESTED SUSTAINABILITY STATEMENT */}
              <p className="text-sm md:text-base text-brand-ink/90 font-serif italic max-w-2xl mx-auto leading-relaxed bg-white/80 p-5 rounded-2xl border border-brand-light-grey shadow-xs">
                &ldquo;We provide safe drinking water to our staff and labourers. To preserve soil contamination from waste waters, we recycle to reduce carbon footprints. By planting more number of trees and plants inside of premises to maintain a safe ecosystem.&rdquo;
              </p>
            </ScrollReveal>
          </div>

          {/* 4 Eco Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUSTAINABILITY_PILLARS.map((pillar, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-light-grey/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-4">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/5 px-2.5 py-0.5 rounded-full border border-brand-accent/15 mb-2 inline-block">
                    {pillar.badge}
                  </span>
                  <h3 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brand-grey leading-relaxed font-medium">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 6. B2B & PRIVATE LABEL OEM SOURCING CARD */}
      <section className="py-16 md:py-20 bg-white border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl border border-brand-ink/90">
            
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/20 border border-brand-accent/30 px-3.5 py-1 rounded-full inline-block mb-4">
                Private Label Customization
              </span>

              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Launch Your Custom Polo Line with Lotus
              </h2>

              <p className="text-xs sm:text-sm text-brand-bg/85 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
                We manufacture private-label polo collections for international retail brands and corporate buyers. Full customization with Pantone dyeing, jacquard tipped collars, embroidered chest emblems, and recycled eco packaging.
              </p>

              {/* Exact MOQ & Timeline Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold mb-10">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-brand-accent block text-[10px] uppercase font-bold mb-0.5">Cotton MOQ</span>
                  <span className="text-white">500 Pcs / Color</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-brand-accent block text-[10px] uppercase font-bold mb-0.5">Blends MOQ</span>
                  <span className="text-white">1,000 Pcs (Bamboo/Pima)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-brand-accent block text-[10px] uppercase font-bold mb-0.5">Proto Sample</span>
                  <span className="text-white">7–10 Days</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-brand-accent block text-[10px] uppercase font-bold mb-0.5">Compliance</span>
                  <span className="text-white">Sedex &amp; ISO 9001</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={openConsultation}
                  className="px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-brand-accent/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Sourcing Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-brand-accent text-white hover:text-brand-accent font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Contact Merchandising Team
                </Link>
              </div>

            </div>
          </ScrollReveal>

          {/* 7. LOOKBOOK & CATALOG ACCESS FORM */}
          <ScrollReveal delay={0.1} className="mt-12 max-w-xl mx-auto bg-white text-brand-ink rounded-3xl p-8 sm:p-10 text-center shadow-lg border border-brand-light-grey/80">
            {submitted ? (
              <div className="animate-fadeIn py-3">
                <CheckCircle2 className="w-12 h-12 text-brand-accent mx-auto mb-4" />
                <h3 className="font-serif-heading text-xl font-bold text-brand-ink mb-1">Catalog Access Confirmed</h3>
                <p className="text-xs text-brand-grey font-medium">
                  Thank you. Our merchandising desk will email you the full Nature Polo Club catalog lookbook and yarn swatch guide shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4" suppressHydrationWarning>
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mx-auto mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-brand-ink mb-1">
                  Nature Polo Club Lookbook Access
                </h3>
                <p className="text-xs text-brand-grey leading-relaxed mb-6 font-medium">
                  Receive seasonal swatch books, yarn GSM updates, and direct production capacity alerts.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter business email address"
                    suppressHydrationWarning
                    className="flex-grow px-4 py-3 rounded-xl bg-brand-bg border border-brand-light-grey focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-xs text-brand-ink font-medium placeholder:text-brand-grey"
                  />
                  <button
                    type="submit"
                    suppressHydrationWarning
                    className="px-6 py-3 rounded-xl bg-brand-ink hover:bg-brand-ink/90 text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <span>Get Lookbook</span>
                    <Send className="w-3.5 h-3.5 text-brand-accent" />
                  </button>
                </div>
              </form>
            )}
          </ScrollReveal>

        </div>
      </section>

      {/* Fullscreen Image Preview Modal */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeModalImage}
              alt="High Resolution Nature Polo View"
              className="w-full h-auto max-h-[82vh] object-contain rounded-2xl"
            />
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-brand-ink/80 hover:bg-brand-accent text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
