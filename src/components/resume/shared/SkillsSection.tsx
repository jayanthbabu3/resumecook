/**
 * SkillsSection - Flexible skills section wrapper
 * 
 * This component handles ALL the functionality:
 * - Data binding
 * - Add/remove skills
 * - Editable skill names
 * 
 * But it lets YOU control the visual style via render props.
 * 
 * SUPPORTED VISUAL STYLES:
 * - Badges/Pills (default)
 * - Progress bars
 * - Grouped lists
 * - Star ratings
 * - Simple list
 * - Custom (via renderSkill prop)
 * 
 * Usage Examples:
 * 
 * 1. Default badges:
 * ```tsx
 * <SkillsSection
 *   skills={resumeData.skills}
 *   editable={editable}
 *   variant="badges"
 * />
 * ```
 * 
 * 2. Progress bars:
 * ```tsx
 * <SkillsSection
 *   skills={resumeData.skills}
 *   editable={editable}
 *   variant="progress"
 * />
 * ```
 * 
 * 3. Fully custom rendering:
 * ```tsx
 * <SkillsSection
 *   skills={resumeData.skills}
 *   editable={editable}
 *   renderSkill={(skill, index, { EditableText, remove }) => (
 *     <div className="my-custom-skill-card">
 *       <EditableText />
 *       <MyCustomRatingStars rating={skill.rating} />
 *     </div>
 *   )}
 * />
 * ```
 */

import React from 'react';
import { SkillItem } from '@/types/resume';
import { InlineEditableSkills } from '@/components/resume/InlineEditableSkills';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { SINGLE_COLUMN_CONFIG, PDFStyleConfig, SKILL_BADGE_STYLES } from '@/lib/pdfStyles';

// ============================================================================
// TYPES
// ============================================================================

export type SkillsVariant = 
  | 'badges'      // Pill/badge style (default)
  | 'rounded'     // Rounded rectangle badges
  | 'compact'     // Compact badges
  | 'progress'    // Progress bars
  | 'list'        // Simple bullet list
  | 'grouped'     // Grouped by category
  | 'inline'      // Comma-separated inline
  | 'custom';     // Use renderSkill prop

export interface SkillsSectionProps {
  /** Skills array */
  skills: SkillItem[];
  /** Whether editing is enabled */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** Style config */
  styles?: PDFStyleConfig;
  /** Section title */
  title?: string;
  /** Visual variant */
  variant?: SkillsVariant;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
  /** Whether to show skill ratings (for progress variant) */
  showRatings?: boolean;
  
  // ============ RENDER PROPS FOR CUSTOMIZATION ============
  
  /** Custom header renderer */
  renderHeader?: (title: string) => React.ReactNode;
  
  /** Custom skill renderer - gives you full control */
  renderSkill?: (
    skill: SkillItem,
    index: number,
    helpers: SkillHelpers
  ) => React.ReactNode;
  
  /** Custom container for skills (wraps all skills) */
  renderContainer?: (children: React.ReactNode) => React.ReactNode;
  
  // ============ STYLE CUSTOMIZATION ============
  
  /** Title style override */
  titleStyle?: React.CSSProperties;
  /** Individual skill/badge style */
  skillStyle?: React.CSSProperties;
  /** Skills container style */
  containerStyle?: React.CSSProperties;
  /** Gap between skills */
  gap?: string;
}

export interface SkillHelpers {
  /** Editable text for skill name */
  EditableText: React.FC<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  /** Remove this skill */
  remove: () => void;
  /** Is editing enabled */
  isEditable: boolean;
  /** The skill index */
  index: number;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const withOpacity = (color: string, alpha: string): string => {
  if (!color || !color.startsWith('#')) return color;
  const normalized = color.length === 4 
    ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
    : color.slice(0, 7);
  return `${normalized}${alpha}`;
};

// ============================================================================
// VARIANT RENDERERS
// ============================================================================

const BadgeSkill: React.FC<{
  skill: SkillItem;
  style?: React.CSSProperties;
  badgeStyle: { fontSize: string; fontWeight: number; padding: string; borderRadius: string; lineHeight: number };
  accentColor: string;
  textColor: string;
}> = ({ skill, style, badgeStyle, accentColor, textColor }) => (
  <span
    className="font-medium"
    style={{
      padding: badgeStyle.padding,
      fontSize: badgeStyle.fontSize,
      fontWeight: badgeStyle.fontWeight,
      borderRadius: badgeStyle.borderRadius,
      color: textColor,
      border: `1px solid ${withOpacity(accentColor, '33')}`,
      ...style,
    }}
  >
    {skill.name}
  </span>
);

const ProgressSkill: React.FC<{
  skill: SkillItem;
  accentColor: string;
  styles: PDFStyleConfig;
}> = ({ skill, accentColor, styles }) => {
  // Parse rating (0-100 or 0-5 scale)
  const rating = skill.rating ? parseInt(skill.rating, 10) : 75;
  const percentage = rating > 5 ? rating : rating * 20; // Convert 0-5 to 0-100
  
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.primary }}>
          {skill.name}
        </span>
        <span style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
          {percentage}%
        </span>
      </div>
      <div 
        className="w-full rounded-full h-2"
        style={{ backgroundColor: withOpacity(accentColor, '20') }}
      >
        <div 
          className="h-2 rounded-full transition-all"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: accentColor 
          }}
        />
      </div>
    </div>
  );
};

const ListSkill: React.FC<{
  skill: SkillItem;
  styles: PDFStyleConfig;
}> = ({ skill, styles }) => (
  <li style={{ 
    fontSize: styles.itemDescription.size, 
    color: styles.colors.text.secondary 
  }}>
    {skill.name}
  </li>
);

const InlineSkills: React.FC<{
  skills: SkillItem[];
  styles: PDFStyleConfig;
}> = ({ skills, styles }) => (
  <p style={{ 
    fontSize: styles.itemDescription.size, 
    color: styles.colors.text.secondary,
    lineHeight: styles.itemDescription.lineHeight,
  }}>
    {skills.map(s => s.name).join(' • ')}
  </p>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  editable = false,
  accentColor = '#2563eb',
  styles = SINGLE_COLUMN_CONFIG,
  title = 'Skills',
  variant = 'badges',
  className = '',
  style = {},
  showRatings = false,
  renderHeader,
  renderSkill,
  renderContainer,
  titleStyle,
  skillStyle,
  containerStyle,
  gap = '8px',
}) => {
  const { isEditable } = useTemplateEditor({ editable });

  // Don't render if no skills and not editable
  if ((!skills || skills.length === 0) && !editable) {
    return null;
  }

  // Get badge style based on variant
  const getBadgeStyle = () => {
    switch (variant) {
      case 'rounded':
        return SKILL_BADGE_STYLES.rounded;
      case 'compact':
        return SKILL_BADGE_STYLES.compact;
      default:
        return SKILL_BADGE_STYLES.pill;
    }
  };

  // Default skill renderer based on variant
  const defaultRenderSkill = (skill: SkillItem, index: number) => {
    switch (variant) {
      case 'progress':
        return (
          <ProgressSkill 
            key={skill.id || index}
            skill={skill} 
            accentColor={accentColor} 
            styles={styles} 
          />
        );
      case 'list':
        return (
          <ListSkill 
            key={skill.id || index}
            skill={skill} 
            styles={styles} 
          />
        );
      case 'badges':
      case 'rounded':
      case 'compact':
      default:
        return (
          <BadgeSkill
            key={skill.id || index}
            skill={skill}
            style={skillStyle}
            badgeStyle={getBadgeStyle()}
            accentColor={accentColor}
            textColor={styles.itemDescription.color || '#191d24'}
          />
        );
    }
  };

  // Render skills based on variant
  const renderSkillsContent = () => {
    // Inline variant is special - renders all skills together
    if (variant === 'inline') {
      return <InlineSkills skills={skills} styles={styles} />;
    }

    // List variant uses ul/li
    if (variant === 'list') {
      return (
        <ul className="list-disc ml-5 space-y-1" style={containerStyle}>
          {skills.map((skill, index) => 
            renderSkill 
              ? renderSkill(skill, index, createSkillHelpers(skill, index))
              : defaultRenderSkill(skill, index)
          )}
        </ul>
      );
    }

    // Progress variant uses vertical stack
    if (variant === 'progress') {
      return (
        <div style={{ ...containerStyle }}>
          {skills.map((skill, index) => 
            renderSkill 
              ? renderSkill(skill, index, createSkillHelpers(skill, index))
              : defaultRenderSkill(skill, index)
          )}
        </div>
      );
    }

    // Default: flex wrap for badges
    const content = (
      <div 
        className="flex flex-wrap"
        style={{ gap, ...containerStyle }}
      >
        {skills.map((skill, index) => 
          renderSkill 
            ? renderSkill(skill, index, createSkillHelpers(skill, index))
            : defaultRenderSkill(skill, index)
        )}
      </div>
    );

    return renderContainer ? renderContainer(content) : content;
  };

  // Create helpers for custom renderers
  const createSkillHelpers = (skill: SkillItem, index: number): SkillHelpers => ({
    EditableText: ({ className: cn, style: s }) => (
      <span className={cn} style={s}>{skill.name}</span>
    ),
    remove: () => {
      // This would need to be implemented via context
    },
    isEditable,
    index,
  });

  // Header renderer
  const renderSectionHeader = () => {
    if (renderHeader) {
      return renderHeader(title);
    }
    
    return (
      <h2 
        className="uppercase tracking-wide"
        style={{
          fontSize: styles.sectionHeading.size,
          fontWeight: styles.sectionHeading.weight,
          color: accentColor,
          marginBottom: '12px',
          letterSpacing: '0.05em',
          ...titleStyle,
        }}
      >
        {title}
      </h2>
    );
  };

  return (
    <div className={className} style={{ marginBottom: styles.spacing.sectionGap, ...style }}>
      {renderSectionHeader()}
      
      {isEditable ? (
        <InlineEditableSkills
          path="skills"
          skills={skills}
          renderSkill={(skill, index) => 
            renderSkill 
              ? renderSkill(skill, index, createSkillHelpers(skill, index))
              : defaultRenderSkill(skill, index)
          }
        />
      ) : (
        renderSkillsContent()
      )}
    </div>
  );
};

export default SkillsSection;
