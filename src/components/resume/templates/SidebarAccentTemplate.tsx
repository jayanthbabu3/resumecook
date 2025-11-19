import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface SidebarAccentTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const SidebarAccentTemplate = ({
  resumeData,
  themeColor = "#1e40af",
  editable = false,
}: SidebarAccentTemplateProps) => {

  return (
    <div className="w-full h-full bg-white flex">
      {/* Left Sidebar - 35% */}
      <div
        className="w-[35%] text-white p-8"
        style={{ backgroundColor: themeColor }}
      >
        {/* Header in Sidebar */}
        <div className="mb-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-3xl font-bold mb-3"
              as="h1"
            />
          ) : (
            <h1 className="text-3xl font-bold mb-3">
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            <div>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-sm opacity-90"
                  as="p"
                />
              ) : (
                <p className="text-sm opacity-90">{resumeData.personalInfo.title}</p>
              )}
            </div>
          )}
        </div>

        {/* Contact Info in Sidebar */}
        <div className="mb-8 space-y-3 text-sm">
          {resumeData.personalInfo.email && (
            <div className="flex items-start gap-2">
              <span className="opacity-80">✉</span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="flex-1 break-words"
                  as="div"
                />
              ) : (
                <div className="flex-1 break-words">{resumeData.personalInfo.email}</div>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-start gap-2">
              <span className="opacity-80">☎</span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="flex-1"
                  as="div"
                />
              ) : (
                <div className="flex-1">{resumeData.personalInfo.phone}</div>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-start gap-2">
              <span className="opacity-80">📍</span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="flex-1"
                  as="div"
                />
              ) : (
                <div className="flex-1">{resumeData.personalInfo.location}</div>
              )}
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills path="skills" skills={resumeData.skills} />
            ) : (
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="text-sm bg-white/10 px-3 py-2 rounded"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education in Sidebar */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="text-sm">
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="font-semibold mb-1"
                      as="div"
                    />
                  ) : (
                    <div className="font-semibold mb-1">{edu.degree}</div>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].institution`}
                      value={edu.institution}
                      className="opacity-90 mb-1"
                      as="div"
                    />
                  ) : (
                    <div className="opacity-90 mb-1">{edu.institution}</div>
                  )}
                  <div className="text-xs opacity-75">{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content - 65% */}
      <div className="w-[65%] p-12 bg-gray-50">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-gray-700 leading-relaxed"
                as="p"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Experience
            </h2>
            <div className="space-y-8">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-lg font-bold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      )}
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="font-medium"
                          as="p"
                          style={{ color: themeColor }}
                        />
                      ) : (
                        <p className="font-medium" style={{ color: themeColor }}>
                          {exp.company}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>

                  {exp.description && (
                    <div className="text-gray-700 mt-3">
                      {editable ? (
                        <InlineEditableList
                          path={`experience[${index}].description`}
                          items={exp.description.split("\n")}
                        />
                      ) : (
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.split("\n").map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SidebarAccentTemplate;
