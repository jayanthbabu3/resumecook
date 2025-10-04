import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
}

export const ResumePreview = ({ resumeData, templateId }: ResumePreviewProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white p-12 text-gray-900" id="resume-preview">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {resumeData.personalInfo.fullName || "Your Name"}
        </h1>
        {resumeData.personalInfo.title && (
          <p className="text-xl text-blue-600 font-medium mb-4">
            {resumeData.personalInfo.title}
          </p>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
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
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.position || "Position Title"}
                    </h3>
                    <p className="text-base text-blue-600 font-medium">
                      {exp.company || "Company Name"}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
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

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-base text-blue-600 font-medium">
                      {edu.school || "School Name"}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              skill && (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              )
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections.map((section) => (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {section.title}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  );
};
