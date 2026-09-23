import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Users,
  Award,
  ShieldCheck,
  HeartHandshake,
  Heart,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Bus,
  Sparkles,
  Quote,
  Shield,
  Briefcase,
  Smile,
  Droplets,
  Trees,
  Sun,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability & Women's Empowerment | Lotus International Garment Export Tirupur",
  description:
    "Championing safe drinking water, soil preservation via water recycling, green premises with tree plantation, and dignified livelihoods for over 220 rural women artisans.",
};

const ECO_INITIATIVES = [
  {
    icon: <Droplets className="w-7 h-7 text-brand-accent" />,
    badge: "Staff Welfare",
    title: "Safe Drinking Water",
    desc: "We provide safe drinking water to our staff and labourers, ensuring hydration, dignity, and workplace wellness across all departments.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-brand-accent" />,
    badge: "Soil Preservation",
    title: "Waste Water Recycling",
    desc: "To preserve soil contamination from waste waters, we recycle responsibly to reduce our overall carbon footprints.",
  },
  {
    icon: <Trees className="w-7 h-7 text-brand-accent" />,
    badge: "Green Premises",
    title: "Trees & Plants Cultivation",
    desc: "By planting more number of trees and plants inside of premises to maintain a safe, lush, and ecologically balanced environment.",
  },
  {
    icon: <Sun className="w-7 h-7 text-brand-accent" />,
    badge: "Clean Energy",
    title: "100% Solar-Powered",
    desc: "Our primary manufacturing floor operations run on captive rooftop solar arrays, eliminating fossil dependence.",
  },
];

const EMPOWERMENT_METRICS = [
  {
    icon: <Users className="w-8 h-8 text-brand-accent" />,
    value: "90%",
    title: "Female Workforce",
    desc: "Over 220 of our 250 skilled factory employees are women, driving primary household income and independence across local villages.",
  },
  {
    icon: <Award className="w-8 h-8 text-brand-accent" />,
    value: "70%",
    title: "Women in Leadership",
    desc: "We promote strictly from within. 70% of floor supervisors, pattern masters, and quality audit heads started as floor tailors.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-brand-accent" />,
    value: "100%",
    title: "Direct Pay & Benefits",
    desc: "Independent personal bank deposits, statutory provident fund (EPF), healthcare insurance (ESI), and paid maternity leaves.",
  },
  {
    icon: <Bus className="w-8 h-8 text-brand-accent" />,
    value: "10+",
    title: "Rural Villages Connected",
    desc: "Free company-operated buses provide safe, dependable daily commute from remote doorstep locations directly to factory gates.",
  },
];

const EMPOWERMENT_PILLARS = [
  {
    icon: <Award className="w-5 h-5 text-brand-accent" />,
    title: "Technical Mastery & Upskilling",
    description:
      "Structured hands-on apprenticeship programs covering advanced single-needle lockstitch, flatlock, computer-assisted pattern grading, and precision garment assembly.",
  },
  {
    icon: <Shield className="w-5 h-5 text-brand-accent" />,
    title: "Safe & Respectful Workplace",
    description:
      "Full POSH compliance with an active, female-led internal grievance committee, comprehensive CCTV coverage, ergonomic workstations, and clean purified drinking water.",
  },
  {
    icon: <Heart className="w-5 h-5 text-brand-accent" />,
    title: "Maternal Health & Wellness",
    description:
      "Statutory paid maternity leave with job security guarantees, on-site first aid nurses, regular female physician visits, and comprehensive routine health screenings.",
  },
  {
    icon: <Briefcase className="w-5 h-5 text-brand-accent" />,
    title: "Financial Autonomy & Literacy",
    description:
      "Empowering women with their own individual savings accounts, debit cards, and training on household budgeting, retirement savings, and digital banking.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-brand-accent" />,
    title: "Merit-Based Career Progression",
    description:
      "Clear promotional ladders ensuring dedicated artisans move from helper to tailor, sample development specialist, line QC auditor, and senior floor supervisor.",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-brand-accent" />,
    title: "Family & Educational Sponsorship",
    description:
      "Through our Charitable Trust, we sponsor higher collegiate tuition fees and textbooks for our female workers' daughters, breaking intergenerational poverty cycles.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="page-transition">
      {/* 1. PAGE HERO */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/careers/life_at_lotus.jpg"
            alt="Empowered female artisans on ethical apparel manufacturing floor in Tirupur"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              Ethical Garment Manufacturing &amp; Social Impact
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight text-white">
              Sustainability &amp; Women&apos;s Empowerment
            </h1>
            <p className="text-sm md:text-base text-brand-bg/85 mt-4 max-w-2xl font-medium leading-relaxed">
              We operate at the intersection of environmental care and social equity. From 100% captive solar power and eco-conscious factory grounds to empowering over 220 rural women artisans, sustainable ethics guide every garment we craft.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. ENVIRONMENTAL SUSTAINABILITY & SAFE ECOSYSTEM */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Environmental Stewardship
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                Sustainable Practices &amp; Safe Ecosystem
              </h2>
              <p className="text-xs md:text-sm text-brand-grey max-w-xl mx-auto mt-3 font-medium leading-relaxed">
                We provide safe drinking water to our staff and labourers. To preserve soil contamination from waste waters, we recycle to reduce carbon footprints, and plant trees and plants inside our premises to maintain a safe ecosystem.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {ECO_INITIATIVES.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="bg-brand-bg border border-brand-light-grey rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/5 px-2.5 py-0.5 rounded-full border border-brand-accent/15 mb-2">
                  {item.badge}
                </span>
                <h3 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-grey leading-relaxed font-medium">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Environmental Spotlight Panel */}
          <div className="bg-brand-bg border border-brand-light-grey rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <ScrollReveal>
                  <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                    Ecological Responsibility
                  </span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-brand-ink mb-4">
                    Preserving Soil, Conserving Water &amp; Cultivating Greenery
                  </h3>
                  <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                    We provide safe drinking water to our staff and labourers. To preserve Soil contamination from waste waters, we recycle to reduce carbon footprints. By planting more number of trees and plants inside of premises to maintain safe eco system, Lotus International ensures that export garment manufacturing coexists harmoniously with natural biodiversity.
                  </p>
                </ScrollReveal>
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-center text-xs text-brand-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Safe drinking water provided to our staff and labourers</span>
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
                    <span>Planting more trees and plants inside premises to maintain a safe ecosystem</span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-xl bg-brand-ink/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold font-serif-heading">Eco-Friendly Factory Grounds</h4>
                    <p className="text-[10px] text-brand-bg/80">Lush Plantation &amp; Safe Ecosystem • Tirupur Facility</p>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent uppercase tracking-wider">
                    Green Premises
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* 3. KEY EMPOWERMENT METRICS */}
      <section className="py-16 md:py-20 bg-brand-bg border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Measurable Social Impact
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                Built on Equality, Dignity &amp; Respect
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EMPOWERMENT_METRICS.map((metric, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="bg-white border border-brand-light-grey rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-5">
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

      {/* 3. CORE STORY / SPOTLIGHT */}
      <section className="py-16 md:py-20 bg-brand-bg border-t border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image Panel */}
            <ScrollReveal className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-brand-bg shadow-lg border border-brand-light-grey group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/careers/life_at_lotus.jpg"
                alt="Women artisans on sewing floor at Lotus International Tirupur"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-brand-ink/85 backdrop-blur-md border border-white/20 text-white">
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/30 border border-brand-accent/40 text-brand-accent uppercase tracking-wider inline-block mb-1.5">
                  90% Women Workforce
                </span>
                <h4 className="text-sm sm:text-base font-bold font-serif-heading">
                  Avinashi &amp; Tirupur Manufacturing Facility
                </h4>
                <p className="text-[11px] text-brand-bg/80 mt-0.5">
                  220+ female artisans earning independent wages and shaping community leadership.
                </p>
              </div>
            </ScrollReveal>

            {/* Narrative Content */}
            <div>
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                  Rural Empowerment in Action
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink mb-4 leading-tight">
                  Transforming Rural Lives Through Dignified Livelihoods
                </h2>
                <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-4 font-medium">
                  In many rural villages surrounding Tirupur, women have historically had limited access to structured employment, fair compensation, and formal financial systems. At Lotus International, we made a deliberate commitment over two decades ago to establish our main manufacturing operations where these rural communities could thrive.
                </p>
                <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                  Today, over 220 women operate our production lines. They receive comprehensive technical training, competitive wages with statutory protections, and individual bank deposits that establish genuine financial autonomy in their households.
                </p>
              </ScrollReveal>

              <div className="space-y-3">
                <div className="flex gap-3 items-start text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>100% direct bank account deposits ensuring personal financial control</span>
                </div>
                <div className="flex gap-3 items-start text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>Doorstep pick-up &amp; drop via dedicated company transit for rural safety</span>
                </div>
                <div className="flex gap-3 items-start text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>Equal pay across all sewing, cutting, quality inspection, and finishing roles</span>
                </div>
                <div className="flex gap-3 items-start text-xs text-brand-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>Active promotion tracks from stitchers to line heads and quality managers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIX CORE PILLARS OF EMPOWERMENT */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Holistic Support Framework
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink">
                How We Empower Our Women Artisans
              </h2>
              <p className="text-xs md:text-sm text-brand-grey max-w-xl mx-auto mt-3 font-medium leading-relaxed">
                Empowerment is more than employment—it requires safety, healthcare, skills, career growth, and educational backing for the next generation.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {EMPOWERMENT_PILLARS.map((pillar, idx) => (
              <ScrollReveal
                key={pillar.title}
                delay={idx * 0.06}
                className="p-6 sm:p-7 rounded-2xl bg-brand-bg/50 border border-brand-light-grey/80 shadow-xs hover:shadow-md hover:border-brand-accent/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-brand-light-grey/80 flex items-center justify-center text-brand-accent mb-4 shadow-xs">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif-heading text-lg font-bold text-brand-ink mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brand-grey leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL / VOICES FROM THE FLOOR */}
      <section className="py-16 md:py-20 bg-brand-bg border-t border-brand-light-grey/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-light-grey/80 shadow-md relative overflow-hidden">
            <Quote className="w-16 h-16 text-brand-accent/15 absolute -top-2 right-6 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-4">
                Voice From Our Team
              </span>
              <blockquote className="font-serif-heading text-xl sm:text-2xl md:text-3xl text-brand-ink font-bold leading-relaxed mb-6">
                &ldquo;Joining Lotus as an assistant tailor 8 years ago transformed my family&apos;s future. Today, as a line supervisor leading 35 female artisans, I earn an independent salary that fully funded my daughter&apos;s collegiate degree.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-light-grey/60">
                <div className="w-10 h-10 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent font-bold text-sm">
                  RS
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-ink">R. Selvi</h4>
                  <p className="text-[11px] text-brand-grey font-medium">
                    Production Line Supervisor • 8 Years at Lotus International
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. ETHICAL PARTNERSHIP CTA */}
      <section className="py-16 md:py-20 bg-brand-ink text-brand-bg relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3.5rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
              Ethical Sourcing &amp; Social Accountability
            </span>
            <h2 className="font-serif-heading text-2xl md:text-4xl font-bold mb-3 text-white">
              Partner With an Exporter That Champions Women
            </h2>
            <p className="text-xs sm:text-sm text-brand-bg/85 leading-relaxed mb-8 font-medium">
              When your brand chooses Lotus International, your garments directly support 220+ rural women with dignified livelihoods, safe workplaces, and sustainable financial autonomy.
            </p>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <span>Partner With Our Ethical Factory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
