/**
 * Certifications Standard Variant
 *
 * Clean layout with issuer and dates.
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import type { CertificationsVariantProps } from '../types';

export const CertificationsStandard: React.FC<CertificationsVariantProps> = ({
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((cert, index) => (
        <div
          key={cert.id || index}
          className="group relative"
          style={{
            padding: '10px 12px',
            backgroundColor: `${accentColor}05`,
            borderRadius: '6px',
            borderLeft: `2px solid ${accentColor}`,
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

          {/* First row: Name | Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              {editable ? (
                <InlineEditableText
                  path={`certifications.${index}.name`}
                  value={cert.name}
                  style={{
                    fontSize: typography.itemTitle.fontSize,
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                  }}
                  placeholder="Certification Name"
                />
              ) : (
                <span style={{
                  fontSize: typography.itemTitle.fontSize,
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                }}>
                  {cert.name}
                </span>
              )}

              {!editable && cert.url && (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>
                  <ExternalLink style={{ width: '12px', height: '12px' }} />
                </a>
              )}
            </div>

            {/* Date */}
            <div style={{ fontSize: '11px', color: typography.dates.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {editable ? (
                <InlineEditableDate
                  path={`certifications.${index}.date`}
                  value={cert.date}
                  formatDisplay={formatDate}
                  style={{ fontSize: '11px' }}
                />
              ) : (
                formatDate ? formatDate(cert.date) : cert.date
              )}
            </div>
          </div>

          {/* Issuer */}
          <div style={{ fontSize: '11px', color: accentColor, fontWeight: 500, marginTop: '2px' }}>
            {editable ? (
              <InlineEditableText
                path={`certifications.${index}.issuer`}
                value={cert.issuer}
                style={{ fontSize: '11px', color: accentColor, fontWeight: 500 }}
                placeholder="Issuing Organization"
              />
            ) : (
              cert.issuer
            )}
          </div>

          {/* Credential ID & Expiry */}
          {(cert.credentialId || cert.expiryDate || editable) && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '10px', color: '#6b7280', flexWrap: 'wrap' }}>
              {(cert.credentialId || editable) && (
                <span>
                  ID: {editable ? (
                    <InlineEditableText
                      path={`certifications.${index}.credentialId`}
                      value={cert.credentialId || ''}
                      style={{ fontSize: '10px', color: '#6b7280' }}
                      placeholder="Credential ID"
                    />
                  ) : cert.credentialId}
                </span>
              )}
              {(cert.expiryDate || editable) && (
                <span>
                  Expires: {editable ? (
                    <InlineEditableDate
                      path={`certifications.${index}.expiryDate`}
                      value={cert.expiryDate || ''}
                      formatDisplay={formatDate}
                      style={{ fontSize: '10px' }}
                    />
                  ) : (formatDate ? formatDate(cert.expiryDate || '') : cert.expiryDate)}
                </span>
              )}
            </div>
          )}

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ExternalLink style={{ width: '10px', height: '10px', color: accentColor }} />
              <InlineEditableText
                path={`certifications.${index}.url`}
                value={cert.url || ''}
                style={{ fontSize: '10px', color: accentColor }}
                placeholder="Certificate URL"
              />
            </div>
          )}
        </div>
      ))}

      {editable && onAddCertification && (
        <button
          onClick={onAddCertification}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Certification
        </button>
      )}
    </div>
  );
};

export default CertificationsStandard;
