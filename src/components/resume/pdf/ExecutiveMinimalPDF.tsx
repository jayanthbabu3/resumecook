import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
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
      paddingTop: PDF_PAGE_MARGINS.top,
      paddingRight: PDF_PAGE_MARGINS.right,
      paddingBottom: PDF_PAGE_MARGINS.bottom,
      paddingLeft: PDF_PAGE_MARGINS.left,
      flexDirection: "column",
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
      fontSize: 8,
      color: "#666",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingVertical: 6,
    },
    contactItem: {
      marginRight: 12,
    },
    summaryContainer: {
      marginBottom: 24,
      alignItems: "center",
      pageBreakInside: 'avoid',
    },
    summary: {
      textAlign: "center",
      color: "#444",
      fontSize: 9,
      lineHeight: 1.6,
      maxWidth: 450,
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
      pageBreakAfter: 'avoid',
    },
    section: {
      marginBottom: 24,
      alignItems: "center",
      pageBreakInside: 'avoid',
    },
    experienceItemWrapper: {
      alignItems: "center",
      width: "100%",
    },
    experienceItem: {
      marginBottom: 16,
      maxWidth: 480,
      width: "100%",
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
      marginBottom: 4,
    },
    bulletText: {
      marginLeft: 6,
      flex: 1,
    },
    bullet: {
      color: "#999",
    },
    skillsWrapper: {
      alignItems: "center",
      width: "100%",
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: 480,
      width: "100%",
    },
    skillItem: {
      marginRight: 8,
    },
    skill: {
      fontSize: 9,
      color: "#444",
      fontWeight: 300,
    },
    separator: {
      color: "#ccc",
      marginLeft: 16,
    },
  });

export const ExecutiveMinimalPDF = ({
  resumeData,
  themeColor = "#000000",
}: ExecutiveMinimalPDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

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
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItemWrapper}>
                <View style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.dateRange}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <View style={styles.description}>
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        bullet && (
                          <View key={bulletIndex} style={styles.descriptionItem}>
                            <Text style={styles.bullet}>—</Text>
                            <Text style={styles.bulletText}>{bullet}</Text>
                          </View>
                        )
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.experienceItemWrapper}>
                <View style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.position}>{edu.degree}</Text>
                      {hasContent(edu.field) && (
                        <Text style={styles.company}>{edu.field}</Text>
                      )}
                      <Text style={styles.company}>{edu.school}</Text>
                      {hasContent(edu.gpa) && (
                        <Text style={[styles.company, { marginTop: 2 }]}>GPA: {edu.gpa}</Text>
                      )}
                    </View>
                    <Text style={styles.dateRange}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsWrapper}>
              <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                  <View key={index} style={[styles.skillItem, { flexDirection: "row" }]}>
                    <Text style={styles.skill}>{skill.name}</Text>
                    {index < skills.length - 1 && (
                      <Text style={styles.separator}>|</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {sections &&
          sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.summaryContainer}>
                <Text style={styles.summary}>{section.content}</Text>
              </View>
            </View>
          ))}
      </Page>
    </Document>
  );
};

export default ExecutiveMinimalPDF;
