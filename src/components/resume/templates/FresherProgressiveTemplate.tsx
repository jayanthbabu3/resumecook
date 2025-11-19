import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherProgressiveTemplateProps {
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

export const FresherProgressiveTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: FresherProgressiveTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#10b981";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Progressive header bar */}
      <div className="mb-8">
        <div className="h-2 mb-6 rounded-full overflow-hidden bg-gray-200">
          <div className="h-full w-1/3" style={{ backgroundColor: accent }}></div>
        </div>

        <InlineEditableText
          text={resumeData.personalInfo.fullName}
          className="text-[40px] font-bold mb-2"
          style={{ color: accent }}
          editable={editable}
          field="resumeData.personalInfo.fullName"
        />
        <InlineEditableText
          text={resumeData.personalInfo.title}
          className="text-[18px] text-gray-700 mb-4 font-semibold"
          editable={editable}
          field="resumeData.personalInfo.title"
        />
        <div className="flex gap-4 text-[13px] text-gray-600 flex-wrap">
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
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: accent }}>
              1
            </div>
            <h2 className="text-[16px] font-bold uppercase tracking-wider" style={{ color: accent }}>
              Profile
            </h2>
          </div>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-[13px] text-gray-700 leading-relaxed ml-11"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: accent }}>
              2
            </div>
            <h2 className="text-[16px] font-bold uppercase tracking-wider" style={{ color: accent }}>
              Education
            </h2>
          </div>
          <div className="ml-11">
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
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: accent }}>
              3
            </div>
            <h2 className="text-[16px] font-bold uppercase tracking-wider" style={{ color: accent }}>
              Experience
            </h2>
          </div>
          <div className="ml-11">
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
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: accent }}>
              4
            </div>
            <h2 className="text-[16px] font-bold uppercase tracking-wider" style={{ color: accent }}>
              Skills
            </h2>
          </div>
          <div className="ml-11">
            <InlineEditableSkills skills={resumeData.skills} editable={editable} themeColor={accent} />
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections &&
        resumeData.sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-8 last:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: accent }}>
                {5 + sectionIndex}
              </div>
              <h2 className="text-[16px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                <InlineEditableText
                  text={section.title}
                  editable={editable}
                  field={`resumeData.sections[${sectionIndex}].title`}
                />
              </h2>
            </div>
            <div className="ml-11">
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
          </div>
        ))}
    </div>
  );
};
