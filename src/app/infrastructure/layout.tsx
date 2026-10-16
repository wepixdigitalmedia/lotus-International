import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Manufacturing Infrastructure & Machinery Facilities",
  description:
    "Equipped with automated air-floatation cutting tables, Optitex CAD grading, and specialized modular sewing divisions in Tirupur, India.",
  path: "/infrastructure",
  keywords: [
    "garment factory infrastructure",
    "apparel machinery Tirupur",
    "CAD grading garment export",
    "modular sewing divisions",
  ],
});

export default function InfrastructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
