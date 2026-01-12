import type { ResumeData } from "@/types/resume";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import { InlineEditableText } from "./InlineEditableText";
import { InlineEditableList } from "./InlineEditableList";

interface InlineEditableResumeProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  templateId: string;
  themeColor?: string;
}

export const InlineEditableResume = ({
  resumeData,
  setResumeData,
  templateId,
  themeColor = "#2563eb",
}: InlineEditableResumeProps) => {
  return (
    <InlineEditProvider resumeData={resumeData} setResumeData={setResumeData}>
      <div className="mx-auto w-full max-w-[210mm] min-h-[297mm] rounded-lg bg-white shadow-2xl p-8">
        {/* Personal Info Section */}
        <div className="space-y-2 mb-8 pb-6 border-b-2" style={{ borderColor: themeColor }}>
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="text-4xl font-bold block"
            placeholder="Your Name"
          />
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title}
            className="text-xl text-muted-foreground block"
            placeholder="Your Title"
          />
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
            <InlineEditableText
              path="personalInfo.email"
              value={resumeData.personalInfo.email}
              placeholder="email@example.com"
            />
            <InlineEditableText
              path="personalInfo.phone"
              value={resumeData.personalInfo.phone}
              placeholder="Phone"
            />
            <InlineEditableText
              path="personalInfo.location"
              value={resumeData.personalInfo.location}
              placeholder="Location"
            />
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Professional Summary
          </h3>
          <InlineEditableText
            path="personalInfo.summary"
            value={resumeData.personalInfo.summary}
            multiline
            placeholder="Write your professional summary..."
            className="block text-sm leading-relaxed"
          />
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Experience
          </h3>
          <InlineEditableList
            path="experience"
            items={resumeData.experience}
            defaultItem={{
              company: "Company Name",
              position: "Position",
              startDate: "2024-01",
              endDate: "",
              current: true,
              description: "Job description here",
            }}
            addButtonLabel="Add Experience"
            renderItem={(exp, index) => (
              <div className="border rounded-lg p-4 bg-background hover:bg-accent/5 transition-colors">
                <InlineEditableText
                  path={`experience[${index}].position`}
                  value={exp.position}
                  className="font-semibold text-lg block mb-1"
                  placeholder="Position Title"
                />
                <InlineEditableText
                  path={`experience[${index}].company`}
                  value={exp.company}
                  className="block mb-2"
                  placeholder="Company Name"
                  style={{ color: themeColor }}
                />
                <div className="flex gap-2 text-sm text-muted-foreground mb-3">
                  <InlineEditableText
                    path={`experience[${index}].startDate`}
                    value={exp.startDate}
                    placeholder="Start Date"
                  />
                  <span>-</span>
                  <InlineEditableText
                    path={`experience[${index}].endDate`}
                    value={exp.current ? "Present" : exp.endDate}
                    placeholder="End Date"
                  />
                </div>
                <InlineEditableText
                  path={`experience[${index}].description`}
                  value={exp.description}
                  multiline
                  className="mt-2 block text-sm leading-relaxed"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            )}
          />
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Education
          </h3>
          <InlineEditableList
            path="education"
            items={resumeData.education}
            defaultItem={{
              school: "School Name",
              degree: "Degree",
              field: "Field of Study",
              startDate: "2020-09",
              endDate: "2024-05",
            }}
            addButtonLabel="Add Education"
            renderItem={(edu, index) => (
              <div className="border rounded-lg p-4 bg-background hover:bg-accent/5 transition-colors">
                <InlineEditableText
                  path={`education[${index}].degree`}
                  value={edu.degree}
                  className="font-semibold text-lg block mb-1"
                  placeholder="Degree"
                />
                <InlineEditableText
                  path={`education[${index}].school`}
                  value={edu.school}
                  className="block mb-1"
                  placeholder="School Name"
                  style={{ color: themeColor }}
                />
                <InlineEditableText
                  path={`education[${index}].field`}
                  value={edu.field}
                  className="text-sm text-muted-foreground block"
                  placeholder="Field of Study"
                />
              </div>
            )}
          />
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="font-bold text-lg mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Skills
          </h3>
          <InlineEditableList
            path="skills"
            items={resumeData.skills}
            defaultItem={{ name: "New Skill" }}
            addButtonLabel="Add Skill"
            renderItem={(skill, index) => (
              <div className="inline-block mr-2 mb-2">
                <InlineEditableText
                  path={`skills[${index}].name`}
                  value={skill.name}
                  className="px-3 py-1 rounded-full inline-block text-sm"
                  placeholder="Skill"
                  style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                />
              </div>
            )}
          />
        </div>
      </div>
    </InlineEditProvider>
  );
};
