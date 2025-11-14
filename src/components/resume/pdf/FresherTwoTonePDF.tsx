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
    flexDirection: "row",
    fontSize: 9,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  leftHalf: {
    width: "50%",
    backgroundColor: "#F43F5E",
    color: "#ffffff",
    padding: 40,
  },
  rightHalf: {
    width: "50%",
    backgroundColor: "#ffffff",
    padding: 40,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#ffffff",
    alignSelf: "center",
    marginBottom: 32,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
    color: "#ffffff",
    textAlign: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 32,
  },
  leftSection: {
    marginBottom: 32,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  leftSectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  leftIcon: {
    width: 12,
    height: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  contactIcon: {
    width: 12,
    height: 12,
    marginTop: 2,
  },
  contactText: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.9)",
    flex: 1,
  },
  educationItem: {
    marginBottom: 16,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 600,
    color: "#ffffff",
    marginBottom: 4,
  },
  educationField: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  educationSchool: {
    fontSize: 9,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
  },
  educationDate: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.7)",
  },
  skillItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 8,
    borderRadius: 4,
  },
  rightSection: {
    marginBottom: 32,
  },
  rightSectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#F43F5E",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
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
    color: "#F43F5E",
    marginBottom: 4,
  },
  experienceDate: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 12,
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
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },
});

const EmailIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#ffffff" strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke="#ffffff" strokeWidth={2} />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#ffffff" strokeWidth={2} />
  </Svg>
);

const LocationIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#ffffff" strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#ffffff" strokeWidth={2} />
  </Svg>
);

const GraduationCapIcon = () => (
  <Svg style={styles.leftIcon} viewBox="0 0 24 24">
    <Path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="none" stroke="#ffffff" strokeWidth={2} />
    <Path d="M5 13.18v4L12 21l7-3.82v-4" fill="none" stroke="#ffffff" strokeWidth={2} />
  </Svg>
);

const CodeIcon = () => (
  <Svg style={styles.leftIcon} viewBox="0 0 24 24">
    <Path d="m16 18 6-6-6-6M8 6l-6 6 6 6" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={styles.dateIcon} viewBox="0 0 24 24">
    <Path d="M6 2v4M18 2v4M4 8h16" stroke="#6B7280" strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#6B7280" strokeWidth={2} fill="none" />
  </Svg>
);

interface FresherTwoTonePDFProps {
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

export const FresherTwoTonePDF = ({ resumeData }: FresherTwoTonePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Half - Colored */}
      <View style={styles.leftHalf}>
        {resumeData.personalInfo.photo && (
          <View style={styles.photoWrapper}>
            <Image src={resumeData.personalInfo.photo} style={styles.photo} />
          </View>
        )}

        <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>

        {resumeData.personalInfo.title && (
          <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
        )}

        {/* Contact */}
        <View style={styles.leftSection}>
          <Text style={styles.leftSectionTitle}>CONTACT INFORMATION</Text>
          {resumeData.personalInfo.email && (
            <View style={styles.contactItem}>
              <EmailIcon />
              <Text style={styles.contactText}>{resumeData.personalInfo.email}</Text>
            </View>
          )}
          {resumeData.personalInfo.phone && (
            <View style={styles.contactItem}>
              <PhoneIcon />
              <Text style={styles.contactText}>{resumeData.personalInfo.phone}</Text>
            </View>
          )}
          {resumeData.personalInfo.location && (
            <View style={styles.contactItem}>
              <LocationIcon />
              <Text style={styles.contactText}>{resumeData.personalInfo.location}</Text>
            </View>
          )}
        </View>

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <View style={styles.leftSection}>
            <View style={styles.leftSectionTitle}>
              <GraduationCapIcon />
              <Text>EDUCATION</Text>
            </View>
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
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View style={{ marginBottom: 0 }}>
            <View style={styles.leftSectionTitle}>
              <CodeIcon />
              <Text>TECHNICAL SKILLS</Text>
            </View>
            {resumeData.skills.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                {skill.name}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Right Half - White */}
      <View style={styles.rightHalf}>
        {/* Professional Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.rightSection}>
            <Text style={styles.rightSectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View style={styles.rightSection}>
            <Text style={styles.rightSectionTitle}>Experience & Internships</Text>
            {resumeData.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experiencePosition}>{exp.position}</Text>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
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

        {/* Custom Sections */}
        {resumeData.sections && resumeData.sections.length > 0 && (
          <>
            {resumeData.sections.map((section, index) => (
              hasContent(section.title) && hasContent(section.content) && (
                <View key={index} style={styles.rightSection}>
                  <Text style={styles.rightSectionTitle}>{section.title}</Text>
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
