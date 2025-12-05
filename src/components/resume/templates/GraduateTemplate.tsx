import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";

interface GraduateTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const GraduateTemplate = ({ resumeData, themeColor = "#0EA5E9", editable = false }: GraduateTemplateProps) => {

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white p-12 overflow-auto">
      <div className="max-w-[850px] mx-auto space-y-6">
        {/* Header Section */}
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Education & Skills */}
          <div className="col-span-1 space-y-5">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <InlineEducationSection
                items={resumeData.education}
                title="Education"
                editable={editable}
                accentColor={themeColor}
                universalLineHeight={true}
                className="space-y-3"
              />
            )}

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
                    renderSkill={(skill, index) => (
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
          </div>

          {/* Right Column - Summary, Projects & Experience */}
          <div className="col-span-2 space-y-5">
            {/* Professional Summary */}
            {resumeData.personalInfo.summary && (
              <section className="space-y-2">
                <h2
                  className="text-sm font-bold uppercase tracking-wide"
                  style={{ color: themeColor }}
                >
                  Profile
                </h2>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.summary"
                    value={resumeData.personalInfo.summary}
                    className="text-[13px] leading-relaxed text-gray-700 block"
                    multiline
                    as="p"
                  />
                ) : (
                  <p className="text-[13px] leading-relaxed text-gray-700">
                    {resumeData.personalInfo.summary}
                  </p>
                )}
              </section>
            )}

            {/* Projects / Extra Sections - More Prominent for Freshers */}
            {resumeData.sections && resumeData.sections.length > 0 && (
              <InlineCustomSections
                sections={resumeData.sections}
                editable={editable}
                accentColor={themeColor}
                itemStyle={{ fontSize: "12px", color: "#374151", lineHeight: 1.6 }}
                containerClassName="space-y-3"
              />
            )}

            {/* Experience/Internships */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <InlineExperienceSection
                items={resumeData.experience}
                title="Internships & Experience"
                editable={editable}
                accentColor={themeColor}
                layout="compact"
                className="space-y-3"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
