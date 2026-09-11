"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: "all" | "swarnaprashana" | "eye-camp" | "medical-camp";
  categoryLabel: string;
  location: string;
  date: string;
  description: string;
}

export const CSR_PHOTOS: GalleryItem[] = [
  {
    id: 1,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(1).webp",
    title: "Routine Staff Medical & Vitals Camp",
    category: "medical-camp",
    categoryLabel: "Medical Camp",
    location: "Lotus International Manufacturing Unit, Tirupur",
    date: "Routine Periodic Camp",
    description:
      "Comprehensive medical diagnostics and check-up conducted for all production staff and labourers, monitoring vitals, blood pressure, and overall workplace wellness.",
  },
  {
    id: 2,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(2).webp",
    title: "Free Workforce Eye Screening Camp",
    category: "eye-camp",
    categoryLabel: "Eye Camp",
    location: "Lotus International Health Station, Tirupur",
    date: "Annual Health Initiative",
    description:
      "Professional optometry examination, vision screening, and corrective consultations provided free of cost to all factory floor artisans and labourers.",
  },
  {
    id: 3,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(3).webp",
    title: "Swarnaprashana Camp — Pediatric Consultation",
    category: "swarnaprashana",
    categoryLabel: "Swarnaprashana Camp",
    location: "Pudhupalayam Village Outreach Clinic",
    date: "Monthly Free Camp",
    description:
      "Monthly free Swarnaprashana camp offering Ayurvedic pediatric immunity-boosting drops and guidance to mothers and toddlers from Pudhupalayam and neighboring villages.",
  },
  {
    id: 4,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(4).webp",
    title: "Traditional Immunity Drops for Village Youth",
    category: "swarnaprashana",
    categoryLabel: "Swarnaprashana Camp",
    location: "Pudhupalayam Village, Avinashi",
    date: "Monthly Free Camp",
    description:
      "Doctor administering Swarnaprashana to improve immunity, cognitive strength, and general wellness for rural school children.",
  },
  {
    id: 5,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(5).webp",
    title: "Mother & Girl Child Healthcare Guidance",
    category: "swarnaprashana",
    categoryLabel: "Swarnaprashana Camp",
    location: "Pudhupalayam Village Outreach Clinic",
    date: "Monthly Free Camp",
    description:
      "Ensuring rural young girls receive preventive healthcare, nutritional counseling, and Ayurvedic Swarnaprashana doses alongside their parents.",
  },
  {
    id: 6,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(6).webp",
    title: "Friendly Child Healthcare Interaction",
    category: "swarnaprashana",
    categoryLabel: "Swarnaprashana Camp",
    location: "Pudhupalayam Village Clinic",
    date: "Monthly Free Camp",
    description:
      "A compassionate environment where children feel safe and comfortable during routine health screenings and medicine administration.",
  },
  {
    id: 7,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(7).webp",
    title: "Ayurvedic Pediatric Immunity Camp",
    category: "swarnaprashana",
    categoryLabel: "Swarnaprashana Camp",
    location: "Pudhupalayam Village Outreach Clinic",
    date: "Monthly Free Camp",
    description:
      "Dr. administering traditional Swarnaprashana drops at the rural outreach center in association with Manidhi Vedam Ayurveda for Women and Children.",
  },
  {
    id: 8,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(8).webp",
    title: "Continuous Child Wellness Assessment",
    category: "swarnaprashana",
    categoryLabel: "Swarnaprashana Camp",
    location: "Pudhupalayam Village Clinic",
    date: "Monthly Free Camp",
    description:
      "Tracking the developmental milestones and immunity records of village youth across month-on-month clinic visits.",
  },
  {
    id: 9,
    url: "https://ik.imagekit.io/lotusinternational/csr/csr%20(9).webp",
    title: "Infant Care & Maternal Well-being",
    category: "swarnaprashana",
    categoryLabel: "Swarnaprashana Camp",
    location: "Pudhupalayam Village Clinic",
    date: "Monthly Free Camp",
    description:
      "Supporting new mothers and infants with gentle Ayurvedic care, nutritional supplements, and immunity building from early childhood.",
  },
];

export default function TrustGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredPhotos =
    activeFilter === "all"
      ? CSR_PHOTOS
      : CSR_PHOTOS.filter((photo) => photo.category === activeFilter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeFilter === "all"
              ? "bg-brand-ink text-brand-bg shadow-sm"
              : "bg-white text-brand-grey hover:text-brand-ink border border-brand-light-grey/80"
          }`}
        >
          All Activities ({CSR_PHOTOS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("swarnaprashana")}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeFilter === "swarnaprashana"
              ? "bg-brand-ink text-brand-bg shadow-sm"
              : "bg-white text-brand-grey hover:text-brand-ink border border-brand-light-grey/80"
          }`}
        >
          Pudhupalayam Swarnaprashana Camp (7)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("eye-camp")}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeFilter === "eye-camp"
              ? "bg-brand-ink text-brand-bg shadow-sm"
              : "bg-white text-brand-grey hover:text-brand-ink border border-brand-light-grey/80"
          }`}
        >
          Staff Eye Camp (1)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("medical-camp")}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeFilter === "medical-camp"
              ? "bg-brand-ink text-brand-bg shadow-sm"
              : "bg-white text-brand-grey hover:text-brand-ink border border-brand-light-grey/80"
          }`}
        >
          Workforce Medical Camp (1)
        </button>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-brand-light-grey/90 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-light-grey/40">
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.97]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-white font-medium bg-brand-ink/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <ZoomIn className="w-3.5 h-3.5 text-brand-accent" />
                  <span>View Full Photo</span>
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-ink/80 backdrop-blur-md text-brand-bg border border-white/15">
                  {photo.categoryLabel}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif-heading text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors leading-snug mb-2">
                  {photo.title}
                </h4>
                <p className="text-xs text-brand-grey leading-relaxed line-clamp-2 mb-4 font-medium">
                  {photo.description}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-light-grey/60 flex items-center justify-between text-[11px] text-brand-grey font-medium">
                <span className="flex items-center gap-1 text-brand-accent">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate max-w-[160px]">{photo.location}</span>
                </span>
                <span className="flex items-center gap-1 text-brand-sage font-semibold">
                  <Calendar className="w-3 h-3" />
                  <span>{photo.date}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-ink/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-brand-bg rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-brand-ink/80 text-white hover:bg-brand-accent transition-colors backdrop-blur-md border border-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              {/* Image side */}
              <div className="md:col-span-7 bg-brand-ink/95 relative min-h-[320px] md:min-h-[500px] flex items-center justify-center">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain p-2"
                  priority
                />
              </div>

              {/* Details side */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-brand-bg">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/30">
                      {selectedPhoto.categoryLabel}
                    </span>
                    <span className="text-[10px] font-semibold text-brand-sage uppercase tracking-wider">
                      On-Ground CSR Impact
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-2xl font-bold text-brand-ink mb-3 leading-snug">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-6 font-medium">
                    {selectedPhoto.description}
                  </p>

                  <div className="space-y-2.5 text-xs text-brand-ink bg-white p-4 rounded-2xl border border-brand-light-grey">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-brand-grey uppercase font-bold tracking-wider">Location</div>
                        <div className="font-medium text-xs">{selectedPhoto.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 pt-2 border-t border-brand-light-grey/70">
                      <Calendar className="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-brand-grey uppercase font-bold tracking-wider">Frequency</div>
                        <div className="font-medium text-xs">{selectedPhoto.date}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-light-grey/70 mt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-ink">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                    <span>Conducted under Jayakumar Srinivasan Charitable Trust</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
