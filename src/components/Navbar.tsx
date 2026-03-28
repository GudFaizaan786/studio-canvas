import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "./AuthModal";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Downloads", href: "#downloads" },
  { label: "Resources", href: "#resources" },
  { label: "Community", href: "#community" },
  { label: "UNDP", href: "#undp" },
  { label: "JugaadX", href: "#jugaadx" },
  { label: "Blog", href: "#blog" },
  { label: "Deploy", href: "#deploy" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <a href="#home" className="text-xl sm:text-2xl font-display font-bold tracking-tight">
            <span className="text-[hsl(0,0%,75%)]">GS</span><span className="text-secondary">origins</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setAuthMode("login")}>
              Log In
            </Button>
            <Button size="sm" onClick={() => setAuthMode("signup")}>
              Sign Up
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col gap-3 px-4 sm:px-6 py-5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex gap-3 pt-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => { setAuthMode("login"); setMobileOpen(false); }}>
                    Log In
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => { setAuthMode("signup"); setMobileOpen(false); }}>
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitch={(m) => setAuthMode(m)} />
    </>
  );
};

export default Navbar;
