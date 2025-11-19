import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

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
            value={resumeData.personalInfo.fullName}
            className="text-4xl font-bold mb-2"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="text-4xl font-bold mb-2" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}

        {resumeData.personalInfo.title && (
          <div className="mb-4">
            <span className="text-green-400/60">role@system:~$ </span>
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-lg"
                as="span"
              />
            ) : (
              <span className="text-lg">{resumeData.personalInfo.title}</span>
            )}
          </div>
        )}

        {/* Contact Info - Terminal Style */}
        <div className="space-y-1 text-sm text-green-400/80">
          {resumeData.personalInfo.email && (
            <div>
              <span className="text-green-400/60">email: </span>
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
              <span className="text-green-400/60">phone: </span>
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
              <span className="text-green-400/60">location: </span>
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

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <div className="text-xs mb-2 text-green-400/60">
            $ cat about.txt
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-sm leading-relaxed text-green-400/90"
              as="p"
            />
          ) : (
            <p className="text-sm leading-relaxed text-green-400/90">{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Skills - Terminal List */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <div className="text-xs mb-3 text-green-400/60">
            $ ls resumeData.skills/
          </div>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="grid grid-cols-3 gap-2 text-sm">
              {resumeData.skills.map((skill, index) => (
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
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <div className="text-xs mb-4 text-green-400/60">
            $ cat resumeData.experience.log
          </div>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-green-400/30 pl-4">
                <div className="mb-2">
                  {editable ? (
                    <InlineEditableText
                      path={`experience[${index}].position`}
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
                      path={`experience[${index}].company`}
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
                        path={`experience[${index}].description`}
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
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <div className="text-xs mb-4 text-green-400/60">
            $ cat resumeData.education.txt
          </div>
          <div className="space-y-3">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                {editable ? (
                  <InlineEditableText
                    path={`education[${index}].degree`}
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
                    path={`education[${index}].institution`}
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
      {resumeData.sections &&
        resumeData.sections.map((section, index) => (
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
