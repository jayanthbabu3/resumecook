/**
 * ExperienceSection - Flexible experience section wrapper
 * 
 * This component handles ALL the functionality:
 * - Data binding
 * - Add/remove experience items
 * - Add/remove bullet points
 * - Editable text fields
 * 
 * But it lets YOU control the visual style via render props.
 * 
 * Usage Examples:
 * 
 * 1. Simple usage (uses default styling):
 * ```tsx
 * <ExperienceSection
 *   experience={resumeData.experience}
 *   editable={editable}
 *   accentColor={themeColor}
 * />
 * ```
 * 
 * 2. Custom header:
 * ```tsx
 * <ExperienceSection
 *   experience={resumeData.experience}
 *   editable={editable}
 *   renderHeader={() => (
 *     <h2 className="text-2xl font-bold text-red-500 border-b-2">
 *       Work History
 *     </h2>
 *   )}
 * />
 * ```
 * 
 * 3. Fully custom item rendering:
 * ```tsx
 * <ExperienceSection
 *   experience={resumeData.experience}
 *   editable={editable}
 *   renderItem={(exp, index, { EditableText, EditableDate, BulletPoints }) => (
 *     <div className="my-custom-card">
 *       <EditableText path={`experience[${index}].position`} value={exp.position} />
 *       <BulletPoints expId={exp.id} bullets={exp.bulletPoints} />
 *     </div>
 *   )}
 * />
 * ```
 */

import React from 'react';
import { ExperienceItem } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { InlineEditableList } from '@/components/resume/InlineEditableList';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { SINGLE_COLUMN_CONFIG, PDFStyleConfig } from '@/lib/pdfStyles';
import { Plus, X } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface ExperienceSectionProps {
  /** Experience items array */
  experience: ExperienceItem[];
  /** Whether editing is enabled */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** Style config (optional, uses SINGLE_COLUMN_CONFIG by default) */
  styles?: PDFStyleConfig;
  /** Section title */
  title?: string;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
  
  // ============ RENDER PROPS FOR CUSTOMIZATION ============
  
  /** Custom header renderer */
  renderHeader?: (title: string) => React.ReactNode;
  
  /** Custom item renderer - gives you full control over each experience item */
  renderItem?: (
    exp: ExperienceItem,
    index: number,
    helpers: ExperienceItemHelpers
  ) => React.ReactNode;
  
  /** Custom bullet point renderer */
  renderBulletPoint?: (
    bullet: string,
    bulletIndex: number,
    expIndex: number,
    helpers: BulletPointHelpers
  ) => React.ReactNode;
  
  /** Custom "Add Experience" button renderer */
  renderAddButton?: (onClick: () => void) => React.ReactNode;
  
  /** Custom "Add Bullet" button renderer */
  renderAddBulletButton?: (onClick: () => void, expId: string) => React.ReactNode;
  
  // ============ STYLE CUSTOMIZATION ============
  
  /** Title style override */
  titleStyle?: React.CSSProperties;
  /** Item container style */
  itemStyle?: React.CSSProperties;
  /** Position/job title style */
  positionStyle?: React.CSSProperties;
  /** Company name style */
  companyStyle?: React.CSSProperties;
  /** Date style */
  dateStyle?: React.CSSProperties;
  /** Bullet point style */
  bulletStyle?: React.CSSProperties;
}

export interface ExperienceItemHelpers {
  /** Editable text component pre-configured for this item */
  EditableText: React.FC<{
    path: string;
    value: string;
    className?: string;
    style?: React.CSSProperties;
    multiline?: boolean;
    as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3';
    placeholder?: string;
  }>;
  /** Editable date component */
  EditableDate: React.FC<{
    path: string;
    value: string;
    className?: string;
  }>;
  /** Bullet points component with add/remove functionality */
  BulletPoints: React.FC<{
    expId: string;
    bullets: string[] | undefined;
    className?: string;
    bulletStyle?: React.CSSProperties;
  }>;
  /** Add bullet point function */
  addBulletPoint: () => void;
  /** Remove bullet point function */
  removeBulletPoint: (bulletIndex: number) => void;
  /** Is editing enabled */
  isEditable: boolean;
  /** The index of this item */
  index: number;
}

export interface BulletPointHelpers {
  /** Remove this bullet point */
  remove: () => void;
  /** Editable text for this bullet */
  EditableText: React.FC<{
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
  }>;
  /** Is editing enabled */
  isEditable: boolean;
}

// ============================================================================
// DEFAULT RENDERERS
// ============================================================================

const DefaultHeader: React.FC<{ title: string; style?: React.CSSProperties }> = ({ title, style }) => (
  <h2 
    className="uppercase tracking-wide"
    style={{
      fontSize: SINGLE_COLUMN_CONFIG.sectionHeading.size,
      fontWeight: SINGLE_COLUMN_CONFIG.sectionHeading.weight,
      marginBottom: '12px',
      ...style,
    }}
  >
    {title}
  </h2>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  editable = false,
  accentColor = '#2563eb',
  styles = SINGLE_COLUMN_CONFIG,
  title = 'Professional Experience',
  className = '',
  style = {},
  renderHeader,
  renderItem,
  renderBulletPoint,
  renderAddButton,
  renderAddBulletButton,
  titleStyle,
  itemStyle,
  positionStyle,
  companyStyle,
  dateStyle,
  bulletStyle,
}) => {
  const { 
    isEditable, 
    addBulletPoint, 
    removeBulletPoint 
  } = useTemplateEditor({ editable });

  // Don't render if no experience and not editable
  if ((!experience || experience.length === 0) && !editable) {
    return null;
  }

  // Create helpers for custom renderers
  const createItemHelpers = (exp: ExperienceItem, index: number): ExperienceItemHelpers => ({
    EditableText: ({ path, value, className: cn, style: s, multiline, as, placeholder }) => (
      isEditable ? (
        <InlineEditableText
          path={path}
          value={value}
          className={cn}
          style={s}
          multiline={multiline}
          as={as}
          placeholder={placeholder}
        />
      ) : (
        <span className={cn} style={s}>{value}</span>
      )
    ),
    EditableDate: ({ path, value, className: cn }) => (
      isEditable ? (
        <InlineEditableDate path={path} value={value} className={cn} />
      ) : (
        <span className={cn}>{value}</span>
      )
    ),
    BulletPoints: ({ expId, bullets, className: cn, bulletStyle: bs }) => (
      <DefaultBulletPoints
        expId={expId}
        bullets={bullets}
        expIndex={index}
        isEditable={isEditable}
        addBulletPoint={addBulletPoint}
        removeBulletPoint={removeBulletPoint}
        className={cn}
        bulletStyle={bs || bulletStyle}
        styles={styles}
        accentColor={accentColor}
        renderBulletPoint={renderBulletPoint}
        renderAddBulletButton={renderAddBulletButton}
      />
    ),
    addBulletPoint: () => addBulletPoint(exp.id),
    removeBulletPoint: (bulletIndex: number) => removeBulletPoint(exp.id, bulletIndex),
    isEditable,
    index,
  });

  // Default item renderer
  const defaultRenderItem = (exp: ExperienceItem, index: number) => {
    const helpers = createItemHelpers(exp, index);
    
    return (
      <div key={exp.id} style={{ marginBottom: styles.spacing.itemGap, ...itemStyle }}>
        <div className="flex justify-between items-start" style={{ marginBottom: '8px' }}>
          <div>
            {isEditable ? (
              <>
                <InlineEditableText
                  path={`experience[${index}].position`}
                  value={exp.position}
                  className="block"
                  style={{
                    fontSize: styles.itemTitle.size,
                    fontWeight: styles.itemTitle.weight,
                    color: styles.itemTitle.color,
                    ...positionStyle,
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
                    ...companyStyle,
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
                  ...positionStyle,
                }}>
                  {exp.position}
                </h3>
                <p style={{
                  fontSize: styles.itemSubtitle.size,
                  fontWeight: styles.itemSubtitle.weight,
                  color: styles.colors.text.secondary,
                  ...companyStyle,
                }}>
                  {exp.company}
                </p>
              </>
            )}
          </div>
          
          <div 
            className="text-right"
            style={{ 
              fontSize: styles.itemDate.size, 
              color: styles.colors.text.secondary,
              ...dateStyle,
            }}
          >
            {isEditable ? (
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
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </span>
            )}
          </div>
        </div>

        {/* Bullet Points */}
        <helpers.BulletPoints
          expId={exp.id}
          bullets={exp.bulletPoints}
        />
      </div>
    );
  };

  // Render content
  const renderContent = () => {
    if (isEditable) {
      return (
        <InlineEditableList
          path="experience"
          items={experience}
          defaultItem={{
            id: Date.now().toString(),
            company: 'Company Name',
            position: 'Position Title',
            startDate: '2023-01',
            endDate: '2024-01',
            description: '',
            bulletPoints: ['Achievement or responsibility'],
            current: false,
          }}
          addButtonLabel="Add Experience"
          renderItem={(exp, index) => 
            renderItem 
              ? renderItem(exp, index, createItemHelpers(exp, index))
              : defaultRenderItem(exp, index)
          }
        />
      );
    }

    return experience.map((exp, index) => 
      renderItem 
        ? renderItem(exp, index, createItemHelpers(exp, index))
        : defaultRenderItem(exp, index)
    );
  };

  return (
    <div className={className} style={{ marginBottom: styles.spacing.sectionGap, ...style }}>
      {renderHeader ? (
        renderHeader(title)
      ) : (
        <DefaultHeader 
          title={title} 
          style={{ color: accentColor, ...titleStyle }} 
        />
      )}
      {renderContent()}
    </div>
  );
};

// ============================================================================
// BULLET POINTS SUB-COMPONENT
// ============================================================================

interface DefaultBulletPointsProps {
  expId: string;
  bullets: string[] | undefined;
  expIndex: number;
  isEditable: boolean;
  addBulletPoint: (expId: string) => void;
  removeBulletPoint: (expId: string, bulletIndex: number) => void;
  className?: string;
  bulletStyle?: React.CSSProperties;
  styles: PDFStyleConfig;
  accentColor: string;
  renderBulletPoint?: ExperienceSectionProps['renderBulletPoint'];
  renderAddBulletButton?: ExperienceSectionProps['renderAddBulletButton'];
}

const DefaultBulletPoints: React.FC<DefaultBulletPointsProps> = ({
  expId,
  bullets,
  expIndex,
  isEditable,
  addBulletPoint,
  removeBulletPoint,
  className,
  bulletStyle,
  styles,
  accentColor,
  renderBulletPoint,
  renderAddBulletButton,
}) => {
  const hasBullets = bullets && bullets.length > 0;

  // Create helpers for custom bullet renderer
  const createBulletHelpers = (bulletIndex: number): BulletPointHelpers => ({
    remove: () => removeBulletPoint(expId, bulletIndex),
    EditableText: ({ className: cn, style: s, placeholder }) => (
      isEditable ? (
        <InlineEditableText
          path={`experience[${expIndex}].bulletPoints[${bulletIndex}]`}
          value={bullets![bulletIndex] || ''}
          placeholder={placeholder || 'Click to add achievement...'}
          className={cn || 'flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1'}
          style={{
            fontSize: styles.itemDescription.size,
            color: styles.colors.text.secondary,
            lineHeight: styles.itemDescription.lineHeight,
            ...s,
          }}
          multiline
          as="span"
        />
      ) : (
        <span className={cn} style={s}>{bullets![bulletIndex]}</span>
      )
    ),
    isEditable,
  });

  const handleAddBullet = () => addBulletPoint(expId);

  // Show "Add Achievement" button if no bullets exist
  if (!hasBullets && isEditable) {
    return (
      <div style={{ marginTop: '12px' }}>
        {renderAddBulletButton ? (
          renderAddBulletButton(handleAddBullet, expId)
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddBullet();
            }}
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: accentColor }}
          >
            <Plus className="h-3 w-3" />
            Add Achievement
          </button>
        )}
      </div>
    );
  }

  if (!hasBullets) return null;

  return (
    <div style={{ marginTop: '12px' }} className={className}>
      <ul 
        className="ml-5 space-y-1"
        style={{ 
          fontSize: styles.itemDescription.size, 
          color: styles.colors.text.secondary, 
          lineHeight: styles.itemDescription.lineHeight,
          listStyleType: 'disc',
          paddingLeft: '20px',
          ...bulletStyle,
        }}
      >
        {bullets.map((bullet, bulletIndex) => {
          if (renderBulletPoint) {
            return (
              <li key={bulletIndex} style={{ display: 'list-item' }}>
                {renderBulletPoint(bullet, bulletIndex, expIndex, createBulletHelpers(bulletIndex))}
              </li>
            );
          }

          return (
            <li key={bulletIndex} className="group" style={{ display: 'list-item' }}>
              {isEditable ? (
                <div className="flex items-center gap-2">
                  <InlineEditableText
                    path={`experience[${expIndex}].bulletPoints[${bulletIndex}]`}
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
                  <button
                    onClick={() => removeBulletPoint(expId, bulletIndex)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                  >
                    <X className="h-3 w-3 text-red-500" />
                  </button>
                </div>
              ) : (
                bullet && <span>{bullet}</span>
              )}
            </li>
          );
        })}
      </ul>
      
      {/* Add more bullets button */}
      {isEditable && (
        renderAddBulletButton ? (
          renderAddBulletButton(handleAddBullet, expId)
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddBullet();
            }}
            className="mt-2 flex items-center gap-1 text-xs font-medium"
            style={{ color: accentColor }}
          >
            <Plus className="h-3 w-3" />
            Add Achievement
          </button>
        )
      )}
    </div>
  );
};

export default ExperienceSection;
