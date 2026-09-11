import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import TrustGallery from "@/components/TrustGallery";
import {
  GraduationCap,
  Heart,
  Eye,
  Stethoscope,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Calendar,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Jayakumar Srinivasan Charitable Trust | CSR & Women's Empowerment",
  description:
    "Jayakumar Srinivasan Charitable Trust is committed to empowering underprivileged girls through education, higher studies, and free community healthcare camps across Pudhupalayam and Tirupur.",
  openGraph: {
    title: "Jayakumar Srinivasan Charitable Trust | CSR & Education",
    description:
      "Empowering underprivileged girls through education and opportunity. Educate a girl. Empower a generation.",
    images: [
      {
        url: "https://ik.imagekit.io/lotusinternational/csr/trust%20logo.webp",
        width: 1000,
        height: 1000,
        alt: "Jayakumar Srinivasan Charitable Trust Official Logo",
      },
    ],
  },
};

const INITIATIVES = [
  {
    icon: <GraduationCap className="w-6 h-6 text-brand-accent" />,
    badge: "Education Support",
    title: "Year-on-Year School Education for 5 Girl Children",
    subtitle: "Complete school fees, books, and notebooks support",
    description:
      "The Trust sponsors the full educational journey of 5 underprivileged girl children year-on-year. We cover their annual school tuition fees, notebooks, textbooks, uniforms, and essential learning materials, ensuring that financial hardships never interrupt their dreams.",
    highlights: [
      "100% annual school fees sponsored",
      "Full set of notebooks, stationery & academic textbooks",
      "Sustained year-on-year academic continuation",
    ],
  },
  {
    icon: <BookOpen className="w-6 h-6 text-brand-accent" />,
    badge: "Higher Education",
    title: "College Education Sponsorship for a Young Woman",
    subtitle: "Undergraduate degree fees & career empowerment",
    description:
      "Breaking glass ceilings and opening doors to sustainable careers. The Trust provides comprehensive financial assistance and mentorship for a college-going girl, covering her collegiate degree tuition and learning resources so she can step into the world as an independent professional.",
    highlights: [
      "College tuition and academic semester fees",
      "Career mentorship and career development guidance",
      "Paving the pathway toward financial autonomy",
    ],
  },
  {
    icon: <Sparkles className="w-6 h-6 text-brand-sage" />,
    badge: "Pediatric Wellness",
    title: "Monthly Swarnaprashana Free Camp in Pudhupalayam",
    subtitle: "Traditional Ayurvedic immunity drops for village children",
    description:
      "Conducted every month for the infants and young children of in and around Pudhupalayam village, Avinashi. In association with specialized pediatric Ayurvedic practitioners (Manidhi Vedam), children receive pure Swarnaprashana drops to strengthen natural immunity, memory retention, and physical vitality.",
    highlights: [
      "Monthly free camp at Pudhupalayam village center",
      "Traditional Ayurvedic formulation for child immunity",
      "Free pediatric doctor consultations for parents",
    ],
  },
  {
    icon: <Eye className="w-6 h-6 text-brand-accent" />,
    badge: "Occupational Health",
    title: "Comprehensive Eye Camp for Staff & Labourers",
    subtitle: "Professional optometry, screening & vision care",
    description:
      "Garment craftsmanship demands intense visual precision. We organize dedicated, free-of-cost optometry camps on-site for all factory operators, tailors, quality checkers, and labourers. Professional optometrists conduct computerized vision assessments, retinal checks, and provide corrective prescriptions.",
    highlights: [
      "100% free screening for all factory employees",
      "Computerized eye testing and refraction analysis",
      "Prescription eyeglasses and ergonomic lighting advice",
    ],
  },
  {
    icon: <Stethoscope className="w-6 h-6 text-brand-sage" />,
    badge: "Preventive Care",
    title: "General Medical Camp for Workforce Well-being",
    subtitle: "Full vitals check, blood pressure & clinical consultation",
    description:
      "Periodic general health and diagnostic camps organized right at our Tirupur manufacturing unit. Qualified medical doctors and nursing staff screen vital signs, blood sugar, blood pressure, and occupational health markers, followed by free primary medicines and doctor consultations.",
    highlights: [
      "Routine checkups for all floor workers and staff",
      "Blood pressure, vitals & wellness counseling",
      "Follow-up medical advice and preventive health guides",
    ],
  },
];

const TRUST_PILLARS = [
  {
    icon: <Heart className="w-6 h-6 text-brand-accent" />,
    title: "Dignity & Access",
    desc: "Every girl child deserves access to quality education regardless of her economic background. We help them learn with respect, confidence, and pride.",
  },
  {
    icon: <Users className="w-6 h-6 text-brand-accent" />,
    title: "Generational Change",
    desc: "When you educate a girl, you empower an entire family and uplift the next generation. The societal ripple effects are permanent and transformative.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
    title: "Holistic Health",
    desc: "True empowerment is rooted in physical wellness. From village pediatric immunity to employee occupational health, we care for the whole community.",
  },
  {
    icon: <Compass className="w-6 h-6 text-brand-accent" />,
    title: "Long-term Commitment",
    desc: "Our support is not a one-time gesture. We sponsor students year-on-year and run monthly health camps to build lasting community resilience.",
  },
];

export default function TrustPage() {
  return (
    <div className="page-transition">
      {/* Page Header / Hero Section */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-28 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-accent/30 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-brand-sage/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/35 text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Corporate Social Responsibility (CSR)
                </div>
                <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
                  Jayakumar Srinivasan <br className="hidden sm:inline" />
                  Charitable Trust
                </h1>
                <p className="font-serif-heading italic text-xl sm:text-2xl text-brand-accent mt-3 font-medium">
                  &ldquo;Educate a girl. Empower a generation.&rdquo;
                </p>
                <p className="text-sm sm:text-base text-brand-bg/80 mt-5 max-w-2xl font-medium leading-relaxed">
                  Committed to empowering underprivileged girls through education and opportunity, while driving grassroots community health and worker wellness across Tirupur and Pudhupalayam.
                </p>
              </ScrollReveal>
            </div>

            {/* Official Trust Emblem Card */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <ScrollReveal delay={0.15}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/40 to-brand-sage/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white p-5 sm:p-6 rounded-3xl shadow-2xl border border-white/30 flex flex-col items-center text-center">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 relative mb-3">
                      <Image
                        src="https://ik.imagekit.io/lotusinternational/csr/trust%20logo.webp"
                        alt="Jayakumar Srinivasan Charitable Trust Official Emblem"
                        fill
                        sizes="(max-width: 640px) 144px, 176px"
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-ink/90 bg-brand-bg px-3.5 py-1 rounded-full border border-brand-light-grey">
                      Official Trust Emblem
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-10 border-t border-white/15">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-brand-accent">5+ Girls</div>
              <div className="text-xs text-brand-bg/75 mt-1 font-medium">Year-on-Year School Sponsorship</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-brand-sage">1 College</div>
              <div className="text-xs text-brand-bg/75 mt-1 font-medium">Undergraduate Degree Sponsorship</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-brand-accent">Monthly</div>
              <div className="text-xs text-brand-bg/75 mt-1 font-medium">Free Swarnaprashana Camp in Pudhupalayam</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-brand-sage">100% Free</div>
              <div className="text-xs text-brand-bg/75 mt-1 font-medium">Staff Eye &amp; Medical Health Screenings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Story & Mission Statement */}
      <section className="py-20 md:py-24 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Mission Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                  Our Purpose &amp; Ethos
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink leading-tight">
                  Investing in a Girl&apos;s Education, Creating a Lasting Ripple
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-base sm:text-lg text-brand-ink/90 font-medium leading-relaxed">
                  <strong className="text-brand-ink font-semibold">Jayakumar Srinivasan Charitable Trust</strong> is committed to empowering underprivileged girls through education and opportunity. The Trust supports the educational journey of girl children who face financial and social barriers, helping them continue their studies with dignity and confidence.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <p className="text-xs sm:text-sm md:text-base text-brand-grey leading-relaxed font-normal">
                  By investing in a girl’s education, the Trust aims to create a lasting impact—not only in her life, but also in her family and community. Its vision is to build a future where every girl has the opportunity to learn, grow, dream and become independent.
                </p>
              </ScrollReveal>

              {/* Callout Quote Box */}
              <ScrollReveal delay={0.2}>
                <div className="p-6 rounded-2xl bg-white border-l-4 border-brand-accent shadow-sm">
                  <p className="font-serif-heading italic text-xl sm:text-2xl text-brand-ink font-bold">
                    &ldquo;Educate a girl. Empower a generation.&rdquo;
                  </p>
                  <p className="text-xs text-brand-accent uppercase tracking-wider font-bold mt-2">
                    — The Core Principle of Jayakumar Srinivasan Charitable Trust
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Pillars of Impact */}
            <div className="lg:col-span-5 space-y-4">
              {TRUST_PILLARS.map((pillar, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.08} className="p-5 rounded-2xl bg-white border border-brand-light-grey/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-brand-grey leading-relaxed font-medium">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Initiatives Breakdown */}
      <section className="py-20 bg-white border-t border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                Key CSR Pillars
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink mb-4">
                Our Programs &amp; Community Outreach
              </h2>
              <p className="text-xs sm:text-sm text-brand-grey max-w-2xl mx-auto leading-relaxed font-medium">
                Combining sustained academic support for young women with routine medical and pediatric health interventions for our factory artisans and village families.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIATIVES.map((initiative, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="rounded-3xl p-6 sm:p-7 bg-brand-bg/60 border border-brand-light-grey hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between hover:shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-brand-light-grey/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      {initiative.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
                      {initiative.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-xl font-bold text-brand-ink mb-1 group-hover:text-brand-accent transition-colors leading-snug">
                    {initiative.title}
                  </h3>
                  <p className="text-[11px] text-brand-sage font-semibold mb-3">
                    {initiative.subtitle}
                  </p>

                  <p className="text-xs text-brand-grey leading-relaxed font-medium mb-6">
                    {initiative.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-light-grey/80 space-y-2">
                  {initiative.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-[11px] text-brand-ink font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photographic Evidence & Live Gallery */}
      <section className="py-20 md:py-24 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                Ground Reality &amp; Photo Gallery
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink mb-4">
                On-the-Ground Impact in Action
              </h2>
              <p className="text-xs sm:text-sm text-brand-grey leading-relaxed font-medium">
                Photographic records from our ongoing Swarnaprashana child camps in Pudhupalayam village, along with on-site worker eye tests and clinical medical checkups at Lotus International.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive Photo Showcase with Lightbox */}
          <TrustGallery />
        </div>
      </section>

      {/* Ongoing Commitment Notice & Future Updates Banner */}
      <section className="py-14 bg-white border-t border-brand-light-grey/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-bg border border-brand-light-grey mb-4 p-2 shadow-xs">
              <Image
                src="https://ik.imagekit.io/lotusinternational/csr/trust%20logo.webp"
                alt="Jayakumar Srinivasan Charitable Trust"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <div className="block mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                Active Ongoing Non-Profit Initiative
              </span>
            </div>
            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-brand-ink mb-2">
              Continuous Impact &amp; Future Updates
            </h3>
            <p className="text-xs sm:text-sm text-brand-grey leading-relaxed font-medium max-w-2xl mx-auto">
              Jayakumar Srinivasan Charitable Trust works actively with community elders, educators, and healthcare volunteers. We continuously onboard new girl scholars and expand our rural health camps. Additional project documentation, scholarship achievements, and audited CSR reports will be updated here regularly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Connect & Partner CTA */}
      <section className="py-16 md:py-20 bg-brand-ink text-brand-bg relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3.5rem]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white p-2 shadow-xl flex items-center justify-center">
              <Image
                src="https://ik.imagekit.io/lotusinternational/csr/trust%20logo.webp"
                alt="Jayakumar Srinivasan Charitable Trust"
                width={68}
                height={68}
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/20 border border-brand-accent/30 px-3 py-1 rounded-full inline-block mb-3">
              Get Involved &amp; Learn More
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-4xl font-bold mb-4 text-white">
              Join Hands to Educate, Heal &amp; Uplift
            </h3>
            <p className="text-xs sm:text-sm text-brand-bg/85 leading-relaxed mb-8 max-w-xl mx-auto font-medium">
              Want to support a girl student’s education or collaborate with Jayakumar Srinivasan Charitable Trust on local health outreach? Connect with our CSR committee today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Contact CSR Committee</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-brand-bg border border-white/20 font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>About Lotus International</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
