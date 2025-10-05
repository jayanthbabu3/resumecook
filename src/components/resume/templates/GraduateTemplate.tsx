import type { ResumeData } from "@/pages/Editor";

interface GraduateTemplateProps {
  resumeData: ResumeData;
}

export const GraduateTemplate = ({ resumeData }: GraduateTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-background via-background to-primary/5 p-12 overflow-auto">
      <div className="max-w-[850px] mx-auto bg-background rounded-2xl shadow-2xl p-10 space-y-8">
        {/* Header Section with Modern Gradient */}
        <div className="relative pb-8 border-b-2 border-gradient-to-r from-primary/50 via-primary to-primary/50">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              {resumeData.personalInfo.fullName}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-xl font-semibold text-foreground/80">{resumeData.personalInfo.title}</p>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {resumeData.personalInfo.email && <span className="flex items-center gap-2">📧 {resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span className="flex items-center gap-2">📱 {resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span className="flex items-center gap-2">📍 {resumeData.personalInfo.location}</span>}
            </div>
          </div>
        </div>

        {/* Professional Summary with Gradient Box */}
        {resumeData.personalInfo.summary && (
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-xl border-l-4 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              PROFILE
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90">{resumeData.personalInfo.summary}</p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Education & Skills */}
          <div className="col-span-1 space-y-6">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-primary pb-3 border-b-2 border-primary/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="bg-muted/30 p-4 rounded-lg space-y-2 hover:bg-muted/50 transition-colors">
                      <div className="font-bold text-sm leading-tight text-primary">{edu.degree}</div>
                      {edu.field && <div className="text-xs font-medium text-foreground/80">{edu.field}</div>}
                      <div className="text-xs text-muted-foreground font-semibold">{edu.school}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-primary pb-3 border-b-2 border-primary/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  SKILLS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-semibold rounded-lg hover:shadow-md transition-shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Experience & Projects */}
          <div className="col-span-2 space-y-6">
            {/* Experience/Internships */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary pb-3 border-b-2 border-primary/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  EXPERIENCE
                </h2>
                <div className="space-y-5">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="space-y-3 bg-muted/20 p-5 rounded-xl hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-base text-primary">{exp.position}</h3>
                          <div className="text-sm font-semibold text-foreground/80">{exp.company}</div>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium whitespace-nowrap bg-primary/10 px-3 py-1 rounded-full">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-sm leading-relaxed text-foreground/80 pl-4 border-l-2 border-primary/40 whitespace-pre-line">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Sections (Projects, etc) */}
            {resumeData.sections &&
              resumeData.sections.map((section, index) => (
                <section key={index} className="space-y-4">
                  <h2 className="text-2xl font-bold text-primary pb-3 border-b-2 border-primary/30 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {section.title.toUpperCase()}
                  </h2>
                  <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line bg-muted/20 p-5 rounded-xl">
                    {section.content}
                  </div>
                </section>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
