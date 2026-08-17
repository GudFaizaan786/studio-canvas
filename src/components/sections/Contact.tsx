import { useState } from "react";
import { z } from "zod";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const interests = [
  "Pilot deployment",
  "Research collaboration",
  "Investment",
  "Press & speaking",
  "Careers",
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(255),
  organization: z.string().trim().max(150, "Organization name is too long"),
  interest: z.string().trim().min(1, "Select what this is about").max(60),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

const empty = { name: "", email: "", organization: "", interest: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const { error } = await supabase.from("contact_submissions" as never).insert({
      name: parsed.data.name,
      email: parsed.data.email,
      organization: parsed.data.organization || null,
      interest: parsed.data.interest,
      message: parsed.data.message,
    } as never);

    setLoading(false);

    if (error) {
      toast({
        title: "Couldn't send that",
        description: "Something went wrong on our side. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    setForm(empty);
    toast({
      title: "Message received",
      description: "A researcher from the lab will reply within two working days.",
    });
  };

  return (
    <section id="contact" className="section-y border-t border-border/60">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Start a conversation"
            title={
              <>
                Bring us a <span className="text-gradient">hard problem</span>
              </>
            }
            description="Facility operators, researchers, city programmes and investors — tell us what you are working on and we will respond with specifics, not a brochure."
          />

          <Reveal delay={0.1} className="mt-10 space-y-6">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">lab@grasslab.earth</p>
                <p className="mt-1 text-xs text-muted-foreground">Direct line to the research team</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">Rotterdam · Bengaluru · Oslo</p>
                <p className="mt-1 text-xs text-muted-foreground">Research sites and deployment hubs</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <form onSubmit={handleSubmit} noValidate className="surface-card space-y-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  maxLength={100}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  maxLength={255}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@organisation.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="organization">Organisation</Label>
                <Input
                  id="organization"
                  value={form.organization}
                  maxLength={150}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interest">This is about</Label>
                <Select
                  value={form.interest}
                  onValueChange={(v) => setForm({ ...form, interest: v })}
                >
                  <SelectTrigger id="interest" aria-invalid={!!errors.interest}>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {interests.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.interest && <p className="text-xs text-destructive">{errors.interest}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                maxLength={2000}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What stream, facility or research question are you working on?"
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending
                </>
              ) : (
                <>
                  <Send size={16} /> Send to the lab
                </>
              )}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
