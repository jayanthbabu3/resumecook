import React from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { GridBasedSection } from "../../types/gridBuilder";
import { GridGuides } from "./GridGuides";
import { GridSection } from "./GridSection";
import { SectionControls } from "./SectionControls";
import { WidthControl } from "./WidthControl";
import { cn } from "@/lib/utils";

interface GridCanvasProps {
  sections: GridBasedSection[];
  onUpdateSectionLayout: (id: string, layout: Partial<GridBasedSection["layout"]>) => void;
  onDeleteSection?: (id: string) => void;
  // For inline editing inside grid sections
  resumeData: any;
  templateConfig: any;
}

const COLUMN_COUNT = 12;
const ROW_HEIGHT = 40;
const MARGIN: [number, number] = [8, 12];

export const GridCanvas: React.FC<GridCanvasProps> = ({
  sections,
  onUpdateSectionLayout,
  onDeleteSection,
  resumeData,
  templateConfig,
}) => {
  const [isInteracting, setIsInteracting] = React.useState(false);

  const layout: Layout[] = React.useMemo(
    () =>
      sections.map((section) => ({
        i: section.id,
        // react-grid-layout uses 0-based column index
        x: Math.max(0, Math.min(COLUMN_COUNT - 1, section.layout.column - 1)),
        y: section.layout.row,
        w: section.layout.span,
        h: section.layout.height ?? 3,
        minW: section.constraints?.minSpan ?? 4,
        maxW: section.constraints?.maxSpan ?? 12,
        isDraggable: !section.constraints?.locked,
        isResizable: !section.constraints?.sizeFixed,
      })),
    [sections]
  );

  const handleLayoutChange = React.useCallback(
    (nextLayout: Layout[]) => {
      nextLayout.forEach((item) => {
        const section = sections.find((s) => s.id === item.i);
        if (!section) return;
        onUpdateSectionLayout(section.id, {
          column: item.x + 1,
          span: item.w,
          row: item.y,
          height: item.h,
        });
      });
    },
    [sections, onUpdateSectionLayout]
  );

  return (
    <div
      className="relative mx-auto bg-white shadow-2xl border border-gray-200 rounded-lg overflow-hidden"
      style={{
        width: "210mm",
        minHeight: "297mm",
        maxWidth: "210mm",
      }}
    >
      <div className="relative p-8">
        <GridGuides columns={COLUMN_COUNT} active={isInteracting} />
        <GridLayout
          className={cn("layout")}
          cols={COLUMN_COUNT}
          rowHeight={ROW_HEIGHT}
          width={794}
          margin={MARGIN}
          compactType="vertical"
          preventCollision
          draggableHandle=".grid-drag-handle"
          isDraggable
          isResizable
          layout={layout}
          onLayoutChange={handleLayoutChange}
          onDragStart={() => setIsInteracting(true)}
          onDragStop={() => setIsInteracting(false)}
          onResizeStart={() => setIsInteracting(true)}
          onResizeStop={() => setIsInteracting(false)}
        >
          {sections.map((section) => {
            const currentLayout = layout.find((l) => l.i === section.id);
            return (
              <div key={section.id} className="group">
                <SectionControls
                  section={section}
                  onOpenWidth={() => {
                    // WidthControl is rendered inline below
                  }}
                  onDelete={onDeleteSection ? () => onDeleteSection(section.id) : undefined}
                />
                <div className="absolute -top-9 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <WidthControl
                    value={currentLayout?.w ?? section.layout.span}
                    min={section.constraints?.minSpan ?? 4}
                    max={section.constraints?.maxSpan ?? 12}
                    onChange={(span) =>
                      onUpdateSectionLayout(section.id, {
                        span,
                      })
                    }
                  />
                </div>
                <GridSection
                  section={section}
                  resumeData={resumeData}
                  config={templateConfig}
                />
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
};


