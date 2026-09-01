"use client";

import React, { useState } from "react";
import { X, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    topic: "Custom Knitwear OEM",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      topic: "Custom Knitwear OEM",
      date: "",
      time: "",
      notes: "",
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-brand-bg rounded-2xl md:rounded-3xl border border-brand-light-grey shadow-2xl p-5 sm:p-6 md:p-8 z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b border-brand-light-grey/80 mb-6">
              <div>
                <span className="text-[10px] tracking-widest font-bold uppercase text-brand-accent mb-1 block">
                  Direct Tirupur Office
                </span>
                <h3 className="font-serif-heading text-xl md:text-2xl font-bold text-brand-ink">
                  Book B2B Consultation
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full border border-brand-ink/10 hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-brand-sage/10 flex items-center justify-center mx-auto mb-6 text-brand-sage">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif-heading text-xl font-bold text-brand-ink mb-3">
                  Consultation Request Received
                </h4>
                <p className="text-xs text-brand-grey leading-relaxed max-w-sm mx-auto mb-8 font-medium">
                  We have reserved your preferences. A senior merchandising coordinator will email you within 12 hours with a video conference invite link.
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcello V."
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-light-grey text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent bg-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Company Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Studio Earth"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-light-grey text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent bg-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                    Business Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sourcing@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-light-grey text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent bg-white/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Service *
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-light-grey text-xs focus:outline-none bg-white/40"
                    >
                      <option value="Custom Knitwear OEM">Custom OEM</option>
                      <option value="Private Label Program">Private Label</option>
                      <option value="Fabric Sourcing Consult">Fabric Sourcing</option>
                      <option value="Sustainability Audits">Eco & Audits</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Target Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-light-grey text-xs focus:outline-none bg-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                      Preferred Time *
                    </label>
                    <input
                      required
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-light-grey text-xs focus:outline-none bg-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-brand-ink mb-1.5">
                    Discussion Outline
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Describe your program, target MOQ, patterns, specifications, etc..."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-light-grey text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent bg-white/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <span>Secure Video Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
