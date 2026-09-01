import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Sun, Droplets, Leaf, Heart, CheckCircle2 } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";

const ECO_STATS = [
  {
    icon: <Sun className="w-8 h-8 text-brand-sage" />,
    value: "100%",
    title: "Solar-Powered Energy",
    desc: "Captive rooftop and offsite solar array setups supply all required energy for our production floor.",
  },
  {
    icon: <Droplets className="w-8 h-8 text-brand-sage" />,
    value: "95%",
    title: "Water Recycled (ZLD)",
    desc: "Our reverse osmosis plant processes and purifies dye effluent water, leaving zero liquid discharge.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-brand-sage" />,
    value: "100%",
    title: "Organic Cotton Ready",
    desc: "100% GOTS certified organic yarns used across our green and sustainable product collections.",
  },
];

const EMPOWERMENT_FACTS = [
  {
    title: "90% Women Workforce",
    desc: "Over 220 of our 250 skilled factory employees are women, driving financial independence in our local Avinashi village.",
  },
  {
    title: "Safe Workplace & Maternity Support",
    desc: "Complete safety protocols, clean drinking water, full healthcare benefits, and paid maternity leaves for floor employees.",
  },
  {
    title: "Leadership Mentorship",
    desc: "We promote from within. 70% of our production-line supervisors and quality audit heads are women who started as tailors.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="page-transition">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/sustainability.jpg"
            alt="Solar Powered Eco-Friendly Textile Production in Tamil Nadu"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-sage uppercase mb-3 block">
              Eco-Friendly Garment Export
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Sustainability &amp; Women&apos;s Empowerment
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl font-medium">
              We operate at the intersection of ecological responsibility and social growth. Our goals focus on resource conservation and ethical employment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Environmental Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {ECO_STATS.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} className="bg-brand-bg border border-brand-light-grey rounded-2xl p-8 text-center flex flex-col items-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-brand-sage/10 border border-brand-sage/20 flex items-center justify-center mb-6">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif-heading text-brand-sage mb-2">
                  {stat.value}
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-brand-ink mb-3">
                  {stat.title}
                </h3>
                <p className="text-xs text-brand-grey leading-relaxed font-medium">
                  {stat.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <div className="bg-brand-bg/60 border border-brand-light-grey/90 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <ScrollReveal>
                  <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                    Zero Liquid Discharge
                  </span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-brand-ink mb-4">
                    Captive Reverse Osmosis Recycling
                  </h3>
                  <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                    Tirupur&apos;s textile dyeing industry has historically impacted the Noyyal River. At Lotus, we commit to Zero Liquid Discharge. Our in-house effluent water treatment plant uses multi-stage sand filters, ultra-filtration, and reverse osmosis (RO) membranes. 95% of water is reclaimed and fed back to local processing mills, while salt crystals are collected for boiler operations.
                  </p>
                </ScrollReveal>
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-center text-xs text-brand-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                    <span>95% of dye-processing water recycled</span>
                  </div>
                  <div className="flex gap-2.5 items-center text-xs text-brand-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                    <span>Zero effluent water released to soil</span>
                  </div>
                </div>
              </div>
              <ScrollReveal delay={0.1} className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-brand-bg shadow-md border border-brand-light-grey group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sustainability/water_recycling.jpg"
                  alt="Industrial Effluent Water Treatment & Reverse Osmosis Facility in Tirupur"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-brand-ink/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold font-serif-heading">Zero Liquid Discharge (ZLD) Plant</h4>
                    <p className="text-[10px] text-brand-bg/80">95% Water Recycled Back to Processing</p>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent uppercase tracking-wider">
                    Eco Certified
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Social Empowerment Section */}
      <section className="py-20 bg-brand-bg border-t border-b border-brand-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image panel */}
            <ScrollReveal className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden bg-brand-bg shadow-xl border border-brand-light-grey order-last lg:order-first group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/careers/life_at_lotus.jpg"
                alt="Empowered female artisans on ethical apparel manufacturing floor in Tirupur"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 right-6 text-brand-bg">
                <span className="text-[10px] tracking-widest uppercase font-bold text-brand-accent bg-brand-ink/80 border border-brand-accent/30 px-3 py-1 rounded-full backdrop-blur-md shadow-xs inline-block mb-3">
                  Social Responsibility
                </span>
                <p className="font-serif-heading text-lg sm:text-xl font-bold leading-snug text-white mb-1">
                  A workplace built on gender equality, fair compensation, and safe labor.
                </p>
                <p className="text-xs text-brand-bg/80 font-medium">
                  220+ Rural Women Artisans • Tirupur &amp; Avinashi Facility
                </p>
              </div>
            </ScrollReveal>

            {/* Content panel */}
            <div>
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                  Women&apos;s Empowerment Focus
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-brand-ink mb-4">
                  Supporting Rural Women&apos;s Financial Autonomy
                </h2>
                <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-8 font-medium">
                  Sustainable fashion must include the people who sew the garments. Lotus is proud to employ over 220 women from the rural communities around Avinashi. We provide free transport, safety training, and financial literacy workshops to ensure their career progression.
                </p>
              </ScrollReveal>

              <div className="space-y-4">
                {EMPOWERMENT_FACTS.map((item, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.08} className="flex gap-4 p-4 rounded-2xl bg-white border border-brand-light-grey/80 shadow-xs">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20 text-brand-accent">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-0.5">{item.title}</h4>
                      <p className="text-xs text-brand-grey leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
