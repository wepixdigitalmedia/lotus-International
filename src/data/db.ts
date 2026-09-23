export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Men" | "Women" | "Kids" | "Nature Polo Club";
  type: string;
  fabric: string;
  gsm: string;
  description: string;
  features: string[];
  image: string;
  images: string[]; // Minimum 3 high-res product images
  colors: ColorSwatch[]; // Interactive color swatches
  moq: number;
  tags?: string[];
  specs?: {
    fit?: string;
    weave?: string;
    dyeing?: string;
    shrinkage?: string;
    leadTime?: string;
  };
}

export interface Certificate {
  id: string;
  name: string;
  issuingBody: string;
  validity: string;
  scope: string;
  downloadUrl: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  description: string;
  requirements: string[];
}

import importedProductsData from "./importedProducts.json";

export const PRODUCTS: Product[] = importedProductsData as Product[];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-sedex",
    name: "Sedex 4-Pillar Compliance",
    issuingBody: "Sedex Information Exchange Ltd.",
    validity: "Active (Audited Annually)",
    scope: "Labor Standards, Health & Safety, Environment, and Business Ethics",
    downloadUrl: "#",
  },
  {
    id: "cert-gots",
    name: "Global Organic Textile Standard (GOTS)",
    issuingBody: "OneCert International",
    validity: "Valid through Sept 2026",
    scope: "Processing and manufacturing of organic fiber textiles",
    downloadUrl: "#",
  },
  {
    id: "cert-iso",
    name: "ISO 9001:2015",
    issuingBody: "TUV SUD South Asia Pvt Ltd",
    validity: "Valid through June 2027",
    scope: "Quality Management Systems for garment manufacture",
    downloadUrl: "#",
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2004",
    title: "Founding as 'Paruthi'",
    description: "Began operations as a local garment retail and manufacturing contractor focusing on domestic knitwear.",
  },
  {
    year: "2009",
    title: "Rebranded to The Lotus International",
    description: "Shifted focus towards direct export orders, setting up our main factory campus in Avinashi, Tirupur.",
  },
  {
    year: "2015",
    title: "Green Initiative (Solar Shift)",
    description: "Installed our first captive solar power array, shifting 60% of manufacturing operations to renewable power.",
  },
  {
    year: "2019",
    title: "In-house Brand & Expansion",
    description: "Launched 'Nature Polo Club', our sustainable brand showcase. Achieved 90% workforce empowerment with women leads.",
  },
  {
    year: "2024",
    title: "20 Years of Craftsmanship",
    description: "Now exporting to top retail brands in the US, Europe, and India, with Sedex 4-Pillar global audit scores.",
  },
];

export const CAREERS: JobOpening[] = [
  {
    id: "job-qc-manager",
    title: "Senior Quality Control Manager",
    department: "Quality Assurance",
    location: "Avinashi Factory, Tirupur",
    experience: "5-7 Years",
    description: "We are seeking a senior quality specialist to oversee fabric inspection, inline audits, and final AQL 1.5 audits for international buyers.",
    requirements: [
      "Experience with export buyers like U.S. Polo Assn. or Arrow",
      "Knowledge of AQL inspection methodologies and knitwear fabric defects",
      "Ability to lead a team of 15+ inline checkers",
    ],
  },
  {
    id: "job-merchandiser",
    title: "Production Merchandiser (B2B)",
    department: "Merchandising",
    location: "Corporate Office, Tirupur",
    experience: "3-5 Years",
    description: "Coordinate between buyers, sampling room, sourcing departments, and production floors to ensure timelines and specifications are met.",
    requirements: [
      "Degree in Apparel Tech or Fashion Merchandising",
      "Excellent written and verbal communication in English",
      "Strong coordination and task management skills",
    ],
  },
];
