import React from 'react';
import { InlineEditableDate } from './InlineEditableDate';
import { InlineEditableToggle } from './InlineEditableToggle';

interface InlineEditableDateRangeProps {
  pathPrefix: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  formatDate?: (date: string) => string;
  editable?: boolean;
  style?: React.CSSProperties;
  className?: string;
  showCurrentToggle?: boolean;
  currentLabel?: string;
}

export const InlineEditableDateRange: React.FC<InlineEditableDateRangeProps> = ({
  pathPrefix,
  startDate,
  endDate,
  current = false,
  formatDate,
  editable = false,
  style,
  className,
  showCurrentToggle = true,
  currentLabel = "Current position",
}) => {
  if (!editable) {
    // Non-editable mode - just show the formatted dates
    return (
      <span style={style} className={className}>
        {formatDate ? formatDate(startDate || '') : startDate}
        {(startDate && (endDate || current)) && ' – '}
        {current ? 'Present' : (formatDate ? formatDate(endDate || '') : endDate)}
      </span>
    );
  }

  // Editable mode - show date pickers and toggle
  return (
    <div style={style} className={className}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <InlineEditableDate
          path={`${pathPrefix}.startDate`}
          value={startDate}
          formatDisplay={formatDate}
        />
        <span> – </span>
        {current ? (
          <span>Present</span>
        ) : (
          <InlineEditableDate
            path={`${pathPrefix}.endDate`}
            value={endDate}
            formatDisplay={formatDate}
          />
        )}
      </div>
      {showCurrentToggle && (
        <div style={{ marginTop: '4px' }}>
          <InlineEditableToggle
            path={`${pathPrefix}.current`}
            value={current}
            label={currentLabel}
          />
        </div>
      )}
    </div>
  );
};