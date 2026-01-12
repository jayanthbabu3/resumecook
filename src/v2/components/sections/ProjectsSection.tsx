/**
 * Projects Section Component (V2)
 *
 * Renders projects with multiple visual variants using variant renderer.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { ProjectsVariantRenderer } from './variants/projects/ProjectsVariantRenderer';
import type { ProjectsVariant } from './variants/projects/types';

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack?: string[];
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  current?: boolean;
  url?: string;
  githubUrl?: string;
  role?: string;
  highlights?: string[];
}

interface ProjectsSectionProps {
  items: ProjectItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Projects',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { spacing, colors } = config;
  const accent = colors.primary;

  // Determine the variant to use
  const variant: ProjectsVariant = (variantOverride as ProjectsVariant) || 'standard';

  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  if (!items?.length && !editable) return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <ProjectsVariantRenderer
          variant={variant}
          items={items || []}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddProject={onAddItem}
          onRemoveProject={onRemoveItem}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
