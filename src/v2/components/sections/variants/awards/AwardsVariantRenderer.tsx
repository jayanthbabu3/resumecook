/**
 * Awards Variant Renderer
 */

import React from 'react';
import type { AwardsVariantProps, AwardsVariant } from './types';
import {
  AwardsStandard,
  AwardsTrophies,
  AwardsCompact,
  AwardsCards,
  AwardsTimeline,
} from './variants';

export type { AwardsVariantProps, AwardsVariant } from './types';

interface AwardsVariantRendererProps extends AwardsVariantProps {
  variant: AwardsVariant;
}

export const AwardsVariantRenderer: React.FC<AwardsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddAward,
  onRemoveAward,
  formatDate,
}) => {
  const props: AwardsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddAward,
    onRemoveAward,
    formatDate,
  };

  switch (variant) {
    case 'standard':
      return <AwardsStandard {...props} />;
    case 'cards':
      return <AwardsCards {...props} />;
    case 'timeline':
      return <AwardsTimeline {...props} />;
    case 'trophies':
      return <AwardsTrophies {...props} />;
    case 'compact':
      return <AwardsCompact {...props} />;
    default:
      return <AwardsStandard {...props} />;
  }
};

export default AwardsVariantRenderer;
