import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface GitHubStyleTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const GitHubStyleTemplate = ({
  resumeData,
  themeColor = "#238636",
  editable = false,
}: GitHubStyleTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header - GitHub Style */}
      <div className="border-b border-gray-300 px-12 py-8">
        <div className="flex items-start gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={personalInfo.fullName}
                className="text-4xl font-semibold mb-2"
                as="h1"
              />
            ) : (
              <h1 className="text-4xl font-semibold mb-2">
                {personalInfo.fullName}
              </h1>
            )}

            {personalInfo.title && (
              <div className="mb-4">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title}
                    className="text-xl text-gray-600"
                    as="p"
                  />
                ) : (
                  <p className="text-xl text-gray-600">{personalInfo.title}</p>
                )}
              </div>
            )}

            {/* Contact Info - GitHub Style */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={personalInfo.email}
                      className=""
                      as="span"
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={personalInfo.location}
                      className=""
                      as="span"
                    />
                  ) : (
                    <span>{personalInfo.location}</span>
                  )}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={personalInfo.phone}
                      className=""
                      as="span"
                    />
                  ) : (
                    <span>{personalInfo.phone}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-10 p-4 border border-gray-300 rounded-lg bg-gray-50">
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={personalInfo.summary}
                className="text-gray-700 leading-relaxed"
                as="p"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            )}
          </div>
        )}

        {/* Experience - GitHub Contribution Style */}
        {experience && experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span style={{ color: themeColor }}>▶</span> Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      {editable ? (
                        <InlineEditableText
                          path={`experience.${index}.position`}
                          value={exp.position}
                          className="text-xl font-semibold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      )}
                      {editable ? (
                        <InlineEditableText
                          path={`experience.${index}.company`}
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
                    <div className="text-sm text-gray-500 ml-4 whitespace-nowrap px-3 py-1 bg-gray-100 rounded">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>

                  {exp.description && (
                    <div className="text-gray-700 mt-3">
                      {editable ? (
                        <InlineEditableList
                          path={`experience.${index}.description`}
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

        {/* Skills - GitHub Tag Style */}
        {skills && skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span style={{ color: themeColor }}>▶</span> Skills
            </h2>
            {editable ? (
              <InlineEditableSkills path="skills" skills={skills} />
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-50 text-gray-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span style={{ color: themeColor }}>▶</span> Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {editable ? (
                        <InlineEditableText
                          path={`education.${index}.degree`}
                          value={edu.degree}
                          className="text-lg font-semibold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      )}
                      {editable ? (
                        <InlineEditableText
                          path={`education.${index}.institution`}
                          value={edu.institution}
                          className="text-gray-700"
                          as="p"
                        />
                      ) : (
                        <p className="text-gray-700">{edu.institution}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 ml-4 px-3 py-1 bg-gray-100 rounded">
                      {edu.graduationDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {sections &&
          sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span style={{ color: themeColor }}>▶</span> {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-300 rounded-lg p-4">
                {section.content}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GitHubStyleTemplate;
