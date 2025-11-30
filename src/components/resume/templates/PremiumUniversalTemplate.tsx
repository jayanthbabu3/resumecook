import { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumUniversalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

export const PremiumUniversalTemplate = ({
  resumeData,
  themeColor = "#2563eb",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: PremiumUniversalTemplateProps) => {
  console.log('🔴 PremiumUniversalTemplate rendered:', {
    editable,
    hasAddBulletPoint: !!onAddBulletPoint,
    hasRemoveBulletPoint: !!onRemoveBulletPoint,
    experienceCount: resumeData.experience?.length || 0,
    educationCount: resumeData.education?.length || 0,
    experienceData: resumeData.experience?.map(e => ({ 
      id: e.id, 
      position: e.position, 
      bulletPoints: e.bulletPoints,
      hasBulletPoints: !!(e.bulletPoints && e.bulletPoints.length > 0)
    })),
    educationData: resumeData.education?.map(e => ({ 
      id: e.id, 
      school: e.school, 
      degree: e.degree,
      gpa: e.gpa,
      hasGpa: !!e.gpa
    }))
  });
  
  const accent = normalizeHex(themeColor) ?? "#2563eb";
  const accentBorder = withOpacity(accent, "33") ?? "#c7d2fe";
  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {/* Header */}
      <div className="mb-8 pb-5 border-b" style={{ borderColor: accent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="text-[30px] font-bold mb-2 block"
            style={{ color: accent }}
            as="h1"
          />
        ) : (
          <h1 className="text-[30px] font-bold mb-2" style={{ color: accent }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-gray-600">
          {resumeData.personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={resumeData.personalInfo.email}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.email}</span>
            )
          )}
          {resumeData.personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={resumeData.personalInfo.phone}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.phone}</span>
            )
          )}
          {resumeData.personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={resumeData.personalInfo.location}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.location}</span>
            )
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[12.5px] text-gray-700 leading-[1.7] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.7]">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
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
                description: "Job description here",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14px] font-semibold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[12.5px] text-gray-700 font-medium block"
                        as="p"
                      />
                    </div>
                    <div className="text-right text-[11px] text-gray-600">
                      <p>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            className="inline-block"
                          />
                          <span> - </span>
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
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <InlineEditableText
                      path={`experience[${index}].description`}
                      value={exp.description}
                      className="text-[12.5px] text-gray-700 leading-[1.7] block"
                      multiline
                      as="div"
                    />
                  )}
                  {/* Bullet Points - Editable Mode */}
                  {(!exp.bulletPoints || exp.bulletPoints.length === 0) && onAddBulletPoint && exp.id && (
                    <div className="mt-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (onAddBulletPoint && exp.id) {
                            onAddBulletPoint(exp.id);
                          }
                        }}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Plus className="h-3 w-3" />
                        Add Achievement
                      </button>
                    </div>
                  )}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div className="mt-3">
                      <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start group">
                            <div className="flex-1 flex items-center gap-2">
                              <InlineEditableText
                                path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                value={bullet || ""}
                                placeholder="Click to add achievement..."
                                className="text-[12.5px] text-gray-700 leading-[1.7] flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                multiline
                                as="span"
                              />
                              {onRemoveBulletPoint && (
                                <button
                                  onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                                >
                                  <X className="h-3 w-3 text-red-500" />
                                </button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {onAddBulletPoint && exp.id && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onAddBulletPoint && exp.id) {
                              onAddBulletPoint(exp.id);
                            }
                          }}
                          className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <Plus className="h-3 w-3" />
                          Add Achievement
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            />
          ) : (
            resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-[12.5px] text-gray-700 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-gray-600">
                    <p>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                </div>
                
                {/* Bullet Points - Editable Mode */}
                {editable ? (
                  <>
                    {(!exp.bulletPoints || exp.bulletPoints.length === 0) && onAddBulletPoint && exp.id && (
                      <div className="mt-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onAddBulletPoint && exp.id) {
                              onAddBulletPoint(exp.id);
                            }
                          }}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <Plus className="h-3 w-3" />
                          Add Achievement
                        </button>
                      </div>
                    )}
                    {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                      <div className="mt-3">
                        <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                          {exp.bulletPoints.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="flex items-start group">
                              <span className="mr-2">•</span>
                              <div className="flex-1 flex items-center gap-2">
                                <InlineEditableText
                                  path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                  value={bullet || ""}
                                  placeholder="Click to add achievement..."
                                  className="text-[12.5px] text-gray-700 leading-[1.7] flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                  multiline
                                  as="span"
                                />
                                {onRemoveBulletPoint && (
                                  <button
                                    onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                                  >
                                    <X className="h-3 w-3 text-red-500" />
                                  </button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                        {onAddBulletPoint && exp.id && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (onAddBulletPoint && exp.id) {
                                onAddBulletPoint(exp.id);
                              }
                            }}
                            className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            <Plus className="h-3 w-3" />
                            Add Achievement
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  /* Bullet Points - Non-Editable Mode */
                  exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        bullet && (
                          <li key={bulletIndex}>{bullet}</li>
                        )
                      ))}
                    </ul>
                  )
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
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
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                        className="text-[14px] font-semibold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[12.5px] text-gray-700 block"
                        as="p"
                      />
                      {edu.gpa && (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={`Grade: ${edu.gpa}`}
                          className="text-[11.5px] text-gray-600 block"
                          as="p"
                        />
                      )}
                    </div>
                    <div className="text-right text-[11px] text-gray-600">
                      <p>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          ) : (
            resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-[12.5px] text-gray-700">{edu.school}</p>
                    {edu.gpa && (
                      <p className="text-[11.5px] text-gray-600">Grade: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-right text-[11px] text-gray-600">
                    <p>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) => (
                <span
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded"
                  style={{ border: `1px solid ${accentBorder}` }}
                >
                  {skill.name}
                </span>
              )}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded"
                  style={{ border: `1px solid ${accentBorder}` }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && (
        editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections}
            defaultItem={{
              id: Date.now().toString(),
              title: "New Section",
              content: "Section content here",
            }}
            addButtonLabel="Add Section"
            renderItem={(section, sectionIndex) => (
              <div className="mb-8">
                <InlineEditableText
                  path={`sections[${sectionIndex}].title`}
                  value={section.title}
                  className="text-[15px] font-semibold mb-3 uppercase tracking-wide block"
                  style={{ color: accent }}
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${sectionIndex}].content`}
                  value={section.content}
                  className="text-[12.5px] text-gray-700 leading-[1.7] block whitespace-pre-line"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide" style={{ color: accent }}>
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.7]">
                {section.content.split("\n").map((line, i) => (
                  <p key={i} className="mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};
