import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface AlgoEngineerTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const AlgoEngineerTemplate = ({
  resumeData,
  themeColor = "#f97316",
  editable = false,
}: AlgoEngineerTemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Header with Algorithm Symbol */}
      <div className="mb-10 pb-6 border-b-2" style={{ borderColor: themeColor }}>
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: themeColor }}>
            {"{}"}
          </div>
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-4xl font-bold mb-2"
                as="h1"
              />
            ) : (
              <h1 className="text-4xl font-bold mb-2">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              <div className="mb-4">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-xl font-medium"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-xl font-medium" style={{ color: themeColor }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </div>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <div>
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
                <div>
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
                <div>
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
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
            <span>{">"}</span> Profile
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-gray-700 leading-relaxed pl-6"
              as="p"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed pl-6">{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Skills - Problem Solving Focus */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
            <span>{">"}</span> Technical Expertise
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="grid grid-cols-3 gap-3 pl-6">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-gray-50 border-l-4 font-medium"
                  style={{ borderColor: themeColor }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: themeColor }}>
            <span>{">"}</span> Experience
          </h2>
          <div className="space-y-8 pl-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 top-2 w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }} />

                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-xl font-bold text-gray-900"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    )}
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-lg"
                        as="p"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <p className="text-lg" style={{ color: themeColor }}>
                        {exp.company}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <div className="text-gray-700 mt-3">
                    {editable ? (
                      <InlineEditableList
                        path={`experience[${index}].description`}
                        items={exp.description.split("\n")}
                      />
                    ) : (
                      <ul className="list-none space-y-1">
                        {exp.description.split("\n").map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span style={{ color: themeColor }}>▸</span>
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
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: themeColor }}>
            <span>{">"}</span> Education
          </h2>
          <div className="space-y-4 pl-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-lg font-bold text-gray-900"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].institution`}
                      value={edu.institution}
                      className="text-gray-700"
                      as="p"
                    />
                  ) : (
                    <p className="text-gray-700">{edu.institution}</p>
                  )}
                </div>
                <div className="text-sm text-gray-500 ml-4">
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
              <span>{">"}</span> {section.title}
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-6">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AlgoEngineerTemplate;
