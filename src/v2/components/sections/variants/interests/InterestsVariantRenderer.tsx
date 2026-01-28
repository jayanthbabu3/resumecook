/**
 * Interests Variant Renderer
 */

import React from 'react';
import type { InterestsVariantProps, InterestsVariant } from './types';
import {
  InterestsStandard,
  InterestsPills,
  InterestsTags,
  InterestsList,
  InterestsDetailed,
  InterestsGrid,
  InterestsIcons,
  InterestsInline,
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
    case 'tags':
      return <InterestsTags {...props} />;
    case 'list':
      return <InterestsList {...props} />;
    case 'detailed':
      return <InterestsDetailed {...props} />;
    case 'grid':
      return <InterestsGrid {...props} />;
    case 'icons':
      return <InterestsIcons {...props} />;
    case 'inline':
      return <InterestsInline {...props} />;
    default:
      return <InterestsPills {...props} />;
  }
};

export default InterestsVariantRenderer;
