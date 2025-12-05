import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Badge } from "@/components/ui/badge";
import { CustomSectionsWrapper, TemplateSocialLinks, TemplateSummarySection } from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
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

export const BackendTemplate = ({ resumeData, themeColor = "#374151", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const fontFamily = `"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif`;
  const accent = normalizeHex(themeColor) ?? "#374151";
  const accentBorder = withOpacity(accent, "33") ?? "#d1d5db";
  const styleOptions = useStyleOptionsWithDefaults();
  const dividerStyle = styleOptions.getDividerStyle();

  return (
    <div
      className="w-full min-h-[297mm] bg-white"
      style={{ fontFamily, color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}
    >
      {/* Header Section - Minimal with subtle accent */}
      <div
        className="px-12 pt-10 pb-8"
        style={{ borderBottom: `2px solid ${accent}` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[32px] font-bold tracking-tight" style={{ color: '#000000' }}>
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
              <p className="text-[13px] font-semibold" style={{ color: accent }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    placeholder="Professional Title"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>
            </div>
            <ProfilePhoto src={photo} borderClass="border-2" />
          </div>
          
          {/* Contact Info */}
          <div className="mt-4 flex flex-wrap gap-4 text-[13px]" style={{ color: '#1a1a1a' }}>
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
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
          renderHeader={(title) => (
            <h2
              className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
              data-accent-color="true"
              style={{ ...dividerStyle, color: accent }}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Social Links Section */}
        {(resumeData.includeSocialLinks || editable) && (
          <div className="mb-7">
            <h2
              className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
              data-accent-color="true"
              style={{ ...dividerStyle, color: accent }}
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
        {(resumeData.skills && resumeData.skills.length > 0) || editable ? (
          <div className="mb-7">
            <h2
              className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
              data-accent-color="true"
              style={{ ...dividerStyle, color: accent }}
            >
              {styleOptions.formatHeader('Technical Skills')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  themeColor={accent}
                  className="text-[13px]"
                />
              ) : (
                resumeData.skills?.map((skill, index) => (
                  <Badge
                    key={typeof skill === 'string' ? index : skill.id}
                    variant="secondary"
                    style={{ backgroundColor: `${accent}20`, color: accent, fontSize: '13px !important' }}
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </Badge>
                ))
              )}
            </div>
          </div>
        ) : null}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-7">
            <h2
              className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
              data-accent-color="true"
              style={{ ...dividerStyle, color: accent }}
            >
              {styleOptions.formatHeader('Professional Experience')}
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-5 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-[14px] font-semibold" style={{ color: '#000000' }}>
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          placeholder="Position"
                          as="span"
                        />
                      ) : (
                        exp.position
                      )}
                    </h3>
                    <p className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          placeholder="Company"
                          as="span"
                        />
                      ) : (
                        exp.company
                      )}
                    </p>
                  </div>
                  <div className="text-[13px] font-medium" style={{ color: '#6b7280' }}>
                    {editable ? (
                      <>
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          className="inline-block"
                        />
                        <span> - </span>
                        {exp.current ? (
                          <span>Present</span>
                        ) : (
                          <InlineEditableDate
                            path={`experience[${index}].endDate`}
                            value={exp.endDate || ""}
                            className="inline-block"
                          />
                        )}
                      </>
                    ) : (
                      `${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}`
                    )}
                  </div>
                </div>
                <ExperienceBulletPoints
                    experienceId={exp.id}
                    experienceIndex={index}
                    bulletPoints={exp.bulletPoints}
                    description={exp.description}
                    editable={editable}
                    bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
                  />
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        <InlineEducationSection
          items={resumeData.education || []}
          editable={editable}
          accentColor={accent}
          className="mb-7"
          renderHeader={(title) => (
            <h2
              className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
              data-accent-color="true"
              style={{ ...dividerStyle, color: accent }}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Custom Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
          editable={editable}
          accentColor={accent}
          renderSectionHeader={(title, index, { EditableText }) => (
            <h2
              className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
              data-accent-color="true"
              style={{ 
                fontSize: '13px', 
                fontWeight: 600, 
                color: accent,
                textTransform: styleOptions.styleOptions.headerCase === 'uppercase' ? 'uppercase' : 
                             styleOptions.styleOptions.headerCase === 'capitalize' ? 'capitalize' : 
                             styleOptions.styleOptions.headerCase === 'lowercase' ? 'lowercase' : 'uppercase',
                letterSpacing: '0.05em',
                paddingBottom: '8px',
                marginBottom: '12px',
                ...dividerStyle
              }}
            >
              <EditableText 
                className="inherit"
              />
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
