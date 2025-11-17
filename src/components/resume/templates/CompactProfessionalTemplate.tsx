import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface CompactProfessionalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CompactProfessionalTemplate = ({
  resumeData,
  themeColor = "#059669",
  editable = false,
}: CompactProfessionalTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 px-10 py-8">
      {/* Compact Header */}
      <div className="mb-6 pb-4 border-b" style={{ borderColor: themeColor }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={personalInfo.fullName}
                className="text-3xl font-bold mb-1"
                as="h1"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-1">
                {personalInfo.fullName}
              </h1>
            )}

            {personalInfo.title && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title}
                    className="text-base font-medium"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-base font-medium" style={{ color: themeColor }}>
                    {personalInfo.title}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Contact Info - Compact Right Side */}
          <div className="text-xs text-gray-600 text-right space-y-1">
            {personalInfo.email && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={personalInfo.email}
                    className=""
                    as="div"
                  />
                ) : (
                  <div>{personalInfo.email}</div>
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
                    as="div"
                  />
                ) : (
                  <div>{personalInfo.phone}</div>
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
                    as="div"
                  />
                ) : (
                  <div>{personalInfo.location}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary - Compact */}
      {personalInfo.summary && (
        <div className="mb-6">
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-xs text-gray-700 leading-relaxed"
              as="p"
            />
          ) : (
            <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Experience - Compact */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex-1">
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.position`}
                        value={exp.position}
                        className="text-sm font-bold text-gray-900"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.company`}
                    value={exp.company}
                    className="text-xs font-medium mb-2"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-xs font-medium mb-2" style={{ color: themeColor }}>
                    {exp.company}
                  </p>
                )}

                {exp.description && (
                  <div className="text-xs text-gray-700 leading-snug">
                    {editable ? (
                      <InlineEditableList
                        path={`experience.${index}.description`}
                        items={exp.description.split("\n")}
                      />
                    ) : (
                      <ul className="list-disc list-inside space-y-0.5 ml-2">
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

      {/* Skills - Compact Grid */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={skills} />
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-center rounded"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education - Compact */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div className="flex-1">
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.degree`}
                      value={edu.degree}
                      className="text-sm font-bold text-gray-900"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.institution`}
                      value={edu.institution}
                      className="text-xs text-gray-700"
                      as="p"
                    />
                  ) : (
                    <p className="text-xs text-gray-700">{edu.institution}</p>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-3">
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections - Compact */}
      {sections &&
        sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CompactProfessionalTemplate;
