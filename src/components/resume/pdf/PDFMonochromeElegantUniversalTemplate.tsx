import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 },
  ]
});

interface PDFMonochromeElegantUniversalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontFamily: "Inter",
    fontSize: 9,
    lineHeight: 1.55,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 18,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 18,
  },
  title: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#4b5563",
    marginTop: 4,
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 9,
    color: "#6b7280",
  },
  section: {
    marginBottom: 26,
  },
  sectionTitle: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.65,
    color: "#374151",
  },
  experienceItem: {
    marginBottom: 18,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 6,
  },
  position: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
  },
  company: {
    fontSize: 9,
    color: "#4b5563",
  },
  dateRange: {
    fontSize: 8,
    color: "#9ca3af",
  },
  bulletWrapper: {
    marginLeft: 12,
    gap: 4,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 6,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 3,
    marginTop: 4,
    backgroundColor: "#4b5563",
  },
  bulletText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.6,
    flex: 1,
  },
  educationItem: {
    marginBottom: 14,
  },
  educationDegree: {
    fontSize: 10.5,
    fontWeight: 600,
    color: "#111827",
  },
  educationMeta: {
    fontSize: 9,
    color: "#4b5563",
  },
  skillsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillChip: {
    fontSize: 8.5,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#111827",
    backgroundColor: "#f3f4f6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  customSectionText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.6,
  },
});

export const PDFMonochromeElegantUniversalTemplate = ({
  resumeData,
  themeColor = "#374151",
}: PDFMonochromeElegantUniversalTemplateProps) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            )}
            <View style={styles.contactInfo}>
              {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
              {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
              {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
            </View>
          </View>

          {resumeData.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resumeData.experience.map((exp, index) => {
                const bulletPoints = (exp.description || "").split("\n").filter(Boolean);
                return (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.position}>{exp.position}</Text>
                        <Text style={styles.company}>{exp.company}</Text>
                      </View>
                      <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                    </View>
                    {bulletPoints.length > 0 && (
                      <View style={styles.bulletWrapper}>
                        {bulletPoints.map((point, i) => (
                          <View key={i} style={styles.bulletRow}>
                            <View style={[styles.bullet, { backgroundColor: themeColor }]} />
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

          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Text>
                  <Text style={styles.educationMeta}>{edu.school}</Text>
                  <Text style={styles.dateRange}>{edu.startDate} - {edu.endDate}</Text>
                </View>
              ))}
            </View>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsWrapper}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillChip}>{skill.name}</Text>
                ))}
              </View>
            </View>
          )}
          {resumeData.sections && resumeData.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.customSectionText}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
