# Template Removal Workflow

> **Purpose**: Safely remove templates and all their references from the codebase.
> **Supports**: Single template or bulk removal (10, 20+ templates at once)

---

## Quick Reference - Files to Update

| # | File | What to Remove |
|---|------|----------------|
| 1 | `src/components/resume/templates/[Name]Template.tsx` | Delete UI template file |
| 2 | `src/components/resume/pdf/PDF[Name]Template.tsx` | Delete PDF template file |
| 3 | `src/components/TemplatePreview.tsx` | Import + mapping |
| 4 | `src/components/resume/ResumePreview.tsx` | Import + mapping |
| 5 | `src/pages/Editor.tsx` | PDF import (if exists) |
| 6 | `src/pages/LiveEditor.tsx` | UI import + mapping |
| 7 | `src/constants/templateMeta.ts` | Metadata entry |
| 8 | `src/constants/professionCategories.ts` | Template ID from arrays (use `replace_all`) |

---

## Bulk Removal Process (AI Instructions)

### Step 1: Identify All Templates to Remove

For each template, note:
- **Template ID**: kebab-case (e.g., `linear-progress-universal`)
- **Component Name**: PascalCase (e.g., `LinearProgressUniversalTemplate`)
- **PDF Name**: `PDFLinearProgressUniversalTemplate`

### Step 2: Find All References

```bash
# Run this for EACH template to find all references
grep -rn "template-id" src/ --include="*.tsx" --include="*.ts" | head -30
```

### Step 3: Delete Template Files (Batch)

```bash
# Delete all UI templates at once
rm -f src/components/resume/templates/Template1.tsx \
      src/components/resume/templates/Template2.tsx \
      src/components/resume/templates/Template3.tsx

# Delete all PDF templates at once
rm -f src/components/resume/pdf/PDFTemplate1.tsx \
      src/components/resume/pdf/PDFTemplate2.tsx \
      src/components/resume/pdf/PDFTemplate3.tsx
```

### Step 4: Remove from TemplatePreview.tsx

**File**: `src/components/TemplatePreview.tsx`

Remove imports (batch):
```tsx
import { Template1 } from "./resume/templates/Template1";
import { Template2 } from "./resume/templates/Template2";
// ... remove all at once
```

Remove mappings (batch):
```tsx
  "template-1": Template1,
  "template-2": Template2,
  // ... remove all at once
```

### Step 5: Remove from ResumePreview.tsx

**File**: `src/components/resume/ResumePreview.tsx`

Same pattern - remove imports and mappings in batch.

### Step 6: Remove from Editor.tsx

**File**: `src/pages/Editor.tsx`

Remove PDF imports only (UI templates not imported here):
```tsx
import { PDFTemplate1 } from "@/components/resume/pdf/PDFTemplate1";
// ... remove all PDF imports
```

### Step 7: Remove from LiveEditor.tsx

**File**: `src/pages/LiveEditor.tsx`

Remove UI template imports:
```tsx
import { Template1 } from "@/components/resume/templates/Template1";
```

Remove from `templates` mapping:
```tsx
  "template-1": Template1,
```

### Step 8: Remove from templateMeta.ts

**File**: `src/constants/templateMeta.ts`

Remove entire metadata blocks:
```tsx
  "template-1": {
    name: "Template 1",
    description: "...",
    category: "...",
    categorySlug: "...",
  },
```

### Step 9: Remove from professionCategories.ts

**File**: `src/constants/professionCategories.ts`

⚠️ **IMPORTANT**: Template IDs appear in MULTIPLE arrays. Use `replace_all: true` when editing:

```tsx
// Use replace_all to remove from ALL occurrences
"template-id",  // Remove this line everywhere it appears
```

---

## AI Removal Checklist

When I (AI) remove templates, I will:

1. ✅ **Find references first** using `grep -rn "template-id" src/`
2. ✅ **Delete files** using `rm -f` command for UI + PDF templates
3. ✅ **Remove from TemplatePreview.tsx** - imports + mappings
4. ✅ **Remove from ResumePreview.tsx** - imports + mappings
5. ✅ **Remove from Editor.tsx** - PDF imports only
6. ✅ **Remove from LiveEditor.tsx** - UI imports + mappings
7. ✅ **Remove from templateMeta.ts** - metadata entries
8. ✅ **Remove from professionCategories.ts** - use `replace_all: true`
9. ✅ **Verify removal** using grep to confirm no references remain

---

## Verification Commands

```bash
# Check for remaining references (should return empty)
grep -rn "template-id-1\|template-id-2\|template-id-3" src/ --include="*.tsx" --include="*.ts"

# Check for component names (should return empty)
grep -rn "ComponentName1\|ComponentName2\|ComponentName3" src/ --include="*.tsx" --include="*.ts"

# Build to verify no broken imports
npm run build
```

---

## Template Naming Patterns

| Template ID | UI Component | PDF Component |
|-------------|--------------|---------------|
| `linear-progress-universal` | `LinearProgressUniversalTemplate` | `PDFLinearProgressUniversalTemplate` |
| `card-layout-universal` | `CardLayoutUniversalTemplate` | `PDFCardLayoutUniversalTemplate` |
| `premium-elite` | `PremiumEliteTemplate` | `PremiumElitePDF` |

**Conversion Rules:**
- Template ID: `kebab-case` → Component: `PascalCase` + `Template`
- PDF: Either `PDF[Name]Template` or `[Name]PDF` (check which exists)

---

## Rollback

If you need to restore deleted templates:

```bash
# Restore from git
git checkout HEAD -- src/components/resume/templates/[Name]Template.tsx
git checkout HEAD -- src/components/resume/pdf/PDF[Name]Template.tsx
```

Then re-add to all registration files manually.

---

## Notes

- **Fallback**: Missing templates render as `ProfessionalTemplate`
- **Build check**: Always run `npm run build` after removal
- **Bulk edits**: When removing 5+ templates, batch the file deletions and use multi_edit for code changes
- **professionCategories.ts**: Always use `replace_all: true` since template IDs appear multiple times
