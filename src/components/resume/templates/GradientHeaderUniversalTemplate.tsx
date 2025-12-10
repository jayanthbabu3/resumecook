import { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { TemplateContactInfo, TemplateSocialLinks, SectionHeader } from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfstandards";

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

export const GradientHeaderUniversalTemplate = ({
  resumeData,
  themeColor = "#3b82f6",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: GradientHeaderUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#3b82f6";
  const styleOptions = useStyleOptionsWithDefaults();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  return (
    <StyleOptionsWrapper>
      <style>{`
        .resume-subtitle {
          font-size: 16px !important;
          color: white !important;
        }
      `}</style>
      <div className="w-full h-full bg-white text-gray-900" style={{ fontSize: '13px', lineHeight: 1.5 }}>
        {/* Gradient Header */}
        <div className="p-10 text-white" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)` }}>
          {editable ? (
            <>
              <InlineEditableText 
                path="personalInfo.fullName" 
                value={resumeData.personalInfo.fullName} 
                className="font-bold mb-3 block text-white" 
                as="h1" 
                style={{ fontSize: '27px', lineHeight: 1.2, letterSpacing: '-0.01em' }}
              />
              <InlineEditableText 
                path="personalInfo.title" 
                value={resumeData.personalInfo.title || "Professional Title"} 
                className="mb-5 block text-white font-normal resume-subtitle" 
                as="div" 
                style={{ fontSize: '18px', lineHeight: 1.4, fontWeight: 400, color: 'white' }}
              />
            </>
          ) : (
            <>
              <h1 className="font-bold mb-3" style={{ fontSize: '27px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                {resumeData.personalInfo.fullName}
              </h1>
              <div className="mb-5 font-normal resume-subtitle" style={{ fontSize: '18px', lineHeight: 1.4, fontWeight: 400, color: 'white' }}>
                {resumeData.personalInfo.title || "Professional Title"}
              </div>
            </>
          )}
          
          {/* Contact Info */}
          <div className="opacity-90" style={{ fontSize: '13px', color: 'white' }}>
            <style>{`
              div[data-header-contact] span,
              div[data-header-contact] svg {
                color: white !important;
              }
            `}</style>
            <div data-header-contact style={{ display: 'contents' }}>
          <TemplateContactInfo
            resumeData={resumeData}
            editable={editable}
                themeColor="#ffffff"
            layout="horizontal"
          />
            </div>
          </div>
        </div>

        <div className="p-12">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-8" data-section="summary">
              <SectionHeader 
                title="Professional Summary" 
                themeColor={accent}
                className="mb-3"
                paddingBottom="8px"
                style={{ marginBottom: '12px' }}
              />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="leading-relaxed font-light"
                  style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
                  multiline
                  as="p"
                />
              ) : (
                <p className="leading-relaxed font-light" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          )}

          {/* Work Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-8" data-section="experience">
              <SectionHeader 
                title="Work Experience" 
                themeColor={accent}
                className="mb-3"
                paddingBottom="8px"
                style={{ marginBottom: '12px' }}
              />
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
                            className="font-semibold"
                            style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="font-light mt-1"
                            style={{ fontSize: '14px', color: accent, lineHeight: 1.4 }}
                            as="p"
                          />
                        </div>
                        <div className="text-xs ml-4 flex items-center gap-1" style={{ color: '#525252' }}>
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
                            className="flex items-center gap-1 text-xs font-light"
                            style={{ color: accent }}
                          >
                            <span>+</span>
                            Add Achievement
                          </button>
                        </div>
                      )}
                      {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                          <ul className="space-y-2">
                            {exp.bulletPoints.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="flex gap-3 items-start group">
                                <span style={{ color: '#1a1a1a', marginTop: '4px' }}>
                                  {styleOptions.getBulletChar()}
                                </span>
                                <div className="flex-1 flex items-center gap-2">
                                  <InlineEditableText
                                    path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                    value={bullet || ""}
                                    placeholder="Click to add achievement..."
                                    className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                    style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
                                    multiline
                                    as="span"
                                  />
                                  {editable && onRemoveBulletPoint && (
                                    <button
                                      onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                                    >
                                      <span className="text-red-500 text-xs">×</span>
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
                              className="mt-2 flex items-center gap-1 text-xs font-light"
                              style={{ color: accent }}
                            >
                              <span>+</span>
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
                          <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                            {exp.position}
                          </h3>
                          <p className="font-light mt-1" style={{ fontSize: '14px', color: accent, lineHeight: 1.4 }}>
                            {exp.company}
                          </p>
                        </div>
                        <p className="text-xs" style={{ color: '#525252' }}>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>
                      </div>
                      {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                        <ul className="space-y-2" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                          {exp.bulletPoints.map((point, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <span style={{ color: '#1a1a1a', marginTop: '4px' }}>
                                {styleOptions.getBulletChar()}
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education and Skills Grid */}
          <div className="grid grid-cols-2 gap-10 mb-8">
            {resumeData.education && resumeData.education.length > 0 && (
              <div data-section="education">
                <SectionHeader 
                  title="Education" 
                  themeColor={accent}
                  className="mb-3"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
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
                      <div key={edu.id} className="mb-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <InlineEditableText
                              path={`education[${index}].degree`}
                              value={edu.degree}
                              className="font-semibold"
                              style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                              as="h3"
                            />
                            {edu.field && (
                              <InlineEditableText
                                path={`education[${index}].field`}
                                value={edu.field}
                                className="font-light mt-1"
                                style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.4 }}
                                as="p"
                              />
                            )}
                            <InlineEditableText
                              path={`education[${index}].school`}
                              value={edu.school}
                              className="font-light"
                              style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.4 }}
                              as="p"
                            />
                            {(editable || edu.gpa) && (
                              <div className="font-light mt-1" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
                                <span>GPA: </span>
                              <InlineEditableText
                                path={`education[${index}].gpa`}
                                  value={edu.gpa || ""}
                                  className="inline-block"
                                  placeholder="3.8/4.0"
                                style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}
                                  as="span"
                              />
                              </div>
                            )}
                          </div>
                          <div className="text-xs ml-4 flex items-center gap-1" style={{ color: '#525252' }}>
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
                            <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                              {edu.degree}
                            </h3>
                            {edu.field && (
                              <p className="font-light mt-1" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.4 }}>
                                {edu.field}
                              </p>
                            )}
                            <p className="font-light" style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.4 }}>
                              {edu.school}
                            </p>
                            {edu.gpa && (
                              <p className="font-light mt-1" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
                                GPA: {edu.gpa}
                              </p>
                            )}
                          </div>
                          <div className="text-xs ml-4" style={{ color: '#525252' }}>
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div data-section="skills">
                <SectionHeader 
                  title="Skills" 
                  themeColor={accent}
                  className="mb-3"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
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
          {resumeData.includeSocialLinks && (
            <div className="mb-8" data-section="social">
              <SectionHeader 
                title="Connect With Me" 
                themeColor={accent}
                className="mb-3"
                paddingBottom="8px"
                style={{ marginBottom: '12px' }}
              />
              <TemplateSocialLinks
                resumeData={resumeData}
                editable={editable}
                themeColor={accent}
                variant="horizontal"
              />
            </div>
          )}

          {/* Custom Sections */}
          <div data-section="custom">
            <CustomSectionsWrapper
              sections={resumeData.sections || []}
              editable={editable}
              accentColor={accent}
              styles={SINGLE_COLUMN_CONFIG}
              renderSectionHeader={(title, index, helpers) => (
                <SectionHeader
                  title={title}
                  themeColor={accent}
                  className="mb-3"
                  paddingBottom="8px"
                  style={{ marginBottom: '12px' }}
                />
              )}
              itemStyle={{ 
                fontSize: '13px', 
                color: '#1a1a1a', 
                lineHeight: 1.5 
              }}
              sectionStyle={{ marginBottom: '28px' }}
              showAddSection={true}
              renderItem={(item, itemIndex, sectionIndex, helpers) => {
                // Ensure item is a string to prevent [object Object] rendering
                const itemValue = typeof item === 'string' ? item : (item as any)?.text || String(item || '');
                // Only show border in editable mode (live editor), not in form preview
                const showBorder = editable;
                return (
                  <div key={itemIndex} className="group flex items-start gap-2 mb-2">
                    {editable ? (
                      <helpers.EditableText
                        className={`flex-1 min-h-[1.2rem] ${showBorder ? 'border border-dashed border-gray-300 rounded px-1' : ''}`}
                        style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
                        placeholder="Click to add item..."
                      />
                    ) : (
                      <span style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                        {itemValue}
                      </span>
                    )}
                    {editable && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          helpers.remove();
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                        style={{ color: '#ef4444' }}
                      >
                        <span className="text-xs">×</span>
                      </button>
                    )}
                  </div>
                );
              }}
              renderAddItemButton={(onClick, sectionIndex) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick();
                  }}
                  className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                  style={{ color: accent, borderColor: accent }}
                >
                  <span>+</span>
                  Add Item
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </StyleOptionsWrapper>
  );
};
