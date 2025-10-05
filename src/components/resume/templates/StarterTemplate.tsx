import type { ResumeData } from "@/pages/Editor";

interface StarterTemplateProps {
  resumeData: ResumeData;
}

export const StarterTemplate = ({ resumeData }: StarterTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-background p-12 overflow-auto">
      <div className="max-w-[800px] mx-auto bg-gradient-to-br from-background to-primary/5 rounded-2xl shadow-2xl p-10">
        {/* Header with Elegant Design */}
        <div className="mb-10 pb-8 border-b-4 border-primary/30 relative">
          <div className="absolute -left-10 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="text-center space-y-4 relative z-10">
            <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              {resumeData.personalInfo.fullName}
            </h1>
            {resumeData.personalInfo.title && (
              <p className="text-2xl text-primary font-semibold">{resumeData.personalInfo.title}</p>
            )}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-2">
              {resumeData.personalInfo.email && (
                <span className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  📧 {resumeData.personalInfo.email}
                </span>
              )}
              {resumeData.personalInfo.phone && (
                <span className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  📱 {resumeData.personalInfo.phone}
                </span>
              )}
              {resumeData.personalInfo.location && (
                <span className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  📍 {resumeData.personalInfo.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary uppercase tracking-wide flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                Profile Summary
              </h2>
              <div className="bg-gradient-to-br from-primary/15 via-primary/10 to-transparent p-6 rounded-2xl border-l-4 border-primary shadow-sm">
                <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
              </div>
            </section>
          )}

          {/* Education - Prominent for Freshers */}
          {resumeData.education && resumeData.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-5 text-primary uppercase tracking-wide flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="bg-gradient-to-br from-muted/40 to-muted/20 p-6 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-lg transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-primary">{edu.degree}</h3>
                        {edu.field && <div className="text-sm text-foreground/70 font-medium mt-1">{edu.field}</div>}
                        <div className="text-primary/80 font-bold text-base mt-1">{edu.school}</div>
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold bg-primary/10 px-4 py-2 rounded-full">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills with Visual Emphasis */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-5 text-primary uppercase tracking-wide flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                Core Skills
              </h2>
              <div className="bg-gradient-to-br from-muted/40 to-muted/20 p-6 rounded-2xl border-l-4 border-primary shadow-sm">
                <div className="flex flex-wrap gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Experience/Internships */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-5 text-primary uppercase tracking-wide flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                Experience
              </h2>
              <div className="space-y-5">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="bg-gradient-to-br from-muted/40 to-muted/20 p-6 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-lg transition-shadow space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-primary">{exp.position}</h3>
                        <div className="text-primary/80 font-bold text-base">{exp.company}</div>
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold bg-primary/10 px-4 py-2 rounded-full">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-sm leading-relaxed pl-5 border-l-4 border-primary/40 whitespace-pre-line">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections (Projects, Certifications) */}
          {resumeData.sections &&
            resumeData.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-bold mb-5 text-primary uppercase tracking-wide flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  {section.title}
                </h2>
                <div className="bg-gradient-to-br from-primary/15 via-primary/10 to-transparent p-6 rounded-2xl border-l-4 border-primary shadow-sm text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};
