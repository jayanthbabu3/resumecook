/**
 * Scratch Builder V2 - Main Page
 * 
 * Blank canvas resume builder where users can add sections from scratch.
 * Layout is determined by the selected layout from the layout selection screen.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Download, Save, Loader2, ArrowLeft } from 'lucide-react';
import { useScratchResume } from '../hooks/useScratchResume';
import { ResumeCanvas } from '../components/scratch/ResumeCanvas';
import { HelperSectionPanel } from '../components/scratch/HelperSectionPanel';
import { SectionVariantModal } from '../components/scratch/SectionVariantModal';
import { toast } from 'sonner';
import type { V2SectionType } from '../types/resumeData';
import { generatePDFFromPreview } from '@/lib/pdfGenerator';
import type { SectionVariant } from '@/constants/sectionVariants';
import { applyVariantDataToResume } from '../utils/variantDataApplier';
import { resumeService } from '@/lib/firestore/resumeService';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { convertV2ToV1 } from '../utils/dataConverter';
import { generateScratchConfig } from '../utils/scratchConfigGenerator';

const ScratchBuilderV2: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();
  const {
    resumeData,
    setResumeData,
    selectedLayout,
    sections,
    themeColor,
    addSection,
    removeSection,
  } = useScratchResume();

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      {/* Subheader */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Back button and layout info */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/builder/scratch-v2/select-layout')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Change Layout</span>
              </Button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-xs">Layout:</span>
                <span className="font-medium">{selectedLayout.name}</span>
              </div>
            </div>

            {/* Right: Action buttons */}
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
                    <span className="hidden sm:inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export PDF</span>
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span className="hidden sm:inline">Save</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-4">
          {/* Resume Canvas */}
          <div className="flex justify-center">
            <div className="w-full max-w-[210mm]">
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

          {/* Helper Section Panel */}
          <HelperSectionPanel onSectionClick={handleSectionClick} />
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
        />
      )}
    </div>
  );
};

export default ScratchBuilderV2;

