import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import type { ResumeData } from '@/pages/Editor';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: 20,
  },
  profileSection: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
    borderBottomStyle: 'solid',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#14b8a6',
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 700,
    color: '#ffffff',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 6,
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    color: '#5eead4',
    textAlign: 'center',
    fontWeight: 600,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#5eead4',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 10,
    fontSize: 9,
  },
  skillItem: {
    backgroundColor: '#334155',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 8,
    fontSize: 9,
    fontWeight: 600,
    borderLeftWidth: 2,
    borderLeftColor: '#2dd4bf',
    borderLeftStyle: 'solid',
  },
  educationItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
    borderBottomStyle: 'solid',
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 4,
  },
  educationField: {
    fontSize: 9,
    color: '#5eead4',
    marginBottom: 3,
  },
  educationSchool: {
    fontSize: 9,
    color: '#cbd5e1',
    marginBottom: 3,
  },
  educationDate: {
    fontSize: 8,
    color: '#94a3b8',
  },
  content: {
    width: '65%',
    padding: 30,
    paddingBottom: 20,
  },
  contentSection: {
    marginBottom: 25,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleBar: {
    width: 3,
    height: 20,
    backgroundColor: '#14b8a6',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 20,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#2dd4bf',
    borderLeftStyle: 'solid',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 10,
  },
  position: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    fontWeight: 600,
    color: '#0d9488',
    marginBottom: 6,
  },
  dateRange: {
    fontSize: 8,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
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

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface Props {
  resumeData: ResumeData;
}

export const FullstackPDF = ({ resumeData }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Profile */}
          <View style={styles.profileSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{getInitials(resumeData.personalInfo.fullName)}</Text>
            </View>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
            <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          </View>

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>CONTACT</Text>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    fill="none"
                    stroke="#5eead4"
                    strokeWidth="2"
                  />
                  <Path d="M22 6l-10 7L2 6" fill="none" stroke="#5eead4" strokeWidth="2" />
                </Svg>
                <Text>{resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="none"
                    stroke="#5eead4"
                    strokeWidth="2"
                  />
                </Svg>
                <Text>{resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.contactItem}>
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    fill="none"
                    stroke="#5eead4"
                    strokeWidth="2"
                  />
                  <Path
                    d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill="none"
                    stroke="#5eead4"
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
              <Text style={styles.sidebarTitle}>SKILLS</Text>
              {resumeData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  {skill}
                </Text>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>EDUCATION</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {edu.field && <Text style={styles.educationField}>{edu.field}</Text>}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                  <Text style={styles.educationDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <View style={styles.contentSection} wrap={false}>
              <View style={styles.contentTitle}>
                <View style={styles.titleBar} />
                <Text>About Me</Text>
              </View>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.contentSection}>
              <View style={styles.contentTitle}>
                <View style={styles.titleBar} />
                <Text>Professional Experience</Text>
              </View>
              {resumeData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem} wrap={false}>
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
            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections &&
            resumeData.sections.map((section, index) => (
              <View key={index} style={styles.contentSection} wrap={false}>
                <View style={styles.contentTitle}>
                  <View style={styles.titleBar} />
                  <Text>{section.title}</Text>
                </View>
                <Text style={styles.customSectionContent}>{section.content}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};
