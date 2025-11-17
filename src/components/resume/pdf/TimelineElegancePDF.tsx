import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

interface TimelineElegancePDFProps {
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
      marginBottom: 20,
      borderBottomWidth: 3,
      borderBottomColor: color,
      paddingBottom: 12,
    },
    name: {
      fontSize: 32,
      fontWeight: 300,
      letterSpacing: 1.5,
      marginBottom: 6,
    },
    title: {
      fontSize: 13,
      textTransform: "uppercase",
      letterSpacing: 2,
      color: color,
      marginBottom: 8,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      fontSize: 9,
      color: "#666",
    },
    contactItem: {
      flexDirection: "row",
      gap: 4,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 300,
      color: color,
      marginBottom: 12,
    },
    summary: {
      color: "#444",
      lineHeight: 1.6,
    },
    timelineContainer: {
      paddingLeft: 16,
      borderLeftWidth: 2,
      borderLeftColor: color,
      position: "relative",
    },
    experienceItem: {
      marginBottom: 16,
      position: "relative",
    },
    timelineDot: {
      position: "absolute",
      left: -21,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: color,
      borderWidth: 3,
      borderColor: "#ffffff",
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    position: {
      fontSize: 12,
      fontWeight: 600,
    },
    company: {
      fontSize: 11,
      fontStyle: "italic",
      color: color,
      marginBottom: 6,
    },
    dateRange: {
      fontSize: 9,
      color: "#666",
    },
    description: {
      fontSize: 9,
      color: "#444",
      lineHeight: 1.5,
    },
    descriptionItem: {
      marginBottom: 3,
      paddingLeft: 10,
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1.5,
      borderColor: color,
      color: color,
      fontSize: 9,
      fontWeight: 500,
    },
  });

export const TimelineElegancePDF = ({
  resumeData,
  themeColor = "#2c3e50",
}: TimelineElegancePDFProps) => {
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
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text>✉ {personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text>☎ {personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <Text>📍 {personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            <View style={styles.timelineContainer}>
              {experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
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
                        <Text key={i} style={styles.descriptionItem}>
                          • {item}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.timelineContainer}>
              {education.map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{edu.degree}</Text>
                      <Text style={styles.company}>{edu.institution}</Text>
                    </View>
                    <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillChip}>
                  {skill.name}
                </Text>
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

export default TimelineElegancePDF;
