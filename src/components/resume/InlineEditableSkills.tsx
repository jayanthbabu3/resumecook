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
  path?: string;
  field?: string; // legacy prop name
  skills: Skill[] | string[];
  className?: string;
  renderSkill?: (skill: Skill, index: number) => React.ReactNode;
  editable?: boolean;
  themeColor?: string;
}

export const InlineEditableSkills = ({
  path,
  field,
  skills,
  className,
  renderSkill,
  editable = true,
  themeColor,
}: InlineEditableSkillsProps) => {
  const resolvedPath = (path ?? field)?.replace(/^resumeData\./, "");
  const canMutate = editable && Boolean(resolvedPath);
  const { updateField, addArrayItem, removeArrayItem } = useInlineEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const normalizedSkills: Skill[] = Array.isArray(skills)
    ? skills.map((skill, idx) =>
        typeof skill === "string"
          ? { id: `skill-${idx}`, name: skill }
          : { id: skill.id || `skill-${idx}`, name: skill.name, level: skill.level, category: skill.category }
      )
    : [];

  const handleEdit = (index: number, currentName: string) => {
    if (!canMutate) return;
    setEditingIndex(index);
    setEditValue(currentName);
    setIsEditing(true);
  };

  const handleSave = (index: number) => {
    if (!canMutate) return;
    if (editValue.trim()) {
      updateField(`${resolvedPath}[${index}].name`, editValue.trim());
    }
    setEditingIndex(null);
    setEditValue("");
    setIsEditing(false);
  };

  const handleDelete = (index: number) => {
    if (!canMutate) return;
    removeArrayItem(resolvedPath, index);
  };

  const handleAdd = () => {
    if (!canMutate) return;
    addArrayItem(resolvedPath, { name: "New Skill", id: Date.now().toString() });
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="flex flex-wrap gap-2 items-center">
        {normalizedSkills.map((skill, index) => (
          <div key={skill.id || index} className="relative">
            {canMutate && isEditing && editingIndex === index ? (
              <div className="flex items-center gap-1">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave(index);
                    if (e.key === "Escape") {
                      setEditingIndex(null);
                      setIsEditing(false);
                    }
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
                  onClick={() => {
                    setEditingIndex(null);
                    setIsEditing(false);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : renderSkill ? (
              <div className="group/badge relative inline-flex items-center">
                {renderSkill(skill, index)}
                {canMutate && (
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
                )}
              </div>
            ) : (
              <Badge
                variant="secondary"
                style={themeColor ? { backgroundColor: `${themeColor}20`, color: themeColor } : undefined}
                className={cn(
                  "group/badge",
                  canMutate ? "cursor-pointer hover:bg-secondary/80 transition-colors pr-1" : "pr-1"
                )}
              >
                <span className="mr-1">{skill.name}</span>
                {canMutate && (
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
                )}
              </Badge>
            )}
          </div>
        ))}
        {canMutate && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 border-dashed"
            onClick={handleAdd}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Skill
          </Button>
        )}
      </div>
    </div>
  );
};
