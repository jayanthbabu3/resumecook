import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    fontSize: 9,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "2px solid #0EA5E9",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  photoWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
  const photo = data.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: themeColor }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              {data.personalInfo.title && <Text style={styles.title}>{data.personalInfo.title}</Text>}
            </View>
            {photo ? (
              <View style={styles.photoWrapper}>
                <Image src={photo} style={styles.photo} />
              </View>
            ) : null}
          </View>
          <View style={styles.contactInfo}>
            {data.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text>✉ {data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text>☎ {data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text>📍 {data.personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {hasContent(edu.field) && <Text style={styles.field}>{edu.field}</Text>}
                    <Text style={[styles.school, { color: themeColor }]}>{edu.school}</Text>
                  </View>
                  <Text style={styles.educationDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              </View>
            ))}
        )          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillBadge}>
                  {skill.name}
                </Text>
              ))}
        )            </View>
          </View>
        )}

        {/* Projects - Prominent for freshers */}
        {data.sections &&
          data.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.customSection}>{section.content}</Text>
            </View>
          ))}
        )
        {/* Experience/Internships */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Internships & Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={[styles.company, { color: themeColor }]}>{exp.company}</Text>
                  </View>
                  <Text style={styles.dates}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                {hasContent(exp.description) && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
        )          </View>
        )}
      </Page>
    </Document>
  );
};
