import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface ExecutiveMinimalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ExecutiveMinimalTemplate = ({
  resumeData,
  themeColor = "#000000",
  editable = false,
}: ExecutiveMinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-16">
      {/* Header - Ultra Minimal */}
      <div className="mb-12 text-center">
        <div className="mb-2">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={personalInfo.fullName}
              className="text-4xl font-bold tracking-tight uppercase"
              as="h1"
            />
          ) : (
            <h1 className="text-4xl font-bold tracking-tight uppercase">
              {personalInfo.fullName}
            </h1>
          )}
        </div>

        {personalInfo.title && (
          <div className="mb-6">
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={personalInfo.title}
                className="text-base font-light tracking-wider text-gray-600"
                as="p"
              />
            ) : (
              <p className="text-base font-light tracking-wider text-gray-600">
                {personalInfo.title}
              </p>
            )}
          </div>
        )}

        {/* Contact - Minimal Inline */}
        <div className="flex justify-center gap-6 text-xs text-gray-500 border-t border-b border-gray-300 py-3">
          {personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={personalInfo.email}
                className="hover:text-gray-900"
                as="span"
              />
            ) : (
              <span>{personalInfo.email}</span>
            )
          )}
          {personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={personalInfo.phone}
                className="hover:text-gray-900"
                as="span"
              />
            ) : (
              <span>{personalInfo.phone}</span>
            )
          )}
          {personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={personalInfo.location}
                className="hover:text-gray-900"
                as="span"
              />
            ) : (
              <span>{personalInfo.location}</span>
            )
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-12 max-w-4xl mx-auto">
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-center text-gray-700 leading-relaxed text-sm italic"
              as="p"
            />
          ) : (
            <p className="text-center text-gray-700 leading-relaxed text-sm italic">
              {personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-center border-b pb-2">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-8 max-w-4xl mx-auto">
              <div className="flex justify-between items-baseline mb-3 border-b border-gray-200 pb-2">
                <div className="flex-1">
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.position`}
                      value={exp.position}
                      className="text-lg font-semibold"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.company`}
                      value={exp.company}
                      className="text-sm text-gray-600 font-light"
                      as="p"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 font-light">{exp.company}</p>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-4">
                  {exp.startDate} - {exp.endDate || "Present"}
                </div>
              </div>

              {exp.description && (
                <div className="text-sm text-gray-700 leading-relaxed">
                  {editable ? (
                    <InlineEditableList
                      path={`experience.${index}.description`}
                      items={exp.description.split("\n")}
                    />
                  ) : (
                    <ul className="space-y-2">
                      {exp.description.split("\n").map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-gray-400 mt-1">—</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-center border-b pb-2">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-baseline border-b border-gray-200 pb-2">
                <div>
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.degree`}
                      value={edu.degree}
                      className="text-lg font-semibold"
                      as="h3"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.institution`}
                      value={edu.institution}
                      className="text-sm text-gray-600 font-light"
                      as="p"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 font-light">{edu.institution}</p>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-4">{edu.graduationDate}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-center border-b pb-2">
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={skills} />
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-700 font-light"
                  >
                    {skill.name}
                    {index < skills.length - 1 && <span className="ml-4 text-gray-300">|</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {sections &&
        sections.map((section, index) => (
          <div key={index} className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-6 text-center border-b pb-2">
              {section.title}
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExecutiveMinimalTemplate;
