import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherPolaroidStyleTemplateProps {
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

export const FresherPolaroidStyleTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: FresherPolaroidStyleTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#10b981";

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900 p-12">
      {/* Polaroid-style header */}
      <div className="mb-8 bg-white p-6 pb-8 shadow-lg border-8 border-white" style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <div className="border-b-4 pb-4 mb-4" style={{ borderColor: accent }}>
          <InlineEditableText
            text={resumeData.personalInfo.fullName}
            className="text-[36px] font-bold mb-1 text-center"
            style={{ color: accent }}
            editable={editable}
            field="resumeData.personalInfo.fullName"
          />
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-[16px] text-gray-700 font-medium text-center"
            editable={editable}
            field="resumeData.personalInfo.title"
          />
        </div>
        <div className="flex justify-center gap-4 text-[13px] text-gray-600 flex-wrap">
          <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
          <span>•</span>
          <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
          {resumeData.personalInfo.location && (
            <>
              <span>•</span>
              <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
            </>
          )}
        </div>
      </div>

      {/* Summary - Polaroid card */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6 bg-white p-5 pb-6 shadow-md border-4 border-white">
          <h2 className="text-[16px] font-bold mb-3 uppercase tracking-wider text-center pb-2 border-b-2" style={{ color: accent, borderColor: withOpacity(accent, "30") }}>
            About Me
          </h2>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-[13px] text-gray-700 leading-relaxed"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Education - Polaroid card */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-6 bg-white p-5 pb-6 shadow-md border-4 border-white">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider text-center pb-2 border-b-2" style={{ color: accent, borderColor: withOpacity(accent, "30") }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <InlineEditableText
                text={edu.degree}
                className="text-[15px] font-bold mb-1"
                style={{ color: accent }}
                editable={editable}
                field={`resumeData.education[${index}].degree`}
              />
              <InlineEditableText
                text={edu.school}
                className="text-[14px] font-semibold text-gray-700 mb-1"
                editable={editable}
                field={`resumeData.education[${index}].school`}
              />
              <div className="text-[12px] text-gray-600 flex items-center gap-2">
                <InlineEditableDate
                  date={edu.graduationDate}
                  editable={editable}
                  field={`resumeData.education[${index}].graduationDate`}
                />
                {edu.gpa && (
                  <>
                    <span>•</span>
                    <InlineEditableText text={`GPA: ${edu.gpa}`} editable={editable} field={`resumeData.education[${index}].gpa`} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience - Polaroid card */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-6 bg-white p-5 pb-6 shadow-md border-4 border-white">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider text-center pb-2 border-b-2" style={{ color: accent, borderColor: withOpacity(accent, "30") }}>
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <InlineEditableText
                  text={exp.position}
                  className="text-[15px] font-bold"
                  style={{ color: accent }}
                  editable={editable}
                  field={`resumeData.experience[${index}].position`}
                />
                <InlineEditableDate
                  date={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                  className="text-[12px] text-gray-600"
                  editable={editable}
                  field={`resumeData.experience[${index}].startDate`}
                />
              </div>
              <InlineEditableText
                text={exp.company}
                className="text-[14px] font-semibold text-gray-700 mb-2"
                editable={editable}
                field={`resumeData.experience[${index}].company`}
              />
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-[13px] text-gray-700 space-y-1"
                editable={editable}
                field={`resumeData.experience[${index}].description`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Skills - Polaroid card */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6 bg-white p-5 pb-6 shadow-md border-4 border-white">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider text-center pb-2 border-b-2" style={{ color: accent, borderColor: withOpacity(accent, "30") }}>
            Skills
          </h2>
          <InlineEditableSkills skills={resumeData.skills} editable={editable} themeColor={accent} />
        </div>
      )}

      {/* Custom Sections - Polaroid cards */}
      {resumeData.sections &&
        resumeData.sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-6 last:mb-0 bg-white p-5 pb-6 shadow-md border-4 border-white">
            <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider text-center pb-2 border-b-2" style={{ color: accent, borderColor: withOpacity(accent, "30") }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`resumeData.sections[${sectionIndex}].title`}
              />
            </h2>
            {section.items?.map((item, itemIndex) => (
              <div key={item.id} className="mb-5 last:mb-0">
                {item.title && (
                  <InlineEditableText
                    text={item.title}
                    className="text-[15px] font-bold mb-1"
                    style={{ color: accent }}
                    editable={editable}
                    field={`resumeData.sections[${sectionIndex}].items[${itemIndex}].title`}
                  />
                )}
                {item.subtitle && (
                  <InlineEditableText
                    text={item.subtitle}
                    className="text-[14px] font-semibold text-gray-700 mb-1"
                    editable={editable}
                    field={`resumeData.sections[${sectionIndex}].items[${itemIndex}].subtitle`}
                  />
                )}
                {item.description && (
                  <InlineEditableList
                    items={item.description.split("\n").filter((line) => line.trim())}
                    className="text-[13px] text-gray-700 space-y-1"
                    editable={editable}
                    field={`resumeData.sections[${sectionIndex}].items[${itemIndex}].description`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
