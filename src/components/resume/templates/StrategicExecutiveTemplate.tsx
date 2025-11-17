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

export const StrategicExecutiveTemplate = ({
  resumeData,
  themeColor = "#1a365d",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-8">
      {/* Header Section with Bold Executive Design */}
      <div className="border-l-8 pl-6 mb-8" style={{ borderColor: themeColor }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <InlineEditableText
              text={resumeData.personalInfo.fullName}
              className="text-5xl font-bold mb-2"
              style={{ color: themeColor }}
              editable={editable}
              field="resumeData.personalInfo.fullName"
            />
            <InlineEditableText
              text={resumeData.personalInfo.title}
              className="text-2xl font-light text-gray-600 mb-4"
              editable={editable}
              field="resumeData.personalInfo.title"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: themeColor }}>Email:</span>
            <InlineEditableText
              text={resumeData.personalInfo.email}
              editable={editable}
              field="resumeData.personalInfo.email"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: themeColor }}>Phone:</span>
            <InlineEditableText
              text={resumeData.personalInfo.phone}
              editable={editable}
              field="resumeData.personalInfo.phone"
            />
          </div>
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-2">
              <span className="font-semibold" style={{ color: themeColor }}>Location:</span>
              <InlineEditableText
                text={resumeData.personalInfo.location}
                editable={editable}
                field="resumeData.personalInfo.location"
              />
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
              Executive Summary
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-gray-700 leading-relaxed"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Professional Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
              Professional Experience
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0 pl-4 border-l-2" style={{ borderColor: `${themeColor}30` }}>
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
                className="text-sm text-gray-700 space-y-1"
                editable={editable}
                field={`resumeData.experience[${index}].description`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <InlineEditableText
                    text={edu.degree}
                    className="font-bold text-gray-900"
                    editable={editable}
                    field={`resumeData.education[${index}].degree`}
                  />
                  {edu.field && (
                    <InlineEditableText
                      text={edu.field}
                      className="text-gray-700"
                      editable={editable}
                      field={`resumeData.education[${index}].field`}
                    />
                  )}
                  <InlineEditableText
                    text={edu.school}
                    className="text-gray-600 italic"
                    editable={editable}
                    field={`resumeData.education[${index}].school`}
                  />
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  <InlineEditableText
                    text={`${edu.startDate} - ${edu.endDate}`}
                    editable={editable}
                    field={`resumeData.education[${index}].startDate`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
              Core Competencies
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          <InlineEditableSkills
            skills={resumeData.skills}
            className="grid grid-cols-3 gap-3"
            editable={editable}
            renderSkill={(skill) => (
              <div
                className="px-3 py-2 rounded text-sm font-medium text-center"
                style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
              >
                {skill.name}
              </div>
            )}
          />
        </div>
      )}

      {/* Additional Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && resumeData.sections.map((section, index) => (
        <div key={section.id} className="mb-8 last:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: themeColor }}>
              <InlineEditableText
                text={section.title}
                editable={editable}
                field={`resumeData.sections.${index}.title`}
              />
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          <InlineEditableText
            text={section.content}
            className="text-gray-700"
            editable={editable}
            field={`resumeData.sections.${index}.content`}
          />
        </div>
      ))}
    </div>
  );
};

export default StrategicExecutiveTemplate;
