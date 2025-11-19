import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const BackendTemplate = ({ resumeData, themeColor = "#374151", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const fontFamily = `"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif`;
  const accent = normalizeHex(themeColor) ?? "#374151";
  const accentBorder = withOpacity(accent, "33") ?? "#d1d5db";

  return (
    <div
      className="w-full min-h-[297mm] bg-white text-gray-900 text-[13px] leading-relaxed"
      style={{ fontFamily }}
    >
      {/* Header Section - Minimal with subtle accent */}
      <div
        className="px-12 pt-10 pb-8"
        style={{ borderBottom: `2px solid ${accent}` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName}
                    placeholder="Your Name"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.fullName
                )}
              </h1>
              <p className="text-[13px] font-semibold text-gray-600">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    placeholder="Professional Title"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>
            </div>
            <ProfilePhoto src={photo} borderClass="border-2" />
          </div>
          
          {/* Contact Info */}
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-gray-600">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-7">
            <h2
              className="text-[13px] font-semibold mb-3 text-gray-900 uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentBorder }}
            >
              Professional Summary
            </h2>
            <p className="text-[12.5px] text-gray-700 leading-[1.7]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  placeholder="Professional Summary"
                  multiline
                  as="span"
                />
              ) : (
                resumeData.personalInfo.summary
              )}
            </p>
          </div>
        )}

        {/* Technical Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-7">
            <h2
              className="text-[13px] font-semibold mb-3 text-gray-900 uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentBorder }}
            >
              Technical Skills
            </h2>
            <div className="text-[12.5px] text-gray-700 leading-[1.7]">
              {resumeData.skills.map(skill => skill.name).join(" • ")}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-7">
            <h2
              className="text-[13px] font-semibold mb-3 text-gray-900 uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentBorder }}
            >
              Professional Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-5 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-[12.5px] font-medium text-gray-700">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                <p className="text-[12.5px] text-gray-600 leading-[1.7] whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-7">
            <h2
              className="text-[13px] font-semibold mb-3 text-gray-900 uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentBorder }}
            >
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[13px] font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-[12px] text-gray-600">{edu.field}</p>
                    )}
                    <p className="text-[12.5px] text-gray-700">{edu.school}</p>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
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
            <div key={index} className="mb-7">
              <h2
                className="text-[13px] font-semibold mb-3 text-gray-900 uppercase tracking-wide border-b pb-1"
                style={{ borderColor: accentBorder }}
              >
                {section.title}
              </h2>
              <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-wrap">
                {section.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
