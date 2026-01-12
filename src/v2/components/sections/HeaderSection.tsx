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
  const scaleFontSize = styleOptions?.scaleFontSize || ((s: string) => s);
  
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
      fontSize: scaleFontSize(typography.contact.fontSize),
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
      <div className="flex items-center gap-1.5" style={{ fontSize: scaleFontSize(typography.contact.fontSize), fontFamily: baseFontFamily }}>
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
      fontSize: scaleFontSize(typography.name.fontSize),
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
      fontSize: scaleFontSize(typography.title.fontSize),
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

    const hasContactItems = filteredContactItems.length > 0;
    const hasSocialItems = filteredSocialItems.length > 0;

    return (
      <div className="flex flex-col" style={{ gap: '8px' }}>
        {/* Primary contact info row */}
        {hasContactItems && (
          <div
            className="flex flex-wrap items-center"
            style={{ gap: spacing.contactGap }}
          >
            {filteredContactItems.map((item, index) => (
              <EditableContactItem key={`contact-${index}`} icon={item.icon} value={item.value || ''} path={item.path} />
            ))}
          </div>
        )}
        {/* Social links row */}
        {hasSocialItems && (
          <div
            className="flex flex-wrap items-center"
            style={{ gap: spacing.contactGap }}
          >
            {filteredSocialItems.map((item, index) => (
              <EditableContactItem key={`social-${index}`} icon={item.icon} value={item.value || ''} path={item.path} href={item.href} />
            ))}
          </div>
        )}
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

    // For banner: use white border for clean contrast; otherwise use accent color
    const borderColor = options?.borderColor || (forBanner ? 'rgba(255, 255, 255, 0.95)' : accent);
    // For banner: use semi-transparent white bg; otherwise use light accent tint
    const backgroundColor = options?.backgroundColor || (forBanner ? 'rgba(255, 255, 255, 0.2)' : `${accent}15`);
    // For banner: use white text; otherwise use accent color
    const textColor = options?.textColor || (forBanner ? '#ffffff' : accent);
    const initials = getInitials(personalInfo.fullName || '');
    // Better border width for banner photos
    const borderWidth = options?.borderWidth || (forBanner ? '3px' : '2px');
    // Enhanced shadow for banner photos
    const boxShadow = forBanner
      ? '0 4px 16px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)';

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
          borderWidth={borderWidth}
          boxShadow={boxShadow}
          editable={editable}
          initials={initials}
        />
      );
    }

    // Non-editable mode: render simple image/placeholder
    if (personalInfo.photo) {
      const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '8px' : '4px';

      return (
        <div
          data-section="photo"
          className="resume-photo"
          style={{
            width: size,
            height: size,
            flexShrink: 0,
            borderRadius,
            overflow: 'hidden',
            border: `${borderWidth} solid ${borderColor}`,
            boxShadow,
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
    const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '8px' : '4px';

    return (
      <div
        data-section="photo"
        className="resume-photo"
        style={{
          width: size,
          height: size,
          flexShrink: 0,
          borderRadius,
          border: `${borderWidth} solid ${borderColor}`,
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow,
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
        const centeredPhotoPosition = header.photoPosition || 'top'; // 'top', 'left', 'right'
        const centeredAvatar = header.showPhoto ? renderAvatar({ size: header.photoSize || '72px' }) : null;

        // Photo on top (original centered layout)
        if (centeredPhotoPosition === 'top' || !header.showPhoto) {
          return (
            <div className="text-center" style={{ padding: header.padding }}>
              {centeredAvatar && (
                <div className="flex justify-center" style={{ marginBottom: '12px' }}>
                  {centeredAvatar}
                </div>
              )}
              {renderName()}
              <div style={{ marginTop: '2px' }}>{renderTitle()}</div>
              <div
                className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
                style={{ marginTop: '12px' }}
              >
                {renderContact()}
              </div>
            </div>
          );
        }

        // Photo on left or right - horizontal layout
        // When photo is on one side, text content should be on the opposite side (left-aligned)
        return (
          <div
            className="flex items-center gap-5"
            style={{
              padding: header.padding,
            }}
          >
            {centeredPhotoPosition === 'left' && centeredAvatar}
            <div className="flex-1" style={{ textAlign: 'left' }}>
              {renderName()}
              <div style={{ marginTop: '2px' }}>{renderTitle()}</div>
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-2"
                style={{
                  marginTop: '10px',
                  justifyContent: 'flex-start',
                }}
              >
                {renderContact()}
              </div>
            </div>
            {centeredPhotoPosition === 'right' && centeredAvatar}
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
          fontSize: scaleFontSize(typography.contact.fontSize),
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: baseFontFamily,
        };
        const bannerIconSize = header.contactIcons?.size || '13px';
        const bannerIconColor = 'rgba(255, 255, 255, 0.8)';

        // Helper to render banner contact item with icon
        const renderBannerContactItem = (
          icon: React.ElementType,
          value: string | undefined,
          path: string,
          isLink?: boolean,
          href?: string
        ) => {
          if (!editable && !value) return null;
          const Icon = icon;
          const showIcon = header.contactIcons?.show !== false;

          const content = (
            <div className="flex items-center gap-1.5">
              {showIcon && <Icon style={{ width: bannerIconSize, height: bannerIconSize, color: bannerIconColor, flexShrink: 0 }} />}
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={bannerContactStyle}
                />
              ) : isLink && href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...bannerContactStyle, textDecoration: 'none' }}
                >
                  {value}
                </a>
              ) : (
                <span style={bannerContactStyle}>{value}</span>
              )}
            </div>
          );
          return content;
        };

        return (
          <div
            data-header="banner"
            style={{
              backgroundColor: bannerBgColor,
              padding: header.padding || '24px 32px',
              color: bannerTextColor,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="flex items-center gap-5" style={{ position: 'relative', zIndex: 1 }}>
              {bannerPhotoPosition === 'left' && bannerAvatar}
              <div className="flex-1">
                {/* Name and Title */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  {renderName()}
                  {(editable || personalInfo.title) && (
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '20px' }}>|</span>
                  )}
                  {(editable || personalInfo.title) && (
                    editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={{
                          fontSize: scaleFontSize(typography.title.fontSize),
                          fontWeight: typography.title.fontWeight,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      <span style={{
                        fontSize: scaleFontSize(typography.title.fontSize),
                        fontWeight: typography.title.fontWeight,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontFamily: baseFontFamily,
                      }}>
                        {personalInfo.title}
                      </span>
                    )
                  )}
                </div>
                {/* All contact info in one row */}
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-2"
                  style={{ marginTop: '10px' }}
                >
                  {renderBannerContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
                  {renderBannerContactItem(Mail, personalInfo.email, 'personalInfo.email')}
                  {renderBannerContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
                  {includeSocialLinks && renderBannerContactItem(
                    Linkedin,
                    personalInfo.linkedin,
                    'personalInfo.linkedin',
                    true,
                    personalInfo.linkedin?.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`
                  )}
                  {includeSocialLinks && renderBannerContactItem(
                    Globe,
                    personalInfo.portfolio,
                    'personalInfo.portfolio',
                    true,
                    personalInfo.portfolio?.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`
                  )}
                  {includeSocialLinks && renderBannerContactItem(
                    Github,
                    personalInfo.github,
                    'personalInfo.github',
                    true,
                    personalInfo.github?.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`
                  )}
                </div>
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
            <div className="flex items-center gap-6">
              {minimalPhotoPosition === 'left' && minimalAvatar}
              <div className="flex-1">
                {renderName()}
                <div style={{ marginTop: '6px' }}>{renderTitle()}</div>
                <div style={{ marginTop: '14px' }}>{renderContact()}</div>
              </div>
              {minimalPhotoPosition === 'right' && minimalAvatar}
            </div>
          </div>
        );

      case 'split':
        return (
          <div style={{ padding: header.padding }}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
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

      case 'elegant-banner':
        // Elegant banner with lighter gradient based on theme color, centered photo, and two-column contact
        const elegantGradient = `linear-gradient(135deg, ${adjustColor(accent, 30)} 0%, ${adjustColor(accent, 60)} 50%, ${adjustColor(accent, 90)} 100%)`;
        const elegantPhotoSize = header.photoSize || '80px';
        const elegantPhotoPx = parsePx(elegantPhotoSize, 80);

        // Render elegant avatar (no badge)
        const renderElegantAvatar = () => {
          if (!showPhoto) return null;

          const shape = header.photoShape || 'circle';
          const initials = getInitials(personalInfo.fullName || '');

          if (editable) {
            return (
              <InlineEditablePhoto
                path="personalInfo.photo"
                value={personalInfo.photo}
                size={elegantPhotoSize}
                shape={shape}
                borderColor="#ffffff"
                backgroundColor={`${accent}20`}
                textColor={accent}
                borderWidth="4px"
                editable={editable}
                initials={initials}
              />
            );
          }

          if (personalInfo.photo) {
            return (
              <div
                data-section="photo"
                className="resume-photo"
                style={{
                  width: elegantPhotoSize,
                  height: elegantPhotoSize,
                  borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '4px',
                  overflow: 'hidden',
                  border: '4px solid #ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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

          return (
            <div
              data-section="photo"
              className="resume-photo"
              style={{
                width: elegantPhotoSize,
                height: elegantPhotoSize,
                borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '4px',
                border: '4px solid #ffffff',
                backgroundColor: `${accent}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: `${Math.round(elegantPhotoPx / 2.5)}px`,
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: '0.02em',
                  fontFamily: baseFontFamily,
                }}
              >
                {initials}
              </span>
            </div>
          );
        };

        // Contact item for elegant banner
        const elegantContactStyle: React.CSSProperties = {
          fontSize: typography.contact.fontSize,
          color: typography.contact.color,
          fontFamily: baseFontFamily,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        };
        const elegantIconSize = '14px';
        const elegantIconColor = accent;

        const renderElegantContact = (icon: React.ElementType, value: string | undefined, path: string, href?: string) => {
          if (!editable && !value) return null;
          const Icon = icon;

          return (
            <div style={elegantContactStyle}>
              <Icon style={{ width: elegantIconSize, height: elegantIconSize, color: elegantIconColor, flexShrink: 0 }} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={{ fontSize: typography.contact.fontSize, color: typography.contact.color, fontFamily: baseFontFamily }}
                />
              ) : href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: typography.contact.color, textDecoration: 'none' }}>
                  {value}
                </a>
              ) : (
                <span>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div data-header="elegant-banner" style={{ fontFamily: baseFontFamily }}>
            {/* Gradient banner background */}
            <div
              style={{
                background: elegantGradient,
                height: '90px',
                width: '100%',
              }}
            />

            {/* Content area with photo overlapping banner */}
            <div
              style={{
                padding: '0 32px 20px 32px',
                marginTop: `-${elegantPhotoPx / 2}px`,
                textAlign: 'center',
              }}
            >
              {/* Centered photo with badge */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                {renderElegantAvatar()}
              </div>

              {/* Name */}
              <h1 style={{
                fontSize: typography.name.fontSize,
                fontWeight: typography.name.fontWeight,
                color: typography.name.color,
                margin: 0,
                fontFamily: baseFontFamily,
                letterSpacing: typography.name.letterSpacing || '-0.01em',
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={personalInfo.fullName || 'Your Name'}
                    style={{
                      fontSize: typography.name.fontSize,
                      fontWeight: typography.name.fontWeight,
                      color: typography.name.color,
                      fontFamily: baseFontFamily,
                    }}
                  />
                ) : (
                  personalInfo.fullName || 'Your Name'
                )}
              </h1>

              {/* Title with location */}
              <p style={{
                fontSize: typography.title.fontSize,
                fontWeight: typography.title.fontWeight,
                color: accent,
                margin: '4px 0 0 0',
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <>
                    <InlineEditableText
                      path="personalInfo.title"
                      value={personalInfo.title || 'Professional Title'}
                      style={{ fontSize: typography.title.fontSize, color: accent, fontFamily: baseFontFamily }}
                    />
                    {' - '}
                    <InlineEditableText
                      path="personalInfo.location"
                      value={personalInfo.location || 'Location'}
                      style={{ fontSize: typography.title.fontSize, color: accent, fontFamily: baseFontFamily }}
                    />
                  </>
                ) : (
                  <>
                    {personalInfo.title}
                    {personalInfo.location && ` - ${personalInfo.location}`}
                  </>
                )}
              </p>

              {/* Contact info in two columns */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '16px 32px',
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                {renderElegantContact(Mail, personalInfo.email, 'personalInfo.email')}
                {renderElegantContact(Phone, personalInfo.phone, 'personalInfo.phone')}
                {includeSocialLinks && renderElegantContact(
                  Linkedin,
                  personalInfo.linkedin,
                  'personalInfo.linkedin',
                  personalInfo.linkedin?.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`
                )}
                {includeSocialLinks && renderElegantContact(
                  Globe,
                  personalInfo.portfolio,
                  'personalInfo.portfolio',
                  personalInfo.portfolio?.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`
                )}
              </div>
            </div>
          </div>
        );

      case 'creative-underline':
        // Creative header with stylized underline and modern two-row layout
        // Uses its own internal spacing - header padding from config is ignored for full-width effect
        const creativePhotoSize = header.photoSize || '56px';
        const creativeAvatar = renderAvatar({
          size: creativePhotoSize,
          borderColor: accent,
          backgroundColor: `${accent}10`,
          textColor: accent,
          borderWidth: '2px',
        });

        const creativeContactStyle: React.CSSProperties = {
          fontSize: scaleFontSize(typography.contact.fontSize),
          color: typography.contact.color,
          fontFamily: baseFontFamily,
        };
        const creativeIconSize = header.contactIcons?.size || '12px';

        const renderCreativeContactItem = (
          icon: React.ElementType,
          value: string | undefined,
          path: string,
          isLink?: boolean,
          href?: string
        ) => {
          if (!editable && !value) return null;
          const Icon = icon;
          const showIcon = header.contactIcons?.show !== false;

          const content = (
            <div className="flex items-center gap-1.5">
              {showIcon && <Icon style={{ width: creativeIconSize, height: creativeIconSize, color: accent, flexShrink: 0 }} />}
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={creativeContactStyle}
                />
              ) : isLink && href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...creativeContactStyle, textDecoration: 'none' }}
                >
                  {value}
                </a>
              ) : (
                <span style={creativeContactStyle}>{value}</span>
              )}
            </div>
          );
          return content;
        };

        return (
          <div
            data-header="creative-underline"
            style={{
              padding: '24px 28px 20px 28px',
              fontFamily: baseFontFamily,
              position: 'relative',
            }}
          >
            {/* Top decorative line - full width */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${accent} 0%, ${accent}60 40%, transparent 100%)`,
              }}
            />

            {/* Main content row */}
            <div className="flex items-start gap-4" style={{ marginTop: '8px' }}>
              {showPhoto && creativeAvatar}
              <div className="flex-1">
                {/* Name with creative underline */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <h1 style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: 700,
                    color: typography.name.color,
                    margin: 0,
                    letterSpacing: typography.name.letterSpacing || '-0.02em',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.fullName"
                        value={personalInfo.fullName || 'Your Name'}
                        style={{
                          fontSize: scaleFontSize(typography.name.fontSize),
                          fontWeight: 700,
                          color: typography.name.color,
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.fullName || 'Your Name'
                    )}
                  </h1>
                  {/* Stylized underline */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '60px',
                      height: '3px',
                      backgroundColor: accent,
                      borderRadius: '2px',
                    }}
                  />
                </div>

                {/* Title */}
                <p style={{
                  fontSize: scaleFontSize(typography.title.fontSize),
                  fontWeight: 500,
                  color: accent,
                  margin: '12px 0 0 0',
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={personalInfo.title || 'Professional Title'}
                      style={{
                        fontSize: scaleFontSize(typography.title.fontSize),
                        fontWeight: 500,
                        color: accent,
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.title
                  )}
                </p>
              </div>
            </div>

            {/* Contact row with separator line */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-2"
                style={{ justifyContent: 'flex-start' }}
              >
                {renderCreativeContactItem(Mail, personalInfo.email, 'personalInfo.email')}
                {renderCreativeContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
                {renderCreativeContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
                {includeSocialLinks && renderCreativeContactItem(
                  Linkedin,
                  personalInfo.linkedin,
                  'personalInfo.linkedin',
                  true,
                  personalInfo.linkedin?.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`
                )}
                {includeSocialLinks && renderCreativeContactItem(
                  Github,
                  personalInfo.github,
                  'personalInfo.github',
                  true,
                  personalInfo.github?.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`
                )}
                {includeSocialLinks && renderCreativeContactItem(
                  Globe,
                  personalInfo.portfolio,
                  'personalInfo.portfolio',
                  true,
                  personalInfo.portfolio?.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`
                )}
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
            <div className="flex items-center gap-5">
              {photoPosition === 'left' && avatar}
              <div className="flex-1">
                {renderName()}
                <div style={{ marginTop: '6px' }}>{renderTitle()}</div>
                <div style={{ marginTop: '14px' }}>{renderContact()}</div>
              </div>
              {photoPosition === 'right' && avatar}
            </div>
          </div>
        );
    }
  };

  // Determine header margin-bottom from config or use sensible defaults
  const isBannerHeader = ['banner', 'gradient-banner', 'elegant-banner'].includes(variant);
  const defaultMargin = isBannerHeader ? '0' : '12px';
  const headerMarginBottom = header.marginBottom ?? defaultMargin;

  return (
    <header style={{ marginBottom: headerMarginBottom }}>
      {renderVariant()}
    </header>
  );
};

export default HeaderSection;
