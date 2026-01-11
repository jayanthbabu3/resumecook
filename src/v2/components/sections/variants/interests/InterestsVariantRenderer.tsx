/**
 * Interests Variant Renderer
 */

import React from 'react';
import type { InterestsVariantProps, InterestsVariant } from './types';
import {
  InterestsStandard,
  InterestsPills,
  InterestsList,
  InterestsDetailed,
  InterestsGrid,
  InterestsIcons,
} from './variants';

export type { InterestsVariantProps, InterestsVariant } from './types';

interface InterestsVariantRendererProps extends InterestsVariantProps {
  variant: InterestsVariant;
}

export const InterestsVariantRenderer: React.FC<InterestsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddInterest,
  onRemoveInterest,
}) => {
  const props: InterestsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddInterest,
    onRemoveInterest,
  };

  switch (variant) {
    case 'standard':
      return <InterestsStandard {...props} />;
    case 'pills':
    case 'compact': // Map compact to pills for a cleaner look
      return <InterestsPills {...props} />;
    case 'list':
      return <InterestsList {...props} />;
    case 'detailed':
      return <InterestsDetailed {...props} />;
    case 'grid':
      return <InterestsGrid {...props} />;
    case 'icons':
      return <InterestsIcons {...props} />;
    default:
      return <InterestsPills {...props} />;
  }
};

export default InterestsVariantRenderer;
