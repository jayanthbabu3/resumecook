import { useState, useRef, useEffect } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { cn } from "@/lib/utils";

interface InlineEditableTextProps {
  path?: string;
  field?: string; // legacy prop name
  value?: string;
  text?: string; // legacy prop name
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  onCustomUpdate?: (value: string) => void; // Custom update handler
  editable?: boolean;
}

export const InlineEditableText = ({
  path,
  field,
  value,
  text,
  className,
  multiline = false,
  placeholder = "Click to edit",
  as: Component = "span",
  style,
  onCustomUpdate,
  editable = true,
}: InlineEditableTextProps) => {
  const resolvedPath = (path ?? field)?.replace(/^resumeData\./, "");
  const resolvedValue = value ?? text ?? "";
  const canEdit = editable && Boolean(resolvedPath);
  const { updateField } = useInlineEdit();

  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(resolvedValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(resolvedValue);
  }, [resolvedValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
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

    if (localValue !== resolvedValue) {
      if (onCustomUpdate) {
        onCustomUpdate(localValue);
      } else if (resolvedPath) {
        updateField(resolvedPath, localValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setLocalValue(resolvedValue);
      setIsEditing(false);
      setIsFocused(false);
    }
  };

  if (isEditing) {
    const commonProps = {
      ref: inputRef as any,
      value: localValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setLocalValue(e.target.value),
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      className: cn(
        "w-full border-2 border-blue-500 bg-white text-gray-900 px-2 py-1 outline-none rounded",
        className
      ),
      placeholder,
      // Override any inherited color to ensure text is visible
      style: { color: '#1f2937' },
    };

    if (multiline) {
      return <textarea {...commonProps} rows={4} />;
    }

    return <input {...commonProps} type="text" />;
  }

  // In non-editable mode, don't show placeholder text
  if (!canEdit && !resolvedValue) {
    return null;
  }

  return (
    <Component
      onClick={handleClick}
      onMouseEnter={() => canEdit && setIsFocused(true)}
      onMouseLeave={() => canEdit && setIsFocused(false)}
      className={cn(
        canEdit ? "cursor-pointer" : "cursor-default",
        "transition-all rounded",
        canEdit && isFocused && "bg-blue-50 outline outline-1 outline-blue-300",
        !resolvedValue && "text-gray-400 italic",
        className
      )}
      style={style}
      title={canEdit ? "Click to edit" : undefined}
    >
      {resolvedValue || (canEdit ? placeholder : '')}
    </Component>
  );
};
