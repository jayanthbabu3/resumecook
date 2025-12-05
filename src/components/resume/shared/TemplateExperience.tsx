/**
 * TemplateExperience - Standardized experience section for all templates
 * 
 * This component handles:
 * - Experience items display
 * - Bullet points with add/remove functionality
 * - Editable/non-editable modes
 * - Consistent styling via config
 */

import React from 'react';
import { ExperienceItem } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { InlineEditableList } from '@/components/resume/InlineEditableList';
import { PDFStyleConfig } from '@/lib/pdfStyles';
import { ExperienceConfig, SectionConfig } from '@/lib/templateConfig';
import { Plus, X } from 'lucide-react';

export interface TemplateExperienceProps {
  /** Experience items */
  experience: ExperienceItem[];
  /** Whether the section is editable */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** PDF style configuration */
  styles: PDFStyleConfig;
  /** Experience configuration */
  config?: ExperienceConfig;
  /** Section configuration */
  sectionConfig?: SectionConfig;
  /** Section title override */
  title?: string;
  /** Callback to add bullet point */
  onAddBulletPoint?: (expId: string) => void;
  /** Callback to remove bullet point */
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  /** Custom className */
  className?: string;
}

const DEFAULT_EXPERIENCE_CONFIG: ExperienceConfig = {
  layout: 'stacked',
  showBulletPoints: true,
  showDescription: true,
  dateFormat: 'short',
  datePosition: 'right',
  enableBulletPointEditing: true,
};

const DEFAULT_SECTION_CONFIG: SectionConfig = {
  enabled: true,
  order: 2,
  title: 'Professional Experience',
  titleCase: 'uppercase',
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (date: string, format: 'full' | 'short' | 'year-only' = 'short'): string => {
  if (!date) return '';
  const [year, month] = date.split('-');
  
  if (format === 'year-only') return year;
  if (format === 'full') {
    const monthIndex = parseInt(month || '0', 10) - 1;
    const monthName = monthNames[monthIndex] || '';
    return `${monthName} ${year}`;
  }
  // short format
  const monthIndex = parseInt(month || '0', 10) - 1;
  const monthName = monthNames[monthIndex] || '';
  return `${monthName} ${year}`;
};

export const TemplateExperience: React.FC<TemplateExperienceProps> = ({
  experience,
  editable = false,
  accentColor = '#2563eb',
  styles,
  config = DEFAULT_EXPERIENCE_CONFIG,
  sectionConfig = DEFAULT_SECTION_CONFIG,
  title,
  onAddBulletPoint,
  onRemoveBulletPoint,
  className = '',
}) => {
  if (!experience || experience.length === 0) {
    if (!editable) return null;
  }

  const sectionTitle = title || sectionConfig.title || 'Professional Experience';
  const titleStyle: React.CSSProperties = {
    fontSize: styles.sectionHeading.size,
    fontWeight: styles.sectionHeading.weight,
    color: accentColor,
    marginBottom: '12px',
    textTransform: sectionConfig.titleCase === 'uppercase' ? 'uppercase' : 
                   sectionConfig.titleCase === 'capitalize' ? 'capitalize' : 'none',
    letterSpacing: sectionConfig.titleCase === 'uppercase' ? '0.05em' : undefined,
  };

  const renderBulletPoints = (exp: ExperienceItem, index: number) => {
    const hasBullets = exp.bulletPoints && exp.bulletPoints.length > 0;
    
    if (!config.showBulletPoints && !editable) {
      return null;
    }

    return (
      <div style={{ marginTop: '12px' }}>
        {/* Show "Add Achievement" button if no bullets exist */}
        {!hasBullets && editable && config.enableBulletPointEditing && onAddBulletPoint && exp.id && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddBulletPoint(exp.id);
            }}
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: accentColor }}
          >
            <Plus className="h-3 w-3" />
            Add Achievement
          </button>
        )}

        {/* Render bullet points */}
        {hasBullets && (
          <>
            <ul 
              className="ml-5 space-y-1"
              style={{ 
                fontSize: styles.itemDescription.size, 
                color: styles.colors.text.secondary, 
                lineHeight: styles.itemDescription.lineHeight,
                listStyleType: 'disc',
                paddingLeft: '20px',
              }}
            >
              {exp.bulletPoints!.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="group" style={{ display: 'list-item' }}>
                  {editable ? (
                    <div className="flex items-center gap-2">
                      <InlineEditableText
                        path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                        value={bullet || ''}
                        placeholder="Click to add achievement..."
                        className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                        style={{
                          fontSize: styles.itemDescription.size,
                          color: styles.colors.text.secondary,
                          lineHeight: styles.itemDescription.lineHeight,
                        }}
                        multiline
                        as="span"
                      />
                      {onRemoveBulletPoint && (
                        <button
                          onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                        >
                          <X className="h-3 w-3 text-red-500" />
                        </button>
                      )}
                    </div>
                  ) : (
                    bullet && <span>{bullet}</span>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Add more bullets button */}
            {editable && config.enableBulletPointEditing && onAddBulletPoint && exp.id && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddBulletPoint(exp.id);
                }}
                className="mt-2 flex items-center gap-1 text-xs font-medium"
                style={{ color: accentColor }}
              >
                <Plus className="h-3 w-3" />
                Add Achievement
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  const renderExperienceItem = (exp: ExperienceItem, index: number) => (
    <div key={exp.id} style={{ marginBottom: styles.spacing.itemGap }}>
      <div className="flex justify-between items-start" style={{ marginBottom: '8px' }}>
        <div>
          {editable ? (
            <>
              <InlineEditableText
                path={`experience[${index}].position`}
                value={exp.position}
                className="block"
                style={{
                  fontSize: styles.itemTitle.size,
                  fontWeight: styles.itemTitle.weight,
                  color: styles.itemTitle.color,
                }}
                as="h3"
              />
              <InlineEditableText
                path={`experience[${index}].company`}
                value={exp.company}
                className="block"
                style={{
                  fontSize: styles.itemSubtitle.size,
                  fontWeight: styles.itemSubtitle.weight,
                  color: styles.colors.text.secondary,
                }}
                as="p"
              />
            </>
          ) : (
            <>
              <h3 style={{
                fontSize: styles.itemTitle.size,
                fontWeight: styles.itemTitle.weight,
                color: styles.itemTitle.color,
              }}>
                {exp.position}
              </h3>
              <p style={{
                fontSize: styles.itemSubtitle.size,
                fontWeight: styles.itemSubtitle.weight,
                color: styles.colors.text.secondary,
              }}>
                {exp.company}
              </p>
            </>
          )}
        </div>
        
        {/* Date */}
        <div 
          className="text-right"
          style={{ 
            fontSize: styles.itemDate.size, 
            color: styles.colors.text.secondary 
          }}
        >
          {editable ? (
            <div className="flex items-center gap-1">
              <InlineEditableDate
                path={`experience[${index}].startDate`}
                value={exp.startDate}
                className="inline-block"
              />
              <span> - </span>
              {exp.current ? (
                <span>Present</span>
              ) : (
                <InlineEditableDate
                  path={`experience[${index}].endDate`}
                  value={exp.endDate}
                  className="inline-block"
                />
              )}
            </div>
          ) : (
            <span>
              {formatDate(exp.startDate, config.dateFormat)} - {exp.current ? 'Present' : formatDate(exp.endDate, config.dateFormat)}
            </span>
          )}
        </div>
      </div>

      {/* Description (if no bullet points and description exists) */}
      {config.showDescription && exp.description && (!exp.bulletPoints || exp.bulletPoints.length === 0) && (
        editable ? (
          <InlineEditableText
            path={`experience[${index}].description`}
            value={exp.description}
            className="block"
            style={{
              fontSize: styles.itemDescription.size,
              color: styles.colors.text.secondary,
              lineHeight: styles.itemDescription.lineHeight,
            }}
            multiline
            as="div"
          />
        ) : (
          <p style={{
            fontSize: styles.itemDescription.size,
            color: styles.colors.text.secondary,
            lineHeight: styles.itemDescription.lineHeight,
          }}>
            {exp.description}
          </p>
        )
      )}

      {/* Bullet Points */}
      {renderBulletPoints(exp, index)}
    </div>
  );

  return (
    <div className={className} style={{ marginBottom: styles.spacing.sectionGap }}>
      <h2 className="tracking-wide" style={titleStyle}>
        {sectionTitle}
      </h2>
      
      {editable ? (
        <InlineEditableList
          path="experience"
          items={experience}
          defaultItem={{
            id: Date.now().toString(),
            company: 'Company Name',
            position: 'Position Title',
            startDate: '2023-01',
            endDate: '2024-01',
            description: 'Job description here',
            bulletPoints: ['Achievement or responsibility'],
            current: false,
          }}
          addButtonLabel="Add Experience"
          renderItem={(exp, index) => renderExperienceItem(exp, index)}
        />
      ) : (
        experience.map((exp, index) => renderExperienceItem(exp, index))
      )}
    </div>
  );
};

export default TemplateExperience;
