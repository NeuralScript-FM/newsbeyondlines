import { cn } from "@/lib/utils";

interface ScoreMeterProps {
  score: number; // 0-100
  label: string;
  colorClass?: string;
  showPercentage?: boolean;
}

const ScoreMeter = ({ score, label, colorClass = "bg-primary", showPercentage = true }: ScoreMeterProps) => {
  const getColorByScore = (score: number) => {
    if (score < 30) return "bg-success";
    if (score < 60) return "bg-warning";
    return "bg-destructive";
  };

  const actualColor = colorClass === "auto" ? getColorByScore(score) : colorClass;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {showPercentage && (
          <span className="text-sm font-semibold text-muted-foreground">{score}%</span>
        )}
      </div>
      <div className="score-meter">
        <div
          className={cn("score-fill", actualColor)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreMeter;
