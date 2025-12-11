/**
 * Resume Builder V2 - Header Section Component
 * 
 * Configurable header that supports multiple variants:
 * - centered: Name centered, contact below
 * - left-aligned: Name left, contact right
 * - split: Name left, contact in columns
 * - banner: Full-width colored banner
 * - minimal: Just name and title
 */

import React from 'react';
import type { TemplateConfig, HeaderVariant } from '../../types';
import type { ResumeData } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface HeaderSectionProps {
  resumeData: ResumeData;
  config: TemplateConfig;
  editable?: boolean;
  variantOverride?: HeaderVariant;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  resumeData,
  config,
  editable = false,
  variantOverride,
}) => {
  const { personalInfo, includeSocialLinks } = resumeData;
  const { typography, colors, header, spacing } = config;
  const variant = variantOverride || header.variant;
  const accent = colors.primary;
  const styleOptions = useStyleOptions();
  const showPhoto = styleOptions?.styleOptions?.showPhoto ?? true;

  // Editable contact item component
  const EditableContactItem: React.FC<{ 
    icon: React.ElementType; 
    value: string; 
    path: string;
    href?: string;
  }> = ({
    icon: Icon,
    value,
    path,
    href,
  }) => {
    const iconSize = header.contactIcons?.size || typography.contact.fontSize || '14px';
    // Force icon color to follow template primary (theme) for consistency
    const iconColor = header.contactIcons?.color || colors.primary || accent;
    const iconStyle = { width: iconSize, height: iconSize, color: iconColor, flexShrink: 0 } as const;
    
    const textStyle: React.CSSProperties = {
      fontSize: typography.contact.fontSize,
      color: typography.contact.color,
    };

    if (editable) {
      return (
        <div className="flex items-center gap-1.5">
          {header.contactIcons?.show !== false && (
            <Icon style={iconStyle} />
          )}
          <InlineEditableText
            path={path}
            value={value || 'Click to edit'}
            style={textStyle}
          />
        </div>
      );
    }

    // In non-editable mode (PDF), don't show empty or invalid values
    // Also don't show placeholder text like "Click to edit"
    if (!editable && (!value || !value.trim() || value === 'Click to edit' || value.trim() === 'Click to edit')) return null;
    
    const content = (
      <div className="flex items-center gap-1.5" style={{ fontSize: typography.contact.fontSize }}>
        {header.contactIcons?.show !== false && (
          <Icon style={iconStyle} />
        )}
        <span style={{ color: typography.contact.color }}>{value}</span>
      </div>
    );

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
          style={{ color: typography.contact.color, textDecoration: 'none' }}
        >
          {content}
        </a>
      );
    }

    return content;
  };

  // Render name
  const renderName = () => {
    const nameStyle: React.CSSProperties = {
      fontSize: typography.name.fontSize,
      fontWeight: typography.name.fontWeight,
      lineHeight: typography.name.lineHeight,
      letterSpacing: typography.name.letterSpacing,
      textTransform: typography.name.textTransform,
      color: variant === 'banner' ? colors.text.light : typography.name.color,
      margin: 0,
    };

    if (editable) {
      return (
        <InlineEditableText
          path="personalInfo.fullName"
          value={personalInfo.fullName || 'Your Name'}
          as="h1"
          style={nameStyle}
        />
      );
    }

    return <h1 style={nameStyle}>{personalInfo.fullName || 'Your Name'}</h1>;
  };

  // Render title
  const renderTitle = () => {
    if (!personalInfo.title) return null;

    const titleStyle: React.CSSProperties = {
      fontSize: typography.title.fontSize,
      fontWeight: typography.title.fontWeight,
      lineHeight: typography.title.lineHeight,
      color: variant === 'banner' ? colors.text.light : accent,
      margin: 0,
    };

    if (editable) {
      return (
        <InlineEditableText
          path="personalInfo.title"
          value={personalInfo.title}
          as="p"
          style={titleStyle}
        />
      );
    }

    return <p style={titleStyle}>{personalInfo.title}</p>;
  };

  // Render contact info
  const renderContact = () => {
    const contactItems = [
      { icon: Phone, value: personalInfo.phone, path: 'personalInfo.phone' },
      { icon: Mail, value: personalInfo.email, path: 'personalInfo.email' },
      { icon: MapPin, value: personalInfo.location, path: 'personalInfo.location' },
    ];

    // Helper to validate URL - must have at least a domain (e.g., "linkedin.com" or "github.com")
    const isValidUrl = (value: string | undefined): boolean => {
      if (!value || !value.trim()) return false;
      const trimmed = value.trim();
      // Must contain at least a dot (domain) or be a valid URL pattern
      return trimmed.includes('.') || trimmed.length > 3;
    };

    const socialItems = includeSocialLinks ? [
      { 
        icon: Linkedin, 
        value: personalInfo.linkedin, 
        path: 'personalInfo.linkedin', 
        href: personalInfo.linkedin?.startsWith('http') ? personalInfo.linkedin : personalInfo.linkedin ? `https://${personalInfo.linkedin}` : undefined 
      },
      { 
        icon: Globe, 
        value: personalInfo.portfolio, 
        path: 'personalInfo.portfolio', 
        href: personalInfo.portfolio?.startsWith('http') ? personalInfo.portfolio : personalInfo.portfolio ? `https://${personalInfo.portfolio}` : undefined 
      },
      { 
        icon: Github, 
        value: personalInfo.github, 
        path: 'personalInfo.github', 
        href: personalInfo.github?.startsWith('http') ? personalInfo.github : personalInfo.github ? `https://${personalInfo.github}` : undefined 
      },
    ] : [];

    // In editable mode, show all fields even if empty
    // In non-editable mode (PDF), only show fields with valid values
    const filteredContactItems = editable 
      ? contactItems 
      : contactItems.filter(item => item.value && item.value.trim());
    
    const filteredSocialItems = editable 
      ? socialItems 
      : socialItems.filter(item => isValidUrl(item.value));

    return (
      <div 
        className="flex flex-wrap items-center"
        style={{ gap: spacing.contactGap }}
      >
        {filteredContactItems.map((item, index) => (
          <EditableContactItem key={`contact-${index}`} icon={item.icon} value={item.value || ''} path={item.path} />
        ))}
        {filteredSocialItems.map((item, index) => (
          <EditableContactItem key={`social-${index}`} icon={item.icon} value={item.value || ''} path={item.path} href={item.href} />
        ))}
      </div>
    );
  };

  const renderPhoto = () => {
    if (!showPhoto || !personalInfo.photo) return null;

    const size = header.photoSize || '80px';
    const shape = header.photoShape || 'circle'; // circle | square | rounded
    const borderRadius =
      shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '4px';

    return (
      <div
        data-section="photo"
        className="resume-photo"
        style={{
          width: size,
          height: size,
          borderRadius,
          overflow: 'hidden',
          border: `2px solid ${accent}`,
          flexShrink: 0,
        }}
      >
        <img
          src={personalInfo.photo}
          alt="photo"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  };

  // Generate initials from name
  const getInitials = (name: string): string => {
    if (!name) return 'AB';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Render initials box
  const renderInitialsBox = () => {
    const initials = getInitials(personalInfo.fullName || '');
    return (
      <div
        style={{
          width: '64px',
          height: '64px',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: colors.text.light,
            letterSpacing: '0.05em',
          }}
        >
          {initials}
        </span>
      </div>
    );
  };

  // Render based on variant
  const renderVariant = () => {
    switch (variant) {
      case 'centered':
        return (
          <div className="text-center" style={{ padding: header.padding }}>
            <div className="flex justify-center mb-3">{renderPhoto()}</div>
            {renderName()}
            <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
            <div className="flex justify-center" style={{ marginTop: '12px' }}>
              {renderContact()}
            </div>
          </div>
        );

      case 'banner':
        // Check if photo exists, otherwise show initials
        const showInitials = !personalInfo.photo || !showPhoto;
        const bannerContactStyle: React.CSSProperties = { 
          fontSize: typography.contact.fontSize, 
          color: '#d1d5db',
        };
        return (
          <div
            data-header="banner"
            style={{
              backgroundColor: header.backgroundColor || accent,
              padding: header.padding || '24px 32px',
              color: colors.text.light,
            }}
          >
            <div className="flex items-center gap-4">
              {showInitials ? renderInitialsBox() : renderPhoto()}
              <div className="flex-1">
                {renderName()}
                <div 
                  className="flex flex-wrap items-center gap-x-4 gap-y-1"
                  style={{ marginTop: '8px' }}
                >
                  {(editable || personalInfo.location) && (
                    editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={personalInfo.location || 'Location'}
                        style={bannerContactStyle}
                      />
                    ) : (
                      <span style={bannerContactStyle}>{personalInfo.location}</span>
                    )
                  )}
                  {(editable || personalInfo.email) && (
                    editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={personalInfo.email || 'email@example.com'}
                        style={bannerContactStyle}
                      />
                    ) : (
                      <span style={bannerContactStyle}>{personalInfo.email}</span>
                    )
                  )}
                  {(editable || personalInfo.phone) && (
                    editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={personalInfo.phone || 'Phone'}
                        style={bannerContactStyle}
                      />
                    ) : (
                      <span style={bannerContactStyle}>{personalInfo.phone}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div style={{ padding: header.padding }}>
            <div className="flex items-start gap-4">
              {renderPhoto()}
              <div>
                {renderName()}
                <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
                <div style={{ marginTop: '12px' }}>{renderContact()}</div>
              </div>
            </div>
          </div>
        );

      case 'split':
        return (
          <div style={{ padding: header.padding }}>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                {renderPhoto()}
                <div>
                  {renderName()}
                  <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-end gap-1">
                  {(editable || personalInfo.phone) && <EditableContactItem icon={Phone} value={personalInfo.phone || ''} path="personalInfo.phone" />}
                  {(editable || personalInfo.email) && <EditableContactItem icon={Mail} value={personalInfo.email || ''} path="personalInfo.email" />}
                  {(editable || personalInfo.location) && <EditableContactItem icon={MapPin} value={personalInfo.location || ''} path="personalInfo.location" />}
                </div>
              </div>
            </div>
            {(includeSocialLinks && (editable || personalInfo.linkedin || personalInfo.portfolio || personalInfo.github)) && (
              <div className="flex gap-4 mt-3">
                {(editable || personalInfo.linkedin) && <EditableContactItem icon={Linkedin} value={personalInfo.linkedin || ''} path="personalInfo.linkedin" href={`https://${personalInfo.linkedin}`} />}
                {(editable || personalInfo.portfolio) && <EditableContactItem icon={Globe} value={personalInfo.portfolio || ''} path="personalInfo.portfolio" href={`https://${personalInfo.portfolio}`} />}
                {(editable || personalInfo.github) && <EditableContactItem icon={Github} value={personalInfo.github || ''} path="personalInfo.github" href={`https://${personalInfo.github}`} />}
              </div>
            )}
          </div>
        );

      case 'left-aligned':
      default:
        return (
          <div style={{ padding: header.padding }}>
            <div className="flex items-start gap-4">
              {renderPhoto()}
              <div>
                {renderName()}
                <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
                <div style={{ marginTop: '12px' }}>{renderContact()}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <header>{renderVariant()}</header>;
};

export default HeaderSection;
