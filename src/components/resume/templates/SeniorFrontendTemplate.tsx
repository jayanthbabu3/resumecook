import type { ResumeData } from "@/pages/Editor";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
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
}: TemplateProps) => {
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
    <div className="w-full min-h-[297mm] bg-white text-slate-900 font-sans text-[13px] leading-relaxed">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-10">
        <header className="space-y-3 border-b pb-5" style={{ borderColor: themeColor }}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <h1 className="text-[30px] font-semibold tracking-tight text-slate-900">
                {resumeData.personalInfo.fullName}
              </h1>
              {resumeData.personalInfo.title && (
                <p className="text-[13px] font-medium text-slate-600">
                  {resumeData.personalInfo.title}
                </p>
              )}
            </div>
            {contactDetails.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-medium text-slate-600">
                {contactDetails.map((detail, idx) => (
                  <span key={`${detail}-${idx}`} className="flex items-center gap-2">
                    <span>{detail}</span>
                    {idx < contactDetails.length - 1 && <span className="text-slate-300">|</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {resumeData.personalInfo.summary && (
          <section className="space-y-2">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Summary
            </h2>
            <p className="text-[12.5px] text-slate-800 leading-[1.7]">
              {resumeData.personalInfo.summary}
            </p>
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="space-y-4">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Professional Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => {
                const bulletPoints = splitLines(exp.description);
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
                    {bulletPoints.length > 0 && (
                      <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-slate-800 leading-[1.7]">
                        {bulletPoints.map((point, index) => (
                          <li key={`${exp.id}-point-${index}`}>{point.replace(/^•\s*/, "")}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {skillNames.length > 0 && (
          <section className="space-y-2">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            <p className="text-[12.5px] text-slate-800 leading-[1.7]">
              {skillNames.join(" • ")}
            </p>
          </section>
        )}

        {additionalSections?.length ? (
          additionalSections.map((section) => (
            <section key={section.id} className="space-y-2">
              <h2
                className="text-[13px] font-semibold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                {section.title}
              </h2>
              <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-slate-800 leading-[1.7]">
                {splitLines(section.content).map((point, index) => (
                  <li key={`${section.id}-${index}`}>{point}</li>
                ))}
              </ul>
            </section>
          ))
        ) : null}

        {resumeData.education.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
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
                    <div className="text-[12px] text-slate-700">
                      {edu.field}
                    </div>
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
      </div>
    </div>
  );
};
