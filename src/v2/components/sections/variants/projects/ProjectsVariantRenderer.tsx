/**
 * Projects Variant Renderer
 * 
 * Dispatcher component that renders projects based on the selected variant.
 * Supports multiple industry-ready variants with full inline editing support.
 */

import React from 'react';
import type { ProjectsVariantProps, ProjectsVariant } from './types';
import {
  ProjectsStandard,
  ProjectsCards,
  ProjectsCompact,
  ProjectsDetailed,
} from './variants';

// Re-export types for external use
export type { ProjectsVariantProps, ProjectsVariant } from './types';

interface ProjectsVariantRendererProps extends ProjectsVariantProps {
  /** Variant to render */
  variant: ProjectsVariant;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ProjectsVariantRenderer: React.FC<ProjectsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddProject,
  onRemoveProject,
  formatDate,
  onAddTechnology,
  onRemoveTechnology,
}) => {
  const props: ProjectsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddProject,
    onRemoveProject,
    formatDate,
    onAddTechnology,
    onRemoveTechnology,
  };

  // Dispatch based on variant
  if (variant === 'cards' || variant === 'grid' || variant === 'projects-card' || variant === 'projects-grid' || variant === 'projects-boxed') {
    return <ProjectsCards {...props} />;
  }

  if (variant === 'detailed' || variant === 'projects-detailed' || variant === 'showcase' || variant === 'projects-showcase' || variant === 'projects-impact') {
    return <ProjectsDetailed {...props} />;
  }

  if (variant === 'compact' || variant === 'projects-compact' || variant === 'minimal' || variant === 'projects-minimal') {
    return <ProjectsCompact {...props} />;
  }

  // Default to standard for 'standard', 'list', 'timeline', etc.
  return <ProjectsStandard {...props} />;
};

export default ProjectsVariantRenderer;
