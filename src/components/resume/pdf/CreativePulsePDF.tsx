import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  contactInfo: {
    flexDirection: "row",
    gap: 15,
    fontSize: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    marginBottom: 2,
    color: "#555",
  },
  dates: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#333",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    padding: "6 12",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    fontSize: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  school: {
    fontSize: 10,
    color: "#555",
    marginBottom: 2,
  },
});

interface PDFTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const CreativePulsePDF = ({ resumeData, themeColor = "#2563eb" }: PDFTemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: themeColor }]}>
          <Text style={[styles.name, { color: themeColor }]}>{personalInfo.fullName}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{personalInfo.email}</Text>
            <Text>•</Text>
            <Text>{personalInfo.phone}</Text>
            {personalInfo.location && (
              <>
                <Text>•</Text>
                <Text>{personalInfo.location}</Text>
              </>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Professional Summary</Text>
            <Text style={styles.description}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.jobTitle, { color: themeColor }]}>{exp.position}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.dates}>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </Text>
                <Text style={styles.description}>
                  {exp.description.split("\n").filter(item => item.trim()).join(" • ")}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
            <View style={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}{edu.field ? ` - ${edu.field}` : ""}</Text>
                <Text style={styles.school}>{edu.school}</Text>
                <Text style={styles.dates}>{edu.startDate} - {edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Additional Sections */}
        {sections && sections.length > 0 && sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
            <Text style={styles.description}>{section.content}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default CreativePulsePDF;
