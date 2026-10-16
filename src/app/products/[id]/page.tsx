import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/db";
import { getProductById } from "@/lib/productService";
import {
  SITE_NAME,
  SITE_URL,
  jsonLdScript,
  breadcrumbJsonLd,
} from "@/lib/seo";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const staticProduct = PRODUCTS.find((p) => p.id === id);
  const product = staticProduct || (await getProductById(id));

  if (!product) {
    return {
      title: "Product Silhouette Not Found",
    };
  }

  const title = `${product.name} – ${product.category}`;
  const description =
    product.description ||
    `${product.name} exported from Tirupur, India. Fabric: ${product.fabric}, Weight: ${product.gsm}, MOQ: ${product.moq} pcs. Custom private label & OEM manufacturing by The Lotus International.`;
  const canonicalPath = `/products/${product.id}`;
  const imageUrl = product.image || `${SITE_URL}/android-chrome-512x512.png`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      product.fabric,
      product.gsm,
      "knitwear manufacturer Tirupur",
      "custom garment exporter India",
      "OEM clothing manufacturing",
      ...(product.features || []),
    ],
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const staticProduct = PRODUCTS.find((p) => p.id === id);
  const product = staticProduct || (await getProductById(id));

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image ? [product.image] : [],
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "5.00",
      highPrice: "25.00",
      offerCount: product.moq || 500,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${product.id}`,
    },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.category, path: `/products?category=${encodeURIComponent(product.category)}` },
    { name: product.name, path: `/products/${product.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([productJsonLd, breadcrumbs])}
      />
      <ProductDetailClient initialProduct={product} productId={id} />
    </>
  );
}
