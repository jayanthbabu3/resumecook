/**
 * Experience Variant Renderer
 * 
 * Dispatcher component that renders experience based on the selected variant.
 * Supports multiple industry-ready variants with full inline editing support.
 */

import React from 'react';
import type { ExperienceVariantProps, ExperienceVariant } from './types';
import { 
  ExperienceStandard,
  ExperienceTimeline,
  ExperienceCompact,
  ExperienceCards,
  ExperienceModern,
  ExperienceMinimal,
} from './variants';

// Re-export types for external use
export type { ExperienceVariantProps, ExperienceVariant } from './types';

interface ExperienceVariantRendererProps extends ExperienceVariantProps {
  /** Variant to render */
  variant: ExperienceVariant;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ExperienceVariantRenderer: React.FC<ExperienceVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
  formatDate,
}) => {
  const props: ExperienceVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddBulletPoint,
    onRemoveBulletPoint,
    onAddExperience,
    onRemoveExperience,
    formatDate,
  };

  // Dispatch based on variant
  switch (variant) {
    case 'standard':
    case 'dates-right':
      // dates-right uses standard layout with dates on right
      return <ExperienceStandard {...props} />;
    case 'compact':
      return <ExperienceCompact {...props} />;
    case 'timeline':
      return <ExperienceTimeline {...props} />;
    case 'cards':
      return <ExperienceCards {...props} />;
    case 'modern':
    case 'left-border':
      // left-border uses modern style with left accent
      return <ExperienceModern {...props} />;
    case 'minimal':
      return <ExperienceMinimal {...props} />;
    case 'detailed':
    case 'dates-left':
      // dates-left uses detailed format with dates on left
      return <ExperienceStandard {...props} />;
    case 'academic':
    case 'creative':
    default:
      // Default to standard for unimplemented variants
      return <ExperienceStandard {...props} />;
  }
};

export default ExperienceVariantRenderer;
