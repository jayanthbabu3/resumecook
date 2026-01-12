import React, { useEffect, useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Lock } from 'lucide-react';
import type { SectionConfig } from '../types';
import { cn } from '@/lib/utils';

interface SectionReorderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sections: SectionConfig[];
  onApply: (mainIds: string[], sidebarIds: string[], pageBreaks: Record<string, boolean>) => void;
}

type ColumnId = 'main' | 'sidebar';

interface SortableItemProps {
  id: string;
  label: string;
  locked?: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, label, locked }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: locked });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm touch-none',
        locked && 'opacity-80 cursor-not-allowed',
        !locked && 'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50 shadow-lg z-50'
      )}
      {...(!locked ? { ...attributes, ...listeners } : {})}
    >
      <div
        className={cn(
          'flex items-center flex-shrink-0',
          locked ? 'text-gray-300' : 'text-gray-400'
        )}
      >
        {locked ? <Lock className="h-4 w-4" /> : <GripVertical className="h-4 w-4" />}
      </div>
      <span className="text-gray-800 truncate">{label}</span>
    </div>
  );
};

export const SectionReorderDialog: React.FC<SectionReorderDialogProps> = ({
  open,
  onOpenChange,
  sections,
  onApply,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  // Separate into columns
  const initial = useMemo(() => {
    const main = sections
      .filter((s) => (s.column || 'main') === 'main' && s.enabled !== false)
      .sort((a, b) => a.order - b.order)
      .map((s) => s.id);
    const sidebar = sections
      .filter((s) => (s.column || 'main') === 'sidebar' && s.enabled !== false)
      .sort((a, b) => a.order - b.order)
      .map((s) => s.id);
    return { main, sidebar };
  }, [sections]);

  const [mainIds, setMainIds] = useState<string[]>([]);
  const [sidebarIds, setSidebarIds] = useState<string[]>([]);
  const [pageBreaks, setPageBreaks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (open) {
      setMainIds(initial.main);
      setSidebarIds(initial.sidebar);
      const breaks: Record<string, boolean> = {};
      sections.forEach((s) => {
        breaks[s.id] = (s as any).pageBreakBefore ?? false;
      });
      setPageBreaks(breaks);
    }
  }, [open, initial]);

  const sectionMap = useMemo(() => {
    const map: Record<string, SectionConfig> = {};
    sections.forEach((s) => (map[s.id] = s));
    return map;
  }, [sections]);

  const findContainer = (id: string): ColumnId | null => {
    if (mainIds.includes(id)) return 'main';
    if (sidebarIds.includes(id)) return 'sidebar';
    return null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string) || (over.id as ColumnId);
    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const items = activeContainer === 'main' ? [...mainIds] : [...sidebarIds];
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      if (oldIndex === -1 || newIndex === -1) return;
      items.splice(oldIndex, 1);
      items.splice(newIndex, 0, active.id as string);
      activeContainer === 'main' ? setMainIds(items) : setSidebarIds(items);
    } else {
      // Move across columns
      const source = activeContainer === 'main' ? [...mainIds] : [...sidebarIds];
      const dest = overContainer === 'main' ? [...mainIds] : [...sidebarIds];
      const oldIndex = source.indexOf(active.id as string);
      if (oldIndex === -1) return;
      source.splice(oldIndex, 1);
      const overIndex = dest.indexOf(over.id as string);
      const insertIndex = overIndex >= 0 ? overIndex : dest.length;
      dest.splice(insertIndex, 0, active.id as string);
      if (activeContainer === 'main') setMainIds(source);
      else setSidebarIds(source);
      if (overContainer === 'main') setMainIds(dest);
      else setSidebarIds(dest);
    }
  };

  const headerId = sections.find((s) => s.id === 'header')?.id;
  const isLocked = (id: string) => id === headerId;

  const renderColumn = (ids: string[], column: ColumnId, title: string) => (
    <div className="flex-1 min-w-0 sm:min-w-[220px]">
      <div className="mb-2 text-xs font-semibold text-gray-700 uppercase tracking-wide">{title}</div>
      <div className="space-y-1.5 rounded-lg bg-gray-50 border border-gray-200 p-2 min-h-[120px] sm:min-h-[200px]">
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {ids.map((id) => (
            <SortableItem
              key={id}
              id={id}
              label={sectionMap[id]?.title || sectionMap[id]?.id || id}
              locked={isLocked(id)}
            />
          ))}
          {ids.length === 0 && (
            <div className="text-xs text-gray-400 italic px-2 py-4 sm:py-6 text-center">
              Drag a section here
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );

  const applyChanges = () => {
    onApply(mainIds, sidebarIds, pageBreaks);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-full p-0 gap-0 overflow-hidden max-h-[85vh] sm:max-h-[600px] flex flex-col">
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gray-50 flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900">
            Rearrange Sections
          </DialogTitle>
          <p className="text-xs sm:text-sm text-gray-500">
            Drag and drop to reorder or move sections between columns.
          </p>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <GripVertical className="h-3 w-3" />
                Drag
              </Badge>
              <span className="hidden sm:inline">Hold and drag to rearrange</span>
              <span className="sm:hidden">Hold to drag</span>
            </div>

            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {renderColumn(mainIds, 'main', 'Main Column')}
                {renderColumn(sidebarIds, 'sidebar', 'Sidebar')}
              </div>
            </DndContext>

            <div className="mt-4 sm:mt-6 space-y-2">
              <div>
                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Page Breaks
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Start a section on a new page in the PDF
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sections
                  .filter((s) => s.id !== headerId)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2"
                    >
                      <span className="text-sm text-gray-800 truncate mr-2">{s.title}</span>
                      <Switch
                        checked={pageBreaks[s.id] || false}
                        onCheckedChange={(checked) =>
                          setPageBreaks((prev) => ({ ...prev, [s.id]: checked }))
                        }
                        className="data-[state=checked]:bg-primary flex-shrink-0"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 flex justify-end gap-2 sm:gap-3 flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} size="sm" className="sm:size-default">
            Cancel
          </Button>
          <Button onClick={applyChanges} size="sm" className="sm:size-default">
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectionReorderDialog;

