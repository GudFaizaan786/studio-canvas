import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const frontiers = [
  {
    id: "perception",
    label: "Machine perception",
    headline: "Seeing material, not just shape",
    body: "Standard vision models classify silhouettes. Ours reason over spectral signatures, so a black PP tray and a black PET tray are never confused — the difference between a saleable bale and a rejected one.",
    metrics: [
      ["Material classes", "42"],
      ["Belt speed", "3.2 m/s"],
      ["Inference latency", "38 ms"],
    ],
  },
  {
    id: "robotics",
    label: "Embodied robotics",
    headline: "Grippers that adapt mid-pick",
    body: "Force feedback at 1 kHz lets a cell adjust grip pressure as it closes, handling crushed cans and wet cardboard on the same line without tooling changes.",
    metrics: [
      ["Picks / hour", "4,800"],
      ["Grip success", "97.1%"],
      ["Uptime", "99.2%"],
    ],
  },
  {
    id: "materials",
    label: "Materials science",
    headline: "Recovery routes designed per batch",
    body: "A catalyst-selection model proposes depolymerisation conditions for each incoming composition, cutting energy input while holding output purity above virgin-equivalent thresholds.",
    metrics: [
      ["Output purity", "99.4%"],
      ["Energy delta", "-31%"],
      ["Validated routes", "14"],
    ],
  },
  {
    id: "bio",
    label: "Synthetic biology",
    headline: "Organisms as processing infrastructure",
    body: "Consortia engineered for mixed-organic feedstock convert food and agricultural residue into lactic acid and short-chain precursors, replacing landfill with a chemical supply line.",
    metrics: [
      ["Conversion yield", "68%"],
      ["Cycle time", "34 h"],
      ["Strains in trial", "9"],
    ],
  },
  {
    id: "twin",
    label: "Digital twins",
    headline: "Every facility, simulated before it is built",
    body: "We model throughput, contamination and economics across a full year of seasonal variation, so operators commission lines against evidence rather than vendor claims.",
    metrics: [
      ["Forecast error", "±4.6%"],
      ["Scenarios / run", "1,200"],
      ["Sim horizon", "12 mo"],
    ],
  },
];

const Frontiers = () => {
  const [active, setActive] = useState(frontiers[0].id);
  const current = frontiers.find((f) => f.id === active) ?? frontiers[0];

  return (
    <section id="frontiers" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 core-glow" aria-hidden="true" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Technology frontiers"
          title={
            <>
              Where the research is <span className="text-gradient">hardest</span>
            </>
          }
          description="Five open problems the lab is actively pushing on. Select one to see the current state of the work."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-14">
          <Reveal>
            <div role="tablist" aria-label="Technology frontiers" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {frontiers.map((f) => {
                const isActive = f.id === active;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(f.id)}
                    className={cn(
                      "relative shrink-0 rounded-lg border px-4 py-3.5 text-left text-sm transition-colors focus-ring lg:w-full",
                      isActive
                        ? "border-primary/50 bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                      0{frontiers.indexOf(f) + 1}
                    </span>
                    <span className="mt-1 block font-medium">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-card min-h-[320px] p-7 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-2xl font-semibold sm:text-3xl">{current.headline}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {current.body}
                  </p>
                  <dl className="mt-9 grid gap-5 border-t border-border pt-7 sm:grid-cols-3">
                    {current.metrics.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                        <dd className="mt-1.5 font-display text-2xl font-semibold text-primary">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Frontiers;
