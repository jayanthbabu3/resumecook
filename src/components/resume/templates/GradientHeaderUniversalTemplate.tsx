import { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X, Linkedin, Globe, Github } from "lucide-react";

interface GradientHeaderUniversalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (experienceId: string) => void;
  onRemoveBulletPoint?: (experienceId: string, bulletIndex: number) => void;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

export const GradientHeaderUniversalTemplate = ({
  resumeData,
  themeColor = "#3b82f6",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: GradientHeaderUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#3b82f6";

  return (
    <div className="w-full h-full bg-white text-gray-900 text-[13px] leading-relaxed">
      {/* Gradient Header */}
      <div className="p-10 text-white" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)` }}>
        {editable ? (
          <>
            <InlineEditableText path="personalInfo.fullName" value={resumeData.personalInfo.fullName} className="text-[36px] font-bold mb-3 block text-white" as="h1" />
            <InlineEditableText path="personalInfo.title" value={resumeData.personalInfo.title || "Professional Title"} className="text-[16px] mb-5 block text-white opacity-95" as="p" />
          </>
        ) : (
          <>
            <h1 className="text-[36px] font-bold mb-3">{resumeData.personalInfo.fullName}</h1>
            <p className="text-[16px] mb-5 opacity-95">{resumeData.personalInfo.title || "Professional Title"}</p>
          </>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] opacity-90">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-12">
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: accent }}>Professional Summary</h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-sm text-gray-700 leading-relaxed font-light"
                multiline
                as="p"
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed font-light">{resumeData.personalInfo.summary}</p>
            )}
          </div>
        )}

        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: accent }}>Work Experience</h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience}
                defaultItem={{
                  id: Date.now().toString(),
                  position: "Job Title",
                  company: "Company Name",
                  startDate: "2020-01",
                  endDate: "2023-12",
                  current: false,
                  description: "",
                  bulletPoints: [],
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div key={exp.id} className="mb-8 group">
                    <div className="flex justify-between items-baseline mb-3 border-b border-gray-200 pb-2">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-base font-semibold text-gray-900"
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-sm font-light"
                          as="p"
                          style={{ color: accent }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 ml-4 flex items-center gap-1">
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                        <span> - </span>
                        <InlineEditableDate
                          path={`experience[${index}].endDate`}
                          value={exp.endDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                      </div>
                    </div>

                    {/* Bullet Points */}
                    {(!exp.bulletPoints || exp.bulletPoints.length === 0) && editable && onAddBulletPoint && exp.id && (
                      <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onAddBulletPoint && exp.id) {
                              onAddBulletPoint(exp.id);
                            }
                          }}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-light"
                        >
                          <Plus className="h-3 w-3" />
                          Add Achievement
                        </button>
                      </div>
                    )}
                    {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                      <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                        <ul className="space-y-2">
                          {exp.bulletPoints.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="flex gap-3 items-start group">
                              <span className="text-gray-400 mt-1">•</span>
                              <div className="flex-1 flex items-center gap-2">
                                <InlineEditableText
                                  path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                  value={bullet || ""}
                                  placeholder="Click to add achievement..."
                                  className="text-sm text-gray-700 leading-relaxed font-light flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                  multiline
                                  as="span"
                                />
                                {editable && onRemoveBulletPoint && (
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
                        {editable && onAddBulletPoint && exp.id && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (onAddBulletPoint && exp.id) {
                                onAddBulletPoint(exp.id);
                              }
                            }}
                            className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-light"
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
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-sm font-light" style={{ color: accent }}>{exp.company}</p>
                      </div>
                      <p className="text-xs text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                      <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700 leading-relaxed">
                        {exp.bulletPoints.map((point, i) => <li key={i}>{point}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-10 mb-8">
          {resumeData.education && resumeData.education.length > 0 && (
            <div data-section="education" style={{ lineHeight: 1.8 }}>
              <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: accent }}>Education</h2>
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
                    <div key={edu.id} className="mb-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <InlineEditableText
                            path={`education[${index}].degree`}
                            value={edu.degree}
                            className="text-base font-semibold text-gray-900"
                            as="h3"
                          />
                          {edu.field && (
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              className="text-sm text-gray-600 font-light mt-1"
                              as="p"
                            />
                          )}
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            className="text-sm text-gray-600 font-light"
                            as="p"
                          />
                          {edu.gpa && (
                            <InlineEditableText
                              path={`education[${index}].gpa`}
                              value={`GPA: ${edu.gpa}`}
                              className="text-xs text-gray-500 font-light mt-1"
                              as="p"
                            />
                          )}
                        </div>
                        <div className="text-xs text-gray-500 ml-4 flex items-center gap-1">
                          <InlineEditableDate
                            path={`education[${index}].startDate`}
                            value={edu.startDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                          <span> - </span>
                          <InlineEditableDate
                            path={`education[${index}].endDate`}
                            value={edu.endDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                          {edu.field && <p className="text-sm text-gray-600 font-light mt-1">{edu.field}</p>}
                          <p className="text-sm text-gray-600 font-light">{edu.school}</p>
                          {edu.gpa && <p className="text-xs text-gray-500 font-light mt-1">GPA: {edu.gpa}</p>}
                        </div>
                        <div className="text-xs text-gray-500 ml-4">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: accent }}>Skills</h2>
              {editable ? (
                <div className="flex flex-wrap gap-2">
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills}
                    renderSkill={(skill, index) => (
                      <span
                        className="px-2.5 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: accent, color: 'white' }}
                      >
                        {skill.name}
                      </span>
                    )}
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: accent, color: 'white' }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Social Links */}
        {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: accent }}>Social Links</h2>
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
              <div key={section.id || index} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-xs font-semibold mb-5 uppercase tracking-widest pb-2 border-b-2 block"
                  style={{ color: accent, borderColor: accent, pageBreakAfter: 'avoid' }}
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line block"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          <>
            {resumeData.sections && resumeData.sections.length > 0 && (
              <>
                {resumeData.sections.map((section, index) => (
                  <div key={section.id || index} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
                    <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: accent, borderColor: accent, pageBreakAfter: 'avoid' }}>
                      {section.title}
                    </h2>
                    <div className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-wrap">
                      {section.content}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
