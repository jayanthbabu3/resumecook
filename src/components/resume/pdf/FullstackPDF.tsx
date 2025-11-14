import { Document, Page, Text, View, StyleSheet, Svg, Path, Image } from '@react-pdf/renderer';
import type { ResumeData } from '@/pages/Editor';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    paddingRight: PDF_PAGE_MARGINS.right,
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#f9fafb',
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: '#e5e7eb',
  },
  sidebarHeader: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#7c3aed',
  },
  photoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ffffff',
    marginBottom: 12,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 6,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 10,
    color: '#7c3aed',
    fontWeight: 600,
  },
  sidebarSection: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#e5e7eb',
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: '#7c3aed',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 8,
    fontSize: 8,
    color: '#374151',
  },
  skillItem: {
    fontSize: 8,
    fontWeight: 600,
    color: '#1f2937',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    marginBottom: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#7c3aed',
    borderLeftStyle: 'solid',
  },
  educationItem: {
    marginBottom: 15,
  },
  educationDegree: {
    fontSize: 8,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 3,
  },
  educationField: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 8,
    color: '#374151',
    fontWeight: 600,
  },
  educationDate: {
    fontSize: 7,
    color: '#6b7280',
    marginTop: 4,
  },
  mainContent: {
    width: '65%',
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#7c3aed',
    marginBottom: 10,
    paddingBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#7c3aed',
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
  dateRange: {
    fontSize: 8,
    color: '#6b7280',
    fontWeight: 600,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#4b5563',
  },
  customSectionContent: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
});

const formatDate = (date: string): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const FullstackPDF = ({ resumeData, themeColor = "#7c3aed" }: Props) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {photo ? (
            <View style={styles.photoWrapper}>
              <Image src={photo} style={styles.photo} />
            </View>
          ) : null}
          {/* Header */}
          <View style={[styles.sidebarHeader, { borderBottomColor: themeColor }]}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
            <Text style={[styles.title, { color: themeColor }]}>{resumeData.personalInfo.title}</Text>
          </View>

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={[styles.sidebarTitle, { color: themeColor }]}>CONTACT</Text>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <Path d="M22 6l-10 7L2 6" fill="none" stroke="#374151" strokeWidth="2" />
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
                    stroke="#374151"
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
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <Path
                    d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                </Svg>
                <Text>{resumeData.personalInfo.location}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>SKILLS</Text>
              {resumeData.skills.map((skill) => (
                <Text key={skill.id} style={[styles.skillItem, { borderLeftColor: themeColor }]}>
                  {skill.name}
                </Text>
              ))}
        )            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>EDUCATION</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {hasContent(edu.field) && <Text style={styles.educationField}>{edu.field}</Text>}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                  <Text style={styles.educationDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
        )            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary */}
          {hasContent(resumeData.personalInfo.summary) && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>PROFESSIONAL EXPERIENCE</Text>
              {resumeData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.dateRange}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
        )            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections &&
            resumeData.sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>{section.title.toUpperCase()}</Text>
                <Text style={styles.customSectionContent}>{section.content}</Text>
              </View>
            ))}
        )        </View>
      </Page>
    </Document>
  );
};
