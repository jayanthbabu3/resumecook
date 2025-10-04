import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

export const MinimalTemplate = ({ resumeData }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white px-16 py-12 text-gray-900" style={{ pageBreakAfter: 'auto' }}>
      {/* Header */}
      <div className="mb-8 text-center max-w-4xl mx-auto" style={{ pageBreakAfter: 'avoid', pageBreakInside: 'avoid' }}>
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
          {resumeData.personalInfo.fullName || "Your Name"}
        </h1>
        {resumeData.personalInfo.title && (
          <p className="text-base text-gray-600 font-light mb-4 tracking-wide">
            {resumeData.personalInfo.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          {resumeData.personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {resumeData.personalInfo.email}
            </span>
          )}
          {resumeData.personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {resumeData.personalInfo.phone}
            </span>
          )}
          {resumeData.personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {resumeData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
          <p className="text-sm text-gray-700 leading-relaxed font-light">
            {resumeData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 mb-5 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Experience
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0" style={{ pageBreakInside: 'avoid' }}>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {exp.position || "Position Title"}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      {exp.company || "Company Name"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                    {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line">
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
          <h2 className="text-xs font-semibold text-gray-900 mb-5 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Education
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {resumeData.education.map((edu) => (
              <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {edu.degree || "Degree"} {edu.field && `, ${edu.field}`}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      {edu.school || "School Name"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 font-light max-w-4xl mx-auto">
            {resumeData.skills.map((skill, index) => (
              skill && (
                <span key={index}>
                  {skill}
                </span>
              )
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections.map((section) => (
        <div key={section.id} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            {section.title}
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line max-w-4xl mx-auto">
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};
