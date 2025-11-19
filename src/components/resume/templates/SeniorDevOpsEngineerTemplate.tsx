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

export const SeniorDevOpsEngineerTemplate = ({ resumeData, themeColor = "#326ce5", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#326ce5";
  const accentLight = withOpacity(accent, "15");
  const accentBorder = withOpacity(accent, "30");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header Section - Technical architecture style */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-95"></div>
        <div className="relative px-12 pt-10 pb-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-md" style={{ backgroundColor: accent }}>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Senior DevOps Engineer</span>
                </div>
                <h1 className="text-[38px] font-bold tracking-tight mb-2">
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
                <p className="text-[15px] font-medium mb-5 text-gray-300">
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      placeholder="Infrastructure Architect | Cloud Orchestration Lead"
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.title
                  )}
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11.5px] text-gray-300">
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
              <ProfilePhoto src={photo} size="xl" borderClass="border-[3px] border-white shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Professional Profile */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-9 bg-gray-50 rounded-lg p-6 border-l-4" style={{ borderColor: accent }}>
            <h2 className="text-[14px] font-bold mb-3 text-gray-900 uppercase tracking-wider" style={{ color: accent }}>
              Professional Profile
            </h2>
            <p className="text-[13px] text-gray-700 leading-[1.75]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Senior DevOps Engineer with 10+ years orchestrating multi-cloud infrastructure at scale. Expert in Kubernetes, automation, and CI/CD pipeline optimization. Led infrastructure initiatives reducing deployment time by 75% and infrastructure costs by 40%. Passionate about building reliable, scalable systems..."
                  multiline
                  as="span"
                />
              ) : (
                resumeData.personalInfo.summary
              )}
            </p>
          </div>
        )}

        {/* Technical Skills */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-9">
            <h2 className="text-[14px] font-bold mb-4 text-gray-900 uppercase tracking-wider pb-2 border-b-2" style={{ borderColor: accent }}>
              Technical Skills & Tools
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  className="text-[12.5px]"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3.5 py-1.5 text-[12px] font-semibold rounded-md border-2"
                      style={{
                        backgroundColor: 'white',
                        color: accent,
                        borderColor: accent
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
            <h2 className="text-[14px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-2 border-b-2" style={{ borderColor: accent }}>
              Professional Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Senior DevOps Engineer",
                  company: "Tech Company",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Architected multi-cloud Kubernetes infrastructure supporting 100+ microservices\n• Reduced deployment time from 4 hours to 15 minutes through automation\n• Led team of 5 engineers in implementing GitOps practices",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-6 last:mb-0 bg-white rounded-lg p-5 border-l-4 shadow-sm" style={{ borderColor: accent }}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Senior Position Title"
                            as="span"
                          />
                        </h3>
                        <p className="text-[13.5px] font-semibold mt-1" style={{ color: accent }}>
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[11.5px] text-gray-600 font-semibold whitespace-nowrap ml-4 bg-gray-100 px-3 py-1.5 rounded">
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
                    <div className="text-[12.5px] text-gray-700 leading-[1.75] whitespace-pre-wrap">
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• Infrastructure achievement with measurable impact\n• Automation accomplishment demonstrating expertise\n• Team leadership showing influence"
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
                <div key={index} className="mb-6 last:mb-0 bg-white rounded-lg p-5 border-l-4 shadow-sm" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[13.5px] font-semibold mt-1" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[11.5px] text-gray-600 font-semibold whitespace-nowrap ml-4 bg-gray-100 px-3 py-1.5 rounded">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[12.5px] text-gray-700 leading-[1.75] whitespace-pre-wrap">
                    {exp.description}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Education */}
        {((resumeData.education && resumeData.education.length > 0) || editable) && (
          <div className="mb-9">
            <h2 className="text-[14px] font-bold mb-4 text-gray-900 uppercase tracking-wider pb-2 border-b-2" style={{ borderColor: accent }}>
              Education
            </h2>
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
                  <div className="mb-4 last:mb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-[14px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`education[${index}].degree`}
                            value={edu.degree}
                            placeholder="Degree"
                            as="span"
                          />
                        </h3>
                        <p className="text-[12.5px] text-gray-600 mt-0.5">
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field || ""}
                            placeholder="Field of Study"
                            as="span"
                          />
                        </p>
                        <p className="text-[13px] font-medium text-gray-700 mt-0.5">
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            placeholder="School Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[11.5px] text-gray-500 font-medium whitespace-nowrap ml-4">
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
                  </div>
                )}
                addButtonLabel="Add Education"
              />
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-[12.5px] text-gray-600 mt-0.5">{edu.field}</p>}
                      <p className="text-[13px] font-medium text-gray-700 mt-0.5">{edu.school}</p>
                    </div>
                    <div className="text-[11.5px] text-gray-500 font-medium whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Custom Sections */}
        {editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections || []}
            defaultItem={{
              title: "Certifications",
              content: "Certified Kubernetes Administrator (CKA)\nAWS Certified DevOps Engineer - Professional\nGoogle Cloud Professional Cloud Architect",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-9">
                <h2 className="text-[14px] font-bold mb-4 text-gray-900 uppercase tracking-wider pb-2 border-b-2" style={{ borderColor: accent }}>
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    placeholder="Section Title"
                    as="span"
                  />
                </h2>
                <div className="text-[12.5px] text-gray-700 leading-[1.75] whitespace-pre-wrap">
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
              <h2 className="text-[14px] font-bold mb-4 text-gray-900 uppercase tracking-wider pb-2 border-b-2" style={{ borderColor: accent }}>
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.75] whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
