# Resume Template Standardization Workflow

Use this workflow when fixing or creating new resume templates to ensure consistency across the application.

---

## Table of Contents

1. [Phase 1: Setup & Imports](#phase-1-setup--imports)
2. [Phase 2: Typography & Color Standards](#phase-2-typography--color-standards)
3. [Phase 3: Section Headers](#phase-3-section-headers)
4. [Phase 4: Contact & Social Links](#phase-4-contact--social-links)
5. [Phase 5: Professional Summary](#phase-5-professional-summary)
6. [Phase 6: Experience Section](#phase-6-experience-section)
7. [Phase 7: Education Section](#phase-7-education-section)
8. [Phase 8: Skills Section](#phase-8-skills-section)
9. [Phase 9: Custom Sections](#phase-9-custom-sections)
10. [Phase 10: Sync Checklist](#phase-10-sync-checklist)
11. [Quick Reference: Variant Selection](#quick-reference-variant-selection)
12. [Common Fixes Checklist](#common-fixes-checklist)

---

## Phase 1: Setup & Imports

### 1.1 Add Required Imports

```tsx
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { TemplateSocialLinks, TemplateSummarySection } from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
```

### 1.2 Initialize Hooks

```tsx
const styleOptions = useStyleOptionsWithDefaults();
const accent = themeColor || "#2563eb";
```

---

## Phase 2: Typography & Color Standards

### 2.1 Base Styles

| Element | Font Size | Color |
|---------|-----------|-------|
| Name/Title | 18-24px | `#000000` |
| Contact Info | 13px | `#1a1a1a` |
| Section Headers | 13px | `accent` (theme color) |
| All Content | 13px | `#1a1a1a` |
| Dates/Secondary | 13px | `#6b7280` |

### 2.2 Apply to Container

```tsx
<div style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
  {/* Template content */}
</div>
```

---

## Phase 3: Section Headers

### 3.1 Use Dynamic Formatting with getSectionBorder

The `getSectionBorder(accentColor)` helper respects the user's divider style preference from Style Options.

```tsx
<h2
  className="text-[13px] font-semibold uppercase mb-2"
  data-accent-color="true"
  style={{ 
    color: accent,
    ...styleOptions.getSectionBorder(accent)  // Respects user's divider preference
  }}
>
  {styleOptions.formatHeader('Section Title')}
</h2>
```

### 3.2 Available Divider Styles

Users can choose from these divider styles in Style Options:

| Style | Border | Description |
|-------|--------|-------------|
| `thin` (default) | `0.5px solid` | Subtle, professional |
| `line` | `1px solid` | Standard visible line |
| `dotted` | `1px dotted` | Dotted separator |
| `double` | `3px double` | Double line (decorative) |
| `none` | No border | Clean, borderless headers |

### 3.3 Border Implementation

- ✅ **Use:** `...styleOptions.getSectionBorder(accent)` - Respects user preference
- ✅ **Fallback:** `borderBottom: \`0.5px solid ${accent}\`` - When style options unavailable
- ❌ **Don't use:** `...dividerStyle` with `currentColor` - Won't use accent color

### 3.4 Centralized SectionHeader Component (Recommended)

For the simplest implementation, use the centralized `SectionHeader` component that automatically handles:
- Text casing (AA, Aa, aa) from Style Options
- Border style (thin, line, dotted, double, none) from Style Options
- Accent color for text and border

```tsx
import { SectionHeader } from "@/components/resume/shared";

// Simple usage - all style options applied automatically
<SectionHeader title="Experience" themeColor={accent} />

// With custom classes
<SectionHeader 
  title="Skills" 
  themeColor={accent} 
  className="tracking-wide"
/>

// With custom styles
<SectionHeader 
  title="Education" 
  themeColor={accent} 
  style={{ marginBottom: '1rem' }}
/>
```

This is the **recommended approach** for new templates as it ensures consistent behavior with Style Options across all templates.

---

## Phase 4: Contact & Social Links

### 4.1 Social Links Placement

- Add **after** Professional Summary/About Me section
- Use `showLabels={false}` for clean icon-only display

```tsx
<TemplateSocialLinks
  resumeData={resumeData}
  editable={editable}
  themeColor={accent}
  variant="horizontal"  // or "icons-only", "badges", "vertical"
  showLabels={false}
/>
```

### 4.2 Available Variants

| Variant | Description | Best For |
|---------|-------------|----------|
| `horizontal` | Icons + text in a row | Default, most templates |
| `icons-only` | Just icons, no text | Minimal designs |
| `vertical` | Stacked layout | Sidebar layouts |
| `badges` | Pill-style with background | Modern templates |
| `minimal` | Text only, no icons | Traditional designs |
| `underlined` | Links with underline | Professional templates |

---

## Phase 5: Professional Summary

```tsx
<TemplateSummarySection
  resumeData={resumeData}
  editable={editable}
  themeColor={accent}
  title="Summary"
  className="mb-3"
  renderHeader={(title) => (
    <h2
      className="text-[13px] font-semibold uppercase mb-2"
      data-accent-color="true"
      style={{ 
        color: accent,
        ...styleOptions.getSectionBorder(accent)
      }}
    >
      {styleOptions.formatHeader(title)}
    </h2>
  )}
/>
```

---

## Phase 6: Experience Section

### 6.1 Use ExperienceBulletPoints Component

```tsx
{resumeData.experience.map((exp, index) => (
  <div key={exp.id} className="space-y-2">
    {/* Position & Dates */}
    <div className="flex justify-between">
      <div className="text-[13px] font-semibold" style={{ color: '#000000' }}>
        {editable ? (
          <InlineEditableText 
            path={`experience[${index}].position`} 
            value={exp.position} 
            placeholder="Position"
          />
        ) : exp.position}
      </div>
      <div className="text-[13px]" style={{ color: '#6b7280' }}>
        {editable ? (
          <>
            <InlineEditableDate 
              path={`experience[${index}].startDate`} 
              value={exp.startDate} 
            />
            <span> — </span>
            {exp.current ? "Present" : (
              <InlineEditableDate 
                path={`experience[${index}].endDate`} 
                value={exp.endDate} 
              />
            )}
          </>
        ) : `${formatDate(exp.startDate)} — ${exp.current ? "Present" : formatDate(exp.endDate)}`}
      </div>
    </div>
    
    {/* Company */}
    <div className="text-[13px]" style={{ color: '#1a1a1a' }}>
      {editable ? (
        <InlineEditableText 
          path={`experience[${index}].company`} 
          value={exp.company} 
          placeholder="Company"
        />
      ) : exp.company}
    </div>
    
    {/* Bullet Points */}
    <ExperienceBulletPoints
      experienceId={exp.id}
      experienceIndex={index}
      bulletPoints={exp.bulletPoints}
      description={exp.description}
      editable={editable}
      accentColor={accent}
      bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
    />
  </div>
))}
```

### 6.2 Date Formatting Helper

```tsx
const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};
```

### 6.3 PDF-Safe Bullet Point Rendering

**Important:** For PDF rendering, avoid using `flexbox` for bullet points as it can cause bullets to appear on separate lines. Use the hanging indent technique instead:

```tsx
// ❌ DON'T use flexbox for PDF bullet points
<li className="flex items-start">
  <span className="mr-2">•</span>
  <span>{bulletText}</span>
</li>

// ✅ DO use hanging indent (PDF-safe)
<li
  style={{
    display: 'block',
    paddingLeft: '1em',
    textIndent: '-1em',
    fontSize: '13px',
    color: '#1a1a1a',
    lineHeight: '1.7',
  }}
>
  <span style={{ marginRight: '0.5em' }}>•</span>
  {bulletText}
</li>
```

The `ExperienceBulletPoints` component already handles this correctly for non-editable (PDF) mode.

---

## Phase 7: Education Section

### 7.1 Use InlineEducationSection with GPA Support

```tsx
<InlineEducationSection
  items={resumeData.education}
  editable={editable}
  accentColor={accent}
  variant="standard"  // or "compact", "detailed", "timeline", "card", "minimal"
  renderHeader={(title) => (
    <h2
      className="text-[13px] font-semibold uppercase mb-2"
      data-accent-color="true"
      style={{ 
        color: accent,
        ...styleOptions.getSectionBorder(accent)
      }}
    >
      {styleOptions.formatHeader(title)}
    </h2>
  )}
/>
```

### 7.2 Available Variants

| Variant | Description | Best For |
|---------|-------------|----------|
| `standard` | Full details, inline dates | Default, most templates |
| `compact` | Single line per entry | Space-constrained layouts |
| `detailed` | Expanded with descriptions | Detailed resumes |
| `timeline` | Visual timeline indicator | Creative templates |
| `card` | Boxed entries with border | Modern templates |
| `minimal` | Just degree and school | Minimal designs |

---

## Phase 8: Skills Section

### 8.1 Recommended Default Style (Rounded Badge with Light Background)

This is the **recommended default style** for skills - clean, professional, and visually appealing:

```tsx
// Helper function for accent color with opacity
const withOpacity = (color: string, alpha: string) => `${color}${alpha}`;
const accentLight = withOpacity(accent, "15");  // 15% opacity for background
const accentBorder = withOpacity(accent, "30"); // 30% opacity for border

// Skills section
<div className="flex flex-wrap gap-2">
  {editable ? (
    <InlineEditableSkills
      path="skills"
      skills={resumeData.skills || []}
      renderSkill={(skill) => (
        <span
          className="px-4 py-1.5 text-xs font-medium rounded-md"
          style={{
            backgroundColor: accentLight,
            color: accent,
            border: `1px solid ${accentBorder}`
          }}
        >
          {skill.name}
        </span>
      )}
    />
  ) : (
    resumeData.skills.map((skill, index) => (
      <span
        key={index}
        className="px-4 py-1.5 text-xs font-medium rounded-md"
        style={{
          backgroundColor: accentLight,
          color: accent,
          border: `1px solid ${accentBorder}`
        }}
      >
        {skill.name}
      </span>
    ))
  )}
</div>
```

### 8.2 Style Breakdown

| Property | Value | Purpose |
|----------|-------|---------|
| `px-4 py-1.5` | Padding | Comfortable touch target |
| `text-xs` | 12px font | Readable but compact |
| `font-medium` | 500 weight | Slightly bold for emphasis |
| `rounded-md` | 6px radius | Soft, modern corners |
| `backgroundColor` | `${accent}15` | Light tinted background |
| `color` | `${accent}` | Theme-colored text |
| `border` | `1px solid ${accent}30` | Subtle border definition |

### 8.3 Alternative Variants

| Variant | Classes | Best For |
|---------|---------|----------|
| **Rounded Badge** (Default) | `px-4 py-1.5 text-xs font-medium rounded-md` | Most templates |
| **Pill** | `px-4 py-1.5 text-xs font-medium rounded-full` | Modern, playful designs |
| **Compact** | `px-3 py-1 text-[11px] font-medium rounded` | Dense layouts |
| **Outline Only** | Same classes but `backgroundColor: transparent` | Minimal designs |

### 8.4 Helper Function (Optional)

```tsx
import { getSkillBadgeClasses } from '@/lib/pdfStyles';

// Usage with helper
<span 
  className={getSkillBadgeClasses('rounded')}
  style={{ backgroundColor: accentLight, color: accent, border: `1px solid ${accentBorder}` }}
>
  {skill.name}
</span>
```

---

## Phase 9: Custom Sections

### 9.1 Use CustomSectionsWrapper

```tsx
<CustomSectionsWrapper
  sections={resumeData.sections || []}
  editable={editable}
  accentColor={accent}
  showAddSection={true}
  renderSectionHeader={(title) => (
    <h2
      className="text-[13px] font-semibold uppercase mb-2"
      data-accent-color="true"
      style={{ 
        color: accent,
        ...styleOptions.getSectionBorder(accent)
      }}
    >
      {styleOptions.formatHeader(title)}
    </h2>
  )}
/>
```

---

## Phase 10: Sync Checklist

### ✅ Form Editor & Live Editor Sync

- [ ] Both use same `editable` prop pattern
- [ ] Conditional rendering: `editable ? <InlineEditable... /> : staticContent`
- [ ] Same styling in both modes
- [ ] All fields editable in live editor, static in form editor preview

### ✅ Theme Color Sync

- [ ] All accent colors use `accent` variable (not hardcoded)
- [ ] Borders use `${accent}` in template literals
- [ ] Skill badges use `${accent}15` for background
- [ ] Section headers have `data-accent-color="true"`
- [ ] Social links use `themeColor={accent}`

### ✅ PDF Compatibility

- [ ] No `useInlineEdit()` destructuring without null check
- [ ] Components handle `editable={false}` gracefully
- [ ] No placeholder text shown in PDF mode
- [ ] Social links filter out empty values in PDF mode

---

## Quick Reference: Variant Selection

| Template Style | Social Links | Education | Skills |
|----------------|--------------|-----------|--------|
| **Modern/Clean** | `horizontal` | `standard` | `pill` |
| **Minimal** | `icons-only` | `compact` | `compact` |
| **Corporate** | `badges` | `detailed` | `rounded` |
| **Creative** | `vertical` | `timeline` | `pill` |
| **Two-Column** | `vertical` | `card` | `compact` |
| **Traditional** | `minimal` | `standard` | `rounded` |

---

## Common Fixes Checklist

### Imports & Setup
- [ ] Import `useStyleOptionsWithDefaults` hook
- [ ] Initialize `styleOptions` and `accent` variables

### Typography & Colors
- [ ] Replace all hardcoded colors with `#1a1a1a` or `accent`
- [ ] Set all content font sizes to `13px`
- [ ] Name/titles use `#000000`
- [ ] Dates use `#6b7280`

### Section Headers
- [ ] Use `styleOptions.formatHeader()` for section titles
- [ ] Use `...styleOptions.getSectionBorder(accent)` for borders (respects user preference)
- [ ] Add `data-accent-color="true"` attribute
- [ ] Test with different divider styles (thin, line, dotted, double, none)

### Components
- [ ] Add `TemplateSocialLinks` after summary with appropriate variant
- [ ] Use `InlineEducationSection` with GPA support
- [ ] Use `ExperienceBulletPoints` for experience items
- [ ] Add `CustomSectionsWrapper` with `showAddSection={true}`

### Editable Fields
- [ ] Ensure all editable fields have both editable and static rendering
- [ ] Use `InlineEditableText` for text fields
- [ ] Use `InlineEditableDate` for date fields
- [ ] Use `InlineEditableList` for array fields

### Testing
- [ ] Test in Live Editor (editable mode)
- [ ] Test in Form Editor preview (non-editable mode)
- [ ] Test PDF download
- [ ] Test theme color changes
- [ ] Test divider style changes (Style Options panel)
- [ ] Verify no placeholders in PDF

---

## File Locations Reference

| Component | Path |
|-----------|------|
| Style Options Hook | `@/contexts/StyleOptionsContext` |
| Social Links | `@/components/resume/shared/TemplateBase.tsx` |
| Summary Section | `@/components/resume/shared/TemplateBase.tsx` |
| Education Section | `@/components/resume/sections/InlineEducationSection.tsx` |
| Experience Bullets | `@/components/resume/ExperienceBulletPoints.tsx` |
| Custom Sections | `@/components/resume/shared/CustomSectionsWrapper.tsx` |
| Skill Badge Styles | `@/lib/pdfStyles.ts` |
| Inline Edit Context | `@/contexts/InlineEditContext.tsx` |

---

## Notes

- Always test both **Live Editor** and **Form Editor** views
- PDF generation uses `editable={false}` - ensure components handle this
- Theme color changes should reflect immediately across all accent-colored elements
- Custom sections should always have the "Add Section" button visible in edit mode
