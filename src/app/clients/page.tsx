import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import TestimonialCard from "@/components/TestimonialCard";
import { CheckCircle2, Globe } from "lucide-react";

const CLIENT_BRANDS = [
  {
    name: "U.S. Polo Assn.",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/us%20polo%20assn.png",
    category: "Heritage Sportswear",
    programs: "Pique Polos, Zip Hoodies, Crew Knits",
  },
  {
    name: "Max Fashion",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/max.png",
    category: "Retail Department Chain",
    programs: "Everyday Combed Tees, Kids Playwear",
  },
  {
    name: "Aeropostale",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/aeropostale.png",
    category: "Youth & Casual Lifestyle",
    programs: "Heavyweight Fleece, Vintage Graphic Knits",
  },
  {
    name: "Studio Earth",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/studio%20earth.png",
    category: "Sustainable & Eco Apparel",
    programs: "100% GOTS Organic Bamboo Cotton",
  },
  {
    name: "Fabrika",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/fabrika.png",
    category: "Contemporary Fashion",
    programs: "Enzyme Washed Slub, Structured Jersey",
  },
  {
    name: "Liverpool",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/liverpool.png",
    category: "Department Store Retail",
    programs: "Premium Loungewear & Seasonal Knits",
  },
  {
    name: "French Connection",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/french%20connection.png",
    category: "High-Street Designer Label",
    programs: "Tailored Knitwear, Ribbed Tops & French Terry",
  },
];

const CASE_STUDIES = [
  {
    brand: "U.S. Polo Assn.",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/us%20polo%20assn.png",
    program: "Classic Pique Polos & Heavyweight Fleece",
    category: "Heritage Sportswear",
    details: "Engineered 220 GSM combed compact cotton pique with high dimensional stability (<3% shrinkage) and reactive dye fastness. Passed Hashima needle detection and AQL 1.5 standards across multi-country export distribution.",
    tags: ["220 GSM Pique", "Colorfast D65", "AQL 1.5 Gate", "Hashima Scanned"],
    volume: "350,000+ Pcs Annually",
  },
  {
    brand: "Max Fashion",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/max.png",
    program: "Everyday Combed Tees & Kids Playwear",
    category: "High-Volume Retail",
    details: "Delivering fast-turnaround, 100% combed cotton jersey programs with strict OEKO-TEX Standard 100 Class 1 safety for baby and children's knitwear. Rapid 30-day replenishment re-order cycles.",
    tags: ["100% Combed Cotton", "OEKO-TEX Class 1", "Fast Re-Orders", "Eco Packaging"],
    volume: "500,000+ Pcs Annually",
  },
  {
    brand: "French Connection",
    logo: "https://ik.imagekit.io/wepix/lotus%20international/french%20connection.png",
    program: "Designer Washed Jersey & French Terry",
    category: "Contemporary Fashion",
    details: "Custom-developed micro-rib trims, enzyme washed luxury touch, and custom Pantone lab-dip matching for seasonal fashion drops. Audited under Sedex 4-Pillar ethical standards.",
    tags: ["Enzyme Washed", "Micro-Rib Trims", "Sedex 4-Pillar", "Custom Pantone"],
    volume: "200,000+ Pcs Per Season",
  },
];

const FEEDBACKS = [
  {
    quote: "Lotus International is our benchmark supplier for social and technical audits in South Asia. Their Sedex compliance, quality consistency, and ethical workforce standards are exemplary.",
    author: "Elena G.",
    role: "Global Sourcing Coordinator",
    company: "Studio Earth (Europe)",
  },
  {
    quote: "Their responsiveness and technical agility are world-class. If an export spec or CAD pattern needs fine-tuning, their technical team resolves it within hours without stopping production lines.",
    author: "Pradeep K.",
    role: "VP Sourcing & Procurement",
    company: "Max Fashion Group",
  },
  {
    quote: "Lotus has consistently delivered our seasonal retail collections with zero rejection rates at port clearance. Their packaging inspection protocols leave no margin for errors.",
    author: "Arthur Pendelton",
    role: "Apparel Buying Agent",
    company: "US Sourcing Desk",
  },
];

export default function ClientsPage() {
  return (
    <div className="page-transition">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/clients.jpg"
            alt="Global Garment Export Logistics & Sourcing Partners"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              Global Procurement Partners
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Trusted by World-Class Apparel Brands
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl font-medium">
              We manufacture knitted garments for leading global retailers, iconic sportswear houses, and designer labels across the U.S., Europe, and Asia.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Global Brand Partner Showcase */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-brand-light-grey/80">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                Brand Portfolio
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                Trusted Partner &amp; Global Apparel Brands
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xs md:text-sm text-brand-grey max-w-md font-medium">
                Supplying millions of private-label knitted garments annually to top retail distribution networks.
              </p>
            </ScrollReveal>
          </div>

          {/* Compact Modern Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {CLIENT_BRANDS.map((brand, idx) => (
              <ScrollReveal
                key={brand.name}
                delay={idx * 0.05}
                className="bg-brand-bg/40 border border-brand-light-grey/80 rounded-2xl p-5 md:p-6 shadow-xs hover:shadow-md hover:border-brand-accent/40 transition-all duration-300 flex flex-col items-center justify-between text-center group min-h-[140px]"
              >
                <div className="h-12 w-full flex items-center justify-center mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-9 md:max-h-10 max-w-[140px] w-auto object-contain opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <div className="pt-2 border-t border-brand-light-grey/50 w-full">
                  <span className="text-[10px] font-bold tracking-wider text-brand-accent uppercase block">
                    {brand.category}
                  </span>
                  <span className="text-[11px] text-brand-grey font-medium truncate block mt-0.5">
                    {brand.programs}
                  </span>
                </div>
              </ScrollReveal>
            ))}

            {/* Global Sourcing Tag Card */}
            <ScrollReveal
              delay={0.35}
              className="bg-brand-ink text-brand-bg rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between items-center text-center col-span-2 sm:col-span-1"
            >
              <div className="w-9 h-9 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent mb-2">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-heading text-sm font-bold text-white mb-1">
                  10+ Export Countries
                </h4>
                <p className="text-[11px] text-brand-bg/75">
                  USA, UK, Germany, Spain, France, UAE &amp; Australia
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Sourcing Program Case Studies */}
      <section className="py-16 md:py-20 bg-brand-bg border-t border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-brand-light-grey/60">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                Execution Deliverables
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                Sourcing Program Case Studies
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xs md:text-sm text-brand-grey max-w-md font-medium">
                Detailed breakdowns of how Lotus satisfies custom fabric specifications, compliance parameters, and volume targets.
              </p>
            </ScrollReveal>
          </div>

          {/* 3 Compact Modern Case Study Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study, idx) => (
              <ScrollReveal
                key={study.brand}
                delay={idx * 0.08}
                className="bg-white border border-brand-light-grey/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent/80 via-brand-accent to-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Brand Logo */}
                  <div className="flex items-center mb-4 pb-4 border-b border-brand-light-grey/60">
                    <div className="h-8 max-w-[140px] flex items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={study.logo}
                        alt={study.brand}
                        className="max-h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>

                  {/* Program Heading */}
                  <h3 className="font-serif-heading text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors mb-2.5">
                    {study.program}
                  </h3>

                  {/* Details Narrative */}
                  <p className="text-xs text-brand-grey leading-relaxed mb-4">
                    {study.details}
                  </p>

                  {/* Specification Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-ink/80 bg-brand-bg px-2 py-0.5 rounded-md border border-brand-light-grey/60"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-brand-accent" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Delivered Volume */}
                <div className="pt-3 border-t border-brand-light-grey/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-brand-grey">
                    Annual Volume:
                  </span>
                  <span className="text-xs font-bold text-brand-ink">
                    {study.volume}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                Buyer Testimonials
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-brand-ink mb-3">
                Client Feedback &amp; Endorsements
              </h2>
              <p className="text-xs md:text-sm text-brand-grey font-medium">
                Hear what global apparel sourcing directors say about working with our Tirupur manufacturing team.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEEDBACKS.map((f, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} className="flex">
                <TestimonialCard
                  quote={f.quote}
                  author={f.author}
                  role={f.role}
                  company={f.company}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
