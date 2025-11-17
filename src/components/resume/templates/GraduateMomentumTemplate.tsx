import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const GraduateMomentumTemplate = ({
  resumeData,
  themeColor = "#0891b2",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2" style={{ borderColor: themeColor }}>
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
        <div className="flex gap-6 text-sm text-gray-700">
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
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-gray-700 leading-relaxed"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
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
                <div className="text-sm text-gray-600 font-medium">
                  <InlineEditableText
                    text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                    editable={editable}
                    field={`resumeData.experience[${index}].startDate`}
                  />
                </div>
              </div>
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-sm text-gray-700 space-y-1.5"
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
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Skills
            </h2>
            <InlineEditableSkills
              skills={resumeData.skills}
              className="grid grid-cols-2 gap-3"
              editable={editable}
              renderSkill={(skill) => (
                <div className="px-3 py-2 rounded text-sm font-medium text-center" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                  {skill.name}
                </div>
              )}
            />
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-4 last:mb-0">
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
                  className="text-sm text-gray-500 block"
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
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
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

export default GraduateMomentumTemplate;
