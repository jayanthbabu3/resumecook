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
3.  **Bullet Point Management (Live Editor):**
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
4.  **Inline Editing:** Use `InlineEditableText` components for all text fields in editable mode.

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
- [ ] **Custom Sections:** Click "Add Custom Section" in Live Editor. Verify it appears at the bottom of the resume.
- [ ] **PDF Export:** Download the PDF. It should look identical to the Live Preview.
- [ ] **Formatting:** Check margins, font sizes, and alignment. Ensure no text overlap.
- [ ] **Empty States:** Ensure fields like "Social Links" disappear gracefully if empty.
- [ ] **Non-Editable Mode:** Verify template renders correctly in form editor preview (non-editable mode).

## 4. Bullet Point Implementation Pattern

This section provides the complete, copy-paste-ready pattern for implementing bullet point management in any template.

### 4.1 Required Imports

```tsx
import { Plus, X } from "lucide-react";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
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

### 4.4 Key Implementation Notes

- **Variable Names**: Use `index` from `.map()` callback for the path, not `indexOf()`
- **Conditional Rendering**: Always check `editable` prop before rendering interactive elements
- **Event Handling**: Use `preventDefault()` and `stopPropagation()` to avoid conflicts
- **Validation**: Check function availability and `exp.id` before calling
- **Styling**: Use consistent button styling and hover effects
- **Accessibility**: Include proper placeholder text for empty bullet points

## 5. Maintenance

If `ResumeData` structure changes (e.g., adding new fields), update:
1.  `src/types/resume.ts`
2.  `src/lib/resumeUtils.ts` (Sanitization & Defaults)
3.  `src/components/resume/ResumeForm.tsx` (Input UI)
4.  **ALL** PDF and Template components (Rendering)
