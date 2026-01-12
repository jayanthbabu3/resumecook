import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus, Search, Tag } from 'lucide-react';
import type { SkillItem } from '@/types/resume';

interface SkillsEditorProps {
  items: SkillItem[];
  onChange: (items: SkillItem[]) => void;
}

export function SkillsEditor({ items, onChange }: SkillsEditorProps) {
  const [skillInput, setSkillInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const skillSuggestions = [
    // Frontend
    { name: "React", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Angular", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },

    // Backend
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Java", category: "Backend" },
    { name: "C#", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Spring Boot", category: "Backend" },

    // Database
    { name: "SQL", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Database" },

    // Tools
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "AWS", category: "Tools" },
    { name: "Kubernetes", category: "Tools" },
  ];

  const filteredSuggestions = skillSuggestions.filter(skill =>
    skill.name.toLowerCase().includes(skillInput.toLowerCase()) &&
    !items.some(existingSkill => existingSkill.name.toLowerCase() === skill.name.toLowerCase())
  );

  const handleAddSkill = () => {
    const skillName = skillInput.trim();
    if (skillName && !items.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      const newSkill: SkillItem = {
        id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: skillName,
        category: 'core',
      };
      onChange([...items, newSkill]);
      setSkillInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSuggestionClick = (skillName: string) => {
    setSkillInput(skillName);
    setShowSuggestions(false);
    setTimeout(() => handleAddSkill(), 100);
  };

  const removeSkill = (id: string) => {
    onChange(items.filter((skill) => skill.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Skill Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={skillInput}
            onChange={(e) => {
              setSkillInput(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowSuggestions(skillInput.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search and add skills..."
            className="pl-10 pr-12 h-11"
          />
          <Button
            onClick={handleAddSkill}
            disabled={!skillInput.trim()}
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">
                Suggestions ({filteredSuggestions.length})
              </div>
              <div className="space-y-1">
                {filteredSuggestions.slice(0, 8).map((skill) => (
                  <button
                    key={skill.name}
                    onClick={() => handleSuggestionClick(skill.name)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {skill.category}
                      </span>
                    </div>
                    <Plus className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Skills Tags */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Added Skills ({items.length})
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange([])}
              className="text-xs text-muted-foreground hover:text-destructive h-7"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <div
                key={skill.id}
                className="group inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
              >
                <span className="truncate max-w-[120px]">{skill.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skill.id)}
                  className="h-4 w-4 p-0 hover:bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-6 text-sm text-muted-foreground">
          No skills added yet. Start typing above to add skills.
        </div>
      )}
    </div>
  );
}
