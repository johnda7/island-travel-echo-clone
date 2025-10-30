
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
    <section id="gallery" className="relative py-6 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white overflow-hidden">
      {/* iOS 26 Style Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header - iOS 26 Style */}
        <div className="text-center mb-4 animate-fade-in">
          <div className="flex items-center justify-center mb-2">
            <Camera className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
              Галерея
            </h2>
            <Eye className="w-5 h-5 text-cyan-600 ml-2" />
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto font-light leading-relaxed" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
            Взгляните на <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">красоту мест</span>, которые вы можете посетить
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <Link 
              key={index} 
              to={image.tour}
              className={`group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in bg-white border border-gray-200 hover:scale-[1.02]`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
              />
              
              {/* iOS 26 Style Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content Overlay - iOS 26 Style */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-4 border border-white/30 shadow-lg">
                  <h3 className="font-semibold text-lg mb-2 text-white" style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif" }}>
                    {image.title}
                  </h3>
                  <div className="flex items-center text-white/90 text-sm transition-colors duration-300" style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}>
                    <span className="mr-2">Перейти к туру</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
