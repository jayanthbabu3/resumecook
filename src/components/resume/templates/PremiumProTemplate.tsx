import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";

interface PremiumProTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const PremiumProTemplate = ({
  resumeData,
  themeColor = "#0f766e",
}: PremiumProTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentTint = `${accent}20`;

  return (
    <div className="w-full h-full bg-white flex text-[13px] leading-relaxed text-gray-900">
      {/* Left Accent Panel */}
      <div 
        className="w-2 flex-shrink-0" 
        style={{ backgroundColor: accent }}
      />
      
      <div className="flex-1 p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-[32px] font-bold text-gray-900 mb-2">
                {resumeData.personalInfo.fullName}
              </h1>
              {resumeData.personalInfo.title && (
                <p className="text-[13px] font-semibold text-gray-600 mb-3">
                  {resumeData.personalInfo.title}
                </p>
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-600">
                {resumeData.personalInfo.email && (
                  <span>{resumeData.personalInfo.email}</span>
                )}
                {resumeData.personalInfo.phone && (
                  <span>{resumeData.personalInfo.phone}</span>
                )}
                {resumeData.personalInfo.location && (
                  <span>{resumeData.personalInfo.location}</span>
                )}
              </div>
            </div>
            {photo && (
              <div className="ml-6">
                <div style={{ borderColor: accent }} className="border-3 rounded-xl overflow-hidden">
                  <ProfilePhoto
                    src={photo}
                    borderClass=""
                    className="rounded-none"
                  />
                </div>
              </div>
            )}
          </div>
          
          {resumeData.personalInfo.summary && (
            <div className="relative pl-4">
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full" 
                style={{ backgroundColor: accent }}
              />
              <p className="text-[12.5px] text-gray-700 leading-[1.7]">
                {resumeData.personalInfo.summary}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-4 space-y-7">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div>
                <h2 
                  className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b border-t-0"
                  style={{ color: accent, borderColor: accent }}
                >
                  Education
                </h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="text-[13px] font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="text-[11px] text-gray-600 mt-1">{edu.field}</p>
                      )}
                      <p className="text-[11px] font-semibold mt-1" style={{ color: accent }}>
                        {edu.school}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <h2 
                  className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b"
                  style={{ color: accent, borderColor: accent }}
                >
                  Skills
                </h2>
                <div className="space-y-3">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12.5px] font-medium text-gray-900">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-[11px] text-gray-500">
                            {skill.level}/10
                          </span>
                        )}
                      </div>
                      {skill.level && (
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${skill.level * 10}%`,
                              backgroundColor: accent,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-8 space-y-7">
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div>
                <h2 
                  className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b"
                  style={{ color: accent, borderColor: accent }}
                >
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-[14px] font-semibold text-gray-900">
                            {exp.position}
                          </h3>
                          <p 
                            className="text-[12.5px] font-semibold mt-1"
                            style={{ color: accent }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <div 
                          className="text-[11px] font-medium px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: accentTint,
                            color: accent 
                          }}
                        >
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </div>
                      </div>
                      {exp.description && (
                        <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                          {exp.description
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sections */}
            {resumeData.sections &&
              resumeData.sections.map((section, index) => (
                <div key={index}>
                  <h2 
                    className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b"
                    style={{ color: accent, borderColor: accent }}
                  >
                    {section.title}
                  </h2>
                  <div className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
