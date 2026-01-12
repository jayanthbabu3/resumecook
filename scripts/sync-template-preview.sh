#!/bin/bash

# Template Preview Sync Script
# This script automatically syncs missing templates from ResumePreview.tsx to TemplatePreview.tsx

set -e

PROJECT_ROOT="/Users/jayanth/Desktop/jayanth-projects/resumewithjayanth"
RESUME_PREVIEW="$PROJECT_ROOT/src/components/resume/ResumePreview.tsx"
TEMPLATE_PREVIEW="$PROJECT_ROOT/src/components/TemplatePreview.tsx"
TEMPLATE_DIR="$PROJECT_ROOT/src/components/resume/templates"

echo "🔍 Analyzing template imports..."

# Extract template imports from both files
grep -E "^import.*Template.*from.*templates/" "$RESUME_PREVIEW" | \
  sed 's/import { \(.*\) } from .*/\1/' | sort | uniq > /tmp/resume_templates.txt

grep -E "^import.*Template.*from.*templates/" "$TEMPLATE_PREVIEW" | \
  sed 's/import { \(.*\) } from .*/\1/' | sort | uniq > /tmp/template_preview_templates.txt

# Find missing templates
MISSING=$(comm -23 /tmp/resume_templates.txt /tmp/template_preview_templates.txt)
MISSING_COUNT=$(echo "$MISSING" | wc -l | tr -d ' ')

if [ "$MISSING_COUNT" -eq 0 ] || [ -z "$MISSING" ]; then
  echo "✅ All templates are already in sync!"
  exit 0
fi

echo "📊 Found $MISSING_COUNT missing templates in TemplatePreview.tsx"
echo ""
echo "Missing templates:"
echo "$MISSING" | head -20
if [ "$MISSING_COUNT" -gt 20 ]; then
  echo "... and $(($MISSING_COUNT - 20)) more"
fi
echo ""

# Ask for confirmation
read -p "Do you want to add these templates to TemplatePreview.tsx? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Sync cancelled"
  exit 1
fi

echo "📝 Generating import statements..."

# Generate import statements
IMPORT_STATEMENTS=""
while IFS= read -r template; do
  IMPORT_STATEMENTS="$IMPORT_STATEMENTS\nimport { $template } from \"./resume/templates/$template\";"
done <<< "$MISSING"

echo "📝 Generating template mappings..."

# Generate mappings (convert PascalCase to kebab-case)
MAPPING_STATEMENTS=""
while IFS= read -r template; do
  # Convert PascalCase to kebab-case
  KEBAB_ID=$(echo "$template" | sed 's/Template$//' | sed 's/\([A-Z]\)/-\L\1/g' | sed 's/^-//')
  MAPPING_STATEMENTS="$MAPPING_STATEMENTS\n  \"$KEBAB_ID\": $template,"
done <<< "$MISSING"

# Create backup
echo "💾 Creating backup..."
cp "$TEMPLATE_PREVIEW" "$TEMPLATE_PREVIEW.backup.$(date +%Y%m%d_%H%M%S)"

echo "✏️  Adding imports to TemplatePreview.tsx..."
# Find the line number after the last import
LAST_IMPORT_LINE=$(grep -n "^import.*Template" "$TEMPLATE_PREVIEW" | tail -1 | cut -d: -f1)

# Insert imports after the last import
{
  head -n "$LAST_IMPORT_LINE" "$TEMPLATE_PREVIEW"
  echo -e "// Auto-synced templates from ResumePreview.tsx"
  echo -e "$IMPORT_STATEMENTS"
  tail -n +$((LAST_IMPORT_LINE + 1)) "$TEMPLATE_PREVIEW"
} > "$TEMPLATE_PREVIEW.tmp"

mv "$TEMPLATE_PREVIEW.tmp" "$TEMPLATE_PREVIEW"

echo "✏️  Adding mappings to templates object..."
# Find the line number of the closing brace of templates object
TEMPLATES_END_LINE=$(grep -n "^};" "$TEMPLATE_PREVIEW" | head -1 | cut -d: -f1)

# Insert mappings before the closing brace
{
  head -n $((TEMPLATES_END_LINE - 1)) "$TEMPLATE_PREVIEW"
  echo -e "  // Auto-synced template mappings from ResumePreview.tsx"
  echo -e "$MAPPING_STATEMENTS"
  tail -n +$TEMPLATES_END_LINE "$TEMPLATE_PREVIEW"
} > "$TEMPLATE_PREVIEW.tmp"

mv "$TEMPLATE_PREVIEW.tmp" "$TEMPLATE_PREVIEW"

echo ""
echo "✅ Successfully synced $MISSING_COUNT templates!"
echo "📁 Backup saved: $TEMPLATE_PREVIEW.backup.*"
echo ""
echo "Next steps:"
echo "1. Run: npm run type-check"
echo "2. Test the templates in the dashboard"
echo "3. Commit the changes if everything works"
echo ""
echo "If something went wrong, restore from backup:"
echo "  cp $TEMPLATE_PREVIEW.backup.* $TEMPLATE_PREVIEW"
