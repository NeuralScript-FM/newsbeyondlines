import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AnalysisCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  variant?: "default" | "warning" | "info";
}

const AnalysisCard = ({ title, icon: Icon, children, className, variant = "default" }: AnalysisCardProps) => {
  const variantStyles = {
    default: "border-border",
    warning: "border-warning/30 bg-warning/5",
    info: "border-info/30 bg-info/5",
  };

  return (
    <div className={cn("analysis-card", variantStyles[variant], className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-8 h-8 rounded-md flex items-center justify-center",
          variant === "default" && "bg-primary/10 text-primary",
          variant === "warning" && "bg-warning/20 text-warning",
          variant === "info" && "bg-info/20 text-info"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default AnalysisCard;
