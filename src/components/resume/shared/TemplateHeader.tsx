/**
 * TemplateHeader - Standardized header component for all templates
 * 
 * This component handles:
 * - Name display (editable/non-editable)
 * - Contact information (email, phone, location)
 * - Social links (LinkedIn, GitHub, Portfolio)
 * - Multiple layout styles
 * - Consistent styling via config
 */

import React from 'react';
import { ResumeData } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { PDFStyleConfig } from '@/lib/pdfStyles';
import { HeaderConfig } from '@/lib/templateConfig';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export interface TemplateHeaderProps {
  /** Resume data containing personal info */
  personalInfo: ResumeData['personalInfo'];
  /** Whether to include social links */
  includeSocialLinks?: boolean;
  /** Whether the header is editable */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** PDF style configuration */
  styles: PDFStyleConfig;
  /** Header configuration */
  config?: HeaderConfig;
  /** Custom className */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  layout: 'left-aligned',
  showTitle: true,
  showSocialLinks: true,
  contactLayout: 'inline',
  hasBackground: false,
};

export const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  personalInfo,
  includeSocialLinks = true,
  editable = false,
  accentColor = '#2563eb',
  styles,
  config = DEFAULT_HEADER_CONFIG,
  className = '',
  style = {},
}) => {
  const { fullName, email, phone, location, title, linkedin, github, portfolio } = personalInfo;
  
  // Helper to check if a link value is meaningful (not empty, not placeholder)
  const hasValidValue = (value: string | undefined | null): boolean => {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    // Filter out common placeholder texts
    const placeholders = ['portfolio url', 'portfolio', 'url', 'website', 'www.example.com', 'example.com'];
    const lowerTrimmed = trimmed.toLowerCase();
    return !placeholders.some(placeholder => lowerTrimmed === placeholder || lowerTrimmed.includes(placeholder + ' url'));
  };
  
  const showSocials = config.showSocialLinks && includeSocialLinks;
  // In editable mode, check if any social link exists (even if empty, to show for editing)
  // In non-editable mode, only check for valid values
  const hasSocialLinks = editable 
    ? (linkedin || github || portfolio) // Show section if any field exists (even empty) in edit mode
    : (hasValidValue(linkedin) || hasValidValue(github) || hasValidValue(portfolio)); // Only show if valid values exist in view/PDF mode

  // Contact item renderer
  const renderContactItem = (
    icon: React.ReactNode,
    value: string | undefined,
    path: string,
    key: string
  ) => {
    // In non-editable mode (PDF), only show if value is valid
    if (!editable && !hasValidValue(value)) return null;
    // In editable mode, always show (even if empty) so user can edit
    
    return (
      <div key={key} className="flex items-center gap-2">
        {icon}
        {editable ? (
          <InlineEditableText
            path={path}
            value={value || ''}
            placeholder={key === 'email' ? 'email@example.com' : key === 'phone' ? '+1 (555) 000-0000' : 'Location'}
            className="inline-block"
            style={{ fontSize: styles.header.contact.size }}
          />
        ) : (
          <span style={{ fontSize: styles.header.contact.size }}>{value}</span>
        )}
      </div>
    );
  };

  // Social link renderer
  const renderSocialLink = (
    icon: React.ReactNode,
    value: string | undefined,
    path: string,
    key: string
  ) => {
    // In non-editable mode (PDF), only show if value is valid (not empty, not placeholder)
    if (!editable && !hasValidValue(value)) return null;
    // In editable mode, always show (even if empty) so user can edit - no need to check value
    
    return (
      <div key={key} className="flex items-center gap-2">
        {icon}
        {editable ? (
          <InlineEditableText
            path={path}
            value={value || ''}
            placeholder={`${key === 'linkedin' ? 'LinkedIn' : key === 'github' ? 'GitHub' : 'Portfolio'} URL`}
            className="inline-block"
            style={{ fontSize: styles.header.contact.size }}
          />
        ) : (
          <span style={{ fontSize: styles.header.contact.size }}>{value}</span>
        )}
      </div>
    );
  };

  const iconStyle = { 
    width: '14px', 
    height: '14px',
    fill: 'none', 
    stroke: 'currentColor', 
    strokeWidth: 2 
  };

  return (
    <div 
      className={`${className}`}
      style={{
        marginBottom: styles.spacing.sectionGap,
        paddingBottom: '20px',
        borderBottom: `1px solid ${accentColor}`,
        ...style,
      }}
    >
      {/* Name */}
      {editable ? (
        <InlineEditableText
          path="personalInfo.fullName"
          value={fullName}
          className="block mb-2"
          style={{
            fontSize: styles.header.name.size,
            fontWeight: styles.header.name.weight,
            lineHeight: styles.header.name.lineHeight,
            letterSpacing: styles.header.name.letterSpacing,
            color: accentColor,
          }}
          as="h1"
        />
      ) : (
        <h1 
          className="mb-2"
          style={{
            fontSize: styles.header.name.size,
            fontWeight: styles.header.name.weight,
            lineHeight: styles.header.name.lineHeight,
            letterSpacing: styles.header.name.letterSpacing,
            color: accentColor,
          }}
        >
          {fullName}
        </h1>
      )}

      {/* Title (if enabled) */}
      {config.showTitle && title && (
        editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={title}
            className="block mb-2"
            style={{
              fontSize: styles.header.title.size,
              fontWeight: styles.header.title.weight,
              color: styles.colors.text.secondary,
            }}
            as="p"
          />
        ) : (
          <p 
            className="mb-2"
            style={{
              fontSize: styles.header.title.size,
              fontWeight: styles.header.title.weight,
              color: styles.colors.text.secondary,
            }}
          >
            {title}
          </p>
        )
      )}

      {/* Contact Information */}
      <div 
        className="flex flex-wrap gap-x-6 gap-y-1"
        style={{ 
          fontSize: styles.header.contact.size, 
          color: styles.colors.text.secondary 
        }}
      >
        {renderContactItem(
          <Mail style={iconStyle} />,
          email,
          'personalInfo.email',
          'email'
        )}
        {renderContactItem(
          <Phone style={iconStyle} />,
          phone,
          'personalInfo.phone',
          'phone'
        )}
        {renderContactItem(
          <MapPin style={iconStyle} />,
          location,
          'personalInfo.location',
          'location'
        )}
      </div>

      {/* Social Links */}
      {showSocials && hasSocialLinks && (
        <div 
          className="flex flex-wrap gap-x-6 gap-y-1 mt-2"
          style={{ 
            fontSize: styles.header.contact.size, 
            color: styles.colors.text.secondary 
          }}
        >
          {renderSocialLink(
            <Linkedin style={iconStyle} />,
            linkedin,
            'personalInfo.linkedin',
            'linkedin'
          )}
          {renderSocialLink(
            <Github style={iconStyle} />,
            github,
            'personalInfo.github',
            'github'
          )}
          {renderSocialLink(
            <Globe style={iconStyle} />,
            portfolio,
            'personalInfo.portfolio',
            'portfolio'
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateHeader;
