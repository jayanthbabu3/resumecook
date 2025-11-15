import { useState } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  id: string;
  level?: number;
  category?: "core" | "toolbox";
}

interface InlineEditableSkillsProps {
  path: string;
  skills: Skill[];
  className?: string;
  renderSkill?: (skill: Skill, index: number) => React.ReactNode;
}

export const InlineEditableSkills = ({
  path,
  skills,
  className,
  renderSkill,
}: InlineEditableSkillsProps) => {
  const { updateField, addArrayItem, removeArrayItem } = useInlineEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (index: number, currentName: string) => {
    setEditingIndex(index);
    setEditValue(currentName);
  };

  const handleSave = (index: number) => {
    if (editValue.trim()) {
      updateField(`${path}[${index}].name`, editValue.trim());
    }
    setEditingIndex(null);
    setEditValue("");
  };

  const handleDelete = (index: number) => {
    removeArrayItem(path, index);
  };

  const handleAdd = () => {
    addArrayItem(path, { name: "New Skill", id: Date.now().toString() });
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="flex flex-wrap gap-2 items-center">
        {skills.map((skill, index) => (
          <div key={skill.id || index} className="relative">
            {editingIndex === index ? (
              <div className="flex items-center gap-1">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave(index);
                    if (e.key === "Escape") setEditingIndex(null);
                  }}
                  className="h-7 w-32 text-xs"
                  autoFocus
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => handleSave(index)}
                >
                  <Check className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => setEditingIndex(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : renderSkill ? (
              <div className="group/badge relative inline-flex items-center">
                {renderSkill(skill, index)}
                <div className="absolute -right-1 -top-1 inline-flex gap-0.5 opacity-0 group-hover/badge:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0 bg-background rounded-full shadow-sm border"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index, skill.name);
                    }}
                  >
                    <Pencil className="h-2.5 w-2.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0 bg-background rounded-full shadow-sm border text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <Badge
                variant="secondary"
                className="group/badge cursor-pointer hover:bg-secondary/80 transition-colors pr-1"
              >
                <span className="mr-1">{skill.name}</span>
                <div className="inline-flex gap-0.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 opacity-0 group-hover/badge:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index, skill.name);
                    }}
                  >
                    <Pencil className="h-2.5 w-2.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 opacity-0 group-hover/badge:opacity-100 transition-opacity text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </Badge>
            )}
          </div>
        ))}
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 border-dashed"
          onClick={handleAdd}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Skill
        </Button>
      </div>
    </div>
  );
};
