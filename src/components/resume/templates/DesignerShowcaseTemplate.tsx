import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface DesignerShowcaseTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const DesignerShowcaseTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
  editable = false,
}: DesignerShowcaseTemplateProps) => {

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900">
      {/* Portfolio-Style Header */}
      <div className="bg-white p-12 shadow-xl">
        <div className="flex items-center gap-10">
          <div className="w-32 h-32 rounded-full flex items-center justify-center text-white text-5xl font-bold" style={{ backgroundColor: themeColor }}>
            {resumeData.personalInfo.fullName.charAt(0)}
          </div>
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[32px] font-bold mb-2"
                as="h1"
              />
            ) : (
              <h1 className="text-[32px] font-bold mb-2">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              <div className="mb-4">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-[16px]"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-[16px]" style={{ color: themeColor }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </div>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
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
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
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
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
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

      <div className="p-12">
        {/* Summary - Showcase Style */}
        {resumeData.personalInfo.summary && (
          <div className="mb-10 bg-white p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: themeColor }} />
            <h2 className="text-[15px] font-bold mb-4" style={{ color: themeColor }}>
              Creative Profile
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-relaxed"
                as="p"
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
            )}
          </div>
        )}

        {/* Skills - Visual Grid */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-10">
            <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: themeColor }} />
            <h2 className="text-[15px] font-bold mb-6" style={{ color: themeColor }}>
              Skills & Expertise
            </h2>
            {editable ? (
              <InlineEditableSkills path="skills" skills={resumeData.skills} />
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform"
                  >
                    <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ backgroundColor: themeColor }} />
                    <div className="font-semibold text-sm">{skill.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Experience - Portfolio Cards */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: themeColor }} />
            <h2 className="text-[15px] font-bold mb-6" style={{ color: themeColor }}>
              Work Experience
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: themeColor }}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        {editable ? (
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            className="text-[15px] font-bold text-gray-900"
                            as="h3"
                          />
                        ) : (
                          <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                        )}
                        {editable ? (
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-[13px] font-medium"
                            as="p"
                            style={{ color: themeColor }}
                          />
                        ) : (
                          <p className="text-[13px] font-medium" style={{ color: themeColor }}>
                            {exp.company}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </p>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-10">
            <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: themeColor }} />
            <h2 className="text-[15px] font-bold mb-6" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-xl font-bold text-gray-900 mb-2"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
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
            <div key={index} className="mb-10">
              <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: themeColor }} />
              <h2 className="text-[15px] font-bold mb-6" style={{ color: themeColor }}>
                {section.title}
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DesignerShowcaseTemplate;
