/**
 * Achievements Metrics Variant
 *
 * Focus on numbers and statistics - extracts metrics from titles.
 * Shows large accent-colored numbers/percentages prominently.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { AchievementsVariantProps } from '../types';

// Extract numbers/percentages from text
const extractMetric = (text: string): { metric: string | null; rest: string } => {
  // Match percentages, numbers with units, or plain numbers
  const patterns = [
    /(\d+%)/,           // percentages: 40%
    /(\d+\+)/,          // numbers with plus: 100+
    /(\$[\d,]+[KMB]?)/i, // money: $50K, $1M
    /(\d+[KMB])/i,      // abbreviated numbers: 5K, 10M
    /(#\d+)/,           // rankings: #1
    /(\d+x)/i,          // multipliers: 3x
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        metric: match[1],
        rest: text.replace(match[1], '').trim().replace(/^[-–—,\s]+/, '').trim()
      };
    }
  }

  // Check for plain numbers at start
  const plainNumber = text.match(/^(\d+)\s/);
  if (plainNumber) {
    return {
      metric: plainNumber[1],
      rest: text.replace(plainNumber[1], '').trim()
    };
  }

  return { metric: null, rest: text };
};

export const AchievementsMetrics: React.FC<AchievementsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddAchievement,
  onRemoveAchievement,
}) => {
  const { typography } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '12px',
    }}>
      {items.map((item, index) => {
        const { metric, rest } = extractMetric(item.title);
        const displayTitle = metric ? rest : item.title;

        return (
          <div
            key={item.id || index}
            className="group relative"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}
          >
            {editable && onRemoveAchievement && (
              <button
                onClick={() => onRemoveAchievement(item.id)}
                className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            {/* Large metric display */}
            <div style={{
              minWidth: '50px',
              textAlign: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                fontSize: scaleFontSize('18px'),
                fontWeight: 700,
                color: accentColor,
                lineHeight: 1,
              }}>
                {metric || '★'}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: scaleFontSize(typography.body.fontSize),
                fontWeight: 500,
                color: typography.itemTitle.color,
                lineHeight: 1.3,
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`achievements.${index}.title`}
                    value={item.title}
                    placeholder="40% improvement in..."
                  />
                ) : (
                  displayTitle
                )}
              </div>
              
              {(item.description || editable) && (
                <div style={{
                  fontSize: scaleFontSize('11px'),
                  color: '#6b7280',
                  marginTop: '2px',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`achievements.${index}.description`}
                      value={item.description || ''}
                      placeholder="Additional context..."
                      multiline
                    />
                  ) : (
                    item.description
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {editable && onAddAchievement && (
        <button
          onClick={onAddAchievement}
          className="flex items-center justify-center gap-1 text-xs px-3 py-3 rounded-lg border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Metric
        </button>
      )}
    </div>
  );
};

export default AchievementsMetrics;

