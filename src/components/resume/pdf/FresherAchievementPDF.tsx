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
  headerBg: {
    paddingHorizontal: 48,
    paddingTop: 40,
    paddingBottom: 32,
    backgroundColor: "#FEF3C7",
  },
  headerContent: {
    flexDirection: "row",
    gap: 32,
  },
  photoContainer: {
    position: "relative",
  },
  awardBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    zIndex: 10,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#EAB308",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111827",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#EAB308",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: "#4B5563",
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  mainContent: {
    paddingHorizontal: 48,
    paddingVertical: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sectionIcon: {
    width: 14,
    height: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#111827",
  },
  summaryContainer: {
    paddingLeft: 32,
    borderLeftWidth: 3,
    borderLeftColor: "#EAB308",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#EAB308",
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    fontSize: 9,
    fontWeight: 600,
    color: "#1F2937",
  },
  experienceItem: {
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#EAB308",
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  experienceLeft: {
    flex: 1,
  },
  experiencePosition: {
    fontSize: 11,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 600,
    color: "#EAB308",
  },
  experienceDate: {
    fontSize: 9,
    color: "#6B7280",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateIcon: {
    width: 9,
    height: 9,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#374151",
    marginTop: 12,
  },
  educationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  educationItem: {
    width: "48%",
    padding: 16,
    borderWidth: 2,
    borderColor: "#EAB308",
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 4,
  },
  educationField: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 8,
  },
  educationSchool: {
    fontSize: 9,
    fontWeight: 600,
    color: "#EAB308",
    marginBottom: 8,
  },
  educationDate: {
    fontSize: 9,
    color: "#6B7280",
  },
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    paddingLeft: 32,
    borderLeftWidth: 3,
    borderLeftColor: "#EAB308",
  },
});

const EmailIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#EAB308" strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke="#EAB308" strokeWidth={2} />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#EAB308" strokeWidth={2} />
  </Svg>
);

const LocationIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#EAB308" strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#EAB308" strokeWidth={2} />
  </Svg>
);

const AwardIcon = () => (
  <Svg style={styles.awardBadge} viewBox="0 0 24 24">
    <Path d="M12 2L8 7H2l5 8-3 7 8-4 8 4-3-7 5-8h-6l-4-5z" fill="#EAB308" stroke="none" />
  </Svg>
);

const StarIcon = () => (
  <Svg style={styles.starIcon} viewBox="0 0 24 24">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#EAB308" />
  </Svg>
);

const TrendingUpIcon = () => (
  <Svg style={styles.sectionIcon} viewBox="0 0 24 24">
    <Path d="M23 6l-9.5 9.5-5-5L1 18" fill="none" stroke="#EAB308" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 6h6v6" fill="none" stroke="#EAB308" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={styles.dateIcon} viewBox="0 0 24 24">
    <Path d="M6 2v4M18 2v4M4 8h16" stroke="#6B7280" strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#6B7280" strokeWidth={2} fill="none" />
  </Svg>
);

interface FresherAchievementPDFProps {
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

export const FresherAchievementPDF = ({ resumeData }: FresherAchievementPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerBg}>
        <View style={styles.headerContent}>
          <View style={styles.photoContainer}>
            <AwardIcon />
            {resumeData.personalInfo.photo && (
              <View style={styles.photoWrapper}>
                <Image src={resumeData.personalInfo.photo} style={styles.photo} />
              </View>
            )}
          </View>

          <View style={styles.headerText}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>

            {resumeData.personalInfo.title && (
              <View style={styles.titleRow}>
                <StarIcon />
                <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
              </View>
            )}

            <View style={styles.contactInfo}>
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
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Professional Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <TrendingUpIcon />
              <Text style={styles.sectionTitle}>Profile Highlights</Text>
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
            </View>
          </View>
        )}

        {/* Core Competencies */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Svg style={styles.sectionIcon} viewBox="0 0 24 24">
                <Path d="M12 2L8 7H2l5 8-3 7 8-4 8 4-3-7 5-8h-6l-4-5z" fill="#EAB308" />
              </Svg>
              <Text style={styles.sectionTitle}>Core Competencies</Text>
            </View>
            <View style={styles.skillsGrid}>
              {resumeData.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <StarIcon />
              <Text style={styles.sectionTitle}>Professional Experience & Achievements</Text>
            </View>
            {resumeData.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={styles.experienceLeft}>
                    <Text style={styles.experiencePosition}>{exp.position}</Text>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                  </View>
                  <View style={styles.experienceDate}>
                    <CalendarIcon />
                    <Text>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </Text>
                  </View>
                </View>
                {hasContent(exp.description) && (
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Svg style={styles.sectionIcon} viewBox="0 0 24 24">
                <Path d="M12 2L8 7H2l5 8-3 7 8-4 8 4-3-7 5-8h-6l-4-5z" fill="#EAB308" />
              </Svg>
              <Text style={styles.sectionTitle}>Academic Background</Text>
            </View>
            <View style={styles.educationGrid}>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {hasContent(edu.field) && (
                    <Text style={styles.educationField}>{edu.field}</Text>
                  )}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                  <Text style={styles.educationDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {resumeData.sections && resumeData.sections.length > 0 && (
          <>
            {resumeData.sections.map((section, index) => (
              hasContent(section.title) && hasContent(section.content) && (
                <View key={index} style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <TrendingUpIcon />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  <Text style={styles.sectionContent}>{section.content}</Text>
                </View>
              )
            ))}
          </>
        )}
      </View>
    </Page>
  </Document>
);
