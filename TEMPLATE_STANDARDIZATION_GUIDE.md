# Template Standardization Guide

## Overview

This guide explains how to standardize resume templates to ensure all functionality works consistently across all 900+ templates while preserving their unique visual styles.

## The Problem

Each template was created independently with:
- Different font sizes and spacing
- Different ways of handling bullet points
- Some templates missing editing functionality
- Inconsistent data binding
- Custom sections not working properly

## The Solution: Flexible Wrapper Components

We've created **flexible wrapper components** that:
1. ✅ Handle ALL the functionality (editing, data binding, add/remove)
2. ✅ Let you keep your unique visual style via render props
3. ✅ Work with both Form Editor and Live Editor
4. ✅ Generate correct PDFs
5. ✅ Are AI-ready for automatic population

## Available Components

### 1. ExperienceSection

Handles experience items with bullet point management.

```tsx
import { ExperienceSection } from '@/components/resume/shared';

// SIMPLE USAGE (default styling)
<ExperienceSection
  experience={resumeData.experience}
  editable={editable}
  accentColor={themeColor}
/>

// CUSTOM HEADER
<ExperienceSection
  experience={resumeData.experience}
  editable={editable}
  renderHeader={(title) => (
    <h2 className="text-2xl font-bold text-red-500 border-b-2 border-red-500 pb-2 mb-4">
      {title}
    </h2>
  )}
/>

// CUSTOM ITEM RENDERING (Timeline style)
<ExperienceSection
  experience={resumeData.experience}
  editable={editable}
  renderItem={(exp, index, { EditableText, EditableDate, BulletPoints, isEditable }) => (
    <div className="relative pl-8 border-l-2 border-blue-500 pb-6">
      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
      <div className="flex justify-between">
        <div>
          {isEditable ? (
            <EditableText 
              path={`experience[${index}].position`} 
              value={exp.position}
              className="text-lg font-bold"
            />
          ) : (
            <h3 className="text-lg font-bold">{exp.position}</h3>
          )}
          {isEditable ? (
            <EditableText 
              path={`experience[${index}].company`} 
              value={exp.company}
              className="text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{exp.company}</p>
          )}
        </div>
        <span className="text-sm text-gray-500">
          {isEditable ? (
            <>
              <EditableDate path={`experience[${index}].startDate`} value={exp.startDate} />
              {' - '}
              {exp.current ? 'Present' : <EditableDate path={`experience[${index}].endDate`} value={exp.endDate} />}
            </>
          ) : (
            `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`
          )}
        </span>
      </div>
      <BulletPoints expId={exp.id} bullets={exp.bulletPoints} />
    </div>
  )}
/>
```

### 2. SkillsSection

Supports multiple visual styles: badges, progress bars, lists, etc.

```tsx
import { SkillsSection } from '@/components/resume/shared';

// BADGES (default)
<SkillsSection
  skills={resumeData.skills}
  editable={editable}
  variant="badges"
  accentColor={themeColor}
/>

// PROGRESS BARS
<SkillsSection
  skills={resumeData.skills}
  editable={editable}
  variant="progress"
/>

// SIMPLE LIST
<SkillsSection
  skills={resumeData.skills}
  editable={editable}
  variant="list"
/>

// INLINE (comma-separated)
<SkillsSection
  skills={resumeData.skills}
  editable={editable}
  variant="inline"
/>

// CUSTOM RENDERING (Star ratings)
<SkillsSection
  skills={resumeData.skills}
  editable={editable}
  renderSkill={(skill, index, { isEditable }) => (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-24">{skill.name}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= (skill.rating || 3) ? 'text-yellow-500' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    </div>
  )}
/>
```

### 3. CustomSectionsWrapper

Handles certifications, awards, projects, and any custom sections.

```tsx
import { CustomSectionsWrapper } from '@/components/resume/shared';

// SIMPLE USAGE
<CustomSectionsWrapper
  sections={resumeData.sections}
  editable={editable}
  accentColor={themeColor}
/>

// WITH BULLETS
<CustomSectionsWrapper
  sections={resumeData.sections}
  editable={editable}
  showBullets={true}
/>

// CUSTOM SECTION HEADER
<CustomSectionsWrapper
  sections={resumeData.sections}
  editable={editable}
  renderSectionHeader={(title, index, { EditableText, remove, isEditable }) => (
    <div className="flex items-center gap-2 border-b border-gray-300 pb-2 mb-4">
      <span className="text-blue-500">📌</span>
      {isEditable ? (
        <EditableText className="text-xl font-bold flex-1" />
      ) : (
        <h2 className="text-xl font-bold flex-1">{title}</h2>
      )}
      {isEditable && (
        <button onClick={remove} className="text-red-500">×</button>
      )}
    </div>
  )}
/>

// CUSTOM ITEM RENDERING (Card style)
<CustomSectionsWrapper
  sections={resumeData.sections}
  editable={editable}
  renderItem={(item, itemIndex, sectionIndex, { EditableText, remove, isEditable }) => (
    <div className="bg-gray-50 rounded-lg p-3 mb-2 flex items-center gap-2">
      <span className="text-green-500">✓</span>
      {isEditable ? (
        <EditableText className="flex-1" />
      ) : (
        <span className="flex-1">{item}</span>
      )}
      {isEditable && (
        <button onClick={remove} className="text-red-400 hover:text-red-600">×</button>
      )}
    </div>
  )}
/>
```

## Migration Guide: Converting an Existing Template

### Before (Old way - inconsistent)

```tsx
export const MyTemplate = ({ resumeData, themeColor, editable }) => {
  return (
    <div>
      {/* Experience - missing bullet point editing! */}
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id}>
          <h3>{exp.position}</h3>
          <p>{exp.company}</p>
          {/* No bullet points, no editing */}
        </div>
      ))}
      
      {/* Skills - hardcoded style */}
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <span className="px-3 py-1 bg-blue-100 rounded">{skill.name}</span>
        ))}
      </div>
      
      {/* Custom sections - not working at all! */}
      {resumeData.sections.map((section) => (
        <div>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};
```

### After (New way - standardized with custom styling)

```tsx
import { ExperienceSection, SkillsSection, CustomSectionsWrapper } from '@/components/resume/shared';

export const MyTemplate = ({ resumeData, themeColor, editable }) => {
  return (
    <div>
      {/* Experience - FULLY FUNCTIONAL with your custom styling */}
      <ExperienceSection
        experience={resumeData.experience}
        editable={editable}
        accentColor={themeColor}
        renderHeader={(title) => (
          <h2 className="text-xl font-bold text-blue-600 mb-4">{title}</h2>
        )}
        positionStyle={{ fontSize: '16px', fontWeight: 600 }}
        companyStyle={{ fontSize: '14px', color: '#666' }}
      />
      
      {/* Skills - your visual style preserved */}
      <SkillsSection
        skills={resumeData.skills}
        editable={editable}
        variant="badges"
        accentColor={themeColor}
        skillStyle={{ backgroundColor: '#EBF5FF', border: 'none' }}
      />
      
      {/* Custom sections - NOW WORKING! */}
      <CustomSectionsWrapper
        sections={resumeData.sections}
        editable={editable}
        accentColor={themeColor}
        showBullets={false}
      />
    </div>
  );
};
```

## Props Reference

### ExperienceSection Props

| Prop | Type | Description |
|------|------|-------------|
| `experience` | `ExperienceItem[]` | Experience data |
| `editable` | `boolean` | Enable editing |
| `accentColor` | `string` | Theme color |
| `title` | `string` | Section title |
| `renderHeader` | `(title) => ReactNode` | Custom header |
| `renderItem` | `(exp, index, helpers) => ReactNode` | Custom item |
| `renderBulletPoint` | `(bullet, index, expIndex, helpers) => ReactNode` | Custom bullet |
| `positionStyle` | `CSSProperties` | Job title style |
| `companyStyle` | `CSSProperties` | Company name style |
| `dateStyle` | `CSSProperties` | Date style |
| `bulletStyle` | `CSSProperties` | Bullet point style |

### SkillsSection Props

| Prop | Type | Description |
|------|------|-------------|
| `skills` | `SkillItem[]` | Skills data |
| `editable` | `boolean` | Enable editing |
| `variant` | `'badges' \| 'progress' \| 'list' \| 'inline' \| 'custom'` | Visual style |
| `accentColor` | `string` | Theme color |
| `title` | `string` | Section title |
| `renderHeader` | `(title) => ReactNode` | Custom header |
| `renderSkill` | `(skill, index, helpers) => ReactNode` | Custom skill |
| `skillStyle` | `CSSProperties` | Individual skill style |
| `gap` | `string` | Gap between skills |

### CustomSectionsWrapper Props

| Prop | Type | Description |
|------|------|-------------|
| `sections` | `CustomSection[]` | Sections data |
| `editable` | `boolean` | Enable editing |
| `accentColor` | `string` | Theme color |
| `showBullets` | `boolean` | Show bullet points |
| `showAddSection` | `boolean` | Show add section button |
| `renderSection` | `(section, index, helpers) => ReactNode` | Custom section |
| `renderSectionHeader` | `(title, index, helpers) => ReactNode` | Custom header |
| `renderItem` | `(item, itemIndex, sectionIndex, helpers) => ReactNode` | Custom item |

## Checklist for Template Migration

- [ ] Replace manual experience rendering with `ExperienceSection`
- [ ] Replace manual skills rendering with `SkillsSection`
- [ ] Replace manual custom sections with `CustomSectionsWrapper`
- [ ] Ensure `editable` prop is passed through
- [ ] Test in Live Editor (add/remove bullet points)
- [ ] Test in Form Editor (data syncs)
- [ ] Test PDF generation
- [ ] Verify visual style is preserved

## Benefits

1. **Consistent Functionality**: All templates get bullet point editing, add/remove items, etc.
2. **Visual Freedom**: Keep your unique template design via render props
3. **Maintainability**: Fix a bug once, all templates benefit
4. **AI-Ready**: Structured data binding makes AI population straightforward
5. **Future-Proof**: New features added to shared components work everywhere
