import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface AcademicScholarTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const AcademicScholarTemplate = ({
  resumeData,
  themeColor = "#1a237e",
  editable = false,
}: AcademicScholarTemplateProps) => {

  return (
    <div className="mx-auto bg-white p-12 font-serif text-gray-900">
      {/* Header Section */}
      <div className="mb-8 text-center">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="mb-2 text-4xl font-bold"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="mb-2 text-4xl font-bold" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title}
            className="mb-4 text-lg font-light text-gray-700"
            as="h2"
          />
        ) : (
          <h2 className="mb-4 text-lg font-light text-gray-700">
            {resumeData.personalInfo.title}
          </h2>
        )}
        <div className="border-t border-b border-gray-300 py-2 text-sm text-gray-600">
          {editable ? (
            <>
              {resumeData.personalInfo.email && (
                <>
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-sm text-gray-600 inline"
                    as="span"
                  />
                  {" • "}
                </>
              )}
              {resumeData.personalInfo.phone && (
                <>
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="text-sm text-gray-600 inline"
                    as="span"
                  />
                  {" • "}
                </>
              )}
              {resumeData.personalInfo.location && (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="text-sm text-gray-600 inline"
                  as="span"
                />
              )}
            </>
          ) : (
            [resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location]
              .filter(Boolean)
              .join(" • ")
          )}
        </div>
      </div>

      {/* Academic Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h3
            className="mb-3 text-base font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Academic Profile
          </h3>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-sm leading-relaxed text-gray-700"
              as="p"
              multiline
            />
          ) : (
            <p className="text-sm leading-relaxed text-gray-700">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-base font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Education
          </h3>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                degree: "Ph.D.",
                school: "University Name",
                field: "Field of Study",
                startDate: "2020-01",
                endDate: "2024-01",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="font-bold text-gray-900 inline"
                      as="span"
                    />
                    {edu.field && (
                      <>
                        {" in "}
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="font-bold text-gray-900 inline"
                          as="span"
                        />
                      </>
                    )}
                  </h4>
                  <p className="text-sm text-gray-700">
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-sm text-gray-700 inline"
                      as="span"
                    />
                    {", "}
                    <div className="inline-flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        className="inline-block"
                      />
                      <span> — </span>
                      <InlineEditableDate
                        path={`education[${index}].endDate`}
                        value={edu.endDate}
                        className="inline-block"
                      />
                    </div>
                  </p>
                </div>
              )}
            />
          ) : (
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {edu.school}, {edu.startDate} — {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Academic Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-base font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Academic Appointments
          </h3>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "University/Institution",
                position: "Academic Position",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Taught undergraduate and graduate courses in [subject area]\nPublished research in peer-reviewed journals\nSupervised graduate student research projects\nServed on departmental committees",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-4">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="font-bold text-gray-900 inline"
                        as="span"
                      />
                    </h4>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <InlineEditableDate
                        path={`experience[${index}].startDate`}
                        value={exp.startDate}
                        className="inline-block"
                      />
                      <span> — </span>
                      {exp.current ? (
                        <span>Present</span>
                      ) : (
                        <InlineEditableDate
                          path={`experience[${index}].endDate`}
                          value={exp.endDate}
                          className="inline-block"
                        />
                      )}
                    </span>
                  </div>
                  <p className="mb-2 text-sm italic text-gray-600">
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-sm italic text-gray-600 inline"
                      as="span"
                    />
                  </p>
                  <InlineEditableText
                    path={`experience[${index}].description`}
                    value={exp.description}
                    className="text-sm leading-relaxed text-gray-700"
                    as="div"
                    multiline
                  />
                </div>
              )}
            />
          ) : (
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="mb-2 text-sm italic text-gray-600">{exp.company}</p>
                  <div>
                    {exp.description.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-1 text-sm leading-relaxed text-gray-700">
                        • {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Research & Publications */}
      {editable ? (
        <InlineEditableList
          path="sections"
          items={resumeData.sections.filter(s => s.title === "Publications")}
          defaultItem={{
            id: Date.now().toString(),
            title: "Publications",
            content: "Author, A. (Year). Title of Article. Journal Name, Volume(Issue), pages.\nAuthor, B. (Year). Title of Book. Publisher.",
          }}
          addButtonLabel="Add Publications"
          renderItem={(section, index) => (
            <div className="mb-6">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-3 text-base font-bold uppercase tracking-wide"
                as="h3"
                style={{ color: themeColor }}
              />
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-sm text-gray-700"
                as="div"
                multiline
              />
            </div>
          )}
        />
      ) : (
        resumeData.sections
          .filter(s => s.title === "Publications")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3
                className="mb-3 text-base font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.content.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))
      )}

      {/* Skills & Expertise */}
      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-base font-bold uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            Areas of Expertise
          </h3>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) => (
                <div className="text-sm text-gray-700">
                  {skill.name}
                </div>
              )}
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="text-sm text-gray-700">
                  • {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {editable ? (
        <InlineEditableList
          path="sections"
          items={resumeData.sections}
          defaultItem={{
            id: Date.now().toString(),
            title: "Section Title",
            content: "Section content",
          }}
          addButtonLabel="Add Section"
          renderItem={(section, index) => (
            <div className="mb-6">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-3 text-base font-bold uppercase tracking-wide"
                as="h3"
                style={{ color: themeColor }}
              />
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-sm text-gray-700"
                as="div"
                multiline
              />
            </div>
          )}
        />
      ) : (
        resumeData.sections
          .filter(s => s.title !== "Publications")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3
                className="mb-3 text-base font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.content.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
};
