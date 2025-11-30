# Template Optimization & Production Readiness Workflow

This document outlines the standard operating procedure (SOP) for bringing a resume template up to the "Pixel Perfect" production standard established for the project.

Follow this workflow when adding a new template or updating an existing one to ensure consistency across the Form Editor, Live Editor, and PDF export.

## 1. Core Requirements

All templates must support the canonical data structure defined in `src/types/resume.ts`.

### Key Features to Support:
- **Synchronization:** Must use `ResumeDataContext` (handled by page wrappers, but components must be pure).
- **Rich Content:** Support for `bulletPoints` in Experience.
- **Custom Sections:** Dynamic rendering of `sections` array.
- **Social Links:** Optional rendering based on `includeSocialLinks`.

## 2. Step-by-Step Implementation Guide

### Step 1: Update the PDF Component (`src/components/resume/pdf/`)

The PDF component is the source of truth for the final output.

1.  **Experience Section:**
    *   Ensure it maps over `experience` array.
    *   **Crucial:** Check for `bulletPoints` field. If present, render them as a list.
    *   *Fallback:* If `bulletPoints` is empty but `description` exists, render `description`.
    
    ```tsx
    // Example Pattern
    {exp.bulletPoints && exp.bulletPoints.length > 0 ? (
      <View style={styles.bulletList}>
        {exp.bulletPoints.map((bullet, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
      </View>
    ) : (
      <Text style={styles.description}>{exp.description}</Text>
    )}
    ```

2.  **Custom Sections:**
    *   Iterate over `resumeData.sections` and render them dynamically.
    *   Ensure styling matches the main sections (headers, spacing).

    ```tsx
    {resumeData.sections?.map((section) => (
      <View key={section.id} style={styles.section}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.content}>{section.content}</Text>
      </View>
    ))}
    ```

3.  **Social Links:**
    *   Check `resumeData.personalInfo.linkedin`, `github`, `portfolio`.
    *   Render them only if they exist and are not empty strings.

### Step 2: Update the Live Preview Component (`src/components/resume/templates/`)

The HTML/React preview must match the PDF layout exactly.

1.  **Structure Match:** Ensure the HTML structure mirrors the PDF `View`/`Text` hierarchy.
2.  **Experience & Custom Sections:** Apply the same logic as the PDF component (render `bulletPoints` and dynamic `sections`).
3.  **Skills Section:**
    *   **For templates with progress bars (e.g., PremiumPro):** Use `skill.rating` (string) and parse to number for progress bar calculation.
    *   **For templates with text ratings:** Use `InlineEditableSkillsWithRating` component.
    *   **Always use `skill.rating`**, never `skill.level` (deprecated).
    *   Parse rating strings to numbers: Extract first number from string (handles "9", "9/10", "9.5", etc.) and clamp between 1-10.
    *   Progress bar width = `skillLevel * 10%` (e.g., 9 → 90%).
4.  **Bullet Point Management (Live Editor):**
    *   **Import Required Components:**
        ```tsx
        import { Plus, X } from "lucide-react";
        import { InlineEditableText } from "@/components/resume/InlineEditableText";
        ```
    *   **Update Template Interface:**
        ```tsx
        interface TemplateProps {
          resumeData: ResumeData;
          themeColor?: string;
          editable?: boolean;
          onAddBulletPoint?: (expId: string) => void;
          onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
        }
        ```
    *   **Implement Bullet Point Rendering Pattern:**
        ```tsx
        {(!exp.bulletPoints || exp.bulletPoints.length === 0) && editable && onAddBulletPoint && exp.id && (
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onAddBulletPoint && exp.id) {
                  onAddBulletPoint(exp.id);
                }
              }}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus className="h-3 w-3" />
              Add Achievement
            </button>
          </div>
        )}
        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
          <div className="mt-3">
            <ul className="space-y-2">
              {exp.bulletPoints.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="text-sm text-gray-700 leading-relaxed flex items-start group">
                  <span className="mr-2 mt-1">•</span>
                  <div className="flex-1 flex items-center gap-2">
                    <InlineEditableText
                      path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                      value={bullet || ""}
                      placeholder="Click to add achievement..."
                      className="text-sm text-gray-700 leading-relaxed flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                      multiline
                      as="span"
                    />
                    {editable && onRemoveBulletPoint && (
                      <button
                        onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                      >
                        <X className="h-3 w-3 text-red-500" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {editable && onAddBulletPoint && exp.id && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onAddBulletPoint && exp.id) {
                    onAddBulletPoint(exp.id);
                  }
                }}
                className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                <Plus className="h-3 w-3" />
                Add Achievement
              </button>
            )}
          </div>
        )}
        ```
    *   **Non-Editable Mode:** Keep static rendering for non-editable mode:
        ```tsx
        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
          <div className="mt-3">
            <ul className="space-y-2">
              {exp.bulletPoints.map((bullet, index) => (
                bullet && (
                  <li key={index} className="text-sm text-gray-700 leading-relaxed flex">
                    <span className="mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        )}
        ```
4.  **Icon Requirements:**
    *   **Contact Information Icons:** Use SVG icons instead of emoji characters for email, phone, and location to ensure consistency between Live Preview and PDF export.
    *   **Prohibited:** Unicode emoji characters (✉, ☎, 📍) - these don't render reliably in PDFs.
    *   **Required:** Inline SVG components with consistent styling.
    
    **Live Preview (React) - Example:**
    ```tsx
    // Email Icon
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    
    // Phone Icon  
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
    
    // Location Icon
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
    ```
    
    **PDF Export - Example:**
    ```tsx
    // Same SVG paths but using React-PDF Svg components
    <Svg width="8" height="8" viewBox="0 0 24 24">
      <Path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" fill="none" stroke="#ffffff" strokeWidth="2" />
    </Svg>
    ```
    
    **Key Requirements:**
    * Use `stroke="currentColor"` for Live Preview (inherits text color)
    * Use `stroke="#ffffff"` for PDF (white color on colored headers)
    * Size: 12×12 for Live Preview, 8×8 for PDF
    * Same SVG paths for visual consistency
    * Proper spacing with `gap-2` between icon and text
5.  **Inline Editing:** Use `InlineEditableText` components for all text fields in editable mode.

### Step 3: Live Editor Integration (`src/pages/LiveEditor.tsx`)

1.  **Template Registration:**
    *   Ensure the template is imported and registered in `displayTemplates`:
        ```tsx
        import { YourTemplate } from "@/components/resume/templates/YourTemplate";
        
        const displayTemplates: Record<string, any> = {
          // ... other templates
          "your-template-id": YourTemplate,
        };
        ```
    *   All templates in `displayTemplates` automatically support inline editing and receive bullet point functions.

2.  **Bullet Point Functions:**
    *   The `LiveEditor` automatically passes `onAddBulletPoint` and `onRemoveBulletPoint` to all registered templates.
    *   No additional registration needed - templates just need to accept these props.

3.  **Add Custom Section Button:**
    *   The "Add Custom Section" button is global in `LiveEditor.tsx`, so it works automatically for all templates.
    *   **Verify:** Check that the new template renders the custom section when this button is clicked.

4.  **Data Sync:**
    *   The `LiveEditor` page handles context syncing automatically via `InlineEditProvider`.
    *   Templates just need to accept `resumeData` as a prop and use the bullet point functions when `editable` is true.

### Step 4: Form Editor Verification (`src/pages/Editor.tsx`)

The Form Editor is shared (`ResumeForm.tsx`).

1.  **Defaults:**
    *   If the new template requires specific default data (e.g., a specific layout or placeholder text), update `getTemplateDefaults` in `src/lib/resumeUtils.ts`.
    *   Ensure defaults include `bulletPoints` array strings, not just description.

## 3. Quality Assurance Checklist

Before marking a template as "Production Ready":

- [ ] **Sync Check:** Open Form Editor in one tab, Live Editor in another. Changes in Form should instantly reflect in Live.
- [ ] **Bullet Point Management (Live Editor):**
  - [ ] "Add Achievement" button appears when no bullet points exist
  - [ ] Clicking "Add Achievement" adds new empty bullet point with dashed border
  - [ ] Empty bullet points are editable via InlineEditableText
  - [ ] Remove buttons appear on hover for existing bullet points
  - [ ] "Add Achievement" button appears in bullet points list
  - [ ] Bullet point state persists across form/live editor sync
- [ ] **Bullet Points (PDF Export):** Add/Delete bullet points in Experience. Verify they appear correctly in PDF export.
- [ ] **Skills with Ratings (Form Editor):**
  - [ ] "Show Ratings" toggle button works correctly
  - [ ] When ratings enabled, skills display in vertical layout with rating inputs
  - [ ] Rating inputs accept numeric values (1-10) with validation
  - [ ] "/10" suffix displays correctly
  - [ ] Skills sync correctly between form and live preview
- [ ] **Skills with Ratings (Live Editor):**
  - [ ] Skill ratings are editable inline
  - [ ] Progress bars display correctly based on rating value
  - [ ] Rating format (e.g., "9", "9/10") parses correctly to progress bar
  - [ ] Skills without ratings don't show progress bars
- [ ] **Skills with Ratings (PDF Export):** Verify skill ratings and progress bars appear correctly in PDF export.
- [ ] **Education Section (Live Editor):**
  - [ ] Education items display correctly with degree, school, and field
  - [ ] GPA/Grade field appears when data exists (shows as "Grade: [value]")
  - [ ] GPA field is editable via InlineEditableText when in editable mode
  - [ ] GPA field has proper styling (smaller font, gray color)
  - [ ] Date fields are editable via InlineEditableDate
  - [ ] "Add Education" button works correctly
- [ ] **Education Section (Form Preview):**
  - [ ] Education items display in non-editable mode correctly
  - [ ] GPA field shows when data exists, hidden when empty
  - [ ] All education fields (degree, school, field, GPA, dates) render properly
- [ ] **Custom Sections:** Click "Add Custom Section" in Live Editor. Verify it appears at the bottom of the resume.
- [ ] **PDF Export:** Download the PDF. It should look identical to the Live Preview.
- [ ] **Formatting:** Check margins, font sizes, and alignment. Ensure no text overlap.
- [ ] **Empty States:** Ensure fields like "Social Links" disappear gracefully if empty.
- [ ] **Non-Editable Mode:** Verify template renders correctly in form editor preview (non-editable mode).
- [ ] **TypeScript Compliance:** No TypeScript errors, correct import paths, proper type usage.

## 4. Complete Implementation Patterns

This section provides the complete, copy-paste-ready patterns for implementing bullet point management and education sections in any template.

### 4.1 Required Imports

```tsx
import { Plus, X } from "lucide-react";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { ResumeData } from "@/types/resume"; // Correct import path
```

### 4.2 Template Interface Update

```tsx
interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}
```

### 4.3 Complete Experience Section Pattern

```tsx
{resumeData.experience.map((exp, index) => (
  <div key={exp.id}>
    {/* Your existing experience header (position, company, dates) */}
    
    {/* Bullet Points - Editable Mode */}
    {editable ? (
      <>
        {(!exp.bulletPoints || exp.bulletPoints.length === 0) && onAddBulletPoint && exp.id && (
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onAddBulletPoint && exp.id) {
                  onAddBulletPoint(exp.id);
                }
              }}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus className="h-3 w-3" />
              Add Achievement
            </button>
          </div>
        )}
        {exp.bulletPoints && exp.bulletPoints.length > 0 && (
          <div className="mt-3">
            <ul className="space-y-2">
              {exp.bulletPoints.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="text-sm text-gray-700 leading-relaxed flex items-start group">
                  <span className="mr-2 mt-1">•</span>
                  <div className="flex-1 flex items-center gap-2">
                    <InlineEditableText
                      path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                      value={bullet || ""}
                      placeholder="Click to add achievement..."
                      className="text-sm text-gray-700 leading-relaxed flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                      multiline
                      as="span"
                    />
                    {onRemoveBulletPoint && (
                      <button
                        onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                      >
                        <X className="h-3 w-3 text-red-500" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {onAddBulletPoint && exp.id && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onAddBulletPoint && exp.id) {
                    onAddBulletPoint(exp.id);
                  }
                }}
                className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                <Plus className="h-3 w-3" />
                Add Achievement
              </button>
            )}
          </div>
        )}
      </>
    ) : (
      /* Bullet Points - Non-Editable Mode */
      exp.bulletPoints && exp.bulletPoints.length > 0 && (
        <div className="mt-3">
          <ul className="space-y-2">
            {exp.bulletPoints.map((bullet, bulletIndex) => (
              bullet && (
                <li key={bulletIndex} className="text-sm text-gray-700 leading-relaxed flex">
                  <span className="mr-2">•</span>
                  <span>{bullet}</span>
                </li>
              )
            ))}
          </ul>
        </div>
      )
    )}
    
    {/* Your existing experience description */}
  </div>
))}
```

### 4.4 Complete Education Section Pattern

```tsx
{resumeData.education && resumeData.education.length > 0 && (
  <div className="mb-8">
    <h2 className="text-[15px] font-semibold mb-3 uppercase tracking-wide">Education</h2>
    {editable ? (
      <InlineEditableList
        path="education"
        items={resumeData.education}
        defaultItem={{
          id: Date.now().toString(),
          school: "School Name",
          degree: "Degree",
          field: "Field of Study",
          startDate: "2019-09",
          endDate: "2023-05",
        }}
        addButtonLabel="Add Education"
        renderItem={(edu, index) => (
          <div className="mb-4 last:mb-0">
            <div className="flex justify-between items-start">
              <div>
                <InlineEditableText
                  path={`education[${index}].degree`}
                  value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                  className="text-[14px] font-semibold text-gray-900 block"
                  as="h3"
                />
                <InlineEditableText
                  path={`education[${index}].school`}
                  value={edu.school}
                  className="text-[12.5px] text-gray-700 block"
                  as="p"
                />
                {/* GPA/Grade Field - Optional */}
                {edu.gpa && (
                  <InlineEditableText
                    path={`education[${index}].gpa`}
                    value={`Grade: ${edu.gpa}`}
                    className="text-[11.5px] text-gray-600 block"
                    as="p"
                  />
                )}
              </div>
              <div className="text-right text-[11px] text-gray-600">
                <p>
                  <InlineEditableDate
                    path={`education[${index}].startDate`}
                    value={edu.startDate}
                    className="inline-block"
                  />
                  <span> - </span>
                  <InlineEditableDate
                    path={`education[${index}].endDate`}
                    value={edu.endDate}
                    className="inline-block"
                  />
                </p>
              </div>
            </div>
          </div>
        )}
      />
    ) : (
      /* Non-Editable Mode */
      resumeData.education.map((edu, index) => (
        <div key={edu.id} className="mb-4 last:mb-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[14px] font-semibold text-gray-900">
                {edu.degree} {edu.field && `in ${edu.field}`}
              </h3>
              <p className="text-[12.5px] text-gray-700">{edu.school}</p>
              {/* GPA/Grade Field - Optional */}
              {edu.gpa && (
                <p className="text-[11.5px] text-gray-600">Grade: {edu.gpa}</p>
              )}
            </div>
            <div className="text-right text-[11px] text-gray-600">
              <p>
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
)}
```

### 4.5 Key Implementation Notes

**Experience Section:**
- **Variable Names**: Use `index` from `.map()` callback for the path, not `indexOf()`
- **Conditional Rendering**: Always check `editable` prop before rendering interactive elements
- **Event Handling**: Use `preventDefault()` and `stopPropagation()` to avoid conflicts
- **Validation**: Check function availability and `exp.id` before calling
- **Styling**: Use consistent button styling and hover effects
- **Accessibility**: Include proper placeholder text for empty bullet points

**General Template Requirements:**
- **Dual Mode Support**: Implement both editable (Live Editor) and non-editable (Form Preview) modes
- **Type Safety**: Use correct TypeScript interfaces (`ResumeData`, `EducationItem`, `ExperienceItem`)
- **Import Paths**: Import `ResumeData` from `@/types/resume`, not `@/pages/Editor`
- **Consistent Styling**: Follow template's existing font sizes and spacing patterns

### 4.7 Custom Sections: Basic vs Advanced Approach

**Basic Approach (Current - Limited):**
```tsx
// Simple title/content only
<InlineEditableList
  path="sections"
  items={resumeData.sections}
  defaultItem={{ id: "...", title: "New Section", content: "..." }}
  renderItem={(section) => (
    <div>
      <h2>{section.title}</h2>
      <p>{section.content}</p>
    </div>
  )}
/>
```
- ❌ **Limited Layout**: Only title and plain text content
- ❌ **No Data Structure**: Cannot handle structured data like certifications
- ❌ **Side-by-Side Display**: Content renders in columns, poor readability
- ❌ **No Type Safety**: Uses generic `CustomSection` type

**Advanced Approach (Recommended - Full Control):**
```tsx
// Type-specific renderers with full layout control
{resumeData.dynamicSections?.map((section) => (
  <div key={section.id}>
    <h2>{section.title}</h2>
    {renderCustomSection(section, editable)} // Type-specific layout
  </div>
))}
```
- ✅ **Full Layout Control**: Templates define exact layout for each section type
- ✅ **Structured Data**: Handle certifications, projects, languages with proper data structure
- ✅ **Optimal Display**: Vertical layout, proper spacing, readable design
- ✅ **Type Safety**: Uses typed `ResumeSection` and `SectionData` interfaces
- ✅ **Inline Editing**: Full edit support for all fields within custom layouts
- ✅ **Extensible**: Easy to add new section types and layouts

### 4.8 Migration Strategy

**Step 1: Update Template Interface**
```tsx
interface TemplateProps {
  // ... existing props
  onAddSectionItem?: (sectionType: SectionType, sectionOrder: number) => void;
  onRemoveSectionItem?: (sectionType: SectionType, sectionOrder: number, itemIndex: number) => void;
}
```

**Step 2: Replace Basic Sections**
```tsx
// Remove this basic approach
{resumeData.sections && (
  <InlineEditableList path="sections" ... />
)}

// Replace with advanced approach
{resumeData.dynamicSections && (
  // Advanced renderer with type-specific layouts
)}
```

**Step 3: Add Section Management Functions**
```tsx
const addCertification = (sectionOrder: number) => {
  if (onAddSectionItem) {
    onAddSectionItem('certifications', sectionOrder);
  }
};
```

### 4.9 Supported Section Types

| Section Type | Data Structure | Layout Control | Use Case |
|-------------|----------------|----------------|----------|
| `certifications` | `{ name, issuer, date }` | Custom vertical list | Professional certifications |
| `projects` | `{ name, description, technologies[], date }` | Portfolio-style | Project showcase |
| `languages` | `{ name, proficiency }` | Horizontal tags | Language skills |
| `awards` | `{ title, issuer, date }` | Vertical list | Awards & recognition |
| `summary` | `{ content }` | Rich text | Professional summary |
| `custom` | `{ content }` | Flexible | Any custom content |

### 4.6 Advanced Custom Sections Pattern

For specialized sections like certifications, projects, awards, etc., templates need full control over layout and data presentation. Use this pattern instead of the basic `InlineEditableList` approach.

#### 4.6.1 Required Types and Imports

```tsx
import { Plus, X } from "lucide-react";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { ResumeData, ResumeSection, SectionType } from "@/types/resume";
```

#### 4.6.2 Section Type Renderer Pattern

```tsx
// Helper function to render different section types
const renderCustomSection = (section: ResumeSection, editable: boolean) => {
  switch (section.type) {
    case 'certifications':
      return (
        <div className="space-y-4">
          {section.data.certifications?.map((cert, index) => (
            <div key={cert.id || index} className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-[14px] font-semibold text-gray-900">
                  {editable ? (
                    <InlineEditableText
                      path={`dynamicSections[${section.order}].data.certifications[${index}].name`}
                      value={cert.name}
                      className="text-[14px] font-semibold text-gray-900 block"
                      as="h4"
                    />
                  ) : (
                    cert.name
                  )}
                </h4>
                <p className="text-[12.5px] text-gray-700">
                  {editable ? (
                    <InlineEditableText
                      path={`dynamicSections[${section.order}].data.certifications[${index}].issuer`}
                      value={cert.issuer}
                      className="text-[12.5px] text-gray-700 block"
                      as="p"
                    />
                  ) : (
                    cert.issuer
                  )}
                </p>
                {cert.date && (
                  <p className="text-[11.5px] text-gray-600">
                    {editable ? (
                      <InlineEditableDate
                        path={`dynamicSections[${section.order}].data.certifications[${index}].date`}
                        value={cert.date}
                        className="text-[11.5px] text-gray-600 inline-block"
                      />
                    ) : (
                      cert.date
                    )}
                  </p>
                )}
              </div>
              {editable && (
                <button
                  onClick={() => removeCertification(section.order, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                >
                  <X className="h-3 w-3 text-red-500" />
                </button>
              )}
            </div>
          ))}
          {editable && (
            <button
              onClick={() => addCertification(section.order)}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus className="h-3 w-3" />
              Add Certification
            </button>
          )}
        </div>
      );

    case 'projects':
      return (
        <div className="space-y-6">
          {section.data.projects?.map((project, index) => (
            <div key={project.id || index}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-[14px] font-semibold text-gray-900">
                  {editable ? (
                    <InlineEditableText
                      path={`dynamicSections[${section.order}].data.projects[${index}].name`}
                      value={project.name}
                      className="text-[14px] font-semibold text-gray-900 block"
                      as="h4"
                    />
                  ) : (
                    project.name
                  )}
                </h4>
                {project.date && (
                  <p className="text-[11.5px] text-gray-600">
                    {editable ? (
                      <InlineEditableDate
                        path={`dynamicSections[${section.order}].data.projects[${index}].date`}
                        value={project.date}
                        className="text-[11.5px] text-gray-600 inline-block"
                      />
                    ) : (
                      project.date
                    )}
                  </p>
                )}
              </div>
              {project.description && (
                <p className="text-[12.5px] text-gray-700 leading-[1.7] mb-2">
                  {editable ? (
                    <InlineEditableText
                      path={`dynamicSections[${section.order}].data.projects[${index}].description`}
                      value={project.description}
                      className="text-[12.5px] text-gray-700 leading-[1.7] block"
                      multiline
                      as="p"
                    />
                  ) : (
                    project.description
                  )}
                </p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-[11px] bg-gray-100 text-gray-700 rounded"
                    >
                      {editable ? (
                        <InlineEditableText
                          path={`dynamicSections[${section.order}].data.projects[${index}].technologies[${techIndex}]`}
                          value={tech}
                          className="text-[11px] bg-gray-100 text-gray-700 rounded px-2 py-1 inline-block"
                          as="span"
                        />
                      ) : (
                        tech
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {editable && (
            <button
              onClick={() => addProject(section.order)}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus className="h-3 w-3" />
              Add Project
            </button>
          )}
        </div>
      );

    case 'languages':
      return (
        <div className="flex flex-wrap gap-4">
          {section.data.languages?.map((lang, index) => (
            <div key={lang.id || index} className="flex items-center gap-2">
              <span className="text-[12.5px] text-gray-700">
                {editable ? (
                  <InlineEditableText
                    path={`dynamicSections[${section.order}].data.languages[${index}].name`}
                    value={lang.name}
                    className="text-[12.5px] text-gray-700 inline-block"
                    as="span"
                  />
                ) : (
                  lang.name
                )}
              </span>
              {lang.proficiency && (
                <span className="text-[11.5px] text-gray-600">
                  ({editable ? (
                    <InlineEditableText
                      path={`dynamicSections[${section.order}].data.languages[${index}].proficiency`}
                      value={lang.proficiency}
                      className="text-[11.5px] text-gray-600 inline-block"
                      as="span"
                    />
                  ) : (
                    lang.proficiency
                  )})
                </span>
              )}
              {editable && (
                <button
                  onClick={() => removeLanguage(section.order, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                >
                  <X className="h-3 w-3 text-red-500" />
                </button>
              )}
            </div>
          ))}
          {editable && (
            <button
              onClick={() => addLanguage(section.order)}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus className="h-3 w-3" />
              Add Language
            </button>
          )}
        </div>
      );

    default:
      // Fallback to basic content rendering
      return (
        <div className="text-[12.5px] text-gray-700 leading-[1.7]">
          {editable ? (
            <InlineEditableText
              path={`dynamicSections[${section.order}].data.content`}
              value={section.data.content || ''}
              className="text-[12.5px] text-gray-700 leading-[1.7] block"
              multiline
              as="div"
            />
          ) : (
            section.data.content?.split("\n").map((line, i) => (
              <p key={i} className="mb-1">{line}</p>
            ))
          )}
        </div>
      );
  }
};
```

#### 4.6.3 Template Integration

```tsx
{/* Advanced Custom Sections */}
{resumeData.dynamicSections && resumeData.dynamicSections.length > 0 && (
  <div>
    {resumeData.dynamicSections
      .filter(section => section.enabled)
      .sort((a, b) => a.order - b.order)
      .map((section) => (
        <div key={section.id} className="mb-8">
          <h2 
            className={`text-[15px] font-semibold mb-3 uppercase tracking-wide ${
              section.titleAlignment === 'center' ? 'text-center' : 
              section.titleAlignment === 'right' ? 'text-right' : ''
            }`}
            style={{ 
              color: accent,
              textTransform: section.titleCase || 'title' as any
            }}
          >
            {editable ? (
              <InlineEditableText
                path={`dynamicSections[${section.order}].title`}
                value={section.title}
                className="text-[15px] font-semibold mb-3 uppercase tracking-wide block"
                style={{ color: accent }}
                as="h2"
              />
            ) : (
              section.title
            )}
          </h2>
          <div className={`${
            section.contentAlignment === 'center' ? 'text-center' :
            section.contentAlignment === 'right' ? 'text-right' :
            section.contentAlignment === 'justify' ? 'text-justify' : ''
          }`}
          >
            {renderCustomSection(section, editable)}
          </div>
        </div>
      ))}
  </div>
)}
```

#### 4.6.4 Section Management Functions

```tsx
// Add these functions to your template props
interface TemplateProps {
  // ... existing props
  onAddSectionItem?: (sectionType: SectionType, sectionOrder: number) => void;
  onRemoveSectionItem?: (sectionType: SectionType, sectionOrder: number, itemIndex: number) => void;
}

// Usage in template:
const addCertification = (sectionOrder: number) => {
  if (onAddSectionItem) {
    onAddSectionItem('certifications', sectionOrder);
  }
};

const removeCertification = (sectionOrder: number, itemIndex: number) => {
  if (onRemoveSectionItem) {
    onRemoveSectionItem('certifications', sectionOrder, itemIndex);
  }
};
```

## 5. PDF Template Implementation

### 5.1 Required PDF Template Updates

PDF templates must match the UI template's data structure and functionality. Key updates required:

#### 5.1.1 Experience Section - Bullet Points

```tsx
// OLD APPROACH (Don't use):
{hasContent(exp.description) && (
  <View style={styles.bulletList}>
    {exp.description.split("\n")...} // Wrong approach
  </View>
)}

// NEW APPROACH (Use this):
{/* Bullet Points - Use bulletPoints array if available, fallback to description */}
{exp.bulletPoints && exp.bulletPoints.length > 0 && (
  <View style={styles.bulletList}>
    {exp.bulletPoints.map((point, bulletIndex) => (
      point && point.trim() && (
        <View key={bulletIndex} style={styles.bulletItem}>
          <View style={styles.bulletDot} />
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      )
    ))}
  </View>
)}
{/* Fallback to old description field for backward compatibility */}
{!exp.bulletPoints || exp.bulletPoints.length === 0 ? (
  hasContent(exp.description) && (
    <View style={styles.bulletList}>
      {exp.description.split("\n")...}
    </View>
  )
) : null}
```

#### 5.1.2 Education Section - GPA Field

```tsx
// Add GPA field to education section:
<View style={styles.educationHeader}>
  <View>
    <Text style={styles.degree}>
      {edu.degree} {hasContent(edu.field) && `in ${edu.field}`}
    </Text>
    <Text style={styles.institution}>{edu.school}</Text>
    {edu.gpa && (
      <Text style={styles.gpa}>Grade: {edu.gpa}</Text>
    )}
  </View>
  <View>
    <Text style={styles.dateLocation}>
      {edu.startDate} - {edu.endDate}
    </Text>
  </View>
</View>
```

#### 5.1.3 Required GPA Style

```tsx
// Add to StyleSheet:
gpa: {
  fontSize: 8,
  color: "#4b5563",
  marginTop: 2,
},
```

#### 5.1.4 Key Usage Best Practices

```tsx
// Use proper keys for React rendering:
{resumeData.experience.map((exp, index) => (
  <View key={exp.id || index} style={styles.experienceItem}>
    // content
  </View>
))}

{resumeData.education.map((edu, index) => (
  <View key={edu.id || index} style={styles.educationItem}>
    // content
  </View>
))}
```

### 5.2 PDF Template Import Fix

```tsx
// WRONG IMPORT:
import { ResumeData } from "@/pages/Editor";

// CORRECT IMPORT:
import { ResumeData } from "@/types/resume";
```

### 5.3 Skill Rating System

#### 5.3.1 Optional Text-Based Skill Ratings

Templates can support optional skill ratings that users can enable/disable in both form and live editors. Instead of fixed star ratings, this system uses flexible text inputs where users can enter any rating text (e.g., "Expert", "5 years", "Advanced", "Proficient").

```tsx
// NEW COMPONENTS:
import { SkillRating } from "@/components/resume/SkillRating";
import { InlineEditableSkillsWithRating } from "@/components/resume/InlineEditableSkillsWithRating";
```

#### 5.3.2 Form Editor Implementation

```tsx
// Add rating toggle state:
const [showSkillRatings, setShowSkillRatings] = useState(false);

// Toggle function:
const toggleSkillRatings = () => {
  const newShowRatings = !showSkillRatings;
  setShowSkillRatings(newShowRatings);
  
  // Update existing skills to add or remove ratings
  const updatedSkills = resumeData.skills.map(skill => ({
    ...skill,
    rating: newShowRatings ? (skill.rating || "") : undefined,
  }));
  
  setResumeData({ ...resumeData, skills: updatedSkills });
};

// Update skill rating function:
const updateSkillLevel = (index: number, rating: string) => {
  const newSkills = [...resumeData.skills];
  newSkills[index] = { ...newSkills[index], rating };
  setResumeData({ ...resumeData, skills: newSkills });
};

// Update addSkill functions:
const addSkill = () => {
  setResumeData({
    ...resumeData,
    skills: [
      ...resumeData.skills,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: "",
        rating: showSkillRatings ? "" : undefined,
        category: "core",
      },
    ],
  });
};

// Vertical layout with ratings:
{showSkillRatings ? (
  <div className="space-y-2">
    {resumeData.skills.map((skill, index) => (
      <div key={skill.id} className="flex items-center gap-3 group">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-sm font-medium text-gray-900 min-w-0 flex-1">
            {skill.name}
          </span>
          <Input
            value={skill.rating || ""}
            onChange={(e) => updateSkillLevel(index, e.target.value)}
            placeholder="Add rating (e.g., Expert, 5 years, Advanced)"
            className="h-7 text-xs w-32 border-gray-300"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeSkill(index)}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    ))}
  </div>
) : (
  // Horizontal layout without ratings
  <div className="flex flex-wrap gap-2">
    {resumeData.skills.map((skill, index) => (
      <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-full">
        <span>{skill.name}</span>
      </div>
    ))}
  </div>
)}
```

#### 5.3.3 Live Editor Template Implementation

```tsx
// Use enhanced skills component with vertical layout:
{editable ? (
  <InlineEditableSkillsWithRating
    path="skills"
    skills={resumeData.skills}
    showRating={resumeData.skills.some(skill => skill.rating !== undefined)}
    verticalLayout={resumeData.skills.some(skill => skill.rating !== undefined)}
    renderSkill={(skill, index) => (
      <span className="flex items-center gap-2">
        {skill.name}
        {skill.rating && (
          <span className="text-xs text-gray-500">({skill.rating})</span>
        )}
      </span>
    )}
  />
) : (
  <div className={cn(
    resumeData.skills.some(skill => skill.rating) ? "space-y-1" : "flex flex-wrap gap-2"
  )}>
    {resumeData.skills.map((skill, index) => (
      resumeData.skills.some(skill => skill.rating) ? (
        // Vertical layout with ratings
        <div key={index} className="flex items-center justify-between py-1">
          <span className="text-[12px] font-medium text-gray-900">
            {skill.name}
          </span>
          {skill.rating && (
            <span className="text-[10px] text-gray-600 ml-3">
              {skill.rating}
            </span>
          )}
        </div>
      ) : (
        // Horizontal layout without ratings
        <span key={index} className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded">
          {skill.name}
        </span>
      )
    ))}
  </div>
)}
```

#### 5.3.4 PDF Template Implementation

```tsx
// Skills with text ratings in PDF:
<View style={styles.skillsContainer}>
  {resumeData.skills.map((skill, index) => (
    resumeData.skills.some(skill => skill.rating) ? (
      // Vertical layout with ratings
      <View key={index} style={styles.skillWithRatingVertical}>
        <Text style={styles.skillChip}>
          {skill.name}
        </Text>
        {skill.rating && (
          <Text style={styles.skillRating}>
            {skill.rating}
          </Text>
        )}
      </View>
    ) : (
      // Horizontal layout without ratings
      <Text key={index} style={styles.skillChip}>
        {skill.name}
      </Text>
    )
  ))}
</View>

// Required PDF styles:
skillWithRatingVertical: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 4,
},
skillRating: {
  fontSize: 7,
  fontFamily: "Inter",
  color: "#6b7280",
  marginLeft: 8,
},
```

#### 5.3.5 SkillRating Component Features

- **Text-Based Rating**: Flexible input for any rating text (Expert, Advanced, 5 years, etc.)
- **Editable Mode**: Input field for entering custom rating text
- **Multiple Sizes**: sm, md, lg variants
- **Placeholder Support**: Helpful placeholder text guidance
- **Clean Display**: Simple text display in non-editable mode
- **Vertical Layout**: Skills displayed vertically with rating inputs when enabled

#### 5.3.6 Numeric Skill Ratings (1-10 Scale with Progress Bars)

Some templates (like PremiumPro) support numeric skill ratings displayed as progress bars. This system uses a 1-10 scale where ratings are stored as strings but parsed to numbers for visual display.

**Key Features:**
- Ratings stored as strings in `skill.rating` (e.g., "9", "9/10", "9.5")
- Automatically parsed to numbers (1-10) for progress bar calculation
- Flexible input format (accepts "9", "9/10", "9.5", etc.)
- Progress bars show visual skill level representation

##### 5.3.6.1 Template Implementation (PremiumPro Pattern)

```tsx
// In the template component (e.g., PremiumProTemplate.tsx)
{editable ? (
  <InlineEditableList
    path="skills"
    items={resumeData.skills}
    defaultItem={{
      id: Date.now().toString(),
      name: "New Skill",
      rating: "",
    }}
    addButtonLabel="Add Skill"
    renderItem={(skill, index) => {
      // Parse rating string to number (1-10)
      // Handles "9", "9/10", "9.5", etc.
      const parseRating = (ratingStr: string | undefined): number | null => {
        if (!ratingStr || !ratingStr.trim()) return null;
        // Extract first number from string (handles "9", "9/10", "9.5", etc.)
        const match = ratingStr.trim().match(/^(\d+(?:\.\d+)?)/);
        if (match) {
          const num = parseFloat(match[1]);
          // Clamp between 1 and 10
          return Math.max(1, Math.min(10, Math.round(num)));
        }
        return null;
      };
      
      const skillLevel = parseRating(skill.rating);
      
      return (
        <div>
          <div className="flex items-center justify-between mb-1 gap-2">
            <InlineEditableText
              path={`skills[${index}].name`}
              value={skill.name}
              className="text-[12.5px] font-medium text-gray-900 flex-1"
              as="span"
            />
            <div className="flex items-center gap-1 flex-shrink-0">
              <InlineEditableText
                path={`skills[${index}].rating`}
                value={skill.rating || ""}
                placeholder="1-10"
                className="text-[11px] text-gray-500 w-12 text-right border border-dashed border-gray-300 rounded px-1"
                as="span"
              />
              <span className="text-[11px] text-gray-400">/10</span>
            </div>
          </div>
          {skillLevel !== null && (
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${skillLevel * 10}%`,
                  backgroundColor: accent,
                }}
              />
            </div>
          )}
        </div>
      );
    }}
  />
) : (
  // Non-editable mode
  <div className="space-y-3">
    {resumeData.skills.map((skill) => {
      const parseRating = (ratingStr: string | undefined): number | null => {
        if (!ratingStr || !ratingStr.trim()) return null;
        const match = ratingStr.trim().match(/^(\d+(?:\.\d+)?)/);
        if (match) {
          const num = parseFloat(match[1]);
          return Math.max(1, Math.min(10, Math.round(num)));
        }
        return null;
      };
      
      const skillLevel = parseRating(skill.rating);
      
      return (
        <div key={skill.id}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12.5px] font-medium text-gray-900">
              {skill.name}
            </span>
            {skill.rating && skill.rating.trim() && (
              <span className="text-[11px] text-gray-500">
                {skillLevel !== null ? `${skillLevel}/10` : skill.rating}
              </span>
            )}
          </div>
          {skillLevel !== null && (
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${skillLevel * 10}%`,
                  backgroundColor: accent,
                }}
              />
            </div>
          )}
        </div>
      );
    })}
  </div>
)}
```

##### 5.3.6.2 PDF Template Implementation

```tsx
// In the PDF component (e.g., PremiumProPDF.tsx)
{resumeData.skills && resumeData.skills.length > 0 && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Skills</Text>
    {resumeData.skills.map((skill) => {
      // Parse rating string to number (1-10)
      const parseRating = (ratingStr: string | undefined): number | null => {
        if (!ratingStr || !ratingStr.trim()) return null;
        const match = ratingStr.trim().match(/^(\d+(?:\.\d+)?)/);
        if (match) {
          const num = parseFloat(match[1]);
          return Math.max(1, Math.min(10, Math.round(num)));
        }
        return null;
      };
      
      const skillLevel = parseRating(skill.rating);
      
      return (
        <View key={skill.id} style={styles.skillItem}>
          <View style={styles.skillHeader}>
            <Text style={styles.skillName}>{skill.name}</Text>
            {skillLevel !== null && (
              <Text style={styles.skillLevel}>{skillLevel}/10</Text>
            )}
          </View>
          {skillLevel !== null && (
            <View style={styles.skillBar}>
              <View
                style={[
                  styles.skillBarFill,
                  { width: `${skillLevel * 10}%` },
                ]}
              />
            </View>
          )}
        </View>
      );
    })}
  </View>
)}
```

##### 5.3.6.3 Form Editor Enhancement

The form editor should support numeric input validation for better UX:

```tsx
// Enhanced rating input with validation
<Input
  type="text"
  value={skill.rating || ""}
  onChange={(e) => {
    // Allow numbers, decimals, and "/10" format
    const value = e.target.value;
    // Allow empty, numbers, decimals, and "/10" suffix
    if (value === "" || /^(\d+(?:\.\d+)?)(\/10)?$/.test(value) || /^\d*$/.test(value)) {
      updateSkillLevel(index, value);
    }
  }}
  placeholder="1-10"
  className="h-7 text-xs w-20 border-gray-300 text-center"
  title="Enter a number from 1-10 (e.g., 9 or 9/10)"
/>
<span className="text-xs text-muted-foreground">/10</span>
```

**Key Implementation Notes:**
- Always use `skill.rating` (string), never `skill.level` (deprecated)
- Parse ratings on-the-fly for display, don't store parsed numbers
- Support flexible input formats for better user experience
- Progress bar width = `skillLevel * 10%` (e.g., 9 → 90%)
- Always clamp parsed values between 1 and 10
- Show "/10" suffix for clarity in both form and template

#### 5.3.7 Benefits of Text-Based Ratings

- **Flexibility**: Users can enter any type of rating (years of experience, proficiency level, etc.)
- **Professional**: More suitable for professional resumes than star ratings
- **International**: Works better across different cultures and industries
- **Specific**: Allows for more detailed and meaningful skill descriptions
- **PDF Friendly**: Text displays better in PDF exports than graphical elements

## 6. Maintenance

If `ResumeData` structure changes (e.g., adding new fields), update:
1.  `src/types/resume.ts`
2.  `src/lib/resumeUtils.ts` (Sanitization & Defaults)
3.  `src/components/resume/ResumeForm.tsx` (Input UI)
4.  **ALL** PDF and Template components (Rendering)
