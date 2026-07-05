import EditorialNav from "@/components/editorial/EditorialNav";
import HeroEditorial from "@/components/editorial/HeroEditorial";
import PillarsSection from "@/components/editorial/PillarsSection";
import DailySystems from "@/components/editorial/DailySystems";
import KnowledgeCards from "@/components/editorial/KnowledgeCards";
import FeaturedArticle from "@/components/editorial/FeaturedArticle";
import FrameworksSection from "@/components/editorial/FrameworksSection";
import StatsSection from "@/components/editorial/StatsSection";
import CaseStudies from "@/components/editorial/CaseStudies";
import NewsletterSection from "@/components/editorial/NewsletterSection";
import FooterEditorial from "@/components/editorial/FooterEditorial";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <EditorialNav />
      <main>
        <HeroEditorial />
        <PillarsSection />
        <DailySystems />
        <KnowledgeCards />
        <FeaturedArticle />
        <FrameworksSection />
        <StatsSection />
        <CaseStudies />
        <NewsletterSection />
      </main>
      <FooterEditorial />
    </div>
  );
};

export default Index;
