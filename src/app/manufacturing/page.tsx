import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Factory, 
  Cpu, 
  Layers, 
  ClipboardCheck, 
  Download, 
  Calendar, 
  Layers3,
  FileText,
  Shirt,
  Scissors,
  ShieldCheck,
  Package,
  Globe
} from "lucide-react";

const INFRASTRUCTURE = [
  {
    icon: <Factory className="w-5 h-5 text-brand-accent" />,
    title: "Facility Footprint",
    details: "75,000 Sq. Ft. built-up industrial area located in Tirupur, India's leading knitwear hub. Custom designed for linear manufacturing efficiency.",
  },
  {
    icon: <Cpu className="w-5 h-5 text-brand-accent" />,
    title: "Stitching & Sewing",
    details: "180+ high-speed modern sewing machines (Juki, Pegasus, Siruba) including overlock, flatlock, and automatic collar attachment setups.",
  },
  {
    icon: <Layers3 className="w-5 h-5 text-brand-accent" />,
    title: "CAD & Cutting Desk",
    details: "Computer-aided marker planning (Optitex CAD) and automated fabric spreading to ensure 98% yield and minimal raw material wastage.",
  },
  {
    icon: <Layers className="w-5 h-5 text-brand-accent" />,
    title: "In-House Sampling",
    details: "Dedicated sampling room with 15 master tailors, producing prototype fits and counters within 7-10 days of tech pack sign-off.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Design & Tech-Pack Review",
    desc: "Our CAD department reviews buyer specifications, measurement charts, and fabric constructions, verifying tolerances before prototyping.",
    milestone: "CAD Optitex",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    title: "Yarn & Fiber Sourcing",
    desc: "Sourcing premium ring-spun organic cotton, bamboo, polyester, or modal fibers tested for tensile strength and staple consistency.",
    milestone: "Certified Inputs",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    title: "Sampling & Approvals",
    desc: "Creating fit samples, size sets, and pre-production (PP) samples. We run shrinkage, spirality, and GSM tests prior to official client seal.",
    milestone: "PP Sample Seal",
    icon: <Shirt className="w-4 h-4" />,
  },
  {
    title: "Precision Cutting",
    desc: "Relaxing knit fabrics for 24 hours to stabilize fibers. Automatic spreading and computerized pattern layout minimize cutting waste.",
    milestone: "Lay Cutting",
    icon: <Scissors className="w-4 h-4" />,
  },
  {
    title: "High-Speed Sewing",
    desc: "Operations are divided into modular lines. Flatlock, overlock, and blind hem stitches are applied matching buyer stitch-density instructions.",
    milestone: "Modular Assembly",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    title: "Quality Control (AQL 1.5)",
    desc: "Inline checking, end-of-line inspections, and final AQL 1.5 audits. Garments pass through metal detection tunnels to ensure total safety.",
    milestone: "AQL 1.5 Gate",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    title: "Packing & Presentation",
    desc: "Steam pressing, custom tag attachment (hangtags, UPC barcodes, price stickers), and individual polybag packaging following buyer layout specs.",
    milestone: "Polybag Packaging",
    icon: <Package className="w-4 h-4" />,
  },
  {
    title: "Global Logistics & Shipping",
    desc: "Carton packing in heavy-duty shipping containers. Coordination with sea freights via Tuticorin/Chennai ports or air shipment via Bangalore.",
    milestone: "Port Dispatch",
    icon: <Globe className="w-4 h-4" />,
  },
];

export default function ManufacturingPage() {
  return (
    <div className="page-transition">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/manufacturing.jpg"
            alt="Modern Tirupur Knitwear Manufacturing Facility"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              Infrastructure &amp; Capacities
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              State-of-the-Art Knitwear Facility
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl font-medium">
              We translate fiber into global-market garments using modern machinery, automated cutting layouts, and a highly skilled workforce of 250+ artisans.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Infrastructure Specs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
                  Factory Capabilities
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-brand-ink mb-4">
                  In-House Capabilities &amp; Engineering
                </h2>
                <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                  At Lotus, we control every manufacturing step except spinning and dyeing, which we outsource to GOTS-certified local partners under our strict QA supervision. This ensures we maintain cost-efficiency while keeping oversight of quality.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {INFRASTRUCTURE.map((item, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.08} className="bg-white border border-brand-light-grey/90 hover:border-brand-accent/40 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-3 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300 text-brand-accent">
                      {item.icon}
                    </div>
                    <h4 className="font-serif-heading text-base font-bold text-brand-ink group-hover:text-brand-accent transition-colors mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-brand-grey leading-relaxed">
                      {item.details}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <ScrollReveal delay={0.15} className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden bg-brand-bg shadow-xl border border-brand-light-grey group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/compliance/lotus_manufacturing.webp"
                  alt="Lotus International High-Speed Stitching Lines & Garment Assembly in Tirupur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 text-brand-bg">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-brand-accent bg-brand-ink/80 border border-brand-accent/30 px-3 py-1 rounded-full backdrop-blur-md shadow-xs inline-block mb-3">
                    Export Engineering
                  </span>
                  <h4 className="font-serif-heading text-lg sm:text-xl font-bold leading-snug text-white mb-1">
                    Annual production capacity exceeding 4.5 million knitwear units.
                  </h4>
                  <p className="text-xs text-brand-bg/80 font-medium">
                    180+ High-Speed Precision Sewing &amp; Flatlock Lines • Tirupur Facility
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Lead times and capacity chart */}
          <div className="bg-brand-bg border border-brand-light-grey/80 rounded-3xl p-8 sm:p-10 shadow-xs">
            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-brand-ink mb-6 text-center">
              Program Operations &amp; Timelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-brand-light-grey/70">
              <div className="p-4 pt-6 md:pt-4">
                <Calendar className="w-8 h-8 text-brand-accent mx-auto mb-2.5" />
                <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-1">Sampling Lead Time</h4>
                <p className="text-xs text-brand-ink font-semibold">7 to 10 Business Days</p>
                <p className="text-[11px] text-brand-grey mt-1">Requires official PDF tech sheets or physical sample.</p>
              </div>
              <div className="p-4 pt-6 md:pt-4">
                <ClockIcon className="w-8 h-8 text-brand-accent mx-auto mb-2.5" />
                <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-1">Production Lead Time</h4>
                <p className="text-xs text-brand-ink font-semibold">45 to 60 Days (Post PP Seal)</p>
                <p className="text-[11px] text-brand-grey mt-1">Varies based on fabric blend and local dye mills schedule.</p>
              </div>
              <div className="p-4 pt-6 md:pt-4">
                <ClipboardCheck className="w-8 h-8 text-brand-accent mx-auto mb-2.5" />
                <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-1">Minimum Order Quantity</h4>
                <p className="text-xs text-brand-ink font-semibold">1,000 Pcs per Colorway</p>
                <p className="text-[11px] text-brand-grey mt-1">Special concessions up to 500 pcs for organic bamboo blends.</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs font-semibold bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-6 py-3 rounded-full transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Infrastructure Fact Sheet (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process Flow - Modern Compact Grid */}
      <section className="py-16 md:py-20 bg-brand-bg border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-brand-light-grey/60">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                Standard B2B Workflow
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                Our Production Process Flow
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xs md:text-sm text-brand-grey max-w-md font-medium">
                End-to-end coordination of client garments from initial CAD tech pack review to final sea/air port dispatch.
              </p>
            </ScrollReveal>
          </div>

          {/* 8 Compact Modern Milestone Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {PROCESS_STEPS.map((step, idx) => (
              <ScrollReveal
                key={step.title}
                delay={idx * 0.04}
                className="bg-white border border-brand-light-grey/90 hover:border-brand-accent/40 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-brand-light-grey/60">
                    <div className="w-8 h-8 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/5 px-2.5 py-0.5 rounded-full border border-brand-accent/15">
                      {step.milestone}
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-base font-bold text-brand-ink group-hover:text-brand-accent transition-colors mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

// Inline fallback for ClockIcon
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

