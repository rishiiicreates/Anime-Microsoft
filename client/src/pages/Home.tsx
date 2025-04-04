import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProductSection from "@/components/ProductSection";
import FeaturedBanner from "@/components/FeaturedBanner";
import BusinessSection from "@/components/BusinessSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroBanner />
      <ProductSection />
      <FeaturedBanner />
      <BusinessSection />
      <SocialMediaSection />
      <Footer />
    </div>
  );
}
