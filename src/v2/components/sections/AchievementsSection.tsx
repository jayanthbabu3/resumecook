/**
 * Achievements Section Component (V2)
 * 
 * Renders achievements with multiple visual variants.
 */

import React from 'react';
import type { TemplateConfig, AchievementsVariant } from '../../types';
import type { AchievementItem } from '@/types/resume';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { Trophy, Award, Star } from 'lucide-react';

interface AchievementsSectionProps {
  items: AchievementItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Achievements',
  onAddItem,
  onRemoveItem,
}) => {
  const { typography, spacing, colors } = config;
  const variant: AchievementsVariant = config.achievements?.variant || 'list';
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
          marginTop: '8px',
          padding: '4px 8px',
          fontSize: '11px',
          color: colors.primary,
          background: 'transparent',
          border: `1px dashed ${colors.primary}`,
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        + Add Achievement
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
          }}
        >
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
          <div>
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
          style={{
            padding: '10px 12px',
            marginBottom: spacing.itemGap,
            backgroundColor: colors.background.accent || '#fef3c7',
            borderRadius: '6px',
            borderLeft: `3px solid ${colors.primary}`,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            fontSize: typography.itemTitle.fontSize,
            color: typography.itemTitle.color,
            marginBottom: '4px',
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

  const renderContent = () => {
    switch (variant) {
      case 'bullets':
        return renderBulletsVariant();
      case 'cards':
        return renderCardsVariant();
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
