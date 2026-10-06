"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

interface TestimonialSliderProps {
  testimonials: TestimonialItem[];
  autoSlideInterval?: number; // in milliseconds, default 4500ms
}

export default function TestimonialSlider({
  testimonials,
  autoSlideInterval = 4500,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible count tracking
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1); // 1 column on mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // 2 columns on tablet
      } else {
        setVisibleCount(3); // 3 columns on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItems = testimonials.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Auto sliding effect with pause on hover
  useEffect(() => {
    if (isPaused || totalItems <= visibleCount) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, totalItems, visibleCount, autoSlideInterval]);

  // Handle touch gestures for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Viewport */}
      <div
        ref={containerRef}
        className="overflow-hidden py-4 -my-4 px-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-3 w-full md:w-1/2 lg:w-1/3 transition-all duration-300"
            >
              <div className="bg-white border border-brand-light-grey rounded-2xl p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-md hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between h-full min-h-[340px] md:min-h-[380px] relative group">
                {/* Background decorative quote watermark */}
                <Quote className="w-10 h-10 text-brand-accent/15 absolute top-6 right-6 transition-transform group-hover:scale-110 duration-300 pointer-events-none" />

                {/* Testimonial Quote */}
                <div className="relative z-10 mb-6 pr-4">
                  <p className="text-xs sm:text-sm md:text-[15px] font-serif italic text-brand-ink/90 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author & Client Profile */}
                <div className="border-t border-brand-light-grey/60 pt-4 mt-auto flex items-center gap-3.5 relative z-10">
                  {item.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-11 h-11 rounded-full object-cover border border-brand-accent/30 shrink-0 bg-brand-bg"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm shrink-0">
                      {item.author.charAt(0)}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <h4 className="font-serif-heading text-sm sm:text-base font-bold text-brand-ink truncate">
                      {item.author}
                    </h4>
                    <p className="text-[11px] text-brand-grey font-medium mt-0.5 truncate">
                      {item.role}, <span className="text-brand-accent font-semibold">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls: Arrows & Pagination Dots */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-brand-light-grey/70">
        
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i
                  ? "w-8 bg-brand-accent"
                  : "w-2.5 bg-brand-light-grey hover:bg-brand-grey"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Previous & Next Arrow Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-brand-light-grey bg-white hover:bg-brand-accent hover:border-brand-accent hover:text-white text-brand-ink transition-all duration-200 flex items-center justify-center shadow-xs hover:shadow-md cursor-pointer disabled:opacity-40"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-semibold text-brand-grey px-1">
            {currentIndex + 1} / {maxIndex + 1}
          </span>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-brand-light-grey bg-white hover:bg-brand-accent hover:border-brand-accent hover:text-white text-brand-ink transition-all duration-200 flex items-center justify-center shadow-xs hover:shadow-md cursor-pointer disabled:opacity-40"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
