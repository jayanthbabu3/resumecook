import type { ResumeData, EducationItem, ExperienceItem } from "@/types/resume";
import { Mail, Phone, MapPin, Calendar, Circle, Plus, X } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineExperienceSection, formatMonthYear } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";
import { useInlineEdit } from "@/contexts/InlineEditContext";

interface FresherTimelineTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherTimelineTemplate = ({
  resumeData,
  themeColor = "#EC4899",
  editable = false,
}: FresherTimelineTemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const photo = resumeData.personalInfo.photo;
  const { addBulletPoint, removeBulletPoint } = useInlineEdit() || {};

  // Helper to render timeline item for Education
  const renderEducationItem = (edu: EducationItem, index: number, isEditable: boolean) => (
    <div className="relative pl-8 pb-8">
      {/* Timeline dot and line */}
      <div className="absolute left-0 top-1 flex flex-col items-center">
        <Circle className="h-3 w-3 fill-current" style={{ color: themeColor }} />
        {index < (resumeData.education?.length || 0) - 1 && (
          <div className="w-0.5 h-full mt-1" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
        )}
      </div>

      <div className="space-y-1">
        {isEditable ? (
          <InlineEditableText
            path={`education[${index}].degree`}
            value={edu.degree}
            className="font-semibold text-base text-gray-900 leading-tight block"
            as="h3"
          />
        ) : (
          <h3 className="font-semibold text-base text-gray-900 leading-tight">
            {edu.degree}
          </h3>
        )}
        
        {isEditable ? (
          edu.field && (
            <InlineEditableText
              path={`education[${index}].field`}
              value={edu.field}
              className="text-sm text-gray-600 block"
              as="p"
            />
          )
        ) : (
          edu.field && <p className="text-sm text-gray-600">{edu.field}</p>
        )}

        {isEditable ? (
          <InlineEditableText
            path={`education[${index}].school`}
            value={edu.school}
            className="text-sm font-medium block"
            style={{ color: themeColor }}
            as="p"
          />
        ) : (
          <p className="text-sm font-medium" style={{ color: themeColor }}>
            {edu.school}
          </p>
        )}

        <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
          <Calendar className="h-3 w-3" />
          {isEditable ? (
            <>
              <InlineEditableDate
                path={`education[${index}].startDate`}
                value={edu.startDate}
                formatDisplay={formatMonthYear}
                className="inline-block"
              />
              <span> - </span>
              <InlineEditableDate
                path={`education[${index}].endDate`}
                value={edu.endDate}
                formatDisplay={formatMonthYear}
                className="inline-block"
              />
            </>
          ) : (
            <span>
              {formatMonthYear(edu.startDate)} - {formatMonthYear(edu.endDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Helper to render timeline item for Experience
  const renderExperienceItem = (exp: ExperienceItem, index: number, isEditable: boolean) => {
    const hasBullets = Array.isArray(exp.bulletPoints) && exp.bulletPoints.length > 0;
    const showBullets = isEditable || hasBullets;

    return (
      <div className="relative pl-8 pb-8">
        {/* Timeline dot and line */}
        <div className="absolute left-0 top-1 flex flex-col items-center">
          <Circle className="h-3 w-3 fill-current" style={{ color: themeColor }} />
          {index < (resumeData.experience?.length || 0) - 1 && (
            <div className="w-0.5 h-full mt-1" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              {isEditable ? (
                <InlineEditableText
                  path={`experience[${index}].position`}
                  value={exp.position}
                  className="font-semibold text-base text-gray-900 block"
                  as="h3"
                />
              ) : (
                <h3 className="font-semibold text-base text-gray-900">
                  {exp.position}
                </h3>
              )}
              
              {isEditable ? (
                <InlineEditableText
                  path={`experience[${index}].company`}
                  value={exp.company}
                  className="text-sm font-medium mt-1 block"
                  style={{ color: themeColor }}
                  as="p"
                />
              ) : (
                <p className="text-sm font-medium mt-1" style={{ color: themeColor }}>
                  {exp.company}
                </p>
              )}
            </div>
            
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {isEditable ? (
                <>
                  <InlineEditableDate
                    path={`experience[${index}].startDate`}
                    value={exp.startDate}
                    formatDisplay={formatMonthYear}
                    className="inline-block"
                  />
                  <span> - </span>
                  {exp.current ? (
                    <span>Present</span>
                  ) : (
                    <InlineEditableDate
                      path={`experience[${index}].endDate`}
                      value={exp.endDate}
                      formatDisplay={formatMonthYear}
                      className="inline-block"
                    />
                  )}
                </>
              ) : (
                <span>
                  {formatMonthYear(exp.startDate)} - {exp.current ? "Present" : formatMonthYear(exp.endDate)}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            {showBullets ? (
              (exp.bulletPoints || []).map((bullet: string, bulletIndex: number) => (
                <div key={bulletIndex} className="flex items-start gap-2 group">
                  <span className="text-gray-400 mt-1">•</span>
                  {isEditable ? (
                    <>
                      <InlineEditableText
                        path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                        value={bullet || ""}
                        className="text-sm text-gray-700 leading-relaxed flex-1 min-h-[1.1rem] border border-dashed border-gray-300 rounded px-1"
                        placeholder="Click to add achievement..."
                        multiline
                        as="span"
                      />
                      <button
                        type="button"
                        onClick={() => removeBulletPoint?.(exp.id, bulletIndex)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded text-red-500"
                        disabled={(exp.bulletPoints || []).length <= 1}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-sm text-gray-700 leading-relaxed flex-1">
                      {bullet}
                    </span>
                  )}
                </div>
              ))
            ) : (
              exp.description && (
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </div>
              )
            )}
            
            {isEditable && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addBulletPoint?.(exp.id);
                }}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium mt-1 ml-4"
              >
                <Plus className="h-3 w-3" />
                Add Achievement
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <div className="max-w-[850px] mx-auto">
        {/* Header Section */}
        <div className="relative px-8 pt-10 pb-8 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <ProfilePhoto
                src={photo}
                borderClass="border-4"
                className="text-gray-300"
                style={{ borderColor: themeColor }}
              />
            </div>

            <div className="flex-1 space-y-3">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-4xl font-bold text-gray-900 tracking-tight block"
                  as="h1"
                />
              ) : (
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}

              {resumeData.personalInfo.title && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-lg font-medium text-gray-600 inline-block"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-600">
                      {resumeData.personalInfo.title}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 pt-2">
                {resumeData.personalInfo.email && (
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" style={{ color: themeColor }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email}
                        className="inline-block"
                      />
                    ) : (
                      resumeData.personalInfo.email
                    )}
                  </span>
                )}
                {resumeData.personalInfo.phone && (
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" style={{ color: themeColor }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone}
                        className="inline-block"
                      />
                    ) : (
                      resumeData.personalInfo.phone
                    )}
                  </span>
                )}
                {resumeData.personalInfo.location && (
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" style={{ color: themeColor }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location}
                        className="inline-block"
                      />
                    ) : (
                      resumeData.personalInfo.location
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <section className="px-8 py-6 bg-white">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-sm leading-relaxed text-gray-700 block"
                multiline
                as="p"
              />
            ) : (
              <p className="text-sm leading-relaxed text-gray-700">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </section>
        )}

        <div className="px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Skills */}
            <div className="col-span-1 space-y-8">
              {/* Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>
                    Technical Skills
                  </h2>
                  {editable ? (
                    <InlineEditableSkills
                      path="skills"
                      skills={resumeData.skills}
                      renderSkill={(skill) => (
                        <div className="mb-2">
                          <div className="px-3 py-1.5 bg-gray-50 rounded-md text-xs font-medium text-gray-800 border-l-3" style={{ borderLeftColor: themeColor }}>
                            {skill.name}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-2">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="px-3 py-1.5 bg-gray-50 rounded-md text-xs font-medium text-gray-800 border-l-3" style={{ borderLeftColor: themeColor }}>
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Right Column - Timeline (Education, Projects & Internships) */}
            <div className="col-span-2 space-y-8">
              {/* Education Timeline */}
              <InlineEducationSection
                items={resumeData.education}
                editable={editable}
                accentColor={themeColor}
                title="Education"
                titleStyle={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1.5rem",
                  color: themeColor
                }}
                renderItem={renderEducationItem}
              />

              {/* Projects/Custom Sections Timeline */}
              <InlineCustomSections
                sections={resumeData.sections}
                editable={editable}
                accentColor={themeColor}
                path="sections"
                containerClassName="space-y-8"
                renderHeader={(title) => (
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
                    {title}
                  </h2>
                )}
              />

              {/* Internship Experience Timeline */}
              <InlineExperienceSection
                items={resumeData.experience}
                editable={editable}
                accentColor={themeColor}
                title="Internship Experience"
                titleStyle={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1.5rem",
                  color: themeColor
                }}
                renderItem={renderExperienceItem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
