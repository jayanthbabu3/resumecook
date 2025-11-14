import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Image,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const createStyles = (themeColor: string) =>
  StyleSheet.create({
    page: {
      paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
      fontSize: 10,
      fontFamily: "Inter",
      backgroundColor: "#ffffff",
    },
    accentBar: {
      height: 10,
      backgroundColor: themeColor,
    },
    header: {
      paddingHorizontal: 40,
      paddingTop: 32,
      paddingBottom: 24,
    },
    headerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16,
    },
    headerLeft: {
      flex: 1,
    },
    name: {
      fontSize: 28,
      fontFamily: "Inter",
      fontWeight: 700,
      color: themeColor,
      marginBottom: 8,
    },
    title: {
      fontSize: 14,
      color: "#374151",
      fontWeight: 500,
      marginBottom: 12,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      fontSize: 9,
      color: "#6b7280",
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    photoWrapper: {
      width: 72,
      height: 72,
      borderRadius: 36,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: themeColor,
    },
    photo: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    divider: {
      marginHorizontal: 40,
      height: 1,
      backgroundColor: `${themeColor}40`,
    },
    mainContent: {
      paddingHorizontal: 40,
      paddingTop: 24,
      paddingBottom: 40,
    },
    summarySection: {
      marginBottom: 20,
    },
    twoColumn: {
      flexDirection: "row",
      gap: 20,
    },
    leftColumn: {
      flex: 2,
    },
    rightColumn: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: 700,
      color: themeColor,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 8,
      paddingBottom: 6,
      borderBottomWidth: 2,
      borderBottomColor: themeColor,
    },
    sectionTitleSmall: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: 700,
      color: themeColor,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 2,
      borderBottomColor: themeColor,
    },
    summaryText: {
      fontSize: 9,
      lineHeight: 1.5,
      color: "#374151",
    },
    section: {
      marginBottom: 20,
    },
    sectionSmall: {
      marginBottom: 16,
    },
    experienceItem: {
      marginBottom: 16,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    experienceLeft: {
      flex: 1,
    },
    experienceRight: {
      alignItems: "flex-end",
      marginLeft: 12,
    },
    jobTitle: {
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: 700,
      color: themeColor,
      marginBottom: 2,
    },
    company: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#1f2937",
    },
    dateText: {
      fontSize: 8,
      color: "#6b7280",
      marginBottom: 2,
    },
    description: {
      fontSize: 9,
      lineHeight: 1.4,
      color: "#374151",
      marginTop: 4,
    },
    educationItem: {
      marginBottom: 12,
    },
    degree: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: 700,
      color: themeColor,
      marginBottom: 2,
    },
    field: {
      fontSize: 8,
      color: "#374151",
      marginBottom: 2,
    },
    school: {
      fontSize: 9,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#1f2937",
      marginBottom: 2,
    },
    eduDate: {
      fontSize: 8,
      color: "#6b7280",
    },
    skillItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 6,
    },
    skillBullet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: themeColor,
    },
    skillText: {
      fontSize: 9,
      color: "#374151",
      fontWeight: 500,
    },
    customSectionText: {
      fontSize: 9,
      lineHeight: 1.4,
      color: "#374151",
      marginBottom: 3,
    },
    customSectionTextSmall: {
      fontSize: 8,
      lineHeight: 1.4,
      color: "#374151",
      marginBottom: 2,
    },
  });

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const CorporateExecutivePDF = ({
  resumeData,
  themeColor = "#1e40af",
}: Props) => {
  const styles = createStyles(themeColor);
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Accent Bar */}
        <View style={styles.accentBar} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>
                {resumeData.personalInfo.fullName || "Your Name"}
              </Text>
              {resumeData.personalInfo.title && (
                <Text style={styles.title}>
                  {resumeData.personalInfo.title}
                </Text>
              )}
              <View style={styles.contactRow}>
                {resumeData.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <Svg width="9" height="9" viewBox="0 0 24 24">
                      <Path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        fill="none"
                        stroke={themeColor}
                        strokeWidth="2"
                      />
                      <Path
                        d="m22 6-10 7L2 6"
                        fill="none"
                        stroke={themeColor}
                        strokeWidth="2"
                      />
                    </Svg>
                    <Text>{resumeData.personalInfo.email}</Text>
                  </View>
                )}
                {resumeData.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <Svg width="9" height="9" viewBox="0 0 24 24">
                      <Path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        fill="none"
                        stroke={themeColor}
                        strokeWidth="2"
                      />
                    </Svg>
                    <Text>{resumeData.personalInfo.phone}</Text>
                  </View>
                )}
                {resumeData.personalInfo.location && (
                  <View style={styles.contactItem}>
                    <Svg width="9" height="9" viewBox="0 0 24 24">
                      <Path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        fill="none"
                        stroke={themeColor}
                        strokeWidth="2"
                      />
                      <Path
                        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                        fill="none"
                        stroke={themeColor}
                        strokeWidth="2"
                      />
                    </Svg>
                    <Text>{resumeData.personalInfo.location}</Text>
                  </View>
                )}
              </View>
            </View>
            {photo ? (
              <View style={styles.photoWrapper}>
                <Image src={photo} style={styles.photo} />
              </View>
            ) : null}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary */}
          {hasContent(resumeData.personalInfo.summary) && (
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Executive Summary</Text>
              <Text style={styles.summaryText}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>
          )}

          {/* Two Column Layout */}
          <View style={styles.twoColumn}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    Professional Experience
                  </Text>
                  {resumeData.experience.map((exp) => (
                    <View key={exp.id} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <View style={styles.experienceLeft}>
                          <Text style={styles.jobTitle}>
                            {exp.position || "Position Title"}
                          </Text>
                          <Text style={styles.company}>
                            {exp.company || "Company Name"}
                          </Text>
                        </View>
                        <View style={styles.experienceRight}>
                          <Text style={styles.dateText}>
                            {formatDate(exp.startDate)}
                          </Text>
                          <Text style={styles.dateText}>
                            {exp.current ? "Present" : formatDate(exp.endDate)}
                          </Text>
                        </View>
                      </View>
                      {hasContent(exp.description) && (
                        <Text style={styles.description}>{exp.description}</Text>
                      )}
                    </View>
                  ))}
        )                </View>
              )}

              {/* First Half of Custom Sections */}
              {resumeData.sections
                .filter((section) => section.title && section.content)
                .slice(0, Math.ceil(resumeData.sections.length / 2))
                .map((section) => (
                  <View key={section.id} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <Text style={styles.customSectionText}>
                      {section.content}
                    </Text>
                  </View>
                ))}
        )            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Education */}
              {resumeData.education.length > 0 && (
                <View style={styles.sectionSmall}>
                  <Text style={styles.sectionTitleSmall}>Education</Text>
                  {resumeData.education.map((edu) => (
                    <View key={edu.id} style={styles.educationItem}>
                      <Text style={styles.degree}>
                        {edu.degree || "Degree"}
                      </Text>
                      {hasContent(edu.field) && (
                        <Text style={styles.field}>{edu.field}</Text>
                      )}
                      <Text style={styles.school}>
                        {edu.school || "School Name"}
                      </Text>
                      <Text style={styles.eduDate}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Text>
                    </View>
                  ))}
        )                </View>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <View style={styles.sectionSmall}>
                  <Text style={styles.sectionTitleSmall}>
                    Core Competencies
                  </Text>
                  {resumeData.skills.map((skill) =>
                    skill.name ? (
                      <View key={skill.id} style={styles.skillItem}>
                        <View style={styles.skillBullet} />
                        <Text style={styles.skillText}>{skill.name}</Text>
                      </View>
                    ) : null
                  )}
                </View>
              )}

              {/* Second Half of Custom Sections */}
              {resumeData.sections
                .filter((section) => section.title && section.content)
                .slice(Math.ceil(resumeData.sections.length / 2))
                .map((section) => (
                  <View key={section.id} style={styles.sectionSmall}>
                    <Text style={styles.sectionTitleSmall}>{section.title}</Text>
                    <Text style={styles.customSectionTextSmall}>
                      {section.content}
                    </Text>
                  </View>
                ))}
        )            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
