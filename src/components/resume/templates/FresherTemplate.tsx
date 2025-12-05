import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface FresherTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherTemplate = ({
  resumeData,
  themeColor = "#2563EB",
  editable = false,
}: FresherTemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <div className="max-w-[850px] mx-auto">
        {/* Header Section with Theme Accent */}
        <div className="relative">
          <div className="h-2 w-full" style={{ backgroundColor: themeColor }} />
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-6">
              <ProfilePhoto
                src={photo}
                borderClass="border-3 border-current"
                className="text-blue-600"
              />
            </div>

            <div className="text-center space-y-3">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-3xl font-bold text-gray-900 tracking-tight block"
                  as="h1"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}

              {resumeData.personalInfo.title && (
                <div className="flex items-center justify-center">
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="px-4 py-1 rounded-full text-sm font-medium text-white inline-block"
                      style={{ backgroundColor: themeColor }}
                    />
                  ) : (
                    <span
                      className="px-4 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      {resumeData.personalInfo.title}
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-4">
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

        <div className="px-8 pb-12">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  PROFESSIONAL SUMMARY
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-[13px] leading-relaxed text-gray-700 pl-4 block"
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
                  className="text-[13px] leading-relaxed text-gray-700 pl-4"
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-5 gap-6">
            {/* Left Column - Education & Skills */}
            <div className="col-span-2 space-y-8">
              {/* Education */}
              <InlineEducationSection
                items={resumeData.education}
                editable={editable}
                accentColor={themeColor}
                title="EDUCATION"
                className="pl-4"
                // Overriding default heading style to match this template's look
                titleStyle={{
                  backgroundColor: themeColor,
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  display: "inline-block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 0
                }}
                // Custom container for heading with line
                renderHeader={(title) => (
                  <div className="flex items-center gap-3 mb-4 -ml-4">
                    <h2
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      {title}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
              />

              {/* Core Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <h2
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      TECHNICAL SKILLS
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  {editable ? (
                    <InlineEditableSkills
                      path="skills"
                      skills={resumeData.skills}
                      renderSkill={(skill) => (
                        <div className="pl-4">
                          <div
                            className="px-3 py-1.5 bg-gray-50 border-l-3 text-xs font-medium text-gray-800"
                            style={{ borderLeftColor: themeColor }}
                          >
                            {skill.name}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="pl-4">
                      <div className="grid grid-cols-1 gap-2">
                        {resumeData.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="px-3 py-1.5 bg-gray-50 border-l-3 text-xs font-medium text-gray-800"
                            style={{ borderLeftColor: themeColor }}
                          >
                            {skill.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Right Column - Projects & Experience */}
            <div className="col-span-3 space-y-8">
              {/* Custom Sections (Projects, etc.) */}
              <InlineCustomSections
                sections={resumeData.sections}
                editable={editable}
                accentColor={themeColor}
                containerClassName="space-y-8"
                itemStyle={{
                  fontSize: styles.itemDescription.size,
                  lineHeight: styles.itemDescription.lineHeight,
                  color: styles.itemDescription.color,
                }}
              />

              {/* Experience/Internships */}
              <InlineExperienceSection
                items={resumeData.experience}
                editable={editable}
                accentColor={themeColor}
                title="EXPERIENCE & INTERNSHIPS"
                className="pl-4"
                renderHeader={(title) => (
                  <div className="flex items-center gap-3 mb-4 -ml-4">
                    <h2
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      {title}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
