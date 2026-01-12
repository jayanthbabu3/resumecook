# Automated Template Fix Workflow (Generic)

> **Purpose**: This workflow applies to **ALL templates** regardless of layout (single-column, two-column, sidebar, etc.)
> **Reference Template**: `professional` - Used as a reference for patterns, not layout structure
> **Reference URL**: http://localhost:8080/dashboard/universal-professional/editor/professional

This workflow provides a **systematic, layout-agnostic approach** to fix ANY template by ensuring core requirements are met. Layouts can differ, but functionality and data handling must be consistent.

---

## Table of Contents

1. [Core Requirements (Layout-Agnostic)](#core-requirements-layout-agnostic)
2. [Quick Start: Universal Checklist](#quick-start-universal-checklist)
3. [Required Components & Props](#required-components--props)
4. [Data Handling Patterns](#data-handling-patterns)
5. [Font Size & Spacing Guidelines](#font-size--spacing-guidelines)
6. [Verification Script](#verification-script)
7. [Common Patterns (Layout-Independent)](#common-patterns-layout-independent)

---

## Core Requirements (Layout-Agnostic)

These requirements apply to **ALL templates** regardless of layout:

### ✅ 1. Required Props Interface
Every template must accept these props:
- `resumeData: ResumeData` - The resume data
- `themeColor?: string` - Theme color (optional)
- `editable?: boolean` - Whether in editable mode
- `onAddBulletPoint?: (expId: string) => void` - Add bullet point handler
- `onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void` - Remove bullet point handler
- `onAddSectionItem?: (sectionType: SectionType, sectionOrder: number) => void` - Add dynamic section item
- `onRemoveSectionItem?: (sectionType: SectionType, sectionOrder: number, itemIndex: number) => void` - Remove dynamic section item
- `showSkillRatings?: boolean` - Enable skill ratings (default: false) - **Only set to true for specific templates that need ratings**

### ✅ 2. Required Imports
Every template must import:
- `InlineEditableText` - For editable text fields
- `InlineEditableDate` - For editable date fields
- `InlineEditableList` - For editable lists (experience, education)
- `InlineEditableSkills` - For editable skills
- `Plus, X` icons from `lucide-react` - For add/remove buttons
- `formatDate` helper function (or implement locally)

### ✅ 3. Dual Mode Rendering
Every section must support:
- **Editable mode**: Uses `InlineEditable*` components when `editable={true}`
- **Non-editable mode**: Renders static content when `editable={false}`

### ✅ 4. Data Structure Compliance
Must handle:
- `resumeData.personalInfo.*` - All personal info fields
- `resumeData.experience[]` - Experience array with `bulletPoints[]`
- `resumeData.education[]` - Education array with `gpa`
- `resumeData.skills[]` - Skills array
- `resumeData.sections[]` - Custom sections
- `resumeData.dynamicSections[]` - Dynamic sections (if supported)
- `resumeData.includeSocialLinks` - Social links flag

### ✅ 5. Bullet Points Priority
- **Always check `bulletPoints` array first**
- Only use `description` as fallback if `bulletPoints` is empty
- Must support adding/removing bullet points in editable mode

### ✅ 6. Conditional Rendering
- Check if data exists before rendering sections
- Use `hasContent()` helper in PDF templates
- Use `&&` conditional rendering in UI templates

---

## Quick Start: Universal Checklist

This checklist applies to **any template layout**:

### ✅ Step 1: File Structure
- [ ] UI Template exists: `src/components/resume/templates/[Name]Template.tsx`
- [ ] PDF Template exists: `src/components/resume/pdf/[Name]PDF.tsx`
- [ ] Both files are importable (no syntax errors)

### ✅ Step 2: Interface & Props
- [ ] Interface includes all required props (see [Required Props](#required-components--props))
- [ ] Component accepts and uses all props correctly
- [ ] TypeScript types are correct

### ✅ Step 3: Required Imports
- [ ] All `InlineEditable*` components imported
- [ ] `Plus, X` icons imported from `lucide-react`
- [ ] **CRITICAL**: Social Links icons imported: `Linkedin`, `Globe`, `Github` from `lucide-react`
- [ ] `ResumeData` type imported from `@/types/resume`
- [ ] No imports from `@/pages/Editor` (use `@/types/resume` instead)

### ✅ Step 4: Header/Personal Info Section
- [ ] Name field editable with `InlineEditableText`
- [ ] Title field editable (if exists)
- [ ] Contact info (email, phone, location) editable
- [ ] Photo support (if template uses photos)
- [ ] Both editable and non-editable modes work

### ✅ Step 5: Summary Section
- [ ] Summary editable with `multiline` prop
- [ ] Conditional rendering (only shows if exists)
- [ ] Proper styling (layout-specific, but readable)

### ✅ Step 6: Social Links Section
- [ ] **CRITICAL**: Social Links section must be implemented (not optional)
- [ ] **CRITICAL**: Social Links must be a separate section with its own heading (not part of header)
- [ ] Conditional rendering based on `includeSocialLinks` flag
- [ ] Check for at least one link: `(linkedin || portfolio || github)`
- [ ] All three links (LinkedIn, Portfolio, GitHub) supported
- [ ] Icons imported: `Linkedin`, `Globe`, `Github` from `lucide-react`
- [ ] Icons displayed with links (not just text)
- [ ] Editable in live editor with `InlineEditableText`
- [ ] Clickable links in non-editable mode (with `target="_blank" rel="noopener noreferrer"`)
- [ ] Left-aligned layout (not centered) - use `flex flex-wrap gap-4` or similar
- [ ] Same alignment in PDF template (use `justifyContent: 'flex-start'`, not `'center'`)
- [ ] **CRITICAL**: Social Links must render in PDF (not missing)
- [ ] PDF must include SVG icons for social links

### ✅ Step 7: Experience Section
- [ ] Uses `InlineEditableList` for editable mode
- [ ] **Bullet Points Management** implemented:
  - [ ] "Add Achievement" button when no bullets exist
  - [ ] "Add Achievement" button when bullets exist
  - [ ] Delete button on each bullet (hover visible)
  - [ ] Bullet points editable inline
- [ ] Date fields use `InlineEditableDate` with `formatDate`
- [ ] Position, company, dates all editable
- [ ] Fallback to description if no bullet points

### ✅ Step 8: Education Section
- [ ] **CRITICAL**: Uses `InlineEditableList` for editable mode
- [ ] **CRITICAL**: All education fields must be displayed:
  - [ ] Degree (required)
  - [ ] Field of Study (optional, but must render if exists)
  - [ ] School (required)
  - [ ] GPA (optional, but must render if exists)
  - [ ] Start Date (required, must use `InlineEditableDate` with `formatDate`)
  - [ ] End Date (required, must use `InlineEditableDate` with `formatDate`)
- [ ] Date fields use `InlineEditableDate` with `formatDate` helper (not raw dates)
- [ ] Proper spacing between education items
- [ ] **CRITICAL**: PDF template must match UI template - all fields must render in PDF

### ✅ Step 9: Skills Section
- [ ] Uses `InlineEditableSkills` for editable mode
- [ ] Skills render correctly (layout-specific styling)
- [ ] If template needs ratings: implement numeric rating pattern
- [ ] Proper spacing and wrapping

### ✅ Step 10: Custom Sections
- [ ] **CRITICAL**: Default custom section must be included in template defaults (see `getTemplateDefaults` in `resumeUtils.ts`)
- [ ] **CRITICAL**: Custom sections must be editable in live editor using `InlineEditableList`
- [ ] Basic sections (`resumeData.sections`) supported
- [ ] Dynamic sections (`resumeData.dynamicSections`) supported (if applicable)
- [ ] Section titles editable inline using `InlineEditableText` within `InlineEditableList`
- [ ] Section content editable with `multiline` using `InlineEditableText` within `InlineEditableList`
- [ ] Sections render in Form Editor, Live Preview, Live Editor, and PDF
- [ ] PDF template includes custom sections rendering
- [ ] Sections render even if only title or content exists (use OR logic, not AND)
- [ ] **CRITICAL**: Do NOT use simple `.map()` for sections in editable mode - must use `InlineEditableList`

### ✅ Step 11: PDF Template Matching
- [ ] PDF structure matches UI template structure
- [ ] Same data handling logic (bullet points priority, etc.)
- [ ] **CRITICAL**: Font sizes follow standards (see [Font Size & Spacing Standards](#font-size--spacing-standards))
  - [ ] Full Name: 26px (PDF) vs 36px (UI)
  - [ ] Section Heading: 10px (PDF) vs 12px (UI)
  - [ ] Position/Degree: 11px (PDF) vs 16px (UI)
  - [ ] Body Text/Company: 10px (PDF) vs 14px (UI)
  - [ ] Dates/Skills: 9px (PDF) vs 12px (UI)
- [ ] **CRITICAL**: Spacing follows standards (see [Font Size & Spacing Standards](#font-size--spacing-standards))
  - [ ] Section spacing: 20px (PDF) vs 32px (UI)
  - [ ] Section heading spacing: 15px (PDF) vs 20px (UI)
- [ ] Uses `hasContent()` for conditional rendering
- [ ] **CRITICAL**: Alignment matches live preview (left-aligned sections, not centered)
- [ ] Social Links alignment: Use `justifyContent: 'flex-start'` in PDF (not `'center'`)
- [ ] All sections should have matching alignment between UI and PDF
- [ ] **CRITICAL**: Custom sections must be included in PDF template
- [ ] Custom sections in PDF use OR logic: `hasContent(section.title) || hasContent(section.content)`

### ✅ Step 12: Registration
- [ ] Registered in `Editor.tsx` (PDF template)
- [ ] Registered in `LiveEditor.tsx` (both PDF and Template)
- [ ] Registered in `TemplatePreview.tsx`
- [ ] Registered in `ResumePreview.tsx`
- [ ] Registered in `EditableResumePreview.tsx`
- [ ] Added to `templateMeta.ts`
- [ ] Added to `professionCategories.ts`

---

## Required Components & Props

### Template Interface (Required)

```tsx
interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  onAddSectionItem?: (sectionType: SectionType, sectionOrder: number) => void;
  onRemoveSectionItem?: (sectionType: SectionType, sectionOrder: number, itemIndex: number) => void;
  showSkillRatings?: boolean; // Enable skill ratings (default: false) - Only set to true for specific templates
}
```

### Required Imports

```tsx
import type { ResumeData } from "@/types/resume";
import type { ResumeSection } from "@/types/resume"; // If using dynamic sections
import { Plus, X } from "lucide-react";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
```

### Date Formatter (Required)

```tsx
const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};
```

---

## Data Handling Patterns

These patterns apply regardless of layout:

### Pattern 1: Conditional Section Rendering

```tsx
{/* Always check if data exists */}
{resumeData.personalInfo.summary && (
  <div className="...">
    {/* Section content */}
  </div>
)}
```

### Pattern 2: Bullet Points Priority (CRITICAL)

```tsx
{/* ALWAYS check bulletPoints first */}
{exp.bulletPoints && exp.bulletPoints.length > 0 ? (
  <ul>
    {exp.bulletPoints.map((bullet, index) => (
      <li key={index}>• {bullet}</li>
    ))}
  </ul>
) : (
  /* Fallback to description only if no bullet points */
  exp.description && <p>{exp.description}</p>
)}
```

### Pattern 3: Dual Mode Rendering

```tsx
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
```

### Pattern 4: Bullet Point Management (Editable Mode)

**CRITICAL**: Always prevent event propagation to avoid triggering parent navigation.

```tsx
{/* Show "Add Achievement" when no bullets */}
{(!exp.bulletPoints || exp.bulletPoints.length === 0) && editable && onAddBulletPoint && exp.id && (
  <div onClick={(e) => e.stopPropagation()}>
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onAddBulletPoint(exp.id);
      }}
      className="..."
    >
      <Plus /> Add Achievement
    </button>
  </div>
)}

{/* Render bullets with delete buttons */}
{exp.bulletPoints && exp.bulletPoints.length > 0 && (
  <div onClick={(e) => e.stopPropagation()}>
    <ul>
      {exp.bulletPoints.map((bullet, bulletIndex) => (
        <li key={bulletIndex} className="group">
          <InlineEditableText
            path={`experience[${index}].bulletPoints[${bulletIndex}]`}
            value={bullet}
            className="..."
            multiline
          />
          {editable && onRemoveBulletPoint && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveBulletPoint(exp.id, bulletIndex);
              }}
              className="opacity-0 group-hover:opacity-100"
            >
              <X />
            </button>
          )}
        </li>
      ))}
    </ul>
    
    {/* Show "Add Achievement" when bullets exist */}
    {editable && onAddBulletPoint && exp.id && (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddBulletPoint(exp.id);
        }}
        className="..."
      >
        <Plus /> Add Achievement
      </button>
    )}
  </div>
)}
```

**Key Points:**
- ✅ Always use `type="button"` on buttons that shouldn't submit forms
- ✅ Always call `e.preventDefault()` and `e.stopPropagation()` in onClick handlers
- ✅ Wrap bullet point sections in a div with `onClick={(e) => e.stopPropagation()}` to prevent parent event handlers
- ✅ This prevents buttons from triggering navigation or form submission

---

## Font Size & Spacing Standards

> **Reference Template**: `minimal` - All standards are based on this template
> **Reference URL**: http://localhost:8080/dashboard/universal-professional/editor/minimal

### Standard Typography (Live Preview & Live Editor)

These standards apply to **both Live Preview and Live Editor** (UI templates):

| Element Type | Tailwind Class | Pixel Size | Font Weight | Notes |
|--------------|----------------|------------|-------------|-------|
| **Full Name** | `text-4xl` | 36px | `font-light` | Main heading |
| **Professional Title** | `text-base` | 16px | `font-light` | Subtitle below name |
| **Contact Info** | `text-xs` | 12px | Default | Email, phone, location |
| **Section Heading** | `text-xs` | 12px | `font-semibold` | Uppercase, `tracking-widest`, centered |
| **Summary** | `text-sm` | 14px | `font-light` | Body text |
| **Position (Experience)** | `text-base` | 16px | `font-semibold` | Job title |
| **Company** | `text-sm` | 14px | `font-light` | Company name |
| **Dates** | `text-xs` | 12px | `font-light` | Date ranges |
| **Bullet Points** | `text-sm` | 14px | `font-light` | Achievement bullets |
| **Degree (Education)** | `text-base` | 16px | `font-semibold` | Education degree |
| **Field of Study** | `text-sm` | 14px | `font-light` | Optional field |
| **School** | `text-sm` | 14px | `font-light` | School name |
| **GPA** | `text-xs` | 12px | `font-light` | Optional GPA |
| **Skills** | `text-xs` | 12px | `font-light` | Skill tags |
| **Custom Section Content** | `text-sm` | 14px | `font-light` | Section body text |

### Standard Spacing (Live Preview & Live Editor)

| Element | Tailwind Class | Pixel Size | Notes |
|---------|----------------|------------|-------|
| **Section Margin Bottom** | `mb-8` | 32px | Space between major sections |
| **Section Heading Margin Bottom** | `mb-5` | 20px | Space below section heading |
| **Experience Item Spacing** | `space-y-6` | 24px | Space between experience items |
| **Education Item Spacing** | `space-y-4` | 16px | Space between education items |
| **Bullet Point Spacing** | `space-y-1` | 4px | Space between bullet points |
| **Skills Gap** | `gap-x-3 gap-y-2` | 12px horizontal, 8px vertical | Space between skill tags |

### Standard Typography (PDF)

These standards apply to **PDF templates** (using `@react-pdf/renderer`):

| Element Type | fontSize | fontWeight | Notes |
|--------------|----------|------------|-------|
| **Full Name** | `26` | `300` (light) | Main heading |
| **Professional Title** | `11` | Default | Subtitle below name |
| **Contact Info** | `9` | Default | Email, phone, location |
| **Section Heading** | `10` | `700` (bold) | Uppercase, `letterSpacing: 2`, centered |
| **Summary** | `10` | Default | Body text |
| **Position (Experience)** | `11` | `700` (bold) | Job title |
| **Company** | `10` | Default | Company name |
| **Dates** | `9` | Default | Date ranges |
| **Bullet Points** | `9` | Default | Achievement bullets |
| **Degree (Education)** | `11` | `700` (bold) | Education degree |
| **School** | `10` | Default | School name |
| **GPA** | `9` | Default | Optional GPA |
| **Skills** | `9` | Default | Skill tags |
| **Custom Section Content** | `9` | Default | Section body text |

### Standard Spacing (PDF)

| Element | marginBottom | Notes |
|---------|--------------|-------|
| **Section Margin Bottom** | `20` | Space between major sections |
| **Section Heading Margin Bottom** | `15` | Space below section heading |
| **Experience Item Margin Bottom** | `20` | Space between experience items |
| **Education Item Margin Bottom** | `12` | Space between education items |
| **Bullet Point Margin Bottom** | `4` | Space between bullet points |
| **Skills Gap** | `8` | Space between skill tags (horizontal and vertical) |

### Conversion Ratio (UI to PDF)

When converting from UI to PDF, use these approximate ratios:

- **Main Heading**: UI 36px → PDF 26px (0.72x ratio)
- **Section Heading**: UI 12px → PDF 10px (0.83x ratio)
- **Subheading**: UI 16px → PDF 11px (0.69x ratio)
- **Body Text**: UI 14px → PDF 10px (0.71x ratio)
- **Small Text**: UI 12px → PDF 9px (0.75x ratio)
- **Section Spacing**: UI 32px → PDF 20px (0.63x ratio)
- **Heading Spacing**: UI 20px → PDF 15px (0.75x ratio)

### Layout-Specific Considerations

While the standards above are based on the `minimal` template, templates with different layouts may need adjustments:

- **Two-Column Layouts**: May need smaller fonts to fit content, but maintain relative ratios
- **Sidebar Layouts**: Sidebar may use different font sizes than main content, but maintain consistency within each area
- **Compact Templates**: May use smaller base font sizes, but maintain the same relative hierarchy
- **Bold/Colorful Templates**: May use different font weights or colors, but maintain the same font sizes

### Critical Requirements

1. **Consistency**: Same element types must have the same font sizes across all sections
2. **Hierarchy**: Clear visual hierarchy (headings > subheadings > body text)
3. **Readability**: Minimum font size should be readable (9px in PDF, 12px in UI)
4. **Matching**: PDF font sizes should be proportional to UI font sizes (use conversion ratios)
5. **Spacing**: Section spacing and heading spacing must be consistent throughout the template

---

## Preventing Infinite Render Loops

### Critical Best Practices

When working with React components, especially in contexts with state management and localStorage, follow these patterns to prevent infinite render loops:

#### 1. Use Refs for Tracking Initialization (Not State)

**❌ WRONG - Causes infinite loops:**
```tsx
const [hasLoaded, setHasLoaded] = useState(false);

useEffect(() => {
  if (!hasLoaded) {
    setHasLoaded(true);
    // This causes re-render, which triggers useEffect again
  }
}, [hasLoaded]); // hasLoaded in deps causes loop
```

**✅ CORRECT - Use refs:**
```tsx
const loadedRef = useRef<Set<string>>(new Set());

useEffect(() => {
  if (templateId && !loadedRef.current.has(templateId)) {
    // Do initialization
    loadedRef.current.add(templateId);
  }
}, [templateId]); // Only templateId in deps
```

#### 2. Avoid Function References in useEffect Dependencies

**❌ WRONG - Function references change on every render:**
```tsx
useEffect(() => {
  if (templateId) {
    setTemplateId(templateId);
    setResumeData(defaultData);
  }
}, [templateId, setTemplateId, setResumeData]); // Functions cause re-renders
```

**✅ CORRECT - Omit stable function references:**
```tsx
useEffect(() => {
  if (templateId) {
    setTemplateId(templateId);
    setResumeData(defaultData);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [templateId]); // Only actual dependencies
```

#### 3. Prevent Event Bubbling for Action Buttons

**❌ WRONG - Button click triggers parent navigation:**
```tsx
<Button onClick={() => addBulletPoint(exp.id)}>
  Add Achievement
</Button>
```

**✅ CORRECT - Stop event propagation:**
```tsx
<Button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    addBulletPoint(exp.id);
  }}
>
  Add Achievement
</Button>
```

#### 4. localStorage Sync Pattern (ResumeDataContext)

**❌ WRONG - Loading and saving in same effect:**
```tsx
useEffect(() => {
  // Load
  const saved = localStorage.getItem(key);
  if (saved) setData(JSON.parse(saved));
  
  // Save
  localStorage.setItem(key, JSON.stringify(data));
}, [data]); // This causes infinite loop
```

**✅ CORRECT - Separate effects with ref tracking:**
```tsx
// Track which templates have been loaded
const loadedTemplatesRef = useRef<Set<string>>(new Set());

// Load once per templateId
useEffect(() => {
  if (templateId && !loadedTemplatesRef.current.has(templateId)) {
    const saved = localStorage.getItem(`resume-data-${templateId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setResumeDataState(sanitizeResumeData(parsed));
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
    loadedTemplatesRef.current.add(templateId);
  }
}, [templateId]); // Only templateId in deps

// Save on changes (separate effect)
useEffect(() => {
  if (templateId) {
    localStorage.setItem(`resume-data-${templateId}`, JSON.stringify(resumeData));
  }
}, [resumeData, templateId]);
```

#### 5. Template Initialization Pattern (LiveEditor)

**❌ WRONG - Resets data on every render:**
```tsx
useEffect(() => {
  if (templateId) {
    setTemplateId(templateId);
    if (!resumeId) {
      setResumeData(getTemplateDefaults(templateId));
    }
  }
}, [templateId, resumeId, setTemplateId, setResumeData]); // Functions cause re-renders
```

**✅ CORRECT - Track initialization with ref:**
```tsx
// Track which templates have been initialized
const initializedTemplatesRef = useRef<Set<string>>(new Set());

useEffect(() => {
  if (templateId) {
    setTemplateId(templateId);
    
    // Only initialize once per template
    if (!resumeId && !initializedTemplatesRef.current.has(templateId)) {
      const defaultData = getTemplateDefaults(templateId);
      setResumeData(defaultData);
      initializedTemplatesRef.current.add(templateId);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [templateId, resumeId]); // Omit function references from deps
```

### Common Issues & Fixes

| Issue | Symptom | Fix |
|-------|---------|-----|
| Infinite renders | Page freezes, console spam | Use refs instead of state for tracking initialization |
| Button triggers navigation | Clicking "Add Achievement" navigates to live editor | Add `e.preventDefault()`, `e.stopPropagation()`, and wrap in div with stopPropagation |
| State updates loop | Component re-renders continuously | Remove function references from useEffect deps, use refs for tracking |
| localStorage loop | Data keeps resetting | Separate load and save effects with ref tracking |
| Event bubbling | Parent handlers fire when clicking child buttons | Wrap sections in divs with `onClick={(e) => e.stopPropagation()}` |

---

## Common Patterns (Layout-Independent)

### Pattern 1: Experience Section (Any Layout)

```tsx
{resumeData.experience.length > 0 && (
  <div className="..."> {/* Layout-specific wrapper */}
    <h2 className="..."> {/* Layout-specific heading style */}
      PROFESSIONAL EXPERIENCE
    </h2>
    {editable ? (
      <InlineEditableList
        path="experience"
        items={resumeData.experience}
        defaultItem={{...}}
        addButtonLabel="Add Experience"
        renderItem={(exp, index) => (
          <div>
            {/* Position, Company, Dates - layout-specific styling */}
            {/* Bullet Points Management - use Pattern 4 above */}
          </div>
        )}
      />
    ) : (
      <div>
        {resumeData.experience.map((exp) => (
          <div key={exp.id}>
            {/* Render position, company, dates */}
            {/* Render bullet points or description */}
          </div>
        ))}
      </div>
    )}
  </div>
)}
```

### Pattern 2: Social Links Section (Any Layout)

**CRITICAL**: This section must be implemented in all templates.

```tsx
import { Linkedin, Globe, Github } from "lucide-react";

{/* Social Links */}
{resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
  <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
    <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor, pageBreakAfter: 'avoid' }}>
      Social Links
    </h2>
    <div className="flex flex-wrap gap-4 text-[12.5px] text-gray-600">
      {resumeData.personalInfo.linkedin && (
        <div className="flex items-center gap-2">
          <Linkedin className="h-4 w-4" />
          {editable ? (
            <InlineEditableText
              path="personalInfo.linkedin"
              value={resumeData.personalInfo.linkedin}
              className="inline-block"
            />
          ) : (
            <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              LinkedIn
            </a>
          )}
        </div>
      )}
      {resumeData.personalInfo.portfolio && (
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {editable ? (
            <InlineEditableText
              path="personalInfo.portfolio"
              value={resumeData.personalInfo.portfolio}
              className="inline-block"
            />
          ) : (
            <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              Portfolio
            </a>
          )}
        </div>
      )}
      {resumeData.personalInfo.github && (
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          {editable ? (
            <InlineEditableText
              path="personalInfo.github"
              value={resumeData.personalInfo.github}
              className="inline-block"
            />
          ) : (
            <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              GitHub
            </a>
          )}
        </div>
      )}
    </div>
  </div>
)}
```

**PDF Template Pattern (Matching Alignment):**
```tsx
{/* Social Links */}
{resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: themeColor }]}>Social Links</Text>
    <View style={styles.socialLinksContainer}>
      {resumeData.personalInfo.linkedin && (
        <View style={styles.socialLinkItem}>
          <Svg width="10" height="10" viewBox="0 0 24 24">
            {/* LinkedIn SVG icon */}
          </Svg>
          <Text style={styles.linkText}>{resumeData.personalInfo.linkedin}</Text>
        </View>
      )}
      {/* Similar for portfolio and github */}
    </View>
  </View>
)}

// Styles - CRITICAL: Use flex-start, not center
socialLinksContainer: {
  flexDirection: 'row',
  justifyContent: 'flex-start', // Left-aligned to match UI
  flexWrap: 'wrap',
  gap: 12,
  fontSize: 9,
  color: '#6b7280',
},
socialLinkItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
},
```

**Key Points:**
- ✅ Must check `includeSocialLinks` flag
- ✅ Must check for at least one link before rendering section
- ✅ Left-aligned layout (not centered)
- ✅ PDF alignment must match UI alignment
- ✅ Icons with links side by side
- ✅ Editable in live editor, clickable in preview

### Pattern 3: Education Section (Any Layout)

**CRITICAL**: All education fields must be displayed and editable.

**UI Template Pattern:**
```tsx
{resumeData.education.length > 0 && (
  <div className="..." style={{ pageBreakInside: 'avoid' }}>
    <h2 className="..." style={{ pageBreakAfter: 'avoid' }}>
      EDUCATION
    </h2>
    {editable ? (
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
        }}
        addButtonLabel="Add Education"
        renderItem={(edu, index) => (
          <div className="mb-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <InlineEditableText
                  path={`education[${index}].degree`}
                  value={edu.degree}
                  className="text-[13px] font-semibold text-gray-900 block"
                  as="h3"
                />
                {edu.field && (
                  <InlineEditableText
                    path={`education[${index}].field`}
                    value={edu.field}
                    className="text-[12px] text-gray-600 block"
                    as="p"
                  />
                )}
                <InlineEditableText
                  path={`education[${index}].school`}
                  value={edu.school}
                  className="text-[12.5px] text-gray-700 block"
                  as="p"
                />
                {edu.gpa && (
                  <InlineEditableText
                    path={`education[${index}].gpa`}
                    value={`GPA: ${edu.gpa}`}
                    className="text-[11px] text-gray-500 block mt-0.5"
                    as="p"
                  />
                )}
              </div>
              <div className="text-[12px] text-gray-500 whitespace-nowrap flex items-center gap-1">
                <InlineEditableDate
                  path={`education[${index}].startDate`}
                  value={edu.startDate}
                  formatDisplay={formatDate}
                  className="inline-block"
                />
                <span> - </span>
                <InlineEditableDate
                  path={`education[${index}].endDate`}
                  value={edu.endDate}
                  formatDisplay={formatDate}
                  className="inline-block"
                />
              </div>
            </div>
          </div>
        )}
      />
    ) : (
      <div>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-gray-900">{edu.degree}</h3>
                {edu.field && <p className="text-[12px] text-gray-600">{edu.field}</p>}
                <p className="text-[12.5px] text-gray-700">{edu.school}</p>
                {edu.gpa && <p className="text-[11px] text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
              </div>
              <span className="text-[12px] text-gray-500 whitespace-nowrap">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
```

**PDF Template Pattern:**
```tsx
{resumeData.education.length > 0 && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Education</Text>
    {resumeData.education.map((edu) => (
      <View key={edu.id} style={styles.educationItem}>
        <View style={styles.educationContent}>
          <Text style={styles.educationDegree}>{edu.degree}</Text>
          {hasContent(edu.field) && <Text style={styles.educationField}>{edu.field}</Text>}
          <Text style={styles.educationSchool}>{edu.school}</Text>
          {hasContent(edu.gpa) && (
            <Text style={[styles.educationField, { marginTop: 2 }]}>GPA: {edu.gpa}</Text>
          )}
        </View>
        <Text style={styles.educationDate}>
          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
        </Text>
      </View>
    ))}
  </View>
)}
```

**Key Points:**
- ✅ **CRITICAL**: Must use `InlineEditableList` for editable mode
- ✅ **CRITICAL**: All fields must be displayed: degree, field (if exists), school, GPA (if exists), startDate, endDate
- ✅ **CRITICAL**: Dates must use `InlineEditableDate` with `formatDate` helper (not raw dates)
- ✅ **CRITICAL**: PDF template must match UI template - all fields must render in PDF
- ✅ Field and GPA are optional but must render if they exist
- ✅ Use conditional rendering: `{edu.field && ...}` and `{edu.gpa && ...}`
- ✅ Use `hasContent()` helper in PDF templates for optional fields

### Pattern 4: Custom Sections (Any Layout)

**CRITICAL**: All templates must include a default custom section in `getTemplateDefaults` in `resumeUtils.ts`. This ensures users always have a starting point for custom content.

**Default Section in `resumeUtils.ts`:**
```typescript
sections: [
  {
    id: "default-section-1",
    title: "Certifications",
    content: "Certification Name - Issuing Organization (Year)\nAdditional certifications can be added here",
  },
],
```

**UI Template Pattern:**
```tsx
{/* Custom Sections */}
{(resumeData.sections && resumeData.sections.length > 0) && (
  <>
    {editable ? (
      <InlineEditableList
        path="sections"
        items={resumeData.sections}
        defaultItem={{
          id: Date.now().toString(),
          title: "Certifications",
          content: "Certification Name",
        }}
        addButtonLabel="Add Section"
        renderItem={(section, index) => (
          <div key={section.id} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <InlineEditableText
              path={`sections[${index}].title`}
              value={section.title || ""}
              placeholder="Section Title"
              className="text-[14px] font-semibold mb-6 block"
              style={{ color: themeColor, pageBreakAfter: 'avoid' }}
              as="h2"
            />
            <InlineEditableText
              path={`sections[${index}].content`}
              value={section.content || ""}
              placeholder="Section content..."
              className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block"
              multiline
              as="p"
            />
          </div>
        )}
      />
    ) : (
      resumeData.sections.map((section) => (
        (section.title || section.content) && (
          <div key={section.id} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            {section.title && (
              <h2 className="text-[14px] font-semibold mb-6" style={{ color: themeColor, pageBreakAfter: 'avoid' }}>
                {section.title}
              </h2>
            )}
            {section.content && (
              <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                {section.content}
              </p>
            )}
          </div>
        )
      ))
    )}
  </>
)}
```

**PDF Template Pattern:**
```tsx
{/* Custom Sections */}
{resumeData.sections && resumeData.sections.length > 0 && (
  <>
    {resumeData.sections.map((section) => (
      hasContent(section.title) || hasContent(section.content) ? (
        <View key={section.id} style={styles.section}>
          {hasContent(section.title) && (
            <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title || "Section"}</Text>
          )}
          {hasContent(section.content) && (
            <Text style={styles.summary}>{section.content}</Text>
          )}
        </View>
      ) : null
    ))}
  </>
)}
```

**Key Points:**
- ✅ Default section must be included in `getTemplateDefaults` in `resumeUtils.ts`
- ✅ Use OR logic (`hasContent(section.title) || hasContent(section.content)`) to render sections
- ✅ Sections must render in Form Editor, Live Preview, Live Editor, and PDF
- ✅ Use placeholders for empty sections in editable mode
- ✅ Do NOT add "Add Custom Section" or "Add Certifications" buttons in LiveEditor (users can add sections via InlineEditableList)

### Pattern 5: Skills Section (Any Layout)

**Default (No Ratings) - Use this for most templates:**
```tsx
{resumeData.skills.length > 0 && (
  <div className="..."> {/* Layout-specific wrapper */}
    <h2 className="..."> {/* Layout-specific heading style */}
      SKILLS
    </h2>
    {editable ? (
      <InlineEditableSkills
        path="skills"
        skills={resumeData.skills}
        renderSkill={(skill, index) => (
          <span className="..."> {/* Layout-specific skill styling */}
            {skill.name}
          </span>
        )}
      />
    ) : (
      <div className="..."> {/* Layout-specific container */}
        {resumeData.skills.map((skill) => (
          <span key={skill.id} className="..."> {/* Layout-specific skill styling */}
            {skill.name}
          </span>
        ))}
      </div>
    )}
  </div>
)}
```

**With Ratings (Only if `showSkillRatings={true}` prop is passed):**
```tsx
import { InlineEditableSkillsWithRating } from "@/components/resume/InlineEditableSkillsWithRating";

{resumeData.skills.length > 0 && (
  <div className="..."> {/* Layout-specific wrapper */}
    <h2 className="..."> {/* Layout-specific heading style */}
      SKILLS
    </h2>
    {editable ? (
      <InlineEditableSkillsWithRating
        path="skills"
        skills={resumeData.skills}
        showRating={showSkillRatings && resumeData.skills.some(skill => skill.rating && skill.rating.trim() !== "")}
        verticalLayout={showSkillRatings && resumeData.skills.some(skill => skill.rating && skill.rating.trim() !== "")}
        renderSkill={(skill, index) => (
          <span className="..."> {/* Layout-specific skill styling */}
            {skill.name}
            {showSkillRatings && skill.rating && skill.rating.trim() !== "" && (
              <span className="...">({skill.rating})</span>
            )}
          </span>
        )}
      />
    ) : (
      <div className="..."> {/* Layout-specific container */}
        {resumeData.skills.map((skill) => (
          <span key={skill.id} className="..."> {/* Layout-specific skill styling */}
            {skill.name}
            {showSkillRatings && skill.rating && skill.rating.trim() !== "" && (
              <span className="...">({skill.rating})</span>
            )}
          </span>
        ))}
      </div>
    )}
  </div>
)}
```

**Note:** By default, all templates should use `InlineEditableSkills` (no ratings). Only use `InlineEditableSkillsWithRating` when `showSkillRatings={true}` is explicitly passed to the template. To enable ratings for a specific template, add its ID to the `templatesWithSkillRatings` array in `src/pages/LiveEditor.tsx`.

**Current templates with ratings enabled:** `premium-pro`, `premium-elite`, `refined` (Note: `premium-universal` does NOT use ratings)

---

## Verification Script

See `scripts/verify-template.js` for automated verification.

---

## Success Criteria (Layout-Agnostic)

A template is **production-ready** when:

1. ✅ All required props are accepted
2. ✅ All required imports are present (including Social Links icons)
3. ✅ Dual mode rendering works (editable/non-editable)
4. ✅ Bullet points can be added/removed in live editor **without triggering navigation**
5. ✅ All sections render correctly in Form Editor
6. ✅ All sections editable in Live Editor
7. ✅ **Social Links section is implemented** (not missing)
8. ✅ **Default custom section is included** in template defaults (`getTemplateDefaults` in `resumeUtils.ts`)
9. ✅ **Custom sections render in PDF** (not missing)
10. ✅ **Education section displays all fields**: degree, field (if exists), school, GPA (if exists), startDate, endDate
11. ✅ **Education dates use `InlineEditableDate` with `formatDate`** (not raw dates)
12. ✅ **Education section uses `InlineEditableList`** for editable mode
13. ✅ **PDF education section matches UI** - all fields render in PDF
14. ✅ PDF export matches preview (structurally, not necessarily pixel-perfect)
15. ✅ **PDF alignment matches live preview** (left-aligned sections, not centered)
16. ✅ **Font sizes follow standards** (see [Font Size & Spacing Standards](#font-size--spacing-standards))
    - ✅ UI: Full Name `text-4xl` (36px), Section Heading `text-xs` (12px), Position/Degree `text-base` (16px), Body `text-sm` (14px), Dates/Skills `text-xs` (12px)
    - ✅ PDF: Full Name 26px, Section Heading 10px, Position/Degree 11px, Body 10px, Dates/Skills 9px
17. ✅ **Spacing follows standards** (see [Font Size & Spacing Standards](#font-size--spacing-standards))
    - ✅ UI: Section spacing `mb-8` (32px), Section heading spacing `mb-5` (20px)
    - ✅ PDF: Section spacing 20px, Section heading spacing 15px
18. ✅ All registrations complete
19. ✅ No TypeScript errors
20. ✅ No console errors
21. ✅ **No infinite render loops** (page doesn't freeze)
22. ✅ **Event handlers properly prevent propagation** (buttons don't trigger navigation)
23. ✅ Sync works between Form and Live editors

---

## Layout-Specific Notes

### Two-Column Layouts
- Ensure both columns render in PDF
- Maintain column widths consistently
- Handle page breaks properly

### Sidebar Layouts
- Sidebar content in left column
- Main content in right column
- Ensure PDF matches layout

### Compact Templates
- May use smaller base font sizes
- Maintain relative sizing ratios
- Ensure readability

### Creative/Unusual Layouts
- Follow core requirements (props, imports, data handling)
- Maintain functionality (editing, bullet points, etc.)
- Ensure PDF is structurally similar (may not be pixel-perfect)

---

## Next Steps

1. **Run Verification Script**: `node scripts/verify-template.js [template-name]`
2. **Fix Issues**: Address any issues found by the script
3. **Manual Testing**: Test in Form Editor, Live Editor, and PDF export
4. **Verify Sync**: Ensure changes sync between editors

This workflow ensures **functionality and data handling consistency** across all templates, regardless of layout differences.
