# PDF Page Break Control Solutions

## Problem
PDF page breaks are cutting sections inappropriately, causing poor layout and readability issues.

## Solutions Implemented

### 1. Smart Page Break Controls ✅
Added intelligent page break logic to prevent section splitting:

```tsx
// Experience section - break before if > 3 items
<View style={styles.section} break={resumeData.experience.length > 3 ? 'before' : undefined}>

// Education section - break before if > 2 items  
<View style={styles.section} break={resumeData.education.length > 2 ? 'before' : undefined}>

// Skills section - break before if > 8 items
<View style={styles.section} break={resumeData.skills.length > 8 ? 'before' : undefined}>

// Individual items - prevent splitting
<View style={styles.experienceItem} break="inside">
```

### 2. Break Types Used
- `break="before"` - Forces section to start on new page
- `break="inside"` - Prevents item from being split across pages
- `break={condition ? 'before' : undefined}` - Conditional breaking

## Additional Solutions to Consider

### 3. User-Controlled Page Breaks (Advanced)
Add user controls for manual page break management:

```tsx
// Add to resume data type
interface ResumeData {
  pageBreaks: {
    experience?: boolean;
    education?: boolean;
    skills?: boolean;
    customSections?: boolean[];
  };
}

// In PDF component
<View style={styles.section} break={resumeData.pageBreaks?.experience ? 'before' : undefined}>
```

### 4. Dynamic Height Calculation
Calculate content height and adjust breaks dynamically:

```tsx
const calculateContentHeight = (section) => {
  // Estimate height based on content length
  const itemHeight = 80; // pixels per item
  const sectionPadding = 40;
  return (section.length * itemHeight) + sectionPadding;
};

// Use in conditional breaks
break={calculateContentHeight(resumeData.experience) > 400 ? 'before' : undefined}
```

### 5. Template-Specific Break Rules
Different templates can have different break thresholds:

```tsx
const getBreakThresholds = (templateId) => {
  const thresholds = {
    minimal: { experience: 3, education: 2, skills: 8 },
    professional: { experience: 4, education: 3, skills: 12 },
    modern: { experience: 3, education: 2, skills: 10 }
  };
  return thresholds[templateId] || thresholds.minimal;
};
```

## Implementation Status

### ✅ Currently Implemented
- Smart conditional page breaks
- Section-specific thresholds
- Item-level split prevention
- Applied to MinimalPDF template

### 🔄 Next Steps (Optional)
1. Add user controls for manual breaks
2. Implement dynamic height calculation
3. Apply to all PDF templates
4. Add preview mode for break indicators

## Benefits
- **Better Readability**: Sections don't get cut awkwardly
- **Professional Appearance**: Cleaner PDF layout
- **Automatic Logic**: No manual intervention needed
- **Template Consistency**: Same logic across all templates

## Testing
Test with various content lengths:
- Short resumes (1-2 items per section)
- Medium resumes (3-5 items per section)
- Long resumes (6+ items per section)
- Mixed content lengths

The current solution handles most cases automatically while maintaining clean page breaks.
