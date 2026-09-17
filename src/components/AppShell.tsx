"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CustomCursor from "@/components/CustomCursor";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        {children}
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex-grow pt-14 md:pt-16">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
