
import { Button } from "@/components/ui/button";
import { ArrowDown, MapPin, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import phiPhiImg from "@/assets/phi-phi-maya-bay.jpg";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${phiPhiImg}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/20 to-blue-900/60"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block animate-float">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-800">13+ пляжей</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-32 right-10 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-800">Рейтинг 4.8</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-16 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-gray-800">1000+ туристов</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm font-medium text-white mb-4">
            ✨ Откройте Пхукет с нами
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent animate-fade-in leading-tight">
          Лучшие пляжи и туры<br />
          <span className="text-3xl md:text-5xl lg:text-6xl">Пхукета</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Откройте для себя райские пляжи, захватывающие экскурсии и незабываемые приключения на самом популярном острове Таиланда.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            onClick={() => navigate('/category/plyazhi')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              Выбрать пляж
              <ArrowDown className="w-5 h-5 rotate-[-90deg]" />
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate('/tours')}
            className="border-2 border-white/80 text-white hover:bg-white hover:text-blue-900 px-10 py-4 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
          >
            Смотреть туры
          </Button>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100">13+ лучших пляжей</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100">Экспертные гиды</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100">Лучшие цены</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-blue-200">Узнать больше</span>
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
      </div>
    </section>
  );
};
