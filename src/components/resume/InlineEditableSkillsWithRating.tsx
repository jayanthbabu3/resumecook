import { useState } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, X, Check, Edit3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SkillRating } from "./SkillRating";

interface Skill {
  name: string;
  id: string;
  rating?: string;
  category?: "core" | "toolbox";
}

interface InlineEditableSkillsWithRatingProps {
  path?: string;
  field?: string; // legacy prop name
  skills: Skill[] | string[];
  className?: string;
  renderSkill?: (skill: Skill, index: number) => React.ReactNode;
  editable?: boolean;
  themeColor?: string;
  showRating?: boolean;
  allowRatingToggle?: boolean;
  verticalLayout?: boolean;
}

export const InlineEditableSkillsWithRating = ({
  path,
  field,
  skills,
  className,
  renderSkill,
  editable = true,
  themeColor,
  showRating = false,
  allowRatingToggle = true,
  verticalLayout = false,
}: InlineEditableSkillsWithRatingProps) => {
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
          : { id: skill.id || `skill-${idx}`, name: skill.name, rating: skill.rating, category: skill.category }
      )
    : [];

  const handleEdit = (index: number, currentName: string) => {
    setEditingIndex(index);
    setEditValue(currentName);
    setIsEditing(true);
  };

  const handleSave = (index: number) => {
    if (editValue.trim() && resolvedPath) {
      updateField(`${resolvedPath}[${index}].name`, editValue.trim());
    }
    setEditingIndex(null);
    setIsEditing(false);
    setEditValue("");
  };

  const handleDelete = (index: number) => {
    if (resolvedPath) {
      removeArrayItem(resolvedPath, index);
    }
  };

  const handleAdd = () => {
    if (resolvedPath) {
      addArrayItem(resolvedPath, {
        id: Date.now().toString(),
        name: "New Skill",
        rating: showRating ? "" : undefined,
        category: "core",
      });
    }
  };

  const handleRatingChange = (index: number, newRating: string) => {
    if (resolvedPath) {
      updateField(`${resolvedPath}[${index}].rating`, newRating.trim());
    }
  };

  const toggleRating = () => {
    if (!canMutate || !allowRatingToggle) return;
    
    const updatedSkills = normalizedSkills.map(skill => ({
      ...skill,
      rating: showRating ? undefined : "",
    }));
    
    if (resolvedPath) {
      updateField(resolvedPath, updatedSkills);
    }
  };

  if (verticalLayout && showRating) {
    // Vertical layout with ratings
    return (
      <div className={cn("space-y-3", className)}>
        {/* Rating Toggle */}
        {allowRatingToggle && canMutate && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Skill Ratings</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleRating}
              className="text-xs h-7 px-2"
            >
              <Edit3 className={cn("h-3 w-3 mr-1", showRating && "text-primary")} />
              {showRating ? "Hide Ratings" : "Show Ratings"}
            </Button>
          </div>
        )}

        {/* Skills List - Vertical */}
        <div className="space-y-2">
          {normalizedSkills.map((skill, index) => (
            <div key={skill.id} className="flex items-center gap-3 group">
              {isEditing && editingIndex === index ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave(index);
                      if (e.key === "Escape") {
                        setEditingIndex(null);
                        setIsEditing(false);
                        setEditValue("");
                      }
                    }}
                    className="h-8 text-sm flex-1"
                    placeholder="Skill name"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleSave(index)}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setEditingIndex(null);
                      setIsEditing(false);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    {renderSkill ? (
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
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm font-medium text-gray-900">
                          {skill.name}
                        </span>
                        {canMutate && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(index, skill.name);
                              }}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(index);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <SkillRating
                    rating={skill.rating}
                    size="sm"
                    editable={canMutate}
                    onChange={(newRating) => handleRatingChange(index, newRating)}
                    placeholder="Add rating..."
                    className="w-20"
                  />
                </>
              )}
            </div>
          ))}
          {canMutate && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 border-dashed w-full justify-start"
              onClick={handleAdd}
            >
              <Plus className="h-3 w-3 mr-2" />
              Add Skill
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Original horizontal layout
  return (
    <div className={cn("space-y-3", className)}>
      {/* Rating Toggle */}
      {allowRatingToggle && canMutate && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Skill Ratings</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleRating}
            className="text-xs h-7 px-2"
          >
            <Edit3 className={cn("h-3 w-3 mr-1", showRating && "text-primary")} />
            {showRating ? "Hide Ratings" : "Show Ratings"}
          </Button>
        </div>
      )}

      {/* Skills List - Horizontal */}
      <div className="flex flex-wrap gap-2">
        {normalizedSkills.map((skill, index) => (
          <div key={skill.id} className="relative">
            {isEditing && editingIndex === index ? (
              <div className="flex items-center gap-1">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave(index);
                    if (e.key === "Escape") {
                      setEditingIndex(null);
                      setIsEditing(false);
                      setEditValue("");
                    }
                  }}
                  className="h-7 text-sm"
                  placeholder="Skill name"
                  autoFocus
                />
                <Button
                  size="sm"
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
            ) : (
              <div className="group/badge relative">
                {renderSkill ? (
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
                      "group/badge flex items-center gap-2 px-3 py-1.5",
                      canMutate ? "cursor-pointer hover:bg-secondary/80 transition-colors pr-6" : "pr-2"
                    )}
                  >
                    <span>{skill.name}</span>
                    {showRating && skill.rating && (
                      <span className="text-xs text-gray-500">({skill.rating})</span>
                    )}
                    {canMutate && (
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 inline-flex gap-0.5 opacity-0 group-hover/badge:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-4 w-4 p-0"
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
                          className="h-4 w-4 p-0 text-destructive"
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
