/**
 * Education Variant Renderer
 * 
 * Dispatcher component that renders education based on the selected variant.
 * Supports multiple industry-ready variants with full inline editing support.
 */

import React from 'react';
import type { EducationVariantProps, EducationVariant } from './types';
import {
  EducationStandard,
  EducationTimeline,
  EducationCompact,
  EducationCards,
  EducationMinimal,
  EducationAcademic,
} from './variants';

// Re-export types for external use
export type { EducationVariantProps, EducationVariant } from './types';

interface EducationVariantRendererProps extends EducationVariantProps {
  /** Variant to render */
  variant: EducationVariant;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const EducationVariantRenderer: React.FC<EducationVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddEducation,
  onRemoveEducation,
  formatDate,
}) => {
  const props: EducationVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddEducation,
    onRemoveEducation,
    formatDate,
  };

  // Dispatch based on variant
  switch (variant) {
    case 'standard':
      return <EducationStandard {...props} />;
    case 'compact':
      return <EducationCompact {...props} />;
    case 'timeline':
      return <EducationTimeline {...props} />;
    case 'cards':
      return <EducationCards {...props} />;
    case 'minimal':
      return <EducationMinimal {...props} />;
    case 'academic':
      return <EducationAcademic {...props} />;
    case 'detailed':
    case 'modern':
    default:
      // Default to standard for unimplemented variants
      return <EducationStandard {...props} />;
  }
};

export default EducationVariantRenderer;
