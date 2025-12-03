import React from "react";
import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";

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
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = parseInt(month, 10) - 1;
    if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return date;
    return `${monthNames[monthIndex]} ${year}`;
  };

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
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-sm font-bold text-gray-900"
                        as="h3"
                      />
                      <div className="text-xs text-gray-500 ml-3 whitespace-nowrap flex items-center gap-1">
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
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-xs font-medium mb-1"
                      as="p"
                      style={{ color: themeColor }}
                    />
                    <div className="space-y-1">
                      {hasBullets ? (
                        exp.bulletPoints!.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-start gap-2 group">
                            <span className="text-gray-400 mt-1">•</span>
                            <InlineEditableText
                              path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                              value={bullet || ""}
                              placeholder="Click to add achievement..."
                              className="text-xs text-gray-700 leading-snug flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
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
                        <div className="text-xs text-gray-500 italic">No bullet points yet.</div>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addBulletPoint?.(exp.id);
                        }}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
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
            <div className="space-y-4">
              {resumeData.experience.map((exp) => {
                const bullets =
                  exp.bulletPoints && exp.bulletPoints.length > 0
                    ? exp.bulletPoints
                    : (exp.description || "")
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean);
                return (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <p className="text-xs font-medium mb-1" style={{ color: themeColor }}>
                      {exp.company}
                    </p>
                    {bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs text-gray-700">
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
        <div className="mb-6" data-section="education" style={{ lineHeight: 1.8 }}>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
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
                <div className="space-y-1">
                  <InlineEditableText
                    path={`education[${index}].degree`}
                    value={edu.degree}
                    className="text-sm font-bold text-gray-900 block"
                    as="h3"
                  />
                  <InlineEditableText
                    path={`education[${index}].school`}
                    value={edu.school}
                    className="text-xs text-gray-700 block"
                    as="p"
                  />
                  {edu.field && (
                    <InlineEditableText
                      path={`education[${index}].field`}
                      value={edu.field}
                      className="text-xs text-gray-600 block"
                      as="p"
                    />
                  )}
                  <div className="text-xs text-gray-500 flex items-center gap-1">
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
                      className="text-[11px] text-gray-500 block"
                      as="p"
                    />
                  )}
                </div>
              )}
            />
          ) : (
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    <div className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700">{edu.school}</p>
                  {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                  {edu.gpa && <p className="text-[11px] text-gray-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections - Compact */}
      {resumeData.sections && resumeData.sections.length > 0 && (
        <div className="space-y-6">
          {resumeData.sections.map((section, index) => (
            <div key={section.id || index} className="mb-4">
              {editable ? (
                <>
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="text-sm font-bold uppercase tracking-wide mb-3 block"
                    style={{ color: themeColor }}
                    as="h2"
                  />
                  <InlineEditableSectionItems
                    sectionIndex={index}
                    items={section.items || []}
                    content={section.content || ""}
                    editable={true}
                    itemStyle={{ fontSize: '12px', color: '#374151', lineHeight: 1.6 }}
                    addButtonLabel="Add Item"
                    placeholder="Click to add item..."
                    accentColor={themeColor}
                    showBullets={true}
                  />
                </>
              ) : (
                <>
                  <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: themeColor }}>
                    {section.title}
                  </h2>
                  <InlineEditableSectionItems
                    sectionIndex={index}
                    items={section.items || []}
                    content={section.content || ""}
                    editable={false}
                    itemStyle={{ fontSize: '12px', color: '#374151', lineHeight: 1.6 }}
                    showBullets={true}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompactProfessionalTemplate;
