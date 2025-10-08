import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";

interface FresherEliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const FresherEliteTemplate = ({
  resumeData,
  themeColor = "#6366f1",
}: FresherEliteTemplateProps) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-gray-50 p-8">
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header with colored background */}
        <div 
          className="px-10 py-8"
          style={{ 
            background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` 
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold mb-2">
                {resumeData.personalInfo.fullName}
              </h1>
              {resumeData.personalInfo.title && (
                <p className="text-base font-medium mb-3 opacity-95">
                  {resumeData.personalInfo.title}
                </p>
              )}
              <div className="flex flex-wrap gap-5 text-sm opacity-90">
                {resumeData.personalInfo.email && (
                  <span className="flex items-center gap-2">
                    <span>✉</span> {resumeData.personalInfo.email}
                  </span>
                )}
                {resumeData.personalInfo.phone && (
                  <span className="flex items-center gap-2">
                    <span>📞</span> {resumeData.personalInfo.phone}
                  </span>
                )}
                {resumeData.personalInfo.location && (
                  <span className="flex items-center gap-2">
                    <span>📍</span> {resumeData.personalInfo.location}
                  </span>
                )}
              </div>
            </div>
            {photo && (
              <div className="ml-6">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <ProfilePhoto src={photo} borderClass="" className="rounded-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-10 py-6">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4" style={{ borderColor: themeColor }}>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {resumeData.personalInfo.summary}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-7">
            {/* Left Column - 1 column */}
            <div className="space-y-6">
              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div>
                  <h2 
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    Education
                  </h2>
                  <div className="space-y-3">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="bg-white rounded-lg p-3.5 border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-xs text-gray-600 mb-1.5">{edu.field}</p>
                        )}
                        <p className="text-xs font-semibold mb-1" style={{ color: themeColor }}>
                          {edu.school}
                        </p>
                        <p className="text-xs text-gray-500">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills with circular progress */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <div>
                  <h2 
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    Skills
                  </h2>
                  <div className="space-y-2.5">
                    {resumeData.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  backgroundColor: i < Math.ceil(skill.level / 2) ? themeColor : '#e5e7eb',
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - 2 columns */}
            <div className="col-span-2 space-y-6">
              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div>
                  <h2 
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    Experience
                  </h2>
                  <div className="space-y-5">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="relative pl-5 pb-5 border-l-2 border-gray-200 last:border-0 last:pb-0">
                        <div 
                          className="absolute left-0 top-0 w-2.5 h-2.5 rounded-full -ml-[5px]"
                          style={{ backgroundColor: themeColor }}
                        />
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-900">
                              {exp.position}
                            </h3>
                            <p className="text-sm font-semibold mt-1" style={{ color: themeColor }}>
                              {exp.company}
                            </p>
                          </div>
                          <span 
                            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                            style={{ 
                              backgroundColor: `${themeColor}15`,
                              color: themeColor 
                            }}
                          >
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
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
                </div>
              )}

              {/* Projects/Sections */}
              {resumeData.sections &&
                resumeData.sections.map((section, index) => (
                  <div key={index}>
                    <h2 
                      className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                      style={{ color: themeColor }}
                    >
                      <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                      {section.title}
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-5">
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {section.content.split("\n").map((line, i) => (
                          <p key={i} className="mb-1.5">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
