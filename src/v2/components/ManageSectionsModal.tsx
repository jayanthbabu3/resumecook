/**
 * Manage Sections Modal
 *
 * Unified modal for managing resume sections:
 * - Toggle section visibility
 * - Drag-to-reorder sections
 * - Add new sections
 * - Change section variants
 * - Rename section labels
 */

import React, { useState, useEffect, useMemo } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  GripVertical,
  Plus,
  Settings,
  Check,
  X,
  Edit2,
  ChevronRight,
  Sparkles,
  Award,
  BookOpen,
  Users,
  Mic,
  FileText,
  Heart,
  UserCheck,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Languages,
  Trophy,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ADDABLE_SECTIONS, type SectionTypeInfo } from './AddSectionModal';
import type { SectionConfig, SectionType } from '../types';

// Section type to icon mapping
const sectionIcons: Record<string, React.ReactNode> = {
  experience: <Briefcase className="w-4 h-4" />,
  education: <GraduationCap className="w-4 h-4" />,
  skills: <Award className="w-4 h-4" />,
  summary: <FileText className="w-4 h-4" />,
  projects: <FolderOpen className="w-4 h-4" />,
  certifications: <Trophy className="w-4 h-4" />,
  languages: <Languages className="w-4 h-4" />,
  achievements: <Target className="w-4 h-4" />,
  awards: <Award className="w-4 h-4" />,
  publications: <BookOpen className="w-4 h-4" />,
  volunteer: <Users className="w-4 h-4" />,
  speaking: <Mic className="w-4 h-4" />,
  patents: <FileText className="w-4 h-4" />,
  references: <UserCheck className="w-4 h-4" />,
  courses: <GraduationCap className="w-4 h-4" />,
  interests: <Heart className="w-4 h-4" />,
  strengths: <Sparkles className="w-4 h-4" />,
  custom: <Plus className="w-4 h-4" />,
};

interface SortableSectionItemProps {
  section: SectionConfig & { enabled: boolean };
  isEditing: boolean;
  editValue: string;
  onToggle: () => void;
  onStartEdit: () => void;
  onSaveEdit: (value: string) => void;
  onCancelEdit: () => void;
  onEditChange: (value: string) => void;
  onOpenVariants: () => void;
  hasVariants: boolean;
  themeColor: string;
  sectionLabel?: string;
}

const SortableSectionItem: React.FC<SortableSectionItemProps> = ({
  section,
  isEditing,
  editValue,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditChange,
  onOpenVariants,
  hasVariants,
  themeColor,
  sectionLabel,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const icon = sectionIcons[section.type || section.id] || <FileText className="w-4 h-4" />;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 p-2.5 rounded-lg border transition-all group',
        section.enabled
          ? 'bg-white border-gray-200 shadow-sm'
          : 'bg-gray-50 border-gray-100 opacity-60',
        isDragging && 'opacity-50 shadow-lg z-50'
      )}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Toggle Switch */}
      <Switch
        checked={section.enabled}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary flex-shrink-0"
      />

      {/* Icon */}
      <div
        className={cn(
          'w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0',
          section.enabled ? 'text-white' : 'bg-gray-200 text-gray-500'
        )}
        style={section.enabled ? { backgroundColor: themeColor } : {}}
      >
        {icon}
      </div>

      {/* Label - Editable */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-1">
          <Input
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            className="h-7 text-sm"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSaveEdit(editValue);
              } else if (e.key === 'Escape') {
                onCancelEdit();
              }
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            onClick={() => onSaveEdit(editValue)}
          >
            <Check className="w-3 h-3 text-green-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            onClick={onCancelEdit}
          >
            <X className="w-3 h-3 text-red-600" />
          </Button>
        </div>
      ) : (
        <>
          <span className="flex-1 text-sm font-medium text-gray-800 truncate">
            {sectionLabel || section.title}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onStartEdit}
          >
            <Edit2 className="w-3 h-3 text-gray-500" />
          </Button>
        </>
      )}

      {/* Variant Settings Button */}
      {hasVariants && (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onOpenVariants}
          title="Change style"
        >
          <Settings className="w-3.5 h-3.5 text-gray-500" />
        </Button>
      )}

      {/* Column Badge */}
      <span className="text-xs text-gray-400 capitalize flex-shrink-0 hidden sm:inline">
        {section.column || 'main'}
      </span>
    </div>
  );
};

interface VariantSelectorProps {
  sectionId: string;
  sectionType: string;
  currentVariant?: string;
  variants: { id: string; name: string; description: string }[];
  onSelect: (variantId: string) => void;
  onClose: () => void;
  themeColor: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  sectionId,
  sectionType,
  currentVariant,
  variants,
  onSelect,
  onClose,
  themeColor,
}) => {
  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">
          Choose Style for {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
        </h4>
        <Button size="sm" variant="ghost" onClick={onClose} className="h-7 w-7 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => {
              onSelect(variant.id);
              onClose();
            }}
            className={cn(
              'p-3 rounded-lg border-2 text-left transition-all',
              currentVariant === variant.id
                ? 'border-current shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            )}
            style={currentVariant === variant.id ? { borderColor: themeColor } : {}}
          >
            <div
              className={cn(
                'font-medium text-sm',
                currentVariant === variant.id ? '' : 'text-gray-900'
              )}
              style={currentVariant === variant.id ? { color: themeColor } : {}}
            >
              {variant.name}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{variant.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface ManageSectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: (SectionConfig & { enabled: boolean })[];
  enabledSections: string[];
  sectionLabels: Record<string, string>;
  sectionOverrides: Record<string, any>;
  onToggleSection: (sectionId: string) => void;
  onReorderSections: (mainIds: string[], sidebarIds: string[], pageBreaks: Record<string, boolean>) => void;
  onUpdateLabel: (sectionId: string, label: string) => void;
  onChangeVariant: (sectionId: string, variantId: string) => void;
  onAddSection: (sectionType: string, variant: string, column: 'main' | 'sidebar') => void;
  themeColor?: string;
  layoutType?: 'single-column' | 'two-column-left' | 'two-column-right';
}

export const ManageSectionsModal: React.FC<ManageSectionsModalProps> = ({
  isOpen,
  onClose,
  sections,
  enabledSections,
  sectionLabels,
  sectionOverrides,
  onToggleSection,
  onReorderSections,
  onUpdateLabel,
  onChangeVariant,
  onAddSection,
  themeColor = '#0891b2',
  layoutType = 'single-column',
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  // Local state for drag-and-drop ordering
  const [mainIds, setMainIds] = useState<string[]>([]);
  const [sidebarIds, setSidebarIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [variantSectionId, setVariantSectionId] = useState<string | null>(null);

  // Build section variants map
  const sectionVariantsMap = useMemo(() => {
    const map: Record<string, { id: string; name: string; description: string }[]> = {};
    ADDABLE_SECTIONS.forEach((section) => {
      if (section.variants && section.variants.length > 0) {
        map[section.id] = section.variants;
      }
    });
    return map;
  }, []);

  // Build a complete list of all available sections, merging with existing ones
  const allSections = useMemo(() => {
    const existingMap: Record<string, SectionConfig & { enabled: boolean }> = {};
    sections.forEach((s) => (existingMap[s.id] = s));

    // Create sections for all addable types (except 'custom' which can have multiple)
    return ADDABLE_SECTIONS
      .filter((s) => s.id !== 'custom') // Exclude custom sections from default list
      .map((addable) => {
        if (existingMap[addable.id]) {
          return existingMap[addable.id];
        }
        // Create a new section config for ones that don't exist yet
        return {
          id: addable.id,
          type: addable.id as SectionType,
          title: addable.name,
          defaultTitle: addable.name,
          enabled: false,
          column: 'main' as const,
          order: 999, // Put new sections at the end
          variant: addable.variants[0]?.id || 'standard',
        };
      });
  }, [sections]);

  // Build section map for quick lookups (includes all sections)
  const sectionMap = useMemo(() => {
    const map: Record<string, SectionConfig & { enabled: boolean }> = {};
    allSections.forEach((s) => (map[s.id] = s));
    // Also include existing sections that might not be in ADDABLE_SECTIONS
    sections.forEach((s) => (map[s.id] = s));
    return map;
  }, [allSections, sections]);

  // Track which sections already exist in the resume
  const existingSectionIds = useMemo(() => {
    return new Set(sections.map((s) => s.id));
  }, [sections]);

  // Handle toggling a section - add it if it doesn't exist yet
  const handleToggleSection = (sectionId: string) => {
    const section = sectionMap[sectionId];
    if (!section) return;

    if (!existingSectionIds.has(sectionId) && !section.enabled) {
      // Section doesn't exist in resume yet - add it
      const variant = section.variant || sectionVariantsMap[sectionId]?.[0]?.id || 'standard';
      onAddSection(sectionId, variant, (section.column || 'main') as 'main' | 'sidebar');
    } else {
      // Section exists - just toggle it
      onToggleSection(sectionId);
    }
  };

  // Initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      // Group ALL sections by column (enabled ones first, then disabled)
      const enabledMain = allSections
        .filter((s) => s.enabled && (s.column || 'main') === 'main' && s.id !== 'header')
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((s) => s.id);

      const disabledMain = allSections
        .filter((s) => !s.enabled && (s.column || 'main') === 'main' && s.id !== 'header')
        .map((s) => s.id);

      const enabledSidebar = allSections
        .filter((s) => s.enabled && (s.column || 'main') === 'sidebar')
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((s) => s.id);

      const disabledSidebar = allSections
        .filter((s) => !s.enabled && (s.column || 'main') === 'sidebar')
        .map((s) => s.id);

      // Show enabled sections first, then disabled ones
      setMainIds([...enabledMain, ...disabledMain]);
      setSidebarIds([...enabledSidebar, ...disabledSidebar]);
      setEditingId(null);
      setVariantSectionId(null);
    }
  }, [isOpen, allSections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which list contains each item
    const activeInMain = mainIds.includes(activeId);
    const overInMain = mainIds.includes(overId);

    if (activeInMain && overInMain) {
      // Reorder within main
      const oldIndex = mainIds.indexOf(activeId);
      const newIndex = mainIds.indexOf(overId);
      setMainIds(arrayMove(mainIds, oldIndex, newIndex));
    } else if (!activeInMain && !overInMain) {
      // Reorder within sidebar
      const oldIndex = sidebarIds.indexOf(activeId);
      const newIndex = sidebarIds.indexOf(overId);
      setSidebarIds(arrayMove(sidebarIds, oldIndex, newIndex));
    }
    // Cross-column drag is handled separately if needed
  };

  const handleApply = () => {
    // Call the reorder callback with new order
    onReorderSections(mainIds, sidebarIds, {});
    onClose();
  };

  const handleStartEdit = (sectionId: string) => {
    setEditingId(sectionId);
    setEditValue(sectionLabels[sectionId] || sectionMap[sectionId]?.title || '');
  };

  const handleSaveEdit = (sectionId: string, value: string) => {
    if (value.trim()) {
      onUpdateLabel(sectionId, value.trim());
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const isTwoColumn = layoutType !== 'single-column';

  // Get the section being edited for variants
  const variantSection = variantSectionId ? sectionMap[variantSectionId] : null;
  const variantSectionType = variantSection?.type || variantSectionId || '';
  const currentVariants = sectionVariantsMap[variantSectionType] || [];
  const currentVariant = variantSection
    ? sectionOverrides[variantSectionId!]?.variant || variantSection.variant
    : undefined;

  const renderSectionList = (ids: string[], title: string) => (
    <div className="space-y-2">
      {isTwoColumn && (
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</h4>
      )}
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-1.5">
          {ids.map((id) => {
            const section = sectionMap[id];
            if (!section) return null;
            return (
              <SortableSectionItem
                key={id}
                section={section}
                isEditing={editingId === id}
                editValue={editValue}
                onToggle={() => handleToggleSection(id)}
                onStartEdit={() => handleStartEdit(id)}
                onSaveEdit={(value) => handleSaveEdit(id, value)}
                onCancelEdit={handleCancelEdit}
                onEditChange={setEditValue}
                onOpenVariants={() => setVariantSectionId(id)}
                hasVariants={(sectionVariantsMap[section.type || id]?.length || 0) > 0}
                themeColor={themeColor}
                sectionLabel={sectionLabels[id]}
              />
            );
          })}
        </div>
      </SortableContext>
      {ids.length === 0 && (
        <div className="text-xs text-gray-400 italic px-2 py-4 text-center border border-dashed border-gray-200 rounded-lg">
          No sections in this column
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-[95vw] sm:w-full p-0 gap-0 overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col">
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gray-50 flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900">
            Manage Sections
          </DialogTitle>
          <p className="text-xs sm:text-sm text-gray-500">
            Toggle visibility, drag to reorder, or change styles
          </p>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
          <div className="px-4 sm:px-6 py-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              {isTwoColumn ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {renderSectionList(mainIds, 'Main Column')}
                  {renderSectionList(sidebarIds, 'Sidebar')}
                </div>
              ) : (
                renderSectionList(mainIds, 'Sections')
              )}
            </DndContext>

            {/* Add Custom Section Button */}
            <button
              onClick={() => {
                onAddSection('custom', 'list', 'main');
                onClose();
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Custom Section</span>
            </button>
          </div>
        </div>

        {/* Variant Selector Panel */}
        {variantSectionId && currentVariants.length > 0 && (
          <VariantSelector
            sectionId={variantSectionId}
            sectionType={variantSectionType}
            currentVariant={currentVariant}
            variants={currentVariants}
            onSelect={(variantId) => onChangeVariant(variantSectionId, variantId)}
            onClose={() => setVariantSectionId(null)}
            themeColor={themeColor}
          />
        )}

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 flex justify-end gap-2 sm:gap-3 flex-shrink-0">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={handleApply} size="sm" style={{ backgroundColor: themeColor }} className="text-white">
            Apply Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSectionsModal;
