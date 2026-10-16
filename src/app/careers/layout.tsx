import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Careers – Build a Career in Sustainable Fashion",
  description:
    "Join our factory team in Tirupur, India. Work in a modern, solar-powered facility with safe conditions, fair compensation, and a culture that champions women's empowerment.",
  path: "/careers",
  keywords: [
    "garment factory jobs Tirupur",
    "textile careers India",
    "apparel manufacturing vacancies",
    "ethical clothing jobs",
  ],
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
