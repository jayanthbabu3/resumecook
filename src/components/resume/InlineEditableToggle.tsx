import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface InlineEditableToggleProps {
  path: string;
  value?: boolean;
  className?: string;
  label?: string;
  onToggle?: (value: boolean) => void;
  editable?: boolean;
}

export const InlineEditableToggle = ({
  path,
  value = false,
  className,
  label = "Current",
  onToggle,
  editable = true,
}: InlineEditableToggleProps) => {
  const { updateField } = useInlineEdit();
  const resolvedPath = path.replace(/^resumeData\./, "");
  const canEdit = editable && Boolean(resolvedPath);

  const handleToggle = (checked: boolean) => {
    if (!canEdit) return;

    // Update the field
    updateField(resolvedPath, checked);

    // Also clear endDate if setting current to true
    if (checked) {
      const endDatePath = resolvedPath.replace(/\.current$/, '.endDate');
      updateField(endDatePath, '');
    }

    // Call optional callback
    onToggle?.(checked);
  };

  if (!canEdit) {
    return null; // Don't show toggle if not editable
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Switch
        id={`toggle-${resolvedPath}`}
        checked={value}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary h-4 w-8"
      />
      <label
        htmlFor={`toggle-${resolvedPath}`}
        className="text-xs text-gray-600 cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  );
};