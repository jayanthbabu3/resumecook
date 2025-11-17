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

export const ExecutiveVisionTemplate = ({
  resumeData,
  themeColor = "#4338ca",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Vision-Oriented Header */}
      <div className="text-center mb-10 pb-8 border-b-4" style={{ borderColor: `${themeColor}30` }}>
        <div className="inline-block mb-4 px-6 py-2 rounded-full text-white text-sm font-bold uppercase tracking-widest" style={{ backgroundColor: themeColor }}>
          Executive Leadership
        </div>
        <InlineEditableText
          text={resumeData.personalInfo.fullName}
          className="text-6xl font-black mb-3 tracking-tight block"
          style={{ color: themeColor }}
          editable={editable}
          field="resumeData.personalInfo.fullName"
        />
        <InlineEditableText
          text={resumeData.personalInfo.title}
          className="text-3xl text-gray-600 mb-6 font-light block"
          editable={editable}
          field="resumeData.personalInfo.title"
        />
        <div className="flex justify-center gap-8 text-sm font-semibold text-gray-700">
          <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
          <div className="w-px h-5 bg-gray-400"></div>
          <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
          {resumeData.personalInfo.location && (
            <>
              <div className="w-px h-5 bg-gray-400"></div>
              <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
            </>
          )}
        </div>
      </div>

      {/* Vision Statement */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10 text-center">
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
            VISION STATEMENT
          </div>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-gray-700 leading-relaxed text-lg font-light italic max-w-4xl mx-auto block"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <div className="text-center mb-6">
            <h2 className="inline-block text-2xl font-bold uppercase tracking-widest px-6 py-2" style={{ color: themeColor, borderBottom: `4px solid ${themeColor}` }}>
              Career Excellence
            </h2>
          </div>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-8 last:mb-0">
              <div className="flex justify-between items-center mb-3 pb-3 border-b-2" style={{ borderColor: `${themeColor}20` }}>
                <div className="flex-1">
                  <InlineEditableText
                    text={exp.position}
                    className="text-2xl font-bold block mb-1"
                    style={{ color: themeColor }}
                    editable={editable}
                    field={`resumeData.experience[${index}].position`}
                  />
                  <InlineEditableText
                    text={exp.company}
                    className="text-xl font-semibold text-gray-700"
                    editable={editable}
                    field={`resumeData.experience[${index}].company`}
                  />
                </div>
                <div className="text-right">
                  <div className="px-5 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: themeColor }}>
                    <InlineEditableText
                      text={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                      editable={editable}
                      field={`resumeData.experience[${index}].startDate`}
                    />
                  </div>
                </div>
              </div>
              <InlineEditableList
                items={exp.description.split("\n").filter((item) => item.trim())}
                className="text-sm text-gray-700 space-y-2 pl-4"
                editable={editable}
                field={`resumeData.experience[${index}].description`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-10">
        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div>
            <div className="text-center mb-5">
              <h2 className="inline-block text-xl font-bold uppercase tracking-widest px-4 py-2" style={{ color: themeColor, borderBottom: `3px solid ${themeColor}` }}>
                Leadership Competencies
              </h2>
            </div>
            <InlineEditableSkills
              skills={resumeData.skills}
              className="space-y-3"
              editable={editable}
              renderSkill={(skill) => (
                <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg" style={{ backgroundColor: `${themeColor}10` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  <span className="text-sm font-bold" style={{ color: themeColor }}>{skill.name}</span>
                </div>
              )}
            />
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <div className="text-center mb-5">
              <h2 className="inline-block text-xl font-bold uppercase tracking-widest px-4 py-2" style={{ color: themeColor, borderBottom: `3px solid ${themeColor}` }}>
                Education & Credentials
              </h2>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-5 last:mb-0 p-4 rounded-lg text-center" style={{ backgroundColor: `${themeColor}10` }}>
                <InlineEditableText
                  text={edu.degree}
                  className="font-bold text-gray-900 block text-base"
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
                  className="text-gray-600 italic block mt-1"
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
          <div className="text-center mb-5">
            <h2 className="inline-block text-xl font-bold uppercase tracking-widest px-4 py-2" style={{ color: themeColor, borderBottom: `3px solid ${themeColor}` }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`resumeData.sections.${index}.title`}
              />
            </h2>
          </div>
          <InlineEditableText
            text={section.content}
            className="text-gray-700 text-center"
            editable={editable}
            field={`resumeData.sections.${index}.content`}
          />
        </div>
      ))}
    </div>
  );
};

export default ExecutiveVisionTemplate;
