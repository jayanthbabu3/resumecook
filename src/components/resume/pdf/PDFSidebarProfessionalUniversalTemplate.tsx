import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 },
  ]
});

interface PDFSidebarProfessionalUniversalProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    backgroundColor: "#ffffff",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#f9fafb",
    padding: 24,
    paddingTop: 32,
    borderRight: `3px solid ${themeColor}`,
  },
  mainContent: {
    width: "70%",
    padding: 32,
    paddingTop: 32,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottom: `2px solid ${themeColor}`,
    paddingBottom: 6,
  },
  sidebarText: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 1.5,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 12,
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.7,
    color: "#374151",
    marginBottom: 16,
  },
  experienceItem: {
    marginBottom: 14,
  },
  position: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  },
  company: {
    fontSize: 10,
    fontWeight: 500,
    color: themeColor,
    marginBottom: 3,
  },
  dateRange: {
    fontSize: 8.5,
    color: "#6b7280",
    marginBottom: 6,
  },
  bulletPoints: {
    marginTop: 6,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: themeColor,
    marginRight: 8,
    marginTop: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: "#374151",
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 2,
  },
  school: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 8.5,
    color: "#6b7280",
  },
  skillItem: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 5,
    paddingLeft: 8,
  },
});

export const PDFSidebarProfessionalUniversal = ({
  resumeData,
  themeColor = "#0f172a",
}: PDFSidebarProfessionalUniversalProps) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {resumeData.personalInfo.email && <Text style={styles.sidebarText}>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text style={styles.sidebarText}>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text style={styles.sidebarText}>{resumeData.personalInfo.location}</Text>}
          </View>
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {resumeData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>• {skill.name}</Text>
              ))}
            </View>
          )}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  {edu.field && <Text style={styles.school}>{edu.field}</Text>}
                  <Text style={styles.school}>{edu.school}</Text>
                  <Text style={styles.educationDate}>{edu.startDate} - {edu.endDate}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          {resumeData.personalInfo.summary && (
            <View>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resumeData.experience.map((exp, index) => {
                const bulletPoints = (exp.description || "").split("\\n").map((line) => line.trim()).filter(Boolean);
                return (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
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
        </View>
      </Page>
    </Document>
  );
};
