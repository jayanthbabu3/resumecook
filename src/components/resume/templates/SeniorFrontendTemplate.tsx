import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills, SkillsDisplay } from "@/components/resume/InlineEditableSkills";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { CustomSectionsWrapper, TemplateSocialLinks, TemplateSummarySection } from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const formatDate = (date: string) => {
  if (!date) {
    return "";
  }
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

const splitLines = (text?: string | null) =>
  text
    ? text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

export const SeniorFrontendTemplate = ({
  resumeData,
  themeColor = "#2563eb",
  editable = false,
}: TemplateProps) => {
  const accent = themeColor;
  const styleOptions = useStyleOptionsWithDefaults();
  const dividerStyle = styleOptions.getDividerStyle();
  const contactDetails = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((detail): detail is string => Boolean(detail));

  const additionalSections = resumeData.sections?.filter(
    (section) => section.title && section.content,
  );

  const skillNames = resumeData.skills
    .map((skill) => skill.name?.trim())
    .filter((name): name is string => Boolean(name));

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-900 font-sans" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-10">
        <header className="space-y-3 pb-5" style={{ borderBottom: `0.5px solid ${accent}` }}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-[30px] font-semibold tracking-tight block"
                  style={{ color: '#000000' }}
                  as="h1"
                />
              ) : (
                <h1 className="text-[30px] font-semibold tracking-tight" style={{ color: '#000000' }}>
                  {resumeData.personalInfo.fullName}
                </h1>
              )}
              {resumeData.personalInfo.title && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-[13px] font-medium block"
                    style={{ color: accent }}
                    as="p"
                  />
                ) : (
                  <p className="text-[13px] font-medium" style={{ color: accent }}>
                    {resumeData.personalInfo.title}
                  </p>
                )
              )}
            </div>
            {contactDetails.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                {editable ? (
                  <>
                    {resumeData.personalInfo.email && (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email}
                        className="inline-block"
                      />
                    )}
                    {resumeData.personalInfo.phone && (
                      <>
                        {resumeData.personalInfo.email && <span className="text-slate-300">|</span>}
                        <InlineEditableText
                          path="personalInfo.phone"
                          value={resumeData.personalInfo.phone}
                          className="inline-block"
                        />
                      </>
                    )}
                    {resumeData.personalInfo.location && (
                      <>
                        {(resumeData.personalInfo.email || resumeData.personalInfo.phone) && <span className="text-slate-300">|</span>}
                        <InlineEditableText
                          path="personalInfo.location"
                          value={resumeData.personalInfo.location}
                          className="inline-block"
                        />
                      </>
                    )}
                  </>
                ) : (
                  contactDetails.map((detail, idx) => (
                    <span key={`${detail}-${idx}`} className="flex items-center gap-2">
                      <span>{detail}</span>
                      {idx < contactDetails.length - 1 && <span className="text-slate-300">|</span>}
                    </span>
                  ))
                )}
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        <TemplateSummarySection
          resumeData={resumeData}
          editable={editable}
          themeColor={accent}
          title="Summary"
          renderHeader={(title) => (
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              data-accent-color="true"
              style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Social Links Section */}
        {(resumeData.includeSocialLinks || editable) && (
          <section className="space-y-2">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              data-accent-color="true"
              style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
            >
              {styleOptions.formatHeader('Connect With Me')}
            </h2>
            <TemplateSocialLinks
              resumeData={resumeData}
              editable={editable}
              themeColor={accent}
              showLabels={false}
            />
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="space-y-4">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              data-accent-color="true"
              style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
            >
              {styleOptions.formatHeader('Professional Experience')}
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="text-[13px] font-semibold" style={{ color: '#000000' }}>
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Role"}
                        placeholder="Position"
                        as="span"
                      />
                    ) : (
                      exp.position || "Role"
                    )}
                  </div>
                  <div className="text-[13px] font-medium" style={{ color: '#6b7280' }}>
                    {editable ? (
                      <>
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          className="inline-block"
                        />
                        <span> — </span>
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
                      `${formatDate(exp.startDate)} — ${exp.current ? "Present" : formatDate(exp.endDate)}`
                    )}
                  </div>
                </div>
                {exp.company && (
                  <div className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        placeholder="Company"
                        as="div"
                      />
                    ) : (
                      exp.company
                    )}
                  </div>
                )}
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
          </section>
        )}

        {/* Skills Section */}
        {(skillNames.length > 0) || editable ? (
          <section className="space-y-2">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              data-accent-color="true"
              style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
            >
              {styleOptions.formatHeader('Skills')}
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills || []}
                variant="tag"
                themeColor={accent}
                fontSize="13px"
              />
            ) : (
              <SkillsDisplay
                skills={resumeData.skills || []}
                variant="tag"
                themeColor={accent}
                fontSize="13px"
              />
            )}
          </section>
        ) : null}

        {/* Custom Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
          editable={editable}
          accentColor={accent}
          renderSectionHeader={(title, index, { EditableText }) => (
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              data-accent-color="true"
              style={{ 
                borderBottom: `0.5px solid ${accent}`,
                color: accent,
                marginBottom: '8px'
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
          sectionStyle={{ marginBottom: '24px' }}
        />

        {/* Education Section */}
        {(resumeData.education.length > 0) || editable ? (
          <section className="space-y-3">
            <InlineEducationSection
              items={resumeData.education || []}
              editable={editable}
              accentColor={accent}
              className="space-y-3"
              renderHeader={(title) => (
                <h2
                  className="text-[13px] font-semibold uppercase tracking-wide"
                  data-accent-color="true"
                  style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
                >
                  {styleOptions.formatHeader(title)}
                </h2>
              )}
            />
          </section>
        ) : null}
      </div>
    </div>
  );
};
