# Header Variants Implementation Plan

## Overview
Create 10 production-ready header variants for the scratch resume builder with proper font sizes, colors, photo support, and consistent spacing.

## Issues to Fix
1. **Bug**: Adding header adds default sections (Summary, Experience, Education, Skills) - FIXED
2. **Preview Mismatch**: Header variant preview doesn't match canvas rendering
3. **Missing Photo Support**: Most variants need profile photo integration
4. **Spacing**: Need consistent margin-bottom after header
5. **Theme Colors**: Show active theme colors in subheader for easy customization

---

## 10 Header Variants

### 1. **Classic Left-Aligned** (`left-aligned`)
- **Layout**: Name + Title on left, contact info below
- **Photo**: Optional, circular, left side
- **Colors**: Name in black, title in accent color
- **Font Sizes**: Name 28px bold, Title 14px medium, Contact 12px
- **Spacing**: 24px padding, 20px margin-bottom

### 2. **Centered Professional** (`centered`)
- **Layout**: Everything centered - photo, name, title, contact
- **Photo**: Optional, centered above name, 80px circle
- **Colors**: Name in black, title in accent
- **Font Sizes**: Name 30px bold, Title 15px, Contact 12px
- **Spacing**: 24px padding, 20px margin-bottom

### 3. **Banner Full-Width** (`banner`)
- **Layout**: Full-width colored background, name left with initials/photo
- **Photo**: Initials box or photo, 64px
- **Colors**: Background = accent, text = white
- **Font Sizes**: Name 26px bold white, Contact 12px light gray
- **Spacing**: 24px 32px padding, no margin (full bleed)

### 4. **Minimal Clean** (`minimal`)
- **Layout**: Just name and title, minimal contact
- **Photo**: None
- **Colors**: Name black, title gray
- **Font Sizes**: Name 32px bold, Title 14px
- **Spacing**: 20px padding, 16px margin-bottom

### 5. **Split Two-Column** (`split`)
- **Layout**: Name+title left, contact stacked right
- **Photo**: Optional, left of name
- **Colors**: Name black, title accent, contact gray
- **Font Sizes**: Name 26px, Title 13px, Contact 12px
- **Spacing**: 24px padding, 20px margin-bottom

### 6. **Photo Left** (`photo-left`)
- **Layout**: Large photo left, name+title+contact right
- **Photo**: Required, 90px circle/rounded
- **Colors**: Name black, title accent
- **Font Sizes**: Name 26px, Title 14px, Contact 12px
- **Spacing**: 24px padding, 20px margin-bottom

### 7. **Photo Right** (`photo-right`)
- **Layout**: Name+title+contact left, photo right
- **Photo**: Required, 90px circle
- **Colors**: Name black, title accent
- **Font Sizes**: Name 26px, Title 14px, Contact 12px
- **Spacing**: 24px padding, 20px margin-bottom

### 8. **Modern Accent Bar** (`accent-bar`)
- **Layout**: Thin accent bar top, name centered below
- **Photo**: Optional, small 50px
- **Colors**: Bar = accent, name black
- **Font Sizes**: Name 28px, Title 14px
- **Spacing**: 8px bar + 20px content, 20px margin-bottom

### 9. **Compact Inline** (`compact`)
- **Layout**: Name | Title | Contact all inline
- **Photo**: None (space-saving)
- **Colors**: Name black, separators gray
- **Font Sizes**: Name 22px, Title 13px, Contact 12px
- **Spacing**: 16px padding, 16px margin-bottom

### 10. **Gradient Banner** (`gradient-banner`)
- **Layout**: Full-width gradient background
- **Photo**: Optional, with border
- **Colors**: Gradient from accent to darker shade, white text
- **Font Sizes**: Name 28px bold, Title 14px, Contact 12px
- **Spacing**: 28px 32px padding, no margin (full bleed)

---

## Implementation Checklist

### Phase 1: Fix Bugs ✅
- [x] Fix default sections being added when header is added

### Phase 2: Update Header Types ✅
- [x] Add new variants to `HeaderVariant` type (config.ts, templateConfig.ts)
- [x] Update `HEADER_VARIANTS` in sectionVariants.ts with 10 variants

### Phase 3: Implement HeaderSection Variants ✅
- [x] Update HeaderSection.tsx with all 10 variants
- [x] Add proper photo rendering for each variant
- [x] Add consistent margin-bottom spacing (20px for non-banner, 0 for banner)

### Phase 4: Update Preview Components ✅
- [x] Create matching preview components for each variant
- [x] Added AccentBarHeaderPreview, CompactHeaderPreview, GradientBannerHeaderPreview

### Phase 5: Theme Color Integration
- [ ] Add theme color display in subheader (already exists in ScratchBuilderV2)
- [x] Support multiple theme colors (primary, secondary) - already supported

---

## Font Size Standards (Resume)
- **Name**: 26-32px, bold (700)
- **Title**: 13-15px, medium (500)
- **Section Heading**: 11px, semibold (600), uppercase
- **Contact**: 12px, regular (400)
- **Body**: 12px, regular (400)

## Color Standards
- **Name**: #000000 (pure black)
- **Title**: Accent color (theme)
- **Contact**: #1a1a1a or #6b7280
- **Banner Text**: #ffffff
- **Banner Contact**: #d1d5db

## Spacing Standards
- **Header Padding**: 20-32px
- **Header Margin Bottom**: 16-24px (except full-width banners)
- **Contact Gap**: 12-16px
- **Photo Size**: 50-90px depending on variant
