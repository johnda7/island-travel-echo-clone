
import { Hero } from "@/components/Hero";
import { Destinations } from "@/components/Destinations";
import { Gallery } from "@/components/Gallery";
import { Tours } from "@/components/Tours";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Destinations />
      <Gallery />
      <Tours />
      <Contact />
    </div>
  );
};

export default Index;
