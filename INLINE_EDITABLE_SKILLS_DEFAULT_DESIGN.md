# InlineEditableSkills - Default Design Pattern

## Answer: Yes, there IS a common default design!

When you use `InlineEditableSkills` **without** a custom `renderSkill` prop, you get a **consistent default design** across all templates.

---

## Default Design (No Custom renderSkill)

### Visual Appearance:
- **Component**: Badge (secondary variant)
- **Layout**: Flex wrap with `gap-2` (8px spacing)
- **Style**: 
  - Background: `${themeColor}20` (20% opacity of theme color)
  - Text color: Theme color (full opacity)
  - Border: Rounded full (pill shape)
  - Font: Default badge styling

### Code Example (Default):
```tsx
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills || []}
  themeColor={themeColor}  // Optional - applies theme color to badges
  className="text-[13px]"   // Optional - for font size
/>
```

**Result**: All templates using this pattern will have **identical badge styling**, only the theme color changes.

---

## Custom Design (With renderSkill Prop)

Many templates override the default by providing a custom `renderSkill` function to match their specific design:

### Example 1: Custom Badge Styling
```tsx
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills || []}
  renderSkill={(skill, index) => (
    <Badge
      variant="secondary"
      style={{ backgroundColor: `${accent}20`, color: accent }}
      className="text-xs font-medium"
    >
      {skill.name}
    </Badge>
  )}
/>
```

### Example 2: Custom Tag/Pill Design
```tsx
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills || []}
  renderSkill={(skill, index) => (
    <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20">
      {skill.name}
    </span>
  )}
/>
```

### Example 3: Plain Text with Separators
```tsx
// NOT RECOMMENDED - causes inconsistency like SeniorFrontendTemplate had
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills || []}
  renderSkill={(skill, index) => (
    <span>{skill.name}{index < skills.length - 1 ? " • " : ""}</span>
  )}
/>
```

---

## Key Points

### ✅ Consistent Default
- **Yes**, if you use `InlineEditableSkills` without `renderSkill`, you get a common badge design
- The default uses the `Badge` component with theme color styling
- All templates will look the same (only theme color varies)

### ⚠️ Custom Overrides
- Templates can customize with `renderSkill` prop
- **Problem**: This creates inconsistency between templates
- **Best Practice**: If customizing, ensure non-editable mode matches editable mode

---

## The Inconsistency Problem (What We Fixed)

### Before Fix (SeniorFrontendTemplate):
```tsx
{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills || []}
    themeColor={accent}
  />
  // ✅ Renders as badges
) : (
  <p>{skillNames.join(" • ")}</p>
  // ❌ Renders as plain text - DIFFERENT DESIGN!
)}
```

### After Fix:
```tsx
{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills || []}
    themeColor={accent}
    renderSkill={(skill, index) => (
      <Badge variant="secondary" style={{ backgroundColor: `${accent}20`, color: accent }}>
        {skill.name}
      </Badge>
    )}
  />
  // ✅ Renders as badges
) : (
  <div className="flex flex-wrap gap-2">
    {resumeData.skills.map((skill) => (
      <Badge variant="secondary" style={{ backgroundColor: `${accent}20`, color: accent }}>
        {skill.name}
      </Badge>
    ))}
  </div>
  // ✅ Renders as badges - SAME DESIGN!
)}
```

---

## Recommendation

### For Consistency Across All Templates:

**Option 1: Use Default (No renderSkill)**
- Simple and consistent
- All templates look the same
- Only theme color varies

**Option 2: Always Match Editable/Non-Editable**
- If customizing with `renderSkill`, make sure non-editable mode renders the same way
- Use the same component/styling in both modes

---

## Current Default Badge Design

When using `InlineEditableSkills` without `renderSkill`:

```tsx
<Badge
  variant="secondary"
  style={{
    backgroundColor: themeColor ? `${themeColor}20` : undefined,
    color: themeColor || undefined
  }}
  className="group/badge cursor-pointer hover:bg-secondary/80 transition-colors"
>
  {skill.name}
  {/* Edit/Delete buttons appear on hover when editable */}
</Badge>
```

**Visual**: Pill-shaped badge with theme color background (20% opacity) and theme color text.

---

## Summary

- ✅ **Default design is consistent** across templates
- ⚠️ **Custom renderSkill creates variation** between templates
- 🔧 **Always match editable and non-editable modes** for consistency within a template
- 📋 **Best practice**: Use default unless template design requires specific styling
