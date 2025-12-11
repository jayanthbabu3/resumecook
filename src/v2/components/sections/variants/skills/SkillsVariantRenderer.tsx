/**
 * Skills Variant Renderer
 * 
 * Main dispatcher component that renders skills based on the selected variant.
 * This is the entry point for variant-aware skills rendering.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types';
import type { SkillItem } from '@/types/resume';
import { SkillsPills } from './SkillsPills';
import { SkillsTags } from './SkillsTags';
import { SkillsBars } from './SkillsBars';
import { SkillsGrouped } from './SkillsGrouped';
import { SkillsInline } from './SkillsInline';

// ============================================================================
// TYPES
// ============================================================================

export interface SkillsVariantProps {
  /** Skills data */
  items: SkillItem[];
  /** Template configuration */
  config: TemplateConfig;
  /** Primary/accent color */
  accentColor: string;
  /** Enable inline editing */
  editable?: boolean;
}

export type SkillsVariant = 
  | 'pills' 
  | 'tags' 
  | 'list' 
  | 'grouped' 
  | 'bars' 
  | 'dots' 
  | 'columns' 
  | 'inline';

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
}) => {
  const props: SkillsVariantProps = {
    items,
    config,
    accentColor,
    editable,
  };

  switch (variant) {
    case 'pills':
      return <SkillsPills {...props} />;
    
    case 'tags':
      return <SkillsTags {...props} />;
    
    case 'bars':
    case 'dots':
      return <SkillsBars {...props} showDots={variant === 'dots'} />;
    
    case 'grouped':
      return <SkillsGrouped {...props} />;
    
    case 'inline':
    case 'list':
      return <SkillsInline {...props} separator={variant === 'list' ? 'comma' : 'bullet'} />;
    
    case 'columns':
      return <SkillsGrouped {...props} columns={2} />;
    
    default:
      // Default to pills
      return <SkillsPills {...props} />;
  }
};

export default SkillsVariantRenderer;
