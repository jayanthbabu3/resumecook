import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, GripVertical, Sparkles } from 'lucide-react';
import { HELPER_SECTIONS } from '@/constants/helperSections';
import type { SectionType } from '@/types/resume';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface SectionLibraryProps {
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
        ${isDragging ? 'shadow-xl scale-105 rotate-2' : ''}
      `}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            <div className="text-2xl mt-0.5 flex-shrink-0">{icon}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                {title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {!isDisabled && (
              <>
                <button
                  {...listeners}
                  {...attributes}
                  className="p-1.5 rounded hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing"
                  title="Drag to add"
                >
                  <GripVertical className="h-4 w-4 text-gray-400" />
                </button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={onAdd}
                  title="Click to add"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}

export function SectionLibrary({ onAddSection, disabledSections = [] }: SectionLibraryProps) {
  const [open, setOpen] = useState(false);

  const handleAddSection = (type: SectionType) => {
    onAddSection(type);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 hover:border-primary/40 hover:bg-gradient-to-r hover:from-primary/20 hover:to-purple-500/20"
        >
          <Sparkles className="h-4 w-4" />
          Helper Sections
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md border-l-2 border-primary/10 bg-gradient-to-b from-white to-gray-50/30"
      >
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Section Library
          </SheetTitle>
          <SheetDescription className="text-sm">
            Drag sections to your resume or click the + button to add them
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-3 pr-4">
            {/* Header for optional sections */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available Sections
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {HELPER_SECTIONS.map((section) => (
              <DraggableSectionCard
                key={section.type}
                type={section.type}
                icon={section.icon}
                title={section.title}
                description={section.description}
                isDisabled={disabledSections.includes(section.type)}
                onAdd={() => handleAddSection(section.type)}
              />
            ))}

            {/* Info footer */}
            <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div className="flex-1 text-xs text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">Pro Tip</p>
                  <p>
                    Customize section titles and reorder them by dragging within your resume.
                    Only include sections that strengthen your application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
