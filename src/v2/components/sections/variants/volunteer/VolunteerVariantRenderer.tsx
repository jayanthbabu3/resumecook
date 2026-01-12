/**
 * Volunteer Variant Renderer
 */

import React from 'react';
import type { VolunteerVariantProps, VolunteerVariant } from './types';
import {
  VolunteerStandard,
  VolunteerCompact,
  VolunteerTimeline,
  VolunteerCards,
} from './variants';

export type { VolunteerVariantProps, VolunteerVariant } from './types';

interface VolunteerVariantRendererProps extends VolunteerVariantProps {
  variant: VolunteerVariant;
}

export const VolunteerVariantRenderer: React.FC<VolunteerVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddVolunteer,
  onRemoveVolunteer,
  formatDate,
}) => {
  const props: VolunteerVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddVolunteer,
    onRemoveVolunteer,
    formatDate,
  };

  switch (variant) {
    case 'standard':
      return <VolunteerStandard {...props} />;
    case 'compact':
      return <VolunteerCompact {...props} />;
    case 'timeline':
      return <VolunteerTimeline {...props} />;
    case 'cards':
      return <VolunteerCards {...props} />;
    default:
      return <VolunteerStandard {...props} />;
  }
};

export default VolunteerVariantRenderer;
