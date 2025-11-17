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

export const GlobalEliteTemplate = ({
  resumeData,
  themeColor = "#0c4a6e",
  editable = false,
}: TemplateProps) => {

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900 p-8">
      {/* Elite Header with Card Design */}
      <div className="bg-white rounded-2xl shadow-lg p-10 mb-8">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-32 h-32 rounded-xl flex items-center justify-center text-white text-5xl font-black" style={{ backgroundColor: themeColor }}>
            {resumeData.personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-2">
              <InlineEditableText
                text={resumeData.personalInfo.fullName}
                className="text-5xl font-black"
                style={{ color: themeColor }}
                editable={editable}
                field="resumeData.personalInfo.fullName"
              />
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: themeColor }}>ELITE</span>
            </div>
            <InlineEditableText
              text={resumeData.personalInfo.title}
              className="text-2xl text-gray-600 mb-4 font-light"
              editable={editable}
              field="resumeData.personalInfo.title"
            />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-bold text-xs uppercase tracking-wide" style={{ color: themeColor }}>Email</div>
                <InlineEditableText text={resumeData.personalInfo.email} className="text-gray-700" editable={editable} field="resumeData.personalInfo.email" />
              </div>
              <div>
                <div className="font-bold text-xs uppercase tracking-wide" style={{ color: themeColor }}>Phone</div>
                <InlineEditableText text={resumeData.personalInfo.phone} className="text-gray-700" editable={editable} field="resumeData.personalInfo.phone" />
              </div>
              {resumeData.personalInfo.location && (
                <div>
                  <div className="font-bold text-xs uppercase tracking-wide" style={{ color: themeColor }}>Location</div>
                  <InlineEditableText text={resumeData.personalInfo.location} className="text-gray-700" editable={editable} field="resumeData.personalInfo.location" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {resumeData.personalInfo.summary && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
            <div className="w-1 h-6 rounded" style={{ backgroundColor: themeColor }}></div>
            Executive Profile
          </h2>
          <InlineEditableText
            text={resumeData.personalInfo.summary}
            className="text-gray-700 leading-relaxed"
            editable={editable}
            field="resumeData.personalInfo.summary"
          />
        </div>
      )}

      {/* Experience Card */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
            <div className="w-1 h-6 rounded" style={{ backgroundColor: themeColor }}></div>
            Professional Journey
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 last:mb-0 pb-6 last:pb-0 border-b last:border-0 border-gray-200">
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
                <div className="px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: themeColor }}>
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
        {/* Skills Card */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <div className="w-1 h-6 rounded" style={{ backgroundColor: themeColor }}></div>
              Core Competencies
            </h2>
            <InlineEditableSkills
              skills={resumeData.skills}
              className="grid grid-cols-3 gap-3"
              editable={editable}
              renderSkill={(skill) => (
                <div className="px-4 py-3 rounded-xl text-sm font-bold text-center" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                  {skill.name}
                </div>
              )}
            />
          </div>
        )}

        {/* Education Card */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <div className="w-1 h-6 rounded" style={{ backgroundColor: themeColor }}></div>
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-5 last:mb-0">
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
        <div key={section.id} className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
            <div className="w-1 h-6 rounded" style={{ backgroundColor: themeColor }}></div>
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
  );
};

export default GlobalEliteTemplate;
