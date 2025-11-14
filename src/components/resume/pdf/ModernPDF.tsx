import { Document, Page, Text, View, StyleSheet, Svg, Path, Image } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 9,
    color: '#6b7280',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactSeparator: {
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#d1d5db',
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 18,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#7c3aed',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
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
    color: '#7c3aed',
    marginBottom: 4,
  },
  experienceDate: {
    fontSize: 9,
    color: '#6b7280',
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
    fontSize: 9,
    fontWeight: 600,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
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
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
          
          {/* Contact Info */}
          <View style={styles.contactContainer}>
            {resumeData.personalInfo.email && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
            )}
            {resumeData.personalInfo.email && resumeData.personalInfo.phone && (
              <Text style={styles.contactSeparator}>•</Text>
            )}
            {resumeData.personalInfo.phone && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
            )}
            {resumeData.personalInfo.phone && resumeData.personalInfo.location && (
              <Text style={styles.contactSeparator}>•</Text>
            )}
            {resumeData.personalInfo.location && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.location}</Text>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {/* Summary */}
          {hasContent(resumeData.personalInfo.summary) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {resumeData.experience.map((exp) => (
                <View key={exp.id} style={[styles.experienceItem, { borderLeftColor: themeColor }]}>
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

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
              <View style={styles.skillsContainer}>
                {resumeData.skills.map((skill, index) => {
                  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
                  const color = colors[index % colors.length];
                  return hasContent(skill.name) ? (
                    <Text
                      key={skill.id}
                      style={[
                        styles.skillBadge,
                        {
                          color: color,
                          backgroundColor: `${color}15`,
                          borderColor: `${color}40`
                        }
                      ]}
                    >
                      {skill.name}
                    </Text>
                  ) : null;
                })}
              </View>
            </View>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.educationContent}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    {hasContent(edu.field) && <Text style={styles.educationField}>{edu.field}</Text>}
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                  </View>
                  <Text style={styles.educationDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections.map((section) => (
            hasContent(section.title) && hasContent(section.content) && (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.summary}>{section.content}</Text>
              </View>
            )
          ))}
        </View>
      </Page>
    </Document>
  );
};
