import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Trash2 } from "lucide-react";

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const TextInput = ({ onAnalyze, isLoading }: TextInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAnalyze(text.trim());
    }
  };

  const exampleHeadlines = [
    "BREAKING: Radical new policy threatens to destroy small businesses overnight",
    "Scientists discover potential breakthrough in renewable energy storage",
    "Critics slam controversial decision as experts warn of dire consequences",
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste a headline or short article to analyze..."
          className="min-h-[160px] resize-none bg-card border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-base leading-relaxed"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {text.length} characters
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() || isLoading}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze Text
            </>
          )}
        </Button>
        {text && (
          <Button
            variant="outline"
            onClick={() => setText("")}
            disabled={isLoading}
            className="border-border text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <div className="pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground mb-3">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {exampleHeadlines.map((headline, index) => (
            <button
              key={index}
              onClick={() => setText(headline)}
              disabled={isLoading}
              className="text-left text-xs px-3 py-2 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border/50 max-w-xs truncate"
            >
              "{headline.slice(0, 50)}..."
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
