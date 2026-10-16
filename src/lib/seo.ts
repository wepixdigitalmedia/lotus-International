import type { Metadata } from "next";

/**
 * Canonical production origin. Every canonical URL, sitemap entry and
 * structured-data URL is derived from this, so it must match the exact
 * property you verify in Google Search Console (https, with/without www).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thelotusinternational.com"
).replace(/\/$/, "");

export const SITE_NAME = "The Lotus International";

export const DEFAULT_DESCRIPTION =
  "Established in 2004 in Tirupur, India, The Lotus International is a private-label knitwear exporter and OEM garment manufacturer specialising in sustainable, solar-powered production for global apparel brands.";

export const DEFAULT_OG_IMAGE = {
  url: "https://ik.imagekit.io/wepix/lotus%20international/banner/banner%20image%20LI%2001.webp",
  width: 1200,
  height: 630,
  alt: "The Lotus International – Knitwear garment manufacturing in Tirupur, India",
};

export const BUSINESS = {
  legalName: "The Lotus International",
  foundingDate: "2004",
  email: "hema@lotusintltextiles.com",
  telephone: "+91-99444-95167",
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  address: {
    streetAddress: "No.255/1, Pudhupalayam Village, Avinashi",
    addressLocality: "Tirupur",
    addressRegion: "Tamil Nadu",
    postalCode: "641654",
    addressCountry: "IN",
  },
  // Add real profile URLs here (LinkedIn, Instagram, etc.) – they feed
  // the Organization `sameAs` property used for Google's knowledge panel.
  sameAs: [] as string[],
};

interface PageSeo {
  /** Page title without the brand suffix – the root title template appends it. */
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/about". */
  path: string;
  keywords?: string[];
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
}

/**
 * Builds consistent per-page metadata (title, description, canonical,
 * Open Graph, Twitter). Next.js shallow-merges `openGraph` between segments,
 * so the shared fields are repeated here rather than inherited.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageSeo): Metadata {
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image.url],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: BUSINESS.logo,
    image: DEFAULT_OG_IMAGE.url,
    description: DEFAULT_DESCRIPTION,
    foundingDate: BUSINESS.foundingDate,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    address: { "@type": "PostalAddress", ...BUSINESS.address },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: BUSINESS.email,
        telephone: BUSINESS.telephone,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Tamil"],
      },
    ],
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Serialises JSON-LD safely for inline <script> (escapes `<` to prevent tag break-out). */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
