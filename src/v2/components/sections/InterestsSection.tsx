/**
 * Interests Section Component (V2)
 * 
 * Renders interests and hobbies with support for detailed descriptions.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { Plus, X, Sparkles } from 'lucide-react';

interface InterestItem {
  id: string;
  name: string;
  description?: string;
}

type InterestsVariant = 'pills' | 'detailed' | 'list';

interface InterestsSectionProps {
  items: InterestItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  variant?: InterestsVariant;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Interests',
  variant = 'detailed',
  onAddItem,
  onRemoveItem,
}) => {
  const { typography, spacing, colors } = config;
  const accent = colors.primary;

  if (!items?.length && !editable) return null;

  // Pills variant (tags)
  const renderPills = () => {
    const tagStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 12px',
      fontSize: typography.body.fontSize,
      backgroundColor: colors.background.accent || `${accent}10`,
      color: typography.body.color,
      borderRadius: '16px',
      marginRight: '8px',
      marginBottom: '8px',
    };

    return (
      <div className="flex flex-wrap">
        {(items || []).map((item, index) => (
          <div key={item.id} className="group relative">
            <span style={tagStyle}>
              <Sparkles className="w-3 h-3" style={{ color: accent }} />
              {editable ? (
                <InlineEditableText
                  path={`interests.${index}.name`}
                  value={item.name}
                  style={{ fontSize: typography.body.fontSize }}
                  placeholder="Interest"
                />
              ) : (
                item.name
              )}
            </span>
            {editable && onRemoveItem && (
              <button
                onClick={() => onRemoveItem(item.id)}
                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full"
              >
                <X className="w-2.5 h-2.5 text-red-600" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Detailed variant with bullet points
  const renderDetailed = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.itemGap }}>
        {(items || []).map((item, index) => (
          <div key={item.id} className="group relative">
            {editable && onRemoveItem && (
              <button
                onClick={() => onRemoveItem(item.id)}
                className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}
            
            <div style={{ 
              fontWeight: 600, 
              fontSize: typography.itemTitle.fontSize,
              color: typography.itemTitle.color,
              marginBottom: '4px',
            }}>
              {editable ? (
                <InlineEditableText
                  path={`interests.${index}.name`}
                  value={item.name}
                  style={{ fontWeight: 600 }}
                  placeholder="Interest/Hobby"
                />
              ) : (
                item.name
              )}
            </div>
            
            {(item.description || editable) && (
              editable ? (
                <InlineEditableText
                  path={`interests.${index}.description`}
                  value={item.description || ''}
                  style={{
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                    marginTop: '4px',
                  }}
                  multiline
                  placeholder="Description or activities (one per line, optional)..."
                />
              ) : (
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px',
                  listStyleType: 'disc',
                }}>
                  {item.description?.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i} style={{
                      fontSize: typography.body.fontSize,
                      color: typography.body.color,
                      marginBottom: '2px',
                    }}>
                      {line}
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {variant === 'pills' ? renderPills() : renderDetailed()}
        
        {editable && onAddItem && (
          <button
            onClick={onAddItem}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Interest
          </button>
        )}
      </div>
    </section>
  );
};

export default InterestsSection;
