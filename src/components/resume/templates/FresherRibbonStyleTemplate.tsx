import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherRibbonStyleTemplateProps {
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

export const FresherRibbonStyleTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: FresherRibbonStyleTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#10b981";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 relative">
      {/* Ribbon corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
        <div className="absolute top-6 -right-6 w-32 h-8 transform rotate-45" style={{ backgroundColor: accent }}></div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <InlineEditableText
          text={resumeData.personalInfo.fullName}
          className="text-[40px] font-black mb-2 uppercase"
          style={{ color: accent }}
          editable={editable}
          field="resumeData.personalInfo.fullName"
        />
        <div className="inline-block px-6 py-2 relative" style={{ backgroundColor: accent }}>
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-[17px] text-white font-bold"
            editable={editable}
            field="resumeData.personalInfo.title"
          />
          <div className="absolute -right-2 top-0 w-0 h-0 border-t-[19px] border-b-[19px] border-l-[8px]" style={{ borderLeftColor: accent, borderTopColor: "transparent", borderBottomColor: "transparent" }}></div>
        </div>
        <div className="flex gap-4 text-[13px] text-gray-600 flex-wrap mt-4">
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

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <div className="inline-block px-4 py-1 mb-3 text-white font-bold text-[14px] uppercase tracking-wider relative" style={{ backgroundColor: accent }}>
            Profile
            <div className="absolute -right-2 top-0 w-0 h-0 border-t-[14px] border-b-[14px] border-l-[8px]" style={{ borderLeftColor: accent, borderTopColor: "transparent", borderBottomColor: "transparent" }}></div>
          </div>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-[13px] text-gray-700 leading-relaxed"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <div className="inline-block px-4 py-1 mb-4 text-white font-bold text-[14px] uppercase tracking-wider relative" style={{ backgroundColor: accent }}>
            Education
            <div className="absolute -right-2 top-0 w-0 h-0 border-t-[14px] border-b-[14px] border-l-[8px]" style={{ borderLeftColor: accent, borderTopColor: "transparent", borderBottomColor: "transparent" }}></div>
          </div>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="mb-5 last:mb-0">
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

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <div className="inline-block px-4 py-1 mb-4 text-white font-bold text-[14px] uppercase tracking-wider relative" style={{ backgroundColor: accent }}>
            Experience
            <div className="absolute -right-2 top-0 w-0 h-0 border-t-[14px] border-b-[14px] border-l-[8px]" style={{ borderLeftColor: accent, borderTopColor: "transparent", borderBottomColor: "transparent" }}></div>
          </div>
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

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <div className="inline-block px-4 py-1 mb-4 text-white font-bold text-[14px] uppercase tracking-wider relative" style={{ backgroundColor: accent }}>
            Skills
            <div className="absolute -right-2 top-0 w-0 h-0 border-t-[14px] border-b-[14px] border-l-[8px]" style={{ borderLeftColor: accent, borderTopColor: "transparent", borderBottomColor: "transparent" }}></div>
          </div>
          <InlineEditableSkills skills={resumeData.skills} editable={editable} themeColor={accent} />
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections &&
        resumeData.sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-8 last:mb-0">
            <div className="inline-block px-4 py-1 mb-4 text-white font-bold text-[14px] uppercase tracking-wider relative" style={{ backgroundColor: accent }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`resumeData.sections[${sectionIndex}].title`}
              />
              <div className="absolute -right-2 top-0 w-0 h-0 border-t-[14px] border-b-[14px] border-l-[8px]" style={{ borderLeftColor: accent, borderTopColor: "transparent", borderBottomColor: "transparent" }}></div>
            </div>
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
