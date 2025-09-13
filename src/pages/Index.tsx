
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

const Index = () => {
  return (
    <div className="min-h-screen">
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
