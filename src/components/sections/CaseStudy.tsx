import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { MagneticLink } from "@/components/ui/magnetic-button";

const results = [
  ["Sorting purity", "78% → 99.4%"],
  ["Manual pickers redeployed", "22"],
  ["Payback period", "14 months"],
  ["Annual CO₂e avoided", "38,400 t"],
];

const CaseStudy = () => (
  <section className="section-y">
    <div className="section-shell">
      <div className="surface-card overflow-hidden">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="p-8 sm:p-12">
            <SectionHeading
              eyebrow="Case study · Rotterdam"
              title={
                <>
                  Retrofitting a 1990s sorting plant into a{" "}
                  <span className="text-gradient">learning facility</span>
                </>
              }
              description="NordWaste ran a legacy MRF at the edge of viability. Instead of replacing the line, we instrumented it — six sensor arrays, four robotic cells and a twin that re-tunes thresholds nightly."
            />

            <Reveal delay={0.1}>
              <blockquote className="mt-9 border-l-2 border-primary/60 pl-5 text-sm italic leading-relaxed text-muted-foreground">
                “We expected a sorting upgrade. What we got was visibility — we now price our bales
                before the truck has finished unloading.”
                <footer className="mt-3 not-italic text-xs text-foreground/80">
                  Marit Solberg — Operations Director, NordWaste Group
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9">
                <MagneticLink href="#contact" variant="ghost">
                  Request the full write-up
                </MagneticLink>
              </div>
            </Reveal>
          </div>

          <div className="relative grid gap-px bg-border sm:grid-cols-2 lg:border-l lg:border-border">
            {results.map((r, i) => (
              <Reveal key={r[0]} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col justify-center bg-card p-8">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{r[0]}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-primary">{r[1]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CaseStudy;
