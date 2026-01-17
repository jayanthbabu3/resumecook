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

      case 'banner-with-summary':
        // Dark banner with name, title, professional summary, photo on right, and contact info in two rows at bottom
        const summaryBgColor = header.backgroundColor || '#1e293b';
        const summaryPhotoPosition = header.photoPosition || 'right';
        const summaryPhotoSize = header.photoSize || '100px';
        const summaryAvatar = renderAvatar({
          size: summaryPhotoSize,
          forBanner: true,
          borderColor: accent,
          backgroundColor: `${accent}30`,
          textColor: accent,
          borderWidth: '4px',
        });

        // Contact style for banner-with-summary - slightly muted white for text
        const summaryContactStyle: React.CSSProperties = {
          fontSize: scaleFontSize(typography.contact.fontSize || '13px'),
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: baseFontFamily,
        };
        const summaryIconSize = header.contactIcons?.size || '16px';
        // Use accent color for icons to match the screenshot
        const summaryIconColor = header.contactIcons?.color || accent;

        // Helper to render contact item with icon
        const renderSummaryContactItem = (
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {showIcon && <Icon style={{ width: summaryIconSize, height: summaryIconSize, color: summaryIconColor, flexShrink: 0 }} />}
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={summaryContactStyle}
                />
              ) : isLink && href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...summaryContactStyle, textDecoration: 'none' }}
                >
                  {value}
                </a>
              ) : (
                <span style={summaryContactStyle}>{value}</span>
              )}
            </div>
          );
          return content;
        };

        // Title style (accent color)
        const summaryTitleStyle: React.CSSProperties = {
          fontSize: scaleFontSize(typography.title.fontSize || '16px'),
          fontWeight: typography.title.fontWeight || 500,
          color: accent,
          margin: '4px 0 0 0',
          fontFamily: baseFontFamily,
        };

        // Summary text style
        const summaryTextStyle: React.CSSProperties = {
          fontSize: scaleFontSize(typography.body.fontSize || '14px'),
          fontWeight: typography.body.fontWeight || 400,
          lineHeight: 1.7,
          color: 'rgba(255, 255, 255, 0.75)',
          margin: '16px 0 0 0',
          fontFamily: baseFontFamily,
        };

        return (
          <div
            data-header="banner-with-summary"
            style={{
              backgroundColor: summaryBgColor,
              padding: header.padding || '32px 40px',
              color: '#ffffff',
              position: 'relative',
              fontFamily: baseFontFamily,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Main content: Name, Title, Summary on left; Photo on right */}
            <div style={{ display: 'flex', gap: '32px', position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
              {/* Left section with photo (if position is left) */}
              {summaryPhotoPosition === 'left' && summaryAvatar && (
                <div style={{ flexShrink: 0 }}>
                  {summaryAvatar}
                </div>
              )}

              {/* Main content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name */}
                <h1 style={{
                  fontSize: scaleFontSize(typography.name.fontSize || '32px'),
                  fontWeight: typography.name.fontWeight || 700,
                  lineHeight: typography.name.lineHeight || 1.2,
                  letterSpacing: typography.name.letterSpacing || '-0.02em',
                  color: '#ffffff',
                  margin: 0,
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{
                        fontSize: scaleFontSize(typography.name.fontSize || '32px'),
                        fontWeight: typography.name.fontWeight || 700,
                        color: '#ffffff',
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.fullName || 'Your Name'
                  )}
                </h1>

                {/* Title with accent color */}
                {(editable || personalInfo.title) && (
                  <p style={summaryTitleStyle}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={summaryTitleStyle}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </p>
                )}

                {/* Professional Summary */}
                {(editable || personalInfo.summary) && (
                  <p style={summaryTextStyle}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.summary"
                        value={personalInfo.summary || 'Write a brief professional summary here...'}
                        style={summaryTextStyle}
                      />
                    ) : (
                      personalInfo.summary
                    )}
                  </p>
                )}
              </div>

              {/* Right section with photo (if position is right) */}
              {summaryPhotoPosition === 'right' && summaryAvatar && (
                <div style={{ flexShrink: 0 }}>
                  {summaryAvatar}
                </div>
              )}
            </div>

            {/* Contact info in two-column layout (left and right) */}
            <div
              style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '32px',
              }}
            >
              {/* Left column: Email, Location, LinkedIn */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {renderSummaryContactItem(Mail, personalInfo.email, 'personalInfo.email')}
                {renderSummaryContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
                {includeSocialLinks && renderSummaryContactItem(
                  Linkedin,
                  personalInfo.linkedin,
                  'personalInfo.linkedin',
                  true,
                  personalInfo.linkedin?.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`
                )}
              </div>

              {/* Right column: Phone, Portfolio, GitHub */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  alignItems: 'flex-end',
                }}
              >
                {renderSummaryContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
                {includeSocialLinks && renderSummaryContactItem(
                  Globe,
                  personalInfo.portfolio,
                  'personalInfo.portfolio',
                  true,
                  personalInfo.portfolio?.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`
                )}
                {includeSocialLinks && renderSummaryContactItem(
                  Github,
                  personalInfo.github,
                  'personalInfo.github',
                  true,
                  personalInfo.github?.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`
                )}
              </div>
            </div>
          </div>
        );

      case 'sidebar-card':
        // Card-style header with accent sidebar stripe on left
        const sidebarCardAvatar = renderAvatar({
          size: header.photoSize || '70px',
          borderColor: accent,
          backgroundColor: `${accent}15`,
          textColor: accent,
          borderWidth: '3px',
        });

        const sidebarCardContactStyle: React.CSSProperties = {
          fontSize: scaleFontSize(typography.contact.fontSize),
          color: typography.contact.color,
          fontFamily: baseFontFamily,
        };

        return (
          <div
            data-header="sidebar-card"
            style={{
              display: 'flex',
              fontFamily: baseFontFamily,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              overflow: 'hidden',
              margin: header.padding || '0',
            }}
          >
            {/* Accent sidebar stripe */}
            <div
              style={{
                width: '6px',
                backgroundColor: accent,
                flexShrink: 0,
              }}
            />

            {/* Main content */}
            <div style={{ flex: 1, padding: '24px 28px' }}>
              <div className="flex items-start gap-5">
                {showPhoto && sidebarCardAvatar}
                <div className="flex-1">
                  {/* Name */}
                  <h1 style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: typography.name.fontWeight,
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
                          fontWeight: typography.name.fontWeight,
                          color: typography.name.color,
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.fullName || 'Your Name'
                    )}
                  </h1>

                  {/* Title with accent color */}
                  <p style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: typography.title.fontWeight,
                    color: accent,
                    margin: '6px 0 0 0',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={{
                          fontSize: scaleFontSize(typography.title.fontSize),
                          fontWeight: typography.title.fontWeight,
                          color: accent,
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </p>

                  {/* Contact in row */}
                  <div
                    className="flex flex-wrap items-center gap-x-4 gap-y-2"
                    style={{ marginTop: '14px' }}
                  >
                    {renderContact()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'modern-split':
        // Modern split: Name/title on left, contact grid on right
        const modernSplitAvatar = renderAvatar({
          size: header.photoSize || '60px',
          borderColor: accent,
          backgroundColor: `${accent}10`,
          textColor: accent,
          borderWidth: '2px',
        });

        const modernSplitContactStyle: React.CSSProperties = {
          fontSize: scaleFontSize(typography.contact.fontSize),
          color: typography.contact.color,
          fontFamily: baseFontFamily,
        };
        const modernSplitIconSize = header.contactIcons?.size || '13px';

        const renderModernSplitContact = (
          icon: React.ElementType,
          value: string | undefined,
          path: string,
          href?: string
        ) => {
          if (!editable && !value) return null;
          const Icon = icon;
          const showIcon = header.contactIcons?.show !== false;

          return (
            <div className="flex items-center gap-2" style={modernSplitContactStyle}>
              {showIcon && <Icon style={{ width: modernSplitIconSize, height: modernSplitIconSize, color: accent, flexShrink: 0 }} />}
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={modernSplitContactStyle}
                />
              ) : href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...modernSplitContactStyle, textDecoration: 'none' }}>
                  {value}
                </a>
              ) : (
                <span>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div
            data-header="modern-split"
            style={{
              padding: header.padding || '24px 28px',
              fontFamily: baseFontFamily,
              borderBottom: `2px solid ${accent}`,
            }}
          >
            <div className="flex justify-between items-start gap-6">
              {/* Left: Photo + Name/Title */}
              <div className="flex items-center gap-4">
                {showPhoto && modernSplitAvatar}
                <div>
                  <h1 style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: typography.name.fontWeight,
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
                          fontWeight: typography.name.fontWeight,
                          color: typography.name.color,
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.fullName || 'Your Name'
                    )}
                  </h1>
                  <p style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: typography.title.fontWeight,
                    color: accent,
                    margin: '4px 0 0 0',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={{
                          fontSize: scaleFontSize(typography.title.fontSize),
                          fontWeight: typography.title.fontWeight,
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

              {/* Right: Contact grid (2 columns) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, auto)',
                  gap: '8px 24px',
                  justifyItems: 'start',
                }}
              >
                {renderModernSplitContact(Mail, personalInfo.email, 'personalInfo.email')}
                {renderModernSplitContact(Phone, personalInfo.phone, 'personalInfo.phone')}
                {renderModernSplitContact(MapPin, personalInfo.location, 'personalInfo.location')}
                {includeSocialLinks && renderModernSplitContact(
                  Linkedin,
                  personalInfo.linkedin,
                  'personalInfo.linkedin',
                  personalInfo.linkedin?.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`
                )}
                {includeSocialLinks && renderModernSplitContact(
                  Github,
                  personalInfo.github,
                  'personalInfo.github',
                  personalInfo.github?.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`
                )}
                {includeSocialLinks && renderModernSplitContact(
                  Globe,
                  personalInfo.portfolio,
                  'personalInfo.portfolio',
                  personalInfo.portfolio?.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`
                )}
              </div>
            </div>
          </div>
        );

      case 'boxed-accent':
        // Boxed header with accent color border and centered content
        const boxedAccentAvatar = renderAvatar({
          size: header.photoSize || '72px',
          borderColor: accent,
          backgroundColor: `${accent}12`,
          textColor: accent,
          borderWidth: '3px',
        });

        const boxedContactStyle: React.CSSProperties = {
          fontSize: scaleFontSize(typography.contact.fontSize),
          color: typography.contact.color,
          fontFamily: baseFontFamily,
        };

        return (
          <div
            data-header="boxed-accent"
            style={{
              border: `2px solid ${accent}`,
              borderRadius: '12px',
              padding: header.padding || '28px 32px',
              margin: '0',
              fontFamily: baseFontFamily,
              backgroundColor: `${accent}05`,
            }}
          >
            <div className="text-center">
              {/* Photo centered */}
              {showPhoto && (
                <div className="flex justify-center" style={{ marginBottom: '16px' }}>
                  {boxedAccentAvatar}
                </div>
              )}

              {/* Name */}
              <h1 style={{
                fontSize: scaleFontSize(typography.name.fontSize),
                fontWeight: typography.name.fontWeight,
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
                      fontWeight: typography.name.fontWeight,
                      color: typography.name.color,
                      fontFamily: baseFontFamily,
                    }}
                  />
                ) : (
                  personalInfo.fullName || 'Your Name'
                )}
              </h1>

              {/* Title with accent underline */}
              <div style={{ position: 'relative', display: 'inline-block', marginTop: '8px' }}>
                <p style={{
                  fontSize: scaleFontSize(typography.title.fontSize),
                  fontWeight: typography.title.fontWeight,
                  color: accent,
                  margin: 0,
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={personalInfo.title || 'Professional Title'}
                      style={{
                        fontSize: scaleFontSize(typography.title.fontSize),
                        fontWeight: typography.title.fontWeight,
                        color: accent,
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.title
                  )}
                </p>
                {/* Accent underline */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50px',
                    height: '3px',
                    backgroundColor: accent,
                    borderRadius: '2px',
                  }}
                />
              </div>

              {/* Contact info centered */}
              <div
                className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
                style={{ marginTop: '20px' }}
              >
                {renderContact()}
              </div>
            </div>
          </div>
        );

      case 'summary-photo-right':
        // Professional header with name, title, summary paragraph, contact row with separators, and photo on top-right
        const summaryPhotoRightSize = header.photoSize || '90px';
        const summaryPhotoRightAvatar = renderAvatar({
          size: summaryPhotoRightSize,
          borderColor: '#e5e7eb',
          backgroundColor: '#f8fafc',
          textColor: accent,
          borderWidth: '2px',
        });

        // Contact items with separator style
        const renderSeparatedContact = () => {
          const contactItems = [
            { value: personalInfo.phone, path: 'personalInfo.phone' },
            { value: personalInfo.location, path: 'personalInfo.location' },
            { value: personalInfo.email, path: 'personalInfo.email' },
            { value: personalInfo.linkedin, path: 'personalInfo.linkedin' },
          ].filter(item => editable || (item.value && item.value.trim()));

          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0',
                fontSize: scaleFontSize(typography.contact.fontSize),
                color: typography.contact.color,
                fontFamily: baseFontFamily,
              }}
            >
              {contactItems.map((item, index) => (
                <React.Fragment key={item.path}>
                  {index > 0 && (
                    <span style={{ margin: '0 12px', color: typography.dates.color }}>/</span>
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={item.path}
                      value={item.value || 'Click to edit'}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color, fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{item.value}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          );
        };

        return (
          <div
            data-header="summary-photo-right"
            style={{
              padding: header.padding || '0',
              fontFamily: baseFontFamily,
            }}
          >
            {/* Main content row with photo on right */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              {/* Left content area */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name in accent color */}
                <h1 style={{
                  fontSize: scaleFontSize(typography.name.fontSize),
                  fontWeight: typography.name.fontWeight,
                  lineHeight: typography.name.lineHeight,
                  letterSpacing: typography.name.letterSpacing || '-0.01em',
                  color: accent,
                  margin: 0,
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{
                        fontSize: scaleFontSize(typography.name.fontSize),
                        fontWeight: typography.name.fontWeight,
                        color: accent,
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.fullName || 'Your Name'
                  )}
                </h1>

                {/* Title */}
                <p style={{
                  fontSize: scaleFontSize(typography.title.fontSize),
                  fontWeight: typography.title.fontWeight,
                  lineHeight: typography.title.lineHeight,
                  color: typography.title.color || colors.text.primary || '#1a1a1a',
                  margin: '4px 0 0 0',
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={personalInfo.title || 'Professional Title'}
                      style={{
                        fontSize: scaleFontSize(typography.title.fontSize),
                        fontWeight: typography.title.fontWeight,
                        color: typography.title.color || colors.text.primary || '#1a1a1a',
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.title
                  )}
                </p>

                {/* Summary paragraph */}
                {(editable || personalInfo.summary) && (
                  <p style={{
                    fontSize: scaleFontSize(typography.body.fontSize),
                    fontWeight: typography.body.fontWeight,
                    lineHeight: typography.body.lineHeight,
                    color: typography.body.color,
                    margin: '16px 0 0 0',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.summary"
                        value={personalInfo.summary || 'Write a brief professional summary here...'}
                        style={{
                          fontSize: scaleFontSize(typography.body.fontSize),
                          fontWeight: typography.body.fontWeight,
                          lineHeight: typography.body.lineHeight,
                          color: typography.body.color,
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.summary
                    )}
                  </p>
                )}
              </div>

              {/* Photo on right */}
              {showPhoto && (
                <div style={{ flexShrink: 0 }}>
                  {summaryPhotoRightAvatar}
                </div>
              )}
            </div>

            {/* Contact info row with top and bottom separator lines */}
            <div
              style={{
                marginTop: '20px',
                padding: '14px 0',
                borderTop: `1px solid ${colors.border}`,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              {renderSeparatedContact()}
            </div>
          </div>
        );

      case 'modern-elegant':
        // Modern elegant header with bold name, accent underline, and refined contact layout
        // Features: Large bold name, subtle accent underline, title with letter spacing,
        // contact items in a clean horizontal row with dot separators
        const modernElegantContactIconStyle = {
          width: '13px',
          height: '13px',
          color: accent,
          flexShrink: 0,
        };

        const renderModernElegantContactItem = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string,
          isLast: boolean = false
        ) => {
          if (!editable && !value) return null;

          return (
            <React.Fragment>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Icon style={modernElegantContactIconStyle} />
                {editable ? (
                  <InlineEditableText
                    path={path}
                    value={value || 'Click to edit'}
                    style={{
                      fontSize: scaleFontSize(typography.contact.fontSize),
                      color: typography.contact.color,
                      fontFamily: baseFontFamily,
                    }}
                  />
                ) : (
                  <span style={{
                    fontSize: scaleFontSize(typography.contact.fontSize),
                    color: typography.contact.color,
                    fontFamily: baseFontFamily,
                  }}>{value}</span>
                )}
              </div>
              {!isLast && (
                <span style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: colors.border || '#d1d5db',
                  borderRadius: '50%',
                  margin: '0 12px',
                }} />
              )}
            </React.Fragment>
          );
        };

        // Collect contact items for display
        const modernElegantContacts = [
          { icon: Phone, value: personalInfo.phone, path: 'personalInfo.phone' },
          { icon: Mail, value: personalInfo.email, path: 'personalInfo.email' },
          { icon: MapPin, value: personalInfo.location, path: 'personalInfo.location' },
          { icon: Linkedin, value: personalInfo.linkedin, path: 'personalInfo.linkedin' },
          { icon: Globe, value: personalInfo.website, path: 'personalInfo.website' },
        ].filter(item => editable || (item.value && item.value.trim()));

        return (
          <div
            data-header="modern-elegant"
            style={{
              padding: header.padding || '0',
              fontFamily: baseFontFamily,
              textAlign: 'center',
            }}
          >
            {/* Name - Large, bold, with accent underline */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize),
              fontWeight: typography.name.fontWeight || 700,
              lineHeight: typography.name.lineHeight,
              letterSpacing: typography.name.letterSpacing || '-0.02em',
              color: typography.name.color || '#1a1a1a',
              margin: 0,
              fontFamily: baseFontFamily,
              display: 'inline-block',
              position: 'relative',
              paddingBottom: '12px',
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: typography.name.fontWeight || 700,
                    color: typography.name.color || '#1a1a1a',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.fullName || 'Your Name'
              )}
              {/* Accent underline */}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                backgroundColor: accent,
                borderRadius: '2px',
              }} />
            </h1>

            {/* Title - Elegant with letter spacing */}
            <p style={{
              fontSize: scaleFontSize(typography.title.fontSize),
              fontWeight: typography.title.fontWeight || 500,
              lineHeight: typography.title.lineHeight,
              color: typography.title.color || '#4b5563',
              margin: '16px 0 0 0',
              fontFamily: baseFontFamily,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={personalInfo.title || 'Professional Title'}
                  style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: typography.title.fontWeight || 500,
                    color: typography.title.color || '#4b5563',
                    fontFamily: baseFontFamily,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                />
              ) : (
                personalInfo.title
              )}
            </p>

            {/* Contact row with dot separators */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '20px',
              gap: '4px',
            }}>
              {modernElegantContacts.map((item, index) => (
                <React.Fragment key={item.path}>
                  {renderModernElegantContactItem(
                    item.icon,
                    item.value,
                    item.path,
                    index === modernElegantContacts.length - 1
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case 'gradient-creative':
        // Creative header with gradient background, decorative shapes, and photo
        // Features: Vibrant gradient, geometric shapes, circular photo, modern contact layout
        const gradientCreativePhotoSize = header.photoSize || '100px';
        const gradientCreativeAvatar = renderAvatar({
          size: gradientCreativePhotoSize,
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255,255,255,0.2)',
          textColor: '#ffffff',
          borderWidth: '4px',
        });

        // Gradient colors - use primary and secondary from config
        const gradientStart = accent;
        const gradientEnd = colors.secondary || '#6366f1';

        const gradientCreativeContactIconStyle = {
          width: '14px',
          height: '14px',
          color: 'rgba(255,255,255,0.9)',
          flexShrink: 0,
        };

        const renderGradientCreativeContact = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string
        ) => {
          if (!editable && !value) return null;

          return (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Icon style={gradientCreativeContactIconStyle} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={{
                    fontSize: scaleFontSize(typography.contact.fontSize),
                    color: 'rgba(255,255,255,0.95)',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                <span style={{
                  fontSize: scaleFontSize(typography.contact.fontSize),
                  color: 'rgba(255,255,255,0.95)',
                  fontFamily: baseFontFamily,
                }}>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div
            data-header="gradient-creative"
            style={{
              position: 'relative',
              background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
              borderRadius: '0',
              padding: '32px 28px 28px 28px',
              marginLeft: `-${spacing.pagePadding.left}`,
              marginRight: `-${spacing.pagePadding.right}`,
              marginTop: `-${spacing.pagePadding.top}`,
              marginBottom: header.marginBottom || '24px',
              overflow: 'hidden',
              fontFamily: baseFontFamily,
            }}
          >
            {/* Decorative shapes */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '80px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '10%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              pointerEvents: 'none',
            }} />
            {/* Small decorative dots */}
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '15%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '50px',
              right: '25%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              pointerEvents: 'none',
            }} />

            {/* Content */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}>
              {/* Photo */}
              {showPhoto && (
                <div style={{ flexShrink: 0 }}>
                  {gradientCreativeAvatar}
                </div>
              )}

              {/* Text content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name */}
                <h1 style={{
                  fontSize: scaleFontSize(typography.name.fontSize),
                  fontWeight: typography.name.fontWeight || 700,
                  lineHeight: typography.name.lineHeight,
                  letterSpacing: typography.name.letterSpacing || '-0.02em',
                  color: '#ffffff',
                  margin: 0,
                  fontFamily: baseFontFamily,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{
                        fontSize: scaleFontSize(typography.name.fontSize),
                        fontWeight: typography.name.fontWeight || 700,
                        color: '#ffffff',
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.fullName || 'Your Name'
                  )}
                </h1>

                {/* Title */}
                <p style={{
                  fontSize: scaleFontSize(typography.title.fontSize),
                  fontWeight: typography.title.fontWeight || 500,
                  lineHeight: typography.title.lineHeight,
                  color: 'rgba(255,255,255,0.9)',
                  margin: '8px 0 0 0',
                  fontFamily: baseFontFamily,
                  letterSpacing: '0.02em',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={personalInfo.title || 'Professional Title'}
                      style={{
                        fontSize: scaleFontSize(typography.title.fontSize),
                        fontWeight: typography.title.fontWeight || 500,
                        color: 'rgba(255,255,255,0.9)',
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.title
                  )}
                </p>

                {/* Contact row */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginTop: '16px',
                }}>
                  {renderGradientCreativeContact(Mail, personalInfo.email, 'personalInfo.email')}
                  {renderGradientCreativeContact(Phone, personalInfo.phone, 'personalInfo.phone')}
                  {renderGradientCreativeContact(MapPin, personalInfo.location, 'personalInfo.location')}
                  {renderGradientCreativeContact(Linkedin, personalInfo.linkedin, 'personalInfo.linkedin')}
                </div>
              </div>
            </div>
          </div>
        );

      case 'summary-banner':
        // Elegant Split Header with Accent Sidebar Stripe
        // Features: Left accent stripe, name/title with decorative line, contact column, integrated summary
        const summaryBannerIconStyle = {
          width: '13px',
          height: '13px',
          color: accent,
          flexShrink: 0,
        };

        const renderSummaryBannerContact = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string
        ) => {
          if (!editable && !value) return null;

          return (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Icon style={summaryBannerIconStyle} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={{
                    fontSize: scaleFontSize(typography.contact.fontSize),
                    color: typography.contact.color || '#4b5563',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                <span style={{
                  fontSize: scaleFontSize(typography.contact.fontSize),
                  color: typography.contact.color || '#4b5563',
                  fontFamily: baseFontFamily,
                }}>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div
            data-header="summary-banner"
            style={{
              fontFamily: baseFontFamily,
              marginBottom: header.marginBottom || '24px',
              display: 'flex',
              gap: '0',
              marginLeft: `-${spacing.pagePadding.left}`,
              marginRight: `-${spacing.pagePadding.right}`,
              marginTop: `-${spacing.pagePadding.top}`,
            }}
          >
            {/* Left Accent Stripe */}
            <div style={{
              width: '6px',
              background: `linear-gradient(180deg, ${accent} 0%, ${colors.secondary || accent}90 100%)`,
              flexShrink: 0,
            }} />

            {/* Main Content */}
            <div style={{
              flex: 1,
              padding: `${spacing.pagePadding.top} ${spacing.pagePadding.right} 20px ${spacing.pagePadding.left}`,
            }}>
              {/* Top Row: Name/Title and Contact */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '24px',
                marginBottom: '16px',
              }}>
                {/* Left: Name and Title */}
                <div style={{ flex: 1 }}>
                  {/* Name with decorative underline */}
                  <h1 style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: typography.name.fontWeight || 700,
                    lineHeight: typography.name.lineHeight,
                    letterSpacing: typography.name.letterSpacing || '-0.01em',
                    color: typography.name.color || '#1f2937',
                    margin: 0,
                    fontFamily: baseFontFamily,
                    position: 'relative',
                    paddingBottom: '10px',
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.fullName"
                        value={personalInfo.fullName || 'Your Name'}
                        style={{
                          fontSize: scaleFontSize(typography.name.fontSize),
                          fontWeight: typography.name.fontWeight || 700,
                          color: typography.name.color || '#1f2937',
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.fullName || 'Your Name'
                    )}
                    {/* Decorative accent line under name */}
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '60px',
                      height: '3px',
                      background: accent,
                      borderRadius: '2px',
                    }} />
                  </h1>

                  {/* Title */}
                  <p style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: typography.title.fontWeight || 500,
                    lineHeight: typography.title.lineHeight,
                    color: typography.title.color || accent,
                    margin: '8px 0 0 0',
                    fontFamily: baseFontFamily,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={{
                          fontSize: scaleFontSize(typography.title.fontSize),
                          fontWeight: typography.title.fontWeight || 500,
                          color: typography.title.color || accent,
                          fontFamily: baseFontFamily,
                          textTransform: 'uppercase',
                        }}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </p>
                </div>

                {/* Right: Contact Info Column */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '12px 16px',
                  background: `${accent}08`,
                  borderRadius: '6px',
                  borderLeft: `3px solid ${accent}`,
                }}>
                  {renderSummaryBannerContact(Mail, personalInfo.email, 'personalInfo.email')}
                  {renderSummaryBannerContact(Phone, personalInfo.phone, 'personalInfo.phone')}
                  {renderSummaryBannerContact(MapPin, personalInfo.location, 'personalInfo.location')}
                  {renderSummaryBannerContact(Linkedin, personalInfo.linkedin, 'personalInfo.linkedin')}
                  {personalInfo.website && renderSummaryBannerContact(Globe, personalInfo.website, 'personalInfo.website')}
                </div>
              </div>

              {/* Summary with subtle left border */}
              {(editable || personalInfo.summary) && (
                <div style={{
                  paddingLeft: '14px',
                  borderLeft: `2px solid ${accent}30`,
                  marginTop: '4px',
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.summary"
                      value={personalInfo.summary || 'Write your professional summary here...'}
                      as="p"
                      style={{
                        fontSize: scaleFontSize(typography.body.fontSize),
                        fontWeight: typography.body.fontWeight,
                        lineHeight: typography.body.lineHeight,
                        color: typography.body.color,
                        margin: 0,
                        fontFamily: baseFontFamily,
                      }}
                      multiline
                    />
                  ) : (
                    <p style={{
                      fontSize: scaleFontSize(typography.body.fontSize),
                      fontWeight: typography.body.fontWeight,
                      lineHeight: typography.body.lineHeight,
                      color: typography.body.color,
                      margin: 0,
                      fontFamily: baseFontFamily,
                    }}>
                      {personalInfo.summary}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'boxed-contact-icons':
        // Professional header with serif name, title, contact in bordered boxes with icons
        // Used in Project Manager Pro template - matches Jane Rutherford design
        const boxedIconsContactStyle: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          border: `1px solid ${colors.border || '#e5e7eb'}`,
          borderRadius: '4px',
          fontSize: scaleFontSize(typography.contact.fontSize),
          color: typography.contact.color,
          fontFamily: baseFontFamily,
          whiteSpace: 'nowrap',
        };

        const boxedIconsIconStyle = {
          width: '14px',
          height: '14px',
          color: accent,
          flexShrink: 0,
        };

        const renderBoxedIconsContactItem = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string,
          href?: string
        ) => {
          if (!editable && !value) return null;

          return (
            <div style={boxedIconsContactStyle}>
              <Icon style={boxedIconsIconStyle} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={{
                    fontSize: scaleFontSize(typography.contact.fontSize),
                    color: typography.contact.color,
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : href ? (
                <a href={href} style={{ color: typography.contact.color, textDecoration: 'none' }}>
                  {value}
                </a>
              ) : (
                <span>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div
            data-header="boxed-contact-icons"
            style={{
              padding: header.padding || '0',
              fontFamily: baseFontFamily,
            }}
          >
            {/* Name - Large serif style */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize),
              fontWeight: typography.name.fontWeight,
              lineHeight: typography.name.lineHeight,
              letterSpacing: typography.name.letterSpacing || '-0.02em',
              color: typography.name.color || accent,
              margin: 0,
              fontFamily: fontFamily?.secondary || "'Georgia', 'Times New Roman', serif",
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: typography.name.fontWeight,
                    color: typography.name.color || accent,
                    fontFamily: fontFamily?.secondary || "'Georgia', 'Times New Roman', serif",
                  }}
                />
              ) : (
                personalInfo.fullName || 'Your Name'
              )}
            </h1>

            {/* Title */}
            <p style={{
              fontSize: scaleFontSize(typography.title.fontSize),
              fontWeight: typography.title.fontWeight || 600,
              lineHeight: typography.title.lineHeight,
              color: typography.title.color || colors.text.primary || '#1a1a1a',
              margin: '6px 0 0 0',
              fontFamily: baseFontFamily,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={personalInfo.title || 'Professional Title'}
                  style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: typography.title.fontWeight || 600,
                    color: typography.title.color || colors.text.primary || '#1a1a1a',
                    fontFamily: baseFontFamily,
                    textTransform: 'uppercase',
                  }}
                />
              ) : (
                personalInfo.title
              )}
            </p>

            {/* Contact row in bordered boxes */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '16px',
            }}>
              {renderBoxedIconsContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
              {renderBoxedIconsContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
              {renderBoxedIconsContactItem(Mail, personalInfo.email, 'personalInfo.email', personalInfo.email ? `mailto:${personalInfo.email}` : undefined)}
              {renderBoxedIconsContactItem(Linkedin, personalInfo.linkedin, 'personalInfo.linkedin', personalInfo.linkedin ? `https://linkedin.com/in/${personalInfo.linkedin.replace(/.*linkedin\.com\/in\//, '')}` : undefined)}
            </div>
          </div>
        );

      case 'clean-summary-contact':
        // Clean professional header with: Name (bold black), Title (accent), Summary paragraph, Horizontal contact icons bar
        // Used for Retail Manager Pro template - matches Carolyn Potter design
        const cleanSummaryIconSize = header.contactIcons?.size || '14px';
        const cleanSummaryIconColor = header.contactIcons?.color || accent;

        const renderCleanContactItem = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string,
          href?: string
        ) => {
          if (!editable && !value) return null;

          const textStyle: React.CSSProperties = {
            fontSize: scaleFontSize(typography.contact.fontSize || '12px'),
            color: typography.contact.color || '#6b7280',
            fontFamily: baseFontFamily,
          };

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon style={{
                width: cleanSummaryIconSize,
                height: cleanSummaryIconSize,
                color: cleanSummaryIconColor,
                flexShrink: 0
              }} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={textStyle}
                />
              ) : href ? (
                <a href={href} style={{ ...textStyle, textDecoration: 'none' }}>
                  {value}
                </a>
              ) : (
                <span style={textStyle}>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div
            data-header="clean-summary-contact"
            style={{
              padding: header.padding || '0',
              fontFamily: baseFontFamily,
            }}
          >
            {/* Name - Large bold black */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize || '32px'),
              fontWeight: typography.name.fontWeight || 700,
              lineHeight: typography.name.lineHeight || 1.2,
              letterSpacing: typography.name.letterSpacing || '-0.02em',
              color: typography.name.color || '#1a1a1a',
              margin: 0,
              fontFamily: baseFontFamily,
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize || '32px'),
                    fontWeight: typography.name.fontWeight || 700,
                    color: typography.name.color || '#1a1a1a',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.fullName || 'Your Name'
              )}
            </h1>

            {/* Title - Accent color */}
            {(editable || personalInfo.title) && (
              <p style={{
                fontSize: scaleFontSize(typography.title.fontSize || '16px'),
                fontWeight: typography.title.fontWeight || 500,
                lineHeight: typography.title.lineHeight || 1.4,
                color: accent,
                margin: '6px 0 0 0',
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title || 'Professional Title'}
                    style={{
                      fontSize: scaleFontSize(typography.title.fontSize || '16px'),
                      fontWeight: typography.title.fontWeight || 500,
                      color: accent,
                      fontFamily: baseFontFamily,
                    }}
                  />
                ) : (
                  personalInfo.title
                )}
              </p>
            )}

            {/* Summary paragraph - below title */}
            {(editable || personalInfo.summary) && (
              <div style={{
                marginTop: '14px',
                fontSize: scaleFontSize(typography.body.fontSize || '13px'),
                fontWeight: typography.body.fontWeight || 400,
                lineHeight: typography.body.lineHeight || 1.6,
                color: typography.body.color || '#4b5563',
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.summary"
                    value={personalInfo.summary || 'Write your professional summary here...'}
                    style={{
                      fontSize: scaleFontSize(typography.body.fontSize || '13px'),
                      color: typography.body.color || '#4b5563',
                      fontFamily: baseFontFamily,
                      lineHeight: typography.body.lineHeight || 1.6,
                    }}
                    multiline
                  />
                ) : (
                  <p style={{ margin: 0 }}>{personalInfo.summary}</p>
                )}
              </div>
            )}

            {/* Horizontal contact bar with icons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: `1px solid ${colors.border || '#e5e7eb'}`,
            }}>
              {renderCleanContactItem(Mail, personalInfo.email, 'personalInfo.email', personalInfo.email ? `mailto:${personalInfo.email}` : undefined)}
              {renderCleanContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
              {renderCleanContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
              {includeSocialLinks && renderCleanContactItem(
                Linkedin,
                personalInfo.linkedin,
                'personalInfo.linkedin',
                personalInfo.linkedin ? (personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`) : undefined
              )}
            </div>
          </div>
        );

      case 'photo-summary-contact-bar':
        // Photo left, name/title/summary right, gray contact bar below - Theater Actor & CIO style
        const pscbPhotoSize = header.photoSize || '100px';
        const pscbAvatar = renderAvatar({
          size: pscbPhotoSize,
          borderColor: accent,
          backgroundColor: `${accent}15`,
          textColor: accent,
          borderWidth: '3px',
        });

        const pscbContactBarBg = header.backgroundColor || '#f3f4f6';

        const renderPscbContactItem = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string,
          href?: string
        ) => {
          if (!editable && !value) return null;

          const iconStyle = {
            width: '16px',
            height: '16px',
            color: accent,
            flexShrink: 0,
          };

          const textStyle: React.CSSProperties = {
            fontSize: scaleFontSize(typography.contact.fontSize || '12px'),
            color: typography.contact.color || '#374151',
            fontFamily: baseFontFamily,
          };

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon style={iconStyle} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={textStyle}
                />
              ) : href ? (
                <a href={href} style={{ ...textStyle, textDecoration: 'none' }}>
                  {value}
                </a>
              ) : (
                <span style={textStyle}>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div
            data-header="photo-summary-contact-bar"
            style={{
              fontFamily: baseFontFamily,
            }}
          >
            {/* Main header area - Photo left, content right */}
            <div style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              padding: header.padding || '24px',
            }}>
              {/* Photo */}
              {showPhoto && pscbAvatar && (
                <div style={{ flexShrink: 0 }}>
                  {pscbAvatar}
                </div>
              )}

              {/* Name, Title, Summary */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name */}
                <h1 style={{
                  fontSize: scaleFontSize(typography.name.fontSize || '32px'),
                  fontWeight: typography.name.fontWeight || 700,
                  lineHeight: typography.name.lineHeight || 1.2,
                  letterSpacing: typography.name.letterSpacing || '-0.01em',
                  color: typography.name.color || accent,
                  margin: 0,
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{
                        fontSize: scaleFontSize(typography.name.fontSize || '32px'),
                        fontWeight: typography.name.fontWeight || 700,
                        color: typography.name.color || accent,
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.fullName || 'Your Name'
                  )}
                </h1>

                {/* Title */}
                {(editable || personalInfo.title) && (
                  <p style={{
                    fontSize: scaleFontSize(typography.title.fontSize || '16px'),
                    fontWeight: typography.title.fontWeight || 400,
                    lineHeight: typography.title.lineHeight || 1.4,
                    color: accent,
                    margin: '4px 0 0 0',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={{
                          fontSize: scaleFontSize(typography.title.fontSize || '16px'),
                          fontWeight: typography.title.fontWeight || 400,
                          color: accent,
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </p>
                )}

                {/* Summary */}
                {(editable || personalInfo.summary) && (
                  <div style={{
                    marginTop: '12px',
                    fontSize: scaleFontSize(typography.body.fontSize || '13px'),
                    fontWeight: typography.body.fontWeight || 400,
                    lineHeight: typography.body.lineHeight || 1.6,
                    color: typography.body.color || '#374151',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.summary"
                        value={personalInfo.summary || 'Write your professional summary here...'}
                        style={{
                          fontSize: scaleFontSize(typography.body.fontSize || '13px'),
                          color: typography.body.color || '#374151',
                          fontFamily: baseFontFamily,
                          lineHeight: typography.body.lineHeight || 1.6,
                        }}
                        multiline
                      />
                    ) : (
                      <p style={{ margin: 0 }}>{personalInfo.summary}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Gray contact bar */}
            <div style={{
              backgroundColor: pscbContactBarBg,
              padding: '12px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              alignItems: 'center',
            }}>
              {renderPscbContactItem(Mail, personalInfo.email, 'personalInfo.email', personalInfo.email ? `mailto:${personalInfo.email}` : undefined)}
              {renderPscbContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
              {renderPscbContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
              {includeSocialLinks && renderPscbContactItem(
                Linkedin,
                personalInfo.linkedin,
                'personalInfo.linkedin',
                personalInfo.linkedin ? (personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`) : undefined
              )}
              {includeSocialLinks && personalInfo.github && renderPscbContactItem(
                Github,
                personalInfo.github,
                'personalInfo.github',
                personalInfo.github ? (personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`) : undefined
              )}
            </div>
          </div>
        );

      case 'gradient-split-contact':
        // Dark blue gradient banner with content left and contact icons right - HR Professional style
        // Using dark blue colors like the reference image
        const gscGradient = `linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)`;

        const renderGscContactItem = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string,
          href?: string
        ) => {
          if (!editable && !value) return null;

          // Light teal icons - looks good on dark blue
          const iconStyle = {
            width: '16px',
            height: '16px',
            color: '#5eead4',
            flexShrink: 0,
          };

          // White text for contact info
          const textStyle: React.CSSProperties = {
            fontSize: scaleFontSize(typography.contact.fontSize || '12px'),
            color: '#ffffff',
            fontFamily: baseFontFamily,
          };

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
              <span style={textStyle}>
                {editable ? (
                  <InlineEditableText
                    path={path}
                    value={value || 'Click to edit'}
                    style={textStyle}
                  />
                ) : href ? (
                  <a href={href} style={{ ...textStyle, textDecoration: 'none', color: '#ffffff' }}>
                    {value}
                  </a>
                ) : (
                  value
                )}
              </span>
              <Icon style={iconStyle} />
            </div>
          );
        };

        return (
          <div
            data-header="gradient-split-contact"
            style={{
              fontFamily: baseFontFamily,
              position: 'relative',
              marginLeft: '-28px',
              marginRight: '-28px',
              marginTop: '-24px',
            }}
          >
            {/* Dark blue gradient banner - full width */}
            <div style={{
              background: gscGradient,
              padding: '32px 40px 40px 40px',
              display: 'flex',
              gap: '32px',
              alignItems: 'flex-start',
              position: 'relative',
            }}>
              {/* Left side - Name, Title, Summary */}
              <div style={{ flex: 1, minWidth: 0, maxWidth: '65%' }}>
                {/* Name */}
                <h1 style={{
                  fontSize: scaleFontSize(typography.name.fontSize || '36px'),
                  fontWeight: typography.name.fontWeight || 700,
                  lineHeight: typography.name.lineHeight || 1.2,
                  letterSpacing: typography.name.letterSpacing || '-0.01em',
                  color: '#ffffff',
                  margin: 0,
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{
                        fontSize: scaleFontSize(typography.name.fontSize || '36px'),
                        fontWeight: typography.name.fontWeight || 700,
                        color: '#ffffff',
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.fullName || 'Your Name'
                  )}
                </h1>

                {/* Title - light teal, matches icons */}
                {(editable || personalInfo.title) && (
                  <p style={{
                    fontSize: scaleFontSize(typography.title.fontSize || '16px'),
                    fontWeight: typography.title.fontWeight || 500,
                    lineHeight: typography.title.lineHeight || 1.4,
                    color: '#5eead4',
                    margin: '6px 0 0 0',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={{
                          fontSize: scaleFontSize(typography.title.fontSize || '16px'),
                          fontWeight: typography.title.fontWeight || 500,
                          color: '#5eead4',
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </p>
                )}

                {/* Summary */}
                {(editable || personalInfo.summary) && (
                  <div style={{
                    marginTop: '16px',
                    fontSize: scaleFontSize(typography.body.fontSize || '13px'),
                    fontWeight: typography.body.fontWeight || 400,
                    lineHeight: typography.body.lineHeight || 1.7,
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: baseFontFamily,
                    textAlign: 'justify',
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.summary"
                        value={personalInfo.summary || 'Write your professional summary here...'}
                        style={{
                          fontSize: scaleFontSize(typography.body.fontSize || '13px'),
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontFamily: baseFontFamily,
                          lineHeight: typography.body.lineHeight || 1.7,
                        }}
                        multiline
                      />
                    ) : (
                      <p style={{ margin: 0 }}>{personalInfo.summary}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Right side - Contact info stacked */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-end',
                minWidth: '200px',
              }}>
                {renderGscContactItem(Mail, personalInfo.email, 'personalInfo.email', personalInfo.email ? `mailto:${personalInfo.email}` : undefined)}
                {renderGscContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
                {renderGscContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
                {includeSocialLinks && renderGscContactItem(
                  Linkedin,
                  personalInfo.linkedin,
                  'personalInfo.linkedin',
                  personalInfo.linkedin ? (personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`) : undefined
                )}
              </div>
            </div>

          </div>
        );

      case 'photo-dark-contact-bar':
        // CIO Executive style - Photo left, name/title/summary right, dark curved contact bar at bottom
        // Pixel-perfect match to reference design
        const pdcbPhotoSize = header.photoSize || '120px';

        const renderPdcbContactItem = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string,
          href?: string
        ) => {
          if (!editable && !value) return null;

          const iconStyle = {
            width: '16px',
            height: '16px',
            color: '#ffffff',
            flexShrink: 0,
          };

          const textStyle: React.CSSProperties = {
            fontSize: scaleFontSize('11px'),
            color: '#ffffff',
            fontFamily: baseFontFamily,
          };

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon style={iconStyle} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={textStyle}
                />
              ) : href ? (
                <a href={href} style={{ ...textStyle, textDecoration: 'none' }}>
                  {value}
                </a>
              ) : (
                <span style={textStyle}>{value}</span>
              )}
            </div>
          );
        };

        // Custom photo rendering with black border
        const pdcbPhoto = showPhoto ? (
          personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName || 'Profile'}
              style={{
                width: pdcbPhotoSize,
                height: pdcbPhotoSize,
                objectFit: 'cover',
                borderRadius: '6px',
                border: '2px solid #1f2937',
              }}
            />
          ) : (
            <div
              style={{
                width: pdcbPhotoSize,
                height: pdcbPhotoSize,
                borderRadius: '6px',
                border: '2px solid #1f2937',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 600,
                color: '#374151',
              }}
            >
              {getInitials(personalInfo.fullName || '')}
            </div>
          )
        ) : null;

        return (
          <div
            data-header="photo-dark-contact-bar"
            style={{
              fontFamily: baseFontFamily,
            }}
          >
            {/* Main header area - Light gray background, Photo left, content right */}
            <div style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              padding: '32px 28px 28px 28px',
              backgroundColor: '#f8fafc',
            }}>
              {/* Photo with black border */}
              {pdcbPhoto && (
                <div style={{ flexShrink: 0 }}>
                  {pdcbPhoto}
                </div>
              )}

              {/* Name, Title, Summary */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name - Dark color */}
                <h1 style={{
                  fontSize: scaleFontSize('32px'),
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  color: '#1f2937',
                  margin: 0,
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{
                        fontSize: scaleFontSize('32px'),
                        fontWeight: 600,
                        color: '#1f2937',
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.fullName || 'Your Name'
                  )}
                </h1>

                {/* Title - Gray color */}
                {(editable || personalInfo.title) && (
                  <p style={{
                    fontSize: scaleFontSize('14px'),
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: '#6b7280',
                    margin: '4px 0 0 0',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title || 'Professional Title'}
                        style={{
                          fontSize: scaleFontSize('14px'),
                          fontWeight: 400,
                          color: '#6b7280',
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </p>
                )}

                {/* Summary */}
                {(editable || personalInfo.summary) && (
                  <div style={{
                    marginTop: '12px',
                    fontSize: scaleFontSize('11px'),
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: '#4b5563',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.summary"
                        value={personalInfo.summary || 'Write your professional summary here...'}
                        style={{
                          fontSize: scaleFontSize('11px'),
                          color: '#4b5563',
                          fontFamily: baseFontFamily,
                          lineHeight: 1.5,
                        }}
                        multiline
                      />
                    ) : (
                      <p style={{ margin: 0 }}>{personalInfo.summary}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Dark contact bar */}
            <div style={{
              backgroundColor: '#1f2937',
              padding: '14px 28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px 40px',
            }}>
              {renderPdcbContactItem(Mail, personalInfo.email, 'personalInfo.email', personalInfo.email ? `mailto:${personalInfo.email}` : undefined)}
              {renderPdcbContactItem(Phone, personalInfo.phone, 'personalInfo.phone')}
              {renderPdcbContactItem(MapPin, personalInfo.location, 'personalInfo.location')}
              {includeSocialLinks && renderPdcbContactItem(
                Linkedin,
                personalInfo.linkedin,
                'personalInfo.linkedin',
                personalInfo.linkedin ? (personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`) : undefined
              )}
            </div>
          </div>
        );

      case 'wave-accent':
        // Elegant minimal header inspired by professional creative resumes
        // Large photo on left, name/title right, contact bar at bottom
        const wavePhotoPos = header.photoPosition || 'right';
        const darkerPrimary = adjustColor(colors.primary, -40);
        const lighterPrimary = adjustColor(colors.primary, 40);

        // Create a soft tinted background color from primary
        const softBgColor = `${colors.primary}08`;

        return (
          <div className="relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
            {/* Soft tinted background area - top section only */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '85%',
                backgroundColor: softBgColor,
              }}
            />

            {/* Main content */}
            <div className="relative" style={{ padding: '40px 32px 0 32px' }}>
              <div className="flex items-start gap-8">
                {/* Large circular photo */}
                {showPhoto && (
                  <div className="relative flex-shrink-0">
                    <div
                      className="rounded-full overflow-hidden"
                      style={{
                        width: '140px',
                        height: '140px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      }}
                    >
                      {editable ? (
                        <InlineEditablePhoto
                          value={personalInfo.photo}
                          path="personalInfo.photo"
                          photoShape="circle"
                          showInitials={!personalInfo.photo}
                          initials={personalInfo.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        />
                      ) : personalInfo.photo ? (
                        <img
                          src={personalInfo.photo}
                          alt={personalInfo.fullName}
                          className="w-full h-full object-cover"
                          style={{ filter: 'grayscale(100%)' }}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white font-bold"
                          style={{
                            backgroundColor: colors.primary,
                            fontSize: '48px',
                          }}
                        >
                          {personalInfo.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Name and Title - right side */}
                <div className="flex-1 pt-4">
                  {/* Name - large, elegant typography */}
                  <h1
                    style={{
                      fontSize: scaleFontSize('38px'),
                      fontWeight: 300,
                      lineHeight: 1.1,
                      letterSpacing: '0.08em',
                      color: '#1a1a1a',
                      fontFamily: baseFontFamily,
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {editable ? (
                      <InlineEditableText
                        value={personalInfo.fullName}
                        path="personalInfo.fullName"
                        style={{ color: '#1a1a1a' }}
                      />
                    ) : (
                      personalInfo.fullName
                    )}
                  </h1>

                  {/* Title - subtle, refined */}
                  <div
                    style={{
                      fontSize: scaleFontSize('14px'),
                      fontWeight: 400,
                      letterSpacing: '0.15em',
                      color: '#666666',
                      fontFamily: baseFontFamily,
                      textTransform: 'uppercase',
                    }}
                  >
                    {editable ? (
                      <InlineEditableText
                        value={personalInfo.title}
                        path="personalInfo.title"
                        style={{ color: '#666666' }}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact info bar - full width at bottom */}
            <div
              className="relative mt-6"
              style={{
                backgroundColor: colors.primary,
                padding: '12px 32px',
              }}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: baseFontFamily, letterSpacing: '0.05em' }}>
                      m. :
                    </span>
                    <span style={{ fontSize: '11px', color: '#ffffff', fontFamily: baseFontFamily }}>
                      {personalInfo.phone}
                    </span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: baseFontFamily, letterSpacing: '0.05em' }}>
                      e. :
                    </span>
                    <span style={{ fontSize: '11px', color: '#ffffff', fontFamily: baseFontFamily }}>
                      {personalInfo.email}
                    </span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: baseFontFamily, letterSpacing: '0.05em' }}>
                      w. :
                    </span>
                    <span style={{ fontSize: '11px', color: '#ffffff', fontFamily: baseFontFamily }}>
                      {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: baseFontFamily, letterSpacing: '0.05em' }}>
                      a. :
                    </span>
                    <span style={{ fontSize: '11px', color: '#ffffff', fontFamily: baseFontFamily }}>
                      {personalInfo.location}
                    </span>
                  </div>
                )}
                {includeSocialLinks && personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: baseFontFamily, letterSpacing: '0.05em' }}>
                      in :
                    </span>
                    <span style={{ fontSize: '11px', color: '#ffffff', fontFamily: baseFontFamily }}>
                      {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'elegant-photo-card':
        // Elegant header with photo in rounded card, centered layout
        // Features: Photo with shadow, name below, contact in pills
        const elegantPhotoCardIconStyle = {
          width: '12px',
          height: '12px',
          color: accent,
          flexShrink: 0,
        };

        const renderElegantPhotoCardContact = (
          Icon: React.ElementType,
          value: string | undefined,
          path: string
        ) => {
          if (!editable && !value) return null;

          return (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: `${accent}08`,
              borderRadius: '20px',
            }}>
              <Icon style={elegantPhotoCardIconStyle} />
              {editable ? (
                <InlineEditableText
                  path={path}
                  value={value || 'Click to edit'}
                  style={{
                    fontSize: scaleFontSize('10px'),
                    color: typography.contact.color || '#4b5563',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                <span style={{
                  fontSize: scaleFontSize('10px'),
                  color: typography.contact.color || '#4b5563',
                  fontFamily: baseFontFamily,
                }}>{value}</span>
              )}
            </div>
          );
        };

        return (
          <div
            data-header="elegant-photo-card"
            style={{
              fontFamily: baseFontFamily,
              marginBottom: header.marginBottom || '24px',
              textAlign: 'center',
            }}
          >
            {/* Photo with elegant shadow */}
            {(showPhoto || editable) && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: header.photoSize || '100px',
                  height: header.photoSize || '100px',
                  borderRadius: header.photoShape === 'square' ? '8px' : '50%',
                  overflow: 'hidden',
                  boxShadow: `0 8px 24px ${accent}25`,
                  border: `3px solid ${accent}20`,
                }}>
                  {editable ? (
                    <InlineEditablePhoto
                      path="personalInfo.photo"
                      value={personalInfo.photo}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : personalInfo.photo ? (
                    <img
                      src={personalInfo.photo}
                      alt={personalInfo.fullName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      color: accent,
                      fontWeight: 600,
                    }}>
                      {personalInfo.fullName?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Name */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize),
              fontWeight: typography.name.fontWeight || 700,
              lineHeight: typography.name.lineHeight,
              letterSpacing: typography.name.letterSpacing || '-0.02em',
              color: typography.name.color || '#1f2937',
              margin: 0,
              fontFamily: baseFontFamily,
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: typography.name.fontWeight || 700,
                    color: typography.name.color || '#1f2937',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.fullName || 'Your Name'
              )}
            </h1>

            {/* Title with accent color */}
            <p style={{
              fontSize: scaleFontSize(typography.title.fontSize),
              fontWeight: typography.title.fontWeight || 500,
              lineHeight: typography.title.lineHeight,
              color: accent,
              margin: '6px 0 0 0',
              fontFamily: baseFontFamily,
              letterSpacing: '0.02em',
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={personalInfo.title || 'Professional Title'}
                  style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: typography.title.fontWeight || 500,
                    color: accent,
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.title
              )}
            </p>

            {/* Contact pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '14px',
            }}>
              {renderElegantPhotoCardContact(Mail, personalInfo.email, 'personalInfo.email')}
              {renderElegantPhotoCardContact(Phone, personalInfo.phone, 'personalInfo.phone')}
              {renderElegantPhotoCardContact(MapPin, personalInfo.location, 'personalInfo.location')}
              {renderElegantPhotoCardContact(Linkedin, personalInfo.linkedin, 'personalInfo.linkedin')}
              {personalInfo.website && renderElegantPhotoCardContact(Globe, personalInfo.website, 'personalInfo.website')}
            </div>
          </div>
        );

      case 'modern-minimal':
        // Ultra-clean minimal header with thin accent line
        // Features: Name with thin underline, contact in single line with dots
        return (
          <div
            data-header="modern-minimal"
            style={{
              fontFamily: baseFontFamily,
              marginBottom: header.marginBottom || '20px',
            }}
          >
            {/* Name with thin accent underline */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize),
              fontWeight: typography.name.fontWeight || 600,
              lineHeight: typography.name.lineHeight,
              letterSpacing: typography.name.letterSpacing || '0',
              color: typography.name.color || '#1f2937',
              margin: 0,
              fontFamily: baseFontFamily,
              paddingBottom: '8px',
              borderBottom: `1px solid ${accent}`,
              display: 'inline-block',
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: typography.name.fontWeight || 600,
                    color: typography.name.color || '#1f2937',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.fullName || 'Your Name'
              )}
            </h1>

            {/* Title */}
            <p style={{
              fontSize: scaleFontSize(typography.title.fontSize),
              fontWeight: typography.title.fontWeight || 400,
              lineHeight: typography.title.lineHeight,
              color: typography.title.color || '#6b7280',
              margin: '8px 0 0 0',
              fontFamily: baseFontFamily,
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={personalInfo.title || 'Professional Title'}
                  style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: typography.title.fontWeight || 400,
                    color: typography.title.color || '#6b7280',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.title
              )}
            </p>

            {/* Contact in single line with dot separators */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '6px',
              marginTop: '10px',
              fontSize: scaleFontSize(typography.contact.fontSize),
              color: typography.contact.color || '#6b7280',
            }}>
              {personalInfo.email && (
                <>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={personalInfo.email}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#6b7280' }}
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                </>
              )}
              {personalInfo.phone && (
                <>
                  <span style={{ color: accent }}>•</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={personalInfo.phone}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#6b7280' }}
                    />
                  ) : (
                    <span>{personalInfo.phone}</span>
                  )}
                </>
              )}
              {personalInfo.location && (
                <>
                  <span style={{ color: accent }}>•</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={personalInfo.location}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#6b7280' }}
                    />
                  ) : (
                    <span>{personalInfo.location}</span>
                  )}
                </>
              )}
              {personalInfo.linkedin && (
                <>
                  <span style={{ color: accent }}>•</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.linkedin"
                      value={personalInfo.linkedin}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#6b7280' }}
                    />
                  ) : (
                    <span>{personalInfo.linkedin}</span>
                  )}
                </>
              )}
              {personalInfo.website && (
                <>
                  <span style={{ color: accent }}>•</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.website"
                      value={personalInfo.website}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#6b7280' }}
                    />
                  ) : (
                    <span>{personalInfo.website}</span>
                  )}
                </>
              )}
            </div>
          </div>
        );

      // ========================================================================
      // REFINED SERIF - Elegant centered typography with thin line separators
      // ========================================================================
      case 'refined-serif':
        return (
          <div
            data-header="refined-serif"
            style={{
              fontFamily: baseFontFamily,
              marginBottom: header.marginBottom || '24px',
              textAlign: 'center',
              padding: header.padding || '0',
            }}
          >
            {/* Name centered */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize),
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              color: typography.name.color || '#1a1a1a',
              margin: 0,
              fontFamily: baseFontFamily,
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    color: typography.name.color || '#1a1a1a',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.fullName
              )}
            </h1>

            {/* Thin decorative line */}
            <div style={{
              width: '60px',
              height: '1px',
              backgroundColor: accent,
              margin: '12px auto',
            }} />

            {/* Title in uppercase style */}
            {personalInfo.title && (
              <p style={{
                fontSize: scaleFontSize(typography.title.fontSize),
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: typography.title.color || '#666666',
                margin: 0,
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title}
                    style={{
                      fontSize: scaleFontSize(typography.title.fontSize),
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: typography.title.color || '#666666',
                      fontFamily: baseFontFamily,
                    }}
                  />
                ) : (
                  personalInfo.title
                )}
              </p>
            )}

            {/* Another thin line */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#e5e5e5',
              margin: '16px 0',
            }} />

            {/* Contact in single line with vertical bars */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              fontSize: scaleFontSize(typography.contact.fontSize),
              color: typography.contact.color || '#666666',
              fontFamily: baseFontFamily,
            }}>
              {personalInfo.email && (
                <>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={personalInfo.email}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                </>
              )}
              {personalInfo.phone && (
                <>
                  <span style={{ color: '#d4d4d4' }}>|</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={personalInfo.phone}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.phone}</span>
                  )}
                </>
              )}
              {personalInfo.location && (
                <>
                  <span style={{ color: '#d4d4d4' }}>|</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={personalInfo.location}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.location}</span>
                  )}
                </>
              )}
              {personalInfo.linkedin && (
                <>
                  <span style={{ color: '#d4d4d4' }}>|</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.linkedin"
                      value={personalInfo.linkedin}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.linkedin}</span>
                  )}
                </>
              )}
              {personalInfo.website && (
                <>
                  <span style={{ color: '#d4d4d4' }}>|</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.website"
                      value={personalInfo.website}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.website}</span>
                  )}
                </>
              )}
            </div>
          </div>
        );

      // ========================================================================
      // SWISS MINIMAL - Swiss design with bold typography and geometric accents
      // ========================================================================
      case 'swiss-minimal':
        return (
          <div
            data-header="swiss-minimal"
            style={{
              fontFamily: baseFontFamily,
              marginBottom: header.marginBottom || '24px',
              padding: header.padding || '0',
            }}
          >
            {/* Name - bold and left-aligned */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize),
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: typography.name.color || '#000000',
              margin: 0,
              fontFamily: baseFontFamily,
              textTransform: 'uppercase',
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: typography.name.color || '#000000',
                    fontFamily: baseFontFamily,
                    textTransform: 'uppercase',
                  }}
                />
              ) : (
                personalInfo.fullName
              )}
            </h1>

            {/* Accent bar */}
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: accent,
              marginTop: '10px',
              marginBottom: '10px',
            }} />

            {/* Title */}
            {personalInfo.title && (
              <p style={{
                fontSize: scaleFontSize(typography.title.fontSize),
                fontWeight: 500,
                letterSpacing: '0',
                color: typography.title.color || '#333333',
                margin: 0,
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title}
                    style={{
                      fontSize: scaleFontSize(typography.title.fontSize),
                      fontWeight: 500,
                      color: typography.title.color || '#333333',
                      fontFamily: baseFontFamily,
                    }}
                  />
                ) : (
                  personalInfo.title
                )}
              </p>
            )}

            {/* Contact grid - 2 columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, auto)',
              justifyContent: 'start',
              gap: '4px 24px',
              marginTop: '14px',
              fontSize: scaleFontSize(typography.contact.fontSize),
              color: typography.contact.color || '#666666',
            }}>
              {personalInfo.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: accent, display: 'inline-block' }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={personalInfo.email}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666' }}
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                </div>
              )}
              {personalInfo.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: accent, display: 'inline-block' }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={personalInfo.phone}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666' }}
                    />
                  ) : (
                    <span>{personalInfo.phone}</span>
                  )}
                </div>
              )}
              {personalInfo.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: accent, display: 'inline-block' }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={personalInfo.location}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666' }}
                    />
                  ) : (
                    <span>{personalInfo.location}</span>
                  )}
                </div>
              )}
              {personalInfo.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: accent, display: 'inline-block' }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.linkedin"
                      value={personalInfo.linkedin}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666' }}
                    />
                  ) : (
                    <span>{personalInfo.linkedin}</span>
                  )}
                </div>
              )}
              {personalInfo.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: accent, display: 'inline-block' }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.website"
                      value={personalInfo.website}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#666666' }}
                    />
                  ) : (
                    <span>{personalInfo.website}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      // ========================================================================
      // MONO ELEGANT - Elegant typography with wide letter spacing
      // ========================================================================
      case 'mono-elegant':
        return (
          <div
            data-header="mono-elegant"
            style={{
              fontFamily: baseFontFamily,
              marginBottom: header.marginBottom || '28px',
              padding: header.padding || '0',
            }}
          >
            {/* Name with letter spacing */}
            <h1 style={{
              fontSize: scaleFontSize(typography.name.fontSize),
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: typography.name.color || '#18181b',
              margin: 0,
              fontFamily: baseFontFamily,
            }}>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={personalInfo.fullName || 'Your Name'}
                  style={{
                    fontSize: scaleFontSize(typography.name.fontSize),
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: typography.name.color || '#18181b',
                    fontFamily: baseFontFamily,
                  }}
                />
              ) : (
                personalInfo.fullName
              )}
            </h1>

            {/* Title with accent color */}
            {personalInfo.title && (
              <p style={{
                fontSize: scaleFontSize(typography.title.fontSize),
                fontWeight: 400,
                letterSpacing: '0.03em',
                color: accent,
                margin: '8px 0 0 0',
                fontFamily: baseFontFamily,
              }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={personalInfo.title}
                    style={{
                      fontSize: scaleFontSize(typography.title.fontSize),
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      color: accent,
                      fontFamily: baseFontFamily,
                    }}
                  />
                ) : (
                  personalInfo.title
                )}
              </p>
            )}

            {/* Dotted separator */}
            <div style={{
              marginTop: '16px',
              marginBottom: '14px',
              borderBottom: `1px dashed ${accent}40`,
            }} />

            {/* Contact with slashes */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              fontSize: scaleFontSize(typography.contact.fontSize),
              color: typography.contact.color || '#52525b',
              fontFamily: baseFontFamily,
            }}>
              {personalInfo.email && (
                <>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={personalInfo.email}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#52525b', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                </>
              )}
              {personalInfo.phone && (
                <>
                  <span style={{ color: accent, opacity: 0.5 }}>/</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={personalInfo.phone}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#52525b', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.phone}</span>
                  )}
                </>
              )}
              {personalInfo.location && (
                <>
                  <span style={{ color: accent, opacity: 0.5 }}>/</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={personalInfo.location}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#52525b', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.location}</span>
                  )}
                </>
              )}
              {personalInfo.linkedin && (
                <>
                  <span style={{ color: accent, opacity: 0.5 }}>/</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.linkedin"
                      value={personalInfo.linkedin}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#52525b', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.linkedin}</span>
                  )}
                </>
              )}
              {personalInfo.website && (
                <>
                  <span style={{ color: accent, opacity: 0.5 }}>/</span>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.website"
                      value={personalInfo.website}
                      style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#52525b', fontFamily: baseFontFamily }}
                    />
                  ) : (
                    <span>{personalInfo.website}</span>
                  )}
                </>
              )}
            </div>
          </div>
        );

      // ========================================================================
      // LINE ACCENT - Clean design with full-width accent lines
      // ========================================================================
      case 'line-accent':
        return (
          <div
            data-header="line-accent"
            style={{
              fontFamily: baseFontFamily,
              marginBottom: header.marginBottom || '24px',
              padding: header.padding || '0',
            }}
          >
            {/* Top accent line */}
            <div style={{
              height: '2px',
              backgroundColor: accent,
              marginBottom: '20px',
            }} />

            {/* Two-column layout: Name/Title left, Contact right */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '40px',
            }}>
              {/* Left column - Name and Title */}
              <div style={{ flex: '1' }}>
                <h1 style={{
                  fontSize: scaleFontSize(typography.name.fontSize),
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: typography.name.color || '#0f172a',
                  margin: 0,
                  fontFamily: baseFontFamily,
                }}>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.fullName"
                      value={personalInfo.fullName || 'Your Name'}
                      style={{
                        fontSize: scaleFontSize(typography.name.fontSize),
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        color: typography.name.color || '#0f172a',
                        fontFamily: baseFontFamily,
                      }}
                    />
                  ) : (
                    personalInfo.fullName
                  )}
                </h1>

                {personalInfo.title && (
                  <p style={{
                    fontSize: scaleFontSize(typography.title.fontSize),
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    color: accent,
                    margin: '6px 0 0 0',
                    fontFamily: baseFontFamily,
                  }}>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={personalInfo.title}
                        style={{
                          fontSize: scaleFontSize(typography.title.fontSize),
                          fontWeight: 400,
                          letterSpacing: '0.02em',
                          color: accent,
                          fontFamily: baseFontFamily,
                        }}
                      />
                    ) : (
                      personalInfo.title
                    )}
                  </p>
                )}
              </div>

              {/* Right column - Contact stacked */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '3px',
                fontSize: scaleFontSize(typography.contact.fontSize),
                color: typography.contact.color || '#64748b',
              }}>
                {personalInfo.email && (
                  <div>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={personalInfo.email}
                        style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#64748b' }}
                      />
                    ) : (
                      <span>{personalInfo.email}</span>
                    )}
                  </div>
                )}
                {personalInfo.phone && (
                  <div>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={personalInfo.phone}
                        style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#64748b' }}
                      />
                    ) : (
                      <span>{personalInfo.phone}</span>
                    )}
                  </div>
                )}
                {personalInfo.location && (
                  <div>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={personalInfo.location}
                        style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#64748b' }}
                      />
                    ) : (
                      <span>{personalInfo.location}</span>
                    )}
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.linkedin"
                        value={personalInfo.linkedin}
                        style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#64748b' }}
                      />
                    ) : (
                      <span>{personalInfo.linkedin}</span>
                    )}
                  </div>
                )}
                {personalInfo.website && (
                  <div>
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.website"
                        value={personalInfo.website}
                        style={{ fontSize: scaleFontSize(typography.contact.fontSize), color: typography.contact.color || '#64748b' }}
                      />
                    ) : (
                      <span>{personalInfo.website}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom thin line */}
            <div style={{
              height: '1px',
              backgroundColor: '#e2e8f0',
              marginTop: '18px',
            }} />
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
  const isBannerHeader = ['banner', 'gradient-banner', 'elegant-banner', 'banner-with-summary', 'wave-accent'].includes(variant);
  const defaultMargin = isBannerHeader ? '0' : '12px';
  const headerMarginBottom = header.marginBottom ?? defaultMargin;

  return (
    <header style={{ marginBottom: headerMarginBottom }}>
      {renderVariant()}
    </header>
  );
};

export default HeaderSection;
