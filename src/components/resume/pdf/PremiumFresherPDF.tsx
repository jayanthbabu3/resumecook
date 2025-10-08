import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Svg,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";

interface IconProps {
  color: string;
}

const MailIcon = ({ color }: IconProps) => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m22 6-10 7L2 6"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = ({ color }: IconProps) => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MapPinIcon = ({ color }: IconProps) => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = ({ color }: IconProps) => (
  <Svg width={9} height={9} viewBox="0 0 24 24">
    <Path
      d="M6 2v4M18 2v4M4 8h16"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <Path
      d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const StarIcon = ({ color }: IconProps) => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="m12 3 2.9 6.3 6.9.6-5.2 4.7 1.5 6.8L12 17.8 5.9 21.4l1.5-6.8-5.2-4.7 6.9-.6L12 3Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const CapIcon = ({ color }: IconProps) => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="M22 10 12 5 2 10l10 5 10-5Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M6 12v5c2 1 4 2 6 2s4-1 6-2v-5"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const AwardIcon = ({ color }: IconProps) => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="M8.7 16.7 8 23l4-2 4 2-.7-6.3"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M12 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const CodeIcon = ({ color }: IconProps) => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const BriefcaseIcon = ({ color }: IconProps) => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="M4 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m-6 5h20"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    color: "#1f2937",
    backgroundColor: "#ffffff",
    paddingHorizontal: 44,
    paddingVertical: 36,
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    position: "relative",
    marginHorizontal: -44,
    marginTop: -36,
    paddingHorizontal: 44,
    paddingTop: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
  },
  headerContent: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
    paddingRight: 32,
  },
  name: {
    fontSize: 27,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: -0.6,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleAccent: {
    width: 50,
    height: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: "#475569",
  },
  contactList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  iconBadge: {
    width: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: "#f3f4ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  contactText: {
    fontSize: 9.5,
    color: "#475569",
  },
  photoWrapper: {
    width: 84,
    height: 84,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: "#ffffff",
    overflow: "hidden",
    backgroundColor: "#f5f3ff",
    shadowColor: "#111827",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  initials: {
    fontSize: 22,
    fontWeight: 700,
    color: "#4338ca",
  },
  summaryCard: {
    position: "relative",
    marginTop: 26,
    marginBottom: 15,
    overflow: "hidden",
    borderColor: "#e0e7ff",
  },
  summaryContent: {
    position: "relative"
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#475569",
  },
  mainContent: {
    flexDirection: "row",
  },
  sidebar: {
    width: "35%",
    paddingRight: 20,
  },
  mainColumn: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
  },
  educationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },
  degree: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0f172a",
  },
  field: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 4,
  },
  school: {
    fontSize: 11,
    fontWeight: 600,
    color: "#4338ca",
    marginTop: 6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dateText: {
    fontSize: 9,
    color: "#64748b",
  },
  skillsGrid: {
    flexDirection: "column",
  },
  skillCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e7ff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  skillName: {
    fontSize: 11,
    fontWeight: 600,
    color: "#1e1b4b",
  },
  skillMeta: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 20,
    marginBottom: 14,
    position: "relative",
    overflow: "hidden",
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  company: {
    fontSize: 11,
    fontWeight: 600,
    color: "#4338ca",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 10.5,
    lineHeight: 1.6,
    color: "#475569",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#f3f4ff",
    color: "#4338ca",
    fontSize: 9,
    fontWeight: 600,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 10,
    color: "#4338ca",
    width: 10,
  },
  bulletText: {
    fontSize: 10.5,
    color: "#475569",
    lineHeight: 1.5,
    flex: 1,
  },
});

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
};

const splitLines = (text?: string) =>
  text
    ? text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const PremiumFresherPDF = ({
  resumeData,
  themeColor = "#7C3AED",
}: Props) => {
  const photo = resumeData.personalInfo.photo;
  const initials =
    (resumeData.personalInfo.fullName || "")
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PF";

  const contactItems = [
    resumeData.personalInfo.email && {
      key: "email",
      text: resumeData.personalInfo.email,
      Icon: MailIcon,
    },
    resumeData.personalInfo.phone && {
      key: "phone",
      text: resumeData.personalInfo.phone,
      Icon: PhoneIcon,
    },
    resumeData.personalInfo.location && {
      key: "location",
      text: resumeData.personalInfo.location,
      Icon: MapPinIcon,
    },
  ].filter(Boolean) as Array<{ key: string; text: string; Icon: typeof MailIcon }>;

  const achievementSections = resumeData.sections.filter((section) =>
    section.title.toLowerCase().includes("achievement") ||
    section.title.toLowerCase().includes("award")
  );
  const projectSections = resumeData.sections.filter(
    (section) =>
      !section.title.toLowerCase().includes("achievement") &&
      !section.title.toLowerCase().includes("award")
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Svg style={styles.absoluteFill}>
            <Defs>
              <LinearGradient id="headerGradient" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor={themeColor} stopOpacity={0.35} />
                <Stop offset="60%" stopColor={themeColor} stopOpacity={0.12} />
                <Stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#headerGradient)" />
          </Svg>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>
                {resumeData.personalInfo.fullName || "Your Name"}
              </Text>
              {resumeData.personalInfo.title && (
                <View style={styles.titleRow}>
                  <View
                    style={[styles.titleAccent, { backgroundColor: themeColor }]}
                  />
                  <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
                </View>
              )}
              <View style={styles.contactList}>
                {contactItems.map(({ key, text, Icon }) => (
                  <View key={key} style={styles.contactItem}>
                    <View style={styles.iconBadge}>
                      <Icon color={themeColor} />
                    </View>
                    <Text style={styles.contactText}>{text}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.photoWrapper}>
              {photo ? (
                <Image src={photo} style={styles.photo} />
              ) : (
                <Text style={styles.initials}>{initials}</Text>
              )}
            </View>
          </View>
        </View>

        {resumeData.personalInfo.summary && (
          <View style={styles.summaryCard}>
            <Svg style={styles.absoluteFill}>
              <Defs>
                <LinearGradient id="summaryGradient" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0%" stopColor={themeColor} stopOpacity={0.22} />
                  <Stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#summaryGradient)" />
            </Svg>
            <View style={styles.summaryContent}>
              <View style={styles.summaryHeader}>
                <View style={styles.iconBadge}>
                  <StarIcon color={themeColor} />
                </View>
                <Text style={styles.summaryTitle}>Professional Summary</Text>
              </View>
              <Text style={styles.summaryText}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.mainContent}>
          <View style={styles.sidebar}>
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.iconBadge}>
                    <CapIcon color={themeColor} />
                  </View>
                  <Text style={styles.sectionTitle}>Education</Text>
                </View>
                {resumeData.education.map((edu) => (
                  <View key={edu.id} style={styles.educationCard}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {edu.field && <Text style={styles.field}>{edu.field}</Text>}
                    <Text style={styles.school}>{edu.school}</Text>
                    <View style={styles.dateRow}>
                      <CalendarIcon color={themeColor} />
                      <Text style={styles.dateText}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.iconBadge}>
                    <CodeIcon color={themeColor} />
                  </View>
                  <Text style={styles.sectionTitle}>Technical Skills</Text>
                </View>
                <View style={styles.skillsGrid}>
                  {resumeData.skills.map((skill) => (
                    <View key={skill.id} style={styles.skillCard}>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      {typeof skill.level === "number" && (
                        <Text style={styles.skillMeta}>
                          Proficiency: {skill.level}/10
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {achievementSections.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.iconBadge}>
                    <AwardIcon color={themeColor} />
                  </View>
                  <Text style={styles.sectionTitle}>Achievements</Text>
                </View>
                {achievementSections.map((section) => (
                  <View key={section.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{section.title}</Text>
                    {splitLines(section.content).map((line, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.mainColumn}>
            {projectSections.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.iconBadge}>
                    <CodeIcon color={themeColor} />
                  </View>
                  <Text style={styles.sectionTitle}>Projects & Portfolio</Text>
                </View>
                {projectSections.map((section) => (
                  <View key={section.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{section.title}</Text>
                    {splitLines(section.content).map((line, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.iconBadge}>
                    <BriefcaseIcon color={themeColor} />
                  </View>
                  <Text style={styles.sectionTitle}>Experience & Internships</Text>
                </View>
                {resumeData.experience.map((exp) => (
                  <View key={exp.id} style={styles.card}>
                    <View style={styles.experienceHeader}>
                      <View>
                        <Text style={styles.cardTitle}>{exp.position}</Text>
                        <Text style={[styles.company, { color: themeColor }]}>
                          {exp.company}
                        </Text>
                      </View>
                      <Text style={styles.badge}>
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {splitLines(exp.description).map((line, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
