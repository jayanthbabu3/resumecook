import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface PremiumFresherTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const PremiumFresherTemplate = ({
  resumeData,
  themeColor = "#7C3AED",
  editable = false,
}: PremiumFresherTemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white p-10">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2" style={{ borderColor: themeColor }}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-3xl font-bold mb-1 block"
                style={{ color: themeColor }}
                as="h1"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-1" style={{ color: themeColor }}>
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-base text-gray-600 mb-3 block"
                  as="p"
                />
              ) : (
                <p className="text-base text-gray-600 mb-3">{resumeData.personalInfo.title}</p>
              )
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
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
          {photo && (
            <div className="ml-4">
              <ProfilePhoto src={photo} borderClass="border-2" className="rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-relaxed block"
              style={{
                fontSize: styles.itemDescription.size,
                lineHeight: styles.itemDescription.lineHeight,
                color: styles.itemDescription.color,
              }}
              multiline
              as="p"
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
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          {/* Education */}
          <InlineEducationSection
            items={resumeData.education}
            editable={editable}
            accentColor={themeColor}
            title="Education"
            titleStyle={{
              fontSize: "1rem", // text-base
              fontWeight: 700,
              marginBottom: "0.75rem", // mb-3
              color: themeColor
            }}
          />

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
                Technical Skills
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900">{skill.name}</span>
                      {(skill.level !== undefined && skill.level !== null) && (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(skill.level || 0) * 10}%`,
                                backgroundColor: themeColor,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{skill.level}/10</span>
                        </div>
                      )}
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{skill.name}</span>
                      {skill.level && (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.level * 10}%`,
                                backgroundColor: themeColor,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{skill.level}/10</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-6">
          {/* Experience */}
          <InlineExperienceSection
            items={resumeData.experience}
            editable={editable}
            accentColor={themeColor}
            title="Experience"
            titleStyle={{
              fontSize: "1rem", // text-base
              fontWeight: 700,
              marginBottom: "0.75rem", // mb-3
              color: themeColor
            }}
          />

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
        </div>
      </div>
    </div>
  );
};
