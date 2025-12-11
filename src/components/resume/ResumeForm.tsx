import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Plus, Star, StarOff, Trash2, Briefcase, GraduationCap, Code, FileText, Sparkles, Camera, Search, Tag, Share2, Trophy, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { SkillRating } from "./SkillRating";
import { cn } from "@/lib/utils";
import type { AchievementItem, StrengthItem } from "@/types/resume";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import type { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  templateId?: string;
}

// Only premium-pro template supports skill ratings
const TEMPLATES_WITH_SKILL_RATINGS = ['premium-pro'];

export const ResumeForm = ({ resumeData, setResumeData, templateId }: ResumeFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const experienceContainerRef = useRef<HTMLDivElement>(null);
  const educationContainerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const customContainerRef = useRef<HTMLDivElement>(null);
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [includeSocialLinks, setIncludeSocialLinks] = useState(resumeData.includeSocialLinks || false);
  // Only show skill ratings for templates that support them
  const supportsSkillRatings = templateId ? TEMPLATES_WITH_SKILL_RATINGS.includes(templateId) : false;
  const [showSkillRatings, setShowSkillRatings] = useState(
    supportsSkillRatings && Array.isArray(resumeData.skills) && resumeData.skills.some(skill => skill.rating && skill.rating.trim() !== "")
  );

  // Update resumeData when includeSocialLinks changes
  useEffect(() => {
    setResumeData({
      ...resumeData,
      includeSocialLinks,
    });
  }, [includeSocialLinks]);

  useEffect(() => {
    const currentPhoto = resumeData.personalInfo.photo || "";
    if (!currentPhoto || currentPhoto.startsWith("data")) {
      setPhotoUrlInput("");
    } else {
      setPhotoUrlInput(currentPhoto);
    }
  }, [resumeData.personalInfo.photo]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        updatePersonalInfo("photo", result);
        setPhotoUrlInput("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = () => {
    updatePersonalInfo("photo", "");
    setPhotoUrlInput("");
  };

  const applyPhotoUrl = () => {
    const trimmed = photoUrlInput.trim();
    if (trimmed) {
      updatePersonalInfo("photo", trimmed);
    } else {
      handlePhotoRemove();
    }
  };

  useEffect(() => {
    if (experienceContainerRef.current) {
      const lastExperienceElement = experienceContainerRef.current.lastElementChild;
      if (lastExperienceElement) {
        lastExperienceElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [resumeData.experience.length]);

  useEffect(() => {
    if (educationContainerRef.current) {
      const lastEducationElement = educationContainerRef.current.lastElementChild;
      if (lastEducationElement) {
        lastEducationElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [resumeData.education.length]);

  useEffect(() => {
    if (skillsContainerRef.current) {
      const lastSkillElement = skillsContainerRef.current.lastElementChild;
      if (lastSkillElement) {
        lastSkillElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [resumeData.skills.length]);

  const blockedCustomTitles = new Set(['my life philosophy']);
  const filteredCustomSections = (resumeData.sections || []).filter(
    (section) => !blockedCustomTitles.has((section.title || '').toLowerCase())
  );

  useEffect(() => {
    if (customContainerRef.current) {
      const lastCustomElement = customContainerRef.current.lastElementChild;
      if (lastCustomElement) {
        lastCustomElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [filteredCustomSections.length]);

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          current: false,
          bulletPoints: []
        }
      ]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addBulletPoint = (expId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === expId 
          ? { ...exp, bulletPoints: [...(exp.bulletPoints || []), ""] }
          : exp
      ),
    });
  };

  const updateBulletPoint = (expId: string, index: number, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === expId 
          ? { 
              ...exp, 
              bulletPoints: exp.bulletPoints.map((bullet, i) => 
                i === index ? value : bullet
              )
            }
          : exp
      ),
    });
  };

  const removeBulletPoint = (expId: string, index: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === expId 
          ? { 
              ...exp, 
              bulletPoints: exp.bulletPoints.filter((_, i) => i !== index)
            }
          : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: ""
        }
      ]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: "",
          rating: showSkillRatings ? "" : undefined,
          category: "core",
        },
      ],
    });
  };

  const handleAddSkill = () => {
    const skillName = skillInput.trim();
    if (skillName && !resumeData.skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      setResumeData({
        ...resumeData,
        skills: [
          ...resumeData.skills,
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: skillName,
            rating: showSkillRatings ? "" : undefined,
            category: "core",
          },
        ],
      });
      setSkillInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const skillSuggestions = [
    // Frontend
    { name: "React", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Angular", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "SASS", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    
    // Backend
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Java", category: "Backend" },
    { name: "C#", category: "Backend" },
    { name: "PHP", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Spring Boot", category: "Backend" },
    { name: "Laravel", category: "Backend" },
    { name: "Ruby on Rails", category: "Backend" },
    
    // Database
    { name: "SQL", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Database" },
    { name: "Firebase", category: "Database" },
    
    // Tools & Others
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "AWS", category: "Tools" },
    { name: "Kubernetes", category: "Tools" },
    { name: "Jenkins", category: "Tools" },
    { name: "Figma", category: "Tools" },
    { name: "Agile", category: "Methodology" },
    { name: "Scrum", category: "Methodology" },
    { name: "Communication", category: "Soft Skills" },
    { name: "Leadership", category: "Soft Skills" },
    { name: "Problem Solving", category: "Soft Skills" },
  ];

  const filteredSuggestions = skillSuggestions.filter(skill => 
    skill.name.toLowerCase().includes(skillInput.toLowerCase()) &&
    !resumeData.skills.some(existingSkill => existingSkill.name.toLowerCase() === skill.name.toLowerCase())
  );

  const handleSuggestionClick = (skillName: string) => {
    setSkillInput(skillName);
    setShowSuggestions(false);
    setTimeout(() => handleAddSkill(), 100);
  };

  const updateSkillName = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], name: value };
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const updateSkillLevel = (index: number, rating: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], rating: rating.trim() };
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const toggleSkillRatings = () => {
    const newShowRatings = !showSkillRatings;
    setShowSkillRatings(newShowRatings);
    
    // Update existing skills to add or remove ratings
    const updatedSkills = resumeData.skills.map(skill => ({
      ...skill,
      rating: newShowRatings ? (skill.rating || "") : undefined,
    }));
    
    setResumeData({ ...resumeData, skills: updatedSkills });
  };


  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  // Achievement management
  const addAchievement = () => {
    setResumeData({
      ...resumeData,
      achievements: [
        ...(resumeData.achievements || []),
        {
          id: Date.now().toString(),
          title: "",
          description: ""
        }
      ]
    });
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      achievements: (resumeData.achievements || []).map(ach =>
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    });
  };

  const removeAchievement = (id: string) => {
    setResumeData({
      ...resumeData,
      achievements: (resumeData.achievements || []).filter(ach => ach.id !== id)
    });
  };

  // Strength management
  const addStrength = () => {
    setResumeData({
      ...resumeData,
      strengths: [
        ...(resumeData.strengths || []),
        {
          id: Date.now().toString(),
          title: "",
          description: ""
        }
      ]
    });
  };

  const updateStrength = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      strengths: (resumeData.strengths || []).map(str =>
        str.id === id ? { ...str, [field]: value } : str
      )
    });
  };

  const removeStrength = (id: string) => {
    setResumeData({
      ...resumeData,
      strengths: (resumeData.strengths || []).filter(str => str.id !== id)
    });
  };

  const addCustomSection = () => {
    setResumeData({
      ...resumeData,
      sections: [
        ...resumeData.sections,
        {
          id: Date.now().toString(),
          title: "New Section",
          content: "",
          items: [""] // Start with one empty item
        }
      ]
    });
  };

  const updateCustomSection = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    });
  };

  const removeCustomSection = (id: string) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.filter(section => section.id !== id)
    });
  };

  // Custom section item management (bullet points)
  const addCustomSectionItem = (sectionId: string) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.map(section => {
        if (section.id !== sectionId) return section;
        
        // Get current items - migrate from content if needed
        const currentItems = section.items && section.items.length > 0
          ? section.items
          : section.content
            ? section.content.split('\n').filter(line => line.trim())
            : [];
        
        return {
          ...section,
          items: [...currentItems, ""],
          content: "" // Clear content since we're now using items
        };
      })
    });
  };

  const updateCustomSectionItem = (sectionId: string, itemIndex: number, value: string) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.map(section => {
        if (section.id !== sectionId) return section;
        
        // Get current items - migrate from content if needed
        const currentItems = section.items && section.items.length > 0
          ? section.items
          : section.content
            ? section.content.split('\n').filter(line => line.trim())
            : [""];
        
        return {
          ...section,
          items: currentItems.map((item, idx) => idx === itemIndex ? value : item),
          content: "" // Clear content since we're now using items
        };
      })
    });
  };

  const removeCustomSectionItem = (sectionId: string, itemIndex: number) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.map(section => {
        if (section.id !== sectionId) return section;
        
        // Get current items - migrate from content if needed
        const currentItems = section.items && section.items.length > 0
          ? section.items
          : section.content
            ? section.content.split('\n').filter(line => line.trim())
            : [""];
        
        return {
          ...section,
          items: currentItems.filter((_, idx) => idx !== itemIndex),
          content: "" // Clear content since we're now using items
        };
      })
    });
  };


  const formatCountLabel = (
    count: number,
    singular: string,
    plural?: string,
    zeroLabel = "No entries"
  ) => {
    if (count === 0) return zeroLabel;
    if (count === 1) return `1 ${singular}`;
    return `${count} ${plural ?? `${singular}s`}`;
  };

  const toTitleCase = (value: string) =>
    value.replace(/\b\w/g, (char) => char.toUpperCase());

  const experienceSummary = toTitleCase(
    formatCountLabel(resumeData.experience.length, "role", "roles", "No roles yet")
  );
  const educationSummary = toTitleCase(
    formatCountLabel(resumeData.education.length, "degree", "degrees", "No education yet")
  );
  const skillsSummary = toTitleCase(
    formatCountLabel(resumeData.skills.length, "skill", "skills", "Add skills")
  );
  const achievementsSummary = toTitleCase(
    formatCountLabel((resumeData.achievements || []).length, "achievement", "achievements", "No achievements")
  );
  const strengthsSummary = toTitleCase(
    formatCountLabel((resumeData.strengths || []).length, "strength", "strengths", "No strengths")
  );
  const customSummary = toTitleCase(
    formatCountLabel(filteredCustomSections.length, "section", "sections", "No custom sections")
  );

  return (
    <Accordion type="multiple" defaultValue={["personal", "photo"]} className="space-y-4">
      <AccordionItem
        value="personal"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <FileText className="h-4 w-4" />
            </span>
            Personal Information
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              Basics
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-3">
              <CardDescription>Your basic contact details and professional title</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={resumeData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo("title", e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                  placeholder="Brief overview of your professional background and key achievements..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="social-links"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <Share2 className="h-4 w-4" />
            </span>
            Social Links
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {includeSocialLinks ? "Included" : "Hidden"}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-4">
              <CardDescription>Add your professional social media and portfolio links</CardDescription>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-social-links"
                  checked={includeSocialLinks}
                  onCheckedChange={(checked) => setIncludeSocialLinks(checked as boolean)}
                />
                <Label htmlFor="include-social-links" className="text-sm font-medium">
                  Include Social Links section in resume
                </Label>
              </div>
            </CardHeader>
            {includeSocialLinks && (
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={resumeData.personalInfo.linkedin || ""}
                      onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio/Website</Label>
                    <Input
                      id="portfolio"
                      type="url"
                      value={resumeData.personalInfo.portfolio || ""}
                      onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
                      placeholder="https://johndoe-portfolio.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    type="url"
                      value={resumeData.personalInfo.github || ""}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    placeholder="https://github.com/johndoe"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="photo"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <Camera className="h-4 w-4" />
            </span>
            Profile Photo
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {resumeData.personalInfo.photo ? "Photo Added" : "No Photo"}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-4 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm">Add a professional photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Compact Photo Preview */}
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/20 relative">
                  {resumeData.personalInfo.photo ? (
                    <>
                      <img
                        src={resumeData.personalInfo.photo}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={handlePhotoRemove}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="text-2xl text-muted-foreground mb-1">📷</div>
                      <div className="text-xs text-muted-foreground">No photo</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Compact Upload Options */}
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-8">
                  <TabsTrigger value="upload" className="text-xs">Upload File</TabsTrigger>
                  <TabsTrigger value="url" className="text-xs">From URL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-2 mt-3">
                  <div className="text-center">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2 h-8 text-xs"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Choose File
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="url" className="space-y-2 mt-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Image URL..."
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && photoUrlInput.trim()) {
                          applyPhotoUrl();
                        }
                      }}
                      className="h-8 text-xs"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant={photoUrlInput.trim() ? "default" : "outline"}
                      onClick={applyPhotoUrl}
                      disabled={!photoUrlInput.trim()}
                      className="h-8 text-xs px-3"
                    >
                      Add
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <p className="text-xs text-muted-foreground text-center">
                Square images work best • Stored locally
              </p>
              
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    handlePhotoUpload(file);
                  }
                  if (event.target) {
                    event.target.value = "";
                  }
                }}
              />
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="experience"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <Briefcase className="h-4 w-4" />
            </span>
            Professional Experience
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {experienceSummary}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Your professional work history</CardDescription>
                <Button onClick={addExperience} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6" ref={experienceContainerRef}>
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="space-y-4 pb-6 mb-6 border-b border-border/40 last:border-0 last:pb-0 last:mb-0 relative">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-blue-500">Experience #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                      <Input
                        id={`start-date-${exp.id}`}
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                      <Input
                        id={`end-date-${exp.id}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        disabled={exp.current}
                        className="cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => updateExperience(exp.id, "current", checked as boolean)}
                    />
                    <label
                      htmlFor={`current-${exp.id}`}
                      className="text-sm font-medium leading-none"
                    >
                      I currently work here
                    </label>
                  </div>
                  <div className="space-y-3 pt-2">
                    <Label className="text-sm font-semibold text-foreground/80">Key Achievements</Label>
                    
                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      {(exp.bulletPoints || []).map((bullet, index) => (
                        <div key={index} className="group flex items-start gap-2">
                          <div className="pt-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                          </div>
                          <div className="relative flex-1">
                            <Textarea
                              value={bullet}
                              onChange={(e) => updateBulletPoint(exp.id, index, e.target.value)}
                              placeholder="Describe an achievement..."
                              className="min-h-[2.5rem] max-h-[6rem] py-2 pr-8 text-sm resize-none bg-background focus:ring-1 transition-all overflow-hidden"
                              rows={1}
                              ref={(el) => {
                                if (el) {
                                  el.style.height = "auto";
                                  el.style.height = `${el.scrollHeight}px`;
                                  if (el.scrollHeight > 96) {
                                    el.style.overflowY = "auto";
                                  } else {
                                    el.style.overflowY = "hidden";
                                  }
                                }
                              }}
                              onInput={(e) => {
                                const target = e.currentTarget;
                                target.style.height = "auto";
                                target.style.height = `${target.scrollHeight}px`;
                                if (target.scrollHeight > 96) {
                                  target.style.overflowY = "auto";
                                } else {
                                  target.style.overflowY = "hidden";
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeBulletPoint(exp.id, index);
                              }}
                              className="absolute right-1 top-1 h-6 w-6 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all rounded-full"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div onClick={(e) => e.stopPropagation()}>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addBulletPoint(exp.id, e);
                          }}
                        className="h-8 px-2 text-xs font-medium text-primary hover:bg-primary/10"
                      >
                        <Plus className="mr-1.5 h-3 w-3" />
                        Add Achievement
                      </Button>
                      </div>
                    </div>
                    
                    <div className="text-[11px] text-muted-foreground/70 pl-1">
                      <p>Tip: Use action verbs (Led, Developed) and metrics.</p>
                    </div>
                  </div>
                </div>
              ))}
              {resumeData.experience.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No experience added yet. Click "Add Experience" to get started.
                </p>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="education"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <GraduationCap className="h-4 w-4" />
            </span>
            Education
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {educationSummary}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Your academic background</CardDescription>
                <Button onClick={addEducation} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4" ref={educationContainerRef}>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="space-y-3 p-3 border border-border rounded-md relative">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-blue-500 text-sm">Education #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">School/University</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                        placeholder="University Name"
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="Bachelor's, Master's, etc."
                        className="h-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                      placeholder="Computer Science, Business, etc."
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Grade/Percentage (Optional)</Label>
                    <Input
                      value={edu.gpa || ""}
                      onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                      placeholder="3.8, 85%, First Class, etc."
                      className="h-9"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`edu-start-date-${edu.id}`} className="text-xs">Start Date</Label>
                      <Input
                        id={`edu-start-date-${edu.id}`}
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                        className="h-9 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`edu-end-date-${edu.id}`} className="text-xs">End Date</Label>
                      <Input
                        id={`edu-end-date-${edu.id}`}
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                        className="h-9 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {resumeData.education.length === 0 && (
                <p className="text-center text-muted-foreground py-6 text-sm">
                  No education added yet. Click "Add Education" to get started.
                </p>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="skills"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <Code className="h-4 w-4" />
            </span>
            Skills
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {skillsSummary}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-3">
              <CardDescription>Add your technical skills and competencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" ref={skillsContainerRef}>
              {/* Advanced Skill Input */}
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={skillInput}
                    onChange={(e) => {
                      setSkillInput(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setShowSuggestions(skillInput.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Search and add skills..."
                    className="pl-10 pr-12 h-11"
                  />
                  <Button
                    onClick={handleAddSkill}
                    disabled={!skillInput.trim()}
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 px-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Smart Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <div className="text-xs text-muted-foreground mb-2 px-2">
                        Suggestions ({filteredSuggestions.length})
                      </div>
                      <div className="space-y-1">
                        {filteredSuggestions.slice(0, 8).map((skill) => (
                          <button
                            key={skill.name}
                            onClick={() => handleSuggestionClick(skill.name)}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <Tag className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {skill.category}
                              </span>
                            </div>
                            <Plus className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills Tags Grid */}
              {resumeData.skills.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-medium text-foreground">
                        Added Skills ({resumeData.skills.length})
                      </h4>
                      {supportsSkillRatings && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleSkillRatings}
                          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                        >
                          {showSkillRatings ? (
                            <>
                              <StarOff className="h-3 w-3 mr-1" />
                              Hide Ratings
                            </>
                          ) : (
                            <>
                              <Star className="h-3 w-3 mr-1" />
                              Add Ratings
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setResumeData({ ...resumeData, skills: [] });
                      }}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Clear All
                    </Button>
                  </div>
                  {showSkillRatings ? (
                    // Vertical layout with ratings
                    <div className="space-y-2">
                      {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-center gap-3 group">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm font-medium text-gray-900 min-w-0 flex-1">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-1">
                            <Input
                                type="text"
                              value={skill.rating || ""}
                                onChange={(e) => {
                                  // Allow numbers, decimals, and "/10" format
                                  const value = e.target.value;
                                  // Allow empty, numbers, decimals, and "/10" suffix
                                  if (value === "" || /^(\d+(?:\.\d+)?)(\/10)?$/.test(value) || /^\d*$/.test(value)) {
                                    updateSkillLevel(index, value);
                                  }
                                }}
                                placeholder="1-10"
                                className="h-7 text-xs w-20 border-gray-300 text-center"
                                title="Enter a number from 1-10 (e.g., 9 or 9/10)"
                            />
                              <span className="text-xs text-muted-foreground">/10</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(index)}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground mt-2 px-1">
                        💡 Tip: Enter a number from 1-10 (e.g., "9" or "9/10") to show skill level with progress bars
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Horizontal layout without ratings */}
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <div
                          key={skill.id}
                          className="group inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                        >
                          <span className="truncate max-w-[120px]">{skill.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(index)}
                            className="h-4 w-4 p-0 hover:bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                      {supportsSkillRatings && (
                        <p className="text-xs text-muted-foreground mt-2 px-1">
                          💡 Tip: Click "Add Ratings" above to add skill levels (1-10) with progress bars
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Empty State */}
              {resumeData.skills.length === 0 && (
                <div className="space-y-6">
                  {/* Quick Add Section */}
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Tag className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        No skills added yet
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start by typing above or choose from popular skills below
                      </p>
                    </div>
                  </div>
                  
                  {/* Popular Skills by Category */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground text-center">
                      Popular Skills
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Frontend", skills: ["React", "JavaScript", "CSS", "HTML"], color: "bg-blue-50 border-blue-200 text-blue-700" },
                        { name: "Backend", skills: ["Node.js", "Python", "SQL", "Java"], color: "bg-green-50 border-green-200 text-green-700" },
                        { name: "Tools", skills: ["Git", "Docker", "AWS", "VS Code"], color: "bg-purple-50 border-purple-200 text-purple-700" },
                        { name: "Soft Skills", skills: ["Leadership", "Communication", "Problem Solving"], color: "bg-orange-50 border-orange-200 text-orange-700" },
                      ].map((category) => (
                        <div key={category.name} className="space-y-2">
                          <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {category.name}
                          </h5>
                          <div className="space-y-1">
                            {category.skills.map((skill) => (
                              <button
                                key={skill}
                                onClick={() => {
                                  setSkillInput(skill);
                                  setTimeout(() => handleAddSkill(), 100);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md border text-xs font-medium hover:shadow-sm transition-all duration-200 ${category.color}`}
                              >
                                + {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tips */}
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <h5 className="text-sm font-medium text-foreground">💡 Tips</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Type in the search box above to find specific skills</li>
                      <li>• Press Enter or click the + button to add skills quickly</li>
                      <li>• Add 5-15 relevant skills to showcase your expertise</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Achievements Section */}
      <AccordionItem
        value="achievements"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <Trophy className="h-4 w-4" />
            </span>
            Achievements
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {achievementsSummary}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Highlight your key accomplishments</CardDescription>
                <Button onClick={addAchievement} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(resumeData.achievements || []).map((ach, index) => (
                <div key={ach.id} className="space-y-3 p-3 border border-border rounded-md relative">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-amber-600 text-sm">Achievement #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(ach.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={ach.title}
                      onChange={(e) => updateAchievement(ach.id, "title", e.target.value)}
                      placeholder="e.g., Client Retention Rate"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={ach.description}
                      onChange={(e) => updateAchievement(ach.id, "description", e.target.value)}
                      placeholder="Describe the achievement and its impact..."
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              {(resumeData.achievements || []).length === 0 && (
                <p className="text-center text-muted-foreground py-6 text-sm">
                  No achievements added yet. Click "Add Achievement" to get started.
                </p>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Strengths Section */}
      <AccordionItem
        value="strengths"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <Target className="h-4 w-4" />
            </span>
            Strengths
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {strengthsSummary}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Showcase your core competencies</CardDescription>
                <Button onClick={addStrength} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Strength
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(resumeData.strengths || []).map((str, index) => (
                <div key={str.id} className="space-y-3 p-3 border border-border rounded-md relative">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-cyan-600 text-sm">Strength #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStrength(str.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={str.title}
                      onChange={(e) => updateStrength(str.id, "title", e.target.value)}
                      placeholder="e.g., Strategic Planning"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={str.description}
                      onChange={(e) => updateStrength(str.id, "description", e.target.value)}
                      placeholder="Describe how you apply this strength..."
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              {(resumeData.strengths || []).length === 0 && (
                <p className="text-center text-muted-foreground py-6 text-sm">
                  No strengths added yet. Click "Add Strength" to get started.
                </p>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="custom"
        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
          <span className="flex items-center gap-3 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
            </span>
            Custom Sections
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {customSummary}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardDescription>Add additional sections like certifications, projects, etc.</CardDescription>
                <Button onClick={addCustomSection} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6" ref={customContainerRef}>
              {filteredCustomSections.map((section) => (
                <div key={section.id} className="space-y-4 p-4 border border-border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeCustomSection(section.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={section.title}
                      onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
                      placeholder="e.g., Certifications, Projects, Awards"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Items</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        className="h-6 gap-1 text-xs text-primary hover:text-primary"
                        onClick={() => addCustomSectionItem(section.id)}
                      >
                        <Plus className="h-3 w-3" />
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {/* Use items if available, otherwise parse content by newlines for backward compatibility */}
                      {(section.items && section.items.length > 0 
                        ? section.items 
                        : section.content 
                          ? section.content.split('\n').filter(line => line.trim()) 
                          : [""]
                      ).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-2">
                          <span className="mt-2.5 text-muted-foreground">•</span>
                          <Input
                            value={item}
                            onChange={(e) => updateCustomSectionItem(section.id, itemIndex, e.target.value)}
                            placeholder="Enter item..."
                            className="flex-1"
                          />
                          {/* Show delete button if there's more than 1 item */}
                          {((section.items && section.items.length > 0 
                            ? section.items 
                            : section.content 
                              ? section.content.split('\n').filter(line => line.trim()) 
                              : [""]
                          ).length > 1) && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
                              onClick={() => removeCustomSectionItem(section.id, itemIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {resumeData.sections.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No custom sections yet. Click "Add Section" to create one.
                </p>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};