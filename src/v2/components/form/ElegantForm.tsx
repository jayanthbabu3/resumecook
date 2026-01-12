/**
 * Elegant Form Component
 * 
 * A beautiful, compact, and fully dynamic form that renders based on template config.
 * Features:
 * - Sleek collapsible sections with smooth animations
 * - Inline editing for simple items
 * - Compact card layout for complex items
 * - Dynamic field visibility based on template config
 * - Rich UX with visual feedback and micro-interactions
 */

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Trash2, 
  ChevronDown,
  ChevronRight,
  Pencil,
  Check,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Trophy,
  Target,
  Award,
  Link2,
  Camera,
  FileText,
  Globe,
  Linkedin,
  Github,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MonthYearPicker } from '@/components/ui/month-year-picker';
import {
  getSectionDefinition,
  type FormFieldDefinition,
} from '../../registry/sectionRegistry';
import type { V2SectionType } from '../../types/resumeData';
import type { TemplateSectionConfig } from '../../types/templateConfig';

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
  summary: FileText,
};

const FIELD_INPUT_CLASS = "!text-xs !md:text-xs leading-relaxed placeholder:text-gray-400";

// ============================================================================
// TYPES
// ============================================================================

interface ElegantFormProps {
  resumeData: any;
  onResumeDataChange: (data: any) => void;
  enabledSections: TemplateSectionConfig[];
  sectionTitles?: Record<string, string>;
  templateConfig?: any;
  accentColor?: string;
  onOpenAddSection?: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ElegantForm: React.FC<ElegantFormProps> = ({
  resumeData,
  onResumeDataChange,
  enabledSections,
  sectionTitles = {},
  templateConfig,
  accentColor = '#2563eb', // Default application blue
  onOpenAddSection,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['personal']);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Get ordered sections
  const sectionsToRender = enabledSections
    .filter(s => s.enabled && s.type !== 'header')
    .sort((a, b) => a.order - b.order);

  // Handlers
  const updatePersonalInfo = (field: string, value: any) => {
    onResumeDataChange({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  };

  const updateSection = (dataKey: string, data: any) => {
    onResumeDataChange({ ...resumeData, [dataKey]: data });
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        updatePersonalInfo('photo', result);
        setPhotoUrlInput('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = () => {
    updatePersonalInfo('photo', '');
    setPhotoUrlInput('');
  };

  const applyPhotoUrl = () => {
    const trimmed = photoUrlInput.trim();
    if (trimmed) {
      updatePersonalInfo('photo', trimmed);
    } else {
      handlePhotoRemove();
    }
  };

  const getInitials = (name: string): string => {
    if (!name) return 'AB';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-3">
      {/* ================================================================== */}
      {/* PERSONAL INFO SECTION */}
      {/* ================================================================== */}
      <FormSection
        id="personal"
        title="Personal Info"
        icon={User}
        isExpanded={expandedSections.includes('personal')}
        onToggle={() => toggleSection('personal')}
        accentColor={accentColor}
        badge={resumeData.personalInfo?.fullName || 'Add your info'}
      >
        <div className="space-y-4">
          {/* Name & Title Row */}
          <div className="grid grid-cols-2 gap-3">
            <CompactInput
              label="Full Name"
              value={resumeData.personalInfo?.fullName || ''}
              onChange={(v) => updatePersonalInfo('fullName', v)}
              placeholder="John Doe"
              icon={User}
            />
            <CompactInput
              label="Job Title"
              value={resumeData.personalInfo?.title || ''}
              onChange={(v) => updatePersonalInfo('title', v)}
              placeholder="Senior Developer"
              icon={Briefcase}
            />
          </div>
          
          {/* Contact Row */}
          <div className="grid grid-cols-2 gap-3">
            <CompactInput
              label="Email"
              value={resumeData.personalInfo?.email || ''}
              onChange={(v) => updatePersonalInfo('email', v)}
              placeholder="john@example.com"
              icon={Mail}
              type="email"
            />
            <CompactInput
              label="Phone"
              value={resumeData.personalInfo?.phone || ''}
              onChange={(v) => updatePersonalInfo('phone', v)}
              placeholder="+1 234 567 890"
              icon={Phone}
            />
          </div>
          
          {/* Location */}
          <CompactInput
            label="Location"
            value={resumeData.personalInfo?.location || ''}
            onChange={(v) => updatePersonalInfo('location', v)}
            placeholder="San Francisco, CA"
            icon={MapPin}
          />
          
          {/* Summary */}
          <div className="space-y-1.5">
            <Label className="text-[11px] font-medium text-gray-500">Professional Summary</Label>
            <Textarea
              value={resumeData.personalInfo?.summary || ''}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              placeholder="Brief overview of your professional background..."
              rows={3}
              className={`resize-none ${FIELD_INPUT_CLASS}`}
            />
          </div>
        </div>
      </FormSection>

      {/* ================================================================== */}
      {/* PHOTO SECTION */}
      {/* ================================================================== */}
      <FormSection
        id="photo"
        title="Profile Photo"
        icon={Camera}
        isExpanded={expandedSections.includes('photo')}
        onToggle={() => toggleSection('photo')}
        accentColor={accentColor}
        badge={resumeData.personalInfo?.photo ? 'Photo added' : 'Optional'}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden"
              style={{
                borderColor: resumeData.personalInfo?.photo ? accentColor : '#e5e7eb',
              }}
            >
              {resumeData.personalInfo?.photo ? (
                <img
                  src={resumeData.personalInfo.photo}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-gray-400">
                  {getInitials(resumeData.personalInfo?.fullName || '')}
                </span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePhotoUpload(file);
                }}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 text-xs"
                >
                  Upload photo
                </Button>
                {resumeData.personalInfo?.photo && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handlePhotoRemove}
                    className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Paste image URL..."
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && photoUrlInput.trim()) {
                      applyPhotoUrl();
                    }
                  }}
                  className={`h-8 ${FIELD_INPUT_CLASS}`}
                />
                <Button
                  type="button"
                  size="sm"
                  variant={photoUrlInput.trim() ? 'default' : 'outline'}
                  onClick={applyPhotoUrl}
                  disabled={!photoUrlInput.trim()}
                  className="h-8 text-xs"
                  style={{
                    backgroundColor: photoUrlInput.trim() ? accentColor : undefined,
                    borderColor: accentColor,
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            If no photo is uploaded, we’ll show your initials in the header.
          </p>
        </div>
      </FormSection>

      {/* ================================================================== */}
      {/* SOCIAL LINKS SECTION */}
      {/* ================================================================== */}
      <FormSection
        id="social"
        title="Social Links"
        icon={Link2}
        isExpanded={expandedSections.includes('social')}
        onToggle={() => toggleSection('social')}
        accentColor={accentColor}
        badge={
          [
            resumeData.personalInfo?.linkedin,
            resumeData.personalInfo?.github,
            resumeData.personalInfo?.portfolio,
          ].filter(Boolean).length > 0
            ? `${[resumeData.personalInfo?.linkedin, resumeData.personalInfo?.github, resumeData.personalInfo?.portfolio].filter(Boolean).length} links`
            : 'Optional'
        }
      >
        <div className="space-y-3">
          <CompactInput
            label="LinkedIn"
            value={resumeData.personalInfo?.linkedin || ''}
            onChange={(v) => updatePersonalInfo('linkedin', v)}
            placeholder="linkedin.com/in/username"
            icon={Linkedin}
          />
          <CompactInput
            label="GitHub"
            value={resumeData.personalInfo?.github || ''}
            onChange={(v) => updatePersonalInfo('github', v)}
            placeholder="github.com/username"
            icon={Github}
          />
          <CompactInput
            label="Portfolio"
            value={resumeData.personalInfo?.portfolio || ''}
            onChange={(v) => updatePersonalInfo('portfolio', v)}
            placeholder="yourwebsite.com"
            icon={Globe}
          />
        </div>
      </FormSection>

      {/* ================================================================== */}
      {/* DYNAMIC SECTIONS */}
      {/* ================================================================== */}
      {sectionsToRender.map((sectionConfig) => {
        const sectionDef = getSectionDefinition(sectionConfig.type);
        if (!sectionDef || sectionConfig.type === 'summary') return null;

        const Icon = SECTION_ICONS[sectionConfig.type] || FileText;
        const data = resumeData[sectionDef.dataKey];
        const itemCount = Array.isArray(data) ? data.length : 0;
        const sectionTypeConfig = templateConfig?.[sectionConfig.type];
        const currentVariant = sectionTypeConfig?.variant || sectionDef.defaultVariant;

        // Get visible fields
        const visibleFields = sectionDef.formFields.filter(field => {
          if (field.showWhenConfig) {
            const parts = field.showWhenConfig.split('.');
            let value: any = templateConfig;
            for (const part of parts) {
              if (value === undefined || value === null) return true;
              value = value[part];
            }
            if (value === false) return false;
          }
          if (field.showForVariants?.length) {
            if (!field.showForVariants.includes(currentVariant)) return false;
          }
          return true;
        });

        const isSimple = ['skills', 'languages', 'strengths', 'achievements'].includes(sectionConfig.type);

        return (
          <FormSection
            key={sectionConfig.id}
            id={sectionConfig.id}
            title={sectionTitles[sectionConfig.id] || sectionConfig.title || sectionDef.defaultTitle}
            icon={Icon}
            isExpanded={expandedSections.includes(sectionConfig.id)}
            onToggle={() => toggleSection(sectionConfig.id)}
            accentColor={accentColor}
            badge={itemCount > 0 ? `${itemCount} ${itemCount === 1 ? sectionDef.itemName : sectionDef.itemNamePlural}` : 'Empty'}
          >
            {isSimple ? (
              <SimpleItemsEditor
                items={data || []}
                fields={visibleFields}
                onChange={(items) => updateSection(sectionDef.dataKey, items)}
                sectionType={sectionConfig.type}
                accentColor={accentColor}
                itemName={sectionDef.itemName || 'item'}
              />
            ) : (
              <ComplexItemsEditor
                items={data || []}
                fields={visibleFields}
                onChange={(items) => updateSection(sectionDef.dataKey, items)}
                sectionType={sectionConfig.type}
                accentColor={accentColor}
                itemName={sectionDef.itemName || 'item'}
              />
            )}
          </FormSection>
        );
      })}

      {/* ================================================================== */}
      {/* ADD SECTION CARD */}
      {/* ================================================================== */}
      {onOpenAddSection && (
        <button
          onClick={onOpenAddSection}
          className="w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-100/50 transition-all duration-200 p-4 group"
        >
          <div className="flex items-center justify-center gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-white transition-colors"
              style={{ color: accentColor }}
            >
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                Add New Section
              </span>
              <p className="text-[11px] text-gray-400 group-hover:text-gray-500 transition-colors">
                Interests, Awards, Publications & more
              </p>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

// ============================================================================
// FORM SECTION WRAPPER
// ============================================================================

interface FormSectionProps {
  id: string;
  title: string;
  icon: React.ElementType;
  isExpanded: boolean;
  onToggle: () => void;
  accentColor: string;
  badge?: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  id,
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  accentColor,
  badge,
  children,
}) => {
  return (
    <div 
      className={cn(
        "rounded-xl border bg-white overflow-hidden transition-all duration-200",
        isExpanded ? "border-gray-300 shadow-sm" : "border-gray-200 hover:border-gray-300"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors"
      >
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
          style={{ 
            backgroundColor: isExpanded ? `${accentColor}20` : '#f3f4f6',
            color: isExpanded ? accentColor : '#6b7280',
          }}
        >
          <Icon className="w-4 h-4" />
        </div>
        
        <span className={cn(
          "text-sm font-semibold transition-colors",
          isExpanded ? "text-gray-900" : "text-gray-700"
        )}>
          {title}
        </span>
        
        {badge && !isExpanded && (
          <span className="text-[11px] text-gray-400 ml-auto mr-2">
            {badge}
          </span>
        )}
        
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-400 transition-transform ml-auto",
          isExpanded && "rotate-180"
        )} />
      </button>
      
      {/* Content */}
      <div className={cn(
        "overflow-hidden transition-all duration-200",
        isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPACT INPUT
// ============================================================================

interface CompactInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ElementType;
  type?: string;
}

const CompactInput: React.FC<CompactInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = 'text',
}) => {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-gray-500">{label}</Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(`h-8 ${FIELD_INPUT_CLASS}`, Icon && "pl-9")}
        />
      </div>
    </div>
  );
};

// ============================================================================
// SIMPLE ITEMS EDITOR (Skills, Languages, etc.)
// ============================================================================

interface SimpleItemsEditorProps {
  items: any[];
  fields: FormFieldDefinition[];
  onChange: (items: any[]) => void;
  sectionType: string;
  accentColor: string;
  itemName: string;
}

const SimpleItemsEditor: React.FC<SimpleItemsEditorProps> = ({
  items,
  fields,
  onChange,
  sectionType,
  accentColor,
  itemName,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const primaryField = fields.find(f => f.required) || fields[0];

  const handleAdd = () => {
    const newItem: Record<string, any> = { id: `${sectionType}-${Date.now()}` };
    fields.forEach(f => {
      newItem[f.key] = f.defaultValue ?? (f.type === 'array' ? [] : '');
    });
    onChange([...items, newItem]);
    setEditingId(newItem.id);
  };

  const handleUpdate = (id: string, field: string, value: any) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="space-y-3">
      {/* Items grid */}
      <div className="flex flex-wrap items-start gap-2">
        {items.map((item) => {
          const isEditing = editingId === item.id;
          const primaryValue = item[primaryField?.key] || '';

          if (isEditing) {
            return (
              <div 
                key={item.id}
                className="w-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Edit {itemName}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingId(null)}
                      className="h-7 w-7 rounded-md border border-transparent text-green-600 hover:bg-green-50 hover:border-green-100 transition-colors"
                      title="Save"
                    >
                      <Check className="w-3.5 h-3.5 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="h-7 w-7 rounded-md border border-transparent text-red-500 hover:bg-red-50 hover:border-red-100 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  {fields.map(field => (
                    <div key={field.key} className="grid grid-cols-[64px_1fr] items-center gap-2">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                        {field.label}
                      </span>
                      {field.type === 'select' ? (
                        <Select
                          value={item[field.key] || ''}
                          onValueChange={(v) => handleUpdate(item.id, field.key, v)}
                        >
                          <SelectTrigger className={`h-7 ${FIELD_INPUT_CLASS}`}>
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
                              onClick={() => handleUpdate(item.id, field.key, level)}
                              className={cn(
                                "w-5 h-5 rounded-full text-[10px] font-medium transition-all",
                                (item[field.key] || 0) >= level
                                  ? "text-white"
                                  : "bg-gray-200 text-gray-500"
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
                          onChange={(e) => handleUpdate(item.id, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className={`h-7 ${FIELD_INPUT_CLASS}`}
                          autoFocus={field === primaryField}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              onClick={() => setEditingId(item.id)}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:shadow-sm"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
            >
              <span>{primaryValue || 'Click to edit'}</span>
              {fields.length > 1 && item[fields[1]?.key] && (
                <span className="text-[10px] opacity-60">• {item[fields[1].key]}</span>
              )}
              <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
          );
        })}
        
        {/* Add button */}
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border border-dashed transition-all leading-none self-start hover:bg-transparent"
          style={{ color: accentColor, borderColor: `${accentColor}66` }}
        >
          <Plus className="w-3 h-3" />
          Add {itemName}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPLEX ITEMS EDITOR (Experience, Education)
// ============================================================================

interface ComplexItemsEditorProps {
  items: any[];
  fields: FormFieldDefinition[];
  onChange: (items: any[]) => void;
  sectionType: string;
  accentColor: string;
  itemName: string;
}

const ComplexItemsEditor: React.FC<ComplexItemsEditorProps> = ({
  items,
  fields,
  onChange,
  sectionType,
  accentColor,
  itemName,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem: Record<string, any> = { id: `${sectionType}-${Date.now()}` };
    fields.forEach(f => {
      newItem[f.key] = f.defaultValue ?? (f.type === 'array' ? [] : f.type === 'checkbox' ? false : '');
    });
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const handleUpdate = (id: string, field: string, value: any) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  // Get display info
  const getTitle = (item: any) => {
    if (sectionType === 'experience') return item.position || 'Job Title';
    if (sectionType === 'education') return item.degree || 'Degree';
    return item.title || item.name || 'Untitled';
  };

  const getSubtitle = (item: any) => {
    if (sectionType === 'experience') return item.company;
    if (sectionType === 'education') return item.school;
    return null;
  };

  // Group fields
  const groupedFields: Record<string, FormFieldDefinition[]> = {};
  const ungroupedFields: FormFieldDefinition[] = [];
  fields.forEach(f => {
    if (f.group) {
      if (!groupedFields[f.group]) groupedFields[f.group] = [];
      groupedFields[f.group].push(f);
    } else {
      ungroupedFields.push(f);
    }
  });

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        
        return (
          <div 
            key={item.id}
            className={cn(
              "rounded-lg border bg-white overflow-hidden transition-all",
              isExpanded ? "border-gray-300" : "border-gray-200 hover:border-gray-300"
            )}
          >
            {/* Header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50/50 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {getTitle(item)}
                  </span>
                  {getSubtitle(item) && (
                    <span className="text-xs text-gray-500 truncate">
                      @ {getSubtitle(item)}
                    </span>
                  )}
                </div>
                {(item.startDate || item.endDate) && (
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    {item.startDate} {item.startDate && (item.endDate || item.current) && '–'} {item.current ? 'Present' : item.endDate}
                  </div>
                )}
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 text-gray-400 transition-transform shrink-0",
                isExpanded && "rotate-90"
              )} />
            </button>
            
            {/* Content */}
            {isExpanded && (
              <div className="px-3 pb-3 pt-1 border-t border-gray-100 space-y-3">
                {/* Grouped fields */}
                {Object.entries(groupedFields).map(([group, gFields]) => (
                  <div key={group} className="grid grid-cols-2 gap-2">
                    {gFields.map(field => (
                      <FieldRenderer
                        key={field.key}
                        field={field}
                        value={item[field.key]}
                        onChange={(v) => handleUpdate(item.id, field.key, v)}
                        accentColor={accentColor}
                      />
                    ))}
                  </div>
                ))}
                
                {/* Ungrouped fields */}
                <div className="grid grid-cols-2 gap-2">
                  {ungroupedFields.filter(f => !['array', 'textarea'].includes(f.type)).map(field => (
                    <FieldRenderer
                      key={field.key}
                      field={field}
                      value={item[field.key]}
                      onChange={(v) => handleUpdate(item.id, field.key, v)}
                      accentColor={accentColor}
                      className={field.fullWidth ? 'col-span-2' : ''}
                    />
                  ))}
                </div>
                
                {/* Textarea fields */}
                {ungroupedFields.filter(f => f.type === 'textarea').map(field => (
                  <FieldRenderer
                    key={field.key}
                    field={field}
                    value={item[field.key]}
                    onChange={(v) => handleUpdate(item.id, field.key, v)}
                    accentColor={accentColor}
                  />
                ))}
                
                {/* Array fields */}
                {ungroupedFields.filter(f => f.type === 'array').map(field => (
                  <BulletPointsEditor
                    key={field.key}
                    label={field.label}
                    items={item[field.key] || []}
                    onChange={(v) => handleUpdate(item.id, field.key, v)}
                    placeholder={field.placeholder}
                    accentColor={accentColor}
                  />
                ))}
                
                {/* Remove button */}
                <div className="flex justify-end pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleRemove(item.id)}
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
      })}
      
      {/* Add button */}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 text-sm font-medium rounded-lg border-2 border-dashed transition-all flex items-center justify-center gap-2 hover:bg-transparent"
        style={{ color: accentColor, borderColor: `${accentColor}66` }}
      >
        <Plus className="w-4 h-4" />
        Add {itemName}
      </button>
    </div>
  );
};

// ============================================================================
// FIELD RENDERER
// ============================================================================

interface FieldRendererProps {
  field: FormFieldDefinition;
  value: any;
  onChange: (value: any) => void;
  accentColor: string;
  className?: string;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
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
          rows={2}
          className={`resize-none ${FIELD_INPUT_CLASS}`}
        />
      ) : type === 'select' ? (
        <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className={`h-8 ${FIELD_INPUT_CLASS}`}>
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
        <label className="flex items-center gap-2 cursor-pointer h-8">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="rounded border-gray-300"
            style={{ accentColor }}
          />
          <span className="text-xs text-gray-600">{placeholder || 'Yes'}</span>
        </label>
      ) : type === 'month' ? (
        <MonthYearPicker
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder || 'Select date'}
          className="h-8"
        />
      ) : type === 'number' ? (
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
          placeholder={placeholder}
          min={field.min}
          max={field.max}
          className={`h-8 w-20 ${FIELD_INPUT_CLASS}`}
        />
      ) : (
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-8 ${FIELD_INPUT_CLASS}`}
        />
      )}
    </div>
  );
};

// ============================================================================
// BULLET POINTS EDITOR
// ============================================================================

interface BulletPointsEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  accentColor: string;
}

const BulletPointsEditor: React.FC<BulletPointsEditorProps> = ({
  label,
  items,
  onChange,
  placeholder,
  accentColor,
}) => {
  const handleAdd = () => onChange([...items, '']);
  const handleRemove = (index: number) => onChange(items.filter((_, i) => i !== index));
  const handleUpdate = (index: number, value: string) => {
    onChange(items.map((item, i) => i === index ? value : item));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </Label>
        <button
          onClick={handleAdd}
          className="text-[10px] font-medium px-2 py-0.5 rounded hover:bg-gray-100 transition-colors flex items-center gap-1"
          style={{ color: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>
      
      <div className="space-y-1.5">
        {items.length === 0 ? (
          <p className="text-xs text-gray-400 italic py-2">No items yet</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex items-start gap-2 group">
              <span className="text-gray-300 mt-2 text-xs">•</span>
              <Textarea
                value={item}
                onChange={(e) => handleUpdate(index, e.target.value)}
                placeholder={placeholder}
                rows={2}
                className={`flex-1 resize-none min-h-[56px] ${FIELD_INPUT_CLASS}`}
              />
              <button
                onClick={() => handleRemove(index)}
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

export default ElegantForm;
