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

export const CorporateFusionTemplate = ({
  resumeData,
  themeColor = "#c026d3",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Fusion Header - Diagonal Split */}
      <div className="relative h-64 mb-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${themeColor} 0%, ${themeColor} 60%, white 60%, white 100%)` }}></div>

        <div className="relative z-10 p-12 text-white">
          <InlineEditableText
            text={resumeData.personalInfo.fullName}
            className="text-6xl font-black mb-2 tracking-tight"
            editable={editable}
            field="resumeData.personalInfo.fullName"
          />
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-2xl font-light mb-6"
            editable={editable}
            field="resumeData.personalInfo.title"
          />
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span>✉</span>
              <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
            </div>
            <div className="flex items-center gap-2">
              <span>☎</span>
              <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
            </div>
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <span>⚲</span>
                <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-12 pb-12">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: themeColor }}>
              <div className="w-8 h-1" style={{ backgroundColor: themeColor }}></div>
              PROFESSIONAL PROFILE
              <div className="flex-1 h-1" style={{ backgroundColor: `${themeColor}30` }}></div>
            </h2>
            <InlineEditableText
              text={resumeData.personalInfo.summary}
              className="text-gray-700 leading-relaxed pl-11"
              editable={editable}
              field="resumeData.personalInfo.summary"
            />
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: themeColor }}>
              <div className="w-8 h-1" style={{ backgroundColor: themeColor }}></div>
              EXPERIENCE
              <div className="flex-1 h-1" style={{ backgroundColor: `${themeColor}30` }}></div>
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-6 last:mb-0 pl-11 relative">
                <div className="absolute left-2 top-2 w-5 h-5 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: themeColor }}></div>

                <div className="flex justify-between items-baseline mb-2">
                  <div className="flex-1">
                    <InlineEditableText
                      text={exp.position}
                      className="text-xl font-bold"
                      style={{ color: themeColor }}
                      editable={editable}
                      field={`resumeData.experience[${index}].position`}
                    />
                    <InlineEditableText
                      text={exp.company}
                      className="text-lg font-semibold text-gray-700"
                      editable={editable}
                      field={`resumeData.experience[${index}].company`}
                    />
                  </div>
                  <div className="text-sm font-bold px-4 py-2 rounded-lg" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
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

        <div className="grid grid-cols-3 gap-8">
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: themeColor }}>
                <div className="w-8 h-1" style={{ backgroundColor: themeColor }}></div>
                SKILLS
                <div className="flex-1 h-1" style={{ backgroundColor: `${themeColor}30` }}></div>
              </h2>
              <InlineEditableSkills
                skills={resumeData.skills}
                className="grid grid-cols-3 gap-3 pl-11"
                editable={editable}
                renderSkill={(skill) => (
                  <div className="px-3 py-2 rounded-lg text-center font-bold text-sm border-2" style={{ borderColor: themeColor, color: themeColor }}>
                    {skill.name}
                  </div>
                )}
              />
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
                <div className="w-6 h-1" style={{ backgroundColor: themeColor }}></div>
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-4 last:mb-0 pl-8">
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: themeColor }}>
              <div className="w-8 h-1" style={{ backgroundColor: themeColor }}></div>
              <InlineEditableText
                text={section.title.toUpperCase()}
                editable={editable}
                field={`resumeData.sections.${index}.title`}
              />
              <div className="flex-1 h-1" style={{ backgroundColor: `${themeColor}30` }}></div>
            </h2>
            <InlineEditableText
              text={section.content}
              className="text-gray-700 pl-11"
              editable={editable}
              field={`resumeData.sections.${index}.content`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporateFusionTemplate;
