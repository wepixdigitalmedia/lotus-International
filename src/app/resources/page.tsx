"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Download, FileText, Lock, CheckCircle2, User, Building, Mail, Loader2 } from "lucide-react";

export default function ResourcesPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [activeDownload, setActiveDownload] = useState<string | null>(null);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenForm = (itemId: string) => {
    if (unlockedItems.includes(itemId)) {
      // Already unlocked, trigger download simulation
      alert(`Simulating download of ${itemId === "profile" ? "Company Profile" : "Product Line Sheet"} PDF...`);
      return;
    }
    setActiveDownload(itemId);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !activeDownload) return;

    setIsUnlocking(true);
    // Simulate API registration
    setTimeout(() => {
      setUnlockedItems((prev) => [...prev, activeDownload]);
      setActiveDownload(null);
      setIsUnlocking(false);
      setFormData({ name: "", company: "", email: "" });
    }, 1200);
  };

  return (
    <div className="page-transition min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/resources.jpg"
            alt="Textile Specifications & Fabric Swatch Library"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              Buyer Library
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Gated Catalogs & Specifications
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl font-medium">
              Access our infrastructure specifications, lead times sheet, and product catalog files. Please complete our buyer lead registration form to unlock files.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
            {/* Document 1: Company Profile */}
            <ScrollReveal className="bg-brand-bg border border-brand-light-grey rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-brand-accent" />
                  </div>
                  {unlockedItems.includes("profile") ? (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-brand-sage bg-brand-sage/10 px-2.5 py-1 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-brand-grey bg-brand-ink/5 px-2.5 py-1 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Gated File
                    </span>
                  )}
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-brand-ink mb-2">
                  Company Profile & Infrastructure (PDF)
                </h3>
                <p className="text-xs text-brand-grey font-semibold mb-4">
                  File Size: 2.4 MB | Last Updated: July 2026
                </p>
                <p className="text-xs text-brand-ink/90 leading-relaxed font-medium mb-6">
                  Includes factory floor diagrams, complete sewing machinery list counts, boiler and waste plant specs, GOTS and Sedex audit transcripts, and capacity metrics.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-light-grey mt-auto">
                {unlockedItems.includes("profile") ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Downloading Company Profile PDF...");
                    }}
                    className="w-full py-3 rounded-xl bg-brand-sage hover:bg-brand-sage/80 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Company Profile</span>
                  </a>
                ) : (
                  <button
                    onClick={() => handleOpenForm("profile")}
                    className="w-full py-3 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Unlock Document</span>
                  </button>
                )}
              </div>
            </ScrollReveal>

            {/* Document 2: Line Sheet */}
            <ScrollReveal delay={0.1} className="bg-brand-bg border border-brand-light-grey rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-brand-accent" />
                  </div>
                  {unlockedItems.includes("linesheet") ? (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-brand-sage bg-brand-sage/10 px-2.5 py-1 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-brand-grey bg-brand-ink/5 px-2.5 py-1 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Gated File
                    </span>
                  )}
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-brand-ink mb-2">
                  Knitwear Product Line Sheet (PDF)
                </h3>
                <p className="text-xs text-brand-grey font-semibold mb-4">
                  File Size: 4.8 MB | Last Updated: August 2026
                </p>
                <p className="text-xs text-brand-ink/90 leading-relaxed font-medium mb-6">
                  Details measurement charts for Men, Women, and Kids base patterns. Displays fabric specifications (combed cotton, French terry, slub, bamboo) and custom dyeing codes.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-light-grey mt-auto">
                {unlockedItems.includes("linesheet") ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Downloading Product Line Sheet PDF...");
                    }}
                    className="w-full py-3 rounded-xl bg-brand-sage hover:bg-brand-sage/80 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Line Sheet</span>
                  </a>
                ) : (
                  <button
                    onClick={() => handleOpenForm("linesheet")}
                    className="w-full py-3 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Unlock Document</span>
                  </button>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Lead Modal Form */}
          {activeDownload && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-ink/40 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white border border-brand-light-grey rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl relative">
                <button
                  onClick={() => setActiveDownload(null)}
                  className="absolute top-4 right-4 text-brand-grey hover:text-brand-accent text-lg font-bold"
                >
                  ✕
                </button>
                <h4 className="font-serif-heading text-xl font-bold text-brand-ink mb-2">
                  Unlock Requested Document
                </h4>
                <p className="text-xs text-brand-grey font-medium mb-6">
                  Please submit your business credentials. We will immediately unlock the requested PDF downloads.
                </p>
                <form onSubmit={handleUnlock} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-brand-grey/85" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-light-grey text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-brand-grey/85" />
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Retail Brands Ltd."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-light-grey text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-grey/85" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. buyer@company.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-light-grey text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUnlocking}
                    className="w-full py-3 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 disabled:bg-brand-accent/50"
                  >
                    {isUnlocking ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Unlocking...
                      </>
                    ) : (
                      <>
                        <span>Submit & Unlock File</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
