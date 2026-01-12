/**
 * References Variant Renderer
 */

import React from 'react';
import type { ReferencesVariantProps, ReferencesVariant } from './types';
import {
  ReferencesStandard,
  ReferencesCompact,
  ReferencesCards,
  ReferencesAvailable,
} from './variants';

export type { ReferencesVariantProps, ReferencesVariant } from './types';

interface ReferencesVariantRendererProps extends ReferencesVariantProps {
  variant: ReferencesVariant;
}

export const ReferencesVariantRenderer: React.FC<ReferencesVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddReference,
  onRemoveReference,
}) => {
  const props: ReferencesVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddReference,
    onRemoveReference,
  };

  switch (variant) {
    case 'standard':
      return <ReferencesStandard {...props} />;
    case 'compact':
      return <ReferencesCompact {...props} />;
    case 'cards':
      return <ReferencesCards {...props} />;
    case 'available':
      return <ReferencesAvailable {...props} />;
    default:
      return <ReferencesStandard {...props} />;
  }
};

export default ReferencesVariantRenderer;
