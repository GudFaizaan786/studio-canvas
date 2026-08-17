import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().trim().email("Enter a valid email").max(255);

const columns = [
  {
    title: "Lab",
    links: [
      { label: "Vision", href: "#vision" },
      { label: "Solutions", href: "#solutions" },
      { label: "Frontiers", href: "#frontiers" },
      { label: "Circularity", href: "#circularity" },
    ],
  },
  {
    title: "Evidence",
    links: [
      { label: "Impact", href: "#impact" },
      { label: "Research", href: "#research" },
      { label: "Case studies", href: "#research" },
      { label: "Datasets", href: "#research" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#contact" },
      { label: "Press", href: "#contact" },
      { label: "Partnerships", href: "#contact" },
    ],
  },
];

const SiteFooter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: "Check that email",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers" as never)
      .insert({ email: parsed.data } as never);
    setLoading(false);

    if (error) {
      const already = error.code === "23505";
      toast({
        title: already ? "You're already on the list" : "Couldn't subscribe",
        description: already
          ? "This address is already receiving the lab notes."
          : "Please try again in a moment.",
        variant: already ? "default" : "destructive",
      });
      return;
    }

    setEmail("");
    toast({
      title: "Subscribed",
      description: "Monthly lab notes — research, deployments and failures worth reading.",
    });
  };

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="section-shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1.7fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-primary/40 bg-primary/10">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-display text-base font-semibold tracking-[0.18em]">
                GRASS<span className="text-primary"> LAB</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A deeptech research studio building AI, robotics and materials systems for a world that
              keeps its resources in circulation.
            </p>

            <form onSubmit={subscribe} className="mt-8 max-w-sm">
              <label htmlFor="newsletter" className="text-xs uppercase tracking-widest text-muted-foreground">
                Lab notes — monthly
              </label>
              <div className="mt-3 flex gap-2">
                <Input
                  id="newsletter"
                  type="email"
                  value={email}
                  maxLength={255}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organisation.com"
                  className="h-11"
                />
                <Button type="submit" disabled={loading} className="h-11 shrink-0">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Subscribe"}
                </Button>
              </div>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs uppercase tracking-widest text-foreground">{c.title}</h3>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GRASS LAB. Research published under CC-BY where noted.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Rotterdam · Bengaluru · Oslo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
