import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroEditorial = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = "Build a better system for your life.".split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center section-x pt-32 pb-20 overflow-hidden noise-bg"
    >
      {/* drifting soft gradients */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -right-32 w-[38rem] h-[38rem] rounded-full blur-3xl animate-drift"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--olive)/0.18), transparent 70%)" }} />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 -left-40 w-[32rem] h-[32rem] rounded-full blur-3xl animate-drift"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--ink)/0.06), transparent 70%)" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="container-editorial relative w-full">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="kicker mb-8"
        >
          A structured knowledge operating system
        </motion.p>

        <h1 className="font-display font-semibold display-tight text-[13vw] sm:text-[9vw] lg:text-[6.5rem] max-w-5xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 text-lg sm:text-xl text-ink-muted max-w-2xl leading-relaxed"
        >
          GSOrigins is a structured knowledge platform for health, mindset, tech, and
          lifestyle intelligence — designed so every scroll improves your life clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a href="#knowledge">
            <Button size="lg" className="rounded-full h-13 px-7 gap-2 text-base">
              Explore Knowledge <ArrowRight size={18} />
            </Button>
          </a>
          <a href="#systems">
            <Button variant="outline" size="lg" className="rounded-full h-13 px-7 gap-2 text-base border-foreground/15">
              Start Learning System <ArrowUpRight size={18} />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroEditorial;
