"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Factory,
  Scissors,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Sparkles,
  Zap,
  ShieldCheck,
  Calendar,
  Building2,
} from "lucide-react";

const INFRA_HIGHLIGHTS = [
  {
    icon: <Gauge className="w-6 h-6 text-brand-accent" />,
    value: "40k - 50k",
    title: "Monthly Garment Output",
    desc: "In-house production capacity scalable up to 100,000+ pcs for peak international seasonal demands.",
  },
  {
    icon: <Scissors className="w-6 h-6 text-brand-accent" />,
    value: "10 Spreaders",
    title: "Air-Floating Tables",
    desc: "Up to 30-meter air-floatation spreading tables ensuring zero-tension fabric lay and precision cutting.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-brand-accent" />,
    value: "180+",
    title: "Specialized Machines",
    desc: "Comprehensive fleet of Juki, Siruba & Pegasus overlock, flatlock, single-needle, and buttonhole machines.",
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-accent" />,
    value: "100%",
    title: "Solar-Powered Lines",
    desc: "Captive rooftop solar array driving operations with zero fossil fuel dependency and uninterrupted uptime.",
  },
];

const CUTTING_MACHINES = [
  { name: "14 Meters Length Spreader Machines", count: "5 Nos", desc: "For short-to-medium lay length batch processing" },
  { name: "20 Meters Air Floating Spreader Machine", count: "3 Nos", desc: "Air cushion bed preventing fabric stretch and distortion" },
  { name: "30 Meters Air Floating Spreader Machines", count: "2 Nos", desc: "Long-run high-volume bulk production spreading tables" },
  { name: "KM Straight Knife Cutting Machines", count: "5 Nos", desc: "Japanese high-torque precision straight knife cutters" },
];

const STITCHING_MACHINES = [
  { name: "Single Needle Lockstitch Stitching", count: "56 Machines", desc: "Direct-drive servo motors for high-precision seams" },
  { name: "Overlock Machines (4-Thread & 5-Thread)", count: "46 Machines", desc: "High-speed edge finishing and durable stretch seam joins" },
  { name: "Flatlock Machines (Coverstitch)", count: "20 Machines", desc: "Precision flatseaming for hems, cuffs, and athletic necklines" },
  { name: "Button Hole Machines", count: "3 Nos", desc: "Computerized electronic eyelet and straight buttonholing" },
  { name: "Button Attaching Machines", count: "3 Nos", desc: "Automated clamp button sew systems with knot security" },
  { name: "Rib Cutting Machines", count: "3 Nos", desc: "Continuous circular knit collar and cuff rib strip cutters" },
  { name: "Straight Knife Auxiliary Cutters", count: "3 Nos", desc: "Secondary trimming and sample preparation stations" },
  { name: "Automatic Thread Trimmers", count: "Full Line", desc: "Suction-assisted clean edge thread end finishing" },
];

export default function InfrastructurePage() {
  const [activeTab, setActiveTab] = useState<"stitching" | "cutting">("stitching");

  return (
    <div className="page-transition">
      {/* 1. HERO SECTION */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-28 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/infrastructure/our-infrastructure.png"
            alt="The Lotus International Factory Infrastructure in Tirupur"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">
              <Factory className="w-3.5 h-3.5" />
              <span>Plant &amp; Machinery Capabilities</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-6xl font-bold max-w-4xl leading-tight text-white">
              World-Class Garment <br className="hidden sm:inline" />
              Manufacturing Infrastructure
            </h1>
            <p className="text-sm md:text-base text-brand-bg/85 mt-5 max-w-2xl font-medium leading-relaxed">
              Equipped with global-standard machinery, automated air-floatation cutting tables, Optitex CAD grading, and specialized modular sewing divisions in Tirupur, India.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#machinery"
                className="px-7 py-3.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>View Machinery Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/manufacturing"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-brand-bg border border-white/20 font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Manufacturing Process</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. KEY INFRASTRUCTURE METRICS */}
      <section className="py-14 md:py-18 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INFRA_HIGHLIGHTS.map((metric, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="bg-white border border-brand-light-grey rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4">
                  {metric.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-serif-heading text-brand-accent mb-2">
                  {metric.value}
                </div>
                <h3 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink mb-2">
                  {metric.title}
                </h3>
                <p className="text-xs text-brand-grey leading-relaxed font-medium">
                  {metric.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. IMAGE 1: OUR INFRASTRUCTURE */}
      <section className="py-16 md:py-24 bg-white border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Image 1 */}
            <ScrollReveal className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-brand-bg shadow-lg border border-brand-light-grey group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/infrastructure/our-infrastructure.png"
                alt="Our Infrastructure - The Lotus International Manufacturing Facility Campus in Tirupur"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-brand-ink/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-serif-heading">The Lotus International Campus</h4>
                  <p className="text-[11px] text-brand-bg/80">Pudhupalayam Village, Avinashi, Tirupur</p>
                </div>
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent uppercase tracking-wider">
                  Our Infrastructure
                </span>
              </div>
            </ScrollReveal>

            {/* Right: Copy */}
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                  Production Facility
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink mb-5 leading-tight">
                  Our Infrastructure
                </h2>
                <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-4 font-medium">
                  Our facility is equipped and updated with machinery that are par to global standards. We believe in investing in the latest technologies considering long-term CapEx. Also, we thrive to expand our infrastructure strategically on a conducive marketplace.
                </p>
                <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                  At present, our in-house production capacity is <strong>40,000 to 50,000 pcs per month</strong>, with modular line architecture designed to rapidly scale up in sync with unforeseen buyer demands. We have a strong and dedicated workforce to cater to our international clients.
                </p>
              </ScrollReveal>

              <div className="space-y-3">
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>Strategic location in Avinashi, Tirupur with direct seaport and airport freight access</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>40,000 - 50,000 pcs monthly in-house volume with elastic modular line expansion</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>100% captive solar powered with ergonomic working spaces &amp; green premises</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>Linear workflow design minimizing material handling time from roll to carton</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMAGE 2: CAD & CUTTING FACILITIES */}
      <section className="py-16 md:py-24 bg-brand-bg border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Copy */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                  Pre-Production Precision
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink mb-5 leading-tight">
                  CAD &amp; Cutting Facilities
                </h2>
                <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-4 font-medium">
                  The Lotus International has a centralised cutting centre equipped with the latest automatic fabric spreaders with air-floatation tables.
                </p>
                <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                  We utilize KM straight knife cutters and follow the most efficient methods of computerized pattern design, pattern grading, marker length planning, and cut plan execution to guarantee minimal fabric waste, perfect alignment, and precision sizing across all garment panels.
                </p>
              </ScrollReveal>

              <div className="space-y-3">
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>Centralised cutting floor with air-floatation tables up to 30 meters</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>Optitex computerized CAD marker making optimizing yields above 98%</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>High-precision KM Japanese straight knife cutting machinery</span>
                </div>
                <div className="flex gap-3 items-center text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>24-hour fabric relaxation bays to eliminate post-cut torque &amp; shrinkage</span>
                </div>
              </div>
            </div>

            {/* Right: Image 2 */}
            <ScrollReveal delay={0.1} className="lg:col-span-6 order-1 lg:order-2 relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-white shadow-lg border border-brand-light-grey group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/infrastructure/cad-cutting.png"
                alt="CAD and Cutting Facilities at The Lotus International"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-brand-ink/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-serif-heading">CAD &amp; Cutting Division</h4>
                  <p className="text-[11px] text-brand-bg/80">Air Floatation Spreading &amp; KM Knife Section</p>
                </div>
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent uppercase tracking-wider">
                  Cutting Centre
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. IMAGE 3 & PRODUCTION DIVISION MACHINERY BREAKDOWN */}
      <section id="machinery" className="py-16 md:py-24 bg-white border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Machinery Inventory
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink">
                Production Division &amp; Equipment Fleet
              </h2>
              <p className="text-xs md:text-sm text-brand-grey max-w-xl mx-auto mt-3 font-medium leading-relaxed">
                Explore the verified machinery inventory powering our cutting and sewing floors in Tirupur.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12">
            {/* Left: Image 3 */}
            <ScrollReveal className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-brand-bg shadow-lg border border-brand-light-grey group sticky top-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/infrastructure/production-division.png"
                alt="Production Division at The Lotus International"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-brand-ink/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-serif-heading">Active Sewing Floor</h4>
                  <p className="text-[11px] text-brand-bg/80">Modular Lines &amp; Assembly Stations</p>
                </div>
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent uppercase tracking-wider">
                  Production Line
                </span>
              </div>
            </ScrollReveal>

            {/* Right: Interactive Tabs & Machinery Grid */}
            <div className="lg:col-span-7">
              {/* Tab Selector Buttons */}
              <div className="flex gap-2 p-1.5 bg-brand-bg border border-brand-light-grey rounded-2xl mb-8 max-w-md">
                <button
                  onClick={() => setActiveTab("stitching")}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "stitching"
                      ? "bg-brand-ink text-white shadow-sm"
                      : "text-brand-ink/70 hover:text-brand-ink hover:bg-white/50"
                  }`}
                >
                  <Cpu className="w-4 h-4 text-brand-accent" />
                  <span>Stitching Fleet (135+ Units)</span>
                </button>
                <button
                  onClick={() => setActiveTab("cutting")}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "cutting"
                      ? "bg-brand-ink text-white shadow-sm"
                      : "text-brand-ink/70 hover:text-brand-ink hover:bg-white/50"
                  }`}
                >
                  <Scissors className="w-4 h-4 text-brand-accent" />
                  <span>Cutting Fleet (15+ Units)</span>
                </button>
              </div>

              {/* Tab Content: Stitching Machines */}
              {activeTab === "stitching" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-brand-bg/60 border border-brand-light-grey rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-ink">Stitching &amp; Finishing Fleet</span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/15 text-brand-accent">
                      Verified Machine Count
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {STITCHING_MACHINES.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-bg/40 border border-brand-light-grey rounded-2xl p-4 hover:border-brand-accent/30 hover:bg-brand-bg transition-all"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="text-xs font-bold text-brand-ink">{m.name}</h4>
                          <span className="text-xs font-bold font-serif-heading text-brand-accent shrink-0 px-2 py-0.5 rounded-lg bg-white border border-brand-light-grey shadow-xs">
                            {m.count}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-grey leading-relaxed">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content: Cutting Machines */}
              {activeTab === "cutting" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-brand-bg/60 border border-brand-light-grey rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-ink">Spreading &amp; Knife Cutting Fleet</span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/15 text-brand-accent">
                      Verified Machine Count
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {CUTTING_MACHINES.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-bg/40 border border-brand-light-grey rounded-2xl p-4 hover:border-brand-accent/30 hover:bg-brand-bg transition-all"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="text-xs font-bold text-brand-ink">{m.name}</h4>
                          <span className="text-xs font-bold font-serif-heading text-brand-accent shrink-0 px-2 py-0.5 rounded-lg bg-white border border-brand-light-grey shadow-xs">
                            {m.count}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-grey leading-relaxed">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FACTORY VISIT & AUDIT CTA */}
      <section className="py-16 md:py-24 bg-brand-ink text-brand-bg relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3.5rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Schedule a Factory Audit
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              Experience Our Infrastructure in Person
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-brand-bg/85 leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
              We welcome global apparel brands, retail sourcing executives, and third-party compliance auditors to visit our Pudhupalayam facility in Avinashi, Tirupur.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-md"
              >
                <span>Request Plant Visit / Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/manufacturing"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-brand-bg border border-white/20 font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Explore 8-Step Manufacturing Process</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
