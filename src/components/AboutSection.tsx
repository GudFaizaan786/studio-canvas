import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import aboutTeam from "@/assets/about-team.png";

const stats = [
  { icon: Users, label: "Team Members", value: "50+" },
  { icon: Target, label: "Projects Done", value: "200+" },
  { icon: Lightbulb, label: "Ideas Shipped", value: "500+" },
  { icon: Award, label: "Awards Won", value: "30+" },
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
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Passionate Creators & Innovators
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're a team of designers, developers, and strategists who love turning complex problems
            into simple, beautiful, and intuitive digital solutions.
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
              Driven by Curiosity, Powered by Design
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Since 2018, we've been helping startups and enterprises build remarkable digital
              products. Our approach blends research, strategy, and bold design to deliver
              experiences that truly connect with users.
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
