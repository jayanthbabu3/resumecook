/**
 * Summary with Bullet Points Variant
 *
 * Renders professional summary with a paragraph followed by key bullet points.
 * Similar to traditional resumes showing:
 * - Short intro paragraph
 * - Followed by key achievements/competencies as bullet points
 *
 * Perfect for senior professionals who want to highlight key accomplishments
 * immediately after their summary.
 */

import React from 'react';
import { Plus, X } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { TemplateConfig } from '../../../../types/templateConfig';

interface SummaryBulletPointsProps {
  /** Summary text (first paragraph) */
  summary: string;
  /** Additional bullet points (can be newline-separated in summary or separate) */
  bulletPoints?: string[];
  /** Template configuration */
  config: TemplateConfig;
  /** Enable inline editing */
  editable?: boolean;
  /** Accent color override */
  accentColor?: string;
  /** Bullet style */
  bulletStyle?: '•' | '▸' | '✓' | '→' | '■';
  /** Show the intro paragraph or just bullets */
  showIntro?: boolean;
}

export const SummaryBulletPoints: React.FC<SummaryBulletPointsProps> = ({
  summary,
  bulletPoints: externalBullets,
  config,
  editable = false,
  accentColor,
  bulletStyle = '•',
  showIntro = true,
}) => {
  const { typography, colors, spacing } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);
  const accent = accentColor || colors.primary;

  // Parse summary to extract intro paragraph and bullet points
  // Format: First paragraph, then lines starting with bullet or dash become bullets
  const parsedContent = React.useMemo(() => {
    if (!summary) return { intro: '', bullets: [] };

    const lines = summary.split('\n').map(l => l.trim()).filter(Boolean);

    // Find where bullets start (lines starting with -, *, •, or similar)
    const bulletPattern = /^[-•*▸→■✓]\s*/;

    let intro = '';
    const bullets: string[] = [];
    let foundBullet = false;

    lines.forEach(line => {
      if (bulletPattern.test(line)) {
        foundBullet = true;
        bullets.push(line.replace(bulletPattern, ''));
      } else if (!foundBullet) {
        intro = intro ? `${intro} ${line}` : line;
      } else {
        // If we already found bullets, treat subsequent non-bullet lines as bullets too
        bullets.push(line);
      }
    });

    // If external bullets provided, use those
    if (externalBullets && externalBullets.length > 0) {
      return { intro, bullets: externalBullets };
    }

    return { intro, bullets };
  }, [summary, externalBullets]);

  const introStyle: React.CSSProperties = {
    fontSize: scaleFontSize(typography.body.fontSize),
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    marginBottom: parsedContent.bullets.length > 0 ? '12px' : '0',
  };

  const bulletContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.bulletGap || '6px',
  };

  const bulletItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  };

  const bulletMarkerStyle: React.CSSProperties = {
    color: accent,
    fontWeight: 600,
    flexShrink: 0,
    fontSize: bulletStyle === '■' ? scaleFontSize('8px') : scaleFontSize(typography.body.fontSize),
    lineHeight: typography.body.lineHeight,
    marginTop: bulletStyle === '■' ? '6px' : '0',
  };

  const bulletTextStyle: React.CSSProperties = {
    fontSize: scaleFontSize(typography.body.fontSize),
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    flex: 1,
  };

  if (!summary && !editable) return null;

  return (
    <div>
      {/* Intro Paragraph */}
      {showIntro && parsedContent.intro && (
        <div style={introStyle}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={parsedContent.intro}
              as="p"
              style={introStyle}
              multiline
            />
          ) : (
            <p style={{ margin: 0 }}>{parsedContent.intro}</p>
          )}
        </div>
      )}

      {/* Bullet Points */}
      {parsedContent.bullets.length > 0 && (
        <div style={bulletContainerStyle}>
          {parsedContent.bullets.map((bullet, index) => (
            <div key={index} style={bulletItemStyle}>
              <span style={bulletMarkerStyle}>{bulletStyle}</span>
              <span style={bulletTextStyle}>{bullet}</span>
            </div>
          ))}
        </div>
      )}

      {/* Fallback for no bullets - show as regular paragraph */}
      {!parsedContent.intro && !parsedContent.bullets.length && editable && (
        <InlineEditableText
          path="personalInfo.summary"
          value={summary || 'Write your professional summary here...\n- Add key achievement 1\n- Add key achievement 2'}
          as="p"
          style={introStyle}
          multiline
        />
      )}
    </div>
  );
};

export default SummaryBulletPoints;
