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

export const MinimalTemplate = ({ resumeData, themeColor, editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white px-16 py-12 text-gray-900" style={{ pageBreakAfter: 'auto' }}>
      {/* Header */}
      <div className="mb-8 text-center max-w-4xl mx-auto" style={{ pageBreakAfter: 'avoid', pageBreakInside: 'avoid' }}>
        <div className="flex justify-center mb-4">
          <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
        </div>
        {editable ? (
          <>
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-4xl font-light text-gray-900 mb-2 tracking-tight block"
              as="h1"
            />
            {resumeData.personalInfo.title && (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-base text-gray-600 font-light mb-4 tracking-wide block"
                as="p"
              />
            )}
          </>
        ) : (
          <>
            <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-base text-gray-600 font-light mb-4 tracking-wide">
                {resumeData.personalInfo.title}
              </p>
            )}
          </>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          {resumeData.personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {editable ? (
                <InlineEditableText path="personalInfo.email" value={resumeData.personalInfo.email} className="inline-block" />
              ) : resumeData.personalInfo.email}
            </span>
          )}
          {resumeData.personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {editable ? (
                <InlineEditableText path="personalInfo.phone" value={resumeData.personalInfo.phone} className="inline-block" />
              ) : resumeData.personalInfo.phone}
            </span>
          )}
          {resumeData.personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {editable ? (
                <InlineEditableText path="personalInfo.location" value={resumeData.personalInfo.location} className="inline-block" />
              ) : resumeData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-sm text-gray-700 leading-relaxed font-light block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 mb-5 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Experience
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
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
                  <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position || "Position Title"}
                          className="text-base font-semibold text-gray-900 block"
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company || "Company Name"}
                          className="text-sm text-gray-600 font-light block"
                          as="p"
                        />
                      </div>
                      <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                        {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line block"
                        multiline
                        as="p"
                      />
                    )}
                  </div>
                )}
              />
            ) : (
              resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0" style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {exp.position || "Position Title"}
                      </h3>
                      <p className="text-sm text-gray-600 font-light">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 mb-5 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Education
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: Date.now().toString(),
                  degree: "Degree",
                  field: "",
                  school: "School Name",
                  startDate: "2023-01",
                  endDate: "2024-01",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="flex justify-between items-start gap-4" style={{ pageBreakInside: 'avoid' }}>
                    <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree || "Degree"}
                        className="text-base font-semibold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field || ""}
                        className="text-sm text-gray-600 font-light block"
                        as="p"
                      />
                    </div>
                    <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                  </div>
                )}
              />
            ) : (
              resumeData.education.map((edu) => (
                <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {edu.degree || "Degree"} {edu.field && `, ${edu.field}`}
                      </h3>
                      <p className="text-sm text-gray-600 font-light">
                        {edu.school || "School Name"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 font-light whitespace-nowrap">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 font-light max-w-4xl mx-auto">
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) =>
                  skill.name && (
                    <span>{skill.name}</span>
                  )
                }
              />
            ) : (
              resumeData.skills.map((skill) => skill.name && <span key={skill.id}>{skill.name}</span>)
            )}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections.map((section, index) => (
        <div key={section.id} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest text-center" style={{ pageBreakAfter: 'avoid' }}>
            {editable ? (
              <InlineEditableText path={`sections[${index}].title`} value={section.title} className="inline-block" />
            ) : section.title}
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line max-w-4xl mx-auto">
            {editable ? (
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="block"
                multiline
                as="div"
              />
            ) : section.content}
          </div>
        </div>
      ))}
    </div>
  );
};
