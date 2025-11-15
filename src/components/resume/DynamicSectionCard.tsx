import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  GripVertical,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Edit2,
  Check,
  X,
} from 'lucide-react';
import type { ResumeSection } from '@/types/resume';
import { SECTION_ICONS } from '@/constants/helperSections';
import {
  CertificationsEditor,
  LanguagesEditor,
  ProjectsEditor,
  AwardsEditor,
  VolunteerEditor,
  PortfolioEditor,
  ExperienceEditor,
  EducationEditor,
  SkillsEditor,
} from './sections';

interface DynamicSectionCardProps {
  section: ResumeSection;
  onUpdate: (id: string, updates: Partial<ResumeSection>) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function DynamicSectionCard({
  section,
  onUpdate,
  onRemove,
  onToggle,
}: DynamicSectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(section.title);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveTitle = () => {
    if (titleInput.trim()) {
      onUpdate(section.id, { title: titleInput.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setTitleInput(section.title);
    setIsEditingTitle(false);
  };

  const renderEditor = () => {
    switch (section.data.type) {
      case 'summary':
        return (
          <div>
            <Label>Professional Summary</Label>
            <Textarea
              value={typeof section.data.content === 'string' ? section.data.content : section.data.content.join('\n')}
              onChange={(e) => onUpdate(section.id, { data: { ...section.data, content: e.target.value } })}
              placeholder="Write a compelling summary of your professional experience and goals..."
              rows={4}
              className="mt-2"
            />
          </div>
        );

      case 'experience':
        return section.data.type === 'experience' ? (
          <ExperienceEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'education':
        return section.data.type === 'education' ? (
          <EducationEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'skills':
        return section.data.type === 'skills' && section.data.items ? (
          <SkillsEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'certifications':
        return section.data.type === 'certifications' ? (
          <CertificationsEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'languages':
        return section.data.type === 'languages' ? (
          <LanguagesEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'projects':
        return section.data.type === 'projects' ? (
          <ProjectsEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'awards':
        return section.data.type === 'awards' ? (
          <AwardsEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'volunteer':
        return section.data.type === 'volunteer' ? (
          <VolunteerEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'portfolio':
        return section.data.type === 'portfolio' ? (
          <PortfolioEditor
            items={section.data.items}
            onChange={(items) => onUpdate(section.id, { data: { ...section.data, items } })}
          />
        ) : null;

      case 'custom':
        return section.data.type === 'custom' ? (
          <div>
            <Label>Content</Label>
            <Textarea
              value={section.data.content}
              onChange={(e) => onUpdate(section.id, { data: { ...section.data, content: e.target.value } })}
              placeholder="Enter your custom section content..."
              rows={4}
              className="mt-2"
            />
          </div>
        ) : null;

      default:
        return <div className="text-sm text-gray-500">No editor available for this section type</div>;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={`overflow-hidden transition-all ${
          isDragging ? 'shadow-xl ring-2 ring-primary/50' : ''
        } ${!section.enabled ? 'opacity-60' : ''}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white border-b p-4">
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <button
              {...listeners}
              {...attributes}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
            </button>

            {/* Icon */}
            <span className="text-2xl">{SECTION_ICONS[section.type]}</span>

            {/* Title */}
            <div className="flex-1 min-w-0">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveTitle();
                      if (e.key === 'Escape') handleCancelTitle();
                    }}
                    className="h-8 text-sm font-semibold"
                    autoFocus
                  />
                  <Button size="sm" variant="ghost" onClick={handleSaveTitle} className="h-7 w-7 p-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleCancelTitle} className="h-7 w-7 p-0">
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="font-semibold text-left hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  {section.title}
                  <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle(section.id)}
                className="h-8 w-8 p-0"
                title={section.enabled ? 'Hide section' : 'Show section'}
              >
                {section.enabled ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(section.id)}
                className="h-8 w-8 p-0"
                title="Remove section"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-4">
            {section.enabled ? (
              renderEditor()
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                This section is hidden. Click the eye icon to show it.
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
