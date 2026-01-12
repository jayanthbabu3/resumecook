import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import type { VolunteerItem } from '@/types/resume';

interface VolunteerEditorProps {
  items: VolunteerItem[];
  onChange: (items: VolunteerItem[]) => void;
}

export function VolunteerEditor({ items, onChange }: VolunteerEditorProps) {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id || null);

  const addVolunteer = () => {
    const newVol: VolunteerItem = {
      id: `vol-${Date.now()}`,
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...items, newVol]);
    setExpanded(newVol.id);
  };

  const updateVolunteer = (id: string, field: keyof VolunteerItem, value: any) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeVolunteer = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
    if (expanded === id) setExpanded(null);
  };

  return (
    <div className="space-y-4">
      {items.map((vol) => (
        <Card key={vol.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setExpanded(expanded === vol.id ? null : vol.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary transition-colors"
              >
                {vol.role || 'Untitled Role'} {vol.organization && `at ${vol.organization}`}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeVolunteer(vol.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            {expanded === vol.id && (
              <div className="space-y-3 pt-2 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Organization *</Label>
                    <Input
                      value={vol.organization}
                      onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                      placeholder="Red Cross"
                    />
                  </div>

                  <div>
                    <Label>Role *</Label>
                    <Input
                      value={vol.role}
                      onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                      placeholder="Volunteer Coordinator"
                    />
                  </div>

                  <div>
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={vol.startDate}
                      onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>End Date *</Label>
                    <Input
                      type="month"
                      value={vol.endDate}
                      onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)}
                      disabled={vol.current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${vol.id}`}
                    checked={vol.current}
                    onCheckedChange={(checked) =>
                      updateVolunteer(vol.id, 'current', checked === true)
                    }
                  />
                  <label
                    htmlFor={`current-${vol.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Currently volunteering here
                  </label>
                </div>

                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={vol.description}
                    onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)}
                    placeholder="Organized community events and fundraising campaigns..."
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Button onClick={addVolunteer} variant="outline" className="w-full" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Volunteer Experience
      </Button>
    </div>
  );
}
