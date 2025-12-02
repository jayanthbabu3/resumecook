import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";

interface PremiumProTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const PremiumProTemplate = ({
  resumeData,
  themeColor = "#0f766e",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: PremiumProTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentTint = `${accent}20`;

  return (
    <div className="w-full h-full bg-white flex text-[13px] leading-relaxed text-gray-900">
      {/* Left Accent Panel */}
      <div 
        className="w-2 flex-shrink-0" 
        style={{ backgroundColor: accent }}
      />
      
      <div className="flex-1 p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-[32px] font-bold text-gray-900 mb-2"
                  as="h1"
                />
              ) : (
                <h1 className="text-[32px] font-bold text-gray-900 mb-2">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}
              {resumeData.personalInfo.title && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-[13px] font-semibold text-gray-600 mb-3"
                    as="p"
                  />
                ) : (
                  <p className="text-[13px] font-semibold text-gray-600 mb-3">
                    {resumeData.personalInfo.title}
                  </p>
                )
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-600">
                {resumeData.personalInfo.email && (
                  editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="text-[12px] text-gray-600"
                      as="span"
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
                      className="text-[12px] text-gray-600"
                      as="span"
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
                      className="text-[12px] text-gray-600"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.location}</span>
                  )
                )}
              </div>
            </div>
            {photo && (
              <div className="ml-6">
                <div style={{ borderColor: accent }} className="border-3 rounded-xl overflow-hidden">
                  <ProfilePhoto
                    src={photo}
                    borderClass=""
                    className="rounded-none"
                  />
                </div>
              </div>
            )}
          </div>
          
          {resumeData.personalInfo.summary && (
            <div className="relative pl-4">
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-[12.5px] text-gray-700 leading-[1.7]"
                  as="p"
                  multiline
                />
              ) : (
                <p className="text-[12.5px] text-gray-700 leading-[1.7]">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-4 space-y-7">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b border-t-0"
                  style={{ color: accent, borderColor: accent }}
                >
                  Education
                </h2>
                {editable ? (
                  <InlineEditableList
                    path="education"
                    items={resumeData.education}
                    defaultItem={{
                      id: Date.now().toString(),
                      degree: "Degree",
                      school: "School Name",
                      field: "Field of Study",
                      startDate: "2020-01",
                      endDate: "2024-01",
                    }}
                    addButtonLabel="Add Education"
                    renderItem={(edu, index) => (
                      <div>
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="text-[13px] font-semibold text-gray-900"
                          as="h3"
                        />
                        {edu.field && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-[11px] text-gray-600 mt-1"
                            as="p"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-[11px] font-semibold mt-1"
                          as="p"
                          style={{ color: accent }}
                        />
                        <p className="text-[10px] text-gray-500 mt-1">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <InlineEditableDate
                              path={`education[${index}].startDate`}
                              value={edu.startDate}
                              className="inline-block"
                            />
                            <span> - </span>
                            <InlineEditableDate
                              path={`education[${index}].endDate`}
                              value={edu.endDate}
                              className="inline-block"
                            />
                          </div>
                        </p>
                        {edu.gpa && (
                          <InlineEditableText
                            path={`education[${index}].gpa`}
                            value={`Grade: ${edu.gpa}`}
                            className="text-[10px] text-gray-600 mt-1"
                            as="p"
                          />
                        )}
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id}>
                        <h3 className="text-[13px] font-semibold text-gray-900">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-[11px] text-gray-600 mt-1">{edu.field}</p>
                        )}
                        <p className="text-[11px] font-semibold mt-1" style={{ color: accent }}>
                          {edu.school}
                        </p>
                        {edu.gpa && (
                          <p className="text-[10px] text-gray-600 mt-1">Grade: {edu.gpa}</p>
                        )}
                        <p className="text-[10px] text-gray-500 mt-1">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b"
                  style={{ color: accent, borderColor: accent }}
                >
                  Skills
                </h2>
                {editable ? (
                  <InlineEditableList
                    path="skills"
                    items={resumeData.skills}
                    defaultItem={{
                      id: Date.now().toString(),
                      name: "New Skill",
                      rating: "",
                    }}
                    addButtonLabel="Add Skill"
                    renderItem={(skill, index) => {
                      // Parse rating string to number (1-10)
                      // Handles "9", "9/10", "9.5", etc.
                      const parseRating = (ratingStr: string | undefined): number | null => {
                        if (!ratingStr || !ratingStr.trim()) return null;
                        // Extract first number from string (handles "9", "9/10", "9.5", etc.)
                        const match = ratingStr.trim().match(/^(\d+(?:\.\d+)?)/);
                        if (match) {
                          const num = parseFloat(match[1]);
                          // Clamp between 1 and 10
                          return Math.max(1, Math.min(10, Math.round(num)));
                        }
                        return null;
                      };
                      
                      const skillLevel = parseRating(skill.rating);
                      
                      return (
                      <div>
                          <div className="flex items-center justify-between mb-1 gap-2">
                          <InlineEditableText
                            path={`skills[${index}].name`}
                            value={skill.name}
                              className="text-[12.5px] font-medium text-gray-900 flex-1"
                              as="span"
                            />
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <InlineEditableText
                                path={`skills[${index}].rating`}
                                value={skill.rating || ""}
                                placeholder="1-10"
                                className="text-[11px] text-gray-500 w-12 text-right border border-dashed border-gray-300 rounded px-1"
                            as="span"
                          />
                              <span className="text-[11px] text-gray-400">/10</span>
                            </div>
                        </div>
                          {skillLevel !== null && (
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                  width: `${skillLevel * 10}%`,
                                backgroundColor: accent,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      );
                    }}
                  />
                ) : (
                  <div className="space-y-3">
                    {resumeData.skills.map((skill) => {
                      // Parse rating string to number (1-10)
                      const parseRating = (ratingStr: string | undefined): number | null => {
                        if (!ratingStr || !ratingStr.trim()) return null;
                        const match = ratingStr.trim().match(/^(\d+(?:\.\d+)?)/);
                        if (match) {
                          const num = parseFloat(match[1]);
                          return Math.max(1, Math.min(10, Math.round(num)));
                        }
                        return null;
                      };
                      
                      const skillLevel = parseRating(skill.rating);
                      
                      return (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12.5px] font-medium text-gray-900">
                            {skill.name}
                          </span>
                            {skill.rating && skill.rating.trim() && (
                            <span className="text-[11px] text-gray-500">
                                {skillLevel !== null ? `${skillLevel}/10` : skill.rating}
                            </span>
                          )}
                        </div>
                          {skillLevel !== null && (
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                  width: `${skillLevel * 10}%`,
                                backgroundColor: accent,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-8 space-y-7">
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b"
                  style={{ color: accent, borderColor: accent }}
                >
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
                      description: "Job description",
                      current: false,
                    }}
                    addButtonLabel="Add Experience"
                    renderItem={(exp, index) => (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position}
                              className="text-[14px] font-semibold text-gray-900"
                              as="h3"
                            />
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company}
                              className="text-[12.5px] font-semibold mt-1"
                              as="p"
                              style={{ color: accent }}
                            />
                          </div>
                          <div
                            className="text-[11px] font-medium px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: accentTint,
                              color: accent
                            }}
                          >
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
                          </div>
                        </div>
                        {exp.description && (
                          <InlineEditableText
                            path={`experience[${index}].description`}
                            value={exp.description}
                            className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]"
                            as="div"
                            multiline
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
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-[14px] font-semibold text-gray-900">
                              {exp.position}
                            </h3>
                            <p
                              className="text-[12.5px] font-semibold mt-1"
                              style={{ color: accent }}
                            >
                              {exp.company}
                            </p>
                          </div>
                          <div
                            className="text-[11px] font-medium px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: accentTint,
                              color: accent
                            }}
                          >
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </div>
                        </div>
                        {/* Bullet Points - Non-Editable Mode */}
                        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                          <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                            {exp.bulletPoints.map((bullet, bulletIndex) => (
                              bullet && bullet.trim() && (
                                <li key={bulletIndex}>{bullet}</li>
                              )
                            ))}
                          </ul>
                        )}
                        {!exp.bulletPoints || exp.bulletPoints.length === 0 ? (
                          exp.description && (
                            <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                              {exp.description
                                .split("\n")
                                .map((line) => line.trim())
                                .filter(Boolean)
                                .map((line, i) => (
                                  <li key={i}>{line}</li>
                                ))}
                            </ul>
                          )
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sections */}
            <PremiumProCustomSections 
              sections={resumeData.sections}
              editable={editable}
              accent={accent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for Custom Sections to use hooks
const PremiumProCustomSections = ({ 
  sections, 
  editable, 
  accent
}: { 
  sections: ResumeData['sections']; 
  editable: boolean; 
  accent: string;
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

  return (
    <>
      {sections && sections.map((section, index) => (
        <div key={section.id || index} className="group/section mb-6">
          <div className="flex items-center gap-2">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide mb-3 pb-2 border-b flex-1"
              style={{ color: accent, borderColor: accent }}
            >
              {editable ? (
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="inline-block"
                />
              ) : section.title}
            </h2>
            {editable && (
              <button
                onClick={(e) => handleRemoveSection(e, index)}
                className="opacity-0 group-hover/section:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                style={{ color: '#ef4444' }}
                title="Remove Section"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <InlineEditableSectionItems
            sectionIndex={index}
            items={section.items || []}
            content={section.content || ""}
            editable={editable}
            itemStyle={{ fontSize: '12.5px', color: '#374151', lineHeight: '1.7' }}
            addButtonLabel="Add Item"
            placeholder="Click to add item..."
            accentColor={accent}
            showBullets={false}
          />
        </div>
      ))}

      {/* Add Section Button */}
      {editable && (
        <button
          onClick={handleAddSection}
          className="mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accent, borderColor: accent }}
        >
          <Plus className="h-4 w-4" />
          Add Section
        </button>
      )}
    </>
  );
};
