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
import type { TemplateConfig, HeaderVariant, V2ResumeData } from '../../types';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditablePhoto } from '@/components/resume/InlineEditablePhoto';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface HeaderSectionProps {
  resumeData: V2ResumeData;
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
  const { personalInfo, settings } = resumeData;
  const includeSocialLinks = settings?.includeSocialLinks ?? true;
  const { typography, colors, header, spacing, fontFamily } = config;
  const variant = variantOverride || header.variant;
  const accent = colors.primary;
  // For banner variants, always use white text for readability
  const isBannerVariant = ['banner', 'gradient-banner'].includes(variant);
  const bannerTextColor = '#ffffff';
  const bannerMetaTextColor = 'rgba(255, 255, 255, 0.85)';
  const styleOptions = useStyleOptions();
  const showPhoto = styleOptions?.styleOptions?.showPhoto ?? true;
  
  // Base font family from config
  const baseFontFamily = fontFamily?.primary || "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const parsePx = (value: string, fallback: number) => {
    const match = value.match(/[\d.]+/);
    return match ? Number(match[0]) : fallback;
  };

  // Helper function to darken/lighten a color
  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Editable contact item component
  const EditableContactItem: React.FC<{ 
    icon: React.ElementType; 
    value: string; 
    path: string;
    href?: string;
    forBanner?: boolean;
  }> = ({
    icon: Icon,
    value,
    path,
    href,
    forBanner = false,
  }) => {
    const iconSize = header.contactIcons?.size || '14px';
    // For banner variants, use white/light colors; otherwise use theme color
    const iconColor = forBanner ? 'rgba(255, 255, 255, 0.9)' : (header.contactIcons?.color || accent);
    const iconStyle = { width: iconSize, height: iconSize, color: iconColor, flexShrink: 0 } as const;
    
    const textStyle: React.CSSProperties = {
      fontSize: typography.contact.fontSize,
      color: forBanner ? 'rgba(255, 255, 255, 0.85)' : typography.contact.color,
      fontFamily: baseFontFamily,
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
    if (!editable && (!value || !value.trim() || value === 'Click to edit' || value.trim() === 'Click to edit')) return null;
    
    const content = (
      <div className="flex items-center gap-1.5" style={{ fontSize: typography.contact.fontSize, fontFamily: baseFontFamily }}>
        {header.contactIcons?.show !== false && (
          <Icon style={iconStyle} />
        )}
        <span style={{ color: textStyle.color }}>{value}</span>
      </div>
    );

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
          style={{ color: textStyle.color, textDecoration: 'none' }}
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
      letterSpacing: typography.name.letterSpacing || '-0.02em',
      textTransform: typography.name.textTransform,
      color: isBannerVariant ? bannerTextColor : typography.name.color,
      margin: 0,
      fontFamily: baseFontFamily,
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
    // Always show title in editable mode
    if (!editable && !personalInfo.title) return null;

    const titleStyle: React.CSSProperties = {
      fontSize: typography.title.fontSize,
      fontWeight: typography.title.fontWeight,
      lineHeight: typography.title.lineHeight,
      color: isBannerVariant ? 'rgba(255, 255, 255, 0.9)' : accent,
      margin: 0,
      fontFamily: baseFontFamily,
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

  // Generate initials from name
  const getInitials = (name: string): string => {
    if (!name) return 'AB';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderAvatar = (options?: {
    size?: string;
    borderColor?: string;
    textColor?: string;
    backgroundColor?: string;
    borderWidth?: string;
    forBanner?: boolean;
  }) => {
    if (!showPhoto) return null;

    const size = options?.size || header.photoSize || '70px';
    const shape = header.photoShape || 'circle';
    const forBanner = options?.forBanner || false;
    
    // For banner: use semi-transparent white border; otherwise use accent color
    const borderColor = options?.borderColor || (forBanner ? 'rgba(255, 255, 255, 0.5)' : accent);
    // For banner: use semi-transparent white bg; otherwise use light accent tint
    const backgroundColor = options?.backgroundColor || (forBanner ? 'rgba(255, 255, 255, 0.15)' : `${accent}15`);
    // For banner: use white text; otherwise use accent color
    const textColor = options?.textColor || (forBanner ? '#ffffff' : accent);
    const initials = getInitials(personalInfo.fullName || '');

    // Use InlineEditablePhoto in editable mode for direct file selection
    if (editable) {
      return (
        <InlineEditablePhoto
          path="personalInfo.photo"
          value={personalInfo.photo}
          size={size}
          shape={shape}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          textColor={textColor}
          borderWidth={options?.borderWidth || '2px'}
          editable={editable}
          initials={initials}
        />
      );
    }

    // Non-editable mode: render simple image/placeholder
    if (personalInfo.photo) {
      return (
        <div
          data-section="photo"
          className="resume-photo"
          style={{
            width: size,
            height: size,
            borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '4px',
            overflow: 'hidden',
            border: `${options?.borderWidth || '2px'} solid ${borderColor}`,
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
    }

    const sizeValue = parsePx(size, 70);
    // Elegant font sizing: larger initials for better readability
    const fontSize = Math.max(16, Math.round(sizeValue / 2.5));

    return (
      <div
        data-section="photo"
        className="resume-photo"
        style={{
          width: size,
          height: size,
          borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '4px',
          border: `${options?.borderWidth || '2px'} solid ${borderColor}`,
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: 700,
            color: textColor,
            letterSpacing: '0.02em',
            fontFamily: baseFontFamily,
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
            <div className="flex justify-center mb-3">{renderAvatar()}</div>
            {renderName()}
            <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
            <div className="flex justify-center" style={{ marginTop: '12px' }}>
              {renderContact()}
            </div>
          </div>
        );

      case 'banner':
        // Get the actual banner background color (theme color or configured)
        const bannerBgColor = header.backgroundColor || accent;
        const bannerPhotoPosition = header.photoPosition || 'left';
        const bannerAvatar = renderAvatar({
          size: header.photoSize || '64px',
          forBanner: true,
        });
        
        // Banner-specific styles - all text should be white/light for readability
        const bannerContactStyle: React.CSSProperties = {
          fontSize: typography.contact.fontSize,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: baseFontFamily,
        };
        const bannerLinkStyle: React.CSSProperties = {
          fontSize: typography.contact.fontSize,
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          fontFamily: baseFontFamily,
        };
        return (
          <div
            data-header="banner"
            style={{
              backgroundColor: bannerBgColor,
              padding: header.padding || '24px 32px',
              color: bannerTextColor,
            }}
          >
            <div className="flex items-center gap-4">
              {bannerPhotoPosition === 'left' && bannerAvatar}
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
                {/* Social Links for Banner */}
                {includeSocialLinks && (
                  <div 
                    className="flex flex-wrap items-center gap-x-4 gap-y-1"
                    style={{ marginTop: '6px' }}
                  >
                    {(editable || personalInfo.linkedin) && (
                      <div className="flex items-center gap-1.5">
                        <Linkedin style={{ width: '14px', height: '14px', color: bannerLinkStyle.color }} />
                        {editable ? (
                          <InlineEditableText
                            path="personalInfo.linkedin"
                            value={personalInfo.linkedin || 'linkedin.com/in/username'}
                            style={bannerLinkStyle}
                          />
                        ) : (
                          <a 
                            href={personalInfo.linkedin?.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...bannerLinkStyle,
                              textDecoration: 'none',
                              fontWeight: 400,
                            }}
                            className="hover:opacity-80 transition-opacity"
                          >
                            {personalInfo.linkedin}
                          </a>
                        )}
                      </div>
                    )}
                    {(editable || personalInfo.github) && (
                      <div className="flex items-center gap-1.5">
                        <Github style={{ width: '14px', height: '14px', color: bannerLinkStyle.color }} />
                        {editable ? (
                          <InlineEditableText
                            path="personalInfo.github"
                            value={personalInfo.github || 'github.com/username'}
                            style={bannerLinkStyle}
                          />
                        ) : (
                          <a 
                            href={personalInfo.github?.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...bannerLinkStyle,
                              textDecoration: 'none',
                              fontWeight: 400,
                            }}
                            className="hover:opacity-80 transition-opacity"
                          >
                            {personalInfo.github}
                          </a>
                        )}
                      </div>
                    )}
                    {(editable || personalInfo.portfolio) && (
                      <div className="flex items-center gap-1.5">
                        <Globe style={{ width: '14px', height: '14px', color: bannerLinkStyle.color }} />
                        {editable ? (
                          <InlineEditableText
                            path="personalInfo.portfolio"
                            value={personalInfo.portfolio || 'portfolio.com'}
                            style={bannerLinkStyle}
                          />
                        ) : (
                          <a 
                            href={personalInfo.portfolio?.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...bannerLinkStyle,
                              textDecoration: 'none',
                              fontWeight: 400,
                            }}
                            className="hover:opacity-80 transition-opacity"
                          >
                            {personalInfo.portfolio}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {bannerPhotoPosition === 'right' && bannerAvatar}
            </div>
          </div>
        );

      case 'minimal':
        const minimalPhotoPosition = header.photoPosition || 'left';
        const minimalAvatar = renderAvatar();
        return (
          <div style={{ padding: header.padding }}>
            <div className="flex items-start gap-4">
              {minimalPhotoPosition === 'left' && minimalAvatar}
              <div className="flex-1">
                {renderName()}
                <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
                <div style={{ marginTop: '12px' }}>{renderContact()}</div>
              </div>
              {minimalPhotoPosition === 'right' && minimalAvatar}
            </div>
          </div>
        );

      case 'split':
        return (
          <div style={{ padding: header.padding }}>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                {renderAvatar()}
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

      case 'accent-bar':
        return (
          <div>
            {/* Accent bar at top */}
            <div style={{ 
              height: '4px', 
              backgroundColor: accent,
              width: '100%',
            }} />
            <div style={{ padding: header.padding || '20px 24px' }}>
              <div className="text-center">
                <div className="flex justify-center mb-3">{renderAvatar()}</div>
                {renderName()}
                <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
                <div className="flex justify-center" style={{ marginTop: '12px' }}>
                  {renderContact()}
                </div>
              </div>
            </div>
          </div>
        );

      case 'compact':
        return (
          <div style={{ padding: header.padding || '16px 24px', fontFamily: baseFontFamily }}>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
              {renderAvatar({ size: '40px', borderWidth: '2px' })}
              {/* Name */}
              <div style={{ 
                fontSize: '22px', 
                fontWeight: 700, 
                color: typography.name.color,
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={personalInfo.fullName || 'Your Name'}
                    style={{ fontSize: '22px', fontWeight: 700, fontFamily: baseFontFamily }}
                  />
                ) : (
                  personalInfo.fullName || 'Your Name'
                )}
              </div>
              {/* Separator */}
              <span style={{ color: '#d1d5db', fontSize: '20px' }}>|</span>
              {/* Title */}
              <div style={{ 
                fontSize: typography.title.fontSize,
                fontWeight: typography.title.fontWeight,
                color: accent,
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title || 'Professional Title'}
                    style={{ fontSize: typography.title.fontSize, fontWeight: typography.title.fontWeight, color: accent, fontFamily: baseFontFamily }}
                  />
                ) : (
                  personalInfo.title
                )}
              </div>
              {/* Separator */}
              <span style={{ color: '#d1d5db', fontSize: '20px' }}>|</span>
              {/* Contact inline */}
              {renderContact()}
            </div>
          </div>
        );

      case 'gradient-banner':
        const gradientBg = `linear-gradient(135deg, ${accent} 0%, ${adjustColor(accent, -30)} 100%)`;
        const gradientAvatar = renderAvatar({
          size: '70px',
          forBanner: true,
          borderWidth: '3px',
        });
        const gradientContactStyle: React.CSSProperties = {
          fontSize: typography.contact.fontSize,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: baseFontFamily,
        };
        return (
          <div
            data-header="gradient-banner"
            style={{
              background: gradientBg,
              padding: header.padding || '28px 32px',
              color: '#ffffff',
              fontFamily: baseFontFamily,
            }}
          >
            <div className="flex items-center gap-4">
              {gradientAvatar}
              <div className="flex-1">
                <h1 style={{
                  fontSize: typography.name.fontSize,
                  fontWeight: typography.name.fontWeight,
                  color: '#ffffff',
                  margin: 0,
                  fontFamily: baseFontFamily,
                  letterSpacing: typography.name.letterSpacing || '-0.02em',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{ fontSize: typography.name.fontSize, fontWeight: typography.name.fontWeight, color: '#ffffff', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    personalInfo.fullName || 'Your Name'
                  )}
                </h1>
                <div 
                  className="flex flex-wrap items-center gap-x-4 gap-y-1"
                  style={{ marginTop: '8px' }}
                >
                  {(editable || personalInfo.email) && (
                    <span style={gradientContactStyle}>
                      {editable ? (
                        <InlineEditableText path="personalInfo.email" value={personalInfo.email || 'email@example.com'} style={gradientContactStyle} />
                      ) : personalInfo.email}
                    </span>
                  )}
                  {(editable || personalInfo.phone) && (
                    <span style={gradientContactStyle}>
                      {editable ? (
                        <InlineEditableText path="personalInfo.phone" value={personalInfo.phone || 'Phone'} style={gradientContactStyle} />
                      ) : personalInfo.phone}
                    </span>
                  )}
                  {(editable || personalInfo.location) && (
                    <span style={gradientContactStyle}>
                      {editable ? (
                        <InlineEditableText path="personalInfo.location" value={personalInfo.location || 'Location'} style={gradientContactStyle} />
                      ) : personalInfo.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'left-aligned':
      default:
        const photoPosition = header.photoPosition || 'left';
        const avatar = renderAvatar();
        
        return (
          <div style={{ padding: header.padding }}>
            <div className="flex items-start gap-4">
              {photoPosition === 'left' && avatar}
              <div className="flex-1">
                {renderName()}
                <div style={{ marginTop: '4px' }}>{renderTitle()}</div>
                <div style={{ marginTop: '12px' }}>{renderContact()}</div>
              </div>
              {photoPosition === 'right' && avatar}
            </div>
          </div>
        );
    }
  };

  // Determine if header needs margin-bottom (non-banner headers)
  const needsMarginBottom = !['banner', 'gradient-banner'].includes(variant);
  const headerMarginBottom = needsMarginBottom ? '20px' : '0';

  return (
    <header style={{ marginBottom: headerMarginBottom }}>
      {renderVariant()}
    </header>
  );
};

export default HeaderSection;
