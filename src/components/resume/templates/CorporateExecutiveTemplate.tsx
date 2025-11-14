import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CorporateExecutiveTemplate = ({
  resumeData,
  themeColor = "#1e40af",
  editable = false,
}: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div
      className="w-full h-full bg-white text-gray-900"
      style={{ pageBreakAfter: "auto" }}
    >
      {/* Header Section with Accent */}
      <div
        className="relative"
        style={{
          pageBreakAfter: "avoid",
          pageBreakInside: "avoid",
        }}
      >
        {/* Top Accent Bar */}
        <div
          className="h-3"
          style={{
            background: `linear-gradient(90deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
          }}
        />

        {/* Main Header Content */}
        <div className="px-12 pt-10 pb-8">
          <div className="flex items-start justify-between gap-6">
            {/* Name and Title */}
            <div className="flex-1">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName || "Your Name"}
                  className="text-4xl font-bold mb-3 leading-tight"
                  as="h1"
                  style={{ color: themeColor }}
                />
              ) : (
                <h1
                  className="text-4xl font-bold mb-3 leading-tight"
                  style={{ color: themeColor }}
                >
                  {resumeData.personalInfo.fullName || "Your Name"}
                </h1>
              )}
              {resumeData.personalInfo.title && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-xl text-gray-700 font-medium mb-4"
                    as="p"
                  />
                ) : (
                  <p className="text-xl text-gray-700 font-medium mb-4">
                    {resumeData.personalInfo.title}
                  </p>
                )
              )}
              {/* Contact Information */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                {resumeData.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" style={{ color: themeColor }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email}
                        className="text-sm text-gray-600 inline"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.email}</span>
                    )}
                  </div>
                )}
                {resumeData.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" style={{ color: themeColor }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone}
                        className="text-sm text-gray-600 inline"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.phone}</span>
                    )}
                  </div>
                )}
                {resumeData.personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" style={{ color: themeColor }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location}
                        className="text-sm text-gray-600 inline"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.location}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Photo */}
            <ProfilePhoto
              src={photo}
              sizeClass="h-28 w-28"
              borderClass="border-4 border-white"
            />
          </div>
        </div>

        {/* Divider */}
        <div
          className="mx-12 h-px"
          style={{ backgroundColor: `${themeColor}40` }}
        />
      </div>

      {/* Main Content */}
      <div className="px-12 py-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
            <h2
              className="text-base font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
              style={{
                color: themeColor,
                borderColor: themeColor,
                pageBreakAfter: "avoid",
              }}
            >
              Executive Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-sm text-gray-700 leading-relaxed"
                as="p"
                multiline
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Two-Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div>
                <h2
                  className="text-base font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                  style={{
                    color: themeColor,
                    borderColor: themeColor,
                    pageBreakAfter: "avoid",
                  }}
                >
                  Professional Experience
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
                      <div style={{ pageBreakInside: "avoid" }}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position || "Position Title"}
                              className="text-base font-bold"
                              as="h3"
                              style={{ color: themeColor }}
                            />
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company || "Company Name"}
                              className="text-sm text-gray-800 font-semibold"
                              as="p"
                            />
                          </div>
                          <div className="text-xs text-gray-600 text-right whitespace-nowrap ml-4">
                            <div>{formatDate(exp.startDate)}</div>
                            <div>
                              {exp.current ? "Present" : formatDate(exp.endDate)}
                            </div>
                          </div>
                        </div>
                        {exp.description && (
                          <InlineEditableText
                            path={`experience[${index}].description`}
                            value={exp.description}
                            className="text-sm text-gray-700 leading-relaxed mt-2"
                            as="div"
                            multiline
                          />
                        )}
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} style={{ pageBreakInside: "avoid" }}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3
                              className="text-base font-bold"
                              style={{ color: themeColor }}
                            >
                              {exp.position || "Position Title"}
                            </h3>
                            <p className="text-sm text-gray-800 font-semibold">
                              {exp.company || "Company Name"}
                            </p>
                          </div>
                          <div className="text-xs text-gray-600 text-right whitespace-nowrap ml-4">
                            <div>{formatDate(exp.startDate)}</div>
                            <div>
                              {exp.current ? "Present" : formatDate(exp.endDate)}
                            </div>
                          </div>
                        </div>
                        {exp.description && (
                          <div className="text-sm text-gray-700 leading-relaxed mt-2">
                            {exp.description.split("\n").map((line, i) => (
                              <p key={i} className="mb-1">
                                {line}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Custom Sections in Main Column */}
            {editable ? (
              <InlineEditableList
                path="sections"
                items={resumeData.sections.slice(0, Math.ceil(resumeData.sections.length / 2))}
                defaultItem={{
                  id: Date.now().toString(),
                  title: "Section Title",
                  content: "Section content",
                }}
                addButtonLabel="Add Section"
                renderItem={(section, index) => (
                  <div style={{ pageBreakInside: "avoid" }}>
                    <InlineEditableText
                      path={`sections[${index}].title`}
                      value={section.title}
                      className="text-base font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                      as="h2"
                      style={{
                        color: themeColor,
                        borderColor: themeColor,
                        pageBreakAfter: "avoid",
                      }}
                    />
                    <InlineEditableText
                      path={`sections[${index}].content`}
                      value={section.content}
                      className="text-sm text-gray-700 leading-relaxed"
                      as="div"
                      multiline
                    />
                  </div>
                )}
              />
            ) : (
              resumeData.sections
                .filter((section) => section.title && section.content)
                .slice(0, Math.ceil(resumeData.sections.length / 2))
                .map((section) => (
                  <div key={section.id} style={{ pageBreakInside: "avoid" }}>
                    <h2
                      className="text-base font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                      style={{
                        color: themeColor,
                        borderColor: themeColor,
                        pageBreakAfter: "avoid",
                      }}
                    >
                      {section.title}
                    </h2>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {section.content.split("\n").map((line, i) => (
                        <p key={i} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-1 space-y-8">
            {/* Education */}
            {resumeData.education.length > 0 && (
              <div style={{ pageBreakInside: "avoid" }}>
                <h2
                  className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                  style={{
                    color: themeColor,
                    borderColor: themeColor,
                    pageBreakAfter: "avoid",
                  }}
                >
                  Education
                </h2>
                {editable ? (
                  <InlineEditableList
                    path="education"
                    items={resumeData.education}
                    defaultItem={{
                      id: Date.now().toString(),
                      degree: "Degree",
                      school: "School Name",
                      field: "Field of Study",
                      startDate: "2020-01",
                      endDate: "2024-01",
                    }}
                    addButtonLabel="Add Education"
                    renderItem={(edu, index) => (
                      <div>
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree || "Degree"}
                          className="text-sm font-bold mb-1"
                          as="h3"
                          style={{ color: themeColor }}
                        />
                        {edu.field && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-xs text-gray-700 mb-1"
                            as="p"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school || "School Name"}
                          className="text-xs text-gray-800 font-semibold mb-1"
                          as="p"
                        />
                        <p className="text-xs text-gray-600">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <h3
                          className="text-sm font-bold mb-1"
                          style={{ color: themeColor }}
                        >
                          {edu.degree || "Degree"}
                        </h3>
                        {edu.field && (
                          <p className="text-xs text-gray-700 mb-1">{edu.field}</p>
                        )}
                        <p className="text-xs text-gray-800 font-semibold mb-1">
                          {edu.school || "School Name"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div style={{ pageBreakInside: "avoid" }}>
                <h2
                  className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                  style={{
                    color: themeColor,
                    borderColor: themeColor,
                    pageBreakAfter: "avoid",
                  }}
                >
                  Core Competencies
                </h2>
                {editable ? (
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills}
                    renderSkill={(skill, index) =>
                      skill.name ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: themeColor }}
                          />
                          <span className="text-xs text-gray-700 font-medium">
                            {skill.name}
                          </span>
                        </div>
                      ) : null
                    }
                  />
                ) : (
                  <div className="space-y-2">
                    {resumeData.skills.map((skill) =>
                      skill.name ? (
                        <div key={skill.id} className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: themeColor }}
                          />
                          <span className="text-xs text-gray-700 font-medium">
                            {skill.name}
                          </span>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Remaining Custom Sections */}
            {editable ? (
              <InlineEditableList
                path="sections"
                items={resumeData.sections.slice(Math.ceil(resumeData.sections.length / 2))}
                defaultItem={{
                  id: Date.now().toString(),
                  title: "Section Title",
                  content: "Section content",
                }}
                addButtonLabel="Add Section"
                renderItem={(section, sidebarIndex) => {
                  const actualIndex = Math.ceil(resumeData.sections.length / 2) + sidebarIndex;
                  return (
                    <div style={{ pageBreakInside: "avoid" }}>
                      <InlineEditableText
                        path={`sections[${actualIndex}].title`}
                        value={section.title}
                        className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                        as="h2"
                        style={{
                          color: themeColor,
                          borderColor: themeColor,
                          pageBreakAfter: "avoid",
                        }}
                      />
                      <InlineEditableText
                        path={`sections[${actualIndex}].content`}
                        value={section.content}
                        className="text-xs text-gray-700 leading-relaxed"
                        as="div"
                        multiline
                      />
                    </div>
                  );
                }}
              />
            ) : (
              resumeData.sections
                .filter((section) => section.title && section.content)
                .slice(Math.ceil(resumeData.sections.length / 2))
                .map((section) => (
                  <div key={section.id} style={{ pageBreakInside: "avoid" }}>
                    <h2
                      className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                      style={{
                        color: themeColor,
                        borderColor: themeColor,
                        pageBreakAfter: "avoid",
                      }}
                    >
                      {section.title}
                    </h2>
                    <div className="text-xs text-gray-700 leading-relaxed">
                      {section.content.split("\n").map((line, i) => (
                        <p key={i} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
