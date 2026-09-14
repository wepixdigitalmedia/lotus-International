"use client";

import React from "react";

export interface BrandLogo {
  name: string;
  src: string;
  alt: string;
  className?: string;
}

export const BRAND_LOGOS: BrandLogo[] = [
  {
    name: "U.S. Polo Assn.",
    src: "https://ik.imagekit.io/wepix/lotus%20international/us%20polo%20assn.png",
    alt: "U.S. Polo Assn.",
  },
  {
    name: "Arrow",
    src: "/images/logo/arrow.png",
    alt: "Arrow",
  },
  {
    name: "Max Fashion",
    src: "https://ik.imagekit.io/wepix/lotus%20international/max.png",
    alt: "Max Fashion",
  },
  {
    name: "Aeropostale",
    src: "https://ik.imagekit.io/wepix/lotus%20international/aeropostale.png",
    alt: "Aeropostale",
  },
  {
    name: "Studio Earth",
    src: "https://ik.imagekit.io/wepix/lotus%20international/studio%20earth.png",
    alt: "Studio Earth",
  },
  {
    name: "Fabrika",
    src: "https://ik.imagekit.io/wepix/lotus%20international/fabrika.png",
    alt: "Fabrika",
  },
  {
    name: "Liverpool",
    src: "https://ik.imagekit.io/wepix/lotus%20international/liverpool.png",
    alt: "Liverpool",
  },
  {
    name: "Ducati",
    src: "/images/logo/ducati.png",
    alt: "Ducati",
    className: "max-h-7 sm:max-h-8 md:max-h-9",
  },
  {
    name: "Flying Machine",
    src: "/images/logo/flying%20machine.png",
    alt: "Flying Machine",
  },
  {
    name: "Green Planet",
    src: "/images/logo/green%20planet.png",
    alt: "Green Planet",
  },
  {
    name: "Landmark Group",
    src: "/images/logo/land%20mark%20group.png",
    alt: "Landmark Group",
  },
  {
    name: "Nautica",
    src: "/images/logo/nautica.png",
    alt: "Nautica",
  },
];

interface BrandMarqueeProps {
  heading?: string;
  className?: string;
  showHeading?: boolean;
}

export default function BrandMarquee({
  heading = "TRUSTED PARTNER & GLOBAL APPAREL BRANDS",
  className = "",
  showHeading = true,
}: BrandMarqueeProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {showHeading && (
        <h3 className="text-center text-[10px] font-bold tracking-[0.25em] uppercase text-brand-grey/85 mb-8 px-4">
          {heading}
        </h3>
      )}

      {/* Marquee Track with edge fade masks */}
      <div className="relative w-full overflow-hidden mask-marquee">
        <div className="flex w-max animate-marquee items-center py-2">
          {/* First Set of Logos */}
          <div className="flex shrink-0 items-center gap-10 sm:gap-12 md:gap-16 pr-10 sm:pr-12 md:pr-16">
            {BRAND_LOGOS.map((brand, idx) => (
              <div
                key={`brand-1-${idx}`}
                className="flex items-center justify-center shrink-0 h-10 md:h-12"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  className={`h-7 sm:h-8 md:h-10 max-w-[130px] sm:max-w-[150px] md:max-w-[180px] w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto ${
                    brand.className || ""
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Second Duplicate Set for Seamless Loop */}
          <div
            className="flex shrink-0 items-center gap-10 sm:gap-12 md:gap-16 pr-10 sm:pr-12 md:pr-16"
            aria-hidden="true"
          >
            {BRAND_LOGOS.map((brand, idx) => (
              <div
                key={`brand-2-${idx}`}
                className="flex items-center justify-center shrink-0 h-10 md:h-12"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  className={`h-7 sm:h-8 md:h-10 max-w-[130px] sm:max-w-[150px] md:max-w-[180px] w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto ${
                    brand.className || ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
