# Fresher Templates Fix Workflow

> **Goal**: Fix all 87 fresher templates to meet consistent standards
> **Reference Template**: `universal-professional/editor/minimal` (MinimalTemplate.tsx)
> **Expected Duration**: Systematic approach for batch fixes

---

## Overview

This workflow provides a systematic approach to fix all common issues in fresher templates. The workflow is divided into phases, starting with automated checks and fixes, then manual template-by-template fixes.

---

## Phase 1: Discovery & Audit

### Step 1.1: Run Verification Script

```bash
# Verify all 87 fresher templates
node scripts/verify-fresher-templates.js all

# Verify specific template
node scripts/verify-fresher-templates.js achiever-fresher
```

This will:
- Check all 87 templates for common issues
- Generate a detailed JSON report: `FRESHER_TEMPLATES_VERIFICATION_REPORT.json`
- Categorize issues by type

### Step 1.2: Analyze Report

Review the generated report to understand:
- Which templates have the most issues
- Common patterns in issues
- Templates that are close to standards

### Step 1.3: Prioritize Templates

Priority order:
1. **High Priority**: Templates with critical issues (missing add button, content not binding)
2. **Medium Priority**: Templates with font/spacing issues
3. **Low Priority**: Templates with only warnings

---

## Phase 2: Batch Automated Fixes

### Step 2.1: Fix Font Sizes (Where Possible)

Some font size fixes can be automated. Create a script to:
- Replace common non-standard sizes with standards
- Use regex patterns to find and replace

**Common replacements**:
- `text-[32px]` → `text-[27px]` (name)
- `text-[18px]` → `text-[15px]` (headings)
- `text-[16px]` → `text-[13px]` (body text)

**⚠️ Warning**: Review each replacement carefully as some templates may have intentional design variations.

### Step 2.2: Fix Font Colors (Where Possible)

Standardize text colors:
- Replace custom grays with standard colors
- Ensure theme color is used consistently

**Common replacements**:
- Custom grays → Standard colors from PDF config
- Ensure WCAG contrast ratios

### Step 2.3: Add Missing Imports

Ensure all templates have required imports:
- `InlineEditableText`
- `InlineEditableDate`
- `InlineEditableList`
- `InlineEditableSkills`
- `Plus`, `X` from `lucide-react`

---

## Phase 3: Structural Fixes (Template-by-Template)

For each template, follow this checklist:

### ✅ Checklist for Each Template

#### 1. Custom Sections with Add Button

**⚠️ CRITICAL**: The "Add Section" button must be at the **absolute bottom** of the resume, **outside** all column/grid layouts.

**Reference**: `GraduateTemplate.tsx` - See `ADD_SECTION_BUTTON_STANDARD.md`

**What to add**:
```tsx
// At the VERY END of the template, AFTER all content and layouts
{editable && (
  <div className="mt-8 pt-6 border-t border-gray-200">
    <div className="flex justify-center w-full">
      <button
        onClick={handleAddSection}
        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
        style={{ color: accent, borderColor: accent }}
      >
        <Plus className="h-4 w-4" />
        Add Section
      </button>
    </div>
  </div>
)}
```

**For Two-Column Layouts**:
```tsx
<div className="grid grid-cols-2 gap-6">
  {/* All content */}
  <CustomSections renderButton={false} />
</div>

{/* Button OUTSIDE the grid, at absolute bottom */}
{editable && (
  <div className="mt-8 pt-6 border-t border-gray-200">
    <AddSectionButton />
  </div>
)}
```

**Required component**:
```tsx
// Separate component to use hooks
const TemplateNameCustomSections = ({ 
  sections, 
  editable, 
  themeColor 
}: { 
  sections: ResumeData['sections']; 
  editable: boolean; 
  themeColor?: string;
}) => {
  const inlineEditContext = useInlineEdit();
  const addArrayItem = inlineEditContext?.addArrayItem;
  const removeArrayItem = inlineEditContext?.removeArrayItem;

  const handleAddSection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!addArrayItem) return;
    addArrayItem('sections', {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      items: ['Sample item 1', 'Sample item 2'],
    });
  };

  // ... render sections with InlineEditableSectionItems or InlineCustomSections
};
```

#### 2. Experience Section Binding

**Reference**: `MinimalTemplate.tsx` lines 157-335

**What to check**:
- Uses `InlineEditableList` or `InlineExperienceSection`
- Checks `bulletPoints` array BEFORE `description`
- Has "Add Achievement" buttons
- Uses `onAddBulletPoint` and `onRemoveBulletPoint` props

**Pattern**:
```tsx
{exp.bulletPoints && exp.bulletPoints.length > 0 ? (
  // Render bullets
) : (
  // Fallback to description
)}
```

#### 3. Custom Sections Content Binding

**Options**:

**Option A**: Use `InlineCustomSections` component (recommended)
```tsx
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";

<InlineCustomSections
  sections={resumeData.sections}
  editable={editable}
  accentColor={accent}
  renderHeader={(title) => (
    <h2 style={{ color: accent }}>{title}</h2>
  )}
/>
```

**Option B**: Custom implementation with hooks (if design requires it)
```tsx
const inlineEditContext = useInlineEdit();
// ... implement add/remove/update logic
```

#### 4. Editor Sync

Ensure all fields use inline editable components:
- Text fields → `InlineEditableText`
- Date fields → `InlineEditableDate`
- Lists → `InlineEditableList`
- Skills → `InlineEditableSkills`

#### 5. Font Sizes & Colors

Follow PDF standards from `src/lib/pdfstandards.ts`:
- Name: `27px` (20pt)
- Headings: `15px` (11pt)
- Body: `13px` (10pt)
- Dates: `13px` (10pt)
- Skills: `12px` (9pt)

Colors:
- Primary text: `#1a1a1a`
- Secondary text: `#525252`
- Muted text: `#737373`

#### 6. Spacing

Standard spacing:
- Section gap: `32px` (`mb-8`)
- Item gap: `20px` (`mb-5`)
- Bullet gap: `8px`

---

## Phase 4: Testing

### Step 4.1: Manual Testing Checklist

For each fixed template, test:

1. **Form Editor**:
   - [ ] Add custom section → appears in live preview
   - [ ] Edit custom section content → updates in live preview
   - [ ] Add experience bullet point → appears in live preview
   - [ ] Edit experience → syncs with live preview

2. **Live Editor**:
   - [ ] "Add Section" button appears at end
   - [ ] Can add custom section via button
   - [ ] Can edit custom section inline
   - [ ] Can add/remove bullet points in experience
   - [ ] All fields are editable inline

3. **PDF Export**:
   - [ ] Custom sections appear in PDF
   - [ ] Experience bullet points appear in PDF
   - [ ] Font sizes are correct
   - [ ] Colors are correct
   - [ ] Spacing is consistent

### Step 4.2: Re-run Verification

```bash
node scripts/verify-fresher-templates.js all
```

All templates should pass or have minimal warnings.

---

## Phase 5: Documentation

### Step 5.1: Update Template Documentation

Document any design-specific variations that are intentional (e.g., larger name for specific template).

### Step 5.2: Update Workflow

If new common issues are discovered, update this workflow.

---

## Quick Fix Guide: Template-by-Template

### Template Fix Steps (Per Template)

1. **Open template file**: `src/components/resume/templates/[Name]Template.tsx`

2. **Check imports**:
   ```tsx
   import { InlineEditableText } from "@/components/resume/InlineEditableText";
   import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
   import { InlineEditableList } from "@/components/resume/InlineEditableList";
   import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
   import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
   import { Plus, X } from "lucide-react";
   import { useInlineEdit } from "@/contexts/InlineEditContext";
   ```

3. **Fix custom sections**:
   - Add custom sections component (or use `InlineCustomSections`)
   - Add "Add Section" button at end
   - Ensure content binds properly

4. **Fix experience section**:
   - Use `InlineExperienceSection` or `InlineEditableList`
   - Check `bulletPoints` array first
   - Add bullet point buttons

5. **Fix font sizes**:
   - Replace non-standard sizes with standards
   - Use PDF standard sizes

6. **Fix font colors**:
   - Replace custom colors with standards
   - Ensure theme color consistency

7. **Test**:
   - Test in form editor
   - Test in live editor
   - Test PDF export

8. **Verify**:
   ```bash
   node scripts/verify-fresher-templates.js [template-name]
   ```

---

## Common Patterns Reference

### Pattern 1: Custom Sections with Add Button

```tsx
// At end of template component
{resumeData.sections && resumeData.sections.length > 0 && (
  <TemplateCustomSections 
    sections={resumeData.sections}
    editable={editable}
    themeColor={themeColor}
  />
)}

// Separate component
const TemplateCustomSections = ({ sections, editable, themeColor }) => {
  const inlineEditContext = useInlineEdit();
  const addArrayItem = inlineEditContext?.addArrayItem;
  
  const handleAddSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!addArrayItem) return;
    addArrayItem('sections', {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      items: [],
    });
  };
  
  return (
    <>
      {sections.map((section, index) => (
        // Render section
      ))}
      {editable && (
        <button onClick={handleAddSection}>
          <Plus /> Add Section
        </button>
      )}
    </>
  );
};
```

### Pattern 2: Experience with Bullet Points

```tsx
{resumeData.experience.length > 0 && (
  <InlineExperienceSection
    items={resumeData.experience}
    editable={editable}
    accentColor={accent}
    title="Professional Experience"
  />
)}
```

Or custom:
```tsx
{resumeData.experience.map((exp, index) => (
  <div key={exp.id}>
    {/* Header */}
    {exp.bulletPoints && exp.bulletPoints.length > 0 ? (
      <ul>
        {exp.bulletPoints.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    ) : (
      <p>{exp.description}</p>
    )}
  </div>
))}
```

---

## Progress Tracking

### Template Status

Use this format to track progress:

```markdown
## Template Status

- [x] achiever-fresher - ✅ Fixed
- [ ] fresher-elite - 🔄 In Progress
- [ ] fresher-timeline - ⏳ Pending
```

### Issue Tracking

Track common issues found:

1. Missing custom sections add button: 45 templates
2. Experience content not binding: 38 templates
3. Font sizes not standard: 67 templates
4. Font colors not standard: 52 templates
5. Missing editor sync: 41 templates

---

## Next Steps

1. **Run verification script** to get baseline
2. **Prioritize templates** based on issue count
3. **Start fixing** high-priority templates first
4. **Test thoroughly** after each fix
5. **Document** any intentional variations

---

## Questions & Support

If you encounter issues during fixes:

1. Check reference template: `MinimalTemplate.tsx`
2. Check PDF standards: `src/lib/pdfstandards.ts`
3. Check component docs: Component files in `src/components/resume/`
4. Review existing working templates for patterns

---

## Estimated Timeline

- **Phase 1 (Audit)**: 1-2 hours
- **Phase 2 (Automated Fixes)**: 2-4 hours
- **Phase 3 (Template-by-Template)**: 20-40 hours (depending on issues)
- **Phase 4 (Testing)**: 10-15 hours
- **Phase 5 (Documentation)**: 2-3 hours

**Total**: ~35-65 hours for all 87 templates

---

## Notes

- Some templates may have intentional design variations - document these
- PDF standards should be followed for consistency
- Always test both form editor and live editor
- Verify PDF export after each fix






