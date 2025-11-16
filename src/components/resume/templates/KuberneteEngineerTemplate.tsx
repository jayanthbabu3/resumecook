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

export const KuberneteEngineerTemplate = ({ resumeData, themeColor = "#326CE5", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#326CE5";
  const accentLight = withOpacity(accent, "10");
  const accentMedium = withOpacity(accent, "20");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header - Kubernetes-inspired hexagonal design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${accent} 0px, transparent 2px, transparent 50px),
                            repeating-linear-gradient(90deg, ${accent} 0px, transparent 2px, transparent 50px)`
        }} />
        <div className="relative max-w-4xl mx-auto px-12 py-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[16px]"
                  style={{ backgroundColor: accent }}>
                  K8s
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent, opacity: 0.6 }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent, opacity: 0.3 }} />
                </div>
              </div>
              <h1 className="text-[38px] font-bold tracking-tight text-white mb-2">
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
                    placeholder="Kubernetes Engineer"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-gray-300">
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
            <ProfilePhoto src={photo} size="lg" borderClass="border-4 border-white/20" />
          </div>
        </div>
        <div className="h-1.5" style={{ backgroundColor: accent }} />
      </div>

      <div className="max-w-4xl mx-auto px-12 py-9">
        {/* Professional Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-gray-900 tracking-wide flex items-center gap-3">
              <span className="w-1 h-6 rounded" style={{ backgroundColor: accent }} />
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-[13px] text-gray-700 leading-[1.8]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Kubernetes Engineer with 6+ years orchestrating containerized applications at scale. Expert in K8s architecture, cluster management, and cloud-native technologies with strong DevOps and automation skills..."
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
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-gray-900 tracking-wide flex items-center gap-3">
              <span className="w-1 h-6 rounded" style={{ backgroundColor: accent }} />
              TECHNICAL EXPERTISE
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills || []}
                className="text-[12.5px]"
              />
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-[12px] font-medium rounded-md border-2"
                    style={{
                      borderColor: accent,
                      color: accent,
                      backgroundColor: accentLight
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Professional Experience */}
        {((resumeData.experience && resumeData.experience.length > 0) || editable) && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-gray-900 tracking-wide flex items-center gap-3">
              <span className="w-1 h-6 rounded" style={{ backgroundColor: accent }} />
              PROFESSIONAL EXPERIENCE
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Senior Kubernetes Engineer",
                  company: "Cloud Native Solutions",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Designed and managed production Kubernetes clusters running 500+ microservices\n• Implemented GitOps workflows using ArgoCD and Flux for automated deployments\n• Configured service meshes with Istio for traffic management and security\n• Reduced infrastructure costs by 40% through resource optimization and autoscaling",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-6 last:mb-0 p-5 rounded-lg" style={{ backgroundColor: accentLight }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Job Title"
                            as="span"
                          />
                        </h3>
                        <p className="text-[13px] font-semibold" style={{ color: accent }}>
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[11.5px] font-semibold text-gray-600 whitespace-nowrap ml-4">
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
                    <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap mt-3">
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• List your key achievements and responsibilities"
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
                <div key={index} className="mb-6 last:mb-0 p-5 rounded-lg" style={{ backgroundColor: accentLight }}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[13px] font-semibold" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[11.5px] font-semibold text-gray-600 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap mt-3">
                    {exp.description}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Education */}
        {((resumeData.education && resumeData.education.length > 0) || editable) && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-gray-900 tracking-wide flex items-center gap-3">
              <span className="w-1 h-6 rounded" style={{ backgroundColor: accent }} />
              EDUCATION
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
                          {edu.field && <span className="text-[12.5px] text-gray-600 font-normal"> in {" "}
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              placeholder="Field"
                              as="span"
                            />
                          </span>}
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
                        {edu.field && <span className="text-[12.5px] text-gray-600 font-normal"> in {edu.field}</span>}
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
              content: "Certified Kubernetes Administrator (CKA)\nCertified Kubernetes Application Developer (CKAD)\nCertified Kubernetes Security Specialist (CKS)\nAWS Certified Solutions Architect",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-8">
                <h2 className="text-[14px] font-bold mb-4 text-gray-900 tracking-wide flex items-center gap-3">
                  <span className="w-1 h-6 rounded" style={{ backgroundColor: accent }} />
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title.toUpperCase()}
                    placeholder="SECTION TITLE"
                    as="span"
                  />
                </h2>
                <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
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
            <div key={index} className="mb-8">
              <h2 className="text-[14px] font-bold mb-4 text-gray-900 tracking-wide flex items-center gap-3">
                <span className="w-1 h-6 rounded" style={{ backgroundColor: accent }} />
                {section.title.toUpperCase()}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
