import React from "react";
import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X, Linkedin, Globe, Github } from "lucide-react";

interface TwoToneClassicTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const TwoToneClassicTemplate = ({
  resumeData,
  themeColor = "#334155",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: TwoToneClassicTemplateProps) => {
  const hexToRgba = (hex: string, alpha = 1) => {
    const cleanedHex = hex.replace("#", "");
    if (cleanedHex.length !== 6) {
      return hex;
    }
    const r = parseInt(cleanedHex.slice(0, 2), 16);
    const g = parseInt(cleanedHex.slice(2, 4), 16);
    const b = parseInt(cleanedHex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const lightTone = hexToRgba(themeColor, 0.08);

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

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

        {/* Social Links */}
        {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
          <div className="mb-10 p-6 rounded" style={{ backgroundColor: lightTone }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>
              Social Links
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              {resumeData.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.linkedin"
                      value={resumeData.personalInfo.linkedin}
                      className="inline-block"
                    />
                  ) : (
                    <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
              {resumeData.personalInfo.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.portfolio"
                      value={resumeData.personalInfo.portfolio}
                      className="inline-block"
                    />
                  ) : (
                    <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Portfolio
                    </a>
                  )}
                </div>
              )}
              {resumeData.personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.github"
                      value={resumeData.personalInfo.github}
                      className="inline-block"
                    />
                  ) : (
                    <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
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
                <div key={index} className={index % 2 === 0 ? "p-6 rounded group" : "p-6 group"} style={index % 2 === 0 ? { backgroundColor: lightTone } : {}}>
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
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="space-y-2 list-none mt-3">
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-gray-700 leading-relaxed flex items-start">
                          <span className="mr-2" style={{ color: themeColor }}>•</span>
                          {editable ? (
                            <InlineEditableText
                              path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                              value={bullet || ""}
                              placeholder="Click to add achievement..."
                              className="text-gray-700 leading-relaxed flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                              multiline
                              as="span"
                            />
                          ) : (
                            bullet && <span>{bullet}</span>
                          )}
                          {editable && onRemoveBulletPoint && (
                            <button
                              onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded ml-2"
                            >
                              <X className="h-3 w-3 text-red-500" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Add bullet point button */}
                  {editable && onAddBulletPoint && exp.id && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onAddBulletPoint && exp.id) {
                          onAddBulletPoint(exp.id);
                        }
                      }}
                      className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="h-3 w-3" />
                      Add Achievement
                    </button>
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
                          value={edu.school}
                          className="text-gray-700"
                          as="p"
                        />
                      ) : (
                        <p className="text-gray-700">{edu.school}</p>
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
        {editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections || []}
            addButtonLabel="Add Section"
            defaultItem={{
              id: Date.now().toString(),
              title: "Custom Section",
              content: "Add details here",
            }}
            renderItem={(section, index) => (
              <div key={section.id || index} className="mb-8">
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-2xl font-bold mb-6 pb-2 border-b-2 block"
                  style={{ color: themeColor, borderColor: themeColor }}
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-gray-700 leading-relaxed whitespace-pre-line block"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.length > 0 &&
          resumeData.sections.map((section, index) => (
            <div key={section.id || index} className="mb-8">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TwoToneClassicTemplate;
