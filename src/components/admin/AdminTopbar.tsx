"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import {
  Menu,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Globe,
} from "lucide-react";

interface AdminTopbarProps {
  onOpenMobile: () => void;
}

export default function AdminTopbar({ onOpenMobile }: AdminTopbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Generate breadcrumb info
  const getBreadcrumbs = () => {
    if (!pathname || pathname === "/admin") {
      return [{ label: "Dashboard", href: "/admin" }];
    }
    const parts = pathname.split("/").filter(Boolean);
    const crumbs = [];

    if (parts[1] === "blog") {
      crumbs.push({ label: "Blog Engine", href: "/admin/blog" });
      if (parts[2] === "new") {
        crumbs.push({ label: "Create Post", href: "/admin/blog/new" });
      } else if (parts[2] === "edit") {
        crumbs.push({ label: "Edit Post", href: pathname });
      }
    } else if (parts[1] === "products") {
      crumbs.push({ label: "Products Catalog", href: "/admin/products" });
    } else if (parts[1] === "inquiries") {
      crumbs.push({ label: "Buyer Inquiries", href: "/admin/inquiries" });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link
            href="/admin"
            className="hover:text-amber-700 transition-colors flex items-center space-x-1"
          >
            <span>Lotus Admin</span>
          </Link>

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href={crumb.href}
                className={
                  idx === breadcrumbs.length - 1
                    ? "text-slate-900 font-semibold"
                    : "hover:text-amber-700 transition-colors"
                }
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Status, View Public Site, Profile indicator */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* System Online badge */}
        <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-medium text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Firebase Connected</span>
        </div>

        {/* View Public Site button */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors border border-slate-200/80"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">View Public Website</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* User quick pill */}
        <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center border border-amber-300">
            {(user?.displayName || user?.email || "A").slice(0, 1).toUpperCase()}
          </div>
          <span className="text-xs font-medium text-slate-700 max-w-[100px] truncate">
            {user?.displayName || user?.email?.split("@")[0] || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
