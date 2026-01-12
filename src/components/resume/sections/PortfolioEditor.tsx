import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import type { PortfolioItem } from '@/types/resume';

interface PortfolioEditorProps {
  items: PortfolioItem[];
  onChange: (items: PortfolioItem[]) => void;
}

export function PortfolioEditor({ items, onChange }: PortfolioEditorProps) {
  const addPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: `portfolio-${Date.now()}`,
      platform: '',
      url: '',
    };
    onChange([...items, newItem]);
  };

  const updatePortfolioItem = (id: string, field: keyof PortfolioItem, value: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removePortfolioItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <Label>Platform *</Label>
                  <Input
                    value={item.platform}
                    onChange={(e) => updatePortfolioItem(item.id, 'platform', e.target.value)}
                    placeholder="GitHub, LinkedIn, etc."
                  />
                </div>

                <div>
                  <Label>
                    URL *
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    )}
                  </Label>
                  <Input
                    type="url"
                    value={item.url}
                    onChange={(e) => updatePortfolioItem(item.id, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePortfolioItem(item.id)}
                className="h-8 w-8 p-0 mt-6"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={item.description || ''}
                onChange={(e) => updatePortfolioItem(item.id, 'description', e.target.value)}
                placeholder="Brief description of your presence on this platform..."
                rows={2}
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addPortfolioItem} variant="outline" className="w-full" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Portfolio Link
      </Button>
    </div>
  );
}
