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

export const ExecutiveCoreTemplate = ({
  resumeData,
  themeColor = "#0f766e",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Core Header with Centered Focus */}
      <div className="p-12 text-center" style={{ backgroundColor: `${themeColor}05` }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-black" style={{ backgroundColor: themeColor }}>
              {resumeData.personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>

          <InlineEditableText
            text={resumeData.personalInfo.fullName}
            className="text-5xl font-black mb-3 tracking-tight"
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

          <div className="flex justify-center items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
            </div>
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* Core Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-24 h-px" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
                Core Profile
              </h2>
              <div className="w-24 h-px" style={{ backgroundColor: themeColor }}></div>
            </div>
            <InlineEditableText
              text={resumeData.personalInfo.summary}
              className="text-gray-700 leading-relaxed text-center"
              editable={editable}
              field="resumeData.personalInfo.summary"
            />
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-24 h-px" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
                Core Experience
              </h2>
              <div className="w-24 h-px" style={{ backgroundColor: themeColor }}></div>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: themeColor }}></div>

                  <div className="pt-8 pb-6 px-8 rounded-2xl" style={{ backgroundColor: `${themeColor}05` }}>
                    <div className="text-center mb-4">
                      <InlineEditableText
                        text={exp.position}
                        className="text-2xl font-bold block mb-1"
                        style={{ color: themeColor }}
                        editable={editable}
                        field={`resumeData.experience[${index}].position`}
                      />
                      <InlineEditableText
                        text={exp.company}
                        className="text-lg font-semibold text-gray-700 block mb-2"
                        editable={editable}
                        field={`resumeData.experience[${index}].company`}
                      />
                      <div className="inline-block px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: themeColor }}>
                        <InlineEditableText
                          text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                          editable={editable}
                          field={`resumeData.experience[${index}].startDate`}
                        />
                      </div>
                    </div>
                    <InlineEditableList
                      items={exp.description.split("\n").filter((item) => item.trim())}
                      className="text-sm text-gray-700 space-y-2 max-w-3xl mx-auto"
                      editable={editable}
                      field={`resumeData.experience[${index}].description`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
                  Core Skills
                </h2>
                <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
              </div>
              <InlineEditableSkills
                skills={resumeData.skills}
                className="grid grid-cols-2 gap-3"
                editable={editable}
                renderSkill={(skill) => (
                  <div className="px-4 py-3 rounded-lg text-center font-bold text-sm" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                    {skill.name}
                  </div>
                )}
              />
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
                  Education
                </h2>
                <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
              </div>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-5 last:mb-0 p-5 rounded-lg text-center" style={{ backgroundColor: `${themeColor}08` }}>
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
                    className="text-sm text-gray-500 block mt-1"
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
          <div key={section.id} className="mt-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>
                <InlineEditableText
                  text={section.title}
                  editable={editable}
                  field={`resumeData.sections.${index}.title`}
                />
              </h2>
              <div className="w-16 h-px" style={{ backgroundColor: themeColor }}></div>
            </div>
            <InlineEditableText
              text={section.content}
              className="text-gray-700 text-center max-w-3xl mx-auto"
              editable={editable}
              field={`resumeData.sections.${index}.content`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveCoreTemplate;
