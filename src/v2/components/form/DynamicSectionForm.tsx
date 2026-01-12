/**
 * Dynamic Section Form Component
 * 
 * Renders a complete form section based on the section registry definition.
 * Handles both single-item sections (summary) and multi-item sections (experience).
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Plus, 
  Trash2, 
  ChevronDown,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Trophy,
  Target,
  Award,
  FolderKanban,
  FileText,
  Users,
  Mic,
  Lightbulb,
  BookOpen,
  Heart,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DynamicFormField } from './DynamicFormField';
import type { SectionDefinition, FormFieldDefinition } from '../../registry/sectionRegistry';
import type { V2SectionType } from '../../types/resumeData';

// ============================================================================
// ICON MAP
// ============================================================================

const SECTION_ICONS: Record<string, React.ElementType> = {
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  languages: Languages,
  achievements: Trophy,
  strengths: Target,
  certifications: Award,
  projects: FolderKanban,
  awards: Award,
  publications: FileText,
  volunteer: Heart,
  speaking: Mic,
  patents: Lightbulb,
  interests: Star,
  references: Users,
  courses: BookOpen,
  custom: FileText,
  header: FileText,
  summary: FileText,
};

// ============================================================================
// TYPES
// ============================================================================

interface DynamicSectionFormProps {
  /** Section definition from registry */
  sectionDef: SectionDefinition;
  /** Section type */
  sectionType: V2SectionType;
  /** Current data for this section */
  data: any;
  /** Callback when data changes */
  onChange: (data: any) => void;
  /** Custom title override */
  title?: string;
  /** Whether section is disabled */
  disabled?: boolean;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Template config for conditional field visibility */
  templateConfig?: any;
  /** Current variant being used */
  currentVariant?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const DynamicSectionForm: React.FC<DynamicSectionFormProps> = ({
  sectionDef,
  sectionType,
  data,
  onChange,
  title,
  disabled = false,
  defaultExpanded = false,
  templateConfig,
  currentVariant,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(
    defaultExpanded ? ['section'] : []
  );

  // Helper to get nested config value (e.g., 'skills.showRatings')
  const getConfigValue = (path: string): boolean => {
    if (!templateConfig || !path) return true;
    const parts = path.split('.');
    let value: any = templateConfig;
    for (const part of parts) {
      if (value === undefined || value === null) return true;
      value = value[part];
    }
    return value !== false; // Default to true if not explicitly false
  };

  // Filter fields based on template config and variant
  const getVisibleFields = (): FormFieldDefinition[] => {
    return sectionDef.formFields.filter(field => {
      // Check showWhenConfig
      if (field.showWhenConfig && !getConfigValue(field.showWhenConfig)) {
        return false;
      }
      // Check showForVariants
      if (field.showForVariants && field.showForVariants.length > 0) {
        const variant = currentVariant || sectionDef.defaultVariant;
        if (variant && !field.showForVariants.includes(variant)) {
          return false;
        }
      }
      return true;
    });
  };

  const Icon = SECTION_ICONS[sectionType] || FileText;
  const displayTitle = title || sectionDef.defaultTitle;
  const isMultiItem = sectionDef.isList;
  const fields = sectionDef.formFields;

  // Get item count for multi-item sections
  const itemCount = Array.isArray(data) ? data.length : 0;
  const itemLabel = itemCount === 1 
    ? `1 ${sectionDef.itemName || 'item'}` 
    : `${itemCount} ${sectionDef.itemNamePlural || (sectionDef.itemName ? sectionDef.itemName + 's' : 'items')}`;

  // Handle adding new item
  const handleAddItem = () => {
    if (!isMultiItem) return;
    
    const newItem: Record<string, any> = {
      id: `${sectionType}-${Date.now()}`,
    };
    
    // Initialize with default values from field definitions
    fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        newItem[field.key] = field.defaultValue;
      } else if (field.type === 'array') {
        newItem[field.key] = [];
      } else if (field.type === 'checkbox') {
        newItem[field.key] = false;
      } else {
        newItem[field.key] = '';
      }
    });
    
    onChange([...(data || []), newItem]);
  };

  // Handle removing item
  const handleRemoveItem = (itemId: string) => {
    if (!isMultiItem) return;
    onChange((data || []).filter((item: any) => item.id !== itemId));
  };

  // Handle updating single item field
  const handleUpdateItem = (itemId: string, fieldKey: string, value: any) => {
    if (isMultiItem) {
      onChange(
        (data || []).map((item: any) =>
          item.id === itemId ? { ...item, [fieldKey]: value } : item
        )
      );
    } else {
      // For single-item sections, data is the item itself
      onChange({ ...data, [fieldKey]: value });
    }
  };

  // Render form fields for an item
  const renderFields = (item: any, itemId?: string) => {
    // Get visible fields based on config and variant
    const visibleFields = getVisibleFields();
    
    // Group fields by their group property
    const groupedFields: Record<string, FormFieldDefinition[]> = {};
    const ungroupedFields: FormFieldDefinition[] = [];

    visibleFields.forEach(field => {
      if (field.group) {
        if (!groupedFields[field.group]) {
          groupedFields[field.group] = [];
        }
        groupedFields[field.group].push(field);
      } else {
        ungroupedFields.push(field);
      }
    });

    // Check if all fields are compact
    const allCompact = visibleFields.every(f => f.compact);

    return (
      <div className={allCompact ? "space-y-2" : "space-y-3"}>
        {/* Render grouped fields in grid */}
        {Object.entries(groupedFields).map(([group, groupFields]) => (
          <div key={group} className="grid grid-cols-2 gap-2">
            {groupFields.map(field => (
              <DynamicFormField
                key={field.key}
                field={field}
                value={item?.[field.key]}
                onChange={(value) => handleUpdateItem(itemId || 'single', field.key, value)}
                disabled={disabled}
                className={field.fullWidth ? 'col-span-2' : ''}
                compact={field.compact}
              />
            ))}
          </div>
        ))}

        {/* Render ungrouped fields - use grid for compact fields */}
        {ungroupedFields.length > 0 && (
          <div className={allCompact ? "grid grid-cols-2 gap-2" : "space-y-3"}>
            {ungroupedFields.map(field => (
              <DynamicFormField
                key={field.key}
                field={field}
                value={item?.[field.key]}
                onChange={(value) => handleUpdateItem(itemId || 'single', field.key, value)}
                disabled={disabled}
                className={field.fullWidth ? 'col-span-2' : ''}
                compact={field.compact}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render multi-item section
  const renderMultiItemSection = () => {
    const items = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Icon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No {sectionDef.itemNamePlural || 'items'} yet</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddItem}
              disabled={disabled}
              className="mt-3 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add {sectionDef.itemName || 'Item'}
            </Button>
          </div>
        ) : (
          <>
            <Accordion
              type="multiple"
              value={expandedItems}
              onValueChange={setExpandedItems}
              className="space-y-2"
            >
              {items.map((item: any, index: number) => {
                // Get display title for item
                const itemTitle = getItemDisplayTitle(item, sectionType, index);
                
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border rounded-lg bg-muted/20 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                      <div className="flex items-center gap-3 text-left">
                        <span className="text-sm font-medium">{itemTitle}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        {renderFields(item, item.id)}
                        
                        <div className="flex justify-end pt-2 border-t">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={disabled}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddItem}
              disabled={disabled}
              className="w-full gap-2 border-dashed"
            >
              <Plus className="w-4 h-4" />
              Add {sectionDef.itemName || 'Item'}
            </Button>
          </>
        )}
      </div>
    );
  };

  // Render single-item section
  const renderSingleItemSection = () => {
    return renderFields(data || {});
  };

  return (
    <AccordionItem
      value={sectionType}
      className="group overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm transition-all data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
    >
      <AccordionTrigger className="group flex w-full items-center gap-4 rounded-none px-4 py-4 text-left text-sm font-semibold tracking-tight transition-all hover:bg-muted/40 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary sm:px-5">
        <span className="flex items-center gap-3 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
            <Icon className="h-4 w-4" />
          </span>
          {displayTitle}
        </span>
        <span className="ml-auto flex items-center">
          <span className="hidden sm:inline-flex items-center rounded-full border border-border/40 bg-muted/15 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize leading-tight shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all group-hover:translate-x-0.5 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-primary/90 mr-2">
            {isMultiItem ? itemLabel : 'Edit'}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-6 pt-2 sm:px-5">
        {isMultiItem ? renderMultiItemSection() : renderSingleItemSection()}
      </AccordionContent>
    </AccordionItem>
  );
};

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Get display title for an item in a multi-item section
 */
function getItemDisplayTitle(item: any, sectionType: V2SectionType, index: number): string {
  switch (sectionType) {
    case 'experience':
      return item.position || item.company || `Experience ${index + 1}`;
    case 'education':
      return item.degree || item.school || `Education ${index + 1}`;
    case 'skills':
      return item.name || `Skill ${index + 1}`;
    case 'languages':
      return item.language || `Language ${index + 1}`;
    case 'achievements':
      return item.title || `Achievement ${index + 1}`;
    case 'strengths':
      return item.title || `Strength ${index + 1}`;
    case 'certifications':
      return item.name || `Certification ${index + 1}`;
    case 'projects':
      return item.name || `Project ${index + 1}`;
    case 'awards':
      return item.title || `Award ${index + 1}`;
    case 'publications':
      return item.title || `Publication ${index + 1}`;
    case 'volunteer':
      return item.organization || item.role || `Volunteer ${index + 1}`;
    case 'speaking':
      return item.title || item.event || `Speaking ${index + 1}`;
    case 'patents':
      return item.title || `Patent ${index + 1}`;
    case 'interests':
      return item.name || `Interest ${index + 1}`;
    case 'references':
      return item.name || `Reference ${index + 1}`;
    case 'courses':
      return item.name || `Course ${index + 1}`;
    default:
      return `Item ${index + 1}`;
  }
}

export default DynamicSectionForm;
