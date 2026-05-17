import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/use-posts";
import blogIllustration from "@/assets/blog-illustration.png";

const BlogSection = () => {
  const { posts, loading } = usePosts({ type: "blog" });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">
            GS Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Green Living Insights</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Stories on sustainable health, green technology, motivation, and lifestyle.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-96 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">
            No blog posts yet — check back soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-card overflow-hidden group cursor-pointer transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img src={blogIllustration} alt="" className="w-24 h-24 opacity-50" />
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(post.created_at)}
                    </span>
                    {post.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.read_time}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
