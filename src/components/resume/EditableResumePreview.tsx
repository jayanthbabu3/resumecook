import { type ResumeData } from "@/types/resume";
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
import { CorporateExecutiveTemplate } from "./templates/CorporateExecutiveTemplate";
import { RefinedTemplate } from "./templates/RefinedTemplate";
import { PremiumEliteTemplate } from "./templates/PremiumEliteTemplate";
import { SapphireExecutiveTemplate } from "./templates/SapphireExecutiveTemplate";
import { CreativeAccentTemplate } from "./templates/CreativeAccentTemplate";
import { BoldHeadlineTemplate } from "./templates/BoldHeadlineTemplate";
import { ElegantSerifTemplate } from "./templates/ElegantSerifTemplate";
import { TechGridTemplate } from "./templates/TechGridTemplate";
import { ContemporarySplitTemplate } from "./templates/ContemporarySplitTemplate";
import { LuxuryTimelineTemplate } from "./templates/LuxuryTimelineTemplate";
import { FresherMinimalGridTemplate } from "./templates/FresherMinimalGridTemplate";
import { FresherDarkProfessionalTemplate } from "./templates/FresherDarkProfessionalTemplate";
import { FresherColorAccentTemplate } from "./templates/FresherColorAccentTemplate";
import { FresherTimelineTemplate } from "./templates/FresherTimelineTemplate";
import { FresherSkillsFirstTemplate } from "./templates/FresherSkillsFirstTemplate";
import { FresherCardBasedTemplate } from "./templates/FresherCardBasedTemplate";
import { FresherTwoToneTemplate } from "./templates/FresherTwoToneTemplate";
import { FresherCenteredElegantTemplate } from "./templates/FresherCenteredElegantTemplate";
import { FresherGeometricTemplate } from "./templates/FresherGeometricTemplate";
import { FresherAchievementTemplate } from "./templates/FresherAchievementTemplate";
import { FresherModernTwoColumnTemplate } from "./templates/FresherModernTwoColumnTemplate";
import { FresherProfessionalSidebarTemplate } from "./templates/FresherProfessionalSidebarTemplate";
import { FresherCleanModernTemplate } from "./templates/FresherCleanModernTemplate";
import { FresherTechSplitTemplate } from "./templates/FresherTechSplitTemplate";
import { FresherExecutiveStyleTemplate } from "./templates/FresherExecutiveStyleTemplate";
import { FresherBoldHeaderTemplate } from "./templates/FresherBoldHeaderTemplate";
import { FresherMinimalistTwoColumnTemplate } from "./templates/FresherMinimalistTwoColumnTemplate";
import { FresherCreativeEdgeTemplate } from "./templates/FresherCreativeEdgeTemplate";
import { FresherProfessionalGridTemplate } from "./templates/FresherProfessionalGridTemplate";
import { FresherModernClassicTemplate } from "./templates/FresherModernClassicTemplate";
import { FresherSplitLayoutTemplate } from "./templates/FresherSplitLayoutTemplate";
import { FresherCompactProTemplate } from "./templates/FresherCompactProTemplate";
import { FresherElegantSidebarTemplate } from "./templates/FresherElegantSidebarTemplate";
import { FresherTechModernTemplate } from "./templates/FresherTechModernTemplate";
import { FresherProfessionalMinimalTemplate } from "./templates/FresherProfessionalMinimalTemplate";
import { GradientHeaderUniversalTemplate } from "./templates/GradientHeaderUniversalTemplate";
// Healthcare & Medical Templates
import { MedicalProfessionalTemplate } from "./templates/MedicalProfessionalTemplate";
import { HealthcareTwoColumnTemplate } from "./templates/HealthcareTwoColumnTemplate";
import { NurseSpecialistTemplate } from "./templates/NurseSpecialistTemplate";
import { MedicalExecutiveTemplate } from "./templates/MedicalExecutiveTemplate";
import { ClinicalMinimalTemplate } from "./templates/ClinicalMinimalTemplate";
// Education & Teaching Templates
import { TeacherProfessionalTemplate } from "./templates/TeacherProfessionalTemplate";
import { AcademicEducatorTemplate } from "./templates/AcademicEducatorTemplate";
import { EducatorModernTemplate } from "./templates/EducatorModernTemplate";
import { TeachingCertifiedTemplate } from "./templates/TeachingCertifiedTemplate";
import { StudentEducatorTemplate } from "./templates/StudentEducatorTemplate";
// Finance & Accounting Templates
import { CPAProfessionalTemplate } from "./templates/CPAProfessionalTemplate";
import { FinanceAnalystTemplate } from "./templates/FinanceAnalystTemplate";
import { AccountingExecutiveTemplate } from "./templates/AccountingExecutiveTemplate";
import { AuditorTemplate } from "./templates/AuditorTemplate";
import { FinanceTwoColumnTemplate } from "./templates/FinanceTwoColumnTemplate";
// Sales & Marketing Templates
import { SalesExecutiveTemplate } from "./templates/SalesExecutiveTemplate";
import { MarketingProfessionalTemplate } from "./templates/MarketingProfessionalTemplate";
import { SalesMarketingHybridTemplate } from "./templates/SalesMarketingHybridTemplate";
import { DigitalMarketerTemplate } from "./templates/DigitalMarketerTemplate";
import { SalesManagerTemplate } from "./templates/SalesManagerTemplate";
// Legal & Consulting Templates
import { AttorneyProfessionalTemplate } from "./templates/AttorneyProfessionalTemplate";
import { LegalCounselTemplate } from "./templates/LegalCounselTemplate";
import { ConsultantTemplate } from "./templates/ConsultantTemplate";
import { LegalExecutiveTemplate } from "./templates/LegalExecutiveTemplate";
import { ParalegalTemplate } from "./templates/ParalegalTemplate";
// Operations & Project Management Templates
import { ProjectManagerPMPTemplate } from "./templates/ProjectManagerPMPTemplate";
import { OperationsManagerTemplate } from "./templates/OperationsManagerTemplate";
import { PMExecutiveTemplate } from "./templates/PMExecutiveTemplate";
import { AgileScrumTemplate } from "./templates/AgileScrumTemplate";
import { OperationsTwoColumnTemplate } from "./templates/OperationsTwoColumnTemplate";
// New Software Development Templates
import { JavaDeveloperTemplate } from "./templates/JavaDeveloperTemplate";
import { DotNetDeveloperTemplate } from "./templates/DotNetDeveloperTemplate";
import { DevOpsEngineerTemplate } from "./templates/DevOpsEngineerTemplate";
import { CloudArchitectTemplate } from "./templates/CloudArchitectTemplate";
import { MobileDeveloperTemplate } from "./templates/MobileDeveloperTemplate";
import { ReactNativeDeveloperTemplate } from "./templates/ReactNativeDeveloperTemplate";
import { DataEngineerTemplate } from "./templates/DataEngineerTemplate";
import { MachineLearningEngineerTemplate } from "./templates/MachineLearningEngineerTemplate";
import { QAAutomationEngineerTemplate } from "./templates/QAAutomationEngineerTemplate";
import { SecurityEngineerTemplate } from "./templates/SecurityEngineerTemplate";
import { PythonDeveloperTemplate } from "./templates/PythonDeveloperTemplate";
import { NodeJSDeveloperTemplate } from "./templates/NodeJSDeveloperTemplate";
import { ReactDeveloperTemplate } from "./templates/ReactDeveloperTemplate";
import { GoDeveloperTemplate } from "./templates/GoDeveloperTemplate";
import { KuberneteEngineerTemplate } from "./templates/KuberneteEngineerTemplate";
// Senior/Lead Software Engineering Templates
import { SeniorJavaDeveloperTemplate } from "./templates/SeniorJavaDeveloperTemplate";
import { SeniorDotNetDeveloperTemplate } from "./templates/SeniorDotNetDeveloperTemplate";
import { SeniorDevOpsEngineerTemplate } from "./templates/SeniorDevOpsEngineerTemplate";
import { LeadBackendEngineerTemplate } from "./templates/LeadBackendEngineerTemplate";
import { LeadFrontendEngineerTemplate } from "./templates/LeadFrontendEngineerTemplate";
import { SeniorFullStackDeveloperTemplate } from "./templates/SeniorFullStackDeveloperTemplate";
import { PrincipalSoftwareEngineerTemplate } from "./templates/PrincipalSoftwareEngineerTemplate";
import { StaffEngineerTemplate } from "./templates/StaffEngineerTemplate";
import { EngineeringManagerTemplate } from "./templates/EngineeringManagerTemplate";
import { SolutionsArchitectTemplate } from "./templates/SolutionsArchitectTemplate";
import { SeniorMobileEngineerTemplate } from "./templates/SeniorMobileEngineerTemplate";
import { PlatformEngineerTemplate } from "./templates/PlatformEngineerTemplate";
import { SiteReliabilityEngineerTemplate } from "./templates/SiteReliabilityEngineerTemplate";
import { BackendAPISpecialistTemplate } from "./templates/BackendAPISpecialistTemplate";
import { FrontendArchitectTemplate } from "./templates/FrontendArchitectTemplate";
// New Universal Professional Templates
import { CorporateBlueTemplate } from "./templates/CorporateBlueTemplate";
import { MinimalistProTemplate } from "./templates/MinimalistProTemplate";
import { BusinessModernTemplate } from "./templates/BusinessModernTemplate";
import { ProfessionalTimelineTemplate } from "./templates/ProfessionalTimelineTemplate";
import { CleanCorporateTemplate } from "./templates/CleanCorporateTemplate";
import { ModernProfessionalTemplate } from "./templates/ModernProfessionalTemplate";
import { ElegantProfessionalTemplate } from "./templates/ElegantProfessionalTemplate";
import { ProfessionalGridTemplate } from "./templates/ProfessionalGridTemplate";
import { BusinessEliteTemplate } from "./templates/BusinessEliteTemplate";
import { CorporateCleanTemplate } from "./templates/CorporateCleanTemplate";
import { ProfessionalClassicTemplate } from "./templates/ProfessionalClassicTemplate";
import { ModernBusinessTemplate } from "./templates/ModernBusinessTemplate";
import { ExecutiveMinimalTemplate } from "./templates/ExecutiveMinimalTemplate";
import { SidebarAccentTemplate } from "./templates/SidebarAccentTemplate";
import { TwoToneClassicTemplate } from "./templates/TwoToneClassicTemplate";
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
    "corporate-executive": CorporateExecutiveTemplate,
    refined: RefinedTemplate,
    "premium-elite": PremiumEliteTemplate,
    "sapphire-executive": SapphireExecutiveTemplate,
    "creative-accent": CreativeAccentTemplate,
    "bold-headline": BoldHeadlineTemplate,
    "elegant-serif": ElegantSerifTemplate,
    "tech-grid": TechGridTemplate,
    "contemporary-split": ContemporarySplitTemplate,
    "luxury-timeline": LuxuryTimelineTemplate,
    "fresher-minimal-grid": FresherMinimalGridTemplate,
    "fresher-dark-professional": FresherDarkProfessionalTemplate,
    "fresher-color-accent": FresherColorAccentTemplate,
    "fresher-timeline": FresherTimelineTemplate,
    "fresher-skills-first": FresherSkillsFirstTemplate,
    "fresher-card-based": FresherCardBasedTemplate,
    "fresher-two-tone": FresherTwoToneTemplate,
    "fresher-centered-elegant": FresherCenteredElegantTemplate,
    "fresher-geometric": FresherGeometricTemplate,
    "fresher-achievement": FresherAchievementTemplate,
    "fresher-modern-two-column": FresherModernTwoColumnTemplate,
    "fresher-professional-sidebar": FresherProfessionalSidebarTemplate,
    "fresher-clean-modern": FresherCleanModernTemplate,
    "fresher-tech-split": FresherTechSplitTemplate,
    "fresher-executive-style": FresherExecutiveStyleTemplate,
    "fresher-bold-header": FresherBoldHeaderTemplate,
    "fresher-minimalist-two-column": FresherMinimalistTwoColumnTemplate,
    "fresher-creative-edge": FresherCreativeEdgeTemplate,
    "fresher-professional-grid": FresherProfessionalGridTemplate,
    "fresher-modern-classic": FresherModernClassicTemplate,
    "fresher-split-layout": FresherSplitLayoutTemplate,
    "fresher-compact-pro": FresherCompactProTemplate,
    "fresher-elegant-sidebar": FresherElegantSidebarTemplate,
    "fresher-tech-modern": FresherTechModernTemplate,
    "fresher-professional-minimal": FresherProfessionalMinimalTemplate,
    // Healthcare & Medical
    "medical-professional": MedicalProfessionalTemplate,
    "healthcare-two-column": HealthcareTwoColumnTemplate,
    "nurse-specialist": NurseSpecialistTemplate,
    "medical-executive": MedicalExecutiveTemplate,
    "clinical-minimal": ClinicalMinimalTemplate,
    // Education & Teaching
    "teacher-professional": TeacherProfessionalTemplate,
    "academic-scholar": AcademicEducatorTemplate,
    "educator-modern": EducatorModernTemplate,
    "teaching-certified": TeachingCertifiedTemplate,
    "student-educator": StudentEducatorTemplate,
    // Finance & Accounting
    "cpa-professional": CPAProfessionalTemplate,
    "finance-analyst": FinanceAnalystTemplate,
    "accounting-executive": AccountingExecutiveTemplate,
    "auditor": AuditorTemplate,
    "finance-two-column": FinanceTwoColumnTemplate,
    // Sales & Marketing
    "sales-executive": SalesExecutiveTemplate,
    "marketing-professional": MarketingProfessionalTemplate,
    "sales-marketing-hybrid": SalesMarketingHybridTemplate,
    "digital-marketer": DigitalMarketerTemplate,
    "sales-manager": SalesManagerTemplate,
    // Legal & Consulting
    "attorney-professional": AttorneyProfessionalTemplate,
    "legal-counsel": LegalCounselTemplate,
    "consultant": ConsultantTemplate,
    "legal-executive": LegalExecutiveTemplate,
    "paralegal": ParalegalTemplate,
    // Operations & Project Management
    "project-manager-pmp": ProjectManagerPMPTemplate,
    "operations-manager": OperationsManagerTemplate,
    "pm-executive": PMExecutiveTemplate,
    "agile-scrum": AgileScrumTemplate,
    "operations-two-column": OperationsTwoColumnTemplate,
    // New Software Development Templates
    "java-developer": JavaDeveloperTemplate,
    "dotnet-developer": DotNetDeveloperTemplate,
    "devops-engineer": DevOpsEngineerTemplate,
    "cloud-architect": CloudArchitectTemplate,
    "mobile-developer": MobileDeveloperTemplate,
    "react-native-developer": ReactNativeDeveloperTemplate,
    "data-engineer": DataEngineerTemplate,
    "machine-learning-engineer": MachineLearningEngineerTemplate,
    "qa-automation-engineer": QAAutomationEngineerTemplate,
    "security-engineer": SecurityEngineerTemplate,
    "python-developer": PythonDeveloperTemplate,
    "nodejs-developer": NodeJSDeveloperTemplate,
    "react-developer": ReactDeveloperTemplate,
    "go-developer": GoDeveloperTemplate,
    "kubernetes-engineer": KuberneteEngineerTemplate,
    // Senior/Lead Software Engineering Templates
    "senior-java-developer": SeniorJavaDeveloperTemplate,
    "senior-dotnet-developer": SeniorDotNetDeveloperTemplate,
    "senior-devops-engineer": SeniorDevOpsEngineerTemplate,
    "lead-backend-engineer": LeadBackendEngineerTemplate,
    "lead-frontend-engineer": LeadFrontendEngineerTemplate,
    "senior-fullstack-developer": SeniorFullStackDeveloperTemplate,
    "principal-software-engineer": PrincipalSoftwareEngineerTemplate,
    "staff-engineer": StaffEngineerTemplate,
    "engineering-manager": EngineeringManagerTemplate,
    "solutions-architect": SolutionsArchitectTemplate,
    "senior-mobile-engineer": SeniorMobileEngineerTemplate,
    "platform-engineer": PlatformEngineerTemplate,
    "site-reliability-engineer": SiteReliabilityEngineerTemplate,
    "backend-api-specialist": BackendAPISpecialistTemplate,
    "frontend-architect": FrontendArchitectTemplate,
    // New Universal Professional Templates
    "corporate-blue": CorporateBlueTemplate,
    "minimalist-pro": MinimalistProTemplate,
    "business-modern": BusinessModernTemplate,
    "professional-timeline": ProfessionalTimelineTemplate,
    "clean-corporate": CleanCorporateTemplate,
    "modern-professional": ModernProfessionalTemplate,
    "elegant-professional": ElegantProfessionalTemplate,
    "professional-grid": ProfessionalGridTemplate,
    "business-elite": BusinessEliteTemplate,
    "corporate-clean": CorporateCleanTemplate,
    "professional-classic": ProfessionalClassicTemplate,
    "modern-business": ModernBusinessTemplate,
    "executive-minimal": ExecutiveMinimalTemplate,
    "sidebar-accent": SidebarAccentTemplate,
    "two-tone-classic": TwoToneClassicTemplate,
    "gradient-header-universal": GradientHeaderUniversalTemplate,
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
        <div 
          className="mx-auto rounded-lg bg-white shadow-2xl"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            maxWidth: '100%',
          }}
        >
          <Template resumeData={resumeData} themeColor={themeColor} />
        </div>
      </div>
    </div>
  );
};
