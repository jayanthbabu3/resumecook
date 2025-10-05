import { Document, Page, View, Text, StyleSheet, Image, Svg, Circle } from '@react-pdf/renderer';
import type { ResumeData } from '@/pages/Editor';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#0f172a',
    backgroundColor: '#f3f4f6',
    paddingVertical: 24,
    paddingHorizontal: 22,
    gap: 8,
  },
  leftColumn: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  rightColumn: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
  },
  headerName: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 8,
    letterSpacing: 1.2,
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 10,
  },
  photoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#ffffff',
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 10,
  },
  initialsCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  initialsText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1d4ed8',
  },
  contactBadge: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 8,
    color: '#475569',
    marginBottom: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: 'capitalize',
    letterSpacing: 1.5,
    color: '#475569',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#475569',
  },
  skillRow: {
    marginBottom: 6,
  },
  skillLabel: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
  },
  skillFill: {
    height: '100%',
    borderRadius: 3,
  },
  highlightText: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.4,
    marginBottom: 3,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
  },
  companyText: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 3,
  },
  dateText: {
    fontSize: 8,
    color: '#6b7280',
  },
  bulletList: {
    marginTop: 4,
    marginLeft: 6,
  },
  bulletItem: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#1f2937',
    marginBottom: 3,
  },
  toolboxChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  chip: {
    fontSize: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
  },
  metricRingWrapper: {
    width: 36,
    height: 36,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  metricRingLabel: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: 700,
    color: '#1f2937',
  },
  metricValuePill: {
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 6,
    paddingVertical: 3,
    maxWidth: 60,
  },
  metricValueText: {
    fontSize: 7,
    fontWeight: 600,
    color: '#1f2937',
    textAlign: 'center',
  },
});

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const SeniorBackendPDF = ({ resumeData, themeColor = '#2563eb' }: Props) => {
  const accent = themeColor;
  const photo = resumeData.personalInfo.photo;
  const initials = (resumeData.personalInfo.fullName || '')
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const coreSkills = resumeData.skills.filter(skill => skill.category !== 'toolbox');
  const toolboxSkills = resumeData.skills.filter(skill => skill.category === 'toolbox');
  const coreSource = coreSkills.length ? coreSkills : resumeData.skills;
  const skillLevels = coreSource.map((skill, index) => {
    const name = skill.name || `Skill ${index + 1}`;
    const rawLevel = skill.level ?? Math.max(7 - index, 5);
    const level = Math.min(100, Math.round((rawLevel / 10) * 100));
    return { id: skill.id, name, level, index };
  });

  const impactSection = (resumeData.sections || []).find(section => section.id === 'impact');
  const initiativeSection = (resumeData.sections || []).find(section => section.id === 'initiatives');
  const otherSections = (resumeData.sections || []).filter(
    section => section.id !== 'impact' && section.id !== 'initiatives'
  );

  const impactMetrics = (impactSection?.content || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [rawLabel, rawValue] = line.split(/\s+-\s+/);
      const label = rawLabel?.trim() || line;
      const value = rawValue?.trim();
      const percentMatch = value?.match(/([0-9]+(?:\.[0-9]+)?)%/);
      const percentValue = percentMatch ? Math.min(100, Number(percentMatch[1])) : undefined;
      const descriptor = percentMatch && value
        ? value.replace(percentMatch[0], '').replace(/^[–—-]\s*/, '').trim()
        : value;
      const shortValue = percentValue !== undefined
        ? `${Math.round(percentValue)}%`
        : value?.split(' ').slice(0, 2).join(' ');
      return { label, value, percent: percentValue, descriptor, shortValue };
    });

  const initiativeItems = (initiativeSection?.content || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
          <View style={[styles.card, { marginBottom: 6, alignItems: 'center' }]}>
            {photo ? (
              <View style={styles.photoWrapper}>
                <Image src={photo} style={{ width: 90, height: 90, borderRadius: 45 }} />
              </View>
            ) : (
              <View style={styles.initialsCircle}>
                <Text style={styles.initialsText}>{initials || 'BE'}</Text>
              </View>
            )}
            <Text style={styles.headerName}>{resumeData.personalInfo.fullName || 'Your Name'}</Text>
            <Text style={styles.headerTitle}>{resumeData.personalInfo.title || 'Senior Backend Engineer'}</Text>

            {resumeData.personalInfo.email && (
              <Text style={styles.contactBadge}>{resumeData.personalInfo.email}</Text>
            )}
            {resumeData.personalInfo.phone && (
              <Text style={styles.contactBadge}>{resumeData.personalInfo.phone}</Text>
            )}
            {resumeData.personalInfo.location && (
              <Text style={styles.contactBadge}>{resumeData.personalInfo.location}</Text>
            )}
          </View>

          {resumeData.personalInfo.summary && (
            <View style={[styles.card, { marginBottom: 6 }] }>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {impactMetrics.length > 0 && (
            <View style={[styles.card, { marginBottom: 6 }]}>
              <Text style={styles.sectionTitle}>Impact Metrics</Text>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {impactMetrics.map((metric, index) => {
                  const normalized = metric.percent !== undefined ? Math.max(0, Math.min(100, metric.percent)) : undefined;
                  const circumference = 2 * Math.PI * 15;
                  const dashOffset = normalized !== undefined ? circumference * (1 - normalized / 100) : 0;

                  return (
                    <View
                      key={`${metric.label}-${index}`}
                      style={{
                        borderWidth: 1,
                        borderColor: '#e2e8f0',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        backgroundColor: '#f8fafc',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 8, letterSpacing: 1, color: '#64748b', textTransform: 'uppercase' }}>
                          {metric.label}
                        </Text>
                        {metric.descriptor && (
                          <Text style={{ fontSize: 8, color: '#475569', marginTop: 2 }}>
                            {metric.descriptor}
                          </Text>
                        )}
                      </View>
                      {normalized !== undefined ? (
                        <View style={styles.metricRingWrapper}>
                          <Svg width={36} height={36} viewBox="0 0 36 36">
                            <Circle cx={18} cy={18} r={15} stroke="#e2e8f0" strokeWidth={3} fill="none" />
                            <Circle
                              cx={18}
                              cy={18}
                              r={15}
                              stroke={accent}
                              strokeWidth={3}
                              fill="none"
                              strokeDasharray={`${circumference} ${circumference}`}
                              strokeDashoffset={dashOffset}
                              strokeLinecap="round"
                              transform="rotate(-90 18 18)"
                            />
                          </Svg>
                          <Text style={styles.metricRingLabel}>{`${Math.round(normalized)}%`}</Text>
                        </View>
                      ) : metric.shortValue ? (
                        <View style={[styles.metricValuePill, { borderColor: accent }] }>
                          <Text style={styles.metricValueText}>{metric.shortValue}</Text>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {skillLevels.length > 0 && (
            <View style={[styles.card, { marginBottom: 6 }]}>
              <Text style={styles.sectionTitle}>Systems Stack</Text>
              {skillLevels.map(({ id, name, level, index }) => (
                <View key={id || `${name}-${index}`} style={styles.skillRow}>
                  <View style={styles.skillLabel}>
                    <Text>{name}</Text>
                    <Text>{level}%</Text>
                  </View>
                  <View style={styles.skillTrack}>
                    <View style={[styles.skillFill, { width: `${level}%`, backgroundColor: accent }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {otherSections.length > 0 && (
            <View style={[styles.card, { marginBottom: 6 }]}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              {otherSections.map(section => (
                <View key={section.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 9, fontWeight: 600, marginBottom: 2 }}>{section.title}</Text>
                  <Text style={styles.highlightText}>{section.content}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.rightColumn}>
          {resumeData.experience.length > 0 && (
            <View style={[styles.card, { marginBottom: 6 }]}>
              <Text style={[styles.sectionTitle, { color: '#0f172a' }]}>Professional Experience</Text>
              {resumeData.experience.map(exp => (
                <View key={exp.id} style={{ marginBottom: 10 }} wrap={false}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.experienceTitle}>{exp.position || 'Role'}</Text>
                      <Text style={styles.companyText}>{exp.company || 'Company'}</Text>
                    </View>
                    <Text style={styles.dateText}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {exp.description && (
                    <View style={styles.bulletList}>
                      {exp.description.split('\n').map((line, idx) => (
                        <Text key={idx} style={styles.bulletItem}>
                          • {line.replace(/^•\s*/, '')}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {toolboxSkills.length > 0 && (
            <View style={[styles.card, { marginBottom: 6 }]}>
              <Text style={[styles.sectionTitle, { color: '#0f172a' }]}>Toolbox</Text>
              <View style={styles.toolboxChips}>
                {toolboxSkills.map(skill => (
                  <Text key={skill.id} style={styles.chip}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {initiativeItems.length > 0 && (
            <View style={[styles.card, { marginBottom: 6 }]}>
              <Text style={[styles.sectionTitle, { color: '#0f172a' }]}>Strategic Initiatives</Text>
              <View style={{ marginLeft: 6, marginTop: 4 }}>
                {initiativeItems.map((item, index) => (
                  <Text key={index} style={styles.highlightText}>
                    • {item.replace(/^•\s*/, '')}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {resumeData.education.length > 0 && (
            <View style={[styles.card, { marginBottom: 6 }]}>
              <Text style={[styles.sectionTitle, { color: '#0f172a' }]}>Education</Text>
              {resumeData.education.map(edu => (
                <View key={edu.id} style={{ marginBottom: 10 }} wrap={false}>
                  <Text style={styles.experienceTitle}>{edu.degree || 'Degree'}</Text>
                  {edu.field && <Text style={styles.companyText}>{edu.field}</Text>}
                  <Text style={styles.companyText}>{edu.school || 'School'}</Text>
                  <Text style={styles.dateText}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
