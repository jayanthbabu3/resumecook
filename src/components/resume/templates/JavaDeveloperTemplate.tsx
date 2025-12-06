import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { CustomSectionsWrapper, TemplateSocialLinks, TemplateSummarySection } from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const JavaDeveloperTemplate = ({ resumeData, themeColor = "#f89820", editable = false }: TemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#f89820";
  const accentLight = withOpacity(accent, "15");
  const accentBorder = withOpacity(accent, "30");
  
  // Get section border style from style options
  const sectionHeaderStyle = { color: accent, ...styleOptions.getSectionBorder(accent) };

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif]" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      {/* Header Section - Bold with Java-inspired accent */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accent} 0%, ${withOpacity(accent, "80")} 100%)`
          }}
        />
        <div className="relative px-12 pt-10 pb-8 border-b-4" style={{ borderColor: accent }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-[36px] font-bold tracking-tight mb-2" style={{ color: '#000000' }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={resumeData.personalInfo.fullName}
                      placeholder="Your Name"
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.fullName
                  )}
                </h1>
                <p className="text-[15px] font-semibold mb-4" style={{ color: accent }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      placeholder="Senior Java Developer"
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.title
                  )}
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                  {(resumeData.personalInfo.email || editable) && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                      {editable ? (
                        <InlineEditableText
                          path="personalInfo.email"
                          value={resumeData.personalInfo.email || ""}
                          placeholder="email@example.com"
                          as="span"
                        />
                      ) : (
                        <span>{resumeData.personalInfo.email}</span>
                      )}
                    </div>
                  )}
                  {(resumeData.personalInfo.phone || editable) && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
                      {editable ? (
                        <InlineEditableText
                          path="personalInfo.phone"
                          value={resumeData.personalInfo.phone || ""}
                          placeholder="+1 (555) 000-0000"
                          as="span"
                        />
                      ) : (
                        <span>{resumeData.personalInfo.phone}</span>
                      )}
                    </div>
                  )}
                  {(resumeData.personalInfo.location || editable) && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                      {editable ? (
                        <InlineEditableText
                          path="personalInfo.location"
                          value={resumeData.personalInfo.location || ""}
                          placeholder="City, State"
                          as="span"
                        />
                      ) : (
                        <span>{resumeData.personalInfo.location}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <ProfilePhoto src={photo} sizeClass="h-24 w-24" borderClass="border-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-8">
        {/* Professional Summary */}
        <TemplateSummarySection
          resumeData={resumeData}
          editable={editable}
          themeColor={accent}
          title="Professional Summary"
          className="mb-8"
          renderHeader={(title) => (
            <h2
              className="text-[13px] font-semibold mb-4 pb-2"
              data-accent-color="true"
              style={sectionHeaderStyle}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Social Links Section */}
        {(resumeData.includeSocialLinks || editable) && (
          <div className="mb-8">
            <h2
              className="text-[13px] font-semibold mb-4 pb-2"
              data-accent-color="true"
              style={sectionHeaderStyle}
            >
              {styleOptions.formatHeader('Connect With Me')}
            </h2>
            <TemplateSocialLinks
              resumeData={resumeData}
              editable={editable}
              themeColor={accent}
              showLabels={false}
            />
          </div>
        )}

        {/* Technical Skills */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-8">
            <h2
              className="text-[13px] font-semibold mb-4 pb-2"
              data-accent-color="true"
              style={sectionHeaderStyle}
            >
              {styleOptions.formatHeader('Technical Skills')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  renderSkill={(skill) => (
                    <span
                      className="px-4 py-1.5 text-xs font-medium rounded-md"
                      style={{
                        backgroundColor: accentLight,
                        color: accent,
                        border: `1px solid ${accentBorder}`
                      }}
                    >
                      {skill.name}
                    </span>
                  )}
                />
              ) : (
                resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-xs font-medium rounded-md"
                    style={{
                      backgroundColor: accentLight,
                      color: accent,
                      border: `1px solid ${accentBorder}`
                    }}
                  >
                    {skill.name}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {((resumeData.experience && resumeData.experience.length > 0) || editable) && (
          <div className="mb-8">
            <h2
              className="text-[13px] font-semibold mb-4 pb-2"
              data-accent-color="true"
              style={sectionHeaderStyle}
            >
              {styleOptions.formatHeader('Professional Experience')}
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Senior Java Developer",
                  company: "Tech Company",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "Developed microservices using Spring Boot\nImplemented RESTful APIs and database optimization",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-6 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[13px] font-semibold" style={{ color: '#000000' }}>
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Job Title"
                            as="span"
                          />
                        </h3>
                        <p className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[13px] font-medium whitespace-nowrap ml-4" style={{ color: '#6b7280' }}>
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                        <span> - </span>
                        {exp.current ? (
                          <span>Present</span>
                        ) : (
                          <InlineEditableDate
                            path={`experience[${index}].endDate`}
                            value={exp.endDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                        )}
                      </div>
                    </div>
                    <ExperienceBulletPoints
                      experienceId={exp.id}
                      experienceIndex={index}
                      bulletPoints={exp.bulletPoints}
                      description={exp.description}
                      editable={editable}
                      accentColor={accent}
                      bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
                    />
                  </div>
                )}
                addButtonLabel="Add Experience"
              />
            ) : (
              resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[13px] font-semibold" style={{ color: '#000000' }}>{exp.position}</h3>
                      <p className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>{exp.company}</p>
                    </div>
                      <div className="text-[13px] font-medium whitespace-nowrap ml-4" style={{ color: '#6b7280' }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <ExperienceBulletPoints
                      experienceId={exp.id}
                      experienceIndex={index}
                      bulletPoints={exp.bulletPoints}
                      description={exp.description}
                      editable={false}
                      accentColor={accent}
                      bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
                    />
                </div>
              ))
            )}
          </div>
        )}

        {/* Education */}
        {(resumeData.education.length > 0) || editable ? (
          <div className="mb-8">
            <InlineEducationSection
              items={resumeData.education || []}
              editable={editable}
              accentColor={accent}
              variant="standard"
              className="space-y-3"
              renderHeader={(title) => (
                <h2
                  className="text-[13px] font-semibold mb-4 pb-2"
                  data-accent-color="true"
                  style={sectionHeaderStyle}
                >
                  {styleOptions.formatHeader(title)}
                </h2>
              )}
            />
          </div>
        ) : null}

        {/* Custom Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
          editable={editable}
          accentColor={accent}
          renderSectionHeader={(title, index, { EditableText }) => (
            <h2
              className="text-[13px] font-semibold mb-4 pb-2"
              data-accent-color="true"
              style={sectionHeaderStyle}
            >
              <EditableText className="inherit" />
            </h2>
          )}
          itemStyle={{ 
            fontSize: '13px', 
            color: '#1a1a1a', 
            lineHeight: '1.7' 
          }}
          sectionStyle={{ marginBottom: '28px' }}
        />
      </div>
    </div>
  );
};
