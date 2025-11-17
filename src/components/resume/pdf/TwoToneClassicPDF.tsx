import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

interface TwoToneClassicPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (color: string) =>
  StyleSheet.create({
    page: {
      fontFamily: "Inter",
      fontSize: 10,
      backgroundColor: "#ffffff",
    },
    header: {
      backgroundColor: color,
      padding: 25,
      color: "#ffffff",
    },
    name: {
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 6,
    },
    title: {
      fontSize: 13,
      opacity: 0.9,
      marginBottom: 12,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      fontSize: 9,
      opacity: 0.9,
    },
    content: {
      padding: 25,
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
    lightBox: {
      backgroundColor: `${color}20`,
      padding: 12,
      borderRadius: 4,
    },
    experienceItem: {
      marginBottom: 12,
      padding: 12,
      borderRadius: 4,
    },
    position: {
      fontSize: 12,
      fontWeight: 700,
    },
    company: {
      fontSize: 11,
      fontWeight: 500,
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
    skillChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: color,
      color: "#ffffff",
      fontSize: 9,
      fontWeight: 500,
      borderRadius: 4,
    },
  });

export const TwoToneClassicPDF = ({
  resumeData,
  themeColor = "#334155",
}: TwoToneClassicPDFProps) => {
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
            {personalInfo.email && <Text>✉ {personalInfo.email}</Text>}
            {personalInfo.phone && <Text>☎ {personalInfo.phone}</Text>}
            {personalInfo.location && <Text>📍 {personalInfo.location}</Text>}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <View style={styles.lightBox}>
                <Text style={[styles.description, { color: "#374151" }]}>{personalInfo.summary}</Text>
              </View>
            </View>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp, index) => (
                <View key={index} style={[styles.experienceItem, index % 2 === 0 ? styles.lightBox : {}]}>
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
                <View key={index} style={[{ marginBottom: 8, padding: 8, borderRadius: 4 }, styles.lightBox]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.position}>{edu.degree}</Text>
                      <Text style={[styles.company, { color: "#4b5563" }]}>{edu.institution}</Text>
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
              <Text style={styles.sectionTitle}>Core Skills</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
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

export default TwoToneClassicPDF;
