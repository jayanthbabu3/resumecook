/**
 * ExperienceVariantRenderer - Renders experience items with different visual variants
 * 
 * This component provides industry-standard experience section variants while
 * maintaining all editing functionality through InlineEditableList.
 * 
 * Supported Variants:
 * - classic: Traditional format with company-first layout
 * - modern: Card-based design with visual separation
 * - timeline: Visual timeline with connectors and dots
 * - compact: Space-efficient single-line format
 * - sidebar: Dates in sidebar with colored accent line
 * - boxed: Each position in a distinct bordered box
 * - detailed: Comprehensive format with location and achievements
 * - minimal: Minimalist design with essential information
 * - achievement: Emphasizes achievements with visual markers
 * - executive: Premium format for senior positions
 */

import React from 'react';
import { ExperienceItem } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { InlineEditableList } from '@/components/resume/InlineEditableList';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptionsWithDefaults } from '@/contexts/StyleOptionsContext';
import { Plus, X } from 'lucide-react';

export type ExperienceVariant = 
  | 'classic'      // Traditional format
  | 'modern'       // Card-based design
  | 'timeline'     // Visual timeline
  | 'compact'      // Space-efficient
  | 'sidebar'      // Dates in sidebar
  | 'boxed'        // Bordered boxes
  | 'detailed'     // Comprehensive format
  | 'minimal'      // Minimalist
  | 'achievement'  // Achievement-focused
  | 'executive';   // Premium executive format

interface ExperienceVariantRendererProps {
  experience: ExperienceItem[];
  editable?: boolean;
  variant?: ExperienceVariant;
  accentColor?: string;
  formatDate?: (dateString?: string) => string;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ExperienceVariantRenderer: React.FC<ExperienceVariantRendererProps> = ({
  experience,
  editable = false,
  variant = 'classic',
  accentColor = '#2563eb',
  formatDate,
  onAddBulletPoint,
  onRemoveBulletPoint,
  className = '',
  style = {},
}) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const inlineEditContext = useInlineEdit();
  const addBulletPoint = inlineEditContext?.addBulletPoint;
  const removeBulletPoint = inlineEditContext?.removeBulletPoint;
  
  const defaultFormatDate = (dateString?: string) => {
    if (!dateString) return "";
    return formatDate ? formatDate(dateString) : styleOptions.formatDate(dateString);
  };

  const handleAddBullet = (expId: string) => {
    if (onAddBulletPoint) {
      onAddBulletPoint(expId);
    } else if (addBulletPoint) {
      addBulletPoint(expId);
    }
  };

  const handleRemoveBullet = (expId: string, bulletIndex: number) => {
    if (onRemoveBulletPoint) {
      onRemoveBulletPoint(expId, bulletIndex);
    } else if (removeBulletPoint) {
      removeBulletPoint(expId, bulletIndex);
    }
  };

  // Render experience item based on variant
  const renderExperienceItem = (exp: ExperienceItem, index: number, isEditable: boolean, isLast: boolean = false) => {
    const hasBullets = Array.isArray(exp.bulletPoints) && exp.bulletPoints.length > 0;
    const bulletPoints = hasBullets 
      ? exp.bulletPoints! 
      : (exp.description || "").split("\n").map(line => line.trim()).filter(Boolean);

    switch (variant) {
      case 'modern':
        return (
          <div 
            key={exp.id || index}
            className="mb-6 p-5 rounded-xl border transition-all hover:shadow-lg"
            style={{ 
              borderColor: `${accentColor}40`,
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              marginBottom: '24px',
              borderLeft: `4px solid ${accentColor}`,
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                {isEditable ? (
                  <>
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="block font-semibold"
                      style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="block mt-1"
                      style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}
                      as="p"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                      {exp.position}
                    </h3>
                    <p className="mt-1" style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}>
                      {exp.company}
                    </p>
                  </>
                )}
              </div>
              <div className="ml-4 flex items-center gap-1" style={{ fontSize: '13px', color: '#525252' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="inline-block"
                    />
                    <span> - </span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="inline-block"
                      />
                    )}
                  </>
                ) : (
                  <span>
                    {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                  </span>
                )}
              </div>
            </div>
            {renderBulletPoints(exp, index, bulletPoints, isEditable)}
          </div>
        );

      case 'timeline':
        return (
          <div key={exp.id || index} className="relative" style={{ marginBottom: isLast ? '0' : '24px', paddingLeft: '20px' }}>
            {/* Timeline line - connects from current dot to next dot */}
            {!isLast && (
              <div 
                className="absolute"
                style={{ 
                  left: '4px',
                  top: '6px',
                  bottom: '-24px',
                  width: '1.5px',
                  backgroundColor: '#d1d5db',
                }}
              />
            )}
            {/* Timeline dot - small and filled, matching reference */}
            <div 
              className="absolute left-0 top-0.5"
              style={{ 
                width: '8px',
                height: '8px',
                zIndex: 2,
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: accentColor,
                }}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-start mb-2 gap-4">
                <div className="flex-1">
                  {isEditable ? (
                    <>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="block font-semibold mb-0.5"
                        style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4, fontWeight: 600 }}
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="block"
                        style={{ fontSize: '13px', color: '#525252', fontWeight: 400 }}
                        as="p"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold mb-0.5" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4, fontWeight: 600 }}>
                        {exp.position}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#525252', fontWeight: 400 }}>
                        {exp.company}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex-shrink-0" style={{ fontSize: '13px', color: '#525252', fontWeight: 400, whiteSpace: 'nowrap' }}>
                  {isEditable ? (
                    <>
                      <InlineEditableDate
                        path={`experience[${index}].startDate`}
                        value={exp.startDate}
                        formatDisplay={defaultFormatDate}
                        className="inline-block"
                      />
                      <span> - </span>
                      {exp.current ? (
                        <span>Present</span>
                      ) : (
                        <InlineEditableDate
                          path={`experience[${index}].endDate`}
                          value={exp.endDate}
                          formatDisplay={defaultFormatDate}
                          className="inline-block"
                        />
                      )}
                    </>
                  ) : (
                    <span>
                      {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                    </span>
                  )}
                </div>
              </div>
              {renderBulletPoints(exp, index, bulletPoints, isEditable)}
            </div>
          </div>
        );

      case 'sidebar':
        return (
          <div key={exp.id || index} className="flex gap-8 mb-8">
            {/* Sidebar with date - premium style */}
            <div 
              className="flex-shrink-0 w-28 relative"
              style={{ paddingRight: '20px' }}
            >
              <div 
                className="absolute right-0 top-0 bottom-0 w-1 rounded-full"
                style={{ 
                  backgroundColor: accentColor,
                  boxShadow: `0 0 8px ${accentColor}40`,
                }}
              />
              <div 
                className="absolute right-0 top-0 w-3 h-3 rounded-full -mr-1"
                style={{ 
                  backgroundColor: accentColor,
                  boxShadow: `0 0 8px ${accentColor}60`,
                }}
              />
              <div className="text-right pt-1" style={{ fontSize: '12px', color: '#525252', fontWeight: 600, letterSpacing: '0.5px' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="block"
                    />
                    <span className="block">-</span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="block"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div>{defaultFormatDate(exp.startDate)}</div>
                    <div>-</div>
                    <div>{exp.current ? "Present" : defaultFormatDate(exp.endDate)}</div>
                  </>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              {isEditable ? (
                <>
                  <InlineEditableText
                    path={`experience[${index}].position`}
                    value={exp.position}
                    className="block font-semibold"
                    style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                    as="h3"
                  />
                  <InlineEditableText
                    path={`experience[${index}].company`}
                    value={exp.company}
                    className="block mt-1"
                    style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}
                    as="p"
                  />
                </>
              ) : (
                <>
                  <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                    {exp.position}
                  </h3>
                  <p className="mt-1" style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}>
                    {exp.company}
                  </p>
                </>
              )}
              {renderBulletPoints(exp, index, bulletPoints, isEditable)}
            </div>
          </div>
        );

      case 'boxed':
        return (
          <div 
            key={exp.id || index}
            className="mb-5 p-5 border-2 rounded-xl transition-all hover:shadow-lg"
            style={{ 
              borderColor: `${accentColor}50`,
              backgroundColor: '#fafbfc',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              borderTop: `3px solid ${accentColor}`,
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                {isEditable ? (
                  <>
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="block font-semibold"
                      style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="block mt-1"
                      style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}
                      as="p"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                      {exp.position}
                    </h3>
                    <p className="mt-1" style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}>
                      {exp.company}
                    </p>
                  </>
                )}
              </div>
              <div className="ml-4 flex items-center gap-1" style={{ fontSize: '13px', color: '#525252' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="inline-block"
                    />
                    <span> - </span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="inline-block"
                      />
                    )}
                  </>
                ) : (
                  <span>
                    {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                  </span>
                )}
              </div>
            </div>
            {renderBulletPoints(exp, index, bulletPoints, isEditable)}
          </div>
        );

      case 'compact':
        return (
          <div key={exp.id || index} className="mb-3">
            {isEditable ? (
              <div className="flex items-baseline gap-2 flex-wrap">
                <InlineEditableText
                  path={`experience[${index}].position`}
                  value={exp.position}
                  className="font-semibold"
                  style={{ fontSize: '13px', color: '#1a1a1a' }}
                  as="span"
                />
                <span style={{ fontSize: '13px', color: '#525252' }}>at</span>
                <InlineEditableText
                  path={`experience[${index}].company`}
                  value={exp.company}
                  style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}
                  as="span"
                />
                <span style={{ fontSize: '13px', color: '#525252' }}>•</span>
                <InlineEditableDate
                  path={`experience[${index}].startDate`}
                  value={exp.startDate}
                  formatDisplay={defaultFormatDate}
                  className="inline-block"
                />
                <span> - </span>
                {exp.current ? (
                  <span>Present</span>
                ) : (
                  <InlineEditableDate
                    path={`experience[${index}].endDate`}
                    value={exp.endDate}
                    formatDisplay={defaultFormatDate}
                    className="inline-block"
                  />
                )}
              </div>
            ) : (
              <div className="flex items-baseline gap-2 flex-wrap" style={{ fontSize: '13px', color: '#1a1a1a' }}>
                <span className="font-semibold">{exp.position}</span>
                <span style={{ color: '#525252' }}>at</span>
                <span style={{ color: accentColor, fontWeight: 500 }}>{exp.company}</span>
                <span style={{ color: '#525252' }}>•</span>
                <span style={{ color: '#525252' }}>
                  {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                </span>
              </div>
            )}
            {bulletPoints.length > 0 && (
              <div className="mt-1 ml-4" style={{ fontSize: '13px', color: '#1a1a1a' }}>
                {bulletPoints.map((bullet, i) => (
                  <span key={i}>
                    {bullet}
                    {i < bulletPoints.length - 1 && <span style={{ color: '#525252' }}> • </span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 'achievement':
        return (
          <div 
            key={exp.id || index} 
            className="mb-7 p-5 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${accentColor}08 0%, ${accentColor}03 100%)`,
              borderLeft: `4px solid ${accentColor}`,
              marginBottom: '24px',
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                {isEditable ? (
                  <>
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="block font-semibold"
                      style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="block mt-1"
                      style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}
                      as="p"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                      {exp.position}
                    </h3>
                    <p className="mt-1" style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}>
                      {exp.company}
                    </p>
                  </>
                )}
              </div>
              <div className="ml-4 flex items-center gap-1" style={{ fontSize: '13px', color: '#525252' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="inline-block"
                    />
                    <span> - </span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="inline-block"
                      />
                    )}
                  </>
                ) : (
                  <span>
                    {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                  </span>
                )}
              </div>
            </div>
            {renderBulletPoints(exp, index, bulletPoints, isEditable, '★')}
          </div>
        );

      case 'executive':
        return (
          <div 
            key={exp.id || index} 
            className="mb-8 p-6 rounded-2xl border"
            style={{
              borderColor: `${accentColor}30`,
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              marginBottom: '32px',
              borderTop: `4px solid ${accentColor}`,
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                {isEditable ? (
                  <>
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="block font-bold uppercase tracking-wide"
                      style={{ fontSize: '16px', color: '#1a1a1a', lineHeight: 1.3, letterSpacing: '0.05em' }}
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="block mt-1"
                      style={{ fontSize: '14px', color: accentColor, fontWeight: 600 }}
                      as="p"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-bold uppercase tracking-wide" style={{ fontSize: '16px', color: '#1a1a1a', lineHeight: 1.3, letterSpacing: '0.05em' }}>
                      {exp.position}
                    </h3>
                    <p className="mt-1" style={{ fontSize: '14px', color: accentColor, fontWeight: 600 }}>
                      {exp.company}
                    </p>
                  </>
                )}
              </div>
              <div className="ml-4 flex items-center gap-1 font-medium" style={{ fontSize: '13px', color: '#525252' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="inline-block"
                    />
                    <span> - </span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="inline-block"
                      />
                    )}
                  </>
                ) : (
                  <span>
                    {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                  </span>
                )}
              </div>
            </div>
            {renderBulletPoints(exp, index, bulletPoints, isEditable)}
          </div>
        );

      case 'minimal':
        return (
          <div 
            key={exp.id || index} 
            className="mb-6 pb-6 border-b"
            style={{
              borderBottomColor: `${accentColor}20`,
              marginBottom: '20px',
              paddingBottom: '20px',
            }}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1">
                {isEditable ? (
                  <>
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="block font-medium"
                      style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: 1.4 }}
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="block mt-0.5"
                      style={{ fontSize: '13px', color: '#525252' }}
                      as="p"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-medium" style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: 1.4 }}>
                      {exp.position}
                    </h3>
                    <p className="mt-0.5" style={{ fontSize: '13px', color: '#525252' }}>
                      {exp.company}
                    </p>
                  </>
                )}
              </div>
              <div className="ml-4 flex items-center gap-1" style={{ fontSize: '12px', color: '#9ca3af' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="inline-block"
                    />
                    <span> - </span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="inline-block"
                      />
                    )}
                  </>
                ) : (
                  <span>
                    {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                  </span>
                )}
              </div>
            </div>
            {renderBulletPoints(exp, index, bulletPoints, isEditable)}
          </div>
        );

      case 'detailed':
        return (
          <div 
            key={exp.id || index} 
            className="mb-7 p-5 rounded-lg border"
            style={{
              borderColor: `${accentColor}25`,
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              marginBottom: '24px',
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                {isEditable ? (
                  <>
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="block font-semibold"
                      style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="block mt-1"
                      style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}
                      as="p"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                      {exp.position}
                    </h3>
                    <p className="mt-1" style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}>
                      {exp.company}
                    </p>
                  </>
                )}
              </div>
              <div className="ml-4 text-right" style={{ fontSize: '13px', color: '#525252' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="block"
                    />
                    <span> - </span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="block"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div>{defaultFormatDate(exp.startDate)}</div>
                    <div>-</div>
                    <div>{exp.current ? "Present" : defaultFormatDate(exp.endDate)}</div>
                  </>
                )}
              </div>
            </div>
            {renderBulletPoints(exp, index, bulletPoints, isEditable)}
          </div>
        );

      case 'classic':
      default:
        return (
          <div key={exp.id || index} className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                {isEditable ? (
                  <>
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                      className="block font-semibold"
                      style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="block mt-1"
                      style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}
                      as="p"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold" style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: 1.4 }}>
                      {exp.position}
                    </h3>
                    <p className="mt-1" style={{ fontSize: '13px', color: accentColor, fontWeight: 500 }}>
                      {exp.company}
                    </p>
                  </>
                )}
              </div>
              <div className="ml-4 flex items-center gap-1" style={{ fontSize: '13px', color: '#525252' }}>
                {isEditable ? (
                  <>
                    <InlineEditableDate
                      path={`experience[${index}].startDate`}
                      value={exp.startDate}
                      formatDisplay={defaultFormatDate}
                      className="inline-block"
                    />
                    <span> - </span>
                    {exp.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience[${index}].endDate`}
                        value={exp.endDate}
                        formatDisplay={defaultFormatDate}
                        className="inline-block"
                      />
                    )}
                  </>
                ) : (
                  <span>
                    {defaultFormatDate(exp.startDate)} - {exp.current ? "Present" : defaultFormatDate(exp.endDate)}
                  </span>
                )}
              </div>
            </div>
            {renderBulletPoints(exp, index, bulletPoints, isEditable)}
          </div>
        );
    }
  };

  // Render bullet points with consistent styling
  const renderBulletPoints = (
    exp: ExperienceItem,
    index: number,
    bulletPoints: string[],
    isEditable: boolean,
    bulletPrefix: string = ''
  ) => {
    if (!isEditable && bulletPoints.length === 0) return null;

    // Use simple bullet for timeline variant
    const bulletChar = variant === 'timeline' ? '•' : (bulletPrefix || styleOptions.getBulletChar());

    return (
      <div className="mt-2">
        {bulletPoints.length > 0 && (
          <ul className="space-y-1.5">
            {bulletPoints.map((bullet, bulletIndex) => (
              <li key={bulletIndex} className="flex items-start gap-2 group">
                <span style={{ color: '#1a1a1a', marginTop: '5px', fontSize: '13px', flexShrink: 0 }}>
                  {bulletChar}
                </span>
                <div className="flex-1 flex items-center gap-2">
                  {isEditable ? (
                    <InlineEditableText
                      path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                      value={bullet || ""}
                      placeholder="Click to add achievement..."
                      className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                      style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.6 }}
                      multiline
                      as="span"
                    />
                  ) : (
                    <span style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                      {bullet}
                    </span>
                  )}
                  {isEditable && (
                    <button
                      onClick={() => handleRemoveBullet(exp.id, bulletIndex)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                      style={{ color: '#ef4444' }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {isEditable && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddBullet(exp.id);
            }}
            className="flex items-center gap-1 text-xs font-medium mt-2"
            style={{ color: accentColor }}
          >
            <Plus className="h-3 w-3" />
            Add Achievement
          </button>
        )}
      </div>
    );
  };

  // Always render if editable, even if experience is empty
  const safeExperience = experience || [];

  return (
    <div className={className} style={style}>
      {editable ? (
        <InlineEditableList
          path="experience"
          items={safeExperience}
          defaultItem={{
            id: Date.now().toString(),
            company: "Company Name",
            position: "Position Title",
            startDate: "2023-01",
            endDate: "2024-01",
            description: "",
            bulletPoints: ["Achievement or responsibility"],
            current: false,
          }}
          addButtonLabel="Add Experience"
          renderItem={(exp, index) => {
            const isLast = index === safeExperience.length - 1;
            return renderExperienceItem(exp, index, true, isLast);
          }}
        />
      ) : (
        safeExperience.length > 0 ? (
          safeExperience.map((exp, index) => {
            const isLast = index === safeExperience.length - 1;
            return renderExperienceItem(exp, index, false, isLast);
          })
        ) : null
      )}
    </div>
  );
};

