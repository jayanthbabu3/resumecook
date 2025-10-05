import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 9,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "2px solid #0EA5E9",
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 6,
    color: "#111827",
  },
  title: {
    fontSize: 11,
    fontWeight: 400,
    color: "#4B5563",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 8,
    color: "#6B7280",
  },
  contactItem: {
    marginRight: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#374151",
  },
  educationItem: {
    marginBottom: 10,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  degree: {
    fontSize: 9,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 2,
  },
  field: {
    fontSize: 8,
    color: "#4B5563",
    marginBottom: 2,
  },
  school: {
    fontSize: 8,
    color: "#0EA5E9",
    fontWeight: 500,
  },
  educationDate: {
    fontSize: 8,
    color: "#6B7280",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillBadge: {
    backgroundColor: "#F3F4F6",
    color: "#374151",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 2,
    fontSize: 8,
    fontWeight: 500,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  position: {
    fontSize: 9,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 2,
  },
  company: {
    fontSize: 8,
    color: "#0EA5E9",
    fontWeight: 500,
  },
  dates: {
    fontSize: 8,
    color: "#6B7280",
  },
  description: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#4B5563",
  },
  customSection: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#374151",
  },
});

interface StarterPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const StarterPDF = ({ resumeData, themeColor = "#0EA5E9" }: StarterPDFProps) => {
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
        <View style={[styles.header, { borderBottomColor: themeColor }]} wrap={false}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.title && <Text style={styles.title}>{data.personalInfo.title}</Text>}
          <View style={styles.contactInfo}>
            {data.personalInfo.email && <Text style={styles.contactItem}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text style={styles.contactItem}>•</Text>}
            {data.personalInfo.phone && <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.contactItem}>•</Text>}
            {data.personalInfo.location && <Text style={styles.contactItem}>{data.personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem} wrap={false}>
                <View style={styles.educationHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {edu.field && <Text style={styles.field}>{edu.field}</Text>}
                    <Text style={[styles.school, { color: themeColor }]}>{edu.school}</Text>
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
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillBadge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={[styles.company, { color: themeColor }]}>{exp.company}</Text>
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
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.customSection}>{section.content}</Text>
            </View>
          ))}
      </Page>
    </Document>
  );
};
