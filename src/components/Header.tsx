import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Search className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">NewsLens</h1>
            <p className="text-xs text-muted-foreground">Media Analysis Tool</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How it works</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
