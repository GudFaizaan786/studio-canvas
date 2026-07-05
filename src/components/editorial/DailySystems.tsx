import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "./Reveal";

const systems = [
  { time: "06:30", title: "Morning light + movement", note: "Anchor your circadian rhythm before screens." },
  { time: "09:00", title: "Deep work block", note: "One hard thing, zero notifications, 90 minutes." },
  { time: "13:00", title: "Intentional input", note: "Read one structured knowledge card, not the feed." },
  { time: "18:30", title: "Analog wind-down", note: "Reduce dopamine load, protect tomorrow's focus." },
];

const DailySystems = () => {
  return (
    <section id="systems" className="section-x section-y bg-muted/40">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="kicker mb-4">Daily systems &amp; habits</p>
            <h2 className="font-display font-semibold display-tight text-4xl sm:text-5xl">
              Your day, engineered for clarity.
            </h2>
            <p className="text-ink-muted text-lg leading-relaxed mt-6 max-w-md">
              Motivation fades. Systems don't. GSOrigins turns intentions into a repeatable
              structure you barely have to think about.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {["Built on behavioural science", "Adaptable to any schedule", "Designed for consistency"].map((f) => (
                <div key={f} className="flex items-center gap-3 text-foreground">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-secondary-foreground">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[15px]">{f}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <div className="relative flex flex-col gap-3">
            <div className="absolute left-[4.5rem] top-4 bottom-4 w-px hidden sm:block" style={{ background: "hsl(var(--hairline) / 0.12)" }} />
            {systems.map((s, i) => (
              <Reveal key={s.time} delay={i * 0.1}>
                <div className="edit-card p-5 sm:p-6 flex items-start gap-5 sm:gap-8">
                  <span className="font-display font-medium text-lg tabular-nums text-secondary w-14 shrink-0">
                    {s.time}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-xl tracking-tight">{s.title}</h3>
                    <p className="text-ink-muted mt-1.5 leading-relaxed">{s.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailySystems;
