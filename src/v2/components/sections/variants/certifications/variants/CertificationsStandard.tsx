/**
 * Certifications Standard Variant
 *
 * Clean, professional list layout commonly used in real resumes.
 * Shows: Certification Name | Issuer | Date
 * Optional: Credential ID on same line if available
 */

import React from 'react';
import { X, Plus, ExternalLink } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
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
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((cert, index) => (
        <div
          key={cert.id || index}
          className="group relative"
          style={{
            padding: '6px 0',
            borderBottom: index < items.length - 1 ? '1px solid #f3f4f6' : 'none',
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

          {/* Main row: Name - Issuer | Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Certification Name */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
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

              {/* Issuer with optional Credential ID */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '2px',
                fontSize: scaleFontSize('11px'),
                color: '#6b7280',
                flexWrap: 'wrap',
              }}>
                {editable ? (
                  <InlineEditableText
                    path={`certifications.${index}.issuer`}
                    value={cert.issuer}
                    style={{ fontSize: scaleFontSize('11px'), color: '#6b7280' }}
                    placeholder="Issuing Organization"
                  />
                ) : (
                  <span>{cert.issuer}</span>
                )}

                {(cert.credentialId || editable) && (
                  <>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    {editable ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                        <span style={{ color: '#9ca3af' }}>ID:</span>
                        <InlineEditableText
                          path={`certifications.${index}.credentialId`}
                          value={cert.credentialId || ''}
                          style={{ fontSize: scaleFontSize('11px'), color: '#6b7280' }}
                          placeholder="Credential ID"
                        />
                      </span>
                    ) : cert.credentialId ? (
                      <span>ID: {cert.credentialId}</span>
                    ) : null}
                  </>
                )}
              </div>
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

          {/* Editable URL */}
          {editable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ExternalLink style={{ width: '10px', height: '10px', color: '#9ca3af' }} />
              <InlineEditableText
                path={`certifications.${index}.url`}
                value={cert.url || ''}
                style={{ fontSize: scaleFontSize('10px'), color: '#9ca3af' }}
                placeholder="Certificate URL (optional)"
              />
            </div>
          )}
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

export default CertificationsStandard;
