import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Code2, Database, Server } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const FullstackTemplate = ({ resumeData, themeColor = "#7c3aed" }: TemplateProps) => {
  return (
    <div className="w-full min-h-[297mm] bg-white font-sans text-gray-900 flex">
      {/* Left Sidebar */}
      <div className="w-[35%] bg-gray-50 p-8 border-r-4 border-gray-900">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 leading-tight">{resumeData.personalInfo.fullName}</h1>
          <p className="text-base font-semibold text-gray-700">{resumeData.personalInfo.title}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-8 pb-6 border-b-2 border-gray-300">
          <h2 className="text-xs font-bold mb-3 text-gray-900 uppercase tracking-wider">Contact</h2>
          <div className="space-y-2 text-xs text-gray-700">
            {resumeData.personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-all">{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Technical Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8 pb-6 border-b-2 border-gray-300">
            <h2 className="text-xs font-bold mb-3 text-gray-900 uppercase tracking-wider">Skills</h2>
            <div className="space-y-1.5">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-xs font-medium text-gray-800 py-1.5 px-2.5 bg-white rounded border-l-2"
                  style={{ borderLeftColor: themeColor }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold mb-3 text-gray-900 uppercase tracking-wider">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="text-xs font-bold text-gray-900 mb-1">{edu.degree}</h3>
                {edu.field && <p className="text-xs text-gray-600 mb-0.5">{edu.field}</p>}
                <p className="text-xs text-gray-700 font-medium">{edu.school}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="w-[65%] p-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-7">
            <h2 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wider pb-2 border-b-2 border-gray-900">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-7">
            <h2 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wider pb-2 border-b-2 border-gray-900">
              Professional Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-5 last:mb-0">
                <div className="flex justify-between items-start mb-1 gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-xs text-gray-500 font-medium whitespace-nowrap">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-7">
              <h2 className="text-sm font-bold mb-3 text-gray-900 uppercase tracking-wider pb-2 border-b-2 border-gray-900">
                {section.title}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
