import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableList } from "../InlineEditableList";
import { InlineEditableSkills } from "../InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

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

export const CloudArchitectTemplate = ({ resumeData, themeColor = "#FF9900", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#FF9900";
  const accentLight = withOpacity(accent, "08");
  const accentMedium = withOpacity(accent, "18");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter','Helvetica',sans-serif] text-gray-900">
      {/* Header - Professional with cloud-inspired design */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-white border-b">
        <div className="max-w-4xl mx-auto px-12 pt-10 pb-8">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-[40px] font-bold tracking-tight text-gray-900 leading-tight">
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
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1 w-20 rounded" style={{ backgroundColor: accent }} />
                  <p className="text-[16px] font-semibold text-gray-700">
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={resumeData.personalInfo.title}
                        placeholder="Cloud Solutions Architect"
                        as="span"
                      />
                    ) : (
                      resumeData.personalInfo.title
                    )}
                  </p>
                </div>
              </div>

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

      <div className="max-w-4xl mx-auto px-12 py-9">
        {/* Executive Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-9">
            <h2
              className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-widest pb-2 border-b-2"
              style={{ borderColor: accent }}
            >
              Executive Summary
            </h2>
            <p className="text-[13px] text-gray-700 leading-[1.85]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Cloud Solutions Architect with 8+ years of experience designing and implementing scalable cloud infrastructure on AWS, Azure, and GCP. Expert in cloud migration strategies, cost optimization, and security architecture..."
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
            <h2
              className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-widest pb-2 border-b-2"
              style={{ borderColor: accent }}
            >
              Core Competencies
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills || []}
                className="text-[12.5px]"
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 text-[12.5px] text-gray-700 p-2.5 rounded"
                    style={{ backgroundColor: accentLight }}
                  >
                    <div className="w-1 h-4 rounded" style={{ backgroundColor: accent }} />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Professional Experience */}
        {((resumeData.experience && resumeData.experience.length > 0) || editable) && (
          <div className="mb-9">
            <h2
              className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-widest pb-2 border-b-2"
              style={{ borderColor: accent }}
            >
              Professional Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Cloud Solutions Architect",
                  company: "Enterprise Tech Corp.",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Designed and implemented multi-cloud architecture for enterprise applications serving 10M+ users\n• Led cloud migration initiative, reducing infrastructure costs by 45% while improving performance\n• Architected serverless solutions using AWS Lambda, API Gateway, and DynamoDB\n• Implemented Infrastructure as Code using Terraform and CloudFormation",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-7 last:mb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="flex-1">
                        <h3 className="text-[16px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Job Title"
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
                      <div className="text-[12px] font-semibold text-white px-4 py-1.5 rounded-full whitespace-nowrap ml-4" style={{ backgroundColor: accent }}>
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
                    <div className="text-[12.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap mt-3 pl-4" style={{ borderLeft: `3px solid ${accentMedium}` }}>
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• Highlight key achievements and technical responsibilities"
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
                <div key={index} className="mb-7 last:mb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex-1">
                      <h3 className="text-[16px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[13.5px] font-semibold mt-1" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[12px] font-semibold text-white px-4 py-1.5 rounded-full whitespace-nowrap ml-4" style={{ backgroundColor: accent }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[12.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap mt-3 pl-4" style={{ borderLeft: `3px solid ${accentMedium}` }}>
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
            <h2
              className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-widest pb-2 border-b-2"
              style={{ borderColor: accent }}
            >
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education || []}
                defaultItem={{
                  degree: "Master of Science",
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
                          {edu.field && (
                            <>
                              <span className="font-normal text-gray-600"> in </span>
                              <InlineEditableText
                                path={`education[${index}].field`}
                                value={edu.field}
                                placeholder="Field"
                                as="span"
                              />
                            </>
                          )}
                        </h3>
                        <p className="text-[13px] text-gray-700 mt-1">
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
                      <h3 className="text-[14px] font-bold text-gray-900">
                        {edu.degree}
                        {edu.field && <span className="font-normal text-gray-600"> in {edu.field}</span>}
                      </h3>
                      <p className="text-[13px] text-gray-700 mt-1">{edu.school}</p>
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
              content: "AWS Certified Solutions Architect – Professional\nGoogle Cloud Professional Cloud Architect\nMicrosoft Certified: Azure Solutions Architect Expert",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-9">
                <h2
                  className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-widest pb-2 border-b-2"
                  style={{ borderColor: accent }}
                >
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    placeholder="Section Title"
                    as="span"
                  />
                </h2>
                <div className="text-[12.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
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
              <h2
                className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-widest pb-2 border-b-2"
                style={{ borderColor: accent }}
              >
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
