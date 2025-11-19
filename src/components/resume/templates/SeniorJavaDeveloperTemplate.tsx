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

export const SeniorJavaDeveloperTemplate = ({ resumeData, themeColor = "#f89820", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#f89820";
  const accentLight = withOpacity(accent, "15");
  const accentBorder = withOpacity(accent, "30");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header Section - Senior-level design with leadership emphasis */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accent} 0%, ${withOpacity(accent, "80")} 100%)`
          }}
        />
        <div className="relative px-12 pt-12 pb-10 border-b-[3px]" style={{ borderColor: accent }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="inline-block px-4 py-1.5 mb-3 text-[11px] font-semibold uppercase tracking-wide rounded-full" style={{ backgroundColor: accentLight, color: accent }}>
                  Senior Engineering Leader
                </div>
                <h1 className="text-[40px] font-bold tracking-tight text-gray-900 mb-2 leading-[1.1]">
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
                <p className="text-[16px] font-semibold mb-5" style={{ color: accent }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      placeholder="Senior Java Developer | Tech Lead | Architect"
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.title
                  )}
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-600">
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
              <ProfilePhoto src={photo} size="xl" borderClass="border-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Leadership Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-10">
            <h2
              className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-wider pb-2.5 border-b-[2.5px] flex items-center gap-3"
              style={{ borderColor: accent }}
            >
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }}></span>
              Leadership Profile
            </h2>
            <p className="text-[13.5px] text-gray-700 leading-[1.8]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Senior Java Developer with 10+ years of experience leading enterprise architecture initiatives, mentoring development teams, and driving technical excellence. Proven track record in system design, performance optimization, and delivering scalable solutions that impact millions of users..."
                  multiline
                  as="span"
                />
              ) : (
                resumeData.personalInfo.summary
              )}
            </p>
          </div>
        )}

        {/* Technical Expertise */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-10">
            <h2
              className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-wider pb-2.5 border-b-[2.5px] flex items-center gap-3"
              style={{ borderColor: accent }}
            >
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }}></span>
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 gap-3">
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
                      className="px-4 py-2 text-[12.5px] font-semibold rounded-md"
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
          <div className="mb-10">
            <h2
              className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-2.5 border-b-[2.5px] flex items-center gap-3"
              style={{ borderColor: accent }}
            >
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }}></span>
              Professional Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Senior Java Developer",
                  company: "Tech Company",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Led architecture design for microservices platform serving 5M+ users\n• Mentored team of 8 developers, improving code quality by 40%\n• Optimized system performance, reducing latency by 60%",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-7 last:mb-0 relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full" style={{ '::before': { backgroundColor: accent } as any }}>
                    <div className="flex justify-between items-start mb-2.5">
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
                      <div className="text-[12px] text-gray-500 font-semibold whitespace-nowrap ml-4 bg-gray-50 px-3 py-1.5 rounded-md">
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
                    <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
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
                <div key={index} className="mb-7 last:mb-0 relative pl-5">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: accent }}></div>
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[14px] font-semibold mt-1" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[12px] text-gray-500 font-semibold whitespace-nowrap ml-4 bg-gray-50 px-3 py-1.5 rounded-md">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
                    {exp.description}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Education */}
        {((resumeData.education && resumeData.education.length > 0) || editable) && (
          <div className="mb-10">
            <h2
              className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-2.5 border-b-[2.5px] flex items-center gap-3"
              style={{ borderColor: accent }}
            >
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }}></span>
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
                  <div className="mb-5 last:mb-0">
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
                        <p className="text-[13px] text-gray-600 mt-1">
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field || ""}
                            placeholder="Field of Study"
                            as="span"
                          />
                        </p>
                        <p className="text-[13.5px] font-semibold text-gray-700 mt-1">
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
                  </div>
                )}
                addButtonLabel="Add Education"
              />
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-5 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-[14.5px] font-bold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-[13px] text-gray-600 mt-1">{edu.field}</p>}
                      <p className="text-[13.5px] font-semibold text-gray-700 mt-1">{edu.school}</p>
                    </div>
                    <div className="text-[12px] text-gray-500 font-semibold whitespace-nowrap ml-4">
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
              content: "Oracle Certified Professional Java SE 17 Developer\nAWS Certified Solutions Architect - Professional\nCertified Kubernetes Administrator (CKA)",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-10">
                <h2
                  className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-2.5 border-b-[2.5px] flex items-center gap-3"
                  style={{ borderColor: accent }}
                >
                  <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }}></span>
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    placeholder="Section Title"
                    as="span"
                  />
                </h2>
                <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
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
            <div key={index} className="mb-10">
              <h2
                className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-2.5 border-b-[2.5px] flex items-center gap-3"
                style={{ borderColor: accent }}
              >
                <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }}></span>
                {section.title}
              </h2>
              <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
