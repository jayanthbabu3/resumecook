/**
 * Projects Compact Variant
 *
 * Most space-efficient layout - single line per project.
 * Minimal info: name, role, and abbreviated tech stack.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { ProjectsVariantProps } from '../types';

export const ProjectsCompact: React.FC<ProjectsVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddProject,
  onRemoveProject,
  formatDate,
}) => {
  const { typography } = config;
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {items.map((item, index) => {
        const technologies = item.technologies ?? item.techStack ?? [];
        const displayTech = technologies.slice(0, 3).join(', ');
        const hasMore = technologies.length > 3;

        return (
          <div
            key={item.id || index}
            className="group relative"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              padding: '5px 8px',
              backgroundColor: index % 2 === 0 ? `${accentColor}04` : 'transparent',
              borderRadius: '4px',
              fontSize: scaleFontSize('11px'),
            }}
          >
            {editable && onRemoveProject && (
              <button
                onClick={() => onRemoveProject(item.id)}
                className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-2.5 h-2.5 text-red-600" />
              </button>
            )}

            {/* All info inline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              {editable ? (
                <InlineEditableText
                  path={`projects.${index}.name`}
                  value={item.name}
                  style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: scaleFontSize('11px') }}
                  placeholder="Project Name"
                />
              ) : (
                <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.name}</span>
              )}

              {(item.role || editable) && (
                <>
                  <span style={{ color: '#d1d5db' }}>•</span>
                  {editable ? (
                    <InlineEditableText
                      path={`projects.${index}.role`}
                      value={item.role || ''}
                      style={{ color: accentColor, fontSize: scaleFontSize('11px') }}
                      placeholder="Role"
                    />
                  ) : (
                    <span style={{ color: accentColor }}>{item.role}</span>
                  )}
                </>
              )}

              {displayTech && !editable && (
                <>
                  <span style={{ color: '#d1d5db' }}>•</span>
                  <span style={{ color: '#6b7280', fontSize: scaleFontSize('10px') }}>
                    {displayTech}{hasMore ? '...' : ''}
                  </span>
                </>
              )}
            </div>

            {/* Date */}
            {(item.startDate || item.endDate || editable) && (
              <div style={{ fontSize: scaleFontSize('10px'), color: typography.dates.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
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
          Add
        </button>
      )}
    </div>
  );
};

export default ProjectsCompact;
