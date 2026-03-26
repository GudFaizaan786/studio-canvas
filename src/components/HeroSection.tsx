import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCharacter from "@/assets/hero-character.png";
import abstractBg from "@/assets/abstract-bg.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-24 py-20 lg:py-28 pt-28 sm:pt-32 overflow-hidden"
    >
      {/* Abstract background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={abstractBg}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            Green Sustainable • Health • Technology • Motivation • Lifestyle
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Live{" "}
            <span className="text-gradient">Green & Sustainable</span>{" "}
            Every Day
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Empowering you with insights on sustainable health, cutting-edge green technology,
            daily motivation, and a mindful lifestyle. Start your journey with GSorigins.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              Explore Now <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg">
              Our Mission
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img
            src={heroCharacter}
            alt="Creative professional working"
            className="w-full max-w-lg animate-float drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
