/**
 * Enhanced Form Component
 *
 * A modern, intuitive form interface with:
 * - Navigation rail on desktop (left side)
 * - Tab navigation on mobile
 * - Smooth transitions between sections
 * - Real-time sync with live preview
 * - Elegant, minimal design
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  Mic,
  Lightbulb,
  FolderOpen,
  Star,
  GripVertical,
  Check,
  X,
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
// TYPES
// ============================================================================

interface EnhancedFormProps {
  resumeData: any;
  onResumeDataChange: (data: any) => void;
  enabledSections: TemplateSectionConfig[];
  sectionTitles?: Record<string, string>;
  templateConfig?: any;
  accentColor?: string;
  onOpenAddSection?: () => void;
  hideHeader?: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  type: 'static' | 'dynamic';
  dataKey?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SECTION_ICONS: Record<string, React.ElementType> = {
  personal: User,
  socialLinks: Link2,
  photo: Camera,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  languages: Languages,
  achievements: Trophy,
  strengths: Target,
  certifications: Award,
  summary: FileText,
  projects: FolderOpen,
  awards: Star,
  publications: BookOpen,
  volunteer: Heart,
  speaking: Mic,
  patents: Lightbulb,
  interests: Sparkles,
  references: Users,
  courses: GraduationCap,
};

const STATIC_NAV_ITEMS: NavItem[] = [
  { id: 'personal', label: 'Personal', icon: User, type: 'static' },
  { id: 'socialLinks', label: 'Social Links', icon: Link2, type: 'static' },
  { id: 'photo', label: 'Photo', icon: Camera, type: 'static' },
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const FormField: React.FC<{
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}> = ({ label, children, required, hint }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </Label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

// Website theme color (fixed, not resume theme) - matches --primary in index.css
const WEBSITE_THEME_COLOR = '#4A90E2'; // Blue - HSL(217, 91%, 60%)

const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  icon: React.ElementType;
}> = ({ title, subtitle, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${WEBSITE_THEME_COLOR}15` }}
    >
      <Icon className="w-5 h-5" style={{ color: WEBSITE_THEME_COLOR }} />
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

const ItemCard: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
  className?: string;
  index?: number;
  icon?: React.ElementType;
  title?: string;
  subtitle?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}> = ({ children, onDelete, className, index, icon: Icon, title, subtitle, isExpanded = true, onToggle }) => (
  <div className={cn(
    "relative rounded-xl border-2 bg-white shadow-sm transition-all duration-200 overflow-hidden",
    isExpanded ? "border-blue-200 shadow-md" : "border-gray-100 hover:border-gray-200",
    className
  )}>
    {/* Card Header - Clickable to toggle */}
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors",
        isExpanded ? "border-b border-gray-100" : ""
      )}
      style={{ background: isExpanded
        ? 'linear-gradient(135deg, rgba(8, 145, 178, 0.06) 0%, rgba(8, 145, 178, 0.02) 100%)'
        : 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)'
      }}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Index Badge */}
        {typeof index === 'number' && (
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0 transition-colors",
              isExpanded ? "text-white" : "text-blue-700"
            )}
            style={{ backgroundColor: isExpanded ? WEBSITE_THEME_COLOR : `${WEBSITE_THEME_COLOR}20` }}
          >
            {index + 1}
          </div>
        )}
        {/* Icon - only show if no index */}
        {Icon && typeof index !== 'number' && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${WEBSITE_THEME_COLOR}15` }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: WEBSITE_THEME_COLOR }} />
          </div>
        )}
        {/* Title/Subtitle Preview */}
        <div className="min-w-0 flex-1">
          {(title || subtitle) ? (
            <>
              {title && <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>}
              {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
            </>
          ) : (
            typeof index === 'number' && (
              <span className="text-sm font-medium text-gray-600">Entry {index + 1}</span>
            )
          )}
        </div>
        {/* Expand/Collapse indicator */}
        <ChevronRight
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0",
            isExpanded && "rotate-90"
          )}
        />
      </div>
      {/* Delete button - stop propagation to prevent toggle */}
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-7 w-7 p-0 ml-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
    {/* Card Content - Collapsible */}
    <div className={cn(
      "overflow-hidden transition-all duration-200",
      isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
    )}>
      <div className="p-5">
        {children}
      </div>
    </div>
  </div>
);

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

const PersonalSection: React.FC<{
  data: any;
  onChange: (field: string, value: any) => void;
}> = ({ data, onChange }) => (
  <div className="space-y-5">
    <SectionHeader
      title="Personal Details"
      subtitle="Your basic contact information"
      icon={User}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="First Name" required>
        <Input
          value={data.fullName?.split(' ')[0] || ''}
          onChange={(e) => {
            const lastName = data.fullName?.split(' ').slice(1).join(' ') || '';
            onChange('fullName', `${e.target.value} ${lastName}`.trim());
          }}
          placeholder="John"
          className="h-11 text-base"
        />
      </FormField>

      <FormField label="Last Name" required>
        <Input
          value={data.fullName?.split(' ').slice(1).join(' ') || ''}
          onChange={(e) => {
            const firstName = data.fullName?.split(' ')[0] || '';
            onChange('fullName', `${firstName} ${e.target.value}`.trim());
          }}
          placeholder="Doe"
          className="h-11 text-base"
        />
      </FormField>
    </div>

    <FormField label="Job Title" required>
      <Input
        value={data.title || ''}
        onChange={(e) => onChange('title', e.target.value)}
        placeholder="Senior Software Engineer"
        className="h-11 text-base"
      />
    </FormField>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="Email" required>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="john@example.com"
            className="h-11 pl-11 text-base"
          />
        </div>
      </FormField>

      <FormField label="Phone">
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="h-11 pl-11 text-base"
          />
        </div>
      </FormField>
    </div>

    <FormField label="Location">
      <div className="relative">
        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={data.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="San Francisco, CA"
          className="h-11 pl-11 text-base"
        />
      </div>
    </FormField>

    <FormField label="Professional Summary" hint="Write 2-4 sentences about your professional background">
      <Textarea
        value={data.summary || ''}
        onChange={(e) => onChange('summary', e.target.value)}
        placeholder="Experienced software engineer with 5+ years of experience..."
        className="min-h-[120px] resize-none text-base leading-relaxed"
        maxLength={500}
      />
      <div className="flex justify-end mt-1">
        <span className="text-xs text-gray-400">
          {(data.summary || '').length}/500 characters
        </span>
      </div>
    </FormField>
  </div>
);

const SocialLinksSection: React.FC<{
  data: any;
  onChange: (field: string, value: any) => void;
}> = ({ data, onChange }) => (
  <div className="space-y-5">
    <SectionHeader
      title="Social Links"
      subtitle="Add your professional profiles"
      icon={Link2}
    />

    <div className="space-y-5">
      <FormField label="LinkedIn">
        <div className="relative">
          <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={data.linkedin || ''}
            onChange={(e) => onChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="h-11 pl-11 text-base"
          />
        </div>
      </FormField>

      <FormField label="GitHub">
        <div className="relative">
          <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={data.github || ''}
            onChange={(e) => onChange('github', e.target.value)}
            placeholder="github.com/johndoe"
            className="h-11 pl-11 text-base"
          />
        </div>
      </FormField>

      <FormField label="Portfolio Website">
        <div className="relative">
          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={data.portfolio || ''}
            onChange={(e) => onChange('portfolio', e.target.value)}
            placeholder="johndoe.com"
            className="h-11 pl-11 text-base"
          />
        </div>
      </FormField>
    </div>
  </div>
);

const PhotoSection: React.FC<{
  data: any;
  onChange: (field: string, value: any) => void;
}> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState('');

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        onChange('photo', result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Profile Photo"
        subtitle="Add a professional photo (optional)"
        icon={Camera}
      />

      <div className="flex flex-col items-center gap-8 py-4">
        {/* Photo Preview */}
        <div className="relative">
          <div
            className={cn(
              "w-36 h-36 rounded-full border-4 flex items-center justify-center overflow-hidden shadow-sm",
              data.photo ? "border-gray-200" : "border-dashed border-gray-300 bg-gray-50"
            )}
          >
            {data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-10 h-10 text-gray-400" />
            )}
          </div>
          {data.photo && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onChange('photo', '')}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 text-sm px-4"
            >
              Remove
            </Button>
          )}
        </div>

        {/* Upload Options */}
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-11 text-base"
          >
            <Camera className="w-5 h-5 mr-2" />
            Upload Photo
          </Button>

          <div className="flex items-center gap-3 w-full">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="flex gap-3 w-full">
            <Input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Paste image URL"
              className="h-11 text-base flex-1"
            />
            <Button
              variant="secondary"
              onClick={() => {
                if (photoUrl) {
                  onChange('photo', photoUrl);
                  setPhotoUrl('');
                }
              }}
              disabled={!photoUrl}
              className="h-11 px-5 text-base"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generic list section for experience, education, etc.
const ListSection: React.FC<{
  sectionType: V2SectionType;
  data: any[];
  onChange: (data: any[]) => void;
  sectionTitle?: string;
  templateConfig?: any;
}> = ({ sectionType, data, onChange, sectionTitle, templateConfig }) => {
  const definition = getSectionDefinition(sectionType);
  // Track which items are expanded - last item is expanded by default
  const [expandedItems, setExpandedItems] = useState<Set<number>>(() => {
    const items = data || [];
    // If there are items, expand the last one by default
    return new Set(items.length > 0 ? [items.length - 1] : []);
  });

  if (!definition) return null;

  const icon = SECTION_ICONS[sectionType] || FileText;
  const items = data || [];

  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const addItem = () => {
    const newItem: any = { id: crypto.randomUUID() };
    definition.formFields.forEach(field => {
      if (field.type === 'array') {
        newItem[field.key] = [];
      } else if (field.type === 'checkbox') {
        newItem[field.key] = false;
      } else if (field.type === 'rating') {
        newItem[field.key] = 3;
      } else {
        newItem[field.key] = '';
      }
    });
    const newItems = [...items, newItem];
    onChange(newItems);
    // Expand the newly added item and collapse others
    setExpandedItems(new Set([newItems.length - 1]));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    // Update expanded items after removal
    setExpandedItems(prev => {
      const newSet = new Set<number>();
      prev.forEach(i => {
        if (i < index) newSet.add(i);
        else if (i > index) newSet.add(i - 1);
      });
      // If no items are expanded after removal, expand the last one
      const remainingCount = items.length - 1;
      if (newSet.size === 0 && remainingCount > 0) {
        newSet.add(remainingCount - 1);
      }
      return newSet;
    });
  };

  // Show all fields - ignore showWhenConfig to ensure all fields are visible
  const shouldShowField = (field: FormFieldDefinition) => {
    // Always show required fields and common fields
    // Only hide fields explicitly marked as hidden for this section
    return true;
  };

  // Check if field should be full width
  const isFullWidth = (field: FormFieldDefinition) => {
    // Array fields (bullet points), textarea, tags, and explicitly marked full-width
    return field.fullWidth || field.type === 'array' || field.type === 'textarea' || field.type === 'tags';
  };

  // Render a single form field
  const renderField = (field: FormFieldDefinition, item: any, index: number) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return (
          <FormField label={field.label} required={field.required}>
            <Input
              value={item[field.key] || ''}
              onChange={(e) => updateItem(index, field.key, e.target.value)}
              placeholder={field.placeholder}
              className="h-11 text-base"
            />
          </FormField>
        );

      case 'textarea':
        return (
          <FormField label={field.label} required={field.required}>
            <Textarea
              value={item[field.key] || ''}
              onChange={(e) => updateItem(index, field.key, e.target.value)}
              placeholder={field.placeholder}
              className="min-h-[80px] resize-none text-base"
              rows={field.rows || 3}
            />
          </FormField>
        );

      case 'date':
      case 'month':
        return (
          <FormField label={field.label} required={field.required}>
            <MonthYearPicker
              value={item[field.key] || ''}
              onChange={(value) => updateItem(index, field.key, value)}
              placeholder={field.placeholder || 'Select date'}
            />
          </FormField>
        );

      case 'checkbox':
        return (
          <div className="flex items-center gap-2 h-9 mt-6">
            <Switch
              checked={item[field.key] || false}
              onCheckedChange={(checked) => updateItem(index, field.key, checked)}
            />
            <Label className="text-sm text-gray-600">{field.label}</Label>
          </div>
        );

      case 'number':
        return (
          <FormField label={field.label} required={field.required}>
            <Input
              type="number"
              value={item[field.key] || ''}
              onChange={(e) => updateItem(index, field.key, parseFloat(e.target.value) || '')}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              className="h-11 text-base"
            />
          </FormField>
        );

      case 'rating':
        return (
          <FormField label={field.label}>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => updateItem(index, field.key, star)}
                  className={cn(
                    "w-9 h-9 rounded-lg transition-colors",
                    star <= (item[field.key] || 0)
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  )}
                >
                  <Star className="w-4 h-4 mx-auto" fill={star <= (item[field.key] || 0) ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </FormField>
        );

      case 'array':
        return (
          <FormField label={field.label}>
            <BulletPointsEditor
              items={item[field.key] || []}
              onChange={(bullets) => updateItem(index, field.key, bullets)}
              placeholder={field.placeholder}
            />
          </FormField>
        );

      case 'select':
        return (
          <FormField label={field.label} required={field.required}>
            <Select
              value={item[field.key] || ''}
              onValueChange={(value) => updateItem(index, field.key, value)}
            >
              <SelectTrigger className="h-11 text-base">
                <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        );

      case 'tags':
        return (
          <FormField label={field.label}>
            <BulletPointsEditor
              items={item[field.key] || []}
              onChange={(tags) => updateItem(index, field.key, tags)}
              placeholder={field.placeholder}
            />
          </FormField>
        );

      case 'multiselect':
        return (
          <FormField label={field.label} required={field.required}>
            <div className="flex flex-wrap gap-2">
              {field.options?.map((option) => {
                const selected = (item[field.key] || []).includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const current = item[field.key] || [];
                      const updated = selected
                        ? current.filter((v: string) => v !== option.value)
                        : [...current, option.value];
                      updateItem(index, field.key, updated);
                    }}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors",
                      selected
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </FormField>
        );

      default:
        return null;
    }
  };

  // Get the primary title and subtitle fields for card header preview
  const getTitleField = () => {
    // Common title field keys by section type
    const titleKeys: Record<string, string> = {
      experience: 'position',
      education: 'degree',
      skills: 'name',
      certifications: 'name',
      projects: 'name',
      languages: 'language',
      achievements: 'title',
      strengths: 'title',
      awards: 'title',
      publications: 'title',
      volunteer: 'role',
      speaking: 'topic',
      patents: 'title',
      interests: 'name',
      references: 'name',
      courses: 'name',
    };
    return titleKeys[sectionType] || 'title';
  };

  const getSubtitleField = () => {
    // Common subtitle field keys by section type
    const subtitleKeys: Record<string, string> = {
      experience: 'company',
      education: 'school',
      certifications: 'issuer',
      projects: 'role',
      languages: 'proficiency',
      awards: 'issuer',
      publications: 'publisher',
      volunteer: 'organization',
      speaking: 'event',
      patents: 'patentNumber',
      references: 'company',
      courses: 'provider',
    };
    return subtitleKeys[sectionType];
  };

  const titleKey = getTitleField();
  const subtitleKey = getSubtitleField();

  return (
    <div className="space-y-5">
      <SectionHeader
        title={sectionTitle || definition.defaultTitle}
        subtitle={`Add your ${definition.itemNamePlural}`}
        icon={icon}
      />

      <div className="space-y-4">
        {items.map((item, index) => (
          <ItemCard
            key={item.id || index}
            onDelete={() => removeItem(index)}
            index={index}
            icon={icon}
            title={item[titleKey] || undefined}
            subtitle={subtitleKey ? item[subtitleKey] || undefined : undefined}
            isExpanded={expandedItems.has(index)}
            onToggle={() => toggleItem(index)}
          >
            <div className="space-y-5">
              {/* Two-column grid for compact fields */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                {definition.formFields
                  .filter(shouldShowField)
                  .filter(f => !isFullWidth(f))
                  .map((field) => (
                    <div key={field.key}>
                      {renderField(field, item, index)}
                    </div>
                  ))}
              </div>

              {/* Full-width fields (textarea, array/bullets) */}
              {definition.formFields
                .filter(shouldShowField)
                .filter(f => isFullWidth(f))
                .map((field) => (
                  <div key={field.key}>
                    {renderField(field, item, index)}
                  </div>
                ))}
            </div>
          </ItemCard>
        ))}

        {/* Add New Item Button */}
        <button
          type="button"
          onClick={addItem}
          className="w-full h-14 flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-all duration-200 group"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-blue-100"
            style={{ backgroundColor: `${WEBSITE_THEME_COLOR}10` }}
          >
            <Plus className="w-5 h-5" style={{ color: WEBSITE_THEME_COLOR }} />
          </div>
          <span className="text-base font-medium" style={{ color: WEBSITE_THEME_COLOR }}>
            Add {definition.itemName}
          </span>
        </button>
      </div>
    </div>
  );
};

// Bullet points editor component
const BulletPointsEditor: React.FC<{
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}> = ({ items, onChange, placeholder }) => {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-3 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 shadow-sm group hover:border-gray-200 transition-colors"
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${WEBSITE_THEME_COLOR}15` }}
              >
                <span className="text-sm font-medium" style={{ color: WEBSITE_THEME_COLOR }}>{index + 1}</span>
              </div>
              <Input
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="h-9 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 text-base"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="h-8 w-8 p-0 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-gray-100">
          <Plus className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder || 'Add bullet point...'}
          className="h-10 flex-1 border-gray-200 bg-white text-base"
        />
        <Button
          size="sm"
          onClick={addItem}
          disabled={!newItem.trim()}
          className="h-10 px-4 rounded-lg text-sm"
          style={{ backgroundColor: newItem.trim() ? WEBSITE_THEME_COLOR : undefined }}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-2">
          Press Enter to add each item
        </p>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const EnhancedForm: React.FC<EnhancedFormProps> = ({
  resumeData,
  onResumeDataChange,
  enabledSections,
  sectionTitles = {},
  templateConfig,
  accentColor = '#2563eb',
  onOpenAddSection,
  hideHeader = false,
}) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // Collapsed by default
  const contentRef = useRef<HTMLDivElement>(null);

  // Build navigation items from enabled sections
  const navItems: NavItem[] = [
    ...STATIC_NAV_ITEMS,
    ...enabledSections
      .filter(s => s.enabled && s.type !== 'header' && s.type !== 'summary')
      .sort((a, b) => a.order - b.order)
      .map(s => ({
        id: s.type,
        label: sectionTitles[s.type] || s.type.charAt(0).toUpperCase() + s.type.slice(1),
        icon: SECTION_ICONS[s.type] || FileText,
        type: 'dynamic' as const,
        dataKey: s.type,
      }))
  ];

  // Update personal info
  const updatePersonalInfo = useCallback((field: string, value: any) => {
    onResumeDataChange({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  }, [resumeData, onResumeDataChange]);

  // Update section data
  const updateSection = useCallback((dataKey: string, data: any) => {
    onResumeDataChange({ ...resumeData, [dataKey]: data });
  }, [resumeData, onResumeDataChange]);

  // Scroll to top when section changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  // Find current section index for navigation
  const currentIndex = navItems.findIndex(item => item.id === activeSection);
  const canGoNext = currentIndex < navItems.length - 1;
  const canGoPrev = currentIndex > 0;

  const goToNext = () => {
    if (canGoNext) {
      setActiveSection(navItems[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (canGoPrev) {
      setActiveSection(navItems[currentIndex - 1].id);
    }
  };

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalSection
            data={resumeData.personalInfo || {}}
            onChange={updatePersonalInfo}
          />
        );
      case 'socialLinks':
        return (
          <SocialLinksSection
            data={resumeData.personalInfo || {}}
            onChange={updatePersonalInfo}
          />
        );
      case 'photo':
        return (
          <PhotoSection
            data={resumeData.personalInfo || {}}
            onChange={updatePersonalInfo}
          />
        );
      default:
        // Dynamic sections (experience, education, etc.)
        const sectionConfig = enabledSections.find(s => s.type === activeSection);
        if (sectionConfig) {
          return (
            <ListSection
              sectionType={activeSection as V2SectionType}
              data={resumeData[activeSection] || []}
              onChange={(data) => updateSection(activeSection, data)}
              sectionTitle={sectionTitles[activeSection]}
              templateConfig={templateConfig}
            />
          );
        }
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header - Desktop only, hidden when hideHeader is true */}
      {!hideHeader && (
        <div className="hidden lg:flex items-center gap-2 p-3 border-b border-gray-100 flex-shrink-0">
          <FileText className="w-5 h-5" style={{ color: WEBSITE_THEME_COLOR }} />
          <div>
            <h2 className="text-base font-semibold text-gray-900">Edit Content</h2>
            <p className="text-xs text-gray-500">Changes sync in real-time</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Navigation Rail */}
        <div
          className={cn(
            "hidden lg:flex flex-col border-r border-gray-100 bg-gray-50/50 transition-all duration-300 flex-shrink-0",
            isNavCollapsed ? "w-14" : "w-56"
          )}
        >
          {/* Nav Header */}
          <div className={cn(
            "p-2 border-b border-gray-100 flex items-center",
            isNavCollapsed ? "justify-center" : "justify-between px-3"
          )}>
            {!isNavCollapsed && (
              <span className="text-sm font-semibold text-gray-700">Sections</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              {isNavCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto py-2 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                title={isNavCollapsed ? item.label : undefined}
                className={cn(
                  "w-full flex items-center gap-3 py-2.5 rounded-lg transition-all duration-200 mb-0.5",
                  "hover:bg-white hover:shadow-sm",
                  isActive && "bg-white shadow-sm",
                  isNavCollapsed ? "justify-center px-2" : "px-3"
                )}
                style={isActive ? { borderLeft: `3px solid ${WEBSITE_THEME_COLOR}` } : {}}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    isActive ? "text-current" : "text-gray-400"
                  )}
                  style={isActive ? { color: WEBSITE_THEME_COLOR } : {}}
                />
                {!isNavCollapsed && (
                  <span className={cn(
                    "text-sm truncate transition-colors",
                    isActive ? "font-medium text-gray-900" : "text-gray-600"
                  )}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Add Section Button */}
        {onOpenAddSection && (
          <div className={cn(
            "border-t border-gray-100",
            isNavCollapsed ? "p-2 flex justify-center" : "p-3"
          )}>
            {isNavCollapsed ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenAddSection}
                className="h-9 w-9 p-0"
                title="Add Section"
              >
                <Plus className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenAddSection}
                className="w-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden w-full flex flex-col h-full overflow-hidden">
        {/* Horizontal Tabs */}
        <div className="flex-shrink-0 flex overflow-x-auto border-b border-gray-100 bg-gray-50/50 p-2 gap-1 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all",
                  "text-sm",
                  isActive
                    ? "bg-white shadow-sm font-medium"
                    : "text-gray-500 hover:bg-white/50"
                )}
                style={isActive ? { color: WEBSITE_THEME_COLOR } : {}}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-3">
          {renderSectionContent()}
        </div>

        {/* Mobile Navigation Footer - Fixed at bottom */}
        <div className="flex-shrink-0 flex items-center justify-between p-3 border-t border-gray-100 bg-white">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrev}
            disabled={!canGoPrev}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium" style={{ color: WEBSITE_THEME_COLOR }}>
              {currentIndex + 1}
            </span>
            <span>/</span>
            <span>{navItems.length}</span>
          </div>

          <Button
            size="sm"
            onClick={goToNext}
            disabled={!canGoNext}
            className="gap-2"
            style={{ backgroundColor: WEBSITE_THEME_COLOR }}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Desktop Content Area */}
      <div className="hidden lg:flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Scrollable Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-3xl">
            {renderSectionContent()}
          </div>
        </div>

        {/* Desktop Navigation Footer - Fixed at bottom */}
        <div className="flex-shrink-0 bg-white border-t border-gray-100 p-3">
          <div className="flex items-center justify-between max-w-2xl">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              disabled={!canGoPrev}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium" style={{ color: WEBSITE_THEME_COLOR }}>
                {currentIndex + 1}
              </span>
              <span>/</span>
              <span>{navItems.length}</span>
            </div>

            <Button
              size="sm"
              onClick={goToNext}
              disabled={!canGoNext}
              className="gap-2"
              style={{ backgroundColor: WEBSITE_THEME_COLOR }}
            >
              Next: {canGoNext ? navItems[currentIndex + 1]?.label : 'Done'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      </div>{/* End Main Content Area */}
    </div>
  );
};

export default EnhancedForm;
