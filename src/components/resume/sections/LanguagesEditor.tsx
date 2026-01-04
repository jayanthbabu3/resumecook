import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { LanguageItem } from '@/types/resume';

interface LanguagesEditorProps {
  items: LanguageItem[];
  onChange: (items: LanguageItem[]) => void;
}

// Proficiency levels with dot counts for visual indicator
const PROFICIENCY_LEVELS = [
  { key: 'Native', dots: 5 },
  { key: 'Fluent', dots: 5 },
  { key: 'Professional', dots: 4 },
  { key: 'Advanced', dots: 4 },
  { key: 'Intermediate', dots: 3 },
  { key: 'Basic', dots: 2 },
  { key: 'Elementary', dots: 1 },
] as const;

// Helper to render proficiency dots
const ProficiencyDots = ({ level, accentColor = '#2563eb' }: { level: number; accentColor?: string }) => (
  <span className="flex gap-0.5 ml-2">
    {[1, 2, 3, 4, 5].map((d) => (
      <span
        key={d}
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: d <= level ? accentColor : '#e5e7eb',
          display: 'inline-block',
        }}
      />
    ))}
  </span>
);

export function LanguagesEditor({ items, onChange }: LanguagesEditorProps) {
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional',
    };
    onChange([...items, newLang]);
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: string) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeLanguage = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {items.map((lang) => (
        <Card key={lang.id} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label>Language *</Label>
                <Input
                  value={lang.language}
                  onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                  placeholder="English"
                />
              </div>

              <div className="flex-1">
                <Label>Proficiency *</Label>
                <Select
                  value={lang.proficiency}
                  onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}
                >
                  <SelectTrigger>
                    <div className="flex items-center justify-between w-full">
                      <SelectValue />
                      <ProficiencyDots level={PROFICIENCY_LEVELS.find(l => l.key === lang.proficiency)?.dots || 3} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {PROFICIENCY_LEVELS.map((level) => (
                      <SelectItem key={level.key} value={level.key}>
                        <div className="flex items-center justify-between w-full min-w-[140px]">
                          <span>{level.key}</span>
                          <ProficiencyDots level={level.dots} />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLanguage(lang.id)}
                className="h-8 w-8 p-0 mt-6"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addLanguage} variant="outline" className="w-full" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </Button>
    </div>
  );
}
