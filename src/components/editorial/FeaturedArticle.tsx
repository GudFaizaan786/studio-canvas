import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";

const FeaturedArticle = () => {
  return (
    <section id="featured" className="section-x section-y bg-foreground text-background noise-bg">
      <div className="container-editorial relative">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-background/60 mb-8">
            Featured deep article
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="font-display font-semibold display-tight text-4xl sm:text-6xl lg:text-7xl">
                The architecture of a focused life.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <p className="text-lg text-background/70 leading-relaxed">
                A long-form breakdown of how attention, environment and identity compound —
                and the exact sequence to rebuild them without burning out.
              </p>
              <a href="#frameworks">
                <Button
                  size="lg"
                  className="mt-8 rounded-full px-7 gap-2 bg-background text-foreground hover:bg-background/90"
                >
                  Read the full guide <ArrowRight size={18} />
                </Button>
              </a>
              <div className="mt-6 flex items-center gap-4 text-sm text-background/50">
                <span>18 min read</span>
                <span className="w-1 h-1 rounded-full bg-background/40" />
                <span>Mind &amp; Systems</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
