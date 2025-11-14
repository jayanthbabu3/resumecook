import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { registerPDFFonts } from "@/lib/pdfFonts";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

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
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 20,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 32,
    marginBottom: 0,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#F59E0B",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111827",
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
  },
  headerRight: {
    gap: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#4B5563",
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  skillsSection: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: "#F9FAFB",
  },
  skillsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  skillsIcon: {
    width: 18,
    height: 18,
  },
  skillsTitle: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#111827",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  skillCard: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: "#ffffff",
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
  mainContent: {
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  summarySection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },
  twoColumnGrid: {
    flexDirection: "row",
    gap: 24,
  },
  column: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 24,
  },
  experiencePosition: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 4,
  },
  experienceDate: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 8,
  },
  dateIcon: {
    width: 9,
    height: 9,
    marginRight: 4,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#4B5563",
  },
  educationItem: {
    marginBottom: 16,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  educationField: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 4,
  },
  educationSchool: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 8,
  },
  educationDate: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#6B7280",
  },
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },
  sectionMargin: {
    marginBottom: 32,
  },
});

const EmailIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#F59E0B" strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke="#F59E0B" strokeWidth={2} />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#F59E0B" strokeWidth={2} />
  </Svg>
);

const LocationIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#F59E0B" strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#F59E0B" strokeWidth={2} />
  </Svg>
);

const CodeIcon = () => (
  <Svg style={styles.skillsIcon} viewBox="0 0 24 24">
    <Path d="m16 18 6-6-6-6M8 6l-6 6 6 6" fill="none" stroke="#F59E0B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={styles.dateIcon} viewBox="0 0 24 24">
    <Path d="M6 2v4M18 2v4M4 8h16" stroke="#6B7280" strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#6B7280" strokeWidth={2} fill="none" />
  </Svg>
);

interface FresherSkillsFirstPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

export const FresherSkillsFirstPDF = ({ resumeData, themeColor = "#F59E0B" }: FresherSkillsFirstPDFProps) => {
  // Dynamic styles that use themeColor
  const dynamicStyles = StyleSheet.create({
    borderBottom: {
      borderBottomColor: themeColor,
    },
    title: {
      ...styles.title,
      color: themeColor,
    },
    skillsSection: {
      ...styles.skillsSection,
      backgroundColor: "#F9FAFB",
    },
    skillCard: {
      ...styles.skillCard,
      backgroundColor: themeColor,
    },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
    },
    experienceCompany: {
      ...styles.experienceCompany,
      color: themeColor,
    },
    educationSchool: {
      ...styles.educationSchool,
      color: themeColor,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={[styles.header, dynamicStyles.borderBottom]}>
        <View style={styles.headerLeft}>
          {resumeData.personalInfo.photo && (
            <View style={styles.photoWrapper}>
              <Image src={resumeData.personalInfo.photo} style={styles.photo} />
            </View>
          )}
          <View>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
            {resumeData.personalInfo.title && (
              <Text style={dynamicStyles.title}>{resumeData.personalInfo.title}</Text>
            )}
          </View>
        </View>

        <View style={styles.headerRight}>
          {resumeData.personalInfo.email && (
            <View style={styles.contactItem}>
              <EmailIcon />
              <Text>{resumeData.personalInfo.email}</Text>
            </View>
          )}
          {resumeData.personalInfo.phone && (
            <View style={styles.contactItem}>
              <PhoneIcon />
              <Text>{resumeData.personalInfo.phone}</Text>
            </View>
          )}
          {resumeData.personalInfo.location && (
            <View style={styles.contactItem}>
              <LocationIcon />
              <Text>{resumeData.personalInfo.location}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <View style={dynamicStyles.skillsSection}>
          <View style={styles.skillsHeader}>
            <CodeIcon />
            <Text style={styles.skillsTitle}>Technical Skills</Text>
          </View>
          <View style={styles.skillsGrid}>
            {resumeData.skills.map((skill) => (
              <Text key={skill.id} style={dynamicStyles.skillCard}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Professional Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.summarySection}>
            <Text style={dynamicStyles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Two Column Layout */}
        <View style={styles.twoColumnGrid}>
          {/* Left Column - Experience */}
          <View style={styles.column}>
            {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={styles.sectionMargin}>
                <Text style={dynamicStyles.sectionTitle}>Experience & Internships</Text>
                {resumeData.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.experiencePosition}>{exp.position}</Text>
                    <Text style={dynamicStyles.experienceCompany}>{exp.company}</Text>
                    <View style={styles.experienceDate}>
                      <CalendarIcon />
                      <Text>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {hasContent(exp.description) && (
                      <Text style={styles.experienceDescription}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column - Education & Sections */}
          <View style={styles.column}>
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.sectionMargin}>
                <Text style={dynamicStyles.sectionTitle}>Education</Text>
                {resumeData.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    {hasContent(edu.field) && (
                      <Text style={styles.educationField}>{edu.field}</Text>
                    )}
                    <Text style={dynamicStyles.educationSchool}>{edu.school}</Text>
                    <View style={styles.educationDate}>
                      <CalendarIcon />
                      <Text>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {resumeData.sections && resumeData.sections.length > 0 && (
              <>
                {resumeData.sections.map((section, index) => (
                  hasContent(section.title) && hasContent(section.content) && (
                    <View key={index} style={styles.sectionMargin}>
                      <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
                      <Text style={styles.sectionContent}>{section.content}</Text>
                    </View>
                  )
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </Page>
  </Document>
  );
};
