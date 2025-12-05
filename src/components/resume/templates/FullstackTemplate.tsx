import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Code2, Database, Server } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { CustomSectionsWrapper, TemplateSocialLinks, TemplateSummarySection, TemplateSkillsSection } from "@/components/resume/shared";
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

export const FullstackTemplate = ({ resumeData, themeColor = "#7c3aed", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#7c3aed";
  const accentBorder = withOpacity(accent, "33") ?? "#e5e7eb";
  const accentSoft = withOpacity(accent, "18") ?? "#f5f3ff";
  const styleOptions = useStyleOptionsWithDefaults();
  const dividerStyle = styleOptions.getDividerStyle();

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans flex" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      {/* Left Sidebar */}
      <div className="w-[35%] bg-gray-50 p-8" style={{ borderRight: `1px solid ${accentBorder}` }}>
        <div className="mb-6 flex justify-center">
          <ProfilePhoto src={photo} borderClass="border-4 border-white" />
        </div>
        {/* Header */}
        <div className="mb-8 pb-4" style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[24px] font-bold mb-1.5 leading-tight block"
              style={{ color: '#000000' }}
              as="h1"
            />
          ) : (
            <h1 className="text-[24px] font-bold mb-1.5 leading-tight" style={{ color: '#000000' }}>
              {resumeData.personalInfo.fullName}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title}
              className="text-[13px] font-semibold block"
              style={{ color: accent }}
              as="p"
            />
          ) : (
            <p className="text-[13px] font-semibold" style={{ color: accent }}>
              {resumeData.personalInfo.title}
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-8 pb-6" style={{ borderBottom: `0.5px solid ${accent}` }}>
          <h2 
            className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
            data-accent-color="true"
            style={{ color: accent }}
          >
            {styleOptions.formatHeader('Contact')}
          </h2>
          <div className="space-y-2 text-[13px]" style={{ color: '#1a1a1a' }}>
            {resumeData.personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="break-all inline-block"
                  />
                ) : (
                  <span className="break-all">{resumeData.personalInfo.email}</span>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="inline-block"
                  />
                ) : (
                  <span>{resumeData.personalInfo.phone}</span>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="inline-block"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Technical Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8 pb-6" style={{ borderBottom: `0.5px solid ${accent}` }}>
            <h2 
              className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Skills')}
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div
                    className="text-[13px] font-medium py-1.5 px-2.5 rounded"
                    style={{
                      backgroundColor: accentSoft,
                      borderLeft: `2px solid ${accent}`,
                      color: '#1a1a1a'
                    }}
                  >
                    {skill.name}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-1.5">
                {resumeData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="text-[13px] font-medium py-1.5 px-2.5 rounded"
                    style={{
                      backgroundColor: accentSoft,
                      borderLeft: `2px solid ${accent}`,
                      color: '#1a1a1a'
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {(resumeData.education && resumeData.education.length > 0) || editable ? (
          <div>
            <InlineEducationSection
              items={resumeData.education || []}
              editable={editable}
              accentColor={accent}
              className="mb-8"
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
          </div>
        ) : null}
      </div>

      {/* Right Main Content */}
      <div className="w-[65%] p-8">
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
                <div className="flex justify-between items-start mb-1 gap-4">
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
                ...dividerStyle,
                color: accent,
                marginBottom: '12px'
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
