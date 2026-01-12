# Grid-Based Canvas Builder - Implementation Requirements

**Project:** Resume Cook  
**Feature:** Grid-Based Canvas Builder (New Page)  
**Date:** December 22, 2024  
**Status:** Ready for Implementation

---

## 🎯 Overview

Create a **new, production-ready grid-based canvas builder** as a separate page that allows users to:
- Resize section widths (12-column grid system)
- Drag sections to reorder vertically
- Choose from width presets (Full, Wide, Normal, Half, etc.)
- Maintain ATS compatibility
- Export to PDF with exact positioning

**Key Principle:** This is a **NEW PAGE** - does not affect existing scratch builder (`/builder/scratch-v2`)

---

## 📋 Table of Contents

1. [Core Features](#core-features)
2. [Technical Architecture](#technical-architecture)
3. [UI/UX Specifications](#uiux-specifications)
4. [Data Models](#data-models)
5. [Component Structure](#component-structure)
6. [User Flows](#user-flows)
7. [Implementation Checklist](#implementation-checklist)
8. [Testing Requirements](#testing-requirements)

---

## 🎨 Core Features

### Feature 1: 12-Column Grid System

**What:**
- Resume canvas divided into 12 equal columns
- Sections snap to column boundaries
- Visual grid guides during drag/resize

**Why:**
- Provides flexibility while maintaining structure
- Ensures clean alignment
- ATS-compatible (maintains reading order)

**User Benefit:**
- Easy to create professional layouts
- No messy overlapping sections
- Predictable, clean results

---

### Feature 2: Flexible Section Width

**What:**
- Each section can span 1-12 columns
- Width presets for quick adjustments:
  - **Full Width** (12 columns) - Headers, summaries
  - **Wide** (10 columns) - Centered content
  - **Normal** (8 columns) - Main content
  - **Half** (6 columns) - Two-column layouts
  - **Third** (4 columns) - Sidebar sections
  - **Custom** (slider 1-12) - Fine control

**Why:**
- Users want control over section sizing
- Common patterns need quick access
- Custom slider for edge cases

**User Benefit:**
- Create unique layouts quickly
- No coding or complex tools needed
- Visual, intuitive controls

---

### Feature 3: Drag & Drop Reordering

**What:**
- Drag handle on each section
- Drag vertically to reorder
- Smooth animations
- Grid guides appear during drag
- Sections auto-adjust positions

**Why:**
- Users need to control section order
- Visual feedback is essential
- Smooth UX expected in modern apps

**User Benefit:**
- Intuitive reordering
- See changes in real-time
- No confusion about where section will land

---

### Feature 4: Smart Defaults

**What:**
- Each section type has intelligent default width:
  - **Header**: Always full width (12 columns)
  - **Summary**: Full width by default
  - **Experience**: 8 columns (leaves room for sidebar)
  - **Skills**: 4 columns (sidebar width)
  - **Education**: 8 columns
  - **Projects**: Full width
  - All others: 8 columns (adjustable)

**Why:**
- Reduce user decision fatigue
- Start with professional layouts
- Users can adjust if needed

**User Benefit:**
- Looks good immediately
- Less work to get started
- Can customize later

---

### Feature 5: Layout Presets

**What:**
- Pre-configured grid layouts users can apply:
  1. **Single Column Stack** - All sections full width
  2. **Two-Column (Left Sidebar)** - Skills/certs left, experience right
  3. **Two-Column (Right Sidebar)** - Experience left, skills/certs right
  4. **Three-Column Header** - Contact info in 3 columns
  5. **Centered Content** - Main content centered, narrower

**Why:**
- Common patterns should be one-click
- Inspiration for users
- Faster resume creation

**User Benefit:**
- Start from proven layouts
- Learn by example
- Customize from there

---

### Feature 6: Visual Grid Guides

**What:**
- Dotted vertical lines showing 12 columns
- Appear during drag/resize
- Fade out when not interacting
- Column numbers shown at top

**Why:**
- Users need to see the grid structure
- Helps with alignment
- Professional design tool pattern

**User Benefit:**
- Understand the system quickly
- Align sections precisely
- Confidence in placement

---

### Feature 7: Section Controls

**What:**
- Hover over section → controls appear
- Controls include:
  - **Drag Handle** (⋮⋮) - Reorder section
  - **Width Button** - Open width preset menu
  - **Duplicate** - Copy section with content
  - **Lock** - Prevent accidental moves
  - **Delete** - Remove section

**Why:**
- All actions accessible in context
- No hunting through menus
- Industry-standard pattern (Notion, Figma)

**User Benefit:**
- Fast, efficient editing
- No learning curve
- Everything at fingertips

---

### Feature 8: Real-Time Preview

**What:**
- Changes reflect instantly on canvas
- No "preview" button needed
- WYSIWYG (What You See Is What You Get)

**Why:**
- Modern UX expectation
- Faster iteration
- Reduces errors

**User Benefit:**
- See results immediately
- Experiment freely
- Confidence in final output

---

### Feature 9: Auto-Save

**What:**
- Saves to Firestore every 30 seconds
- LocalStorage backup if offline
- "Saving..." indicator
- "All changes saved" confirmation
- Last saved timestamp

**Why:**
- Prevent data loss
- User peace of mind
- Industry standard

**User Benefit:**
- Never lose work
- No manual save needed
- Can close browser safely

---

### Feature 10: PDF Export

**What:**
- Export button in header
- Generates PDF with exact grid positioning
- Maintains fonts, colors, spacing
- A4 size (210mm × 297mm)
- Uses existing Puppeteer system

**Why:**
- Final deliverable for users
- Must match screen exactly
- Leverage existing infrastructure

**User Benefit:**
- Professional PDF output
- Reliable, consistent results
- Ready to send to employers

---

### Feature 11: Existing Variants Integration

**What:**
- Use ALL existing section variants from current system
- Header variants (7 options)
- Summary variants (multiple styles)
- Skills variants (pills, bars, ratings, etc.)
- Experience variants (timeline, compact, etc.)
- All other section variants

**Why:**
- Don't rebuild what works
- Consistency across app
- Faster implementation

**User Benefit:**
- Familiar variant selection
- All design options available
- No feature regression

---

### Feature 12: Mobile Responsive

**What:**
- Desktop: Full grid editor
- Tablet: Simplified grid (6 columns)
- Mobile: Stack to single column
- Touch-friendly controls
- Bottom sheet for section selection

**Why:**
- 40% of users on mobile
- Must work everywhere
- Accessibility requirement

**User Benefit:**
- Edit on any device
- No desktop required
- Seamless experience

---

## 🏗️ Technical Architecture

### New Routes

```typescript
// Add to src/App.tsx

// Grid Canvas Builder Routes
<Route path="/builder/grid-canvas/select-layout" element={<GridLayoutSelectionScreen />} />
<Route path="/builder/grid-canvas" element={<GridCanvasBuilder />} />
```

**Route Structure:**
1. `/builder/grid-canvas/select-layout` - Choose initial layout preset
2. `/builder/grid-canvas?layout=<layoutId>` - Main grid builder with layout param

**Note:** Completely separate from existing `/builder/scratch-v2` routes

---

### File Structure

```
src/v2/
├── pages/
│   ├── GridCanvasBuilder.tsx              # NEW - Main grid builder page
│   └── GridLayoutSelectionScreen.tsx      # NEW - Layout selection
│
├── components/
│   └── gridCanvas/                        # NEW - All grid canvas components
│       ├── GridCanvas.tsx                 # Main canvas with react-grid-layout
│       ├── GridSection.tsx                # Individual section wrapper
│       ├── GridGuides.tsx                 # Visual grid lines
│       ├── SectionControls.tsx            # Hover controls (drag, width, etc.)
│       ├── WidthControl.tsx               # Width preset dropdown
│       ├── GridHelperPanel.tsx            # Right sidebar with sections
│       ├── GridSectionVariantModal.tsx    # Variant selection modal
│       └── LayoutPresetSelector.tsx       # Apply layout presets
│
├── hooks/
│   ├── useGridResume.ts                   # NEW - Grid resume state management
│   ├── useGridAutoSave.ts                 # NEW - Auto-save logic
│   └── useGridHistory.ts                  # NEW - Undo/redo for grid
│
├── types/
│   └── gridBuilder.ts                     # NEW - Grid-specific types
│
├── utils/
│   └── gridCanvas/                        # NEW - Grid utilities
│       ├── gridConfigGenerator.ts         # Generate config from grid sections
│       ├── gridPDFExporter.ts            # PDF export with grid positioning
│       └── gridLayoutPresets.ts          # Preset layout definitions
│
└── config/
    └── gridLayouts.ts                     # NEW - Grid layout configurations
```

---

### Dependencies

```json
{
  "react-grid-layout": "^1.4.4",
  "@types/react-grid-layout": "^1.3.5"
}
```

**Installation:**
```bash
npm install react-grid-layout @types/react-grid-layout
```

---

### Data Models

#### GridBasedSection

```typescript
interface GridBasedSection {
  // Identity
  id: string;                    // Unique identifier
  type: V2SectionType;           // Section type (experience, skills, etc.)
  variantId: string;             // Selected variant ID
  enabled: boolean;              // Visibility toggle
  
  // Grid Positioning
  layout: {
    column: number;              // Starting column (1-12)
    span: number;                // Number of columns to span (1-12)
    row: number;                 // Row number (0-based)
    height?: number;             // Height in grid units (optional)
  };
  
  // Constraints
  constraints?: {
    minSpan?: number;            // Minimum columns (e.g., 4 for readability)
    maxSpan?: number;            // Maximum columns (e.g., 12)
    locked?: boolean;            // Lock position
    sizeFixed?: boolean;         // Lock size
  };
}
```

#### GridResumeState

```typescript
interface GridResumeState {
  resumeData: V2ResumeData;      // Resume content (existing type)
  sections: GridBasedSection[];  // Grid sections with positioning
  themeColor: string;            // Primary color
  selectedLayoutPreset?: string; // Current layout preset ID
}
```

---

### Component Hierarchy

```
GridCanvasBuilder (Main Page)
├── Header (Global navigation)
├── Subheader (Save, Export, Layout preset selector)
├── Main Content (Grid Layout)
│   ├── GridCanvas (Left/Center - A4 canvas)
│   │   ├── GridGuides (Visual grid lines)
│   │   ├── ReactGridLayout (from library)
│   │   └── GridSection[] (Each section)
│   │       ├── SectionControls (Hover controls)
│   │       ├── SectionRenderer (Existing component)
│   │       └── ResizeHandles (Visual feedback)
│   └── GridHelperPanel (Right - Sticky)
│       └── Section Cards (from registry)
└── GridSectionVariantModal (Overlay)
    ├── Variant Grid
    └── Variant Preview Components (Existing)
```

---

## 🎨 UI/UX Specifications

### Design Principles

1. **Clean & Minimal** - No clutter, focus on content
2. **Professional** - Inspired by Figma, Notion, Canva
3. **Intuitive** - No learning curve, obvious interactions
4. **Fast** - Instant feedback, smooth animations
5. **Accessible** - Keyboard shortcuts, screen reader support

---

### Color Palette

```typescript
const GRID_BUILDER_COLORS = {
  // Primary
  primary: '#2563eb',           // Blue (existing theme)
  primaryHover: '#1d4ed8',
  primaryLight: '#dbeafe',
  
  // Grid
  gridLine: '#e5e7eb',          // Light gray for grid lines
  gridLineActive: '#3b82f6',    // Blue when dragging
  gridBackground: '#ffffff',    // White canvas
  
  // Controls
  controlBg: '#ffffff',         // White background
  controlBorder: '#d1d5db',     // Gray border
  controlHover: '#f3f4f6',      // Light gray hover
  
  // Status
  success: '#10b981',           // Green (saved)
  warning: '#f59e0b',           // Orange (saving)
  error: '#ef4444',             // Red (error)
  
  // Text
  textPrimary: '#111827',       // Dark gray
  textSecondary: '#6b7280',     // Medium gray
  textMuted: '#9ca3af',         // Light gray
};
```

---

### Typography

```typescript
const GRID_BUILDER_TYPOGRAPHY = {
  // Fonts
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'Fira Code', 'Courier New', monospace",
  
  // Sizes
  textXs: '0.75rem',      // 12px - Helper text
  textSm: '0.875rem',     // 14px - Body text
  textBase: '1rem',       // 16px - Default
  textLg: '1.125rem',     // 18px - Section titles
  textXl: '1.25rem',      // 20px - Page titles
  text2xl: '1.5rem',      // 24px - Hero text
  
  // Weights
  fontNormal: 400,
  fontMedium: 500,
  fontSemibold: 600,
  fontBold: 700,
};
```

---

### Spacing System

```typescript
const GRID_BUILDER_SPACING = {
  // Grid
  gridGap: '0.5rem',            // Gap between grid cells
  canvasPadding: '3rem',        // Padding inside A4 canvas
  
  // Sections
  sectionPadding: '1rem',       // Padding inside sections
  sectionMargin: '1rem',        // Margin between sections
  
  // Controls
  controlPadding: '0.5rem',     // Padding in control buttons
  controlGap: '0.25rem',        // Gap between controls
  
  // Layout
  headerHeight: '4rem',         // Top header height
  subheaderHeight: '3.5rem',    // Subheader height
  helperPanelWidth: '20rem',    // Right panel width (320px)
};
```

---

### Animations

```typescript
const GRID_BUILDER_ANIMATIONS = {
  // Transitions
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  
  // Specific animations
  gridGuidesFade: 'opacity 200ms ease-in-out',
  sectionDrag: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
  controlsAppear: 'opacity 150ms ease-in-out, transform 150ms ease-in-out',
  widthResize: 'width 200ms ease-in-out',
};
```

---

### Layout Dimensions

```typescript
const GRID_BUILDER_DIMENSIONS = {
  // Canvas (A4 size)
  canvasWidth: '210mm',         // A4 width
  canvasHeight: '297mm',        // A4 height
  canvasWidthPx: 794,           // 210mm at 96 DPI
  canvasHeightPx: 1123,         // 297mm at 96 DPI
  
  // Grid
  gridColumns: 12,              // Number of columns
  columnWidth: '17.5mm',        // 210mm / 12
  rowHeight: 50,                // Pixels per grid row
  
  // Breakpoints
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};
```

---

### Component Styles

#### Grid Canvas

```css
.grid-canvas {
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
```

#### Grid Guides

```css
.grid-guides {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}

.grid-guides.active {
  opacity: 1;
}

.grid-guides .vertical-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #e5e7eb;
  border-left: 1px dashed #3b82f6;
}
```

#### Section Controls

```css
.section-controls {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  height: 36px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px 6px 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  z-index: 10;
}

.grid-section:hover .section-controls {
  opacity: 1;
  transform: translateY(0);
}
```

#### Width Control Dropdown

```css
.width-control-dropdown {
  min-width: 240px;
  padding: 12px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.width-preset-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.width-preset-button {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

.width-preset-button:hover {
  background: #f3f4f6;
  border-color: #2563eb;
}

.width-preset-button.active {
  background: #dbeafe;
  border-color: #2563eb;
}
```

---

## 🔄 User Flows

### Flow 1: Create New Resume

```
1. User clicks "Create with Grid Canvas" on dashboard
   ↓
2. Navigate to /builder/grid-canvas/select-layout
   ↓
3. Layout Selection Screen shows:
   - 5 preset layouts with visual previews
   - Description and use case for each
   - "Continue" button
   ↓
4. User selects layout (e.g., "Two-Column Left Sidebar")
   ↓
5. Navigate to /builder/grid-canvas?layout=two-column-left
   ↓
6. Grid Canvas Builder loads:
   - Empty A4 canvas with grid guides (faint)
   - Right panel with section cards
   - Header with Save/Export buttons
   ↓
7. User clicks "Add Summary" section
   ↓
8. Variant modal opens with summary variants
   ↓
9. User selects "Executive Summary"
   ↓
10. Section appears on canvas:
    - Full width (12 columns) by default
    - Row 0 (top)
    - Editable content
    ↓
11. User hovers over section
    ↓
12. Controls appear:
    - Drag handle, Width button, Duplicate, Lock, Delete
    ↓
13. User clicks "Width" button
    ↓
14. Dropdown shows presets:
    - Full (12 cols) ← Currently selected
    - Wide (10 cols)
    - Normal (8 cols)
    - Half (6 cols)
    - Custom slider
    ↓
15. User selects "Wide" (10 columns)
    ↓
16. Section resizes instantly to 10 columns, centered
    ↓
17. User adds more sections (Experience, Skills, Education)
    ↓
18. Each section appears with smart defaults:
    - Experience: 8 columns, row 1
    - Skills: 4 columns, row 1 (next to Experience)
    - Education: 8 columns, row 2
    ↓
19. User drags Experience section down
    ↓
20. Grid guides appear
    ↓
21. Section snaps to new row
    ↓
22. Other sections adjust automatically
    ↓
23. Auto-save kicks in (30 seconds)
    ↓
24. "Saving..." indicator shows
    ↓
25. "All changes saved" confirmation
    ↓
26. User clicks "Export PDF"
    ↓
27. PDF generates with exact grid positioning
    ↓
28. PDF downloads to user's device
    ↓
29. Success! Resume complete.
```

---

### Flow 2: Resize Section Width

```
1. User hovers over section
   ↓
2. Controls appear at top
   ↓
3. User clicks "Width" button
   ↓
4. Dropdown opens with:
   - Preset buttons (Full, Wide, Normal, Half, Third)
   - Custom slider (1-12 columns)
   - Current selection highlighted
   ↓
5. User clicks "Half" (6 columns)
   ↓
6. Section resizes instantly
   ↓
7. Grid snaps section to 6 columns
   ↓
8. Adjacent sections adjust if needed
   ↓
9. Dropdown closes
   ↓
10. Change auto-saves
```

---

### Flow 3: Drag to Reorder

```
1. User hovers over section
   ↓
2. Drag handle (⋮⋮) appears
   ↓
3. User clicks and holds drag handle
   ↓
4. Section becomes semi-transparent (opacity: 0.5)
   ↓
5. Grid guides appear (blue dashed lines)
   ↓
6. User drags section up or down
   ↓
7. Other sections shift to show drop zone
   ↓
8. Drop indicator shows where section will land
   ↓
9. User releases mouse
   ↓
10. Section snaps to new position
    ↓
11. Other sections adjust to fill space
    ↓
12. Smooth animation (200ms)
    ↓
13. Grid guides fade out
    ↓
14. Change auto-saves
```

---

### Flow 4: Apply Layout Preset

```
1. User clicks "Layout" button in subheader
   ↓
2. Dropdown shows preset layouts:
   - Single Column Stack
   - Two-Column (Left Sidebar)
   - Two-Column (Right Sidebar)
   - Three-Column Header
   - Centered Content
   ↓
3. User hovers over preset
   ↓
4. Preview thumbnail shows layout structure
   ↓
5. User clicks "Two-Column (Right Sidebar)"
   ↓
6. Confirmation dialog:
   "Apply this layout? Current positioning will be adjusted."
   [Cancel] [Apply Layout]
   ↓
7. User clicks "Apply Layout"
   ↓
8. All sections rearrange:
   - Experience, Education → Left (8 columns)
   - Skills, Certifications → Right (4 columns)
   - Summary → Full width at top
   ↓
9. Smooth animation (300ms)
   ↓
10. Success toast: "Layout applied!"
    ↓
11. User can still adjust individual sections
```

---

## ✅ Implementation Checklist

### Phase 1: Foundation (Days 1-3)

#### Day 1: Setup & Data Models
- [ ] Install react-grid-layout dependency
- [ ] Create `src/v2/types/gridBuilder.ts` with all types
- [ ] Create `src/v2/config/gridLayouts.ts` with layout presets
- [ ] Create `src/v2/hooks/useGridResume.ts` hook
- [ ] Add new routes to `src/App.tsx`

#### Day 2: Core Components
- [ ] Create `GridCanvasBuilder.tsx` main page
- [ ] Create `GridCanvas.tsx` with react-grid-layout
- [ ] Create `GridSection.tsx` wrapper component
- [ ] Create `GridGuides.tsx` visual guides
- [ ] Create `GridHelperPanel.tsx` right sidebar

#### Day 3: Section Controls
- [ ] Create `SectionControls.tsx` hover controls
- [ ] Create `WidthControl.tsx` width preset dropdown
- [ ] Implement drag handle functionality
- [ ] Add duplicate/lock/delete actions
- [ ] Test basic grid interactions

---

### Phase 2: Features (Days 4-6)

#### Day 4: Layout & Variants
- [ ] Create `GridLayoutSelectionScreen.tsx`
- [ ] Create `LayoutPresetSelector.tsx` component
- [ ] Integrate existing variant modal
- [ ] Connect to section registry
- [ ] Test variant selection flow

#### Day 5: Smart Features
- [ ] Implement smart default widths per section type
- [ ] Add layout preset application logic
- [ ] Create grid config generator
- [ ] Add collision detection (prevent overlaps)
- [ ] Implement snap-to-grid logic

#### Day 6: State Management
- [ ] Complete useGridResume hook
- [ ] Add useGridAutoSave hook
- [ ] Add useGridHistory hook (undo/redo)
- [ ] Implement LocalStorage backup
- [ ] Test state persistence

---

### Phase 3: Export & Polish (Days 7-9)

#### Day 7: PDF Export
- [ ] Create `gridPDFExporter.ts` utility
- [ ] Generate HTML with grid positioning
- [ ] Test PDF export with Puppeteer
- [ ] Verify positioning accuracy
- [ ] Handle edge cases (overflow, etc.)

#### Day 8: UI Polish
- [ ] Add smooth animations
- [ ] Implement loading states
- [ ] Add error boundaries
- [ ] Create empty states
- [ ] Add tooltips and help text

#### Day 9: Mobile Responsive
- [ ] Responsive grid (12 → 6 → 1 columns)
- [ ] Touch-friendly controls
- [ ] Bottom sheet for mobile
- [ ] Test on iOS and Android
- [ ] Optimize performance

---

### Phase 4: Testing & Launch (Days 10-12)

#### Day 10: Testing
- [ ] Unit tests for hooks
- [ ] Integration tests for key flows
- [ ] E2E tests with Playwright
- [ ] Cross-browser testing
- [ ] Performance testing

#### Day 11: Bug Fixes
- [ ] Fix any issues found in testing
- [ ] Edge case handling
- [ ] Error message improvements
- [ ] Accessibility improvements
- [ ] Code review

#### Day 12: Launch Prep
- [ ] Final QA pass
- [ ] Update documentation
- [ ] Create user guide
- [ ] Add feature announcement
- [ ] Deploy to production

---

## 🧪 Testing Requirements

### Unit Tests

```typescript
// Test: useGridResume hook
describe('useGridResume', () => {
  it('should add section with correct grid layout', () => {
    const { result } = renderHook(() => useGridResume());
    
    act(() => {
      result.current.addSection('summary', 'executive-summary');
    });
    
    expect(result.current.sections).toHaveLength(1);
    expect(result.current.sections[0].layout.span).toBe(12); // Full width default
  });
  
  it('should resize section width', () => {
    const { result } = renderHook(() => useGridResume());
    
    act(() => {
      result.current.addSection('summary', 'executive-summary');
      result.current.resizeSectionWidth(result.current.sections[0].id, 8);
    });
    
    expect(result.current.sections[0].layout.span).toBe(8);
  });
});
```

### Integration Tests

```typescript
// Test: Add section and resize flow
describe('Grid Canvas - Add and Resize Section', () => {
  it('should allow user to add section and resize width', async () => {
    render(<GridCanvasBuilder />);
    
    // Add section
    await userEvent.click(screen.getByText('Professional Summary'));
    await userEvent.click(screen.getByText('Executive Summary'));
    
    // Section appears
    expect(screen.getByTestId('section-summary')).toBeInTheDocument();
    
    // Hover to show controls
    await userEvent.hover(screen.getByTestId('section-summary'));
    
    // Click width button
    await userEvent.click(screen.getByLabelText('Width'));
    
    // Select "Wide" preset
    await userEvent.click(screen.getByText('Wide'));
    
    // Verify width changed
    const section = screen.getByTestId('section-summary');
    expect(section).toHaveStyle({ gridColumn: 'span 10' });
  });
});
```

### E2E Tests

```typescript
// Test: Complete resume creation flow
test('user can create resume with grid canvas', async ({ page }) => {
  // Navigate to grid canvas
  await page.goto('/builder/grid-canvas/select-layout');
  
  // Select layout
  await page.click('text=Two-Column (Left Sidebar)');
  await page.click('text=Continue');
  
  // Add sections
  await page.click('text=Professional Summary');
  await page.click('text=Executive Summary');
  
  await page.click('text=Experience');
  await page.click('text=Timeline');
  
  // Resize summary to wide
  await page.hover('[data-section-type="summary"]');
  await page.click('button[aria-label="Width"]');
  await page.click('text=Wide');
  
  // Drag experience to reorder
  await page.dragAndDrop(
    '[data-section-type="experience"] .drag-handle',
    '[data-drop-zone="row-0"]'
  );
  
  // Export PDF
  await page.click('text=Export PDF');
  
  // Wait for download
  const download = await page.waitForEvent('download');
  expect(download.suggestedFilename()).toContain('.pdf');
});
```

---

## 📊 Success Metrics

### User Engagement
- **Activation Rate**: >60% complete first resume
- **Time to First Resume**: <8 minutes
- **Feature Usage**: >50% use width resize, >40% use drag reorder

### Quality
- **Error Rate**: <1% of sessions
- **Auto-Save Success**: >99.5%
- **PDF Export Success**: >98%

### Performance
- **Load Time**: <3s on 3G
- **Interaction Response**: <100ms
- **Smooth Animations**: 60fps

---

## 🎯 Definition of Done

A feature is considered **DONE** when:

1. ✅ Code is written and follows project standards
2. ✅ Unit tests pass (>80% coverage)
3. ✅ Integration tests pass
4. ✅ E2E tests pass
5. ✅ Cross-browser tested (Chrome, Firefox, Safari, Edge)
6. ✅ Mobile tested (iOS Safari, Chrome Android)
7. ✅ Accessibility tested (keyboard nav, screen reader)
8. ✅ Performance tested (Lighthouse score >90)
9. ✅ Code reviewed and approved
10. ✅ Documentation updated
11. ✅ User guide created
12. ✅ Deployed to production
13. ✅ Monitoring configured
14. ✅ No critical bugs

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] All features complete and tested
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (Google Analytics)
- [ ] Performance monitoring (Lighthouse CI)
- [ ] Backup and recovery tested
- [ ] Security review completed
- [ ] Load testing (1000+ concurrent users)
- [ ] Rollback plan documented

### Launch Day
- [ ] Feature flag enabled
- [ ] Monitoring dashboards ready
- [ ] Support team trained
- [ ] User guide published
- [ ] Announcement prepared
- [ ] Social media posts ready

### Post-Launch
- [ ] Monitor error rates (target <1%)
- [ ] Track user engagement metrics
- [ ] Collect user feedback
- [ ] A/B test improvements
- [ ] Iterate based on data
- [ ] Weekly review meetings

---

## 📝 Notes for Implementation

### Key Principles

1. **Don't Break Existing** - This is a NEW page, existing scratch builder untouched
2. **Reuse What Works** - Use existing variants, section registry, PDF export
3. **Production Quality** - Clean code, proper error handling, comprehensive tests
4. **User-Centric** - Every decision based on user benefit
5. **Performance First** - Fast load, smooth interactions, no jank

### Common Pitfalls to Avoid

1. ❌ **Don't** make sections overlap (use collision detection)
2. ❌ **Don't** allow sections smaller than 4 columns (readability)
3. ❌ **Don't** forget mobile optimization (40% of users)
4. ❌ **Don't** skip auto-save (data loss is unacceptable)
5. ❌ **Don't** ignore ATS compatibility (maintain reading order)
6. ❌ **Don't** over-engineer (KISS principle)
7. ❌ **Don't** skip error handling (graceful degradation)
8. ❌ **Don't** forget accessibility (keyboard, screen reader)

### Best Practices

1. ✅ **Do** use TypeScript strictly (no `any` types)
2. ✅ **Do** write tests first (TDD approach)
3. ✅ **Do** handle loading states (skeletons, spinners)
4. ✅ **Do** provide user feedback (toasts, confirmations)
5. ✅ **Do** optimize performance (memoization, lazy loading)
6. ✅ **Do** follow existing patterns (consistency)
7. ✅ **Do** document complex logic (comments, JSDoc)
8. ✅ **Do** test edge cases (empty states, errors, limits)

---

## 🎨 Design Inspiration

**Study these for UI/UX patterns:**
- **Figma** - Grid system, section controls, drag & drop
- **Notion** - Hover controls, block manipulation
- **Canva** - Width presets, layout templates
- **Webflow** - Grid guides, responsive controls

**Key Takeaways:**
- Controls appear on hover (not always visible)
- Grid guides only during interaction (not distracting)
- Presets for common patterns (reduce decisions)
- Smooth animations (professional feel)
- Clear visual feedback (user confidence)

---

## 📞 Support & Questions

**If you encounter issues:**
1. Check this requirements doc first
2. Review existing code patterns
3. Test in isolation
4. Ask for clarification if needed

**For technical decisions:**
- Prefer simplicity over complexity
- Reuse existing code when possible
- Follow established patterns
- Document non-obvious choices

---

## ✨ Final Notes

This is a **production-ready, industry-standard feature** that will:
- Differentiate Resume Cook from competitors
- Provide flexibility while maintaining quality
- Work reliably across all devices
- Delight users with smooth, intuitive UX

**Remember:** Every line of code should serve the user. If it doesn't make their life easier, don't build it.

**Let's build something amazing! 🚀**

---

**Document Version:** 1.0  
**Last Updated:** December 22, 2024  
**Status:** Ready for Implementation  
**Estimated Timeline:** 12 days (2.5 weeks)  
**Complexity:** Medium  
**Priority:** High
