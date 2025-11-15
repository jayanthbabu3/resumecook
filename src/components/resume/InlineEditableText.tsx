import { useState, useRef, useEffect } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { cn } from "@/lib/utils";

interface InlineEditableTextProps {
  path: string;
  value: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  onCustomUpdate?: (value: string) => void; // Custom update handler
}

export const InlineEditableText = ({
  path,
  value,
  className,
  multiline = false,
  placeholder = "Click to edit",
  as: Component = "span",
  style,
  onCustomUpdate,
}: InlineEditableTextProps) => {
  const { updateField } = useInlineEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsFocused(false);
    if (localValue !== value) {
      if (onCustomUpdate) {
        onCustomUpdate(localValue);
      } else {
        updateField(path, localValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setLocalValue(value);
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
        "w-full border-2 border-blue-500 bg-white px-2 py-1 outline-none rounded",
        className
      ),
      placeholder,
    };

    if (multiline) {
      return <textarea {...commonProps} rows={4} />;
    }

    return <input {...commonProps} type="text" />;
  }

  return (
    <Component
      onClick={handleClick}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={cn(
        "cursor-pointer transition-all rounded",
        isFocused && "bg-blue-50 outline outline-1 outline-blue-300",
        !value && "text-gray-400 italic",
        className
      )}
      style={style}
      title="Click to edit"
    >
      {value || placeholder}
    </Component>
  );
};
