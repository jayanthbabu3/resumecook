import type { ResumeData } from "@/pages/Editor";
import { ShieldCheck, Cpu, Server, Mail, Phone, MapPin, Activity } from "lucide-react";
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

export const SeniorBackendTemplate = ({ resumeData, themeColor = "#2563eb" }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const coreSkills = resumeData.skills.filter(skill => skill.category !== "toolbox");
  const toolboxSkills = resumeData.skills.filter(skill => skill.category === "toolbox");

  const coreSource = coreSkills.length ? coreSkills : resumeData.skills;
  const skillLevels = coreSource.map((skill, index) => {
    const name = skill.name || `Skill ${index + 1}`;
    const rawLevel = skill.level ?? Math.max(7 - index, 5);
    const level = Math.min(100, Math.round((rawLevel / 10) * 100));
    return { id: skill.id, name, level, index };
  });

  const experience = resumeData.experience;
  const featuredSections = resumeData.sections || [];
  const impactSection = featuredSections.find(section => section.id === "impact");
  const initiativeSection = featuredSections.find(section => section.id === "initiatives");
  const otherSections = featuredSections.filter(section => !["impact", "initiatives"].includes(section.id));

  const impactMetrics = (impactSection?.content || "")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [rawLabel, rawValue] = line.split(/\s+-\s+/);
      const label = rawLabel?.trim() || line;
      const value = rawValue?.trim();
      const percentMatch = value?.match(/([0-9]+(?:\.[0-9]+)?)%/);
      const percentValue = percentMatch ? Math.min(100, Number(percentMatch[1])) : undefined;
      const descriptor = percentMatch && value
        ? value.replace(percentMatch[0], "").replace(/^[–—-]\s*/, "").trim()
        : value;
      const shortValue = percentValue !== undefined
        ? `${Math.round(percentValue)}%`
        : value?.split(" ").slice(0, 2).join(" ");
      return { label, value, percent: percentValue, descriptor, shortValue };
    });

  const initiativeItems = (initiativeSection?.content || "")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const renderMetricIndicator = (percent?: number, value?: string) => {
    if (percent !== undefined) {
      const normalized = Math.max(0, Math.min(100, percent));
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      const dashOffset = circumference * (1 - normalized / 100);
      return (
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 36 36" className="h-12 w-12">
            <circle cx="18" cy="18" r="16" stroke="#e2e8f0" strokeWidth="4" fill="none" />
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke={themeColor}
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-slate-800">{Math.round(normalized)}%</span>
          </div>
        </div>
      );
    }

    if (value) {
      return (
        <div className="h-12 w-12 flex items-center justify-center rounded-full border-2"
          style={{ borderColor: themeColor }}>
          <span className="text-[10px] font-semibold text-slate-800 text-center leading-tight px-1">
            {value}
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-900 font-sans">
      <div className="grid lg:grid-cols-[34%,66%] gap-4 px-8 py-8">
        {/* Sidebar */}
        <aside className="space-y-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-7 text-slate-900 shadow-sm">
            <div className="flex flex-col items-center text-center gap-4">
              {photo ? (
                <ProfilePhoto src={photo} sizeClass="h-28 w-28" borderClass="border-4 border-white" />
              ) : (
                <div className="h-28 w-28 rounded-full border-4 border-white bg-blue-50 text-blue-600 flex items-center justify-center text-3xl font-semibold">
                  {(resumeData.personalInfo.fullName || "")
                    .split(" ")
                    .filter(Boolean)
                    .map(part => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "BE"}
                </div>
              )}
              <div className="space-y-1">
                <h1 className="text-[26px] font-semibold tracking-tight leading-tight">
                  {resumeData.personalInfo.fullName}
                </h1>
                <p className="text-xs font-medium tracking-[0.25em] text-slate-500">
                  {resumeData.personalInfo.title}
                </p>
              </div>
              <div className="w-full space-y-1.5 text-[11px]">
                {[
                  { icon: Mail, value: resumeData.personalInfo.email },
                  { icon: Phone, value: resumeData.personalInfo.phone },
                  { icon: MapPin, value: resumeData.personalInfo.location },
                ]
                  .filter(item => !!item.value)
                  .map(({ icon: Icon, value }) => (
                    <div
                      key={value}
                      className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-slate-700 border border-slate-200"
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: themeColor }} />
                      <span className="text-[11px] font-medium leading-tight">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {resumeData.personalInfo.summary && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                <ShieldCheck className="h-4 w-4" style={{ color: themeColor }} />
                Summary
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                {resumeData.personalInfo.summary}
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <Cpu className="h-4 w-4" style={{ color: themeColor }} />
              Systems Stack
            </div>
            <div className="space-y-2.5">
              {skillLevels.map(({ id, name, level, index }) => (
                <div key={id || `core-skill-${index}`} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>{name}</span>
                    <span>{level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${level}%`, backgroundColor: themeColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {impactMetrics.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                <Activity className="h-4 w-4" style={{ color: themeColor }} />
                Reliability Metrics
              </div>
              <div className="space-y-3">
                {impactMetrics.map((metric, index) => (
                  <div
                    key={`${metric.label}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {metric.label}
                      </p>
                      {(metric.descriptor || metric.value) && (
                        <p className="text-xs text-slate-500">
                          {metric.descriptor || metric.value}
                        </p>
                      )}
                    </div>
                    {renderMetricIndicator(metric.percent, metric.shortValue)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {otherSections.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                <Server className="h-4 w-4" style={{ color: themeColor }} />
                Platform Highlights
              </div>
              <div className="space-y-3.5">
                {otherSections.map(section => (
                  <div key={section.id}>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">{section.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="space-y-2">
          {experience.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden mb-2">
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100">
                <h2 className="text-base font-semibold tracking-tight text-slate-800">Professional Experience</h2>
                <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">2012 — Present</span>
              </div>
              <div className="px-5 py-4 space-y-4">
                {experience.map(item => (
                  <div key={item.id} className="relative pl-6">
                    <span
                      className="absolute left-0 top-2 block h-3 w-3 rounded-full"
                      style={{ backgroundColor: themeColor }}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{item.position}</h3>
                        <p className="text-sm font-medium text-slate-600">{item.company}</p>
                      </div>
                      <p className="text-xs font-medium text-slate-500">
                        {formatDate(item.startDate)} — {item.current ? "Present" : formatDate(item.endDate)}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {toolboxSkills.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2.5">Systems Toolbox</h2>
              <div className="flex flex-wrap gap-1.5">
                {toolboxSkills.map(skill => (
                  <span
                    key={skill.id}
                    className="px-2.5 py-[3px] text-[11px] rounded-full border border-slate-200 bg-slate-50 text-slate-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {initiativeItems.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold tracking-tight mb-3 text-slate-800">Resilience Playbooks</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {initiativeItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {resumeData.education.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold tracking-tight mb-3 text-slate-800">Education</h2>
              <div className="space-y-3">
                {resumeData.education.map(edu => (
                  <div key={edu.id} className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{edu.degree}</h3>
                      {edu.field && <p className="text-xs text-slate-600">{edu.field}</p>}
                      <p className="text-sm font-medium text-slate-700">{edu.school}</p>
                    </div>
                    <p className="text-xs font-medium text-slate-500 mt-2 md:mt-0">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
