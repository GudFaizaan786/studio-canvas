import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "./Reveal";

const stats = [
  { value: 200, suffix: "+", label: "Curated life systems" },
  { value: 50, suffix: "+", label: "Deep-dive guides" },
  { value: 12, suffix: "k", label: "Readers upgrading weekly" },
  { value: 10, suffix: "x", label: "Productivity frameworks" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="section-x section-y bg-muted/40">
      <div className="container-editorial">
        <Reveal className="max-w-2xl mb-14">
          <p className="kicker mb-4">Transformation metrics</p>
          <h2 className="font-display font-semibold display-tight text-4xl sm:text-5xl">
            A quietly growing system.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <p className="font-display font-semibold display-tight text-5xl sm:text-6xl lg:text-7xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-ink-muted mt-3 text-[15px] max-w-[12rem]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
