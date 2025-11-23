import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 32,
    paddingVertical: 40,
    backgroundColor: '#1e3a8a',
    marginBottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 6,
  },
  title: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mainContent: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  sidebar: {
    width: '33%',
  },
  mainColumn: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1e3a8a',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1e3a8a',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    position: 'relative',
    paddingLeft: 18,
    borderLeftWidth: 1,
    borderLeftColor: '#1e3a8a',
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 10,
  },
  position: {
    fontSize: 12,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 3,
  },
  company: {
    fontSize: 10,
    fontWeight: 600,
    color: '#1e3a8a',
  },
  experienceDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
    marginTop: 6,
  },
  skillItem: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: 6,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 2,
  },
  educationField: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 8,
    color: '#6b7280',
  },
  timelineDot: {
    position: 'absolute',
    left: -6,
    top: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1e3a8a',
  },
});

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const ExecutiveModernPDF = ({ resumeData, themeColor = "#1e3a8a" }: Props) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <View style={styles.headerContent}>
            {photo && <Image src={photo} style={styles.photo} />}
            <View style={styles.headerText}>
              <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
              {hasContent(resumeData.personalInfo.title) && (
                <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
              )}
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactContainer}>
            {hasContent(resumeData.personalInfo.email) && (
              <Text>{resumeData.personalInfo.email}</Text>
            )}
            {hasContent(resumeData.personalInfo.phone) && (
              <Text>{resumeData.personalInfo.phone}</Text>
            )}
            {hasContent(resumeData.personalInfo.location) && (
              <Text>{resumeData.personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Two-column layout */}
        <View style={styles.mainContent}>
          {/* Left Sidebar */}
          <View style={styles.sidebar}>
            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>Skills</Text>
                {resumeData.skills.map((skill) => (
                  hasContent(skill.name) ? (
                    <Text key={skill.id} style={styles.skillItem}>{skill.name}</Text>
                  ) : null
                ))}
              </View>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>Education</Text>
                {resumeData.education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    {hasContent(edu.field) && <Text style={styles.educationField}>{edu.field}</Text>}
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    <Text style={styles.educationDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Main Content */}
          <View style={styles.mainColumn}>
            {/* Summary */}
            {hasContent(resumeData.personalInfo.summary) && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>Executive Summary</Text>
                <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>Professional Experience</Text>
                {resumeData.experience.map((exp) => (
                  <View key={exp.id} style={[styles.experienceItem, { borderLeftColor: themeColor }]}>
                    <View style={[styles.timelineDot, { backgroundColor: themeColor }]} />
                    <View style={styles.experienceHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.position}>{exp.position || "Position Title"}</Text>
                        <Text style={[styles.company, { color: themeColor }]}>{exp.company || "Company Name"}</Text>
                      </View>
                      <Text style={styles.experienceDate}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Custom Sections */}
            {resumeData.sections.map((section) => (
              hasContent(section.title) && hasContent(section.content) && (
                <View key={section.id} style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>{section.title}</Text>
                  <Text style={styles.summary}>{section.content}</Text>
                </View>
              )
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
