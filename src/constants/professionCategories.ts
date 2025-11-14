import {
  Code,
  Briefcase,
  Palette,
  GraduationCap,
  Star,
  Heart,
  BookOpen,
  DollarSign,
  TrendingUp,
  Scale,
  Settings,
  Sparkles,
} from "lucide-react";

export interface ProfessionCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  templateIds: string[];
  isAll?: boolean; // Special flag for the "All" category
}

export const professionCategories: ProfessionCategory[] = [
  {
    id: "all",
    name: "All Templates",
    description: "Browse all our professionally designed resume templates across all categories",
    icon: Sparkles,
    color: "#6366f1",
    gradientFrom: "#6366f1",
    gradientTo: "#8b5cf6",
    isAll: true,
    templateIds: [
      // Universal Professional Templates
      "professional",
      "minimal",
      "premium-universal",
      "premium-pro",
      "elite",
      "refined",
      "premium-elite",
      "modern-sidebar",
      "minimalist-geometric",
      "bold-headline",
      "dual-tone",
      "contemporary-split",
      // Fresh Graduates Templates
      "graduate",
      "starter",
      "fresher",
      "premium-fresher",
      "fresher-elite",
      "fresher-minimal-grid",
      "fresher-dark-professional",
      "fresher-color-accent",
      "fresher-timeline",
      "fresher-skills-first",
      "fresher-card-based",
      "fresher-two-tone",
      "fresher-centered-elegant",
      "fresher-geometric",
      "fresher-achievement",
      // Software & Technology Templates
      "frontend",
      "backend",
      "fullstack",
      "senior",
      "senior-frontend",
      "senior-backend",
      "software",
      "tech-grid",
      // Creative & Design Templates
      "creative-accent",
      "modern",
      "elegant-serif",
      // Business & Leadership Templates
      "executive",
      "sapphire-executive",
      "luxury-timeline",
      "corporate-executive",
      "analyst",
    ],
  },
  {
    id: "universal-professional",
    name: "Universal Professional",
    description: "Versatile templates suitable for all industries and roles",
    icon: Star,
    color: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
    templateIds: [
      "professional",
      "minimal",
      "premium-universal",
      "premium-pro",
      "elite",
      "refined",
      "premium-elite",
      "modern-sidebar",
      "minimalist-geometric",
      "bold-headline",
      "dual-tone",
      "contemporary-split",
    ],
  },
  {
    id: "fresh-graduates",
    name: "Fresh Graduates & Students",
    description: "Entry-level templates for recent graduates and students",
    icon: GraduationCap,
    color: "#10b981",
    gradientFrom: "#10b981",
    gradientTo: "#059669",
    templateIds: [
      "graduate",
      "starter",
      "fresher",
      "premium-fresher",
      "fresher-elite",
      "fresher-minimal-grid",
      "fresher-dark-professional",
      "fresher-color-accent",
      "fresher-timeline",
      "fresher-skills-first",
      "fresher-card-based",
      "fresher-two-tone",
      "fresher-centered-elegant",
      "fresher-geometric",
      "fresher-achievement",
    ],
  },
  {
    id: "software-technology",
    name: "Software & Technology",
    description: "Resume templates for developers, engineers, and tech professionals",
    icon: Code,
    color: "#3b82f6",
    gradientFrom: "#3b82f6",
    gradientTo: "#2563eb",
    templateIds: [
      "frontend",
      "backend",
      "fullstack",
      "senior",
      "senior-frontend",
      "senior-backend",
      "software",
      "tech-grid",
    ],
  },
  {
    id: "creative-design",
    name: "Creative & Design",
    description: "Modern creative templates for designers and creative professionals",
    icon: Palette,
    color: "#ec4899",
    gradientFrom: "#ec4899",
    gradientTo: "#db2777",
    templateIds: ["creative-accent", "modern", "elegant-serif"],
  },
  {
    id: "business-leadership",
    name: "Business & Leadership",
    description: "Executive and leadership templates for senior professionals",
    icon: Briefcase,
    color: "#8b5cf6",
    gradientFrom: "#8b5cf6",
    gradientTo: "#7c3aed",
    templateIds: [
      "executive",
      "sapphire-executive",
      "luxury-timeline",
      "corporate-executive",
      "analyst",
    ],
  },
  {
    id: "healthcare-medical",
    name: "Healthcare & Medical",
    description: "Professional templates for healthcare and medical professionals",
    icon: Heart,
    color: "#ef4444",
    gradientFrom: "#ef4444",
    gradientTo: "#dc2626",
    templateIds: [],
  },
  {
    id: "education-teaching",
    name: "Education & Teaching",
    description: "Templates designed for educators and academic professionals",
    icon: BookOpen,
    color: "#06b6d4",
    gradientFrom: "#06b6d4",
    gradientTo: "#0891b2",
    templateIds: [],
  },
  {
    id: "finance-accounting",
    name: "Finance & Accounting",
    description: "Professional templates for finance and accounting experts",
    icon: DollarSign,
    color: "#84cc16",
    gradientFrom: "#84cc16",
    gradientTo: "#65a30d",
    templateIds: [],
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing",
    description: "Dynamic templates for sales and marketing professionals",
    icon: TrendingUp,
    color: "#f97316",
    gradientFrom: "#f97316",
    gradientTo: "#ea580c",
    templateIds: [],
  },
  {
    id: "legal-consulting",
    name: "Legal & Consulting",
    description: "Refined templates for legal and consulting professionals",
    icon: Scale,
    color: "#6366f1",
    gradientFrom: "#6366f1",
    gradientTo: "#4f46e5",
    templateIds: [],
  },
  {
    id: "operations-management",
    name: "Operations & Project Management",
    description: "Strategic templates for operations and project managers",
    icon: Settings,
    color: "#14b8a6",
    gradientFrom: "#14b8a6",
    gradientTo: "#0d9488",
    templateIds: [],
  },
];

// Helper function to get category by id
export const getCategoryById = (id: string): ProfessionCategory | undefined => {
  return professionCategories.find((cat) => cat.id === id);
};

// Helper function to get templates for a category
export const getTemplatesForCategory = (categoryId: string): string[] => {
  const category = getCategoryById(categoryId);
  return category?.templateIds || [];
};
