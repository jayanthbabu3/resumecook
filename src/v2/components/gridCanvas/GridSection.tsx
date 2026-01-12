import React from "react";
import type { GridBasedSection } from "../../types/gridBuilder";
import type { TemplateConfig, SectionConfig, V2ResumeData } from "../../types";
import { SummaryVariantRenderer } from "../sections/variants/summary/SummaryVariantRenderer";
import { ExperienceVariantRenderer } from "../sections/variants/experience";
import { EducationVariantRenderer } from "../sections/variants/education";
import { SkillsVariantRenderer } from "../sections/variants/skills";
import { HeaderSection } from "../sections/HeaderSection";
import { getSectionDefinition } from "../../registry/sectionRegistry";
import { cn } from "@/lib/utils";

interface GridSectionProps {
  section: GridBasedSection;
  isDragging?: boolean;
  resumeData: V2ResumeData;
  config: TemplateConfig;
}

export const GridSection: React.FC<GridSectionProps> = ({
  section,
  isDragging,
  resumeData,
  config,
}) => {
  if (!section.enabled) return null;

  const dataTestId = `grid-section-${section.type}`;
  const def = getSectionDefinition(section.type);
  const title = def.defaultTitle;
  const variant = section.variantId || (def.defaultVariant as string);
  const accentColor = config.colors.primary;

  const renderContent = () => {
    switch (section.type) {
      case "header":
        // Use a compact header config inside grid to avoid horizontal overflow.
        // We remove page padding because the grid cell already has its own padding.
        const compactConfig: TemplateConfig = {
          ...config,
          spacing: {
            ...config.spacing,
            pagePadding: {
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            },
          },
        };

        return (
          <div className="w-full max-w-full overflow-hidden">
            <HeaderSection
              resumeData={resumeData}
              config={compactConfig}
              editable
            />
          </div>
        );
      case "summary":
        return (
          <SummaryVariantRenderer
            variant={variant}
            summary={resumeData.personalInfo.summary || ""}
            config={config}
            editable
            sectionTitle={title}
          />
        );
      case "experience":
        return (
          <ExperienceVariantRenderer
            variant={variant}
            items={resumeData.experience || []}
            config={config}
            accentColor={accentColor}
            editable
          />
        );
      case "education":
        return (
          <EducationVariantRenderer
            variant={variant}
            items={resumeData.education || []}
            config={config}
            accentColor={accentColor}
            editable
          />
        );
      case "skills":
        return (
          <SkillsVariantRenderer
            variant={variant}
            items={resumeData.skills || []}
            config={config}
            accentColor={accentColor}
            editable
          />
        );
      default:
        return (
          <div className="p-3 text-[11px] text-muted-foreground">
            Inline editing for the <span className="font-semibold">{section.type}</span> section
            will be added in a later phase. Layout and variants are already configured.
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "relative h-full rounded-md border border-border/40 bg-white shadow-sm overflow-hidden",
        isDragging && "opacity-75 ring-2 ring-primary/40"
      )}
      data-testid={dataTestId}
    >
      <div className="p-3 max-w-full overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};



