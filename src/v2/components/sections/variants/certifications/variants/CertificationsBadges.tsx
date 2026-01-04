/**
 * Certifications Badges Variant
 *
 * Compact card-based grid layout for certifications.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { CertificationsVariantProps } from '../types';

export const CertificationsBadges: React.FC<CertificationsVariantProps> = ({
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      {items.map((cert, index) => (
        <div
          key={cert.id || index}
          className="group relative"
          style={{
            padding: '10px 12px',
            backgroundColor: `${accentColor}06`,
            borderRadius: '8px',
            border: `1px solid ${accentColor}15`,
          }}
        >
          {editable && onRemoveCertification && (
            <button
              onClick={() => onRemoveCertification(cert.id)}
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          )}

          {/* Name */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.name`}
                value={cert.name}
                style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  flex: 1,
                }}
                placeholder="Certification Name"
              />
            ) : (
              <div style={{
                fontSize: typography.itemTitle.fontSize,
                fontWeight: 600,
                color: typography.itemTitle.color,
                flex: 1,
              }}>
                {cert.name}
              </div>
            )}

            {!editable && cert.url && (
              <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, flexShrink: 0 }}>
                <ExternalLink style={{ width: '11px', height: '11px' }} />
              </a>
            )}
          </div>

          {/* Issuer & Date inline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '4px',
            fontSize: '10px',
            color: '#6b7280',
            flexWrap: 'wrap',
          }}>
            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.issuer`}
                value={cert.issuer}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="Issuer"
              />
            ) : (
              <span style={{ color: accentColor }}>{cert.issuer}</span>
            )}

            <span style={{ color: '#d1d5db' }}>•</span>

            {editable ? (
              <InlineEditableDate
                path={`certifications.${index}.date`}
                value={cert.date}
                formatDisplay={formatDate}
                style={{ fontSize: '10px' }}
              />
            ) : (
              <span>{formatDate ? formatDate(cert.date) : cert.date}</span>
            )}
          </div>

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
              <ExternalLink style={{ width: '9px', height: '9px', color: accentColor }} />
              <InlineEditableText
                path={`certifications.${index}.url`}
                value={cert.url || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="URL"
              />
            </div>
          )}
        </div>
      ))}

      {editable && onAddCertification && (
        <button
          onClick={onAddCertification}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '12px',
            borderRadius: '8px',
            border: `1px dashed ${accentColor}40`,
            backgroundColor: 'transparent',
            color: accentColor,
            fontSize: '11px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          className="hover:bg-gray-50 transition-colors"
        >
          <Plus style={{ width: '12px', height: '12px' }} />
          Add
        </button>
      )}
    </div>
  );
};

export default CertificationsBadges;
