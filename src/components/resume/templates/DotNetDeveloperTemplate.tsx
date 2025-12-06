import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { CustomSectionsWrapper, TemplateSocialLinks, TemplateSummarySection } from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const DotNetDeveloperTemplate = ({ resumeData, themeColor = "#512bd4", editable = false }: TemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const inlineEdit = useInlineEdit();
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#512bd4";
  const accentLight = withOpacity(accent, "10");
  const accentBorder = withOpacity(accent, "25");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Segoe_UI','Roboto',sans-serif]" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      {/* Header Section - Microsoft-inspired clean header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b-2" style={{ borderColor: accent }}>
        <div className="max-w-4xl mx-auto px-12 py-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-[38px] font-semibold tracking-tight mb-2" style={{ color: '#000000' }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName}
                    placeholder="Your Name"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.fullName
                )}
              </h1>
              <div className="h-1 w-16 mb-3 rounded" style={{ backgroundColor: accent }} />
              <p className="text-[15px] font-medium text-gray-700 mb-4">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    placeholder=".NET Software Engineer"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                {(resumeData.personalInfo.email || editable) && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email || ""}
                        placeholder="email@example.com"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.email}</span>
                    )}
                  </div>
                )}
                {(resumeData.personalInfo.phone || editable) && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone || ""}
                        placeholder="+1 (555) 000-0000"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.phone}</span>
                    )}
                  </div>
                )}
                {(resumeData.personalInfo.location || editable) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location || ""}
                        placeholder="City, State"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.location}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <ProfilePhoto src={photo} size="lg" borderClass="border-4" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-9">
        {/* Professional Summary */}
        <TemplateSummarySection
          resumeData={resumeData}
          editable={editable}
          themeColor={accent}
          title="Professional Profile"
          className="mb-8"
          renderHeader={(title) => (
            <h2
              className="text-[13px] font-semibold uppercase mb-4 tracking-wide"
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Social Links Section */}
        {(resumeData.includeSocialLinks || editable) && (
          <div className="mb-8">
            <h2
              className="text-[13px] font-semibold uppercase mb-4 tracking-wide"
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

        {/* Core Competencies */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-8">
            <h2 
              className="text-[13px] font-semibold uppercase mb-4 tracking-wide" 
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Core Competencies')}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {editable ? (
                <>
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="group relative flex items-center gap-2 text-[13px]"
                      style={{ color: '#1a1a1a' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                      <InlineEditableText
                        path={`skills[${index}].name`}
                        value={skill.name}
                        className="flex-1"
                        as="span"
                      />
                      {inlineEdit?.removeArrayItem && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            inlineEdit.removeArrayItem('skills', index);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full shadow-sm border text-red-500 hover:bg-red-50"
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
                      className="flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-800 border border-dashed rounded p-2 justify-center"
                      style={{ borderColor: accent, color: accent }}
                    >
                      <Plus className="h-4 w-4" />
                      Add Skill
                    </button>
                  )}
                </>
              ) : (
                resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[13px]"
                    style={{ color: '#1a1a1a' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                    <span>{skill.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {((resumeData.experience && resumeData.experience.length > 0) || editable) && (
          <div className="mb-8">
            <h2 
              className="text-[13px] font-semibold uppercase mb-4 tracking-wide" 
              data-accent-color="true"
              style={{ color: accent }}
            >
              {styleOptions.formatHeader('Professional Experience')}
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Senior .NET Developer",
                  company: "Technology Solutions Inc.",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Developed enterprise web applications using ASP.NET Core and C#\n• Designed and implemented RESTful APIs and microservices architecture\n• Optimized database queries and improved application performance by 40%",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-7 last:mb-0 relative pl-5">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[13px] font-semibold" style={{ color: '#000000' }}>
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Job Title"
                            as="span"
                          />
                        </h3>
                        <p className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[13px] font-medium text-white px-3 py-1 rounded whitespace-nowrap ml-4" style={{ backgroundColor: accent }}>
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                        <span> - </span>
                        {exp.current ? (
                          <span>Present</span>
                        ) : (
                          <InlineEditableDate
                            path={`experience[${index}].endDate`}
                            value={exp.endDate}
                            formatDisplay={formatDate}
                            className="inline-block"
                          />
                        )}
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
                addButtonLabel="Add Experience"
              />
            ) : (
              resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-7 last:mb-0 relative pl-5">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[13px] font-semibold" style={{ color: '#000000' }}>{exp.position}</h3>
                      <p className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>{exp.company}</p>
                    </div>
                    <div className="text-[13px] font-medium text-white px-3 py-1 rounded whitespace-nowrap ml-4" style={{ backgroundColor: accent }}>
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
              ))
            )}
          </div>
        )}

        {/* Education */}
        {(resumeData.education.length > 0) || editable ? (
          <div className="mb-8">
            <InlineEducationSection
              items={resumeData.education || []}
              editable={editable}
              accentColor={accent}
              variant="card"
              className="space-y-4"
              renderHeader={(title) => (
                <h2
                  className="text-[13px] font-semibold uppercase mb-4 tracking-wide"
                  data-accent-color="true"
                  style={{ color: accent }}
                >
                  {styleOptions.formatHeader(title)}
                </h2>
              )}
              renderItem={(edu, index, isEditable) => (
                <div className="mb-4 last:mb-0 bg-gray-50 p-4 rounded-lg">
                  {isEditable ? (
                    <>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <InlineEditableText
                            path={`education[${index}].degree`}
                            value={edu.degree}
                            className="text-[13px] font-semibold block"
                            style={{ color: '#000000' }}
                            as="h3"
                          />
                          {edu.field && (
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              className="text-[13px] mt-0.5 block"
                              style={{ color: '#6b7280' }}
                              as="p"
                            />
                          )}
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            className="text-[13px] font-medium mt-1 block"
                            style={{ color: '#1a1a1a' }}
                            as="p"
                          />
                        </div>
                        <div className="text-[13px] font-medium whitespace-nowrap ml-4" style={{ color: '#6b7280' }}>
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
                    </>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-[13px] font-semibold block" style={{ color: '#000000' }}>{edu.degree}</h3>
                        {edu.field && <p className="text-[13px] mt-0.5 block" style={{ color: '#6b7280' }}>{edu.field}</p>}
                        <p className="text-[13px] font-medium mt-1 block" style={{ color: '#1a1a1a' }}>{edu.school}</p>
                      </div>
                      <div className="text-[13px] font-medium whitespace-nowrap ml-4" style={{ color: '#6b7280' }}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
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
              className="text-[13px] font-semibold uppercase mb-4 tracking-wide"
              data-accent-color="true"
              style={{ color: accent }}
            >
              <EditableText className="inherit" />
            </h2>
          )}
          itemStyle={{ 
            fontSize: '13px', 
            color: '#1a1a1a', 
            lineHeight: '1.7' 
          }}
          sectionStyle={{ marginBottom: '28px' }}
        />
      </div>
    </div>
  );
};
