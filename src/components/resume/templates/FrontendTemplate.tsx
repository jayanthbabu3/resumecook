import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const FrontendTemplate = ({ resumeData }: TemplateProps) => {
  return (
    <div className="w-full min-h-[297mm] bg-white font-sans text-gray-800">
      {/* Header Section with Gradient */}
      <div className="bg-indigo-600 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-2 tracking-tight">{resumeData.personalInfo.fullName}</h1>
          <p className="text-2xl font-light mb-6 text-indigo-100">{resumeData.personalInfo.title}</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Mail className="w-4 h-4" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Phone className="w-4 h-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Skills Section - Grid Layout */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
              Technical Skills
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-2.5 rounded-lg border border-indigo-200 text-center font-medium text-gray-800 shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
              Professional Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6 relative pl-6 border-l-2 border-indigo-300">
                <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-1"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-lg text-indigo-600 font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-gray-700 font-medium">{edu.field}</p>}
                    <p className="text-indigo-600 font-semibold">{edu.school}</p>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
