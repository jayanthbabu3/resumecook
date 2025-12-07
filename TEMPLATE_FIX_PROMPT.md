# Template Fix Prompt Template

Use this prompt when you need to fix a template. Replace the placeholders with your specific template information.

---

## Standard Template Fix Prompt

```
I need to fix the [TEMPLATE_NAME] template located at [TEMPLATE_PATH].

Please apply all standard template fixes according to the TEMPLATE_FIX_WORKFLOW.md guide:

1. ✅ Style options compatibility - ensure template works with StyleOptions settings
2. ✅ Contact section - default font size 13px, color #1a1a1a (or white on colored backgrounds)
3. ✅ Content styling - all section content font size 13px, color #1a1a1a
4. ✅ Form editor and live editor sync - both modes should be identical
5. ✅ Section heading gaps - add consistent gaps (12px margin-bottom, 8px padding-bottom)
6. ✅ Social links - add section with proper variant and "Add Link" functionality
7. ✅ Skills - make editable while preserving template's visualization style
8. ✅ Custom sections - fix [object Object] rendering, ensure proper editing
9. ✅ Add custom section button - ensure button appears after custom sections
10. ✅ Header font sizes - follow PDF standards (27px name, 16px title)
11. ✅ Education GPA field - ensure all new education items include GPA field

Template-specific notes:
- [Add any template-specific requirements or issues here]
- [Mention any unique design elements that should be preserved]

Please fix all issues systematically and ensure the template structure is not changed, only functionality and styling are updated.
```

---

## Example Usage

```
I need to fix the GradientHeaderUniversalTemplate template located at src/components/resume/templates/GradientHeaderUniversalTemplate.tsx.

Please apply all standard template fixes according to the TEMPLATE_FIX_WORKFLOW.md guide:

1. ✅ Style options compatibility - ensure template works with StyleOptions settings
2. ✅ Contact section - default font size 13px, color #1a1a1a (or white on colored backgrounds)
3. ✅ Content styling - all section content font size 13px, color #1a1a1a
4. ✅ Form editor and live editor sync - both modes should be identical
5. ✅ Section heading gaps - add consistent gaps (12px margin-bottom, 8px padding-bottom)
6. ✅ Social links - add section with proper variant and "Add Link" functionality
7. ✅ Skills - make editable while preserving template's visualization style
8. ✅ Custom sections - fix [object Object] rendering, ensure proper editing
9. ✅ Add custom section button - ensure button appears after custom sections
10. ✅ Header font sizes - follow PDF standards (27px name, 16px title)
11. ✅ Education GPA field - ensure all new education items include GPA field

Template-specific notes:
- Header has blue gradient background, so text and icons should be white
- Skills are displayed as colored badges
- Template uses a two-column grid for Education and Skills

Please fix all issues systematically and ensure the template structure is not changed, only functionality and styling are updated.
```

---

## Quick Fix Prompt (For Single Issues)

If you only need to fix a specific issue:

```
I need to fix [SPECIFIC_ISSUE] in the [TEMPLATE_NAME] template.

Issue: [Describe the issue]
Expected behavior: [Describe what should happen]
Current behavior: [Describe what's currently happening]

Template path: [TEMPLATE_PATH]

Please fix this issue while preserving the template's structure and design.
```

---

## Batch Fix Prompt (For Multiple Templates)

```
I need to fix [NUMBER] templates with the standard fixes.

Templates to fix:
1. [TEMPLATE_NAME_1] - [TEMPLATE_PATH_1]
2. [TEMPLATE_NAME_2] - [TEMPLATE_PATH_2]
3. [TEMPLATE_NAME_3] - [TEMPLATE_PATH_3]

Please apply all standard template fixes from TEMPLATE_FIX_WORKFLOW.md to each template:
- Style options compatibility
- Contact section styling (13px, #1a1a1a)
- Content styling (13px, #1a1a1a)
- Form/live editor sync
- Section heading gaps
- Social links with add functionality
- Editable skills with preserved visualization
- Custom sections fixes
- Add section buttons
- Header font sizes (PDF standards)
- Education GPA field

Fix them one by one, ensuring each template is complete before moving to the next.
```

---

## Verification Prompt

After fixes are applied, use this to verify:

```
Please verify that the [TEMPLATE_NAME] template has been fixed correctly:

1. Check all items from the TEMPLATE_FIX_WORKFLOW.md checklist
2. Test that style options apply correctly
3. Verify form editor and live editor are in sync
4. Ensure all fields are editable
5. Check that custom sections work properly
6. Verify education items include GPA field
7. Test adding/removing items doesn't break anything

If any issues are found, please fix them.
```

