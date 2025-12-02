import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumEliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const PremiumEliteTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
  editable = false,
}: PremiumEliteTemplateProps) => {
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-[13px] leading-relaxed text-gray-900">
      {/* Top Accent Bar with Header */}
      <div 
        className="px-12 pt-10 pb-8"
        style={{ 
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 text-white">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[38px] font-bold mb-2 tracking-tight"
                as="h1"
              />
            ) : (
              <h1 className="text-[38px] font-bold mb-2 tracking-tight">
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[15px] font-medium opacity-95 mb-4"
                  as="p"
                />
              ) : (
                <p className="text-[15px] font-medium opacity-95 mb-4">
                  {resumeData.personalInfo.title}
                </p>
              )
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11.5px] opacity-90">
              {resumeData.personalInfo.email && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-[11.5px] opacity-90 inline"
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
                    className="text-[11.5px] opacity-90 inline"
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
                    className="text-[11.5px] opacity-90 inline"
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )
              )}
            </div>
          </div>
          {photo && (
            <div className="ml-8">
              <div className="border-4 border-white rounded-2xl overflow-hidden shadow-xl">
                <ProfilePhoto
                  src={photo}
                  borderClass=""
                  className="rounded-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 rounded-xl" style={{ backgroundColor: accentLight }}>
            <h2
              className="text-[13px] font-bold uppercase tracking-wide mb-3"
              style={{ color: accent }}
            >
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-[1.75]"
                as="p"
                multiline
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-[1.75]">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - 40% */}
          <div className="col-span-5 space-y-7">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
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
                      school: "University Name",
                      degree: "Degree Title",
                      field: "Field of Study",
                      startDate: "2020-01",
                      endDate: "2024-01",
                      gpa: "",
                    }}
                    addButtonLabel="Add Education"
                    renderItem={(edu, index) => (
                      <div className="relative pl-4 border-l-2" style={{ borderColor: accentLight }}>
                        <div
                          className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="text-[13px] font-bold text-gray-900"
                          as="h3"
                        />
                        {edu.field && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-[11.5px] text-gray-600 mt-1"
                            as="p"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-[12px] font-semibold mt-1.5"
                          as="p"
                          style={{ color: accent }}
                        />
                        <div className="text-[10.5px] text-gray-500 mt-1 font-medium">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <InlineEditableDate
                              path={`education[${index}].startDate`}
                              value={edu.startDate}
                              className="inline-block"
                            />
                            <span> — </span>
                            <InlineEditableDate
                              path={`education[${index}].endDate`}
                              value={edu.endDate}
                              className="inline-block"
                            />
                          </div>
                        </div>
                        {edu.gpa && (
                          <div className="text-[10.5px] text-gray-500 mt-1">
                            GPA: <InlineEditableText
                              path={`education[${index}].gpa`}
                              value={edu.gpa}
                              className="inline-block"
                              as="span"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-5">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="relative pl-4 border-l-2" style={{ borderColor: accentLight }}>
                        <div
                          className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <h3 className="text-[13px] font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-[11.5px] text-gray-600 mt-1">{edu.field}</p>
                        )}
                        <p className="text-[12px] font-semibold mt-1.5" style={{ color: accent }}>
                          {edu.school}
                        </p>
                        <p className="text-[10.5px] text-gray-500 mt-1 font-medium">
                          {edu.startDate} - {edu.endDate}
                        </p>
                        {edu.gpa && (
                          <p className="text-[10.5px] text-gray-500 mt-1">
                            GPA: {edu.gpa}
                          </p>
                        )}
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
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                  style={{ color: accent, borderColor: accent }}
                >
                  Skills & Expertise
                </h2>
                {editable ? (
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills}
                    renderSkill={(skill, index) => (
                      <span
                        className="text-[11.5px] font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          backgroundColor: accentLight,
                          color: accent
                        }}
                      >
                        {skill.name}
                      </span>
                    )}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={skill.id}
                        className="text-[11.5px] font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          backgroundColor: accentLight,
                          color: accent
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - 60% */}
          <div className="col-span-7 space-y-7">
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
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
                      bulletPoints: [],
                      current: false,
                    }}
                    addButtonLabel="Add Experience"
                    renderItem={(exp, index) => (
                      <div className="relative">
                        <div className="flex justify-between items-start mb-2.5">
                          <div className="flex-1">
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position}
                              className="text-[14px] font-bold text-gray-900"
                              as="h3"
                            />
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company}
                              className="text-[12.5px] font-bold mt-1"
                              as="p"
                              style={{ color: accent }}
                            />
                          </div>
                          <div
                            className="text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                              color: 'white'
                            }}
                          >
                            <div className="text-xs text-white flex items-center gap-1">
                              <InlineEditableDate
                                path={`experience[${index}].startDate`}
                                value={exp.startDate}
                                className="inline-block"
                              />
                              <span> — </span>
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
                        <div className="space-y-1.5">
                          {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                            exp.bulletPoints.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className="flex items-start gap-2 group">
                                <div className="flex-1">
                                  <InlineEditableText
                                    path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                    value={bullet}
                                    className="text-[12px] text-gray-700 leading-[1.7] ml-5 list-disc"
                                    placeholder="Enter bullet point..."
                                    as="div"
                                    multiline
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                                  disabled={exp.bulletPoints.length <= 1}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))
                          ) : (
                            <div className="text-[12px] text-gray-700 leading-[1.7] ml-5 list-disc">
                              No bullet points yet. Click "Add Bullet Point" to add one.
                            </div>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addBulletPoint(exp.id)}
                            className="h-7 px-2 text-xs border-dashed w-full justify-start"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Bullet Point
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="relative">
                        <div className="flex justify-between items-start mb-2.5">
                          <div className="flex-1">
                            <h3 className="text-[14px] font-bold text-gray-900">
                              {exp.position}
                            </h3>
                            <p
                              className="text-[12.5px] font-bold mt-1"
                              style={{ color: accent }}
                            >
                              {exp.company}
                            </p>
                          </div>
                          <div
                            className="text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                              color: 'white'
                            }}
                          >
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </div>
                        </div>
                        {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                          <ul className="ml-5 list-disc space-y-1.5 text-[12px] text-gray-700 leading-[1.7]">
                            {exp.bulletPoints.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="pl-1">{bullet}</li>
                            ))}
                          </ul>
                        ) : (
                          exp.description && (
                            <ul className="ml-5 list-disc space-y-1.5 text-[12px] text-gray-700 leading-[1.7]">
                              {exp.description
                                .split("\n")
                                .map((line) => line.trim())
                                .filter(Boolean)
                                .map((line, i) => (
                                  <li key={i} className="pl-1">{line}</li>
                                ))}
                            </ul>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Additional Sections */}
            <PremiumEliteCustomSections 
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
const PremiumEliteCustomSections = ({ 
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
              className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2 flex-1"
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
            itemStyle={{ fontSize: '12px', color: '#374151', lineHeight: '1.7' }}
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
