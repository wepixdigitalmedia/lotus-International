import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  FileText, 
  Droplets, 
  Shirt, 
  ShieldCheck, 
  CheckCircle2, 
  PackageCheck, 
  Sparkles, 
  Palette, 
  Scissors, 
  Tag, 
  Layers, 
  Clock, 
  Ruler,
  ArrowRight
} from "lucide-react";

const STEPS = [
  {
    step: "Step 1",
    title: "Tech Pack Submission",
    desc: "Submit your measurement charts, CAD sketches, fabric structures, and pantone colors. If you don't have a tech pack, we can duplicate your physical sample.",
    icon: <FileText className="w-5 h-5 text-brand-accent" />,
  },
  {
    step: "Step 2",
    title: "Yarn & Knit Development",
    desc: "We knit yarn loops matching your target GSM and drape. We formulate lab-dips for pantone dye approvals under D65 light boxes.",
    icon: <Droplets className="w-5 h-5 text-brand-accent" />,
  },
  {
    step: "Step 3",
    title: "Prototype Fit Sampling",
    desc: "Our masters sew a prototype sample to check tolerances, shrinkage, and neck openings. Samples are shipped to your office for physical fits approval.",
    icon: <Shirt className="w-5 h-5 text-brand-accent" />,
  },
  {
    step: "Step 4",
    title: "Pre-Production Seal",
    desc: "Once fits are signed off, we generate a final sealed pre-production (PP) sample with accessories, trims, and final barcode labels in place.",
    icon: <ShieldCheck className="w-5 h-5 text-brand-accent" />,
  },
  {
    step: "Step 5",
    title: "Bulk Production & QC",
    desc: "Dyeing, cutting, stitching, and finishing lines start. Inline QC inspections test seam strengths and final measurements against AQL 1.5 guidelines.",
    icon: <CheckCircle2 className="w-5 h-5 text-brand-accent" />,
  },
  {
    step: "Step 6",
    title: "Packing & Delivery",
    desc: "Polybag packing, carton stuffing, container sealing, and custom export clearance. We deliver to your chosen forwarder port (sea/air).",
    icon: <PackageCheck className="w-5 h-5 text-brand-accent" />,
  },
];

const SERVICES = [
  {
    title: "Custom Fabrics & Blends",
    desc: "Sourcing and fabrication of organic cotton, cotton-polyester fleece, French terry, waffle knit, bamboo fiber blends, and elastane ribbing.",
    icon: <Sparkles className="w-4 h-4 text-brand-accent" />,
  },
  {
    title: "Specialized Garment Dyes",
    desc: "Reactive piece dyeing, yarn dyeing, garment dyeing (cold dye, pigment wash), enzyme washes, and silicone washes for ultra-soft handfeel.",
    icon: <Palette className="w-4 h-4 text-brand-accent" />,
  },
  {
    title: "Apparel Embellishments",
    desc: "High-density chest prints, puff printing, discharge printing, screen prints, computer embroidery, chenille patches, and DTF/heat transfers.",
    icon: <Scissors className="w-4 h-4 text-brand-accent" />,
  },
  {
    title: "Custom Trims & Labelling",
    desc: "Satin or woven neck labels, tear-away tags, custom paper hangtags, price stickers, and custom printed recycled polybag packaging.",
    icon: <Tag className="w-4 h-4 text-brand-accent" />,
  },
];

export default function PrivateLabelPage() {
  return (
    <div className="page-transition">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/private-label.jpg"
            alt="OEM Apparel Tech Packs & Private Label Design Studio"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              OEM &amp; Private Label Services
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Turn Your Apparel Designs Into Export-Grade Reality
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl font-medium">
              We offer full-service OEM contract manufacturing. You provide the designs, brand parameters, and sizing; we handle fabric sourcing, fabrication, compliance, and shipping.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* OEM Capabilities & MOQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            
            {/* Left Capabilities Column */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                  OEM Capabilities &amp; MOQ
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-brand-ink mb-4">
                  B2B Customization Capabilities
                </h2>
                <p className="text-xs md:text-sm text-brand-grey leading-relaxed font-medium">
                  We specialize in producing private-label knitwear collections for mid-to-large lifestyle brands. Our Tirupur plant is fully equipped to handle intricate chest embellishments, customized sizing grids, and sustainable material certifications.
                </p>
              </ScrollReveal>

              <div className="space-y-4 pt-2">
                <ScrollReveal delay={0.05} className="flex gap-3.5 items-start p-4 rounded-2xl bg-brand-bg/60 border border-brand-light-grey/80">
                  <div className="w-9 h-9 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif-heading text-base font-bold text-brand-ink block mb-0.5">Standard MOQ Policies</span>
                    <p className="text-xs text-brand-grey leading-relaxed">1,000 Pcs per color/style. Lower MOQs of 500 Pcs supported for bamboo organic blends.</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1} className="flex gap-3.5 items-start p-4 rounded-2xl bg-brand-bg/60 border border-brand-light-grey/80">
                  <div className="w-9 h-9 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif-heading text-base font-bold text-brand-ink block mb-0.5">Sampling Costs</span>
                    <p className="text-xs text-brand-grey leading-relaxed">Standard sampling is refundable upon bulk purchase order confirmation. Prototyping takes 7-10 days.</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15} className="flex gap-3.5 items-start p-4 rounded-2xl bg-brand-bg/60 border border-brand-light-grey/80">
                  <div className="w-9 h-9 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif-heading text-base font-bold text-brand-ink block mb-0.5">Sizing &amp; Patterns</span>
                    <p className="text-xs text-brand-grey leading-relaxed">US, UK, European, and Asian size charts are supported. CAD pattern files can be submitted directly.</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Customization Services Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((s, idx) => (
                <ScrollReveal 
                  key={idx} 
                  delay={idx * 0.06} 
                  className="bg-white border border-brand-light-grey/90 hover:border-brand-accent/40 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-3 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                      {s.icon}
                    </div>
                    <h3 className="font-serif-heading text-base font-bold text-brand-ink group-hover:text-brand-accent transition-colors mb-2">
                      {s.title}
                    </h3>
                    <p className="text-xs text-brand-grey leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

          {/* Step-by-Step OEM Workflow */}
          <div className="border-t border-brand-light-grey/80 pt-16 md:pt-20">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                  End-to-End Workflow
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink mb-3">
                  Step-by-Step OEM Workflow
                </h2>
                <p className="text-xs md:text-sm text-brand-grey font-medium">
                  We maintain transparent gates at each manufacturing milestone to ensure bulk shipments match your approved samples perfectly.
                </p>
              </ScrollReveal>
            </div>

            {/* 6 Clean Workflow Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {STEPS.map((s, idx) => (
                <ScrollReveal 
                  key={idx} 
                  delay={idx * 0.06} 
                  className="bg-brand-bg/40 border border-brand-light-grey/90 hover:border-brand-accent/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Top Bar: Step Pill & Icon */}
                    <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-brand-light-grey/60">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-brand-accent bg-brand-accent/10 border border-brand-accent/25 px-3 py-0.5 rounded-full">
                        {s.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white border border-brand-light-grey flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {s.icon}
                      </div>
                    </div>

                    <h4 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors mb-2">
                      {s.title}
                    </h4>
                    <p className="text-xs text-brand-grey leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Call to Action card */}
          <div className="mt-16 md:mt-20 bg-brand-ink text-brand-bg rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                Direct Collaboration
              </span>
              <h3 className="font-serif-heading text-2xl md:text-3xl font-bold mb-3 text-white">
                Have a Private Label Project in Mind?
              </h3>
              <p className="text-xs sm:text-sm text-brand-bg/85 leading-relaxed mb-8 font-medium">
                Connect directly with our sampling coordinators. Submit your specifications and receive standard fabric recommendations and cost estimates.
              </p>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Submit Private Label Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
          </div>

        </div>
      </section>
    </div>
  );
}
