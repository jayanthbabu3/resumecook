# PDF Conversion Prompt Template

Use this prompt template when asking to convert a UI template to PDF or fix PDF matching issues:

---

## Basic Conversion Request

```
Convert the [template-name] template's PDF to match the live preview exactly. 
Follow the UI_TO_PDF_CONVERSION_WORKFLOW.md to ensure:

1. Font sizes match conversion ratios (36px → 26px, 12px → 9px, etc.)
2. Spacing matches conversion ratios (32px → 20px, 20px → 15px, etc.)
3. Colors match exactly (use hex values from Tailwind classes)
4. Badges/pills match exactly (padding, font size, colors, border radius)
5. Icons are converted to SVG with correct sizes (16px → 10px)
6. Layout matches (flexbox, alignment, gaps)
7. Borders match (width, color, radius)
8. Typography matches (letter spacing, text transforms, line heights)

Template: [template-name]
Live Preview URL: http://localhost:8080/dashboard/universal-professional/editor/[template-name]
```

---

## Specific Issue Fix Request

```
Fix the PDF template for [template-name] to match the live preview. 
The following issues need to be fixed:

1. [Issue 1 - e.g., "Badges are not matching - padding and font size are wrong"]
2. [Issue 2 - e.g., "Gap between name and title is not matching"]
3. [Issue 3 - e.g., "Section spacing is incorrect"]

Follow the UI_TO_PDF_CONVERSION_WORKFLOW.md conversion ratios and patterns.

Template: [template-name]
Live Preview URL: http://localhost:8080/dashboard/universal-professional/editor/[template-name]
```

---

## Complete Template Fix Request

```
Check the template "[template-name]" and fix all issues found by the verification script. 
Follow the AUTOMATED_TEMPLATE_FIX_WORKFLOW.md to ensure all requirements are met.

Additionally, ensure the PDF template matches the live preview exactly by following 
the UI_TO_PDF_CONVERSION_WORKFLOW.md for:
- Font sizes and spacing
- Colors and borders
- Badges/pills styling
- Icons conversion
- Layout and alignment

Template: [template-name]
Live Preview URL: http://localhost:8080/dashboard/universal-professional/editor/[template-name]
```

---

## Badge/Pill Specific Fix

```
Fix the badge/pill styling in the PDF template for [template-name] to match the live preview.

In the live preview:
- Badge padding: [e.g., px-4 py-1.5 = 16px horizontal, 6px vertical]
- Badge font size: [e.g., text-[12px] = 12px]
- Badge colors: [e.g., backgroundColor: accent, color: white]
- Badge border radius: [e.g., rounded-full]

Ensure the PDF badges match these exactly using the conversion ratios from 
UI_TO_PDF_CONVERSION_WORKFLOW.md.

Template: [template-name]
Live Preview URL: http://localhost:8080/dashboard/universal-professional/editor/[template-name]
```

---

## Spacing/Gap Fix

```
Fix the spacing and gaps in the PDF template for [template-name] to match the live preview.

Specifically check:
- Gap between name and title (should be [X]px in UI → [Y]px in PDF)
- Section spacing (mb-8 = 32px → 20px in PDF)
- Heading spacing (mb-5 = 20px → 15px in PDF)
- Item spacing within sections

Follow the spacing conversion ratios from UI_TO_PDF_CONVERSION_WORKFLOW.md.

Template: [template-name]
Live Preview URL: http://localhost:8080/dashboard/universal-professional/editor/[template-name]
```

---

## Example Usage

### Example 1: Basic Conversion
```
Convert the badge-style-universal template's PDF to match the live preview exactly. 
Follow the UI_TO_PDF_CONVERSION_WORKFLOW.md to ensure font sizes, spacing, colors, 
badges, icons, and layout all match.

Template: badge-style-universal
Live Preview URL: http://localhost:8080/dashboard/universal-professional/editor/badge-style-universal
```

### Example 2: Specific Issues
```
Fix the PDF template for badge-style-universal to match the live preview. 
The following issues need to be fixed:

1. Badges are not matching - padding and font size are wrong
2. Gap between name and title is not matching
3. Skills badges background color is incorrect

Follow the UI_TO_PDF_CONVERSION_WORKFLOW.md conversion ratios and patterns.

Template: badge-style-universal
Live Preview URL: http://localhost:8080/dashboard/universal-professional/editor/badge-style-universal
```

---

## Key Points to Include

When requesting PDF conversion or fixes, always include:

1. **Template name** - The exact template identifier
2. **Live preview URL** - So the AI can reference the working version
3. **Specific issues** - If known, list what's not matching
4. **Reference to workflow** - Mention UI_TO_PDF_CONVERSION_WORKFLOW.md
5. **Conversion ratios** - If specific, mention the ratios that should be used

---

## Quick Reference: Common Conversion Ratios

- **Font Sizes**: 36px → 26px (0.72x), 16px → 11px (0.69x), 14px → 10px (0.71x), 12px → 9px (0.75x)
- **Spacing**: 32px → 20px (0.63x), 24px → 15px (0.63x), 20px → 15px (0.75x), 16px → 10px (0.63x), 8px → 5px (0.63x)
- **Icons**: 16px → 10px (0.63x), 12px → 8px (0.67x)
- **Padding**: Use same ratios as spacing
- **Borders**: 1px → 1px, 2px → 1.5px

