
import { Link } from "react-router-dom";

const galleryImages = [
  { 
    src: "/assets/maya-bay-1.jpg",
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Майя Бэй"
  },
  { 
    src: "/assets/maya-bay-2.jpg",
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Пхи-Пхи острова"
  },
  { 
    src: "/assets/bamboo-island.webp",
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Остров Бамбу"
  },
  { 
    src: "/assets/pileh-lagoon.jpg",
    tour: "/excursion/phi-phi-2-days-1-night",
    title: "Лагуна Пиле"
  },
  { 
    src: "/assets/racha-1.jpg",
    tour: "/excursion/pearls-andaman-sea",
    title: "Остров Рача"
  },
  { 
    src: "/assets/james-1.jpg",
    tour: "/excursion/pearls-andaman-sea",
    title: "Остров Джеймса Бонда"
  }
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Галерея
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Взгляните на красоту мест, которые вы можете посетить
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <Link 
              key={index} 
              to={image.tour}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">{image.title}</p>
                  <p className="text-sm opacity-80">Перейти к туру</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
