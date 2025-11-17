import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface BorderedEleganceTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const BorderedEleganceTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
  editable = false,
}: BorderedEleganceTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-8">
      {/* Outer Decorative Border */}
      <div className="border-4 border-double h-full p-10" style={{ borderColor: themeColor }}>
        {/* Inner Content */}
        <div className="h-full">
          {/* Header with Decorative Elements */}
          <div className="text-center mb-10 pb-6 border-b-2" style={{ borderColor: themeColor }}>
            <div className="mb-2">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName}
                  className="text-5xl font-serif font-bold"
                  as="h1"
                />
              ) : (
                <h1 className="text-5xl font-serif font-bold">
                  {personalInfo.fullName}
                </h1>
              )}
            </div>

            {personalInfo.title && (
              <div className="mb-4">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title}
                    className="text-lg font-medium uppercase tracking-widest"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-lg font-medium uppercase tracking-widest" style={{ color: themeColor }}>
                    {personalInfo.title}
                  </p>
                )}
              </div>
            )}

            {/* Contact Info - Centered */}
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
                <div className="flex items-center gap-2">
                  <span>|</span>
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
                  <span>|</span>
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

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-10 text-center">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={personalInfo.summary}
                  className="text-gray-700 leading-relaxed italic"
                  as="p"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed italic">{personalInfo.summary}</p>
              )}
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 pl-6 py-2" style={{ borderColor: themeColor }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
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
                        {editable ? (
                          <InlineEditableText
                            path={`experience.${index}.company`}
                            value={exp.company}
                            className="text-lg italic"
                            as="p"
                            style={{ color: themeColor }}
                          />
                        ) : (
                          <p className="text-lg italic" style={{ color: themeColor }}>
                            {exp.company}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </div>
                    </div>

                    {exp.description && (
                      <div className="text-gray-700 mt-2">
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
              <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="text-center">
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
                        className="text-gray-700 italic"
                        as="p"
                      />
                    ) : (
                      <p className="text-gray-700 italic">{edu.institution}</p>
                    )}
                    <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                Skills & Expertise
              </h2>
              {editable ? (
                <InlineEditableSkills path="skills" skills={skills} />
              ) : (
                <div className="flex flex-wrap justify-center gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border-2 font-medium"
                      style={{ borderColor: themeColor, color: themeColor }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom Sections */}
          {sections &&
            sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BorderedEleganceTemplate;
