/**
 * Certifications Badges/Grid Variant
 *
 * Two-column grid layout for compact certification display.
 * Good for when you have multiple certifications to show in limited space.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { CertificationsVariantProps } from '../types';

export const CertificationsBadges: React.FC<CertificationsVariantProps> = ({
  items,
  config,
  editable = false,
  onAddCertification,
  onRemoveCertification,
  formatDate,
}) => {
  const { typography } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
      {items.map((cert, index) => (
        <div
          key={cert.id || index}
          className="group relative"
          style={{
            padding: '8px 10px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
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
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.name`}
                value={cert.name}
                style={{
                  fontSize: scaleFontSize('12px'),
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  flex: 1,
                  lineHeight: 1.3,
                }}
                placeholder="Certification"
              />
            ) : (
              <div style={{
                fontSize: scaleFontSize('12px'),
                fontWeight: 600,
                color: typography.itemTitle.color,
                flex: 1,
                lineHeight: 1.3,
              }}>
                {cert.name}
              </div>
            )}

            {!editable && cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#9ca3af', flexShrink: 0 }}
              >
                <ExternalLink style={{ width: '10px', height: '10px' }} />
              </a>
            )}
          </div>

          {/* Issuer & Date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '6px',
            marginTop: '3px',
            fontSize: scaleFontSize('10px'),
            color: '#6b7280',
          }}>
            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.issuer`}
                value={cert.issuer}
                style={{ fontSize: scaleFontSize('10px'), color: '#6b7280' }}
                placeholder="Issuer"
              />
            ) : (
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {cert.issuer}
              </span>
            )}

            {editable ? (
              <InlineEditableDate
                path={`certifications.${index}.date`}
                value={cert.date}
                formatDisplay={formatDate}
                style={{ fontSize: scaleFontSize('10px'), flexShrink: 0 }}
              />
            ) : (
              <span style={{ flexShrink: 0 }}>{formatDate ? formatDate(cert.date) : cert.date}</span>
            )}
          </div>

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
              <ExternalLink style={{ width: '9px', height: '9px', color: '#9ca3af' }} />
              <InlineEditableText
                path={`certifications.${index}.url`}
                value={cert.url || ''}
                style={{ fontSize: scaleFontSize('9px'), color: '#9ca3af' }}
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
            padding: '10px',
            borderRadius: '6px',
            border: '1px dashed #d1d5db',
            backgroundColor: 'transparent',
            color: '#6b7280',
            fontSize: scaleFontSize(typography.dates.fontSize),
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
