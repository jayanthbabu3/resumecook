#!/usr/bin/env python3
"""
Fix PDF export names to include 'Template' suffix
"""
from pathlib import Path
import re

def fix_pdf_exports():
    pdf_dir = Path("src/components/resume/pdf")
    
    fixed = 0
    errors = []
    
    for pdf_file in sorted(pdf_dir.glob("PDF*.tsx")):
        try:
            with open(pdf_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract the component name from filename
            # PDFCrystalExecutiveTemplate.tsx -> CrystalExecutiveTemplate
            filename = pdf_file.stem  # PDFCrystalExecutiveTemplate
            expected_name = filename[3:]  # CrystalExecutiveTemplate
            
            # Find current export name
            export_match = re.search(r'export const (PDF\w+)\s*=', content)
            if not export_match:
                continue
            
            current_name = export_match.group(1)
            
            # Check if it needs Template suffix
            if not current_name.endswith('Template') and expected_name.endswith('Template'):
                correct_name = f"PDF{expected_name}"
                
                # Replace interface name
                content = re.sub(
                    rf'interface {current_name}Props',
                    f'interface {correct_name}Props',
                    content
                )
                
                # Replace export name
                content = re.sub(
                    rf'export const {current_name}\s*=',
                    f'export const {correct_name} =',
                    content
                )
                
                # Replace in Props type
                content = re.sub(
                    rf'{current_name}Props\)',
                    f'{correct_name}Props)',
                    content
                )
                
                # Write back
                with open(pdf_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                fixed += 1
                print(f"✓ Fixed {pdf_file.name}: {current_name} -> {correct_name}")
        
        except Exception as e:
            errors.append(f"{pdf_file.name}: {str(e)}")
    
    print()
    print("=" * 80)
    print(f"✅ Fixed {fixed} PDF export names")
    if errors:
        print(f"❌ Errors: {len(errors)}")
        for error in errors[:5]:
            print(f"  - {error}")
    print("=" * 80)


if __name__ == "__main__":
    fix_pdf_exports()
