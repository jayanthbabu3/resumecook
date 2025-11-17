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

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Ascending Header Design */}
      <div className="relative p-12 mb-8" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 100%)` }}>
        <div className="text-white">
          <InlineEditableText
            text={resumeData.personalInfo.fullName}
            className="text-6xl font-black mb-3 tracking-tight"
            editable={editable}
            field="resumeData.personalInfo.fullName"
          />
          <InlineEditableText
            text={resumeData.personalInfo.title}
            className="text-3xl font-light mb-6"
            editable={editable}
            field="resumeData.personalInfo.title"
          />
          <div className="flex gap-6 text-sm font-medium opacity-95">
            <InlineEditableText text={resumeData.personalInfo.email} editable={editable} field="resumeData.personalInfo.email" />
            <span>|</span>
            <InlineEditableText text={resumeData.personalInfo.phone} editable={editable} field="resumeData.personalInfo.phone" />
            {resumeData.personalInfo.location && (
              <>
                <span>|</span>
                <InlineEditableText text={resumeData.personalInfo.location} editable={editable} field="resumeData.personalInfo.location" />
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white"></div>
      </div>

      <div className="px-12 pb-12">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            <div className="pl-6 border-l-4" style={{ borderColor: themeColor }}>
              <InlineEditableText
                text={resumeData.personalInfo.summary}
                className="text-gray-700 leading-relaxed text-base"
                editable={editable}
                field="resumeData.personalInfo.summary"
              />
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 uppercase" style={{ color: themeColor }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-8 border-l-4" style={{ borderColor: `${themeColor}30` }}>
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: themeColor }}></div>

                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <InlineEditableText
                        text={exp.position}
                        className="text-xl font-bold block"
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
                    <div className="text-sm font-bold text-gray-600">
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
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
                Skills & Expertise
              </h2>
              <InlineEditableSkills
                skills={resumeData.skills}
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
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
                Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-5 last:mb-0 pb-5 last:pb-0 border-b last:border-0" style={{ borderColor: `${themeColor}20` }}>
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
                    className="text-gray-600 block"
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
          <div key={section.id} className="mt-8">
            <h2 className="text-2xl font-bold mb-4 uppercase" style={{ color: themeColor }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`resumeData.sections.${index}.title`}
              />
            </h2>
            <div className="pl-6 border-l-4" style={{ borderColor: themeColor }}>
              <InlineEditableText
                text={section.content}
                className="text-gray-700"
                editable={editable}
                field={`resumeData.sections.${index}.content`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalAscendTemplate;
