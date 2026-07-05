import { motion } from "framer-motion";
import { Heart, Cpu, Brain, Compass } from "lucide-react";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Heart,
    title: "Health Optimization",
    desc: "Sleep, energy, nutrition and movement — the biological base layer of a clear mind.",
    span: "lg:col-span-3 lg:row-span-2",
    big: true,
  },
  {
    icon: Cpu,
    title: "Tech Awareness",
    desc: "Use technology as a tool, not a trap.",
    span: "lg:col-span-3",
  },
  {
    icon: Brain,
    title: "Mental Discipline",
    desc: "Focus, attention and calm under pressure.",
    span: "lg:col-span-3",
  },
  {
    icon: Compass,
    title: "Lifestyle Engineering",
    desc: "Design an environment where good decisions become the default path.",
    span: "lg:col-span-6",
  },
];

const PillarsSection = () => {
  return (
    <section id="pillars" className="section-x section-y">
      <div className="container-editorial">
        <div className="max-w-2xl mb-14">
          <Reveal>
            <p className="kicker mb-4">Core life pillars</p>
            <h2 className="font-display font-semibold display-tight text-4xl sm:text-5xl lg:text-[3.5rem]">
              Four systems that quietly run your life.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 auto-rows-[minmax(180px,auto)]">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={p.span}>
              <div className="edit-card h-full p-7 sm:p-9 flex flex-col justify-between group">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary/12 text-secondary">
                  <p.icon size={22} strokeWidth={1.75} />
                </div>
                <div className="mt-8">
                  <h3 className={`font-display font-semibold tracking-tight ${p.big ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                    {p.title}
                  </h3>
                  <p className={`text-ink-muted leading-relaxed mt-3 ${p.big ? "text-lg max-w-sm" : "text-base"}`}>
                    {p.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
