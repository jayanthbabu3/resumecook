#!/usr/bin/env python3
"""
Simple PDF regeneration script - fixes common mismatches
"""

import os
import re
from pathlib import Path

def extract_theme_color(ui_content):
    match = re.search(r'themeColor\s*=\s*["\']([#\w]+)["\']', ui_content)
    return match.group(1) if match else "#0891b2"

def analyze_template(ui_content):
    """Quick analysis of UI template features"""
    return {
        'theme_color': extract_theme_color(ui_content),
        'has_watermark': bool(re.search(r'watermark|opacity-5.*font-bold.*absolute', ui_content, re.DOTALL | re.I)),
        'has_sidebar': bool(re.search(r'w-\[(\d+)%\][^"]*(?:bg-gray|bg-slate)', ui_content)),
        'has_two_col_bottom': bool(re.search(r'grid\s+grid-cols-2', ui_content)),
        'has_title': 'personalInfo.title' in ui_content,
        'has_centered': bool(re.search(r'text-center[^>]*>.*personalInfo\.fullName', ui_content, re.DOTALL)),
        'has_social_links': bool(re.search(r'linkedin|github|portfolio', ui_content)),
        'name_size': int(m.group(1)) if (m := re.search(r'text-\[(\d+)px\][^>]*>.*personalInfo\.fullName', ui_content, re.DOTALL)) else 28,
    }

def read_template(name):
    """Read a template file for reference"""
    # Read the fixed watermark template as reference
    with open("src/components/resume/pdf/PDFWatermarkStyleUniversalTemplate.tsx") as f:
        return f.read()

def generate_pdf(template_name, features):
    """Generate PDF template based on features"""
    tc = features['theme_color']
    
    base = f'''import {{ Document, Page, Text, View, StyleSheet, Font, Link }} from "@react-pdf/renderer";
import {{ ResumeData }} from "@/pages/Editor";

Font.register({{
  family: "Inter",
  fonts: [
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" }},
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 }},
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 }},
  ]
}});

interface PDF{template_name}TemplateProps {{
  resumeData: ResumeData;
  themeColor?: string;
}}

const createStyles = (themeColor: string) => StyleSheet.create({{
  page: {{
    padding: 48,
    fontFamily: "Inter",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
    {"position: 'relative'," if features['has_watermark'] else ""}
  }},'''
    
    # Add watermark style if needed
    if features['has_watermark']:
        base += f'''
  watermark: {{
    position: "absolute",
    top: "25%",
    right: 40,
    fontSize: 120,
    fontWeight: 700,
    color: `${{themeColor}}0D`,
    opacity: 0.05,
  }},'''
    
    # Continue with styles
    base += f'''
  header: {{
    marginBottom: 40,
  }},
  name: {{
    fontSize: {features['name_size']},
    fontWeight: 700,
    color: themeColor,
    marginBottom: 8,
    {"textAlign: 'center'," if features['has_centered'] else ""}
  }},'''
    
    if features['has_title']:
        base += f'''
  title: {{
    fontSize: 15,
    color: "#374151",
    marginBottom: 20,
    {"textAlign: 'center'," if features['has_centered'] else ""}
  }},'''
    
    base += f'''
  contactInfo: {{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    fontSize: 12,
    color: "#6b7280",
    {"justifyContent: 'center'," if features['has_centered'] else ""}
  }},
  section: {{
    marginBottom: 40,
  }},
  sectionTitle: {{
    fontSize: 16,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 16,
  }},'''
    
    if features['has_two_col_bottom']:
        base += '''
  twoColumnGrid: {
    flexDirection: "row",
    gap: 40,
  },
  column: {
    flex: 1,
  },'''
    
    # Close styles
    base += '''
});

'''
    
    # Build JSX
    jsx_start = f'''export const PDF{template_name}Template = ({{
  resumeData,
  themeColor = "{tc}",
}}: PDF{template_name}TemplateProps) => {{
  const styles = createStyles(themeColor);'''
    
    if features['has_watermark']:
        jsx_start += '''
  const firstName = resumeData.personalInfo.fullName.split(' ')[0] || 'RESUME';'''
    
    jsx_start += '''

  return (
    <Document>
      <Page size="A4" style={styles.page}>'''
    
    if features['has_watermark']:
        jsx_start += '''
        <Text style={styles.watermark}>{firstName}</Text>

        <View style={{ position: "relative", zIndex: 10 }}>'''
    else:
        jsx_start += '''
        <View>'''
    
    jsx_start += '''
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>'''
    
    if features['has_title']:
        jsx_start += '''
            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            )}'''
    
    jsx_start += '''
            <View style={styles.contactInfo}>
              {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
              {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
              {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}'''
    
    if features['has_social_links']:
        jsx_start += '''
              {resumeData.personalInfo.linkedin && <Link src={resumeData.personalInfo.linkedin}><Text>{resumeData.personalInfo.linkedin}</Text></Link>}
              {resumeData.personalInfo.github && <Link src={resumeData.personalInfo.github}><Text>{resumeData.personalInfo.github}</Text></Link>}
              {resumeData.personalInfo.portfolio && <Link src={resumeData.personalInfo.portfolio}><Text>{resumeData.personalInfo.portfolio}</Text></Link>}'''
    
    jsx_start += '''
            </View>
          </View>

          {resumeData.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={{ fontSize: 13, lineHeight: 1.7, color: "#374151" }}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {resumeData.experience.map((exp, index) => {
                const bulletPoints = (exp.description || "").split("\\n").filter(Boolean);
                return (
                  <View key={index} style={{ marginBottom: 24 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>{exp.position}</Text>
                        <Text style={{ fontSize: 13, color: "#374151" }}>{exp.company}</Text>
                      </View>
                      <Text style={{ fontSize: 11, color: "#6b7280" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                    </View>
                    {bulletPoints.length > 0 && (
                      <View style={{ marginLeft: 20, marginTop: 8 }}>
                        {bulletPoints.map((point, i) => (
                          <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#374151", marginRight: 8, marginTop: 6 }} />
                            <Text style={{ flex: 1, fontSize: 12.5, lineHeight: 1.7, color: "#374151" }}>{point}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

'''
    
    # Education & Skills section
    if features['has_two_col_bottom']:
        jsx_start += '''          <View style={styles.twoColumnGrid}>
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resumeData.education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </Text>
                    <Text style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}>{edu.school}</Text>
                    <Text style={{ fontSize: 11, color: "#6b7280" }}>{edu.startDate} - {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}

            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                  {resumeData.skills.map((skill, index) => (
                    <Text key={index} style={{ fontSize: 13, color: "#111827", marginRight: 4 }}>{skill.name}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
'''
    else:
        jsx_start += '''          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}>{edu.school}</Text>
                  <Text style={{ fontSize: 11, color: "#6b7280" }}>{edu.startDate} - {edu.endDate}</Text>
                </View>
              ))}
            </View>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={{ fontSize: 13, color: "#111827", marginRight: 4 }}>{skill.name}</Text>
                ))}
              </View>
            </View>
          )}
'''
    
    # Close JSX
    jsx_start += '''          {resumeData.sections && resumeData.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={{ fontSize: 13, lineHeight: 1.7, color: "#374151" }}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
'''
    
    return base + jsx_start

# Main execution
ui_dir = Path("src/components/resume/templates")
pdf_dir = Path("src/components/resume/pdf")

ui_files = sorted(ui_dir.glob("*Template.tsx"))

print("=" * 80)
print(f"REGENERATING {len(ui_files)} PDF TEMPLATES")
print("=" * 80)
print()

for i, ui_file in enumerate(ui_files, 1):
    template_name = ui_file.stem.replace('Template', '')
    pdf_path = pdf_dir / f"PDF{template_name}Template.tsx"
    
    try:
        with open(ui_file) as f:
            ui_content = f.read()
        
        features = analyze_template(ui_content)
        pdf_content = generate_pdf(template_name, features)
        
        with open(pdf_path, 'w') as f:
            f.write(pdf_content)
        
        print(f"[{i:3d}/{len(ui_files)}] {template_name:50s} ✓")
        
    except Exception as e:
        print(f"[{i:3d}/{len(ui_files)}] {template_name:50s} ERROR: {e}")

print()
print("=" * 80)
print("✅ COMPLETED!")
print("=" * 80)
