import Header from "@/components/Header";
import { Target, Lightbulb, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            About NewsLens
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering readers to think critically about the information they consume.
          </p>
        </section>

        {/* Mission */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In an age of information overload, distinguishing fact from opinion, and genuine 
              reporting from manipulation, has become increasingly challenging. NewsLens was 
              created to help readers develop a more critical eye when consuming news and 
              online content.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our goal is not to tell you what to believe, but to provide you with tools to 
              recognize common patterns of bias and manipulation so you can make more informed 
              decisions about the information you trust.
            </p>
          </div>
        </section>

        {/* Motivation */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">The Motivation</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The rise of AI-generated content, social media echo chambers, and the 24-hour 
              news cycle has made media literacy more important than ever. Many people lack 
              the time or training to thoroughly analyze every piece of content they encounter.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              NewsLens aims to bridge this gap by providing quick, accessible analysis that 
              highlights potential red flags and encourages deeper critical thinking. Whether 
              you're a student, journalist, researcher, or simply a curious reader, we hope 
              this tool helps you navigate the complex media landscape with greater confidence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that an informed public is the foundation of a healthy democracy, 
              and that everyone deserves access to tools that support media literacy.
            </p>
          </div>
        </section>

        {/* Creator */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Created By</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              NewsLens was created by <span className="text-foreground font-medium">Fathima Mehrin</span>, 
              driven by a passion for media literacy and the belief that technology can be used 
              to empower individuals to think more critically about the information they consume.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This project represents a commitment to transparency, education, and the 
              democratization of analytical tools that were once only available to researchers 
              and media professionals.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-3xl mx-auto">
          <div className="bg-muted/50 border border-border rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              A Note on Interpretation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              NewsLens uses AI-powered analysis to identify patterns commonly associated with 
              bias and propaganda. However, the presence of these patterns does not automatically 
              mean content is false or malicious. Context matters. Use our analysis as a starting 
              point for critical thinking, not as a final verdict.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
