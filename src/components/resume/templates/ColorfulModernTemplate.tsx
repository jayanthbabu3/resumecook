import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface ColorfulModernTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ColorfulModernTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: ColorfulModernTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  // Secondary colors for variety
  const colors = [themeColor, "#3b82f6", "#ec4899", "#f59e0b", "#8b5cf6"];

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900 p-12">
      {/* Colorful Modern Header */}
      <div className="mb-12 relative overflow-hidden rounded-3xl shadow-2xl p-10" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${colors[1]} 100%)` }}>
        <div className="relative text-white">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={personalInfo.fullName}
              className="text-6xl font-bold mb-3"
              as="h1"
            />
          ) : (
            <h1 className="text-6xl font-bold mb-3">
              {personalInfo.fullName}
            </h1>
          )}

          {personalInfo.title && (
            <div className="mb-6">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={personalInfo.title}
                  className="text-2xl font-medium opacity-90"
                  as="p"
                />
              ) : (
                <p className="text-2xl font-medium opacity-90">{personalInfo.title}</p>
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            {personalInfo.email && (
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
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
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
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
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
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

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-10 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: themeColor }}>
            About Me
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-lg text-gray-700 leading-relaxed"
              as="p"
            />
          ) : (
            <p className="text-lg text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Skills - Colorful Cards */}
      {skills && skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6" style={{ color: themeColor }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={skills} />
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl shadow-lg text-white text-center font-bold transform hover:scale-105 transition-transform"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience - Colorful Cards */}
      {experience && experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6" style={{ color: themeColor }}>
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 border-l-8"
                style={{ borderColor: colors[index % colors.length] }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
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
                        style={{ color: colors[index % colors.length] }}
                      />
                    ) : (
                      <p className="text-xl font-medium" style={{ color: colors[index % colors.length] }}>
                        {exp.company}
                      </p>
                    )}
                  </div>
                  <div
                    className="px-4 py-2 rounded-full text-white text-sm font-bold ml-4 whitespace-nowrap"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  >
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
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
            ))}
          </div>
        </div>
      )}

      {/* Education - Colorful Cards */}
      {education && education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-6"
                style={{ borderTop: `6px solid ${colors[(index + 1) % colors.length]}` }}
              >
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.degree`}
                    value={edu.degree}
                    className="text-xl font-bold text-gray-900 mb-2"
                    as="h3"
                  />
                ) : (
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                )}
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.institution`}
                    value={edu.institution}
                    className="text-gray-700 mb-2"
                    as="p"
                  />
                ) : (
                  <p className="text-gray-700 mb-2">{edu.institution}</p>
                )}
                <p
                  className="text-sm font-bold px-3 py-1 rounded-full inline-block text-white"
                  style={{ backgroundColor: colors[(index + 1) % colors.length] }}
                >
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
            <h2 className="text-3xl font-bold mb-6" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <div className="bg-white rounded-3xl shadow-lg p-8 text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ColorfulModernTemplate;
