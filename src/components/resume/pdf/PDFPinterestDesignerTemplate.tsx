import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 },
  ]
});

interface PDFPinterestDesignerTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  contactSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: `1.5px solid ${themeColor}33`,
  },
  contactGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 32,
  },
  contactColumn: {
    flex: 1,
    gap: 6,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 9.5,
    color: "#374151",
    marginBottom: 4,
  },
  contactLabel: {
    fontWeight: 600,
    color: themeColor,
    minWidth: 60,
  },
  link: {
    color: themeColor,
    textDecoration: "none",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.8,
    color: "#374151",
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  position: {
    fontSize: 11.5,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  },
  company: {
    fontSize: 10.5,
    fontWeight: 500,
    color: themeColor,
  },
  dateRange: {
    fontSize: 9,
    color: "#6b7280",
    textAlign: "right",
  },
  bulletPoints: {
    marginTop: 6,
    marginLeft: 16,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: themeColor,
    marginRight: 8,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.7,
    color: "#374151",
  },
  educationItem: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  degree: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  },
  school: {
    fontSize: 10,
    color: "#374151",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    border: `1.5px solid ${themeColor}33`,
    backgroundColor: `${themeColor}15`,
  },
  skillText: {
    fontSize: 9.5,
    fontWeight: 500,
    color: "#111827",
  },
  customSection: {
    marginBottom: 20,
  },
  customContent: {
    fontSize: 10.5,
    lineHeight: 1.8,
    color: "#374151",
  },
});

export const PDFPinterestDesignerTemplate = ({
  resumeData,
  themeColor = "#e60023",
}: PDFPinterestDesignerTemplateProps) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Name */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
        </View>

        {/* Contact Info & Social Links */}
        <View style={styles.contactSection}>
          <View style={styles.contactGrid}>
            {/* Traditional Contact */}
            <View style={styles.contactColumn}>
              {resumeData.personalInfo.email && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Email:</Text>
                  <Text>{resumeData.personalInfo.email}</Text>
                </View>
              )}
              {resumeData.personalInfo.phone && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Text>{resumeData.personalInfo.phone}</Text>
                </View>
              )}
              {resumeData.personalInfo.location && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Location:</Text>
                  <Text>{resumeData.personalInfo.location}</Text>
                </View>
              )}
            </View>

            {/* Social/Online Presence */}
            <View style={styles.contactColumn}>
              {resumeData.personalInfo.website && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Website:</Text>
                  <Link src={resumeData.personalInfo.website} style={styles.link}>
                    <Text>{resumeData.personalInfo.website}</Text>
                  </Link>
                </View>
              )}
              {resumeData.personalInfo.linkedin && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>LinkedIn:</Text>
                  <Link src={resumeData.personalInfo.linkedin} style={styles.link}>
                    <Text>{resumeData.personalInfo.linkedin}</Text>
                  </Link>
                </View>
              )}
              {resumeData.personalInfo.github && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>GitHub:</Text>
                  <Link src={resumeData.personalInfo.github} style={styles.link}>
                    <Text>{resumeData.personalInfo.github}</Text>
                  </Link>
                </View>
              )}
              {resumeData.personalInfo.portfolio && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Portfolio:</Text>
                  <Link src={resumeData.personalInfo.portfolio} style={styles.link}>
                    <Text>{resumeData.personalInfo.portfolio}</Text>
                  </Link>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resumeData.experience.map((exp, index) => {
              const bulletPoints = (exp.description || "")
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);

              return (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <View>
                      <Text style={styles.dateRange}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                  </View>
                  {bulletPoints.length > 0 && (
                    <View style={styles.bulletPoints}>
                      {bulletPoints.map((point, i) => (
                        <View key={i} style={styles.bulletPoint}>
                          <View style={styles.bullet} />
                          <Text style={styles.bulletText}>{point}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.degree}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Text>
                  <Text style={styles.school}>{edu.school}</Text>
                </View>
                <View>
                  <Text style={styles.dateRange}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {resumeData.sections && resumeData.sections.map((section, index) => (
          <View key={index} style={styles.customSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.customContent}>{section.content}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
