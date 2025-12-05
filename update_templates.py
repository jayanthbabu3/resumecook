import os
import re
import glob

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if "InlineExperienceSection" in content:
        # Already updated or not a target
        return

    # Check for standard section comments
    if "{/* Experience Section */}" not in content:
        # Skip if structure is not standard
        print(f"Skipping {filepath} - non-standard structure")
        return

    print(f"Updating {filepath}...")

    # 1. Prepare for Imports update (we do this last to check usage)
    
    # 2. Determine accent color variable
    color_var = "themeColor"
    if "const accent =" in content:
        color_var = "accent"
    elif "const primaryColor =" in content:
        color_var = "primaryColor"

    # Helper to find and replace block by comment
    def replace_block(text, comment, replacement):
        # Find comment start
        comment_pattern = re.escape(comment)
        match = re.search(comment_pattern, text)
        if not match:
            return text
        
        # Find the start of the JSX block following the comment
        # We look for the first '{' after the comment
        start_search_idx = match.end()
        block_start_idx = -1
        
        for i in range(start_search_idx, len(text)):
            if text[i] == '{':
                block_start_idx = i
                break
            if text[i] not in [' ', '\n', '\r', '\t']:
                # Found non-whitespace before '{', implies structure mismatch?
                # But comments are whitespace in JSX logic mostly?
                # Actually, {/* ... */} is a block itself.
                # The next block usually starts with `{`.
                pass
        
        if block_start_idx == -1:
            return text

        # Find matching closing brace
        cnt = 0
        block_end_idx = -1
        for i in range(block_start_idx, len(text)):
            if text[i] == '{':
                cnt += 1
            elif text[i] == '}':
                cnt -= 1
            
            if cnt == 0:
                block_end_idx = i + 1
                break
        
        if block_end_idx != -1:
            # Replace from comment start to block end
            return text[:match.start()] + replacement + text[block_end_idx:]
        return text

    # Replacement Templates
    experience_replacement = f"""
      {{/* Experience Section */}}
      <InlineExperienceSection
        items={{resumeData.experience}}
        editable={{editable}}
        accentColor={{{color_var}}}
        title="Professional Experience"
        className="mb-8"
        titleStyle={{{{
          fontSize: "16px",
          fontWeight: 700,
          marginBottom: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: {color_var}
        }}}}
      />"""

    education_replacement = f"""
      {{/* Education Section */}}
      <InlineEducationSection
        items={{resumeData.education}}
        editable={{editable}}
        accentColor={{{color_var}}}
        title="Education"
        className="mb-8"
        titleStyle={{{{
          fontSize: "16px",
          fontWeight: 700,
          marginBottom: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: {color_var}
        }}}}
      />"""

    custom_replacement = f"""
      {{/* Custom Sections */}}
      <InlineCustomSections
        sections={{resumeData.sections}}
        editable={{editable}}
        accentColor={{{color_var}}}
        path="sections"
        containerClassName="mb-8"
        itemStyle={{{{
          fontSize: SINGLE_COLUMN_CONFIG.text.size,
          lineHeight: SINGLE_COLUMN_CONFIG.spacing.lineHeight,
          color: SINGLE_COLUMN_CONFIG.colors.text.primary,
        }}}}
        renderHeader={{(title) => (
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{{{ color: {color_var} }}}}>
            {{title}}
          </h2>
        )}}
      />"""

    # Apply replacements
    # We do it sequentially.
    new_content = content
    # Custom Sections
    new_content = replace_block(new_content, r"\{\/\*\s*(Custom Sections?|Projects)( Section)?\s*\*\/\}\s*\{", custom_replacement)
    
    # Experience
    new_content = replace_block(new_content, r"\{\/\*\s*(Experience|Professional Experience|Work Experience)( Section)?\s*\*\/\}\s*\{", experience_replacement)
    
    # Education
    new_content = replace_block(new_content, r"\{\/\*\s*Education( Section)?\s*\*\/\}\s*\{", education_replacement)

    # 3. Fix Imports
    # Add new imports
    imports_to_add = [
        'import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";',
        'import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";',
        'import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";',
        'import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";'
    ]
    
    # Ensure ResumeData comes from types
    new_content = re.sub(r'import \{ ResumeData \} from "@/pages/Editor";', 'import type { ResumeData } from "@/types/resume";', new_content)
    new_content = re.sub(r'import type \{ ResumeData \} from "@/pages/Editor";', 'import type { ResumeData } from "@/types/resume";', new_content)

    # Check if imports already exist, if not add them
    existing_imports_chunk = new_content.split("const ")[0] if "const " in new_content else new_content[:500]
    
    imports_blob = ""
    for imp in imports_to_add:
        if imp.split(" from ")[1].strip('";') not in existing_imports_chunk:
             imports_blob += imp + "\n"
    
    if imports_blob:
        # Insert after last import
        last_imp = list(re.finditer(r'^import .*?;', new_content, re.MULTILINE))
        if last_imp:
            end_idx = last_imp[-1].end()
            new_content = new_content[:end_idx] + "\n" + imports_blob + new_content[end_idx:]
    
    # Remove unused imports if not used anymore
    if "InlineEditableList" not in new_content.replace('import { InlineEditableList }', ''):
        new_content = re.sub(r'import \{[^}]*InlineEditableList[^}]*\} from "@/components/resume/InlineEditableList";\n?', '', new_content)
    
    if "InlineEditableDate" not in new_content.replace('import { InlineEditableDate }', ''):
        new_content = re.sub(r'import \{[^}]*InlineEditableDate[^}]*\} from "@/components/resume/InlineEditableDate";\n?', '', new_content)
        
    if "InlineEditableDynamicSection" not in new_content.replace('import { InlineEditableDynamicSection }', ''):
        new_content = re.sub(r'import \{[^}]*InlineEditableDynamicSection[^}]*\} from "@/components/resume/InlineEditableDynamicSection";\n?', '', new_content)

    with open(filepath, 'w') as f:
        f.write(new_content)

# Define target directories and patterns
# We focus on Fresher/Graduate templates
patterns = [
    "src/components/resume/templates/*Fresher*.tsx",
    "src/components/resume/templates/*Graduate*.tsx",
    "src/components/resume/templates/*Entry*.tsx",
    "src/components/resume/templates/*Student*.tsx",
    "src/components/resume/templates/*Scholar*.tsx"
]

for pattern in patterns:
    for filepath in glob.glob(pattern):
        try:
            update_file(filepath)
        except Exception as e:
            print(f"Error updating {filepath}: {e}")


