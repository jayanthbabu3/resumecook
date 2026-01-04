/**
 * Projects Standard Variant
 *
 * Compact layout with tech stack tags and description.
 * Uses theme colors for styling.
 */

import React from 'react';
import { X, Plus, ExternalLink, Github } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import type { ProjectsVariantProps } from '../types';

export const ProjectsStandard: React.FC<ProjectsVariantProps> = ({
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

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              backgroundColor: `${accentColor}05`,
              borderRadius: '6px',
              borderLeft: `2px solid ${accentColor}`,
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

            {/* First row: Name • Role | Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  {editable ? (
                    <InlineEditableText
                      path={`projects.${index}.name`}
                      value={item.name}
                      style={{
                        fontSize: typography.itemTitle.fontSize,
                        fontWeight: 600,
                        color: typography.itemTitle.color,
                      }}
                      placeholder="Project Name"
                    />
                  ) : (
                    <span style={{
                      fontSize: typography.itemTitle.fontSize,
                      fontWeight: 600,
                      color: typography.itemTitle.color,
                    }}>
                      {item.name}
                    </span>
                  )}

                  {!editable && (item.url || item.githubUrl) && (
                    <>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>
                          <ExternalLink style={{ width: '12px', height: '12px' }} />
                        </a>
                      )}
                      {item.githubUrl && (
                        <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>
                          <Github style={{ width: '12px', height: '12px' }} />
                        </a>
                      )}
                    </>
                  )}

                  {(item.role || editable) && (
                    <>
                      <span style={{ color: '#d1d5db' }}>•</span>
                      {editable ? (
                        <InlineEditableText
                          path={`projects.${index}.role`}
                          value={item.role || ''}
                          style={{ fontSize: '12px', color: accentColor, fontWeight: 500 }}
                          placeholder="Role"
                        />
                      ) : (
                        <span style={{ fontSize: '12px', color: accentColor, fontWeight: 500 }}>
                          {item.role}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Date */}
              {(item.startDate || item.endDate || editable) && (
                <div style={{ fontSize: '11px', color: typography.dates.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {editable ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <InlineEditableDate
                        path={`projects.${index}.startDate`}
                        value={item.startDate || ''}
                        formatDisplay={formatDate}
                        style={{ fontSize: '11px' }}
                      />
                      <span>-</span>
                      {item.current ? (
                        <span>Present</span>
                      ) : (
                        <InlineEditableDate
                          path={`projects.${index}.endDate`}
                          value={item.endDate || ''}
                          formatDisplay={formatDate}
                          style={{ fontSize: '11px' }}
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
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              marginTop: '6px',
              lineHeight: 1.5,
            }}>
              {editable ? (
                <InlineEditableText
                  path={`projects.${index}.description`}
                  value={item.description}
                  multiline
                  placeholder="Project description..."
                />
              ) : (
                item.description
              )}
            </div>

            {/* Tech Stack */}
            {(technologies.length > 0 || editable) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                {technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      fontSize: '10px',
                      backgroundColor: `${accentColor}12`,
                      color: accentColor,
                      borderRadius: '4px',
                      fontWeight: 500,
                    }}
                  >
                    {editable ? (
                      <InlineEditableText
                        path={`projects.${index}.${techPath}.${techIndex}`}
                        value={tech}
                        style={{ fontSize: '10px', fontWeight: 500, color: accentColor }}
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
                        <X style={{ width: '10px', height: '10px' }} />
                      </button>
                    )}
                  </span>
                ))}
                {editable && inlineEdit?.addArrayItem && (
                  <button
                    onClick={handleAddTechnology}
                    style={{
                      padding: '2px 8px',
                      fontSize: '10px',
                      color: accentColor,
                      border: `1px dashed ${accentColor}50`,
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    + Tech
                  </button>
                )}
              </div>
            )}

            {/* Editable URLs */}
            {editable && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ExternalLink style={{ width: '10px', height: '10px', color: accentColor }} />
                  <InlineEditableText
                    path={`projects.${index}.url`}
                    value={item.url || ''}
                    style={{ fontSize: '10px', color: accentColor }}
                    placeholder="URL"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Github style={{ width: '10px', height: '10px', color: accentColor }} />
                  <InlineEditableText
                    path={`projects.${index}.githubUrl`}
                    value={item.githubUrl || ''}
                    style={{ fontSize: '10px', color: accentColor }}
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
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Project
        </button>
      )}
    </div>
  );
};

export default ProjectsStandard;
