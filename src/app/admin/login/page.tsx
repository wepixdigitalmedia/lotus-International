"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin/blog");
    }
  }, [user, loading, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await signInWithEmail(email, password);
      router.push("/admin/blog");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setErrorMsg("Invalid email or password. Please check your credentials.");
      } else if (err.code === "auth/api-key-not-valid" || err.message?.includes("API key")) {
        setErrorMsg("Firebase API Key is pending in .env.local. You can test in demo mode or add live keys.");
      } else {
        setErrorMsg(err.message || "Failed to sign in. Please verify your Firebase Auth settings.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      router.push("/admin/blog");
    } catch (err: any) {
      console.error("Google login error:", err);
      setErrorMsg(err.message || "Google sign-in failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-ink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-brand-bg via-[#F5F2EB] to-[#ECE5D8]">
      <div className="max-w-md w-full">
        {/* Brand Card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-xl border border-black/5">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-ink text-brand-gold flex items-center justify-center shadow-lg shadow-black/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-brand-ink tracking-tight">
              Lotus International
            </h1>
            <p className="text-sm text-brand-ink/60 mt-1">
              Admin Portal • Blog & SEO Content Engine
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lotusinternational.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-ink/20 focus:border-brand-ink text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-ink/80 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-ink/20 focus:border-brand-ink text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-brand-ink hover:bg-black text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-70 cursor-pointer"
            >
              <span>{isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-brand-ink/40">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            type="button"
            className="w-full flex items-center justify-center space-x-2 py-2.5 border border-black/10 rounded-xl bg-white hover:bg-gray-50 text-brand-ink text-sm font-medium transition cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Workspace Login</span>
          </button>

          {/* Quick Access Helper for Local Dev / Setup */}
          <div className="mt-8 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
            <div className="flex items-center space-x-1 font-semibold text-amber-950 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Firebase Auth Tip:</span>
            </div>
            <p>
              Once your Firebase credentials are added to <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[10px]">.env.local</code>, create your admin user under Firebase Console &gt; Authentication &gt; Users.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-brand-ink/60 hover:text-brand-ink underline transition"
          >
            ← Back to Lotus International Home
          </Link>
        </div>
      </div>
    </div>
  );
}
