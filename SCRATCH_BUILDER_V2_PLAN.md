# Create Resume from Scratch - V2 Architecture Plan

## Overview

This document outlines the plan for implementing a "Create Resume from Scratch" feature that follows the v2 architecture. Users will start with a blank A4-sized resume canvas and build their resume by selecting sections from a professional helper panel on the right side.

## Goals

1. **Layout Selection**: Choose template layout (single-column, two-column, etc.) before building
2. **Blank Canvas**: Start with an empty A4-sized resume (210mm x 297mm) with selected layout
3. **Helper Panel**: Right-side panel with professional, minimal cards for each section type
4. **Variant Selection**: Clicking a section opens a modal showing multiple variants with previews
5. **Config-Driven**: All styling, layout, and behavior driven by configuration (following v2 architecture)
6. **Drag & Drop**: Sections can be reordered via drag-and-drop
7. **Export**: PDF export using existing Puppeteer-based system
8. **V2 Data Model**: Use `V2ResumeData` as the underlying data structure

## Architecture

### Component Structure

```
ScratchBuilderV2/
├── ScratchBuilderV2.tsx          # Main page component
├── LayoutSelectionScreen.tsx     # Layout selection page
├── components/
│   ├── scratch/
│   │   ├── ResumeCanvas.tsx          # A4-sized blank canvas
│   │   ├── HelperSectionPanel.tsx    # Right-side helper cards
│   │   ├── SectionVariantModal.tsx   # Modal for variant selection
│   │   ├── SectionCard.tsx           # Individual section card in panel
│   │   ├── DraggableSection.tsx     # Draggable section wrapper
│   │   └── layouts/                  # Layout preview components
│   │       ├── SingleColumnPreview.tsx
│   │       ├── TwoColumnLeftPreview.tsx
│   │       ├── TwoColumnRightPreview.tsx
│   │       ├── SplitLayoutPreview.tsx
│   │       └── CompactLayoutPreview.tsx
└── hooks/
    ├── useScratchResume.ts       # Resume state management
    └── useSectionVariants.ts     # Variant data fetching
```

### Data Flow

```
User clicks "Create from Scratch"
    ↓
Layout Selection Screen (Phase 0)
    ↓
User selects layout (single-column, two-column, etc.)
    ↓
Blank Canvas appears with selected layout
    ↓
User clicks section card
    ↓
SectionVariantModal opens (shows variants from sectionRegistry)
    ↓
User selects variant
    ↓
Section added to resumeData with variant config
    ↓
ResumeCanvas renders section using v2 renderers
    ↓
Config automatically generated for layout/styling
```

## Implementation Plan

### Phase 0: Layout/Template Selection

#### 0.1 Layout Selection Screen
- **File**: `src/v2/components/scratch/LayoutSelectionScreen.tsx`
- **Features**:
  - Full-screen selection interface
  - Grid of layout options with previews
  - Layout types:
    - **Single Column**: Traditional vertical layout
    - **Two Column (Left Sidebar)**: Main content left, sidebar right
    - **Two Column (Right Sidebar)**: Main content right, sidebar left
    - **Split Layout**: Header with two columns below
    - **Compact**: Dense, space-efficient layout
  - Each layout shows:
    - Visual preview/thumbnail
    - Layout name
    - Brief description
    - Use case (e.g., "Best for: Technical roles")
  - "Continue" button to proceed with selected layout

#### 0.2 Layout Definitions
- **File**: `src/v2/config/scratchLayouts.ts`
- **Structure**:
```typescript
interface ScratchLayout {
  id: string;
  name: string;
  description: string;
  preview: string; // Preview image or component
  layoutType: 'single-column' | 'two-column-left' | 'two-column-right' | 'split' | 'compact';
  useCase: string;
  defaultConfig: Partial<V2TemplateConfig>;
  // Section column assignment rules
  mainSections: V2SectionType[]; // Sections that go to main column
  sidebarSections: V2SectionType[]; // Sections that go to sidebar (if applicable)
}
```

#### 0.3 Layout Types Explained

**1. Single Column**
- All sections in one vertical column
- Best for: Traditional resumes, ATS-heavy applications
- Main sections: All sections
- Sidebar sections: None

**2. Two Column (Left Sidebar)**
- Main content on the right, sidebar on the left
- Best for: Technical roles, skills-heavy resumes
- Main sections: Experience, Education, Projects
- Sidebar sections: Skills, Languages, Certifications, Summary

**3. Two Column (Right Sidebar)**
- Main content on the left, sidebar on the right
- Best for: Executive roles, experience-heavy resumes
- Main sections: Experience, Education, Projects
- Sidebar sections: Skills, Languages, Certifications, Summary

**4. Split Layout**
- Header at top, two columns below
- Best for: Modern, creative resumes
- Main sections: Experience, Education
- Sidebar sections: Skills, Languages, Certifications

**5. Compact Layout**
- Dense, space-efficient single column
- Best for: Entry-level, concise resumes
- Main sections: All sections (with reduced spacing)
- Sidebar sections: None

#### 0.4 Layout Preview Components
- **File**: `src/v2/components/scratch/layouts/`
- **Components**:
  - `SingleColumnPreview.tsx`
  - `TwoColumnLeftPreview.tsx`
  - `TwoColumnRightPreview.tsx`
  - `SplitLayoutPreview.tsx`
  - `CompactLayoutPreview.tsx`
- Each shows a mini preview of how the layout will look

#### 0.5 Layout Selection Flow
- User clicks "Create from Scratch" → Navigate to `/builder/scratch-v2/select-layout`
- Display layout selection screen
- User selects layout → Store in state/URL params
- Navigate to `/builder/scratch-v2` with layout param
- Blank canvas initializes with selected layout

### Phase 1: Core Structure & Blank Canvas

#### 1.1 Create New Page Component
- **File**: `src/v2/pages/ScratchBuilderV2.tsx`
- **Features**:
  - Check for layout selection (from URL params or state)
  - If no layout selected, redirect to layout selection screen
  - Blank A4-sized canvas (210mm x 297mm) with selected layout
  - Right-side helper panel
  - Header with Save/Export buttons
  - Option to change layout (opens layout selection modal)
  - Responsive layout (stacks on mobile)

#### 1.2 Resume Canvas Component
- **File**: `src/v2/components/scratch/ResumeCanvas.tsx`
- **Features**:
  - A4 dimensions (210mm x 297mm)
  - White background with subtle border/shadow
  - Drop zone for drag-and-drop
  - Renders sections using v2 renderers
  - Personal info header (always visible, editable)
  - **Layout-aware rendering**:
    - Single column: All sections in one column
    - Two column left: Main sections left, sidebar sections right
    - Two column right: Main sections right, sidebar sections left
    - Split: Header with two columns below
    - Compact: Dense layout with optimized spacing
  - Sections automatically placed in appropriate column based on layout

#### 1.3 Helper Panel Component
- **File**: `src/v2/components/scratch/HelperSectionPanel.tsx`
- **Features**:
  - Scrollable list of section cards
  - Professional, minimal card design
  - Icons for each section type
  - Click handler to open variant modal

### Phase 2: Section Cards & Variant Modal

#### 2.1 Section Card Component
- **File**: `src/v2/components/scratch/SectionCard.tsx`
- **Design**:
  - Minimal, professional appearance
  - Icon + Section name
  - Brief description
  - Hover effects
  - Uses sectionRegistry for metadata

#### 2.2 Variant Modal Component
- **File**: `src/v2/components/scratch/SectionVariantModal.tsx`
- **Features**:
  - Grid/list of variant options
  - Preview for each variant (using previewData from sectionVariants)
  - Variant name and description
  - "Select" button for each variant
  - Close button

#### 2.3 Variant Preview
- Use existing variant preview data from `src/constants/sectionVariants.ts`
- Render mini previews in modal
- Show variant name, description, and visual preview

### Phase 3: Section Management & State

#### 3.1 Resume State Hook
- **File**: `src/v2/hooks/useScratchResume.ts`
- **Features**:
  - Initialize with blank V2ResumeData
  - Manage section order (array of section IDs)
  - Track which sections are added
  - Track variant for each section
  - Add/remove/reorder sections

#### 3.2 Section Registry Integration
- Use `src/v2/registry/sectionRegistry.ts` for:
  - Section metadata (name, icon, description)
  - Available variants per section
  - Form field definitions (for future inline editing)

#### 3.3 Variant Data Integration
- Use `src/constants/sectionVariants.ts` for:
  - Variant preview data
  - Variant names and descriptions
  - Preview rendering

### Phase 4: Drag & Drop

#### 4.1 Drag & Drop Setup
- Use `@dnd-kit` (already in project)
- **File**: `src/v2/components/scratch/DraggableSection.tsx`
- **Features**:
  - Wrap each section with drag handle
  - Visual feedback during drag
  - Reorder sections in state

#### 4.2 Section Ordering
- Maintain section order array
- Update order on drag end
- Persist order in resumeData

### Phase 5: Section Rendering

#### 5.1 Use V2 Renderers
- Leverage existing v2 section renderers
- **File**: `src/v2/components/sections/` (existing)
- **Approach**:
  - Map section type to appropriate renderer
  - Pass variant config to renderer
  - Use ResumeRenderer for full resume or individual section renderers

#### 5.2 Variant-Aware Rendering
- Each section stores its variant ID
- Renderer uses variant to determine styling
- Config generated based on variant selection

#### 5.3 Config Generation
- **File**: `src/v2/utils/scratchConfigGenerator.ts`
- **Features**:
  - Generate template config from scratch resume
  - Include layout type and column structure
  - Include section order with column assignments
  - Include variant selections
  - Default typography/spacing config
  - Theme color support
  - **Column Assignment Logic**:
    - For single-column: All sections → main column
    - For two-column layouts:
      - Experience, Education, Projects → main column
      - Skills, Languages, Certifications, Summary → sidebar column
      - User can override column assignment
    - For split layout: Similar to two-column but with header
    - For compact: All sections → main column with reduced spacing

### Phase 6: Export & Save

#### 6.1 PDF Export
- Use existing `generatePDFFromPreview` function
- **File**: `src/lib/pdfGenerator.ts` (existing)
- **Implementation**:
  - Add preview element ID to canvas
  - Call generatePDFFromPreview on export
  - Use same Puppeteer-based system

#### 6.2 Save to Firestore
- Use existing `resumeService.createResume`
- **File**: `src/lib/firestore/resumeService.ts` (existing)
- **Data Structure**:
  - Save as V2ResumeData
  - Include generated config
  - Template ID: 'scratch-v2'

### Phase 7: Styling & Polish

#### 7.1 A4 Canvas Styling
- Exact A4 dimensions
- Print-friendly styling
- Subtle shadow/border
- Responsive scaling for viewport

#### 7.2 Helper Panel Styling
- Sticky positioning
- Professional card design
- Smooth animations
- Mobile-responsive

#### 7.3 Modal Styling
- Clean, modern design
- Grid layout for variants
- Preview thumbnails
- Smooth transitions

## Data Structure

### V2ResumeData (Base)
```typescript
{
  version: '2.0',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  // ... other sections empty by default
}
```

### Section Order Tracking
```typescript
interface ScratchResumeState {
  resumeData: V2ResumeData;
  selectedLayout: 'single-column' | 'two-column-left' | 'two-column-right' | 'split' | 'compact';
  sectionOrder: Array<{
    id: string;
    type: V2SectionType;
    variantId: string;
    enabled: boolean;
    column?: 'main' | 'sidebar'; // For two-column layouts
  }>;
  config: V2TemplateConfig; // Generated config with layout
}
```

### Generated Config
```typescript
{
  id: 'scratch-v2',
  name: 'Scratch Builder',
  layout: { 
    type: 'two-column-right', // From layout selection
    mainColumn: ['summary', 'experience', 'education'], // Main sections
    sidebarColumn: ['skills', 'languages', 'certifications'] // Sidebar sections
  },
  sections: [
    { type: 'header', enabled: true },
    { type: 'summary', enabled: true, variant: 'standard', column: 'main' },
    { type: 'experience', enabled: true, variant: 'timeline', column: 'main' },
    { type: 'skills', enabled: true, variant: 'pills', column: 'sidebar' },
    // ... based on user selections
  ],
  typography: { /* defaults */ },
  spacing: { /* defaults */ },
  colors: { primary: '#2563eb' }
}
```

## File Structure

```
src/v2/
├── pages/
│   ├── ScratchBuilderV2.tsx          # NEW
│   └── LayoutSelectionScreen.tsx     # NEW
├── components/
│   ├── scratch/                      # NEW
│   │   ├── ResumeCanvas.tsx
│   │   ├── HelperSectionPanel.tsx
│   │   ├── SectionCard.tsx
│   │   ├── SectionVariantModal.tsx
│   │   ├── DraggableSection.tsx
│   │   └── layouts/                  # NEW
│   │       ├── SingleColumnPreview.tsx
│   │       ├── TwoColumnLeftPreview.tsx
│   │       ├── TwoColumnRightPreview.tsx
│   │       ├── SplitLayoutPreview.tsx
│   │       └── CompactLayoutPreview.tsx
│   └── sections/                     # EXISTING (reuse)
│       └── ...
├── hooks/
│   └── useScratchResume.ts          # NEW
├── utils/
│   └── scratchConfigGenerator.ts    # NEW
├── config/
│   └── scratchLayouts.ts            # NEW
└── registry/
    └── sectionRegistry.ts           # EXISTING (reuse)
```

## Integration Points

### 1. Route Configuration
- **File**: `src/App.tsx`
- Add routes:
  - `/builder/scratch-v2/select-layout` → `LayoutSelectionScreen`
  - `/builder/scratch-v2` → `ScratchBuilderV2` (with layout param)

### 2. Dashboard Link
- **File**: `src/v2/pages/DashboardV2.tsx`
- Update "Create from Scratch" button to navigate to `/builder/scratch-v2/select-layout`

### 3. Existing Components to Reuse
- `ResumeRenderer` from `src/v2/components/ResumeRenderer.tsx`
- Section renderers from `src/v2/components/sections/`
- `InlineEditProvider` for inline editing
- `StyleOptionsWrapper` for styling

## Section Variants Integration

### Variant Sources
1. **Section Registry**: `src/v2/registry/sectionRegistry.ts`
   - Variant definitions (id, name, description)
   - Form field definitions

2. **Variant Data**: `src/constants/sectionVariants.ts`
   - Preview data for each variant
   - Visual preview content

### Variant Selection Flow
```
User clicks section card
    ↓
Modal opens with variants from sectionRegistry
    ↓
For each variant:
  - Show name, description
  - Render preview using previewData from sectionVariants
    ↓
User selects variant
    ↓
Section added with:
  - Type (e.g., 'summary')
  - Variant ID (e.g., 'executive-summary')
  - Preview data applied to section data
    ↓
Section rendered using variant-aware renderer
```

## Config Generation Strategy

### Automatic Config Creation
When layout is selected:
1. Initialize config with selected layout type
2. Set up column structure (main/sidebar) if two-column layout
3. Define which sections go to which column based on layout

When a section is added:
1. Determine section type and variant
2. Determine which column (main/sidebar) based on:
   - Layout type (single-column = main only)
   - Section type (experience, education → main; skills, languages → sidebar)
   - User preference (can be changed later)
3. Add to config.sections array with column assignment
4. Set variant in section config
5. Update section order
6. Apply default styling for variant

### Config Structure
```typescript
{
  sections: [
    {
      type: 'summary',
      enabled: true,
      variant: 'executive-summary',
      order: 1
    },
    {
      type: 'experience',
      enabled: true,
      variant: 'timeline',
      order: 2
    }
  ],
  // ... other config properties
}
```

## Export Implementation

### PDF Generation
1. Use existing `generatePDFFromPreview` function
2. Preview element ID: `scratch-builder-v2-preview`
3. Capture A4-sized canvas
4. Send to Netlify function (Puppeteer)
5. Download PDF

### Export Flow
```
User clicks Export
    ↓
generatePDFFromPreview('scratch-builder-v2-preview', filename)
    ↓
Capture HTML with inline styles
    ↓
Send to /.netlify/functions/generate-pdf
    ↓
Puppeteer generates PDF
    ↓
Download PDF
```

## Styling Guidelines

### A4 Canvas
- Width: 210mm (794px at 96 DPI)
- Height: 297mm (1123px at 96 DPI)
- Background: White
- Border: Subtle shadow
- Padding: 12mm (45px)

### Helper Panel Cards
- Minimal design
- Icon + Title + Description
- Hover: Scale + shadow
- Border: Subtle
- Background: White with gradient

### Variant Modal
- Grid layout (2-3 columns)
- Preview thumbnail
- Variant name + description
- Select button
- Smooth animations

### Layout Selection Screen
- Full-screen overlay or dedicated page
- Grid of layout cards (2-3 columns on desktop, 1 column on mobile)
- Each card shows:
  - Layout preview (visual representation)
  - Layout name
  - Description
  - Use case/benefits
  - "Select" button
- Smooth transitions between selection and builder
- Back button to return to dashboard

## Testing Checklist

- [ ] Layout selection screen displays all layouts
- [ ] Layout previews render correctly
- [ ] Selecting layout navigates to builder
- [ ] Blank canvas renders with selected layout
- [ ] Single-column layout works correctly
- [ ] Two-column layouts (left/right) work correctly
- [ ] Split layout works correctly
- [ ] Compact layout works correctly
- [ ] Sections placed in correct columns (two-column layouts)
- [ ] Can change layout after selection
- [ ] Helper panel shows all sections
- [ ] Section cards are clickable
- [ ] Variant modal opens on click
- [ ] Variants display with previews
- [ ] Selecting variant adds section
- [ ] Sections render correctly
- [ ] Drag & drop reordering works
- [ ] Section deletion works
- [ ] PDF export generates correctly
- [ ] Save to Firestore works
- [ ] Config generation is correct
- [ ] Mobile responsive
- [ ] Inline editing works (if enabled)

## Future Enhancements

1. **Inline Editing**: Click sections to edit directly
2. **Section Settings**: Configure spacing, typography per section
3. **Template Switching**: Apply template styles to scratch resume
4. **AI Suggestions**: AI-powered section content suggestions
5. **Section Templates**: Pre-filled section templates
6. **Custom Sections**: User-defined custom sections
7. **Section Duplication**: Duplicate existing sections
8. **Undo/Redo**: History management

## Migration from Existing Scratch Builder

The existing `ScratchBuilder.tsx` uses V1 architecture. This new version:
- Uses V2ResumeData instead of ResumeData
- Uses v2 renderers instead of custom renderers
- Uses sectionRegistry for metadata
- Generates config automatically
- Better integration with v2 templates

## Timeline Estimate

- **Phase 0**: Layout selection (2-3 days)
- **Phase 1**: Core structure (2-3 days)
- **Phase 2**: Section cards & modal (2-3 days)
- **Phase 3**: State management (1-2 days)
- **Phase 4**: Drag & drop (1-2 days)
- **Phase 5**: Section rendering (2-3 days)
- **Phase 6**: Export & save (1-2 days)
- **Phase 7**: Styling & polish (2-3 days)

**Total**: ~14-21 days

## Dependencies

- `@dnd-kit/core` - Drag and drop (already installed)
- `@dnd-kit/sortable` - Sortable lists (already installed)
- `@dnd-kit/utilities` - Utilities (already installed)
- Existing v2 components and utilities
- Existing PDF generation system
- Existing Firestore service

## Notes

1. **Reuse Existing Code**: Maximize reuse of v2 components, renderers, and utilities
2. **Config-Driven**: Everything should be configurable via config objects
3. **Type Safety**: Use TypeScript types from v2 architecture
4. **Performance**: Lazy load variant previews if needed
5. **Accessibility**: Ensure keyboard navigation and screen reader support
6. **Mobile First**: Design for mobile, enhance for desktop

