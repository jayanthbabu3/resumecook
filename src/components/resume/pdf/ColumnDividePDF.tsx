import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

interface ColumnDividePDFProps {
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
      textAlign: "center",
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: color,
    },
    name: {
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 8,
    },
    title: {
      fontSize: 13,
      color: color,
      marginBottom: 12,
    },
    contactInfo: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 8,
      fontSize: 9,
      color: "#6b7280",
    },
    summary: {
      fontSize: 10,
      textAlign: "center",
      color: "#4b5563",
      lineHeight: 1.6,
      marginBottom: 20,
    },
    columnsContainer: {
      flexDirection: "row",
      gap: 15,
    },
    column: {
      flex: 1,
    },
    divider: {
      width: 1,
      backgroundColor: color,
    },
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: color,
      marginBottom: 12,
      paddingBottom: 4,
      borderBottomWidth: 2,
      borderBottomColor: color,
    },
    experienceItem: {
      marginBottom: 12,
    },
    position: {
      fontSize: 11,
      fontWeight: 700,
    },
    company: {
      fontSize: 10,
      fontWeight: 500,
      color: color,
      marginTop: 2,
    },
    dateRange: {
      fontSize: 8,
      color: "#6b7280",
      marginTop: 2,
    },
    description: {
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.5,
      marginTop: 4,
    },
    descriptionItem: {
      marginBottom: 2,
      paddingLeft: 10,
    },
    skillItem: {
      fontSize: 9,
      paddingLeft: 8,
      paddingVertical: 4,
      borderLeftWidth: 4,
      borderLeftColor: color,
      marginBottom: 4,
    },
  });

export const ColumnDividePDF = ({
  resumeData,
  themeColor = "#0891b2",
}: ColumnDividePDFProps) => {
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
          <View style={styles.contactInfo}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <Text style={styles.summary}>{personalInfo.summary}</Text>
        )}

        {/* Two Column Layout */}
        <View style={styles.columnsContainer}>
          {/* Left Column */}
          <View style={styles.column}>
            {/* Experience */}
            {experience && experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.dateRange}>{exp.startDate} - {exp.endDate || "Present"}</Text>
                    {exp.description && (
                      <View style={styles.description}>
                        {exp.description.split("\n").map((item, i) => (
                          <Text key={i} style={styles.descriptionItem}>• {item}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Right Column */}
          <View style={styles.column}>
            {/* Skills */}
            {skills && skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>{skill.name}</Text>
                ))}
              </View>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={styles.position}>{edu.degree}</Text>
                    <Text style={[styles.company, { color: "#4b5563" }]}>{edu.institution}</Text>
                    <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Custom Sections */}
        {sections && sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.description}>{section.content}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ColumnDividePDF;
