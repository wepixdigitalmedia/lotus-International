"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useInquiry } from "./InquiryProvider";
import { X, Send, CheckCircle, Upload, Loader2 } from "lucide-react";
import { syncVisitorWithSalesIQ } from "@/lib/salesiq";

const rfqSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Please enter a valid phone or WhatsApp number with country code"),
  country: z.string().min(2, "Please enter your country"),
  businessType: z.string().min(1, "Please select your business type"),
  website: z.string().optional(),
  leadSource: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  quantity: z.string().min(1, "Please select an estimated quantity"),
  timeline: z.string().min(1, "Please select a target timeline"),
  message: z.string().min(10, "Please provide some details (min 10 characters)"),
  honeypot: z.string().optional(),
});

type RFQFormData = z.infer<typeof rfqSchema>;

export default function RFQForm() {
  const { items, removeFromInquiry, clearInquiry } = useInquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      category: items.length > 0 ? items[0].category : "Men",
      businessType: "",
      leadSource: "",
      website: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: RFQFormData) => {
    setIsSubmitting(true);
    try {
      // Build submission payload
      const payload = {
        ...data,
        items: items.map((i) => ({ id: i.id, name: i.name, fabric: i.fabric })),
        techPackName: selectedFile ? selectedFile.name : null,
      };

      // Call Next.js API route
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resJson = await response.json();
        
        // Link visitor profile & qualification status directly with Zoho SalesIQ widget
        syncVisitorWithSalesIQ({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          country: data.country,
          productCategory: data.category,
          orderQuantity: data.quantity,
          qualificationTier: resJson?.qualification?.tier,
        });

        setIsSubmitted(true);
        clearInquiry();
        setSelectedFile(null);
        reset();
      } else {
        alert("Failed to submit RFQ. Please try again or contact us directly.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-brand-light-grey rounded-2xl p-8 md:p-12 text-center shadow-lg max-w-2xl mx-auto animate-fadeIn">
        <CheckCircle className="w-16 h-16 text-brand-sage mx-auto mb-6" />
        <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-brand-ink mb-4">
          RFQ Submitted Successfully
        </h3>
        <p className="text-brand-grey text-sm md:text-base leading-relaxed mb-8">
          Thank you for requesting a quote from The Lotus International. Our merchandising team in Tirupur will review your request, catalog selections, and tech packs, and get back to you within 1 business day.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-sm tracking-wide transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-brand-light-grey rounded-2xl p-6 md:p-10 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" suppressHydrationWarning>
        {/* Anti-spam honeypot field (hidden from real users) */}
        <input
          type="text"
          {...register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          className="hidden"
          aria-hidden="true"
          suppressHydrationWarning
        />

        {/* Selected Items section */}
        {items.length > 0 && (
          <div className="bg-brand-bg/50 border border-brand-light-grey rounded-xl p-5 mb-8">
            <h4 className="font-serif-heading text-lg font-bold text-brand-ink mb-3">
              Items Added to Quote Request ({items.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg border border-brand-light-grey text-xs shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-brand-ink">{item.name}</span>
                    <span className="text-brand-grey text-[10px]">{item.fabric}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromInquiry(item.id)}
                    className="p-1 rounded-full text-brand-grey hover:text-brand-accent hover:bg-brand-bg transition-colors"
                    title="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-brand-grey mt-2">
              The above items will be linked directly to your quote request parameters.
            </p>
          </div>
        )}

        {/* Row 1: Name & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Your Name *
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. John Doe"
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.name ? "border-red-500" : "border-brand-light-grey"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Company Name *
            </label>
            <input
              type="text"
              {...register("company")}
              placeholder="e.g. Acme Apparel Brands"
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.company ? "border-red-500" : "border-brand-light-grey"
              }`}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
          </div>
        </div>

        {/* Row 2: Business Email & Phone / WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Business Email *
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="e.g. buyer@company.com"
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.email ? "border-red-500" : "border-brand-light-grey"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="e.g. +1 (555) 234-5678"
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.phone ? "border-red-500" : "border-brand-light-grey"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Row 3: Country & Business Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Country *
            </label>
            <input
              type="text"
              {...register("country")}
              placeholder="e.g. United States, Germany, United Kingdom"
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.country ? "border-red-500" : "border-brand-light-grey"
              }`}
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Business Type *
            </label>
            <select
              {...register("businessType")}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.businessType ? "border-red-500" : "border-brand-light-grey"
              }`}
            >
              <option value="">Select Business Type</option>
              <option value="Fashion Brand / Label">Fashion Brand / Apparel Label</option>
              <option value="Wholesaler / Distributor">Wholesaler / Distributor / Importer</option>
              <option value="Retail Chain / Store">Retail Chain / Department Store</option>
              <option value="Sourcing / Buying House">Sourcing Agency / Buying House</option>
              <option value="Private Label / Boutique">Private Label / Boutique</option>
              <option value="Startup / Emerging Designer">Startup / Emerging Designer</option>
              <option value="Other">Other B2B Buyer</option>
            </select>
            {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType.message}</p>}
          </div>
        </div>

        {/* Row 4: Company Website & Lead Source (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Company Website or LinkedIn <span className="text-brand-grey font-normal normal-case">(Optional)</span>
            </label>
            <input
              type="url"
              {...register("website")}
              placeholder="https://yourbrand.com"
              className="w-full px-4 py-3 rounded-lg border border-brand-light-grey text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              How did you hear about us? <span className="text-brand-grey font-normal normal-case">(Optional)</span>
            </label>
            <select
              {...register("leadSource")}
              className="w-full px-4 py-3 rounded-lg border border-brand-light-grey text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25"
            >
              <option value="">Select Source (Optional)</option>
              <option value="Google Search">Google / Search Engine</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Trade Fair">Trade Fair / Apparel Exhibition</option>
              <option value="Industry Referral">Industry / Colleague Referral</option>
              <option value="B2B Directory">B2B Directory / Export Portal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Row 5: Category, Quantity & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Product Category *
            </label>
            <select
              {...register("category")}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.category ? "border-red-500" : "border-brand-light-grey"
              }`}
            >
              <option value="Men">Men&apos;s Apparel</option>
              <option value="Women">Women&apos;s Apparel</option>
              <option value="Kids">Kids&apos; Apparel</option>
              <option value="Nature Polo Club">Nature Polo Club</option>
              <option value="Custom">Custom / Mixed</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Target Quantity (MOQ) *
            </label>
            <select
              {...register("quantity")}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.quantity ? "border-red-500" : "border-brand-light-grey"
              }`}
            >
              <option value="">Select Range</option>
              <option value="500 - 1000 pcs">500 - 1,000 pcs (Nature Polo)</option>
              <option value="1000 - 5000 pcs">1,000 - 5,000 pcs</option>
              <option value="5000 - 20000 pcs">5,000 - 20,000 pcs</option>
              <option value="20000+ pcs">20,000+ pcs (Full Capacity)</option>
            </select>
            {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
              Timeline *
            </label>
            <select
              {...register("timeline")}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
                errors.timeline ? "border-red-500" : "border-brand-light-grey"
              }`}
            >
              <option value="">Select Timeline</option>
              <option value="Urgent (Sampling required)">Urgent (Sampling First)</option>
              <option value="45-60 Days">45 - 60 Days (Standard)</option>
              <option value="60-90 Days">60 - 90 Days</option>
              <option value="Ongoing Contract">Ongoing Partnership</option>
            </select>
            {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline.message}</p>}
          </div>
        </div>

        {/* Message / Specifications */}
        <div>
          <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
            Specifications & Details *
          </label>
          <textarea
            rows={4}
            {...register("message")}
            placeholder="Please specify GSM requirements, fabric preferences, print/embroidery specifications, and target pricing details..."
            className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent bg-brand-bg/25 ${
              errors.message ? "border-red-500" : "border-brand-light-grey"
            }`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {/* Tech pack file upload */}
        <div>
          <label className="block text-xs font-bold tracking-wider uppercase text-brand-ink mb-2">
            Upload Tech Pack / Design Sheet (Optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-brand-light-grey border-dashed rounded-xl cursor-pointer hover:bg-brand-bg/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-brand-grey mb-2" />
                <p className="text-xs text-brand-grey font-medium">
                  {selectedFile ? (
                    <span className="text-brand-accent font-semibold">{selectedFile.name}</span>
                  ) : (
                    <span>Click to upload PDF, Zip, or Tech Pack files (max 10MB)</span>
                  )}
                </p>
                <p className="text-[10px] text-brand-grey/80 mt-1">PDF, ZIP, JPG, PNG up to 10MB</p>
              </div>
              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.zip,.jpg,.jpeg,.png" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-sm tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-2 disabled:bg-brand-accent/50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing RFQ...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Official Request for Quote
            </>
          )}
        </button>
      </form>
    </div>
  );
}
