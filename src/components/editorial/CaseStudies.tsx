import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const guides = [
  { tag: "Case study", title: "From burnout to a repeatable focus routine", meta: "Health · Mind", read: "12 min" },
  { tag: "Guide", title: "Designing a distraction-proof workspace", meta: "Tech · Life", read: "9 min" },
  { tag: "Case study", title: "Rebuilding energy after a chaotic year", meta: "Health", read: "11 min" },
];

const CaseStudies = () => {
  return (
    <section className="section-x section-y">
      <div className="container-editorial">
        <Reveal className="mb-14">
          <p className="kicker mb-4">Case studies &amp; guides</p>
          <h2 className="font-display font-semibold display-tight text-4xl sm:text-5xl">
            Real transformations, structured.
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {guides.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <a
                href="#newsletter"
                className="group flex items-center justify-between gap-6 py-8 border-t hover:pl-2 transition-all duration-500"
                style={{ borderColor: "hsl(var(--hairline) / 0.12)" }}
              >
                <div className="flex items-baseline gap-6">
                  <span className="hidden sm:inline text-xs uppercase tracking-[0.16em] text-secondary w-24 shrink-0">
                    {g.tag}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight group-hover:text-secondary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-ink-muted text-sm mt-2">{g.meta} · {g.read}</p>
                  </div>
                </div>
                <ArrowUpRight size={28} className="shrink-0 text-ink-muted group-hover:text-foreground group-hover:rotate-45 transition-all duration-500" />
              </a>
            </Reveal>
          ))}
          <div className="border-t" style={{ borderColor: "hsl(var(--hairline) / 0.12)" }} />
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
