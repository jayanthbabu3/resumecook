/**
 * Achievements Section Component (V2)
 * 
 * Renders achievements with multiple visual variants.
 */

import React from 'react';
import type { TemplateConfig, AchievementsVariant, AchievementItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { Trophy, Award, Star, X, Plus } from 'lucide-react';

interface AchievementsSectionProps {
  items: AchievementItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: AchievementsVariant;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Achievements',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { typography, spacing, colors } = config;
  
  // Map variant IDs from sectionVariants.ts to internal variant names
  const mapVariantId = (variantId: string | undefined): AchievementsVariant => {
    if (!variantId) return config.achievements?.variant || 'list';
    const variantMap: Record<string, AchievementsVariant> = {
      'achievements-classic': 'bullets',
      'achievements-metrics': 'metrics',
      'achievements-cards': 'metrics',  // Card Layout shows metrics style
      'achievements-timeline': 'timeline',
      'achievements-minimal': 'minimal',
    };
    return variantMap[variantId] || config.achievements?.variant || 'list';
  };
  
  const variant: AchievementsVariant = mapVariantId(variantOverride);
  const showIndicators = config.achievements?.showIndicators ?? true;

  if (!items || items.length === 0) {
    if (!editable) return null;
  }

  const renderAddButton = () => {
    if (!editable || !onAddItem) return null;
    return (
      <button
        onClick={onAddItem}
        style={{
          marginTop: '12px',
          padding: '6px 12px',
          fontSize: '12px',
          color: colors.primary,
          background: 'transparent',
          border: `1px dashed ${colors.primary}`,
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Plus style={{ width: '12px', height: '12px' }} />
        Add Achievement
      </button>
    );
  };

  const renderDeleteButton = (itemId: string) => {
    if (!editable || !onRemoveItem) return null;
    return (
      <button
        onClick={() => onRemoveItem(itemId)}
        style={{
          padding: '4px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#ef4444',
          opacity: 0.6,
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
        title="Remove achievement"
      >
        <X style={{ width: '14px', height: '14px' }} />
      </button>
    );
  };

  // Variant: Title - description format (default)
  const renderListVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          style={{
            marginBottom: spacing.bulletGap,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <div style={{ flex: 1 }}>
            {editable ? (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
                  <InlineEditableText value={item.title} path={`achievements.${index}.title`} placeholder="Title" />
                </span>
                <span> - </span>
                <InlineEditableText value={item.description} path={`achievements.${index}.description`} placeholder="Description" multiline />
              </div>
            ) : (
              <>
                <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.title}</span>
                <span> - </span>
                <span>{item.description}</span>
              </>
            )}
          </div>
          {renderDeleteButton(item.id)}
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  // Variant: Bulleted list with icons
  const renderBulletsVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: spacing.bulletGap,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
          }}
        >
          {showIndicators && (
            <Trophy style={{ width: '14px', height: '14px', color: colors.primary, flexShrink: 0, marginTop: '2px' }} />
          )}
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
              {editable ? (
                <InlineEditableText value={item.title} path={`achievements.${index}.title`} placeholder="Title" />
              ) : (
                item.title
              )}
            </span>
            {item.description && (
              <>
                <span> - </span>
                {editable ? (
                  <InlineEditableText value={item.description} path={`achievements.${index}.description`} placeholder="Description" />
                ) : (
                  <span>{item.description}</span>
                )}
              </>
            )}
          </div>
          {renderDeleteButton(item.id)}
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  // Variant: Card style with background
  const renderCardsVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          className="group relative"
          style={{
            padding: '10px 12px',
            marginBottom: spacing.itemGap,
            backgroundColor: colors.background.accent || '#fef3c7',
            borderRadius: '6px',
            borderLeft: `3px solid ${colors.primary}`,
          }}
        >
          {editable && onRemoveItem && (
            <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
              {renderDeleteButton(item.id)}
            </div>
          )}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            fontSize: typography.itemTitle.fontSize,
            color: typography.itemTitle.color,
            marginBottom: '4px',
            paddingRight: editable ? '24px' : '0',
          }}>
            {showIndicators && <Award style={{ width: '14px', height: '14px', color: colors.primary }} />}
            {editable ? (
              <InlineEditableText value={item.title} path={`achievements.${index}.title`} placeholder="Title" />
            ) : (
              item.title
            )}
          </div>
          <div style={{
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
          }}>
            {editable ? (
              <InlineEditableText value={item.description} path={`achievements.${index}.description`} placeholder="Description" multiline />
            ) : (
              item.description
            )}
          </div>
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  // Variant: Numbered list
  const renderNumberedVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            marginBottom: spacing.itemGap,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
          }}
        >
          {showIndicators && (
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              backgroundColor: colors.primary,
              color: '#ffffff',
              borderRadius: '50%',
              fontSize: '11px',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {index + 1}
            </span>
          )}
          <div>
            <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
              {editable ? (
                <InlineEditableText value={item.title} path={`achievements.${index}.title`} placeholder="Title" />
              ) : (
                item.title
              )}
            </span>
            {item.description && (
              <div style={{ marginTop: '2px' }}>
                {editable ? (
                  <InlineEditableText value={item.description} path={`achievements.${index}.description`} placeholder="Description" />
                ) : (
                  item.description
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  // Variant: Timeline style
  const renderTimelineVariant = () => (
    <div style={{ marginTop: spacing.headingToContent, position: 'relative', paddingLeft: '20px' }}>
      <div style={{
        position: 'absolute',
        left: '6px',
        top: '4px',
        bottom: '4px',
        width: '2px',
        backgroundColor: colors.primary,
        opacity: 0.3,
      }} />
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          style={{
            position: 'relative',
            marginBottom: spacing.itemGap,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
          }}
        >
          <div style={{
            position: 'absolute',
            left: '-18px',
            top: '4px',
            width: '10px',
            height: '10px',
            backgroundColor: colors.primary,
            borderRadius: '50%',
          }} />
          <div style={{ fontWeight: 600, color: typography.itemTitle.color }}>
            {editable ? (
              <InlineEditableText value={item.title} path={`achievements.${index}.title`} placeholder="Title" />
            ) : (
              item.title
            )}
          </div>
          <div>
            {editable ? (
              <InlineEditableText value={item.description} path={`achievements.${index}.description`} placeholder="Description" />
            ) : (
              item.description
            )}
          </div>
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  // Variant: Clean minimal text
  const renderMinimalVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          style={{
            marginBottom: spacing.bulletGap,
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
          }}
        >
          <span style={{ marginRight: '6px', color: colors.text.muted }}>•</span>
          {editable ? (
            <InlineEditableText value={item.title} path={`achievements.${index}.title`} placeholder="Achievement" />
          ) : (
            <span>{item.title}</span>
          )}
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  // Variant: Metrics cards with percentages/numbers
  const renderMetricsVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {(items || []).map((item, index) => {
          // Extract metric value from title (e.g., "40%" or "100K")
          const metricMatch = item.title?.match(/^(\d+[%KMB]?)/i);
          const metricValue = metricMatch ? metricMatch[1] : item.title;
          const metricLabel = item.description || item.title?.replace(/^\d+[%KMB]?\s*/i, '') || 'Achievement';
          
          // Alternate colors for visual variety
          const bgColors = ['#dcfce7', '#dbeafe', '#fef3c7', '#fce7f3', '#e0e7ff'];
          const textColors = ['#166534', '#1e40af', '#92400e', '#9d174d', '#3730a3'];
          const colorIndex = index % bgColors.length;
          
          return (
            <div
              key={item.id}
              className="group relative"
              style={{
                padding: '12px 16px',
                backgroundColor: bgColors[colorIndex],
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              {editable && onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  }}
                >
                  <X style={{ width: '12px', height: '12px' }} />
                </button>
              )}
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: textColors[colorIndex],
                marginBottom: '2px',
              }}>
                {editable ? (
                  <InlineEditableText value={metricValue} path={`achievements.${index}.title`} placeholder="40%" />
                ) : (
                  metricValue
                )}
              </div>
              <div style={{
                fontSize: typography.small.fontSize,
                color: typography.body.color,
              }}>
                {editable ? (
                  <InlineEditableText value={metricLabel} path={`achievements.${index}.description`} placeholder="Revenue Growth" />
                ) : (
                  metricLabel
                )}
              </div>
            </div>
          );
        })}
      </div>
      {renderAddButton()}
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'bullets':
        return renderBulletsVariant();
      case 'cards':
        return renderCardsVariant();
      case 'metrics':
        return renderMetricsVariant();
      case 'numbered':
        return renderNumberedVariant();
      case 'timeline':
        return renderTimelineVariant();
      case 'minimal':
        return renderMinimalVariant();
      case 'list':
      default:
        return renderListVariant();
    }
  };

  return (
    <div style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} />
      {renderContent()}
    </div>
  );
};

export default AchievementsSection;
