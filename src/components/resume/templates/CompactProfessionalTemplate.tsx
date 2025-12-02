import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface CompactProfessionalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CompactProfessionalTemplate = ({
  resumeData,
  themeColor = "#059669",
  editable = false,
}: CompactProfessionalTemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 px-10 py-8">
      {/* Compact Header */}
      <div className="mb-6 pb-4 border-b" style={{ borderColor: themeColor }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-3xl font-bold mb-1"
                as="h1"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-1">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-base font-medium"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-base font-medium" style={{ color: themeColor }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Contact Info - Compact Right Side */}
          <div className="text-xs text-gray-600 text-right space-y-1">
            {resumeData.personalInfo.email && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className=""
                    as="div"
                  />
                ) : (
                  <div>{resumeData.personalInfo.email}</div>
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
                    as="div"
                  />
                ) : (
                  <div>{resumeData.personalInfo.phone}</div>
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
                    as="div"
                  />
                ) : (
                  <div>{resumeData.personalInfo.location}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary - Compact */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-xs text-gray-700 leading-relaxed"
              as="p"
            />
          ) : (
            <p className="text-xs text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Experience - Compact */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex-1">
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-sm font-bold text-gray-900"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>
                {editable ? (
                  <InlineEditableText
                    path={`experience[${index}].company`}
                    value={exp.company}
                    className="text-xs font-medium mb-2"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-xs font-medium mb-2" style={{ color: themeColor }}>
                    {exp.company}
                  </p>
                )}

                {exp.description && (
                  <div className="text-xs text-gray-700 leading-snug">
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="whitespace-pre-line"
                        multiline
                        as="div"
                      />
                    ) : (
                      <ul className="list-disc list-inside space-y-0.5 ml-2">
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

      {/* Skills - Compact Grid */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-center rounded"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education - Compact */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="space-y-3">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex-1">
                    {editable ? (
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-sm font-bold text-gray-900"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                    {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.graduationDate}
                  </div>
                </div>
                {editable ? (
                  <InlineEditableText
                    path={`education[${index}].school`}
                    value={edu.school}
                    className="text-xs text-gray-700 block"
                    as="p"
                  />
                ) : (
                  <p className="text-xs text-gray-700">{edu.school}</p>
                )}
                {edu.field && (
                  editable ? (
                    <InlineEditableText
                      path={`education[${index}].field`}
                      value={edu.field}
                      className="text-xs text-gray-600 block"
                      as="p"
                    />
                  ) : (
                    <p className="text-xs text-gray-600">{edu.field}</p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections - Compact */}
      {resumeData.sections &&
        resumeData.sections.map((section, index) => (
          <div key={index} className="mb-6">
            {editable ? (
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="text-sm font-bold uppercase tracking-wide mb-3 block"
                style={{ color: themeColor }}
                as="h2"
              />
            ) : (
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
                {section.title}
              </h2>
            )}
            {editable ? (
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-xs text-gray-700 leading-relaxed whitespace-pre-line block"
                multiline
                as="div"
              />
            ) : (
              <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CompactProfessionalTemplate;
