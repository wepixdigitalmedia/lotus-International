"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ConsultationModal from "@/components/ConsultationModal";

export interface InquiryItem {
  id: string;
  name: string;
  category: string;
  fabric: string;
  image?: string;
  gsm?: string;
}

interface InquiryContextType {
  items: InquiryItem[];
  addToInquiry: (item: InquiryItem) => void;
  removeFromInquiry: (id: string) => void;
  clearInquiry: () => void;
  isInInquiry: (id: string) => boolean;
  isConsultationOpen: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lotus_inquiry_list");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load inquiry list", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("lotus_inquiry_list", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save inquiry list", e);
    }
  }, [items, isLoaded]);

  const addToInquiry = (item: InquiryItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromInquiry = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearInquiry = () => {
    setItems([]);
  };

  const isInInquiry = (id: string) => {
    return items.some((i) => i.id === id);
  };

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <InquiryContext.Provider
      value={{
        items,
        addToInquiry,
        removeFromInquiry,
        clearInquiry,
        isInInquiry,
        isConsultationOpen,
        openConsultation,
        closeConsultation,
      }}
    >
      {children}
      <ConsultationModal isOpen={isConsultationOpen} onClose={closeConsultation} />
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
