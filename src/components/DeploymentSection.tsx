import { motion } from "framer-motion";

const platforms = [
  { name: "Vercel", icon: "▲", tier: "Frontend", desc: "Deploy React/Next.js frontend. Free Hobby plan. Connect GitHub for auto-deploy.", steps: ["Push code to GitHub", "Import repo at vercel.com", "Set env variables", "Auto-deploy on push"], link: "https://vercel.com" },
  { name: "Render", icon: "🔷", tier: "Backend", desc: "Host Node.js/Python backend APIs. Free tier with 512MB RAM.", steps: ["Create Web Service", "Connect GitHub repo", "Add start command", "Set PORT env var"], link: "https://render.com" },
  { name: "Railway", icon: "🚂", tier: "Database", desc: "PostgreSQL, MySQL, or MongoDB. $5 free credit/month.", steps: ["New project → Database", "Copy connection string", "Add to .env file", "Run migrations"], link: "https://railway.app" },
  { name: "GitHub", icon: "🐙", tier: "Version Control", desc: "Free unlimited public repos. CI/CD via GitHub Actions.", steps: ["Create repo", "git init && git push", "Set up Actions workflow", "Auto-test & deploy"], link: "https://github.com" },
];

const roadmap = [
  { step: "1. Set up GitHub Repo", items: ["Create public/private repo", "Add .gitignore", "Set up branch protection", "Enable GitHub Actions"] },
  { step: "2. Backend (Render)", items: ["Build REST API", "Add environment vars", "Connect database URL", "Deploy web service"] },
  { step: "3. Frontend (Vercel)", items: ["Connect GitHub repo", "Configure build settings", "Set API base URL", "Enable auto-deploy"] },
  { step: "4. Database (Railway)", items: ["Provision PostgreSQL", "Run migrations", "Seed initial data", "Monitor usage"] },
];

const DeploymentSection = () => {
  return (
    <section id="deploy" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block text-xs font-semibold text-secondary tracking-widest uppercase mb-3">
            Deployment
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Deploy for Free — Zero Cost Stack
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
            Complete deployment guide using free tiers. Frontend + Backend + Database + CI/CD — all ₹0/month.
          </p>
        </motion.div>

        {/* Stack diagram */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 md:mb-14">
          {["GitHub (Code) 🐙", "→", "Vercel (Frontend) ▲", "→", "Render (Backend) 🔷", "→", "Railway (DB) 🚂"].map((t, i) =>
            t === "→" ? (
              <span key={i} className="text-secondary font-bold text-lg hidden sm:inline">→</span>
            ) : (
              <div key={i} className="glass-card rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold">{t}</div>
            )
          )}
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className="font-display font-bold text-base">{p.name}</div>
                    <div className="text-xs text-secondary">{p.tier}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">FREE</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
              <div className="border-t border-border pt-3">
                {p.steps.map((s, j) => (
                  <div key={s} className="flex gap-2 mb-1 text-xs">
                    <span className="text-secondary font-bold min-w-[16px]">{j + 1}.</span>
                    <span className="text-foreground">{s}</span>
                  </div>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-secondary text-xs font-semibold hover:underline">
                Visit {p.name} →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-5 sm:p-8"
        >
          <h3 className="font-display text-lg sm:text-xl font-bold mb-5">📋 Complete Deployment Roadmap</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((r) => (
              <div key={r.step}>
                <h4 className="font-display font-bold text-sm mb-3 text-secondary">{r.step}</h4>
                {r.items.map((it) => (
                  <div key={it} className="flex gap-2 mb-1.5 text-xs text-muted-foreground">
                    <span className="text-secondary">✓</span>{it}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeploymentSection;
