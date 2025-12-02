import { useState, useRef, useEffect } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { cn } from "@/lib/utils";

interface InlineEditableDateProps {
  path?: string;
  field?: string; // legacy prop name
  value?: string;
  date?: string; // legacy prop name
  className?: string;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  formatDisplay?: (date: string) => string;
  editable?: boolean;
}

export const InlineEditableDate = ({
  path,
  field,
  value,
  date,
  className,
  placeholder = "Click to edit",
  as: Component = "span",
  style,
  formatDisplay,
  editable = true,
}: InlineEditableDateProps) => {
  const resolvedPath = (path ?? field)?.replace(/^resumeData\./, "");
  const resolvedValue = value ?? date ?? "";
  const canEdit = editable && Boolean(resolvedPath);
  const { updateField } = useInlineEdit();

  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(resolvedValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(resolvedValue);
  }, [resolvedValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = (e: React.MouseEvent) => {
    if (!canEdit) return;
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsFocused(false);
    if (!canEdit) return;
    if (localValue !== resolvedValue && resolvedPath) {
      updateField(resolvedPath, localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setLocalValue(resolvedValue);
      setIsEditing(false);
      setIsFocused(false);
    }
  };

  if (canEdit && isEditing) {
    return (
      <input
        ref={inputRef}
        type="month"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "border-2 border-blue-500 bg-white px-2 py-1 outline-none rounded",
          className
        )}
        placeholder={placeholder}
      />
    );
  }

  const displayValue = formatDisplay ? formatDisplay(resolvedValue) : resolvedValue;

  return (
    <Component
      onClick={handleClick}
      onMouseEnter={() => canEdit && setIsFocused(true)}
      onMouseLeave={() => canEdit && setIsFocused(false)}
      className={cn(
        canEdit ? "cursor-pointer" : "cursor-default",
        "transition-all rounded px-1",
        canEdit && isFocused && "bg-blue-50 outline outline-1 outline-blue-300",
        !resolvedValue && "text-gray-400 italic",
        className
      )}
      style={style}
      title={canEdit ? "Click to edit date" : undefined}
    >
      {displayValue || placeholder}
    </Component>
  );
};
