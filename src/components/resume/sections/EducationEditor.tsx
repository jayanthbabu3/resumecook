import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import type { EducationItem } from '@/types/resume';

interface EducationEditorProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export function EducationEditor({ items, onChange }: EducationEditorProps) {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id || null);

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    onChange([...items, newEdu]);
    setExpanded(newEdu.id);
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeEducation = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
    if (expanded === id) setExpanded(null);
  };

  return (
    <div className="space-y-4">
      {items.map((edu) => (
        <Card key={edu.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary transition-colors"
              >
                {edu.school || edu.degree || 'Untitled Education'}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            {expanded === edu.id && (
              <div className="space-y-3 pt-2 border-t">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label>School/University *</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                </div>
                <div>
                  <Label>Field of Study *</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Button onClick={addEducation} variant="outline" className="w-full" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
