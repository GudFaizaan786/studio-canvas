import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import aboutTeam from "@/assets/about-team.png";

const stats = [
  { icon: Users, label: "Community Members", value: "10K+" },
  { icon: Target, label: "Articles Published", value: "500+" },
  { icon: Lightbulb, label: "Green Ideas Shared", value: "1K+" },
  { icon: Award, label: "Lives Impacted", value: "50K+" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">
            About GSorigins
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Rooted in Sustainability, Growing with Purpose
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're a passionate community of health enthusiasts, tech innovators, and lifestyle advocates
            dedicated to promoting green, sustainable living through knowledge and inspiration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.img
            src={aboutTeam}
            alt="Our creative team"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg mx-auto drop-shadow-xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              GS HTML — Our Core Pillars
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              <strong>G</strong>reen <strong>S</strong>ustainable — <strong>H</strong>ealth, <strong>T</strong>echnology, <strong>M</strong>otivation, <strong>L</strong>ifestyle.
              Since 2022, we've been empowering people to make sustainable choices through evidence-based
              health tips, green tech innovations, motivational content, and mindful lifestyle guides.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center">
                  <stat.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
