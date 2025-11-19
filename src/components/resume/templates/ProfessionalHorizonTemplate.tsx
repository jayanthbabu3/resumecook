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

export const ProfessionalHorizonTemplate = ({
  resumeData,
  themeColor = "#0891b2",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header with Horizontal Lines */}
      <div className="relative">
        <div className="h-1" style={{ backgroundColor: themeColor }}></div>
        <div className="h-2" style={{ backgroundColor: `${themeColor}40` }}></div>

        <div className="p-10 pb-6">
          <InlineEditableText
            text={resumeData.personalInfo.fullName}
            className="text-5xl font-bold mb-2"
            style={{ color: themeColor }}
            editable={editable}
            field="resumeData.personalInfo.fullName"
          />
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-2xl text-gray-600 mb-6 font-light"
            editable={editable}
            field="resumeData.personalInfo.title"
          />

          <div className="flex gap-8 text-sm text-gray-700">
            <div><span className="font-semibold">Email:</span> <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" className="inline" /></div>
            <div><span className="font-semibold">Phone:</span> <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" className="inline" /></div>
            {resumeData.personalInfo.location && (
              <div><span className="font-semibold">Location:</span> <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" className="inline" /></div>
            )}
          </div>
        </div>

        <div className="h-2" style={{ backgroundColor: `${themeColor}40` }}></div>
        <div className="h-1" style={{ backgroundColor: themeColor }}></div>
      </div>

      <div className="p-10">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <div className="w-12 h-1" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-xl font-bold ml-4 uppercase tracking-wide" style={{ color: themeColor }}>
                Professional Overview
              </h2>
            </div>
            <InlineEditableText
              text={resumeData.personalInfo.summary}
              className="text-gray-700 leading-relaxed pl-16"
              editable={editable}
              field="resumeData.personalInfo.summary"
            />
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-1" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-xl font-bold ml-4 uppercase tracking-wide" style={{ color: themeColor }}>
                Experience
              </h2>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-6 last:mb-0 pl-16">
                <div className="flex justify-between items-baseline mb-2">
                  <InlineEditableText
                    text={exp.position}
                    className="text-lg font-bold"
                    style={{ color: themeColor }}
                    editable={editable}
                    field={`resumeData.experience[${index}].position`}
                  />
                  <div className="text-sm text-gray-600 font-medium px-3 py-1 rounded" style={{ backgroundColor: `${themeColor}15` }}>
                    <InlineEditableText
                      text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                      editable={editable}
                      field={`resumeData.experience[${index}].startDate`}
                    />
                  </div>
                </div>
                <InlineEditableText
                  text={exp.company}
                  className="text-base font-semibold text-gray-700 mb-2"
                  editable={editable}
                  field={`resumeData.experience[${index}].company`}
                />
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
              <div className="flex items-center mb-4">
                <div className="w-12 h-1" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-xl font-bold ml-4 uppercase tracking-wide" style={{ color: themeColor }}>
                  Skills
                </h2>
              </div>
              <InlineEditableSkills
                skills={resumeData.skills}
                className="grid grid-cols-2 gap-3 pl-16"
                editable={editable}
                renderSkill={(skill) => (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2" style={{ backgroundColor: themeColor }}></div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                )}
              />
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-1" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-xl font-bold ml-4 uppercase tracking-wide" style={{ color: themeColor }}>
                  Education
                </h2>
              </div>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-4 last:mb-0 pl-16">
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
            <div className="flex items-center mb-3">
              <div className="w-12 h-1" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-xl font-bold ml-4 uppercase tracking-wide" style={{ color: themeColor }}>
                <InlineEditableText
                  text={section.title}
                  editable={editable}
                  field={`resumeData.sections.${index}.title`}
                />
              </h2>
            </div>
            <InlineEditableText
              text={section.content}
              className="text-gray-700 pl-16"
              editable={editable}
              field={`resumeData.sections.${index}.content`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalHorizonTemplate;
