
import { Link } from "react-router-dom";
import { Camera, ChevronRight, MapPin } from "lucide-react";

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
    <section id="gallery" className="py-8 relative overflow-hidden">
      {/* iOS 26 Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header - iOS 26 Style */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #5856D6 0%, #AF52DE 100%)',
                boxShadow: '0 4px 12px rgba(88, 86, 214, 0.35)'
              }}
            >
              <Camera className="w-4 h-4 text-white" />
            </div>
            <h2 
              className="text-xl md:text-2xl font-bold"
              style={{ fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif", color: '#1C1C1E' }}
            >
              Галерея
            </h2>
          </div>
          <span 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
          >
            {galleryImages.length} мест
          </span>
        </div>
        
        {/* Gallery Grid - iOS 26 Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImages.map((image, index) => (
            <Link 
              key={index} 
              to={image.tour}
              className="group relative overflow-hidden rounded-[20px] aspect-square cursor-pointer transition-all duration-300 active:scale-[0.98]"
            >
              {/* Image */}
              <img 
                src={image.src} 
                alt={image.title}
                loading={index < 2 ? "eager" : "lazy"}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Permanent Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Content - Always Visible */}
              <div className="absolute inset-x-0 bottom-0 p-3">
                {/* Liquid Glass Label */}
                <div 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.25)'
                  }}
                >
                  <MapPin className="w-3 h-3 text-white" />
                  <span 
                    className="text-[12px] font-semibold text-white"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif" }}
                  >
                    {image.title}
                  </span>
                  <ChevronRight className="w-3 h-3 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
              
              {/* Subtle Border */}
              <div 
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
