import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface ExecutiveSimpleCleanTemplateProps {
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

export const ExecutiveSimpleCleanTemplate = ({
  resumeData,
  themeColor = "#3b82f6",
  editable = false,
}: ExecutiveSimpleCleanTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#3b82f6";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      <div className="mb-8 pb-5 border-b" style={{ borderColor: accent }}>
        <InlineEditableText text={resumeData.personalInfo.fullName} className="text-[36px] font-bold mb-2" style={{ color: accent }} editable={editable} field="resumeData.personalInfo.fullName" />
        <InlineEditableText text={resumeData.personalInfo.title} className="text-[16px] text-gray-700 mb-3 font-medium" editable={editable} field="resumeData.personalInfo.title" />
        <div className="flex gap-3 text-[13px] text-gray-600 flex-wrap">
          <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
          <span>•</span>
          <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
          {resumeData.personalInfo.location && (<><span>•</span><InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" /></>)}
        </div>
      </div>
      {resumeData.personalInfo.summary && (
        <div className="mb-7">
          <h2 className="text-[16px] font-bold mb-3 uppercase" style={{ color: accent }}>Professional Summary</h2>
          <InlineEditableText text={resumeData.personalInfo.summary} className="text-[13px] text-gray-700 leading-relaxed" editable={editable} field="resumeData.personalInfo.summary" />
        </div>
      )}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-7">
          <h2 className="text-[16px] font-bold mb-4 uppercase" style={{ color: accent }}>Work Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <InlineEditableText text={exp.position} className="text-[15px] font-bold" style={{ color: accent }} editable={editable} field={`resumeData.experience[${index}].position`} />
                <InlineEditableDate date={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`} className="text-[12px] text-gray-600" editable={editable} field={`resumeData.experience[${index}].startDate`} />
              </div>
              <InlineEditableText text={exp.company} className="text-[14px] font-semibold text-gray-700 mb-2" editable={editable} field={`resumeData.experience[${index}].company`} />
              <InlineEditableList items={exp.description.split("\n").filter((item) => item.trim())} className="text-[13px] text-gray-700 space-y-1" editable={editable} field={`resumeData.experience[${index}].description`} />
            </div>
          ))}
        </div>
      )}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-7">
          <h2 className="text-[16px] font-bold mb-4 uppercase" style={{ color: accent }}>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <InlineEditableText text={edu.degree} className="text-[15px] font-bold mb-1" style={{ color: accent }} editable={editable} field={`resumeData.education[${index}].degree`} />
              <InlineEditableText text={edu.school} className="text-[14px] font-semibold text-gray-700 mb-1" editable={editable} field={`resumeData.education[${index}].school`} />
              <div className="text-[12px] text-gray-600 flex items-center gap-2">
                <InlineEditableDate date={edu.graduationDate} editable={editable} field={`resumeData.education[${index}].graduationDate`} />
                {edu.gpa && (<><span>•</span><InlineEditableText text={`GPA: ${edu.gpa}`} editable={editable} field={`resumeData.education[${index}].gpa`} /></>)}
              </div>
            </div>
          ))}
        </div>
      )}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-7">
          <h2 className="text-[16px] font-bold mb-4 uppercase" style={{ color: accent }}>Skills</h2>
          <InlineEditableSkills skills={resumeData.skills} editable={editable} themeColor={accent} />
        </div>
      )}
      {resumeData.sections && resumeData.sections.map((section, sectionIndex) => (
        <div key={section.id} className="mb-7 last:mb-0">
          <h2 className="text-[16px] font-bold mb-4 uppercase" style={{ color: accent }}>
            <InlineEditableText text={section.title} editable={editable} field={`resumeData.sections[${sectionIndex}].title`} />
          </h2>
          {section.items?.map((item, itemIndex) => (
            <div key={item.id} className="mb-4 last:mb-0">
              {item.title && <InlineEditableText text={item.title} className="text-[15px] font-bold mb-1" style={{ color: accent }} editable={editable} field={`resumeData.sections[${sectionIndex}].items[${itemIndex}].title`} />}
              {item.subtitle && <InlineEditableText text={item.subtitle} className="text-[14px] font-semibold text-gray-700 mb-1" editable={editable} field={`resumeData.sections[${sectionIndex}].items[${itemIndex}].subtitle`} />}
              {item.description && <InlineEditableList items={item.description.split("\n").filter((line) => line.trim())} className="text-[13px] text-gray-700 space-y-1" editable={editable} field={`resumeData.sections[${sectionIndex}].items[${itemIndex}].description`} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
