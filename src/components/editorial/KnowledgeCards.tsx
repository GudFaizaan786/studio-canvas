import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Reveal from "./Reveal";
import { usePosts } from "@/hooks/use-posts";

const fallback = [
  { id: "f1", category: "Health", title: "Fix your sleep cycle in 7 days", excerpt: "A protocol to reset your circadian rhythm using light, temperature and timing.", read_time: "6 min read", content: "Small, sequenced changes compound into a reliable sleep architecture." },
  { id: "f2", category: "Mind", title: "Modern dopamine traps explained", excerpt: "Why your attention feels hijacked — and the mechanics behind the pull.", read_time: "8 min read", content: "Understand the loop before you try to break it." },
  { id: "f3", category: "Tech", title: "Tech tools that improve focus", excerpt: "A curated stack that removes friction instead of adding notifications.", read_time: "5 min read", content: "The right tools disappear into your workflow." },
  { id: "f4", category: "Life", title: "Daily discipline framework", excerpt: "Turn willpower into an environment that makes the default the right choice.", read_time: "7 min read", content: "Discipline is a design problem, not a character flaw." },
  { id: "f5", category: "Health", title: "The energy management model", excerpt: "Manage energy, not time — a rhythm for sustainable output.", read_time: "6 min read", content: "Peaks and troughs are features, not bugs." },
  { id: "f6", category: "Mind", title: "Building a calm mind at scale", excerpt: "Attention practices that hold up under real-world pressure.", read_time: "9 min read", content: "Calm is a trainable, measurable skill." },
];

const KnowledgeCards = () => {
  const { posts } = usePosts({ type: "blog" });
  const [active, setActive] = useState<string | null>(null);

  const items = posts.length >= 3 ? posts.slice(0, 6).map((p) => ({
    id: p.id, category: p.category, title: p.title,
    excerpt: p.excerpt ?? "", read_time: p.read_time ?? "5 min read",
    content: p.excerpt ?? "",
  })) : fallback;

  return (
    <section id="knowledge" className="section-x section-y">
      <div className="container-editorial">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <Reveal className="max-w-2xl">
            <p className="kicker mb-4">Knowledge cards</p>
            <h2 className="font-display font-semibold display-tight text-4xl sm:text-5xl lg:text-[3.5rem]">
              Structured insight, one card at a time.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#featured" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-foreground transition-colors">
              Browse the library <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <motion.article
                onHoverStart={() => setActive(item.id)}
                onHoverEnd={() => setActive(null)}
                className="edit-card h-full p-7 flex flex-col cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-secondary">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-ink-muted">
                    <Clock size={12} /> {item.read_time}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-2xl tracking-tight mt-5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-ink-muted leading-relaxed mt-3 line-clamp-3">{item.excerpt}</p>

                <AnimatePresence>
                  {active === item.id && item.content && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-ink-muted italic mt-4 pt-4 border-t" style={{ borderColor: "hsl(var(--hairline) / 0.1)" }}>
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto pt-6 flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Read insight <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCards;
