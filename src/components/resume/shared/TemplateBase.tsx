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

import React from 'react';
import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { ProfilePhoto } from '../templates/ProfilePhoto';
import { InlineEditableText } from '../InlineEditableText';
import { InlineEditableSkills } from '../InlineEditableSkills';
import { ExperienceSection } from './ExperienceSection';
import { CustomSectionsWrapper } from './CustomSectionsWrapper';
import { InlineEducationSection } from '../sections/InlineEducationSection';
import { SINGLE_COLUMN_CONFIG, PDFStyleConfig } from '@/lib/pdfStyles';

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
}

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
  iconSize = 'w-4 h-4',
  showLabels = false,
}) => {
  const { linkedin, github, portfolio } = resumeData.personalInfo;
  const includeSocialLinks = resumeData.includeSocialLinks;
  
  // Don't render if social links are disabled or no links exist
  if (!includeSocialLinks) return null;
  if (!linkedin && !github && !portfolio && !editable) return null;
  
  const accent = normalizeHex(themeColor) ?? '#2563eb';
  
  const links = [
    { key: 'linkedin', icon: Linkedin, value: linkedin, label: 'LinkedIn', path: 'personalInfo.linkedin' },
    { key: 'github', icon: Github, value: github, label: 'GitHub', path: 'personalInfo.github' },
    { key: 'portfolio', icon: Globe, value: portfolio, label: 'Portfolio', path: 'personalInfo.portfolio' },
  ];
  
  const visibleLinks = links.filter(link => link.value || editable);
  
  if (visibleLinks.length === 0) return null;
  
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {visibleLinks.map(({ key, icon: Icon, value, label, path }) => (
        <div key={key} className="flex items-center gap-1.5 text-[11px]" style={{ color: '#1a1a1a' }}>
          <Icon className={iconSize} style={{ color: accent }} />
          {editable ? (
            <InlineEditableText
              path={path}
              value={value || ''}
              placeholder={`${label} URL`}
              className="inline-block"
              as="span"
            />
          ) : (
            value && (
              <a 
                href={value.startsWith('http') ? value : `https://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: accent }}
              >
                {showLabels ? label : value.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )
          )}
        </div>
      ))}
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
}

export const TemplateContactInfo: React.FC<ContactInfoProps> = ({
  resumeData,
  editable = false,
  themeColor = '#2563eb',
  className = '',
  iconSize = 'w-3.5 h-3.5',
  layout = 'horizontal',
}) => {
  const { email, phone, location } = resumeData.personalInfo;
  const accent = normalizeHex(themeColor) ?? '#2563eb';
  
  const containerClass = layout === 'horizontal' 
    ? 'flex flex-wrap gap-x-4 gap-y-2' 
    : 'flex flex-col gap-2';
  
  return (
    <div className={`${containerClass} text-[13px] ${className}`} style={{ color: '#1a1a1a' }}>
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
  
  if (!summary && !editable) return null;
  
  const defaultHeader = (
    <h2
          className="text-[13px] font-semibold mb-3 uppercase tracking-wide pb-2"
      style={{ borderBottom: `2px solid ${accent}`, color: '#111827' }}
    >
      {title}
    </h2>
  );
  
  return (
    <div className={`mb-4 ${className}`}>
      {renderHeader ? renderHeader(title) : defaultHeader}
      <p className="text-[12.5px] leading-[1.7]" style={{ color: '#1a1a1a' }}>
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
