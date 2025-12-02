import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Plus, X } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const MinimalTemplate = ({ resumeData, themeColor, editable = false, onAddBulletPoint, onRemoveBulletPoint }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white px-16 py-12 text-gray-900" style={{ pageBreakAfter: 'auto' }}>
      {/* Header */}
      <div className="mb-8 text-center max-w-4xl mx-auto" style={{ pageBreakAfter: 'avoid', pageBreakInside: 'avoid' }}>
        <div className="flex justify-center mb-4">
          <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
        </div>
        {editable ? (
          <>
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-4xl font-light text-gray-900 mb-2 tracking-tight block"
              as="h1"
            />
            {resumeData.personalInfo.title && (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-base text-gray-600 font-light mb-4 tracking-wide block"
                as="p"
              />
            )}
          </>
        ) : (
          <>
            <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-base text-gray-600 font-light mb-4 tracking-wide">
                {resumeData.personalInfo.title}
              </p>
            )}
          </>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          {resumeData.personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {editable ? (
                <InlineEditableText path="personalInfo.email" value={resumeData.personalInfo.email} className="inline-block" />
              ) : resumeData.personalInfo.email}
            </span>
          )}
          {resumeData.personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {editable ? (
                <InlineEditableText path="personalInfo.phone" value={resumeData.personalInfo.phone} className="inline-block" />
              ) : resumeData.personalInfo.phone}
            </span>
          )}
          {resumeData.personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {editable ? (
                <InlineEditableText path="personalInfo.location" value={resumeData.personalInfo.location} className="inline-block" />
              ) : resumeData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-sm text-gray-700 leading-relaxed font-light block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Social Links */}
      {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
        <div className="mb-8 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            {resumeData.personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin className="h-3.5 w-3.5" />
                {editable ? (
                  <InlineEditableText path="personalInfo.linkedin" value={resumeData.personalInfo.linkedin} className="inline-block" />
                ) : (
                  <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    LinkedIn
                  </a>
                )}
              </span>
            )}
            {resumeData.personalInfo.portfolio && (
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {editable ? (
                  <InlineEditableText path="personalInfo.portfolio" value={resumeData.personalInfo.portfolio} className="inline-block" />
                ) : (
                  <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    Portfolio
                  </a>
                )}
              </span>
            )}
            {resumeData.personalInfo.github && (
              <span className="flex items-center gap-1.5">
                <Github className="h-3.5 w-3.5" />
                {editable ? (
                  <InlineEditableText path="personalInfo.github" value={resumeData.personalInfo.github} className="inline-block" />
                ) : (
                  <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    GitHub
                  </a>
                )}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 mb-5 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Experience
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
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
                  description: "Job description",
                  bulletPoints: ["Achievement 1", "Achievement 2"],
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position || "Position Title"}
                          className="text-base font-semibold text-gray-900 block"
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company || "Company Name"}
                          className="text-sm text-gray-600 font-light block"
                          as="p"
                        />
                      </div>
                      <div className="text-xs text-gray-500 font-light whitespace-nowrap flex items-center gap-1">
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                        <span> — </span>
                        {exp.current ? (
                          <span>Present</span>
                        ) : (
                          <InlineEditableDate
                            path={`experience[${index}].endDate`}
                            value={exp.endDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                        )}
                      </div>
                    </div>
                    {exp.description && (
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line block mb-3"
                        multiline
                        as="p"
                      />
                    )}
                    {(!exp.bulletPoints || exp.bulletPoints.length === 0) && editable && onAddBulletPoint && exp.id && (
                      <div className="mt-3">
                        <button
                          onClick={(e) => {
                            console.log("🟡 Button clicked! exp:", { id: exp.id, company: exp.company, position: exp.position });
                            console.log("🟡 onAddBulletPoint function:", onAddBulletPoint);
                            e.preventDefault();
                            e.stopPropagation();
                            if (onAddBulletPoint && exp.id) {
                              console.log("🟡 Calling onAddBulletPoint with id:", exp.id);
                              onAddBulletPoint(exp.id);
                            } else {
                              console.error("🟡 onAddBulletPoint or exp.id is missing!", { onAddBulletPoint: !!onAddBulletPoint, expId: exp.id });
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
                      <div className="mt-3">
                        <ul className="space-y-1">
                          {exp.bulletPoints.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="text-sm text-gray-700 leading-relaxed font-light flex items-start group">
                              <span className="mr-2 mt-1">•</span>
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
                              console.log("🟡 Button clicked (when bulletPoints exist)! exp:", { id: exp.id, company: exp.company, position: exp.position, bulletPoints: exp.bulletPoints });
                              e.preventDefault();
                              e.stopPropagation();
                              if (onAddBulletPoint && exp.id) {
                                console.log("🟡 Calling onAddBulletPoint with id:", exp.id);
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
              resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0" style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {exp.position || "Position Title"}
                      </h3>
                      <p className="text-sm text-gray-600 font-light">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line mb-3">
                      {exp.description}
                    </p>
                  )}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div className="mt-3">
                      <ul className="space-y-1">
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          bullet && (
                            <li key={bulletIndex} className="text-sm text-gray-700 leading-relaxed font-light flex">
                              <span className="mr-2">•</span>
                              <span>{bullet}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 mb-5 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Education
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: Date.now().toString(),
                  degree: "Degree",
                  field: "",
                  school: "School Name",
                  startDate: "2023-01",
                  endDate: "2024-01",
                  gpa: "",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="flex justify-between items-start gap-4" style={{ pageBreakInside: 'avoid' }}>
                    <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree || "Degree"}
                        className="text-base font-semibold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field || ""}
                        className="text-sm text-gray-600 font-light block"
                        as="p"
                      />
                      {edu.gpa && (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={edu.gpa}
                          className="text-xs text-gray-500 font-light block"
                          as="p"
                        />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 font-light whitespace-nowrap flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span> — </span>
                      <InlineEditableDate
                        path={`education[${index}].endDate`}
                        value={edu.endDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                    </div>
                  </div>
                )}
              />
            ) : (
              resumeData.education.map((edu) => (
                <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {edu.degree || "Degree"} {edu.field && `, ${edu.field}`}
                      </h3>
                      <p className="text-sm text-gray-600 font-light">
                        {edu.school || "School Name"}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-500 font-light">
                          Grade: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-semibold text-gray-900 mb-5 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-2 max-w-4xl mx-auto">
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) =>
                  skill.name && (
                    <span className="px-3 py-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-full font-light tracking-wide">
                      {skill.name}
                    </span>
                  )
                }
              />
            ) : (
              resumeData.skills.map((skill) => 
                skill.name && (
                  <span
                    key={skill.id}
                    className="px-3 py-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-full font-light tracking-wide"
                  >
                    {skill.name}
                  </span>
                )
              )
            )}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      <MinimalCustomSections 
        sections={resumeData.sections}
        editable={editable}
        themeColor={themeColor}
      />
    </div>
  );
};

// Separate component for Custom Sections to use hooks
const MinimalCustomSections = ({ 
  sections, 
  editable, 
  themeColor 
}: { 
  sections: ResumeData['sections']; 
  editable: boolean; 
  themeColor?: string;
}) => {
  const inlineEditContext = useInlineEdit();
  const addArrayItem = inlineEditContext?.addArrayItem;
  const removeArrayItem = inlineEditContext?.removeArrayItem;

  const handleAddSection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!addArrayItem) return;
    addArrayItem('sections', {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      items: ['Sample item 1', 'Sample item 2'],
    });
  };

  const handleRemoveSection = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!removeArrayItem) return;
    removeArrayItem('sections', index);
  };

  const accent = themeColor || "#2563eb";

  return (
    <>
      {sections.map((section, index) => (
        <div key={section.id} className="mb-8 group/section" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
              {editable ? (
                <InlineEditableText path={`sections[${index}].title`} value={section.title} className="inline-block" />
              ) : section.title}
            </h2>
            {editable && (
              <button
                onClick={(e) => handleRemoveSection(e, index)}
                className="opacity-0 group-hover/section:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 -mt-4"
                style={{ color: '#ef4444' }}
                title="Remove Section"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Use InlineEditableSectionItems for dynamic content */}
          <InlineEditableSectionItems
            sectionIndex={index}
            items={section.items || []}
            content={section.content || ""}
            editable={editable}
            itemStyle={{ fontSize: '14px', color: '#374151', lineHeight: '1.625', fontWeight: '300' }}
            containerStyle={{ maxWidth: '56rem', margin: '0 auto' }}
            addButtonLabel="Add Item"
            placeholder="Click to add item..."
            accentColor={accent}
            showBullets={false}
          />
        </div>
      ))}

      {/* Add Section Button */}
      {editable && (
        <div className="flex justify-center">
          <button
            onClick={handleAddSection}
            className="mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-4 w-4" />
            Add Section
          </button>
        </div>
      )}
    </>
  );
};
