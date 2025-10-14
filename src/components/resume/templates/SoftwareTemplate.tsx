import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
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

export const SoftwareTemplate = ({ resumeData, themeColor: _themeColor = "#2563eb" }: TemplateProps) => {
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
  const accentColor = _themeColor;
  const contactDetails = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((detail): detail is string => Boolean(detail));
  const skillsList = resumeData.skills.map(skill => skill.name).filter(Boolean).join(", ");

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans text-[13px] leading-relaxed text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-10">
        <header className="flex flex-col gap-4 border-b pb-5" style={{ borderColor: accentColor }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-[30px] font-semibold tracking-tight text-slate-900">
                  {resumeData.personalInfo.fullName}
                </h1>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: accentColor }}>
                  {resumeData.personalInfo.title}
                </p>
                <div className="h-[2px] w-14 rounded-full" style={{ backgroundColor: accentColor }} />
              </div>
              {contactDetails.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-700">
                  {contactDetails.map((detail, idx) => (
                    <span key={detail} className="flex items-center gap-3">
                      <span>{detail}</span>
                      {idx < contactDetails.length - 1 && <span className="text-slate-300">|</span>}
                    </span>
                  ))}
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

        {resumeData.personalInfo.summary && (
          <section className="space-y-2 border-l-4 pl-5" style={{ borderColor: accentColor }}>
            <h2 className="text-[13px] font-semibold uppercase" style={{ color: accentColor }}>
              Summary
            </h2>
            <p className="text-[12.5px] text-slate-800 leading-[1.7]">{resumeData.personalInfo.summary}</p>
          </section>
        )}

        <section className="space-y-4 border-l-4 pl-5" style={{ borderColor: accentColor }}>
          <h2 className="text-[13px] font-semibold uppercase" style={{ color: accentColor }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map(exp => {
              const points = splitLines(exp.description);
              return (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-[13px] font-semibold text-slate-900">{exp.position}</div>
                    <div className="text-[11px] font-medium text-slate-600">
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[12.5px] font-medium text-slate-700">{exp.company}</div>
                  {points.length > 0 && (
                    <ul className="list-disc space-y-1 pl-5 text-[12.5px] text-slate-800 leading-[1.7]">
                      {points.map((item, bulletIdx) => (
                        <li key={`${exp.id}-${bulletIdx}`}>{item.replace(/^•\s*/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {resumeData.skills.length > 0 && (
          <section className="space-y-2 border-l-4 pl-5" style={{ borderColor: accentColor }}>
            <h2 className="text-[13px] font-semibold uppercase" style={{ color: accentColor }}>
              Skills
            </h2>
            <p className="text-[12.5px] text-slate-800">{skillsList}</p>
          </section>
        )}

        {achievementItems.length > 0 && (
          <section className="space-y-2 border-l-4 pl-5" style={{ borderColor: accentColor }}>
            <h2 className="text-[13px] font-semibold uppercase" style={{ color: accentColor }}>
              Achievements
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[12.5px] text-slate-800 leading-[1.7]">
              {achievementItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {strengthItems.length > 0 && (
          <section className="space-y-2 border-l-4 pl-5" style={{ borderColor: accentColor }}>
            <h2 className="text-[13px] font-semibold uppercase" style={{ color: accentColor }}>
              Strengths
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[12.5px] text-slate-800 leading-[1.7]">
              {strengthItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section className="space-y-4 border-l-4 pl-5" style={{ borderColor: accentColor }}>
            <h2 className="text-[13px] font-semibold uppercase" style={{ color: accentColor }}>
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map(edu => (
                <div key={edu.id} className="space-y-1">
                  <div className="text-[13px] font-semibold text-slate-900">{edu.degree}</div>
                  <div className="text-[12.5px] font-medium text-slate-700">{edu.school}</div>
                  {edu.field && <div className="text-[12.5px] text-slate-700">{edu.field}</div>}
                  <div className="text-[11px] font-medium text-slate-600">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
