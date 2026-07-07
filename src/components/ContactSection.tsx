import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Mail, Send, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  topic: z.string().trim().min(1, "Topic is required").max(120),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check the form", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", topic: "", message: "" });
      toast({ title: "Message sent 🌱", description: "We'll get back to you soon about your green inquiry." });
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">
            Get In <span className="text-secondary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Questions about sustainability, green tech, or community projects? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-start gap-3">
              <Mail className="text-secondary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-sm">Email</p>
                <p className="text-muted-foreground text-sm">hello@gsorigins.earth</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageSquare className="text-secondary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-sm">Topics we love</p>
                <p className="text-muted-foreground text-sm">Green tech, sustainable health, climate motivation, eco lifestyle, open-source for the planet.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="text-secondary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-sm">Community</p>
                <p className="text-muted-foreground text-sm">Join contributors building a sustainable future together.</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card p-6 sm:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@earth.org" maxLength={255} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-topic">Topic</Label>
              <Input id="c-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Solar microgrid collaboration" maxLength={120} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-msg">Message</Label>
              <Textarea id="c-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your green idea..." rows={5} maxLength={1000} />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              <Send size={16} />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
