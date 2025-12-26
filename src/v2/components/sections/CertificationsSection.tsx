/**
 * Certifications Section Component (V2)
 * 
 * Renders certifications with multiple visual variants.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X, Award, ExternalLink } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  expiryDate?: string;
  url?: string;
  description?: string;
}

interface CertificationsSectionProps {
  items: CertificationItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Certifications',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { typography, spacing, colors } = config;
  const accent = colors.primary;
  
  // Map variant IDs from sectionVariants.ts to internal variant names
  const mapVariantId = (variantId: string | undefined): string => {
    if (!variantId) return 'classic';
    const variantMap: Record<string, string> = {
      'cert-classic': 'classic',
      'cert-modern': 'modern',
      'cert-badges': 'badges',
      'cert-timeline': 'timeline',
      'cert-compact': 'compact',
      'cert-minimal': 'minimal',
      'cert-detailed': 'detailed',
      'cert-boxed': 'boxed',
      'cert-grid': 'grid',
      'cert-icon': 'icon',
    };
    return variantMap[variantId] || 'classic';
  };
  
  const variant = mapVariantId(variantOverride);

  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  if (!items?.length && !editable) return null;

  const titleStyle: React.CSSProperties = {
    fontSize: typography.itemTitle.fontSize,
    fontWeight: typography.itemTitle.fontWeight,
    lineHeight: typography.itemTitle.lineHeight,
    color: typography.itemTitle.color,
    margin: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: typography.itemSubtitle.fontSize,
    fontWeight: typography.itemSubtitle.fontWeight,
    lineHeight: typography.itemSubtitle.lineHeight,
    color: accent,
    margin: 0,
  };

  const dateStyle: React.CSSProperties = {
    fontSize: typography.dates.fontSize,
    fontWeight: typography.dates.fontWeight,
    color: typography.dates.color,
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
  };

  // Compact variant - clean, no icon inline with text (better for sidebars)
  const renderCompactItem = (item: CertificationItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ 
        marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div>
        {editable ? (
          <InlineEditableText
            path={`certifications.${index}.name`}
            value={item.name}
            as="h3"
            style={titleStyle}
            placeholder="Certification Name"
          />
        ) : (
          <h3 style={titleStyle}>
            {item.name}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accent, marginLeft: '6px' }}>
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            )}
          </h3>
        )}
        
        <div className="flex items-center justify-between" style={{ marginTop: '2px' }}>
          {editable ? (
            <InlineEditableText
              path={`certifications.${index}.issuer`}
              value={item.issuer}
              style={{ ...subtitleStyle, flex: 1 }}
              placeholder="Issuing Organization"
            />
          ) : (
            <span style={subtitleStyle}>{item.issuer}</span>
          )}
          
          <span style={{ ...dateStyle, marginLeft: '8px', flexShrink: 0 }}>
            {editable ? (
              <InlineEditableDate
                path={`certifications.${index}.date`}
                value={item.date}
                style={dateStyle}
                formatDisplay={formatDate}
              />
            ) : (
              formatDate(item.date)
            )}
          </span>
        </div>
      </div>

      {editable && onRemoveItem && (
        <button
          onClick={() => onRemoveItem(item.id)}
          className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
          title="Remove certification"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      )}
    </div>
  );

  // Default/Classic variant - with icon
  const renderItem = (item: CertificationItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ 
        marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div className="flex gap-3">
        {/* Icon column - fixed width for alignment */}
        <div className="flex-shrink-0 pt-0.5">
          <Award className="w-4 h-4" style={{ color: accent }} />
        </div>
        
        {/* Content column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {editable ? (
                <InlineEditableText
                  path={`certifications.${index}.name`}
                  value={item.name}
                  as="h3"
                  style={titleStyle}
                  placeholder="Certification Name"
                />
              ) : (
                <h3 style={titleStyle}>
                  {item.name}
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accent, marginLeft: '6px' }}>
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  )}
                </h3>
              )}
            </div>
            
            <div style={dateStyle} className="flex-shrink-0 text-right">
              {editable ? (
                <InlineEditableDate
                  path={`certifications.${index}.date`}
                  value={item.date}
                  style={dateStyle}
                  formatDisplay={formatDate}
                />
              ) : (
                <span>{formatDate(item.date)}</span>
              )}
            </div>
          </div>
          
          {editable ? (
            <InlineEditableText
              path={`certifications.${index}.issuer`}
              value={item.issuer}
              style={subtitleStyle}
              placeholder="Issuing Organization"
            />
          ) : (
            <div style={subtitleStyle}>{item.issuer}</div>
          )}

          {item.credentialId && (
            <div style={{ ...bodyStyle, fontSize: typography.small.fontSize, color: typography.small.color, marginTop: '2px' }}>
              {editable ? (
                <InlineEditableText
                  path={`certifications.${index}.credentialId`}
                  value={item.credentialId}
                  style={{ ...bodyStyle, fontSize: typography.small.fontSize }}
                  placeholder="Credential ID"
                />
              ) : (
                <>ID: {item.credentialId}</>
              )}
            </div>
          )}
          
          {item.expiryDate && (
            <div style={{ ...typography.small, color: typography.dates.color, marginTop: '2px' }}>
              Expires: {formatDate(item.expiryDate)}
            </div>
          )}

          {item.description && (
            <div style={{ ...bodyStyle, marginTop: '4px' }}>
              {editable ? (
                <InlineEditableText
                  path={`certifications.${index}.description`}
                  value={item.description}
                  style={bodyStyle}
                  multiline
                  placeholder="Description..."
                />
              ) : (
                item.description
              )}
            </div>
          )}
        </div>
      </div>

      {editable && onRemoveItem && (
        <button
          onClick={() => onRemoveItem(item.id)}
          className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
          title="Remove certification"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      )}
    </div>
  );

  // Choose render function based on variant
  const renderFunction = variant === 'compact' || variant === 'minimal' ? renderCompactItem : renderItem;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {(items || []).map((item, index) => renderFunction(item, index))}
        
        {editable && onAddItem && (
          <button
            onClick={onAddItem}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Certification
          </button>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
