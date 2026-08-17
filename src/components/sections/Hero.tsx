import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GrassCore from "@/components/three/GrassCore";
import { MagneticLink } from "@/components/ui/magnetic-button";

const stats = [
  { value: "18", label: "Deployed pilot systems" },
  { value: "94%", label: "Stream recovery accuracy" },
  { value: "6", label: "Research partnerships" },
];

const Hero = () => {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* 3D core */}
      <GrassCore className="absolute inset-0 h-full w-full" />

      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,transparent_20%,hsl(var(--background))_92%)]"
        aria-hidden="true"
      />

      <div className="section-shell relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-16">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 animate-pulseline rounded-full bg-primary" aria-hidden="true" />
            AI · Robotics · Materials Science
          </span>

          <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.03] sm:text-6xl lg:text-7xl">
            Intelligence that turns{" "}
            <span className="text-gradient">waste into resource</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            GRASS LAB is a deeptech research studio engineering autonomous systems for the circular
            economy — computer vision that sees every material stream, robotics that recovers it, and
            biomaterials that give it a second life.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink href="#contact">Partner with the lab</MagneticLink>
            <MagneticLink href="#frontiers" variant="ghost" withArrow={false}>
              Explore the frontiers
            </MagneticLink>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border/70 pt-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
              >
                <dt className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>

      <motion.a
        href="#vision"
        aria-label="Scroll to vision"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronDown className="animate-float" size={22} />
      </motion.a>
    </section>
  );
};

export default Hero;
