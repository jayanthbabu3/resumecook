import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";

interface PremiumFresherTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const PremiumFresherTemplate = ({
  resumeData,
  themeColor = "#7C3AED",
}: PremiumFresherTemplateProps) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white p-10">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2" style={{ borderColor: themeColor }}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-base text-gray-600 mb-3">{resumeData.personalInfo.title}</p>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
            </div>
          </div>
          {photo && (
            <div className="ml-4">
              <ProfilePhoto src={photo} borderClass="border-2" className="rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
                Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                  <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                  {edu.field && <p className="text-xs text-gray-600 mt-1">{edu.field}</p>}
                  <p className="text-xs font-semibold mt-1" style={{ color: themeColor }}>
                    {edu.school}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
                Technical Skills
              </h2>
              <div className="space-y-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{skill.name}</span>
                    {skill.level && (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.level * 10}%`,
                              backgroundColor: themeColor,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{skill.level}/10</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-6">
          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
                Experience
              </h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-sm font-semibold mt-1" style={{ color: themeColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                  {exp.description && (
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {exp.description.split("\n").map((line, i) => (
                        <p key={i} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects/Sections */}
          {resumeData.sections &&
            resumeData.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
                  {section.title}
                </h2>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {section.content.split("\n").map((line, i) => (
                    <p key={i} className="mb-1">
                      {line}
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
