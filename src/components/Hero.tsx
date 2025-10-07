
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${getAssetPath("phi-phi-lagoon.jpg")}')`
          }}
        />
        
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-transparent to-cyan-500/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse delay-3000"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-4000"></div>
        </div>
      </div>
      
      {/* Hero Title - Top */}
      <div className="absolute top-20 left-0 right-0 z-20 text-center animate-fade-in px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-3">
          <span className="block bg-gradient-to-r from-white via-cyan-50 to-blue-50 bg-clip-text text-transparent drop-shadow-2xl">
            ПХУКЕТ
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-cyan-50 font-light drop-shadow-lg">
          Тропический рай ждёт вас
        </p>
      </div>
      
      {/* Main Content - Center */}
      <div className="relative z-10 text-center text-white px-4 w-full h-full flex flex-col justify-center items-center pt-20">
        
        {/* Call to Action Button - Elegant & Centered */}
        <div className="animate-fade-in delay-300">
          <Button 
            size="lg" 
            asChild 
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-12 py-4 text-xl md:text-2xl font-semibold rounded-full shadow-[0_8px_32px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] transition-all duration-300 border-2 border-white/30 hover:border-white/50 transform hover:scale-105"
          >
            <Link to="/tours">
              Выбрать тур
            </Link>
          </Button>
        </div>
        
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 animate-pulse"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};
