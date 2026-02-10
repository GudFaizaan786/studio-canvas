import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ExternalLink, BookOpen, Video, Headphones, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Resource = {
  id: number;
  title: string;
  url: string;
  category: string;
  icon: typeof BookOpen;
};

const defaultResources: Resource[] = [
  { id: 1, title: "Plant-Based Nutrition 101", url: "#", category: "Article", icon: BookOpen },
  { id: 2, title: "Solar Energy for Beginners", url: "#", category: "Video", icon: Video },
  { id: 3, title: "The Green Motivation Podcast", url: "#", category: "Podcast", icon: Headphones },
  { id: 4, title: "Carbon Footprint Calculator", url: "#", category: "Tool", icon: Wrench },
  { id: 5, title: "Mental Wellness & Eco-Anxiety Guide", url: "#", category: "Article", icon: BookOpen },
  { id: 6, title: "Smart Home Green Tech Setup", url: "#", category: "Video", icon: Video },
];

const categoryIcons: Record<string, typeof BookOpen> = {
  Article: BookOpen,
  Video: Video,
  Podcast: Headphones,
  Tool: Wrench,
};

const ResourcesSection = () => {
  const [resources, setResources] = useState<Resource[]>(defaultResources);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("Article");

  const handleAdd = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const resource: Resource = {
      id: Date.now(),
      title: newTitle,
      url: newUrl || "#",
      category: newCategory,
      icon: categoryIcons[newCategory] || BookOpen,
    };
    setResources([resource, ...resources]);
    setNewTitle("");
    setNewUrl("");
    setShowAdd(false);
    toast.success("Resource added!");
  };

  return (
    <section id="resources" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm font-medium text-secondary uppercase tracking-widest">
              Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Sustainable Knowledge Hub
            </h2>
          </div>
          <Button onClick={() => setShowAdd(!showAdd)} className="gap-2">
            <Plus size={18} /> Add Resource
          </Button>
        </motion.div>

        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-card p-6 mb-8"
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                placeholder="Resource title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Input
                placeholder="URL (optional)"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <div className="flex gap-2">
                <select
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option>Article</option>
                  <option>Video</option>
                  <option>Podcast</option>
                  <option>Tool</option>
                </select>
                <Button onClick={handleAdd}>Add</Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <motion.a
              key={resource.id}
              href={resource.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="glass-card p-6 group transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <resource.icon className="w-5 h-5 text-primary" />
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
              <span className="text-xs text-secondary font-medium">{resource.category}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
