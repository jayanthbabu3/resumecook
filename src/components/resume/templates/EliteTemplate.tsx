import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";

interface EliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const EliteTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
}: EliteTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="mx-auto bg-white font-sans text-gray-900">
      {/* Left Accent Bar */}
      <div className="relative flex">
        <div
          className="w-2"
          style={{ backgroundColor: themeColor }}
        />
        
        <div className="flex-1 px-12 py-10">
          {/* Header Section */}
          <div className="mb-8 flex items-start justify-between border-b pb-6" style={{ borderColor: `${themeColor}20` }}>
            <div className="flex-1">
              <h1
                className="mb-2 text-5xl font-light tracking-tight"
                style={{ color: themeColor }}
              >
                {personalInfo.fullName}
              </h1>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-widest text-gray-800">
                {personalInfo.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {personalInfo.location && (
                  <span className="flex items-center gap-1">
                    📍 {personalInfo.location}
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1">
                    📞 {personalInfo.phone}
                  </span>
                )}
                {personalInfo.email && (
                  <span className="flex items-center gap-1">
                    ✉️ {personalInfo.email}
                  </span>
                )}
              </div>
            </div>
            {personalInfo.photo && (
              <div className="ml-8">
                <ProfilePhoto src={personalInfo.photo} sizeClass="h-36 w-36" />
              </div>
            )}
          </div>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h3
                className="mb-4 flex items-center text-xl font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                <span className="mr-3 h-1 w-12" style={{ backgroundColor: themeColor }} />
                Professional Summary
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 pl-15">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Professional Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h3
                className="mb-4 flex items-center text-xl font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                <span className="mr-3 h-1 w-12" style={{ backgroundColor: themeColor }} />
                Experience
              </h3>
              <div className="space-y-6 pl-15">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-gray-900">
                          {exp.position}
                        </h4>
                        <p className="text-sm font-semibold" style={{ color: themeColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {exp.description.split("\n").map((line, idx) => (
                        <p key={idx} className="text-sm leading-relaxed text-gray-700">
                          • {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3
                className="mb-4 flex items-center text-xl font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                <span className="mr-3 h-1 w-12" style={{ backgroundColor: themeColor }} />
                Education
              </h3>
              <div className="space-y-4 pl-15">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-gray-900">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h4>
                        <p className="text-sm font-semibold" style={{ color: themeColor }}>
                          {edu.school}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3
                className="mb-4 flex items-center text-xl font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                <span className="mr-3 h-1 w-12" style={{ backgroundColor: themeColor }} />
                Core Competencies
              </h3>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 pl-15">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <span className="mr-2" style={{ color: themeColor }}>▪</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {sections.map((section) => (
            <div key={section.id} className="mb-8">
              <h3
                className="mb-4 flex items-center text-xl font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                <span className="mr-3 h-1 w-12" style={{ backgroundColor: themeColor }} />
                {section.title}
              </h3>
              <div className="space-y-1 pl-15">
                {section.content.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    • {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
