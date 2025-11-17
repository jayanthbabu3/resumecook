import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface CreativeTimelineTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CreativeTimelineTemplate = ({
  resumeData,
  themeColor = "#f59e0b",
  editable = false,
}: CreativeTimelineTemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Creative Header with Visual Element */}
      <div className="mb-12 relative">
        <div className="absolute top-0 left-0 w-2 h-full rounded" style={{ backgroundColor: themeColor }} />
        <div className="pl-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[32px] font-bold mb-3"
              as="h1"
              style={{ color: themeColor }}
            />
          ) : (
            <h1 className="text-[32px] font-bold mb-3" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            <div className="mb-6">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[16px] font-medium text-gray-700"
                  as="p"
                />
              ) : (
                <p className="text-[16px] font-medium text-gray-700">{resumeData.personalInfo.title}</p>
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2" style={{ backgroundColor: themeColor }} />
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
                <div className="w-2 h-2" style={{ backgroundColor: themeColor }} />
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
                <div className="w-2 h-2" style={{ backgroundColor: themeColor }} />
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

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-12">
          <h2 className="text-[15px] font-bold mb-4" style={{ color: themeColor }}>
            My Story
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-lg text-gray-700 leading-relaxed italic"
              as="p"
            />
          ) : (
            <p className="text-lg text-gray-700 leading-relaxed italic">{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Experience - Visual Timeline */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-[15px] font-bold mb-8" style={{ color: themeColor }}>
            Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200" />

            <div className="space-y-12">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="relative pl-20">
                  {/* Timeline marker */}
                  <div
                    className="absolute left-0 top-2 w-16 h-16 rounded-full border-8 border-white shadow-xl flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: themeColor }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <div className="mb-3">
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-[16px] font-bold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-[16px] font-bold text-gray-900">{exp.position}</h3>
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
                      <p className="text-sm text-gray-500 mt-1 font-semibold">
                        {exp.startDate} → {exp.endDate || "Present"}
                      </p>
                    </div>

                    {exp.description && (
                      <div className="text-gray-700 leading-relaxed">
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills - Creative Display */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-[15px] font-bold mb-6" style={{ color: themeColor }}>
            Toolkit
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="flex flex-wrap gap-4">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="relative px-6 py-3 bg-gray-50 rounded-full text-gray-900 font-semibold shadow-md"
                >
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }} />
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-12">
          <h2 className="text-[15px] font-bold mb-6" style={{ color: themeColor }}>
            Learning Path
          </h2>
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: themeColor }}>
                  {index + 1}
                </div>
                <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[13px] font-bold text-gray-900 mb-1"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-[13px] font-bold text-gray-900 mb-1">{edu.degree}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].institution`}
                      value={edu.institution}
                      className="text-lg text-gray-700 mb-1"
                      as="p"
                    />
                  ) : (
                    <p className="text-lg text-gray-700 mb-1">{edu.institution}</p>
                  )}
                  <p className="text-sm text-gray-500 font-semibold">{edu.graduationDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections &&
        resumeData.sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-[15px] font-bold mb-6" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-6 rounded-lg shadow-md">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CreativeTimelineTemplate;
