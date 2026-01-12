/**
 * Publications Variant Renderer
 */

import React from 'react';
import type { PublicationsVariantProps, PublicationsVariant } from './types';
import {
  PublicationsAcademic,
  PublicationsModern,
  PublicationsCompact,
  PublicationsCards,
} from './variants';

export type { PublicationsVariantProps, PublicationsVariant } from './types';

interface PublicationsVariantRendererProps extends PublicationsVariantProps {
  variant: PublicationsVariant;
}

export const PublicationsVariantRenderer: React.FC<PublicationsVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddPublication,
  onRemovePublication,
  formatDate,
}) => {
  const props: PublicationsVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddPublication,
    onRemovePublication,
    formatDate,
  };

  switch (variant) {
    case 'academic':
      return <PublicationsAcademic {...props} />;
    case 'modern':
      return <PublicationsModern {...props} />;
    case 'compact':
      return <PublicationsCompact {...props} />;
    case 'cards':
      return <PublicationsCards {...props} />;
    default:
      return <PublicationsModern {...props} />;
  }
};

export default PublicationsVariantRenderer;
