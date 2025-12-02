import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SkillRatingProps {
  rating?: string;
  size?: "sm" | "md" | "lg";
  editable?: boolean;
  onChange?: (rating: string) => void;
  placeholder?: string;
  className?: string;
}

export const SkillRating = ({
  rating = "",
  size = "sm",
  editable = false,
  onChange,
  placeholder = "Add rating...",
  className,
}: SkillRatingProps) => {
  const sizeClasses = {
    sm: "h-6 text-xs px-2",
    md: "h-7 text-sm px-3", 
    lg: "h-8 text-base px-4"
  };

  if (editable) {
    return (
      <Input
        value={rating}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          sizeClasses[size],
          "w-24 border-gray-300 focus:border-primary",
          className
        )}
      />
    );
  }

  if (rating) {
    return (
      <span className={cn(
        "text-gray-600 text-xs font-medium",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        size === "lg" && "text-base",
        className
      )}>
        {rating}
      </span>
    );
  }

  return null;
};
