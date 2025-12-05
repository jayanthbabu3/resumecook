import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Award } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface FresherMinimalGridTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherMinimalGridTemplate = ({
  resumeData,
  themeColor = "#10B981",
  editable = false,
}: FresherMinimalGridTemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <div className="max-w-[850px] mx-auto">
        {/* Minimal Header with Side Border */}
        <div className="relative border-l-4 pl-12 pr-12 pt-10 pb-8" style={{ borderLeftColor: themeColor }}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <ProfilePhoto
                src={photo}
                borderClass="border-3"
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
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" style={{ color: themeColor }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-lg font-medium text-gray-700 inline-block"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-700">
                      {resumeData.personalInfo.title}
                    </span>
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
          <section className="px-8 py-6 bg-gray-50">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
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
          </section>
        )}

        {/* 3-Column Grid Layout */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Column 1 - Education */}
            <div className="space-y-6">
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
                  marginBottom: "1rem",
                  paddingBottom: "0.5rem",
                  borderBottom: `2px solid ${themeColor}`,
                  color: themeColor
                }}
              />
            </div>

            {/* Column 2 - Skills */}
            <div className="space-y-6">
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: themeColor, borderBottomColor: themeColor }}>
                    Skills
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

            {/* Column 3 - Experience & Projects */}
            <div className="space-y-6">
              {/* Projects */}
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

              {/* Experience */}
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
                  marginBottom: "1rem",
                  paddingBottom: "0.5rem",
                  borderBottom: `2px solid ${themeColor}`,
                  color: themeColor
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
