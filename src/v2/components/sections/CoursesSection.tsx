/**
 * Courses Section Component (V2)
 *
 * Renders courses and training with variant support.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { CoursesVariantRenderer } from './variants/courses/CoursesVariantRenderer';
import type { CoursesVariant, CourseItem } from './variants/courses/types';

interface CoursesSectionProps {
  items: CourseItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Courses & Training',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { spacing, colors } = config;
  const accent = colors.primary;

  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  if (!items?.length && !editable) return null;

  const variant: CoursesVariant = (variantOverride as CoursesVariant) || 'standard';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />

      <div style={{ marginTop: spacing.headingToContent }}>
        <CoursesVariantRenderer
          variant={variant}
          items={items || []}
          config={config}
          accentColor={accent}
          editable={editable}
          onAddCourse={onAddItem}
          onRemoveCourse={onRemoveItem}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};

export default CoursesSection;
