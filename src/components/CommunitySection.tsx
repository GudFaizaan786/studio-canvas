import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Code, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CommunitySection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    setEmail("");
    toast.success("Welcome to the GSorigins community!");
  };

  return (
    <section id="community" className="section-padding bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-hand text-secondary text-xl sm:text-2xl">
            Join Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Be a Part of Our Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Together, we can build a more sustainable future. Subscribe for updates or contribute to our open-source initiatives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Subscribers Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="text-primary" size={22} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Subscribe</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Get weekly insights on green living, sustainable tech breakthroughs, health tips, and motivation delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-3 text-primary font-medium">
                <CheckCircle size={20} />
                You're subscribed! Welcome aboard.
              </div>
            ) : (
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <Button onClick={handleSubscribe} className="gap-2 shrink-0">
                  Join <ArrowRight size={16} />
                </Button>
              </div>
            )}
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={14} />
              <span>2,400+ sustainability advocates already joined</span>
            </div>
          </motion.div>

          {/* Open-Source Contributors Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Code className="text-secondary" size={22} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Contribute</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              We're building open-source tools for environmental monitoring, carbon tracking, and sustainable living. Your code can make an impact.
            </p>
            <div className="space-y-3 mb-6">
              {[
                "Carbon Footprint Calculator — React + Python",
                "Green Community Dashboard — Contributor Portal",
                "Eco-Data API — Open Environmental Datasets",
              ].map((project, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <CheckCircle size={14} className="text-secondary mt-0.5 shrink-0" />
                  {project}
                </div>
              ))}
            </div>
            <Button variant="outline" className="gap-2" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View on GitHub <ArrowRight size={16} />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
