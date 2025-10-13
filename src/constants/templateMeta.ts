export interface TemplateMeta {
  name: string;
  description: string;
  category: string;
  categorySlug: string;
}

export const templateMetaMap: Record<string, TemplateMeta> = {
  professional: {
    name: "Professional",
    description:
      "Traditional single-column layout optimized for corporate roles.",
    category: "Corporate",
    categorySlug: "all",
  },
  modern: {
    name: "Modern",
    description:
      "Contemporary two-column design for creative and product teams.",
    category: "Creative",
    categorySlug: "all",
  },
  minimal: {
    name: "Minimal",
    description: "Sophisticated whitespace-focused template for easy scanning.",
    category: "Universal",
    categorySlug: "all",
  },
  executive: {
    name: "Executive",
    description: "Bold leadership-focused layout for senior candidates.",
    category: "Leadership",
    categorySlug: "all",
  },
  frontend: {
    name: "Frontend Developer",
    description:
      "Balanced UI-focused resume with skill grids and project highlights.",
    category: "Engineering",
    categorySlug: "software",
  },
  fullstack: {
    name: "Full Stack Engineer",
    description:
      "Complete stack coverage with plenty of space for technical impact.",
    category: "Engineering",
    categorySlug: "software",
  },
  backend: {
    name: "Backend Developer",
    description:
      "API-centric template emphasizing scalability and system design.",
    category: "Engineering",
    categorySlug: "software",
  },
  software: {
    name: "Lead Software Engineer",
    description:
      "Bold two-column layout with impact metrics, achievements, and career highlights.",
    category: "Engineering",
    categorySlug: "software",
  },
  graduate: {
    name: "Graduate",
    description:
      "Education-forward layout highlighting projects and internships.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  starter: {
    name: "Starter",
    description:
      "Entry-level friendly template with skills and achievements spotlight.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  fresher: {
    name: "Fresher Premium",
    description:
      "ATS-optimized premium template with elegant design for fresh graduates and entry-level professionals.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  "premium-fresher": {
    name: "Premium Fresher",
    description:
      "Modern premium template with gradient design, skill levels, and ATS-friendly layout for fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  senior: {
    name: "Senior Software Engineer",
    description: "Achievement-driven layout tailored for senior ICs and leads.",
    category: "Engineering",
    categorySlug: "software",
  },
  "senior-frontend": {
    name: "Senior Frontend Designer",
    description: "Vibrant two-column experience with data-driven highlights.",
    category: "Design & Engineering",
    categorySlug: "software",
  },
  "senior-backend": {
    name: "Senior Backend Engineer",
    description:
      "Robust backend-focused resume highlighting scalable architecture, reliability, and leadership impact.",
    category: "Engineering",
    categorySlug: "software",
  },
  "premium-universal": {
    name: "Premium Universal",
    description:
      "Elegant and simple ATS-friendly template suitable for all industries and experience levels.",
    category: "Universal",
    categorySlug: "all",
  },
  "premium-pro": {
    name: "Premium Pro",
    description:
      "Modern premium design with side accent panel and sophisticated typography for all professions.",
    category: "Universal",
    categorySlug: "all",
  },
  "fresher-elite": {
    name: "Fresher Elite",
    description:
      "Modern premium design with colored header and timeline layout, perfect for fresh graduates.",
    category: "Early Career",
    categorySlug: "freshers",
  },
  analyst: {
    name: "Professional Analyst",
    description:
      "Clean blue-themed design with photo, ideal for analysts and corporate professionals.",
    category: "Corporate",
    categorySlug: "all",
  },
};

export const categoryLabelMap: Record<string, string> = {
  software: "Software Development",
  freshers: "Freshers & Entry Level",
  accountants: "Accounting & Finance",
  teaching: "Teaching & Education",
  all: "All Professions",
};
