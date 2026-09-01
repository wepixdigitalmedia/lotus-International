import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { InquiryProvider } from "@/components/InquiryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Lotus International | Export Knitwear Garment Manufacturer",
  description: "Established in 2004 in Tirupur, India, The Lotus International is a premier private-label knitwear exporter, specializing in sustainable manufacturing for global brands.",
  keywords: "garment manufacturer, knitwear exporter, Tirupur apparel, private label clothing, sustainable clothing manufacturer, Sedex compliant, apparel sourcing India",
  openGraph: {
    title: "The Lotus International | Premium Knitwear Exporter",
    description: "Sustainability-first B2B apparel manufacturer in Tirupur, partnering with global retail leaders.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-brand-bg text-brand-ink min-h-screen flex flex-col antialiased"
      >
        <InquiryProvider>
          <LenisProvider>
            <CustomCursor />
            <Navbar />
            <main className="flex-grow pt-14 md:pt-16">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </InquiryProvider>
      </body>
    </html>
  );
}
