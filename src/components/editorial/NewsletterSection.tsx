import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're in. Weekly knowledge drops incoming.");
    setEmail("");
  };

  return (
    <section id="newsletter" className="section-x section-y">
      <div className="container-editorial">
        <Reveal>
          <div className="edit-card noise-bg overflow-hidden p-8 sm:p-14 lg:p-20 text-center relative">
            <p className="kicker mb-6 relative">Membership · Weekly drops</p>
            <h2 className="font-display font-semibold display-tight text-4xl sm:text-5xl lg:text-6xl max-w-3xl mx-auto relative">
              Upgrade your thinking, one week at a time.
            </h2>
            <p className="text-ink-muted text-lg mt-6 max-w-xl mx-auto relative">
              Join readers getting one structured knowledge drop every week — calm, curated,
              and built to compound. No noise, no spam.
            </p>
            <form onSubmit={submit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 rounded-full px-5 bg-background border-foreground/15"
                aria-label="Email address"
              />
              <Button type="submit" size="lg" className="h-12 rounded-full px-7 gap-2 shrink-0">
                Join <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewsletterSection;
