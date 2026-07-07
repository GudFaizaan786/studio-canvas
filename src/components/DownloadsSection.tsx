import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/use-posts";
import downloadsIllustration from "@/assets/downloads-illustration.png";

const DownloadsSection = () => {
  const { posts, loading } = usePosts({ type: "download" });

  return (
    <section id="downloads" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-hand text-secondary text-xl sm:text-2xl">
              Downloads
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Free Green Living Resources
            </h2>
            <p className="text-muted-foreground mb-8">
              Download our curated guides, trackers, and toolkits to kickstart your sustainable
              health & lifestyle journey.
            </p>

            <div className="flex flex-col gap-4">
              {loading ? (
                [1, 2, 3].map((i) => <div key={i} className="glass-card h-16 animate-pulse" />)
              ) : posts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No downloads available yet.</p>
              ) : (
                posts.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={item.external_url || "#"}
                    target={item.external_url ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="glass-card p-4 flex items-center gap-4 group cursor-pointer transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.image_url ? (
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {item.category}{item.read_time ? ` • ${item.read_time}` : ""}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0 gap-1 opacity-60 group-hover:opacity-100">
                      <Download size={16} /> Get
                    </Button>
                  </motion.a>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img src={downloadsIllustration} alt="Cloud downloads" className="w-full max-w-md animate-float" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
