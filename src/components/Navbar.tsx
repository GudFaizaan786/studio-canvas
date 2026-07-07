import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Health", href: "#categories" },
  { label: "Technology", href: "#categories" },
  { label: "Motivation", href: "#categories" },
  { label: "Lifestyle", href: "#categories" },
  { label: "Sustainability", href: "#categories" },
  { label: "Downloads", href: "#downloads" },
  { label: "Resources", href: "#resources" },
  { label: "Community", href: "#community" },
  { label: "UNDP", href: "#undp" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const getInitials = (name?: string, email?: string) => {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return (email?.[0] ?? "U").toUpperCase();
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const displayName =
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.display_name as string) ||
    undefined;
  const initials = getInitials(displayName, user?.email);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a href="#home" className="text-xl sm:text-2xl font-display font-bold tracking-tight">
          <span className="text-[hsl(var(--silver))]">GS</span>
          <span className="text-secondary">origins</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border-[1.5px] border-foreground/40">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">
                  {displayName ?? user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="gap-2 cursor-pointer">
                      <Shield size={14} /> Admin panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={signOut} className="gap-2 cursor-pointer">
                  <LogOut size={14} /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button className="text-foreground p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

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
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-border">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 py-1">
                      <Avatar className="h-9 w-9 border-[1.5px] border-foreground/40">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground truncate">{displayName ?? user.email}</span>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Shield size={14} /> Admin panel
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => { signOut(); setMobileOpen(false); }} className="gap-1">
                      <LogOut size={14} /> Sign out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="w-full">Sign in</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
