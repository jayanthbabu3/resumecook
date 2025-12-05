import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface StarterTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const StarterTemplate = ({ resumeData, themeColor = "#0EA5E9", editable = false }: StarterTemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white p-12 overflow-auto">
      <div className="max-w-[800px] mx-auto space-y-6">
        {/* Header */}
        <div className="pb-5 border-b-2" style={{ borderColor: themeColor }}>
          <div className="flex justify-center mb-4">
            <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-3xl font-bold tracking-tight text-gray-900 mb-2 block"
              as="h1"
            />
          ) : (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
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
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            {resumeData.personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
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
              <span className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
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
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
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

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
              Profile
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[13px] leading-relaxed text-gray-700 block"
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
                className="text-[13px] leading-relaxed text-gray-700"
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

        {/* Education */}
        <InlineEducationSection
          items={resumeData.education}
          editable={editable}
          accentColor={themeColor}
          title="EDUCATION"
          className="space-y-3"
          titleStyle={{
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.025em",
            color: "#111827", // text-gray-900
            marginBottom: "0.5rem"
          }}
        />

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Projects / Custom Sections */}
        <InlineCustomSections
          sections={resumeData.sections}
          editable={editable}
          accentColor={themeColor}
          containerClassName="space-y-6"
        />

        {/* Experience/Internships */}
        <InlineExperienceSection
          items={resumeData.experience}
          editable={editable}
          accentColor={themeColor}
          title="Internships & Experience"
          className="space-y-3"
          titleStyle={{
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.025em",
            color: "#111827", // text-gray-900
            marginBottom: "0.5rem"
          }}
        />
      </div>
    </div>
  );
};
