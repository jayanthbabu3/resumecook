import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface CodeMinimalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CodeMinimalTemplate = ({
  resumeData,
  themeColor = "#22c55e",
  editable = false,
}: CodeMinimalTemplateProps) => {

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900 p-12 font-mono">
      {/* Header - Code Style */}
      <div className="mb-10 pb-6 border-b-2 border-gray-300">
        <div className="text-xs text-gray-500 mb-2">{"// Developer Profile"}</div>
        <div className="mb-3">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-4xl font-bold"
              as="h1"
              style={{ color: themeColor }}
            />
          ) : (
            <h1 className="text-4xl font-bold" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName}
            </h1>
          )}
        </div>

        {resumeData.personalInfo.title && (
          <div className="mb-4 text-sm text-gray-700">
            <span className="text-gray-500">const role = </span>
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="font-semibold"
                as="span"
              />
            ) : (
              <span className="font-semibold">"{resumeData.personalInfo.title}"</span>
            )}
            <span className="text-gray-500">;</span>
          </div>
        )}

        {/* Contact Info - Code Style */}
        <div className="space-y-1 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <div>
              <span className="text-gray-500">email: </span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className=""
                  as="span"
                />
              ) : (
                <span>"{resumeData.personalInfo.email}"</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div>
              <span className="text-gray-500">phone: </span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className=""
                  as="span"
                />
              ) : (
                <span>"{resumeData.personalInfo.phone}"</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div>
              <span className="text-gray-500">location: </span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className=""
                  as="span"
                />
              ) : (
                <span>"{resumeData.personalInfo.location}"</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10">
          <div className="text-xs text-gray-500 mb-2">{"/* About Me */"}</div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-sm text-gray-700 leading-relaxed"
              as="p"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Skills - Code Array Style */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-10">
          <div className="text-xs text-gray-500 mb-3">{"const resumeData.skills = ["}</div>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="pl-6 space-y-1 text-sm">
              {resumeData.skills.map((skill, index) => (
                <div key={index}>
                  <span style={{ color: themeColor }}>"{skill.name}"</span>
                  <span className="text-gray-500">{index < resumeData.skills.length - 1 ? "," : ""}</span>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">{"];"}</div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <div className="text-xs text-gray-500 mb-4">{"// Work Experience"}</div>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-white p-4 rounded border border-gray-300">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-base font-bold"
                        as="h3"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <h3 className="text-base font-bold" style={{ color: themeColor }}>{exp.position}</h3>
                    )}
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-sm text-gray-700"
                        as="p"
                      />
                    ) : (
                      <p className="text-sm text-gray-700">{exp.company}</p>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <div className="text-sm text-gray-700 mt-3">
                    {editable ? (
                      <InlineEditableList
                        path={`experience[${index}].description`}
                        items={exp.description.split("\n")}
                      />
                    ) : (
                      <ul className="list-none space-y-1">
                        {exp.description.split("\n").map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span style={{ color: themeColor }}>▹</span>
                            <span>{item}</span>
                          </li>
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

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-10">
          <div className="text-xs text-gray-500 mb-4">{"// Education"}</div>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-base font-bold text-gray-900"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].institution`}
                      value={edu.institution}
                      className="text-sm text-gray-700"
                      as="p"
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-4">
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections &&
        resumeData.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <div className="text-xs text-gray-500 mb-3">{"// " + section.title}</div>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CodeMinimalTemplate;
