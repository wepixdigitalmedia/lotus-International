"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { LogOut, ExternalLink, FileText, PlusCircle, ShieldCheck } from "lucide-react";

export default function AdminHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="bg-brand-ink text-brand-bg border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/admin/blog" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white tracking-wide">
                Lotus Admin
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                Blog Engine
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 border-l border-white/10 pl-6">
            <Link
              href="/admin/blog"
              className="flex items-center space-x-1.5 text-sm text-gray-300 hover:text-brand-gold transition-colors py-1"
            >
              <FileText className="w-4 h-4" />
              <span>Articles</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex items-center space-x-1.5 text-sm text-gray-300 hover:text-brand-gold transition-colors py-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Post</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
          >
            <span>View Public Blog</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {user && (
            <div className="flex items-center space-x-3 border-l border-white/10 pl-4">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-medium text-white">
                  {user.displayName || user.email?.split("@")[0] || "Admin"}
                </p>
                <p className="text-[10px] text-gray-400 truncate max-w-[120px]">
                  {user.email}
                </p>
              </div>

              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
