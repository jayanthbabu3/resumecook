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
  container: {
    flexDirection: "row",
    gap: 20,
  },
  leftColumn: {
    width: "32%",
  },
  rightColumn: {
    width: "68%",
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
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 8,
    fontWeight: 600,
    marginBottom: 2,
    color: "#111827",
  },
  field: {
    fontSize: 8,
    color: "#4B5563",
    marginBottom: 2,
  },
  school: {
    fontSize: 8,
    color: "#374151",
    marginBottom: 2,
    fontWeight: 600,
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
  summary: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#374151",
    marginBottom: 4,
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

interface GraduatePDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const GraduatePDF = ({ resumeData, themeColor = "#0EA5E9" }: GraduatePDFProps) => {
  const data = resumeData;
  const photo = data.personalInfo.photo;
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

        {/* Two Column Layout */}
        <View style={styles.container}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {hasContent(edu.field) && <Text style={styles.field}>{edu.field}</Text>}
                    <Text style={styles.school}>{edu.school}</Text>
                    <Text style={styles.educationDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
        )              </View>
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
        )                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Summary */}
            {data.personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={styles.summary}>{data.personalInfo.summary}</Text>
              </View>
            )}

            {/* Projects - More prominent for freshers */}
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
        )              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
