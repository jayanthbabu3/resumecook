# InlineEditableSkills Variant System - Complete Guide

## Overview

`InlineEditableSkills` now supports **variant-based visualization**! Choose from different styles via a simple `variant` prop, ensuring consistency between editable and non-editable modes.

---

## Available Variants

### 1. `badge` (Default)
**Pill-shaped badges with theme color**
- Background: `${themeColor}20` (20% opacity)
- Text: Theme color (full opacity)
- Rounded full (pill shape)
- **Most common style**

### 2. `pill`
**Rounded pills with custom styling**
- Similar to badge but with explicit padding
- Border radius: `9999px` (fully rounded)
- Good for modern, clean look

### 3. `tag`
**Square/rounded tags with borders**
- Border with theme color
- Light background
- Sharp or slightly rounded corners
- Professional appearance

### 4. `inline`
**Plain text with separators**
- Options: bullet (`•`), comma (`,`), or pipe (`|`)
- Clean, minimal design
- Good for compact layouts

### 5. `list`
**Vertical bullet list**
- Standard HTML bullet list
- Good for many skills
- Space-efficient vertical layout

### 6. `compact`
**Smaller badges**
- Smaller font (11px)
- Less padding
- Perfect for dense layouts

---

## Usage Examples

### Example 1: Default Badge Style
```tsx
{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills || []}
    variant="badge"
    themeColor={themeColor}
    fontSize="13px"
  />
) : (
  <SkillsDisplay
    skills={resumeData.skills || []}
    variant="badge"
    themeColor={themeColor}
    fontSize="13px"
  />
)}
```

### Example 2: Inline Text with Bullets
```tsx
{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills || []}
    variant="inline"
    separator="bullet"
    fontSize="13px"
  />
) : (
  <SkillsDisplay
    skills={resumeData.skills || []}
    variant="inline"
    separator="bullet"
    fontSize="13px"
  />
)}
```

### Example 3: Compact Badges
```tsx
{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills || []}
    variant="compact"
    themeColor={themeColor}
  />
) : (
  <SkillsDisplay
    skills={resumeData.skills || []}
    variant="compact"
    themeColor={themeColor}
  />
)}
```

### Example 4: Tag Style
```tsx
{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills || []}
    variant="tag"
    themeColor={themeColor}
    fontSize="13px"
  />
) : (
  <SkillsDisplay
    skills={resumeData.skills || []}
    variant="tag"
    themeColor={themeColor}
    fontSize="13px"
  />
)}
```

---

## Template Implementation Pattern

### ✅ Recommended Pattern

```tsx
{/* Skills Section */}
<section className="space-y-2">
  <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
    Skills
  </h2>
  {editable ? (
    <InlineEditableSkills
      path="skills"
      skills={resumeData.skills || []}
      variant="badge"  // Choose your variant
      themeColor={themeColor}
      fontSize="13px"
    />
  ) : (
    <SkillsDisplay
      skills={resumeData.skills || []}
      variant="badge"  // Same variant for consistency!
      themeColor={themeColor}
      fontSize="13px"
    />
  )}
</section>
```

### ❌ Avoid This Pattern (Inconsistent)

```tsx
{editable ? (
  <InlineEditableSkills ... />  // Renders as badges
) : (
  <p>{skillNames.join(" • ")}</p>  // Renders as plain text - DIFFERENT!
)}
```

---

## Variant Comparison

| Variant | Appearance | Best For |
|---------|-----------|----------|
| `badge` | Pill badges with theme color | Most templates (default) |
| `pill` | Rounded pills | Modern, clean designs |
| `tag` | Square tags with borders | Professional layouts |
| `inline` | Text with separators | Compact spaces |
| `list` | Bullet list | Many skills, vertical space |
| `compact` | Smaller badges | Dense layouts |

---

## Props Reference

### InlineEditableSkills Props

```tsx
interface InlineEditableSkillsProps {
  path?: string;                    // Data path (e.g., "skills")
  skills: Skill[] | string[];       // Skills array
  variant?: SkillVariant;           // 'badge' | 'pill' | 'tag' | 'inline' | 'list' | 'compact'
  separator?: 'bullet' | 'comma' | 'pipe';  // For 'inline' variant only
  themeColor?: string;              // Theme/accent color
  fontSize?: string;                // Override font size (e.g., "13px")
  className?: string;               // Additional CSS classes
  editable?: boolean;               // Enable/disable editing (default: true)
  renderSkill?: (skill, index) => React.ReactNode;  // Custom renderer (optional)
}
```

### SkillsDisplay Props (Non-editable)

```tsx
interface SkillsDisplayProps {
  skills: Skill[];                  // Skills array
  variant?: SkillVariant;           // Same variants as InlineEditableSkills
  separator?: 'bullet' | 'comma' | 'pipe';  // For 'inline' variant
  themeColor?: string;              // Theme/accent color
  fontSize?: string;                // Font size
  className?: string;               // Additional CSS classes
}
```

---

## Migration Guide

### Step 1: Choose Your Variant
Decide which variant matches your template's design:
- Most templates: `badge` (default)
- Clean/minimal: `pill` or `inline`
- Professional: `tag`
- Dense layouts: `compact`
- Many skills: `list`

### Step 2: Update Template Code

**Before:**
```tsx
{editable ? (
  <InlineEditableSkills ... />
) : (
  <p>{skillNames.join(" • ")}</p>  // Different design!
)}
```

**After:**
```tsx
import { InlineEditableSkills, SkillsDisplay } from "@/components/resume/InlineEditableSkills";

{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills || []}
    variant="badge"  // Your chosen variant
    themeColor={themeColor}
    fontSize="13px"
  />
) : (
  <SkillsDisplay
    skills={resumeData.skills || []}
    variant="badge"  // Same variant = same design!
    themeColor={themeColor}
    fontSize="13px"
  />
)}
```

### Step 3: Test Both Modes
- Test in live editor (editable mode)
- Test in form editor preview (non-editable mode)
- Verify they look identical

---

## Benefits

1. ✅ **Consistency**: Same variant = same design in both modes
2. ✅ **Easy Customization**: Just change the variant prop
3. ✅ **Less Code**: No need for custom renderSkill functions
4. ✅ **Maintainable**: All styles in one place
5. ✅ **Backward Compatible**: Existing code still works (defaults to 'badge')

---

## Next Steps

1. ✅ Variant system implemented
2. Update templates to use variants
3. Remove custom renderSkill functions where possible
4. Document variant choices in template metadata






