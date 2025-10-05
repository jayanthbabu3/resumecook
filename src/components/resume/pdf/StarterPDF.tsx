import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottom: "4px solid #0EA5E9",
    textAlign: "center",
  },
  name: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 10,
    color: "#0EA5E9",
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    color: "#0EA5E9",
    marginBottom: 14,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    fontSize: 9,
    color: "#64748b",
  },
  contactBadge: {
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: 600,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#0EA5E9",
    marginBottom: 14,
    letterSpacing: 1,
  },
  summaryBox: {
    backgroundColor: "#f0f9ff",
    padding: 14,
    borderLeft: "4px solid #0EA5E9",
    borderRadius: 6,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#334155",
  },
  educationBox: {
    backgroundColor: "#f8fafc",
    padding: 14,
    borderLeft: "4px solid #0EA5E9",
    borderRadius: 8,
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  degree: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0EA5E9",
    marginBottom: 3,
  },
  field: {
    fontSize: 9,
    color: "#475569",
    marginBottom: 3,
    fontWeight: 600,
  },
  school: {
    fontSize: 10,
    color: "#0369a1",
    fontWeight: 700,
    marginTop: 2,
  },
  educationDate: {
    fontSize: 9,
    color: "#64748b",
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: 600,
  },
  skillsBox: {
    backgroundColor: "#f8fafc",
    padding: 14,
    borderLeft: "4px solid #0EA5E9",
    borderRadius: 6,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBadge: {
    backgroundColor: "#0EA5E9",
    color: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 9,
    fontWeight: 700,
  },
  experienceItem: {
    marginBottom: 16,
    backgroundColor: "#f8fafc",
    padding: 14,
    borderLeft: "4px solid #0EA5E9",
    borderRadius: 8,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  position: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0EA5E9",
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    color: "#0369a1",
    fontWeight: 700,
    marginTop: 2,
  },
  dates: {
    fontSize: 9,
    color: "#64748b",
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: 600,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#475569",
    paddingLeft: 10,
    borderLeft: "4px solid #bae6fd",
  },
  customSectionBox: {
    backgroundColor: "#f0f9ff",
    padding: 14,
    borderLeft: "4px solid #0EA5E9",
    borderRadius: 6,
  },
  customSection: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#334155",
  },
});

interface StarterPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const StarterPDF = ({ resumeData }: StarterPDFProps) => {
  const data = resumeData;
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
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.title && <Text style={styles.title}>{data.personalInfo.title}</Text>}
          <View style={styles.contactInfo}>
            {data.personalInfo.email && (
              <Text style={styles.contactBadge}>📧 {data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactBadge}>📱 {data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactBadge}>📍 {data.personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>PROFILE SUMMARY</Text>
            <View style={styles.summaryBox}>
              <Text style={styles.summary}>{data.personalInfo.summary}</Text>
            </View>
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationBox} wrap={false}>
                <View style={styles.educationHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {edu.field && <Text style={styles.field}>{edu.field}</Text>}
                    <Text style={styles.school}>{edu.school}</Text>
                  </View>
                  <Text style={styles.educationDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>CORE SKILLS</Text>
            <View style={styles.skillsBox}>
              <View style={styles.skillsContainer}>
                {data.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <Text style={styles.dates}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {data.sections &&
          data.sections.map((section, index) => (
            <View key={index} style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
              <View style={styles.customSectionBox}>
                <Text style={styles.customSection}>{section.content}</Text>
              </View>
            </View>
          ))}
      </Page>
    </Document>
  );
};
