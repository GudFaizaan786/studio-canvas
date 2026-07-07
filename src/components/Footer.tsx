import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2">
            <span className="text-2xl font-display font-bold">
              <span className="text-[hsl(var(--silver))]">GS</span><span className="text-secondary">origins</span>
            </span>
            <p className="text-sm text-muted-foreground mt-3 max-w-sm">
              Your origin point for Green Sustainable living — exploring Health, Technology,
              Motivation & Lifestyle for a better tomorrow.
            </p>
            <div className="flex gap-4 mt-5">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "About", "Downloads", "Resources", "Community", "UNDP", "Blog"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>hello@gsorigins.com</span>
              <span>+1 (555) 123-4567</span>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GSorigins. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
