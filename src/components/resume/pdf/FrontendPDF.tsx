import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import type { ResumeData } from '@/pages/Editor';

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
    backgroundColor: '#4f46e5',
    padding: 30,
    marginBottom: 25,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#dbeafe',
    marginBottom: 15,
    fontWeight: 300,
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  contactText: {
    fontSize: 9,
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#4f46e5',
    borderBottomStyle: 'solid',
  },
  sectionTitleBar: {
    width: 0,
    height: 0,
  },
  section: {
    marginBottom: 25,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBox: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bfdbfe',
    fontSize: 9,
    fontWeight: 600,
    color: '#1e40af',
  },
  experienceItem: {
    marginBottom: 18,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderLeftWidth: 2,
    borderLeftColor: '#93c5fd',
    borderLeftStyle: 'solid',
    position: 'relative',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  position: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    fontWeight: 600,
    color: '#4f46e5',
    marginBottom: 5,
  },
  dateRange: {
    fontSize: 8,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: 600,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#4b5563',
  },
  educationItem: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bfdbfe',
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  degree: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 2,
  },
  field: {
    fontSize: 10,
    color: '#374151',
    fontWeight: 600,
    marginBottom: 3,
  },
  school: {
    fontSize: 10,
    color: '#4f46e5',
    fontWeight: 600,
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

export const FrontendPDF = ({ resumeData, themeColor = "#4f46e5" }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          
          <View style={styles.contactContainer}>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <Path d="M22 6l-10 7L2 6" fill="none" stroke="#ffffff" strokeWidth="2" />
                </Svg>
                <Text style={styles.contactText}>{resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </Svg>
                <Text style={styles.contactText}>{resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.contactItem}>
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <Path
                    d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </Svg>
                <Text style={styles.contactText}>{resumeData.personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>About Me</Text>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>Technical Skills</Text>
              <View style={styles.skillsGrid}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={[styles.skillBox, { borderLeftColor: themeColor }]}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>Professional Experience</Text>
              {resumeData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem} wrap={false}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={[styles.company, { color: themeColor }]}>{exp.company}</Text>
                    </View>
                    <Text style={styles.dateRange}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem} wrap={false}>
                  <View style={styles.educationHeader}>
                    <View>
                      <Text style={styles.degree}>{edu.degree}</Text>
                      {edu.field && <Text style={styles.field}>{edu.field}</Text>}
                      <Text style={[styles.school, { color: themeColor }]}>{edu.school}</Text>
                    </View>
                    <Text style={styles.dateRange}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections &&
            resumeData.sections.map((section, index) => (
              <View key={index} style={styles.section} wrap={false}>
                <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>{section.title}</Text>
                <Text style={styles.customSectionContent}>{section.content}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};
