import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

interface BorderedElegancePDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (color: string) =>
  StyleSheet.create({
    page: {
      fontFamily: "Times-Roman",
      fontSize: 10,
      backgroundColor: "#ffffff",
      padding: 15,
    },
    border: {
      border: `3px double ${color}`,
      padding: 20,
      height: "100%",
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
      textTransform: "uppercase",
      letterSpacing: 2,
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
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      textAlign: "center",
      color: color,
      marginBottom: 12,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: color,
    },
    summary: {
      fontSize: 10,
      textAlign: "center",
      color: "#4b5563",
      lineHeight: 1.6,
      fontStyle: "italic",
    },
    experienceItem: {
      marginBottom: 12,
      paddingLeft: 12,
      borderLeftWidth: 4,
      borderLeftColor: color,
      paddingVertical: 4,
    },
    position: {
      fontSize: 12,
      fontWeight: 700,
    },
    company: {
      fontSize: 11,
      fontStyle: "italic",
      color: color,
      marginTop: 2,
    },
    dateRange: {
      fontSize: 9,
      color: "#6b7280",
    },
    description: {
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.5,
      marginTop: 6,
    },
    descriptionItem: {
      marginBottom: 2,
      paddingLeft: 10,
    },
    educationItem: {
      textAlign: "center",
      marginBottom: 10,
    },
    skillChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 2,
      borderColor: color,
      color: color,
      fontSize: 9,
      fontWeight: 500,
    },
  });

export const BorderedElegancePDF = ({
  resumeData,
  themeColor = "#7c3aed",
}: BorderedElegancePDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.border}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            {personalInfo.title && (
              <Text style={styles.title}>{personalInfo.title}</Text>
            )}
            <View style={styles.contactInfo}>
              {personalInfo.email && <Text>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text> | {personalInfo.phone}</Text>}
              {personalInfo.location && <Text> | {personalInfo.location}</Text>}
            </View>
          </View>

          {/* Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.dateRange}>{exp.startDate} - {exp.endDate || "Present"}</Text>
                  </View>
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

          {/* Education */}
          {education && education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.position}>{edu.degree}</Text>
                  <Text style={[styles.company, { fontStyle: "italic" }]}>{edu.institution}</Text>
                  <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills & Expertise</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillChip}>{skill.name}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {sections && sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.description}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default BorderedElegancePDF;
