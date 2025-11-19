#!/usr/bin/env python3
"""
Add all missing UI template imports and mappings to LiveEditor.tsx
"""

from pathlib import Path
import re

# Get all UI templates
ui_dir = Path("src/components/resume/templates")
ui_templates = sorted([f.stem.replace('Template', '') for f in ui_dir.glob("*Template.tsx")])

# Read LiveEditor.tsx
with open("src/pages/LiveEditor.tsx") as f:
    editor_content = f.read()

# Extract existing template IDs from displayTemplates mapping
existing_mappings = set()
start = editor_content.find('const displayTemplates')
if start != -1:
    # Find the closing brace
    brace_count = 0
    end = -1
    for i in range(start, len(editor_content)):
        if editor_content[i] == '{':
            brace_count += 1
        elif editor_content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end = i
                break

    displayTemplates_section = editor_content[start:end]
    for match in re.finditer(r'"?([a-z0-9-]+)"?:\s+\w+Template', displayTemplates_section):
        template_id = match.group(1)
        if template_id not in ['string', 'any']:
            existing_mappings.add(template_id)

# Extract existing imports
existing_imports = set()
for match in re.finditer(r'import\s+\{\s+(\w+Template)\s+\}\s+from\s+"@/components/resume/templates/\w+"', editor_content):
    existing_imports.add(match.group(1))

def to_kebab_case(name):
    result = re.sub('([a-z])([A-Z])', r'\1-\2', name)
    result = re.sub('([A-Z]+)([A-Z][a-z])', r'\1-\2', result)
    return result.lower()

# Find missing templates
missing = []
for ui_template in ui_templates:
    template_id = to_kebab_case(ui_template)
    ui_component = f"{ui_template}Template"

    if template_id not in existing_mappings:
        missing.append((template_id, ui_template, ui_component))

print(f"Found {len(missing)} missing UI template mappings")
print()

# Find the last template import statement line
last_import_match = None
for match in re.finditer(r'(import\s+\{[^}]+Template\s+\}\s+from\s+"@/components/resume/templates/[^"]+";)', editor_content):
    last_import_match = match

if not last_import_match:
    print("ERROR: Could not find existing template imports")
    exit(1)

last_import_end = last_import_match.end()

# Generate new imports
new_imports = []
for template_id, ui_name, ui_component in missing:
    import_stmt = f'import {{ {ui_component} }} from "@/components/resume/templates/{ui_component}";'
    new_imports.append(import_stmt)

# Insert imports after the last existing import
new_imports_text = "\n" + "\n".join(new_imports)
editor_content = editor_content[:last_import_end] + new_imports_text + editor_content[last_import_end:]

# Find the displayTemplates object and add missing mappings
displayTemplates_start = editor_content.find('const displayTemplates')
if displayTemplates_start == -1:
    print("ERROR: Could not find displayTemplates object")
    exit(1)

# Find the matching closing brace
brace_count = 0
displayTemplates_end = -1
for i in range(displayTemplates_start, len(editor_content)):
    if editor_content[i] == '{':
        brace_count += 1
    elif editor_content[i] == '}':
        brace_count -= 1
        if brace_count == 0:
            displayTemplates_end = i
            break

if displayTemplates_end == -1:
    print("ERROR: Could not find end of displayTemplates object")
    exit(1)

# Generate new mappings
new_mappings = []
for template_id, ui_name, ui_component in missing:
    mapping_line = f'  "{template_id}": {ui_component},'
    new_mappings.append(mapping_line)

# Insert mappings before the closing brace
new_mappings_text = "\n" + "\n".join(new_mappings) + "\n"
editor_content = editor_content[:displayTemplates_end] + new_mappings_text + editor_content[displayTemplates_end:]

# Write updated LiveEditor.tsx
with open("src/pages/LiveEditor.tsx", 'w') as f:
    f.write(editor_content)

print(f"✅ Added {len(missing)} UI template imports")
print(f"✅ Added {len(missing)} UI template mappings to displayTemplates")
print(f"✅ Updated src/pages/LiveEditor.tsx")
print()
print("Sample of added templates:")
for template_id, ui_name, ui_component in missing[:10]:
    print(f"  {template_id}")
