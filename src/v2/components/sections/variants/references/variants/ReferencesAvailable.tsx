/**
 * References Available Variant
 *
 * Simple compact "Available upon request" message.
 * Uses theme colors for styling.
 */

import React from 'react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { ReferencesVariantProps } from '../types';

export const ReferencesAvailable: React.FC<ReferencesVariantProps> = ({
  config,
  accentColor,
}) => {
  const { typography } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  return (
    <div
      style={{
        padding: '8px 12px',
        backgroundColor: `${accentColor}06`,
        borderRadius: '6px',
        borderLeft: `2px solid ${accentColor}`,
        fontSize: scaleFontSize(typography.body.fontSize),
        color: typography.body.color,
        fontStyle: 'italic',
      }}
    >
      Available upon request
    </div>
  );
};

export default ReferencesAvailable;
