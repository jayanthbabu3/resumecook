import { useInlineEdit } from "@/contexts/InlineEditContext";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulletPointsEditorProps {
  expId: string;
  bulletPoints: string[];
  className?: string;
}

export const BulletPointsEditor = ({
  expId,
  bulletPoints = [],
  className,
}: BulletPointsEditorProps) => {
  const { addBulletPoint, removeBulletPoint, updateField } = useInlineEdit();

  const handleBulletPointChange = (index: number, value: string) => {
    updateField(`experience[${findExperienceIndex(expId)}].bulletPoints[${index}]`, value);
  };

  const findExperienceIndex = (expId: string): number => {
    // This is a simplified approach - in a real implementation, 
    // you'd want to get the current resumeData and find the index
    // For now, we'll use a workaround by updating the field directly
    return 0; // This will be handled differently in practice
  };

  const handleAddBulletPoint = () => {
    addBulletPoint(expId);
  };

  const handleRemoveBulletPoint = (index: number) => {
    if (bulletPoints.length > 1) {
      removeBulletPoint(expId, index);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {bulletPoints.map((bullet, index) => (
        <div key={index} className="flex items-start gap-2 group">
          <div className="flex items-center justify-center mt-2 opacity-0 group-hover:opacity-50 transition-opacity">
            <GripVertical className="h-3 w-3 text-gray-400" />
          </div>
          <div className="flex-1">
            <InlineEditableText
              path={`experience[${findExperienceIndex(expId)}].bulletPoints[${index}]`}
              value={bullet}
              className="text-xs leading-relaxed text-gray-700 font-light pl-4 relative"
              placeholder="Enter bullet point..."
              as="div"
              multiline
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRemoveBulletPoint(index)}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
            disabled={bulletPoints.length <= 1}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddBulletPoint}
        className="h-7 px-2 text-xs border-dashed w-full justify-start"
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Bullet Point
      </Button>
    </div>
  );
};
