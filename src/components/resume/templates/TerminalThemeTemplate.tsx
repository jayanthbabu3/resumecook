import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface TerminalThemeTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const TerminalThemeTemplate = ({
  resumeData,
  themeColor = "#00ff00",
  editable = false,
}: TerminalThemeTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <div className="w-full h-full bg-gray-900 text-green-400 p-12 font-mono">
      {/* Terminal Header */}
      <div className="mb-8 pb-4 border-b border-green-400/30">
        <div className="text-xs mb-4 text-green-400/60">
          $ whoami
        </div>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={personalInfo.fullName}
            className="text-4xl font-bold mb-2"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="text-4xl font-bold mb-2" style={{ color: themeColor }}>
            {personalInfo.fullName}
          </h1>
        )}

        {personalInfo.title && (
          <div className="mb-4">
            <span className="text-green-400/60">role@system:~$ </span>
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={personalInfo.title}
                className="text-lg"
                as="span"
              />
            ) : (
              <span className="text-lg">{personalInfo.title}</span>
            )}
          </div>
        )}

        {/* Contact Info - Terminal Style */}
        <div className="space-y-1 text-sm text-green-400/80">
          {personalInfo.email && (
            <div>
              <span className="text-green-400/60">email: </span>
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
              <span className="text-green-400/60">phone: </span>
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
              <span className="text-green-400/60">location: </span>
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

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <div className="text-xs mb-2 text-green-400/60">
            $ cat about.txt
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-sm leading-relaxed text-green-400/90"
              as="p"
            />
          ) : (
            <p className="text-sm leading-relaxed text-green-400/90">{personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Skills - Terminal List */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <div className="text-xs mb-3 text-green-400/60">
            $ ls skills/
          </div>
          {editable ? (
            <InlineEditableSkills path="skills" skills={skills} />
          ) : (
            <div className="grid grid-cols-3 gap-2 text-sm">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span style={{ color: themeColor }}>▸</span>
                  <span className="text-green-400/90">{skill.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <div className="text-xs mb-4 text-green-400/60">
            $ cat experience.log
          </div>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-green-400/30 pl-4">
                <div className="mb-2">
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.position`}
                      value={exp.position}
                      className="text-lg font-bold"
                      as="h3"
                      style={{ color: themeColor }}
                    />
                  ) : (
                    <h3 className="text-lg font-bold" style={{ color: themeColor }}>{exp.position}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.company`}
                      value={exp.company}
                      className="text-sm text-green-400/80"
                      as="p"
                    />
                  ) : (
                    <p className="text-sm text-green-400/80">{exp.company}</p>
                  )}
                  <p className="text-xs text-green-400/60">
                    [{exp.startDate} - {exp.endDate || "Present"}]
                  </p>
                </div>

                {exp.description && (
                  <div className="text-sm text-green-400/90 mt-2">
                    {editable ? (
                      <InlineEditableList
                        path={`experience.${index}.description`}
                        items={exp.description.split("\n")}
                      />
                    ) : (
                      <ul className="list-none space-y-1">
                        {exp.description.split("\n").map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span style={{ color: themeColor }}>$</span>
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
      {education && education.length > 0 && (
        <div className="mb-8">
          <div className="text-xs mb-4 text-green-400/60">
            $ cat education.txt
          </div>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.degree`}
                    value={edu.degree}
                    className="text-base font-bold"
                    as="h3"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <h3 className="text-base font-bold" style={{ color: themeColor }}>{edu.degree}</h3>
                )}
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.institution`}
                    value={edu.institution}
                    className="text-sm text-green-400/80"
                    as="p"
                  />
                ) : (
                  <p className="text-sm text-green-400/80">{edu.institution}</p>
                )}
                <p className="text-xs text-green-400/60">[{edu.graduationDate}]</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {sections &&
        sections.map((section, index) => (
          <div key={index} className="mb-8">
            <div className="text-xs mb-3 text-green-400/60">
              $ cat {section.title.toLowerCase().replace(/\s+/g, '_')}.txt
            </div>
            <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TerminalThemeTemplate;
