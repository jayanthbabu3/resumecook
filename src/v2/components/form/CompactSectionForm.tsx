/**
 * Compact Section Form Component
 * 
 * A streamlined, elegant form component that renders sections based on template config.
 * Features:
 * - Inline editing for simple items (skills, languages, strengths)
 * - Compact card layout for complex items (experience, education)
 * - Dynamic field visibility based on template config
 * - Rich UX with smooth animations and visual feedback
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Plus, 
  Trash2, 
  ChevronDown,
  ChevronRight,
  Pencil,
  Check,
  X,
  GripVertical,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Trophy,
  Target,
  Award,
  FolderKanban,
  FileText,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MonthYearPicker } from '@/components/ui/month-year-picker';
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
  summary: FileText,
  interests: Star,
};

const COMPACT_FIELD_INPUT_CLASS = "!text-xs !md:text-xs leading-relaxed placeholder:text-gray-400";

// ============================================================================
// TYPES
// ============================================================================

interface CompactSectionFormProps {
  sectionDef: SectionDefinition;
  sectionType: V2SectionType;
  data: any;
  onChange: (data: any) => void;
  title?: string;
  disabled?: boolean;
  templateConfig?: any;
  currentVariant?: string;
  accentColor?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const CompactSectionForm: React.FC<CompactSectionFormProps> = ({
  sectionDef,
  sectionType,
  data,
  onChange,
  title,
  disabled = false,
  templateConfig,
  currentVariant,
  accentColor = '#2563eb', // Default application blue
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const Icon = SECTION_ICONS[sectionType] || FileText;
  const displayTitle = title || sectionDef.defaultTitle;
  const isMultiItem = sectionDef.isList;
  const items = Array.isArray(data) ? data : [];

  // Determine if this is a "simple" section (inline editable)
  const isSimpleSection = ['skills', 'languages', 'strengths', 'achievements', 'interests'].includes(sectionType);

  // Get visible fields based on config
  const getVisibleFields = (): FormFieldDefinition[] => {
    return sectionDef.formFields.filter(field => {
      if (field.showWhenConfig) {
        const parts = field.showWhenConfig.split('.');
        let value: any = templateConfig;
        for (const part of parts) {
          if (value === undefined || value === null) return true;
          value = value[part];
        }
        if (value === false) return false;
      }
      if (field.showForVariants && field.showForVariants.length > 0) {
        const variant = currentVariant || sectionDef.defaultVariant;
        if (variant && !field.showForVariants.includes(variant)) return false;
      }
      return true;
    });
  };

  const visibleFields = getVisibleFields();

  // Handlers
  const handleAddItem = () => {
    const newItem: Record<string, any> = {
      id: `${sectionType}-${Date.now()}`,
    };
    visibleFields.forEach(field => {
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
    onChange([...items, newItem]);
    setEditingId(newItem.id);
  };

  const handleRemoveItem = (itemId: string) => {
    onChange(items.filter((item: any) => item.id !== itemId));
    if (editingId === itemId) setEditingId(null);
  };

  const handleUpdateItem = (itemId: string, fieldKey: string, value: any) => {
    onChange(
      items.map((item: any) =>
        item.id === itemId ? { ...item, [fieldKey]: value } : item
      )
    );
  };

  // Get primary display value for an item
  const getPrimaryValue = (item: any): string => {
    const primaryField = visibleFields.find(f => f.required) || visibleFields[0];
    return item[primaryField?.key] || 'Untitled';
  };

  // Get secondary display value
  const getSecondaryValue = (item: any): string | null => {
    if (sectionType === 'experience') return item.company;
    if (sectionType === 'education') return item.school;
    if (sectionType === 'skills') return item.level ? `Level ${item.level}` : null;
    if (sectionType === 'languages') return item.proficiency;
    return null;
  };

  // ============================================================================
  // RENDER SIMPLE INLINE SECTION (Skills, Languages, etc.)
  // ============================================================================
  
  const renderSimpleSection = () => {
    return (
      <div className="space-y-2">
        {/* Inline items */}
        <div className="flex flex-wrap items-start gap-2">
          {items.map((item: any) => (
            <InlineEditableItem
              key={item.id}
              item={item}
              fields={visibleFields}
              isEditing={editingId === item.id}
              onEdit={() => setEditingId(item.id)}
              onSave={() => setEditingId(null)}
              onCancel={() => setEditingId(null)}
              onUpdate={(field, value) => handleUpdateItem(item.id, field, value)}
              onRemove={() => handleRemoveItem(item.id)}
              accentColor={accentColor}
              sectionType={sectionType}
            />
          ))}
          
          {/* Add button */}
          <button
            onClick={handleAddItem}
            disabled={disabled}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full border-2 border-dashed transition-all self-start hover:bg-transparent"
            style={{ color: accentColor, borderColor: `${accentColor}66` }}
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER COMPLEX SECTION (Experience, Education)
  // ============================================================================

  const renderComplexSection = () => {
    return (
      <div className="space-y-2">
        {items.map((item: any, index: number) => (
          <ComplexItemCard
            key={item.id}
            item={item}
            index={index}
            fields={visibleFields}
            isExpanded={editingId === item.id}
            onToggle={() => setEditingId(editingId === item.id ? null : item.id)}
            onUpdate={(field, value) => handleUpdateItem(item.id, field, value)}
            onRemove={() => handleRemoveItem(item.id)}
            accentColor={accentColor}
            sectionType={sectionType}
            disabled={disabled}
          />
        ))}
        
        {/* Add button */}
        <button
          onClick={handleAddItem}
          disabled={disabled}
          className="w-full py-2.5 text-sm font-medium rounded-lg border-2 border-dashed transition-all flex items-center justify-center gap-2 hover:bg-transparent"
          style={{ color: accentColor, borderColor: `${accentColor}66` }}
        >
          <Plus className="w-4 h-4" />
          Add {sectionDef.itemName || 'Item'}
        </button>
      </div>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  const itemCount = items.length;

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-gray-300 data-[state=open]:border-gray-300 data-[state=open]:shadow-sm">
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
            {/* Icon */}
            <div 
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
            >
              <Icon className="w-4 h-4" />
            </div>
            
            {/* Title & Count */}
            <div className="flex-1 text-left">
              <span className="text-sm font-semibold text-gray-900">{displayTitle}</span>
              {itemCount > 0 && (
                <span className="ml-2 text-xs text-gray-400">
                  ({itemCount})
                </span>
              )}
            </div>
            
            {/* Preview badges for simple sections */}
            {isSimpleSection && !isExpanded && itemCount > 0 && (
              <div className="hidden sm:flex items-center gap-1 max-w-[200px] overflow-hidden">
                {items.slice(0, 3).map((item: any, i: number) => (
                  <Badge 
                    key={item.id} 
                    variant="secondary" 
                    className="text-[10px] px-2 py-0 h-5 truncate max-w-[60px]"
                  >
                    {getPrimaryValue(item)}
                  </Badge>
                ))}
                {itemCount > 3 && (
                  <span className="text-[10px] text-gray-400">+{itemCount - 3}</span>
                )}
              </div>
            )}
            
            {/* Expand icon */}
            <ChevronDown className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isExpanded && "rotate-180"
            )} />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-1 border-t border-gray-100">
            {isMultiItem ? (
              isSimpleSection ? renderSimpleSection() : renderComplexSection()
            ) : (
              <SingleItemForm
                data={data}
                fields={visibleFields}
                onChange={(field, value) => onChange({ ...data, [field]: value })}
                disabled={disabled}
              />
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

// ============================================================================
// INLINE EDITABLE ITEM (for simple sections)
// ============================================================================

interface InlineEditableItemProps {
  item: any;
  fields: FormFieldDefinition[];
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
  accentColor: string;
  sectionType: string;
}

const InlineEditableItem: React.FC<InlineEditableItemProps> = ({
  item,
  fields,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onUpdate,
  onRemove,
  accentColor,
  sectionType,
}) => {
  const primaryField = fields.find(f => f.required) || fields[0];
  const secondaryFields = fields.filter(f => f !== primaryField);
  const primaryValue = item[primaryField?.key] || '';

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200 min-w-[200px]">
        <div className="flex-1 space-y-2">
          {fields.map(field => (
            <div key={field.key} className="flex items-center gap-2">
              <Label className="text-[10px] text-gray-500 w-12 shrink-0">{field.label}</Label>
              {field.type === 'select' ? (
                <Select
                  value={item[field.key] || ''}
                  onValueChange={(v) => onUpdate(field.key, v)}
                >
                  <SelectTrigger className={`h-7 flex-1 ${COMPACT_FIELD_INPUT_CLASS}`}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map(opt => (
                      <SelectItem key={opt.value} value={opt.value} className="text-xs">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'rating' ? (
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => onUpdate(field.key, level)}
                      className={cn(
                        "w-5 h-5 rounded-full text-[10px] font-medium transition-all",
                        (item[field.key] || 0) >= level
                          ? "text-white"
                          : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                      )}
                      style={{
                        backgroundColor: (item[field.key] || 0) >= level ? accentColor : undefined
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              ) : (
                <Input
                  value={item[field.key] || ''}
                  onChange={(e) => onUpdate(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`h-7 flex-1 ${COMPACT_FIELD_INPUT_CLASS}`}
                  autoFocus={field === primaryField}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={onSave}
            className="p-1 rounded hover:bg-green-100 text-green-600"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRemove}
            className="p-1 rounded hover:bg-red-100 text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Display mode
  return (
    <div
      onClick={onEdit}
      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:shadow-sm"
      style={{ 
        backgroundColor: `${accentColor}15`, 
        color: accentColor,
      }}
    >
      <span>{primaryValue || 'Click to edit'}</span>
      {secondaryFields.length > 0 && item[secondaryFields[0]?.key] && (
        <span className="text-[10px] opacity-70">
          • {item[secondaryFields[0].key]}
        </span>
      )}
      <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity" />
    </div>
  );
};

// ============================================================================
// COMPLEX ITEM CARD (for Experience, Education)
// ============================================================================

interface ComplexItemCardProps {
  item: any;
  index: number;
  fields: FormFieldDefinition[];
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
  accentColor: string;
  sectionType: string;
  disabled: boolean;
}

const ComplexItemCard: React.FC<ComplexItemCardProps> = ({
  item,
  index,
  fields,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  accentColor,
  sectionType,
  disabled,
}) => {
  // Get display values
  const getTitle = () => {
    if (sectionType === 'experience') return item.position || 'Job Title';
    if (sectionType === 'education') return item.degree || 'Degree';
    return item.title || item.name || `Item ${index + 1}`;
  };

  const getSubtitle = () => {
    if (sectionType === 'experience') return item.company;
    if (sectionType === 'education') return item.school;
    return null;
  };

  const getDates = () => {
    const start = item.startDate;
    const end = item.current ? 'Present' : item.endDate;
    if (start && end) return `${start} - ${end}`;
    if (start) return start;
    return null;
  };

  // Group fields for layout
  const groupedFields: Record<string, FormFieldDefinition[]> = {};
  const ungroupedFields: FormFieldDefinition[] = [];
  
  fields.forEach(field => {
    if (field.group) {
      if (!groupedFields[field.group]) groupedFields[field.group] = [];
      groupedFields[field.group].push(field);
    } else {
      ungroupedFields.push(field);
    }
  });

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden transition-all hover:border-gray-300">
      {/* Header - Always visible */}
      <div 
        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 truncate">
              {getTitle()}
            </span>
            {getSubtitle() && (
              <span className="text-xs text-gray-500 truncate">
                @ {getSubtitle()}
              </span>
            )}
          </div>
          {getDates() && (
            <div className="text-[11px] text-gray-400 mt-0.5">
              {getDates()}
            </div>
          )}
        </div>
        
        <ChevronRight className={cn(
          "w-4 h-4 text-gray-400 transition-transform shrink-0",
          isExpanded && "rotate-90"
        )} />
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100 space-y-3">
          {/* Grouped fields */}
          {Object.entries(groupedFields).map(([group, groupFields]) => (
            <div key={group} className="grid grid-cols-2 gap-2">
              {groupFields.map(field => (
                <CompactField
                  key={field.key}
                  field={field}
                  value={item[field.key]}
                  onChange={(v) => onUpdate(field.key, v)}
                  disabled={disabled}
                  accentColor={accentColor}
                />
              ))}
            </div>
          ))}
          
          {/* Ungrouped fields */}
          <div className="grid grid-cols-2 gap-2">
            {ungroupedFields.filter(f => f.type !== 'array' && f.type !== 'textarea').map(field => (
              <CompactField
                key={field.key}
                field={field}
                value={item[field.key]}
                onChange={(v) => onUpdate(field.key, v)}
                disabled={disabled}
                accentColor={accentColor}
                className={field.fullWidth ? 'col-span-2' : ''}
              />
            ))}
          </div>
          
          {/* Textarea fields */}
          {ungroupedFields.filter(f => f.type === 'textarea').map(field => (
            <CompactField
              key={field.key}
              field={field}
              value={item[field.key]}
              onChange={(v) => onUpdate(field.key, v)}
              disabled={disabled}
              accentColor={accentColor}
            />
          ))}
          
          {/* Array fields (bullet points) */}
          {ungroupedFields.filter(f => f.type === 'array').map(field => (
            <ArrayFieldCompact
              key={field.key}
              field={field}
              value={item[field.key] || []}
              onChange={(v) => onUpdate(field.key, v)}
              disabled={disabled}
              accentColor={accentColor}
            />
          ))}
          
          {/* Remove button */}
          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              disabled={disabled}
              className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMPACT FIELD COMPONENT
// ============================================================================

interface CompactFieldProps {
  field: FormFieldDefinition;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  accentColor: string;
  className?: string;
}

const CompactField: React.FC<CompactFieldProps> = ({
  field,
  value,
  onChange,
  disabled,
  accentColor,
  className,
}) => {
  const { key, label, type, placeholder, options, required } = field;

  return (
    <div className={cn("space-y-1", className)}>
      <Label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </Label>
      
      {type === 'textarea' ? (
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={2}
          className={`resize-none ${COMPACT_FIELD_INPUT_CLASS}`}
        />
      ) : type === 'select' ? (
        <Select value={value || ''} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger className={`h-8 ${COMPACT_FIELD_INPUT_CLASS}`}>
            <SelectValue placeholder={placeholder || 'Select...'} />
          </SelectTrigger>
          <SelectContent>
            {options?.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === 'checkbox' ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="rounded border-gray-300"
            style={{ accentColor }}
          />
          <span className="text-xs text-gray-600">{placeholder || label}</span>
        </label>
      ) : type === 'month' ? (
        <MonthYearPicker
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder || 'Select date'}
          className="h-8"
        />
      ) : type === 'number' ? (
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
          placeholder={placeholder}
          disabled={disabled}
          min={field.min}
          max={field.max}
          className={`h-8 w-20 ${COMPACT_FIELD_INPUT_CLASS}`}
        />
      ) : (
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-8 ${COMPACT_FIELD_INPUT_CLASS}`}
        />
      )}
    </div>
  );
};

// ============================================================================
// ARRAY FIELD COMPACT (for bullet points)
// ============================================================================

interface ArrayFieldCompactProps {
  field: FormFieldDefinition;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  accentColor: string;
}

const ArrayFieldCompact: React.FC<ArrayFieldCompactProps> = ({
  field,
  value = [],
  onChange,
  disabled,
  accentColor,
}) => {
  const handleAdd = () => onChange([...value, '']);
  const handleRemove = (index: number) => onChange(value.filter((_, i) => i !== index));
  const handleUpdate = (index: number, newValue: string) => {
    onChange(value.map((item, i) => (i === index ? newValue : item)));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
          {field.label}
        </Label>
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          className="text-[10px] font-medium px-2 py-0.5 rounded hover:bg-gray-100 transition-colors flex items-center gap-1"
          style={{ color: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>
      
      <div className="space-y-1.5">
        {value.length === 0 ? (
          <p className="text-xs text-gray-400 italic py-2">
            No items yet
          </p>
        ) : (
          value.map((item, index) => (
            <div key={index} className="flex items-start gap-2 group">
              <span className="text-gray-300 mt-2 text-xs">•</span>
              <Textarea
                value={item}
                onChange={(e) => handleUpdate(index, e.target.value)}
                placeholder={field.placeholder}
                disabled={disabled}
                rows={1}
                className={`flex-1 resize-none min-h-[32px] ${COMPACT_FIELD_INPUT_CLASS}`}
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all mt-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ============================================================================
// SINGLE ITEM FORM (for non-list sections like Summary)
// ============================================================================

interface SingleItemFormProps {
  data: any;
  fields: FormFieldDefinition[];
  onChange: (field: string, value: any) => void;
  disabled?: boolean;
}

const SingleItemForm: React.FC<SingleItemFormProps> = ({
  data,
  fields,
  onChange,
  disabled,
}) => {
  return (
    <div className="space-y-3">
      {fields.map(field => (
        <CompactField
          key={field.key}
          field={field}
          value={data?.[field.key]}
          onChange={(v) => onChange(field.key, v)}
          disabled={disabled}
          accentColor="#2563eb" // Default application blue
        />
      ))}
    </div>
  );
};

export default CompactSectionForm;
