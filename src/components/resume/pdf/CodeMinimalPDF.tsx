import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

interface CodeMinimalPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (color: string) =>
  StyleSheet.create({
    page: {
      fontFamily: "Courier",
      fontSize: 9,
      backgroundColor: "#f9fafb",
      padding: PDF_PAGE_MARGINS,
    },
    header: {
      marginBottom: 18,
      paddingBottom: 12,
      borderBottomWidth: 2,
      borderBottomColor: "#d1d5db",
    },
    comment: {
      fontSize: 8,
      color: "#9ca3af",
      marginBottom: 4,
    },
    name: {
      fontSize: 26,
      fontWeight: 700,
      color: color,
      marginBottom: 6,
    },
    roleLine: {
      fontSize: 10,
      color: "#4b5563",
      marginBottom: 8,
    },
    codeLabel: {
      color: "#9ca3af",
    },
    contactInfo: {
      fontSize: 9,
      color: "#6b7280",
    },
    contactItem: {
      marginBottom: 2,
    },
    section: {
      marginBottom: 18,
    },
    sectionComment: {
      fontSize: 8,
      color: "#9ca3af",
      marginBottom: 8,
    },
    arrayLine: {
      fontSize: 8,
      color: "#9ca3af",
      marginBottom: 6,
    },
    skillItem: {
      fontSize: 9,
      color: color,
      marginBottom: 2,
      paddingLeft: 15,
    },
    experienceCard: {
      backgroundColor: "#ffffff",
      padding: 10,
      borderRadius: 4,
      border: "1px solid #d1d5db",
      marginBottom: 12,
    },
    position: {
      fontSize: 11,
      fontWeight: 700,
      color: color,
    },
    company: {
      fontSize: 10,
      color: "#4b5563",
      marginTop: 2,
    },
    dateRange: {
      fontSize: 8,
      color: "#9ca3af",
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
  });

export const CodeMinimalPDF = ({
  resumeData,
  themeColor = "#22c55e",
}: CodeMinimalPDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.comment}>// Developer Profile</Text>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {personalInfo.title && (
            <Text style={styles.roleLine}>
              <Text style={styles.codeLabel}>const role = </Text>
              <Text>"{personalInfo.title}";</Text>
            </Text>
          )}
          <View style={styles.contactInfo}>
            {personalInfo.email && <Text style={styles.contactItem}>email: "{personalInfo.email}"</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>phone: "{personalInfo.phone}"</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>location: "{personalInfo.location}"</Text>}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionComment}>/* About Me */</Text>
            <Text style={[styles.description, { fontSize: 10 }]}>{personalInfo.summary}</Text>
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.arrayLine}>const skills = [</Text>
            {skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                "{skill.name}"{index < skills.length - 1 ? "," : ""}
              </Text>
            ))}
            <Text style={styles.arrayLine}>];</Text>
          </View>
        )}

        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionComment}>// Work Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceCard}>
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
                      <Text key={i} style={styles.descriptionItem}>▹ {item}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionComment}>// Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={styles.position}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.dateRange}>{edu.graduationDate}</Text>
              </View>
            ))}
          </View>
        )}

        {sections && sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionComment}>// {section.title}</Text>
            <Text style={styles.description}>{section.content}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default CodeMinimalPDF;
