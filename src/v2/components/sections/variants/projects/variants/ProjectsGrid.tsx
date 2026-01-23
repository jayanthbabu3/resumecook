/**
 * Projects Grid Variant
 *
 * Renders projects in a responsive grid layout (2-3 columns).
 * Perfect for showcasing multiple projects side by side in a compact format.
 *
 * Features:
 * - 2-3 column responsive grid
 * - Compact card design
 * - Tech stack tags
 * - Optional project links
 */

import React from 'react';
import { Plus, X, ExternalLink, Github } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { ProjectsVariantProps } from '../types';

interface ProjectsGridProps extends ProjectsVariantProps {
  /** Number of columns */
  columns?: 2 | 3;
  /** Show project numbers/badges */
  showNumbers?: boolean;
  /** Card style */
  cardStyle?: 'bordered' | 'elevated' | 'minimal';
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  columns = 2,
  showNumbers = false,
  cardStyle = 'bordered',
}) => {
  const { typography, colors, spacing } = config;
  const { addArrayItem, removeArrayItem } = useInlineEdit();
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);
  const accent = accentColor || colors.primary;

  const handleAddProject = () => {
    addArrayItem('projects', {
      id: `project-${Date.now()}`,
      name: 'New Project',
      description: 'Project description',
      technologies: ['React', 'TypeScript'],
      highlights: [],
    });
  };

  const handleRemoveProject = (projectId: string) => {
    const index = items.findIndex((project) => project.id === projectId);
    if (index >= 0) {
      removeArrayItem('projects', index);
    }
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '16px',
  };

  const getCardStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: '16px',
      borderRadius: '8px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    };

    switch (cardStyle) {
      case 'elevated':
        return {
          ...base,
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: `1px solid ${colors.border}`,
        };
      case 'minimal':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderLeft: `3px solid ${accent}`,
          borderRadius: 0,
          paddingLeft: '16px',
        };
      case 'bordered':
      default:
        return {
          ...base,
          backgroundColor: `${accent}05`,
          border: `1px solid ${colors.border}`,
        };
    }
  };

  const projectTitleStyle: React.CSSProperties = {
    fontSize: typography.itemTitle.fontSize,
    fontWeight: typography.itemTitle.fontWeight,
    color: typography.itemTitle.color,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const numberBadgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: accent,
    color: '#ffffff',
    fontSize: scaleFontSize(typography.dates.fontSize),
    fontWeight: 700,
    flexShrink: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
    marginBottom: '12px',
    flex: 1,
  };

  const techContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: 'auto',
  };

  const techTagStyle: React.CSSProperties = {
    fontSize: scaleFontSize(typography.dates.fontSize),
    fontWeight: 500,
    padding: '3px 8px',
    borderRadius: '4px',
    backgroundColor: `${accent}15`,
    color: accent,
    whiteSpace: 'nowrap',
  };

  const linkStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: scaleFontSize(typography.dates.fontSize),
    color: accent,
    textDecoration: 'none',
    marginTop: '8px',
  };

  if (!items.length && !editable) return null;

  return (
    <div>
      <div style={gridStyle}>
        {items.map((project, index) => (
          <div key={project.id} style={getCardStyle()} className="group relative">
            {/* Remove button */}
            {editable && (
              <button
                onClick={() => handleRemoveProject(project.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded z-10"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            )}

            {/* Project Title */}
            <div style={projectTitleStyle}>
              {showNumbers && (
                <span style={numberBadgeStyle}>{index + 1}</span>
              )}
              {editable ? (
                <InlineEditableText
                  path={`projects.${index}.name`}
                  value={project.name}
                  style={{ fontWeight: typography.itemTitle.fontWeight, color: typography.itemTitle.color }}
                  placeholder="Project Name"
                />
              ) : (
                <span>{project.name}</span>
              )}
            </div>

            {/* Description */}
            <div style={descriptionStyle}>
              {editable ? (
                <InlineEditableText
                  path={`projects.${index}.description`}
                  value={project.description || ''}
                  style={{ ...descriptionStyle, margin: 0 }}
                  placeholder="Brief description..."
                  multiline
                />
              ) : (
                <span>{project.description}</span>
              )}
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div style={techContainerStyle}>
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} style={techTagStyle}>
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Project Link */}
            {project.url && !editable && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                {project.url.includes('github') ? (
                  <>
                    <Github className="w-3 h-3" />
                    View Code
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3 h-3" />
                    View Project
                  </>
                )}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Add Project Button */}
      {editable && (
        <button
          onClick={handleAddProject}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accent, borderColor: accent }}
        >
          <Plus className="h-3 w-3" />
          Add Project
        </button>
      )}
    </div>
  );
};

export default ProjectsGrid;
