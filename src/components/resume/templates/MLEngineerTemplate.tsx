import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface MLEngineerTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const MLEngineerTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
  editable = false,
}: MLEngineerTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* ML-Inspired Header with Neural Network Pattern */}
      <div className="relative mb-10 pb-8 border-b-2" style={{ borderColor: themeColor }}>
        {/* Neural network dots pattern */}
        <div className="absolute top-0 right-0 flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="w-2 h-2 rounded-full opacity-20"
                  style={{ backgroundColor: themeColor }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="relative">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={personalInfo.fullName}
              className="text-5xl font-bold mb-3"
              as="h1"
            />
          ) : (
            <h1 className="text-5xl font-bold mb-3">
              {personalInfo.fullName}
            </h1>
          )}

          {personalInfo.title && (
            <div className="mb-6">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={personalInfo.title}
                  className="text-2xl font-medium"
                  as="p"
                  style={{ color: themeColor }}
                />
              ) : (
                <p className="text-2xl font-medium" style={{ color: themeColor }}>
                  {personalInfo.title}
                </p>
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
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
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
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
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
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
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: themeColor }}>
            <div className="w-8 h-1 rounded" style={{ backgroundColor: themeColor }} />
            Overview
          </h2>
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

      {/* Skills - ML Stack Focus */}
      {skills && skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: themeColor }}>
            <div className="w-8 h-1 rounded" style={{ backgroundColor: themeColor }} />
            ML & Technical Stack
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={skills} />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="relative p-4 border-2 rounded-lg bg-gradient-to-br from-white to-gray-50"
                  style={{ borderColor: themeColor }}
                >
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                  <div className="font-semibold text-sm text-gray-900">{skill.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: themeColor }}>
            <div className="w-8 h-1 rounded" style={{ backgroundColor: themeColor }} />
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-3 w-3 h-3 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: themeColor }} />

                <div className="mb-2">
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.position`}
                      value={exp.position}
                      className="text-xl font-bold text-gray-900"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  )}
                  <div className="flex items-center gap-3 mt-1">
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.company`}
                        value={exp.company}
                        className="text-lg font-medium"
                        as="span"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <span className="text-lg font-medium" style={{ color: themeColor }}>
                        {exp.company}
                      </span>
                    )}
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                </div>

                {exp.description && (
                  <div className="text-gray-700 mt-3 bg-gray-50 p-4 rounded-lg">
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

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: themeColor }}>
            <div className="w-8 h-1 rounded" style={{ backgroundColor: themeColor }} />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="p-4 border-l-4 bg-gray-50" style={{ borderColor: themeColor }}>
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.degree`}
                    value={edu.degree}
                    className="text-lg font-bold text-gray-900 mb-1"
                    as="h3"
                  />
                ) : (
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h3>
                )}
                <div className="flex items-center gap-3">
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.institution`}
                      value={edu.institution}
                      className="text-gray-700"
                      as="span"
                    />
                  ) : (
                    <span className="text-gray-700">{edu.institution}</span>
                  )}
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-500">{edu.graduationDate}</span>
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: themeColor }}>
              <div className="w-8 h-1 rounded" style={{ backgroundColor: themeColor }} />
              {section.title}
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MLEngineerTemplate;
