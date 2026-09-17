"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInAsDemo: (name?: string, email?: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signInAsDemo: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local demo session first
    try {
      const savedDemo = localStorage.getItem("lotus_demo_auth");
      if (savedDemo) {
        setUser(JSON.parse(savedDemo));
        setLoading(false);
      }
    } catch (e) {
      // Ignore localStorage errors
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInAsDemo = (name = "lotusmd", email = "lotusmd@lotusint.in") => {
    const demoUser = {
      uid: "lotus-demo-admin",
      email,
      displayName: name,
      emailVerified: true,
      isAnonymous: false,
    } as unknown as User;
    setUser(demoUser);
    try {
      localStorage.setItem("lotus_demo_auth", JSON.stringify(demoUser));
    } catch (e) {}
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("lotus_demo_auth");
    } catch (e) {}
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Sign out fallback:", e);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signInWithGoogle,
        signInAsDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
