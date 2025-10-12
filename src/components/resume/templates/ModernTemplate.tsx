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
      {/* Header - Centered */}
      <div className="bg-white px-12 pt-12 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          
          {/* Contact Info - Centered Horizontal Layout */}
          <div className="flex justify-center flex-wrap gap-x-3 gap-y-2 text-sm text-gray-600">
            {resumeData.personalInfo.email && (
              <span>{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.email && resumeData.personalInfo.phone && (
              <span>•</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>{resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.phone && resumeData.personalInfo.location && (
              <span>•</span>
            )}
            {resumeData.personalInfo.location && (
              <span>{resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 pb-8">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-4 border-l-4" style={{ borderColor: themeColor }}>
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900">{exp.position || "Position Title"}</h3>
                      <p className="text-sm font-medium" style={{ color: themeColor }}>{exp.company || "Company Name"}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
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
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => {
                const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
                const color = colors[index % colors.length];
                return skill.name ? (
                  <span
                    key={skill.id}
                    className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{ 
                      color: color,
                      backgroundColor: `${color}15`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: `${color}40`
                    }}
                  >
                    {skill.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
              Education
            </h2>
            <div className="space-y-3">
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
          <div key={section.id} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
              {section.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
