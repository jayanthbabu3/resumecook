import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import type { ResumeData } from '@/pages/Editor';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#1e293b',
    backgroundColor: '#ffffff',
    paddingVertical: 40,
    paddingHorizontal: 48,
  },
  body: {
    flexDirection: 'column',
  },
  header: {
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
    fontWeight: 600,
    color: '#0f172a',
  },
  title: {
    fontSize: 9,
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: 2,
    marginTop: 6,
  },
  titleAccent: {
    marginTop: 6,
    width: 44,
    height: 2,
    borderRadius: 2,
  },
  contactRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactText: {
    fontSize: 9,
    color: '#475569',
  },
  photoWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  initials: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0f172a',
  },
  section: {
    paddingLeft: 14,
    borderLeftWidth: 3,
    borderLeftStyle: 'solid',
    marginTop: 18,
  },
  sectionBreakable: {
    paddingLeft: 14,
    borderLeftWidth: 3,
    borderLeftStyle: 'solid',
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#475569',
  },
  experienceBlock: {
    flexDirection: 'column',
    marginBottom: 12,
  },
  educationBlock: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  position: {
    fontSize: 10,
    fontWeight: 600,
    color: '#0f172a',
  },
  company: {
    fontSize: 9,
    fontWeight: 500,
    color: '#1f2937',
  },
  date: {
    fontSize: 8,
    color: '#64748b',
  },
  bullet: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#475569',
    marginBottom: 3,
  },
  list: {
    marginTop: 4,
    paddingLeft: 10,
  },
});

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const splitLines = (text?: string) =>
  text
    ? text
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
    : [];

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const SoftwarePDF = ({ resumeData, themeColor = '#2563eb' }: Props) => {
  const strengths = splitLines(resumeData.sections.find(section => section.id === 'strengths')?.content);
  const achievements = splitLines(resumeData.sections.find(section => section.id === 'achievements')?.content);
  const photo = resumeData.personalInfo.photo;
  const initials = (resumeData.personalInfo.fullName || '')
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const contactItems = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((item): item is string => Boolean(item));
  const skillsList = resumeData.skills.map(skill => skill.name).filter(Boolean).join(', ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View style={[styles.header, { borderBottomColor: themeColor }]}>
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
                {resumeData.personalInfo.title ? (
                  <>
                    <Text style={[styles.title, { color: themeColor }]}>{resumeData.personalInfo.title}</Text>
                    <View style={[styles.titleAccent, { backgroundColor: themeColor }]} />
                  </>
                ) : null}
                {contactItems.length > 0 && (
                  <View style={styles.contactRow}>
                    <Text style={styles.contactText}>{contactItems.join('  |  ')}</Text>
                  </View>
                )}
              </View>
              {(photo || initials) && (
                <View style={[styles.photoWrapper, { borderColor: themeColor }]}>
                  {photo ? (
                    <Image src={photo} style={styles.photo} />
                  ) : (
                    <Text style={[styles.initials, { color: themeColor }]}>{initials || 'SE'}</Text>
                  )}
                </View>
              )}
            </View>
          </View>

          {resumeData.personalInfo.summary ? (
            <View style={[styles.section, { borderLeftColor: themeColor }]}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Summary</Text>
              <Text style={styles.paragraph}>{resumeData.personalInfo.summary}</Text>
            </View>
          ) : null}

          <View style={[styles.sectionBreakable, { borderLeftColor: themeColor }]}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Professional Experience</Text>
            <View style={{ marginTop: 4 }}>
              {resumeData.experience.map(exp => {
                const bullets = splitLines(exp.description);
                return (
                  <View key={exp.id} style={styles.experienceBlock}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.date}>
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    <Text style={styles.company}>{exp.company}</Text>
                    {bullets.length > 0 && (
                      <View style={styles.list}>
                        {bullets.map((item, idx) => (
                          <Text key={`${exp.id}-${idx}`} style={styles.bullet}>
                            • {item.replace(/^•\s*/, '')}
                          </Text>
                        ))}
        )                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {resumeData.skills.length > 0 ? (
            <View style={[styles.section, { borderLeftColor: themeColor }]}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
              <Text style={styles.paragraph}>{skillsList}</Text>
            </View>
          ) : null}

          {achievements.length > 0 ? (
            <View style={[styles.section, { borderLeftColor: themeColor }]}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Achievements</Text>
              <View style={styles.list}>
                {achievements.map((item, idx) => (
                  <Text key={`achievement-${idx}`} style={styles.bullet}>
                    • {item}
                  </Text>
                ))}
        )              </View>
            </View>
          ) : null}

          {strengths.length > 0 ? (
            <View style={[styles.section, { borderLeftColor: themeColor }]}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Strengths</Text>
              <View style={styles.list}>
                {strengths.map((item, idx) => (
                  <Text key={`strength-${idx}`} style={styles.bullet}>
                    • {item}
                  </Text>
                ))}
        )              </View>
            </View>
          ) : null}

          {resumeData.education.length > 0 ? (
            <View style={[styles.sectionBreakable, { borderLeftColor: themeColor }]}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
              <View style={{ marginTop: 4 }}>
                {resumeData.education.map(edu => (
                  <View key={edu.id} style={styles.educationBlock}>
                    <Text style={styles.position}>{edu.degree}</Text>
                    <Text style={styles.company}>{edu.school}</Text>
                    {edu.field ? <Text style={styles.paragraph}>{edu.field}</Text> : null}
                    <Text style={styles.date}>
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
        )              </View>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};
