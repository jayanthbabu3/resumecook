import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface FresherEliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherEliteTemplate = ({
  resumeData,
  themeColor = "#6366f1",
  editable = false,
}: FresherEliteTemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="max-w-[900px] mx-auto bg-white shadow-sm overflow-hidden">
        {/* Header with colored background */}
        <div 
          className="px-10 py-8"
          style={{ 
            background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` 
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 text-white">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-3xl font-bold mb-2"
                  as="h1"
                />
              ) : (
                <h1 className="text-3xl font-bold mb-2">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}
              {resumeData.personalInfo.title && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-base font-medium mb-3 opacity-95"
                    as="p"
                  />
                ) : (
                  <p className="text-base font-medium mb-3 opacity-95">
                    {resumeData.personalInfo.title}
                  </p>
                )
              )}
              <div className="flex flex-wrap gap-5 text-sm opacity-90">
                {resumeData.personalInfo.email && (
                  <span className="flex items-center gap-2">
                    <span>✉</span>{" "}
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email}
                        className="text-sm opacity-90"
                        as="span"
                      />
                    ) : (
                      resumeData.personalInfo.email
                    )}
                  </span>
                )}
                {resumeData.personalInfo.phone && (
                  <span className="flex items-center gap-2">
                    <span>📞</span>{" "}
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone}
                        className="text-sm opacity-90"
                        as="span"
                      />
                    ) : (
                      resumeData.personalInfo.phone
                    )}
                  </span>
                )}
                {resumeData.personalInfo.location && (
                  <span className="flex items-center gap-2">
                    <span>📍</span>{" "}
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location}
                        className="text-sm opacity-90"
                        as="span"
                      />
                    ) : (
                      resumeData.personalInfo.location
                    )}
                  </span>
                )}
              </div>
            </div>
            {photo && (
              <div className="ml-6">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <ProfilePhoto src={photo} borderClass="" className="rounded-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-10 py-6">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4" style={{ borderColor: themeColor }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.summary"
                    value={resumeData.personalInfo.summary}
                    className="text-[13px] text-gray-700 leading-relaxed"
                    as="p"
                    style={{
                  fontSize: styles.itemDescription.size,
                  lineHeight: styles.itemDescription.lineHeight,
                  color: styles.itemDescription.color,
                }}
                    multiline
                  />
                ) : (
                  <p 
                    className="text-[13px] text-gray-700 leading-relaxed"
                    style={{
                  fontSize: styles.itemDescription.size,
                  lineHeight: styles.itemDescription.lineHeight,
                  color: styles.itemDescription.color,
                }}
                  >
                    {resumeData.personalInfo.summary}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-7">
            {/* Left Column - 1 column */}
            <div className="space-y-6">
              {/* Education */}
              <InlineEducationSection
                items={resumeData.education}
                editable={editable}
                accentColor={themeColor}
                title="Education"
                className="bg-white"
                titleStyle={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: themeColor
                }}
                renderHeader={(title) => (
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    {title}
                  </h2>
                )}
              />

              {/* Skills with circular progress */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <div>
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    Skills
                  </h2>
                  {editable ? (
                      <InlineEditableSkills
                        path="skills"
                        skills={resumeData.skills}
                        renderSkill={(skill) => (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              {skill.name}
                            </span>
                            {(skill.level !== undefined && skill.level !== null) && (
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor: i < Math.ceil((skill.level || 0) / 2) ? themeColor : '#e5e7eb',
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-2.5">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {skill.name}
                          </span>
                          {skill.level && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    backgroundColor: i < Math.ceil(skill.level / 2) ? themeColor : '#e5e7eb',
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - 2 columns */}
            <div className="col-span-2 space-y-6">
              {/* Projects/Sections */}
              <InlineCustomSections
                sections={resumeData.sections}
                editable={editable}
                accentColor={themeColor}
                containerClassName="space-y-6"
                itemStyle={{
                  fontSize: styles.itemDescription.size,
                  lineHeight: styles.itemDescription.lineHeight,
                  color: styles.itemDescription.color,
                }}
              />

              {/* Internship Experience */}
              <InlineExperienceSection
                items={resumeData.experience}
                editable={editable}
                accentColor={themeColor}
                title="Internship Experience"
                titleStyle={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: themeColor
                }}
                renderHeader={(title) => (
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    {title}
                  </h2>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
