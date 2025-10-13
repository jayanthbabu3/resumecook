import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";

interface AnalystTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const AnalystTemplate = ({
  resumeData,
  themeColor = "#2563eb",
}: AnalystTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="mx-auto bg-white p-12 font-sans text-gray-900">
      {/* Header Section */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          <h1
            className="mb-1 text-4xl font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            {personalInfo.fullName}
          </h1>
          <h2 className="mb-3 text-xl font-bold uppercase tracking-wide text-gray-900">
            {personalInfo.title}
          </h2>
          <p className="text-sm text-gray-600">
            {[
              personalInfo.location,
              personalInfo.phone,
              personalInfo.email,
            ]
              .filter(Boolean)
              .join(" | ")}
          </p>
        </div>
        {personalInfo.photo && (
          <div className="ml-8">
            <ProfilePhoto src={personalInfo.photo} sizeClass="h-32 w-32" />
          </div>
        )}
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Summary
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          <p className="text-sm leading-relaxed text-gray-700">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Professional Experience Section */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Professional Experience
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-1 flex items-baseline justify-between">
                  <h4 className="font-bold text-gray-900">
                    {exp.position}, {exp.company}
                  </h4>
                  <span className="text-sm font-semibold text-gray-900">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="ml-0">
                  {exp.description.split("\n").map((line, idx) => (
                    <p key={idx} className="mb-1 text-sm leading-relaxed text-gray-700">
                      • {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Education
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between">
                  <h4 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <span className="text-sm font-semibold text-gray-900">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.school}</p>
                <p className="text-sm text-gray-600">• Graduated with High Honors.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills Section */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Technical Skills
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          <div className="grid grid-cols-4 gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm text-gray-700">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            {section.title}
          </h3>
          <div
            className="mb-4 h-px"
            style={{ backgroundColor: themeColor }}
          />
          <div className="space-y-1">
            {section.content.split("\n").map((line, idx) => (
              <p key={idx} className="text-sm text-gray-700">
                • {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
