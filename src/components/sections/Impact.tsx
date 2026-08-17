import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

const metrics = [
  { value: 412000, suffix: " t", label: "Material diverted from landfill", sub: "Cumulative across pilot sites" },
  { value: 186000, suffix: " t", label: "CO₂e avoided", sub: "Verified against ISO 14064" },
  { value: 31, suffix: "%", label: "Energy reduction per tonne", sub: "Versus conventional MRF lines" },
  { value: 24, suffix: "", label: "Facilities in deployment", sub: "Across 7 countries" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
      {display.toLocaleString("en-US")}
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

const Impact = () => (
  <section id="impact" className="section-y">
    <div className="section-shell">
      <SectionHeading
        eyebrow="Measured impact"
        align="center"
        title={
          <>
            Claims we can <span className="text-gradient">defend</span>
          </>
        }
        description="Every figure below is drawn from instrumented deployments and independently audited annually. Methodology is published in full."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08}>
            <div className="h-full bg-card p-7 sm:p-8">
              <Counter value={m.value} suffix={m.suffix} />
              <p className="mt-4 text-sm font-medium">{m.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Impact;
