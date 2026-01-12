/**
 * Dynamic Form Field Component
 * 
 * Renders a form field based on its definition from the section registry.
 * Supports: text, textarea, date, select, checkbox, array, rating
 */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MonthYearPicker } from '@/components/ui/month-year-picker';
import type { FormFieldDefinition } from '../../registry/sectionRegistry';

// ============================================================================
// TYPES
// ============================================================================

interface DynamicFormFieldProps {
  field: FormFieldDefinition;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  className?: string;
  /** Render in compact mode with smaller inputs */
  compact?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  value,
  onChange,
  disabled = false,
  className,
  compact = false,
}) => {
  const { key, label, type, placeholder, required, options, rows } = field;
  
  // Compact mode styles
  const labelClass = compact ? 'text-xs font-medium text-muted-foreground' : 'text-sm font-medium';
  const inputClass = compact ? 'h-8 text-sm' : 'h-9';
  const containerClass = compact ? 'space-y-1' : 'space-y-1.5';

  // Render based on field type
  switch (type) {
    case 'text':
      return (
        <div className={cn(containerClass, className)}>
          <Label htmlFor={key} className={labelClass}>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          <Input
            id={key}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClass}
          />
        </div>
      );

    case 'textarea':
      return (
        <div className={cn(containerClass, className)}>
          <Label htmlFor={key} className={labelClass}>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          <Textarea
            id={key}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={compact ? 2 : (rows || 3)}
            className={cn('resize-none', compact && 'text-sm')}
          />
        </div>
      );

    case 'date':
    case 'month':
      return (
        <div className={cn(containerClass, className)}>
          <Label htmlFor={key} className={labelClass}>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          <MonthYearPicker
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || 'Select date'}
          />
        </div>
      );

    case 'select':
      return (
        <div className={cn(containerClass, className)}>
          <Label htmlFor={key} className={labelClass}>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          <Select
            value={value || ''}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder={placeholder || `Select...`} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case 'checkbox':
      return (
        <div className={cn('flex items-center gap-2', compact && 'h-8 items-center', className)}>
          <Checkbox
            id={key}
            checked={value || false}
            onCheckedChange={onChange}
            disabled={disabled}
            className={compact ? 'h-4 w-4' : undefined}
          />
          <Label htmlFor={key} className={cn(compact ? 'text-xs' : 'text-sm', 'font-medium cursor-pointer')}>
            {label}
          </Label>
        </div>
      );

    case 'rating':
      return (
        <div className={cn(containerClass, className)}>
          <Label htmlFor={key} className={labelClass}>
            {label}
          </Label>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => onChange(level)}
                disabled={disabled}
                className={cn(
                  compact ? 'w-6 h-6 text-xs' : 'w-8 h-8',
                  'rounded-full border-2 transition-all font-medium',
                  value >= level
                    ? 'bg-cyan-500 border-cyan-500 text-white'
                    : 'border-gray-300 hover:border-cyan-300'
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      );

    case 'array':
      return (
        <ArrayField
          field={field}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={className}
          compact={compact}
        />
      );

    case 'number':
      return (
        <div className={cn(containerClass, className)}>
          <Label htmlFor={key} className={labelClass}>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          <Input
            id={key}
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
            placeholder={placeholder}
            disabled={disabled}
            min={field.min}
            max={field.max}
            className={cn(inputClass, 'w-20')}
          />
        </div>
      );

    default:
      return (
        <div className={cn(containerClass, className)}>
          <Label htmlFor={key} className={labelClass}>
            {label}
          </Label>
          <Input
            id={key}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClass}
          />
        </div>
      );
  }
};

// ============================================================================
// ARRAY FIELD COMPONENT
// ============================================================================

interface ArrayFieldProps {
  field: FormFieldDefinition;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
}

const ArrayField: React.FC<ArrayFieldProps> = ({
  field,
  value = [],
  onChange,
  disabled = false,
  className,
  compact = false,
}) => {
  const { key, label, placeholder } = field;

  const handleAdd = () => {
    onChange([...value, '']);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, newValue: string) => {
    onChange(value.map((item, i) => (i === index ? newValue : item)));
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleAdd}
          disabled={disabled}
          className="h-7 text-xs gap-1 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </div>
      
      <div className="space-y-2">
        {value.length === 0 ? (
          <div className="text-sm text-muted-foreground italic py-2">
            No items yet. Click "Add" to create one.
          </div>
        ) : (
          value.map((item, index) => (
            <div key={index} className="flex items-start gap-2 group">
              <div className="mt-2.5 cursor-grab opacity-0 group-hover:opacity-50 transition-opacity">
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1">
                <Textarea
                  value={item}
                  onChange={(e) => handleUpdate(index, e.target.value)}
                  placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
                  disabled={disabled}
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DynamicFormField;
