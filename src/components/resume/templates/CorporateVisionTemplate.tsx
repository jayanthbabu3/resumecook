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

export const CorporateVisionTemplate = ({
  resumeData,
  themeColor = "#115e59",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header with Diagonal Accent */}
      <div className="relative p-10 mb-6" style={{ backgroundColor: `${themeColor}05` }}>
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: themeColor }}></div>
        <div className="text-center pt-4">
          <InlineEditableText
            text={resumeData.personalInfo.fullName}
            className="text-5xl font-bold mb-2"
            style={{ color: themeColor }}
            editable={editable}
            field="resumeData.personalInfo.fullName"
          />
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-2xl text-gray-600 mb-4 font-light"
            editable={editable}
            field="resumeData.personalInfo.title"
          />
          <div className="flex justify-center items-center gap-3 text-sm flex-wrap">
            <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" className="px-3 py-1 bg-white rounded" />
            <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" className="px-3 py-1 bg-white rounded" />
            {resumeData.personalInfo.location && (
              <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" className="px-3 py-1 bg-white rounded" />
            )}
          </div>
        </div>
      </div>

      <div className="px-10 pb-10">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: `${themeColor}05`, borderLeft: `4px solid ${themeColor}` }}>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: themeColor }}>
              Vision Statement
            </h2>
            <InlineEditableText
              text={resumeData.personalInfo.summary}
              className="text-gray-700 leading-relaxed italic"
              editable={editable}
              field="resumeData.personalInfo.summary"
            />
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
                Career Journey
              </h2>
              <div className="flex-1 h-1" style={{ backgroundColor: themeColor }}></div>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-6 last:mb-0 relative pl-8">
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}` }}></div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <InlineEditableText
                      text={exp.position}
                      className="text-lg font-bold"
                      style={{ color: themeColor }}
                      editable={editable}
                      field={`resumeData.experience[${index}].position`}
                    />
                    <InlineEditableText
                      text={exp.company}
                      className="text-base font-semibold text-gray-700"
                      editable={editable}
                      field={`resumeData.experience[${index}].company`}
                    />
                  </div>
                  <div className="px-3 py-1 rounded text-sm font-medium text-white" style={{ backgroundColor: themeColor }}>
                    <InlineEditableText
                      text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                      editable={editable}
                      field={`resumeData.experience[${index}].startDate`}
                    />
                  </div>
                </div>
                <InlineEditableList
                  items={exp.description.split("\n").filter((item) => item.trim())}
                  className="text-sm text-gray-700 space-y-1.5 mt-2"
                  editable={editable}
                  field={`resumeData.experience[${index}].description`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
                  Core Competencies
                </h2>
                <div className="flex-1 h-1" style={{ backgroundColor: themeColor }}></div>
              </div>
              <InlineEditableSkills
                skills={resumeData.skills}
                className="grid grid-cols-2 gap-2"
                editable={editable}
                renderSkill={(skill) => (
                  <div className="px-3 py-2 rounded-lg border-2 text-sm font-medium text-center" style={{ borderColor: themeColor, color: themeColor }}>
                    {skill.name}
                  </div>
                )}
              />
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
                  Education
                </h2>
                <div className="flex-1 h-1" style={{ backgroundColor: themeColor }}></div>
              </div>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-4 last:mb-0 p-4 rounded-lg" style={{ backgroundColor: `${themeColor}05` }}>
                  <InlineEditableText
                    text={edu.degree}
                    className="font-bold text-gray-900 block"
                    editable={editable}
                    field={`resumeData.education[${index}].degree`}
                  />
                  {edu.field && (
                    <InlineEditableText
                      text={edu.field}
                      className="text-gray-700 block"
                      editable={editable}
                      field={`resumeData.education[${index}].field`}
                    />
                  )}
                  <InlineEditableText
                    text={edu.school}
                    className="text-gray-600 italic block"
                    editable={editable}
                    field={`resumeData.education[${index}].school`}
                  />
                  <InlineEditableText
                    text={`${edu.startDate} - ${edu.endDate}`}
                    className="text-sm text-gray-500 block mt-1"
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
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
                <InlineEditableText
                  text={section.title}
                  editable={editable}
                  field={`resumeData.sections.${index}.title`}
                />
              </h2>
              <div className="flex-1 h-1" style={{ backgroundColor: themeColor }}></div>
            </div>
            <InlineEditableText
              text={section.content}
              className="text-gray-700"
              editable={editable}
              field={`resumeData.sections.${index}.content`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporateVisionTemplate;
