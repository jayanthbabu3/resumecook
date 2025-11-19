#!/bin/bash

cd src/components/resume/templates

for file in *.tsx; do
  template_name="${file%.tsx}"
  pdf_file="../pdf/PDF${template_name}.tsx"
  if [ ! -f "$pdf_file" ]; then
    echo "$template_name"
  fi
done
