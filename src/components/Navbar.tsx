import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "./AuthModal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Downloads", href: "#downloads" },
  { label: "Resources", href: "#resources" },
  { label: "Community", href: "#community" },
  { label: "UNDP", href: "#undp" },
  { label: "Blog", href: "#blog" },
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
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#home" className="text-2xl font-display font-bold tracking-tight">
            <span className="text-[hsl(0,0%,75%)]">GS</span><span className="text-secondary">origins</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
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

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setAuthMode("login")}>
              Log In
            </Button>
            <Button size="sm" onClick={() => setAuthMode("signup")}>
              Sign Up
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex gap-3 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => { setAuthMode("login"); setMobileOpen(false); }}>
                    Log In
                  </Button>
                  <Button size="sm" onClick={() => { setAuthMode("signup"); setMobileOpen(false); }}>
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
