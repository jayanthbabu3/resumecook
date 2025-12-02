import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface DarkModeDevTemplateProps {
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

export const DarkModeDevTemplate = ({
  resumeData,
  themeColor = "#3b82f6",
  editable = false,
}: DarkModeDevTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#3b82f6";

  return (
    <div className="w-full h-full bg-gray-900 text-gray-100 p-12" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      {/* Header - Dark mode style */}
      <div className="mb-8 pb-6 border-b border-gray-700">
        <div className="text-[13px] text-gray-500 mb-2">// Developer Profile</div>
        <InlineEditableText
          text={resumeData.personalInfo.fullName}
          className="text-[36px] font-bold mb-2"
          style={{ color: accent }}
          editable={editable}
          field="resumeData.personalInfo.fullName"
        />
        <InlineEditableText
          text={resumeData.personalInfo.title}
          className="text-[16px] text-gray-300 mb-4"
          editable={editable}
          field="resumeData.personalInfo.title"
        />
        <div className="flex gap-4 text-[13px] text-gray-400 flex-wrap font-mono">
          <span style={{ color: accent }}>email:</span>
          <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
          <span style={{ color: accent }}>|</span>
          <span style={{ color: accent }}>phone:</span>
          <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
          {resumeData.personalInfo.location && (
            <>
              <span style={{ color: accent }}>|</span>
              <span style={{ color: accent }}>location:</span>
              <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 text-gray-500 font-mono">{'/* About */'}</h2>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-[13px] text-gray-300 leading-relaxed"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-4 text-gray-500 font-mono">{'/* Experience */'}</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0 p-4 bg-gray-800 rounded border border-gray-700">
              <div className="flex justify-between items-baseline mb-2">
                <InlineEditableText
                  text={exp.position}
                  className="text-[15px] font-bold"
                  style={{ color: accent }}
                  editable={editable}
                  field={`resumeData.experience[${index}].position`}
                />
                <InlineEditableDate
                  date={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                  className="text-[12px] text-gray-400 font-mono"
                  editable={editable}
                  field={`resumeData.experience[${index}].startDate`}
                />
              </div>
              <InlineEditableText
                text={exp.company}
                className="text-[14px] text-gray-300 mb-3"
                editable={editable}
                field={`resumeData.experience[${index}].company`}
              />
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-[13px] text-gray-400 space-y-1"
                editable={editable}
                field={`resumeData.experience[${index}].description`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-4 text-gray-500 font-mono">{'/* Education */'}</h2>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="mb-5 last:mb-0 p-4 bg-gray-800 rounded border border-gray-700">
              <InlineEditableText
                text={edu.degree}
                className="text-[15px] font-bold mb-1"
                style={{ color: accent }}
                editable={editable}
                field={`resumeData.education[${index}].degree`}
              />
              <InlineEditableText
                text={edu.school}
                className="text-[14px] text-gray-300 mb-1"
                editable={editable}
                field={`resumeData.education[${index}].school`}
              />
              <div className="text-[12px] text-gray-400 flex items-center gap-2 font-mono">
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

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-4 text-gray-500 font-mono">{'/* Skills */'}</h2>
          <InlineEditableSkills skills={resumeData.skills} editable={editable} themeColor={accent} />
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections &&
        resumeData.sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-8 last:mb-0">
            <h2 className="text-[14px] font-bold mb-4 text-gray-500 font-mono">
              {'/* '}
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`resumeData.sections[${sectionIndex}].title`}
              />
              {' */'}
            </h2>
            {section.items?.map((item, itemIndex) => (
              <div key={item.id} className="mb-5 last:mb-0 p-4 bg-gray-800 rounded border border-gray-700">
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
                    className="text-[14px] text-gray-300 mb-1"
                    editable={editable}
                    field={`resumeData.sections[${sectionIndex}].items[${itemIndex}].subtitle`}
                  />
                )}
                {item.description && (
                  <InlineEditableList
                    items={item.description.split("\n").filter((line) => line.trim())}
                    className="text-[13px] text-gray-400 space-y-1"
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
