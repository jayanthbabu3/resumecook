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

export const GraduatePrimeTemplate = ({
  resumeData,
  themeColor = "#dc2626",
  editable = false,
}: TemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2" style={{ borderColor: themeColor }}>
        <InlineEditableText
          text={personalInfo.fullName}
          className="text-5xl font-bold mb-2"
          style={{ color: themeColor }}
          editable={editable}
          field="personalInfo.fullName"
        />
        <InlineEditableText
          text={personalInfo.title}
          className="text-2xl text-gray-600 mb-4 font-light"
          editable={editable}
          field="personalInfo.title"
        />
        <div className="flex gap-6 text-sm text-gray-700">
          <InlineEditableText text={personalInfo.email} editable={editable} field="personalInfo.email" />
          <span>•</span>
          <InlineEditableText text={personalInfo.phone} editable={editable} field="personalInfo.phone" />
          {personalInfo.location && (
            <>
              <span>•</span>
              <InlineEditableText text={personalInfo.location} editable={editable} field="personalInfo.location" />
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          <InlineEditableText
            text={personalInfo.summary}
            className="text-gray-700 leading-relaxed"
            editable={editable}
            field="personalInfo.summary"
          />
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div className="flex-1">
                  <InlineEditableText
                    text={exp.position}
                    className="text-lg font-bold"
                    style={{ color: themeColor }}
                    editable={editable}
                    field={`experience.${index}.position`}
                  />
                  <InlineEditableText
                    text={exp.company}
                    className="text-base font-semibold text-gray-700"
                    editable={editable}
                    field={`experience.${index}.company`}
                  />
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  <InlineEditableText
                    text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                    editable={editable}
                    field={`experience.${index}.startDate`}
                  />
                </div>
              </div>
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-sm text-gray-700 space-y-1.5"
                editable={editable}
                field={`experience.${index}.description`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Skills
            </h2>
            <InlineEditableSkills
              skills={skills}
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
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <InlineEditableText
                  text={edu.degree}
                  className="font-bold text-gray-900 block"
                  editable={editable}
                  field={`education.${index}.degree`}
                />
                {edu.field && (
                  <InlineEditableText
                    text={edu.field}
                    className="text-gray-700 block"
                    editable={editable}
                    field={`education.${index}.field`}
                  />
                )}
                <InlineEditableText
                  text={edu.school}
                  className="text-gray-600 italic block"
                  editable={editable}
                  field={`education.${index}.school`}
                />
                <InlineEditableText
                  text={`${edu.startDate} - ${edu.endDate}`}
                  className="text-sm text-gray-500 block"
                  editable={editable}
                  field={`education.${index}.startDate`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Sections */}
      {sections && sections.length > 0 && sections.map((section, index) => (
        <div key={section.id} className="mt-8">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            <InlineEditableText
              text={section.title}
              editable={editable}
              field={`sections.${index}.title`}
            />
          </h2>
          <InlineEditableText
            text={section.content}
            className="text-gray-700"
            editable={editable}
            field={`sections.${index}.content`}
          />
        </div>
      ))}
    </div>
  );
};

export default GraduatePrimeTemplate;
