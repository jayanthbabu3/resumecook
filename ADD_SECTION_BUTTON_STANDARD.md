# Add Section Button Standard - Always at Bottom

> **CRITICAL**: The "Add Section" button must ALWAYS appear at the absolute bottom of the resume, outside of any column layouts.

---

## Standard Pattern

### ✅ Correct Implementation

The "Add Section" button should be:
1. **Outside all column/grid layouts**
2. **At the absolute bottom** of the resume content
3. **Only visible when `editable={true}`
4. **Separated from sections** with clear visual separation (border, spacing)

### Example Pattern:

```tsx
export const TemplateName = ({ resumeData, editable, themeColor }) => {
  return (
    <div className="w-full h-full bg-white p-12">
      {/* Header */}
      <div>...</div>

      {/* Main Content - All sections here */}
      <div className="space-y-6">
        {/* Education */}
        {/* Experience */}
        {/* Skills */}
        {/* Custom Sections (without button) */}
        <TemplateCustomSections
          sections={resumeData.sections || []}
          editable={editable}
          themeColor={themeColor}
          renderButton={false} // Don't render button here
        />
      </div>

      {/* Add Section Button - ALWAYS AT BOTTOM, OUTSIDE ALL LAYOUTS */}
      {editable && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <TemplateAddSectionButton themeColor={themeColor} />
        </div>
      )}
    </div>
  );
};

// Custom Sections Component (renders sections only, no button)
const TemplateCustomSections = ({ 
  sections, 
  editable, 
  themeColor,
  renderButton = false 
}) => {
  // Render sections only
  if (!sections || sections.length === 0) return null;

  return (
    <section>
      {sections.map((section, index) => (
        // Render section content
      ))}
    </section>
  );
};

// Add Section Button Component (separate, always at bottom)
const TemplateAddSectionButton = ({ themeColor }) => {
  const inlineEditContext = useInlineEdit();
  const addArrayItem = inlineEditContext?.addArrayItem;

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

  const accent = themeColor || "#2563eb";

  return (
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
  );
};
```

---

## For Two-Column Layouts

### ✅ Correct Pattern:

```tsx
<div className="w-full h-full bg-white p-12">
  {/* Header */}
  <div>...</div>

  {/* Two Column Layout */}
  <div className="grid grid-cols-3 gap-6">
    {/* Left Column */}
    <div className="col-span-1">
      {/* Education, Skills, etc. */}
    </div>

    {/* Right Column */}
    <div className="col-span-2">
      {/* Summary, Experience, Custom Sections */}
      <TemplateCustomSections
        sections={resumeData.sections || []}
        editable={editable}
        themeColor={themeColor}
        renderButton={false}
      />
    </div>
  </div>

  {/* Add Section Button - OUTSIDE THE GRID, AT BOTTOM */}
  {editable && (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <TemplateAddSectionButton themeColor={themeColor} />
    </div>
  )}
</div>
```

### ❌ WRONG - Button inside column:

```tsx
<div className="col-span-2">
  {/* Custom Sections */}
  <TemplateCustomSections ... />
  
  {/* ❌ WRONG: Button is inside the column, not at bottom */}
  {editable && <AddSectionButton />}
</div>
```

---

## Required Imports

```tsx
import { Plus, X } from "lucide-react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
```

---

## Checklist for Every Template

- [ ] "Add Section" button is **outside** all grid/column layouts
- [ ] Button is at the **absolute bottom** of the resume
- [ ] Button only shows when `editable={true}`
- [ ] Button has visual separation (border-top, spacing)
- [ ] Custom sections component does NOT render the button
- [ ] Add Section button is in a **separate component**
- [ ] Button uses `useInlineEdit` hook correctly
- [ ] Button styling matches theme color

---

## Visual Separation

The button should have clear separation from content:

```tsx
{editable && (
  <div className="mt-8 pt-6 border-t border-gray-200">
    {/* Add Section Button */}
  </div>
)}
```

Or with more spacing:

```tsx
{editable && (
  <div className="mt-12 pt-8 border-t-2 border-gray-300">
    {/* Add Section Button */}
  </div>
)}
```

---

## Testing Checklist

1. Open template in live editor (`editable={true}`)
2. Scroll to the very bottom of the resume
3. Verify "Add Section" button appears at absolute bottom
4. Verify button is not inside any column layout
5. Verify button works (adds new section)
6. Verify button styling matches theme color
7. Check in form editor that changes sync

---

## Reference Implementation

See: `src/components/resume/templates/GraduateTemplate.tsx`

- ✅ Button is outside grid layout
- ✅ Button at absolute bottom
- ✅ Separate component for button
- ✅ Visual separation with border-top

---

## Common Mistakes to Avoid

1. ❌ Putting button inside a column/grid
2. ❌ Rendering button inside custom sections component
3. ❌ Button appearing mid-page
4. ❌ No visual separation from content
5. ❌ Button not using `useInlineEdit` hook
6. ❌ Button visible when `editable={false}`

---

## Update Workflow

When fixing templates:

1. Move "Add Section" button OUTSIDE all layouts
2. Create separate component for button
3. Update custom sections to NOT render button
4. Add visual separation at bottom
5. Test in browser to verify position






