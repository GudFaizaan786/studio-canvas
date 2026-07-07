import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Calendar, ArrowRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type UNPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  sdgTag: string;
};

const defaultUNPosts: UNPost[] = [
  {
    id: 1,
    title: "UNDP Climate Action Report 2026: Key Takeaways",
    excerpt:
      "Summarizing the latest UNDP findings on global climate commitments, green financing, and adaptation strategies for developing nations.",
    date: "Mar 10, 2026",
    sdgTag: "SDG 13 — Climate Action",
  },
  {
    id: 2,
    title: "Sustainable Cities: UN-Habitat's Vision for 2030",
    excerpt:
      "How urban planning, renewable infrastructure, and inclusive governance are shaping the cities of tomorrow.",
    date: "Feb 22, 2026",
    sdgTag: "SDG 11 — Sustainable Cities",
  },
  {
    id: 3,
    title: "Clean Water & Sanitation: Progress and Challenges",
    excerpt:
      "The UN's latest data on global access to clean water, innovations in purification tech, and community-driven sanitation projects.",
    date: "Jan 30, 2026",
    sdgTag: "SDG 6 — Clean Water",
  },
  {
    id: 4,
    title: "Partnerships for the Goals: Open-Source & the UN",
    excerpt:
      "How open-source technology and global partnerships are accelerating progress on all 17 Sustainable Development Goals.",
    date: "Jan 12, 2026",
    sdgTag: "SDG 17 — Partnerships",
  },
];

const UNDPSection = () => {
  const [posts, setPosts] = useState<UNPost[]>(defaultUNPosts);
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [sdgTag, setSdgTag] = useState("");

  const handlePublish = () => {
    if (!title.trim() || !excerpt.trim()) {
      toast.error("Please fill in title and content");
      return;
    }
    const post: UNPost = {
      id: Date.now(),
      title,
      excerpt,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      sdgTag: sdgTag || "UN Content",
    };
    setPosts([post, ...posts]);
    setTitle("");
    setExcerpt("");
    setSdgTag("");
    setShowEditor(false);
    toast.success("UNDP post published!");
  };

  return (
    <section id="undp" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[hsl(210,80%,45%)]/10 flex items-center justify-center">
              <Globe className="text-[hsl(210,80%,45%)]" size={28} />
            </div>
            <div>
              <span className="font-hand text-[hsl(210,80%,45%)] text-xl sm:text-2xl">
                United Nations
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1">
                UNDP & SDG Updates
              </h2>
            </div>
          </div>
          <Button onClick={() => setShowEditor(!showEditor)} className="gap-2">
            {showEditor ? <X size={18} /> : <Plus size={18} />}
            {showEditor ? "Cancel" : "Post UN Content"}
          </Button>
        </motion.div>

        {showEditor && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mb-10"
          >
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">
              New UNDP Post
            </h3>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="UNDP report title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Content / Excerpt</Label>
                <Textarea
                  placeholder="Summarize the UN content..."
                  rows={4}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
              <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                  <Label>SDG Tag</Label>
                  <Input
                    placeholder="e.g. SDG 13 — Climate Action"
                    value={sdgTag}
                    onChange={(e) => setSdgTag(e.target.value)}
                  />
                </div>
                <Button onClick={handlePublish}>Publish</Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card p-6 group cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-[3px] bg-[hsl(210,80%,45%)]/10 text-[hsl(210,80%,45%)]">
                  {post.sdgTag}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Calendar size={12} /> {post.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-4">
                <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UNDPSection;
