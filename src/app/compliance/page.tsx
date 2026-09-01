import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { CERTIFICATES } from "@/data/db";
import { Award, FileText, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Leaf, FileCheck2, Microscope, Droplets, Scissors, Scan, ClipboardCheck } from "lucide-react";

const CERT_ICONS: Record<string, React.ReactNode> = {
  "cert-sedex": <ShieldCheck className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
  "cert-oekotex": <Sparkles className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
  "cert-gots": <Leaf className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
  "cert-iso": <FileCheck2 className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
};

const QA_PROCESS = [
  {
    stage: "Stage 1",
    icon: <Microscope className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
    title: "Yarn & Raw Input Testing",
    desc: "Every batch of cotton yarn is checked for count, twist, tensile strength, and color fastness. Organic yarns must arrive with valid GOTS transaction certificates.",
  },
  {
    stage: "Stage 2",
    icon: <Droplets className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
    title: "Dyeing Lab Dip Verification",
    desc: "We verify fabric dye formulations under standard D65 and TL84 light boxes to ensure perfect matches. Fabric is checked for dimensional stability (shrinkage) after washing.",
  },
  {
    stage: "Stage 3",
    icon: <Scissors className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
    title: "In-line Stitch Inspections",
    desc: "Inspectors audit sewing panels during assembly. Stitch density (Stitches Per Inch - SPI), seam stretch, tension, and alignment are tracked continuously.",
  },
  {
    stage: "Stage 4",
    icon: <Scan className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
    title: "100% Metal Detection Gate",
    desc: "All finished apparel must pass through a Japanese Hashima tunnel metal detector before steam iron packaging to ensure zero broken sewing needle shards.",
  },
  {
    stage: "Stage 5",
    icon: <ClipboardCheck className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />,
    title: "Final AQL 1.5 Audits",
    desc: "Our independent QA division conducts final random checks based on international AQL 1.5 standard criteria (fabric flaws, print errors, measurements).",
  },
];

export default function CompliancePage() {
  return (
    <div className="page-transition">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/compliance.jpg"
            alt="Textile Quality Assurance and Testing Laboratory"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              Certifications & Standards
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Export Compliance & Quality Assurance
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl font-medium">
              We align our manufacturing with global retail requirements. Our facilities are audited annually for ethical labor practices, safe operations, and non-toxic materials.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Audits & Certifications */}
      <section className="py-16 md:py-20 bg-brand-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-brand-light-grey/80">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                Verified Credentials
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                Active International Certifications
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xs md:text-sm text-brand-grey max-w-md font-medium">
                Our plant maintains compliance credentials verified by independent third-party certification bodies.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CERTIFICATES.map((cert, idx) => (
              <ScrollReveal
                key={cert.id}
                delay={idx * 0.08}
                className="bg-white border border-brand-light-grey/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent top highlight line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent/80 via-brand-accent to-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Custom Icon & Theme Status Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                      {CERT_ICONS[cert.id] || <Award className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300" />}
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-accent/10 text-brand-accent border border-brand-accent/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                      {cert.validity}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-brand-ink group-hover:text-brand-accent transition-colors mb-3">
                    {cert.name}
                  </h3>

                  {/* Clean Direct Metadata (No Inner Box) */}
                  <div className="space-y-1.5 mb-6 text-xs leading-relaxed">
                    <p className="text-brand-grey font-medium">
                      <span className="text-brand-grey/80 font-semibold inline-block min-w-[90px]">Issuing Body:</span>
                      <span className="text-brand-ink font-bold">{cert.issuingBody}</span>
                    </p>
                    <p className="text-brand-grey font-medium">
                      <span className="text-brand-grey/80 font-semibold inline-block min-w-[90px]">Audit Scope:</span>
                      <span className="text-brand-ink/90 font-medium">{cert.scope}</span>
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-brand-light-grey/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-brand-grey">
                    Audit Verification Doc
                  </span>
                  <a
                    href={cert.downloadUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent hover:text-brand-accent-hover transition-colors group-hover:translate-x-0.5 duration-200"
                  >
                    <span>View Certificate Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Garment Quality Inspection & Checking Collage (16:9) */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 aspect-auto md:aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-brand-light-grey/80 p-2.5 sm:p-3.5 bg-brand-bg/60">
              
              {/* Main Feature Panel: Final Inspection & Finishing */}
              <div className="md:col-span-7 relative min-h-[260px] sm:min-h-[320px] md:min-h-full rounded-xl md:rounded-2xl overflow-hidden group shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/compliance/lotus_finishing.webp"
                  alt="Lotus International Garment Final Inspection & Finishing in Tirupur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-brand-ink/85 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-serif-heading">Final Garment Inspection &amp; Finishing</h4>
                    <p className="text-[10px] sm:text-[11px] text-brand-bg/80">Tirupur Facility QA Desk</p>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent uppercase tracking-wider">
                    100% Inspected
                  </span>
                </div>
              </div>

              {/* Secondary Inspection Grid */}
              <div className="md:col-span-5 grid grid-cols-2 md:grid-rows-2 gap-3 sm:gap-4 min-h-[220px] sm:min-h-[260px] md:min-h-full">
                
                {/* In-Line Sewing Audit */}
                <div className="col-span-2 relative h-full rounded-xl md:rounded-2xl overflow-hidden group shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/compliance/lotus_manufacturing.webp"
                    alt="In-line Stitching & Assembly Quality Audit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-lg bg-brand-ink/85 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs font-bold font-serif-heading">In-Line Sewing Audit</span>
                    <span className="text-[9px] font-semibold text-brand-bg/80">Live Production Floor</span>
                  </div>
                </div>

                {/* Fabric Roll & Knit Quality Check */}
                <div className="relative h-full rounded-xl md:rounded-2xl overflow-hidden group shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/compliance/lotus_fabric.webp"
                    alt="Fabric Quality & Knit Structure Inspection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg bg-brand-ink/85 backdrop-blur-md border border-white/15 text-white">
                    <span className="text-[10px] sm:text-[11px] font-bold block truncate">Fabric Roll Check</span>
                  </div>
                </div>

                {/* Packaging & AQL Carton Audit */}
                <div className="relative h-full rounded-xl md:rounded-2xl overflow-hidden group shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/compliance/lotus_packaging.webp"
                    alt="Final AQL 1.5 Packaging & Needle Detection Audit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg bg-brand-ink/85 backdrop-blur-md border border-white/15 text-white">
                    <span className="text-[10px] sm:text-[11px] font-bold block truncate">Packaging &amp; AQL</span>
                  </div>
                </div>

              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quality Control Sequence */}
      <section className="py-20 bg-brand-bg border-t border-b border-brand-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="font-serif-heading text-3xl font-bold text-brand-ink mb-4">
                Our 5-Gate Quality Assurance System
              </h2>
              <p className="text-xs md:text-sm text-brand-grey font-medium">
                Preventing mistakes, monitoring assembly, and validating finished garments before shipment container loading.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {QA_PROCESS.map((proc, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} className="flex flex-col items-center">
                {/* Stage Index Badge - Placed Outside & Center-Aligned Above Container */}
                <div className="mb-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-brand-accent bg-brand-accent/10 border border-brand-accent/25 px-4 py-1 rounded-full shadow-xs">
                    {proc.stage}
                  </span>
                </div>

                {/* Stage Container with Custom Single Object Icon */}
                <div className="w-full bg-white border border-brand-light-grey/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-accent/40 transition-all duration-300 flex flex-col sm:flex-row gap-5 sm:items-center group">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                    {proc.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-serif-heading text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors mb-1.5">
                      {proc.title}
                    </h4>
                    <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                      {proc.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Summary */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-ink text-brand-bg rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-serif-heading text-2xl md:text-3xl font-bold mb-6">
                  Technical Specifications & Testing Methods
                </h3>
                <p className="text-xs md:text-sm text-brand-bg/85 leading-relaxed mb-8">
                  We verify our fabric parameters using accredited test laboratories. Standard testing items run before bulk stitching include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                    <span>ISO 105 color fastness to wash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                    <span>Dimensional stability (shrinkage &lt; 5%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                    <span>Fabric spirality & twist control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                    <span>REACH and Oeko-Tex chemical restrictions</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
                <h4 className="font-serif-heading text-lg font-bold mb-4">Inspection Criteria</h4>
                <div className="space-y-4 text-xs text-brand-bg/90">
                  <p>
                    <span className="font-bold text-brand-accent block mb-1">Stitch density</span>
                    Standard stitch density ranges from 10 to 12 stitches per inch (SPI) depending on buyer specifications.
                  </p>
                  <p>
                    <span className="font-bold text-brand-accent block mb-1">AQL 1.5 Standard</span>
                    Maximum allowed minor defects: 4.0%; Major defects: 1.5%; Critical defects: 0% (e.g. needles, oil stains).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
