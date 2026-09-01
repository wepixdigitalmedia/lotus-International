"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ParallaxElement, HeroParallaxBackground } from "@/components/ParallaxElement";
import ManufacturingScrollPin from "@/components/ManufacturingScrollPin";
import {
  ArrowRight,
  Award,
  Shield,
  Globe,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Scissors,
  Shirt,
  Printer,
  Palette,
  Package,
  Camera,
  CheckCircle2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Clock,
  UserCheck,
  Percent,
  Users,
  Factory,
  Dumbbell,
  Briefcase,
  Smile,
  User,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import StatCounter from "@/components/StatCounter";
import ParallaxImage from "@/components/ParallaxImage";
import ConsultationModal from "@/components/ConsultationModal";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/db";

// Hero animated tags
const HERO_TAGS = [
  "Clothing Manufacturing",
  "OEM Specialist",
  "Private Label",
  "Bulk Production",
  "Worldwide Shipping",
];

// Single tag rotating typewriter / letter reveal loop component
function HeroTagRotator() {
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % HERO_TAGS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const activeTag = HERO_TAGS[tagIndex];

  return (
    <div className="inline-flex items-center justify-center min-h-[46px]">
      <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:border-brand-accent/50 hover:bg-brand-accent/15 backdrop-blur-md shadow-xl transition-colors duration-300">
        {/* Pulsing indicator dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
        </span>

        <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest shrink-0">
          Core Expertise:
        </span>

        {/* Animated Letter Reveal for the active tag */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center"
          >
            <motion.span
              className="font-bold text-xs md:text-sm text-white uppercase tracking-wider flex whitespace-nowrap"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.035,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {activeTag.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 4, filter: "blur(3px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.15 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.75 }}
              className="inline-block w-0.5 h-3.5 bg-brand-accent ml-1.5 shrink-0"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Trust stats
const TRUST_STATS = [
  { end: 15, suffix: "M+", label: "Pieces Manufactured" },
  { end: 25, suffix: "+", label: "Countries Served" },
  { end: 120, suffix: "+", label: "Brands Partnered" },
  { end: 22, suffix: "+", label: "Years of Experience" },
];


const SERVICES = [
  {
    icon: <Cpu className="w-4 h-4 text-brand-accent" />,
    title: "Custom Manufacturing",
    category: "Design & Sourcing",
    desc: "End-to-end knitwear production, custom cutting and sewing patterns designed for your retail specifications.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/custom%20manufaturing.webp",
  },
  {
    icon: <Layers className="w-4 h-4 text-brand-accent" />,
    title: "Fabric Sourcing",
    category: "Design & Sourcing",
    desc: "Direct mill relationships for custom yarn counts, organic cotton, bamboo fibers, and sustainable blends.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Fabric%20Sourcing.webp",
  },
  {
    icon: <Scissors className="w-4 h-4 text-brand-accent" />,
    title: "Pattern Making",
    category: "Design & Sourcing",
    desc: "Digital 2D/3D CAD patterns with precise measurements to optimize sizing fits and fabric yields.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Pattern%20Making.webp",
  },
  {
    icon: <Palette className="w-4 h-4 text-brand-accent" />,
    title: "Graphic Design",
    category: "Design & Sourcing",
    desc: "Tech-pack preparation, CAD mockup illustration, artwork vectorization, and placement prints setup.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Graphic%20Design.webp",
  },
  {
    icon: <Shirt className="w-4 h-4 text-brand-accent" />,
    title: "Sampling",
    category: "Printing & Embellishment",
    desc: "Rapid prototyping and fit sample development, delivering sealed PP counters within 7-10 business days.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Sampling.webp",
  },
  {
    icon: <Printer className="w-4 h-4 text-brand-accent" />,
    title: "DTF Printing",
    category: "Printing & Embellishment",
    desc: "Direct-to-Film high-resolution transfers offering stretchability and wash durability for streetwear.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/DTF%20Printing.webp",
  },
  {
    icon: <Palette className="w-4 h-4 text-brand-accent" />,
    title: "Screen Printing",
    category: "Printing & Embellishment",
    desc: "Water-based ink prints, plastisol, puff, high-density, discharge, and premium retail finishes.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Screen%20Printing.webp",
  },
  {
    icon: <Sparkles className="w-4 h-4 text-brand-accent" />,
    title: "Embroidery",
    category: "Printing & Embellishment",
    desc: "Computerized multi-head embroidery, chenille patches, felt applications, and premium thread logos.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Embroidery.webp",
  },
  {
    icon: <Palette className="w-4 h-4 text-brand-accent" />,
    title: "Garment Dye",
    category: "Dyeing & Finishing",
    desc: "Eco-certified reactive dyeing, pigment dyeing, tie-dye, cold dye, and enzyme washes.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Garment%20Dyeing.webp",
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-brand-accent" />,
    title: "Finishing",
    category: "Dyeing & Finishing",
    desc: "Heavy steam pressing, thread trimming, metal detection gates, and final AQL 1.5 audits.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Finishing.webp",
  },
  {
    icon: <Package className="w-4 h-4 text-brand-accent" />,
    title: "Packaging",
    category: "Dyeing & Finishing",
    desc: "Retail-ready tags, UPC barcode labels, price tickets, custom fold templates, and recycled polybags.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Packaging.webp",
  },
  {
    icon: <Award className="w-4 h-4 text-brand-accent" />,
    title: "Branding",
    category: "Branding & Logistics",
    desc: "Custom satin neck labels, tear-away tags, high-density transfer labels, and cardboard paper hangtags.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Branding.webp",
  },
  {
    icon: <Camera className="w-4 h-4 text-brand-accent" />,
    title: "Product Photography",
    category: "Branding & Logistics",
    desc: "Studio flat-lays, ghost mannequin catalog shoots, and lifestyle apparel photography for your website launch.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Product%20Photography.webp",
  },
  {
    icon: <Globe className="w-4 h-4 text-brand-accent" />,
    title: "Worldwide Shipping",
    category: "Branding & Logistics",
    desc: "Sea freight via Tuticorin/Chennai, air freight via Bangalore, custom clearances, and door-to-door forwarding.",
    image: "https://ik.imagekit.io/wepix/lotus%20international/B2B%20Services/Worldwide%20Shipping.webp",
  },
];

// Timeline steps
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Consultation",
    tagline: "Program & Cost Alignment",
    desc: "Initial program review, fabric alignment, costing sheets, and target lead-time planning.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    num: "02",
    title: "Tech Pack Review",
    tagline: "CAD & Yield Engineering",
    desc: "Sizing specs and pattern vector files are verified by our CAD masters for production yields.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    num: "03",
    title: "Sampling & Approvals",
    tagline: "Fit Prototyping & Sign-Off",
    desc: "Knitting lab dips, fit counters, and sample fabrication. Physical sign-off prior to bulk operations.",
    icon: <Shirt className="w-5 h-5" />,
  },
  {
    num: "04",
    title: "Bulk Production",
    tagline: "Precision Knit & Assembly",
    desc: "Linear fabric relaxation, computerized lay cutting, sewing line assembly, and inline verification.",
    icon: <Factory className="w-5 h-5" />,
  },
  {
    num: "05",
    title: "Quality Inspection",
    tagline: "AQL 1.5 Strict Auditing",
    desc: "Stitch count audits, measurement checks, garment safety checks, and dual metal-detector scans.",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    num: "06",
    title: "Packaging",
    tagline: "Retail Presentation Ready",
    desc: "Steam iron press, customized label tagging, fold layouts, and recycled carton packing.",
    icon: <Package className="w-5 h-5" />,
  },
  {
    num: "07",
    title: "Shipping",
    tagline: "Global Freight Dispatch",
    desc: "Custom container consolidation, port logistics dispatch, and ocean/air bill of lading tracking.",
    icon: <Globe className="w-5 h-5" />,
  },
];

// Why choose us comparison cards
const WHY_CHOOSE_US = [
  {
    title: "Premium Quality",
    desc: "All garments pass AQL 1.5 standards. Inline checkers inspect every single garment.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/premium%20quality.png",
  },
  {
    title: "Fast Production",
    desc: "Optimized assembly workflows ensure bulk shipping dispatch within 45 to 60 days.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/fast%20production.png",
  },
  {
    title: "Dedicated Account Manager",
    desc: "Direct communication with Tirupur coordinators. Weekly video reports on progress.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/account%20manager.png",
  },
  {
    title: "Worldwide Shipping",
    desc: "Coordination with global freight shipping lines for reliable port arrival.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/worldwide%20shipping.png",
  },
  {
    title: "Low MOQ",
    desc: "Base order sizes start from 1,000 pcs. concessions up to 500 pcs for eco blends.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/Low%20MOQ.png",
  },
  {
    title: "Transparent Pricing",
    desc: "Clean BOM cost breakdowns, no hidden raw-material surcharges, fixed contracts.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/Transparent%20Price.png",
  },
  {
    title: "Quality Inspection",
    desc: "Oeko-Tex Standard 100 chemical tests, needle-detection tunnel safety passes.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/Quality%20Inpection.png",
  },
  {
    title: "Timely Delivery",
    desc: "Slick critical path tracking ensures we maintain 99.2% on-time container loading.",
    icon: "https://ik.imagekit.io/wepix/lotus%20international/icons/Timely%20Delivery.png",
  },
];

// Industries served
const INDUSTRIES = [
  {
    title: "Fashion Brands",
    tagline: "Trendy apparel for leading fashion labels.",
    desc: "Premium retail silhouettes, custom fits, and dynamic seasonal colorway collections.",
    icon: <Shirt className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[26%]",
    minHeight: "lg:min-h-[360px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[32px] lg:rounded-bl-[28px] lg:rounded-tr-[24px] lg:rounded-br-[48px]",
  },
  {
    title: "Streetwear Labels",
    tagline: "Urban styles built for modern streetwear brands.",
    desc: "Heavyweight hoodies, oversized t-shirts, drop-shoulder fleece, and high-density printing.",
    icon: <Layers className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[22%]",
    minHeight: "lg:min-h-[385px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[24px] lg:rounded-tr-[28px] lg:rounded-bl-[40px] lg:rounded-br-[24px]",
  },
  {
    title: "Luxury Clothing",
    tagline: "Premium quality garments for luxury fashion brands.",
    desc: "Fine bamboo cotton blends, silk handfeel finishes, herbal dyeing, and minimalist designs.",
    icon: <Sparkles className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[28%]",
    minHeight: "lg:min-h-[360px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[32px] lg:rounded-tr-[28px] lg:rounded-bl-[24px] lg:rounded-br-[40px]",
  },
  {
    title: "Sportswear",
    tagline: "High-performance apparel for active lifestyles.",
    desc: "Interlock mock-mesh, high-stretch elastane blends, flatlock sewing, and moisture-wicking yarns.",
    icon: <Dumbbell className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[24%]",
    minHeight: "lg:min-h-[385px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[24px] lg:rounded-tr-[32px] lg:rounded-bl-[44px] lg:rounded-br-[28px]",
  },
  {
    title: "Corporate Uniforms",
    tagline: "Smart, durable uniforms for teams and organizations.",
    desc: "Classic combed cotton pique polos, durable rib collars, embroidery badges, and wash-resistant dyes.",
    icon: <Briefcase className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[27%]",
    minHeight: "lg:min-h-[355px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[28px] lg:rounded-bl-[32px] lg:rounded-tr-[44px] lg:rounded-br-[24px]",
  },
  {
    title: "Kids Wear",
    tagline: "Comfortable and safe clothing for kids of all ages.",
    desc: "Ultra-soft GOTS certified organic rompers, Nickel-free snaps, and safe water-based prints.",
    icon: <Smile className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[25%]",
    minHeight: "lg:min-h-[335px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[40px] lg:rounded-bl-[28px] lg:rounded-tr-[24px] lg:rounded-br-[32px]",
  },
  {
    title: "Women Wear",
    tagline: "Elegant and versatile styles for every woman.",
    desc: "Lightweight slub t-shirts, crop fleece, knit loungesets, and tailored female silhouettes.",
    icon: <User className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[23%]",
    minHeight: "lg:min-h-[380px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[24px] lg:rounded-bl-[28px] lg:rounded-tr-[36px] lg:rounded-br-[32px]",
  },
  {
    title: "Private Labels",
    tagline: "Custom-made apparel for your unique brand identity.",
    desc: "Tear-away collar support, custom barcode tagging, custom packaging, and complete retail presentation.",
    icon: <Tag className="w-4 h-4" />,
    bgImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
    widthClass: "lg:w-[25%]",
    minHeight: "lg:min-h-[355px]",
    roundedClass: "rounded-3xl lg:rounded-tl-[44px] lg:rounded-bl-[24px] lg:rounded-tr-[28px] lg:rounded-br-[32px]",
  },
];

// Featured Projects
const PORTFOLIO_PROJECTS = [
  {
    title: "Nature Polo Organic Collection",
    category: "Eco Blends",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Heavy Fleece Streetwear Hoodies",
    category: "Streetwear",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Premium Combed Pique Polos",
    category: "Polos",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Seamless Lounge & Knit Activewear",
    category: "Activewear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Infant Oeko-Tex Romper Range",
    category: "Kids Wear",
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Sustainable Bamboo fiber Tees",
    category: "Eco Blends",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
  },
];

// Testimonials
const TESTIMONIALS = [
  {
    quote:
      "The Lotus International has been our primary B2B knitwear manufacturing partner in India for over 8 years. Their consistency in AQL 1.5 standards, organic cotton sourcing, and transparent timelines is outstanding.",
    author: "Marcello V.",
    role: "Director of Global Sourcing",
    company: "Studio Earth (Europe)",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
    logo: "STUDIO EARTH",
  },
  {
    quote:
      "Their commitment to ethical labor, solar-powered loops, and 100% GOTS compliance made them the ideal partner for our organic capsule programs. Their sampling speed is the fastest in Tirupur.",
    author: "Ritu M.",
    role: "Apparel Procurement Lead",
    company: "Fabindia",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
    logo: "FABINDIA",
  },
  {
    quote:
      "Dealing with Lotus means zero worries about compliance audits or shipping slip-ups. Their Sedex 4-Pillar audit scores are top-tier. Truly an enterprise B2B export manufacturer.",
    author: "S. K. Goel",
    role: "Managing Director",
    company: "M.G. Cotton Exports",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    logo: "M.G. COTTON",
  },
];

// FAQ items
const FAQS = [
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "Our standard MOQ is 1,000 pieces per style/colorway. For custom eco-blends like bamboo-organic cotton blends under the Nature Polo Club line, we support concessions down to 500 pieces per colorway.",
  },
  {
    q: "How long does the sampling process take?",
    a: "Standard fit and prototype samples take 7 to 10 business days post tech-pack approval. Lab dips for Pantone color matching take 5 business days. Sampling costs are fully credited against bulk order invoices.",
  },
  {
    q: "What certifications do your manufacturing plants hold?",
    a: "Our facility is Sedex 4-Pillar audited (Labor, Ethics, Environment, Health & Safety). We are certified for GOTS (Global Organic Textile Standard), OEKO-TEX Standard 100, and ISO 9001:2015 for quality management systems.",
  },
  {
    q: "Are your facilities fully sustainable?",
    a: "Yes. 100% of our floor operations run on captive solar energy arrays. We also operate a Zero Liquid Discharge (ZLD) RO plant that recycles 95% of our waste water back into the facility loops.",
  },
  {
    q: "Can you assist with shipping and customs clearance?",
    a: "Absolutely. We offer complete FOB (Free on Board) or CIF shipping terms. We regularly consolidate shipping containers via Chennai and Tuticorin ports, or airfreight via Bangalore for express programs.",
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activePortfolioFilter, setActivePortfolioFilter] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Portfolio filters list
  const portfolioFilters = ["All", "Eco Blends", "Streetwear", "Polos", "Activewear", "Kids Wear"];

  const filteredProducts =
    activePortfolioFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          const filterLower = activePortfolioFilter.toLowerCase();
          const matchCategory = p.category.toLowerCase().includes(filterLower);
          const matchType = p.type.toLowerCase().includes(filterLower);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(filterLower));
          return matchCategory || matchType || matchTags;
        });

  // Ref & scroll function for Product Carousel
  const productCarouselRef = React.useRef<HTMLDivElement>(null);

  const scrollProductCarousel = (direction: "left" | "right") => {
    if (productCarouselRef.current) {
      const scrollAmount = productCarouselRef.current.clientWidth;
      productCarouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="page-transition bg-brand-bg text-brand-ink">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-brand-ink rounded-b-[2rem] md:rounded-b-[3.5rem] shadow-xl">
        {/* Parallax Video Background */}
        <HeroParallaxBackground className="absolute inset-0 z-0 opacity-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
            poster="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1600"
          >
            <source
              src="https://lotusinternationaltextiles.com/static/images/frontend/hero_banner/home/home_hero.mp4"
              type="video/mp4"
            />
          </video>
        </HeroParallaxBackground>

        {/* Ambient glowing blobs with inverse parallax */}
        <ParallaxElement speed={-0.4} className="absolute -top-40 -left-40 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
        <ParallaxElement speed={0.5} className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-sage/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full lg:w-[80%] max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-6 md:pt-8 pb-12 md:pb-16 text-center">
          <div className="space-y-6 md:space-y-8 flex flex-col items-center">
            
            <ScrollReveal delay={0.1}>
              <ParallaxElement speed={0.1}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/20 text-xs font-bold tracking-widest text-brand-accent uppercase shadow-sm">
                  <Sparkles className="w-4 h-4" /> High-End Garment Exports • Est. 2004
                </span>
              </ParallaxElement>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-heading leading-[1.15] tracking-tight text-white">
                Your Manufacturing Partner <br />
                <span className="text-brand-accent italic font-bold">From Design To Delivery</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
                We are a premier private-label knitwear manufacturer in Tirupur, India.
                Specializing in OEM clothing manufacturing, certified organic fabrics,
                and high-density streetwear. Powered by 100% solar operations, exporting worldwide.
              </p>
            </ScrollReveal>

            {/* Dynamic Rotating Tag (One-by-One Loop Reveal) */}
            <ScrollReveal delay={0.35}>
              <HeroTagRotator />
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="flex flex-wrap justify-center gap-4 items-center pt-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs tracking-widest uppercase transition-all shadow-xl hover:shadow-brand-accent/30 flex items-center gap-2 group"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="px-8 py-4 rounded-xl border border-white/30 hover:border-white hover:bg-white/10 text-white font-bold text-xs tracking-widest uppercase transition-all bg-white/5 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </ScrollReveal>

            {/* Sub-banner trust text */}
            <ScrollReveal delay={0.45} className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-accent/90 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Award className="w-4 h-4" /> SEDEX 4-PILLAR AUDITED &amp; GOTS CERTIFIED
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 2. TRUST / ACHIEVEMENT SECTION */}
      <section className="py-5 sm:py-8 md:py-14 bg-white relative z-10 -mt-5 sm:-mt-8 mx-4 sm:mx-6 md:mx-12 rounded-2xl md:rounded-3xl shadow-md md:shadow-lg border border-brand-light-grey/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2 md:gap-0 divide-y-0 md:divide-x divide-brand-light-grey/60">
            {TRUST_STATS.map((stat, idx) => (
              <StatCounter
                key={idx}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. LOGO TICKER */}
      <section className="py-12 overflow-hidden bg-brand-bg opacity-75">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h3 className="text-center text-[10px] font-bold tracking-[0.25em] uppercase text-brand-grey/85 mb-8">
            TRUSTED PARTNER & GLOBAL APPAREL BRANDS
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
            {[
              { src: "https://ik.imagekit.io/wepix/lotus%20international/us%20polo%20assn.png", alt: "U.S. Polo Assn." },
              { src: "https://ik.imagekit.io/wepix/lotus%20international/max.png", alt: "Max Fashion" },
              { src: "https://ik.imagekit.io/wepix/lotus%20international/aeropostale.png", alt: "Aeropostale" },
              { src: "https://ik.imagekit.io/wepix/lotus%20international/studio%20earth.png", alt: "Studio Earth" },
              { src: "https://ik.imagekit.io/wepix/lotus%20international/fabrika.png", alt: "Fabrika" },
              { src: "https://ik.imagekit.io/wepix/lotus%20international/liverpool.png", alt: "Liverpool" },
              { src: "https://ik.imagekit.io/wepix/lotus%20international/french%20connection.png", alt: "French Connection" },
            ].map((brand) => (
              <img
                key={brand.alt}
                src={brand.src}
                alt={brand.alt}
                className="h-8 md:h-10 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-20 md:py-28 bg-white border-t border-b border-brand-light-grey/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-4">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block">
                Factory Capabilities
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink">
                Our Premium B2B Services
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-xs md:text-sm text-brand-grey max-w-2xl mx-auto leading-relaxed font-medium">
                At Lotus, we control yarn loop structures, patterns, custom stitching,
                finishing, and global clearance logistics under one roof in Tirupur.
              </p>
            </ScrollReveal>
          </div>

          {/* Unified Mosaic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4.5">
            {SERVICES.map((serv, idx) => {
              return (
                <ScrollReveal
                  key={serv.title}
                  delay={Math.min(idx * 0.04, 0.3)}
                  className="flex"
                >
                  <Link
                    href="/products"
                    style={{ clipPath: `url(#mosaic-clip-${(idx % 8) + 1})` }}
                    className="w-full relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[320px] sm:min-h-[350px] lg:min-h-[370px] group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-7 hover:-translate-y-1.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={serv.image}
                      alt={serv.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.82] group-hover:brightness-[0.72]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent group-hover:from-brand-ink/95 transition-colors duration-500 pointer-events-none" />

                    {/* Terracotta Icon Badge placed directly above title */}
                    <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-accent flex items-center justify-center text-white shadow-md mb-2.5 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-white">
                      {serv.icon}
                    </div>

                    {/* Text Details */}
                    <div className="relative z-10">
                      <h3 className="font-serif-heading text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-brand-accent transition-colors duration-300 leading-snug">
                        {serv.title}
                      </h3>
                      
                      {/* Description revealed on hover */}
                      <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 ease-out">
                        <div className="overflow-hidden">
                          <p className="text-xs text-white/85 leading-relaxed font-normal pt-2 line-clamp-2 max-w-[260px]">
                            {serv.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Bottom Action CTAs */}
          <ScrollReveal delay={0.3} className="mt-12 md:mt-14 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-brand-accent/30 flex items-center gap-2 group cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              href="/services"
              className="text-xs sm:text-sm font-bold text-brand-ink hover:text-brand-accent transition-colors underline underline-offset-8 decoration-brand-accent/60 hover:decoration-brand-accent flex items-center gap-2"
            >
              <span>View All Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>

        </div>
      </section>

      {/* 5. MANUFACTURING TIMELINE PROCESS — Sticky Scroll Pin */}
      <ManufacturingScrollPin steps={PROCESS_STEPS} />

      {/* 6. WHY CHOOSE US / VALUE PROPOSITIONS */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[#FAF7F2] border-t border-b border-brand-light-grey/60">
        {/* Parallax Background Image with Light Translucent Veil */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParallaxImage
            src="https://ik.imagekit.io/wepix/lotus%20international/banner/banner%20image%20LI%2001.webp"
            alt="Lotus International Facility & Craftsmanship"
            speed={0.14}
            className="w-full h-full object-cover scale-105"
            containerClassName="relative w-full h-full overflow-hidden"
          />
          {/* Subtle Light Translucent Veil for High Image Visibility with Bright Heading Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/60 via-[#FAF7F2]/30 to-[#FAF7F2]/60" />
          <div className="absolute top-0 inset-x-0 h-96 bg-radial from-white/80 via-white/35 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3.5">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-white/90 border border-brand-accent/25 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-md shadow-xs">
                Value Propositions
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink drop-shadow-[0_2px_16px_rgba(255,255,255,0.95)]">
                Why Global Brands Partner with <span className="text-brand-accent drop-shadow-[0_2px_16px_rgba(255,255,255,0.95)]">Lotus</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-xs md:text-sm text-brand-ink/90 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_12px_rgba(255,255,255,0.95)]">
                Combining cotton craftsmanship in Tirupur with certified compliance integrity, strict AQL 1.5 inspection, and transparent delivery.
              </p>
            </ScrollReveal>
          </div>

          {/* Compact 4-Column Grid of Enhanced Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {WHY_CHOOSE_US.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.04} className="flex">
                <div className="w-full bg-white/92 hover:bg-white backdrop-blur-xl border border-brand-light-grey/80 hover:border-brand-accent rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-2xl transition-all duration-300 flex items-start gap-4 group hover:-translate-y-1.5 cursor-pointer relative">
                  {/* Left Side: Logo / Icon with soft warm circular background */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF5F0] border border-[#F2E8DE] flex items-center justify-center shrink-0 group-hover:scale-108 group-hover:border-brand-accent/30 transition-all duration-300 p-2.5 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain drop-shadow-xs"
                    />
                  </div>

                  {/* Right Side: Title + Terracotta Accent Line + Description */}
                  <div className="min-w-0 flex-1 flex flex-col">
                    <h4 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <div className="w-4 h-0.5 bg-brand-accent/50 group-hover:w-7 group-hover:bg-brand-accent transition-all duration-300 my-1.5" />
                    <p className="text-xs text-brand-grey leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 7. INDUSTRIES WE SERVE */}
      <section className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3.5">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-block">
                Apparel Segments
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink">
                Industries We Serve
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-xs md:text-sm text-brand-grey max-w-xl mx-auto leading-relaxed font-medium">
                We deliver retail-ready garment lines across different styles, fabrics, and branding grids.
              </p>
            </ScrollReveal>
          </div>

          {/* SVG ClipPaths with filleted rounded vertices for Desktop Mosaic */}
          <svg width="0" height="0" className="absolute pointer-events-none opacity-0">
            <defs>
              {/* Card 1: Top-Left */}
              <clipPath id="mosaic-clip-1" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0 L 0.93 0 Q 1 0 1 0.07 L 1 0.90 Q 1 0.96 0.93 0.96 L 0.07 1 Q 0 1 0 0.93 L 0 0.07 Q 0 0 0.07 0 Z" />
              </clipPath>

              {/* Card 2: Top-Middle-Left */}
              <clipPath id="mosaic-clip-2" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0 L 0.93 0 Q 1 0 1 0.07 L 1 0.93 Q 1 1 0.93 1 L 0.07 0.96 Q 0 0.96 0 0.90 L 0 0.07 Q 0 0 0.07 0 Z" />
              </clipPath>

              {/* Card 3: Top-Middle-Right */}
              <clipPath id="mosaic-clip-3" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0 L 0.93 0 Q 1 0 1 0.07 L 1 0.90 Q 1 0.96 0.93 0.96 L 0.07 1 Q 0 1 0 0.93 L 0 0.07 Q 0 0 0.07 0 Z" />
              </clipPath>

              {/* Card 4: Top-Right */}
              <clipPath id="mosaic-clip-4" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0 L 0.93 0 Q 1 0 1 0.07 L 1 0.93 Q 1 1 0.93 1 L 0.07 0.96 Q 0 0.96 0 0.90 L 0 0.07 Q 0 0 0.07 0 Z" />
              </clipPath>

              {/* Card 5: Bottom-Left */}
              <clipPath id="mosaic-clip-5" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0.04 L 0.93 0 Q 1 0 1 0.07 L 1 0.93 Q 1 1 0.93 1 L 0.07 1 Q 0 1 0 0.93 L 0 0.10 Q 0 0.04 0.07 0.04 Z" />
              </clipPath>

              {/* Card 6: Bottom-Middle-Left */}
              <clipPath id="mosaic-clip-6" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0 L 0.93 0.04 Q 1 0.04 1 0.10 L 1 0.93 Q 1 1 0.93 1 L 0.07 1 Q 0 1 0 0.93 L 0 0.07 Q 0 0 0.07 0 Z" />
              </clipPath>

              {/* Card 7: Bottom-Middle-Right */}
              <clipPath id="mosaic-clip-7" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0.04 L 0.93 0 Q 1 0 1 0.07 L 1 0.93 Q 1 1 0.93 1 L 0.07 1 Q 0 1 0 0.93 L 0 0.10 Q 0 0.04 0.07 0.04 Z" />
              </clipPath>

              {/* Card 8: Bottom-Right */}
              <clipPath id="mosaic-clip-8" clipPathUnits="objectBoundingBox">
                <path d="M 0.07 0 L 0.93 0.04 Q 1 0.04 1 0.10 L 1 0.93 Q 1 1 0.93 1 L 0.07 1 Q 0 1 0 0.93 L 0 0.07 Q 0 0 0.07 0 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Unified Perfectly-Aligned 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4.5">
            {INDUSTRIES.map((ind, idx) => (
              <ScrollReveal key={ind.title} delay={idx * 0.04} className="flex">
                <Link
                  href="/products"
                  style={{ clipPath: `url(#mosaic-clip-${idx + 1})` }}
                  className="w-full relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[320px] sm:min-h-[350px] lg:min-h-[370px] group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-7 hover:-translate-y-1.5"
                >
                  <img
                    src={ind.bgImage}
                    alt={ind.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.82] group-hover:brightness-[0.72]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent group-hover:from-brand-ink/95 transition-colors duration-500 pointer-events-none" />

                  {/* Terracotta Icon Badge placed directly above title */}
                  <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-accent flex items-center justify-center text-white shadow-md mb-2.5 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-4 [&>svg]:h-4">
                    {ind.icon}
                  </div>

                  {/* Text Details */}
                  <div className="relative z-10">
                    <h3 className="font-serif-heading text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-brand-accent transition-colors duration-300 leading-snug">
                      {ind.title}
                    </h3>
                    
                    {/* Description revealed on hover */}
                    <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-xs text-white/85 leading-relaxed font-normal pt-2 line-clamp-2 max-w-[260px]">
                          {ind.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Action CTAs */}
          <ScrollReveal delay={0.3} className="mt-12 md:mt-14 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-brand-accent/30 flex items-center gap-2 group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/manufacturing"
              className="text-xs sm:text-sm font-bold text-brand-ink hover:text-brand-accent transition-colors underline underline-offset-8 decoration-brand-accent/60 hover:decoration-brand-accent flex items-center gap-2"
            >
              <span>Explore Our Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>

        </div>
      </section>

      {/* 8. FEATURED PROGRAMS PRODUCT SHOWCASE */}
      <section className="py-24 bg-white border-t border-b border-brand-light-grey/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 px-3 py-1 rounded-full">
                Product Showcases
              </span>
              <h2 className="font-serif-heading text-3xl md:text-5xl font-bold text-brand-ink">
                Featured Programs
              </h2>
            </div>

            {/* Filter buttons & Carousel controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {portfolioFilters.map((filt) => (
                  <button
                    key={filt}
                    onClick={() => setActivePortfolioFilter(filt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                      activePortfolioFilter === filt
                        ? "bg-brand-accent text-white shadow-md"
                        : "bg-brand-bg text-brand-ink border border-brand-light-grey/80 hover:bg-brand-light-grey/50"
                    }`}
                  >
                    {filt}
                  </button>
                ))}
              </div>

              {/* Header Carousel Arrow Controls */}
              <div className="flex items-center gap-2 ml-auto md:ml-2">
                <button
                  onClick={() => scrollProductCarousel("left")}
                  aria-label="Previous products"
                  className="w-9 h-9 rounded-xl border border-brand-light-grey bg-brand-bg hover:bg-brand-accent hover:border-brand-accent hover:text-white text-brand-ink flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollProductCarousel("right")}
                  aria-label="Next products"
                  className="w-9 h-9 rounded-xl border border-brand-light-grey bg-brand-bg hover:bg-brand-accent hover:border-brand-accent hover:text-white text-brand-ink flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Cards Horizontal Carousel Container */}
          <div className="relative group/carousel">
            {/* Floating Left Arrow */}
            <button
              onClick={() => scrollProductCarousel("left")}
              aria-label="Previous products"
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 text-brand-ink border border-brand-light-grey/80 hover:bg-brand-accent hover:border-brand-accent hover:text-white shadow-xl items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Floating Right Arrow */}
            <button
              onClick={() => scrollProductCarousel("right")}
              aria-label="Next products"
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 text-brand-ink border border-brand-light-grey/80 hover:bg-brand-accent hover:border-brand-accent hover:text-white shadow-xl items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={productCarouselRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 px-1"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start flex flex-col"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Catalog CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-ink hover:bg-brand-accent text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md group"
            >
              <span>Explore Entire Garment Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* 9. CLIENT TESTIMONIALS */}
      <section className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">

          <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 px-3 py-1 rounded-full mb-6 inline-block">
            Global Feedback
          </span>

          {/* Slides Carousel container */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 md:space-y-8"
              >
                {/* Quotation text */}
                <p className="font-serif-heading text-xl md:text-2xl lg:text-3xl font-medium text-brand-ink leading-relaxed italic">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>

                {/* Client Avatar details */}
                <div className="flex flex-col items-center justify-center space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={TESTIMONIALS[activeTestimonial].photo}
                    alt={TESTIMONIALS[activeTestimonial].author}
                    className="w-12 h-12 rounded-full object-cover border border-brand-accent/40"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-brand-ink">
                      {TESTIMONIALS[activeTestimonial].author}
                    </h4>
                    <p className="text-[10px] text-brand-grey font-semibold mt-0.5">
                      {TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-full border border-brand-ink/10 hover:border-brand-accent hover:text-brand-accent transition-colors bg-white shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-full border border-brand-ink/10 hover:border-brand-accent hover:text-brand-accent transition-colors bg-white shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 10. PREMIUM ACCORDION FAQ */}
      <section className="py-24 bg-white border-t border-b border-brand-light-grey/50">
        <div className="max-w-3xl mx-auto px-6 md:px-8">

          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 px-3 py-1 rounded-full">
              Common Inquiries
            </span>
            <h2 className="font-serif-heading text-2xl md:text-4xl font-bold text-brand-ink">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-brand-light-grey/80 hover:border-brand-accent/40 rounded-2xl overflow-hidden bg-white/70 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-serif-heading text-sm md:text-base font-bold text-brand-ink pr-4">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-accent shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-accent shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs text-brand-grey leading-relaxed border-t border-brand-light-grey/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. FINAL CALL TO ACTION */}
      <section className="bg-brand-ink text-brand-bg py-24 relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-2xl">
        <div className="absolute inset-0 opacity-15">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
            alt="Organic knitwear products array"
            speed={0.12}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center space-y-6 md:space-y-8">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/15 text-[10px] font-bold tracking-widest text-brand-accent uppercase">
              Attract Global Clients
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif-heading text-3xl md:text-5xl font-bold">
              Ready To Build Your Brand?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-xs md:text-sm text-brand-bg/80 max-w-xl mx-auto leading-relaxed font-medium">
              Get direct B2B pricing estimates and sample timelines from our Tirupur operations coordinates within 1 business day.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs tracking-wider uppercase transition-colors shadow-lg hover:shadow-brand-accent/20"
            >
              Request Quote
            </Link>
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-4 rounded-xl border border-white/20 hover:border-brand-accent hover:text-brand-accent text-brand-bg font-bold text-xs tracking-wider uppercase transition-all bg-white/5"
            >
              Book Consultation
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Consultation Scheduling Modal overlay */}
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </div>
  );
}
