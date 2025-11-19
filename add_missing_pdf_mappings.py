#!/usr/bin/env python3
"""
Add all missing PDF template imports and mappings to Editor.tsx
"""

from pathlib import Path
import re

# Get all UI templates
ui_dir = Path("src/components/resume/templates")
ui_templates = sorted([f.stem.replace('Template', '') for f in ui_dir.glob("*Template.tsx")])

# Read Editor.tsx
with open("src/pages/Editor.tsx") as f:
    editor_content = f.read()

# Extract existing template IDs from pdfTemplates mapping
existing_mappings = set()
for match in re.finditer(r'"([^"]+)":\s+\w+PDF', editor_content):
    existing_mappings.add(match.group(1))

# Extract existing imports
existing_imports = set()
for match in re.finditer(r'import\s+\{\s+(\w+)\s+\}\s+from\s+"@/components/resume/pdf/\w+"', editor_content):
    existing_imports.add(match.group(1))

def to_kebab_case(name):
    result = re.sub('([a-z])([A-Z])', r'\1-\2', name)
    result = re.sub('([A-Z]+)([A-Z][a-z])', r'\1-\2', result)
    return result.lower()

# Find missing templates
missing = []
for ui_template in ui_templates:
    template_id = to_kebab_case(ui_template)
    pdf_component = f"PDF{ui_template}Template"

    if template_id not in existing_mappings:
        missing.append((template_id, ui_template, pdf_component))

print(f"Found {len(missing)} missing PDF template mappings")
print()

# Find the last import statement line
last_import_match = None
for match in re.finditer(r'(import\s+\{[^}]+\}\s+from\s+"@/components/resume/pdf/[^"]+";)', editor_content):
    last_import_match = match

if not last_import_match:
    print("ERROR: Could not find existing imports")
    exit(1)

last_import_end = last_import_match.end()

# Generate new imports
new_imports = []
for template_id, ui_name, pdf_component in missing:
    import_stmt = f'import {{ {pdf_component} }} from "@/components/resume/pdf/{pdf_component}";'
    new_imports.append(import_stmt)

# Insert imports after the last existing import
new_imports_text = "\n" + "\n".join(new_imports)
editor_content = editor_content[:last_import_end] + new_imports_text + editor_content[last_import_end:]

# Find the pdfTemplates object and add missing mappings
# Look for the closing brace of pdfTemplates object
pdfTemplates_start = editor_content.find('const pdfTemplates = {')
if pdfTemplates_start == -1:
    print("ERROR: Could not find pdfTemplates object")
    exit(1)

# Find the matching closing brace
brace_count = 0
pdfTemplates_end = -1
for i in range(pdfTemplates_start, len(editor_content)):
    if editor_content[i] == '{':
        brace_count += 1
    elif editor_content[i] == '}':
        brace_count -= 1
        if brace_count == 0:
            pdfTemplates_end = i
            break

if pdfTemplates_end == -1:
    print("ERROR: Could not find end of pdfTemplates object")
    exit(1)

# Generate new mappings
new_mappings = []
for template_id, ui_name, pdf_component in missing:
    mapping_line = f'        "{template_id}": {pdf_component},'
    new_mappings.append(mapping_line)

# Insert mappings before the closing brace
new_mappings_text = "\n" + "\n".join(new_mappings) + "\n      "
editor_content = editor_content[:pdfTemplates_end] + new_mappings_text + editor_content[pdfTemplates_end:]

# Write updated Editor.tsx
with open("src/pages/Editor.tsx", 'w') as f:
    f.write(editor_content)

print(f"✅ Added {len(missing)} PDF template imports")
print(f"✅ Added {len(missing)} PDF template mappings")
print(f"✅ Updated src/pages/Editor.tsx")
print()
print("Sample of added templates:")
for template_id, ui_name, pdf_component in missing[:10]:
    print(f"  {template_id}")
