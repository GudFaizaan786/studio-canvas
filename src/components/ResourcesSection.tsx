import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Video, Headphones, Wrench, FileText } from "lucide-react";
import { usePosts } from "@/hooks/use-posts";

const iconFor = (category: string) => {
  const c = category.toLowerCase();
  if (c.includes("video")) return Video;
  if (c.includes("podcast")) return Headphones;
  if (c.includes("tool")) return Wrench;
  if (c.includes("article")) return BookOpen;
  return FileText;
};

const ResourcesSection = () => {
  const { posts, loading } = usePosts({ type: "resource" });

  return (
    <section id="resources" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-hand text-secondary text-xl sm:text-2xl">
            Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Sustainable Knowledge Hub</h2>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card h-32 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">
            No resources yet — check back soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const Icon = iconFor(post.category);
              return (
                <motion.a
                  key={post.id}
                  href={post.external_url || "#"}
                  target={post.external_url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="glass-card overflow-hidden group transition-all hover:scale-[1.02]"
                >
                  {post.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{post.title}</h3>
                    <span className="text-xs text-secondary font-medium capitalize">{post.category}</span>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
