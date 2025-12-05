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
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();

  const hasBullets = bulletPoints && bulletPoints.length > 0;

  // Default bullet style
  const defaultBulletStyle: React.CSSProperties = {
    fontSize: '12.5px',
    color: '#4b5563',
    lineHeight: '1.7',
    ...bulletStyle,
  };

  // If not editable and no bullets, show description
  if (!editable && !hasBullets) {
    if (!description) return null;
    return (
      <p className={className} style={defaultBulletStyle}>
        {description}
      </p>
    );
  }

  return (
    <div className={className}>
      {/* Show "Add Achievement" button if no bullets exist */}
      {!hasBullets && editable && (
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

      {/* Render bullet points */}
      {hasBullets && (
        <ul className="space-y-1 mt-2">
          {bulletPoints.map((bullet, bulletIndex) => {
            // Handle case where bullet might be an object
            const bulletText = typeof bullet === 'string' ? bullet : (bullet as any)?.text || '';
            
            return (
              <li
                key={bulletIndex}
                className="flex items-start gap-2 group"
                style={defaultBulletStyle}
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                {editable ? (
                  <div className="flex-1 flex items-start gap-1">
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
                        removeBulletPoint(experienceId, bulletIndex);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                      title="Remove"
                    >
                      <X className="h-3 w-3 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <span>{bulletText}</span>
                )}
              </li>
            );
          })}
          
          {/* Add more button */}
          {editable && (
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addBulletPoint(experienceId);
                }}
                className="flex items-center gap-1 text-xs font-medium hover:underline ml-3.5"
                style={{ color: accentColor }}
              >
                <Plus className="h-3 w-3" />
                Add Achievement
              </button>
            </li>
          )}
        </ul>
      )}

      {/* Show description as fallback if no bullets and not editable */}
      {!hasBullets && !editable && description && (
        <p style={defaultBulletStyle}>{description}</p>
      )}
    </div>
  );
};

export default ExperienceBulletPoints;
