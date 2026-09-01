"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, ChevronDown, Calendar } from "lucide-react";
import { useInquiry } from "./InquiryProvider";
import ConsultationModal from "./ConsultationModal";

// WePix-style navigation structure with rich submenus
const navConfig = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "About Lotus International", href: "/about" },
      { name: "Quality & Compliance", href: "/compliance" },
      { name: "Global Clients", href: "/clients" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    name: "Our Apparel Range",
    href: "/products",
    submenu: [
      { name: "All Products Catalog", href: "/products" },
      { name: "Private Label Program", href: "/private-label" },
      { name: "Nature Polo Club", href: "/nature-polo-club" },
    ],
  },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Sustainability", href: "/sustainability" },
  {
    name: "Resources",
    href: "/resources",
    submenu: [
      { name: "Industry Insights", href: "/resources" },
      { name: "Contact & RFQ", href: "/contact" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useInquiry();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY > 40) {
            setScrolled(true);
          } else if (scrollY < 15) {
            setScrolled(false);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenMobileSubmenu(null);
  }, [pathname]);

  const toggleMobileSubmenu = (name: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === name ? null : name);
  };

  return (
    <>
      {/* ─── Fixed Header Outer Wrapper (WePix Sourcing Reference Layout) ─────── */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-4 w-full ${
            scrolled
              ? "mt-2.5 w-[96%] max-w-7xl rounded-full bg-brand-ink/90 backdrop-blur-xl border border-white/15 shadow-2xl py-2 px-5 sm:px-8 text-white"
              : "mt-0 max-w-full rounded-none bg-brand-bg/95 backdrop-blur-md border-b border-brand-light-grey/60 py-3.5 px-6 lg:px-12 text-brand-ink"
          }`}
        >

          {/* ── Left: Brand Logo ──── */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="group relative inline-flex items-center h-9 md:h-10">
              <div className="relative h-9 md:h-10 w-28 sm:w-32 flex items-center">
                {/* Standard Logo (Scrolled = False) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="The Lotus International"
                  className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-300 ease-in-out group-hover:scale-105 ${
                    scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                />
                {/* Inverted White Logo (Scrolled = True) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="The Lotus International"
                  className={`absolute inset-0 h-full w-auto object-contain brightness-0 invert transition-opacity duration-300 ease-in-out group-hover:scale-105 ${
                    scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* ── Center: Desktop Navigation (WePix Sourcing Reference Style) ────────── */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7">
            {navConfig.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.submenu && item.submenu.some((sub) => sub.href === pathname));

              if (item.submenu) {
                return (
                  <div key={item.name} className="relative group py-2">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                        scrolled
                          ? isActive
                            ? "text-brand-accent font-bold"
                            : "text-white/85 hover:text-white"
                          : isActive
                          ? "text-brand-accent font-bold"
                          : "text-neutral-800 hover:text-brand-accent"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 opacity-70" />
                    </Link>

                    {/* Smooth Dropdown Panel */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform group-hover:translate-y-0 -translate-y-1.5 z-50">
                      <div
                        className={`w-56 rounded-2xl shadow-2xl py-3 border overflow-hidden transition-all duration-300 ${
                          scrolled
                            ? "bg-brand-ink/95 backdrop-blur-2xl border-white/15 text-white"
                            : "bg-white/95 backdrop-blur-xl border-brand-light-grey/80 text-brand-ink"
                        }`}
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-5 py-2.5 text-xs font-semibold transition-colors duration-150 ${
                              scrolled
                                ? pathname === sub.href
                                  ? "text-brand-accent bg-white/10 font-bold"
                                  : "text-white/85 hover:text-white hover:bg-white/10"
                                : pathname === sub.href
                                ? "text-brand-accent font-bold bg-brand-light-grey/40"
                                : "text-neutral-700 hover:bg-brand-light-grey/30 hover:text-brand-accent"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                    scrolled
                      ? isActive
                        ? "text-brand-accent font-bold"
                        : "text-white/85 hover:text-white"
                      : isActive
                      ? "text-brand-accent font-bold"
                      : "text-neutral-800 hover:text-brand-accent"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Get Quote CTA & Action Buttons ─────────────────────────── */}
          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-3">
              {/* Inquiry Counter Icon */}
              <Link
                href="/contact"
                title="Inquiry List"
                className={`relative p-2 rounded-full border transition-all duration-300 ${
                  scrolled
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-neutral-300 text-neutral-800 hover:border-brand-accent hover:text-brand-accent bg-white/60"
                }`}
              >
                <FileText className="w-4 h-4" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-accent text-brand-bg text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Consultation Button */}
              <button
                onClick={() => setIsConsultationOpen(true)}
                className={`px-3.5 py-2 text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  scrolled
                    ? "text-white/90 hover:text-white"
                    : "text-neutral-700 hover:text-brand-accent"
                }`}
              >
                Book Consultation
              </button>

              {/* Get Quote Pill Button (Matching WePix Sourcing) */}
              <Link
                href="/contact"
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm whitespace-nowrap ${
                  scrolled
                    ? "bg-brand-accent hover:bg-brand-accent-hover text-brand-bg hover:shadow-brand-accent/25"
                    : "bg-[#1A1A1A] hover:bg-brand-accent text-white"
                }`}
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Icon */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/contact"
                className={`relative p-2 rounded-full border transition-colors duration-300 ${
                  scrolled
                    ? "border-white/20 text-white bg-white/10"
                    : "border-neutral-300 text-neutral-800 bg-white/60"
                }`}
              >
                <FileText className="w-4 h-4" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent text-brand-bg text-[8px] font-bold rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className={`p-2 rounded-full border transition-colors duration-300 ${
                  scrolled
                    ? "border-white/20 text-white bg-white/10"
                    : "border-neutral-300 text-neutral-800 bg-white/60"
                }`}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ─── Mobile Drawer Overlay ─────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-ink/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ─── Mobile Drawer Navigation (Matching WePix Sourcing Mobile Drawer) ─── */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-50 w-full max-w-sm bg-white text-neutral-900 border-l shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-neutral-200">
            <Link href="/" className="inline-flex" onClick={() => setIsOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="The Lotus International"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu List with Dividers */}
          <nav className="flex flex-col mt-4 divide-y divide-neutral-200">
            {navConfig.map((item) => (
              <div key={item.name} className="py-3">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMobileSubmenu(item.name)}
                      className="w-full flex items-center justify-between text-base font-semibold text-neutral-800 hover:text-brand-accent transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 text-neutral-500 ${
                          openMobileSubmenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openMobileSubmenu === item.name && (
                      <div className="mt-2 pl-4 flex flex-col gap-2.5 border-l-2 border-brand-accent/30 py-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-sm font-medium transition-colors ${
                              pathname === sub.href
                                ? "text-brand-accent font-bold"
                                : "text-neutral-600 hover:text-neutral-900"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base font-semibold transition-colors ${
                      pathname === item.href
                        ? "text-brand-accent font-bold"
                        : "text-neutral-800 hover:text-brand-accent"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Drawer Bottom Actions */}
        <div className="pt-6 border-t border-neutral-200 space-y-3">
          <button
            onClick={() => {
              setIsOpen(false);
              setIsConsultationOpen(true);
            }}
            className="w-full text-center py-3 rounded-full border border-neutral-300 font-semibold text-xs text-neutral-800 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-brand-accent" />
            <span>Book Consultation</span>
          </button>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-3.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-md bg-[#1A1A1A] hover:bg-brand-accent text-white"
          >
            Get Quote
          </Link>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  );
}
