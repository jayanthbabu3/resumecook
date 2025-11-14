import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SectionLibrary } from './SectionLibrary';
import { DynamicSectionCard } from './DynamicSectionCard';
import type { ResumeSection, SectionType, SectionData } from '@/types/resume';
import { SECTION_DEFAULT_TITLES, SECTION_ICONS } from '@/constants/helperSections';

interface DynamicSectionsProps {
  sections: ResumeSection[];
  onChange: (sections: ResumeSection[]) => void;
}

export function DynamicSections({ sections, onChange }: DynamicSectionsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Check if dragging from library
    const activeData = active.data.current;
    if (activeData?.source === 'library') {
      const sectionType = activeData.type as SectionType;
      addSection(sectionType);
      return;
    }

    // Handle reordering
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newSections = [...sections];
        const [movedSection] = newSections.splice(oldIndex, 1);
        newSections.splice(newIndex, 0, movedSection);

        // Update order values
        const reorderedSections = newSections.map((section, index) => ({
          ...section,
          order: index,
        }));

        onChange(reorderedSections);
      }
    }
  };

  const addSection = (type: SectionType) => {
    const newSection: ResumeSection = {
      id: `section-${Date.now()}`,
      type,
      order: sections.length,
      enabled: true,
      title: SECTION_DEFAULT_TITLES[type],
      data: getEmptyDataForType(type),
    };

    onChange([...sections, newSection]);
  };

  const updateSection = (id: string, updates: Partial<ResumeSection>) => {
    onChange(sections.map((section) => (section.id === id ? { ...section, ...updates } : section)));
  };

  const removeSection = (id: string) => {
    const filtered = sections.filter((s) => s.id !== id);
    // Re-index order
    const reindexed = filtered.map((s, index) => ({ ...s, order: index }));
    onChange(reindexed);
  };

  const toggleSection = (id: string) => {
    onChange(
      sections.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  // Get list of section types already added (to disable in library)
  const addedSectionTypes = sections
    .filter((s) => s.type !== 'custom') // Allow multiple custom sections
    .map((s) => s.type);

  const activeSection = sections.find((s) => s.id === activeId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Resume Sections</h3>
          <p className="text-sm text-gray-500">
            Drag to reorder, or add new sections from the library
          </p>
        </div>
        <SectionLibrary onAddSection={addSection} disabledSections={addedSectionTypes} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sections.map((section) => (
              <DynamicSectionCard
                key={section.id}
                section={section}
                onUpdate={updateSection}
                onRemove={removeSection}
                onToggle={toggleSection}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeSection && (
            <div className="bg-white shadow-xl rounded-lg p-4 border-2 border-primary/50 opacity-90">
              <div className="flex items-center gap-2">
                <span className="text-xl">{SECTION_ICONS[activeSection.type]}</span>
                <span className="font-semibold">{activeSection.title}</span>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// Helper function to create empty data for a section type
function getEmptyDataForType(type: SectionType): SectionData {
  switch (type) {
    case 'summary':
      return { type: 'summary', content: '' };
    case 'experience':
      return { type: 'experience', items: [] };
    case 'education':
      return { type: 'education', items: [] };
    case 'skills':
      return { type: 'skills', items: [] };
    case 'certifications':
      return { type: 'certifications', items: [] };
    case 'languages':
      return { type: 'languages', items: [] };
    case 'projects':
      return { type: 'projects', items: [] };
    case 'awards':
      return { type: 'awards', items: [] };
    case 'publications':
      return { type: 'publications', items: [] };
    case 'volunteer':
      return { type: 'volunteer', items: [] };
    case 'speaking':
      return { type: 'speaking', items: [] };
    case 'patents':
      return { type: 'patents', items: [] };
    case 'portfolio':
      return { type: 'portfolio', items: [] };
    case 'custom':
      return { type: 'custom', content: '' };
    default:
      return { type: 'custom', content: '' };
  }
}
