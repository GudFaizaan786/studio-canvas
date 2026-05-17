import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Cpu, Heart, Flame, Sparkles, FileText, Image as ImageIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContentType = "blog" | "infographic" | "video";
type CategoryKey = "health" | "technology" | "motivation" | "lifestyle" | "sustainability";

interface Item {
  type: ContentType;
  title: string;
  excerpt: string;
}

const categories: { key: CategoryKey; label: string; icon: React.ElementType; color: string; items: Item[] }[] = [
  {
    key: "health",
    label: "Health",
    icon: Heart,
    color: "text-rose-400",
    items: [
      { type: "blog", title: "Plant-Based Diets for a Greener You", excerpt: "How eating greener heals your body and the planet." },
      { type: "infographic", title: "Air Quality & Your Lungs", excerpt: "Visual breakdown of pollutants and how to defend against them." },
      { type: "video", title: "Forest Bathing 101", excerpt: "A 5-min guide to nature-based mental wellness." },
    ],
  },
  {
    key: "technology",
    label: "Technology",
    icon: Cpu,
    color: "text-cyan-400",
    items: [
      { type: "blog", title: "Open-Source Solar Controllers", excerpt: "Building affordable solar tech with community code." },
      { type: "infographic", title: "Carbon Cost of AI Models", excerpt: "What every prompt really costs the planet." },
      { type: "video", title: "Inside a Sustainable Datacenter", excerpt: "Touring a 100% renewable-powered facility." },
    ],
  },
  {
    key: "motivation",
    label: "Motivation",
    icon: Flame,
    color: "text-orange-400",
    items: [
      { type: "blog", title: "Why Small Eco-Habits Matter", excerpt: "The compounding power of daily green actions." },
      { type: "infographic", title: "Climate Heroes You Should Know", excerpt: "Faces of the youth-led sustainability movement." },
      { type: "video", title: "From Burnout to Eco-Activism", excerpt: "Finding purpose through planet-positive work." },
    ],
  },
  {
    key: "lifestyle",
    label: "Lifestyle",
    icon: Sparkles,
    color: "text-purple-400",
    items: [
      { type: "blog", title: "Zero-Waste Kitchen Starter Kit", excerpt: "Simple swaps that cut household waste by 70%." },
      { type: "infographic", title: "Slow Fashion vs Fast Fashion", excerpt: "Side-by-side environmental footprint comparison." },
      { type: "video", title: "Tour: A Tiny Off-Grid Home", excerpt: "Living beautifully with less, powered by sun." },
    ],
  },
  {
    key: "sustainability",
    label: "Sustainability",
    icon: Leaf,
    color: "text-secondary",
    items: [
      { type: "blog", title: "Circular Economy in 5 Minutes", excerpt: "The model replacing take-make-waste capitalism." },
      { type: "infographic", title: "17 SDGs at a Glance", excerpt: "UN's Sustainable Development Goals visualized." },
      { type: "video", title: "Regenerative Farming Explained", excerpt: "How soil can pull carbon from the sky." },
    ],
  },
];

const typeIcon = { blog: FileText, infographic: ImageIcon, video: Play };
const typeLabel = { blog: "Blog", infographic: "Infographic", video: "Video" };

const CategoriesSection = () => {
  const [active, setActive] = useState<CategoryKey>("sustainability");
  const [filter, setFilter] = useState<ContentType | "all">("all");

  const current = categories.find((c) => c.key === active)!;
  const filtered = filter === "all" ? current.items : current.items.filter((i) => i.type === filter);

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

        {/* Category tabs */}
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

        {/* Type filters */}
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

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filtered.map((item, i) => {
              const TIcon = typeIcon[item.type];
              return (
                <div key={i} className="glass-card p-5 sm:p-6 rounded-2xl hover:border-secondary/50 transition-all group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-lg bg-secondary/10 ${current.color}`}>
                      <TIcon size={16} />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{typeLabel[item.type]}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.excerpt}</p>
                  <Button size="sm" variant="ghost" className="px-0 h-auto text-secondary">
                    Explore →
                  </Button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategoriesSection;
