import { type ResumeData } from "@/pages/Editor";
import { EditableField } from "./EditableField";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { FrontendTemplate } from "./templates/FrontendTemplate";
import { FullstackTemplate } from "./templates/FullstackTemplate";
import { BackendTemplate } from "./templates/BackendTemplate";
import { GraduateTemplate } from "./templates/GraduateTemplate";
import { StarterTemplate } from "./templates/StarterTemplate";
import { FresherTemplate } from "./templates/FresherTemplate";
import { PremiumFresherTemplate } from "./templates/PremiumFresherTemplate";
import { SeniorTemplate } from "./templates/SeniorTemplate";
import { SeniorFrontendTemplate } from "./templates/SeniorFrontendTemplate";
import { SeniorBackendTemplate } from "./templates/SeniorBackendTemplate";
import { SoftwareTemplate } from "./templates/SoftwareTemplate";
import { PremiumUniversalTemplate } from "./templates/PremiumUniversalTemplate";
import { PremiumProTemplate } from "./templates/PremiumProTemplate";
import { FresherEliteTemplate } from "./templates/FresherEliteTemplate";
import { AnalystTemplate } from "./templates/AnalystTemplate";
import { EliteTemplate } from "./templates/EliteTemplate";
import { CorporateExecutiveTemplate } from "./templates/CorporateExecutiveTemplate";
import { RefinedTemplate } from "./templates/RefinedTemplate";
import { PremiumEliteTemplate } from "./templates/PremiumEliteTemplate";
import { SapphireExecutiveTemplate } from "./templates/SapphireExecutiveTemplate";
import { CreativeAccentTemplate } from "./templates/CreativeAccentTemplate";
import { ModernSidebarTemplate } from "./templates/ModernSidebarTemplate";
import { MinimalistGeometricTemplate } from "./templates/MinimalistGeometricTemplate";
import { BoldHeadlineTemplate } from "./templates/BoldHeadlineTemplate";
import { DualToneTemplate } from "./templates/DualToneTemplate";
import { ElegantSerifTemplate } from "./templates/ElegantSerifTemplate";
import { TechGridTemplate } from "./templates/TechGridTemplate";
import { ContemporarySplitTemplate } from "./templates/ContemporarySplitTemplate";
import { LuxuryTimelineTemplate } from "./templates/LuxuryTimelineTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EditableResumePreviewProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  templateId: string;
  themeColor?: string;
}

export const EditableResumePreview = ({
  resumeData,
  setResumeData,
  templateId,
  themeColor = "#7c3aed",
}: EditableResumePreviewProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], name: value };
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const updateSection = (index: number, field: string, value: string) => {
    const newSections = [...resumeData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setResumeData({ ...resumeData, sections: newSections });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now().toString(),
          company: "Company Name",
          position: "Position",
          startDate: "2024-01",
          endDate: "",
          current: true,
          description: "Job description here",
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now().toString(),
          school: "School Name",
          degree: "Degree",
          field: "Field of Study",
          startDate: "2020-09",
          endDate: "2024-05",
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: Date.now().toString(),
          name: "New Skill",
        },
      ],
    });
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  const addSection = () => {
    setResumeData({
      ...resumeData,
      sections: [
        ...resumeData.sections,
        {
          id: Date.now().toString(),
          title: "New Section",
          content: "Section content here",
        },
      ],
    });
  };

  const removeSection = (index: number) => {
    setResumeData({
      ...resumeData,
      sections: resumeData.sections.filter((_, i) => i !== index),
    });
  };

  const templates = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate,
    frontend: FrontendTemplate,
    fullstack: FullstackTemplate,
    backend: BackendTemplate,
    graduate: GraduateTemplate,
    starter: StarterTemplate,
    fresher: FresherTemplate,
    "premium-fresher": PremiumFresherTemplate,
    senior: SeniorTemplate,
    "senior-frontend": SeniorFrontendTemplate,
    "senior-backend": SeniorBackendTemplate,
    software: SoftwareTemplate,
    "premium-universal": PremiumUniversalTemplate,
    "premium-pro": PremiumProTemplate,
    "fresher-elite": FresherEliteTemplate,
    analyst: AnalystTemplate,
    elite: EliteTemplate,
    "corporate-executive": CorporateExecutiveTemplate,
    refined: RefinedTemplate,
    "premium-elite": PremiumEliteTemplate,
    "sapphire-executive": SapphireExecutiveTemplate,
    "creative-accent": CreativeAccentTemplate,
    "modern-sidebar": ModernSidebarTemplate,
    "minimalist-geometric": MinimalistGeometricTemplate,
    "bold-headline": BoldHeadlineTemplate,
    "dual-tone": DualToneTemplate,
    "elegant-serif": ElegantSerifTemplate,
    "tech-grid": TechGridTemplate,
    "contemporary-split": ContemporarySplitTemplate,
    "luxury-timeline": LuxuryTimelineTemplate,
  };

  const Template =
    templates[templateId as keyof typeof templates] || ProfessionalTemplate;

  return (
    <div className="grid h-full grid-cols-12 gap-6 p-6">
      {/* Editing Panel */}
      <div className="col-span-4 space-y-6 overflow-auto rounded-lg border bg-card p-6">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={resumeData.personalInfo.title}
                onChange={(e) => updatePersonalInfo("title", e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
              />
            </div>
            <div>
              <Label>Summary</Label>
              <Textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Experience</h2>
            <Button size="sm" onClick={addExperience}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="space-y-3 rounded-lg border p-4">
                <div className="flex justify-between">
                  <Label className="text-xs">Experience {index + 1}</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(index, "startDate", e.target.value)
                    }
                  />
                  <Input
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(index, "endDate", e.target.value)
                    }
                    disabled={exp.current}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) =>
                      updateExperience(index, "current", e.target.checked)
                    }
                  />
                  Currently working here
                </label>
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Education</h2>
            <Button size="sm" onClick={addEducation}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="space-y-3 rounded-lg border p-4">
                <div className="flex justify-between">
                  <Label className="text-xs">Education {index + 1}</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) =>
                    updateEducation(index, "school", e.target.value)
                  }
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                />
                <Input
                  placeholder="Field"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(index, "startDate", e.target.value)
                    }
                  />
                  <Input
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(index, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Skills</h2>
            <Button size="sm" onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {resumeData.skills.map((skill, index) => (
              <div key={skill.id} className="flex items-center gap-2">
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(index, e.target.value)}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Additional Sections</h2>
            <Button size="sm" onClick={addSection}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-6">
            {resumeData.sections.map((section, index) => (
              <div key={section.id} className="space-y-3 rounded-lg border p-4">
                <div className="flex justify-between">
                  <Label className="text-xs">Section {index + 1}</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSection(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  placeholder="Section Title"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(index, "title", e.target.value)
                  }
                />
                <Textarea
                  placeholder="Section Content"
                  value={section.content}
                  onChange={(e) =>
                    updateSection(index, "content", e.target.value)
                  }
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="col-span-8 overflow-auto rounded-lg bg-gray-100 p-6">
        <div className="mx-auto w-full max-w-[210mm] rounded-lg bg-white shadow-2xl">
          <Template resumeData={resumeData} themeColor={themeColor} />
        </div>
      </div>
    </div>
  );
};
