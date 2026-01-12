import React from "react";
import { cn } from "@/lib/utils";

interface GridGuidesProps {
  columns?: number;
  active?: boolean;
}

export const GridGuides: React.FC<GridGuidesProps> = ({ columns = 12, active = false }) => {
  const lines = Array.from({ length: columns - 1 }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200",
        active && "opacity-100"
      )}
    >
      {lines.map((index) => (
        <div
          key={index}
          className="absolute top-0 bottom-0 w-px border-l border-dashed border-blue-400/60"
          style={{
            left: `${(index / columns) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};


