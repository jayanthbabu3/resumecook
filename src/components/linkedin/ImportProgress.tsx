import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2 } from "lucide-react";

export type ImportStage =
  | "connecting"
  | "fetching"
  | "parsing"
  | "building"
  | "complete";

interface ImportProgressProps {
  stage: ImportStage;
  className?: string;
}

const stages: { key: ImportStage; label: string }[] = [
  { key: "connecting", label: "Connecting to LinkedIn" },
  { key: "fetching", label: "Fetching profile data" },
  { key: "parsing", label: "Parsing your experience" },
  { key: "building", label: "Building your resume" },
];

function getStageIndex(stage: ImportStage): number {
  if (stage === "complete") return stages.length;
  return stages.findIndex((s) => s.key === stage);
}

/**
 * Import Progress Component
 *
 * Displays the current progress of LinkedIn import with animated stages.
 */
export function ImportProgress({ stage, className }: ImportProgressProps) {
  const currentIndex = getStageIndex(stage);
  const progressPercent =
    stage === "complete" ? 100 : Math.max(5, (currentIndex / stages.length) * 100 + 12);

  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0A66C2] to-[#0077B5] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
        {/* Shimmer effect */}
        {stage !== "complete" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        )}
      </div>

      {/* Stage list */}
      <div className="space-y-3">
        {stages.map((s, index) => {
          const isComplete = index < currentIndex || stage === "complete";
          const isCurrent = index === currentIndex && stage !== "complete";

          return (
            <div
              key={s.key}
              className={cn(
                "flex items-center gap-3 transition-all duration-300",
                isComplete && "text-[#0A66C2]",
                isCurrent && "text-gray-900",
                !isComplete && !isCurrent && "text-gray-400"
              )}
            >
              {/* Status icon */}
              <div className="flex-shrink-0 w-5 h-5">
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-[#0A66C2] animate-scale-in" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#0A66C2] animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-current opacity-40" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-sm font-medium transition-all duration-300",
                  isCurrent && "text-gray-900",
                  isComplete && "text-gray-600"
                )}
              >
                {s.label}
                {isCurrent && (
                  <span className="ml-1 animate-pulse">...</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Success message */}
      {stage === "complete" && (
        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-900">
                Profile imported successfully!
              </p>
              <p className="text-xs text-green-700">
                Your resume is ready to customize
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportProgress;
