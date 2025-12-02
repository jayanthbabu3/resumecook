import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GripVertical, Plus, Sparkles, X } from 'lucide-react';
import { HELPER_SECTIONS } from '@/constants/helperSections';
import type { SectionType } from '@/types/resume';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

interface LiveEditorSidebarProps {
  onAddSection: (type: SectionType) => void;
  disabledSections?: SectionType[];
}

interface DraggableSectionCardProps {
  type: SectionType;
  icon: string;
  title: string;
  description: string;
  isDisabled?: boolean;
  onAdd: () => void;
}

function DraggableSectionCard({
  type,
  icon,
  title,
  description,
  isDisabled,
  onAdd,
}: DraggableSectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${type}`,
    data: { type, source: 'library' },
    disabled: isDisabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative overflow-hidden rounded-lg border bg-gradient-to-br from-white to-gray-50/50
        transition-all duration-200 hover:shadow-md hover:border-primary/30
        ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
        ${isDragging ? 'shadow-xl scale-105' : ''}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <div className="text-xl mt-0.5 flex-shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs text-gray-900 mb-0.5 line-clamp-1">
                {title}
              </h4>
              <p className="text-[10px] text-gray-500 line-clamp-2">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 flex-shrink-0">
            {!isDisabled && (
              <>
                <button
                  {...listeners}
                  {...attributes}
                  className="p-1 rounded hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing"
                  title="Drag to add"
                >
                  <GripVertical className="h-3 w-3 text-gray-400" />
                </button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={onAdd}
                  title="Click to add"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LiveEditorSidebar({ onAddSection, disabledSections = [] }: LiveEditorSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="rounded-l-lg rounded-r-none shadow-lg bg-white border-r-0 h-24 w-8 p-0 hover:w-10 transition-all"
        >
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] writing-mode-vertical transform rotate-180">
              Sections
            </span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white border-l-2 border-primary/10 shadow-xl z-40 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-purple-500/5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base">Helper Sections</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(true)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-600">
          Drag sections to your resume or click + to add
        </p>
      </div>

      {/* Sections List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {HELPER_SECTIONS.map((section) => (
            <DraggableSectionCard
              key={section.type}
              type={section.type}
              icon={section.icon}
              title={section.title}
              description={section.description}
              isDisabled={disabledSections.includes(section.type)}
              onAdd={() => onAddSection(section.type)}
            />
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
          <div className="flex items-start gap-2">
            <div className="text-xl">💡</div>
            <div className="flex-1 text-[10px] text-gray-600">
              <p className="font-semibold text-gray-900 mb-1">Pro Tip</p>
              <p>
                Click on any field in your resume to edit it directly.
                Add sections that highlight your strengths!
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
