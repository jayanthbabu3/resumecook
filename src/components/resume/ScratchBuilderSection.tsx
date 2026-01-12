import { useState } from 'react';
import type { ResumeSection } from '@/types/resume';
import { InlineEditableText } from './InlineEditableText';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2, Plus, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

// Helper function to render section items in a preview format
function renderHelperSectionItems(type: string, items: any[]) {
  if (!items || items.length === 0) return null;

  switch (type) {
    case 'languages':
      return (
        <div className="space-y-1">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between text-xs">
              <span className="text-gray-800 font-medium">{item.language}</span>
              <span className="text-gray-600">{item.proficiency}</span>
            </div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div className="space-y-2">
          {items.map((item: any, idx: number) => (
            <div key={idx}>
              <div className="text-xs font-semibold text-gray-900">{item.name}</div>
              {item.description && (
                <div className="text-xs text-gray-600 line-clamp-2">{item.description}</div>
              )}
            </div>
          ))}
        </div>
      );

    case 'awards':
      return (
        <div className="space-y-1">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="text-xs">
              <span className="font-semibold text-gray-900">{item.title}</span>
              <span className="text-gray-600"> - {item.issuer}</span>
            </div>
          ))}
        </div>
      );

    case 'publications':
      return (
        <div className="space-y-1">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="text-xs">
              <div className="font-semibold text-gray-900 italic">{item.title}</div>
              <div className="text-gray-600">{item.publisher}</div>
            </div>
          ))}
        </div>
      );

    case 'volunteer':
      return (
        <div className="space-y-2">
          {items.map((item: any, idx: number) => (
            <div key={idx}>
              <div className="text-xs font-semibold text-gray-900">{item.role}</div>
              <div className="text-xs text-gray-600">{item.organization}</div>
            </div>
          ))}
        </div>
      );

    case 'speaking':
      return (
        <div className="space-y-1">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="text-xs">
              <div className="font-semibold text-gray-900">{item.topic}</div>
              <div className="text-gray-600">{item.event}</div>
            </div>
          ))}
        </div>
      );

    case 'patents':
      return (
        <div className="space-y-1">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="text-xs">
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-gray-600">{item.patentNumber}</div>
            </div>
          ))}
        </div>
      );

    case 'portfolio':
      return (
        <div className="space-y-1">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="text-xs">
              <span className="font-semibold text-gray-900">{item.platform}:</span>{' '}
              <span className="text-gray-600">{item.url}</span>
            </div>
          ))}
        </div>
      );

    default:
      return (
        <div className="text-xs text-muted-foreground">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
      );
  }
}

interface ScratchBuilderSectionProps {
  section: ResumeSection;
  sectionIndex: number;
  onDelete: (id: string) => void;
  onUpdateSection: (sectionId: string, updater: (section: ResumeSection) => ResumeSection) => void;
  dragHandleProps?: any;
  themeColor?: string;
}

export function ScratchBuilderSection({
  section,
  sectionIndex,
  onDelete,
  onUpdateSection,
  dragHandleProps,
  themeColor = '#2563eb',
}: ScratchBuilderSectionProps) {
  const basePath = `dynamicSections[${sectionIndex}]`;

  // Local updateField handler that updates the section directly
  const updateField = (path: string, value: any) => {
    onUpdateSection(section.id, (prevSection) => {
      const newSection = JSON.parse(JSON.stringify(prevSection));

      // Extract the field path after basePath
      const fieldPath = path.replace(`${basePath}.`, '');
      const pathParts = fieldPath.split('.');

      let current: any = newSection;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);

        if (arrayMatch) {
          const [, arrayName, index] = arrayMatch;
          current = current[arrayName][parseInt(index)];
        } else {
          current = current[part];
        }
      }

      const lastPart = pathParts[pathParts.length - 1];
      const arrayMatch = lastPart.match(/^(.+)\[(\d+)\]$/);

      if (arrayMatch) {
        const [, arrayName, index] = arrayMatch;
        current[arrayName][parseInt(index)] = value;
      } else {
        current[lastPart] = value;
      }

      return newSection;
    });
  };

  // Local add/remove handlers that update the section directly
  const addArrayItem = (path: string, defaultItem: any) => {
    onUpdateSection(section.id, (prevSection) => {
      const newSection = JSON.parse(JSON.stringify(prevSection));

      // Extract the field path after basePath
      const fieldPath = path.replace(`${basePath}.`, '');
      const pathParts = fieldPath.split('.');

      let current: any = newSection;
      for (const part of pathParts) {
        const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
        if (arrayMatch) {
          const [, arrayName, index] = arrayMatch;
          current = current[arrayName][parseInt(index)];
        } else {
          current = current[part];
        }
      }

      if (Array.isArray(current)) {
        if (typeof defaultItem === 'object' && defaultItem !== null) {
          current.push({ ...defaultItem, id: defaultItem.id || Date.now().toString() });
        } else {
          current.push(defaultItem);
        }
      }

      return newSection;
    });
  };

  const removeArrayItem = (path: string, index: number) => {
    onUpdateSection(section.id, (prevSection) => {
      const newSection = JSON.parse(JSON.stringify(prevSection));

      // Extract the field path after basePath
      const fieldPath = path.replace(`${basePath}.`, '');
      const pathParts = fieldPath.split('.');

      let current: any = newSection;
      for (const part of pathParts) {
        const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
        if (arrayMatch) {
          const [, arrayName, arrayIndex] = arrayMatch;
          current = current[arrayName][parseInt(arrayIndex)];
        } else {
          current = current[part];
        }
      }

      if (Array.isArray(current)) {
        current.splice(index, 1);
      }

      return newSection;
    });
  };

  // Helper to create field updater for InlineEditableText onCustomUpdate
  const createFieldUpdater = (fieldPath: string) => (value: any) => {
    updateField(fieldPath, value);
  };

  // Helper to apply text case transformation
  const applyTextCase = (text: string, caseType: string) => {
    if (!text) return text;
    switch (caseType) {
      case 'upper':
        return text.toUpperCase();
      case 'lower':
        return text.toLowerCase();
      case 'title':
      default:
        // Title case: capitalize first letter of each word
        return text.replace(/\w\S*/g, (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
    }
  };

  // Handle title case change
  const handleTitleCaseChange = (caseType: 'title' | 'upper' | 'lower') => {
    onUpdateSection(section.id, (prevSection) => {
      const newSection = JSON.parse(JSON.stringify(prevSection));
      newSection.titleCase = caseType;
      return newSection;
    });
  };

  // Handle title alignment change
  const handleTitleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    onUpdateSection(section.id, (prevSection) => {
      const newSection = JSON.parse(JSON.stringify(prevSection));
      newSection.titleAlignment = alignment;
      return newSection;
    });
  };

  // Handle content alignment change
  const handleContentAlignmentChange = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    onUpdateSection(section.id, (prevSection) => {
      const newSection = JSON.parse(JSON.stringify(prevSection));
      newSection.contentAlignment = alignment;
      return newSection;
    });
  };

  const titleCase = section.titleCase || 'upper'; // Default to uppercase
  const displayTitle = applyTextCase(section.title, titleCase);
  const titleAlignment = section.titleAlignment || 'left'; // Default to left
  const contentAlignment = section.contentAlignment || 'left'; // Default to left

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const renderSection = () => {
    const data = section.data;

    switch (data.type) {
      case 'summary':
        return (
          <div className="group/content relative">
            {/* Floating Content Alignment Controls - Appears on content hover only */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover/content:opacity-100 transition-all duration-200 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1.5">
              <button
                onClick={() => handleContentAlignmentChange('left')}
                className={`p-1.5 rounded border transition-colors ${
                  contentAlignment === 'left'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Align Left"
              >
                <AlignLeft className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleContentAlignmentChange('center')}
                className={`p-1.5 rounded border transition-colors ${
                  contentAlignment === 'center'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Align Center"
              >
                <AlignCenter className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleContentAlignmentChange('right')}
                className={`p-1.5 rounded border transition-colors ${
                  contentAlignment === 'right'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Align Right"
              >
                <AlignRight className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleContentAlignmentChange('justify')}
                className={`p-1.5 rounded border transition-colors ${
                  contentAlignment === 'justify'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Justify"
              >
                <AlignJustify className="h-3 w-3" />
              </button>
            </div>

            {/* Summary Content with alignment */}
            <div style={{ textAlign: contentAlignment }}>
              {/* Executive Summary - centered, bold */}
              {data.variantId === 'executive-summary' && typeof data.content === 'string' && (
                <InlineEditableText
                  path={`${basePath}.data.content`}
                  value={data.content}
                  multiline
                  placeholder="Write your executive summary..."
                  className="block text-sm leading-relaxed font-semibold"
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                />
              )}

              {/* Professional Profile - bullet points */}
              {data.variantId === 'professional-profile' && Array.isArray(data.content) && (
                <div className="space-y-2">
                  {data.content.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-sm mt-1">•</span>
                      <InlineEditableText
                        path={`${basePath}.data.content[${idx}]`}
                        value={item}
                        multiline
                        placeholder="Add a key strength..."
                        className="flex-1 text-sm leading-relaxed"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.content[${idx}]`)}
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(`${basePath}.data.content`, '')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Point
                  </Button>
                </div>
              )}

              {/* Career Objective - italic */}
              {data.variantId === 'career-objective' && !Array.isArray(data.content) && (
                <InlineEditableText
                  path={`${basePath}.data.content`}
                  value={data.content}
                  multiline
                  placeholder="Write your career objective..."
                  className="block text-sm leading-relaxed italic"
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                />
              )}

              {/* About Me - casual */}
              {data.variantId === 'about-me' && !Array.isArray(data.content) && (
                <InlineEditableText
                  path={`${basePath}.data.content`}
                  value={data.content}
                  multiline
                  placeholder="Tell us about yourself..."
                  className="block text-sm leading-relaxed italic"
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                />
              )}

              {/* Highlighted Summary - with border accent */}
              {data.variantId === 'highlighted-summary' && !Array.isArray(data.content) && (
                <div className="border-l-4 pl-4" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.content`}
                    value={data.content}
                    multiline
                    placeholder="Write your profile highlights..."
                    className="block text-sm leading-relaxed font-medium"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                  />
                </div>
              )}

              {/* Two-Column Layout - stats + description */}
              {data.variantId === 'two-column-summary' && (
                <div className="space-y-3">
                  {data.stats && Array.isArray(data.stats) && (
                    <div className="flex flex-wrap gap-2">
                      {data.stats.map((stat: string, idx: number) => (
                        <div
                          key={idx}
                          className="px-3 py-1 rounded-full flex items-center gap-2"
                          style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                        >
                          <InlineEditableText
                            path={`${basePath}.data.stats[${idx}]`}
                            value={stat}
                            placeholder="Stat"
                            className="text-xs font-semibold"
                            onCustomUpdate={createFieldUpdater(`${basePath}.data.stats[${idx}]`)}
                          />
                          <button
                            onClick={() => removeArrayItem(`${basePath}.data.stats`, idx)}
                            className="text-xs hover:opacity-70"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(`${basePath}.data.stats`, '0+ Years')}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Stat
                      </Button>
                    </div>
                  )}
                  {data.content && (
                    <InlineEditableText
                      path={`${basePath}.data.content`}
                      value={typeof data.content === 'string' ? data.content : Array.isArray(data.content) ? data.content.join('\n') : ''}
                      multiline
                      placeholder="Write your professional overview..."
                      className="block text-sm leading-relaxed"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                    />
                  )}
                </div>
              )}

              {/* Minimal Summary - clean and simple */}
              {data.variantId === 'minimal-summary' && !Array.isArray(data.content) && (
                <InlineEditableText
                  path={`${basePath}.data.content`}
                  value={data.content}
                  multiline
                  placeholder="Write your summary..."
                  className="block text-sm leading-relaxed text-gray-700"
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                />
              )}

              {/* Achievement-Focused - bullet points with arrows */}
              {data.variantId === 'achievement-focused' && Array.isArray(data.content) && (
                <div className="space-y-2">
                  {data.content.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-sm mt-1" style={{ color: themeColor }}>↗</span>
                      <InlineEditableText
                        path={`${basePath}.data.content[${idx}]`}
                        value={item}
                        multiline
                        placeholder="Add an achievement..."
                        className="flex-1 text-sm leading-relaxed"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.content[${idx}]`)}
                      />
                      <button
                        onClick={() => removeArrayItem(`${basePath}.data.content`, idx)}
                        className="text-xs text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(`${basePath}.data.content`, '')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Achievement
                  </Button>
                </div>
              )}

              {/* Expertise Summary - content + tags */}
              {data.variantId === 'expertise-summary' && (
                <div className="space-y-3">
                  {data.content && (
                    <InlineEditableText
                      path={`${basePath}.data.content`}
                      value={typeof data.content === 'string' ? data.content : Array.isArray(data.content) ? data.content.join('\n') : ''}
                      multiline
                      placeholder="Write about your core expertise..."
                      className="block text-sm leading-relaxed"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                    />
                  )}
                  {data.tags && Array.isArray(data.tags) && (
                    <div className="flex flex-wrap gap-2">
                      {data.tags.map((tag: string, idx: number) => (
                        <div
                          key={idx}
                          className="px-3 py-1 rounded bg-gray-100 flex items-center gap-2"
                        >
                          <InlineEditableText
                            path={`${basePath}.data.tags[${idx}]`}
                            value={tag}
                            placeholder="Expertise area"
                            className="text-xs"
                            onCustomUpdate={createFieldUpdater(`${basePath}.data.tags[${idx}]`)}
                          />
                          <button
                            onClick={() => removeArrayItem(`${basePath}.data.tags`, idx)}
                            className="text-xs text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(`${basePath}.data.tags`, '')}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Tag
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Default/Professional Summary */}
              {(!data.variantId || data.variantId === 'professional-summary') && !Array.isArray(data.content) && (
                <InlineEditableText
                  path={`${basePath}.data.content`}
                  value={data.content}
                  multiline
                  placeholder="Write your professional summary..."
                  className="block text-sm leading-relaxed"
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.content`)}
                />
              )}
            </div>
          </div>
        );

      case 'experience':
        // Classic Timeline - traditional format
        if (data.variantId === 'experience-classic' || !data.variantId) {
          return (
            <div className="space-y-4">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].position`}
                    value={exp.position}
                    className="font-semibold text-base block mb-1"
                    placeholder="Position Title"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].company`}
                    value={exp.company}
                    className="block mb-1"
                    placeholder="Company Name"
                    style={{ color: themeColor }}
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)}
                  />
                  {exp.location && (
                    <div className="text-sm text-muted-foreground mb-1">
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].location`}
                        value={exp.location}
                        placeholder="Location"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].location`)}
                      />
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mb-2">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].startDate`}
                      value={exp.startDate}
                      placeholder="2020"
                      className="inline"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)}
                    />
                    {' - '}
                    {exp.current ? (
                      'Present'
                    ) : (
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].endDate`}
                        value={exp.endDate}
                        placeholder="2024"
                        className="inline"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)}
                      />
                    )}
                  </div>
                  {Array.isArray(exp.description) ? (
                    <div className="space-y-1">
                      {exp.description.map((desc: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5">•</span>
                          <InlineEditableText
                            path={`${basePath}.data.items[${idx}].description[${dIdx}]`}
                            value={desc}
                            placeholder="Achievement or responsibility"
                            className="flex-1"
                            multiline
                            onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].description[${dIdx}]`)}
                          />
                          <button
                            onClick={() => removeArrayItem(`${basePath}.data.items[${idx}].description`, dIdx)}
                            className="text-xs text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addArrayItem(`${basePath}.data.items[${idx}].description`, '')}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Point
                      </Button>
                    </div>
                  ) : (
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].description`}
                      value={exp.description}
                      multiline
                      placeholder="Job description..."
                      className="text-sm whitespace-pre-line"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].description`)}
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="mt-2 text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.items`, {
                    id: Date.now().toString(),
                    company: '',
                    position: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: [],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Experience
              </Button>
            </div>
          );
        }

        // Modern Card - card-based design
        if (data.variantId === 'experience-modern') {
          return (
            <div className="space-y-3">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="border rounded-lg p-4 shadow-sm bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].position`}
                        value={exp.position}
                        className="font-bold text-base block"
                        placeholder="Position"
                        style={{ color: themeColor }}
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)}
                      />
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].company`}
                        value={exp.company}
                        className="text-sm text-gray-600 block"
                        placeholder="Company"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].startDate`}
                        value={exp.startDate}
                        placeholder="2020"
                        className="inline"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)}
                      />
                      {' - '}
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].endDate`}
                        value={exp.endDate}
                        placeholder="Present"
                        className="inline"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)}
                      />
                    </div>
                  </div>
                  {Array.isArray(exp.description) && (
                    <div className="space-y-1 mt-2">
                      {exp.description.map((desc: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-start gap-2 text-sm">
                          <span style={{ color: themeColor }}>▪</span>
                          <InlineEditableText
                            path={`${basePath}.data.items[${idx}].description[${dIdx}]`}
                            value={desc}
                            placeholder="Achievement"
                            className="flex-1"
                            onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].description[${dIdx}]`)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Minimal Clean - essential information only
        if (data.variantId === 'experience-minimal') {
          return (
            <div className="space-y-3">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="text-sm">
                  <div className="font-semibold" style={{ color: themeColor }}>
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].position`}
                      value={exp.position}
                      placeholder="Position"
                      className="inline"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)}
                    />
                    <span className="mx-2 text-gray-400">|</span>
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].company`}
                      value={exp.company}
                      placeholder="Company"
                      className="inline font-normal"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)}
                    />
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-muted-foreground font-normal">
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].startDate`}
                        value={exp.startDate}
                        placeholder="2020"
                        className="inline"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)}
                      />
                      {'-'}
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].endDate`}
                        value={exp.endDate}
                        placeholder="Present"
                        className="inline"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)}
                      />
                    </span>
                  </div>
                  {Array.isArray(exp.description) && exp.description.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {exp.description.map((d: string) => d).join(' • ')}
                    </div>
                  )}
                  <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive mt-1">Remove</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Detailed Format - comprehensive with location
        if (data.variantId === 'experience-detailed') {
          return (
            <div className="space-y-4">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="pb-4 border-b">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].position`}
                        value={exp.position}
                        className="font-bold text-base block"
                        placeholder="Position"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)}
                      />
                      <div className="text-sm" style={{ color: themeColor }}>
                        <InlineEditableText
                          path={`${basePath}.data.items[${idx}].company`}
                          value={exp.company}
                          placeholder="Company"
                          className="inline"
                          onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)}
                        />
                        {' • '}
                        <InlineEditableText
                          path={`${basePath}.data.items[${idx}].location`}
                          value={exp.location}
                          placeholder="Location"
                          className="inline"
                          onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].location`)}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={exp.startDate} placeholder="2020" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)} />
                      {' - '}
                      <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={exp.endDate} placeholder="Present" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)} />
                    </div>
                  </div>
                  {Array.isArray(exp.description) && (
                    <div className="space-y-1">
                      {exp.description.map((desc: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-start gap-2 text-sm">
                          <span>•</span>
                          <InlineEditableText path={`${basePath}.data.items[${idx}].description[${dIdx}]`} value={desc} placeholder="Achievement" className="flex-1" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].description[${dIdx}]`)} />
                        </div>
                      ))}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', location: '', startDate: '', endDate: '', description: [] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Visual Timeline - timeline with dots
        if (data.variantId === 'experience-timeline') {
          return (
            <div className="space-y-4">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full mt-1" style={{ backgroundColor: themeColor }}></div>
                    <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={exp.startDate} placeholder="2020" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)} />
                      {' - '}
                      <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={exp.endDate} placeholder="Present" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)} />
                    </div>
                    <InlineEditableText path={`${basePath}.data.items[${idx}].position`} value={exp.position} className="font-semibold text-sm block" placeholder="Position" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)} />
                    <InlineEditableText path={`${basePath}.data.items[${idx}].company`} value={exp.company} className="text-sm block" style={{ color: themeColor }} placeholder="Company" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)} />
                    {Array.isArray(exp.description) && exp.description.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">{exp.description.join(' • ')}</div>
                    )}
                    <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive mt-2">Remove</button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Compact View - space efficient
        if (data.variantId === 'experience-compact') {
          return (
            <div className="space-y-2">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="text-sm flex items-center gap-2">
                  <InlineEditableText path={`${basePath}.data.items[${idx}].position`} value={exp.position} placeholder="Position" className="inline font-semibold" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)} />
                  <span className="text-gray-400">•</span>
                  <InlineEditableText path={`${basePath}.data.items[${idx}].company`} value={exp.company} placeholder="Company" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)} />
                  <span className="text-gray-400">•</span>
                  <span className="text-muted-foreground">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={exp.startDate} placeholder="2020" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)} />
                    {'-'}
                    <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={exp.endDate} placeholder="Present" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)} />
                  </span>
                  <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive ml-auto">×</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Boxed Layout - bordered boxes
        if (data.variantId === 'experience-boxed') {
          return (
            <div className="space-y-3">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="border-2 rounded-md p-3" style={{ borderColor: `${themeColor}40` }}>
                  <InlineEditableText path={`${basePath}.data.items[${idx}].position`} value={exp.position} className="font-bold text-sm block mb-1" placeholder="Position" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)} />
                  <div className="flex items-center justify-between text-sm mb-2">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].company`} value={exp.company} placeholder="Company" style={{ color: themeColor }} onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)} />
                    <span className="text-xs text-muted-foreground">
                      <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={exp.startDate} placeholder="2020" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)} />
                      {'-'}
                      <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={exp.endDate} placeholder="Present" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)} />
                    </span>
                  </div>
                  {Array.isArray(exp.description) && exp.description.length > 0 && (
                    <div className="text-xs text-muted-foreground">{exp.description.join(' • ')}</div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Achievement-Focused - star markers
        if (data.variantId === 'experience-achievement') {
          return (
            <div className="space-y-4">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="pl-4 border-l-2" style={{ borderColor: themeColor }}>
                  <InlineEditableText path={`${basePath}.data.items[${idx}].position`} value={exp.position} className="font-bold text-base block mb-1" placeholder="Position" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)} />
                  <div className="text-sm mb-2">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].company`} value={exp.company} placeholder="Company" style={{ color: themeColor }} className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)} />
                    <span className="mx-2 text-muted-foreground">|</span>
                    <span className="text-xs text-muted-foreground">
                      <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={exp.startDate} placeholder="2020" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)} />
                      {' - '}
                      <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={exp.endDate} placeholder="Present" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)} />
                    </span>
                  </div>
                  {Array.isArray(exp.description) && (
                    <div className="space-y-1">
                      {exp.description.map((desc: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-start gap-2 text-sm">
                          <span style={{ color: themeColor }}>★</span>
                          <InlineEditableText path={`${basePath}.data.items[${idx}].description[${dIdx}]`} value={desc} placeholder="Key achievement" className="flex-1" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].description[${dIdx}]`)} />
                        </div>
                      ))}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [''] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Sidebar Timeline - dates in sidebar
        if (data.variantId === 'experience-sidebar') {
          return (
            <div className="space-y-4">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="w-20 text-right text-xs text-muted-foreground flex-shrink-0">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={exp.startDate} placeholder="2020" className="block" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)} />
                    <span className="block">-</span>
                    <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={exp.endDate} placeholder="Present" className="block" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)} />
                  </div>
                  <div className="w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                  <div className="flex-1">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].position`} value={exp.position} className="font-semibold text-sm block" placeholder="Position" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)} />
                    <InlineEditableText path={`${basePath}.data.items[${idx}].company`} value={exp.company} className="text-sm block" style={{ color: themeColor }} placeholder="Company" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)} />
                    {Array.isArray(exp.description) && exp.description.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">{exp.description.join(' • ')}</div>
                    )}
                    <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive mt-2">Remove</button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Executive Format - premium format for senior positions
        if (data.variantId === 'experience-executive') {
          return (
            <div className="space-y-4">
              {data.items?.map((exp, idx) => (
                <div key={exp.id} className="pb-4 border-b-2" style={{ borderColor: `${themeColor}20` }}>
                  <div className="flex items-start justify-between mb-2">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].position`} value={exp.position} className="font-bold text-lg block uppercase tracking-wide" placeholder="POSITION TITLE" style={{ color: themeColor }} onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)} />
                    <div className="text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap ml-4">
                      <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={exp.startDate} placeholder="2020" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].startDate`)} />
                      {' - '}
                      <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={exp.endDate} placeholder="PRESENT" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].endDate`)} />
                    </div>
                  </div>
                  <div className="text-sm font-medium mb-1">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].company`} value={exp.company} placeholder="Company Name" className="inline" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)} />
                    {exp.location && (
                      <>
                        {' • '}
                        <InlineEditableText path={`${basePath}.data.items[${idx}].location`} value={exp.location} placeholder="Location" className="inline text-muted-foreground" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].location`)} />
                      </>
                    )}
                  </div>
                  {Array.isArray(exp.description) && (
                    <div className="space-y-1 mt-3">
                      {exp.description.map((desc: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-start gap-2 text-sm">
                          <span className="font-bold" style={{ color: themeColor }}>▸</span>
                          <InlineEditableText path={`${basePath}.data.items[${idx}].description[${dIdx}]`} value={desc} placeholder="Strategic achievement" className="flex-1" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].description[${dIdx}]`)} />
                        </div>
                      ))}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-3 text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', location: '', startDate: '', endDate: '', description: [''] })}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
          );
        }

        // Default fallback
        return (
          <div className="space-y-4">
            {data.items?.map((exp, idx) => (
              <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <InlineEditableText path={`${basePath}.data.items[${idx}].position`} value={exp.position} className="font-semibold text-base block mb-1" placeholder="Position" onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].position`)} />
                <InlineEditableText path={`${basePath}.data.items[${idx}].company`} value={exp.company} className="block mb-2" placeholder="Company" style={{ color: themeColor }} onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].company`)} />
                <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: [] })}>
              <Plus className="h-4 w-4 mr-1" /> Add Experience
            </Button>
          </div>
        );

      case 'education':
        // Classic Timeline - school first, traditional format
        if (data.variantId === 'education-classic' || !data.variantId) {
          return (
            <div className="space-y-4">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].school`}
                    value={edu.school}
                    className="font-semibold text-sm block mb-1"
                    placeholder="School Name"
                  />
                  <div className="text-sm mb-1" style={{ color: themeColor }}>
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].degree`}
                      value={edu.degree}
                      className="inline"
                      placeholder="Degree"
                    />
                    {edu.field && ' in '}
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].field`}
                      value={edu.field}
                      className="inline"
                      placeholder="Field"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {edu.startDate && (
                      <>
                        <InlineEditableText
                          path={`${basePath}.data.items[${idx}].startDate`}
                          value={edu.startDate}
                          placeholder="2016"
                          className="inline"
                        />
                        {' - '}
                      </>
                    )}
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].endDate`}
                      value={edu.endDate}
                      placeholder="2020"
                      className="inline"
                    />
                  </div>
                  {edu.gpa && (
                    <div className="text-sm">
                      GPA: <InlineEditableText
                        path={`${basePath}.data.items[${idx}].gpa`}
                        value={edu.gpa}
                        placeholder="3.8"
                        className="inline"
                      />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="mt-2 text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.items`, {
                    id: Date.now().toString(),
                    school: '',
                    degree: '',
                    field: '',
                    startDate: '',
                    endDate: '',
                    gpa: ''
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </div>
          );
        }

        // Modern Card - degree first, card style
        if (data.variantId === 'education-modern') {
          return (
            <div className="space-y-4">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="font-semibold text-sm mb-1">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].degree`}
                      value={edu.degree}
                      className="inline"
                      placeholder="Bachelor of Science"
                    />
                    {edu.field && ' in '}
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].field`}
                      value={edu.field}
                      className="inline"
                      placeholder="Computer Science"
                    />
                  </div>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].school`}
                    value={edu.school}
                    className="text-sm block mb-1"
                    placeholder="School Name"
                    style={{ color: themeColor }}
                  />
                  <div className="text-xs text-muted-foreground">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].endDate`}
                      value={edu.endDate}
                      placeholder="2020"
                      className="inline"
                    />
                  </div>
                  {edu.gpa && (
                    <div className="text-sm mt-1">
                      GPA: <InlineEditableText
                        path={`${basePath}.data.items[${idx}].gpa`}
                        value={edu.gpa}
                        placeholder="3.8"
                        className="inline"
                      />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="mt-2 text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.items`, {
                    id: Date.now().toString(),
                    school: '',
                    degree: '',
                    field: '',
                    endDate: '',
                    gpa: ''
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </div>
          );
        }

        // Minimal Clean - essential info only
        if (data.variantId === 'education-minimal') {
          return (
            <div className="space-y-3">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].degree`}
                      value={edu.degree}
                      className="text-sm inline"
                      placeholder="BS Computer Science"
                    />
                    <span className="mx-2">•</span>
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].school`}
                      value={edu.school}
                      className="text-sm inline"
                      placeholder="School"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].endDate`}
                      value={edu.endDate}
                      className="text-sm text-muted-foreground"
                      placeholder="2020"
                    />
                    <button
                      onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                      className="text-xs text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.items`, {
                    id: Date.now().toString(),
                    school: '',
                    degree: '',
                    endDate: ''
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </div>
          );
        }

        // Achievement-Focused - emphasizes academic achievements
        if (data.variantId === 'education-achievement') {
          return (
            <div className="space-y-4">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].school`}
                    value={edu.school}
                    className="font-semibold text-sm block mb-1"
                    placeholder="School Name"
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].degree`}
                    value={edu.degree}
                    className="text-sm block mb-1"
                    placeholder="Degree"
                    style={{ color: themeColor }}
                  />
                  <div className="text-xs text-muted-foreground mb-2">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].endDate`}
                      value={edu.endDate}
                      placeholder="2020"
                      className="inline"
                    />
                  </div>

                  {Array.isArray(edu.achievements) && edu.achievements.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {edu.achievements.map((ach: string, aIdx: number) => (
                        <div key={aIdx} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5" style={{ color: themeColor }}>✓</span>
                          <InlineEditableText
                            path={`${basePath}.data.items[${idx}].achievements[${aIdx}]`}
                            value={ach}
                            placeholder="Add achievement"
                            className="flex-1"
                          />
                          <button
                            onClick={() => removeArrayItem(`${basePath}.data.items[${idx}].achievements`, aIdx)}
                            className="text-xs text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(`${basePath}.data.items[${idx}].achievements`, '')}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Achievement
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="mt-2 text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.items`, {
                    id: Date.now().toString(),
                    school: '',
                    degree: '',
                    endDate: '',
                    achievements: [],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </div>
          );
        }

        // Honors Emphasis - show GPA and honors list
        if (data.variantId === 'education-honors') {
          return (
            <div className="space-y-4">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="pl-4 border-l-2" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].school`}
                    value={edu.school}
                    className="font-semibold text-sm block"
                    placeholder="School"
                  />
                  <div className="text-sm mb-1" style={{ color: themeColor }}>
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].degree`}
                      value={edu.degree}
                      className="inline"
                      placeholder="Degree"
                    />
                    {edu.field && ' in '}
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].field`}
                      value={edu.field}
                      className="inline"
                      placeholder="Field"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].endDate`}
                      value={edu.endDate}
                      placeholder="2020"
                      className="inline"
                    />
                  </div>
                  {(edu.gpa || (Array.isArray(edu.honors) && edu.honors.length)) && (
                    <div className="mt-2 space-y-1">
                      {edu.gpa && (
                        <div className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5" style={{ color: themeColor }}>✓</span>
                          <span>
                            GPA: <InlineEditableText
                              path={`${basePath}.data.items[${idx}].gpa`}
                              value={edu.gpa}
                              placeholder="3.8"
                              className="inline"
                            />
                          </span>
                        </div>
                      )}
                      {Array.isArray(edu.honors) && edu.honors.map((h: string, hIdx: number) => (
                        <div key={hIdx} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5" style={{ color: themeColor }}>✓</span>
                          <InlineEditableText
                            path={`${basePath}.data.items[${idx}].honors[${hIdx}]`}
                            value={h}
                            placeholder="Honor"
                            className="flex-1"
                          />
                          <button
                            onClick={() => removeArrayItem(`${basePath}.data.items[${idx}].honors`, hIdx)}
                            className="text-xs text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="mt-2 text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), school: '', degree: '', field: '', endDate: '', gpa: '', honors: [] })}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </div>
          );
        }

        // Detailed - show coursework
        if (data.variantId === 'education-detailed') {
          return (
            <div className="space-y-4">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="border rounded-md p-3">
                  <div className="font-semibold text-sm mb-1">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].school`}
                      value={edu.school}
                      placeholder="School"
                    />
                  </div>
                  <div className="text-sm mb-1" style={{ color: themeColor }}>
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].degree`}
                      value={edu.degree}
                      placeholder="Degree"
                    />
                    {edu.field && ' in '}
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].field`}
                      value={edu.field}
                      placeholder="Field"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].endDate`}
                      value={edu.endDate}
                      placeholder="2020"
                    />
                  </div>
                  {Array.isArray(edu.coursework) && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium mr-1">Coursework:</span>
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].__courseworkString`}
                        value={edu.coursework.join(', ')}
                        placeholder="Algorithms, Distributed Systems"
                        onCustomUpdate={(val) => {
                          const list = val.split(',').map((s: string) => s.trim()).filter(Boolean);
                          updateField(`${basePath}.data.items[${idx}].coursework`, list);
                        }}
                      />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="mt-2 text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), school: '', degree: '', field: '', endDate: '', coursework: [] })}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </div>
          );
        }

        // Timeline - visual dates
        if (data.variantId === 'education-timeline') {
          return (
            <div className="space-y-4">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="pl-4 border-l-2" style={{ borderColor: themeColor }}>
                  <div className="text-xs text-muted-foreground mb-1">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].startDate`} value={edu.startDate} placeholder="2016" className="inline" />
                    {' - '}
                    <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={edu.endDate} placeholder="2020" className="inline" />
                  </div>
                  <div className="font-semibold text-sm">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].school`} value={edu.school} placeholder="School" />
                  </div>
                  <div className="text-sm" style={{ color: themeColor }}>
                    <InlineEditableText path={`${basePath}.data.items[${idx}].degree`} value={edu.degree} placeholder="Degree" />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Education
              </Button>
            </div>
          );
        }

        // Compact single line
        if (data.variantId === 'education-compact') {
          return (
            <div className="space-y-2">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="text-sm flex items-center gap-2">
                  <InlineEditableText path={`${basePath}.data.items[${idx}].degree`} value={edu.degree} placeholder="BS CS" className="inline" />
                  <span>•</span>
                  <InlineEditableText path={`${basePath}.data.items[${idx}].school`} value={edu.school} placeholder="School" className="inline" />
                  <span className="text-muted-foreground">•</span>
                  <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={edu.endDate} placeholder="2020" className="inline text-muted-foreground" />
                  <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive ml-auto">×</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), school: '', degree: '', endDate: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Education
              </Button>
            </div>
          );
        }

        // Boxed layout
        if (data.variantId === 'education-boxed') {
          return (
            <div className="space-y-3">
              {data.items?.map((edu, idx) => (
                <div key={edu.id} className="border rounded-md p-3">
                  <InlineEditableText path={`${basePath}.data.items[${idx}].school`} value={edu.school} className="font-semibold text-sm block mb-1" placeholder="School" />
                  <InlineEditableText path={`${basePath}.data.items[${idx}].degree`} value={edu.degree} className="text-sm" placeholder="Degree" style={{ color: themeColor }} />
                  <div className="text-xs text-muted-foreground mt-1">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={edu.endDate} placeholder="2020" className="inline" />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), school: '', degree: '', endDate: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Education
              </Button>
            </div>
          );
        }

        // Two-column layout
        if (data.variantId === 'education-two-column') {
          return (
            <div className="grid grid-cols-2 gap-6">
              {data.items?.map((edu, idx) => (
                <div key={edu.id}>
                  <InlineEditableText path={`${basePath}.data.items[${idx}].school`} value={edu.school} className="font-semibold text-sm block" placeholder="School" />
                  <InlineEditableText path={`${basePath}.data.items[${idx}].degree`} value={edu.degree} className="text-sm" placeholder="Degree" style={{ color: themeColor }} />
                  <div className="text-xs text-muted-foreground mt-1">
                    <InlineEditableText path={`${basePath}.data.items[${idx}].endDate`} value={edu.endDate} placeholder="2020" className="inline" />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // Default fallback - same as classic
        return (
          <div className="space-y-4">
            {data.items?.map((edu, idx) => (
              <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].school`}
                  value={edu.school}
                  className="font-semibold text-base block mb-1"
                  placeholder="School Name"
                />
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].degree`}
                  value={edu.degree}
                  className="block mb-1"
                  placeholder="Degree"
                  style={{ color: themeColor }}
                />
                {edu.field && (
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].field`}
                    value={edu.field}
                    className="text-sm block mb-2"
                    placeholder="Field of Study"
                  />
                )}
                <div className="text-sm text-muted-foreground">
                  {edu.startDate && (
                    <>
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].startDate`}
                        value={edu.startDate}
                        placeholder="Start Year"
                      />
                      {' - '}
                    </>
                  )}
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].endDate`}
                    value={edu.endDate}
                    placeholder="End Year"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                  className="mt-2 text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem(`${basePath}.data.items`, {
                  id: Date.now().toString(),
                  school: '',
                  degree: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          </div>
        );

      case 'skills':
        // Skill Pills - horizontal chips (default)
        if (data.variantId === 'skill-pills' || !data.variantId) {
          const skills = data.skills || [];
          return (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, idx: number) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-full flex items-center gap-2"
                  style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                >
                  <InlineEditableText
                    path={`${basePath}.data.skills[${idx}]`}
                    value={skill}
                    placeholder="Skill"
                    className="text-sm"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}]`)}
                  />
                  <button
                    onClick={() => removeArrayItem(`${basePath}.data.skills`, idx)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.skills`, '')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        // Vertical List with levels
        if (data.variantId === 'skill-list') {
          const skills = data.skills || [];
          return (
            <div className="space-y-2">
              {skills.map((skill: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-4 border-b pb-2">
                  <InlineEditableText
                    path={`${basePath}.data.skills[${idx}].name`}
                    value={skill.name}
                    placeholder="Skill name"
                    className="text-sm flex-1"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.skills[${idx}].level`}
                    value={skill.level}
                    placeholder="Level"
                    className="text-xs text-muted-foreground w-24"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}].level`)}
                  />
                  <button
                    onClick={() => removeArrayItem(`${basePath}.data.skills`, idx)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.skills`, { name: '', level: 'Advanced' })}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        // Comma Separated
        if (data.variantId === 'skill-inline') {
          return (
            <InlineEditableText
              path={`${basePath}.data.skills`}
              value={Array.isArray(data.skills) ? data.skills.map(s => typeof s === 'string' ? s : s.name).join(', ') : typeof data.skills === 'string' ? data.skills : ''}
              multiline
              placeholder="JavaScript, React, TypeScript, Node.js, etc."
              className="text-sm leading-relaxed"
              onCustomUpdate={createFieldUpdater(`${basePath}.data.skills`)}
            />
          );
        }

        // Grouped Categories
        if (data.variantId === 'skill-grouped') {
          const skillGroups = data.skillGroups || [];
          return (
            <div className="space-y-3">
              {skillGroups.map((group: any, idx: number) => (
                <div key={idx} className="border-l-2 pl-3" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.skillGroups[${idx}].category`}
                    value={group.category}
                    placeholder="Category"
                    className="font-semibold text-sm block mb-1"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skillGroups[${idx}].category`)}
                  />
                  <div className="relative">
                    <InlineEditableText
                      path={`${basePath}.data.skillGroups[${idx}].__skillsString`}
                      value={Array.isArray(group.skills) ? group.skills.join(', ') : group.skills}
                      placeholder="Skill1, Skill2, Skill3"
                      className="text-sm text-muted-foreground"
                      onCustomUpdate={(newValue) => {
                        // Convert comma-separated string back to array
                        const skillsArray = newValue.split(',').map((s: string) => s.trim()).filter((s: string) => s);
                        updateField(`${basePath}.data.skillGroups[${idx}].skills`, skillsArray);
                      }}
                    />
                  </div>
                  <button
                    onClick={() => removeArrayItem(`${basePath}.data.skillGroups`, idx)}
                    className="text-xs text-destructive hover:text-destructive/80 mt-1"
                  >
                    Remove group
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.skillGroups`, {
                    category: '',
                    skills: [],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Category
              </Button>
            </div>
          );
        }

        // Skill Bars
        if (data.variantId === 'skill-bars') {
          const skills = data.skills || [];
          return (
            <div className="space-y-3">
              {skills.map((skill: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <InlineEditableText
                      path={`${basePath}.data.skills[${idx}].name`}
                      value={skill.name}
                      placeholder="Skill name"
                      className="text-sm flex-1"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}].name`)}
                    />
                    <InlineEditableText
                      path={`${basePath}.data.skills[${idx}].level`}
                      value={skill.level}
                      placeholder="90"
                      className="text-xs text-muted-foreground w-12"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}].level`)}
                    />
                    <button
                      onClick={() => removeArrayItem(`${basePath}.data.skills`, idx)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: themeColor,
                        width: `${skill.level}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.skills`, { name: '', level: 80 })}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        // Grid Layout
        if (data.variantId === 'skill-grid') {
          const skills = data.skills || [];
          return (
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-sm">•</span>
                  <InlineEditableText
                    path={`${basePath}.data.skills[${idx}]`}
                    value={skill}
                    placeholder="Skill"
                    className="text-sm flex-1"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}]`)}
                  />
                  <button
                    onClick={() => removeArrayItem(`${basePath}.data.skills`, idx)}
                    className="text-xs text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.skills`, '')}
                className="col-span-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        // Star Rating
        if (data.variantId === 'skill-rating') {
          const skills = data.skills || [];
          return (
            <div className="space-y-2">
              {skills.map((skill: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <InlineEditableText
                    path={`${basePath}.data.skills[${idx}].name`}
                    value={skill.name}
                    placeholder="Skill name"
                    className="text-sm flex-1"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}].name`)}
                  />
                  <div className="flex items-center gap-2">
                    <InlineEditableText
                      path={`${basePath}.data.skills[${idx}].rating`}
                      value={skill.rating || 4}
                      placeholder="4"
                      className="text-xs text-muted-foreground w-8"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}].rating`)}
                    />
                    <span className="text-xs text-muted-foreground">/ 5</span>
                    <button
                      onClick={() => removeArrayItem(`${basePath}.data.skills`, idx)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.skills`, { name: '', rating: 4 })}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        // Two-Column Split
        if (data.variantId === 'skill-two-column') {
          const technical = data.technical || [];
          const soft = data.soft || [];
          return (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-2" style={{ color: themeColor }}>Technical</h4>
                <div className="space-y-1">
                  {technical.map((skill: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-sm">•</span>
                      <InlineEditableText
                        path={`${basePath}.data.technical[${idx}]`}
                        value={skill}
                        placeholder="Technical skill"
                        className="text-sm flex-1"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.technical[${idx}]`)}
                      />
                      <button
                        onClick={() => removeArrayItem(`${basePath}.data.technical`, idx)}
                        className="text-xs text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(`${basePath}.data.technical`, '')}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2" style={{ color: themeColor }}>Soft Skills</h4>
                <div className="space-y-1">
                  {soft.map((skill: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-sm">•</span>
                      <InlineEditableText
                        path={`${basePath}.data.soft[${idx}]`}
                        value={skill}
                        placeholder="Soft skill"
                        className="text-sm flex-1"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.soft[${idx}]`)}
                      />
                      <button
                        onClick={() => removeArrayItem(`${basePath}.data.soft`, idx)}
                        className="text-xs text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(`${basePath}.data.soft`, '')}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          );
        }

        // Minimal List
        if (data.variantId === 'skill-minimal') {
          const skills = data.skills || [];
          return (
            <div className="space-y-1">
              {skills.map((skill: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-sm">•</span>
                  <InlineEditableText
                    path={`${basePath}.data.skills[${idx}]`}
                    value={skill}
                    placeholder="Skill"
                    className="text-sm flex-1"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}]`)}
                  />
                  <button
                    onClick={() => removeArrayItem(`${basePath}.data.skills`, idx)}
                    className="text-xs text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.skills`, '')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        // Skill Badges
        if (data.variantId === 'skill-badges') {
          const skills = data.skills || [];
          return (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, idx: number) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded border flex items-center gap-2"
                  style={{ borderColor: `${themeColor}50` }}
                >
                  <InlineEditableText
                    path={`${basePath}.data.skills[${idx}]`}
                    value={skill}
                    placeholder="Skill"
                    className="text-sm"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.skills[${idx}]`)}
                  />
                  <button
                    onClick={() => removeArrayItem(`${basePath}.data.skills`, idx)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(`${basePath}.data.skills`, '')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        // Legacy support for old data structure
        if (data.items) {
          return (
            <div className="flex flex-wrap gap-2">
              {data.items?.map((skill: any, idx: number) => (
                <div
                  key={skill.id}
                  className="px-3 py-1 rounded-full border flex items-center gap-2"
                  style={{ borderColor: themeColor }}
                >
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={skill.name}
                    placeholder="Skill"
                    className="text-sm"
                  />
                  <button
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    ×
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.items`, {
                    id: Date.now().toString(),
                    name: '',
                    level: 80,
                    category: 'core',
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </div>
          );
        }

        return <div className="text-sm text-muted-foreground">Add skills</div>;

      case 'certifications':
        // Classic List - traditional certification listing
        if (data.variantId === 'cert-classic' || !data.variantId) {
          return (
            <div className="space-y-3">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-semibold block mb-1"
                    placeholder="AWS Certified Solutions Architect"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].issuer`}
                    value={cert.issuer}
                    className="text-sm block mb-1"
                    placeholder="Amazon Web Services"
                    style={{ color: themeColor }}
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].date`}
                    value={formatDate(cert.date)}
                    className="text-sm text-muted-foreground block mb-1"
                    placeholder="2023"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                  />
                  {cert.credentialId && (
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].credentialId`}
                      value={cert.credentialId}
                      className="text-xs text-muted-foreground block"
                      placeholder="Credential ID: ABC123"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].credentialId`)}
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                    className="mt-2 text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(`${basePath}.data.items`, {
                    id: Date.now().toString(),
                    name: '',
                    issuer: '',
                    date: '',
                    credentialId: '',
                    url: '',
                  })
                }
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Certification
              </Button>
            </div>
          );
        }

        // Modern Card - card-based with issuer logos
        if (data.variantId === 'cert-modern') {
          return (
            <div className="space-y-3">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="border rounded-lg p-4 shadow-sm bg-gradient-to-r from-gray-50 to-white">
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-bold text-base block mb-2"
                    placeholder="AWS Solutions Architect"
                    style={{ color: themeColor }}
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].issuer`}
                    value={cert.issuer}
                    className="text-sm text-gray-600 block mb-1"
                    placeholder="Amazon Web Services"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].date`}
                    value={formatDate(cert.date)}
                    className="text-xs text-muted-foreground block"
                    placeholder="2023"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '', credentialId: '', url: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Minimal List - clean, simple format
        if (data.variantId === 'cert-minimal') {
          return (
            <div className="space-y-2">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="flex items-baseline gap-2">
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-medium"
                    placeholder="AWS Solutions Architect"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <span className="text-muted-foreground">-</span>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].issuer`}
                    value={cert.issuer}
                    className="text-sm text-muted-foreground"
                    placeholder="AWS"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].date`}
                    value={formatDate(cert.date)}
                    className="text-sm text-muted-foreground ml-auto"
                    placeholder="2023"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                  />
                  <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive hover:text-destructive/80">×</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Detailed Format - includes credential ID and expiry
        if (data.variantId === 'cert-detailed') {
          return (
            <div className="space-y-4">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-bold text-base block mb-1"
                    placeholder="AWS Certified Solutions Architect"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].issuer`}
                    value={cert.issuer}
                    className="text-sm block mb-2"
                    placeholder="Amazon Web Services"
                    style={{ color: themeColor }}
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                  />
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Issued: </span>
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].date`}
                        value={formatDate(cert.date)}
                        className="inline"
                        placeholder="2023"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                      />
                    </div>
                    {cert.expiryDate && (
                      <div>
                        <span className="font-medium">Expires: </span>
                        <InlineEditableText
                          path={`${basePath}.data.items[${idx}].expiryDate`}
                          value={formatDate(cert.expiryDate)}
                          className="inline"
                          placeholder="2026"
                          onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].expiryDate`)}
                        />
                      </div>
                    )}
                  </div>
                  {cert.credentialId && (
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium">Credential ID: </span>
                      <InlineEditableText
                        path={`${basePath}.data.items[${idx}].credentialId`}
                        value={cert.credentialId}
                        className="inline"
                        placeholder="ABC123XYZ"
                        onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].credentialId`)}
                      />
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '', credentialId: '', expiryDate: '', url: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Timeline View - chronological timeline
        if (data.variantId === 'cert-timeline') {
          return (
            <div className="space-y-3 relative pl-6">
              <div className="absolute left-2 top-2 bottom-2 w-0.5" style={{ backgroundColor: themeColor }}></div>
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-semibold block"
                    placeholder="AWS Solutions Architect"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].issuer`}
                    value={cert.issuer}
                    className="text-sm block"
                    placeholder="AWS"
                    style={{ color: themeColor }}
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].date`}
                    value={formatDate(cert.date)}
                    className="text-xs text-muted-foreground block"
                    placeholder="2023"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                  />
                  <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive hover:text-destructive/80 mt-1">Remove</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Grouped by Provider
        if (data.variantId === 'cert-grouped') {
          // Group certifications by issuer
          const grouped = (data.items || []).reduce((acc: any, cert: any) => {
            const issuer = cert.issuer || 'Other';
            if (!acc[issuer]) acc[issuer] = [];
            acc[issuer].push(cert);
            return acc;
          }, {});

          return (
            <div className="space-y-4">
              {Object.entries(grouped).map(([issuer, certs]: [string, any]) => (
                <div key={issuer}>
                  <h4 className="font-semibold mb-2" style={{ color: themeColor }}>{issuer}</h4>
                  <div className="space-y-1 pl-4">
                    {certs.map((cert: any, idx: number) => {
                      const globalIdx = data.items?.findIndex((c: any) => c.id === cert.id) ?? 0;
                      return (
                        <div key={cert.id} className="flex items-baseline gap-2">
                          <InlineEditableText
                            path={`${basePath}.data.items[${globalIdx}].name`}
                            value={cert.name}
                            className="flex-1"
                            placeholder="Solutions Architect"
                            onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${globalIdx}].name`)}
                          />
                          <InlineEditableText
                            path={`${basePath}.data.items[${globalIdx}].date`}
                            value={formatDate(cert.date)}
                            className="text-sm text-muted-foreground"
                            placeholder="2023"
                            onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${globalIdx}].date`)}
                          />
                          <button onClick={() => removeArrayItem(`${basePath}.data.items`, globalIdx)} className="text-xs text-destructive hover:text-destructive/80">×</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Badge Style - visual badges for each cert
        if (data.variantId === 'cert-badges') {
          return (
            <div className="flex flex-wrap gap-3">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="border-2 rounded-lg p-3 min-w-[200px]" style={{ borderColor: themeColor }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-bold text-sm block mb-1"
                    placeholder="AWS Solutions Architect"
                    style={{ color: themeColor }}
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].issuer`}
                    value={cert.issuer}
                    className="text-xs text-muted-foreground block mb-1"
                    placeholder="AWS"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].date`}
                    value={formatDate(cert.date)}
                    className="text-xs text-muted-foreground block"
                    placeholder="2023"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                  />
                  <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive hover:text-destructive/80 mt-1">Remove</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Compact List - space-efficient format
        if (data.variantId === 'cert-compact') {
          return (
            <div className="space-y-1">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="flex items-center gap-2 text-sm">
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-medium flex-1"
                    placeholder="AWS Solutions Architect"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].date`}
                    value={formatDate(cert.date)}
                    className="text-xs text-muted-foreground"
                    placeholder="2023"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                  />
                  <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive hover:text-destructive/80">×</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Two-Column Layout - cert and issuer in columns
        if (data.variantId === 'cert-two-column') {
          return (
            <div className="space-y-2">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="grid grid-cols-2 gap-4 items-start">
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-semibold"
                    placeholder="AWS Solutions Architect"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <div>
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].issuer`}
                      value={cert.issuer}
                      className="text-sm block"
                      placeholder="Amazon Web Services"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                    />
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].date`}
                      value={formatDate(cert.date)}
                      className="text-xs text-muted-foreground block"
                      placeholder="2023"
                      onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                    />
                    <button onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="text-xs text-destructive hover:text-destructive/80 mt-1">Remove</button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Boxed Format - each cert in bordered box
        if (data.variantId === 'cert-boxed') {
          return (
            <div className="space-y-3">
              {data.items?.map((cert, idx) => (
                <div key={cert.id} className="border-2 rounded p-3" style={{ borderColor: themeColor + '40' }}>
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].name`}
                    value={cert.name}
                    className="font-bold block mb-1"
                    placeholder="AWS Certified Solutions Architect"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].issuer`}
                    value={cert.issuer}
                    className="text-sm block mb-1"
                    placeholder="Amazon Web Services"
                    style={{ color: themeColor }}
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                  />
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].date`}
                    value={formatDate(cert.date)}
                    className="text-sm text-muted-foreground block"
                    placeholder="2023"
                    onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem(`${basePath}.data.items`, idx)} className="mt-2 text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addArrayItem(`${basePath}.data.items`, { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
          );
        }

        // Default fallback
        return (
          <div className="space-y-3">
            {data.items?.map((cert, idx) => (
              <div key={cert.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].name`}
                  value={cert.name}
                  className="font-semibold block mb-1"
                  placeholder="Certification Name"
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].name`)}
                />
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].issuer`}
                  value={cert.issuer}
                  className="text-sm block mb-1"
                  placeholder="Issuing Organization"
                  style={{ color: themeColor }}
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].issuer`)}
                />
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].date`}
                  value={formatDate(cert.date)}
                  className="text-sm text-muted-foreground block"
                  placeholder="Date"
                  onCustomUpdate={createFieldUpdater(`${basePath}.data.items[${idx}].date`)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                  className="mt-2 text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem(`${basePath}.data.items`, {
                  id: Date.now().toString(),
                  name: '',
                  issuer: '',
                  date: '',
                  credentialId: '',
                  url: '',
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Certification
            </Button>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            {data.items?.map((project, idx) => (
              <div key={project.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].name`}
                  value={project.name}
                  className="font-semibold text-lg block mb-1"
                  placeholder="Project Name"
                />
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].description`}
                  value={project.description}
                  multiline
                  placeholder="Project description..."
                  className="text-sm block mb-2"
                />
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.techStack.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(`${basePath}.data.items`, idx)}
                  className="mt-2 text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem(`${basePath}.data.items`, {
                  id: Date.now().toString(),
                  name: '',
                  description: '',
                  techStack: [],
                  url: '',
                  githubUrl: '',
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </div>
        );

      // Helper sections - render with variant support
      case 'languages':
      case 'awards':
      case 'publications':
      case 'volunteer':
      case 'speaking':
      case 'patents':
      case 'portfolio':
        if (!data.items || data.items.length === 0) {
          return (
            <div className="text-sm text-muted-foreground italic">
              No items yet - Click "Add {section.type}" button below
            </div>
          );
        }
        // Render actual content using variant renderer
        // Import and use HelperSectionVariantRenderer at the top of the file
        return (
          <div className="text-sm">
            {renderHelperSectionItems(section.type, data.items)}
          </div>
        );

      case 'custom':
        return (
          <InlineEditableText
            path={`${basePath}.data.content`}
            value={typeof data.content === 'string' ? data.content : Array.isArray(data.content) ? data.content.join('\n') : ''}
            multiline
            placeholder="Add your custom content..."
            className="block text-sm"
          />
        );

      default:
        return <div className="text-sm text-muted-foreground">Content goes here</div>;
    }
  };

  return (
    <div className="group relative">
      <div className="flex items-start gap-2 mb-2">
        <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing pt-1">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 relative">
          {/* Section Title - with its own hover group for title controls */}
          <div className="group/title relative flex items-center justify-between mb-3">
            {/* Floating Title Controls - Appears on title hover only */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover/title:opacity-100 transition-all duration-200 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1.5">
              {/* Case Toggle Buttons */}
              <button
                onClick={() => handleTitleCaseChange('title')}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  titleCase === 'title'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Title Case"
              >
                Aa
              </button>
              <button
                onClick={() => handleTitleCaseChange('upper')}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  titleCase === 'upper'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="UPPERCASE"
              >
                AA
              </button>
              <button
                onClick={() => handleTitleCaseChange('lower')}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  titleCase === 'lower'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="lowercase"
              >
                aa
              </button>

              {/* Separator */}
              <div className="w-px h-5 bg-gray-300 mx-1" />

              {/* Title Alignment Buttons */}
              <button
                onClick={() => handleTitleAlignmentChange('left')}
                className={`p-1.5 rounded border transition-colors ${
                  titleAlignment === 'left'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Align Left"
              >
                <AlignLeft className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleTitleAlignmentChange('center')}
                className={`p-1.5 rounded border transition-colors ${
                  titleAlignment === 'center'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Align Center"
              >
                <AlignCenter className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleTitleAlignmentChange('right')}
                className={`p-1.5 rounded border transition-colors ${
                  titleAlignment === 'right'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
                title="Align Right"
              >
                <AlignRight className="h-3 w-3" />
              </button>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <div style={{ color: themeColor, textAlign: titleAlignment, width: '100%' }}>
                <InlineEditableText
                  path={`${basePath}.title`}
                  value={displayTitle}
                  className="font-bold text-lg tracking-wide block"
                  placeholder="Section Title"
                  onCustomUpdate={createFieldUpdater(`${basePath}.title`)}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(section.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
