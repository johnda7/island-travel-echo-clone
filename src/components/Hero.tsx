
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-20000 ease-linear hover:scale-105"
          style={{
            backgroundImage: `url('/src/assets/maya-bay-sunrise.jpg')`
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
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-10 py-4 text-xl font-semibold rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 transform hover:scale-110 border border-white/20 backdrop-blur-sm"
          >
            <Link to="/tours">
              <span className="mr-2">🚤</span>
              Выбрать тур
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            <Link to="/gallery">
              <span className="mr-2">📸</span>
              Галерея
            </Link>
          </Button>
        </div>
        
        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in delay-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300">1000+</div>
            <div className="text-sm text-gray-300">Счастливых туристов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300">15+</div>
            <div className="text-sm text-gray-300">Лет опыта</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300">50+</div>
            <div className="text-sm text-gray-300">Уникальных маршрутов</div>
          </div>
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/80">
          <div className="text-sm mb-2 animate-pulse">Прокрутите вниз</div>
          <ArrowDown className="w-6 h-6" />
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
