import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Save, Loader2, GripVertical } from 'lucide-react';
import { Header } from '@/components/Header';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
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
import { generatePDFFromPreview } from '@/lib/pdfGenerator';
import { incrementDownloadsCount } from '@/lib/firestore/statsService';
import { InlineEditProvider } from '@/contexts/InlineEditContext';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { ScratchBuilderSection } from '@/components/resume/ScratchBuilderSection';
import { SectionStyleModal } from '@/components/resume/SectionStyleModal';
import { SectionVariant, getSectionVariants } from '@/constants/sectionVariants';

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// Helper section card in the right panel
interface HelperSectionCardProps {
  type: SectionType;
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

function HelperSectionCard({ type, icon, title, description, onClick }: HelperSectionCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-white to-gray-50/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:scale-[1.02]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5 flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">{title}</h4>
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          </div>
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
  sectionIndex: number;
  onDelete: (id: string) => void;
  onUpdateSection: (sectionId: string, updater: (section: ResumeSection) => ResumeSection) => void;
}

function SortableSection({ section, sectionIndex, onDelete, onUpdateSection }: SortableSectionProps) {
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
      <ScratchBuilderSection
        section={section}
        sectionIndex={sectionIndex}
        onDelete={onDelete}
        onUpdateSection={onUpdateSection}
        dragHandleProps={{ ...attributes, ...listeners }}
        themeColor="#2563eb"
      />
    </div>
  );
}

interface SortableSectionWrapperProps {
  section: ResumeSection;
  sectionIndex: number;
  onDelete: (id: string) => void;
  onUpdateSection: (sectionId: string, updater: (section: ResumeSection) => ResumeSection) => void;
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

  // Modal state for section style selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSectionType, setSelectedSectionType] = useState<SectionType | null>(null);
  const [selectedSectionTitle, setSelectedSectionTitle] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const themeColor = '#2563eb';

  // Sync sections with resumeData.dynamicSections
  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      dynamicSections: sections,
    }));
  }, [sections]);

  // Create a new section with mock data and optional variant
  const createSection = useCallback(
    (type: SectionType, variant?: SectionVariant): ResumeSection => {
      const id = generateId();
      // Use variant preview title if available, otherwise use default title
      const title = variant?.previewData?.title || SECTION_DEFAULT_TITLES[type];
      const order = sections.length;

      // Get base mock data with correct editable structure
      let data = getMockSectionData(type);

      // If variant is selected, apply variant-specific content while keeping editable structure
      if (variant?.previewData) {
        const previewData = variant.previewData;

        // For summary: Keep the content structure as-is (array or string)
        if (type === 'summary') {
          data = { type: 'summary' };

          // Preserve content (can be string or array)
          if (previewData.content) {
            (data as any).content = previewData.content;
          }

          // Preserve stats for two-column variant
          if (previewData.stats) {
            (data as any).stats = previewData.stats;
          }

          // Preserve tags for expertise variant
          if (previewData.tags) {
            (data as any).tags = previewData.tags;
          }
        }
        // For skills: Convert preview skills to proper format based on variant style
        else if (type === 'skills' && previewData.skills) {
          const skills = previewData.skills;

          // For variants that need objects with name/level (skill-list, skill-bars, skill-rating)
          if (variant.id === 'skill-list' || variant.id === 'skill-bars' || variant.id === 'skill-rating') {
            data = {
              type: 'skills',
              skills: Array.isArray(skills) && typeof skills[0] === 'object'
                ? skills
                : Array.isArray(skills)
                ? skills.slice(0, 6).map((skill: any) => ({
                    name: typeof skill === 'string' ? skill : skill.name || String(skill),
                    level: typeof skill === 'object' && skill.level ? skill.level : 80,
                    rating: typeof skill === 'object' && skill.rating ? skill.rating : 4,
                  }))
                : []
            };
          }
          // For variants that need grouped skills (skill-grouped)
          else if (variant.id === 'skill-grouped' && previewData.skillGroups) {
            data = {
              type: 'skills',
              skillGroups: previewData.skillGroups
            };
          }
          // For variants that need string arrays (skill-pills, skill-grid, skill-minimal, skill-badges)
          else if (variant.id === 'skill-pills' || variant.id === 'skill-grid' || variant.id === 'skill-minimal' || variant.id === 'skill-badges') {
            data = {
              type: 'skills',
              skills: Array.isArray(skills)
                ? skills.map((skill: any) => typeof skill === 'string' ? skill : skill.name || String(skill))
                : []
            };
          }
          // For inline/comma-separated (skill-inline)
          else if (variant.id === 'skill-inline') {
            data = {
              type: 'skills',
              skills: [(typeof skills === 'string' ? skills : Array.isArray(skills) ? skills.join(', ') : '')]
            };
          }
          // For two-column variant
          else if (variant.id === 'skill-two-column' && previewData.technical && previewData.soft) {
            data = {
              type: 'skills',
              technical: previewData.technical,
              soft: previewData.soft
            };
          }
          // Default fallback
          else {
            data = {
              type: 'skills',
              skills: Array.isArray(skills)
                ? skills.map((skill: any) => typeof skill === 'string' ? skill : skill.name || String(skill))
                : []
            };
          }
        }
        // For all other types with items arrays (experience, education, projects, etc.)
        else if (previewData.items && Array.isArray(previewData.items)) {
          // Preserve the items from the variant preview data
          data = {
            type: type,
            items: previewData.items.map((item: any) => ({
              ...item,
              id: item.id || generateId(), // Ensure each item has an ID
            }))
          };
        }

        // Store variant ID for styling
        (data as any).variantId = variant.id;
      }

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

  // Handle helper section card click
  const handleHelperSectionClick = (type: SectionType, title: string) => {
    // Check if this section type has variants
    const variants = getSectionVariants(type);

    if (variants.length > 0) {
      // Open modal to select variant
      setSelectedSectionType(type);
      setSelectedSectionTitle(title);
      setIsModalOpen(true);
    } else {
      // Add section directly with default style
      const newSection = createSection(type);
      setSections((prev) => [...prev, newSection]);
      toast.success(`${title} section added!`);
    }
  };

  // Handle variant selection from modal
  const handleVariantSelect = (variant: SectionVariant) => {
    if (!selectedSectionType) return;

    const newSection = createSection(selectedSectionType, variant);
    setSections((prev) => [...prev, newSection]);
    toast.success(`${variant.name} section added!`);

    // Reset modal state
    setIsModalOpen(false);
    setSelectedSectionType(null);
    setSelectedSectionTitle('');
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // Only handle reordering existing sections
    if (active.id !== over.id) {
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

  const handleUpdateSection = (sectionId: string, updater: (section: ResumeSection) => ResumeSection) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? updater(section) : section))
    );
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
      const filename = `${resumeData.personalInfo.fullName?.replace(/\s+/g, '_') || 'resume'}_Resume.pdf`;
      await generatePDFFromPreview('scratch-builder-preview', filename);

      // Increment download count in stats
      incrementDownloadsCount().catch(console.error);

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
        <Header />

        {/* Subheader */}
        <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            {/* Mobile Layout */}
            <div className="flex flex-col gap-3 md:hidden">
              <Breadcrumbs />
              <div className="flex items-center justify-end gap-2">
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

            {/* Desktop Layout */}
            <div className="hidden md:flex md:items-center md:justify-between md:gap-4">
              {/* Breadcrumbs */}
              <div className="flex items-center">
                <Breadcrumbs />
              </div>

              {/* Controls */}
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
                <div id="scratch-builder-preview" className="mx-auto w-full max-w-[210mm] min-h-[297mm] rounded-lg bg-white shadow-2xl p-12">
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
                        Click sections from the right panel to add them here
                      </p>
                    </div>
                  ) : (
                    <SortableContext
                      items={sections.map((s) => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {sections.map((section, index) => {
                        // Create a wrapper that passes the correct index
                        const SortableSectionWrapper = () => {
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
                              <ScratchBuilderSection
                                section={section}
                                sectionIndex={index}
                                onDelete={handleDeleteSection}
                                onUpdateSection={handleUpdateSection}
                                dragHandleProps={{ ...attributes, ...listeners }}
                                themeColor={themeColor}
                              />
                            </div>
                          );
                        };

                        return <SortableSectionWrapper key={section.id} />;
                      })}
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
                      Click to add sections to your resume
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
                        onClick={() => handleHelperSectionClick(section.type, section.title)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId ? (
              <div className="bg-white rounded-lg border-2 border-primary shadow-xl p-4 opacity-90">
                <p className="font-semibold">Reordering...</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Section Style Modal */}
        <SectionStyleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sectionType={selectedSectionType || 'summary'}
          sectionTitle={selectedSectionTitle}
          onSelectVariant={handleVariantSelect}
        />
      </div>
    </InlineEditProvider>
  );
}
