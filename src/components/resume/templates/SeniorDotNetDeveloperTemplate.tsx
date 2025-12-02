import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

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

export const SeniorDotNetDeveloperTemplate = ({ resumeData, themeColor = "#512bd4", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#512bd4";
  const accentLight = withOpacity(accent, "15");
  const accentBorder = withOpacity(accent, "30");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header Section - Modern executive style */}
      <div className="bg-gradient-to-br from-gray-50 to-white border-b-[3px]" style={{ borderColor: accent }}>
        <div className="max-w-4xl mx-auto px-12 py-10">
          <div className="flex items-center justify-between gap-8">
            <ProfilePhoto src={photo} size="xl" borderClass="border-[3px]" />
            <div className="flex-1">
              <h1 className="text-[38px] font-bold tracking-tight text-gray-900 mb-2">
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
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1" style={{ backgroundColor: withOpacity(accent, "30") }}></div>
                <p className="text-[16px] font-bold uppercase tracking-wide" style={{ color: accent }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      placeholder="Senior .NET Developer | Azure Architect"
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.title
                  )}
                </p>
                <div className="h-px flex-1" style={{ backgroundColor: withOpacity(accent, "30") }}></div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-600 justify-center">
                {(resumeData.personalInfo.email || editable) && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: accent }} />
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
                    <Phone className="w-4 h-4" style={{ color: accent }} />
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
                    <MapPin className="w-4 h-4" style={{ color: accent }} />
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
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Executive Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-9">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <div className="w-6 h-6 rounded" style={{ backgroundColor: accent }}></div>
              </div>
              <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">
                Executive Summary
              </h2>
            </div>
            <p className="text-[13.5px] text-gray-700 leading-[1.8] pl-16">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Senior .NET Developer with 12+ years architecting enterprise solutions on Azure. Expert in leading development teams, implementing best practices, and delivering high-performance applications. Proven track record in cloud migration, system modernization, and technical mentorship..."
                  multiline
                  as="span"
                />
              ) : (
                resumeData.personalInfo.summary
              )}
            </p>
          </div>
        )}

        {/* Core Competencies */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-9">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <div className="w-6 h-6 rounded" style={{ backgroundColor: accent }}></div>
              </div>
              <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">
                Core Competencies
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 pl-16">
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  className="text-[13px]"
                />
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-[12.5px] font-semibold rounded-lg shadow-sm"
                      style={{
                        backgroundColor: accentLight,
                        color: accent,
                        border: `1.5px solid ${accentBorder}`
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {((resumeData.experience && resumeData.experience.length > 0) || editable) && (
          <div className="mb-9">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <div className="w-6 h-6 rounded" style={{ backgroundColor: accent }}></div>
              </div>
              <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">
                Professional Experience
              </h2>
            </div>
            <div className="pl-16 space-y-6">
              {editable ? (
                <InlineEditableList
                  path="experience"
                  items={resumeData.experience || []}
                  defaultItem={{
                    position: "Senior .NET Developer",
                    company: "Enterprise Corporation",
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date().toISOString().split("T")[0],
                    current: false,
                    description: "• Architected Azure cloud solutions reducing infrastructure costs by 35%\n• Led team of 6 developers in migrating legacy systems to .NET Core\n• Implemented CI/CD pipelines improving deployment efficiency by 50%",
                    id: Date.now().toString(),
                  }}
                  renderItem={(exp, index) => (
                    <div className="border-l-[3px] pl-5 pb-6" style={{ borderColor: accentLight }}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-[15px] font-bold text-gray-900">
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position}
                              placeholder="Senior Position Title"
                              as="span"
                            />
                          </h3>
                          <p className="text-[14px] font-semibold mt-1" style={{ color: accent }}>
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company}
                              placeholder="Company Name"
                              as="span"
                            />
                          </p>
                        </div>
                        <div className="text-[11.5px] text-white font-semibold whitespace-nowrap ml-4 px-3 py-1.5 rounded-full" style={{ backgroundColor: accent }}>
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
                      <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap mt-3">
                        <InlineEditableText
                          path={`experience[${index}].description`}
                          value={exp.description}
                          placeholder="• Leadership achievement with measurable impact\n• Technical accomplishment demonstrating expertise\n• Team contribution showing mentorship"
                          multiline
                          as="div"
                        />
                      </div>
                    </div>
                  )}
                  addButtonLabel="Add Experience"
                />
              ) : (
                resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-l-[3px] pl-5 pb-6" style={{ borderColor: accentLight }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-[14px] font-semibold mt-1" style={{ color: accent }}>{exp.company}</p>
                      </div>
                      <div className="text-[11.5px] text-white font-semibold whitespace-nowrap ml-4 px-3 py-1.5 rounded-full" style={{ backgroundColor: accent }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap mt-3">
                      {exp.description}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {((resumeData.education && resumeData.education.length > 0) || editable) && (
          <div className="mb-9">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <div className="w-6 h-6 rounded" style={{ backgroundColor: accent }}></div>
              </div>
              <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">
                Education
              </h2>
            </div>
            <div className="pl-16 space-y-4">
              {editable ? (
                <InlineEditableList
                  path="education"
                  items={resumeData.education || []}
                  defaultItem={{
                    degree: "Bachelor of Science",
                    field: "Computer Science",
                    school: "University Name",
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date().toISOString().split("T")[0],
                    id: Date.now().toString(),
                  }}
                  renderItem={(edu, index) => (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-[14.5px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`education[${index}].degree`}
                            value={edu.degree}
                            placeholder="Degree"
                            as="span"
                          />
                        </h3>
                        <p className="text-[13px] text-gray-600 mt-0.5">
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field || ""}
                            placeholder="Field of Study"
                            as="span"
                          />
                        </p>
                        <p className="text-[13.5px] font-medium text-gray-700 mt-0.5">
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            placeholder="School Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[12px] text-gray-500 font-semibold whitespace-nowrap ml-4">
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
                  )}
                  addButtonLabel="Add Education"
                />
              ) : (
                resumeData.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-[14.5px] font-bold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-[13px] text-gray-600 mt-0.5">{edu.field}</p>}
                      <p className="text-[13.5px] font-medium text-gray-700 mt-0.5">{edu.school}</p>
                    </div>
                    <div className="text-[12px] text-gray-500 font-semibold whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections || []}
            defaultItem={{
              title: "Certifications",
              content: "Microsoft Certified: Azure Solutions Architect Expert\nMicrosoft Certified: DevOps Engineer Expert\nAWS Certified Solutions Architect",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-9">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: accent }}></div>
                  </div>
                  <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">
                    <InlineEditableText
                      path={`sections[${index}].title`}
                      value={section.title}
                      placeholder="Section Title"
                      as="span"
                    />
                  </h2>
                </div>
                <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap pl-16">
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    placeholder="Section content..."
                    multiline
                    as="div"
                  />
                </div>
              </div>
            )}
            addButtonLabel="Add Custom Section"
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-9">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: accent }}></div>
                </div>
                <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
              <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap pl-16">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
