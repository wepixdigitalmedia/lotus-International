import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Export Knitwear & Loungewear Catalog – 190+ Base Silhouettes",
  description:
    "Explore 190+ export-grade base styles across Men's, Women's, and Sustainable lines. Engineered with ISO/Sedex compliance, custom dye specs, and low MOQs in Tirupur, India.",
  path: "/products",
  keywords: [
    "knitwear catalog",
    "export apparel styles Tirupur",
    "custom t-shirts manufacturer",
    "polo shirts exporter India",
    "garment export catalog",
  ],
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
