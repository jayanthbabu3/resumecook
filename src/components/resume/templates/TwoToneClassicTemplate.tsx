import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TwoToneClassicTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const TwoToneClassicTemplate = ({
  resumeData,
  themeColor = "#334155",
  editable = false,
}: TwoToneClassicTemplateProps) => {

  // Calculate lighter tone (20% opacity for backgrounds)
  const lightTone = `${themeColor}33`;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header with Two-Tone Design */}
      <div
        className="px-12 py-10"
        style={{ backgroundColor: themeColor }}
      >
        <div className="text-white">
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
                  className="text-xl opacity-90"
                  as="p"
                />
              ) : (
                <p className="text-xl opacity-90">{resumeData.personalInfo.title}</p>
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <span>✉</span>
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
                <span>☎</span>
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
                <span>📍</span>
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

      <div className="px-12 py-10">
        {/* Summary with Light Tone Background */}
        {resumeData.personalInfo.summary && (
          <div className="mb-10 p-6 rounded" style={{ backgroundColor: lightTone }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>
              Professional Summary
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

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className={index % 2 === 0 ? "p-6 rounded" : "p-6"} style={index % 2 === 0 ? { backgroundColor: lightTone } : {}}>
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
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="p-4 rounded" style={{ backgroundColor: lightTone }}>
                  <div className="flex justify-between items-start">
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Core Skills
            </h2>
            {editable ? (
              <InlineEditableSkills path="skills" skills={resumeData.skills} />
            ) : (
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded font-medium"
                    style={{ backgroundColor: themeColor, color: 'white' }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TwoToneClassicTemplate;
