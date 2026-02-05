import { useState } from "react";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import AnalysisResults, { AnalysisData } from "@/components/AnalysisResults";
import { Newspaper, Shield, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [originalText, setOriginalText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setOriginalText(text);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            See Beyond the <span className="text-secondary">Headlines</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Analyze news for bias, propaganda techniques, and AI-generated content. 
            Understand what's really being communicated.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-12">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-secondary" />
              <span>Bias Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span>Propaganda Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-secondary" />
              <span>AI Writing Detection</span>
            </div>
          </div>
        </section>

        {/* Input Section */}
        <section className="max-w-3xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-soft">
            <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        </section>

        {/* Results Section */}
        {analysisData && (
          <section className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Analysis Results
            </h2>
            <AnalysisResults data={analysisData} originalText={originalText} />
          </section>
        )}

        {/* Footer disclaimer */}
        <footer className="mt-16 text-center">
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            NewsLens provides interpretive analysis based on language patterns and AI models. 
            It does not fact-check or verify claims. Results should be considered as one analytical perspective, 
            not definitive truth. Always consult multiple sources.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
