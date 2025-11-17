import React from "react";
import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";

interface TimelineEleganceTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const TimelineEleganceTemplate = ({
  resumeData,
  themeColor = "#2c3e50",
  editable = false,
}: TimelineEleganceTemplateProps) => {

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Header Section */}
      <div className="mb-10 border-b-4 pb-6" style={{ borderColor: themeColor }}>
        <div className="mb-3">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-5xl font-light tracking-wide"
              as="h1"
            />
          ) : (
            <h1 className="text-5xl font-light tracking-wide">
              {resumeData.personalInfo.fullName}
            </h1>
          )}
        </div>

        {resumeData.personalInfo.title && (
          <div className="mb-4">
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-xl font-normal uppercase tracking-widest"
                as="p"
                style={{ color: themeColor }}
              />
            ) : (
              <p className="text-xl font-normal uppercase tracking-widest" style={{ color: themeColor }}>
                {resumeData.personalInfo.title}
              </p>
            )}
          </div>
        )}

        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <span>✉</span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="hover:text-gray-900"
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
                  className="hover:text-gray-900"
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
                  className="hover:text-gray-900"
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
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-4" style={{ color: themeColor }}>
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

      {/* Experience - Timeline Style */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6" style={{ color: themeColor }}>
            Professional Experience
          </h2>
          <div className="relative pl-8 border-l-2" style={{ borderColor: themeColor }}>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-8 relative">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[37px] w-4 h-4 rounded-full border-4 border-white"
                  style={{ backgroundColor: themeColor }}
                />

                <div className="flex justify-between items-start mb-2">
                  <div>
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-xl font-semibold"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                    )}
                    {editable ? (
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-lg italic"
                        as="p"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <p className="text-lg italic" style={{ color: themeColor }}>
                        {exp.company}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <div className="text-gray-700 leading-relaxed mb-3">
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
          <h2 className="text-2xl font-light mb-6" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="relative pl-8 border-l-2" style={{ borderColor: themeColor }}>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-6 relative">
                <div
                  className="absolute -left-[37px] w-4 h-4 rounded-full border-4 border-white"
                  style={{ backgroundColor: themeColor }}
                />

                <div className="flex justify-between items-start mb-2">
                  <div>
                    {editable ? (
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-xl font-semibold"
                        as="h3"
                      />
                    ) : (
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    )}
                    {editable ? (
                      <InlineEditableText
                        path={`education[${index}].institution`}
                        value={edu.institution}
                        className="text-lg italic"
                        as="p"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <p className="text-lg italic" style={{ color: themeColor }}>
                        {edu.institution}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
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
          <h2 className="text-2xl font-light mb-4" style={{ color: themeColor }}>
            Core Competencies
          </h2>
          {editable ? (
            <InlineEditableSkills path="skills" skills={resumeData.skills} />
          ) : (
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border-2 text-sm font-medium"
                  style={{ borderColor: themeColor, color: themeColor }}
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
            <h2 className="text-2xl font-light mb-4" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TimelineEleganceTemplate;
