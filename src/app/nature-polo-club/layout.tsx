import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Nature Polo Club – Sustainable Premium Knitwear Brand",
  description:
    "Lotus International's premier private-label knitwear collection: European micro-pique craftsmanship, zero-curl collar stands, and 100% solar-powered organic cotton manufacturing.",
  path: "/nature-polo-club",
  keywords: [
    "Nature Polo Club",
    "organic cotton polo shirts",
    "sustainable polo manufacturer",
    "premium knitwear Tirupur",
  ],
});

export default function NaturePoloClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
