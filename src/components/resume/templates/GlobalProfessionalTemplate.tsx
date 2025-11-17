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

export const GlobalProfessionalTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900">
      {/* Modern Header with Gradient */}
      <div className="bg-white p-10 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <InlineEditableText
              text={resumeData.personalInfo.fullName}
              className="text-5xl font-bold mb-2 tracking-tight"
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
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 flex-wrap">
              <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
              {resumeData.personalInfo.location && (
                <>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 pb-10">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
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
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
              Professional Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-6 last:mb-0">
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

        <div className="grid grid-cols-2 gap-6">
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                Key Skills
              </h2>
              <InlineEditableSkills
                skills={resumeData.skills}
                className="grid grid-cols-2 gap-2"
                editable={editable}
                renderSkill={(skill) => (
                  <div className="px-3 py-2 rounded text-xs font-medium" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                    {skill.name}
                  </div>
                )}
              />
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
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
          <div key={section.id} className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
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
    </div>
  );
};

export default GlobalProfessionalTemplate;
