import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ArrowLeft, Loader2, RotateCcw, RotateCw } from "lucide-react";
import { useGridResume } from "../hooks/useGridResume";
import { useGridAutoSave } from "../hooks/useGridAutoSave";
import { useGridHistory } from "../hooks/useGridHistory";
import { GridCanvas } from "../components/gridCanvas/GridCanvas";
import { GridHelperPanel } from "../components/gridCanvas/GridHelperPanel";
import { GridSectionVariantModal } from "../components/gridCanvas/GridSectionVariantModal";
import { LayoutPresetSelector } from "../components/gridCanvas/LayoutPresetSelector";
import { ResumeRenderer } from "../components/ResumeRenderer";
import { StyleOptionsProvider } from "@/contexts/StyleOptionsContext";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { InlineEditProvider } from "@/contexts/InlineEditContext";
import type { V2SectionType } from "../types/resumeData";
import type { GridLayoutPresetId } from "../config/gridLayouts";
import { getSectionDefinition } from "../registry/sectionRegistry";
import type { SectionConfig } from "../types";
import { SENIOR_FRONTEND_DATA } from "../data/mockData";
import { useTemplateConfig } from "../hooks/useTemplateConfig";

const GridCanvasBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const layoutId = (searchParams.get("layout") || "single-column") as GridLayoutPresetId;

  const grid = useGridResume({ initialResumeData: SENIOR_FRONTEND_DATA });
  const { config: templateConfig } = useTemplateConfig({
    templateId: "professional-blue-v2",
    themeColor: grid.themeColor,
  });
  const history = useGridHistory(grid);

  // Basic auto-save stub (can be wired to Firestore later)
  useGridAutoSave({
    state: grid,
    onSave: async () => {
      // TODO: integrate with resumeService/firestore
      return;
    },
  });

  const [selectedSectionType, setSelectedSectionType] = React.useState<V2SectionType | null>(null);
  const [variantModalOpen, setVariantModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!layoutId) {
      navigate("/builder/grid-canvas/select-layout");
    }
  }, [layoutId, navigate]);

  const handleSectionClick = (sectionType: V2SectionType) => {
    setSelectedSectionType(sectionType);
    setVariantModalOpen(true);
  };

  const handleSelectVariant = (variantId: string) => {
    if (!selectedSectionType) return;
    grid.addSection(selectedSectionType, variantId);
    setVariantModalOpen(false);
    setSelectedSectionType(null);
  };

  if (!layoutId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading grid canvas...</p>
        </div>
      </div>
    );
  }

  // Derive section overrides for ResumeRenderer from grid sections
  const sectionOverrides = React.useMemo(() => {
    const overrides: Partial<Record<string, Partial<SectionConfig>>> = {};

    // Map grid layout preset to template layout type
    const layoutType =
      layoutId === "two-column-left-sidebar"
        ? "two-column-left"
        : layoutId === "two-column-right-sidebar"
        ? "two-column-right"
        : "single-column";

    // Basic layout override so preview reflects preset
    overrides["__layout_override"] = {
      type: layoutType as any,
      mainWidth: layoutType === "single-column" ? "100%" : "68%",
      sidebarWidth: layoutType === "single-column" ? undefined : "32%",
      columnGap: layoutType === "single-column" ? undefined : "18px",
    } as any;

    const seenTypes = new Set<string>();

    grid.sections.forEach((section, index) => {
      const def = getSectionDefinition(section.type);

      // Determine column for two-column presets based on span
      const isTwoColumn =
        layoutId === "two-column-left-sidebar" || layoutId === "two-column-right-sidebar";
      const column: "main" | "sidebar" = isTwoColumn && section.layout.span <= 4 ? "sidebar" : "main";

      const order = section.layout.row * 10 + index;

      overrides[section.id] = {
        type: section.type as any,
        id: section.id,
        title: def.defaultTitle,
        defaultTitle: def.defaultTitle,
        enabled: section.enabled,
        order,
        column,
        variant: section.variantId,
      };

      seenTypes.add(section.type);
    });

    // Disable base template sections for types we are managing via grid
    seenTypes.forEach((type) => {
      overrides[`__disable_type_${type}`] = {
        type: type as any,
        enabled: false,
      };
    });

    return overrides;
  }, [grid.sections, layoutId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      {/* Subheader */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/builder/grid-canvas/select-layout")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Change Layout</span>
              </Button>
              <div className="hidden sm:flex flex-col text-xs text-muted-foreground">
                <span className="font-medium">Grid Canvas Builder</span>
                <span>Layout: {layoutId}</span>
              </div>
              <LayoutPresetSelector
                selectedLayoutId={layoutId}
                onSelectLayout={(id) => navigate(`/builder/grid-canvas?layout=${id}`)}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                type="button"
                disabled={!history.canUndo}
                onClick={history.undo}
                aria-label="Undo"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                type="button"
                disabled={!history.canRedo}
                onClick={history.redo}
                aria-label="Redo"
              >
                <RotateCw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-4">
          {/* Grid Canvas */}
          <div className="flex justify-center">
            <InlineEditProvider
              resumeData={grid.resumeData as any}
              setResumeData={grid.setResumeData as any}
            >
              <GridCanvas
                sections={grid.sections}
                onUpdateSectionLayout={grid.updateSectionLayout}
                resumeData={grid.resumeData}
                templateConfig={templateConfig}
              />
            </InlineEditProvider>
          </div>

          {/* Helper Panel */}
          <div className="lg:sticky lg:top-[88px]">
            <GridHelperPanel onSectionClick={handleSectionClick} />
          </div>
        </div>

        {/* Live Preview */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Live Preview
          </h2>
          <div className="flex justify-center">
            <StyleOptionsProvider>
              <StyleOptionsWrapper>
                <div
                  id="grid-builder-preview"
                  className="bg-white shadow-2xl shadow-gray-300/50 rounded-lg overflow-hidden ring-1 ring-gray-200/50"
                  style={{
                    width: "210mm",
                    minHeight: "297mm",
                    minWidth: "210mm",
                    margin: "0 auto",
                  }}
                >
                  <InlineEditProvider
                    resumeData={grid.resumeData as any}
                    setResumeData={grid.setResumeData as any}
                  >
                    <ResumeRenderer
                      resumeData={grid.resumeData}
                      templateId="professional-blue-v2"
                      themeColor={grid.themeColor}
                      sectionOverrides={sectionOverrides}
                      editable={false}
                    />
                  </InlineEditProvider>
                </div>
              </StyleOptionsWrapper>
            </StyleOptionsProvider>
          </div>
        </div>
      </main>

      {/* Variant Modal */}
      <GridSectionVariantModal
        open={variantModalOpen}
        sectionType={selectedSectionType}
        onClose={() => {
          setVariantModalOpen(false);
          setSelectedSectionType(null);
        }}
        onSelectVariant={handleSelectVariant}
      />
    </div>
  );
};

export default GridCanvasBuilder;


