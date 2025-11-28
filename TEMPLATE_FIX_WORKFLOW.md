# Resume Template Fix Workflow

> **Reference Template**: `premium-elite` - This template has all 4 components working correctly.
> Live URL: https://resumecook.com/dashboard/universal-professional/editor/premium-elite

---

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [The 4 Components Every Template Needs](#the-4-components-every-template-needs)
3. [Font Size Standards](#font-size-standards)
4. [Step-by-Step Fix Workflow](#step-by-step-fix-workflow)
5. [Checklist for Each Template](#checklist-for-each-template)
6. [File Registration Locations](#file-registration-locations)
7. [Common Issues & Solutions](#common-issues--solutions)

---

## Project Architecture

### Key Files

| File | Purpose |
|------|---------|
| `src/pages/Editor.tsx` | Main editor - imports templates & PDFs, contains `pdfTemplates` mapping |
| `src/pages/LiveEditor.tsx` | Live editor page - has separate template & PDF mappings |
| `src/components/TemplatePreview.tsx` | Template preview - contains `templateComponents` mapping |
| `src/components/resume/ResumePreview.tsx` | Resume preview - contains `templates` mapping |
| `src/components/resume/EditableResumePreview.tsx` | Editable preview - contains `templates` mapping |
| `src/contexts/InlineEditContext.tsx` | Context for live inline editing |
| `src/lib/pdfConfig.ts` | PDF margins & utilities |
| `src/lib/pdfFonts.ts` | Font registration for PDF |
| `src/constants/templateMeta.ts` | Template metadata (name, description, category) |
| `src/constants/professionCategories.ts` | Template categorization |

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     InlineEditProvider                           │
│   (wraps editor, provides: updateField, addArrayItem, etc.)     │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ResumeForm            UI Template           PDF Template
  (Form Editor)        (Live Preview)         (PDF Export)
        │                     │                     │
        └──────────┬──────────┘                     │
                   ▼                                ▼
            setResumeData ◄──────────────── Same Visual Output
```

---

## The 4 Components Every Template Needs

### 1. UI Template (Live Preview)
**Location**: `src/components/resume/templates/[Name]Template.tsx`

```tsx
// Required imports
import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

// Required interface
interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;  // CRITICAL: Must support editable mode
}

// Component structure
export const [Name]Template = ({ resumeData, themeColor = "#defaultColor", editable = false }: TemplateProps) => {
  // For each field, provide BOTH editable and non-editable versions
  return (
    <div>
      {editable ? (
        <InlineEditableText
          path="personalInfo.fullName"
          value={resumeData.personalInfo.fullName}
          className="..."
          as="h1"
        />
      ) : (
        <h1>{resumeData.personalInfo.fullName}</h1>
      )}
    </div>
  );
};
```

### 2. PDF Template
**Location**: `src/components/resume/pdf/[Name]PDF.tsx` or `PDF[Name]Template.tsx`

```tsx
// Required imports
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const [Name]PDF = ({ resumeData, themeColor = "#defaultColor" }: Props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Inter",
      backgroundColor: "#ffffff",
    },
    // ... match UI template styles
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Match UI template structure exactly */}
      </Page>
    </Document>
  );
};
```

### 3. Form Editor Integration
The form editor (`ResumeForm.tsx`) works automatically with `resumeData` state. No template-specific changes needed.

### 4. Live Editor Integration
Requires `editable={true}` prop and proper `InlineEditable*` components in the UI template.

---

## Font Size Standards

### UI Template (Tailwind/CSS)

| Element | CSS Size | Tailwind Equivalent |
|---------|----------|---------------------|
| **Name** | `38px` | `text-[38px]` |
| **Job Title** | `15px` | `text-[15px]` |
| **Section Headings** | `13px` | `text-[13px] font-bold uppercase` |
| **Position/Degree** | `13-14px` | `text-[14px] font-bold` |
| **Company/School** | `12-12.5px` | `text-[12.5px] font-semibold` |
| **Dates** | `10.5px` | `text-[10.5px]` |
| **Body Text** | `12px` | `text-[12px]` |
| **Contact Info** | `11.5px` | `text-[11.5px]` |
| **Skills** | `11.5px` | `text-[11.5px]` |
| **Summary** | `12.5px` | `text-[12.5px]` |

### PDF Template (React-PDF)

| Element | Font Size |
|---------|-----------|
| **Name** | `28` |
| **Job Title** | `13` |
| **Section Headings** | `10` |
| **Position** | `11` |
| **Company** | `10` |
| **Dates** | `8-8.5` |
| **Body Text** | `9` |
| **Contact Info** | `9` |
| **Skills** | `9.5` |
| **Summary** | `9.5` |

### PDF Page Margins (from pdfConfig.ts)
```javascript
PDF_PAGE_MARGINS = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
}
```

---

## Step-by-Step Fix Workflow

### Step 1: Identify Template to Fix
```bash
# Template ID format: kebab-case (e.g., "premium-elite")
# UI file: PremiumEliteTemplate.tsx
# PDF file: PremiumElitePDF.tsx or PDFPremiumEliteTemplate.tsx
```

### Step 2: Check UI Template
1. Open `src/components/resume/templates/[Name]Template.tsx`
2. Verify it has:
   - [ ] `editable?: boolean` prop
   - [ ] `InlineEditableText` for all text fields
   - [ ] `InlineEditableDate` for date fields
   - [ ] `InlineEditableList` for experience/education arrays
   - [ ] `InlineEditableSkills` for skills
   - [ ] Both editable and non-editable render paths

### Step 3: Check PDF Template Exists
1. Look for `src/components/resume/pdf/[Name]PDF.tsx`
2. OR look for `src/components/resume/pdf/PDF[Name]Template.tsx`
3. If missing, create it matching the UI template structure

### Step 4: Verify PDF Matches UI
Compare side-by-side:
- Same layout structure
- Same visual hierarchy
- Same colors (use themeColor)
- Same font sizes (scaled for PDF)
- Same spacing proportions

### Step 5: Check Registration in All Files

#### Editor.tsx (PDF mapping)
```tsx
// Around line 3370+
const pdfTemplates: Record<string, React.ComponentType<any>> = {
  // ...
  "template-id": TemplatePDF,
  // ...
};
```

#### TemplatePreview.tsx
```tsx
// templateComponents mapping
const templateComponents: Record<string, React.ComponentType<any>> = {
  // ...
  "template-id": TemplateComponent,
  // ...
};
```

#### ResumePreview.tsx
```tsx
const templates: Record<string, React.ComponentType<any>> = {
  // ...
  "template-id": TemplateComponent,
  // ...
};
```

#### EditableResumePreview.tsx
```tsx
const templates: Record<string, React.ComponentType<any>> = {
  // ...
  "template-id": TemplateComponent,
  // ...
};
```

#### LiveEditor.tsx (both mappings)
```tsx
// pdfTemplates mapping
// templates mapping
```

### Step 6: Test All Features
1. **Form Editor**: Change fields in left sidebar → Preview updates
2. **Live Editor**: Click on resume fields → Can edit inline
3. **PDF Export**: Download PDF → Matches preview exactly

---

## Checklist for Each Template

```markdown
## Template: [template-id]

### Files
- [ ] UI Template exists: `src/components/resume/templates/[Name]Template.tsx`
- [ ] PDF Template exists: `src/components/resume/pdf/[Name]PDF.tsx`

### UI Template Features
- [ ] Has `editable?: boolean` prop
- [ ] Personal Info editable (name, title, email, phone, location)
- [ ] Summary editable with `multiline`
- [ ] Experience list editable with `InlineEditableList`
- [ ] Education list editable with `InlineEditableList`
- [ ] Skills editable with `InlineEditableSkills`
- [ ] Custom sections editable
- [ ] Photo support with `ProfilePhoto`
- [ ] Theme color support

### PDF Template Features
- [ ] Matches UI layout exactly
- [ ] Uses `registerPDFFonts()`
- [ ] Uses `PDF_PAGE_MARGINS`
- [ ] Uses `hasContent()` for conditional rendering
- [ ] Theme color support
- [ ] Photo support with `Image`
- [ ] Proper font sizes (scaled down from UI)

### Registration
- [ ] Registered in `Editor.tsx` pdfTemplates
- [ ] Registered in `TemplatePreview.tsx` templateComponents
- [ ] Registered in `ResumePreview.tsx` templates
- [ ] Registered in `EditableResumePreview.tsx` templates
- [ ] Registered in `LiveEditor.tsx` (both mappings)
- [ ] Added to `templateMeta.ts`
- [ ] Added to `professionCategories.ts`

### Testing
- [ ] Form editing works
- [ ] Live editing works (all fields clickable)
- [ ] PDF download works
- [ ] PDF matches preview visually
```

---

## File Registration Locations

### To Add a New Template

1. **Create UI Template**
   ```
   src/components/resume/templates/[Name]Template.tsx
   ```

2. **Create PDF Template**
   ```
   src/components/resume/pdf/[Name]PDF.tsx
   ```

3. **Register in Editor.tsx**
   - Add import for PDF template
   - Add to `pdfTemplates` object

4. **Register in TemplatePreview.tsx**
   - Add import for UI template
   - Add to `templateComponents` object

5. **Register in ResumePreview.tsx**
   - Add import for UI template
   - Add to `templates` object

6. **Register in EditableResumePreview.tsx**
   - Add import for UI template
   - Add to `templates` object

7. **Register in LiveEditor.tsx**
   - Add import for both templates
   - Add to both `pdfTemplates` and `templates` objects

8. **Add Metadata**
   - `src/constants/templateMeta.ts` - name, description, category
   - `src/constants/professionCategories.ts` - categorization

---

## Common Issues & Solutions

### Issue: Live editing not working
**Cause**: Missing `editable` prop or `InlineEditable*` components
**Solution**: Add editable mode with proper inline editing components

### Issue: PDF doesn't match preview
**Cause**: Different structure or font sizes
**Solution**: Compare UI and PDF templates, ensure same layout and proportions

### Issue: Template not showing in editor
**Cause**: Not registered in template mappings
**Solution**: Add to all 5 registration files

### Issue: PDF export fails
**Cause**: Missing PDF template or import error
**Solution**: Check PDF template exists and is properly imported in Editor.tsx

### Issue: Form changes not reflecting
**Cause**: Component not using `resumeData` prop correctly
**Solution**: Ensure all fields read from `resumeData` object

### Issue: Theme color not applying
**Cause**: Hardcoded colors instead of using `themeColor` prop
**Solution**: Use `themeColor` prop and derive variants from it

---

## Reference: PremiumElite Template Structure

### UI Template Key Patterns

```tsx
// Editable text pattern
{editable ? (
  <InlineEditableText
    path="personalInfo.fullName"
    value={resumeData.personalInfo.fullName}
    className="text-[38px] font-bold mb-2 tracking-tight"
    as="h1"
  />
) : (
  <h1 className="text-[38px] font-bold mb-2 tracking-tight">
    {resumeData.personalInfo.fullName}
  </h1>
)}

// Editable list pattern (experience)
{editable ? (
  <InlineEditableList
    path="experience"
    items={resumeData.experience}
    defaultItem={{
      id: Date.now().toString(),
      company: "Company Name",
      position: "Position Title",
      startDate: "2023-01",
      endDate: "2024-01",
      description: "Job description",
      current: false,
    }}
    addButtonLabel="Add Experience"
    renderItem={(exp, index) => (
      // Render each item with InlineEditableText for fields
    )}
  />
) : (
  <div className="space-y-6">
    {resumeData.experience.map((exp, index) => (
      // Non-editable render
    ))}
  </div>
)}

// Editable skills pattern
{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills}
    renderSkill={(skill, index) => (
      <span className="...">{skill.name}</span>
    )}
  />
) : (
  <div className="flex flex-wrap gap-2">
    {resumeData.skills.map((skill) => (
      <span key={skill.id} className="...">{skill.name}</span>
    ))}
  </div>
)}
```

### PDF Template Key Patterns

```tsx
// Use hasContent for conditional rendering
{hasContent(resumeData.personalInfo.summary) && (
  <View style={styles.summaryBox}>
    <Text style={styles.summaryTitle}>Professional Summary</Text>
    <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
  </View>
)}

// Handle description bullets
{hasContent(exp.description) && (
  <View style={styles.bulletList}>
    {exp.description
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((point, bulletIndex) => (
        <View key={bulletIndex} style={styles.bulletItem}>
          <View style={styles.bulletDot} />
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}
  </View>
)}

// Theme color light variant for PDF
const hexToLightHex = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const newR = Math.round(r * opacity + 255 * (1 - opacity));
  const newG = Math.round(g * opacity + 255 * (1 - opacity));
  const newB = Math.round(b * opacity + 255 * (1 - opacity));
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};
const themeColorLight = hexToLightHex(themeColor, 0.15);
```

---

## Quick Commands

### Find templates missing PDF
```bash
# List all UI templates
ls src/components/resume/templates/*.tsx | wc -l

# List all PDF templates  
ls src/components/resume/pdf/*.tsx | wc -l

# Find UI templates without matching PDF
for f in src/components/resume/templates/*Template.tsx; do
  name=$(basename "$f" Template.tsx)
  if ! ls src/components/resume/pdf/*${name}* 2>/dev/null | grep -q .; then
    echo "Missing PDF: $name"
  fi
done
```

### Check if template is registered
```bash
grep -l "template-id" src/pages/Editor.tsx src/components/TemplatePreview.tsx src/components/resume/ResumePreview.tsx src/components/resume/EditableResumePreview.tsx src/pages/LiveEditor.tsx
```

---

## Workflow Summary

When asked to fix a template:

1. **Identify** the template ID (kebab-case)
2. **Check** UI template has editable support
3. **Check** PDF template exists and matches UI
4. **Verify** registration in all 5 files
5. **Test** form editing, live editing, and PDF export
6. **Compare** PDF output with live preview

Use `premium-elite` as the reference for correct implementation.
