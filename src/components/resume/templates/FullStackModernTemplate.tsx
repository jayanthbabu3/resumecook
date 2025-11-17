import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface FullStackModernTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FullStackModernTemplate = ({
  resumeData,
  themeColor = "#06b6d4",
  editable = false,
}: FullStackModernTemplateProps) => {

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 p-12">
      {/* Modern Header with Gradient Accent */}
      <div className="mb-10 p-8 rounded-2xl bg-white shadow-lg">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-1 h-24 rounded-full" style={{ backgroundColor: themeColor }} />
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-5xl font-bold mb-2"
                as="h1"
              />
            ) : (
              <h1 className="text-5xl font-bold mb-2">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-2xl font-medium"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-2xl font-medium" style={{ color: themeColor }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contact Info - Modern Chips */}
        <div className="flex flex-wrap gap-3">
          {resumeData.personalInfo.email && (
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className=""
                  as="span"
                />
              ) : (
                <span>{resumeData.personalInfo.email}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className=""
                  as="span"
                />
              ) : (
                <span>{resumeData.personalInfo.phone}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className=""
                  as="span"
                />
              ) : (
                <span>{resumeData.personalInfo.location}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary - Modern Card */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>
            About Me
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

      {/* Skills - Modern Grid */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>
            Tech Stack
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience - Modern Cards */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: themeColor }}>
            Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="p-6 bg-white rounded-2xl shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-2xl font-bold text-gray-900"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                    )}
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-lg font-medium"
                        as="p"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <p className="text-lg font-medium" style={{ color: themeColor }}>
                        {exp.company}
                      </p>
                    )}
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 ml-4 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <div className="text-gray-700 mt-4">
                    {editable ? (
                      <InlineEditableList
                        path={`experience[${index}].description`}
                        items={exp.description.split("\n")}
                      />
                    ) : (
                      <ul className="list-disc list-inside space-y-2">
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

      {/* Education - Modern Cards */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="p-6 bg-white rounded-2xl shadow-lg">
                {editable ? (
                  <InlineEditableText
                    path={`education[${index}].degree`}
                    value={edu.degree}
                    className="text-lg font-bold text-gray-900 mb-2"
                    as="h3"
                  />
                ) : (
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h3>
                )}
                {editable ? (
                  <InlineEditableText
                    path={`education[${index}].institution`}
                    value={edu.institution}
                    className="text-gray-700 mb-2"
                    as="p"
                  />
                ) : (
                  <p className="text-gray-700 mb-2">{edu.institution}</p>
                )}
                <p className="text-sm text-gray-500">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections &&
        resumeData.sections.map((section, index) => (
          <div key={index} className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>
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

export default FullStackModernTemplate;
