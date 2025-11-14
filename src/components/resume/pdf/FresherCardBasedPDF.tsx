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
    backgroundColor: "#F3F4F6",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  headerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 32,
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    gap: 24,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#14B8A6",
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
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111827",
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#14B8A6",
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
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
  summaryDivider: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginTop: 24,
    paddingTop: 24,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  cardIcon: {
    width: 14,
    height: 14,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#111827",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    borderLeftWidth: 3,
    borderLeftColor: "#14B8A6",
    fontSize: 9,
    fontWeight: 600,
    color: "#1F2937",
    borderRadius: 4,
  },
  twoColumnGrid: {
    flexDirection: "row",
    gap: 24,
  },
  column: {
    flex: 1,
  },
  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 16,
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
    color: "#14B8A6",
    marginBottom: 8,
  },
  educationDate: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#6B7280",
  },
  dateIcon: {
    width: 9,
    height: 9,
    marginRight: 4,
  },
  experiencePosition: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 9,
    fontWeight: 600,
    color: "#14B8A6",
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#4B5563",
    marginTop: 8,
  },
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },
});

const EmailIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#14B8A6" strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke="#14B8A6" strokeWidth={2} />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#14B8A6" strokeWidth={2} />
  </Svg>
);

const LocationIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#14B8A6" strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#14B8A6" strokeWidth={2} />
  </Svg>
);

const CodeIcon = () => (
  <Svg style={styles.cardIcon} viewBox="0 0 24 24">
    <Path d="m16 18 6-6-6-6M8 6l-6 6 6 6" fill="none" stroke="#14B8A6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GraduationCapIcon = () => (
  <Svg style={styles.cardIcon} viewBox="0 0 24 24">
    <Path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="none" stroke="#14B8A6" strokeWidth={2} />
    <Path d="M5 13.18v4L12 21l7-3.82v-4" fill="none" stroke="#14B8A6" strokeWidth={2} />
  </Svg>
);

const BriefcaseIcon = () => (
  <Svg style={styles.cardIcon} viewBox="0 0 24 24">
    <Path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2M3 8h18v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8z" fill="none" stroke="#14B8A6" strokeWidth={2} />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={styles.dateIcon} viewBox="0 0 24 24">
    <Path d="M6 2v4M18 2v4M4 8h16" stroke="#6B7280" strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#6B7280" strokeWidth={2} fill="none" />
  </Svg>
);

interface FresherCardBasedPDFProps {
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

export const FresherCardBasedPDF = ({ resumeData }: FresherCardBasedPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerContent}>
          {resumeData.personalInfo.photo && (
            <View style={styles.photoWrapper}>
              <Image src={resumeData.personalInfo.photo} style={styles.photo} />
            </View>
          )}

          <View style={styles.headerText}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>

            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
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

        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.summaryDivider}>
            <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}
      </View>

      {/* Skills Card */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <CodeIcon />
            <Text style={styles.cardTitle}>Technical Skills</Text>
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

      {/* Two Column Layout */}
      <View style={styles.twoColumnGrid}>
        {/* Education Card */}
        {resumeData.education && resumeData.education.length > 0 && (
          <View style={[styles.column, styles.card]}>
            <View style={styles.cardHeader}>
              <GraduationCapIcon />
              <Text style={styles.cardTitle}>Education</Text>
            </View>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={index < resumeData.education.length - 1 ? styles.itemDivider : {}}>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                {hasContent(edu.field) && (
                  <Text style={styles.educationField}>{edu.field}</Text>
                )}
                <Text style={styles.educationSchool}>{edu.school}</Text>
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

        {/* Experience Card */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View style={[styles.column, styles.card]}>
            <View style={styles.cardHeader}>
              <BriefcaseIcon />
              <Text style={styles.cardTitle}>Experience</Text>
            </View>
            {resumeData.experience.map((exp, index) => (
              <View key={index} style={index < resumeData.experience.length - 1 ? styles.itemDivider : {}}>
                <Text style={styles.experiencePosition}>{exp.position}</Text>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
                <View style={styles.educationDate}>
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

      {/* Custom Sections as Cards */}
      {resumeData.sections && resumeData.sections.length > 0 && (
        <>
          {resumeData.sections.map((section, index) => (
            hasContent(section.title) && hasContent(section.content) && (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{section.title}</Text>
                <Text style={styles.sectionContent}>{section.content}</Text>
              </View>
            )
          ))}
        </>
      )}
    </Page>
  </Document>
);
