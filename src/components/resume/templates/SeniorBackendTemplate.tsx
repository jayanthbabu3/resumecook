import type { ResumeData } from "@/pages/Editor";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
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
}: TemplateProps) => {
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
    <div className="w-full min-h-[297mm] bg-white font-sans text-[13px] leading-relaxed text-slate-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-8 py-10">
        <header className="space-y-3 border-b pb-5" style={{ borderColor: themeColor }}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-[30px] font-semibold tracking-tight text-slate-900">
                {resumeData.personalInfo.fullName}
              </h1>
              {resumeData.personalInfo.title && (
                <p className="text-[13px] font-medium text-slate-600">
                  {resumeData.personalInfo.title}
                </p>
              )}
            </div>
            {contact.length > 0 && (
              <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-[12px] font-medium text-slate-600">
                {contact.map((detail, index) => (
                  <span key={`${detail}-${index}`} className="flex items-center gap-2">
                    <span>{detail}</span>
                    {index < contact.length - 1 && <span className="text-slate-300">|</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-[35%,65%]">
          <aside className="space-y-6">
            {resumeData.personalInfo.summary && (
              <section className="space-y-2">
                <h2 className="text-[13px] font-semibold uppercase text-slate-800" style={{ color: themeColor }}>
                  Summary
                </h2>
                <p className="text-[12.5px] text-slate-700 leading-[1.7] text-justify">
                  {resumeData.personalInfo.summary}
                </p>
              </section>
            )}

            {competencies.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-[13px] font-semibold uppercase text-slate-800" style={{ color: themeColor }}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {competencies.slice(0, 18).map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {achievementItems.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-[13px] font-semibold uppercase text-slate-800" style={{ color: themeColor }}>
                  Achievements
                </h2>
                <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-slate-700 leading-[1.7]">
                  {achievementItems.map((item, index) => (
                    <li key={`achievement-${index}`}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>

          <main className="space-y-6">
            {resumeData.experience.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-[13px] font-semibold uppercase text-slate-800" style={{ color: themeColor }}>
                  Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => {
                    const points = splitLines(exp.description);
                    return (
                      <div key={exp.id} className="space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="text-[13px] font-semibold text-slate-900">
                            {exp.position || "Role"}
                          </div>
                          <div className="text-[11px] font-medium text-slate-600">
                            {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                          </div>
                        </div>
                        {exp.company && (
                          <div className="text-[12.5px] font-medium text-slate-700">
                            {exp.company}
                          </div>
                        )}
                        {points.length > 0 && (
                          <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-slate-800 leading-[1.7]">
                            {points.map((line, index) => (
                              <li key={`${exp.id}-${index}`}>{line.replace(/^•\s*/, "")}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {otherSections.map((section) => {
              const lines = splitLines(section.content);
              return (
                <section key={section.id} className="space-y-2">
                  <h2 className="text-[13px] font-semibold uppercase text-slate-800" style={{ color: themeColor }}>
                    {section.title}
                  </h2>
                  {lines.length > 0 ? (
                    <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-slate-800 leading-[1.7]">
                      {lines.map((line, index) => (
                        <li key={`${section.id}-${index}`}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[12.5px] text-slate-800 leading-[1.7] whitespace-pre-line">
                      {section.content}
                    </p>
                  )}
                </section>
              );
            })}

            {resumeData.education.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-[13px] font-semibold uppercase text-slate-800" style={{ color: themeColor }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <div className="text-[13px] font-semibold text-slate-900">
                        {edu.degree || "Degree"}
                      </div>
                      {edu.school && (
                        <div className="text-[12.5px] font-medium text-slate-700">
                          {edu.school}
                        </div>
                      )}
                      {edu.field && (
                        <div className="text-[12px] text-slate-700">{edu.field}</div>
                      )}
                      {(edu.startDate || edu.endDate) && (
                        <div className="text-[11px] font-medium text-slate-600">
                          {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
