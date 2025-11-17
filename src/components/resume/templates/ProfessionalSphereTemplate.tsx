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

export const ProfessionalSphereTemplate = ({
  resumeData,
  themeColor = "#065f46",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10">
      {/* Circular Header Design */}
      <div className="flex items-start gap-6 mb-8 pb-6 border-b-2" style={{ borderColor: themeColor }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0" style={{ backgroundColor: themeColor }}>
          {resumeData.personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <InlineEditableText
            text={resumeData.personalInfo.fullName}
            className="text-4xl font-bold mb-1"
            style={{ color: themeColor }}
            editable={editable}
            field="resumeData.personalInfo.fullName"
          />
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-xl text-gray-600 mb-3"
            editable={editable}
            field="resumeData.personalInfo.title"
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
            <div><span className="font-semibold">Email:</span> <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" className="inline" /></div>
            <div><span className="font-semibold">Phone:</span> <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" className="inline" /></div>
            {resumeData.personalInfo.location && (
              <div className="col-span-2"><span className="font-semibold">Location:</span> <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" className="inline" /></div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: themeColor }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
            PROFESSIONAL SUMMARY
          </h2>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-gray-700 leading-relaxed pl-4"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Experience */}
        <div className="col-span-2">
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: themeColor }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                EXPERIENCE
              </h2>
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="mb-5 last:mb-0 pl-4">
                  <div className="flex justify-between mb-1">
                    <InlineEditableText
                      text={exp.position}
                      className="font-bold text-base"
                      style={{ color: themeColor }}
                      editable={editable}
                      field={`resumeData.experience[${index}].position`}
                    />
                    <span className="text-xs text-gray-600 font-medium">
                      <InlineEditableText
                        text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                        editable={editable}
                        field={`resumeData.experience[${index}].startDate`}
                      />
                    </span>
                  </div>
                  <InlineEditableText
                    text={exp.company}
                    className="text-sm font-semibold text-gray-700 mb-2"
                    editable={editable}
                    field={`resumeData.experience[${index}].company`}
                  />
                  <InlineEditableList
                    items={exp.description.split("\n").filter((item) => item.trim())}
                    className="text-xs text-gray-700 space-y-1"
                    editable={editable}
                    field={`resumeData.experience[${index}].description`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Skills & Education */}
        <div>
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: themeColor }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                SKILLS
              </h2>
              <InlineEditableSkills
                skills={resumeData.skills}
                className="space-y-2"
                editable={editable}
                renderSkill={(skill) => (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                    <span className="text-xs font-medium">{skill.name}</span>
                  </div>
                )}
              />
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: themeColor }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-3 last:mb-0 text-xs">
                  <InlineEditableText
                    text={edu.degree}
                    className="font-bold block"
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
                    className="text-gray-500 block"
                    editable={editable}
                    field={`resumeData.education[${index}].startDate`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Additional Sections */}
          {resumeData.sections && resumeData.sections.length > 0 && resumeData.sections.map((section, index) => (
            <div key={section.id} className="mb-6 last:mb-0">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: themeColor }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                <InlineEditableText
                  text={section.title.toUpperCase()}
                  editable={editable}
                  field={`resumeData.sections.${index}.title`}
                />
              </h2>
              <InlineEditableText
                text={section.content}
                className="text-xs text-gray-700"
                editable={editable}
                field={`resumeData.sections.${index}.content`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSphereTemplate;
