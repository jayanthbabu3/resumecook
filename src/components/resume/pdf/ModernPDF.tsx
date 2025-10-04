import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingBottom: 40,
    paddingLeft: 0,
    paddingRight: 0,
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 0,
    paddingBottom: 35,
    paddingHorizontal: 45,
    position: 'relative',
  },
  topBar: {
    height: 10,
    backgroundColor: '#7c3aed',
    marginBottom: 30,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: 600,
    marginBottom: 18,
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#e5e7eb',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    fontSize: 8,
    color: '#6b7280',
  },
  content: {
    paddingHorizontal: 45,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7c3aed',
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionContent: {
    paddingLeft: 14,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
    gap: 10,
  },
  position: {
    fontSize: 11,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 4,
  },
  dateTag: {
    fontSize: 8,
    fontWeight: 600,
    color: '#7c3aed',
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#4b5563',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    fontSize: 8,
    fontWeight: 600,
    color: '#7c3aed',
    backgroundColor: '#f9f5ff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e9d5ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  educationItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  educationContent: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 9,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 2,
  },
  educationField: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 9,
    color: '#374151',
  },
  educationDate: {
    fontSize: 8,
    color: '#6b7280',
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

export const ModernPDF = ({ resumeData, themeColor = "#7c3aed" }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.topBar, { backgroundColor: themeColor }]} />
          <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
          {resumeData.personalInfo.title && (
            <Text style={[styles.title, { color: themeColor }]}>{resumeData.personalInfo.title}</Text>
          )}
          
          {/* Contact Info */}
          <View style={styles.contactContainer}>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                  <Path d="M22 6l-10 7L2 6" fill="none" stroke="#6b7280" strokeWidth="2" />
                </Svg>
                <Text>{resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                </Svg>
                <Text>{resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.contactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                  <Path
                    d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                </Svg>
                <Text>{resumeData.personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <View style={styles.section} wrap={false}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionDot, { backgroundColor: themeColor }]} />
                <Text style={styles.sectionTitle}>PROFESSIONAL PROFILE</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
              </View>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader} wrap={false}>
                <View style={[styles.sectionDot, { backgroundColor: themeColor }]} />
                <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              </View>
              <View style={styles.sectionContent}>
                {resumeData.experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem} wrap={false}>
                    <View style={styles.experienceHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.position}>{exp.position || "Position Title"}</Text>
                        <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                      </View>
                      <Text style={[styles.dateTag, { color: themeColor, backgroundColor: `${themeColor}15` }]}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <View style={styles.section} wrap={false}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionDot, { backgroundColor: themeColor }]} />
                <Text style={styles.sectionTitle}>CORE COMPETENCIES</Text>
              </View>
              <View style={[styles.sectionContent, styles.skillsContainer]}>
                {resumeData.skills.map((skill, index) => (
                  skill && (
                    <Text key={index} style={[styles.skillBadge, { color: themeColor, borderColor: `${themeColor}40` }]}>
                      {skill}
                    </Text>
                  )
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <View style={styles.section} wrap={false}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionDot, { backgroundColor: themeColor }]} />
                <Text style={styles.sectionTitle}>EDUCATION</Text>
              </View>
              <View style={styles.sectionContent}>
                {resumeData.education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem} wrap={false}>
                    <View style={styles.educationContent}>
                      <Text style={styles.educationDegree}>{edu.degree}</Text>
                      {edu.field && <Text style={styles.educationField}>{edu.field}</Text>}
                      <Text style={styles.educationSchool}>{edu.school}</Text>
                    </View>
                    <Text style={styles.educationDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections.map((section) => (
            <View key={section.id} style={styles.section} wrap={false}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionDot, { backgroundColor: themeColor }]} />
                <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.summary}>{section.content}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};