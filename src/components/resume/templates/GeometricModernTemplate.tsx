import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface GeometricModernTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const GeometricModernTemplate = ({
  resumeData,
  themeColor = "#6366f1",
  editable = false,
}: GeometricModernTemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Geometric Header with Diagonal Line */}
      <div className="relative mb-12 pb-8">
        <div
          className="absolute top-0 left-0 w-32 h-1"
          style={{ backgroundColor: themeColor }}
        />
        <div
          className="absolute top-0 left-32 w-1 h-32"
          style={{ backgroundColor: themeColor }}
        />

        <div className="mt-10">
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
            <div className="mb-6">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-lg font-medium"
                  as="p"
                  style={{ color: themeColor }}
                />
              ) : (
                <p className="text-lg font-medium" style={{ color: themeColor }}>
                  {resumeData.personalInfo.title}
                </p>
              )}
            </div>
          )}

          {/* Contact Info with Geometric Separators */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {resumeData.personalInfo.email && (
              <>
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
                <div className="w-1 h-1 rounded-full bg-gray-400" />
              </>
            )}
            {resumeData.personalInfo.phone && (
              <>
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
                <div className="w-1 h-1 rounded-full bg-gray-400" />
              </>
            )}
            {resumeData.personalInfo.location && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary with Geometric Accent */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10 relative pl-6">
          <div
            className="absolute left-0 top-0 w-1 h-full"
            style={{ backgroundColor: themeColor, opacity: 0.3 }}
          />
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

      {/* Experience with Geometric Design */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-3 h-3 rotate-45"
              style={{ backgroundColor: themeColor }}
            />
            <h2 className="text-2xl font-bold" style={{ color: themeColor }}>
              Experience
            </h2>
          </div>
          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-gray-200">
                <div
                  className="absolute -left-[5px] top-2 w-2 h-2 rotate-45"
                  style={{ backgroundColor: themeColor }}
                />

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
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-3 h-3 rotate-45"
              style={{ backgroundColor: themeColor }}
            />
            <h2 className="text-2xl font-bold" style={{ color: themeColor }}>
              Education
            </h2>
          </div>
          <div className="space-y-6">
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

      {/* Skills with Geometric Layout */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-3 h-3 rotate-45"
              style={{ backgroundColor: themeColor }}
            />
            <h2 className="text-2xl font-bold" style={{ color: themeColor }}>
              Skills
            </h2>
          </div>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="relative pl-4 py-2 border-l-2"
                  style={{ borderColor: themeColor }}
                >
                  <div
                    className="absolute -left-[3px] top-3 w-1 h-1 rotate-45"
                    style={{ backgroundColor: themeColor }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections &&
        resumeData.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-3 h-3 rotate-45"
                style={{ backgroundColor: themeColor }}
              />
              <h2 className="text-2xl font-bold" style={{ color: themeColor }}>
                {section.title}
              </h2>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-6">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GeometricModernTemplate;
