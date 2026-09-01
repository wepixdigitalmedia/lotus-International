"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Step {
  num: string;
  title: string;
  tagline?: string;
  desc: string;
  icon?: React.ReactNode;
}

interface Props {
  steps: Step[];
}

/* ─────────────────────────────────────────────
   Utilities
───────────────────────────────────────────── */
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ─────────────────────────────────────────────
   COMPONENT: ManufacturingScrollPin
───────────────────────────────────────────── */
export default function ManufacturingScrollPin({ steps }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [spotX, setSpotX] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const n = steps.length;

  /* ─── Detect reduced-motion & screen size ─── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();

    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ─── Buttery Smooth Scrub Loop (rAF Lerp) ─── */
  useEffect(() => {
    if (prefersReduced) return;

    let animId: number;

    const onScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const scrolled = clamp(-rect.top, 0, scrollable);
      targetProgressRef.current = scrolled / scrollable;
    };

    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        // Ultra-smooth 60/120 FPS momentum scrub
        currentProgressRef.current += diff * 0.09;
        setSmoothProgress(currentProgressRef.current);

        const currentStep = clamp(Math.floor(currentProgressRef.current * n), 0, n - 1);
        const targetX = ((currentStep + 0.5) / n) * 100;
        setSpotX((prev) => lerp(prev, targetX, 0.14));
      }
      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, [n, prefersReduced]);

  const activeStep = clamp(Math.floor(smoothProgress * n), 0, n - 1);

  /* ─── Step progress within active slot ─── */
  const stepProgress = (idx: number) => {
    const start = idx / n;
    const end = (idx + 1) / n;
    return clamp((smoothProgress - start) / (end - start), 0, 1);
  };

  /* ─── Mobile / Tablet Vertical Layout ─── */
  if (isMobile || prefersReduced) {
    return (
      <section className="py-20 bg-brand-ink text-white relative overflow-hidden w-full" aria-label="Our Manufacturing Process">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

        <div className="w-full px-6 sm:px-10 relative z-10">
          {/* Header */}
          <div className="text-center mb-14 space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/15 px-3.5 py-1.5 rounded-full border border-brand-accent/30">
              Step-by-Step Workflow
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white">
              Our Manufacturing Process
            </h2>
            <p className="text-xs sm:text-sm text-brand-light-grey/80 max-w-lg mx-auto leading-relaxed font-medium">
              Slick coordination loops ensure we scale production lines from initial sketch parameters to sea freights dispatch.
            </p>
          </div>

          {/* Vertical Timeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative bg-[#183235]/80 backdrop-blur-xl border border-white/15 hover:border-brand-accent/70 rounded-3xl p-7 sm:p-8 shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-heading text-5xl font-light tracking-tight text-brand-accent/70 group-hover:text-brand-accent transition-colors">
                      {step.num}
                    </span>
                    {step.icon && (
                      <span className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/20 transition-all [&>svg]:w-5 [&>svg]:h-5">
                        {step.icon}
                      </span>
                    )}
                  </div>
                  {step.tagline && (
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-accent block mb-2">
                      {step.tagline}
                    </span>
                  )}
                  <h4 className="font-serif-heading text-2xl font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-brand-light-grey/90 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ─── Desktop: Ultra-Smooth Pinned Horizontal Scroll Experience ─── */
  // Continuous horizontal slide offset: maps 0..1 smoothProgress to 4-card slider translation
  const maxSlideSteps = n - 4;
  const slideProgress = Math.min(smoothProgress * (n / (n - 3)), 1);
  const slideShiftPercent = slideProgress * (maxSlideSteps * 26.5);

  return (
    <section
      aria-label="Our Manufacturing Process"
      ref={outerRef}
      style={{ height: `${(n + 1.5) * 100}vh` }}
      className="relative bg-brand-ink text-white w-full"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={innerRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Brand Dark Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />

        {/* Dynamic Smooth Interpolating Spotlight */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0"
          style={{
            left: `${spotX}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle at center, rgba(181, 101, 74, 0.28) 0%, rgba(181, 101, 74, 0.09) 45%, transparent 70%)",
            willChange: "left",
          }}
        />

        {/* Parallax Ambient Orbs */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-96 h-96 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none"
          style={{
            transform: `translate3d(${smoothProgress * -50}px, ${smoothProgress * -30}px, 0)`,
            willChange: "transform",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-brand-sage/10 rounded-full blur-3xl pointer-events-none"
          style={{
            transform: `translate3d(${smoothProgress * 40}px, ${smoothProgress * 60}px, 0)`,
            willChange: "transform",
          }}
        />

        {/* Parallax Background Ghost Watermark */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 text-[12vw] font-bold font-serif-heading text-white/[0.03] tracking-widest uppercase whitespace-nowrap pointer-events-none select-none"
          style={{
            transform: `translate3d(calc(-50% + ${smoothProgress * -100}px), -50%, 0)`,
            willChange: "transform",
          }}
        >
          MANUFACTURING
        </div>

        {/* Full Width Section Content Container */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
          {/* Header Block */}
          <div
            className="text-center mb-8"
            style={{
              transform: `translate3d(0, ${smoothProgress * -20}px, 0)`,
              willChange: "transform",
            }}
          >
            <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/15 px-4 py-1.5 rounded-full border border-brand-accent/30 shadow-sm">
              Step-by-Step Workflow
            </span>
            <h2 className="font-serif-heading text-4xl lg:text-5xl font-bold text-white mt-3.5">
              Our Manufacturing Process
            </h2>
            <p className="text-sm text-brand-light-grey/80 max-w-xl mx-auto leading-relaxed font-medium mt-3">
              Slick coordination loops ensure we scale production lines from initial sketch parameters to sea freights dispatch.
            </p>
          </div>

          {/* Active Step Progress Pill Bar */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className="h-1.5 rounded-full overflow-hidden bg-white/15 transition-all duration-300"
                style={{ width: idx === activeStep ? "48px" : "18px" }}
              >
                <div
                  className="h-full bg-brand-accent rounded-full"
                  style={{
                    width: idx < activeStep ? "100%" : idx === activeStep ? `${stepProgress(idx) * 100}%` : "0%",
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
            ))}
            <span className="ml-3 text-xs font-bold text-brand-light-grey/80 uppercase tracking-widest font-mono">
              {String(activeStep + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>

          {/* 4-Card Horizontal Smooth Sliding Viewport Window */}
          <div className="relative overflow-hidden py-6 px-6 -mx-6 w-[calc(100%+3rem)]">
            <div
              className="flex gap-6"
              style={{
                // Smooth continuous sub-pixel hardware-accelerated horizontal translation
                transform: `translate3d(-${slideShiftPercent.toFixed(2)}%, 0, 0)`,
                willChange: "transform",
              }}
            >
              {steps.map((step, idx) => {
                // Continuous proximity factor (0 when active step center, increasing as it moves away)
                const stepCenter = (idx + 0.5) / n;
                const proximity = Math.abs(smoothProgress - stepCenter) * n;

                const isActive = idx === activeStep;
                const isPast = idx < activeStep;
                const sp = stepProgress(idx);

                // Continuous scale & opacity lerp based on proximity
                const cardScale = clamp(1.03 - proximity * 0.04, 0.96, 1.03);
                const cardOpacity = clamp(1.0 - proximity * 0.12, 0.85, 1.0);
                const cardY = (1 - clamp(1 - proximity * 0.2, 0, 1)) * 6;

                return (
                  <div
                    key={idx}
                    className="w-[calc(25%-18px)] shrink-0 flex flex-col"
                    style={{
                      transform: `translate3d(0, ${cardY.toFixed(1)}px, 0) scale(${cardScale.toFixed(3)})`,
                      opacity: cardOpacity.toFixed(3),
                      willChange: "transform, opacity",
                    }}
                  >
                    {/* LUXURY EDITORIAL NON-IMAGE PROCESS CARD */}
                    <div
                      className="w-full relative rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-colors duration-300 min-h-[350px] border group"
                      style={{
                        background: isActive
                          ? "linear-gradient(145deg, rgba(35, 68, 72, 0.95) 0%, rgba(18, 38, 41, 0.98) 100%)"
                          : "rgba(22, 44, 47, 0.85)",
                        backdropFilter: "blur(20px)",
                        borderColor: isActive
                          ? "rgba(181, 101, 74, 0.85)"
                          : "rgba(255, 255, 255, 0.14)",
                        boxShadow: isActive
                          ? "0 0 50px -10px rgba(181, 101, 74, 0.35), 0 25px 50px -15px rgba(0, 0, 0, 0.6)"
                          : "0 10px 30px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {/* Active Card Terracotta Outer Glow Border */}
                      {isActive && (
                        <div
                          className="absolute -inset-[1px] rounded-[25px] pointer-events-none transition-opacity duration-300 z-20"
                          style={{
                            background: "linear-gradient(135deg, rgba(181, 101, 74, 0.9), rgba(220, 130, 100, 0.5), transparent 70%)",
                            opacity: 0.9,
                            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            maskComposite: "exclude",
                            WebkitMaskComposite: "xor",
                            padding: "1.5px",
                          }}
                        />
                      )}

                      {/* Top Row: Large Numeral + Refined Stage Icon */}
                      <div>
                        <div className="flex items-center justify-between mb-8">
                          <span
                            className="font-serif-heading text-5xl lg:text-6xl font-light tracking-tight transition-colors duration-300 leading-none"
                            style={{
                              color: isActive ? "rgba(181, 101, 74, 1)" : "rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            {step.num}
                          </span>

                          {step.icon && (
                            <span
                              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-sm [&>svg]:w-5 [&>svg]:h-5"
                              style={{
                                backgroundColor: isActive ? "rgba(181, 101, 74, 0.2)" : "rgba(255, 255, 255, 0.05)",
                                borderColor: isActive ? "rgba(181, 101, 74, 0.6)" : "rgba(255, 255, 255, 0.12)",
                                color: isActive ? "#B5654A" : "rgba(255, 255, 255, 0.7)",
                              }}
                            >
                              {step.icon}
                            </span>
                          )}
                        </div>

                        {/* Tagline */}
                        {step.tagline && (
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-accent block mb-2.5">
                            {step.tagline}
                          </span>
                        )}

                        {/* Title */}
                        <h4 className="font-serif-heading text-2xl lg:text-[26px] font-bold text-white tracking-tight leading-snug mb-3">
                          {step.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-brand-light-grey/85 leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </div>

                      {/* Bottom Active Progress Line (Clean without divider line) */}
                      <div className="mt-8 flex items-center justify-between">
                        <div className="h-[2.5px] flex-grow bg-white/10 rounded-full overflow-hidden relative mr-4">
                          <div
                            className="h-full bg-brand-accent rounded-full shadow-[0_0_8px_rgba(181,101,74,0.8)]"
                            style={{
                              width: isActive ? `${sp * 100}%` : isPast ? "100%" : "0%",
                              willChange: "width",
                            }}
                          />
                        </div>
                        <span
                          className="text-[11px] font-mono font-medium tracking-wider transition-colors duration-200 shrink-0"
                          style={{
                            color: isActive ? "rgba(181, 101, 74, 1)" : "rgba(255, 255, 255, 0.35)",
                          }}
                        >
                          {step.num} / {String(n).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div
            className="flex justify-center mt-10"
            style={{
              opacity: smoothProgress > 0.85 ? 0 : 1 - smoothProgress * 0.5,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-bold tracking-[0.2em] text-brand-light-grey/70 uppercase">
                Scroll to progress
              </span>
              <div className="w-px h-6 bg-gradient-to-b from-brand-accent to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
