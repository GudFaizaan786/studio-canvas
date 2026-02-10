import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import blogIllustration from "@/assets/blog-illustration.png";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
};

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Green Tech Innovations Changing the World in 2026",
    excerpt: "From solar-powered gadgets to AI-driven energy optimization — how green technology is reshaping our future.",
    date: "Feb 5, 2026",
    readTime: "5 min",
    category: "Technology",
  },
  {
    id: 2,
    title: "Building a Sustainable Morning Routine for Better Health",
    excerpt: "Simple, eco-friendly health habits that boost your energy and reduce your carbon footprint.",
    date: "Jan 28, 2026",
    readTime: "8 min",
    category: "Health",
  },
  {
    id: 3,
    title: "Stay Motivated: The Power of Purpose-Driven Living",
    excerpt: "How aligning your daily actions with sustainability goals fuels lasting motivation and fulfillment.",
    date: "Jan 15, 2026",
    readTime: "4 min",
    category: "Motivation",
  },
];

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [showEditor, setShowEditor] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handlePublish = () => {
    if (!newTitle.trim() || !newExcerpt.trim()) {
      toast.error("Please fill in title and content");
      return;
    }
    const post: BlogPost = {
      id: Date.now(),
      title: newTitle,
      excerpt: newExcerpt,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: `${Math.max(2, Math.ceil(newExcerpt.length / 200))} min`,
      category: newCategory || "General",
    };
    setPosts([post, ...posts]);
    setNewTitle("");
    setNewExcerpt("");
    setNewCategory("");
    setShowEditor(false);
    toast.success("Blog post published!");
  };

  return (
    <section id="blog" className="section-padding">
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
              GS Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Green Living Insights
            </h2>
          </div>
          <Button onClick={() => setShowEditor(!showEditor)} className="gap-2">
            {showEditor ? <X size={18} /> : <Plus size={18} />}
            {showEditor ? "Cancel" : "Write Post"}
          </Button>
        </motion.div>

        {/* Blog editor */}
        {showEditor && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mb-10"
          >
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">New Blog Post</h3>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Your amazing blog title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Content / Excerpt</Label>
                <Textarea
                  placeholder="Write your blog content here..."
                  rows={5}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                />
              </div>
              <div className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                  <Label>Category</Label>
                  <Input
                    placeholder="e.g. Design, Dev, Case Study"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>
                <Button onClick={handlePublish}>Publish Post</Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                <img
                  src={blogIllustration}
                  alt=""
                  className="w-28 h-28 object-contain opacity-60 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-secondary">{post.category}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" className="gap-2">
            View All Posts <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
