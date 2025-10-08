import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Plus, Trash2, Briefcase, GraduationCap, Code, FileText, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { ResumeData } from "@/pages/Editor";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrlInput, setPhotoUrlInput] = useState("");

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
          current: false
        }
      ]
    });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
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
          endDate: ""
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

  const addSkill = (category: "core" | "toolbox") => {
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: "",
          level: 7,
          category,
        },
      ],
    });
  };

  const updateSkillName = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], name: value };
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const updateSkillLevel = (index: number, value: number) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], level: value };
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
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
          content: ""
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
  const customSummary = toTitleCase(
    formatCountLabel(resumeData.sections.length, "section", "sections", "No custom sections")
  );

  return (
    <Accordion type="multiple" defaultValue={["personal"]} className="space-y-4">
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
            <CardHeader className="pb-4">
              <CardDescription>Your basic contact details and professional title</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-24 w-24 rounded-full border border-dashed border-muted flex items-center justify-center overflow-hidden bg-muted/40 text-sm text-muted-foreground">
                    {resumeData.personalInfo.photo ? (
                      <img
                        src={resumeData.personalInfo.photo}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>No photo</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload Photo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={applyPhotoUrl}
                        disabled={!photoUrlInput.trim()}
                      >
                        Use Image URL
                      </Button>
                      {resumeData.personalInfo.photo && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handlePhotoRemove}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Paste image URL (https://...)"
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Square images work best. Uploaded photos are stored locally in your browser.
                    </p>
                  </div>
                </div>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                  placeholder="Brief overview of your professional background and key achievements..."
                  rows={4}
                />
              </div>
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
            Work Experience
          </span>
          <span className="ml-auto flex items-center">
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
              {experienceSummary}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-6 pt-0">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardDescription>Your professional work history</CardDescription>
                <Button onClick={addExperience} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="space-y-4 p-4 border border-border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
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
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        disabled={exp.current}
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
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                    />
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
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardDescription>Your academic background</CardDescription>
                <Button onClick={addEducation} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="space-y-4 p-4 border border-border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>School/University</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                      placeholder="Computer Science, Business, etc."
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {resumeData.education.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
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
            <CardHeader className="pb-4 space-y-3">
              <CardDescription>Your technical competencies are shown in two blocks on the resume: core skills display with proficiency bars and toolbox skills appear as labeled chips. Add as many as you like in either section.</CardDescription>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => addSkill("core")} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Core Skill
                </Button>
                <Button onClick={() => addSkill("toolbox")} size="xs" className="gap-1.5">
                  <Plus className="h-3 w-3" />
                  Add Toolbox Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {(["core", "toolbox"] as const).map((category) => {
                const filtered = resumeData.skills.filter((skill) => skill.category === category);
                if (!filtered.length) return null;

                return (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {category === "core" ? "Core Skills" : "Toolbox Skills"}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {filtered.map((skill, idx) => {
                        const showRating = category === "core";
                        const rowClasses = showRating
                          ? "grid grid-cols-1 sm:grid-cols-[minmax(0,240px)_120px_auto] gap-2 sm:gap-3 items-start"
                          : "grid grid-cols-1 sm:grid-cols-[minmax(0,260px)_auto] gap-2 sm:gap-3 items-start";

                        return (
                          <div
                            key={skill.id}
                            className={rowClasses}
                          >
                            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                              <Label className="text-xs" htmlFor={`skill-name-${skill.id}`}>
                                {`Skill ${idx + 1}`}
                              </Label>
                              <Input
                                id={`skill-name-${skill.id}`}
                                value={skill.name}
                                onChange={(e) => updateSkillName(resumeData.skills.indexOf(skill), e.target.value)}
                                placeholder="e.g., React, Communication"
                                className="h-9 text-sm"
                              />
                            </div>
                            {showRating && (
                              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                <Label className="text-xs" htmlFor={`skill-level-${skill.id}`}>
                                  Rating (1-10)
                                </Label>
                                <Input
                                  id={`skill-level-${skill.id}`}
                                  type="number"
                                  min={1}
                                  max={10}
                                  value={skill.level ?? 7}
                                  onChange={(e) =>
                                    updateSkillLevel(
                                      resumeData.skills.indexOf(skill),
                                      Math.min(10, Math.max(1, Number(e.target.value) || 1))
                                    )
                                  }
                                  className="h-9 text-sm"
                                />
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(resumeData.skills.indexOf(skill))}
                              className={showRating ? "self-end sm:self-center" : "self-end sm:self-end"}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {resumeData.skills.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No skills added yet. Click "Add Core Skill" to get started.
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
            <CardContent className="space-y-6">
              {resumeData.sections.map((section) => (
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
                    <Label>Content</Label>
                    <Textarea
                      value={section.content}
                      onChange={(e) => updateCustomSection(section.id, "content", e.target.value)}
                      placeholder="Describe the details for this section..."
                      rows={4}
                    />
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
