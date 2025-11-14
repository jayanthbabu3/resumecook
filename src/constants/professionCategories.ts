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
}

export const professionCategories: ProfessionCategory[] = [
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
    id: "healthcare-medical",
    name: "Healthcare & Medical",
    description: "Professional templates for healthcare and medical professionals",
    icon: Heart,
    color: "#ef4444",
    gradientFrom: "#ef4444",
    gradientTo: "#dc2626",
    templateIds: [
      // Directing to universal templates for now
      "professional",
      "minimal",
      "premium-universal",
      "elite",
      "refined",
      "premium-elite",
    ],
  },
  {
    id: "education-teaching",
    name: "Education & Teaching",
    description: "Templates designed for educators and academic professionals",
    icon: BookOpen,
    color: "#06b6d4",
    gradientFrom: "#06b6d4",
    gradientTo: "#0891b2",
    templateIds: [
      // Directing to universal templates for now
      "professional",
      "minimal",
      "premium-universal",
      "elite",
      "elegant-serif",
      "refined",
    ],
  },
  {
    id: "finance-accounting",
    name: "Finance & Accounting",
    description: "Professional templates for finance and accounting experts",
    icon: DollarSign,
    color: "#84cc16",
    gradientFrom: "#84cc16",
    gradientTo: "#65a30d",
    templateIds: [
      // Directing to universal templates for now
      "professional",
      "minimal",
      "premium-universal",
      "analyst",
      "corporate-executive",
      "elite",
    ],
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing",
    description: "Dynamic templates for sales and marketing professionals",
    icon: TrendingUp,
    color: "#f97316",
    gradientFrom: "#f97316",
    gradientTo: "#ea580c",
    templateIds: [
      // Directing to universal templates for now
      "modern",
      "bold-headline",
      "creative-accent",
      "premium-pro",
      "contemporary-split",
      "dual-tone",
    ],
  },
  {
    id: "legal-consulting",
    name: "Legal & Consulting",
    description: "Refined templates for legal and consulting professionals",
    icon: Scale,
    color: "#6366f1",
    gradientFrom: "#6366f1",
    gradientTo: "#4f46e5",
    templateIds: [
      // Directing to universal templates for now
      "professional",
      "minimal",
      "refined",
      "elegant-serif",
      "premium-elite",
      "executive",
    ],
  },
  {
    id: "operations-management",
    name: "Operations & Project Management",
    description: "Strategic templates for operations and project managers",
    icon: Settings,
    color: "#14b8a6",
    gradientFrom: "#14b8a6",
    gradientTo: "#0d9488",
    templateIds: [
      // Directing to universal templates for now
      "professional",
      "premium-universal",
      "executive",
      "corporate-executive",
      "modern-sidebar",
      "minimalist-geometric",
    ],
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
