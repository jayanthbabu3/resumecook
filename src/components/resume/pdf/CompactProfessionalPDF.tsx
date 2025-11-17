import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

interface CompactProfessionalPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (color: string) =>
  StyleSheet.create({
    page: {
      fontFamily: "Inter",
      fontSize: 9,
      backgroundColor: "#ffffff",
      paddingHorizontal: 30,
      paddingVertical: 25,
    },
    header: {
      marginBottom: 15,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: color,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    name: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 2,
    },
    title: {
      fontSize: 11,
      fontWeight: 500,
      color: color,
    },
    contactInfo: {
      fontSize: 8,
      color: "#6b7280",
      textAlign: "right",
    },
    contactItem: {
      marginBottom: 2,
    },
    summary: {
      fontSize: 8,
      color: "#4b5563",
      lineHeight: 1.5,
      marginBottom: 15,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: color,
      marginBottom: 8,
    },
    experienceItem: {
      marginBottom: 10,
    },
    positionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 2,
    },
    position: {
      fontSize: 10,
      fontWeight: 700,
    },
    company: {
      fontSize: 9,
      fontWeight: 500,
      color: color,
      marginBottom: 4,
    },
    dateRange: {
      fontSize: 8,
      color: "#6b7280",
    },
    description: {
      fontSize: 8,
      color: "#4b5563",
      lineHeight: 1.4,
      marginTop: 4,
    },
    descriptionItem: {
      marginBottom: 1,
      paddingLeft: 8,
    },
    skillsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
    skillChip: {
      fontSize: 8,
      paddingHorizontal: 6,
      paddingVertical: 3,
      backgroundColor: "#f3f4f6",
      borderRadius: 3,
    },
  });

export const CompactProfessionalPDF = ({
  resumeData,
  themeColor = "#059669",
}: CompactProfessionalPDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            {personalInfo.title && (
              <Text style={styles.title}>{personalInfo.title}</Text>
            )}
          </View>
          <View style={styles.contactInfo}>
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <Text style={styles.summary}>{personalInfo.summary}</Text>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.positionHeader}>
                  <Text style={styles.position}>{exp.position}</Text>
                  <Text style={styles.dateRange}>{exp.startDate} - {exp.endDate || "Present"}</Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
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

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillChip}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.position}>{edu.degree}</Text>
                  <Text style={[styles.company, { color: "#4b5563" }]}>{edu.institution}</Text>
                </View>
                <Text style={styles.dateRange}>{edu.graduationDate}</Text>
              </View>
            ))}
          </View>
        )}

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

export default CompactProfessionalPDF;
