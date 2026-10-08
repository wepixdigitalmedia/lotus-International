import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Droplets,
  Sun,
  Trees,
  Recycle,
  ShieldCheck,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Zap,
  Package,
  Sprout,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability & Eco-Friendly Manufacturing | Lotus International Garment Export Tirupur",
  description:
    "Discover how Lotus International champions sustainability through 100% solar power, organic & recycled fibers, zero-waste cutting, water recycling, and green factory premises in Tirupur, India.",
};

const SUSTAINABILITY_METRICS = [
  {
    icon: <Sun className="w-7 h-7 text-brand-accent" />,
    value: "100%",
    title: "Solar Energy Powered",
    desc: "Captive rooftop solar array powering our primary manufacturing and sewing operations, eliminating fossil emissions.",
  },
  {
    icon: <Droplets className="w-7 h-7 text-brand-accent" />,
    value: "100%",
    title: "RO Water Treatment",
    desc: "Responsible water recycling and RO treatment preventing soil contamination and preserving natural water tables.",
  },
  {
    icon: <Recycle className="w-7 h-7 text-brand-accent" />,
    value: "< 2%",
    title: "Minimal Cutting Waste",
    desc: "Optimized CAD marker planning and 100% scrap recycling ensuring zero fabric goes to landfills.",
  },
  {
    icon: <Trees className="w-7 h-7 text-brand-accent" />,
    value: "1,000+",
    title: "Trees & Green Flora",
    desc: "Extensive tree cultivation across our factory grounds to maintain a lush, balanced, and safe natural ecosystem.",
  },
];

const CORE_PILLARS = [
  {
    icon: <Leaf className="w-6 h-6 text-brand-accent" />,
    badge: "Raw Materials",
    title: "Sustainable Sourcing",
    description:
      "We prioritize the use of eco-friendly materials such as GOTS-certified organic cotton, recycled polyester fibers, and OEKO-TEX® biodegradable dyes. By choosing sustainable raw materials, we reduce our environmental footprint and actively support ethical farming practices.",
    points: [
      "GOTS Certified 100% Organic Cotton",
      "GRS Certified Recycled Polyester & Blends",
      "OEKO-TEX® Standard 100 Non-toxic & Biodegradable Dyes",
      "Sustainably Farmed BCI & Combed Cotton Yarns",
    ],
  },
  {
    icon: <Recycle className="w-6 h-6 text-brand-accent" />,
    badge: "Zero Waste",
    title: "Reduced Waste & Circularity",
    description:
      "Our production processes are designed to minimize waste at every phase. We implement efficient computer-assisted cutting techniques and recycle all fabric scraps, paper, and production off-cuts to ensure that no usable material goes to waste.",
    points: [
      "Precision CAD marker layout for maximum fabric yield",
      "100% sorting and recycling of all textile cutting scraps",
      "Repurposed fabric waste for secondary industrial insulation",
      "Comprehensive in-house recycling for paper and plastics",
    ],
  },
  {
    icon: <Sun className="w-6 h-6 text-brand-accent" />,
    badge: "Clean Power",
    title: "Energy-Efficient Manufacturing",
    description:
      "We invest in the latest energy-efficient technologies and machinery to systematically reduce carbon emissions. Our facilities are equipped with rooftop solar panels, 100% low-consumption LED lighting, and smart energy management systems to optimize power consumption.",
    points: [
      "High-efficiency captive rooftop solar energy arrays",
      "100% smart LED factory illumination reducing heat & draw",
      "Smart Energy Management Systems (EMS) for peak balancing",
      "Low-emission servo motor sewing machines",
    ],
  },
  {
    icon: <Droplets className="w-6 h-6 text-brand-accent" />,
    badge: "Soil & Water",
    title: "Water Conservation & Soil Care",
    description:
      "Water is our planet's most precious resource. We provide purified drinking water to our staff and labourers, operate an in-house RO water treatment plant, and recycle wastewater responsibly to safeguard local soil from contamination and reduce our carbon footprint.",
    points: [
      "Safe, mineral-purified drinking water for all staff & labourers",
      "Responsible wastewater recycling to preserve soil contamination",
      "In-house Reverse Osmosis (RO) water treatment plant",
      "Rainwater harvesting and water-saving fixtures across premises",
    ],
  },
];

const CONCEPT_TO_CREATION = [
  {
    icon: <Sun className="w-5 h-5 text-brand-accent" />,
    title: "Energy Efficiency",
    desc: "Renewable energy source is used for major facility productivity with the installation of captive solar energy.",
  },
  {
    icon: <Zap className="w-5 h-5 text-brand-accent" />,
    title: "Energy-Saving Technologies",
    desc: "All our power supplies use 100% LED lighting and intelligent Smart Energy Management Systems.",
  },
  {
    icon: <Droplets className="w-5 h-5 text-brand-accent" />,
    title: "Water Conservation",
    desc: "We have implemented water recycling, an RO water treatment plant, and water-saving fixtures on our premises.",
  },
  {
    icon: <Recycle className="w-5 h-5 text-brand-accent" />,
    title: "Comprehensive Recycling Programs",
    desc: "Established in-house recycling facilities for paper, plastic, cartons, and other non-textile production materials.",
  },
  {
    icon: <Sprout className="w-5 h-5 text-brand-accent" />,
    title: "Composting Organic Waste",
    desc: "Systematic composting of organic waste from staff canteens and non-production areas for campus landscaping.",
  },
  {
    icon: <Package className="w-5 h-5 text-brand-accent" />,
    title: "Minimalist Packaging",
    desc: "Reduced packaging materials using sustainable options such as recycled polybags and biodegradable boxes.",
  },
  {
    icon: <HeartHandshake className="w-5 h-5 text-brand-accent" />,
    title: "Social Responsibility",
    desc: "Fair labor practices: We emphasize fair living wages, safe working conditions, and worker welfare programs.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="page-transition">
      {/* 1. HERO SECTION */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-28 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/sustainability.jpg"
            alt="The Lotus International Sustainable Garment Manufacturing Facility in Tirupur"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">
              <Leaf className="w-3.5 h-3.5" />
              <span>Environmental Stewardship &amp; Sustainable Manufacturing</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-6xl font-bold max-w-4xl leading-tight text-white">
              Sustainability at <br className="hidden sm:inline" />
              The Lotus International
            </h1>
            <p className="text-sm md:text-base text-brand-bg/85 mt-5 max-w-2xl font-medium leading-relaxed">
              Discover how Lotus International is committed to sustainability through eco-friendly materials, clean solar energy, closed-loop water recycling, zero waste, and continuous environmental stewardship.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#initiatives"
                className="px-7 py-3.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Explore Eco Initiatives</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/women-empowerment"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-brand-bg border border-white/20 font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Women’s Empowerment</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. KEY SUSTAINABILITY METRICS */}
      <section className="py-16 md:py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUSTAINABILITY_METRICS.map((metric, idx) => (
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

      {/* 3. FOUR CORE SUSTAINABILITY PILLARS */}
      <section id="initiatives" className="py-16 md:py-24 bg-white border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Actionable Commitment
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink">
                Sustainable Practices in Action
              </h2>
              <p className="text-xs md:text-sm text-brand-grey max-w-xl mx-auto mt-3 font-medium leading-relaxed">
                From organic farm fields to our solar-powered cutting tables, sustainability is engineered into every stage of our apparel manufacturing process.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {CORE_PILLARS.map((pillar, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="bg-brand-bg/60 border border-brand-light-grey rounded-3xl p-7 sm:p-9 flex flex-col justify-between hover:border-brand-accent/30 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-brand-light-grey flex items-center justify-center shadow-xs">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-brand-ink mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-brand-light-grey/80 space-y-2.5">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-brand-ink font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM & SOIL PRESERVATION SPOTLIGHT */}
      <section className="py-16 md:py-20 bg-brand-bg border-t border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-brand-light-grey rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <ScrollReveal>
                  <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                    Ecological Responsibility
                  </span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-ink mb-4 leading-tight">
                    Preserving Soil, Conserving Water &amp; Cultivating Greenery
                  </h3>
                  <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-4 font-medium">
                    We provide safe drinking water to our staff and labourers. To preserve soil contamination from waste waters, we recycle to reduce our carbon footprints, and plant trees and plants inside our premises to maintain a safe ecosystem.
                  </p>
                  <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                    By holding ourselves to the highest environmental standards, Lotus International ensures that large-scale knitwear export manufacturing coexists harmoniously with natural biodiversity and surrounding community wellness.
                  </p>
                </ScrollReveal>

                <div className="space-y-3">
                  <div className="flex gap-2.5 items-center text-xs text-brand-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Safe drinking water provided to all staff and factory personnel</span>
                  </div>
                  <div className="flex gap-2.5 items-center text-xs text-brand-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Preserving soil contamination from waste waters via responsible recycling</span>
                  </div>
                  <div className="flex gap-2.5 items-center text-xs text-brand-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Reducing carbon footprints through closed-loop recycling &amp; solar energy</span>
                  </div>
                  <div className="flex gap-2.5 items-center text-xs text-brand-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Planting trees and plants inside premises to maintain a safe ecosystem</span>
                  </div>
                </div>
              </div>

              <ScrollReveal delay={0.1} className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-brand-bg shadow-md border border-brand-light-grey group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/heroes/sustainability.jpg"
                  alt="Lotus International Green Manufacturing Facility with Solar Energy and Plantations in Tirupur"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-transparent to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-brand-ink/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-serif-heading">Eco-Friendly Factory Campus</h4>
                    <p className="text-[10px] sm:text-[11px] text-brand-bg/80">Lush Plantation &amp; Safe Ecosystem • Avinashi, Tirupur</p>
                  </div>
                  <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent uppercase tracking-wider">
                    Green Premises
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONCEPT TO CREATION - 7 ECOSYSTEM HIGHLIGHTS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Holistic Framework
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink">
                Concept to Creation
              </h2>
              <p className="text-xs md:text-sm text-brand-grey max-w-xl mx-auto mt-3 font-medium leading-relaxed">
                Our 7-pillar environmental framework ensures that every garment produced adheres to rigorous resource conservation, recycling, and ethical labor standards.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONCEPT_TO_CREATION.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.05}
                className="p-6 sm:p-7 rounded-2xl bg-brand-bg/50 border border-brand-light-grey/80 shadow-xs hover:shadow-md hover:border-brand-accent/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-brand-light-grey/80 flex items-center justify-center text-brand-accent mb-4 shadow-xs">
                    {item.icon}
                  </div>
                  <h3 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-grey leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. JOIN US IN OUR JOURNEY / ETHICAL SOURCING CTA */}
      <section className="py-16 md:py-24 bg-brand-ink text-brand-bg relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3.5rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Sustainable Apparel Partnerships
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              Join Us in Our Journey Towards a Greener Future
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-brand-bg/85 leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
              Sustainability is a collective effort. We invite international lifestyle and fashion brands to join us on our journey towards a greener and more equitable future. By choosing our knitwear manufacturing, you partner with an exporter that genuinely cares about the planet and its people.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-md"
              >
                <span>Partner With Our Sustainable Factory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/women-empowerment"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-brand-bg border border-white/20 font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Women’s Empowerment</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
