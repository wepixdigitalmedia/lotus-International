import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Buyer Resources & Technical Specifications",
  description:
    "Access our infrastructure specifications, lead times schedule, fabric GSM charts, and downloadable product catalogs for apparel brand sourcing.",
  path: "/resources",
  keywords: [
    "apparel sourcing guide",
    "garment lead times sheet",
    "knitwear buyer library",
    "fabric GSM specs",
  ],
});

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
