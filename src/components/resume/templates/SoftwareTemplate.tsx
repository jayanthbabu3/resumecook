import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
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

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const splitLines = (text?: string) =>
  text
    ? text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean)
    : [];

export const SoftwareTemplate = ({ resumeData, themeColor: _themeColor = "#2563eb", editable = false }: TemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const accent = _themeColor || "#2563eb";
  const strengthsSection = resumeData.sections.find(section => section.id === "strengths");
  const achievementsSection = resumeData.sections.find(section => section.id === "achievements");
  const strengthItems = splitLines(strengthsSection?.content);
  const achievementItems = splitLines(achievementsSection?.content);
  const photo = resumeData.personalInfo.photo;
  const initials = (resumeData.personalInfo.fullName || "")
    .split(" ")
    .filter(Boolean)
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const accentColor = accent;
  const contactDetails = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((detail): detail is string => Boolean(detail));
  const skillsList = resumeData.skills.map(skill => skill.name).filter(Boolean).join(", ");

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-10">
        <header className="flex flex-col gap-4 border-b pb-5" style={{ borderColor: accentColor }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="space-y-1">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName}
                    className="text-[30px] font-semibold tracking-tight"
                    style={{ color: '#000000' }}
                    as="h1"
                  />
                ) : (
                  <h1 className="text-[30px] font-semibold tracking-tight" style={{ color: '#000000' }}>
                    {resumeData.personalInfo.fullName}
                  </h1>
                )}
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-[11px] font-semibold uppercase tracking-[0.35em]"
                    as="p"
                    style={{ color: accentColor }}
                  />
                ) : (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: accentColor }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
                <div className="h-[2px] w-14 rounded-full" style={{ backgroundColor: accentColor }} />
              </div>
              {(contactDetails.length > 0 || editable) && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                  {editable ? (
                    <>
                      {resumeData.personalInfo.email && (
                        <span className="flex items-center gap-3">
                          <InlineEditableText
                            path="personalInfo.email"
                            value={resumeData.personalInfo.email}
                            className="text-[11px] font-medium text-slate-700"
                            as="span"
                          />
                          <span className="text-slate-300">|</span>
                        </span>
                      )}
                      {resumeData.personalInfo.phone && (
                        <span className="flex items-center gap-3">
                          <InlineEditableText
                            path="personalInfo.phone"
                            value={resumeData.personalInfo.phone}
                            className="text-[11px] font-medium text-slate-700"
                            as="span"
                          />
                          {resumeData.personalInfo.location && <span className="text-slate-300">|</span>}
                        </span>
                      )}
                      {resumeData.personalInfo.location && (
                        <InlineEditableText
                          path="personalInfo.location"
                          value={resumeData.personalInfo.location}
                          className="text-[11px] font-medium text-slate-700"
                          as="span"
                        />
                      )}
                    </>
                  ) : (
                    contactDetails.map((detail, idx) => (
                      <span key={detail} className="flex items-center gap-3">
                        <span>{detail}</span>
                        {idx < contactDetails.length - 1 && <span className="text-slate-300">|</span>}
                      </span>
                    ))
                  )}
                </div>
              )}
            </div>
            {(photo || initials) && (
              <div className="flex items-center md:justify-end">
                {photo ? (
                  <ProfilePhoto src={photo} sizeClass="h-16 w-16" borderClass="border border-slate-300" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-base font-semibold text-slate-700">
                    {initials}
                  </div>
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
          className="mb-3"
          renderHeader={(title) => (
            <h2
              className="text-[13px] font-semibold uppercase mb-2 border-l-4 pl-5"
              data-accent-color="true"
              style={{ borderColor: accent, color: accent }}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Social Links Section */}
        {(resumeData.includeSocialLinks || editable) && (
          <section className="mb-3 border-l-4 pl-5" style={{ borderColor: accent }}>
            <h2
              className="text-[13px] font-semibold uppercase mb-2"
              data-accent-color="true"
              style={{ color: accent }}
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

        <section className="space-y-4 border-l-4 pl-5" style={{ borderColor: accent }}>
          <h2 
            className="text-[13px] font-semibold uppercase mb-3" 
            data-accent-color="true"
            style={{ color: accent }}
          >
            {styleOptions.formatHeader('Professional Experience')}
          </h2>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Company Name",
                position: "Position Title",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Job description",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => {
                const points = splitLines(exp.description);
                return (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[13px] font-semibold text-slate-900"
                        as="div"
                      />
                      <div className="text-[13px] font-medium" style={{ color: '#6b7280' }}>
                        <div className="text-[13px] font-medium flex items-center gap-1" style={{ color: '#6b7280' }}>
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                          <span> — </span>
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
                    </div>
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-[13px] font-medium"
                      style={{ color: '#1a1a1a' }}
                      as="div"
                    />
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
                );
              }}
            />
          ) : (
            <div className="space-y-4">
              {resumeData.experience.map(exp => {
                const points = splitLines(exp.description);
                return (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="text-[13px] font-semibold" style={{ color: '#000000' }}>{exp.position}</div>
                      <div className="text-[13px] font-medium" style={{ color: '#6b7280' }}>
                        {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <div className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>{exp.company}</div>
                    <ExperienceBulletPoints
                      experienceId={exp.id}
                      experienceIndex={resumeData.experience.findIndex(e => e.id === exp.id)}
                      bulletPoints={exp.bulletPoints}
                      description={exp.description}
                      editable={false}
                      accentColor={accent}
                      bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {resumeData.skills.length > 0 && (
          <section className="space-y-2 border-l-4 pl-5" style={{ borderColor: accent }}>
            <h2 
              className="text-[13px] font-semibold uppercase mb-2" 
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
                  <span className="inline">
                    <span className="text-[13px]" style={{ color: '#1a1a1a' }}>
                      {skill.name}
                    </span>
                    {index < resumeData.skills.length - 1 && ", "}
                  </span>
                )}
              />
            ) : (
              <p className="text-[13px]" style={{ color: '#1a1a1a' }}>{skillsList}</p>
            )}
          </section>
        )}

        {(achievementItems.length > 0 || (editable && achievementsSection)) && achievementsSection && (
          <section className="space-y-2 border-l-4 pl-5" style={{ borderColor: accent }}>
            <h2 
              className="text-[13px] font-semibold uppercase mb-2" 
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Achievements')}
            </h2>
            {editable ? (
              <InlineEditableText
                path={`sections[${resumeData.sections.findIndex(s => s.id === "achievements")}].content`}
                value={achievementsSection.content || ""}
                className="text-[13px] leading-[1.7]"
                style={{ color: '#1a1a1a' }}
                as="div"
                multiline
              />
            ) : (
              <ul className="list-disc space-y-1 pl-5 text-[13px] leading-[1.7]" style={{ color: '#1a1a1a' }}>
                {achievementItems.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {(strengthItems.length > 0 || (editable && strengthsSection)) && strengthsSection && (
          <section className="space-y-2 border-l-4 pl-5" style={{ borderColor: accent }}>
            <h2 
              className="text-[13px] font-semibold uppercase mb-2" 
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Strengths')}
            </h2>
            {editable ? (
              <InlineEditableText
                path={`sections[${resumeData.sections.findIndex(s => s.id === "strengths")}].content`}
                value={strengthsSection.content || ""}
                className="text-[13px] leading-[1.7]"
                style={{ color: '#1a1a1a' }}
                as="div"
                multiline
              />
            ) : (
              <ul className="list-disc space-y-1 pl-5 text-[13px] leading-[1.7]" style={{ color: '#1a1a1a' }}>
                {strengthItems.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Education Section */}
        {(resumeData.education.length > 0) || editable ? (
          <section className="space-y-4 border-l-4 pl-5" style={{ borderColor: accent }}>
            <InlineEducationSection
              items={resumeData.education || []}
              editable={editable}
              accentColor={accent}
              variant="standard"
              className="space-y-3"
              renderHeader={(title) => (
                <h2
                  className="text-[13px] font-semibold uppercase mb-3"
                  data-accent-color="true"
                  style={{ color: accent }}
                >
                  {styleOptions.formatHeader(title)}
                </h2>
              )}
            />
          </section>
        ) : null}

        {/* Custom Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections?.filter(s => s.id !== "strengths" && s.id !== "achievements") || []}
          editable={editable}
          accentColor={accent}
          renderSectionHeader={(title, index, { EditableText }) => (
            <h2
              className="text-[13px] font-semibold uppercase mb-2"
              data-accent-color="true"
              style={{ 
                color: accent,
                marginBottom: '8px'
              }}
            >
              <EditableText className="inherit" />
            </h2>
          )}
          itemStyle={{ 
            fontSize: '13px', 
            color: '#1a1a1a', 
            lineHeight: '1.7' 
          }}
          sectionStyle={{ marginBottom: '12px', borderLeft: `4px solid ${accent}`, paddingLeft: '20px' }}
        />
      </div>
    </div>
  );
};
