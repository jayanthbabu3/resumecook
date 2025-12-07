/**
 * Shared Template Components
 * 
 * These components provide standardized, reusable sections for all resume templates.
 * 
 * TWO APPROACHES:
 * 
 * 1. RIGID COMPONENTS (TemplateHeader, TemplateSummary, etc.)
 *    - Use when you want default styling with minimal customization
 *    - Good for quickly creating new templates
 * 
 * 2. FLEXIBLE WRAPPERS (ExperienceSection, SkillsSection, CustomSectionsWrapper)
 *    - Use when you need custom visual styles
 *    - Handles all functionality (editing, data binding)
 *    - You control the visual via render props
 * 
 * RECOMMENDED: Use the FLEXIBLE WRAPPERS for existing templates
 * that have unique visual styles.
 * 
 * Usage Examples:
 * 
 * ```tsx
 * // Simple usage - default styling
 * <ExperienceSection
 *   experience={resumeData.experience}
 *   editable={editable}
 *   accentColor={themeColor}
 * />
 * 
 * // Custom header
 * <ExperienceSection
 *   experience={resumeData.experience}
 *   editable={editable}
 *   renderHeader={(title) => (
 *     <h2 className="text-2xl font-bold border-b-2">{title}</h2>
 *   )}
 * />
 * 
 * // Skills as progress bars
 * <SkillsSection
 *   skills={resumeData.skills}
 *   editable={editable}
 *   variant="progress"
 * />
 * 
 * // Skills as badges
 * <SkillsSection
 *   skills={resumeData.skills}
 *   editable={editable}
 *   variant="badges"
 * />
 * ```
 */

// ============================================================================
// RIGID COMPONENTS (Default styling, minimal customization)
// ============================================================================

export { TemplateHeader } from './TemplateHeader';
export type { TemplateHeaderProps } from './TemplateHeader';

export { TemplateSummary } from './TemplateSummary';
export type { TemplateSummaryProps } from './TemplateSummary';

export { TemplateExperience } from './TemplateExperience';
export type { TemplateExperienceProps } from './TemplateExperience';

export { TemplateEducation } from './TemplateEducation';
export type { TemplateEducationProps } from './TemplateEducation';

export { TemplateSkills } from './TemplateSkills';
export type { TemplateSkillsProps } from './TemplateSkills';

export { TemplateCustomSections } from './TemplateCustomSections';
export type { TemplateCustomSectionsProps } from './TemplateCustomSections';

// ============================================================================
// FLEXIBLE WRAPPERS (Custom styling via render props)
// ============================================================================

export { ExperienceSection } from './ExperienceSection';
export type { 
  ExperienceSectionProps, 
  ExperienceItemHelpers, 
  BulletPointHelpers 
} from './ExperienceSection';

export { ExperienceVariantRenderer } from './ExperienceVariantRenderer';
export type { ExperienceVariant } from './ExperienceVariantRenderer';

export { SkillsSection } from './SkillsSection';
export type { 
  SkillsSectionProps, 
  SkillsVariant, 
  SkillHelpers 
} from './SkillsSection';

export { CustomSectionsWrapper } from './CustomSectionsWrapper';
export type { 
  CustomSectionsWrapperProps, 
  SectionHelpers, 
  SectionHeaderHelpers, 
  ItemHelpers 
} from './CustomSectionsWrapper';

// ============================================================================
// TEMPLATE BASE COMPONENTS (Unified approach)
// ============================================================================

export { 
  TemplateSocialLinks,
  TemplateContactInfo,
  TemplateSkillsSection,
  TemplateSummarySection,
  SectionHeader,
  normalizeHex,
  withOpacity,
  formatDate,
} from './TemplateBase';

export type {
  TemplateBaseProps,
  SocialLinksProps,
  ContactInfoProps,
  TemplateSkillsSectionProps,
  TemplateSummarySectionProps,
  SectionHeaderProps,
} from './TemplateBase';
