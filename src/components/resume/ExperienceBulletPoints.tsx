/**
 * ExperienceBulletPoints - A drop-in component for adding bullet points to experience items
 * 
 * This component can be used inside InlineEditableList's renderItem to add bullet point support
 * without requiring a full template migration.
 * 
 * Usage:
 * ```tsx
 * <InlineEditableList
 *   path="experience"
 *   items={resumeData.experience}
 *   renderItem={(exp, index) => (
 *     <div>
 *       <h3>{exp.position}</h3>
 *       <ExperienceBulletPoints
 *         experienceId={exp.id}
 *         experienceIndex={index}
 *         bulletPoints={exp.bulletPoints}
 *         description={exp.description}
 *         editable={editable}
 *         accentColor={themeColor}
 *       />
 *     </div>
 *   )}
 * />
 * ```
 */

import React from 'react';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { Plus, X } from 'lucide-react';

interface ExperienceBulletPointsProps {
  /** The experience item's ID */
  experienceId: string;
  /** The index of the experience item in the array */
  experienceIndex: number;
  /** Array of bullet points */
  bulletPoints?: string[];
  /** Fallback description (shown if no bullet points) */
  description?: string;
  /** Whether editing is enabled */
  editable?: boolean;
  /** Accent color for buttons */
  accentColor?: string;
  /** Custom styles for bullet points */
  bulletStyle?: React.CSSProperties;
  /** Custom class for container */
  className?: string;
}

export const ExperienceBulletPoints: React.FC<ExperienceBulletPointsProps> = ({
  experienceId,
  experienceIndex,
  bulletPoints,
  description,
  editable = false,
  accentColor = '#2563eb',
  bulletStyle = {},
  className = '',
}) => {
  const context = useInlineEdit();
  const addBulletPoint = context?.addBulletPoint;
  const removeBulletPoint = context?.removeBulletPoint;

  // Parse description into bullet points if bulletPoints array is empty
  const effectiveBulletPoints = React.useMemo(() => {
    if (bulletPoints && bulletPoints.length > 0) {
      return bulletPoints;
    }
    // Parse description by newlines if no bullet points exist
    if (description && description.trim()) {
      return description
        .split('\n')
        .map(line => line.trim().replace(/^[-•]\s*/, '')) // Remove bullet prefixes
        .filter(line => line.length > 0);
    }
    return [];
  }, [bulletPoints, description]);

  const hasBullets = effectiveBulletPoints.length > 0;

  // Default bullet style
  const defaultBulletStyle: React.CSSProperties = {
    fontSize: '12.5px',
    color: '#4b5563',
    lineHeight: '1.7',
    ...bulletStyle,
  };

  // If no bullets and no description, return null
  if (!hasBullets && !description) {
    return editable && addBulletPoint ? (
      <div className={className}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addBulletPoint(experienceId);
          }}
          className="flex items-center gap-1 text-xs font-medium hover:underline"
          style={{ color: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Achievement
        </button>
      </div>
    ) : null;
  }

  // For non-editable mode with bullets, render them (PDF-safe hanging indent layout)
  if (!editable && hasBullets) {
    return (
      <ul className={className} style={{ listStyle: 'none', paddingLeft: 0, margin: 0, marginTop: '0.25rem' }}>
        {effectiveBulletPoints.map((bullet, bulletIndex) => {
          const bulletText = typeof bullet === 'string' ? bullet : (bullet as any)?.text || '';
          const isLast = bulletIndex === effectiveBulletPoints.length - 1;
          return (
            <li
              key={bulletIndex}
              style={{
                ...defaultBulletStyle,
                display: 'block',
                paddingLeft: '1em',
                textIndent: '-1em',
                marginBottom: isLast ? 0 : '0.25rem',
                position: 'relative',
              }}
            >
              <span style={{ 
                marginRight: '0.5rem', 
                lineHeight: defaultBulletStyle.lineHeight,
                display: 'inline'
              }}>•</span>
              <span style={{ display: 'inline' }}>{bulletText}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={className}>
      {/* Render bullet points */}
      {hasBullets && (
        <ul className="space-y-1 mt-2" style={{ listStyle: 'none', paddingLeft: 0 }}>
          {effectiveBulletPoints.map((bullet, bulletIndex) => {
            // Handle case where bullet might be an object
            const bulletText = typeof bullet === 'string' ? bullet : (bullet as any)?.text || '';
            
            return (
              <li
                key={bulletIndex}
                className="flex items-start group"
                style={defaultBulletStyle}
              >
                <span className="mr-2 flex-shrink-0" style={{ lineHeight: defaultBulletStyle.lineHeight, marginTop: '0.125rem' }}>•</span>
                {editable ? (
                  <div className="flex-1 flex items-start gap-2">
                    <InlineEditableText
                      path={`experience[${experienceIndex}].bulletPoints[${bulletIndex}]`}
                      value={bulletText}
                      placeholder="Click to add achievement..."
                      className="flex-1"
                      style={defaultBulletStyle}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeBulletPoint?.(experienceId, bulletIndex);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                      style={{ marginTop: '0.125rem' }}
                      title="Remove"
                    >
                      <X className="h-3 w-3 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <span style={{ flex: 1 }}>{bulletText}</span>
                )}
              </li>
            );
          })}
          
          {/* Add more button */}
          {editable && addBulletPoint && (
            <li className="mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addBulletPoint(experienceId);
                }}
                className="flex items-center gap-1 text-xs font-medium hover:underline"
                style={{ color: accentColor }}
              >
                <Plus className="h-3 w-3" />
                Add Achievement
              </button>
            </li>
          )}
        </ul>
      )}

      {/* Show "Add Achievement" button if no bullets exist in edit mode */}
      {!hasBullets && editable && addBulletPoint && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addBulletPoint(experienceId);
          }}
          className="flex items-center gap-1 text-xs font-medium hover:underline"
          style={{ color: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Achievement
        </button>
      )}
    </div>
  );
};

export default ExperienceBulletPoints;
