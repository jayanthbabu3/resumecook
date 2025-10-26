import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";

interface PremiumEliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const PremiumEliteTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
}: PremiumEliteTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-[13px] leading-relaxed text-gray-900">
      {/* Top Accent Bar with Header */}
      <div 
        className="px-12 pt-10 pb-8"
        style={{ 
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 text-white">
            <h1 className="text-[38px] font-bold mb-2 tracking-tight">
              {resumeData.personalInfo.fullName}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-[15px] font-medium opacity-95 mb-4">
                {resumeData.personalInfo.title}
              </p>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11.5px] opacity-90">
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
            <div className="ml-8">
              <div className="border-4 border-white rounded-2xl overflow-hidden shadow-xl">
                <ProfilePhoto
                  src={photo}
                  borderClass=""
                  className="rounded-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 rounded-xl" style={{ backgroundColor: accentLight }}>
            <h2 
              className="text-[13px] font-bold uppercase tracking-wide mb-3"
              style={{ color: accent }}
            >
              Professional Summary
            </h2>
            <p className="text-[12.5px] text-gray-700 leading-[1.75]">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - 40% */}
          <div className="col-span-5 space-y-7">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div>
                <h2 
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                  style={{ color: accent, borderColor: accent }}
                >
                  Education
                </h2>
                <div className="space-y-5">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: accentLight }}>
                      <div 
                        className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <h3 className="text-[13px] font-bold text-gray-900">
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="text-[11.5px] text-gray-600 mt-1">{edu.field}</p>
                      )}
                      <p className="text-[12px] font-semibold mt-1.5" style={{ color: accent }}>
                        {edu.school}
                      </p>
                      <p className="text-[10.5px] text-gray-500 mt-1 font-medium">
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
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                  style={{ color: accent, borderColor: accent }}
                >
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-[11.5px] font-medium px-3 py-1.5 rounded-lg"
                      style={{ 
                        backgroundColor: accentLight,
                        color: accent 
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - 60% */}
          <div className="col-span-7 space-y-7">
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div>
                <h2 
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                  style={{ color: accent, borderColor: accent }}
                >
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between items-start mb-2.5">
                        <div className="flex-1">
                          <h3 className="text-[14px] font-bold text-gray-900">
                            {exp.position}
                          </h3>
                          <p 
                            className="text-[12.5px] font-bold mt-1"
                            style={{ color: accent }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <div 
                          className="text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
                          style={{ 
                            background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                            color: 'white'
                          }}
                        >
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </div>
                      </div>
                      {exp.description && (
                        <ul className="ml-5 list-disc space-y-1.5 text-[12px] text-gray-700 leading-[1.7]">
                          {exp.description
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line, i) => (
                              <li key={i} className="pl-1">{line}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Sections */}
            {resumeData.sections &&
              resumeData.sections.map((section, index) => (
                <div key={index}>
                  <h2 
                    className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                    style={{ color: accent, borderColor: accent }}
                  >
                    {section.title}
                  </h2>
                  <div className="text-[12px] text-gray-700 leading-[1.7] whitespace-pre-line">
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
