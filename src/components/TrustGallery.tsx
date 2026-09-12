"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn, MapPin, Calendar, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: "all" | "swarnaprashana" | "eye-camp" | "medical-camp" | "education" | "anganwadi";
  categoryLabel: string;
  location: string;
  date: string;
  description: string;
}

export const CSR_PHOTOS: GalleryItem[] = [
  {
    id: 1,
    url: "https://ik.imagekit.io/lotusinternational/csr/lotus%20(1).webp",
    title: "New anganwadi construction partial sponsorer along with inner wheel club of coimbatore west",
    category: "anganwadi",
    categoryLabel: "Anganwadi Project",
    location: "Coimbatore / Tirupur Region",
    date: "Rural Community Initiative",
    description:
      "Partial sponsorship towards the construction of a new Anganwadi building in collaboration with the Inner Wheel Club of Coimbatore West, establishing a dedicated early childhood care and nutrition center.",
  },
  {
    id: 2,
    url: "https://ik.imagekit.io/lotusinternational/csr/lotus%20(2).webp",
    title: "Anganwadi construction initiative with Inner Wheel Club of Coimbatore West",
    category: "anganwadi",
    categoryLabel: "Anganwadi Project",
    location: "Coimbatore / Tirupur Region",
    date: "Rural Community Initiative",
    description:
      "Ongoing building construction for the rural Anganwadi center, supporting foundational early childhood development and child healthcare.",
  },
  {
    id: 3,
    url: "https://ik.imagekit.io/lotusinternational/csr/lotus%20(3).webp",
    title: "Educational support for the third year examination fees for a college girl",
    category: "education",
    categoryLabel: "Education Sponsorship",
    location: "Tirupur District",
    date: "College Education Support",
    description:
      "Disbursement of full third-year undergraduate examination fees to support a girl student in completing her degree without financial disruption.",
  },
  {
    id: 4,
    url: "https://ik.imagekit.io/lotusinternational/csr/lotus%20(4).webp",
    title: "Educational support for a final year student towards examination fee",
    category: "education",
    categoryLabel: "Education Sponsorship",
    location: "Tirupur District",
    date: "Final Year Degree Support",
    description:
      "Educational assistance provided towards the final-year examination fees for a collegiate student, enabling smooth graduation and career independence.",
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPhotos =
    activeFilter === "all"
      ? CSR_PHOTOS
      : CSR_PHOTOS.filter((photo) => photo.category === activeFilter);

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedPhoto(null);
        } else if (e.key === "ArrowLeft") {
          handlePrev();
        } else if (e.key === "ArrowRight") {
          handleNext();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedPhoto, filteredPhotos]);

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
          All Photos
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("education")}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeFilter === "education"
              ? "bg-brand-ink text-brand-bg shadow-sm"
              : "bg-white text-brand-grey hover:text-brand-ink border border-brand-light-grey/80"
          }`}
        >
          Education Support
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("anganwadi")}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeFilter === "anganwadi"
              ? "bg-brand-ink text-brand-bg shadow-sm"
              : "bg-white text-brand-grey hover:text-brand-ink border border-brand-light-grey/80"
          }`}
        >
          Anganwadi Project
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
          Pudhupalayam Village Camp
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
          Staff Eye Camp
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
          Workforce Medical Camp
        </button>
      </div>

      {/* Minimal Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-brand-light-grey/90 hover:border-brand-accent/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-light-grey/30">
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 text-xs text-white font-medium bg-brand-ink/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/20">
                  <ZoomIn className="w-3.5 h-3.5 text-brand-accent" />
                  <span>View Details</span>
                </span>
              </div>
            </div>

            {/* Title Only Below Image */}
            <div className="p-4 sm:p-5 flex-1 flex items-center">
              <h4 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink group-hover:text-brand-accent transition-colors leading-snug">
                {photo.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal via Portal */}
      {mounted &&
        selectedPhoto &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-brand-ink/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-brand-bg rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 my-auto flex flex-col max-h-[94vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-brand-ink/80 text-white hover:bg-brand-accent transition-colors backdrop-blur-md border border-white/20 cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto max-h-[94vh]">
                {/* Image side with navigation arrows */}
                <div className="md:col-span-7 bg-brand-ink/95 relative flex items-center justify-center p-0 sm:p-4 md:p-6 select-none overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[380px] md:min-h-[500px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="w-full h-full sm:w-auto sm:h-auto max-h-[50vh] md:max-h-[75vh] object-contain sm:rounded-xl shadow-lg transition-transform duration-300"
                  />

                  {/* Previous / Next Arrows */}
                  {filteredPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        aria-label="Previous photo"
                        className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2.5 rounded-full bg-brand-ink/75 hover:bg-brand-accent text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-md"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        aria-label="Next photo"
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2.5 rounded-full bg-brand-ink/75 hover:bg-brand-accent text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-md"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Details side - compact and clean for mobile */}
                <div className="md:col-span-5 p-4 sm:p-6 md:p-7 flex flex-col justify-between bg-brand-bg border-t md:border-t-0 md:border-l border-brand-light-grey">
                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/30">
                        {selectedPhoto.categoryLabel}
                      </span>
                      <span className="text-[10px] font-semibold text-brand-sage uppercase tracking-wider">
                        CSR Impact
                      </span>
                    </div>

                    <h3 className="font-serif-heading text-base sm:text-xl md:text-2xl font-bold text-brand-ink mb-1.5 sm:mb-2.5 leading-snug">
                      {selectedPhoto.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mb-3 sm:mb-5 line-clamp-3 md:line-clamp-none font-medium">
                      {selectedPhoto.description}
                    </p>

                    {/* Location and Date - compact flex layout */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-brand-grey pt-2.5 sm:pt-3 border-t border-brand-light-grey/70">
                      <span className="inline-flex items-center gap-1.5 text-brand-accent font-medium">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-[190px] sm:max-w-none">{selectedPhoto.location}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-brand-sage font-medium">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{selectedPhoto.date}</span>
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-brand-ink pt-4 border-t border-brand-light-grey/70 mt-4">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Conducted under Jayakumar Srinivasan Charitable Trust</span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
