# Template Fix Workflow - Complete Guide

This document outlines the standard workflow for fixing resume templates to ensure consistency, functionality, and proper integration with the editor system.

## Overview

When fixing a template, we need to ensure:
1. Style options compatibility
2. Consistent font sizes and colors
3. Form editor and live editor synchronization
4. Proper spacing and gaps
5. Social links with add link functionality
6. Editable skills with preserved visualization
7. Custom sections with proper rendering
8. Add section/item buttons
9. PDF-standard header font sizes
10. Education items with GPA field

---

## Standard Fixes Checklist

### 1. Style Options Compatibility ✅

**Requirement:** Template must be compatible with StyleOptions settings (font size scale, header case, divider style, etc.)

**Implementation:**
- Wrap the entire template in `<StyleOptionsWrapper>`
- Use `useStyleOptionsWithDefaults()` hook for formatting helpers
- Use `SectionHeader` component for section headings (it automatically applies style options)
- Use `styleOptions.getBulletChar()` for bullet points
- Use `styleOptions.formatDate()` for date formatting

**Example:**
```tsx
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { SectionHeader } from "@/components/resume/shared/TemplateBase";

export const MyTemplate = ({ resumeData, editable, themeColor }) => {
  const styleOptions = useStyleOptionsWithDefaults();
  
  return (
    <StyleOptionsWrapper>
      {/* Template content */}
      <SectionHeader 
        title="Work Experience" 
        themeColor={themeColor}
        className="mb-3"
        paddingBottom="8px"
        style={{ marginBottom: '12px' }}
      />
    </StyleOptionsWrapper>
  );
};
```

---

### 2. Contact Section Styling ✅

**Requirement:** Contact section should have font size 13px and color #1a1a1a

**Implementation:**
- Use `TemplateContactInfo` component (it already has correct styling)
- For header backgrounds, ensure text and icons are white

**Example:**
```tsx
import { TemplateContactInfo } from "@/components/resume/shared/TemplateBase";

<TemplateContactInfo
  resumeData={resumeData}
  editable={editable}
  themeColor={accent}
  layout="horizontal"
/>
```

**For white text on colored backgrounds:**
```tsx
<div className="opacity-90" style={{ fontSize: '13px', color: 'white' }}>
  <style>{`
    div[data-header-contact] span,
    div[data-header-contact] svg {
      color: white !important;
    }
  `}</style>
  <div data-header-contact style={{ display: 'contents' }}>
    <TemplateContactInfo
      resumeData={resumeData}
      editable={editable}
      themeColor="#ffffff"
      layout="horizontal"
    />
  </div>
</div>
```

---

### 3. Content Font Sizes and Colors ✅

**Requirement:** All section content should have font size 13px and color #1a1a1a

**Implementation:**
- Apply `fontSize: '13px'` and `color: '#1a1a1a'` to all content text
- Use inline styles or className with Tailwind classes
- Ensure both editable and non-editable modes have consistent styling

**Example:**
```tsx
<InlineEditableText
  path="personalInfo.summary"
  value={resumeData.personalInfo.summary}
  style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
  multiline
  as="p"
/>

// Non-editable
<p style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
  {resumeData.personalInfo.summary}
</p>
```

---

### 4. Form Editor and Live Editor Sync ✅

**Requirement:** Form editor preview and live inline editor must always be in sync

**Implementation:**
- Use the same components for both editable and non-editable modes
- Ensure `InlineEditableText`, `InlineEditableDate`, `InlineEditableList`, etc. are used consistently
- Both modes should render the same structure, just with different components

**Pattern:**
```tsx
{editable ? (
  <InlineEditableText
    path="field.path"
    value={value}
    style={{ fontSize: '13px', color: '#1a1a1a' }}
  />
) : (
  <span style={{ fontSize: '13px', color: '#1a1a1a' }}>
    {value}
  </span>
)}
```

---

### 5. Section Heading Gaps ✅

**Requirement:** Add consistent gaps between section headings and content, and between headings and borders

**Implementation:**
- Use `SectionHeader` component with `paddingBottom="8px"` and `style={{ marginBottom: '12px' }}`
- Ensure consistent spacing across all sections

**Example:**
```tsx
<SectionHeader 
  title="Work Experience" 
  themeColor={accent}
  className="mb-3"
  paddingBottom="8px"
  style={{ marginBottom: '12px' }}
/>
```

---

### 6. Social Links Section ✅

**Requirement:** Social links section with proper variant and "Add Link" functionality

**Implementation:**
- Use `TemplateSocialLinks` component
- Choose appropriate variant (horizontal, vertical, icons-only, minimal, badges, underlined)
- Component automatically handles "Add Link" functionality

**Example:**
```tsx
import { TemplateSocialLinks } from "@/components/resume/shared/TemplateBase";

{resumeData.includeSocialLinks && (
  <div className="mb-8" data-section="social">
    <SectionHeader 
      title="Connect With Me" 
      themeColor={accent}
      className="mb-3"
      paddingBottom="8px"
      style={{ marginBottom: '12px' }}
    />
    <TemplateSocialLinks
      resumeData={resumeData}
      editable={editable}
      themeColor={accent}
      variant="horizontal" // Choose best fit for template
    />
  </div>
)}
```

---

### 7. Skills Section ✅

**Requirement:** Skills should be editable in live editor, sync with form, but preserve template-specific visualization

**Implementation:**
- Use `InlineEditableSkills` component
- Use `renderSkill` prop to customize the visual appearance
- Preserve the template's unique skill visualization style

**Example:**
```tsx
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

{editable ? (
  <div className="flex flex-wrap gap-2">
    <InlineEditableSkills
      path="skills"
      skills={resumeData.skills}
      renderSkill={(skill, index) => (
        <span
          className="px-2.5 py-1 rounded text-xs font-medium"
          style={{ backgroundColor: accent, color: 'white' }}
        >
          {skill.name}
        </span>
      )}
    />
  </div>
) : (
  <div className="flex flex-wrap gap-2">
    {resumeData.skills.map((skill, index) => (
      <span
        key={index}
        className="px-2.5 py-1 rounded text-xs font-medium"
        style={{ backgroundColor: accent, color: 'white' }}
      >
        {skill.name}
      </span>
    ))}
  </div>
)}
```

---

### 8. Custom Sections - Fix [object Object] Issue ✅

**Requirement:** Custom sections should not render "[object Object]" and should be properly editable

**Implementation:**
- Use `CustomSectionsWrapper` component
- Provide custom `renderItem` to ensure items are strings
- Use `renderSectionHeader` to match template's section heading style

**Example:**
```tsx
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { SectionHeader } from "@/components/resume/shared/TemplateBase";

<CustomSectionsWrapper
  sections={resumeData.sections || []}
  editable={editable}
  accentColor={accent}
  styles={SINGLE_COLUMN_CONFIG}
  renderSectionHeader={(title, index, helpers) => (
    <SectionHeader
      title={title}
      themeColor={accent}
      className="mb-3"
      paddingBottom="8px"
      style={{ marginBottom: '12px' }}
    />
  )}
  itemStyle={{ 
    fontSize: '13px', 
    color: '#1a1a1a', 
    lineHeight: 1.5 
  }}
  sectionStyle={{ marginBottom: '28px' }}
  showAddSection={true}
  renderItem={(item, itemIndex, sectionIndex, helpers) => {
    // Ensure item is a string to prevent [object Object] rendering
    const itemValue = typeof item === 'string' ? item : (item as any)?.text || String(item || '');
    const showBorder = editable;
    return (
      <div key={itemIndex} className="group flex items-start gap-2 mb-2">
        {editable ? (
          <helpers.EditableText
            className={`flex-1 min-h-[1.2rem] ${showBorder ? 'border border-dashed border-gray-300 rounded px-1' : ''}`}
            style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
            placeholder="Click to add item..."
          />
        ) : (
          <span style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
            {itemValue}
          </span>
        )}
        {editable && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              helpers.remove();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
            style={{ color: '#ef4444' }}
          >
            <span className="text-xs">×</span>
          </button>
        )}
      </div>
    );
  }}
  renderAddItemButton={(onClick, sectionIndex) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
      style={{ color: accent, borderColor: accent }}
    >
      <span>+</span>
      Add Item
    </button>
  )}
/>
```

**Key Points:**
- Always check if item is a string: `typeof item === 'string' ? item : String(item || '')`
- Only show border in editable mode (live editor), not in form preview
- Use `helpers.EditableText` for editable content
- Use `helpers.remove()` for removing items

---

### 9. Add Custom Section Button ✅

**Requirement:** After custom sections, there should be a button to add new custom section

**Implementation:**
- Set `showAddSection={true}` on `CustomSectionsWrapper`
- The component automatically renders the button at the bottom
- No additional code needed

---

### 10. Header Font Sizes (PDF Standards) ✅

**Requirement:** Header font sizes should follow PDF standards

**Implementation:**
- Name: 27px (20pt)
- Title/Subheading: 16px (12pt) - but can be adjusted based on template design
- Contact: 13px (10pt)

**Example:**
```tsx
// Name
<h1 style={{ fontSize: '27px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
  {resumeData.personalInfo.fullName}
</h1>

// Title/Subheading
<p style={{ fontSize: '16px', lineHeight: 1.4, fontWeight: 400, color: 'white' }}>
  {resumeData.personalInfo.title}
</p>

// For white text on colored backgrounds, add CSS override:
<style>{`
  .resume-subtitle {
    font-size: 16px !important;
    color: white !important;
  }
`}</style>
```

---

### 11. Education Items - GPA Field ✅

**Requirement:** All new education items must include GPA field

**Implementation:**
- Add `gpa: ""` to education `defaultItem` in template
- Always render GPA field in editable mode (even if empty)
- Store only the GPA value (without "GPA: " prefix)
- Display with "GPA: " prefix

**Example:**
```tsx
<InlineEditableList
  path="education"
  items={resumeData.education}
  defaultItem={{
    id: Date.now().toString(),
    school: "School Name",
    degree: "Degree",
    field: "Field of Study",
    startDate: "2019-09",
    endDate: "2023-05",
    gpa: "", // Always include this
  }}
  addButtonLabel="Add Education"
  renderItem={(edu, index) => (
    <div>
      {/* ... other fields ... */}
      {(editable || edu.gpa) && (
        <div className="font-light mt-1" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
          <span>GPA: </span>
          <InlineEditableText
            path={`education[${index}].gpa`}
            value={edu.gpa || ""}
            className="inline-block"
            placeholder="3.8/4.0"
            style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}
            as="span"
          />
        </div>
      )}
    </div>
  )}
/>
```

**Note:** `InlineEditableList` automatically adds `gpa: ""` to education items if missing, but it's best practice to include it in the template's defaultItem.

---

## Common Issues and Solutions

### Issue: StyleOptionsWrapper Overriding Styles

**Problem:** `StyleOptionsWrapper` applies `!important` styles that override template-specific styles (especially for headers/subheadings).

**Solution:**
- Use different element types (e.g., `<div>` instead of `<p>` for subheadings)
- Add specific CSS classes with `!important` overrides
- Use inline styles with higher specificity

**Example:**
```tsx
// Instead of <p>, use <div> for subheading
<div className="resume-subtitle" style={{ fontSize: '16px', color: 'white' }}>
  {resumeData.personalInfo.title}
</div>

<style>{`
  .resume-subtitle {
    font-size: 16px !important;
    color: white !important;
  }
`}</style>
```

### Issue: Custom Section Items Becoming Empty

**Problem:** When clicking "Add Item" in custom sections, existing items become empty.

**Solution:**
- Fixed in `CustomSectionsWrapper.tsx` - the `handleAddItem` function now uses the latest `resumeData` from context
- Updates both `items` and `content` fields atomically in a single operation
- No template changes needed - this is handled at the component level

### Issue: Form Editor Preview Shows Dotted Borders

**Problem:** Editable fields show dashed borders in form editor preview.

**Solution:**
- Only show borders in editable mode (live editor)
- Check `editable` prop before applying border styles

**Example:**
```tsx
const showBorder = editable;
<helpers.EditableText
  className={`flex-1 min-h-[1.2rem] ${showBorder ? 'border border-dashed border-gray-300 rounded px-1' : ''}`}
/>
```

---

## Import Statements Checklist

Ensure these imports are present:

```tsx
import { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { 
  TemplateContactInfo, 
  TemplateSocialLinks, 
  SectionHeader 
} from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfstandards";
```

---

## Testing Checklist

After fixing a template, verify:

- [ ] Style options panel changes apply correctly (font size, header case, divider style)
- [ ] Contact section has 13px font and #1a1a1a color (or white on colored backgrounds)
- [ ] All content has 13px font and #1a1a1a color
- [ ] Form editor preview matches live editor
- [ ] Section headings have proper gaps (12px margin-bottom)
- [ ] Social links show "Add Link" button when links are missing
- [ ] Skills are editable and preserve template visualization
- [ ] Custom sections don't show "[object Object]"
- [ ] Can add new custom sections
- [ ] Can add items to custom sections without losing existing items
- [ ] Header font sizes match PDF standards
- [ ] New education items include GPA field
- [ ] GPA field is editable and displays correctly

---

## Quick Reference: Standard Values

- **Content font size:** `13px`
- **Content color:** `#1a1a1a`
- **Header name size:** `27px`
- **Header title size:** `16px`
- **Section heading margin-bottom:** `12px`
- **Section heading padding-bottom:** `8px`
- **Section gap:** `28px` (for custom sections)
- **Item gap:** `6px` (for custom section items)
- **Line height:** `1.5` (for content), `1.4` (for headings)

---

## Notes

- Always preserve the template's unique visual design while ensuring functionality
- Test in both form editor preview and live editor modes
- Ensure PDF generation works correctly with all changes
- Keep template structure intact - only fix functionality and styling issues

