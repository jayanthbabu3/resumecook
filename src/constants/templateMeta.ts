export interface TemplateMeta {
  name: string;
  description: string;
  category: string;
  categorySlug: string;
}

export const templateMetaMap: Record<string, TemplateMeta> = {
  professional: {
    name: "Classic Professional",
    description:
      "Traditional single-column layout optimized for corporate roles.",
    category: "Corporate",
    categorySlug: "all",
  },
  modern: {
    name: "Contemporary",
    description:
      "Contemporary two-column design for creative and product teams.",
    category: "Creative",
    categorySlug: "all",
  },
  minimal: {
    name: "Elegant Minimal",
    description: "Sophisticated whitespace-focused template for easy scanning.",
    category: "Universal",
    categorySlug: "all",
  },
  executive: {
    name: "Executive Leadership",
    description: "Bold leadership-focused layout for senior candidates.",
    category: "Leadership",
    categorySlug: "all",
  },
  frontend: {
    name: "Technical Grid",
    description:
      "Balanced UI-focused resume with skill grids and project highlights.",
    category: "Engineering",
    categorySlug: "software",
  },
  fullstack: {
    name: "Comprehensive Pro",
    description:
      "Complete coverage with plenty of space for technical impact.",
    category: "Engineering",
    categorySlug: "software",
  },
  backend: {
    name: "Systems Focus",
    description:
      "API-centric template emphasizing scalability and system design.",
    category: "Engineering",
    categorySlug: "software",
  },
  software: {
    name: "Impact Metrics",
    description:
      "Bold two-column layout with impact metrics, achievements, and career highlights.",
    category: "Engineering",
    categorySlug: "software",
  },
  graduate: {
    name: "Fresh Graduate",
    description:
      "Education-forward layout highlighting projects and internships.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  starter: {
    name: "Career Starter",
    description:
      "Entry-level friendly template with skills and achievements spotlight.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  fresher: {
    name: "Modern Entry",
    description:
      "ATS-optimized premium template with elegant design for fresh graduates and entry-level professionals.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "premium-fresher": {
    name: "Graduate Plus",
    description:
      "Modern premium template with gradient design, skill levels, and ATS-friendly layout for fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  senior: {
    name: "Achievement Driven",
    description: "Achievement-driven layout tailored for senior professionals.",
    category: "Engineering",
    categorySlug: "software",
  },
  "senior-frontend": {
    name: "Vibrant Professional",
    description: "Vibrant two-column experience with data-driven highlights.",
    category: "Design & Engineering",
    categorySlug: "software",
  },
  "senior-backend": {
    name: "Architecture Pro",
    description:
      "Robust template highlighting scalable architecture, reliability, and leadership impact.",
    category: "Engineering",
    categorySlug: "software",
  },
  "premium-universal": {
    name: "Universal Pro",
    description:
      "Elegant and simple ATS-friendly template suitable for all industries and experience levels.",
    category: "Universal",
    categorySlug: "all",
  },
  "premium-pro": {
    name: "Accent Panel",
    description:
      "Modern premium design with side accent panel and sophisticated typography for all professions.",
    category: "Universal",
    categorySlug: "all",
  },
  "fresher-elite": {
    name: "Elite Entry",
    description:
      "Modern premium design with colored header and timeline layout, perfect for fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  analyst: {
    name: "Corporate Blue",
    description:
      "Clean blue-themed design with photo, ideal for corporate professionals.",
    category: "Corporate",
    categorySlug: "all",
  },
  elite: {
    name: "Elite Professional",
    description:
      "Premium elegant template with left accent bar and sophisticated typography for all professions.",
    category: "Universal",
    categorySlug: "all",
  },
  "corporate-executive": {
    name: "Corporate Executive",
    description:
      "Premium ATS-friendly template with sophisticated layout and elegant typography for senior professionals.",
    category: "Corporate",
    categorySlug: "all",
  },
  refined: {
    name: "Refined Elegance",
    description:
      "Beautiful minimalist design with exceptional typography, timeline accents, and sophisticated spacing for all professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "premium-elite": {
    name: "Premium Elite",
    description:
      "Stunning gradient header design with modern typography, timeline elements, and visual hierarchy for all professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "sapphire-executive": {
    name: "Sapphire Executive",
    description:
      "Elegant professional template with diagonal accent, timeline experience markers, and sophisticated typography for executives.",
    category: "Leadership",
    categorySlug: "all",
  },
  "creative-accent": {
    name: "Creative Accent",
    description:
      "Modern sidebar template with gradient accent panel, skill bars, and creative two-column layout for all professionals.",
    category: "Creative",
    categorySlug: "all",
  },
  "modern-sidebar": {
    name: "Modern Sidebar",
    description:
      "Contemporary template with left sidebar, clean grid layout, and modern design perfect for all industries.",
    category: "Universal",
    categorySlug: "all",
  },
  "minimalist-geometric": {
    name: "Minimalist Geometric",
    description:
      "Clean minimalist design with geometric accents, light typography, and exceptional white space for modern professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "bold-headline": {
    name: "Bold Headline",
    description:
      "Powerful dark header template with bold typography, strong visual hierarchy, and impactful design for all roles.",
    category: "Universal",
    categorySlug: "all",
  },
  "dual-tone": {
    name: "Dual Tone",
    description:
      "Modern two-tone template with accent sidebar, card-style skills, and clean sectioning for contemporary professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "elegant-serif": {
    name: "Elegant Serif",
    description:
      "Sophisticated serif typography template with ornamental dividers, centered layout, and classic elegance for all fields.",
    category: "Universal",
    categorySlug: "all",
  },
  "tech-grid": {
    name: "Tech Grid",
    description:
      "Technical template with gradient header, 3-column skill grid, and card-style layout for technology professionals.",
    category: "Engineering",
    categorySlug: "software",
  },
  "contemporary-split": {
    name: "Contemporary Split",
    description:
      "Bold 50/50 split design with dark sidebar, high contrast layout, and modern aesthetic for all professionals.",
    category: "Universal",
    categorySlug: "all",
  },
  "luxury-timeline": {
    name: "Luxury Timeline",
    description:
      "Premium template with golden timeline, elegant typography, ample white space, and luxury feel for senior professionals.",
    category: "Leadership",
    categorySlug: "all",
  },
  "fresher-minimal-grid": {
    name: "Minimal Grid",
    description:
      "Clean 3-column grid layout with side border accent, perfect for showcasing education, skills, and early experience systematically.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-dark-professional": {
    name: "Dark Professional",
    description:
      "Modern template with dark gradient header, white skills badges, and side accent bars for a sophisticated fresh graduate look.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-color-accent": {
    name: "Color Accent Sidebar",
    description:
      "Eye-catching colored sidebar with profile photo, contact info, and skills, paired with clean white content area.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-timeline": {
    name: "Timeline Journey",
    description:
      "Vertical timeline design with connecting lines and timeline dots showing your educational and professional journey chronologically.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-skills-first": {
    name: "Skills Showcase",
    description:
      "Skills-prominent layout with large skill cards at the top, ideal for freshers with strong technical capabilities.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-card-based": {
    name: "Card Design",
    description:
      "Modern card-based layout with shadow effects and gray background, creating depth and visual hierarchy for all sections.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-two-tone": {
    name: "Two-Tone Split",
    description:
      "Bold 50/50 split design with colored left half featuring white text and clean white right content area.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-centered-elegant": {
    name: "Centered Elegance",
    description:
      "Sophisticated center-aligned layout with elegant typography, decorative line elements, and refined styling.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-geometric": {
    name: "Geometric Shapes",
    description:
      "Creative template with geometric accent shapes (hexagons, circles) as decorative elements throughout the design.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "fresher-achievement": {
    name: "Achievement Focus",
    description:
      "Achievement-focused layout with highlighted sections and award icons, perfect for emphasizing accomplishments and metrics.",
    category: "Early Career",
    categorySlug: "freshers",
  },
};

export const categoryLabelMap: Record<string, string> = {
  software: "Software Development",
  freshers: "Freshers & Entry Level",
  accountants: "Accounting & Finance",
  teaching: "Teaching & Education",
  all: "All Professions",
};
