import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NatureVideoSection from "@/components/NatureVideoSection";
import AboutSection from "@/components/AboutSection";
import DownloadsSection from "@/components/DownloadsSection";
import ResourcesSection from "@/components/ResourcesSection";
import CommunitySection from "@/components/CommunitySection";
import UNDPSection from "@/components/UNDPSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <NatureVideoSection />
        <AboutSection />
        <DownloadsSection />
        <ResourcesSection />
        <CommunitySection />
        <UNDPSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
