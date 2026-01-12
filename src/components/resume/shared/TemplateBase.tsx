/**
 * TemplateBase - A comprehensive base component for all resume templates
 * 
 * This component provides ALL the functionality needed for a resume template:
 * - Header with name, title, contact info, photo
 * - Social links (LinkedIn, GitHub, Portfolio)
 * - Professional summary
 * - Skills section
 * - Experience section with bullet points
 * - Education section
 * - Custom sections with items
 * 
 * Templates can use this directly or use individual components for custom layouts.
 * 
 * Usage:
 * ```tsx
 * // Simple usage - uses all defaults
 * <TemplateBase resumeData={resumeData} themeColor={themeColor} editable={editable} />
 * 
 * // Custom layout - use individual sections
 * <TemplateHeader {...} />
 * <TemplateSocialLinks {...} />
 * <TemplateSummary {...} />
 * <ExperienceSection {...} />
 * <InlineEducationSection {...} />
 * <TemplateSkillsSection {...} />
 * <CustomSectionsWrapper {...} />
 * ```
 */

import React, { useState } from 'react';
import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Plus, X } from 'lucide-react';
import { ProfilePhoto } from '../templates/ProfilePhoto';
import { InlineEditableText } from '../InlineEditableText';
import { InlineEditableSkills } from '../InlineEditableSkills';
import { ExperienceSection } from './ExperienceSection';
import { CustomSectionsWrapper } from './CustomSectionsWrapper';
import { InlineEducationSection } from '../sections/InlineEducationSection';
import { SINGLE_COLUMN_CONFIG, PDFStyleConfig, SocialLinksVariant, getSocialLinksStyle, SOCIAL_LINKS_STYLES } from '@/lib/pdfStyles';
import { useStyleOptionsWithDefaults } from '@/contexts/StyleOptionsContext';

// ============================================================================
// TYPES
// ============================================================================

export interface TemplateBaseProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  styles?: PDFStyleConfig;
  className?: string;
}

export interface SocialLinksProps {
  resumeData: ResumeData;
  editable?: boolean;
  themeColor?: string;
  className?: string;
  iconSize?: string;
  showLabels?: boolean;
  /** Display variant for social links */
  variant?: SocialLinksVariant;
  /** Override show underline setting */
  showUnderline?: boolean;
  /** Override text color (defaults to #1a1a1a) */
  textColor?: string;
}

// ============================================================================
// SECTION HEADER COMPONENT (Centralized - works with Style Options)
// ============================================================================

export interface SectionHeaderProps {
  /** Section title text */
  title: string;
  /** Theme/accent color */
  themeColor?: string;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Custom padding bottom */
  paddingBottom?: string;
}

/**
 * Centralized Section Header component that automatically:
 * - Applies text casing from Style Options (AA, Aa, aa)
 * - Applies border style from Style Options (thin, line, dotted, double, none)
 * - Uses accent color for text and border
 * 
 * Usage:
 * ```tsx
 * <SectionHeader title="Experience" themeColor={accent} />
 * ```
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  themeColor = '#2563eb',
  className = '',
  style = {},
  paddingBottom = '0.5rem',
}) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const accent = normalizeHex(themeColor) ?? '#2563eb';
  const sectionBorder = styleOptions.getSectionBorder(accent);
  
  return (
    <h2
      className={`text-[15px] font-semibold mb-2 ${className}`}
      data-accent-color="true"
      style={{
        fontSize: '15px',
        color: accent,
        paddingBottom,
        ...sectionBorder,
        ...style,
      }}
    >
      {styleOptions.formatHeader(title)}
    </h2>
  );
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

// ============================================================================
// SOCIAL LINKS COMPONENT
// ============================================================================

export const TemplateSocialLinks: React.FC<SocialLinksProps> = ({
  resumeData,
  editable = false,
  themeColor = '#2563eb',
  className = '',
  iconSize,
  showLabels,
  variant = 'horizontal',
  showUnderline,
  textColor: textColorProp,
}) => {
  const { linkedin, github, portfolio } = resumeData.personalInfo;
  const includeSocialLinks = resumeData.includeSocialLinks;
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [activeAddLink, setActiveAddLink] = useState<string | null>(null);
  
  // Don't render if social links are disabled
  if (!includeSocialLinks) return null;
  
  const accent = normalizeHex(themeColor) ?? '#2563eb';
  
  // Get variant style configuration
  const variantStyle = getSocialLinksStyle(variant);
  const textColor = textColorProp || '#1a1a1a';
  
  // Allow prop overrides
  const resolvedIconSize = iconSize || variantStyle.iconSize;
  const resolvedShowLabels = showLabels !== undefined ? showLabels : variantStyle.showLabels;
  const resolvedShowUnderline = showUnderline !== undefined ? showUnderline : variantStyle.showUnderline;
  const isIconsOnly = 'iconsOnly' in variantStyle && variantStyle.iconsOnly;
  const hasBadgeStyle = 'hasBadgeStyle' in variantStyle && variantStyle.hasBadgeStyle;
  
  // Helper to check if a link value is meaningful (not empty, not placeholder)
  const hasValidValue = (value: string | undefined | null): boolean => {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    // Filter out common placeholder texts (case-insensitive)
    const placeholders = [
      'portfolio url', 'portfolio', 'url', 'website', 
      'www.example.com', 'example.com', 'portfolio url url',
      'linkedin url', 'github url', 'linkedin', 'github',
      'add linkedin', 'add github', 'add portfolio'
    ];
    const lowerTrimmed = trimmed.toLowerCase();
    // Check for exact matches or placeholder patterns
    const isPlaceholder = placeholders.some(placeholder => {
      return lowerTrimmed === placeholder || 
             lowerTrimmed.endsWith(placeholder) ||
             lowerTrimmed.includes(placeholder + ' url');
    });
    // Also check if it's just "Portfolio URL" or similar pattern
    if (lowerTrimmed.match(/^(portfolio|linkedin|github)\s*url\s*$/i)) return false;
    return !isPlaceholder;
  };
  
  const allLinks = [
    { key: 'linkedin', icon: Linkedin, value: linkedin, label: 'LinkedIn', path: 'personalInfo.linkedin' },
    { key: 'github', icon: Github, value: github, label: 'GitHub', path: 'personalInfo.github' },
    { key: 'portfolio', icon: Globe, value: portfolio, label: 'Portfolio', path: 'personalInfo.portfolio' },
  ];
  
  // Links with valid values (shown in both modes)
  const linksWithValues = allLinks.filter(link => hasValidValue(link.value));
  
  // Links without values (can be added in edit mode)
  const linksWithoutValues = allLinks.filter(link => !hasValidValue(link.value));
  
  // In non-editable mode (PDF), only show links with valid values
  if (!editable) {
    if (linksWithValues.length === 0) return null;
    
    return (
      <div className={`${variantStyle.containerClass} mt-2 ${className}`}>
        {linksWithValues.map(({ key, icon: Icon, value, label }) => (
          <div 
            key={key} 
            className={`${variantStyle.itemClass} ${isIconsOnly ? 'relative' : ''}`}
            style={{ 
              fontSize: variantStyle.fontSize,
              color: textColor,
              ...(hasBadgeStyle ? { borderColor: accent, backgroundColor: `${accent}10` } : {})
            }}
          >
            {variantStyle.showIcons && (
              <Icon className={resolvedIconSize} style={{ color: accent }} />
            )}
            {!isIconsOnly && value && (
              <a 
                href={value.startsWith('http') ? value : `https://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className={resolvedShowUnderline ? 'underline hover:no-underline' : 'hover:underline'}
                style={{ color: accent, fontSize: variantStyle.fontSize }}
              >
                {resolvedShowLabels ? label : value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              </a>
            )}
            {isIconsOnly && value && (
              <a 
                href={value.startsWith('http') ? value : `https://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={label}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
  
  // Editable mode - show links with values + add button for missing ones
  return (
    <div className={`${variantStyle.containerClass} mt-2 ${className}`}>
      {/* Show links that have valid values */}
      {linksWithValues.map(({ key, icon: Icon, value, label, path }) => (
        <div 
          key={key} 
          className={`${variantStyle.itemClass} group`}
          style={{ 
            fontSize: variantStyle.fontSize,
            color: textColor,
            ...(hasBadgeStyle ? { borderColor: accent, backgroundColor: `${accent}10` } : {})
          }}
        >
          {variantStyle.showIcons && (
            <Icon className={resolvedIconSize} style={{ color: accent }} />
          )}
          <InlineEditableText
            path={path}
            value={value || ''}
            placeholder={`${label} URL`}
            className="inline-block"
            style={{ fontSize: variantStyle.fontSize }}
            as="span"
          />
        </div>
      ))}
      
      {/* Show active add link input */}
      {activeAddLink && linksWithoutValues.find(l => l.key === activeAddLink) && (() => {
        const linkToAdd = linksWithoutValues.find(l => l.key === activeAddLink)!;
        const Icon = linkToAdd.icon;
        return (
          <div 
            key={`adding-${linkToAdd.key}`}
            className={`${variantStyle.itemClass} group`}
            style={{ 
              fontSize: variantStyle.fontSize,
              color: textColor,
              ...(hasBadgeStyle ? { borderColor: accent, backgroundColor: `${accent}10` } : {})
            }}
            data-no-pdf="true"
          >
            {variantStyle.showIcons && (
              <Icon className={resolvedIconSize} style={{ color: accent }} />
            )}
            <InlineEditableText
              path={linkToAdd.path}
              value=""
              placeholder={`Enter ${linkToAdd.label} URL...`}
              className="inline-block min-w-[150px]"
              style={{ fontSize: variantStyle.fontSize }}
              as="span"
            />
            <button
              onClick={() => setActiveAddLink(null)}
              className="p-0.5 hover:bg-red-100 rounded transition-colors"
              title="Cancel"
            >
              <X className="h-3 w-3 text-red-500" />
            </button>
          </div>
        );
      })()}
      
      {/* Add button for missing links - hidden in PDF via data attribute */}
      {linksWithoutValues.length > 0 && !activeAddLink && (
        <div className="relative" data-no-pdf="true">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Link
          </button>
          
          {/* Dropdown menu for adding links */}
          {showAddMenu && (
            <div 
              className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 py-1 min-w-[150px]"
              onMouseLeave={() => setShowAddMenu(false)}
            >
              {linksWithoutValues.filter(l => l.key !== activeAddLink).map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveAddLink(key);
                    setShowAddMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                  style={{ color: '#1a1a1a' }}
                >
                  <Icon className="h-4 w-4" style={{ color: accent }} />
                  <span>Add {label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// CONTACT INFO COMPONENT
// ============================================================================

export interface ContactInfoProps {
  resumeData: ResumeData;
  editable?: boolean;
  themeColor?: string;
  className?: string;
  iconSize?: string;
  layout?: 'horizontal' | 'vertical';
  textColor?: string;
}

export const TemplateContactInfo: React.FC<ContactInfoProps> = ({
  resumeData,
  editable = false,
  themeColor = '#2563eb',
  className = '',
  iconSize = 'w-3.5 h-3.5',
  layout = 'horizontal',
  textColor = '#1a1a1a',
}) => {
  const { email, phone, location } = resumeData.personalInfo;
  const accent = normalizeHex(themeColor) ?? '#2563eb';
  
  const containerClass = layout === 'horizontal' 
    ? 'flex flex-wrap gap-x-4 gap-y-2' 
    : 'flex flex-col gap-2';
  
  return (
    <div className={`${containerClass} text-[13px] ${className}`} style={{ color: textColor }}>
      {(email || editable) && (
        <div className="flex items-center gap-1.5">
          <Mail className={iconSize} style={{ color: accent }} />
          {editable ? (
            <InlineEditableText
              path="personalInfo.email"
              value={email || ''}
              placeholder="email@example.com"
              as="span"
            />
          ) : (
            <span>{email}</span>
          )}
        </div>
      )}
      {(phone || editable) && (
        <div className="flex items-center gap-1.5">
          <Phone className={iconSize} style={{ color: accent }} />
          {editable ? (
            <InlineEditableText
              path="personalInfo.phone"
              value={phone || ''}
              placeholder="+1 (555) 000-0000"
              as="span"
            />
          ) : (
            <span>{phone}</span>
          )}
        </div>
      )}
      {(location || editable) && (
        <div className="flex items-center gap-1.5">
          <MapPin className={iconSize} style={{ color: accent }} />
          {editable ? (
            <InlineEditableText
              path="personalInfo.location"
              value={location || ''}
              placeholder="City, State"
              as="span"
            />
          ) : (
            <span>{location}</span>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SKILLS SECTION COMPONENT
// ============================================================================

export interface TemplateSkillsSectionProps {
  resumeData: ResumeData;
  editable?: boolean;
  themeColor?: string;
  title?: string;
  className?: string;
  variant?: 'inline' | 'badges' | 'list';
  renderHeader?: (title: string) => React.ReactNode;
}

export const TemplateSkillsSection: React.FC<TemplateSkillsSectionProps> = ({
  resumeData,
  editable = false,
  themeColor = '#2563eb',
  title = 'Skills',
  className = '',
  variant = 'inline',
  renderHeader,
}) => {
  const skills = resumeData.skills || [];
  const accent = normalizeHex(themeColor) ?? '#2563eb';
  
  if (skills.length === 0 && !editable) return null;
  
  const defaultHeader = (
    <h2
          className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
      style={{ borderBottom: `2px solid ${accent}`, color: accent }}
    >
      {title}
    </h2>
  );
  
  return (
    <div className={`mb-7 ${className}`}>
      {renderHeader ? renderHeader(title) : defaultHeader}
      {editable ? (
        <InlineEditableSkills
          path="skills"
          skills={skills}
          className="text-[13px]"
        />
      ) : (
        <div className="text-[13px] leading-[1.7]" style={{ color: '#1a1a1a' }}>
          {skills.map(skill => skill.name).join(" • ")}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SUMMARY SECTION COMPONENT
// ============================================================================

export interface TemplateSummarySectionProps {
  resumeData: ResumeData;
  editable?: boolean;
  themeColor?: string;
  title?: string;
  className?: string;
  renderHeader?: (title: string) => React.ReactNode;
}

export const TemplateSummarySection: React.FC<TemplateSummarySectionProps> = ({
  resumeData,
  editable = false,
  themeColor = '#2563eb',
  title = 'About Me',
  className = '',
  renderHeader,
}) => {
  const summary = resumeData.personalInfo.summary;
  const accent = normalizeHex(themeColor) ?? '#2563eb';
  const styleOptions = useStyleOptionsWithDefaults();
  
  if (!summary && !editable) return null;
  
  const defaultHeader = (
    <h2
      className="text-[13px] font-semibold mb-2 uppercase tracking-wide pb-1"
      style={{ borderBottom: `2px solid ${accent}`, color: '#111827' }}
    >
      {styleOptions.formatHeader(title)}
    </h2>
  );
  
  return (
    <div className={`mb-4 ${className}`}>
      {renderHeader ? (
        <div className="mb-2">{renderHeader(title)}</div>
      ) : defaultHeader}
      <p className="text-[13px] leading-[1.7]" style={{ color: '#1a1a1a' }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || ''}
            placeholder="Write a brief summary about yourself..."
            multiline
            as="span"
          />
        ) : (
          summary
        )}
      </p>
    </div>
  );
};

// ============================================================================
// EXPORT ALL COMPONENTS
// ============================================================================

export {
  normalizeHex,
  withOpacity,
  formatDate,
};
