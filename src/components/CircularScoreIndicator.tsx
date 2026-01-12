import { cn } from "@/lib/utils";

interface CircularScoreIndicatorProps {
  score: number; // 0-10 scale
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function CircularScoreIndicator({
  score,
  size = "md",
  showLabel = true,
  className
}: CircularScoreIndicatorProps) {
  // Normalize score to 0-10 range
  const normalizedScore = Math.max(0, Math.min(10, score));
  const percentage = (normalizedScore / 10) * 100;

  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 8) return { stroke: "#10b981", bg: "#d1fae5" }; // Green
    if (score >= 6.5) return { stroke: "#3b82f6", bg: "#dbeafe" }; // Blue
    if (score >= 5) return { stroke: "#f59e0b", bg: "#fef3c7" }; // Yellow/Amber
    return { stroke: "#ef4444", bg: "#fee2e2" }; // Red
  };

  const colors = getColor(normalizedScore);

  // Size configurations
  const sizeConfig = {
    sm: { width: 48, height: 48, strokeWidth: 4, fontSize: "text-xs", radius: 18 },
    md: { width: 64, height: 64, strokeWidth: 5, fontSize: "text-sm", radius: 24 },
    lg: { width: 80, height: 80, strokeWidth: 6, fontSize: "text-base", radius: 30 }
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("inline-flex flex-col items-center gap-1", className)}>
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={config.radius}
          fill="none"
          stroke={colors.bg}
          strokeWidth={config.strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={config.radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Score text (rotate back) */}
        <text
          x={config.width / 2}
          y={config.height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className={cn("font-semibold transform rotate-90", config.fontSize)}
          fill={colors.stroke}
          style={{ transformOrigin: 'center' }}
        >
          {normalizedScore.toFixed(1)}
        </text>
      </svg>

      {showLabel && (
        <span className="text-xs text-muted-foreground font-medium">
          ATS Score
        </span>
      )}
    </div>
  );
}
