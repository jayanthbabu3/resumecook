import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ClassicElegantTemplate = ({ resumeData, themeColor = "#7c2d12", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 p-8 text-[13px] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header - Classic Elegant */}
      <div className="text-center mb-8 pb-6 border-b" style={{ borderColor: themeColor }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName || "Your Name"}
            className="text-[38px] font-bold mb-3 block"
            style={{ color: themeColor, fontFamily: 'Georgia, serif' }}
            as="h1"
          />
        ) : (
          <h1 className="text-[38px] font-bold mb-3" style={{ color: themeColor, fontFamily: 'Georgia, serif' }}>
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title || "Professional Title"}
            className="text-[14px] text-gray-600 mb-4 italic block"
            as="p"
          />
        ) : (
          <p className="text-[14px] text-gray-600 mb-4 italic">
            {resumeData.personalInfo.title || "Professional Title"}
          </p>
        )}

        {/* Contact */}
        <div className="flex justify-center flex-wrap gap-x-3 text-[12px] text-gray-600">
          {resumeData.personalInfo.email && (
            <>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.email}</span>
              )}
            </>
          )}
          {resumeData.personalInfo.email && resumeData.personalInfo.phone && <span>•</span>}
          {resumeData.personalInfo.phone && (
            <>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.phone}</span>
              )}
            </>
          )}
          {resumeData.personalInfo.phone && resumeData.personalInfo.location && <span>•</span>}
          {resumeData.personalInfo.location && (
            <>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.location}</span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: themeColor }}>
            Professional Profile
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-[1.7] text-center block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.7] text-center">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: themeColor }}>
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
                description: "Job description here",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-6">
                  <div className="text-center mb-2">
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position || "Position Title"}
                      className="text-[14px] font-bold text-gray-900 block"
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company || "Company Name"}
                      className="text-[13px] italic block"
                      style={{ color: themeColor }}
                      as="p"
                    />
                    <div className="text-[12px] text-gray-600 mt-1 flex justify-center items-center gap-1">
                      <InlineEditableDate
                        path={`experience[${index}].startDate`}
                        value={exp.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span> – </span>
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
                  {exp.description && (
                    <InlineEditableText
                      path={`experience[${index}].description`}
                      value={exp.description}
                      className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block"
                      multiline
                      as="p"
                    />
                  )}
                </div>
              )}
            />
          ) : (
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="text-center mb-2">
                    <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position Title"}</h3>
                    <p className="text-[13px] italic" style={{ color: themeColor }}>{exp.company || "Company Name"}</p>
                    <p className="text-[12px] text-gray-600 mt-1">
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: themeColor }}>
            Areas of Expertise
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) => {
                return skill.name ? (
                  <span className="inline-block mx-3 mb-2 text-[12.5px] text-gray-700">
                    {skill.name}
                  </span>
                ) : null;
              }}
            />
          ) : (
            <div className="flex flex-wrap justify-center">
              {resumeData.skills.map((skill) => (
                skill.name ? (
                  <span key={skill.id} className="mx-3 mb-2 text-[12.5px] text-gray-700">
                    {skill.name}
                  </span>
                ) : null
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: themeColor }}>
            Education
          </h2>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                school: "School Name",
                degree: "Degree",
                field: "Field of Study",
                startDate: "2019-09",
                endDate: "2023-05",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-4 text-center">
                  <InlineEditableText
                    path={`education[${index}].degree`}
                    value={edu.degree}
                    className="text-[13px] font-semibold text-gray-900 block"
                    as="h3"
                  />
                  {edu.field && (
                    <InlineEditableText
                      path={`education[${index}].field`}
                      value={edu.field}
                      className="text-[12px] text-gray-600 block"
                      as="p"
                    />
                  )}
                  <InlineEditableText
                    path={`education[${index}].school`}
                    value={edu.school}
                    className="text-[12.5px] text-gray-700 italic block"
                    as="p"
                  />
                  <div className="text-[11px] text-gray-500 mt-1 flex justify-center items-center gap-1">
                    <InlineEditableDate
                      path={`education[${index}].startDate`}
                      value={edu.startDate}
                      formatDisplay={formatDate}
                      className="inline-block"
                    />
                    <span> – </span>
                    <InlineEditableDate
                      path={`education[${index}].endDate`}
                      value={edu.endDate}
                      formatDisplay={formatDate}
                      className="inline-block"
                    />
                  </div>
                </div>
              )}
            />
          ) : (
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-center">
                  <h3 className="text-[13px] font-semibold text-gray-900">{edu.degree}</h3>
                  {edu.field && <p className="text-[12px] text-gray-600">{edu.field}</p>}
                  <p className="text-[12.5px] text-gray-700 italic">{edu.school}</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections.map((section) => (
        <div key={section.id} className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center" style={{ color: themeColor }}>
            {section.title}
          </h2>
          <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  );
};
