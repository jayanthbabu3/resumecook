/**
 * Strengths Section Component (V2)
 * 
 * Renders strengths with multiple visual variants.
 */

import React from 'react';
import type { TemplateConfig, StrengthsVariant, StrengthItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { Target, Star, Zap, CheckCircle2, X, Plus } from 'lucide-react';

interface StrengthsSectionProps {
  items: StrengthItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const StrengthsSection: React.FC<StrengthsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Strengths',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { typography, spacing, colors } = config;
  const variant: StrengthsVariant = (variantOverride as StrengthsVariant) || config.strengths?.variant || 'cards';
  const showIcons = config.strengths?.showIcons ?? true;

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
        Add Strength
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
        title="Remove strength"
      >
        <X style={{ width: '14px', height: '14px' }} />
      </button>
    );
  };

  // Variant: Cards with icon and description
  const renderCardsVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          style={{
            padding: '12px',
            marginBottom: spacing.itemGap,
            backgroundColor: colors.background.accent || '#f8fafc',
            borderRadius: '6px',
            borderLeft: `3px solid ${colors.primary}`,
            position: 'relative',
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
            {showIcons && (
              <Target style={{ width: '14px', height: '14px', color: colors.primary, flexShrink: 0 }} />
            )}
            {editable ? (
              <InlineEditableText value={item.title} path={`strengths.${index}.title`} placeholder="Strength title" />
            ) : (
              <span>{item.title}</span>
            )}
          </div>
          <div style={{
            fontSize: typography.body.fontSize,
            lineHeight: typography.body.lineHeight,
            color: typography.body.color,
          }}>
            {editable ? (
              <InlineEditableText value={item.description} path={`strengths.${index}.description`} placeholder="Description" multiline />
            ) : (
              item.description
            )}
          </div>
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  // Variant: Simple bulleted list
  const renderListVariant = () => (
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
          <span style={{ color: colors.primary }}>•</span>
          <div>
            <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
              {editable ? (
                <InlineEditableText value={item.title} path={`strengths.${index}.title`} placeholder="Title" />
              ) : (
                item.title
              )}
            </span>
            {item.description && (
              <>
                <span> - </span>
                {editable ? (
                  <InlineEditableText value={item.description} path={`strengths.${index}.description`} placeholder="Description" />
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

  // Variant: Pill badges (title only)
  const renderPillsVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {(items || []).map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: colors.background.accent || '#f3f4f6',
              borderRadius: '9999px',
              fontSize: typography.body.fontSize,
              fontWeight: 500,
              color: colors.primary,
            }}
          >
            {showIcons && <Star style={{ width: '12px', height: '12px' }} />}
            {editable ? (
              <InlineEditableText value={item.title} path={`strengths.${index}.title`} placeholder="Strength" />
            ) : (
              item.title
            )}
          </div>
        ))}
      </div>
      {renderAddButton()}
    </div>
  );

  // Variant: 2-column grid cards
  const renderGridVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
      }}>
        {(items || []).map((item, index) => (
          <div
            key={item.id}
            style={{
              padding: '10px',
              backgroundColor: colors.background.accent || '#f8fafc',
              borderRadius: '4px',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: typography.body.fontSize,
              color: typography.itemTitle.color,
              marginBottom: '2px',
            }}>
              {showIcons && <Zap style={{ width: '12px', height: '12px', color: colors.primary }} />}
              {editable ? (
                <InlineEditableText value={item.title} path={`strengths.${index}.title`} placeholder="Title" />
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
                <InlineEditableText value={item.description} path={`strengths.${index}.description`} placeholder="Description" />
              ) : (
                item.description
              )}
            </div>
          </div>
        ))}
      </div>
      {renderAddButton()}
    </div>
  );

  // Variant: Lined accent grid cards
  const renderAccentGridVariant = () => {
    const columns = config.strengths?.columns || 2;

    return (
      <div style={{ marginTop: spacing.headingToContent }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '12px',
          }}
        >
          {(items || []).map((item, index) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                padding: '12px 12px 10px 12px',
                backgroundColor: colors.background.section,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: colors.primary,
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              />

              {editable && onRemoveItem && (
                <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                  {renderDeleteButton(item.id)}
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: typography.itemTitle.fontSize,
                  color: typography.itemTitle.color,
                  marginBottom: '6px',
                  paddingRight: editable ? '18px' : undefined,
                }}
              >
                {showIcons && <CheckCircle2 style={{ width: '14px', height: '14px', color: colors.primary }} />}
                {editable ? (
                  <InlineEditableText
                    value={item.title}
                    path={`strengths.${index}.title`}
                    placeholder="Strength"
                  />
                ) : (
                  item.title
                )}
              </div>

              <div
                style={{
                  fontSize: typography.body.fontSize,
                  lineHeight: typography.body.lineHeight,
                  color: typography.body.color,
                }}
              >
                {editable ? (
                  <InlineEditableText
                    value={item.description}
                    path={`strengths.${index}.description`}
                    placeholder="Description"
                    multiline
                  />
                ) : (
                  item.description
                )}
              </div>
            </div>
          ))}
        </div>
        {renderAddButton()}
      </div>
    );
  };

  // Variant: Clean minimal text
  const renderMinimalVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      <div style={{
        fontSize: typography.body.fontSize,
        lineHeight: typography.body.lineHeight,
        color: typography.body.color,
      }}>
        {(items || []).map((item, index) => (
          <span key={item.id}>
            <span style={{ fontWeight: 600 }}>
              {editable ? (
                <InlineEditableText value={item.title} path={`strengths.${index}.title`} placeholder="Title" />
              ) : (
                item.title
              )}
            </span>
            {index < items.length - 1 && <span style={{ margin: '0 8px', color: colors.text.muted }}>|</span>}
          </span>
        ))}
      </div>
      {renderAddButton()}
    </div>
  );

  // Variant: Left accent border cards
  const renderAccentBorderVariant = () => (
    <div style={{ marginTop: spacing.headingToContent }}>
      {(items || []).map((item, index) => (
        <div
          key={item.id}
          style={{
            paddingLeft: '12px',
            marginBottom: spacing.itemGap,
            borderLeft: `2px solid ${colors.primary}`,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 600,
            fontSize: typography.itemTitle.fontSize,
            color: typography.itemTitle.color,
            marginBottom: '2px',
          }}>
            {showIcons && <CheckCircle2 style={{ width: '14px', height: '14px', color: colors.primary }} />}
            {editable ? (
              <InlineEditableText value={item.title} path={`strengths.${index}.title`} placeholder="Title" />
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
              <InlineEditableText value={item.description} path={`strengths.${index}.description`} placeholder="Description" multiline />
            ) : (
              item.description
            )}
          </div>
        </div>
      ))}
      {renderAddButton()}
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'list':
        return renderListVariant();
      case 'pills':
        return renderPillsVariant();
      case 'grid':
        return renderGridVariant();
      case 'accent-grid':
        return renderAccentGridVariant();
      case 'minimal':
        return renderMinimalVariant();
      case 'accent-border':
        return renderAccentBorderVariant();
      case 'cards':
      default:
        return renderCardsVariant();
    }
  };

  return (
    <div style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} />
      {renderContent()}
    </div>
  );
};

export default StrengthsSection;
