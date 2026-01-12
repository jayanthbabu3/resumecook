/**
 * Courses Variant Renderer
 *
 * Renders the appropriate courses variant based on the variant prop.
 */

import React from 'react';
import type { CoursesVariant, CoursesVariantProps } from './types';
import { CoursesStandard } from './variants/CoursesStandard';
import { CoursesCompact } from './variants/CoursesCompact';
import { CoursesCards } from './variants/CoursesCards';
import { CoursesDetailed } from './variants/CoursesDetailed';

interface CoursesVariantRendererProps extends CoursesVariantProps {
  variant: CoursesVariant;
}

export const CoursesVariantRenderer: React.FC<CoursesVariantRendererProps> = ({
  variant,
  ...props
}) => {
  switch (variant) {
    case 'compact':
      return <CoursesCompact {...props} />;
    case 'cards':
      return <CoursesCards {...props} />;
    case 'detailed':
      return <CoursesDetailed {...props} />;
    case 'standard':
    default:
      return <CoursesStandard {...props} />;
  }
};

export default CoursesVariantRenderer;
