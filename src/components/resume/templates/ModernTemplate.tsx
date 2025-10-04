import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

export const ModernTemplate = ({ resumeData }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 grid grid-cols-[240px,1fr]">
      {/* Left Sidebar */}
      <div className="bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-8">
        <div className="mb-8">
          <div className="h-28 w-28 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center">
            <div className="text-4xl font-bold">
              {resumeData.personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase() || "YN"}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-white/90">Contact</h3>
          <div className="space-y-3 text-sm">
            {resumeData.personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="break-all overflow-wrap-anywhere">{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-white/90">Skills</h3>
            <div className="space-y-2">
              {resumeData.skills.map((skill, index) => (
                skill && (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded px-3 py-2 text-sm">
                    {skill}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-white/90">Education</h3>
            <div className="space-y-4 text-sm">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold">{edu.degree}</div>
                  <div className="text-white/80">{edu.school}</div>
                  <div className="text-white/60 text-xs mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="p-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          {resumeData.personalInfo.title && (
            <p className="text-2xl text-indigo-600 font-semibold">
              {resumeData.personalInfo.title}
            </p>
          )}
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="h-1 w-12 bg-indigo-600" />
              <span>About Me</span>
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="h-1 w-12 bg-indigo-600" />
              <span>Experience</span>
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-indigo-200">
                  <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-indigo-600" />
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {exp.position || "Position Title"}
                    </h3>
                    <div className="flex justify-between items-baseline">
                      <p className="text-base text-indigo-600 font-semibold">
                        {exp.company || "Company Name"}
                      </p>
                      <span className="text-xs text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
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

        {/* Custom Sections */}
        {resumeData.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="h-1 w-12 bg-indigo-600" />
              <span>{section.title}</span>
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
