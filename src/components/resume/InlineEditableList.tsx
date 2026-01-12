import { useState } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InlineEditableListProps {
  items: any[];
  path?: string;
  field?: string;
  defaultItem?: any;
  renderItem?: (item: any, index: number) => React.ReactNode;
  addButtonLabel?: string;
  className?: string;
  editable?: boolean;
}

export const InlineEditableList = ({
  items,
  path,
  field,
  defaultItem,
  renderItem,
  addButtonLabel = "Add Item",
  className,
  editable = true,
}: InlineEditableListProps) => {
  const { addArrayItem, removeArrayItem, updateField } = useInlineEdit();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const safeItems = Array.isArray(items) ? items : [];
  const isAdvancedMode = typeof renderItem === "function" && Boolean(path);

  // Advanced mode: render-prop based list with add/remove via InlineEditContext arrays.
  if (isAdvancedMode) {
    return (
      <div className={cn("space-y-4", className)}>
        {safeItems.map((item, index) => (
          <div
            key={(item && item.id) || index}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {renderItem!(item, index)}

            {editable && hoveredIndex === index && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute -right-2 -top-2 h-6 w-6 p-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeArrayItem(path!, index);
                }}
                title="Delete"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}

        {editable && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              let itemToAdd = defaultItem;
              if (path === "education" && defaultItem && !defaultItem.gpa) {
                itemToAdd = { ...defaultItem, gpa: "" };
              }
              addArrayItem(path!, itemToAdd);
            }}
            className="w-full border-dashed"
          >
            <Plus className="mr-2 h-4 w-4" />
            {addButtonLabel}
          </Button>
        )}
      </div>
    );
  }

  // Simple/legacy mode: show a bullet list
  const stringItems = safeItems.map((item) =>
    item === null || item === undefined ? "" : String(item)
  );

  const fieldPath = (path || field)?.replace(/^resumeData\./, "");
  const canMutate = editable && Boolean(fieldPath);

  const updateList = (nextItems: string[]) => {
    if (!fieldPath) return;
    updateField(fieldPath, nextItems.join("\n"));
  };

  const handleItemUpdate = (index: number, value: string) => {
    const nextItems = [...stringItems];
    nextItems[index] = value;
    updateList(nextItems);
  };

  const handleAdd = () => {
    const value =
      typeof defaultItem === "string"
        ? defaultItem
        : typeof defaultItem === "number"
          ? String(defaultItem)
          : "New item";
    updateList([...stringItems, value]);
  };

  const handleRemove = (index: number) => {
    const nextItems = [...stringItems];
    nextItems.splice(index, 1);
    updateList(nextItems);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <ul className="list-disc list-inside space-y-1">
        {stringItems.map((item, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {canMutate ? (
              <InlineEditableText
                path={fieldPath || `inlineList.${index}`}
                value={item}
                onCustomUpdate={(val) => handleItemUpdate(index, val)}
                className="w-full"
                multiline={false}
                placeholder="List item"
              />
            ) : (
              <span>{item}</span>
            )}

            {canMutate && hoveredIndex === index && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute -left-7 top-0 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                title="Delete"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </li>
        ))}
      </ul>

      {canMutate && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          className="w-full border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" />
          {addButtonLabel}
        </Button>
      )}
    </div>
  );
};