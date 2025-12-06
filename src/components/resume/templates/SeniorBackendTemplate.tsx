import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
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

const formatDate = (value?: string) => {
  if (!value) {
    return "";
  }
  const parsed = new Date(value);
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

export const SeniorBackendTemplate = ({
  resumeData,
  themeColor = "#0f766e",
  editable = false,
}: TemplateProps) => {
  const accent = themeColor;
  const styleOptions = useStyleOptionsWithDefaults();
  const sectionBorder = styleOptions.getSectionBorder(accent);
  const contact = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((item): item is string => Boolean(item));

  const sections = resumeData.sections ?? [];
  const achievementsSection = sections.find((section) =>
    section.title?.toLowerCase().includes("achievement"),
  );
  const achievementItems = splitLines(achievementsSection?.content);
  const otherSections = sections.filter(
    (section) => section !== achievementsSection && section.title && section.content,
  );

  const competencies = resumeData.skills
    .map((skill) => skill.name?.trim())
    .filter((name): name is string => Boolean(name));

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-8 py-10">
        <header className="space-y-3 pb-5" style={{ ...sectionBorder }}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
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
            {contact.length > 0 && (
              <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
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
                  contact.map((detail, index) => (
                    <span key={`${detail}-${index}`} className="flex items-center gap-2">
                      <span>{detail}</span>
                      {index < contact.length - 1 && <span className="text-slate-300">|</span>}
                    </span>
                  ))
                )}
              </div>
            )}
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-[35%,65%]">
          <aside className="space-y-4 pr-4">
            {/* Professional Summary */}
            <TemplateSummarySection
              resumeData={resumeData}
              editable={editable}
              themeColor={accent}
              title="Summary"
              className="mb-3"
              renderHeader={(title) => (
                <h2
                  className="text-[13px] font-semibold uppercase"
                  data-accent-color="true"
                  style={{ color: accent, ...sectionBorder }}
                >
                  {styleOptions.formatHeader(title)}
                </h2>
              )}
            />

            {/* Social Links Section */}
            {(resumeData.includeSocialLinks || editable) && (
              <section className="mb-3">
                <h2
                  className="text-[13px] font-semibold uppercase"
                  data-accent-color="true"
                  style={{ color: accent, ...sectionBorder }}
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

            {/* Skills Section */}
            {(competencies.length > 0) || editable ? (
              <section className="space-y-2">
                <h2
                  className="text-[13px] font-semibold uppercase"
                  data-accent-color="true"
                  style={{ color: accent, ...sectionBorder }}
                >
                  {styleOptions.formatHeader('Skills')}
                </h2>
                {editable ? (
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills}
                    renderSkill={(skill, index) => (
                      <span className="rounded-full border px-3 py-1 text-[11px] font-medium" style={{ borderColor: accent, color: '#1a1a1a' }}>
                        {skill.name}
                      </span>
                    )}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {competencies.slice(0, 18).map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full border px-3 py-1 text-[11px] font-medium"
                        style={{ borderColor: accent, color: '#1a1a1a' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ) : null}

            {achievementItems.length > 0 && !editable && (
              <section className="space-y-2">
                <h2
                  className="text-[13px] font-semibold uppercase"
                  data-accent-color="true"
                  style={{ color: accent, ...sectionBorder }}
                >
                  {styleOptions.formatHeader('Achievements')}
                </h2>
                <ul className="ml-5 list-disc space-y-1 text-[13px] leading-[1.7]" style={{ color: '#1a1a1a' }}>
                  {achievementItems.map((item, index) => (
                    <li key={`achievement-${index}`}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>

          <main className="space-y-4 pr-[30px]">
            {resumeData.experience.length > 0 && (
              <section className="space-y-4">
                <h2
                  className="text-[13px] font-semibold uppercase"
                  data-accent-color="true"
                  style={{ color: accent, ...sectionBorder }}
                >
                  {styleOptions.formatHeader('Experience')}
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

            {/* Custom Sections */}
            <CustomSectionsWrapper
              sections={resumeData.sections || []}
              editable={editable}
              accentColor={accent}
              renderSectionHeader={(title, index, { EditableText }) => (
                <h2
                  className="text-[13px] font-semibold uppercase"
                  data-accent-color="true"
                  style={{ 
                    color: accent,
                    marginBottom: '8px',
                    ...sectionBorder
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
              sectionStyle={{ marginBottom: '12px' }}
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
                      className="text-[13px] font-semibold uppercase"
                      data-accent-color="true"
                      style={{ color: accent, ...sectionBorder }}
                    >
                      {styleOptions.formatHeader(title)}
                    </h2>
                  )}
                />
              </section>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
};
