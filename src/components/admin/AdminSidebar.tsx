"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Shirt,
  Inbox,
  ExternalLink,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/admin/login");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
      badge: "Overview",
    },
    {
      name: "Blog Engine",
      href: "/admin/blog",
      icon: FileText,
      exact: false,
      subItems: [
        { name: "Articles List", href: "/admin/blog" },
        { name: "Write New Post", href: "/admin/blog/new" },
      ],
    },
    {
      name: "Products Catalog",
      href: "/admin/products",
      icon: Shirt,
      exact: false,
      subItems: [
        { name: "All Products", href: "/admin/products" },
        { name: "Men • Women • Kids", href: "/admin/products?filter=categories" },
      ],
    },
    {
      name: "Buyer Inquiries",
      href: "/admin/inquiries",
      icon: Inbox,
      exact: false,
      badge: "B2B Leads",
    },
  ];

  const userInitial = (user?.displayName || user?.email || "Admin")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B1120] text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 bg-[#070D19]/60">
          <Link
            href="/admin"
            className="flex items-center space-x-3 group"
            onClick={onCloseMobile}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif font-bold text-white text-base tracking-wide">
                  Lotus Admin
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.5 rounded border border-amber-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wider">
                INTERNATIONAL B2B
              </p>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Portal Switcher Banner */}
        <div className="px-4 py-3 mx-4 my-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-200/90 font-medium">
              Enterprise Portal
            </span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Navigation Modules */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Core Modules
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

                return (
                  <div key={item.name} className="space-y-1">
                    <Link
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-amber-400" : "text-slate-400"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            isActive
                              ? "bg-amber-500/30 text-amber-200"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Subitems if open */}
                    {item.subItems && isActive && (
                      <div className="pl-9 pr-2 space-y-1 py-1 border-l-2 border-amber-500/20 ml-5">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={onCloseMobile}
                              className={`block px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                                isSubActive
                                  ? "text-amber-300 font-medium bg-amber-500/10"
                                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions Shortcuts */}
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Quick Creation
            </p>
            <div className="space-y-1">
              <Link
                href="/admin/blog/new"
                onClick={onCloseMobile}
                className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Publish New Article</span>
              </Link>
              <Link
                href="/admin/products"
                onClick={onCloseMobile}
                className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-blue-400" />
                <span>Add Product Style</span>
              </Link>
            </div>
          </div>
        </div>

        {/* User Profile & Sign Out Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#070D19]/70">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                {userInitial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1.5">
                  <p className="text-xs font-semibold text-white truncate">
                    {user?.displayName || user?.email?.split("@")[0] || "Admin"}
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-400 truncate font-mono">
                  {user?.email || "admin@lotusint.in"}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
