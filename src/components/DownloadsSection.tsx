import { motion } from "framer-motion";
import { Download, FileText, Image, Code, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import downloadsIllustration from "@/assets/downloads-illustration.png";

const downloads = [
  { icon: FileText, name: "Sustainable Living Guide", size: "3.2 MB", type: "PDF" },
  { icon: Image, name: "Green Tech Infographics", size: "12 MB", type: "ZIP" },
  { icon: Code, name: "Eco Habit Tracker Template", size: "1.8 MB", type: "ZIP" },
  { icon: Film, name: "Motivation Video Pack", size: "45 MB", type: "ZIP" },
];

const DownloadsSection = () => {
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
            <span className="text-sm font-medium text-secondary uppercase tracking-widest">
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
              {downloads.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="glass-card p-4 flex items-center gap-4 group cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.type} • {item.size}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0 gap-1 opacity-60 group-hover:opacity-100">
                    <Download size={16} /> Get
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={downloadsIllustration}
              alt="Cloud downloads"
              className="w-full max-w-md animate-float"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
