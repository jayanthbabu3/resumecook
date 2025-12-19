/**
 * Skills Variant Renderer
 * 
 * Main dispatcher component that renders skills based on the selected variant.
 * Supports multiple industry-ready variants with full inline editing support.
 */

import React from 'react';
import type { SkillsVariantProps, SkillsVariant } from './types';
import {
  SkillsPillsEnhanced,
  SkillsBarsEnhanced,
  SkillsDotsEnhanced,
  SkillsGroupedEnhanced,
  SkillsModern,
  SkillsCompact,
  SkillsColumns,
  SkillsCategoryLines,
} from './variants';

// Re-export types for external use
export type { SkillsVariantProps, SkillsVariant } from './types';

interface SkillsVariantRendererProps extends SkillsVariantProps {
  /** Variant to render */
  variant: SkillsVariant;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const SkillsVariantRenderer: React.FC<SkillsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill,
}) => {
  const props: SkillsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddSkill,
    onRemoveSkill,
    onUpdateSkill,
  };

  switch (variant) {
    case 'pills':
    case 'tags':
      return <SkillsPillsEnhanced {...props} />;
    
    case 'bars':
      return <SkillsBarsEnhanced {...props} />;
    
    case 'dots':
      return <SkillsDotsEnhanced {...props} />;
    
    case 'grouped':
      return <SkillsGroupedEnhanced {...props} />;
    
    case 'columns':
      return <SkillsColumns {...props} columns={2} />;

    case 'category-lines':
      {
        const sepValue = props.config.skills.separator;
        const separator: 'bullet' | 'comma' | 'pipe' =
          sepValue === ', '
            ? 'comma'
            : sepValue === ' | '
              ? 'pipe'
              : 'bullet';

        return (
          <SkillsCategoryLines
            {...props}
            columns={props.config.skills.columns || 1}
            separator={separator}
          />
        );
      }

    case 'modern':
    case 'detailed':
      return <SkillsModern {...props} />;
    
    case 'inline':
    case 'list':
    case 'compact':
      return <SkillsCompact {...props} separator={variant === 'list' ? 'comma' : 'bullet'} />;
    
    case 'radar':
    default:
      // Default to pills
      return <SkillsPillsEnhanced {...props} />;
  }
};

export default SkillsVariantRenderer;
