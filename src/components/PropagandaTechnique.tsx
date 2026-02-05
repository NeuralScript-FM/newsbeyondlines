import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropagandaTechniqueProps {
  name: string;
  description: string;
  confidence: number;
  example?: string;
}

const PropagandaTechnique = ({ name, description, confidence, example }: PropagandaTechniqueProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-destructive/10 text-destructive border-destructive/30";
    if (confidence >= 50) return "bg-warning/10 text-warning border-warning/30";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-foreground">{name}</h4>
        <Badge variant="outline" className={cn("text-xs", getConfidenceColor(confidence))}>
          {confidence}% likely
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      {example && (
        <p className="text-sm italic text-foreground/70 border-l-2 border-accent pl-3 mt-2">
          "{example}"
        </p>
      )}
    </div>
  );
};

export default PropagandaTechnique;
