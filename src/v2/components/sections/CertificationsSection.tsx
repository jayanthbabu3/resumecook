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

  const renderItem = (item: CertificationItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ 
        marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
        // Prevent individual items from breaking across pages
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.name`}
                value={item.name}
                as="h3"
                style={titleStyle}
                placeholder="Certification Name"
              />
            ) : (
              <h3 style={titleStyle}>{item.name}</h3>
            )}
            {!editable && item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
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
            <div>{formatDate(item.date)}</div>
          )}
          {item.expiryDate && (
            <div style={{ ...typography.small, color: typography.dates.color }}>
              Expires: {formatDate(item.expiryDate)}
            </div>
          )}
        </div>
      </div>

      {item.description && (
        <div style={{ ...bodyStyle, marginTop: '6px' }}>
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

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {(items || []).map((item, index) => renderItem(item, index))}
        
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
