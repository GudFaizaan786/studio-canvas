import { motion } from "framer-motion";

const features = [
  { icon: "📝", title: "Post Problems", desc: "Share everyday challenges from ₹1000 jugaad solutions to complex social issues", accent: "text-secondary" },
  { icon: "💡", title: "Submit Solutions", desc: "Text, video, or prototype — creative jugaad ideas from every corner of India", accent: "text-accent" },
  { icon: "🗳️", title: "Vote & Validate", desc: "Community voting plus expert review. Best solutions get national recognition", accent: "text-secondary" },
  { icon: "💰", title: "Earn Rewards", desc: "Winners get ₹5 lakh + incubation, ₹2 lakh + internships, ₹1 lakh + media feature", accent: "text-accent" },
  { icon: "🎮", title: "Gamification", desc: "Points, badges, leaderboards — Village Innovator, Street Genius, Eco Warrior", accent: "text-secondary" },
  { icon: "🌱", title: "Green Jugaad", desc: "Special eco category for waste reduction, water conservation, renewable hacks", accent: "text-accent" },
];

const phases = [
  { icon: "🎓", title: "Phase 1: Campus Launch", items: ["Launch in Tier 2 & 3 colleges", "Campus ambassador program", "₹50K inaugural challenge"], active: true },
  { icon: "🏙️", title: "Phase 2: Urban Scale", items: ["Partner with NGOs & MSMEs", "Regional language support", "100K users target"], active: false },
  { icon: "🌾", title: "Phase 3: Rural India", items: ["WhatsApp bot integration", "Voice-based submissions", "Government program tie-ups"], active: false },
];

const JugaadXSection = () => {
  return (
    <section id="jugaadx" className="section-padding relative overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-card/40 to-background" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-sm font-bold tracking-wide mb-5">
            <span className="text-lg">⚡</span> INTRODUCING JUGAADX
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="text-gradient">Turn Problems</span>{" "}
            into Power
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            India's first gamified problem-solving platform where everyday people post real problems and earn rewards for creative jugaad solutions.
          </p>
          <a
            href="https://jugaadx.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-7 py-3.5 rounded-xl font-extrabold text-base tracking-wide hover:opacity-90 transition-opacity"
          >
            ⚡ Launch JugaadX
          </a>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 sm:p-6"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className={`font-display font-bold text-lg mb-2 ${f.accent}`}>{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Go-to-Market Phases */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-center mb-8">
          Go-To-Market Roadmap
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {phases.map((ph) => (
            <motion.div
              key={ph.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`glass-card p-5 sm:p-6 ${ph.active ? "border-secondary/40" : ""}`}
            >
              {ph.active && (
                <span className="inline-block text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-md mb-3">
                  ACTIVE
                </span>
              )}
              <div className="text-2xl mb-2">{ph.icon}</div>
              <h4 className="font-display font-bold text-base mb-3">{ph.title}</h4>
              {ph.items.map((it) => (
                <div key={it} className="flex gap-2 mb-1.5 text-sm text-muted-foreground">
                  <span className="text-secondary">→</span>{it}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JugaadXSection;
