
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Destinations } from "@/components/Destinations";
import { Gallery } from "@/components/Gallery";
import { Tours } from "@/components/Tours";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Destinations />
      <Gallery />
      <Tours />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
