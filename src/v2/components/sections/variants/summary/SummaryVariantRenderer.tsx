/**
 * Summary Variant Renderer
 * 
 * Renders summary section with different visual variants.
 * All variants are config-driven based on variant ID.
 */

import React from 'react';
import type { TemplateConfig } from '../../../../types/templateConfig';
import { SectionHeading } from '../../SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';

interface SummaryVariantRendererProps {
  variant: string;
  summary: string;
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
}

export const SummaryVariantRenderer: React.FC<SummaryVariantRendererProps> = ({
  variant,
  summary,
  config,
  editable = false,
  sectionTitle = 'Summary',
}) => {
  const { typography, colors, spacing } = config;
  const accent = colors.primary;

  if (!summary && !editable) return null;

  // Render based on variant ID
  // Use sectionTitle from config (which comes from variant's previewData.title)
  switch (variant) {
    case 'executive-summary':
      return <ExecutiveSummary variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'professional-profile':
      return <ProfessionalProfile variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'career-objective':
      return <CareerObjective variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'professional-summary':
      return <ProfessionalSummary variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'highlighted-summary':
      return <HighlightedSummary variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'two-column-summary':
      return <TwoColumnSummary variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'minimal-summary':
      return <MinimalSummary variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'achievement-focused':
      return <AchievementFocused variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'expertise-summary':
      return <ExpertiseSummary variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'about-me':
      return <AboutMe variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
    
    case 'standard':
    default:
      return <StandardSummary variant={variant} summary={summary} config={config} editable={editable} sectionTitle={sectionTitle} />;
  }
};

// Standard Summary - Simple paragraph
const StandardSummary: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// Executive Summary - Bold, centered heading
const ExecutiveSummary: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
    textAlign: 'center',
  };

  // Use sectionHeading if available, otherwise fallback to heading or body
  const headingTypography = typography.sectionHeading || (typography as any).heading || typography.body;
  
  const headingStyle: React.CSSProperties = {
    fontSize: headingTypography.fontSize,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textAlign: 'center',
    borderBottom: `2px solid ${colors.primary}30`,
    paddingBottom: spacing.headingToContent,
    marginBottom: spacing.headingToContent,
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <div style={headingStyle}>
        {sectionTitle?.toUpperCase() || 'EXECUTIVE SUMMARY'}
      </div>
      <div>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// Professional Profile - Left-aligned with bullets
const ProfessionalProfile: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const lines = summary ? summary.split('\n').filter(l => l.trim()) : [];
  const displaySummary = summary || 'Write key strengths (one per line)...';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <div>
            {lines.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {lines.map((line, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: colors.primary, marginRight: '0.5rem', marginTop: '0.2rem' }}>•</span>
                    <InlineEditableText
                      path="personalInfo.summary"
                      value={line}
                      as="span"
                      style={{ fontSize: typography.body.fontSize, color: typography.body.color, flex: 1 }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <InlineEditableText
                path="personalInfo.summary"
                value={displaySummary}
                as="p"
                style={{ fontSize: typography.body.fontSize, lineHeight: typography.body.lineHeight }}
                multiline
              />
            )}
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {lines.length > 0 ? lines.map((line, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: colors.primary, marginRight: '0.5rem', marginTop: '0.2rem' }}>•</span>
                <span style={{ fontSize: typography.body.fontSize, color: typography.body.color }}>{line}</span>
              </li>
            )) : (
              <li style={{ fontSize: typography.body.fontSize, color: typography.body.color, opacity: 0.5 }}>
                {displaySummary}
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

// Career Objective - Focused statement
const CareerObjective: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
    fontStyle: 'italic',
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write your career objective...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// Professional Summary - Classic format
const ProfessionalSummary: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ marginTop: spacing.headingToContent, borderBottom: `2px solid ${colors.primary}30`, paddingBottom: spacing.headingToContent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// Highlighted Summary - With border and accent
const HighlightedSummary: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ 
        marginTop: spacing.headingToContent,
        borderLeft: `4px solid ${colors.primary}`,
        paddingLeft: spacing.sectionGap,
        background: `linear-gradient(to right, ${colors.primary}10, transparent)`,
        borderRadius: '0 4px 4px 0',
        padding: spacing.headingToContent,
      }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// Two Column Summary - Stats and description (simplified for now)
const TwoColumnSummary: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// Minimal Summary - Clean, simple
const MinimalSummary: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: 300,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  // Use sectionHeading if available, otherwise fallback to heading or body
  const headingTypography = typography.sectionHeading || (typography as any).heading || typography.body;
  
  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <div style={{ 
        fontSize: headingTypography.fontSize,
        fontWeight: 300,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: spacing.headingToContent,
      }}>
        {sectionTitle}
      </div>
      <div style={{ marginTop: spacing.headingToContent * 1.5 }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// Achievement Focused - With arrows
const AchievementFocused: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const lines = summary ? summary.split('\n').filter(l => l.trim()) : [];
  const displaySummary = summary || 'Write achievements (one per line)...';

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <div>
            {lines.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {lines.map((line, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: colors.primary, marginRight: '0.5rem', fontSize: '1.2em' }}>↗</span>
                    <InlineEditableText
                      path="personalInfo.summary"
                      value={line}
                      as="span"
                      style={{ fontSize: typography.body.fontSize, color: typography.body.color, flex: 1 }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <InlineEditableText
                path="personalInfo.summary"
                value={displaySummary}
                as="p"
                style={{ fontSize: typography.body.fontSize, lineHeight: typography.body.lineHeight }}
                multiline
              />
            )}
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {lines.length > 0 ? lines.map((line, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: colors.primary, marginRight: '0.5rem', fontSize: '1.2em' }}>↗</span>
                <span style={{ fontSize: typography.body.fontSize, color: typography.body.color }}>{line}</span>
              </li>
            )) : (
              <li style={{ fontSize: typography.body.fontSize, color: typography.body.color, opacity: 0.5 }}>
                {displaySummary}
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

// Expertise Summary - With tags (simplified)
const ExpertiseSummary: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={colors.primary}
      />
      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write a brief professional summary...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

// About Me - Casual style
const AboutMe: React.FC<SummaryVariantRendererProps> = ({ summary, config, editable, sectionTitle }) => {
  const { typography, colors, spacing } = config;
  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    margin: 0,
    fontStyle: 'italic',
  };

  // Use sectionHeading if available, otherwise fallback to heading or body
  const headingTypography = typography.sectionHeading || (typography as any).heading || typography.body;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <div style={{ 
        fontSize: headingTypography.fontSize,
        fontWeight: headingTypography.fontWeight || typography.body.fontWeight,
        fontStyle: 'italic',
        marginBottom: spacing.headingToContent,
      }}>
        {sectionTitle}
      </div>
      <div style={{ marginTop: spacing.headingToContent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.summary"
            value={summary || 'Write about yourself...'}
            as="p"
            style={textStyle}
            multiline
          />
        ) : (
          <p style={textStyle}>{summary}</p>
        )}
      </div>
    </section>
  );
};

export default SummaryVariantRenderer;

