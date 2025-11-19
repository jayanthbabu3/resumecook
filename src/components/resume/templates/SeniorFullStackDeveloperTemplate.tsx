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

export const SeniorFullStackDeveloperTemplate = ({ resumeData, themeColor = "#8b5cf6", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#8b5cf6";
  const accentLight = withOpacity(accent, "15");
  const accentBorder = withOpacity(accent, "30");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header Section - Full-stack versatile design */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-12 pt-11 pb-9">
          <div className="flex items-center gap-8">
            <div className="flex-1 text-center">
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
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-12" style={{ backgroundColor: accent }}></div>
                <p className="text-[16px] font-bold" style={{ color: accent }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      placeholder="Senior Full Stack Developer"
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.title
                  )}
                </p>
                <div className="h-[2px] w-12" style={{ backgroundColor: accent }}></div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-600 justify-center mb-4">
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
              <div className="flex justify-center">
                <ProfilePhoto src={photo} size="lg" borderClass="border-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[3px]" style={{ backgroundColor: accent }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Professional Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-9 text-center">
            <h2 className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-wider inline-block pb-2 border-b-2" style={{ borderColor: accent }}>
              Professional Summary
            </h2>
            <p className="text-[13.5px] text-gray-700 leading-[1.8] max-w-3xl mx-auto">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Senior Full Stack Developer with 10+ years building end-to-end web applications. Expert in modern JavaScript frameworks, cloud architecture, and agile development. Led cross-functional teams in delivering scalable solutions, improving system performance by 50%, and mentoring junior developers..."
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
            <h2 className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-wider text-center pb-2 border-b-2 inline-block w-full" style={{ borderColor: accent }}>
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  className="text-[13px]"
                />
              ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-[12.5px] font-semibold rounded-lg"
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
            <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider text-center pb-2 border-b-2 inline-block w-full" style={{ borderColor: accent }}>
              Professional Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Senior Full Stack Developer",
                  company: "Tech Company",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Built full-stack application serving 1M+ users with React and Node.js\n• Architected cloud infrastructure reducing costs by 30%\n• Mentored 5 developers in modern web development practices",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-7 last:mb-0 bg-gray-50 rounded-lg p-5 border-t-4" style={{ borderColor: accent }}>
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
                    <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• Full-stack achievement with measurable impact\n• Technical accomplishment demonstrating expertise\n• Team contribution showing leadership"
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
                <div key={index} className="mb-7 last:mb-0 bg-gray-50 rounded-lg p-5 border-t-4" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[14px] font-semibold mt-1" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[11.5px] text-white font-semibold whitespace-nowrap ml-4 px-3 py-1.5 rounded-full" style={{ backgroundColor: accent }}>
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
          <div className="mb-9">
            <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider text-center pb-2 border-b-2 inline-block w-full" style={{ borderColor: accent }}>
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
                  <div className="mb-4 last:mb-0 flex justify-between items-start">
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
                <div key={index} className="mb-4 last:mb-0 flex justify-between items-start">
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
        )}

        {/* Custom Sections */}
        {editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections || []}
            defaultItem={{
              title: "Certifications",
              content: "AWS Certified Developer - Associate\nMongoDB Certified Developer\nGoogle Cloud Professional Developer",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-9">
                <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider text-center pb-2 border-b-2 inline-block w-full" style={{ borderColor: accent }}>
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
            <div key={index} className="mb-9">
              <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider text-center pb-2 border-b-2 inline-block w-full" style={{ borderColor: accent }}>
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
