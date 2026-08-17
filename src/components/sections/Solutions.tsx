import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Eye, Bot, Atom, LineChart, Cpu, Leaf } from "lucide-react";

const solutions = [
  {
    icon: Eye,
    title: "Hyperspectral perception",
    body: "Camera and NIR fusion that identifies 40+ material classes on a moving belt at 3.2 m/s, including dark plastics conventional sorters miss.",
    tag: "Vision AI",
  },
  {
    icon: Bot,
    title: "Autonomous recovery cells",
    body: "Delta-arm robotics with force-adaptive grippers that pick contaminated, irregular objects without pre-conditioning the stream.",
    tag: "Robotics",
  },
  {
    icon: Atom,
    title: "Feedstock chemistry",
    body: "Depolymerisation and fibre-recovery routes tuned per input batch, validated against ISO 15270 and EN 643 grade thresholds.",
    tag: "Materials",
  },
  {
    icon: LineChart,
    title: "Stream intelligence",
    body: "A live digital twin of every tonne entering a facility — composition, purity, carbon intensity and resale value, updated per second.",
    tag: "Analytics",
  },
  {
    icon: Cpu,
    title: "Edge inference stack",
    body: "Quantised models running on-prem hardware with sub-40 ms latency, so plants keep operating when connectivity does not.",
    tag: "Edge AI",
  },
  {
    icon: Leaf,
    title: "Biogenic conversion",
    body: "Engineered microbial consortia that break down mixed organics into industrially useful precursors instead of landfill methane.",
    tag: "Bio",
  },
];

const Solutions = () => (
  <section id="solutions" className="section-y border-t border-border/60 bg-card/25">
    <div className="section-shell">
      <SectionHeading
        eyebrow="What we build"
        title={
          <>
            Six systems, one <span className="text-gradient">closed loop</span>
          </>
        }
        description="Each capability stands alone — together they form an end-to-end recovery line that learns from every tonne it processes."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <article className="surface-card hover-lift group relative h-full overflow-hidden p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-background/70 text-primary">
                  <s.icon size={20} aria-hidden="true" />
                </span>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.tag}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Solutions;
