import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

export const ExecutiveTemplate = ({ resumeData }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          {resumeData.personalInfo.title && (
            <p className="text-xl font-light text-slate-300 mb-5">
              {resumeData.personalInfo.title}
            </p>
          )}
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-12 py-8 max-w-4xl mx-auto">
        {/* Executive Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-l-4 border-slate-900 pl-3">
              Executive Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed pl-3">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">
              Professional Experience
            </h2>
            <div className="space-y-5 pl-3">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-slate-200 pl-5 pb-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        {exp.position || "Position Title"}
                      </h3>
                      <p className="text-base text-slate-700 font-semibold">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mt-2">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">
              Education
            </h2>
            <div className="grid md:grid-cols-2 gap-4 pl-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-slate-200 pl-4">
                  <h3 className="text-base font-bold text-slate-900">
                    {edu.degree || "Degree"}
                  </h3>
                  <p className="text-sm text-slate-700 font-semibold">
                    {edu.school || "School Name"}
                  </p>
                  {edu.field && (
                    <p className="text-sm text-gray-600 mb-1">{edu.field}</p>
                  )}
                  <p className="text-xs text-slate-600 mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Competencies */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">
              Core Competencies
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 pl-3">
              {resumeData.skills.map((skill, index) => (
                skill && (
                  <div
                    key={index}
                    className="bg-slate-50 px-3 py-2 rounded text-xs font-semibold text-slate-800 text-center border border-slate-200"
                  >
                    {skill}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-l-4 border-slate-900 pl-3">
              {section.title}
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pl-3">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
