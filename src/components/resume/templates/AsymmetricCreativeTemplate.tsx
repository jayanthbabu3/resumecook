import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface AsymmetricCreativeTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const AsymmetricCreativeTemplate = ({
  resumeData,
  themeColor = "#14b8a6",
  editable = false,
}: AsymmetricCreativeTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Asymmetric Header */}
      <div className="relative">
        <div
          className="absolute top-0 right-0 w-2/3 h-64"
          style={{ backgroundColor: themeColor, clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div className="relative p-12 pb-16">
          <div className="max-w-2xl">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={personalInfo.fullName}
                className="text-6xl font-bold mb-3 text-gray-900"
                as="h1"
              />
            ) : (
              <h1 className="text-6xl font-bold mb-3 text-gray-900">
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
        </div>
      </div>

      <div className="px-12">
        {/* Summary - Offset Layout */}
        {personalInfo.summary && (
          <div className="mb-12 ml-20">
            <div className="relative">
              <div
                className="absolute -left-10 top-0 w-2 h-full"
                style={{ backgroundColor: themeColor }}
              />
              <h2 className="text-3xl font-bold mb-4" style={{ color: themeColor }}>
                Profile
              </h2>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={personalInfo.summary}
                  className="text-lg text-gray-700 leading-relaxed max-w-3xl"
                  as="p"
                />
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">{personalInfo.summary}</p>
              )}
            </div>
          </div>
        )}

        {/* Experience - Asymmetric Layout */}
        {experience && experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-8" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-10">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative ${index % 2 === 0 ? 'ml-0' : 'ml-20'}`}
                >
                  <div className="bg-gray-50 p-8 rounded-r-3xl shadow-lg">
                    <div
                      className="absolute left-0 top-0 bottom-0 w-2 rounded-l-3xl"
                      style={{ backgroundColor: themeColor }}
                    />

                    <div className="mb-4">
                      {editable ? (
                        <InlineEditableText
                          path={`experience.${index}.position`}
                          value={exp.position}
                          className="text-2xl font-bold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      )}
                      {editable ? (
                        <InlineEditableText
                          path={`experience.${index}.company`}
                          value={exp.company}
                          className="text-xl font-medium"
                          as="p"
                          style={{ color: themeColor }}
                        />
                      ) : (
                        <p className="text-xl font-medium" style={{ color: themeColor }}>
                          {exp.company}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                    </div>

                    {exp.description && (
                      <div className="text-gray-700 leading-relaxed">
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills - Asymmetric Grid */}
        {skills && skills.length > 0 && (
          <div className="mb-12 mr-20">
            <h2 className="text-4xl font-bold mb-8 text-right" style={{ color: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills path="skills" skills={skills} />
            ) : (
              <div className="flex flex-wrap justify-end gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 rounded-full text-white font-bold shadow-lg"
                    style={{ backgroundColor: themeColor }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education - Offset */}
        {education && education.length > 0 && (
          <div className="mb-12 ml-20">
            <h2 className="text-4xl font-bold mb-8" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-6 max-w-3xl">
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-lg">
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.degree`}
                      value={edu.degree}
                      className="text-2xl font-bold text-gray-900 mb-2"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.institution`}
                      value={edu.institution}
                      className="text-lg text-gray-700 mb-2"
                      as="p"
                    />
                  ) : (
                    <p className="text-lg text-gray-700 mb-2">{edu.institution}</p>
                  )}
                  <p className="text-sm font-bold text-white px-4 py-1 rounded-full inline-block" style={{ backgroundColor: themeColor }}>
                    {edu.graduationDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {sections &&
          sections.map((section, index) => (
            <div key={index} className={`mb-12 ${index % 2 === 0 ? 'ml-0' : 'mr-20 text-right'}`}>
              <h2 className="text-4xl font-bold mb-6" style={{ color: themeColor }}>
                {section.title}
              </h2>
              <div className={`text-lg text-gray-700 leading-relaxed whitespace-pre-wrap ${index % 2 === 0 ? 'max-w-3xl' : 'ml-auto max-w-3xl'}`}>
                {section.content}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AsymmetricCreativeTemplate;
