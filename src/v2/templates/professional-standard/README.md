# Professional Standard Template

A clean, ATS-friendly professional resume template suitable for all industries. This template follows the v2 architecture and includes all modern features.

## Overview

**Template ID:** `professional-standard-v2`
**Category:** Professional
**Layout:** Two-column (65% main, 32% sidebar)
**Color Scheme:** Professional dark blue (#1e40af)

## Features

### ✅ All V2 Features Supported

1. **Form Editor**
   - Dynamic form generation based on section registry
   - All sections are editable through form panels
   - Collapsible sections with smooth animations
   - Inline editing for simple items
   - Add/remove/reorder items

2. **Live Editor**
   - Click any text to edit in place
   - Hover indicators for editable fields
   - Add/remove experience items
   - Add/remove bullet points
   - Real-time preview updates

3. **Live Preview**
   - Real-time rendering as you type
   - Instant visual feedback
   - Same rendering engine as PDF output
   - Professional typography and spacing

4. **PDF Generation**
   - One-click PDF download
   - Optimized for print
   - Clean output without editing indicators
   - Proper page breaks

5. **Style Options**
   - Customize colors (theme color picker)
   - Change typography (header case, font size)
   - Adjust date format
   - Toggle section visibility
   - Modify bullet styles
   - Adjust spacing

6. **Section Rearranging**
   - Drag & drop sections between columns
   - Reorder within columns
   - Move sections from main to sidebar and vice versa
   - Page break controls

## Design Specifications

### Layout

```
┌─────────────────────────────────────────────────────┐
│                    HEADER (Full Width)              │
│  Sarah Johnson          email@example.com           │
│  Senior Product Manager (555) 123-4567              │
├────────────────────────┬────────────────────────────┤
│  MAIN COLUMN (65%)     │  SIDEBAR (32%)             │
│                        │                            │
│  Professional Summary  │  Skills                    │
│  ├─ Paragraph text     │  ├─ Pill badges            │
│                        │                            │
│  Professional Exp.     │  Certifications            │
│  ├─ Company 1          │  ├─ CSPO                   │
│  │  └─ Bullets         │  ├─ PM Certificate         │
│  ├─ Company 2          │                            │
│  │  └─ Bullets         │  Languages                 │
│                        │  ├─ English (Native)       │
│  Education             │  ├─ Spanish (Prof.)        │
│  ├─ Degree 1           │                            │
│  ├─ Degree 2           │  Key Achievements          │
│                        │  ├─ Award 1                │
│  Projects              │  ├─ Award 2                │
│  ├─ Project 1          │                            │
│  ├─ Project 2          │                            │
└────────────────────────┴────────────────────────────┘
```

### Typography

- **Name:** 32px, bold, dark gray (#111827)
- **Title:** 16px, regular, primary blue (#1e40af)
- **Section Headings:** 14px, bold, uppercase, primary blue with underline
- **Body Text:** 11px, regular, dark gray (#374151)
- **Small Text:** 10px, regular, muted gray (#6b7280)
- **Item Titles:** 12px, semi-bold, dark gray
- **Item Subtitles:** 11px, medium, primary blue

### Colors

- **Primary:** #1e40af (Professional dark blue)
- **Secondary:** #3b82f6 (Medium blue)
- **Accent:** #60a5fa (Light blue)
- **Text Primary:** #111827 (Near black)
- **Text Secondary:** #374151 (Dark gray)
- **Text Muted:** #6b7280 (Medium gray)
- **Background:** #ffffff (White)
- **Sidebar:** #f9fafb (Light gray)

### Spacing

- **Page Padding:** 32px all sides
- **Section Gap:** 20px
- **Item Gap:** 16px
- **Content Gap:** 8px
- **Column Gap:** 24px

## Sections Configuration

### Main Column Sections

1. **Professional Summary**
   - Variant: Paragraph
   - Position: Order 1
   - Max Lines: 4
   - Displays personal summary/objective

2. **Professional Experience**
   - Variant: Standard
   - Position: Order 2
   - Date Position: Right
   - Shows location: Yes
   - Bullet Style: •
   - Multiple entries with company, position, dates, bullets

3. **Education**
   - Variant: Standard
   - Position: Order 3
   - Date Position: Right
   - Shows GPA: Yes
   - Shows Location: Yes
   - Degree, school, dates, GPA

4. **Projects**
   - Variant: Standard
   - Position: Order 4
   - Shows Technologies: Yes
   - Shows Link: Yes
   - Project name, description, tech stack

### Sidebar Column Sections

1. **Skills**
   - Variant: Pills
   - Position: Order 1
   - Show Ratings: No
   - Group by Category: No
   - Colorful pill badges

2. **Certifications**
   - Variant: Compact
   - Position: Order 2
   - Shows Issuer: Yes
   - Shows Expiry: Yes
   - Cert name, issuer, date

3. **Languages**
   - Variant: Standard
   - Position: Order 3
   - Show Proficiency: Yes
   - Language name with proficiency level

4. **Key Achievements**
   - Variant: Bullets
   - Position: Order 4
   - Bullet Style: ▪
   - List of key achievements

### Optional Sections (Disabled by Default)

- Strengths
- Awards & Honors
- Publications
- Volunteer Experience
- Interests

These can be enabled via the Style Options panel.

## Usage

### 1. Access the Template

```
http://localhost:8081/v2/builder?template=professional-standard-v2
```

Or navigate to Dashboard V2 → All Templates → Professional Standard

### 2. Edit with Form Editor

Use the left panel to edit sections:
- Click section headers to expand/collapse
- Edit text fields, dates, bullet points
- Add new items with "Add" buttons
- Delete items with trash icons
- Reorder items by dragging

### 3. Edit with Live Editor

Click directly on the preview:
- Click any text to edit in place
- Hover to see edit indicators
- Add/remove experience items
- Modify bullet points inline

### 4. Customize Styles

Open Style Options panel (top right):

**Style Tab:**
- Change header case (uppercase/capitalize/lowercase)
- Adjust font size scale (smaller/normal/larger)
- Modify divider style (line/dotted/none)

**Format Tab:**
- Change date format (MM/YYYY, MMM YYYY, MMMM YYYY)
- Select bullet style (•, ◦, ▪, –, none)
- Adjust spacing

**Sections Tab:**
- Toggle section visibility
- Edit section titles
- Enable optional sections

### 5. Rearrange Sections

Click "Rearrange Sections" button:
- Drag sections between Main and Sidebar columns
- Reorder sections within columns
- Add page breaks
- Apply changes to update preview

### 6. Generate PDF

Click "Download PDF" button:
- Generates clean PDF without editing indicators
- Optimized for printing and ATS systems
- Downloads as [Name].pdf

## Customization Examples

### Change Primary Color

The template supports theme color customization:

```typescript
<ResumeRenderer
  templateId="professional-standard-v2"
  resumeData={data}
  themeColor="#059669" // Change to green
/>
```

### Add Custom Section

Add a custom section to the data:

```typescript
resumeData.customSections = [{
  id: 'custom1',
  title: 'Publications',
  type: 'list',
  items: [
    'Paper Title 1 - Journal Name, 2023',
    'Paper Title 2 - Conference, 2022'
  ]
}];
```

### Modify Typography

Edit the config file:

```typescript
typography: {
  name: {
    fontSize: '36px', // Larger name
    fontWeight: 700,
  },
  body: {
    fontSize: '12px', // Larger body text
  }
}
```

## Technical Details

### File Structure

```
/src/v2/templates/professional-standard/
├── component.tsx          # React component
├── config.ts             # Re-exports config
├── mockData.ts           # Sample data
├── index.ts              # Template definition
└── README.md             # This file

/src/v2/config/templates/
└── professional-standard.ts  # Full configuration
```

### Dependencies

The template uses these v2 components:

- `BaseTemplateProvider` - Template context
- `useBaseTemplate` - Template hooks
- `TemplateSectionRenderer` - Section rendering
- `HeaderSection` - Header rendering
- `ExperienceSection` - Experience items
- `EducationSection` - Education items
- `SkillsSection` - Skills with variants
- `CertificationsSection` - Certifications
- `LanguagesSection` - Languages
- `ProjectsSection` - Projects
- `AchievementsSection` - Achievements

### Data Model

Uses the universal V2ResumeData format:

```typescript
interface V2ResumeData {
  version: '2.0';
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages?: LanguageItem[];
  certifications?: CertificationItem[];
  projects?: ProjectItem[];
  achievements?: AchievementItem[];
  // ... other sections
}
```

## Best Practices

### Content Guidelines

1. **Summary:** 3-4 sentences highlighting key qualifications
2. **Experience:** 3-5 bullet points per role focusing on achievements
3. **Skills:** 8-15 relevant skills organized by category
4. **Education:** Include GPA if above 3.5
5. **Projects:** 2-4 significant projects with measurable impact

### ATS Optimization

- Uses standard section headings
- Clean hierarchy with proper HTML tags
- No complex graphics or images
- Standard fonts and spacing
- Keyword-friendly content

### Visual Balance

- Main column: Detailed content (experience, education, projects)
- Sidebar: Compact lists (skills, certifications, languages)
- White space: Adequate padding and gaps
- Typography: Clear hierarchy with size and weight
- Colors: Professional and not overwhelming

## Troubleshooting

### Template Not Showing

1. Check that the template is registered in `/src/v2/templates/index.ts`
2. Verify all imports are correct
3. Check browser console for errors
4. Clear browser cache and restart dev server

### PDF Not Generating

1. Check that `resume-preview-pdf-v2` element exists
2. Verify html2canvas and jspdf are installed
3. Check console for errors during PDF generation
4. Try with smaller content first

### Sections Not Rendering

1. Verify section is enabled in config
2. Check that data exists for the section
3. Verify section type matches registry
4. Check variant is supported for section type

## Support

For issues or questions:
- Check v2 architecture documentation: `/src/v2/README.md`
- Review section registry: `/src/v2/registry/sectionRegistry.ts`
- Examine other templates for reference
- Check browser console for errors

## License

Part of Resume Cook application.

---

**Created:** 2025-12-12
**Version:** 2.0
**Author:** Claude
**Template Type:** Professional Standard
