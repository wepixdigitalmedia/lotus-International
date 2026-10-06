import React from "react";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export default function TestimonialCard({ quote, author, role, company, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white border border-brand-light-grey rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between h-full relative">
      <Quote className="w-10 h-10 text-brand-accent/15 absolute top-6 right-6" />
      <div>
        <p className="text-sm md:text-base font-serif italic text-brand-ink/90 leading-relaxed mb-6 pr-4">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="border-t border-brand-light-grey/60 pt-4 mt-auto flex items-center gap-3">
        {avatar && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatar}
            alt={author}
            className="w-11 h-11 rounded-full object-cover border border-brand-accent/30 shrink-0"
          />
        )}
        <div>
          <h4 className="font-serif-heading text-base font-bold text-brand-ink">{author}</h4>
          <p className="text-xs text-brand-grey font-medium mt-0.5">
            {role}, <span className="text-brand-accent">{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
