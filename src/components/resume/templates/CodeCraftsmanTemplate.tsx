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

export const CodeCraftsmanTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-gray-900 text-gray-100 p-10 font-mono">
      {/* Code-style Header */}
      <div className="mb-8 border-l-4 pl-6" style={{ borderColor: themeColor }}>
        <div className="text-gray-500 text-sm mb-2">{'// Developer Profile'}</div>
        <InlineEditableText
          text={resumeData.personalInfo.fullName}
          className="text-5xl font-bold mb-2"
          style={{ color: themeColor }}
          editable={editable}
          field="resumeData.personalInfo.fullName"
        />
        <div className="text-gray-500 mb-4">
          <span className="text-blue-400">const</span> <span className="text-yellow-400">role</span> = <InlineEditableText text={`"${resumeData.personalInfo.title}"`} className="text-green-400 inline" editable={editable} field="resumeData.personalInfo.title" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">email:</span> <InlineEditableText text={resumeData.personalInfo.email} className="text-blue-400 inline" editable={editable} field="resumeData.personalInfo.email" />
          </div>
          <div>
            <span className="text-gray-500">phone:</span> <InlineEditableText text={resumeData.personalInfo.phone} className="text-blue-400 inline" editable={editable} field="resumeData.personalInfo.phone" />
          </div>
          {resumeData.personalInfo.location && (
            <div>
              <span className="text-gray-500">location:</span> <InlineEditableText text={resumeData.personalInfo.location} className="text-blue-400 inline" editable={editable} field="resumeData.personalInfo.location" />
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3" style={{ color: themeColor }}>
            {'/* ABOUT */'}</h2>
          <div className="pl-6 border-l-2 border-gray-700">
            <InlineEditableText
              text={resumeData.personalInfo.summary}
              className="text-gray-300 leading-relaxed"
              editable={editable}
              field="resumeData.personalInfo.summary"
            />
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4" style={{ color: themeColor }}>
            {'/* EXPERIENCE */'}</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0 pl-6 border-l-2 border-gray-700">
              <div className="flex justify-between items-baseline mb-2">
                <div className="flex-1">
                  <InlineEditableText
                    text={exp.position}
                    className="text-xl font-bold"
                    style={{ color: themeColor }}
                    editable={editable}
                    field={`resumeData.experience[${index}].position`}
                  />
                  <div className="text-gray-400">
                    <span className="text-purple-400">@</span> <InlineEditableText text={exp.company} className="inline" editable={editable} field={`resumeData.experience[${index}].company`} />
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <InlineEditableText
                    text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                    editable={editable}
                    field={`resumeData.experience[${index}].startDate`}
                  />
                </div>
              </div>
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-sm text-gray-300 space-y-1"
                editable={editable}
                field={`resumeData.experience[${index}].description`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="col-span-2">
            <h2 className="text-lg font-bold mb-4" style={{ color: themeColor }}>
              {'/* TECH STACK */'}</h2>
            <InlineEditableSkills
              skills={resumeData.skills}
              className="grid grid-cols-4 gap-2"
              editable={editable}
              renderSkill={(skill) => (
                <div className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-xs font-medium text-center" style={{ color: themeColor }}>
                  {skill.name}
                </div>
              )}
            />
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: themeColor }}>
              {'/* EDUCATION */'}</h2>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-4 last:mb-0 text-sm">
                <InlineEditableText
                  text={edu.degree}
                  className="font-bold block text-gray-200"
                  editable={editable}
                  field={`resumeData.education[${index}].degree`}
                />
                {edu.field && (
                  <InlineEditableText
                    text={edu.field}
                    className="text-gray-400 block"
                    editable={editable}
                    field={`resumeData.education[${index}].field`}
                  />
                )}
                <InlineEditableText
                  text={edu.school}
                  className="text-gray-500 block"
                  editable={editable}
                  field={`resumeData.education[${index}].school`}
                />
                <InlineEditableText
                  text={`${edu.startDate} - ${edu.endDate}`}
                  className="text-xs text-gray-600 block"
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
          <h2 className="text-lg font-bold mb-3" style={{ color: themeColor }}>
            {'/* '}<InlineEditableText text={section.title.toUpperCase()} editable={editable} field={`resumeData.sections.${index}.title`} className="inline" />{' */'}
          </h2>
          <div className="pl-6 border-l-2 border-gray-700">
            <InlineEditableText
              text={section.content}
              className="text-gray-300"
              editable={editable}
              field={`resumeData.sections.${index}.content`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodeCraftsmanTemplate;
