import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "../InlineEditableText";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { 
  ExperienceSection, 
  CustomSectionsWrapper,
  TemplateSocialLinks,
  TemplateContactInfo,
  TemplateSkillsSection,
  TemplateSummarySection,
  normalizeHex,
  withOpacity,
  formatDate,
} from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FrontendTemplate = ({ resumeData, themeColor = "#7c3aed", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#7c3aed";
  const accentBorder = withOpacity(accent, "33") ?? "#e5e7eb";
  const accentSoft = withOpacity(accent, "18") ?? "#f5f3ff";
  const styleOptions = useStyleOptionsWithDefaults();
  const dividerStyle = styleOptions.getDividerStyle();

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      {/* Header Section - Minimal with accent color */}
      <div className="px-12 pt-10 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[32px] font-bold tracking-tight" style={{ color: '#000000' }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName}
                    placeholder="Full Name"
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
                    placeholder="Job Title"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>
            </div>
            <ProfilePhoto src={photo} borderClass="border-4 border-white" />
          </div>
          
          {/* Contact Info */}
          <TemplateContactInfo
            resumeData={resumeData}
            editable={editable}
            themeColor={accent}
            className="mt-4"
          />
        </div>
      </div>

      <div
        className="max-w-4xl mx-auto px-12 py-6"
        style={{ borderTop: `1px solid ${withOpacity(accent, "22") ?? "#e5e7eb"}` }}
      >
        {/* Professional Summary */}
        <TemplateSummarySection
          resumeData={resumeData}
          editable={editable}
          themeColor={accent}
          title="About Me"
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

        {/* Skills Section */}
        <TemplateSkillsSection
          resumeData={resumeData}
          editable={editable}
          themeColor={accent}
          title="Technical Skills"
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

        {/* Experience Section */}
        <ExperienceSection
          experience={resumeData.experience || []}
          editable={editable}
          accentColor={accent}
          title="Professional Experience"
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
          renderItem={(exp, index, { EditableText, EditableDate, BulletPoints, isEditable }) => (
            <div
              key={exp.id}
              className="mb-5 last:mb-0 pl-4 border-l-2"
              style={{ borderColor: accentBorder }}
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-[14px] font-semibold" style={{ color: '#000000' }}>
                    <EditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      placeholder="Position"
                      as="span"
                    />
                  </h3>
                  <p className="text-[12.5px] font-medium" style={{ color: '#1a1a1a' }}>
                    <EditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      placeholder="Company"
                      as="span"
                    />
                  </p>
                </div>
                <div className="text-[11px] font-medium flex items-center gap-1" style={{ color: '#6b7280' }}>
                  <EditableDate
                    path={`experience[${index}].startDate`}
                    value={exp.startDate}
                    className="inline-block"
                  />
                  <span> - </span>
                  {exp.current ? (
                    <span>Present</span>
                  ) : (
                    <EditableDate
                      path={`experience[${index}].endDate`}
                      value={exp.endDate || ""}
                      className="inline-block"
                    />
                  )}
                </div>
              </div>
              {/* Bullet Points */}
              <BulletPoints
                expId={exp.id}
                bullets={exp.bulletPoints}
                bulletStyle={{ 
                  fontSize: '12.5px', 
                  color: '#1a1a1a', 
                  lineHeight: '1.7' 
                }}
              />
              {/* Description fallback if no bullet points */}
              {(!exp.bulletPoints || exp.bulletPoints.length === 0) && exp.description && !isEditable && (
                <p className="text-[12.5px] leading-[1.7] whitespace-pre-wrap" style={{ color: '#1a1a1a' }}>
                  {exp.description}
                </p>
              )}
            </div>
          )}
        />

        {/* Education Section */}
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
          renderItem={(edu, index, isEditable) => (
            <div key={edu.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[13px] font-semibold" style={{ color: '#000000' }}>
                    {isEditable ? (
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        placeholder="Degree"
                        as="span"
                      />
                    ) : (
                      edu.degree
                    )}
                  </h3>
                  {(edu.field || isEditable) && (
                    <p className="text-[12px]" style={{ color: '#1a1a1a' }}>
                      {isEditable ? (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field || ""}
                          placeholder="Field of Study"
                          as="span"
                        />
                      ) : (
                        edu.field
                      )}
                    </p>
                  )}
                  <p className="text-[12.5px]" style={{ color: '#1a1a1a' }}>
                    {isEditable ? (
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        placeholder="School Name"
                        as="span"
                      />
                    ) : (
                      edu.school
                    )}
                  </p>
                  {(edu.gpa || isEditable) && (
                    <p className="text-[12px]" style={{ color: '#1a1a1a' }}>
                      {isEditable ? (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={edu.gpa || ""}
                          placeholder="Grade/Percentage"
                          as="span"
                        />
                      ) : (
                        edu.gpa
                      )}
                    </p>
                  )}
                </div>
                <div className="text-[11px] font-medium" style={{ color: '#6b7280' }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            </div>
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
            fontSize: '12.5px', 
            color: '#1a1a1a', 
            lineHeight: '1.7' 
          }}
          sectionStyle={{ marginBottom: '28px' }}
        />
      </div>
    </div>
  );
};
