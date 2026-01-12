# InlineEditableSkills Variant System - Implementation Plan

## Overview

Adding a `variant` prop to `InlineEditableSkills` to support different visualization styles:
- `badge` (default) - Pill badges with theme color
- `pill` - Rounded pills
- `tag` - Square/rounded tags with borders
- `inline` - Plain text with separators (bullet/comma/pipe)
- `list` - Bullet list (vertical)
- `compact` - Smaller badges for dense layouts

## Benefits

1. ✅ **Easy Customization**: Templates choose variant via prop
2. ✅ **Consistency**: Same variant works in both editable and non-editable modes
3. ✅ **Less Code**: No need for custom renderSkill functions
4. ✅ **Maintainability**: All styles in one place

## Implementation Steps

1. Add variant types and props
2. Create rendering functions for each variant
3. Update component to use variants
4. Ensure backward compatibility (default to 'badge')
5. Update templates to use variants

## Usage Examples

```tsx
// Default badge style
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills}
  variant="badge"
  themeColor={themeColor}
/>

// Inline text with bullets
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills}
  variant="inline"
  separator="bullet"
/>

// Compact badges
<InlineEditableSkills
  path="skills"
  skills={resumeData.skills}
  variant="compact"
/>
```






