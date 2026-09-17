"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If visiting /admin/login, bypass the sidebar layout
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while auth initializes
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10 animate-pulse">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div className="text-center space-y-1.5">
          <p className="text-sm font-semibold tracking-wide text-white">
            Lotus International Admin Suite
          </p>
          <p className="text-xs text-slate-400 flex items-center justify-center space-x-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Verifying authorized session...</span>
          </p>
        </div>
      </div>
    );
  }

  // If not logged in and not on login page, render loading until redirect kicks in
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* Persistent Left Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header */}
        <AdminTopbar onOpenMobile={() => setMobileOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
