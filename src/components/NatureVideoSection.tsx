import { motion } from "framer-motion";

const NatureVideoSection = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Nature Is Our <span className="text-secondary">Origin</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Every step toward sustainability is a step toward preserving the beauty around us.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NatureVideoSection;
