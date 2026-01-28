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
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  ChevronDown,
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
  Palette,
  Eye,
  EyeOff,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MonthYearPicker } from '@/components/ui/month-year-picker';
import {
  getSectionDefinition,
  type FormFieldDefinition,
} from '../../registry/sectionRegistry';
import type { V2SectionType } from '../../types/resumeData';
import type { TemplateSectionConfig } from '../../types/templateConfig';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

// ============================================================================
// TYPES
// ============================================================================

interface VariantOption {
  id: string;
  name: string;
  description: string;
}

interface EnhancedFormProps {
  resumeData: any;
  onResumeDataChange: (data: any) => void;
  enabledSections: TemplateSectionConfig[];
  sectionTitles?: Record<string, string>;
  templateConfig?: any;
  accentColor?: string;
  onOpenAddSection?: () => void;
  hideHeader?: boolean;
  /** Section overrides containing variant info */
  sectionOverrides?: Record<string, any>;
  /** Callback when variant is changed */
  onChangeSectionVariant?: (sectionId: string, variantId: string) => void;
  /** Available variants per section type */
  sectionVariants?: Record<string, VariantOption[]>;
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
}> = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: `${WEBSITE_THEME_COLOR}12` }}
    >
      <Icon className="w-4 h-4" style={{ color: WEBSITE_THEME_COLOR }} />
    </div>
    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
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
  dragHandleProps?: any;
  isDragging?: boolean;
}> = ({ children, onDelete, className, index, icon: Icon, title, subtitle, isExpanded = true, onToggle, dragHandleProps, isDragging }) => (
  <div className={cn(
    "relative rounded-xl border-2 bg-white shadow-sm transition-all duration-200",
    isExpanded ? "border-blue-200 shadow-md" : "border-gray-100 hover:border-gray-200",
    isDragging && "shadow-lg border-blue-300",
    className
  )}>
    {/* Card Header - Clickable to toggle */}
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 select-none transition-colors",
        isExpanded ? "border-b border-gray-100" : ""
      )}
      style={{ background: isExpanded
        ? 'linear-gradient(135deg, rgba(8, 145, 178, 0.06) 0%, rgba(8, 145, 178, 0.02) 100%)'
        : 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)'
      }}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Drag Handle with grip icon */}
        {typeof index === 'number' && dragHandleProps && (
          <div
            {...dragHandleProps}
            className="flex items-center justify-center w-6 h-8 rounded-md cursor-grab active:cursor-grabbing touch-none text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        )}
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
        {/* Title/Subtitle Preview - Clickable to toggle */}
        <div 
          className="min-w-0 flex-1 cursor-pointer"
          onClick={onToggle}
        >
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
            "w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 cursor-pointer",
            isExpanded && "rotate-90"
          )}
          onClick={onToggle}
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

// Sortable wrapper for ItemCard
interface SortableItemCardProps {
  id: string;
  children: React.ReactNode;
  onDelete?: () => void;
  index?: number;
  icon?: React.ElementType;
  title?: string;
  subtitle?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const SortableItemCard: React.FC<SortableItemCardProps> = ({
  id,
  children,
  onDelete,
  index,
  icon,
  title,
  subtitle,
  isExpanded,
  onToggle,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn(isDragging && 'opacity-50 z-50')}>
      <ItemCard
        onDelete={onDelete}
        index={index}
        icon={icon}
        title={title}
        subtitle={subtitle}
        isExpanded={isExpanded}
        onToggle={onToggle}
        dragHandleProps={{ ...attributes, ...listeners }}
        isDragging={isDragging}
      >
        {children}
      </ItemCard>
    </div>
  );
};

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

const PersonalSection: React.FC<{
  data: any;
  onChange: (field: string, value: any) => void;
}> = ({ data, onChange }) => {
  // Parse fullName into first and last name parts
  // Use local state to allow spaces in first name
  const parseFullName = (fullName: string) => {
    if (!fullName) return { first: '', last: '' };
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return { first: parts[0], last: '' };
    // Last word is last name, everything else is first name
    const last = parts[parts.length - 1];
    const first = parts.slice(0, -1).join(' ');
    return { first, last };
  };

  const initialParsed = parseFullName(data.fullName || '');
  const [firstName, setFirstName] = useState(initialParsed.first);
  const [lastName, setLastName] = useState(initialParsed.last);

  // Sync local state when fullName changes externally (e.g., from profile sync)
  useEffect(() => {
    const parsed = parseFullName(data.fullName || '');
    // Only update if local values don't match (to avoid overwriting during typing)
    const currentFullName = `${firstName} ${lastName}`.trim();
    if (data.fullName && data.fullName !== currentFullName) {
      setFirstName(parsed.first);
      setLastName(parsed.last);
    }
  }, [data.fullName]);

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    onChange('fullName', `${value} ${lastName}`.trim());
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    onChange('fullName', `${firstName} ${value}`.trim());
  };

  return (
  <div className="space-y-5">
    <SectionHeader
      title="Personal Details"
      subtitle="Your basic contact information"
      icon={User}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField label="First Name" required>
        <Input
          value={firstName}
          onChange={(e) => handleFirstNameChange(e.target.value)}
          placeholder="John"
          className="h-11 text-base"
        />
      </FormField>

      <FormField label="Last Name" required>
        <Input
          value={lastName}
          onChange={(e) => handleLastNameChange(e.target.value)}
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
        className="min-h-[120px] resize-none text-base md:text-sm leading-relaxed"
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
};

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
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const styleOptionsContext = useStyleOptions();
  const showPhoto = styleOptionsContext?.styleOptions?.showPhoto ?? true;
  const updateStyleOption = styleOptionsContext?.updateStyleOption;

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Profile Photo"
        subtitle="Add a professional photo to your resume"
        icon={Camera}
      />

      <div className="mx-4 space-y-4">
        {/* Visibility Toggle Card */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Photo Visibility</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {showPhoto ? 'Photo will appear on resume' : 'Photo is hidden'}
              </p>
            </div>
            <Switch
              checked={showPhoto}
              onCheckedChange={(checked) => {
                if (updateStyleOption) {
                  updateStyleOption('showPhoto', checked);
                }
              }}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {showPhoto && (
          <div className="space-y-4">
            {/* Photo Preview Area */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Photo Container */}
                <div
                  className={cn(
                    "relative w-36 h-36 rounded-xl overflow-hidden group",
                    data.photo
                      ? "shadow-sm"
                      : "border-2 border-dashed border-gray-300 bg-gray-50"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {data.photo ? (
                    <>
                      <img
                        src={data.photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => onChange('photo', '')}
                          className="bg-red-500 text-white px-4 py-1.5 rounded-md text-xs font-medium hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={cn(
                      "w-full h-full flex flex-col items-center justify-center transition-colors",
                      isDragging && "bg-primary/5 border-primary"
                    )}>
                      <Camera className={cn(
                        "h-10 w-10 mb-2 transition-colors",
                        isDragging ? "text-primary" : "text-gray-400"
                      )} />
                      <span className="text-xs font-medium text-gray-500">
                        {isDragging ? 'Drop photo here' : 'No photo uploaded'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload Methods */}
                <div className="w-full space-y-3">
                  {/* Method Selector Tabs */}
                  <div className="flex rounded-lg bg-gray-100 p-1">
                    <button
                      type="button"
                      onClick={() => setUploadMethod('file')}
                      className={cn(
                        "flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all",
                        uploadMethod === 'file'
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod('url')}
                      className={cn(
                        "flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all",
                        uploadMethod === 'url'
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      From URL
                    </button>
                  </div>

                  {/* Upload Content */}
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

                  {uploadMethod === 'file' ? (
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose from Computer
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="Enter image URL..."
                        className="h-9 text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && photoUrl) {
                            onChange('photo', photoUrl);
                            setPhotoUrl('');
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          if (photoUrl) {
                            onChange('photo', photoUrl);
                            setPhotoUrl('');
                          }
                        }}
                        disabled={!photoUrl}
                        size="sm"
                        className="px-6"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-gray-500 text-center px-4">
              💡 Tip: Use a professional headshot for best results. Supported formats: JPG, PNG, WebP (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Variants that require rating input (these show proficiency levels)
const RATING_VARIANTS = ['bars', 'dots', 'detailed'];
// Variants that need category/grouping support
const CATEGORY_VARIANTS = ['table', 'grouped', 'category-lines'];
// Variants that need description field (for strengths)
const DESCRIPTION_VARIANTS = ['cards', 'grid', 'accent-border'];
// Variants that need description field for interests
const INTERESTS_DESCRIPTION_VARIANTS = ['detailed'];
// Section types that can use simple chips UI
const SIMPLE_SECTION_TYPES = ['skills', 'interests', 'strengths'];

// Rating level options with labels
const RATING_LEVELS = [
  { level: 5, label: 'Expert', shortLabel: '5' },
  { level: 4, label: 'Advanced', shortLabel: '4' },
  { level: 3, label: 'Intermediate', shortLabel: '3' },
  { level: 2, label: 'Basic', shortLabel: '2' },
  { level: 1, label: 'Beginner', shortLabel: '1' },
];

// Skill Chip component with optional inline rating
const SkillChip: React.FC<{
  item: any;
  index: number;
  showRating: boolean;
  onUpdateRating: (rating: number) => void;
  onRemove: () => void;
  accentColor: string;
}> = ({ item, index, showRating, onUpdateRating, onRemove, accentColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRatingPicker, setShowRatingPicker] = useState(false);
  const currentRating = item.level || 3;
  const currentLabel = RATING_LEVELS.find(r => r.level === currentRating)?.label || 'Intermediate';

  // Render dots for rating display
  const renderRatingDots = () => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className="w-1.5 h-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: level <= currentRating ? accentColor : `${accentColor}30`
            }}
          />
        ))}
      </div>
    );
  };

  // Render rating picker dropdown
  const renderRatingPicker = () => {
    if (!showRatingPicker) return null;

    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowRatingPicker(false)}
        />
        {/* Dropdown */}
        <div className="absolute top-full right-0 mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[140px]">
          <div className="px-2.5 py-1.5 border-b border-gray-100">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Skill Level</span>
          </div>
          {RATING_LEVELS.map((option) => (
            <button
              key={option.level}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateRating(option.level);
                setShowRatingPicker(false);
              }}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-2.5 py-2 text-left text-xs transition-colors",
                currentRating === option.level 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <span className={cn(
                "font-medium",
                currentRating === option.level && "text-blue-700"
              )}>
                {option.label}
              </span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: dot <= option.level ? accentColor : `${accentColor}25`
                    }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all group"
      style={{
        backgroundColor: `${accentColor}15`,
        color: accentColor
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{item.name || item.title || `Item ${index + 1}`}</span>

      {/* Rating indicator - clickable dropdown trigger */}
      {showRating && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowRatingPicker(!showRatingPicker);
          }}
          className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer ml-0.5"
          title={`${currentLabel} - Click to change`}
        >
          {renderRatingDots()}
        </button>
      )}

      {/* Remove button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center transition-all ml-0.5",
          isHovered ? "opacity-100" : "opacity-0",
          "hover:bg-red-100 hover:text-red-500"
        )}
      >
        <X className="w-3 h-3" />
      </button>

      {/* Rating picker dropdown */}
      {showRating && renderRatingPicker()}
    </div>
  );
};

// Skills with Categories Editor (for Table/Grouped variants)
const SkillsWithCategoriesEditor: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
  itemName: string;
  itemNamePlural: string;
  accentColor: string;
}> = ({ items, onChange, itemName, itemNamePlural, accentColor }) => {
  // Track input per category to avoid shared state issues
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});
  const [newCategory, setNewCategory] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  // Group items by category
  const grouped = React.useMemo(() => {
    const order: string[] = [];
    const groups: Record<string, any[]> = {};

    items.forEach((item) => {
      const category = item.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
        order.push(category);
      }
      groups[category].push(item);
    });

    return { order, groups };
  }, [items]);

  const getSkillInput = (category: string) => skillInputs[category] || '';

  const setSkillInput = (category: string, value: string) => {
    setSkillInputs(prev => ({ ...prev, [category]: value }));
  };

  const handleAddSkill = (category: string) => {
    const skillName = getSkillInput(category);
    if (!skillName.trim()) return;
    const newItem = {
      id: crypto.randomUUID(),
      name: skillName.trim(),
      category: category,
      level: 3
    };
    onChange([...items, newItem]);
    setSkillInput(category, '');
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    // Just create the category - user will add skills via the input
    // We need at least one item to show the category, so add a placeholder
    // but filter it out in display
    const newItem = {
      id: crypto.randomUUID(),
      name: '', // Empty - will be filtered in display and preview
      category: newCategory.trim(),
      level: 3
    };
    onChange([...items, newItem]);
    setNewCategory('');
  };

  const handleRemoveSkill = (skillId: string) => {
    onChange(items.filter(item => item.id !== skillId));
  };

  const handleUpdateCategory = (oldCategory: string, newCategoryName: string) => {
    if (!newCategoryName.trim()) return;
    onChange(items.map(item =>
      item.category === oldCategory
        ? { ...item, category: newCategoryName.trim() }
        : item
    ));
    setEditingCategoryId(null);
  };

  const handleRemoveCategory = (category: string) => {
    onChange(items.filter(item => item.category !== category));
  };

  return (
    <div className="space-y-4">
      {/* Category rows */}
      {grouped.order.map((category) => (
        <div
          key={category}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden"
        >
          {/* Category header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-gray-100"
            style={{ backgroundColor: `${accentColor}08` }}
          >
            {editingCategoryId === category ? (
              <Input
                defaultValue={category}
                autoFocus
                className="h-8 w-48 text-sm font-semibold"
                onBlur={(e) => handleUpdateCategory(category, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateCategory(category, e.currentTarget.value);
                  }
                  if (e.key === 'Escape') {
                    setEditingCategoryId(null);
                  }
                }}
              />
            ) : (
              <button
                onClick={() => setEditingCategoryId(category)}
                className="text-sm font-semibold hover:opacity-70 transition-opacity"
                style={{ color: accentColor }}
                title="Click to rename category"
              >
                {category}
              </button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveCategory(category)}
              className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
              title="Remove category"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Skills in this category */}
          <div className="p-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {grouped.groups[category].map((skill) => {
                const hasValidName = skill.name && skill.name.trim();
                // Show all skills so users can remove any, but style empty ones differently
                if (!hasValidName) return null; // Skip empty placeholder skills (category placeholders)
                return (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium group"
                    style={{
                      backgroundColor: `${accentColor}12`,
                      color: accentColor
                    }}
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-500 transition-all"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add skill to this category */}
            <div className="flex gap-2">
              <Input
                value={getSkillInput(category)}
                onChange={(e) => setSkillInput(category, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && getSkillInput(category).trim()) {
                    e.preventDefault();
                    handleAddSkill(category);
                  }
                }}
                placeholder={`Add ${itemName} to ${category}...`}
                className="h-9 text-sm flex-1"
              />
              <Button
                size="sm"
                onClick={() => handleAddSkill(category)}
                disabled={!getSkillInput(category).trim()}
                className="h-9 px-3"
                style={{ backgroundColor: getSkillInput(category).trim() ? accentColor : undefined }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Add new category */}
      <div className="flex gap-3">
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newCategory.trim()) {
              e.preventDefault();
              handleAddCategory();
            }
          }}
          placeholder="Add new category (e.g., Frontend, Backend, DevOps)..."
          className="h-11 text-base flex-1"
        />
        <Button
          onClick={handleAddCategory}
          disabled={!newCategory.trim()}
          className="h-11 px-5"
          style={{ backgroundColor: newCategory.trim() ? accentColor : undefined }}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </Button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">
          Add categories to organize your {itemNamePlural}
        </p>
      )}
    </div>
  );
};

// Strengths with Description Editor (for cards, grid, accent-border variants)
const StrengthsWithDescriptionEditor: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
  accentColor: string;
}> = ({ items, onChange, accentColor }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newItem = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      description: newDescription.trim() || '',
    };
    onChange([...items, newItem]);
    setNewTitle('');
    setNewDescription('');
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setEditTitle(item.title || '');
    setEditDescription(item.description || '');
  };

  const handleSaveEdit = (id: string) => {
    onChange(items.map(item =>
      item.id === id
        ? { ...item, title: editTitle.trim(), description: editDescription.trim() }
        : item
    ));
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  return (
    <div className="space-y-4">
      {/* Existing items */}
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => {
            const isEditing = editingId === item.id;

            if (isEditing) {
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border-2 border-blue-300 bg-blue-50/30"
                >
                  <div className="space-y-3">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Strength title"
                      className="h-10 text-base font-medium"
                      autoFocus
                    />
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Brief description (optional)"
                      className="h-10 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveEdit(item.id);
                        }
                        if (e.key === 'Escape') {
                          handleCancelEdit();
                        }
                      }}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelEdit}
                        className="h-8"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(item.id)}
                        disabled={!editTitle.trim()}
                        className="h-8"
                        style={{ backgroundColor: WEBSITE_THEME_COLOR }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="group flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors cursor-pointer"
                onClick={() => handleStartEdit(item)}
              >
                <div
                  className="w-2 h-full min-h-[40px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {item.title || 'Untitled'}
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {!item.description && (
                    <p className="text-sm text-gray-400 mt-0.5 italic">
                      Click to add description
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add new strength */}
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
        <div className="space-y-3">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newTitle.trim()) {
                e.preventDefault();
                // Focus description field instead of adding
                const descInput = document.getElementById('new-strength-desc');
                if (descInput) descInput.focus();
              }
            }}
            placeholder="Strength title (e.g., Leadership, Problem Solving)"
            className="h-11 text-base"
          />
          <Input
            id="new-strength-desc"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newTitle.trim()) {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Brief description (optional)"
            className="h-10 text-sm"
          />
          <Button
            onClick={handleAdd}
            disabled={!newTitle.trim()}
            className="w-full h-10"
            style={{ backgroundColor: newTitle.trim() ? accentColor : undefined }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Strength
          </Button>
        </div>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-2">
          Add your key strengths and competencies
        </p>
      )}
    </div>
  );
};

// Interests with Description Editor (for detailed variant)
const InterestsWithDescriptionEditor: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
  accentColor: string;
}> = ({ items, onChange, accentColor }) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newItem = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      description: newDescription.trim() || '',
    };
    onChange([...items, newItem]);
    setNewName('');
    setNewDescription('');
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setEditName(item.name || '');
    setEditDescription(item.description || '');
  };

  const handleSaveEdit = (id: string) => {
    onChange(items.map(item =>
      item.id === id
        ? { ...item, name: editName.trim(), description: editDescription.trim() }
        : item
    ));
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  };

  return (
    <div className="space-y-4">
      {/* Existing items */}
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => {
            const isEditing = editingId === item.id;

            if (isEditing) {
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border-2 border-blue-300 bg-blue-50/30"
                >
                  <div className="space-y-3">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Interest name"
                      className="h-10 text-base font-medium"
                      autoFocus
                    />
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Brief description (optional)"
                      className="h-10 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveEdit(item.id);
                        }
                        if (e.key === 'Escape') {
                          handleCancelEdit();
                        }
                      }}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelEdit}
                        className="h-8"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(item.id)}
                        disabled={!editName.trim()}
                        className="h-8"
                        style={{ backgroundColor: WEBSITE_THEME_COLOR }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="group flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors cursor-pointer"
                onClick={() => handleStartEdit(item)}
              >
                <Heart
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: accentColor }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {item.name || 'Untitled'}
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {!item.description && (
                    <p className="text-sm text-gray-400 mt-0.5 italic">
                      Click to add description
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add new interest */}
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
        <div className="space-y-3">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newName.trim()) {
                e.preventDefault();
                // Focus description field instead of adding
                const descInput = document.getElementById('new-interest-desc');
                if (descInput) descInput.focus();
              }
            }}
            placeholder="Interest name (e.g., Photography, Hiking)"
            className="h-11 text-base"
          />
          <Input
            id="new-interest-desc"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newName.trim()) {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Brief description (optional)"
            className="h-10 text-sm"
          />
          <Button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="w-full h-10"
            style={{ backgroundColor: newName.trim() ? accentColor : undefined }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Interest
          </Button>
        </div>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-2">
          Add your hobbies and personal interests
        </p>
      )}
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
  variants?: VariantOption[];
  currentVariant?: string;
  onChangeVariant?: (variantId: string) => void;
}> = ({ sectionType, data, onChange, sectionTitle, templateConfig, variants, currentVariant, onChangeVariant }) => {
  const definition = getSectionDefinition(sectionType);
  // Track which items are expanded - last item is expanded by default
  const [expandedItems, setExpandedItems] = useState<Set<number>>(() => {
    const items = data || [];
    // If there are items, expand the last one by default
    return new Set(items.length > 0 ? [items.length - 1] : []);
  });
  const [showVariantDropdown, setShowVariantDropdown] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  // Determine if we should use simple chips UI
  const isSimpleSectionType = SIMPLE_SECTION_TYPES.includes(sectionType);
  // Interests should NEVER show ratings - it's for hobbies, not skills
  const needsRating = sectionType === 'skills' && currentVariant ? RATING_VARIANTS.includes(currentVariant) : false;
  const needsCategory = sectionType === 'skills' && currentVariant ? CATEGORY_VARIANTS.includes(currentVariant) : false;
  const needsDescription = currentVariant ? DESCRIPTION_VARIANTS.includes(currentVariant) : false;
  const needsInterestsDescription = sectionType === 'interests' && currentVariant ? INTERESTS_DESCRIPTION_VARIANTS.includes(currentVariant) : false;
  // For strengths with description variants, use special editor; otherwise use simple chips
  const isStrengthsWithDescription = sectionType === 'strengths' && needsDescription;
  const isInterestsWithDescription = sectionType === 'interests' && needsInterestsDescription;
  const useSimpleChipsUI = isSimpleSectionType && !needsRating && !isStrengthsWithDescription && !isInterestsWithDescription;

  if (!definition) return null;

  // Get the primary field key for simple sections (e.g., 'name' for skills, 'title' for strengths)
  const primaryFieldKey = definition.formFields?.[0]?.key || 'name';

  const icon = SECTION_ICONS[sectionType] || FileText;
  const items = data || [];
  const showVariantSelector = variants && variants.length > 0 && onChangeVariant;

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

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  // Handle drag end for reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item: any) => item.id === active.id);
    const newIndex = items.findIndex((item: any) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      onChange(arrayMove(items, oldIndex, newIndex));
      // Update expanded items to follow the moved item
      setExpandedItems(prev => {
        const newSet = new Set<number>();
        prev.forEach(expandedIndex => {
          if (expandedIndex === oldIndex) {
            newSet.add(newIndex);
          } else if (oldIndex < newIndex) {
            // Moving down
            if (expandedIndex > oldIndex && expandedIndex <= newIndex) {
              newSet.add(expandedIndex - 1);
            } else {
              newSet.add(expandedIndex);
            }
          } else {
            // Moving up
            if (expandedIndex >= newIndex && expandedIndex < oldIndex) {
              newSet.add(expandedIndex + 1);
            } else {
              newSet.add(expandedIndex);
            }
          }
        });
        return newSet;
      });
    }
  };

  // Filter fields based on showWhenConfig and showForVariants
  const shouldShowField = (field: FormFieldDefinition) => {
    // Check showWhenConfig - evaluates dot-notation path against templateConfig
    if (field.showWhenConfig && templateConfig) {
      const parts = field.showWhenConfig.split('.');
      let value: any = templateConfig;
      for (const part of parts) {
        if (value === undefined || value === null) {
          // Path doesn't exist in config - hide the field
          return false;
        }
        value = value[part];
      }
      // Hide field if config value is false or undefined (not explicitly enabled)
      if (value !== true) {
        return false;
      }
    }

    // Check showForVariants - field only shows for specific variants
    if (field.showForVariants && field.showForVariants.length > 0) {
      // If no variant is selected, don't show variant-specific fields
      if (!currentVariant) {
        return false;
      }
      // Check if current variant is in the allowed list
      if (!field.showForVariants.includes(currentVariant)) {
        return false;
      }
    }

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

      {/* Variant Selector */}
      {showVariantSelector && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Display Style</span>
          <div className="relative">
            <button
              onClick={() => setShowVariantDropdown(!showVariantDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 bg-white transition-colors"
              style={{ color: WEBSITE_THEME_COLOR }}
            >
              <Palette className="w-4 h-4" />
              <span>{variants?.find(v => v.id === currentVariant)?.name || 'Default'}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showVariantDropdown && "rotate-180")} />
            </button>
            {showVariantDropdown && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {variants?.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      onChangeVariant?.(variant.id);
                      setShowVariantDropdown(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 text-sm transition-colors flex items-center justify-between",
                      currentVariant === variant.id ? "bg-gray-50" : "hover:bg-gray-50"
                    )}
                  >
                    <div>
                      <div className="font-medium text-gray-900">{variant.name}</div>
                      <div className="text-xs text-gray-500">{variant.description}</div>
                    </div>
                    {currentVariant === variant.id && (
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: WEBSITE_THEME_COLOR }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skills/Interests/Strengths UI - adapts based on variant */}
      {isSimpleSectionType ? (
        needsCategory ? (
          /* Table/Grouped variant - needs category support */
          <SkillsWithCategoriesEditor
            items={items}
            onChange={onChange}
            itemName={definition.itemName}
            itemNamePlural={definition.itemNamePlural}
            accentColor={WEBSITE_THEME_COLOR}
          />
        ) : isStrengthsWithDescription ? (
          /* Strengths with description - cards, grid, accent-border variants */
          <StrengthsWithDescriptionEditor
            items={items}
            onChange={onChange}
            accentColor={WEBSITE_THEME_COLOR}
          />
        ) : isInterestsWithDescription ? (
          /* Interests with description - detailed variant */
          <InterestsWithDescriptionEditor
            items={items}
            onChange={onChange}
            accentColor={WEBSITE_THEME_COLOR}
          />
        ) : (
          /* Simple chips UI for other variants */
          <div className="space-y-4">
            {/* Quick Add Input */}
            <div className="flex gap-3">
              <Input
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newSkillName.trim()) {
                    e.preventDefault();
                    const newItem: any = {
                      id: crypto.randomUUID(),
                      [primaryFieldKey]: newSkillName.trim(),
                      level: 3
                    };
                    onChange([...items, newItem]);
                    setNewSkillName('');
                  }
                }}
                placeholder={`Add ${definition.itemName}...`}
                className="h-11 text-base flex-1"
              />
              <Button
                onClick={() => {
                  if (newSkillName.trim()) {
                    const newItem: any = {
                      id: crypto.randomUUID(),
                      [primaryFieldKey]: newSkillName.trim(),
                      level: 3
                    };
                    onChange([...items, newItem]);
                    setNewSkillName('');
                  }
                }}
                disabled={!newSkillName.trim()}
                className="h-11 px-5"
                style={{ backgroundColor: newSkillName.trim() ? WEBSITE_THEME_COLOR : undefined }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>

            {/* Hint for rating variants - only for skills */}
            {needsRating && sectionType === 'skills' && items.length > 0 && (
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-[10px] font-medium">?</span>
                <span>Click on the dots next to a skill to change its proficiency level</span>
              </p>
            )}

            {/* Chips Display */}
            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-gray-50/80 border border-gray-100 min-h-[80px]">
              {items.length === 0 ? (
                <p className="text-sm text-gray-400 w-full text-center py-4">
                  Type above and press Enter to add {definition.itemNamePlural}
                </p>
              ) : (
                items.map((item, index) => (
                  <SkillChip
                    key={item.id || index}
                    item={item}
                    index={index}
                    showRating={needsRating}
                    onUpdateRating={(rating) => updateItem(index, 'level', rating)}
                    onRemove={() => removeItem(index)}
                    accentColor={WEBSITE_THEME_COLOR}
                  />
                ))
              )}
            </div>
          </div>
        )
      ) : (
        /* Standard Accordion UI for other sections with drag-and-drop */
        <div className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item: any) => item.id || `item-${items.indexOf(item)}`)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item, index) => (
                <SortableItemCard
                  key={item.id || index}
                  id={item.id || `item-${index}`}
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
                </SortableItemCard>
              ))}
            </SortableContext>
          </DndContext>

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
      )}
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
    <div className="space-y-2">
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 group"
            >
              <span
                className="text-xs font-medium mt-2.5 w-4 text-center flex-shrink-0"
                style={{ color: WEBSITE_THEME_COLOR }}
              >
                {index + 1}.
              </span>
              <Textarea
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                rows={2}
                className="flex-1 text-sm resize-none min-h-[56px] border-gray-200 focus:border-primary/50 rounded-lg bg-gray-50/50 focus:bg-white transition-colors"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="h-7 w-7 p-0 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity mt-1.5"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-start gap-2 pt-1">
        <span className="text-xs text-gray-400 mt-2.5 w-4 text-center flex-shrink-0">+</span>
        <Textarea
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder || 'Add bullet point...'}
          rows={2}
          className="flex-1 text-sm resize-none min-h-[56px] border-gray-200 rounded-lg"
        />
        <Button
          size="sm"
          onClick={addItem}
          disabled={!newItem.trim()}
          className="h-8 px-3 rounded-lg text-xs mt-1.5"
          style={{ backgroundColor: newItem.trim() ? WEBSITE_THEME_COLOR : undefined }}
        >
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
  sectionOverrides = {},
  onChangeSectionVariant,
  sectionVariants = {},
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
          const variants = sectionVariants[activeSection] || [];
          const sectionTypeConfig = templateConfig?.[activeSection];
          const currentVariant = sectionOverrides[sectionConfig.id]?.variant || sectionTypeConfig?.variant;
          const showVariantSelector = variants.length > 0 && onChangeSectionVariant && activeSection !== 'header' && activeSection !== 'summary';

          return (
            <ListSection
              sectionType={activeSection as V2SectionType}
              data={resumeData[activeSection] || []}
              onChange={(data) => updateSection(activeSection, data)}
              sectionTitle={sectionTitles[activeSection]}
              templateConfig={templateConfig}
              variants={showVariantSelector ? variants : undefined}
              currentVariant={currentVariant}
              onChangeVariant={showVariantSelector ? (variantId) => onChangeSectionVariant(sectionConfig.id, variantId) : undefined}
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
