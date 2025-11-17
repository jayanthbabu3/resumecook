import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface ColumnDivideTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ColumnDivideTemplate = ({
  resumeData,
  themeColor = "#0891b2",
  editable = false,
}: ColumnDivideTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Header */}
      <div className="text-center mb-10 pb-8 border-b-2" style={{ borderColor: themeColor }}>
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
          <div className="mb-4">
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={personalInfo.title}
                className="text-xl"
                as="p"
                style={{ color: themeColor }}
              />
            ) : (
              <p className="text-xl" style={{ color: themeColor }}>
                {personalInfo.title}
              </p>
            )}
          </div>
        )}

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div>
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
            <div>
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
            <div>
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

      {/* Summary - Full Width */}
      {personalInfo.summary && (
        <div className="mb-10">
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-gray-700 leading-relaxed text-center"
              as="p"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed text-center">{personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Two Column Layout with Vertical Divider */}
      <div className="flex gap-8">
        {/* Left Column - 50% */}
        <div className="w-1/2">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="mb-2">
                      {editable ? (
                        <InlineEditableText
                          path={`experience.${index}.position`}
                          value={exp.position}
                          className="text-lg font-bold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
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
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                    </div>

                    {exp.description && (
                      <div className="text-sm text-gray-700">
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

          {/* Custom Sections (Left) */}
          {sections &&
            sections.filter((_, index) => index % 2 === 0).map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                  {section.title}
                </h2>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </div>
              </div>
            ))}
        </div>

        {/* Vertical Divider */}
        <div className="w-0.5" style={{ backgroundColor: themeColor }} />

        {/* Right Column - 50% */}
        <div className="w-1/2">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                Skills
              </h2>
              {editable ? (
                <InlineEditableSkills path="skills" skills={skills} />
              ) : (
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 border-l-4 text-sm font-medium"
                      style={{ borderColor: themeColor }}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    {editable ? (
                      <InlineEditableText
                        path={`education.${index}.degree`}
                        value={edu.degree}
                        className="text-lg font-bold text-gray-900"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
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
                    <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections (Right) */}
          {sections &&
            sections.filter((_, index) => index % 2 === 1).map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                  {section.title}
                </h2>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ColumnDivideTemplate;
