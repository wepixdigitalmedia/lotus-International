"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export default function StatCounter({ end, suffix = "", duration = 1.5, label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // easeOutQuad easing
        const ease = progress * (2 - progress);
        setCount(Math.floor(ease * end));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center p-3 sm:p-4 md:p-6 flex flex-col justify-center items-center">
      <div className="text-2xl sm:text-3xl md:text-5xl font-bold font-serif-heading text-brand-accent flex justify-center items-baseline leading-none">
        <span>{count}</span>
        {suffix && <span className="text-base sm:text-xl md:text-3xl ml-0.5">{suffix}</span>}
      </div>
      <div className="text-[9px] sm:text-[10px] md:text-xs text-brand-ink/75 font-bold tracking-wider sm:tracking-widest uppercase mt-1.5 leading-tight max-w-[120px] md:max-w-none">
        {label}
      </div>
    </div>
  );
}
