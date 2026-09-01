import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { TIMELINE } from "@/data/db";
import { Target, Eye, ShieldCheck, Heart, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: <Target className="w-5 h-5 text-brand-accent" />,
    title: "Mission",
    description: "To engineer and export premium-grade knitted apparel combining traditional cotton craftsmanship with eco-friendly production systems.",
  },
  {
    icon: <Eye className="w-5 h-5 text-brand-accent" />,
    title: "Vision",
    description: "To lead India's knitwear export market in environmental preservation with a 100% waste-free, carbon-neutral network by 2030.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand-accent" />,
    title: "Compliance & Integrity",
    description: "Strict adherence to Sedex 4-Pillar, GOTS, and Oeko-Tex certifications with zero tolerance for ethical shortcuts.",
  },
  {
    icon: <Heart className="w-5 h-5 text-brand-accent" />,
    title: "Human Empowerment",
    description: "Actively fostering career growth and leadership roles for women on our production floor with equal pay and training.",
  },
];

export default function AboutPage() {
  return (
    <div className="page-transition">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/about.jpg"
            alt="Two Decades of Tirupur Knitted Garment Craftsmanship"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              Our Journey & Ethos
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Two Decades of Knitted Garment Export Excellence
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl">
              From our humble beginnings as Paruthi in 2004 to exporting millions of private-label garments annually, we remain anchored in quality and integrity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About The Company Section */}
      <section className="py-20 md:py-28 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  About the Company
                </div>
                <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink leading-tight">
                  Elevating Fashion Through Knits
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-base sm:text-lg text-brand-ink/90 font-medium leading-relaxed">
                  The Lotus International is a part of our textile-based business group which started its journey since 2004. The company started its journey into textile foray as a retailer in the name <span className="text-brand-accent font-semibold">&ldquo;Paruthi&rdquo;</span> meaning cotton.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <p className="text-sm sm:text-base text-brand-grey leading-relaxed font-normal">
                  Elevating Fashion through knits at Lotus International we take pride in being at the forefront of the garment manufacturing industry, specializing in the artistry of knitted fabrics. With an unwavering commitment to quality, innovation, &amp; style, we bring your fashion aspirations to life through our expertise in knits.
                </p>
              </ScrollReveal>
            </div>

            {/* Right Side: Facility Image */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.15} className="relative group">
                <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-brand-light-grey bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/about/facility.jpg"
                    alt="The Lotus International Headquarters and Manufacturing Facility"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Floating Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-brand-ink font-serif-heading">The Lotus International Facility</h4>
                      <p className="text-[11px] text-brand-grey">Tirupur, Tamil Nadu, India</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent uppercase tracking-wider">
                      Est. 2004
                    </span>
                  </div>
                </div>

                {/* Decorative glow / backdrop */}
                <div className="absolute -inset-2 bg-brand-accent/5 rounded-3xl -z-10 blur-xl transform group-hover:scale-105 transition-transform" />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Legacy & Founders */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* Late S. Jayakumar Srinivasan */}
            <ScrollReveal className="bg-brand-bg border border-brand-light-grey rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6 pb-6 border-b border-brand-light-grey/80">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-brand-accent/30 shadow-md bg-brand-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/about/founder.jpg"
                      alt="Late S. Jayakumar Srinivasan - Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-brand-accent uppercase mb-1.5 inline-block bg-brand-accent/10 px-2.5 py-0.5 rounded-full">
                      Founding Legacy
                    </span>
                    <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-brand-ink">
                      Late S. Jayakumar Srinivasan
                    </h2>
                    <p className="text-xs text-brand-grey font-semibold mt-1">
                      Founder, The Lotus International (originally Paruthi)
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-brand-ink/90 leading-relaxed font-medium">
                  <p>
                    S. Jayakumar Srinivasan founded the company with a singular focus: to establish a high-compliance knitwear manufacturing facility in the heart of Tirupur. His dedication to worker safety, ethical buyer partnerships, and environmental initiatives laid the groundwork for what the company represents today.
                  </p>
                  <p>
                    Under his guidance, we transitioned from domestic contracting to direct global exports, setting up auditing standards that achieved shortlists from demanding U.S. and European retail brands. His core belief that &ldquo;manufacturing success is built on human dignity&rdquo; guides our workforce welfare policies today.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* M. Raghupathy */}
            <ScrollReveal delay={0.15} className="bg-brand-bg border border-brand-light-grey rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6 pb-6 border-b border-brand-light-grey/80">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-brand-accent/30 shadow-md bg-brand-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/about/mentor.png"
                      alt="M. Raghupathy - Chief Advisor & Production Mentor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-brand-accent uppercase mb-1.5 inline-block bg-brand-accent/10 px-2.5 py-0.5 rounded-full">
                      Mentor &amp; Advisory Board
                    </span>
                    <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-brand-ink">
                      M. Raghupathy
                    </h2>
                    <p className="text-xs text-brand-grey font-semibold mt-1">
                      Chief Advisor &amp; Production Mentor
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-brand-ink/90 leading-relaxed font-medium">
                  <p>
                    Bringing over 35 years of industrial experience in spinning, fabric structure, and dye chemistry, M. Raghupathy serves as our technical compass. He oversees our yarn sourcing relationships, ensuring that our inputs meet the rigorous tensile and colorfast requirements of retail programs.
                  </p>
                  <p>
                    He has spearheaded our modernization audits, including the installation of high-efficiency stitching machines, computer-aided markers, and waste reduction layouts. His mentorship ensures that our floor teams bridge the gap between textile craftsmanship and industrial automation.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Corporate Pillars Section - Compact & Modern Theme-Based */}
      <section className="py-16 md:py-20 bg-brand-bg border-t border-b border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-brand-light-grey/60">
            <ScrollReveal>
              <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-2">
                Core Principles
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-brand-ink">
                Our Corporate Pillars
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xs md:text-sm text-brand-grey max-w-md font-medium">
                Guiding our operations, client partnerships, and ethical knitwear manufacturing since 2004.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="bg-white border border-brand-light-grey/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between group"
              >
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors duration-300 mb-4">
                    {React.cloneElement(val.icon, {
                      className: "w-5 h-5 text-brand-accent group-hover:text-white transition-colors duration-300",
                    })}
                  </div>
                  <h3 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-brand-grey leading-relaxed font-normal">
                    {val.description}
                  </p>
                <div className="w-full h-0.5 bg-transparent group-hover:bg-brand-accent/30 mt-4 rounded-full transition-colors duration-300" />
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-brand-ink mb-4">
                Our History & Milestones
              </h2>
              <p className="text-xs md:text-sm text-brand-grey font-medium">
                A trajectory defined by capacity expansion, sustainability investments, and consistent trust.
              </p>
            </ScrollReveal>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-brand-light-grey pl-8 md:pl-16 space-y-12">
            {TIMELINE.map((event, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} className="relative">
                {/* Bullet node */}
                <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-brand-bg border-4 border-brand-accent flex items-center justify-center" />
                
                <div>
                  <span className="text-lg font-bold font-serif-heading text-brand-accent mb-2 block">
                    {event.year}
                  </span>
                  <h3 className="font-serif-heading text-xl font-bold text-brand-ink mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-grey leading-relaxed font-medium">
                    {event.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners & Global Brands (from Homepage) */}
      <section className="py-14 md:py-18 overflow-hidden bg-brand-bg border-t border-brand-light-grey/80">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h3 className="text-center text-[10px] font-bold tracking-[0.25em] uppercase text-brand-grey/85 mb-8">
              TRUSTED PARTNER &amp; GLOBAL APPAREL BRANDS
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
