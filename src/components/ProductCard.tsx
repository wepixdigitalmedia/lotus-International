"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/db";
import { useInquiry } from "./InquiryProvider";
import { Plus, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToInquiry, isInInquiry, removeFromInquiry } = useInquiry();
  const added = isInInquiry(product.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const rawImages =
    product.images && product.images.length > 0
      ? product.images.filter(Boolean)
      : [product.image].filter(Boolean);
  const imagesList = Array.from(new Set(rawImages));

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (imagesList.length <= 1) return;
    setActiveImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (imagesList.length <= 1) return;
    setActiveImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const handleInquiryToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      removeFromInquiry(product.id);
    } else {
      addToInquiry({
        id: product.id,
        name: product.name,
        category: product.category,
        fabric: product.fabric,
        image: imagesList[activeImageIndex] || product.image,
        gsm: product.gsm,
      });
    }
  };

  return (
    <div className="group relative bg-white border border-brand-light-grey/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
      
      {/* 1:1 Aspect Ratio Carousel / Viewport */}
      <div className="relative w-full aspect-square overflow-hidden bg-brand-light-grey/30 group/img">
        <Link 
          href={`/products/${product.id}`} 
          className="block w-full h-full"
        >
          {/* Main Product Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagesList[activeImageIndex] || product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-all duration-500 ease-out group-hover/img:scale-105"
          />

          {/* Minimal Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-black/10 opacity-50 group-hover/img:opacity-75 transition-opacity duration-300 pointer-events-none" />
        </Link>

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md text-brand-ink border border-white/60 shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Carousel Navigation Arrows (Hover reveal - only when multi-image) */}
        {imagesList.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 text-brand-ink hover:bg-brand-accent hover:text-white shadow-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover/img:opacity-100 hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 text-brand-ink hover:bg-brand-accent hover:text-white shadow-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover/img:opacity-100 hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Carousel Pagination Dots (only when multi-image) */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none">
            {imagesList.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImageIndex === idx
                    ? "bg-white w-4 shadow-sm"
                    : "bg-white/50 w-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-3.5">
        <div className="space-y-2">
          
          {/* Category & MOQ Row */}
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-brand-accent uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-brand-grey font-medium">
              MOQ: {product.moq} pcs
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-serif-heading text-base sm:text-lg font-bold text-brand-ink hover:text-brand-accent transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Specs Pill */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-brand-grey uppercase tracking-wider">
            <span>{product.type}</span>
            <span className="w-1 h-1 rounded-full bg-brand-accent/50" />
            <span className="text-brand-accent font-extrabold">{product.gsm}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-brand-light-grey/50">
          <Link
            href={`/products/${product.id}`}
            className="flex-grow text-center text-[10px] sm:text-[11px] font-bold tracking-wider uppercase py-2.5 px-3 rounded-xl border border-brand-ink/15 hover:border-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 text-brand-ink bg-white shadow-2xs"
          >
            View Details
          </Link>

          <button
            onClick={handleInquiryToggle}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center shrink-0 shadow-2xs cursor-pointer ${
              added
                ? "bg-brand-sage border-brand-sage text-white"
                : "border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:border-brand-accent hover:text-white bg-white"
            }`}
            title={added ? "Remove from Inquiry List" : "Add to Inquiry List"}
          >
            {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}
