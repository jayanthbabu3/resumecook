import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 },
  ]
});

interface GradientHeaderUniversalPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  gradientHeader: {
    backgroundColor: themeColor,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
    color: "#ffffff",
    marginBottom: 32,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 12,
    lineHeight: 1.1,
  },
  title: {
    fontSize: 11,
    color: "#ffffff",
    opacity: 0.95,
    marginBottom: 30,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    color: "#ffffff",
    opacity: 0.9,
  },
  contactItem: {
    marginRight: 24,
    marginBottom: 4,
  },
  content: {
    paddingTop: 0,
    paddingHorizontal: 48,
    paddingBottom: 48,
  },
  section: {
    marginBottom: 32,
    pageBreakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: themeColor,
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    fontWeight: 300,
  },
  experienceItem: {
    marginBottom: 24,
    pageBreakInside: 'avoid',
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  position: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
  },
  company: {
    fontSize: 10,
    color: themeColor,
    fontWeight: 300,
    marginTop: 2,
  },
  dateRange: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: 300,
  },
  bulletPoint: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 4,
    marginLeft: 0,
    color: "#374151",
    fontWeight: 300,
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    marginRight: 8,
    marginTop: 4,
    color: "#9ca3af",
    fontSize: 9,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  gridColumn: {
    width: "48%",
  },
  educationItem: {
    marginBottom: 20,
    pageBreakInside: 'avoid',
  },
  degree: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  school: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: 300,
    marginBottom: 2,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillChip: {
    backgroundColor: themeColor,
    color: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 9,
    fontWeight: 500,
  },
  socialLinksContainer: {
    marginBottom: 32,
  },
  socialLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 10,
    color: "#374151",
  },
  socialLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  socialLinkText: {
    fontSize: 10,
    color: "#374151",
    fontWeight: 300,
  },
});

export const GradientHeaderUniversalPDF = ({
  resumeData,
  themeColor = "#3b82f6",
}: GradientHeaderUniversalPDFProps) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Gradient Header */}
        <View style={styles.gradientHeader}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          {resumeData.personalInfo.title && (
            <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          )}
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
            )}
            {resumeData.personalInfo.phone && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
            )}
            {resumeData.personalInfo.location && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {resumeData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.dateRange}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <View>
                      {exp.bulletPoints.map((point, i) => (
                        <View key={i} style={styles.bulletContainer}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletPoint}>{point}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education and Skills Grid */}
          <View style={styles.gridContainer}>
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.gridColumn}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resumeData.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {edu.field && <Text style={styles.school}>{edu.field}</Text>}
                    <Text style={styles.school}>{edu.school}</Text>
                    {edu.gpa && <Text style={[styles.school, { fontSize: 9, marginTop: 2 }]}>GPA: {edu.gpa}</Text>}
                    <Text style={styles.dateRange}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={styles.gridColumn}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsGrid}>
                  {resumeData.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillChip}>{skill.name}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Social Links */}
          {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
            <View style={styles.socialLinksContainer}>
              <Text style={styles.sectionTitle}>Social Links</Text>
              <View style={styles.socialLinksGrid}>
                {resumeData.personalInfo.linkedin && (
                  <View style={styles.socialLinkItem}>
                    <Text style={styles.socialLinkText}>{resumeData.personalInfo.linkedin}</Text>
                  </View>
                )}
                {resumeData.personalInfo.portfolio && (
                  <View style={styles.socialLinkItem}>
                    <Text style={styles.socialLinkText}>{resumeData.personalInfo.portfolio}</Text>
                  </View>
                )}
                {resumeData.personalInfo.github && (
                  <View style={styles.socialLinkItem}>
                    <Text style={styles.socialLinkText}>{resumeData.personalInfo.github}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections && resumeData.sections.map((section, index) => (
            <View key={index} style={styles.section} break={index > 0}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.summaryText}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
