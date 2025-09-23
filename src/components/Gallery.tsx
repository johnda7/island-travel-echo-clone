
import { Link } from "react-router-dom";
import { Camera, Eye, ArrowRight } from "lucide-react";

// Get the base path for proper asset loading
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return base + 'assets/' + path;
};

const galleryImages = [
  { 
    src: getAssetPath("maya-bay-1.jpg"),
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Майя Бэй"
  },
  { 
    src: getAssetPath("maya-bay-2.jpg"),
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Пхи-Пхи острова"
  },
  { 
    src: getAssetPath("bamboo-island.webp"),
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Остров Бамбу"
  },
  { 
    src: getAssetPath("pileh-lagoon.jpg"),
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Лагуна Пиле"
  },
  { 
    src: getAssetPath("racha-1.jpg"),
    tour: "/excursion/pearls-andaman-sea",
    title: "Остров Рача"
  },
  { 
    src: getAssetPath("james-1.jpg"),
    tour: "/excursion/pearls-andaman-sea",
    title: "Остров Джеймса Бонда"
  }
];

export const Gallery = () => {
  return (
    <section id="gallery" className="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse delay-2500"></div>
          <div className="absolute top-2/3 right-1/5 w-2.5 h-2.5 bg-blue-300 rounded-full animate-pulse delay-3500"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Camera className="w-8 h-8 text-purple-400 mr-3 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Галерея
            </h2>
            <Eye className="w-8 h-8 text-cyan-400 ml-3 animate-pulse delay-500" />
          </div>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
            Взгляните на <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent font-semibold">красоту мест</span>, которые вы можете посетить
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <Link 
              key={index} 
              to={image.tour}
              className={`group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in backdrop-blur-sm border border-white/20`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20">
                  <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    {image.title}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                    <span className="mr-2">Перейти к туру</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:via-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 opacity-10">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-cyan-500 animate-pulse"></div>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};
