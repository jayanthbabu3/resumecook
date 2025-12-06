import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { CustomSectionsWrapper, TemplateSocialLinks, TemplateSummarySection } from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";

interface TechGridTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const TechGridTemplate = ({
  resumeData,
  themeColor = "#4f46e5",
  editable = false,
}: TechGridTemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const inlineEdit = useInlineEdit();
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor || "#4f46e5";
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900">
      {/* Modern Header with Gradient */}
      <div className="relative px-12 pt-10 pb-8" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}>
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[40px] font-bold mb-2 tracking-tight text-white"
                as="h1"
              />
            ) : (
              <h1 className="text-[40px] font-bold mb-2 tracking-tight text-white">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[15px] font-semibold uppercase tracking-wider text-white/90"
                  as="p"
                />
              ) : (
                <p className="text-[15px] font-semibold uppercase tracking-wider text-white/90">
                  {resumeData.personalInfo.title}
                </p>
              )
            )}

            {/* Contact Info */}
            <div className="flex gap-6 mt-4 text-[13px] text-white/80">
              {resumeData.personalInfo.email && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="text-[13px] text-white/80 inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.email}</span>
                  )}
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={resumeData.personalInfo.phone}
                      className="text-[13px] text-white/80 inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.phone}</span>
                  )}
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={resumeData.personalInfo.location}
                      className="text-[13px] text-white/80 inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.location}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {photo && (
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Professional Summary */}
        <TemplateSummarySection
          resumeData={resumeData}
          editable={editable}
          themeColor={accent}
          title="Professional Summary"
          className="mb-8"
          renderHeader={(title) => (
            <h2
              className="text-[13px] font-bold uppercase tracking-wider mb-3"
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Social Links Section */}
        {(resumeData.includeSocialLinks || editable) && (
          <div className="mb-8 p-5 bg-white rounded-lg shadow-sm">
            <h2
              className="text-[13px] font-bold uppercase tracking-wider mb-3"
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Connect With Me')}
            </h2>
            <TemplateSocialLinks
              resumeData={resumeData}
              editable={editable}
              themeColor={accent}
              showLabels={false}
            />
          </div>
        )}

        {/* Skills - 3 Column Grid */}
        {(resumeData.skills && resumeData.skills.length > 0) || editable ? (
          <div className="mb-8">
            <h2 
              className="text-[13px] font-bold uppercase tracking-wider mb-4" 
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Technical Skills')}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {editable ? (
                <>
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="group relative p-3 bg-white rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow" style={{ borderColor: accent }}>
                      <InlineEditableText
                        path={`skills[${index}].name`}
                        value={skill.name}
                        className="text-[12px] font-semibold text-gray-800 block"
                        as="span"
                      />
                      {inlineEdit?.removeArrayItem && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            inlineEdit.removeArrayItem('skills', index);
                          }}
                          className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full shadow-sm border text-red-500 hover:bg-red-50"
                          title="Remove skill"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                  {inlineEdit?.addArrayItem && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        inlineEdit.addArrayItem('skills', { id: Date.now().toString(), name: 'New Skill' });
                      }}
                      className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-dashed hover:shadow-md transition-shadow flex items-center justify-center gap-2 text-[12px] font-semibold text-gray-600 hover:text-gray-800"
                      style={{ borderColor: accent }}
                    >
                      <Plus className="h-4 w-4" />
                      Add Skill
                    </button>
                  )}
                </>
              ) : (
                resumeData.skills.map((skill) => (
                  <div key={skill.id} className="p-3 bg-white rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow" style={{ borderColor: accent }}>
                    <span className="text-[12px] font-semibold text-gray-800 block">
                      {skill.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}

        {/* Professional Experience - Card Style */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-[13px] font-bold uppercase tracking-wider mb-4" 
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Professional Experience')}
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
                  <div className="mb-5 last:mb-0 p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-[14.5px] font-bold block"
                          as="h3"
                          style={{ color: accent }}
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-[13px] font-semibold text-gray-700 block mt-1"
                          as="p"
                        />
                      </div>
                      <div className="text-[11px] font-bold px-3 py-1.5 rounded-md" style={{ backgroundColor: accentLight, color: accent }}>
                        <div className="flex items-center gap-1 whitespace-nowrap">
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
                    <ExperienceBulletPoints
                      experienceId={exp.id}
                      experienceIndex={index}
                      bulletPoints={exp.bulletPoints}
                      description={exp.description}
                      editable={editable}
                      accentColor={accent}
                      bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
                    />
                  </div>
                )}
              />
            ) : (
              <div className="space-y-5">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-[14.5px] font-bold" style={{ color: accent }}>
                          {exp.position}
                        </h3>
                        <p className="text-[13px] font-semibold text-gray-700 mt-1">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-[11px] font-bold px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: accentLight, color: accent }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <ExperienceBulletPoints
                      experienceId={exp.id}
                      experienceIndex={index}
                      bulletPoints={exp.bulletPoints}
                      description={exp.description}
                      editable={false}
                      accentColor={accent}
                      bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {(resumeData.education && resumeData.education.length > 0) || editable ? (
          <div className="mb-8">
            <InlineEducationSection
              items={resumeData.education || []}
              editable={editable}
              accentColor={accent}
              variant="card"
              className="space-y-4"
              renderHeader={(title) => (
                <h2
                  className="text-[13px] font-bold uppercase tracking-wider mb-4"
                  data-accent-color="true"
                  style={{ color: accent }}
                >
                  {styleOptions.formatHeader(title)}
                </h2>
              )}
              renderItem={(edu, index, isEditable) => (
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  {isEditable ? (
                    <>
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-[13px] font-bold block"
                        style={{ color: accent }}
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-[12px] block mt-1"
                          style={{ color: '#1a1a1a' }}
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[11.5px] block mt-1"
                        style={{ color: '#6b7280' }}
                        as="p"
                      />
                      <div className="text-[11px] mt-1 flex items-center gap-1" style={{ color: '#6b7280' }}>
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
                    </>
                  ) : (
                    <>
                      <h3 className="text-[13px] font-bold block" style={{ color: accent }}>
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="text-[12px] block mt-1" style={{ color: '#1a1a1a' }}>
                          {edu.field}
                        </p>
                      )}
                      <p className="text-[11.5px] block mt-1" style={{ color: '#6b7280' }}>
                        {edu.school}
                      </p>
                      <div className="text-[11px] mt-1 flex items-center gap-1" style={{ color: '#6b7280' }}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </>
                  )}
                </div>
              )}
            />
          </div>
        ) : null}

        {/* Custom Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
          editable={editable}
          accentColor={accent}
          renderSectionHeader={(title, index, { EditableText }) => (
            <h2
              className="text-[13px] font-bold uppercase tracking-wider mb-4"
              data-accent-color="true"
              style={{ color: accent }}
            >
              <EditableText className="inherit" />
            </h2>
          )}
          renderSection={(section, index, helpers) => (
            <div className="mb-8">
              <helpers.Header />
              <div className="p-5 bg-white rounded-lg shadow-sm">
                <helpers.DefaultContent />
              </div>
            </div>
          )}
          itemStyle={{ 
            fontSize: '13px', 
            color: '#1a1a1a', 
            lineHeight: '1.75' 
          }}
        />
      </div>
    </div>
  );
};
