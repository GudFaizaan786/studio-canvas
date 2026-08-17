import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Brain, Recycle, FlaskConical } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Applied intelligence",
    body: "Perception and decision models trained on real material streams — not synthetic benchmarks. Every model ships with an operator in the loop.",
  },
  {
    icon: FlaskConical,
    title: "Materials-first research",
    body: "We work backwards from molecular structure, designing recovery routes that keep polymers, fibres and metals at their highest possible value.",
  },
  {
    icon: Recycle,
    title: "Systems, not products",
    body: "Sensors, robotics, and analytics deploy as one closed loop, so a facility gains a compounding data asset instead of an isolated machine.",
  },
];

const Vision = () => (
  <section id="vision" className="section-y relative">
    <div className="section-shell grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
      <div>
        <SectionHeading
          eyebrow="The vision"
          title={
            <>
              A planet where nothing is
              <br className="hidden sm:block" /> discarded — only{" "}
              <span className="text-gradient">re-routed</span>
            </>
          }
          description="Ninety-two percent of the material we extract is lost within a year of use. GRASS LAB exists to close that gap with deeptech that is measurable, deployable and open to scrutiny."
        />

        <Reveal delay={0.1} className="mt-10 space-y-6 border-l border-border pl-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            We began in 2023 as a three-person research group studying how machine perception fails on
            heterogeneous waste. Today the lab runs a full stack: hyperspectral sensing, robotic recovery
            cells, and a materials pipeline that converts recovered feedstock into certified inputs.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Our principle is simple — if it cannot be measured in the field, it does not ship.
          </p>
        </Reveal>
      </div>

      <ul className="space-y-5">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <li className="surface-card hover-lift p-6 sm:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <p.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

export default Vision;
