import React from "react";
import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";

interface BorderedEleganceTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = parseInt(month, 10) - 1;
  if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return date;
  return `${monthNames[monthIndex]} ${year}`;
};

export const BorderedEleganceTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
  editable = false,
}: BorderedEleganceTemplateProps) => {
  const { addBulletPoint, removeBulletPoint } = useInlineEdit() || {};

  return (
    <div className="w-full h-full bg-white text-gray-900 p-8">
      {/* Outer Decorative Border */}
      <div className="border border-double h-full p-10" style={{ borderColor: themeColor }}>
        {/* Inner Content */}
        <div className="h-full">
          {/* Header with Decorative Elements */}
          <div className="text-center mb-10 pb-6 border-b-2" style={{ borderColor: themeColor }}>
            <div className="mb-2">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-5xl font-serif font-bold"
                  as="h1"
                />
              ) : (
                <h1 className="text-5xl font-serif font-bold">
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
                    className="text-lg font-medium uppercase tracking-widest"
                    as="p"
                    style={{ color: themeColor }}
                  />
                ) : (
                  <p className="text-lg font-medium uppercase tracking-widest" style={{ color: themeColor }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </div>
            )}

            {/* Contact Info - Centered */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <div>
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
                  <span>|</span>
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
                  <span>|</span>
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
            <div className="mb-10 text-center">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-gray-700 leading-relaxed italic"
                  as="p"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed italic">{resumeData.personalInfo.summary}</p>
              )}
            </div>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                Professional Experience
              </h2>
              {editable ? (
                <InlineEditableList
                  path="experience"
                  items={resumeData.experience}
                  defaultItem={{
                    id: Date.now().toString(),
                    company: "Company Name",
                    position: "Position Title",
                    startDate: "2023-01",
                    endDate: "2024-01",
                    description: "",
                    bulletPoints: ["Achievement or responsibility"],
                    current: false,
                  }}
                  addButtonLabel="Add Experience"
                  renderItem={(exp, index) => {
                    const hasBullets = Array.isArray(exp.bulletPoints) && exp.bulletPoints.length > 0;
                    return (
                      <div className="border-l pl-6 py-2 space-y-2" style={{ borderColor: themeColor }}>
                        <div className="flex justify-between items-start">
                      <div className="flex-1">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                              className="text-xl font-bold text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-lg italic"
                            as="p"
                            style={{ color: themeColor }}
                          />
                          </div>
                          <div className="text-sm text-gray-500 ml-4 whitespace-nowrap flex items-center gap-1">
                            <InlineEditableDate
                              path={`experience[${index}].startDate`}
                              value={exp.startDate}
                              className="inline-block"
                            />
                            <span>-</span>
                            {exp.current ? (
                              <span>Present</span>
                            ) : (
                              <InlineEditableDate
                                path={`experience[${index}].endDate`}
                                value={exp.endDate}
                                className="inline-block"
                              />
                        )}
                      </div>
                        </div>
                        <div className="space-y-2">
                          {hasBullets ? (
                            exp.bulletPoints!.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className="flex items-start gap-2 group">
                                <span className="text-gray-400 mt-1">—</span>
                                <InlineEditableText
                                  path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                  value={bullet || ""}
                                  placeholder="Click to add achievement..."
                                  className="text-sm text-gray-700 leading-relaxed flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                  multiline
                                  as="span"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded text-red-500"
                                  disabled={exp.bulletPoints!.length <= 1}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 italic">No bullet points yet.</div>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addBulletPoint?.(exp.id);
                            }}
                            className="mt-1 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            <Plus className="h-3 w-3" />
                            Add Achievement
                          </button>
                        </div>
                      </div>
                    );
                  }}
                          />
                        ) : (
                <div className="space-y-6">
                  {resumeData.experience.map((exp) => {
                    const bullets =
                      exp.bulletPoints && exp.bulletPoints.length > 0
                        ? exp.bulletPoints
                        : (exp.description || "")
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean);
                    return (
                      <div key={exp.id} className="border-l pl-6 py-2 space-y-2" style={{ borderColor: themeColor }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                            <p className="text-lg italic" style={{ color: themeColor }}>
                              {exp.company}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </div>
                        </div>
                        {bullets.length > 0 && (
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {bullets.map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                      </div>
                    )}
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-10" data-section="education" style={{ lineHeight: 1.8 }}>
              <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                Education
              </h2>
                    {editable ? (
                <InlineEditableList
                  path="education"
                  items={resumeData.education}
                  defaultItem={{
                    id: Date.now().toString(),
                    school: "School Name",
                    degree: "Degree",
                    field: "Field of Study",
                    startDate: "2019-09",
                    endDate: "2023-05",
                    gpa: "",
                  }}
                  addButtonLabel="Add Education"
                  renderItem={(edu, index) => (
                    <div className="text-center space-y-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-lg font-bold text-gray-900 block"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-sm text-gray-600 italic block"
                          as="p"
                        />
                    )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-gray-700 italic block"
                        as="p"
                      />
                      <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        <InlineEditableDate
                          path={`education[${index}].startDate`}
                          value={edu.startDate}
                          className="inline-block"
                        />
                        <span>-</span>
                        <InlineEditableDate
                          path={`education[${index}].endDate`}
                          value={edu.endDate}
                          className="inline-block"
                        />
                      </div>
                      {edu.gpa && (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={edu.gpa}
                          className="text-xs text-gray-500 block"
                          as="p"
                        />
                      )}
                    </div>
                  )}
                      />
                    ) : (
                <div className="space-y-4 text-center">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-sm text-gray-600 italic">{edu.field}</p>}
                      <p className="text-gray-700 italic">{edu.school}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
              )}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                Skills & Expertise
              </h2>
              {editable ? (
                <InlineEditableSkills path="skills" skills={resumeData.skills} />
              ) : (
                <div className="flex flex-wrap justify-center gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border font-medium"
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
          {editable ? (
            <InlineEditableList
              
              items={resumeData.sections || []}
              addButtonLabel="Add Section"
              defaultItem={{
                id: Date.now().toString(),
                title: "Custom Section",
                content: "",
                items: ["New item"],
              }}
              renderItem={(section, index) => (
                <div key={section.id || index} className="mb-8">
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b block"
                    style={{ color: themeColor, borderColor: themeColor }}
                    as="h2"
                  />
                  <InlineEditableSectionItems
                    sectionIndex={index}
                    items={section.items || []}
                    content={section.content || ""}
                    editable={true}
                    itemStyle={{ fontSize: '13px', color: '#374151', lineHeight: '1.7' }}
                    containerStyle={{ marginTop: '12px' }}
                    addButtonLabel="Add Item"
                    placeholder="Click to add item..."
                    accentColor={themeColor}
                    showBullets={true}
                  />
                </div>
              )}
            />
          ) : (
            resumeData.sections &&
            resumeData.sections.length > 0 &&
            resumeData.sections.map((section, index) => (
              <div key={section.id || index} className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
                  {section.title}
                </h2>
                <InlineEditableSectionItems
                  sectionIndex={index}
                  items={section.items || []}
                  content={section.content || ""}
                  editable={false}
                  itemStyle={{ fontSize: '13px', color: '#374151', lineHeight: '1.7' }}
                  containerStyle={{ marginTop: '12px' }}
                  showBullets={true}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BorderedEleganceTemplate;
