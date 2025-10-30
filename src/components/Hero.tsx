
import { Button } from "@/components/ui/button";
import { ArrowDown, Waves, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Get the base path for proper asset loading
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return base + 'assets/' + path;
};

export const Hero = () => {
  return (
    <section className="relative h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${getAssetPath("phi-phi-lagoon.jpg")}')`
          }}
        />
        
        {/* iOS 26 Subtle Gradient Overlays - Clean & Minimal */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
      </div>
      
      {/* Hero Title - Top */}
      <div className="absolute top-20 md:top-24 left-0 right-0 z-20 text-center animate-fade-in px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
          <span className="block text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
            ПХУКЕТ
          </span>
        </h1>
        <p className="text-base md:text-lg text-white font-medium drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
          Тропический рай ждёт вас
        </p>
      </div>
      
      {/* Main Content - Center */}
      <div className="relative z-10 text-center text-white px-4 w-full h-full flex flex-col justify-end items-center pb-8">
        
        {/* Call to Action Button - Elegant & Centered */}
        <div className="animate-fade-in delay-300">
          <Button 
            size="lg" 
            asChild 
            className="bg-[#007AFF] hover:bg-[#0051D5] text-white px-12 py-4 text-xl md:text-2xl font-semibold rounded-full shadow-[0_8px_32px_rgba(0,122,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,122,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 border-none transform hover:scale-105 backdrop-blur-xl"
            style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
          >
            <Link to="/tours">
              Выбрать тур
            </Link>
          </Button>
        </div>
        
      </div>
    </section>
  );
};
