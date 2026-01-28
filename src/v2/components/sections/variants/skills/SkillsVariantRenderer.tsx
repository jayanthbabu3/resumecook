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
  SkillsTagsEnhanced,
  SkillsBarsEnhanced,
  SkillsDotsEnhanced,
  SkillsGroupedEnhanced,
  SkillsModern,
  SkillsCompact,
  SkillsColumns,
  SkillsCategoryLines,
  SkillsTable,
} from './variants';
import { SkillsBorderedTags } from './SkillsBorderedTags';
import { SkillsPillsAccent } from './SkillsPillsAccent';
import { SkillsInlineDots } from './SkillsInlineDots';
import { SkillsBoxed } from './SkillsBoxed';

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
  // Helper to get skill name from various possible formats
  const getSkillName = (skill: SkillsVariantProps['items'][0]): string | null => {
    // V2 format: individual skill with name
    if (skill.name && skill.name.trim()) return skill.name;
    // Legacy format: grouped skills with items array
    const legacySkill = skill as typeof skill & { items?: string[] };
    if (legacySkill.items && legacySkill.items.length > 0) {
      return legacySkill.items.filter(Boolean).join(', ');
    }
    // No valid name - return null (will be filtered out)
    // Don't use category name as fallback - that creates duplicate entries
    return null;
  };

  // Normalize items and filter out those without valid names
  // This filters out placeholder skills created when adding new categories
  const normalizedItems = items
    .map(item => ({
      ...item,
      name: getSkillName(item) || '',
    }))
    .filter(item => item.name && item.name.trim());

  const props: SkillsVariantProps = {
    items: normalizedItems,
    config,
    accentColor,
    editable,
    onAddSkill,
    onRemoveSkill,
    onUpdateSkill,
  };

  switch (variant) {
    case 'pills':
      return <SkillsPillsEnhanced {...props} />;
    
    case 'tags':
      return <SkillsTagsEnhanced {...props} />;
    
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
    
    case 'bordered-tags':
      // Production-ready bordered tags variant
      return (
        <SkillsBorderedTags
          skills={items}
          config={config}
          accentColor={accentColor}
          editable={editable}
        />
      );
    
    case 'pills-accent':
      // Production-ready accent pills variant
      return (
        <SkillsPillsAccent
          skills={items}
          config={config}
          accentColor={accentColor}
          editable={editable}
        />
      );
    
    case 'inline-dots':
      // Production-ready inline with dots variant
      return (
        <SkillsInlineDots
          skills={items}
          config={config}
          accentColor={accentColor}
          editable={editable}
        />
      );

    case 'table':
      // Table format with category rows
      return <SkillsTable {...props} />;

    case 'boxed':
      // Stacked bordered boxes - one skill per box
      return (
        <SkillsBoxed
          skills={items}
          config={config}
          accentColor={accentColor}
          editable={editable}
        />
      );

    case 'radar':
    default:
      // Default to pills
      return <SkillsPillsEnhanced {...props} />;
  }
};

export default SkillsVariantRenderer;
