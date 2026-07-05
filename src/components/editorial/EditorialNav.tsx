import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { label: "Explore", href: "#knowledge" },
  { label: "Health", href: "#pillars" },
  { label: "Tech", href: "#knowledge" },
  { label: "Mindset", href: "#frameworks" },
  { label: "Lifestyle", href: "#systems" },
];

const EditorialNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b py-2.5"
          : "bg-transparent border-b border-transparent py-4"
      }`}
      style={{ borderColor: scrolled ? "hsl(var(--hairline) / 0.08)" : "transparent" }}
    >
      <nav className="container-editorial section-x flex items-center justify-between">
        <a href="#home" className="font-display font-semibold text-lg tracking-tight">
          GS<span className="text-secondary">Origins</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-ink-muted hover:text-foreground transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search">
            <Search size={17} />
          </Button>
          <ThemeToggle />
          {isAdmin && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Shield size={14} /> Admin
              </Button>
            </Link>
          )}
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5">
              <LogOut size={14} /> Sign Out
            </Button>
          ) : (
            <a href="#newsletter">
              <Button size="sm" className="rounded-full px-5">Start Learning</Button>
            </a>
          )}
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <ThemeToggle />
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="section-x py-5 flex flex-col gap-4 border-t" style={{ borderColor: "hsl(var(--hairline) / 0.08)" }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-ink-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: "hsl(var(--hairline) / 0.08)" }}>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-1.5"><Shield size={14} /> Admin</Button>
                  </Link>
                )}
                {user ? (
                  <Button variant="ghost" size="sm" onClick={() => { signOut(); setOpen(false); }} className="gap-1.5">
                    <LogOut size={14} /> Sign Out
                  </Button>
                ) : (
                  <a href="#newsletter" onClick={() => setOpen(false)}>
                    <Button size="sm" className="w-full rounded-full">Start Learning</Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default EditorialNav;
