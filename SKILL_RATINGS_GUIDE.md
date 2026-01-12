# Skill Ratings Guide

## Overview

Skill ratings are **optional** and disabled by default for all templates. Only specific templates that need skill ratings should enable them.

## How It Works

### 1. Template Interface

All templates should accept the `showSkillRatings` prop with a default value of `false`:

```tsx
interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  showSkillRatings?: boolean; // Default: false
}

export const YourTemplate = ({ 
  resumeData, 
  themeColor, 
  editable = false, 
  onAddBulletPoint, 
  onRemoveBulletPoint,
  showSkillRatings = false // Default to false
}: TemplateProps) => {
  // ...
};
```

### 2. Skills Section Implementation

**Default (No Ratings) - Use this for most templates:**
```tsx
{resumeData.skills.length > 0 && (
  <div className="mb-8">
    <h2 className="...">SKILLS</h2>
    {editable ? (
      <InlineEditableSkills
        path="skills"
        skills={resumeData.skills}
        renderSkill={(skill, index) => (
          <span className="...">{skill.name}</span>
        )}
      />
    ) : (
      <div className="...">
        {resumeData.skills.map((skill) => (
          <span key={skill.id} className="...">{skill.name}</span>
        ))}
      </div>
    )}
  </div>
)}
```

**With Ratings (Only if `showSkillRatings={true}`):**
```tsx
import { InlineEditableSkillsWithRating } from "@/components/resume/InlineEditableSkillsWithRating";

{resumeData.skills.length > 0 && (
  <div className="mb-8">
    <h2 className="...">SKILLS</h2>
    {editable ? (
      <InlineEditableSkillsWithRating
        path="skills"
        skills={resumeData.skills}
        showRating={showSkillRatings && resumeData.skills.some(skill => skill.rating && skill.rating.trim() !== "")}
        verticalLayout={showSkillRatings && resumeData.skills.some(skill => skill.rating && skill.rating.trim() !== "")}
        renderSkill={(skill, index) => (
          <span className="...">
            {skill.name}
            {showSkillRatings && skill.rating && skill.rating.trim() !== "" && (
              <span className="...">({skill.rating})</span>
            )}
          </span>
        )}
      />
    ) : (
      <div className="...">
        {resumeData.skills.map((skill) => (
          <span key={skill.id} className="...">
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

### 3. Enabling Ratings for a Specific Template

To enable skill ratings for a specific template, update `src/pages/LiveEditor.tsx`:

```tsx
// Find this section in LiveEditor.tsx
const templatesWithSkillRatings = ['premium-pro', 'premium-universal', 'premium-elite', 'refined'];
const showSkillRatings = templatesWithSkillRatings.includes(currentTemplateId);

// Add your template ID to the array:
const templatesWithSkillRatings = [
  'premium-pro', 
  'premium-universal', 
  'premium-elite', 
  'refined',
  'your-template-id' // Add here
];
```

### 4. Templates Currently Using Ratings

The following templates have skill ratings enabled:
- `premium-pro` - Numeric ratings (1-10) with progress bars
- `premium-universal` - Text-based ratings
- `premium-elite` - Text-based ratings
- `refined` - Text-based ratings

### 5. Best Practices

1. **Default to No Ratings**: Always set `showSkillRatings = false` as the default
2. **Conditional Rendering**: Only show ratings UI when `showSkillRatings={true}`
3. **Check Rating Data**: Always check if `skill.rating` exists before displaying
4. **Consistent Pattern**: Use the same pattern across all templates for consistency

### 6. Form Editor

The form editor (`ResumeForm.tsx`) already supports skill ratings with a toggle. Users can enable/disable ratings in the form, and the data will be stored in `skill.rating`. However, the template will only display ratings if `showSkillRatings={true}` is passed.

### 7. PDF Template

If your template supports ratings, make sure the PDF template also handles ratings:

```tsx
// In PDF template
{resumeData.skills.map((skill) => (
  <View key={skill.id}>
    <Text>{skill.name}</Text>
    {showSkillRatings && skill.rating && (
      <Text>({skill.rating})</Text>
    )}
  </View>
))}
```

## Summary

- ✅ **Default**: All templates use `InlineEditableSkills` (no ratings)
- ✅ **Optional**: Only enable ratings for specific templates via `showSkillRatings={true}`
- ✅ **Implementation**: Use `InlineEditableSkillsWithRating` when ratings are enabled
- ✅ **Configuration**: Add template ID to `templatesWithSkillRatings` array in `LiveEditor.tsx`

