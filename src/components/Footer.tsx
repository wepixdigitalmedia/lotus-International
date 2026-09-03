"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Check, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-brand-ink text-brand-bg pt-20 pb-10 border-t border-brand-accent/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-brand-light-grey/10">
          
          {/* Brand Info - Col 1 to 4 */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="The Lotus International Logo"
                className="h-12 md:h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs text-brand-bg/70 leading-relaxed font-medium">
              Export-grade knitwear garment manufacturers in Tirupur, India. Partnering with global lifestyle brands with a deep focus on sustainability and women&apos;s empowerment.
            </p>

            {/* Newsletter Hook */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-brand-accent">
                Subscribe to Industry Reports
              </h4>
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter business email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-brand-accent/50 pr-12 text-brand-bg placeholder:text-brand-bg/40 font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1 p-2 rounded-lg bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[10px] text-brand-sage font-medium animate-fadeIn">
                  Thank you! You are subscribed to our B2B newsletter.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links - Col 5 to 6 */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-brand-accent">Services</h3>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <Link href="/products" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link href="/manufacturing" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Factory Capabilities
                </Link>
              </li>
              <li>
                <Link href="/private-label" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Private Label (OEM)
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Eco Commitments
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Quality & Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Links - Col 7 to 8 */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-brand-accent">Company</h3>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <Link href="/about" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  About Us & Legacy
                </Link>
              </li>
              <li>
                <Link href="/clients" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Client Portfolio
                </Link>
              </li>
              <li>
                <Link href="/nature-polo-club" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Nature Polo Club
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Careers & Culture
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-brand-bg/70 hover:text-brand-accent transition-colors">
                  Downloads & Files
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details - Col 9 to 12 */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-brand-accent">Headquarters</h3>
            <ul className="space-y-4 text-xs font-medium">
              <li className="flex gap-3 text-brand-bg/70 leading-relaxed">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span>
                  No.255/1, Pudhupalayam Village,
                  <br />
                  Avinashi, Tirupur – 641654,
                  <br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex gap-3 text-brand-bg/70 items-center">
                <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                <a href="mailto:info@thelotus-international.com" className="hover:text-brand-accent transition-colors">
                  info@thelotus-international.com
                </a>
              </li>
              <li className="flex gap-3 text-brand-bg/70 items-center">
                <Phone className="w-5 h-5 text-brand-accent shrink-0" />
                <a href="tel:+919944495167" className="hover:text-brand-accent transition-colors">
                  +91 99444 95167
                </a>
              </li>
              <li className="flex gap-3 text-brand-bg/70 items-center">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919944495167?text=Hello%20The%20Lotus%20International%2C%20I%20would%20like%20to%20inquire%20about%20custom%20garment%20manufacturing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: +91 99444 95167
                </a>
              </li>
            </ul>

            {/* Social handles */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-white/10 hover:border-brand-accent hover:text-brand-accent transition-colors bg-white/5"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-white/10 hover:border-brand-accent hover:text-brand-accent transition-colors bg-white/5"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Certifications & Bottom Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-bold tracking-widest uppercase border border-white/10 px-3 py-1 rounded-lg bg-white/5 text-brand-bg/85">
              Sedex 4-Pillar
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase border border-white/10 px-3 py-1 rounded-lg bg-white/5 text-brand-bg/85">
              OEKO-TEX Standard 100
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase border border-white/10 px-3 py-1 rounded-lg bg-white/5 text-brand-bg/85">
              GOTS Certified
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase border border-white/10 px-3 py-1 rounded-lg bg-white/5 text-brand-bg/85">
              ISO 9001:2015
            </span>
          </div>

          <div className="text-xs text-brand-bg/50 font-medium">
            &copy; {currentYear} The Lotus International. All rights reserved. Designed for export reliability.
          </div>
        </div>
      </div>
    </footer>
  );
}
