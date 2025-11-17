import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface ArtisticBoldTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ArtisticBoldTemplate = ({
  resumeData,
  themeColor = "#ec4899",
  editable = false,
}: ArtisticBoldTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Bold Artistic Header */}
      <div className="relative p-12 pb-16" style={{ backgroundColor: themeColor }}>
        {/* Artistic shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full -ml-24 -mb-24" />

        <div className="relative text-white">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={personalInfo.fullName}
              className="text-[32px] font-black mb-4 tracking-tight"
              as="h1"
            />
          ) : (
            <h1 className="text-[32px] font-black mb-4 tracking-tight">
              {personalInfo.fullName}
            </h1>
          )}

          {personalInfo.title && (
            <div className="mb-6">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={personalInfo.title}
                  className="text-[16px] font-bold uppercase tracking-wider opacity-90"
                  as="p"
                />
              ) : (
                <p className="text-[16px] font-bold uppercase tracking-wider opacity-90">
                  {personalInfo.title}
                </p>
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-[12px] opacity-90">
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

      <div className="px-12 py-10">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-10">
            <h2 className="text-[15px] font-black mb-6 uppercase" style={{ color: themeColor }}>
              About
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-relaxed"
                as="p"
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            )}
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[15px] font-black mb-8 uppercase" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-10">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-8" style={{ borderColor: `${themeColor}30` }}>
                  <div className="absolute -left-3 top-2 w-6 h-6 rounded-full" style={{ backgroundColor: themeColor }} />

                  <div className="mb-3">
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[15px] font-black text-gray-900"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-[15px] font-black text-gray-900">{exp.position}</h3>
                    )}
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[13px] font-bold"
                        as="p"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <p className="text-[13px] font-bold" style={{ color: themeColor }}>
                        {exp.company}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 font-semibold uppercase mt-1">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                  </div>

                  {exp.description && (
                    <div className="text-gray-700 text-[12.5px] leading-relaxed">
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

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[15px] font-black mb-8 uppercase" style={{ color: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills path="skills" skills={skills} />
            ) : (
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 text-white text-[12px] font-bold uppercase rounded-lg shadow-lg"
                    style={{ backgroundColor: themeColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[15px] font-black mb-8 uppercase" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index}>
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[13px] font-black text-gray-900"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-[13px] font-black text-gray-900">{edu.degree}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].institution`}
                      value={edu.institution}
                      className="text-[12.5px] text-gray-700"
                      as="p"
                    />
                  ) : (
                    <p className="text-[12.5px] text-gray-700">{edu.institution}</p>
                  )}
                  <p className="text-sm text-gray-500 font-semibold uppercase mt-1">
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
            <div key={index} className="mb-10">
              <h2 className="text-[15px] font-black mb-6 uppercase" style={{ color: themeColor }}>
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArtisticBoldTemplate;
