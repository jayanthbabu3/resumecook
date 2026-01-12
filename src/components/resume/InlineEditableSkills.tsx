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

export type SkillVariant = 
  | 'badge'      // Default - pill badges with theme color
  | 'pill'       // Rounded pills
  | 'tag'        // Square/rounded tags with borders
  | 'inline'     // Plain text with separators
  | 'list'       // Bullet list (vertical)
  | 'compact';   // Compact badges

interface InlineEditableSkillsProps {
  path?: string;
  field?: string; // legacy prop name
  skills: Skill[] | string[];
  className?: string;
  renderSkill?: (skill: Skill, index: number) => React.ReactNode;
  editable?: boolean;
  themeColor?: string;
  variant?: SkillVariant; // Visualization style
  separator?: 'bullet' | 'comma' | 'pipe'; // For 'inline' variant
  fontSize?: string; // Override font size
}

export const InlineEditableSkills = ({
  path,
  field,
  skills,
  className,
  renderSkill,
  editable = true,
  themeColor,
  variant = 'badge',
  separator = 'bullet',
  fontSize,
}: InlineEditableSkillsProps) => {
  const resolvedPath = (path ?? field)?.replace(/^resumeData\./, "") || "skills";
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

  // Render skill based on variant (returns just the skill element, no wrapper)
  const renderSkillByVariant = (skill: Skill, index: number) => {
    const skillFontSize = fontSize || '13px';
    
    switch (variant) {
      case 'pill':
        return (
          <Badge
            variant="secondary"
            style={{
              backgroundColor: themeColor ? `${themeColor}20` : undefined,
              color: themeColor || undefined,
              fontSize: skillFontSize,
              padding: '6px 16px',
              borderRadius: '9999px',
            }}
            className={cn(
              "group/badge",
              canMutate ? "cursor-pointer hover:bg-secondary/80 transition-colors" : ""
            )}
          >
            {skill.name}
          </Badge>
        );

      case 'tag': {
        const accentBorder = themeColor ? `${themeColor}33` : '#e5e7eb';
        return (
          <span
            className="px-3 py-1 rounded-md font-medium"
            style={{
              fontSize: skillFontSize,
              color: '#1a1a1a',
              border: `1px solid ${accentBorder}`,
              backgroundColor: themeColor ? `${themeColor}10` : '#f9fafb',
            }}
          >
            {skill.name}
          </span>
        );
      }

      case 'compact':
        return (
          <Badge
            variant="secondary"
            style={{
              backgroundColor: themeColor ? `${themeColor}20` : undefined,
              color: themeColor || undefined,
              fontSize: fontSize || '11px',
              padding: '4px 12px',
              borderRadius: '4px',
            }}
            className={cn(
              "group/badge",
              canMutate ? "cursor-pointer hover:bg-secondary/80 transition-colors" : ""
            )}
          >
            {skill.name}
          </Badge>
        );

      case 'badge':
      default:
        return (
          <Badge
            variant="secondary"
            style={{
              backgroundColor: themeColor ? `${themeColor}20` : undefined,
              color: themeColor || undefined,
              fontSize: skillFontSize,
            }}
            className={cn(
              "group/badge",
              canMutate ? "cursor-pointer hover:bg-secondary/80 transition-colors pr-1" : "pr-1"
            )}
          >
            <span className="mr-1">{skill.name}</span>
          </Badge>
        );
    }
  };

  // Handle inline variant differently (needs different container)
  if (variant === 'inline') {
    const separatorChar = separator === 'comma' ? ', ' : separator === 'pipe' ? ' | ' : ' • ';
    const skillFontSize = fontSize || '12px';
    
    return (
      <div className={cn("relative group", className)}>
        <div style={{ fontSize: skillFontSize, color: '#1a1a1a' }}>
          {normalizedSkills.map((skill, index) => (
            <span key={skill.id || index} className="group/skill inline">
              {canMutate && isEditing && editingIndex === index ? (
                <span className="inline-flex items-center gap-1">
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
                    className="h-6 w-24 text-xs inline"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0"
                    onClick={() => handleSave(index)}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0"
                    onClick={() => {
                      setEditingIndex(null);
                      setIsEditing(false);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              ) : (
                <span className="relative inline-flex items-center">
                  <span 
                    className={canMutate ? "cursor-pointer hover:bg-gray-100 rounded px-0.5 -mx-0.5 transition-colors" : ""}
                    onClick={() => canMutate && handleEdit(index, skill.name)}
                  >
                    {skill.name}
                  </span>
                  {canMutate && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                      className="ml-0.5 opacity-0 group-hover/skill:opacity-100 transition-opacity text-red-500 hover:text-red-700 inline-flex items-center"
                      title="Remove skill"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              )}
              {!isEditing || editingIndex !== index ? (index < normalizedSkills.length - 1 && separatorChar) : null}
            </span>
          ))}
        </div>
        {canMutate && (
          <button
            onClick={handleAdd}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: themeColor || '#2563eb', borderColor: themeColor || '#2563eb' }}
          >
            <Plus className="h-3 w-3" />
            Add Skill
          </button>
        )}
      </div>
    );
  }

  // Handle list variant differently (needs ul container)
  if (variant === 'list') {
    const skillFontSize = fontSize || '13px';
    
    return (
      <div className={cn("relative group", className)}>
        <ul className="ml-5 list-disc space-y-1">
          {normalizedSkills.map((skill, index) => (
            <li 
              key={skill.id || index} 
              className="group/item relative"
              style={{ fontSize: skillFontSize, color: '#1a1a1a' }}
            >
              {canMutate && isEditing && editingIndex === index ? (
                <div className="flex items-center gap-1 -ml-5">
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
                    className="h-7 w-48 text-xs"
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
              ) : (
                <>
                  <span 
                    className={canMutate ? "cursor-pointer hover:text-gray-600" : ""}
                    onClick={() => canMutate && handleEdit(index, skill.name)}
                  >
                    {skill.name}
                  </span>
                  {canMutate && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                      className="ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      title="Remove skill"
                    >
                      <X className="h-3 w-3 inline" />
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {canMutate && (
          <button
            onClick={handleAdd}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: themeColor || '#2563eb', borderColor: themeColor || '#2563eb' }}
          >
            <Plus className="h-3 w-3" />
            Add Skill
          </button>
        )}
      </div>
    );
  }

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
              <div className="group/badge relative inline-flex items-center">
                {renderSkillByVariant(skill, index)}
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
            )}
          </div>
        ))}
        {canMutate && (
          <button
            onClick={handleAdd}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: themeColor || '#2563eb', borderColor: themeColor || '#2563eb' }}
          >
            <Plus className="h-3 w-3" />
            Add Skill
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Helper component to render skills in non-editable mode with variant styling
 * Use this in templates to ensure consistency between editable and non-editable modes
 */
export const SkillsDisplay = ({
  skills,
  variant = 'badge',
  themeColor,
  separator = 'bullet',
  fontSize,
  className,
}: {
  skills: Skill[];
  variant?: SkillVariant;
  themeColor?: string;
  separator?: 'bullet' | 'comma' | 'pipe';
  fontSize?: string;
  className?: string;
}) => {
  const normalizedSkills: Skill[] = Array.isArray(skills)
    ? skills.map((skill, idx) =>
        typeof skill === "string"
          ? { id: `skill-${idx}`, name: skill }
          : { id: skill.id || `skill-${idx}`, name: skill.name }
      )
    : [];

  const skillFontSize = fontSize || '13px';

  if (variant === 'inline') {
    const separatorChar = separator === 'comma' ? ', ' : separator === 'pipe' ? ' | ' : ' • ';
    return (
      <p className={className} style={{ fontSize: skillFontSize, color: '#1a1a1a' }}>
        {normalizedSkills.map((skill, index) => (
          <span key={skill.id || index}>
            {skill.name}
            {index < normalizedSkills.length - 1 && separatorChar}
          </span>
        ))}
      </p>
    );
  }

  if (variant === 'list') {
    return (
      <ul className={cn("ml-5 list-disc space-y-1", className)}>
        {normalizedSkills.map((skill, index) => (
          <li key={skill.id || index} style={{ fontSize: skillFontSize, color: '#1a1a1a' }}>
            {skill.name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {normalizedSkills.map((skill, index) => {
        switch (variant) {
          case 'pill':
            return (
              <Badge
                key={skill.id || index}
                variant="secondary"
                style={{
                  backgroundColor: themeColor ? `${themeColor}20` : undefined,
                  color: themeColor || undefined,
                  fontSize: skillFontSize,
                  padding: '6px 16px',
                  borderRadius: '9999px',
                }}
              >
                {skill.name}
              </Badge>
            );

          case 'tag': {
            const accentBorder = themeColor ? `${themeColor}33` : '#e5e7eb';
            return (
              <span
                key={skill.id || index}
                className="px-3 py-1 rounded-md font-medium"
                style={{
                  fontSize: skillFontSize,
                  color: '#1a1a1a',
                  border: `1px solid ${accentBorder}`,
                  backgroundColor: themeColor ? `${themeColor}10` : '#f9fafb',
                }}
              >
                {skill.name}
              </span>
            );
          }

          case 'compact':
            return (
              <Badge
                key={skill.id || index}
                variant="secondary"
                style={{
                  backgroundColor: themeColor ? `${themeColor}20` : undefined,
                  color: themeColor || undefined,
                  fontSize: fontSize || '11px',
                  padding: '4px 12px',
                  borderRadius: '4px',
                }}
              >
                {skill.name}
              </Badge>
            );

          case 'badge':
          default:
            return (
              <Badge
                key={skill.id || index}
                variant="secondary"
                style={{
                  backgroundColor: themeColor ? `${themeColor}20` : undefined,
                  color: themeColor || undefined,
                  fontSize: skillFontSize,
                }}
              >
                {skill.name}
              </Badge>
            );
        }
      })}
    </div>
  );
};
