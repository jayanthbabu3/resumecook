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

export const ProfessionalZenithTemplate = ({
  resumeData,
  themeColor = "#ea580c",
  editable = false,
}: TemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10">
      {/* Zenith Peak Header */}
      <div className="relative mb-10">
        <div className="text-center">
          <div className="inline-block mb-3">
            <div className="w-20 h-1 mx-auto mb-2" style={{ backgroundColor: themeColor }}></div>
            <InlineEditableText
              text={personalInfo.fullName}
              className="text-6xl font-black tracking-tighter"
              style={{ color: themeColor }}
              editable={editable}
              field="personalInfo.fullName"
            />
            <div className="w-20 h-1 mx-auto mt-2" style={{ backgroundColor: themeColor }}></div>
          </div>

          <InlineEditableText
            text={personalInfo.title}
            className="text-3xl text-gray-600 mb-6 font-light block"
            editable={editable}
            field="personalInfo.title"
          />

          <div className="flex justify-center gap-6 text-sm font-medium">
            <div className="px-4 py-2 rounded-full" style={{ backgroundColor: `${themeColor}15` }}>
              <InlineEditableText text={personalInfo.email} editable={editable} field="personalInfo.email" />
            </div>
            <div className="px-4 py-2 rounded-full" style={{ backgroundColor: `${themeColor}15` }}>
              <InlineEditableText text={personalInfo.phone} editable={editable} field="personalInfo.phone" />
            </div>
            {personalInfo.location && (
              <div className="px-4 py-2 rounded-full" style={{ backgroundColor: `${themeColor}15` }}>
                <InlineEditableText text={personalInfo.location} editable={editable} field="personalInfo.location" />
              </div>
            )}
          </div>
        </div>

        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-block w-16 h-1 mb-2" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Professional Excellence
            </h2>
            <div className="inline-block w-16 h-1 mt-2" style={{ backgroundColor: themeColor }}></div>
          </div>
          <InlineEditableText
            text={personalInfo.summary}
            className="text-gray-700 leading-relaxed text-center text-lg"
            editable={editable}
            field="personalInfo.summary"
          />
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-10">
          <div className="text-center mb-8">
            <div className="inline-block w-16 h-1 mb-2" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-3xl font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Career Milestones
            </h2>
            <div className="inline-block w-16 h-1 mt-2" style={{ backgroundColor: themeColor }}></div>
          </div>

          {experience.map((exp, index) => (
            <div key={exp.id} className="mb-8 last:mb-0 max-w-5xl mx-auto">
              <div className="text-center mb-4">
                <InlineEditableText
                  text={exp.position}
                  className="text-2xl font-bold block mb-2"
                  style={{ color: themeColor }}
                  editable={editable}
                  field={`experience.${index}.position`}
                />
                <InlineEditableText
                  text={exp.company}
                  className="text-xl font-semibold text-gray-700 block mb-2"
                  editable={editable}
                  field={`experience.${index}.company`}
                />
                <div className="inline-block px-5 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: themeColor }}>
                  <InlineEditableText
                    text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                    editable={editable}
                    field={`experience.${index}.startDate`}
                  />
                </div>
              </div>
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-sm text-gray-700 space-y-2 text-center max-w-3xl mx-auto"
                editable={editable}
                field={`experience.${index}.description`}
              />
              <div className="w-12 h-1 mx-auto mt-6" style={{ backgroundColor: `${themeColor}30` }}></div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-block w-12 h-1 mb-2" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-2xl font-bold uppercase tracking-wider" style={{ color: themeColor }}>
                Expertise
              </h2>
              <div className="inline-block w-12 h-1 mt-2" style={{ backgroundColor: themeColor }}></div>
            </div>
            <InlineEditableSkills
              skills={skills}
              className="grid grid-cols-2 gap-3"
              editable={editable}
              renderSkill={(skill) => (
                <div className="px-4 py-3 rounded-xl text-center font-bold text-sm border-2" style={{ borderColor: themeColor, color: themeColor }}>
                  {skill.name}
                </div>
              )}
            />
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-block w-12 h-1 mb-2" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-2xl font-bold uppercase tracking-wider" style={{ color: themeColor }}>
                Education
              </h2>
              <div className="inline-block w-12 h-1 mt-2" style={{ backgroundColor: themeColor }}></div>
            </div>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-5 last:mb-0 text-center p-4 rounded-xl" style={{ backgroundColor: `${themeColor}08` }}>
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
                  className="text-sm text-gray-500 block mt-1"
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
        <div key={section.id} className="mt-10">
          <div className="text-center mb-6">
            <div className="inline-block w-12 h-1 mb-2" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`sections.${index}.title`}
              />
            </h2>
            <div className="inline-block w-12 h-1 mt-2" style={{ backgroundColor: themeColor }}></div>
          </div>
          <InlineEditableText
            text={section.content}
            className="text-gray-700 text-center max-w-3xl mx-auto"
            editable={editable}
            field={`sections.${index}.content`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfessionalZenithTemplate;
