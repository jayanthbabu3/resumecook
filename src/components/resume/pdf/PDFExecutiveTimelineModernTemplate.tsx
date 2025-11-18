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

interface PDFExecutiveTimelineModernProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    
    textAlign: "left",
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#3b82f6",
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 9.5,
    color: "#6b7280",
    justifyContent: "left",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#3b82f6",
    marginBottom: 12,
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.8,
    color: "#374151",
    marginBottom: 16,
  },
  experienceItem: {
    marginBottom: 16,
    borderLeft: "2px solid #3b82f633",
    paddingLeft: 16,
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
    color: "#3b82f6",
  },
  dateRange: {
    fontSize: 9,
    color: "#6b7280",
    textAlign: "right",
  },
  bulletPoints: {
    marginTop: 6,
    marginLeft: 12,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3b82f6",
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
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    border: "1.5px solid #3b82f633",
    backgroundColor: "#3b82f615",
  },
  skillText: {
    fontSize: 9.5,
    fontWeight: 500,
    color: "#111827",
  }
});

export const PDFExecutiveTimelineModern = ({
  resumeData,
  themeColor = "#3b82f6",
}: PDFExecutiveTimelineModernProps) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>
        {resumeData.personalInfo.summary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resumeData.experience.map((exp, index) => {
              const bulletPoints = (exp.description || "").split("\n").map((line) => line.trim()).filter(Boolean);
              return (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <View>
                      <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
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
        {resumeData.education && resumeData.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.degree}>{edu.degree} {edu.field && `in ${edu.field}`}</Text>
                  <Text style={styles.school}>{edu.school}</Text>
                </View>
                <View>
                  <Text style={styles.dateRange}>{edu.startDate} - {edu.endDate}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View>
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
      </Page>
    </Document>
  );
};
