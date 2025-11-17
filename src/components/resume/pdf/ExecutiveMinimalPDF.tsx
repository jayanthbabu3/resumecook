import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

interface ExecutiveMinimalPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (color: string) =>
  StyleSheet.create({
    page: {
      fontFamily: "Inter",
      fontSize: 10,
      backgroundColor: "#ffffff",
      padding: PDF_PAGE_MARGINS,
    },
    header: {
      marginBottom: 24,
      textAlign: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 4,
    },
    title: {
      fontSize: 10,
      fontWeight: 300,
      letterSpacing: 1.5,
      color: "#666",
      marginBottom: 12,
    },
    contactBar: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 12,
      fontSize: 8,
      color: "#666",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingVertical: 6,
    },
    summary: {
      textAlign: "center",
      color: "#444",
      fontSize: 9,
      fontStyle: "italic",
      lineHeight: 1.6,
      marginBottom: 24,
      maxWidth: 450,
      marginHorizontal: "auto",
    },
    sectionTitle: {
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
      textAlign: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      paddingBottom: 4,
      marginBottom: 16,
    },
    section: {
      marginBottom: 24,
    },
    experienceItem: {
      marginBottom: 16,
      maxWidth: 480,
      marginHorizontal: "auto",
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
      paddingBottom: 4,
      marginBottom: 6,
    },
    position: {
      fontSize: 11,
      fontWeight: 600,
    },
    company: {
      fontSize: 9,
      fontWeight: 300,
      color: "#666",
    },
    dateRange: {
      fontSize: 8,
      color: "#666",
    },
    description: {
      fontSize: 9,
      color: "#444",
      lineHeight: 1.5,
    },
    descriptionItem: {
      flexDirection: "row",
      gap: 6,
      marginBottom: 4,
    },
    bullet: {
      color: "#999",
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
      maxWidth: 480,
      marginHorizontal: "auto",
    },
    skill: {
      fontSize: 9,
      color: "#444",
      fontWeight: 300,
    },
    separator: {
      color: "#ccc",
      marginHorizontal: 8,
    },
  });

export const ExecutiveMinimalPDF = ({
  resumeData,
  themeColor = "#000000",
}: ExecutiveMinimalPDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {personalInfo.title && (
            <Text style={styles.title}>{personalInfo.title}</Text>
          )}
          <View style={styles.contactBar}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.endDate || "Present"}
                  </Text>
                </View>
                {exp.description && (
                  <View style={styles.description}>
                    {exp.description.split("\n").map((item, i) => (
                      <View key={i} style={styles.descriptionItem}>
                        <Text style={styles.bullet}>—</Text>
                        <Text style={{ flex: 1 }}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.position}>{edu.degree}</Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                  </View>
                  <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Text style={styles.skill}>{skill.name}</Text>
                  {index < skills.length - 1 && (
                    <Text style={styles.separator}>|</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {sections &&
          sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.summary}>{section.content}</Text>
            </View>
          ))}
      </Page>
    </Document>
  );
};

export default ExecutiveMinimalPDF;
