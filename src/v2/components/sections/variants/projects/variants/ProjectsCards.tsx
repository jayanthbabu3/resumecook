/**
 * Projects Cards Variant
 *
 * Compact card-based grid layout for portfolio showcase.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink, Github } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { ProjectsVariantProps } from '../types';

export const ProjectsCards: React.FC<ProjectsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddProject,
  onRemoveProject,
  formatDate,
}) => {
  const { typography } = config;
  const inlineEdit = useInlineEdit();
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      {items.map((item, index) => {
        const technologies = item.technologies ?? item.techStack ?? [];
        const techPath = item.technologies ? 'technologies' : 'techStack';

        const handleAddTechnology = () => {
          inlineEdit?.addArrayItem?.(`projects.${index}.${techPath}`, 'New Tech');
        };

        const handleRemoveTechnology = (techIndex: number) => {
          inlineEdit?.removeArrayItem?.(`projects.${index}.${techPath}`, techIndex);
        };

        return (
          <div
            key={item.id || index}
            className="group relative"
            style={{
              padding: '10px 12px',
              backgroundColor: `${accentColor}06`,
              borderRadius: '8px',
              border: `1px solid ${accentColor}15`,
            }}
          >
            {editable && onRemoveProject && (
              <button
                onClick={() => onRemoveProject(item.id)}
                className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            {/* Name & Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {editable ? (
                  <InlineEditableText
                    path={`projects.${index}.name`}
                    value={item.name}
                    style={{
                      fontSize: scaleFontSize(typography.itemTitle.fontSize),
                      fontWeight: 600,
                      color: typography.itemTitle.color,
                    }}
                    placeholder="Project Name"
                  />
                ) : (
                  <span style={{
                    fontSize: scaleFontSize(typography.itemTitle.fontSize),
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                  }}>
                    {item.name}
                  </span>
                )}
              </div>

              {!editable && (item.url || item.githubUrl) && (
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>
                      <ExternalLink style={{ width: '11px', height: '11px' }} />
                    </a>
                  )}
                  {item.githubUrl && (
                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>
                      <Github style={{ width: '11px', height: '11px' }} />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Role & Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: scaleFontSize('10px'), flexWrap: 'wrap' }}>
              {(item.role || editable) && (
                <>
                  {editable ? (
                    <InlineEditableText
                      path={`projects.${index}.role`}
                      value={item.role || ''}
                      style={{ color: accentColor, fontSize: scaleFontSize('10px'), fontWeight: 500 }}
                      placeholder="Role"
                    />
                  ) : (
                    <span style={{ color: accentColor, fontWeight: 500 }}>{item.role}</span>
                  )}
                  {(item.startDate || item.endDate || editable) && <span style={{ color: '#d1d5db' }}>•</span>}
                </>
              )}

              {(item.startDate || item.endDate || editable) && (
                <span style={{ color: typography.dates.color }}>
                  {editable ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <InlineEditableDate
                        path={`projects.${index}.startDate`}
                        value={item.startDate || ''}
                        formatDisplay={formatDate}
                        style={{ fontSize: scaleFontSize('10px') }}
                      />
                      <span>-</span>
                      {item.current ? (
                        <span>Present</span>
                      ) : (
                        <InlineEditableDate
                          path={`projects.${index}.endDate`}
                          value={item.endDate || ''}
                          formatDisplay={formatDate}
                          style={{ fontSize: scaleFontSize('10px') }}
                        />
                      )}
                    </span>
                  ) : (
                    <span>
                      {formatDate ? formatDate(item.startDate || '') : item.startDate}
                      {(item.startDate || item.endDate) && ' - '}
                      {item.current ? 'Present' : (formatDate ? formatDate(item.endDate || '') : item.endDate)}
                    </span>
                  )}
                </span>
              )}
            </div>

            {/* Description - truncated */}
            <div style={{
              fontSize: scaleFontSize(typography.body.fontSize),
              color: typography.body.color,
              marginTop: '6px',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {editable ? (
                <InlineEditableText
                  path={`projects.${index}.description`}
                  value={item.description}
                  placeholder="Brief description..."
                  style={{ fontSize: scaleFontSize(typography.body.fontSize) }}
                />
              ) : (
                item.description
              )}
            </div>

            {/* Tech Stack */}
            {(technologies.length > 0 || editable) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '6px' }}>
                {technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '1px 6px',
                      fontSize: scaleFontSize('9px'),
                      backgroundColor: `${accentColor}12`,
                      color: accentColor,
                      borderRadius: '3px',
                      fontWeight: 500,
                    }}
                  >
                    {editable ? (
                      <InlineEditableText
                        path={`projects.${index}.${techPath}.${techIndex}`}
                        value={tech}
                        style={{ fontSize: scaleFontSize('9px'), fontWeight: 500, color: accentColor }}
                        placeholder="Tech"
                      />
                    ) : (
                      tech
                    )}
                    {editable && inlineEdit?.removeArrayItem && (
                      <button
                        onClick={() => handleRemoveTechnology(techIndex)}
                        className="hover:text-red-500"
                      >
                        <X style={{ width: '8px', height: '8px' }} />
                      </button>
                    )}
                  </span>
                ))}
                {editable && inlineEdit?.addArrayItem && (
                  <button
                    onClick={handleAddTechnology}
                    style={{
                      padding: '1px 6px',
                      fontSize: scaleFontSize('9px'),
                      color: accentColor,
                      border: `1px dashed ${accentColor}50`,
                      borderRadius: '3px',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            )}

            {/* Editable URLs */}
            {editable && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <ExternalLink style={{ width: '9px', height: '9px', color: accentColor }} />
                  <InlineEditableText
                    path={`projects.${index}.url`}
                    value={item.url || ''}
                    style={{ fontSize: scaleFontSize('9px'), color: accentColor }}
                    placeholder="URL"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Github style={{ width: '9px', height: '9px', color: accentColor }} />
                  <InlineEditableText
                    path={`projects.${index}.githubUrl`}
                    value={item.githubUrl || ''}
                    style={{ fontSize: scaleFontSize('9px'), color: accentColor }}
                    placeholder="GitHub"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {editable && onAddProject && (
        <button
          onClick={onAddProject}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '12px',
            borderRadius: '8px',
            border: `1px dashed ${accentColor}40`,
            backgroundColor: 'transparent',
            color: accentColor,
            fontSize: '11px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          className="hover:bg-gray-50 transition-colors"
        >
          <Plus style={{ width: '12px', height: '12px' }} />
          Add
        </button>
      )}
    </div>
  );
};

export default ProjectsCards;
