import { 
  Heart, 
  AlertTriangle, 
  Target, 
  Bot, 
  MessageSquare, 
  Users,
  Info
} from "lucide-react";
import AnalysisCard from "./AnalysisCard";
import ScoreMeter from "./ScoreMeter";
import PropagandaTechnique from "./PropagandaTechnique";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export interface AnalysisData {
  sentiment: {
    tone: string;
    score: number;
    emotions: { name: string; score: number }[];
  };
  bias: {
    score: number;
    loadedWords: { word: string; replacement?: string }[];
    explanation: string;
  };
  propaganda: {
    techniques: {
      name: string;
      description: string;
      confidence: number;
      example?: string;
    }[];
  };
  aiGenerated: {
    score: number;
    indicators: string[];
  };
  impliedMeaning: {
    literal: string;
    implied: string;
    explanation: string;
  };
  stakeholders: {
    benefits: { who: string; how: string }[];
    disadvantaged: { who: string; how: string }[];
    disclaimer: string;
  };
}

interface AnalysisResultsProps {
  data: AnalysisData;
  originalText: string;
}

const AnalysisResults = ({ data, originalText }: AnalysisResultsProps) => {
  const getSentimentColor = (tone: string) => {
    const toneMap: Record<string, string> = {
      positive: "bg-success",
      negative: "bg-destructive",
      neutral: "bg-info",
      mixed: "bg-warning",
    };
    return toneMap[tone.toLowerCase()] || "bg-muted";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Alert className="bg-muted/50 border-border">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm text-muted-foreground">
          This analysis is interpretive and based on language patterns. Results should be used as one perspective among many, not as definitive fact.
        </AlertDescription>
      </Alert>

      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <p className="text-sm text-muted-foreground mb-2">Analyzed text:</p>
        <p className="text-foreground font-medium italic">"{originalText}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <AnalysisCard title="Emotional Tone" icon={Heart}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={getSentimentColor(data.sentiment.tone)}>
                {data.sentiment.tone}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Overall sentiment score: {data.sentiment.score}%
              </span>
            </div>
            <div className="space-y-3">
              {data.sentiment.emotions.map((emotion) => (
                <ScoreMeter
                  key={emotion.name}
                  label={emotion.name}
                  score={emotion.score}
                  colorClass="bg-primary"
                />
              ))}
            </div>
          </div>
        </AnalysisCard>

        {/* AI Detection */}
        <AnalysisCard title="AI-Generated Likelihood" icon={Bot}>
          <div className="space-y-4">
            <ScoreMeter
              label="AI Writing Probability"
              score={data.aiGenerated.score}
              colorClass="auto"
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Indicators detected:</p>
              <ul className="space-y-1">
                {data.aiGenerated.indicators.map((indicator, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnalysisCard>

        {/* Bias Detection */}
        <AnalysisCard title="Bias & Loaded Language" icon={AlertTriangle} variant="warning">
          <div className="space-y-4">
            <ScoreMeter
              label="Bias Score"
              score={data.bias.score}
              colorClass="auto"
            />
            <p className="text-sm text-muted-foreground">{data.bias.explanation}</p>
            {data.bias.loadedWords.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Loaded words detected:</p>
                <div className="flex flex-wrap gap-2">
                  {data.bias.loadedWords.map((item, i) => (
                    <Badge key={i} variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      {item.word}
                      {item.replacement && (
                        <span className="text-muted-foreground ml-1">→ {item.replacement}</span>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnalysisCard>

        {/* Implied Meaning */}
        <AnalysisCard title="What This Implies" icon={MessageSquare} variant="info">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Literal statement:</p>
              <p className="text-sm text-muted-foreground">{data.impliedMeaning.literal}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Implied meaning:</p>
              <p className="text-sm text-muted-foreground">{data.impliedMeaning.implied}</p>
            </div>
            <p className="text-sm text-foreground/70 italic">{data.impliedMeaning.explanation}</p>
          </div>
        </AnalysisCard>
      </div>

      {/* Propaganda Techniques */}
      {data.propaganda.techniques.length > 0 && (
        <AnalysisCard title="Propaganda Techniques" icon={Target} className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.propaganda.techniques.map((technique, i) => (
              <PropagandaTechnique key={i} {...technique} />
            ))}
          </div>
        </AnalysisCard>
      )}

      {/* Stakeholder Analysis */}
      <AnalysisCard title="Who Benefits & Who Loses" icon={Users}>
        <Alert className="mb-4 bg-muted/50 border-border">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs text-muted-foreground">
            {data.stakeholders.disclaimer}
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-success flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              May Benefit
            </h4>
            {data.stakeholders.benefits.map((item, i) => (
              <div key={i} className="p-3 rounded-md bg-success/5 border border-success/20">
                <p className="font-medium text-foreground text-sm">{item.who}</p>
                <p className="text-sm text-muted-foreground">{item.how}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-destructive flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              May Be Disadvantaged
            </h4>
            {data.stakeholders.disadvantaged.map((item, i) => (
              <div key={i} className="p-3 rounded-md bg-destructive/5 border border-destructive/20">
                <p className="font-medium text-foreground text-sm">{item.who}</p>
                <p className="text-sm text-muted-foreground">{item.how}</p>
              </div>
            ))}
          </div>
        </div>
      </AnalysisCard>
    </div>
  );
};

export default AnalysisResults;
