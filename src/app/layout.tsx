import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import LenisProvider from "@/components/LenisProvider";
import { InquiryProvider } from "@/components/InquiryProvider";
import AppShell from "@/components/AppShell";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  organizationJsonLd,
  websiteJsonLd,
  jsonLdScript,
} from "@/lib/seo";

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#1F3A3D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Lotus International | Knitwear Garment Manufacturer & Exporter, Tirupur",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "garment manufacturer India",
    "knitwear exporter Tirupur",
    "private label clothing manufacturer",
    "OEM apparel manufacturer",
    "sustainable clothing manufacturer",
    "Sedex compliant garment factory",
    "apparel sourcing India",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, email: false, address: false },
  // Homepage canonical. Every public route overrides this with its own path.
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // HTML-tag verification for Google Search Console / Bing Webmaster Tools.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  category: "Apparel Manufacturing",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lotus International",
  },
  openGraph: {
    title: "The Lotus International | Knitwear Garment Manufacturer & Exporter",
    description:
      "Sustainability-first B2B knitwear manufacturer in Tirupur, India, producing private-label apparel for global retail brands since 2004.",
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lotus International | Knitwear Garment Manufacturer & Exporter",
    description:
      "Sustainability-first B2B knitwear manufacturer in Tirupur, India, producing private-label apparel for global retail brands since 2004.",
    images: [DEFAULT_OG_IMAGE.url],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([organizationJsonLd(), websiteJsonLd()])}
        />
        <AuthProvider>
          <InquiryProvider>
            <LenisProvider>
              <AppShell>{children}</AppShell>
            </LenisProvider>
          </InquiryProvider>
        </AuthProvider>
        <Script id="zsiqchat" strategy="afterInteractive">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siq1ab8c0c56f50bdf567bd9c97cdee7cbe743aaecf1c876c3ab7c7b963c003afd4"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
