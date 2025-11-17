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

export const ProfessionalAscendTemplate = ({
  resumeData,
  themeColor = "#7c2d12",
  editable = false,
}: TemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Ascending Header Design */}
      <div className="relative p-12 mb-8" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 100%)` }}>
        <div className="text-white">
          <InlineEditableText
            text={personalInfo.fullName}
            className="text-6xl font-black mb-3 tracking-tight"
            editable={editable}
            field="personalInfo.fullName"
          />
          <InlineEditableText
            text={personalInfo.title}
            className="text-3xl font-light mb-6"
            editable={editable}
            field="personalInfo.title"
          />
          <div className="flex gap-6 text-sm font-medium opacity-95">
            <InlineEditableText text={personalInfo.email} editable={editable} field="personalInfo.email" />
            <span>|</span>
            <InlineEditableText text={personalInfo.phone} editable={editable} field="personalInfo.phone" />
            {personalInfo.location && (
              <>
                <span>|</span>
                <InlineEditableText text={personalInfo.location} editable={editable} field="personalInfo.location" />
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white"></div>
      </div>

      <div className="px-12 pb-12">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            <div className="pl-6 border-l-4" style={{ borderColor: themeColor }}>
              <InlineEditableText
                text={personalInfo.summary}
                className="text-gray-700 leading-relaxed text-base"
                editable={editable}
                field="personalInfo.summary"
              />
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 uppercase" style={{ color: themeColor }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-8 border-l-4" style={{ borderColor: `${themeColor}30` }}>
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: themeColor }}></div>

                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <InlineEditableText
                        text={exp.position}
                        className="text-xl font-bold block"
                        style={{ color: themeColor }}
                        editable={editable}
                        field={`experience.${index}.position`}
                      />
                      <InlineEditableText
                        text={exp.company}
                        className="text-lg font-semibold text-gray-700"
                        editable={editable}
                        field={`experience.${index}.company`}
                      />
                    </div>
                    <div className="text-sm font-bold text-gray-600">
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
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
                Skills & Expertise
              </h2>
              <InlineEditableSkills
                skills={skills}
                className="space-y-3"
                editable={editable}
                renderSkill={(skill) => (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: themeColor }}></div>
                    <span className="text-sm font-semibold text-gray-800">{skill.name}</span>
                  </div>
                )}
              />
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={edu.id} className="mb-5 last:mb-0 pb-5 last:pb-0 border-b last:border-0" style={{ borderColor: `${themeColor}20` }}>
                  <InlineEditableText
                    text={edu.degree}
                    className="font-bold text-gray-900 block text-base"
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
                    className="text-gray-600 block"
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
          <div key={section.id} className="mt-8">
            <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`sections.${index}.title`}
              />
            </h2>
            <div className="pl-6 border-l-4" style={{ borderColor: themeColor }}>
              <InlineEditableText
                text={section.content}
                className="text-gray-700"
                editable={editable}
                field={`sections.${index}.content`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalAscendTemplate;
