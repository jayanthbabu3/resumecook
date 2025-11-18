#!/usr/bin/env python3
"""
Comprehensive script to regenerate ALL PDF templates to match their UI counterparts exactly.
Analyzes each UI template's specific layout features and generates matching PDFs.
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Optional

def extract_theme_color(ui_content: str) -> str:
    """Extract the default theme color from UI template"""
    match = re.search(r'themeColor\s*=\s*["\']([#\w]+)["\']', ui_content)
    if match:
        return match.group(1)
    return "#0891b2"

def analyze_ui_layout(ui_content: str, template_name: str) -> Dict:
    """Analyze UI template and extract detailed layout information"""

    structure = {
        'theme_color': extract_theme_color(ui_content),
        'layout_type': 'standard',
        'has_watermark': False,
        'has_sidebar': False,
        'sidebar_width': None,
        'has_two_columns': False,
        'has_grid_layout': False,
        'header_alignment': 'left',
        'header_has_bg': False,
        'header_bg_gradient': False,
        'has_title_field': False,
        'has_border_bottom': False,
        'has_border_left': False,
        'has_rounded_header': False,
        'name_size': 28,
        'title_size': 15,
        'section_title_size': 16,
        'has_social_links': False,
        'skills_as_chips': False,
        'skills_as_text': False,
        'experience_timeline': False,
        'bottom_two_columns': False,
    }

    # Detect watermark
    if re.search(r'absolute.*watermark|opacity-5.*font-bold', ui_content, re.DOTALL):
        structure['has_watermark'] = True

    # Detect sidebar
    sidebar_match = re.search(r'className="w-\[(\d+)%\][^"]*(?:bg-gray|bg-slate|bg-\w+-\d+)', ui_content)
    if sidebar_match:
        structure['has_sidebar'] = True
        structure['layout_type'] = 'sidebar'
        structure['sidebar_width'] = int(sidebar_match.group(1))

    # Detect two-column grid layout
    if re.search(r'grid\s+grid-cols-2', ui_content):
        structure['has_two_columns'] = True
        # Check if it's at the bottom (for education & skills)
        if re.search(r'Education.*grid\s+grid-cols-2|grid\s+grid-cols-2.*Education', ui_content, re.DOTALL):
            structure['bottom_two_columns'] = True

    # Detect header alignment
    if re.search(r'text-center[^>]*>.*personalInfo\.fullName', ui_content, re.DOTALL):
        structure['header_alignment'] = 'center'

    # Detect header background
    if re.search(r'bg-(?:gradient|gray|slate|blue|indigo|purple|pink)', ui_content):
        if 'header' in ui_content.lower() or re.search(r'className="[^"]*bg-\w+[^"]*>.*personalInfo\.fullName', ui_content, re.DOTALL):
            structure['header_has_bg'] = True

    if re.search(r'bg-gradient', ui_content):
        structure['header_bg_gradient'] = True

    # Detect professional title field
    if 'personalInfo.title' in ui_content:
        structure['has_title_field'] = True

    # Detect border styles
    if re.search(r'border-b(?:-\d+)?', ui_content):
        structure['has_border_bottom'] = True

    if re.search(r'border-l(?:-\d+)?[^>]*experience', ui_content, re.I):
        structure['has_border_left'] = True
        structure['experience_timeline'] = True

    # Detect rounded header
    if re.search(r'rounded-(?:lg|xl|2xl|3xl)', ui_content):
        structure['has_rounded_header'] = True

    # Detect name size
    name_size_match = re.search(r'text-\[(\d+)px\][^>]*>.*personalInfo\.fullName', ui_content, re.DOTALL)
    if name_size_match:
        structure['name_size'] = int(name_size_match.group(1))

    # Detect social links
    if 'linkedin' in ui_content or 'github' in ui_content or 'portfolio' in ui_content:
        structure['has_social_links'] = True

    # Detect skill chips vs plain text
    if re.search(r'px-\d+\s+py-\d+.*skill|skill.*px-\d+\s+py-\d+', ui_content, re.DOTALL):
        structure['skills_as_chips'] = True
    else:
        structure['skills_as_text'] = True

    return structure

def generate_matching_pdf(template_name: str, structure: Dict) -> str:
    """Generate PDF template that matches the UI structure"""

    theme_color = structure['theme_color']

    # Build styles based on structure
    styles_dict = {
        'page': f'''{{
    padding: {'32' if structure['has_sidebar'] else '48'},
    fontFamily: "Inter",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
    {'position: "relative",' if structure['has_watermark'] else ''}
    {'flexDirection: "row",' if structure['has_sidebar'] else ''}
  }}''',
    }

    # Add watermark style if needed
    if structure['has_watermark']:
        styles_dict['watermark'] = f'''{{
    position: "absolute",
    top: "25%",
    right: 40,
    fontSize: 120,
    fontWeight: 700,
    color: "{theme_color}0D",
    opacity: 0.05,
  }}'''

    # Add sidebar styles
    if structure['has_sidebar']:
        sidebar_width = structure.get('sidebar_width', 30)
        main_width = 100 - sidebar_width
        styles_dict['sidebar'] = f'''{{
    width: "{sidebar_width}%",
    backgroundColor: "#f9fafb",
    padding: 24,
    borderRight: "3px solid {theme_color}",
  }}'''
        styles_dict['mainContent'] = f'''{{
    width: "{main_width}%",
    padding: 32,
  }}'''

    # Build header styles
    header_styles = []
    if structure['header_has_bg']:
        header_styles.append(f'backgroundColor: "{theme_color}"')
        header_styles.append('padding: 32')
        header_styles.append('marginBottom: 32')
    else:
        header_styles.append('marginBottom: 40')

    if structure['has_rounded_header']:
        header_styles.append('borderRadius: 8')

    if structure['has_border_bottom']:
        header_styles.append(f'borderBottom: "2px solid {theme_color}"')
        header_styles.append('paddingBottom: 20')

    styles_dict['header'] = '{{\n    ' + ',\n    '.join(header_styles) + ',\n  }}'

    # Name style
    name_color = '#ffffff' if structure['header_has_bg'] else theme_color
    styles_dict['name'] = f'''{{
    fontSize: {structure['name_size']},
    fontWeight: 700,
    color: "{name_color}",
    marginBottom: 8,
    textAlign: "{structure['header_alignment']}",
  }}'''

    # Title style
    if structure['has_title_field']:
        title_color = '#f3f4f6' if structure['header_has_bg'] else '#374151'
        styles_dict['title'] = f'''{{
    fontSize: {structure['title_size']},
    color: "{title_color}",
    marginBottom: 20,
    textAlign: "{structure['header_alignment']}",
  }}'''

    # Contact info style
    contact_color = '#e5e7eb' if structure['header_has_bg'] else '#6b7280'
    styles_dict['contactInfo'] = f'''{{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    fontSize: 12,
    color: "{contact_color}",
    {'justifyContent: "center",' if structure['header_alignment'] == 'center' else ''}
  }}'''

    # Section styles
    styles_dict['section'] = f'''{{
    marginBottom: 40,
  }}'''

    styles_dict['sectionTitle'] = f'''{{
    fontSize: {structure['section_title_size']},
    fontWeight: 700,
    color: "{theme_color}",
    marginBottom: 16,
  }}'''

    # Experience styles
    exp_styles = []
    if structure['experience_timeline']:
        exp_styles.append(f'borderLeft: "3px solid {theme_color}"')
        exp_styles.append('paddingLeft: 16')

    exp_styles.append('marginBottom: 24')

    styles_dict['experienceItem'] = '{{\n    ' + ',\n    '.join(exp_styles) + ',\n  }}'

    # Skills styles
    if structure['skills_as_chips']:
        styles_dict['skillChip'] = f'''{{
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    border: "1.5px solid {theme_color}33",
    backgroundColor: "{theme_color}15",
    marginRight: 8,
    marginBottom: 6,
  }}'''

    # Two-column grid
    if structure['has_two_columns'] or structure['bottom_two_columns']:
        styles_dict['twoColumnGrid'] = '''{{
    flexDirection: "row",
    gap: 40,
  }}'''
        styles_dict['column'] = '''{{
    flex: 1,
  }}'''

    # Build styles string
    styles_code = "const createStyles = (themeColor: string) => StyleSheet.create({\n"
    for key, value in styles_dict.items():
        styles_code += f"  {key}: {value},\n"
    styles_code += "});"

    # Generate component code
    imports = '''import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 },
  ]
});

interface PDF{template_name}TemplateProps {{
  resumeData: ResumeData;
  themeColor?: string;
}}'''

    # Build JSX based on layout
    if structure['has_sidebar']:
        jsx = generate_sidebar_jsx(template_name, structure)
    elif structure['has_watermark']:
        jsx = generate_watermark_jsx(template_name, structure)
    else:
        jsx = generate_standard_jsx(template_name, structure)

    return f'''{imports}

{styles_code}

{jsx}
'''

def generate_watermark_jsx(template_name: str, structure: Dict) -> str:
    """Generate JSX for watermark layout"""
    theme_color = structure['theme_color']

    # Build title field conditionally
    title_field = ""
    if structure['has_title_field']:
        title_field = '''            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            )}
'''

    return f'''export const PDF{template_name}Template = ({{
  resumeData,
  themeColor = "{theme_color}",
}}: PDF{template_name}TemplateProps) => {{
  const styles = createStyles(themeColor);
  const firstName = resumeData.personalInfo.fullName.split(' ')[0] || 'RESUME';

  return (
    <Document>
      <Page size="A4" style={{styles.page}}>
        <Text style={{styles.watermark}}>{{firstName}}</Text>

        <View style={{{{ position: "relative", zIndex: 10 }}}}>
          <View style={{styles.header}}>
            <Text style={{styles.name}}>{{resumeData.personalInfo.fullName}}</Text>
{title_field}            <View style={{styles.contactInfo}}>
              {{resumeData.personalInfo.email && <Text>{{resumeData.personalInfo.email}}</Text>}}
              {{resumeData.personalInfo.phone && <Text>{{resumeData.personalInfo.phone}}</Text>}}
              {{resumeData.personalInfo.location && <Text>{{resumeData.personalInfo.location}}</Text>}}
            </View>
          </View>

          {{resumeData.personalInfo.summary && (
            <View style={{styles.section}}>
              <Text style={{styles.sectionTitle}}>Professional Summary</Text>
              <Text style={{{{ fontSize: 13, lineHeight: 1.7, color: "#374151" }}}}>{{resumeData.personalInfo.summary}}</Text>
            </View>
          )}}

          {{resumeData.experience && resumeData.experience.length > 0 && (
            <View style={{styles.section}}>
              <Text style={{styles.sectionTitle}}>Professional Experience</Text>
              {{resumeData.experience.map((exp, index) => {{
                const bulletPoints = (exp.description || "").split("\\n").filter(Boolean);
                return (
                  <View key={{index}} style={{styles.experienceItem}}>
                    <View style={{{{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}}}>
                      <View style={{{{ flex: 1 }}}}>
                        <Text style={{{{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}}}>{{exp.position}}</Text>
                        <Text style={{{{ fontSize: 13, color: "#374151" }}}}>{{exp.company}}</Text>
                      </View>
                      <Text style={{{{ fontSize: 11, color: "#6b7280" }}}}>{{exp.startDate}} - {{exp.current ? "Present" : exp.endDate}}</Text>
                    </View>
                    {{bulletPoints.length > 0 && (
                      <View style={{{{ marginLeft: 20, marginTop: 8 }}}}>
                        {{bulletPoints.map((point, i) => (
                          <View key={{i}} style={{{{ flexDirection: "row", marginBottom: 4 }}}}>
                            <View style={{{{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#374151", marginRight: 8, marginTop: 6 }}}} />
                            <Text style={{{{ flex: 1, fontSize: 12.5, lineHeight: 1.7, color: "#374151" }}}}>{{point}}</Text>
                          </View>
                        ))}}
                      </View>
                    )}}
                  </View>
                );
              }})}}
            </View>
          )}}

{_build_education_skills_section(structure)}
        </View>
      </Page>
    </Document>
  );
}};'''

def generate_sidebar_jsx(template_name: str, structure: Dict) -> str:
    """Generate JSX for sidebar layout (existing implementation is good)"""
    theme_color = structure['theme_color']
    return f'''export const PDF{template_name}Template = ({{
  resumeData,
  themeColor = "{theme_color}",
}}: PDF{template_name}TemplateProps) => {{
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={{styles.page}}>
        <View style={{styles.sidebar}}>
          <View style={{{{ marginBottom: 24 }}}}>
            <View style={{{{ flexDirection: "row", flexWrap: "wrap", gap: 8, fontSize: 10, color: "#6b7280" }}}}>
              {{resumeData.personalInfo.email && <Text>{{resumeData.personalInfo.email}}</Text>}}
              {{resumeData.personalInfo.phone && <Text>{{resumeData.personalInfo.phone}}</Text>}}
              {{resumeData.personalInfo.location && <Text>{{resumeData.personalInfo.location}}</Text>}}
            </View>
          </View>

          {{resumeData.skills && resumeData.skills.length > 0 && (
            <View style={{{{ marginBottom: 24 }}}}>
              <Text style={{{{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}}}>Skills</Text>
              {{resumeData.skills.map((skill, index) => (
                <Text key={{index}} style={{{{ fontSize: 11, color: "#374151", marginBottom: 6 }}}}>• {{skill.name}}</Text>
              ))}}
            </View>
          )}}

          {{resumeData.education && resumeData.education.length > 0 && (
            <View>
              <Text style={{{{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}}}>Education</Text>
              {{resumeData.education.map((edu, index) => (
                <View key={{index}} style={{{{ marginBottom: 16 }}}}>
                  <Text style={{{{ fontSize: 11, fontWeight: 600, color: "#111827", marginBottom: 3 }}}}>{{edu.degree}} {{edu.field && `in ${{edu.field}}`}}</Text>
                  <Text style={{{{ fontSize: 10, color: "#374151", marginBottom: 2 }}}}>{{edu.school}}</Text>
                  <Text style={{{{ fontSize: 9, color: "#6b7280" }}}}>{{edu.startDate}} - {{edu.endDate}}</Text>
                </View>
              ))}}
            </View>
          )}}
        </View>

        <View style={{styles.mainContent}}>
          <View style={{{{ marginBottom: 24 }}}}>
            <Text style={{{{ fontSize: 32, fontWeight: 700, color: "{theme_color}", marginBottom: 8 }}}}>{{resumeData.personalInfo.fullName}}</Text>
          </View>

          {{resumeData.personalInfo.summary && (
            <View style={{{{ marginBottom: 24 }}}}>
              <Text style={{{{ fontSize: 13, fontWeight: 700, color: "{theme_color}", marginBottom: 12 }}}}>Professional Summary</Text>
              <Text style={{{{ fontSize: 11, lineHeight: 1.7, color: "#374151" }}}}>{{resumeData.personalInfo.summary}}</Text>
            </View>
          )}}

          {{resumeData.experience && resumeData.experience.length > 0 && (
            <View>
              <Text style={{{{ fontSize: 13, fontWeight: 700, color: "{theme_color}", marginBottom: 12 }}}}>Professional Experience</Text>
              {{resumeData.experience.map((exp, index) => {{
                const bulletPoints = (exp.description || "").split("\\n").filter(Boolean);
                return (
                  <View key={{index}} style={{{{ marginBottom: 20 }}}}>
                    <View style={{{{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}}}>
                      <View style={{{{ flex: 1 }}}}>
                        <Text style={{{{ fontSize: 12, fontWeight: 600, color: "#111827", marginBottom: 3 }}}}>{{exp.position}}</Text>
                        <Text style={{{{ fontSize: 11, fontWeight: 500, color: "{theme_color}" }}}}>{{exp.company}}</Text>
                      </View>
                      <Text style={{{{ fontSize: 9, color: "#6b7280" }}}}>{{exp.startDate}} - {{exp.current ? "Present" : exp.endDate}}</Text>
                    </View>
                    {{bulletPoints.length > 0 && (
                      <View style={{{{ marginTop: 6, marginLeft: 16 }}}}>
                        {{bulletPoints.map((point, i) => (
                          <View key={{i}} style={{{{ flexDirection: "row", marginBottom: 4 }}}}>
                            <View style={{{{ width: 4, height: 4, borderRadius: 2, backgroundColor: "{theme_color}", marginRight: 8, marginTop: 5 }}}} />
                            <Text style={{{{ flex: 1, fontSize: 10, lineHeight: 1.7, color: "#374151" }}}}>{{point}}</Text>
                          </View>
                        ))}}
                      </View>
                    )}}
                  </View>
                );
              }})}}
            </View>
          )}}
        </View>
      </Page>
    </Document>
  );
}};'''

def generate_standard_jsx(template_name: str, structure: Dict) -> str:
    """Generate JSX for standard layout with detected features"""
    theme_color = structure['theme_color']

    # Similar to watermark but without the watermark text
    return f'''export const PDF{template_name}Template = ({{
  resumeData,
  themeColor = "{theme_color}",
}}: PDF{template_name}TemplateProps) => {{
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={{styles.page}}>
        <View style={{styles.header}}>
          <Text style={{styles.name}}>{{resumeData.personalInfo.fullName}}</Text>
          {structure['has_title_field'] and '          {resumeData.personalInfo.title && (\n            <Text style={styles.title}>{resumeData.personalInfo.title}</Text>\n          )}\n' or ''}
          <View style={{styles.contactInfo}}>
            {{resumeData.personalInfo.email && <Text>{{resumeData.personalInfo.email}}</Text>}}
            {{resumeData.personalInfo.phone && <Text>{{resumeData.personalInfo.phone}}</Text>}}
            {{resumeData.personalInfo.location && <Text>{{resumeData.personalInfo.location}}</Text>}}
            {structure['has_social_links'] and '''            {resumeData.personalInfo.linkedin && <Link src={resumeData.personalInfo.linkedin}><Text>{resumeData.personalInfo.linkedin}</Text></Link>}
            {resumeData.personalInfo.github && <Link src={resumeData.personalInfo.github}><Text>{resumeData.personalInfo.github}</Text></Link>}
            {resumeData.personalInfo.portfolio && <Link src={resumeData.personalInfo.portfolio}><Text>{resumeData.personalInfo.portfolio}</Text></Link>}''' or ''}
          </View>
        </View>

        {{resumeData.personalInfo.summary && (
          <View style={{styles.section}}>
            <Text style={{styles.sectionTitle}}>Professional Summary</Text>
            <Text style={{{{ fontSize: 13, lineHeight: 1.7, color: "#374151" }}}}>{{resumeData.personalInfo.summary}}</Text>
          </View>
        )}}

        {{resumeData.experience && resumeData.experience.length > 0 && (
          <View style={{styles.section}}>
            <Text style={{styles.sectionTitle}}>Professional Experience</Text>
            {{resumeData.experience.map((exp, index) => {{
              const bulletPoints = (exp.description || "").split("\\n").filter(Boolean);
              return (
                <View key={{index}} style={{styles.experienceItem}}>
                  <View style={{{{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}}}>
                    <View style={{{{ flex: 1 }}}}>
                      <Text style={{{{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}}}>{{exp.position}}</Text>
                      <Text style={{{{ fontSize: 13, color: "#374151" }}}}>{{exp.company}}</Text>
                    </View>
                    <Text style={{{{ fontSize: 11, color: "#6b7280" }}}}>{{exp.startDate}} - {{exp.current ? "Present" : exp.endDate}}</Text>
                  </View>
                  {{bulletPoints.length > 0 && (
                    <View style={{{{ marginLeft: 20, marginTop: 8 }}}}>
                      {{bulletPoints.map((point, i) => (
                        <View key={{i}} style={{{{ flexDirection: "row", marginBottom: 4 }}}}>
                          <View style={{{{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#374151", marginRight: 8, marginTop: 6 }}}} />
                          <Text style={{{{ flex: 1, fontSize: 12.5, lineHeight: 1.7, color: "#374151" }}}}>{{point}}</Text>
                        </View>
                      ))}}
                    </View>
                  )}}
                </View>
              );
            }})}}
          </View>
        )}}

        {structure['bottom_two_columns'] and '''<View style={styles.twoColumnGrid}>
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
                {resumeData.skills.map((skill, index) => (''' + ('''
                  <View key={index} style={styles.skillChip}>
                    <Text style={{ fontSize: 10, fontWeight: 500, color: "#111827" }}>{skill.name}</Text>
                  </View>''' if structure['skills_as_chips'] else '''
                  <Text key={index} style={{ fontSize: 13, color: "#111827", marginRight: 4 }}>{skill.name}</Text>''') + '''))}
              </View>
            </View>
          )}
        </View>''' or '''        {resumeData.education && resumeData.education.length > 0 && (
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
              {resumeData.skills.map((skill, index) => (''' + ('''
                <View key={index} style={styles.skillChip}>
                  <Text style={{ fontSize: 10, fontWeight: 500, color: "#111827" }}>{skill.name}</Text>
                </View>''' if structure['skills_as_chips'] else '''
                <Text key={index} style={{ fontSize: 13, color: "#111827", marginRight: 4 }}>{skill.name}</Text>''') + '''))}
            </View>
          </View>
        )}'''}

        {{resumeData.sections && resumeData.sections.map((section, index) => (
          <View key={{index}} style={{styles.section}}>
            <Text style={{styles.sectionTitle}}>{{section.title}}</Text>
            <Text style={{{{ fontSize: 13, lineHeight: 1.7, color: "#374151" }}}}>{{section.content}}</Text>
          </View>
        ))}}
      </Page>
    </Document>
  );
}};'''

def main():
    ui_dir = Path("src/components/resume/templates")
    pdf_dir = Path("src/components/resume/pdf")

    ui_templates = sorted(ui_dir.glob("*Template.tsx"))

    print("=" * 80)
    print(f"REGENERATING ALL PDF TEMPLATES TO MATCH UI LAYOUTS")
    print(f"Total templates: {len(ui_templates)}")
    print("=" * 80)
    print()

    stats = {
        'watermark': 0,
        'sidebar': 0,
        'two_column': 0,
        'standard': 0,
        'with_social_links': 0,
    }

    for i, ui_path in enumerate(ui_templates, 1):
        template_name = ui_path.stem.replace('Template', '')
        pdf_path = pdf_dir / f"PDF{template_name}Template.tsx"

        try:
            # Read and analyze UI template
            with open(ui_path, 'r') as f:
                ui_content = f.read()

            structure = analyze_ui_layout(ui_content, template_name)

            # Generate matching PDF
            pdf_content = generate_matching_pdf(template_name, structure)

            # Write PDF template
            with open(pdf_path, 'w') as f:
                f.write(pdf_content)

            # Update stats
            if structure['has_watermark']:
                stats['watermark'] += 1
            if structure['has_sidebar']:
                stats['sidebar'] += 1
            if structure['bottom_two_columns']:
                stats['two_column'] += 1
            if not structure['has_sidebar'] and not structure['has_watermark']:
                stats['standard'] += 1
            if structure['has_social_links']:
                stats['with_social_links'] += 1

            layout_type = "WATERMARK" if structure['has_watermark'] else \
                         "SIDEBAR" if structure['has_sidebar'] else \
                         "2-COL" if structure['bottom_two_columns'] else "STANDARD"

            print(f"[{i:3d}/{len(ui_templates)}] {template_name:50s} | {layout_type:10s} | ✓")

        except Exception as e:
            print(f"[{i:3d}/{len(ui_templates)}] {template_name:50s} | ERROR: {str(e)}")

    print()
    print("=" * 80)
    print("✅ COMPLETED!")
    print("=" * 80)
    print()
    print("LAYOUT STATISTICS:")
    print(f"  Watermark layouts: {stats['watermark']}")
    print(f"  Sidebar layouts: {stats['sidebar']}")
    print(f"  Two-column layouts: {stats['two_column']}")
    print(f"  Standard layouts: {stats['standard']}")
    print(f"  Templates with social links: {stats['with_social_links']}")
    print()

if __name__ == "__main__":
    main()
