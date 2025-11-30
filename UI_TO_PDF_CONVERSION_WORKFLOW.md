# UI to PDF Template Conversion Workflow

> **Purpose**: This workflow provides a systematic approach to convert React/HTML live preview templates to React PDF templates, ensuring pixel-perfect matching between live preview and PDF output.

> **Reference Templates**: `professional` and `minimal` - These templates serve as working examples of correct conversion patterns.

> **Reference URLs**: 
> - http://localhost:8080/dashboard/universal-professional/editor/professional
> - http://localhost:8080/dashboard/universal-professional/editor/minimal

---

## Table of Contents

1. [Core Conversion Principles](#core-conversion-principles)
2. [Font Size Conversion](#font-size-conversion)
3. [Spacing Conversion](#spacing-conversion)
4. [Color Conversion](#color-conversion)
5. [Border Conversion](#border-conversion)
6. [Icon Conversion](#icon-conversion)
7. [Layout Conversion](#layout-conversion)
8. [Typography Conversion](#typography-conversion)
9. [Page Structure](#page-structure)
10. [Step-by-Step Conversion Process](#step-by-step-conversion-process)
11. [Common Patterns Library](#common-patterns-library)
12. [Verification Checklist](#verification-checklist)

---

## Core Conversion Principles

### 1. **Exact Visual Matching**
- PDF should visually match the live preview as closely as possible
- Use the same color values, font sizes (proportionally), and spacing relationships
- Maintain the same visual hierarchy and layout structure

### 2. **Proportional Scaling**
- Font sizes are typically reduced by ~0.7x ratio (UI to PDF)
- Spacing is typically reduced by ~0.6-0.7x ratio
- Maintain relative proportions between elements

### 3. **React PDF Limitations**
- React PDF doesn't support all CSS properties
- Use StyleSheet.create() for all styles
- No CSS classes - everything must be inline styles
- Limited support for complex layouts (use flexbox patterns)

### 4. **Standard Conversion Ratios**

| Element Type | UI Size | PDF Size | Ratio |
|--------------|---------|----------|-------|
| **Main Heading** (Name) | 36px | 26px | 0.72x |
| **Section Heading** | 12px | 10px | 0.83x |
| **Subheading** (Position/Degree) | 16px | 11px | 0.69x |
| **Body Text** | 14px | 10px | 0.71x |
| **Small Text** (Dates/Skills) | 12px | 9px | 0.75x |
| **Section Spacing** | 32px | 20px | 0.63x |
| **Heading Spacing** | 20px | 15px | 0.75x |

---

## Font Size Conversion

### Standard Font Size Mapping

| UI Class | UI Size (px) | PDF Size (px) | PDF fontSize |
|----------|--------------|---------------|--------------|
| `text-4xl` | 36px | 26px | `fontSize: 26` |
| `text-3xl` | 30px | 22px | `fontSize: 22` |
| `text-2xl` | 24px | 18px | `fontSize: 18` |
| `text-xl` | 20px | 14px | `fontSize: 14` |
| `text-lg` | 18px | 13px | `fontSize: 13` |
| `text-base` | 16px | 11px | `fontSize: 11` |
| `text-sm` | 14px | 10px | `fontSize: 10` |
| `text-xs` | 12px | 9px | `fontSize: 9` |

### Custom Font Sizes

For custom sizes like `text-[36px]`:
- **UI**: `text-[36px]` = 36px
- **PDF**: `fontSize: 26` (36px × 0.72 = 25.92px ≈ 26px)

### Font Weight Conversion

| UI Class | PDF fontWeight |
|----------|----------------|
| `font-light` | `fontWeight: 300` |
| `font-normal` | `fontWeight: 400` |
| `font-medium` | `fontWeight: 500` |
| `font-semibold` | `fontWeight: 600` |
| `font-bold` | `fontWeight: 700` |

### Example Conversion

**UI Template:**
```tsx
<h1 className="text-4xl font-bold text-gray-900 mb-2">
  {resumeData.personalInfo.fullName}
</h1>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  name: {
    fontSize: 26,        // text-4xl (36px) → 26px
    fontWeight: 700,     // font-bold
    color: '#111827',    // text-gray-900
    marginBottom: 5,     // mb-2 (8px) → 5px
  },
});

<Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
```

---

## Spacing Conversion

### Margin/Padding Conversion

| UI Class | UI Size (px) | PDF Size (px) | PDF Value |
|----------|--------------|---------------|-----------|
| `mb-1` | 4px | 2px | `marginBottom: 2` |
| `mb-2` | 8px | 5px | `marginBottom: 5` |
| `mb-3` | 12px | 8px | `marginBottom: 8` |
| `mb-4` | 16px | 10px | `marginBottom: 10` |
| `mb-5` | 20px | 15px | `marginBottom: 15` |
| `mb-6` | 24px | 18px | `marginBottom: 18` |
| `mb-8` | 32px | 20px | `marginBottom: 20` |
| `mb-10` | 40px | 25px | `marginBottom: 25` |
| `mb-12` | 48px | 30px | `marginBottom: 30` |

### Gap Conversion

| UI Class | UI Size (px) | PDF Size (px) | PDF Value |
|----------|--------------|---------------|-----------|
| `gap-1` | 4px | 3px | `gap: 3` |
| `gap-2` | 8px | 6px | `gap: 6` |
| `gap-3` | 12px | 8px | `gap: 8` |
| `gap-4` | 16px | 12px | `gap: 12` |
| `gap-6` | 24px | 18px | `gap: 18` |

### Padding Conversion

| UI Class | UI Size (px) | PDF Size (px) | PDF Value |
|----------|--------------|---------------|-----------|
| `p-1` | 4px | 3px | `padding: 3` |
| `p-2` | 8px | 5px | `padding: 5` |
| `p-3` | 12px | 8px | `padding: 8` |
| `p-4` | 16px | 10px | `padding: 10` |
| `p-6` | 24px | 15px | `padding: 15` |
| `p-8` | 32px | 20px | `padding: 20` |
| `p-10` | 40px | 25px | `padding: 25` |
| `p-12` | 48px | 30px | `padding: 30` |

### Horizontal/Vertical Padding

| UI Class | UI Size (px) | PDF Size (px) | PDF Value |
|----------|--------------|---------------|-----------|
| `px-4` | 16px | 10px | `paddingHorizontal: 10` |
| `py-2` | 8px | 5px | `paddingVertical: 5` |
| `px-12` | 48px | 30px | `paddingHorizontal: 30` |
| `py-10` | 40px | 25px | `paddingVertical: 25` |

### Example Conversion

**UI Template:**
```tsx
<div className="mb-8 p-6 border-b border-gray-200">
  <h2 className="text-xs font-semibold mb-5">Section Title</h2>
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  section: {
    marginBottom: 20,        // mb-8 (32px) → 20px
    padding: 15,             // p-6 (24px) → 15px
    borderBottomWidth: 1,    // border-b
    borderBottomColor: '#e5e7eb', // border-gray-200
  },
  sectionTitle: {
    fontSize: 9,             // text-xs (12px) → 9px
    fontWeight: 600,         // font-semibold
    marginBottom: 15,        // mb-5 (20px) → 15px
  },
});
```

---

## Color Conversion

### Tailwind Color to Hex Mapping

| Tailwind Class | Hex Color | PDF Color |
|----------------|-----------|-----------|
| `text-gray-900` | `#111827` | `color: '#111827'` |
| `text-gray-800` | `#1f2937` | `color: '#1f2937'` |
| `text-gray-700` | `#374151` | `color: '#374151'` |
| `text-gray-600` | `#4b5563` | `color: '#4b5563'` |
| `text-gray-500` | `#6b7280` | `color: '#6b7280'` |
| `text-gray-400` | `#9ca3af` | `color: '#9ca3af'` |
| `text-gray-300` | `#d1d5db` | `color: '#d1d5db'` |
| `text-gray-200` | `#e5e7eb` | `color: '#e5e7eb'` |
| `bg-white` | `#ffffff` | `backgroundColor: '#ffffff'` |
| `bg-gray-50` | `#f9fafb` | `backgroundColor: '#f9fafb'` |
| `bg-gray-100` | `#f3f4f6` | `backgroundColor: '#f3f4f6'` |
| `border-gray-200` | `#e5e7eb` | `borderColor: '#e5e7eb'` |
| `border-gray-300` | `#d1d5db` | `borderColor: '#d1d5db'` |

### Opacity/Transparency Handling

React PDF doesn't support `opacity` well for borders. Use color blending instead:

**UI Template:**
```tsx
<div className="bg-blue-500 opacity-80">
  Content
</div>
```

**PDF Template:**
```tsx
// Helper function to blend color with white for opacity
const hexToLightHex = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const newR = Math.round(r * opacity + 255 * (1 - opacity));
  const newG = Math.round(g * opacity + 255 * (1 - opacity));
  const newB = Math.round(b * opacity + 255 * (1 - opacity));
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: hexToLightHex('#3b82f6', 0.8), // blue-500 with 80% opacity
  },
});
```

### Theme Color Usage

**UI Template:**
```tsx
<div style={{ color: themeColor }}>
  Text
</div>
```

**PDF Template:**
```tsx
const createStyles = (themeColor: string) => StyleSheet.create({
  text: {
    color: themeColor,
  },
});

// Usage
const styles = createStyles(themeColor || '#3b82f6');
<Text style={styles.text}>Text</Text>
```

---

## Border Conversion

### Border Width Conversion

| UI Class | UI Size (px) | PDF Size (px) | PDF Value |
|----------|--------------|---------------|-----------|
| `border` | 1px | 1px | `borderWidth: 1` |
| `border-2` | 2px | 1.5px | `borderWidth: 1.5` |
| `border-4` | 4px | 3px | `borderWidth: 3` |
| `border-b` | 1px | 1px | `borderBottomWidth: 1` |
| `border-b-2` | 2px | 1.5px | `borderBottomWidth: 1.5` |
| `border-t` | 1px | 1px | `borderTopWidth: 1` |
| `border-l` | 1px | 1px | `borderLeftWidth: 1` |
| `border-r` | 1px | 1px | `borderRightWidth: 1` |

### Border Radius Conversion

| UI Class | UI Size (px) | PDF Size (px) | PDF Value |
|----------|--------------|---------------|-----------|
| `rounded` | 4px | 4px | `borderRadius: 4` |
| `rounded-md` | 6px | 6px | `borderRadius: 6` |
| `rounded-lg` | 8px | 8px | `borderRadius: 8` |
| `rounded-full` | 9999px | 9999px | `borderRadius: 9999` |

### Example Conversion

**UI Template:**
```tsx
<div className="border-b-2 border-gray-900 pb-6">
  Header
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1.5,      // border-b-2 (2px) → 1.5px
    borderBottomColor: '#111827', // border-gray-900
    paddingBottom: 15,            // pb-6 (24px) → 15px
  },
});
```

---

## Icon Conversion

### Lucide React Icons to React PDF SVG

React PDF doesn't support Lucide React icons. Convert them to SVG using `Svg`, `Path`, `Rect`, and `Circle` components.

### Common Icon Patterns

#### Mail Icon

**UI Template:**
```tsx
<Mail className="h-4 w-4" />
```

**PDF Template:**
```tsx
<Svg width="10" height="10" viewBox="0 0 24 24">
  <Path
    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
  <Path
    d="m22 6-10 7L2 6"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
</Svg>
```

#### Phone Icon

**UI Template:**
```tsx
<Phone className="h-4 w-4" />
```

**PDF Template:**
```tsx
<Svg width="10" height="10" viewBox="0 0 24 24">
  <Path
    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
</Svg>
```

#### MapPin (Location) Icon

**UI Template:**
```tsx
<MapPin className="h-4 w-4" />
```

**PDF Template:**
```tsx
<Svg width="10" height="10" viewBox="0 0 24 24">
  <Path
    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
  <Circle
    cx="12"
    cy="10"
    r="3"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
</Svg>
```

#### LinkedIn Icon

**UI Template:**
```tsx
<Linkedin className="h-4 w-4" />
```

**PDF Template:**
```tsx
<Svg width="10" height="10" viewBox="0 0 24 24">
  <Path
    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
  <Rect
    x="2"
    y="9"
    width="4"
    height="12"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
  <Circle
    cx="4"
    cy="4"
    r="2"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
</Svg>
```

#### GitHub Icon

**UI Template:**
```tsx
<Github className="h-4 w-4" />
```

**PDF Template:**
```tsx
<Svg width="10" height="10" viewBox="0 0 24 24">
  <Path
    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
</Svg>
```

#### Globe (Portfolio) Icon

**UI Template:**
```tsx
<Globe className="h-4 w-4" />
```

**PDF Template:**
```tsx
<Svg width="10" height="10" viewBox="0 0 24 24">
  <Circle
    cx="12"
    cy="12"
    r="10"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
  <Path
    d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
    fill="none"
    stroke="#666"
    strokeWidth="2"
  />
</Svg>
```

### Icon Size Conversion

| UI Size | UI Class | PDF Size | PDF width/height |
|---------|----------|----------|------------------|
| 12px | `h-3 w-3` | 8px | `width="8" height="8"` |
| 16px | `h-4 w-4` | 10px | `width="10" height="10"` |
| 20px | `h-5 w-5` | 12px | `width="12" height="12"` |

---

## Layout Conversion

### Flexbox Conversion

| UI Class | PDF Style |
|----------|-----------|
| `flex` | `flexDirection: 'row'` |
| `flex-col` | `flexDirection: 'column'` |
| `flex-row` | `flexDirection: 'row'` |
| `flex-wrap` | `flexWrap: 'wrap'` |
| `items-center` | `alignItems: 'center'` |
| `items-start` | `alignItems: 'flex-start'` |
| `items-end` | `alignItems: 'flex-end'` |
| `justify-center` | `justifyContent: 'center'` |
| `justify-between` | `justifyContent: 'space-between'` |
| `justify-start` | `justifyContent: 'flex-start'` |
| `justify-end` | `justifyContent: 'flex-end'` |
| `gap-4` | `gap: 12` (or use margin on children) |

### Example Conversion

**UI Template:**
```tsx
<div className="flex flex-wrap items-center gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12, // gap-4 (16px) → 12px
  },
});

<View style={styles.container}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>
```

### Grid Conversion

React PDF doesn't support CSS Grid. Use flexbox instead:

**UI Template:**
```tsx
<div className="grid grid-cols-2 gap-10">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridColumn: {
    width: '48%', // 50% - gap
  },
});

<View style={styles.gridContainer}>
  <View style={styles.gridColumn}>
    <Text>Column 1</Text>
  </View>
  <View style={styles.gridColumn}>
    <Text>Column 2</Text>
  </View>
</View>
```

---

## Typography Conversion

### Letter Spacing

| UI Class | UI Value | PDF Value |
|----------|----------|-----------|
| `tracking-tight` | -0.025em | `letterSpacing: -0.5` |
| `tracking-normal` | 0em | `letterSpacing: 0` |
| `tracking-wide` | 0.025em | `letterSpacing: 0.5` |
| `tracking-wider` | 0.05em | `letterSpacing: 1` |
| `tracking-widest` | 0.1em | `letterSpacing: 2` |

### Text Transform

| UI Class | PDF Value |
|----------|-----------|
| `uppercase` | `textTransform: 'uppercase'` |
| `lowercase` | `textTransform: 'lowercase'` |
| `capitalize` | `textTransform: 'capitalize'` |

### Text Align

| UI Class | PDF Value |
|----------|-----------|
| `text-left` | `textAlign: 'left'` |
| `text-center` | `textAlign: 'center'` |
| `text-right` | `textAlign: 'right'` |

### Line Height

| UI Class | UI Value | PDF Value |
|----------|----------|-----------|
| `leading-none` | 1 | `lineHeight: 1` |
| `leading-tight` | 1.25 | `lineHeight: 1.25` |
| `leading-snug` | 1.375 | `lineHeight: 1.375` |
| `leading-normal` | 1.5 | `lineHeight: 1.5` |
| `leading-relaxed` | 1.625 | `lineHeight: 1.625` |
| `leading-loose` | 2 | `lineHeight: 2` |

### Example Conversion

**UI Template:**
```tsx
<h2 className="text-xs font-semibold mb-5 uppercase tracking-widest text-center">
  Section Title
</h2>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 9,              // text-xs (12px) → 9px
    fontWeight: 600,          // font-semibold
    marginBottom: 15,         // mb-5 (20px) → 15px
    textTransform: 'uppercase',
    letterSpacing: 2,         // tracking-widest
    textAlign: 'center',
  },
});
```

---

## Page Structure

### Page Margins

Always use `PDF_PAGE_MARGINS` from `@/lib/pdfConfig`:

```tsx
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,      // 40px
    paddingRight: PDF_PAGE_MARGINS.right,  // 40px
    paddingBottom: PDF_PAGE_MARGINS.bottom, // 40px
    paddingLeft: PDF_PAGE_MARGINS.left,    // 40px
    fontSize: 10,
    fontFamily: 'Inter',
  },
});
```

### Full-Width Sections

For sections that extend to page edges (like headers with background colors):

**UI Template:**
```tsx
<div className="p-10 bg-blue-500 text-white">
  Header Content
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,    // 40px
    paddingRight: PDF_PAGE_MARGINS.right, // 40px
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
  },
  fullWidthHeader: {
    backgroundColor: '#3b82f6',
    paddingTop: 40,        // p-10 (40px)
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
    color: '#ffffff',
    marginLeft: -40,       // Negative margin to extend to edge
    marginRight: -40,
    marginTop: -40,
  },
});
```

### Page Break Handling

**UI Template:**
```tsx
<div style={{ pageBreakInside: 'avoid' }}>
  Section Content
</div>
<h2 style={{ pageBreakAfter: 'avoid' }}>Section Title</h2>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  section: {
    pageBreakInside: 'avoid',
  },
  sectionTitle: {
    pageBreakAfter: 'avoid',
  },
});

// Or use break prop on View
<View style={styles.section} break={false}>
  Content
</View>
```

---

## Step-by-Step Conversion Process

### Step 1: Analyze UI Template Structure

1. Identify all sections (Header, Summary, Experience, Education, Skills, etc.)
2. Note all font sizes, colors, spacing, and layout patterns
3. List all icons used
4. Identify any special styling (gradients, borders, backgrounds)

### Step 2: Create PDF StyleSheet

1. Import required React PDF components:
   ```tsx
   import { Document, Page, Text, View, StyleSheet, Svg, Path, Image, Rect, Circle } from '@react-pdf/renderer';
   ```

2. Create StyleSheet with all styles:
   ```tsx
   const styles = StyleSheet.create({
     // All styles here
   });
   ```

3. If using theme colors, create a function:
   ```tsx
   const createStyles = (themeColor: string) => StyleSheet.create({
     // Styles using themeColor
   });
   ```

### Step 3: Convert Each Section

For each section in the UI template:

1. **Convert Container:**
   - Map className to StyleSheet style
   - Convert padding/margin values
   - Convert background colors
   - Convert borders

2. **Convert Typography:**
   - Map font sizes using conversion table
   - Map font weights
   - Map colors
   - Map text transforms and letter spacing

3. **Convert Layout:**
   - Convert flexbox classes to React PDF flexDirection
   - Convert grid to flexbox with width percentages
   - Convert gaps to margin or gap property

4. **Convert Icons:**
   - Replace Lucide React icons with SVG components
   - Match icon sizes
   - Match icon colors

### Step 4: Handle Special Cases

1. **Conditional Rendering:**
   - Use `hasContent()` helper for conditional rendering
   - Match UI conditional logic

2. **Dynamic Content:**
   - Ensure all data fields are handled
   - Match date formatting
   - Match bullet point rendering

3. **Page Breaks:**
   - Add `pageBreakInside: 'avoid'` to sections
   - Add `pageBreakAfter: 'avoid'` to headings

### Step 5: Verify Matching

1. Compare font sizes section by section
2. Compare spacing between elements
3. Compare colors (especially theme colors)
4. Compare layout structure
5. Verify icons are present and correctly sized
6. Test with different data to ensure dynamic content works

---

## Common Patterns Library

### Pattern 1: Header Section

**UI Template:**
```tsx
<div className="mb-8 pb-6 border-b border-gray-900">
  <h1 className="text-4xl font-bold text-gray-900 mb-2">
    {resumeData.personalInfo.fullName}
  </h1>
  <p className="text-xl text-gray-700 font-medium">
    {resumeData.personalInfo.title}
  </p>
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,        // mb-8 (32px) → 20px
    paddingBottom: 15,       // pb-6 (24px) → 15px
    borderBottomWidth: 1,    // border-b
    borderBottomColor: '#111827', // border-gray-900
  },
  name: {
    fontSize: 26,            // text-4xl (36px) → 26px
    fontWeight: 700,         // font-bold
    color: '#111827',        // text-gray-900
    marginBottom: 5,         // mb-2 (8px) → 5px
  },
  title: {
    fontSize: 14,            // text-xl (20px) → 14px
    color: '#374151',        // text-gray-700
    fontWeight: 500,         // font-medium
  },
});

<View style={styles.header}>
  <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
  <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
</View>
```

### Pattern 2: Section with Title

**UI Template:**
```tsx
<div className="mb-8">
  <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest">
    Experience
  </h2>
  {/* Content */}
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  section: {
    marginBottom: 20,        // mb-8 (32px) → 20px
  },
  sectionTitle: {
    fontSize: 9,             // text-xs (12px) → 9px
    fontWeight: 600,         // font-semibold
    marginBottom: 15,        // mb-5 (20px) → 15px
    textTransform: 'uppercase',
    letterSpacing: 2,        // tracking-widest
  },
});

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Experience</Text>
  {/* Content */}
</View>
```

### Pattern 3: Experience Item

**UI Template:**
```tsx
<div className="mb-6">
  <div className="flex justify-between items-baseline mb-2">
    <div>
      <h3 className="text-base font-semibold text-gray-900">
        {exp.position}
      </h3>
      <p className="text-sm text-gray-600 font-light">
        {exp.company}
      </p>
    </div>
    <p className="text-xs text-gray-500 font-light">
      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
    </p>
  </div>
  <ul className="space-y-1">
    {exp.bulletPoints.map((bullet, i) => (
      <li key={i} className="text-sm text-gray-700">• {bullet}</li>
    ))}
  </ul>
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  experienceItem: {
    marginBottom: 18,        // mb-6 (24px) → 18px
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,         // mb-2 (8px) → 5px
  },
  position: {
    fontSize: 11,            // text-base (16px) → 11px
    fontWeight: 600,         // font-semibold
    color: '#111827',        // text-gray-900
  },
  company: {
    fontSize: 10,            // text-sm (14px) → 10px
    color: '#4b5563',        // text-gray-600
    fontWeight: 300,         // font-light
  },
  date: {
    fontSize: 9,             // text-xs (12px) → 9px
    color: '#6b7280',        // text-gray-500
    fontWeight: 300,         // font-light
  },
  bulletPoint: {
    fontSize: 10,            // text-sm (14px) → 10px
    color: '#374151',        // text-gray-700
    marginBottom: 2,         // space-y-1 (4px) → 2px
    marginLeft: 0,
  },
});

<View style={styles.experienceItem}>
  <View style={styles.experienceHeader}>
    <View>
      <Text style={styles.position}>{exp.position}</Text>
      <Text style={styles.company}>{exp.company}</Text>
    </View>
    <Text style={styles.date}>
      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
    </Text>
  </View>
  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
    <View>
      {exp.bulletPoints.map((bullet, i) => (
        <Text key={i} style={styles.bulletPoint}>• {bullet}</Text>
      ))}
    </View>
  )}
</View>
```

### Pattern 4: Contact Info with Icons

**UI Template:**
```tsx
<div className="flex flex-wrap gap-4 text-sm text-gray-600">
  {resumeData.personalInfo.email && (
    <div className="flex items-center gap-2">
      <Mail className="h-4 w-4" />
      <span>{resumeData.personalInfo.email}</span>
    </div>
  )}
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,                 // gap-4 (16px) → 12px
    fontSize: 10,            // text-sm (14px) → 10px
    color: '#4b5563',        // text-gray-600
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,                  // gap-2 (8px) → 6px
  },
});

<View style={styles.contactRow}>
  {resumeData.personalInfo.email && (
    <View style={styles.contactItem}>
      <Svg width="10" height="10" viewBox="0 0 24 24">
        <Path
          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          fill="none"
          stroke="#4b5563"
          strokeWidth="2"
        />
        <Path
          d="m22 6-10 7L2 6"
          fill="none"
          stroke="#4b5563"
          strokeWidth="2"
        />
      </Svg>
      <Text>{resumeData.personalInfo.email}</Text>
    </View>
  )}
</View>
```

### Pattern 5: Skills Section

**UI Template:**
```tsx
<div className="flex flex-wrap gap-2">
  {resumeData.skills.map((skill) => (
    <span
      key={skill.id}
      className="px-2.5 py-1 rounded text-xs font-medium bg-gray-100 border border-gray-200"
    >
      {skill.name}
    </span>
  ))}
</div>
```

**PDF Template:**
```tsx
const styles = StyleSheet.create({
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,                  // gap-2 (8px) → 6px
  },
  skillChip: {
    paddingHorizontal: 8,    // px-2.5 (10px) → 8px
    paddingVertical: 3,      // py-1 (4px) → 3px
    borderRadius: 4,         // rounded
    fontSize: 9,             // text-xs (12px) → 9px
    fontWeight: 500,         // font-medium
    backgroundColor: '#f3f4f6', // bg-gray-100
    borderWidth: 1,          // border
    borderColor: '#e5e7eb',  // border-gray-200
    marginRight: 6,
    marginBottom: 6,
  },
});

<View style={styles.skillsContainer}>
  {resumeData.skills.map((skill) => (
    <Text key={skill.id} style={styles.skillChip}>
      {skill.name}
    </Text>
  ))}
</View>
```

---

## Verification Checklist

After converting a template, verify the following:

### ✅ Font Sizes
- [ ] All font sizes match conversion ratios
- [ ] Main heading (name) is 26px in PDF (36px in UI)
- [ ] Section headings are 9-10px in PDF (12px in UI)
- [ ] Body text is 10px in PDF (14px in UI)
- [ ] Small text (dates, skills) is 9px in PDF (12px in UI)

### ✅ Spacing
- [ ] Section spacing matches (32px UI → 20px PDF)
- [ ] Heading spacing matches (20px UI → 15px PDF)
- [ ] Item spacing matches conversion ratios
- [ ] Padding matches conversion ratios

### ✅ Colors
- [ ] All colors match exactly (use hex values)
- [ ] Theme colors are passed correctly
- [ ] Opacity is handled correctly (use color blending if needed)

### ✅ Borders
- [ ] Border widths match (1px → 1px, 2px → 1.5px)
- [ ] Border colors match
- [ ] Border radius matches

### ✅ Icons
- [ ] All icons are converted to SVG
- [ ] Icon sizes match (16px UI → 10px PDF)
- [ ] Icon colors match

### ✅ Layout
- [ ] Flexbox layout matches
- [ ] Grid is converted to flexbox correctly
- [ ] Alignment matches (left, center, right)
- [ ] Full-width sections extend correctly

### ✅ Typography
- [ ] Letter spacing matches
- [ ] Text transforms match
- [ ] Line heights match
- [ ] Font weights match

### ✅ Page Structure
- [ ] Page margins are correct (40px)
- [ ] Full-width sections use negative margins correctly
- [ ] Page breaks are handled correctly

### ✅ Content
- [ ] All sections render correctly
- [ ] Conditional rendering works (hasContent)
- [ ] Date formatting matches
- [ ] Bullet points render correctly
- [ ] Dynamic content works

---

## Quick Reference: Conversion Ratios

### Font Sizes
- 36px → 26px (0.72x)
- 20px → 14px (0.70x)
- 16px → 11px (0.69x)
- 14px → 10px (0.71x)
- 12px → 9px (0.75x)

### Spacing
- 32px → 20px (0.63x)
- 24px → 15px (0.63x)
- 20px → 15px (0.75x)
- 16px → 10px (0.63x)
- 12px → 8px (0.67x)
- 8px → 5px (0.63x)
- 4px → 2-3px (0.5-0.75x)

### Icons
- 16px → 10px (0.63x)
- 12px → 8px (0.67x)

---

## Best Practices

1. **Always use StyleSheet.create()** - Never inline styles in React PDF
2. **Use createStyles function for theme colors** - Makes it easy to pass themeColor prop
3. **Import hasContent helper** - Use for conditional rendering
4. **Match exact hex colors** - Don't approximate colors
5. **Test with different data** - Ensure dynamic content works
6. **Verify page breaks** - Add pageBreakInside/After where needed
7. **Use PDF_PAGE_MARGINS** - Don't hardcode margin values
8. **Convert icons early** - Icons are time-consuming, do them first
9. **Section by section** - Convert one section at a time, verify, then move on
10. **Compare side-by-side** - Open UI and PDF side-by-side to verify matching

---

## Common Pitfalls to Avoid

1. **Don't forget to convert icon sizes** - Icons need size conversion too
2. **Don't use CSS classes** - React PDF doesn't support them
3. **Don't forget negative margins** - For full-width sections
4. **Don't approximate colors** - Use exact hex values
5. **Don't forget page breaks** - Add them to prevent awkward breaks
6. **Don't use rgba() directly** - Use color blending helper for opacity
7. **Don't forget flexWrap** - React PDF needs explicit flexWrap
8. **Don't use CSS Grid** - Convert to flexbox
9. **Don't forget hasContent()** - For conditional rendering
10. **Don't skip verification** - Always verify each section matches

---

This workflow ensures that PDF templates match their live preview counterparts exactly, maintaining visual consistency across all templates.

