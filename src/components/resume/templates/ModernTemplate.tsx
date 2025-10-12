import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const ModernTemplate = ({ resumeData, themeColor = "#7c3aed" }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full min-h-[297mm] bg-white text-gray-900">
      {/* Header with Angled Design */}
      <div className="relative bg-white px-12 pt-10 pb-12">
        <div className="absolute top-0 left-0 w-full h-3" style={{ backgroundColor: themeColor }}></div>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-gray-900">
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
              {resumeData.personalInfo.title && (
                <p className="text-xl font-semibold" style={{ color: themeColor }}>
                  {resumeData.personalInfo.title}
                </p>
              )}
            </div>
            <ProfilePhoto src={photo} borderClass="border-4 border-white/80" />
          </div>
          
          {/* Contact Info - Horizontal Layout */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600 border-t border-gray-200 pt-4">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 pb-8">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Professional Summary</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed pl-5">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Experience</h2>
            </div>
            <div className="space-y-5 pl-5">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-start mb-1 gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900">{exp.position || "Position Title"}</h3>
                      <p className="text-sm font-semibold text-gray-700">{exp.company || "Company Name"}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded whitespace-nowrap" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2 pl-5">
              {resumeData.skills.map((skill) => (
                skill.name && (
                  <span
                    key={skill.id}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border"
                    style={{ 
                      borderColor: `${themeColor}40`,
                      color: themeColor,
                      backgroundColor: `${themeColor}08`
                    }}
                  >
                    {skill.name}
                  </span>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Education</h2>
            </div>
            <div className="space-y-3 pl-5">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                    <p className="text-sm text-gray-700">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections.map((section) => (
          <div key={section.id} className="mb-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{section.title}</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pl-5">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
