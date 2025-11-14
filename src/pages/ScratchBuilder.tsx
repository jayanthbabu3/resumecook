import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Save, ArrowLeft, Loader2, GripVertical } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { resumeService } from '@/lib/firestore/resumeService';
import type { ResumeSection, SectionType, ResumeData } from '@/types/resume';
import { toast } from 'sonner';
import { HELPER_SECTIONS, SECTION_DEFAULT_TITLES } from '@/constants/helperSections';
import { getMockSectionData, getBlankResumeData } from '@/constants/mockSectionData';
import { pdf } from '@react-pdf/renderer';
import { ScratchBuilderPDF } from '@/components/resume/pdf/ScratchBuilderPDF';
import { registerPDFFonts } from '@/lib/pdfFonts';
import { InlineEditProvider } from '@/contexts/InlineEditContext';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDynamicSection } from '@/components/resume/InlineEditableDynamicSection';

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// Helper section card in the right panel
interface HelperSectionCardProps {
  type: SectionType;
  icon: string;
  title: string;
  description: string;
}

function HelperSectionCard({ type, icon, title, description }: HelperSectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `helper-${type}`,
    data: { type, source: 'helper' },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-white to-gray-50/50 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md hover:border-primary/30"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5 flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">{title}</h4>
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          </div>
          <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

// Drop zone component for the resume canvas
interface DropZoneProps {
  children: React.ReactNode;
}

function DropZone({ children }: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'resume-canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-all duration-200 ${
        isOver ? 'ring-2 ring-primary/50 rounded-lg' : ''
      }`}
    >
      {children}
    </div>
  );
}

// Sortable section in the resume
interface SortableSectionProps {
  section: ResumeSection;
  onDelete: (id: string) => void;
}

function SortableSection({ section, onDelete }: SortableSectionProps) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-6">
      <InlineEditableDynamicSection
        section={section}
        dragHandleProps={{ ...attributes, ...listeners }}
        onDelete={() => onDelete(section.id)}
      />
    </div>
  );
}

export default function ScratchBuilder() {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();

  // Resume state - start completely blank
  const [resumeData, setResumeData] = useState<ResumeData>(() => ({
    ...getBlankResumeData(),
    dynamicSections: [],
  }));

  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const themeColor = '#7c3aed';

  // Create a new section with mock data
  const createSection = useCallback(
    (type: SectionType): ResumeSection => {
      const id = generateId();
      const title = SECTION_DEFAULT_TITLES[type];
      const order = sections.length;
      const data = getMockSectionData(type);

      return {
        id,
        type,
        order,
        enabled: true,
        title,
        data,
      };
    },
    [sections.length]
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeData = active.data.current;
    
    // Check if dragging from helper sections
    if (activeData?.source === 'helper') {
      const sectionType = activeData.type as SectionType;
      const newSection = createSection(sectionType);

      // If dropping on an existing section, insert before it
      if (over.id !== 'resume-canvas') {
        setSections((prev) => {
          const overIndex = prev.findIndex((item) => item.id === over.id);
          if (overIndex === -1) return [...prev, newSection];
          const newSections = [...prev];
          newSections.splice(overIndex, 0, newSection);
          return newSections.map((item, index) => ({ ...item, order: index }));
        });
      } else {
        setSections((prev) => [...prev, newSection]);
      }

      toast.success(`${newSection.title} section added!`);
    }
    // Reordering existing sections
    else if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return items;
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }

    setActiveId(null);
  };

  const handleDeleteSection = (id: string) => {
    setSections((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      return filtered.map((s, i) => ({ ...s, order: i }));
    });
    toast.success('Section removed');
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your resume');
      return;
    }

    setIsSaving(true);
    try {
      const dataToSave: ResumeData = {
        ...resumeData,
        dynamicSections: sections,
      };

      const resumeId = await resumeService.createResume('scratch', dataToSave, {
        title: `Resume - ${new Date().toLocaleDateString()}`,
        themeColor,
      });

      toast.success('Resume saved successfully!');
      navigate(`/editor/${resumeId}`);
    } catch (error) {
      console.error('Failed to save resume:', error);
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await registerPDFFonts();

      const dataToExport: ResumeData = {
        ...resumeData,
        dynamicSections: sections,
      };

      const blob = await pdf(
        <ScratchBuilderPDF resumeData={dataToExport} themeColor={themeColor} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.click();
      URL.revokeObjectURL(url);

      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <InlineEditProvider resumeData={resumeData} setResumeData={setResumeData}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">Create Resume from Scratch</h1>
                <p className="text-xs text-muted-foreground">
                  Drag sections from the right panel to build your resume
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting || sections.length === 0}
                className="gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export PDF
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving || !user}
                className="gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
              {/* Resume Canvas */}
              <DropZone>
                <div className="mx-auto w-full max-w-[210mm] min-h-[297mm] rounded-lg bg-white shadow-2xl p-12">
                  {/* Personal Info - Always visible */}
                  <div
                    className="space-y-2 mb-8 pb-6 border-b-2"
                    style={{ borderColor: themeColor }}
                  >
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={resumeData.personalInfo.fullName}
                      className="text-4xl font-bold block"
                      placeholder="Your Name"
                    />
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-xl text-muted-foreground block"
                      placeholder="Professional Title"
                    />
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email}
                        placeholder="email@example.com"
                      />
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone}
                        placeholder="+1 (555) 000-0000"
                      />
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location}
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  {/* Dynamic Sections */}
                  {sections.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <p className="text-lg font-medium mb-2">
                        Start building your resume
                      </p>
                      <p className="text-sm">
                        Drag sections from the right panel to add them here
                      </p>
                    </div>
                  ) : (
                    <SortableContext
                      items={sections.map((s) => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {sections.map((section) => (
                        <SortableSection
                          key={section.id}
                          section={section}
                          onDelete={handleDeleteSection}
                        />
                      ))}
                    </SortableContext>
                  )}
                </div>
              </DropZone>

              {/* Helper Sections Panel */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-white rounded-xl shadow-lg border p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-bold mb-1">Helper Sections</h2>
                    <p className="text-xs text-muted-foreground">
                      Drag these sections to your resume
                    </p>
                  </div>
                  <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    {HELPER_SECTIONS.map((section) => (
                      <HelperSectionCard
                        key={section.type}
                        type={section.type}
                        icon={section.icon}
                        title={section.title}
                        description={section.description}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId && activeId.startsWith('helper-') ? (
              <div className="bg-white rounded-lg border-2 border-primary shadow-xl p-4 opacity-90">
                <p className="font-semibold">
                  {
                    HELPER_SECTIONS.find(
                      (s) => s.type === activeId.replace('helper-', '')
                    )?.title
                  }
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </InlineEditProvider>
  );
}
