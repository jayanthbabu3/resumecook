/**
 * Languages Variant Renderer
 */

import React from 'react';
import type { LanguagesVariantProps, LanguagesVariant } from './types';
import {
  LanguagesStandard,
  LanguagesCompact,
  LanguagesPills,
  LanguagesGrid,
  LanguagesFlags,
  LanguagesBars,
} from './variants';

export type { LanguagesVariantProps, LanguagesVariant } from './types';

interface LanguagesVariantRendererProps extends LanguagesVariantProps {
  variant: LanguagesVariant;
}

export const LanguagesVariantRenderer: React.FC<LanguagesVariantRendererProps> = ({
  variant,
  items,
  config,
  accentColor,
  editable = false,
  onAddLanguage,
  onRemoveLanguage,
}) => {
  const props: LanguagesVariantProps = {
    items,
    config,
    accentColor,
    editable,
    onAddLanguage,
    onRemoveLanguage,
  };

  switch (variant) {
    case 'standard':
      return <LanguagesStandard {...props} />;
    case 'bars':
      return <LanguagesBars {...props} />;
    case 'grid':
      return <LanguagesGrid {...props} />;
    case 'pills':
      return <LanguagesPills {...props} />;
    case 'flags':
      return <LanguagesFlags {...props} />;
    case 'compact':
    case 'inline':
    default:
      return <LanguagesCompact {...props} />;
  }
};

export default LanguagesVariantRenderer;
