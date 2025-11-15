import { useState } from 'react';
import type { ResumeSection } from '@/types/resume';
import { InlineEditableText } from './InlineEditableText';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2, Plus, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

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
  themeColor = '#7c3aed',
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
        return (
          <div className="space-y-4">
            {data.items?.map((exp, idx) => (
              <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].position`}
                  value={exp.position}
                  className="font-semibold text-lg block mb-1"
                  placeholder="Position Title"
                />
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].company`}
                  value={exp.company}
                  className="block mb-2"
                  placeholder="Company Name"
                  style={{ color: themeColor }}
                />
                <div className="text-sm text-muted-foreground mb-2">
                  <InlineEditableText
                    path={`${basePath}.data.items[${idx}].startDate`}
                    value={formatDate(exp.startDate)}
                    placeholder="Start Date"
                  />
                  {' - '}
                  {exp.current ? (
                    'Present'
                  ) : (
                    <InlineEditableText
                      path={`${basePath}.data.items[${idx}].endDate`}
                      value={formatDate(exp.endDate)}
                      placeholder="End Date"
                    />
                  )}
                </div>
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].description`}
                  value={exp.description}
                  multiline
                  placeholder="Job description..."
                  className="text-sm whitespace-pre-line"
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
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  current: false,
                  description: '',
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
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
        return (
          <div className="space-y-3">
            {data.items?.map((cert, idx) => (
              <div key={cert.id} className="border-l-2 pl-4" style={{ borderColor: themeColor }}>
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].name`}
                  value={cert.name}
                  className="font-semibold block mb-1"
                  placeholder="Certification Name"
                />
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].issuer`}
                  value={cert.issuer}
                  className="text-sm block mb-1"
                  placeholder="Issuing Organization"
                  style={{ color: themeColor }}
                />
                <InlineEditableText
                  path={`${basePath}.data.items[${idx}].date`}
                  value={formatDate(cert.date)}
                  className="text-sm text-muted-foreground block"
                  placeholder="Date"
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

      // Add more cases for other section types
      case 'languages':
      case 'awards':
      case 'publications':
      case 'volunteer':
      case 'speaking':
      case 'patents':
      case 'portfolio':
        return (
          <div className="text-sm text-muted-foreground">
            {data.items?.length || 0} items - Click to edit
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
