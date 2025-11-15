import { Document, Page, View, Text, StyleSheet, Svg, Path, Image } from '@react-pdf/renderer';
import type { ResumeData } from '@/pages/Editor';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#111827',
  },
  leftColumn: {
    width: '65%',
    paddingVertical: 40,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    marginBottom: 22,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: 600,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    fontSize: 9,
    color: '#4b5563',
  },
  section: {
    marginBottom: 20,
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 10,
    color: '#0f172a',
  },
  summary: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 16,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  position: {
    fontSize: 11,
    fontWeight: 700,
    color: '#111827',
  },
  company: {
    fontSize: 10,
    fontWeight: 600,
    color: '#334155',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 8,
    fontWeight: 600,
    color: '#6b7280',
  },
  experienceDescription: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 14,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
  },
  educationTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#1f2937',
  },
  educationField: {
    fontSize: 9,
    color: '#4b5563',
  },
  educationSchool: {
    fontSize: 9,
    color: '#1f2937',
    fontWeight: 600,
  },
  educationDates: {
    fontSize: 8,
    color: '#6b7280',
    marginTop: 2,
  },
  rightColumn: {
    width: '35%',
    paddingVertical: 40,
    paddingHorizontal: 32,
    color: '#f8fafc',
  },
  avatar: {
    height: 72,
    width: 72,
    borderRadius: 36,
    backgroundColor: '#ffffff22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: 700,
    color: '#ffffff',
  },
  sidebarBlurb: {
    fontSize: 8,
    color: '#f8fafc',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  photoWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff55',
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  sidebarSection: {
    marginTop: 22,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  sidebarContent: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#f8fafc',
  },
  skillChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    fontSize: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff44',
    backgroundColor: '#ffffff11',
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
});

const hasContent = (value?: string | null) => value && value.trim().length > 0;

const formatDate = (date: string): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const splitLines = (text?: string | null) =>
  text
    ? text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

const renderContactIcon = (icon: 'phone' | 'mail' | 'location', color: string) => {
  switch (icon) {
    case 'phone':
      return (
        <Svg width="10" height="10" viewBox="0 0 24 24">
          <Path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </Svg>
      );
    case 'mail':
      return (
        <Svg width="10" height="10" viewBox="0 0 24 24">
          <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke={color} strokeWidth="2" />
          <Path d="m22 6-10 7L2 6" fill="none" stroke={color} strokeWidth="2" />
        </Svg>
      );
    default:
      return (
        <Svg width="10" height="10" viewBox="0 0 24 24">
          <Path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" fill="none" stroke={color} strokeWidth="2" />
          <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="none" stroke={color} strokeWidth="2" />
        </Svg>
      );
  }
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const SeniorPDF = ({ resumeData, themeColor = '#0f766e' }: Props) => {
  const initials = (resumeData.personalInfo.fullName || '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const accent = themeColor;
  const accentLight = `${accent}55`;
  const accentSubtle = `${accent}33`;
  const sidebarBackground = accent;
  const photo = resumeData.personalInfo.photo;
  const sections = resumeData.sections ?? [];
  const achievementsSection = sections.find((section) =>
    section.title?.toLowerCase().includes('achievement'),
  );
  const achievementLines = splitLines(achievementsSection?.content);
  const otherSections = sections.filter(
    (section) => section !== achievementsSection && section.title && section.content,
  );
  const competencyChips = resumeData.skills
    .map((skill) => skill.name?.trim())
    .filter((name): name is string => Boolean(name));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
          <View style={[styles.header, { borderBottomColor: accent }]}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName || 'Your Name'}</Text>
            <Text style={[styles.title, { color: themeColor }]}>{resumeData.personalInfo.title || 'Senior Software Engineer'}</Text>
            <View style={styles.contactRow}>
              {resumeData.personalInfo.phone && (
                <View style={styles.contactItem}>
                  {renderContactIcon('phone', '#4b5563')}
                  <Text>{resumeData.personalInfo.phone}</Text>
                </View>
              )}
              {resumeData.personalInfo.email && (
                <View style={styles.contactItem}>
                  {renderContactIcon('mail', '#4b5563')}
                  <Text>{resumeData.personalInfo.email}</Text>
                </View>
              )}
              {resumeData.personalInfo.location && (
                <View style={styles.contactItem}>
                  {renderContactIcon('location', '#4b5563')}
                  <Text>{resumeData.personalInfo.location}</Text>
                </View>
              )}
            </View>
          </View>

          {hasContent(resumeData.personalInfo.summary) && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: accent }]}>Summary</Text>
              <Text style={[styles.summary, { textAlign: 'justify' }]}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>
          )}

        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent }]}>Experience</Text>
            {resumeData.experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                  <View
                    style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: accent, marginTop: 5 }}
                  />
                  <View style={{ flex: 1 }}>
                    <View style={styles.experienceHeader}>
                      <View>
                        <Text style={styles.position}>{exp.position || 'Role'}</Text>
                        <Text style={styles.company}>{exp.company || 'Company'}</Text>
                      </View>
                      <Text style={styles.dateRange}>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {hasContent(exp.description) && (
                      <Text style={[styles.experienceDescription, { textAlign: 'justify' }]}>
                        {exp.description}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
        )          </View>
        )}

        {otherSections.length > 0 &&
          otherSections.map((section) => {
            const items = splitLines(section.content);
            return (
              <View key={section.id} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: accent }]}>{section.title}</Text>
                {items.length > 0 ? (
                  <View style={styles.bulletList}>
                    {items.map((line, index) => (
                      <Text key={`${section.id}-${index}`} style={styles.bulletItem}>
                        • {line}
                      </Text>
                    ))}
        )                  </View>
                ) : (
                  <Text style={[styles.paragraph, { textAlign: 'justify' }]}>{section.content}</Text>
                )}
              </View>
            );
          })}

        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent }]}>Education</Text>
            {resumeData.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 12 }}>
                  <Text style={styles.educationTitle}>{edu.degree || 'Degree'}</Text>
                  {edu.field ? <Text style={styles.educationField}>{edu.field}</Text> : null}
                  <Text style={styles.educationSchool}>{edu.school || 'School'}</Text>
                  <Text style={styles.educationDates}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
        )            </View>
          )}
        </View>

        <View style={[styles.rightColumn, { backgroundColor: sidebarBackground }]}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            {photo ? (
              <View style={styles.photoWrapper}>
                <Image src={photo} style={styles.photo} />
              </View>
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>{initials || 'SE'}</Text>
              </View>
            )}
            <Text style={styles.sidebarBlurb}>
              Driving technical excellence and shipping impactful products.
            </Text>
          </View>

          {achievementLines.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Achievements</Text>
              <View style={styles.bulletList}>
                {achievementLines.map((line, index) => (
                  <Text key={`achievement-${index}`} style={styles.sidebarContent}>
                    • {line}
                  </Text>
                ))}
        )              </View>
            </View>
          )}

          {competencyChips.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills & Tools</Text>
              <View style={styles.skillChipContainer}>
                {competencyChips.map((skill, index) => (
                  <Text
                    key={`${skill}-${index}`}
                    style={[
                      styles.skillChip,
                      { borderColor: accentSubtle, backgroundColor: `${accent}22` },
                    ]}
                  >
                    {skill}
                  </Text>
                ))}
        )              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
