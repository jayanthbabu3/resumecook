import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface DeveloperGridTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const DeveloperGridTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
  editable = false,
}: DeveloperGridTemplateProps) => {

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900 p-12">
      {/* Header */}
      <div className="mb-10 text-center">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="text-5xl font-bold mb-2"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="text-5xl font-bold mb-2" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}

        {resumeData.personalInfo.title && (
          <div className="mb-6">
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-xl text-gray-700"
                as="p"
              />
            ) : (
              <p className="text-xl text-gray-700">{resumeData.personalInfo.title}</p>
            )}
          </div>
        )}

        {/* Contact Info Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
          {resumeData.personalInfo.email && (
            <div className="bg-white p-3 rounded shadow-sm">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className=""
                  as="div"
                />
              ) : (
                <div>{resumeData.personalInfo.email}</div>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="bg-white p-3 rounded shadow-sm">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className=""
                  as="div"
                />
              ) : (
                <div>{resumeData.personalInfo.phone}</div>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="bg-white p-3 rounded shadow-sm">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className=""
                  as="div"
                />
              ) : (
                <div>{resumeData.personalInfo.location}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
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

      {/* Skills - Grid Layout */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: themeColor }}>
            Technical Skills
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm text-center font-medium border-t-4"
                  style={{ borderColor: themeColor }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience - Grid Style */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: themeColor }}>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b" style={{ borderColor: themeColor }}>
                  <div className="col-span-2">
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-xl font-bold text-gray-900 mb-1"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.position}</h3>
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
                  <div className="text-sm text-gray-500 text-right">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <div className="text-gray-700">
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

      {/* Education - Grid */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
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
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DeveloperGridTemplate;
