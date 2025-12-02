import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import type { AwardItem } from '@/types/resume';

interface AwardsEditorProps {
  items: AwardItem[];
  onChange: (items: AwardItem[]) => void;
}

export function AwardsEditor({ items, onChange }: AwardsEditorProps) {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id || null);

  const addAward = () => {
    const newAward: AwardItem = {
      id: `award-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
    };
    onChange([...items, newAward]);
    setExpanded(newAward.id);
  };

  const updateAward = (id: string, field: keyof AwardItem, value: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeAward = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
    if (expanded === id) setExpanded(null);
  };

  return (
    <div className="space-y-4">
      {items.map((award) => (
        <Card key={award.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setExpanded(expanded === award.id ? null : award.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary transition-colors"
              >
                {award.title || 'Untitled Award'}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAward(award.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            {expanded === award.id && (
              <div className="space-y-3 pt-2 border-t">
                <div>
                  <Label>Award Title *</Label>
                  <Input
                    value={award.title}
                    onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                    placeholder="Employee of the Year"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Issuer *</Label>
                    <Input
                      value={award.issuer}
                      onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <Label>Date *</Label>
                    <Input
                      type="month"
                      value={award.date}
                      onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={award.description || ''}
                    onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                    placeholder="Recognized for outstanding performance..."
                    rows={2}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Button onClick={addAward} variant="outline" className="w-full" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Award
      </Button>
    </div>
  );
}
