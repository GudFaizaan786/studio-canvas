import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DownloadsSection from "@/components/DownloadsSection";
import ResourcesSection from "@/components/ResourcesSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DownloadsSection />
        <ResourcesSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
