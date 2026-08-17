import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

const papers = [
  {
    tag: "Preprint",
    date: "Mar 2026",
    title: "Spectral disambiguation of carbon-black polymers under industrial illumination",
    body: "A sensing and augmentation method that lifts dark-plastic recall from 61% to 94% without changing belt hardware.",
  },
  {
    tag: "Peer reviewed",
    date: "Nov 2025",
    title: "Force-adaptive grasping on heterogeneous, deformable waste objects",
    body: "Closed-loop control at 1 kHz that generalises across 12 object families with no per-class tuning.",
  },
  {
    tag: "Whitepaper",
    date: "Jul 2025",
    title: "Material passports as an accounting primitive for circular supply chains",
    body: "A proposal for per-batch provenance records that regulators, buyers and insurers can all verify.",
  },
  {
    tag: "Open dataset",
    date: "Feb 2025",
    title: "GRASS-40k: annotated hyperspectral scans of municipal waste streams",
    body: "Forty thousand labelled frames released under CC-BY to make sorting research reproducible.",
  },
];

const Research = () => (
  <section id="research" className="section-y border-t border-border/60 bg-card/25">
    <div className="section-shell">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Research & innovation"
          title={
            <>
              Published, not <span className="text-gradient">promised</span>
            </>
          }
          description="The lab publishes methods, failure modes and datasets. Scrutiny makes the systems better."
        />
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {papers.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <article className="surface-card hover-lift group flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                  {p.tag}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary">
                Read the work
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Research;
