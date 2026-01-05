/**
 * Scratch Builder V2 - Main Page
 * 
 * Blank canvas resume builder where users can add sections from scratch.
 * Layout is determined by the selected layout from the layout selection screen.
 * Redesigned with elegant, professional UI inspired by VisualCV and EnhanceCV.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Download, Save, Loader2, ArrowLeft, Layout, Palette } from 'lucide-react';
import { useScratchResume } from '../hooks/useScratchResume';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ResumeCanvas } from '../components/scratch/ResumeCanvas';
import { HelperSectionPanel } from '../components/scratch/HelperSectionPanel';
import { SectionVariantModal } from '../components/scratch/SectionVariantModal';
import { toast } from 'sonner';
import type { V2SectionType } from '../types/resumeData';
import { generatePDFFromPreview } from '@/lib/pdfGenerator';
import { incrementDownloadsCount } from '@/lib/firestore/statsService';
import type { SectionVariant } from '@/constants/sectionVariants';
import { applyVariantDataToResume } from '../utils/variantDataApplier';
import { resumeService } from '@/lib/firestore/resumeService';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { convertV2ToV1 } from '../utils/dataConverter';
import { generateScratchConfig } from '../utils/scratchConfigGenerator';
import { cn } from '@/lib/utils';

const ScratchBuilderV2: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();
  const {
    resumeData,
    setResumeData,
    selectedLayout,
    sections,
    themeColor,
    setThemeColor,
    addSection,
    removeSection,
  } = useScratchResume();

  // Predefined theme colors
  const THEME_COLORS = [
    { name: 'Blue', value: '#2563eb' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Pink', value: '#db2777' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Amber', value: '#d97706' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Teal', value: '#0d9488' },
    { name: 'Cyan', value: '#0891b2' },
    { name: 'Slate', value: '#475569' },
    { name: 'Gray', value: '#4b5563' },
  ];

  const [isSaving, setIsSaving] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSectionType, setSelectedSectionType] = React.useState<V2SectionType | null>(null);

  // Redirect if no layout selected
  React.useEffect(() => {
    if (!selectedLayout) {
      toast.error('Please select a layout first');
      navigate('/builder/scratch-v2/select-layout');
    }
  }, [selectedLayout, navigate]);

  // Handle section click from helper panel
  const handleSectionClick = (sectionType: V2SectionType) => {
    setSelectedSectionType(sectionType);
    setIsModalOpen(true);
  };

  // Handle variant selection from modal
  const handleVariantSelect = (variant: SectionVariant, column?: 'main' | 'sidebar') => {
    if (!selectedSectionType) return;

    // Apply variant preview data to resume
    const updatedResumeData = applyVariantDataToResume(
      resumeData,
      selectedSectionType,
      variant
    );
    setResumeData(updatedResumeData);

    // Add section with variant ID
    addSection(selectedSectionType, variant.id, column);
    toast.success(`${variant.name} section added!`);
    setIsModalOpen(false);
    setSelectedSectionType(null);
  };

  // Handle save
  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your resume');
      navigate('/auth');
      return;
    }

    if (sections.length === 0) {
      toast.error('Please add at least one section before saving');
      return;
    }

    setIsSaving(true);
    try {
      // Convert V2ResumeData to V1 format for compatibility
      const v1ResumeData = convertV2ToV1(resumeData);
      
      // Save resume with scratch-v2 template ID
      const resumeId = await resumeService.createResume(
        'scratch-v2',
        v1ResumeData,
        {
          themeColor,
          title: resumeData.personalInfo.fullName 
            ? `${resumeData.personalInfo.fullName}'s Resume`
            : `Resume - ${new Date().toLocaleDateString()}`,
        }
      );

      // Store scratch builder metadata (sections, layout) for restoring state
      // This allows us to restore the scratch builder state when loading
      const config = generateScratchConfig(sections, selectedLayout, themeColor);
      await resumeService.updateResume(resumeId, {
        data: {
          ...v1ResumeData,
          // Store scratch builder metadata as part of data
          // Note: This is a custom field that won't affect rendering
          scratchBuilderMetadata: {
            sections,
            selectedLayoutId: selectedLayout?.id,
            config,
          },
        } as any,
      });

      toast.success('Resume saved successfully!');
    } catch (error: any) {
      console.error('Failed to save resume:', error);
      toast.error(error.message || 'Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle export PDF
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const filename = `${resumeData.personalInfo.fullName?.replace(/\s+/g, '_') || 'resume'}_Resume.pdf`;
      await generatePDFFromPreview('scratch-builder-v2-preview', filename);

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

  // Show loading if no layout
  if (!selectedLayout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-500">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100">
      <Header />

      {/* Elegant Subheader */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Back button and layout info */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/builder/scratch-v2/select-layout')}
                className="gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Change Layout</span>
              </Button>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layout className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Layout</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLayout.name}</p>
                </div>
              </div>
            </div>

            {/* Center: Section count */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
              <span className="text-sm text-gray-600">
                {sections.length === 0 ? 'No sections added' : `${sections.length} section${sections.length !== 1 ? 's' : ''} added`}
              </span>
            </div>

            {/* Right: Action buttons */}
            <div className="flex items-center gap-3">
              {/* Theme Color Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 h-9 px-3 rounded-lg border-gray-300"
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300" 
                      style={{ backgroundColor: themeColor }}
                    />
                    <Palette className="h-4 w-4 text-gray-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3" align="end">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Theme Color</h4>
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-gray-200" 
                        style={{ backgroundColor: themeColor }}
                      />
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {THEME_COLORS.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setThemeColor(color.value)}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                            themeColor === color.value 
                              ? "border-gray-900 ring-2 ring-offset-2 ring-gray-400" 
                              : "border-transparent hover:border-gray-300"
                          )}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <div className="pt-2 border-t">
                      <label className="text-xs text-gray-500 block mb-1">Custom color</label>
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="w-full h-8 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting || sections.length === 0}
                className={cn(
                  "gap-2 h-9 px-4 rounded-lg border-gray-300",
                  sections.length === 0 && "opacity-50"
                )}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Export PDF</span>
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving || sections.length === 0}
                className={cn(
                  "gap-2 h-9 px-5 rounded-lg bg-primary hover:bg-primary/90",
                  sections.length === 0 && "opacity-50"
                )}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Centered layout */}
      <div className="w-full px-6 py-4">
        <div className="flex justify-center gap-6">
          {/* Resume Canvas - Centered */}
          <div className="flex-shrink-0">
            <div className="w-[210mm]">
              <ResumeCanvas
                resumeData={resumeData}
                sections={sections}
                selectedLayout={selectedLayout}
                themeColor={themeColor}
                onResumeDataChange={setResumeData}
                onRemoveSection={removeSection}
              />
            </div>
          </div>

          {/* Helper Section Panel - Fixed width sidebar */}
          <div className="w-[280px] flex-shrink-0">
            <HelperSectionPanel 
              onSectionClick={handleSectionClick}
              addedSections={sections.map(s => s.type)}
            />
          </div>
        </div>
      </div>

      {/* Section Variant Modal */}
      {selectedSectionType && (
        <SectionVariantModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSectionType(null);
          }}
          sectionType={selectedSectionType}
          selectedLayout={selectedLayout}
          onSelectVariant={handleVariantSelect}
          photo={resumeData.personalInfo?.photo}
          fullName={resumeData.personalInfo?.fullName}
          onPhotoChange={(photo) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                photo: photo || '',
              },
            })
          }
        />
      )}
    </div>
  );
};

export default ScratchBuilderV2;
