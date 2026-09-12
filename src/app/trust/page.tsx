import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import TrustGallery from "@/components/TrustGallery";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Sparkles,
  Eye,
  Stethoscope,
  CheckCircle2,
  MapPin,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Jayakumar Srinivasan Charitable Trust | Lotus International CSR",
  description:
    "Jayakumar Srinivasan Charitable Trust supports girl child education, higher college studies, and free community healthcare camps across Pudhupalayam and Tirupur.",
  openGraph: {
    title: "Jayakumar Srinivasan Charitable Trust | Lotus International CSR",
    description:
      "Supporting girl child education, college sponsorships, and monthly rural healthcare camps in Pudhupalayam and Tirupur.",
    images: [
      {
        url: "https://ik.imagekit.io/lotusinternational/csr/trust%20logo.webp",
        width: 1000,
        height: 1000,
        alt: "Jayakumar Srinivasan Charitable Trust",
      },
    ],
  },
};

const INITIATIVES = [
  {
    icon: <GraduationCap className="w-5 h-5 text-brand-accent" />,
    badge: "School Education",
    title: "School Education Sponsorship",
    description:
      "We support underprivileged girl children with their annual tuition fees, books, notebooks, and uniforms so that financial difficulty never forces them to leave school.",
    points: [
      "Annual tuition fees fully covered",
      "Notebooks, textbooks, and learning supplies",
      "Continued year-on-year support",
    ],
  },
  {
    icon: <BookOpen className="w-5 h-5 text-brand-accent" />,
    badge: "Higher Studies",
    title: "College & Degree Education",
    description:
      "We sponsor college tuition and study materials for young women pursuing undergraduate degrees, helping them build independent, stable careers.",
    points: [
      "Collegiate semester tuition support",
      "Academic and career guidance",
      "Support through graduation",
    ],
  },
  {
    icon: <Building2 className="w-5 h-5 text-brand-accent" />,
    badge: "Community Care",
    title: "Anganwadi Construction Support",
    description:
      "Partial sponsor for the construction of a new Anganwadi center in partnership with the Inner Wheel Club of Coimbatore West, establishing dedicated rural facilities for early learning and child nutrition.",
    points: [
      "Partial sponsorship for new building construction",
      "Partnered with Inner Wheel Club of Coimbatore West",
      "Safe, nurturing environments for rural toddlers",
    ],
  },
  {
    icon: <Sparkles className="w-5 h-5 text-brand-sage" />,
    badge: "Child Health",
    title: "Monthly Swarnaprashana Camp",
    description:
      "Held every month at Pudhupalayam village, Avinashi, in association with Manidhi Vedam Ayurveda. Infants and young children receive free Swarnaprashana drops for immunity and healthy growth.",
    points: [
      "Free monthly camp in Pudhupalayam village",
      "Traditional Ayurvedic pediatric immunity drops",
      "Doctor consultations for parents and caregivers",
    ],
  },
  {
    icon: <Eye className="w-5 h-5 text-brand-accent" />,
    badge: "Worker Care",
    title: "Free Eye Checkup Camps",
    description:
      "Garment tailoring requires sustained visual focus. We bring qualified optometrists to our factory to run comprehensive eye exams and provide corrective glasses for our staff.",
    points: [
      "Free computerized vision testing",
      "Retinal and eye health evaluations",
      "Prescription glasses provided as needed",
    ],
  },
  {
    icon: <Stethoscope className="w-5 h-5 text-brand-sage" />,
    badge: "Workforce Wellness",
    title: "Routine Medical & Health Checkups",
    description:
      "Periodic general health checkups organized at our Tirupur facility. Doctors and medical staff evaluate vitals, blood sugar, and occupational health, providing primary medicines free of charge.",
    points: [
      "Regular health checkups for factory artisans",
      "Blood pressure and vital signs monitoring",
      "Free doctor consultation and basic medication",
    ],
  },
];

export default function TrustPage() {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-brand-ink text-brand-bg py-16 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[2.5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
                  <span>Corporate Social Responsibility</span>
                </div>
                <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Jayakumar Srinivasan <br className="hidden sm:inline" />
                  Charitable Trust
                </h1>
                <p className="font-serif-heading italic text-lg sm:text-xl text-brand-accent/90 mt-3 font-normal">
                  Educate a girl. Empower a generation.
                </p>
                <p className="text-sm sm:text-base text-brand-bg/80 mt-5 max-w-xl font-normal leading-relaxed">
                  Founded by the promoters of The Lotus International to support education for girl students and provide free healthcare outreach across Pudhupalayam village and Tirupur.
                </p>
              </ScrollReveal>
            </div>

            {/* Right Emblem Card (Single, Clean, Genuine) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <ScrollReveal delay={0.1}>
                <div className="w-full max-w-xs sm:max-w-sm rounded-2xl bg-white border border-white/20 shadow-xl overflow-hidden text-center p-4 sm:p-6">
                  <div className="relative w-32 h-32 sm:w-44 sm:h-44 mx-auto mb-3">
                    <Image
                      src="https://ik.imagekit.io/lotusinternational/csr/trust%20logo.webp"
                      alt="Jayakumar Srinivasan Charitable Trust Emblem"
                      fill
                      sizes="(max-width: 640px) 130px, 180px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="pt-2.5 border-t border-brand-light-grey/80">
                    <div className="text-[11px] sm:text-xs font-semibold text-brand-ink uppercase tracking-wider">
                      Official Trust Emblem
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-brand-grey mt-0.5 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-accent shrink-0" />
                      <span>Pudhupalayam &amp; Tirupur, Tamil Nadu</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* About Our Work / Genuine Context Section */}
      <section className="py-16 md:py-20 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-2">
                Our Purpose
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink leading-snug">
                Helping Girls Complete Their Education &amp; Keeping Our Community Healthy
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <ScrollReveal delay={0.08} className="space-y-4 text-sm text-brand-grey leading-relaxed">
              <p>
                In many families around rural Tirupur, a sudden financial setback can mean a girl child has to leave school. Through the Jayakumar Srinivasan Charitable Trust, we take care of school fees, books, notebooks, and uniforms so that students can continue their schooling with confidence and peace of mind.
              </p>
              <p>
                For students who complete their schooling, we extend full support for college education, covering their semester fees and course requirements until they graduate.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.14} className="space-y-4 text-sm text-brand-grey leading-relaxed">
              <p>
                Alongside education, rural community wellness and early childhood care are central to our work. We partner with social organizations including the Inner Wheel Club of Coimbatore West to sponsor new Anganwadi center construction, creating safe, dedicated learning and nutritional spaces for young children.
              </p>
              <p>
                Every month, we conduct a free pediatric camp in Pudhupalayam village for traditional Swarnaprashana Ayurvedic drops and infant wellness, alongside periodic free eye screenings and health checkups for our factory artisans in Tirupur.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Specific Initiatives */}
      <section className="py-16 md:py-20 bg-white border-t border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <ScrollReveal>
              <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-2">
                Key Initiatives
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                What We Support
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {INITIATIVES.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.05}
                className="p-4 sm:p-6 rounded-2xl bg-brand-bg/50 border border-brand-light-grey flex flex-col justify-between hover:border-brand-accent/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-brand-light-grey flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-lg font-bold text-brand-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-grey leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-light-grey/80 space-y-2">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-[11px] text-brand-ink">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photographic Records / Gallery */}
      <section className="py-16 md:py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <ScrollReveal>
              <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-2">
                Photo Gallery
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                On-the-Ground Activities
              </h2>
              <p className="text-xs sm:text-sm text-brand-grey mt-2">
                Photos from our student education sponsorships, monthly child wellness camps in Pudhupalayam village, and workforce health screenings.
              </p>
            </ScrollReveal>
          </div>

          <TrustGallery />
        </div>
      </section>

      {/* Minimalistic, Sincere Closing Section (NO DUPLICATE LOGO!) */}
      <section className="py-16 md:py-20 bg-brand-ink text-brand-bg rounded-t-[2rem] md:rounded-t-[2.5rem]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-2">
              Connect With Us
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Get in Touch With Our CSR Team
            </h2>
            <p className="text-xs sm:text-sm text-brand-bg/75 leading-relaxed max-w-xl mx-auto mb-8">
              If you would like to know more about our student sponsorships, ongoing health camps, or community initiatives, feel free to reach out to us.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/contact"
                className="px-7 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Contact CSR Committee</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about"
                className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-brand-bg border border-white/20 font-semibold text-xs tracking-wider uppercase transition-colors"
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
