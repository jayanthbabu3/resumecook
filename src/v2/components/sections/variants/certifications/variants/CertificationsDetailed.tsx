/**
 * Certifications Detailed Variant
 *
 * Full-featured layout showing all certification details.
 * Best for technical roles or when certifications are a key differentiator.
 * Shows: Name, Issuer, Date, Expiry, Credential ID, Description
 */

import React from 'react';
import { X, Plus, ExternalLink, Award } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { CertificationsVariantProps } from '../types';

export const CertificationsDetailed: React.FC<CertificationsVariantProps> = ({
  items,
  config,
  accentColor,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((cert, index) => (
        <div
          key={cert.id || index}
          className="group relative"
          style={{
            padding: '10px 0',
            borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none',
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

          {/* Header: Icon + Name + Date */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            {/* Award icon */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}>
              <Award style={{ width: '14px', height: '14px', color: '#6b7280' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Name row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                  {editable ? (
                    <InlineEditableText
                      path={`certifications.${index}.name`}
                      value={cert.name}
                      style={{
                        fontSize: scaleFontSize(typography.itemTitle.fontSize),
                        fontWeight: 600,
                        color: typography.itemTitle.color,
                      }}
                      placeholder="Certification Name"
                    />
                  ) : (
                    <span style={{
                      fontSize: scaleFontSize(typography.itemTitle.fontSize),
                      fontWeight: 600,
                      color: typography.itemTitle.color,
                    }}>
                      {cert.name}
                    </span>
                  )}

                  {!editable && cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#6b7280', display: 'inline-flex' }}
                    >
                      <ExternalLink style={{ width: '11px', height: '11px' }} />
                    </a>
                  )}
                </div>

                {/* Date */}
                <div style={{
                  fontSize: scaleFontSize('11px'),
                  color: typography.dates?.color || '#6b7280',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {editable ? (
                    <InlineEditableDate
                      path={`certifications.${index}.date`}
                      value={cert.date}
                      formatDisplay={formatDate}
                      style={{ fontSize: scaleFontSize('11px') }}
                    />
                  ) : (
                    formatDate ? formatDate(cert.date) : cert.date
                  )}
                </div>
              </div>

              {/* Issuer */}
              <div style={{
                fontSize: scaleFontSize('11px'),
                color: '#6b7280',
                marginTop: '2px',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`certifications.${index}.issuer`}
                    value={cert.issuer}
                    style={{ fontSize: scaleFontSize('11px'), color: '#6b7280' }}
                    placeholder="Issuing Organization"
                  />
                ) : (
                  cert.issuer
                )}
              </div>

              {/* Credential ID & Expiry row */}
              {(cert.credentialId || cert.expiryDate || editable) && (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '4px',
                  fontSize: scaleFontSize('10px'),
                  color: '#9ca3af',
                  flexWrap: 'wrap',
                }}>
                  {(cert.credentialId || editable) && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span>Credential ID:</span>
                      {editable ? (
                        <InlineEditableText
                          path={`certifications.${index}.credentialId`}
                          value={cert.credentialId || ''}
                          style={{ fontSize: scaleFontSize('10px'), color: '#9ca3af' }}
                          placeholder="ABC123..."
                        />
                      ) : (
                        <span>{cert.credentialId}</span>
                      )}
                    </span>
                  )}
                  {(cert.expiryDate || editable) && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span>Expires:</span>
                      {editable ? (
                        <InlineEditableDate
                          path={`certifications.${index}.expiryDate`}
                          value={cert.expiryDate || ''}
                          formatDisplay={formatDate}
                          style={{ fontSize: scaleFontSize('10px') }}
                        />
                      ) : (
                        <span>{formatDate ? formatDate(cert.expiryDate || '') : cert.expiryDate}</span>
                      )}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {(cert.description || editable) && (
                <div style={{
                  fontSize: scaleFontSize(typography.body.fontSize),
                  color: typography.body.color,
                  marginTop: '6px',
                  lineHeight: 1.5,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path={`certifications.${index}.description`}
                      value={cert.description || ''}
                      multiline
                      style={{ fontSize: scaleFontSize(typography.body.fontSize), color: typography.body.color }}
                      placeholder="Brief description of certification scope (optional)"
                    />
                  ) : (
                    cert.description
                  )}
                </div>
              )}

              {/* Editable URL */}
              {editable && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                  <ExternalLink style={{ width: '10px', height: '10px', color: '#9ca3af' }} />
                  <InlineEditableText
                    path={`certifications.${index}.url`}
                    value={cert.url || ''}
                    style={{ fontSize: scaleFontSize('10px'), color: '#9ca3af' }}
                    placeholder="Verification URL"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {editable && onAddCertification && (
        <button
          onClick={onAddCertification}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: '#6b7280', borderColor: '#d1d5db' }}
        >
          <Plus className="h-3 w-3" />
          Add Certification
        </button>
      )}
    </div>
  );
};

export default CertificationsDetailed;
