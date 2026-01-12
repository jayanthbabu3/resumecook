/**
 * Patents Variant Renderer
 */

import React from 'react';
import type { PatentsVariantProps, PatentsVariant } from './types';
import {
  PatentsStandard,
  PatentsDetailed,
  PatentsCompact,
  PatentsCards,
} from './variants';

export type { PatentsVariantProps, PatentsVariant } from './types';

interface PatentsVariantRendererProps extends PatentsVariantProps {
  variant: PatentsVariant;
}

export const PatentsVariantRenderer: React.FC<PatentsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddPatent,
  onRemovePatent,
  formatDate,
}) => {
  const props: PatentsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddPatent,
    onRemovePatent,
    formatDate,
  };

  switch (variant) {
    case 'standard':
      return <PatentsStandard {...props} />;
    case 'detailed':
      return <PatentsDetailed {...props} />;
    case 'compact':
      return <PatentsCompact {...props} />;
    case 'cards':
      return <PatentsCards {...props} />;
    default:
      return <PatentsStandard {...props} />;
  }
};

export default PatentsVariantRenderer;
