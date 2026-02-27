
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Tours } from "@/components/Tours";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { FeaturedToursSection } from "@/components/FeaturedToursSection";
import { WhyUs } from "@/components/WhyUs";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Экскурсии на Пхукете 2026 — от 1000฿ | ПхукетGO"
        description="⭐ Лучшие туры на Пхукете 2026! Пхи-Пхи, Симиланы, Джеймс Бонд, Краби. Русскоязычные гиды, трансфер включён. Рейтинг 4.9/5. Бронируйте онлайн!"
        url="https://phukeo.com/"
        type="website"
      />
      <Header />
      <Hero />
      <FeaturedToursSection />
      <WhyUs />
      <Gallery />
      <Tours />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
