import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface DevOpsProTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const DevOpsProTemplate = ({
  resumeData,
  themeColor = "#dc2626",
  editable = false,
}: DevOpsProTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-gray-900 text-gray-100 p-12">
      {/* DevOps-Inspired Header */}
      <div className="mb-10 pb-6 border-b-2 border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }} />
          </div>
          <div className="text-xs text-gray-500 font-mono">~/resume/profile</div>
        </div>

        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={personalInfo.fullName}
            className="text-5xl font-bold mb-3"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="text-5xl font-bold mb-3" style={{ color: themeColor }}>
            {personalInfo.fullName}
          </h1>
        )}

        {personalInfo.title && (
          <div className="mb-6 font-mono">
            <span className="text-gray-500">$ echo </span>
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={personalInfo.title}
                className="text-xl"
                as="span"
              />
            ) : (
              <span className="text-xl">"{personalInfo.title}"</span>
            )}
          </div>
        )}

        {/* Contact Info - DevOps Style */}
        <div className="space-y-1 text-sm font-mono text-gray-400">
          {personalInfo.email && (
            <div>
              <span className="text-gray-600">email:</span>{" "}
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={personalInfo.email}
                  className="text-gray-300"
                  as="span"
                />
              ) : (
                <span className="text-gray-300">{personalInfo.email}</span>
              )}
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <span className="text-gray-600">phone:</span>{" "}
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={personalInfo.phone}
                  className="text-gray-300"
                  as="span"
                />
              ) : (
                <span className="text-gray-300">{personalInfo.phone}</span>
              )}
            </div>
          )}
          {personalInfo.location && (
            <div>
              <span className="text-gray-600">location:</span>{" "}
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={personalInfo.location}
                  className="text-gray-300"
                  as="span"
                />
              ) : (
                <span className="text-gray-300">{personalInfo.location}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-10">
          <div className="text-xs font-mono mb-2" style={{ color: themeColor }}>
            ## PROFILE
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-sm text-gray-300 leading-relaxed"
              as="p"
            />
          ) : (
            <p className="text-sm text-gray-300 leading-relaxed">{personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Skills - Pipeline Style */}
      {skills && skills.length > 0 && (
        <div className="mb-10">
          <div className="text-xs font-mono mb-4" style={{ color: themeColor }}>
            ## SKILLS & TOOLS
          </div>
          {editable ? (
            <InlineEditableSkills path="skills" skills={skills} />
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-800 rounded border-l-4"
                  style={{ borderColor: themeColor }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                  <span className="text-sm font-mono">{skill.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-10">
          <div className="text-xs font-mono mb-6" style={{ color: themeColor }}>
            ## EXPERIENCE
          </div>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border-l-4" style={{ borderColor: themeColor }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.position`}
                        value={exp.position}
                        className="text-xl font-bold"
                        as="h3"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <h3 className="text-xl font-bold" style={{ color: themeColor }}>{exp.position}</h3>
                    )}
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.company`}
                        value={exp.company}
                        className="text-lg text-gray-300"
                        as="p"
                      />
                    ) : (
                      <p className="text-lg text-gray-300">{exp.company}</p>
                    )}
                  </div>
                  <div className="text-xs font-mono text-gray-500 ml-4 whitespace-nowrap">
                    [{exp.startDate} - {exp.endDate || "Present"}]
                  </div>
                </div>

                {exp.description && (
                  <div className="text-sm text-gray-300 mt-3">
                    {editable ? (
                      <InlineEditableList
                        path={`experience.${index}.description`}
                        items={exp.description.split("\n")}
                      />
                    ) : (
                      <ul className="list-none space-y-1">
                        {exp.description.split("\n").map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span style={{ color: themeColor }}>›</span>
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
      {education && education.length > 0 && (
        <div className="mb-10">
          <div className="text-xs font-mono mb-4" style={{ color: themeColor }}>
            ## EDUCATION
          </div>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.degree`}
                    value={edu.degree}
                    className="text-lg font-bold mb-1"
                    as="h3"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <h3 className="text-lg font-bold mb-1" style={{ color: themeColor }}>{edu.degree}</h3>
                )}
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.institution`}
                    value={edu.institution}
                    className="text-gray-300"
                    as="p"
                  />
                ) : (
                  <p className="text-gray-300">{edu.institution}</p>
                )}
                <p className="text-xs font-mono text-gray-500 mt-1">[{edu.graduationDate}]</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {sections &&
        sections.map((section, index) => (
          <div key={index} className="mb-8">
            <div className="text-xs font-mono mb-4" style={{ color: themeColor }}>
              ## {section.title.toUpperCase()}
            </div>
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DevOpsProTemplate;
