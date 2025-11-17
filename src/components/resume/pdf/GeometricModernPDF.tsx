import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

interface GeometricModernPDFProps {
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
      marginTop: 20,
      marginBottom: 20,
    },
    geometricLine: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 60,
      height: 2,
      backgroundColor: color,
    },
    name: {
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 6,
    },
    title: {
      fontSize: 13,
      fontWeight: 500,
      color: color,
      marginBottom: 12,
    },
    contactInfo: {
      flexDirection: "row",
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
      color: color,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    diamond: {
      width: 6,
      height: 6,
      backgroundColor: color,
      transform: "rotate(45deg)",
    },
    experienceItem: {
      marginBottom: 14,
      paddingLeft: 12,
      borderLeftWidth: 2,
      borderLeftColor: "#e5e7eb",
      position: "relative",
    },
    position: {
      fontSize: 12,
      fontWeight: 700,
    },
    company: {
      fontSize: 11,
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
  });

export const GeometricModernPDF = ({
  resumeData,
  themeColor = "#6366f1",
}: GeometricModernPDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.geometricLine} />
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
          <View style={styles.section}>
            <Text style={[styles.description, { paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: `${themeColor}50` }]}>
              {personalInfo.summary}
            </Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <View style={styles.diamond} />
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Experience</Text>
            </View>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <View style={styles.diamond} />
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Education</Text>
            </View>
            {education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.position}>{edu.degree}</Text>
                  <Text style={[styles.company, { color: "#4b5563" }]}>{edu.institution}</Text>
                </View>
                <Text style={styles.dateRange}>{edu.graduationDate}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <View style={styles.diamond} />
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Skills</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {skills.map((skill, index) => (
                <View key={index} style={{ paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: themeColor }}>
                  <Text style={{ fontSize: 9, fontWeight: 500 }}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {sections && sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <View style={styles.diamond} />
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>{section.title}</Text>
            </View>
            <Text style={styles.description}>{section.content}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default GeometricModernPDF;
