"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, Mail, Send, CheckCircle2, Leaf, Heart, Recycle } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";

export default function NaturePoloClubPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="page-transition bg-brand-ink text-brand-bg min-h-screen pb-20">
      {/* Brand Hero */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden pt-12 rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/nature-polo.jpg"
            alt="Nature Polo Club Luxury Sustainable Polos"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/80 to-brand-ink/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-sage/30 bg-brand-sage/10 text-xs font-semibold tracking-wider text-brand-sage uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" /> In-House Sustainable Label
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              Nature Polo Club
            </h1>
            <p className="text-base sm:text-lg text-brand-bg/85 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
              Where technical textile engineering meets slow-fashion mindfulness. Bamboo cotton blends processed entirely using solar power and organic plant dyes.
            </p>
            <div className="w-24 h-0.5 bg-brand-sage mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* Nature Polo Club Centered Emblem Showcase */}
      <section className="py-14 md:py-18 bg-brand-bg text-brand-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-col items-center justify-center text-center">
            
            {/* Center Logo Plaque / Card */}
            <div className="relative group p-8 sm:p-10 md:p-12 rounded-3xl bg-white border border-brand-light-grey/80 shadow-xl max-w-md w-full mx-auto flex flex-col items-center justify-center">
              {/* Subtle ambient aura */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />

              {/* Clean Emblem Image */}
              <div className="relative w-48 sm:w-56 md:w-64 aspect-square flex items-center justify-center mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/nature-polo/logo.png"
                  alt="Nature Polo Club Official Brand Insignia"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Insignia Details */}
              <div className="w-full pt-5 border-t border-brand-light-grey/80 flex flex-col items-center">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-brand-accent uppercase mb-1">
                  Official Brand Insignia
                </span>
                <p className="text-xs text-brand-grey font-medium">
                  Sustainable Luxury Knits • Tirupur, India
                </p>
              </div>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* Brand Story & Features - Compact & Responsive */}
      <section className="py-16 md:py-20 bg-brand-ink border-t border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sage/15 border border-brand-sage/30 text-brand-sage text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                  <Leaf className="w-3.5 h-3.5" />
                  The Organic Standard
                </div>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold leading-tight text-white">
                  Crafted for Conscious Lifestyles
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-xs sm:text-sm text-brand-bg/85 leading-relaxed font-medium">
                  Nature Polo Club was created as our in-house testbed to prove that high-volume manufacturing can craft luxury-grade polos with a zero-carbon objective. Blending organic combed cotton with structural bamboo fibers, each garment is naturally anti-bacterial, breathable, and color-locked without toxic fixers.
                </p>
                <p className="text-xs sm:text-sm text-brand-bg/80 leading-relaxed mt-3">
                  Each polo features polished coconut shell buttons, GOTS-certified organic cotton threads, and plastic-free labels—tailored in Tirupur for premium corporate buyers and sustainable fashion labels.
                </p>
              </ScrollReveal>

              {/* 3 Compact Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <ScrollReveal delay={0.15} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-brand-sage/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-sage/15 flex items-center justify-center text-brand-sage mb-2.5">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Bamboo Blend</h4>
                  <p className="text-[11px] text-brand-bg/75 leading-normal">Silk-smooth, breathable &amp; anti-bacterial.</p>
                </ScrollReveal>

                <ScrollReveal delay={0.2} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-brand-sage/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-sage/15 flex items-center justify-center text-brand-sage mb-2.5">
                    <Recycle className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Solar Knitted</h4>
                  <p className="text-[11px] text-brand-bg/75 leading-normal">Made in Tirupur with captive solar power.</p>
                </ScrollReveal>

                <ScrollReveal delay={0.25} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-brand-sage/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-sage/15 flex items-center justify-center text-brand-sage mb-2.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Organic Dyes</h4>
                  <p className="text-[11px] text-brand-bg/75 leading-normal">Non-toxic colors with zero water discharge.</p>
                </ScrollReveal>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.15} className="relative group">
                <div className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden bg-brand-ink/60 border border-white/15 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/nature-polo/nature_polo_3.webp"
                    alt="Nature Polo Club Signature Organic Polo Shirt"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  {/* Floating Info Tag */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-brand-ink/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold font-serif-heading">Nature Polo Club Signature</h4>
                      <p className="text-[11px] text-brand-bg/80">Organic Bamboo-Cotton Pique</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-sage/20 border border-brand-sage/30 text-brand-sage uppercase tracking-wider">
                      GOTS Certified
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* Sourcing parameters - Light Background Card on Dark Container */}
          <ScrollReveal className="bg-white text-brand-ink rounded-3xl p-8 sm:p-10 md:p-12 text-center max-w-4xl mx-auto shadow-xl border border-brand-light-grey/80 mb-12">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full inline-block mb-3">
              B2B &amp; Private Label
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold mb-3 text-brand-ink">
              Sourcing Nature Polo Club for Your Brand
            </h3>
            <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
              Are you a retail brand or corporate client looking to customize our Signature Organic Polo under your private label? We support custom brand labels, packaging, embroidery, and Pantone colors.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-bold">
              <span className="border border-brand-accent/25 bg-brand-accent/5 text-brand-accent px-4 py-2 rounded-xl shadow-xs">
                MOQ: 500 Pcs per color
              </span>
              <span className="border border-brand-accent/25 bg-brand-accent/5 text-brand-accent px-4 py-2 rounded-xl shadow-xs">
                Lead Time: 35-45 Days
              </span>
              <span className="border border-brand-accent/25 bg-brand-accent/5 text-brand-accent px-4 py-2 rounded-xl shadow-xs">
                Sample Fit: 7 Days
              </span>
            </div>
          </ScrollReveal>

          {/* Email Newsletter Sign Up - Light Background Card on Dark Container */}
          <ScrollReveal delay={0.1} className="max-w-xl mx-auto bg-white text-brand-ink rounded-3xl p-8 sm:p-10 text-center shadow-xl border border-brand-light-grey/80">
            {submitted ? (
              <div className="animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-brand-accent mx-auto mb-4" />
                <h3 className="font-serif-heading text-xl font-bold text-brand-ink mb-2">Subscription Confirmed</h3>
                <p className="text-xs text-brand-grey font-medium">
                  Thank you for your interest. You will be notified as soon as the Nature Polo Club retail storefront goes live.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mx-auto mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-brand-ink mb-1">
                  Nature Polo Club Storefront
                </h3>
                <p className="text-xs text-brand-grey leading-relaxed mb-6 font-medium">
                  Subscribe to receive updates on our direct-to-consumer store launch and seasonal retail drops.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="flex-grow px-4 py-3 rounded-xl bg-brand-bg border border-brand-light-grey focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-xs text-brand-ink font-medium placeholder:text-brand-grey"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-brand-ink hover:bg-brand-ink/90 text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <span>Notify Me</span>
                    <Send className="w-3.5 h-3.5 text-brand-accent" />
                  </button>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
