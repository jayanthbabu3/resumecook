/**
 * Certifications Compact Variant
 *
 * Most space-efficient layout - single line per certification.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { CertificationsVariantProps } from '../types';

export const CertificationsCompact: React.FC<CertificationsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddCertification,
  onRemoveCertification,
  formatDate,
}) => {
  const { typography } = config;

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {items.map((cert, index) => (
        <div
          key={cert.id || index}
          className="group relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            padding: '5px 8px',
            backgroundColor: index % 2 === 0 ? `${accentColor}04` : 'transparent',
            borderRadius: '4px',
            fontSize: '11px',
          }}
        >
          {editable && onRemoveCertification && (
            <button
              onClick={() => onRemoveCertification(cert.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-2.5 h-2.5 text-red-600" />
            </button>
          )}

          {/* All info inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.name`}
                value={cert.name}
                style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: '11px' }}
                placeholder="Certification Name"
              />
            ) : (
              <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{cert.name}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.issuer`}
                value={cert.issuer}
                style={{ color: accentColor, fontSize: '11px' }}
                placeholder="Issuer"
              />
            ) : (
              <span style={{ color: accentColor }}>{cert.issuer}</span>
            )}
          </div>

          {/* Date */}
          <div style={{ fontSize: '10px', color: typography.dates.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {editable ? (
              <InlineEditableDate
                path={`certifications.${index}.date`}
                value={cert.date}
                formatDisplay={formatDate}
                style={{ fontSize: '10px' }}
              />
            ) : (
              formatDate ? formatDate(cert.date) : cert.date
            )}
          </div>
        </div>
      ))}

      {editable && onAddCertification && (
        <button
          onClick={onAddCertification}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default CertificationsCompact;
