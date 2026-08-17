import { Reveal, SectionHeading } from "@/components/ui/reveal";
import GrassCore from "@/components/three/GrassCore";

const loop = [
  {
    step: "01",
    title: "Capture",
    body: "Smart bins and facility sensors register composition at the point of discard, replacing guesswork with a measured baseline.",
  },
  {
    step: "02",
    title: "Sort",
    body: "Hyperspectral vision plus robotic cells separate the stream into high-purity fractions with per-object provenance.",
  },
  {
    step: "03",
    title: "Convert",
    body: "Chemical and biological routes return recovered fractions to industrial-grade feedstock, batch-certified on exit.",
  },
  {
    step: "04",
    title: "Re-enter",
    body: "Material passports follow each output into manufacturing, closing the accounting loop for regulators and buyers.",
  },
];

const Circularity = () => (
  <section id="circularity" className="section-y border-y border-border/60 bg-card/25">
    <div className="section-shell grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
      <div>
        <SectionHeading
          eyebrow="Waste management & circular economy"
          title={
            <>
              The loop, engineered <span className="text-gradient">end to end</span>
            </>
          }
          description="Recycling fails at the seams between steps. We instrument the whole chain so material — and its data — never gets dropped."
        />

        <ol className="mt-12 space-y-0">
          {loop.map((l, i) => (
            <Reveal key={l.step} delay={i * 0.08}>
              <li className="relative flex gap-6 pb-9 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 bg-background font-mono text-xs text-primary">
                    {l.step}
                  </span>
                  {i < loop.length - 1 && <span className="mt-1 w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent" />}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-lg font-semibold">{l.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal delay={0.15}>
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <GrassCore className="h-[420px] w-full sm:h-[520px]" scale={0.85} compact />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_35%,hsl(var(--background))_100%)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Stream: mixed municipal</span>
            <span className="text-primary">Purity 99.4%</span>
            <span>Loss 0.6%</span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Circularity;
