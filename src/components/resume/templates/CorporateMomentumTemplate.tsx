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

export const CorporateMomentumTemplate = ({
  resumeData,
  themeColor = "#059669",
  editable = false,
}: TemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10">
      {/* Dynamic Header with Movement */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute -left-10 top-0 bottom-0 w-2" style={{ background: `linear-gradient(to bottom, ${themeColor}, ${themeColor}60)` }}></div>

          <div className="pl-6">
            <InlineEditableText
              text={personalInfo.fullName}
              className="text-6xl font-black mb-2 tracking-tight"
              style={{ color: themeColor }}
              editable={editable}
              field="personalInfo.fullName"
            />
            <InlineEditableText
              text={personalInfo.title}
              className="text-2xl text-gray-600 mb-6 font-light italic"
              editable={editable}
              field="personalInfo.title"
            />

            <div className="flex gap-8 text-sm text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded text-white text-xs" style={{ backgroundColor: themeColor }}>@</span>
                <InlineEditableText text={personalInfo.email} editable={editable} field="personalInfo.email" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded text-white text-xs" style={{ backgroundColor: themeColor }}>📱</span>
                <InlineEditableText text={personalInfo.phone} editable={editable} field="personalInfo.phone" />
              </div>
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded text-white text-xs" style={{ backgroundColor: themeColor }}>📍</span>
                  <InlineEditableText text={personalInfo.location} editable={editable} field="personalInfo.location" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary with Accent */}
      {personalInfo.summary && (
        <div className="mb-8">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-widest" style={{ color: themeColor }}>
              Professional Synopsis
            </h2>
            <InlineEditableText
              text={personalInfo.summary}
              className="text-gray-700 leading-relaxed"
              editable={editable}
              field="personalInfo.summary"
            />
          </div>
        </div>
      )}

      {/* Experience with Momentum Indicators */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <div className="relative pl-6 mb-6">
            <div className="absolute left-0 top-0 w-1 h-8" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
              Career Progression
            </h2>
          </div>
          {experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0 relative pl-8">
              <div className="absolute left-0 top-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: themeColor }}>
                {index + 1}
              </div>
              <div className="border-l-2 pl-6 pb-6 last:pb-0" style={{ borderColor: `${themeColor}30` }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <InlineEditableText
                      text={exp.position}
                      className="text-xl font-bold mb-1"
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
                  <div className="text-sm font-bold px-4 py-2 rounded-lg text-white" style={{ backgroundColor: themeColor }}>
                    <InlineEditableText
                      text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                      editable={editable}
                      field={`experience.${index}.startDate`}
                    />
                  </div>
                </div>
                <InlineEditableList
                  items={exp.description.split("\n").filter((item) => item.trim())}
                  className="text-sm text-gray-700 space-y-2 mt-3"
                  editable={editable}
                  field={`experience.${index}.description`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="col-span-2">
            <div className="relative pl-6 mb-4">
              <div className="absolute left-0 top-0 w-1 h-8" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
                Expertise
              </h2>
            </div>
            <InlineEditableSkills
              skills={skills}
              className="grid grid-cols-3 gap-2.5 pl-6"
              editable={editable}
              renderSkill={(skill) => (
                <div className="px-3 py-2 rounded-lg text-sm font-bold text-center transition-all" style={{ backgroundColor: `${themeColor}15`, color: themeColor, borderLeft: `3px solid ${themeColor}` }}>
                  {skill.name}
                </div>
              )}
            />
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <div className="relative pl-6 mb-4">
              <div className="absolute left-0 top-0 w-1 h-8" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
                Education
              </h2>
            </div>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-4 last:mb-0 pl-6">
                <InlineEditableText
                  text={edu.degree}
                  className="font-bold text-gray-900 block"
                  editable={editable}
                  field={`education.${index}.degree`}
                />
                {edu.field && (
                  <InlineEditableText
                    text={edu.field}
                    className="text-gray-700 block text-sm"
                    editable={editable}
                    field={`education.${index}.field`}
                  />
                )}
                <InlineEditableText
                  text={edu.school}
                  className="text-gray-600 italic block text-sm"
                  editable={editable}
                  field={`education.${index}.school`}
                />
                <InlineEditableText
                  text={`${edu.startDate} - ${edu.endDate}`}
                  className="text-xs text-gray-500 block mt-1"
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
          <div className="relative pl-6 mb-3">
            <div className="absolute left-0 top-0 w-1 h-8" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`sections.${index}.title`}
              />
            </h2>
          </div>
          <InlineEditableText
            text={section.content}
            className="text-gray-700 pl-6"
            editable={editable}
            field={`sections.${index}.content`}
          />
        </div>
      ))}
    </div>
  );
};

export default CorporateMomentumTemplate;
