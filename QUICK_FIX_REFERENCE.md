# Quick Fix Reference Guide

> Quick reference for fixing fresher templates

---

## Quick Commands

```bash
# Verify all 87 fresher templates
node scripts/verify-fresher-templates.js all

# Verify specific template
node scripts/verify-fresher-templates.js achiever-fresher

# View report (after running verification)
cat FRESHER_TEMPLATES_VERIFICATION_REPORT.json | jq
```

---

## Common Fixes - Copy & Paste

### 1. Add Custom Sections Component

**⚠️ IMPORTANT**: Add Section button must be at the **absolute bottom**, outside all layouts.

```tsx
// Add to imports
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { Plus, X } from "lucide-react";

// Add sections in content area (NO button here)
<TemplateNameCustomSections 
  sections={resumeData.sections || []}
  editable={editable}
  themeColor={themeColor}
  renderButton={false}
/>

// Add Section Button - AT ABSOLUTE BOTTOM, OUTSIDE ALL LAYOUTS
{editable && (
  <div className="mt-8 pt-6 border-t border-gray-200">
    <TemplateNameAddSectionButton themeColor={themeColor} />
  </div>
)}

// Add this component at end of file
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
  const accent = themeColor || "#2563eb";

  const handleAddSection = (e: React.MouseEvent) => {
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

  const handleRemoveSection = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!removeArrayItem) return;
    removeArrayItem('sections', index);
  };

  return (
    <>
      {sections.map((section, index) => (
        <div key={section.id} className="mb-8 group/section">
          <div className="flex items-center justify-between mb-3">
            <h2 
              className="text-[15px] font-semibold uppercase tracking-wide"
              style={{ color: accent }}
            >
              {editable ? (
                <InlineEditableText 
                  path={`sections[${index}].title`} 
                  value={section.title} 
                  className="inline-block" 
                />
              ) : section.title}
            </h2>
            {editable && (
              <button
                onClick={(e) => handleRemoveSection(e, index)}
                className="opacity-0 group-hover/section:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                style={{ color: '#ef4444' }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <InlineEditableSectionItems
            sectionIndex={index}
            items={section.items || []}
            content={section.content || ""}
            editable={editable}
            itemStyle={{ fontSize: '13px', color: '#525252', lineHeight: '1.5' }}
            accentColor={accent}
          />
        </div>
      ))}

      {/* Add Section Button */}
      {editable && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddSection}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-4 w-4" />
            Add Section
          </button>
        </div>
      )}
    </>
  );
};
```

### 2. Fix Experience Section

```tsx
// Option 1: Use InlineExperienceSection (Recommended)
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";

{resumeData.experience && resumeData.experience.length > 0 && (
  <InlineExperienceSection
    items={resumeData.experience}
    editable={editable}
    accentColor={accent}
    title="Professional Experience"
    renderHeader={(title) => (
      <h2 className="text-[15px] font-semibold mb-4 uppercase" style={{ color: accent }}>
        {title}
      </h2>
    )}
  />
)}

// Option 2: Custom with bullet points priority
{resumeData.experience.map((exp, index) => {
  const hasBullets = exp.bulletPoints && exp.bulletPoints.length > 0;
  
  return (
    <div key={exp.id} className="mb-5">
      {/* Header */}
      <div className="flex justify-between mb-2">
        <div>
          <h3 className="text-[15px] font-semibold">{exp.position}</h3>
          <p className="text-[14px]" style={{ color: accent }}>{exp.company}</p>
        </div>
        <span className="text-[13px] text-gray-600">{exp.startDate} - {exp.endDate}</span>
      </div>
      
      {/* Content - Bullets First! */}
      {hasBullets ? (
        <ul className="space-y-1">
          {exp.bulletPoints.map((bullet, i) => (
            <li key={i} className="text-[13px] text-gray-700">• {bullet}</li>
          ))}
        </ul>
      ) : exp.description ? (
        <p className="text-[13px] text-gray-700">{exp.description}</p>
      ) : null}
    </div>
  );
})}
```

### 3. Standard Font Sizes

```tsx
// Name
className="text-[27px] font-bold"  // or text-3xl (close)

// Section Headings
className="text-[15px] font-semibold uppercase"  // or text-base

// Body Text
className="text-[13px] text-gray-700"  // or text-sm

// Dates
className="text-[13px] text-gray-600"  // or text-xs

// Skills
className="text-[12px]"  // or text-xs
```

### 4. Standard Font Colors

```tsx
// Primary Text
style={{ color: '#1a1a1a' }}  // or className="text-gray-900"

// Secondary Text
style={{ color: '#525252' }}  // or className="text-gray-700"

// Muted Text
style={{ color: '#737373' }}  // or className="text-gray-600"

// Theme Color (for accents)
style={{ color: accent }}
```

### 5. Standard Spacing

```tsx
// Section Gap
className="mb-8"  // 32px

// Item Gap
className="mb-5"  // 20px

// Bullet Gap
className="space-y-2"  // 8px between bullets
```

---

## Required Imports Checklist

```tsx
// Basic inline editing
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

// Custom sections (choose one)
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
// OR use custom with hooks:
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";

// Experience section
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";

// Icons
import { Plus, X } from "lucide-react";

// Types
import type { ResumeData } from "@/types/resume";
```

---

## Fix Checklist (Per Template)

- [ ] Add required imports
- [ ] Fix font sizes to PDF standards
- [ ] Fix font colors to PDF standards
- [ ] Add custom sections component with "Add Section" button
- [ ] Fix experience section (bullet points priority)
- [ ] Ensure all fields use inline editable components
- [ ] Fix spacing to standards
- [ ] Test in form editor
- [ ] Test in live editor
- [ ] Test PDF export
- [ ] Re-run verification script

---

## Testing URLs

```bash
# Form Editor
http://localhost:8080/dashboard/fresh-graduates/editor/[template-name]

# Live Editor
http://localhost:8080/dashboard/fresh-graduates/editor/[template-name]?mode=live
```

---

## Common Issues & Solutions

### Issue: Custom sections not appearing
**Solution**: Check if using `InlineCustomSections` or custom component with `useInlineEdit` hook

### Issue: Experience bullet points not showing
**Solution**: Check `bulletPoints` array BEFORE `description` field

### Issue: "Add Section" button not working
**Solution**: Ensure using `useInlineEdit` hook and `addArrayItem('sections', {...})`

### Issue: Form and live editor not syncing
**Solution**: Ensure all fields use `InlineEditableText`, `InlineEditableDate`, etc.

---

## Quick Copy Templates

### Minimal Custom Sections
See section 1 above for full code.

### Minimal Experience Section
```tsx
<InlineExperienceSection
  items={resumeData.experience}
  editable={editable}
  accentColor={accent}
  title="Experience"
/>
```

### Minimal Skills Section
```tsx
{resumeData.skills && resumeData.skills.length > 0 && (
  <div className="mb-8">
    <h2 className="text-[15px] font-semibold mb-4 uppercase" style={{ color: accent }}>
      Skills
    </h2>
    <div className="flex flex-wrap gap-2">
      {resumeData.skills.map((skill) => (
        <span 
          key={skill.id}
          className="px-3 py-1 text-[12px] rounded"
          style={{ border: `1px solid ${accent}`, color: accent }}
        >
          {skill.name}
        </span>
      ))}
    </div>
  </div>
)}
```

---

## Need Help?

- Reference Template: `src/components/resume/templates/MinimalTemplate.tsx`
- PDF Standards: `src/lib/pdfstandards.ts`
- Components: `src/components/resume/`






