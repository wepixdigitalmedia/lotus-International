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

export const PRODUCTS: Product[] = [
  {
    id: "m-classic-polo",
    name: "Men's Classic Pique Polo",
    category: "Men",
    type: "Polo Shirt",
    fabric: "100% Combed Cotton Pique",
    gsm: "220 GSM",
    description: "Export-grade pique polo featuring high-durability rib collar, reinforced placket, and side vents. Designed for retail-ready private labeling.",
    features: ["Double-needle stitching", "Enzyme washed for soft handfeel", "Reactive dyed for long-lasting color fastness"],
    image: "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Classic%20Pique%20Polo%20(2).webp",
    images: [
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Classic%20Pique%20Polo%20(2).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Classic%20Pique%20Polo%20(3).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Classic%20Pique%20Polo%20(4).webp",
    ],
    colors: [
      { name: "Classic White", hex: "#FFFFFF" },
      { name: "Deep Ink", hex: "#1F3A3D" },
      { name: "Terracotta", hex: "#B5654A" },
      { name: "Sage Green", hex: "#8A9A7E" },
    ],
    moq: 1000,
    tags: ["Best Seller", "Polos", "OEKO-TEX Certified"],
    specs: {
      fit: "Tailored Regular Fit",
      weave: "Honeycomb Pique Knit",
      dyeing: "Reactive Low-Impact Dye",
      shrinkage: "< 3% ISO standard",
      leadTime: "45-60 Days Bulk",
    },
  },
  {
    id: "w-slub-tee",
    name: "Women's Organic Slub T-Shirt",
    category: "Women",
    type: "T-Shirt",
    fabric: "100% Organic Cotton Slub",
    gsm: "160 GSM",
    description: "Lightweight, breathable scoop neck t-shirt with a textured slub finish. Sourced from GOTS-certified organic cotton farms.",
    features: ["Eco-friendly low impact dye", "Pre-shrunk to prevent washing shrinkage", "Tear-away neck label support"],
    image: "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20Organic%20Slub%20T-Shirt%20(1).webp",
    images: [
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20Organic%20Slub%20T-Shirt%20(1).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20Organic%20Slub%20T-Shirt%20(2).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20Organic%20Slub%20T-Shirt%20(3).webp",
    ],
    colors: [
      { name: "Natural Ivory", hex: "#FAF7F2" },
      { name: "Terracotta", hex: "#B5654A" },
      { name: "Charcoal Ink", hex: "#2A2D34" },
    ],
    moq: 1200,
    tags: ["GOTS Organic", "Eco Blends"],
    specs: {
      fit: "Relaxed Women Fit",
      weave: "Single Jersey Slub",
      dyeing: "Natural Herbal Dye",
      shrinkage: "< 2% ISO standard",
      leadTime: "40-50 Days Bulk",
    },
  },
  {
    id: "m-fleece-hoodie",
    name: "Men's Premium Heavyweight Hoodie",
    category: "Men",
    type: "Sweatshirt",
    fabric: "80% Cotton, 20% Polyester Brushed Fleece",
    gsm: "340 GSM",
    description: "Ultra-dense winter-grade hooded sweatshirt with double-lined hood, kangaroo pocket, and heavy rib cuffs. Perfect for premium street fashion private labels.",
    features: ["Heavyweight fabric construction", "Custom dyed-to-match drawcords", "Low shrinkage fleece weave"],
    image: "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Premium%20Heavyweight%20Hoodie%20(2).webp",
    images: [
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Premium%20Heavyweight%20Hoodie%20(2).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Premium%20Heavyweight%20Hoodie%20(3).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Men's%20Premium%20Heavyweight%20Hoodie%20(4).webp",
    ],
    colors: [
      { name: "Heather Grey", hex: "#C4C4C4" },
      { name: "Deep Ink", hex: "#1F3A3D" },
      { name: "Earth Brown", hex: "#6E473B" },
    ],
    moq: 800,
    tags: ["Streetwear", "Heavyweight"],
    specs: {
      fit: "Oversized Street Fit",
      weave: "3-Fleece Loopback",
      dyeing: "Pigment Garment Wash",
      shrinkage: "< 1.5%",
      leadTime: "45-60 Days Bulk",
    },
  },
  {
    id: "k-cotton-romper",
    name: "Kids' Comfort Rib Knit Romper",
    category: "Kids",
    type: "Loungewear",
    fabric: "95% Organic Cotton, 5% Elastane Rib",
    gsm: "200 GSM",
    description: "Oeko-Tex Standard 100 certified baby romper. Super stretch rib knit fabric that ensures maximum comfort and zero skin irritation.",
    features: ["Nickel-free snap closures", "Flatlock seams for sensitive skin", "Highly breathable weave"],
    image: "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Comfort%20Rib%20Knit%20Romper%20(1).webp",
    images: [
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Comfort%20Rib%20Knit%20Romper%20(1).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Comfort%20Rib%20Knit%20Romper%20(2).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Comfort%20Rib%20Knit%20Romper%20(3).webp",
    ],
    colors: [
      { name: "Pastel Sage", hex: "#A8BBA2" },
      { name: "Warm Oat", hex: "#E8E2D5" },
      { name: "Dusty Rose", hex: "#D4A395" },
    ],
    moq: 1500,
    tags: ["Kids Wear", "Baby Safe", "GOTS Certified"],
    specs: {
      fit: "Infant Comfort Fit",
      weave: "2x2 Stretch Rib",
      dyeing: "Non-Toxic Water Dye",
      shrinkage: "< 2%",
      leadTime: "35-45 Days Bulk",
    },
  },
  {
    id: "npc-signature-polo",
    name: "Nature Polo Club Signature Organic Polo",
    category: "Nature Polo Club",
    type: "Premium Polo",
    fabric: "60% Organic Cotton, 40% Bamboo Fiber Blend",
    gsm: "240 GSM",
    description: "Our in-house flagship garment. Combines the softness of bamboo fibers with the strength of organic cotton, processed entirely using solar-powered machinery.",
    features: ["Natural anti-bacterial properties", "Moisture-wicking yarn blend", "Coconut shell buttons"],
    image: "https://ik.imagekit.io/wepix/lotus%20international/Products/Nature%20Polo%20Club%20Signature%20Organic%20Polo%20(1).webp",
    images: [
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Nature%20Polo%20Club%20Signature%20Organic%20Polo%20(1).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Nature%20Polo%20Club%20Signature%20Organic%20Polo%20(2).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Nature%20Polo%20Club%20Signature%20Organic%20Polo%20(3).webp",
    ],
    colors: [
      { name: "Bamboo Green", hex: "#8A9A7E" },
      { name: "Organic Cream", hex: "#F7F3EC" },
      { name: "Earth Ochre", hex: "#B5654A" },
    ],
    moq: 500,
    tags: ["Flagship", "Eco Blends", "Polos", "Solar Powered"],
    specs: {
      fit: "Tailored Premium Fit",
      weave: "Bamboo Pique Knit",
      dyeing: "Bio-Based Reactive Dye",
      shrinkage: "< 1.5%",
      leadTime: "30-40 Days Bulk",
    },
  },
  {
    id: "w-loungewear-set",
    name: "Women's French Terry Loungewear Set",
    category: "Women",
    type: "Loungewear",
    fabric: "100% Combed Cotton French Terry",
    gsm: "260 GSM",
    description: "Cozy two-piece loungewear set including drop-shoulder sweatshirt and jogger pants. Premium dye-matching and retail finish.",
    features: ["Unbrushed loopback interior", "Elasticated waistband with custom drawcord", "Premium rib cuffs"],
    image: "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20French%20Terry%20Loungewear%20Se%20(2).webp",
    images: [
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20French%20Terry%20Loungewear%20Se%20(2).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20French%20Terry%20Loungewear%20Se%20(3).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Women's%20French%20Terry%20Loungewear%20Se%20(4).webp",
    ],
    colors: [
      { name: "Oatmeal", hex: "#E6DFD5" },
      { name: "Charcoal", hex: "#2C302E" },
      { name: "Terracotta Tint", hex: "#C7826B" },
    ],
    moq: 1000,
    tags: ["Co-Ord Set", "French Terry"],
    specs: {
      fit: "Relaxed Drop-Shoulder",
      weave: "French Terry Loopback",
      dyeing: "Soft Touch Wash",
      shrinkage: "< 2%",
      leadTime: "40-50 Days Bulk",
    },
  },
  {
    id: "k-play-tee",
    name: "Kids' Organic Cotton Play Tee",
    category: "Kids",
    type: "T-Shirt",
    fabric: "100% Ring-Spun Organic Cotton",
    gsm: "150 GSM",
    description: "Soft, everyday t-shirts for children. Available in custom water-based prints and dynamic patterns suitable for sensitive skin.",
    features: ["GOTS certified organic cotton", "Zero chemical residue process", "Reinforced shoulder-to-shoulder taping"],
    image: "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Organic%20Cotton%20Play%20Tee%20(2).webp",
    images: [
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Organic%20Cotton%20Play%20Tee%20(2).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Organic%20Cotton%20Play%20Tee%20(3).webp",
      "https://ik.imagekit.io/wepix/lotus%20international/Products/Kids'%20Organic%20Cotton%20Play%20Tee%20(4).webp",
    ],
    colors: [
      { name: "Sunny Gold", hex: "#E5B25D" },
      { name: "Sky Blue", hex: "#94B4C7" },
      { name: "Pure White", hex: "#FFFFFF" },
    ],
    moq: 2000,
    tags: ["Kids Play", "High MOQ Saver"],
    specs: {
      fit: "Regular Kids Fit",
      weave: "Single Jersey",
      dyeing: "Water-based Print Safe",
      shrinkage: "< 2%",
      leadTime: "30-40 Days Bulk",
    },
  },
];

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
    id: "cert-oekotex",
    name: "OEKO-TEX Standard 100",
    issuingBody: "Hohenstein Textile Testing Institute",
    validity: "Valid through Dec 2026",
    scope: "Testing for harmful substances in textile products",
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
