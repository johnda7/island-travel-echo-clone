
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out hover:scale-105"
          style={{
            backgroundImage: `url('${getAssetPath("maya-bay-sunrise.jpg")}')`
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
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Animated Title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 leading-tight">
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              ПХУКЕТ
            </span>
            <span className="block text-3xl md:text-5xl font-light mt-2 text-cyan-100 drop-shadow-lg">
              Тропический рай ждёт вас
            </span>
          </h1>
        </div>
        
        {/* Subtitle with Animation */}
        <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300 drop-shadow-md">
          🏝️ Кристально чистые воды • 🌅 Закаты мечты • 🐠 Подводный мир<br />
          Откройте для себя магию тайских островов с нашими эксклюзивными турами
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-500">
          <Button 
            size="lg" 
            asChild 
            className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-500 text-white px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-cyan-400/60 transition-all duration-700 transform hover:scale-105 border border-white/30 backdrop-blur-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
          >
            <Link to="/tours" className="flex items-center relative z-10">
              <Waves className="w-6 h-6 mr-3 group-hover:animate-pulse transition-all duration-300" />
              <span className="relative">
                Выбрать тур
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-500"></span>
              </span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-500" />
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
