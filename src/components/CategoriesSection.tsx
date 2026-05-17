import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Cpu, Heart, Flame, Sparkles, FileText, Image as ImageIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/use-posts";

type ContentType = "blog" | "infographic" | "video";
type CategoryKey = "health" | "technology" | "motivation" | "lifestyle" | "sustainability";

const categories: { key: CategoryKey; label: string; icon: React.ElementType; color: string }[] = [
  { key: "health", label: "Health", icon: Heart, color: "text-rose-400" },
  { key: "technology", label: "Technology", icon: Cpu, color: "text-cyan-400" },
  { key: "motivation", label: "Motivation", icon: Flame, color: "text-orange-400" },
  { key: "lifestyle", label: "Lifestyle", icon: Sparkles, color: "text-purple-400" },
  { key: "sustainability", label: "Sustainability", icon: Leaf, color: "text-secondary" },
];

const typeIcon = { blog: FileText, infographic: ImageIcon, video: Play };
const typeLabel = { blog: "Blog", infographic: "Infographic", video: "Video" };

const CategoriesSection = () => {
  const [active, setActive] = useState<CategoryKey>("sustainability");
  const [filter, setFilter] = useState<ContentType | "all">("all");
  const { posts, loading } = usePosts({ category: active });

  const filtered = useMemo(
    () => posts.filter((p) => ["blog", "infographic", "video"].includes(p.type) && (filter === "all" || p.type === filter)),
    [posts, filter]
  );

  const current = categories.find((c) => c.key === active)!;

  return (
    <section id="categories" className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">
            Explore by <span className="text-secondary">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Blogs, infographics, and videos across the GS HTML pillars.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.key === active;
            return (
              <button
                key={cat.key}
                onClick={() => { setActive(cat.key); setFilter("all"); }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                  isActive
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-secondary/50"
                }`}
              >
                <Icon size={14} className={isActive ? "" : cat.color} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(["all", "blog", "infographic", "video"] as const).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={filter === t ? "default" : "outline"}
              onClick={() => setFilter(t)}
              className="capitalize text-xs"
            >
              {t === "all" ? "All" : typeLabel[t] + "s"}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active + filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {loading ? (
              [1, 2, 3].map((i) => <div key={i} className="glass-card h-72 animate-pulse" />)
            ) : filtered.length === 0 ? (
              <div className="col-span-full glass-card p-10 text-center text-muted-foreground">
                No content in this category yet.
              </div>
            ) : (
              filtered.map((item) => {
                const TIcon = typeIcon[item.type as ContentType] || FileText;
                return (
                  <a
                    key={item.id}
                    href={item.external_url || "#"}
                    target={item.external_url ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="glass-card overflow-hidden rounded-2xl hover:border-secondary/50 transition-all group"
                  >
                    {item.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`p-2 rounded-lg bg-secondary/10 ${current.color}`}>
                          <TIcon size={16} />
                        </div>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          {typeLabel[item.type as ContentType] || item.type}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
                      )}
                    </div>
                  </a>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategoriesSection;
