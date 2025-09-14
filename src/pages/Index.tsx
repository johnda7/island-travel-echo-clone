
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Destinations } from "@/components/Destinations";
import { Gallery } from "@/components/Gallery";
import { Tours } from "@/components/Tours";
import { Contact } from "@/components/Contact";
import { Advantages } from "@/components/Advantages";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Экскурсии по Пхукету — острова Пхи-Пхи, Майя Бэй, лагуны | Phuket Go</title>
        <meta
          name="description"
          content="Экскурсии и туры по Пхукету: Пхи-Пхи, Майя Бэй, Джеймс Бонд, коралловые острова. Локальная команда, честные цены, поддержка 24/7."
        />
        <meta property="og:title" content="Экскурсии по Пхукету | Phuket Go" />
        <meta property="og:description" content="Топ-экскурсии: Пхи-Пхи, Майя Бэй, лагуны. Бронируйте с локальной командой." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/'} />
      </Helmet>
      <Header />
      <Hero />
  <Destinations />
  <Advantages />
  <Gallery />
  <Tours />
  <Reviews />
  <FAQ />
  <Contact />
      <Footer />
    </div>
  );
};

export default Index;
