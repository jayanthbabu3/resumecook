import React from "react";
import type { ResumeData } from "@/pages/Editor";
import {
  InlineEditableText,
  InlineEditableList,
  InlineEditableSkills,
} from "../";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CorporateEliteTemplate = ({
  resumeData,
  themeColor = "#0f172a",
  editable = false,
}: TemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header with Elegant Top Bar */}
      <div className="h-3" style={{ backgroundColor: themeColor }}></div>

      <div className="p-10">
        {/* Personal Information */}
        <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: `${themeColor}20` }}>
          <InlineEditableText
            text={personalInfo.fullName}
            className="text-4xl font-bold mb-2 tracking-tight"
            style={{ color: themeColor }}
            editable={editable}
            field="personalInfo.fullName"
          />
          <InlineEditableText
            text={personalInfo.title}
            className="text-xl text-gray-600 mb-4 font-light"
            editable={editable}
            field="personalInfo.title"
          />
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <InlineEditableText
              text={personalInfo.email}
              editable={editable}
              field="personalInfo.email"
            />
            <span>•</span>
            <InlineEditableText
              text={personalInfo.phone}
              editable={editable}
              field="personalInfo.phone"
            />
            {personalInfo.location && (
              <>
                <span>•</span>
                <InlineEditableText
                  text={personalInfo.location}
                  editable={editable}
                  field="personalInfo.location"
                />
              </>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: themeColor }}>
              Professional Profile
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: themeColor }}>
              <InlineEditableText
                text={personalInfo.summary}
                className="text-gray-700 leading-relaxed"
                editable={editable}
                field="personalInfo.summary"
              />
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: themeColor }}>
              Professional Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <InlineEditableText
                    text={exp.position}
                    className="text-lg font-bold"
                    style={{ color: themeColor }}
                    editable={editable}
                    field={`experience.${index}.position`}
                  />
                  <div className="text-sm font-medium text-gray-600">
                    <InlineEditableText
                      text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                      editable={editable}
                      field={`experience.${index}.startDate`}
                    />
                  </div>
                </div>
                <InlineEditableText
                  text={exp.company}
                  className="text-base font-semibold text-gray-700 mb-2"
                  editable={editable}
                  field={`experience.${index}.company`}
                />
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

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: themeColor }}>
              Key Skills
            </h2>
            <InlineEditableSkills
              skills={skills}
              className="grid grid-cols-4 gap-2"
              editable={editable}
              renderSkill={(skill) => (
                <div className="px-3 py-2 bg-gray-100 rounded text-sm font-medium text-gray-800 text-center">
                  {skill.name}
                </div>
              )}
            />
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: themeColor }}>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <div>
                    <InlineEditableText
                      text={edu.degree}
                      className="font-bold text-gray-900"
                      editable={editable}
                      field={`education.${index}.degree`}
                    />
                    {edu.field && (
                      <span className="text-gray-700"> - <InlineEditableText
                        text={edu.field}
                        className="inline"
                        editable={editable}
                        field={`education.${index}.field`}
                      /></span>
                    )}
                    <div>
                      <InlineEditableText
                        text={edu.school}
                        className="text-gray-600 italic"
                        editable={editable}
                        field={`education.${index}.school`}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <InlineEditableText
                      text={`${edu.startDate} - ${edu.endDate}`}
                      editable={editable}
                      field={`education.${index}.startDate`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Sections */}
        {sections && sections.length > 0 && sections.map((section, index) => (
          <div key={section.id} className="mb-8 last:mb-0">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: themeColor }}>
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
    </div>
  );
};

export default CorporateEliteTemplate;
