import React from "react";
import type { ResumeData } from "@/pages/Editor";
import {
  InlineEditableText,
  InlineEditableList,
  InlineEditableSkills,
} from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ExecutivePrimeTemplate = ({
  resumeData,
  themeColor = "#1e40af",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white text-gray-900 p-10">
      {/* Premium Header with Badge */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b-4" style={{ borderColor: themeColor }}>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <InlineEditableText
              text={resumeData.personalInfo.fullName}
              className="text-5xl font-bold"
              style={{ color: themeColor }}
              editable={editable}
              field="resumeData.personalInfo.fullName"
            />
            <div className="px-4 py-2 rounded-full text-xs font-bold text-white" style={{ backgroundColor: themeColor }}>
              PRIME
            </div>
          </div>
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-2xl text-gray-600 font-light mb-4"
            editable={editable}
            field="resumeData.personalInfo.title"
          />
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
            </div>
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: `${themeColor}08`, borderLeft: `6px solid ${themeColor}` }}>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: themeColor }}>
            Executive Summary
          </h2>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-gray-700 leading-relaxed text-base"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: themeColor }}>
            Leadership Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0 p-5 rounded-xl bg-white shadow-sm border-l-4" style={{ borderColor: themeColor }}>
              <div className="flex justify-between items-baseline mb-2">
                <InlineEditableText
                  text={exp.position}
                  className="text-xl font-bold"
                  style={{ color: themeColor }}
                  editable={editable}
                  field={`resumeData.experience[${index}].position`}
                />
                <div className="text-sm font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: themeColor }}>
                  <InlineEditableText
                    text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                    editable={editable}
                    field={`resumeData.experience[${index}].startDate`}
                  />
                </div>
              </div>
              <InlineEditableText
                text={exp.company}
                className="text-lg font-semibold text-gray-700 mb-3"
                editable={editable}
                field={`resumeData.experience[${index}].company`}
              />
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-sm text-gray-700 space-y-2"
                editable={editable}
                field={`resumeData.experience[${index}].description`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-5 gap-6">
        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Core Competencies
            </h2>
            <InlineEditableSkills
              skills={resumeData.skills}
              className="grid grid-cols-3 gap-3"
              editable={editable}
              renderSkill={(skill) => (
                <div className="px-4 py-3 rounded-lg text-center font-semibold text-sm" style={{ backgroundColor: `${themeColor}12`, color: themeColor }}>
                  {skill.name}
                </div>
              )}
            />
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-4 last:mb-0 p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                <InlineEditableText
                  text={edu.degree}
                  className="font-bold text-gray-900 block text-sm"
                  editable={editable}
                  field={`resumeData.education[${index}].degree`}
                />
                {edu.field && (
                  <InlineEditableText
                    text={edu.field}
                    className="text-gray-700 block text-sm"
                    editable={editable}
                    field={`resumeData.education[${index}].field`}
                  />
                )}
                <InlineEditableText
                  text={edu.school}
                  className="text-gray-600 italic block text-sm"
                  editable={editable}
                  field={`resumeData.education[${index}].school`}
                />
                <InlineEditableText
                  text={`${edu.startDate} - ${edu.endDate}`}
                  className="text-xs text-gray-500 block mt-1"
                  editable={editable}
                  field={`resumeData.education[${index}].startDate`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && resumeData.sections.map((section, index) => (
        <div key={section.id} className="mt-8">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
            <InlineEditableText
              text={section.title}
              editable={editable}
              field={`resumeData.sections.${index}.title`}
            />
          </h2>
          <InlineEditableText
            text={section.content}
            className="text-gray-700"
            editable={editable}
            field={`resumeData.sections.${index}.content`}
          />
        </div>
      ))}
    </div>
  );
};

export default ExecutivePrimeTemplate;
