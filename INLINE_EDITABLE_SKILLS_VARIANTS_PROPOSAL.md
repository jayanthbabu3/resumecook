# InlineEditableSkills Variant System - Proposal

## Overview

Add a `variant` prop to `InlineEditableSkills` to support different visualization styles, making templates more customizable while maintaining consistency.

---

## Proposed Variants

### 1. `badge` (Default)
**Current default design**
- Pill-shaped badges with theme color
- Background: `${themeColor}20`, Text: `themeColor`
- Rounded full borders
- Used by: Most templates

### 2. `pill`
**Rounded pill style**
- Similar to badge but with custom styling
- More prominent padding
- Can have borders or background

### 3. `tag`
**Square/rounded tags**
- Sharp or slightly rounded corners
- Border with theme color
- Background optional

### 4. `inline`
**Plain text with separators**
- Comma-separated or bullet-separated
- Clean, minimal look
- Used by: SeniorFrontendTemplate (before fix)

### 5. `list`
**Bullet list**
- Vertical bullet list
- Good for many skills
- Compact layout

### 6. `compact`
**Smaller badges**
- Smaller font and padding
- Good for dense layouts
- Space-efficient

---

## Implementation Plan

### Interface Changes

```tsx
export type SkillVariant = 
  | 'badge'      // Default - pill badges with theme color
  | 'pill'       // Rounded pills
  | 'tag'        // Square tags with borders
  | 'inline'     // Plain text with separators (bullet/comma)
  | 'list'       // Bullet list
  | 'compact';   // Compact badges

interface InlineEditableSkillsProps {
  // ... existing props
  variant?: SkillVariant;
  separator?: 'bullet' | 'comma' | 'pipe'; // For 'inline' variant
  fontSize?: string; // Override font size
}
```

### Usage Examples

```tsx
// 1. Default badge style (current default)
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills}
  variant="badge"
  themeColor={themeColor}
/>

// 2. Inline text with bullets
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills}
  variant="inline"
  separator="bullet"
/>

// 3. Compact badges
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills}
  variant="compact"
  fontSize="11px"
/>

// 4. Tag style with borders
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills}
  variant="tag"
  themeColor={themeColor}
/>
```

---

## Benefits

1. ✅ **Consistency**: Templates can choose variants without custom code
2. ✅ **Maintainability**: One component, multiple styles
3. ✅ **Flexibility**: Still supports custom `renderSkill` for edge cases
4. ✅ **Easy Migration**: Existing templates work as-is (variant defaults to 'badge')
5. ✅ **Editable/Non-Editable Sync**: Same variant renders consistently in both modes

---

## Migration Strategy

1. Add variant prop (backwards compatible - defaults to 'badge')
2. Update templates to use variants instead of custom renderSkill
3. Ensure both editable and non-editable modes use same variant

---

## Next Steps

1. Implement variant system in `InlineEditableSkills`
2. Update documentation
3. Migrate templates to use variants
4. Remove custom renderSkill overrides where possible






