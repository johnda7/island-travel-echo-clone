
import phiPhiImg from "@/assets/phi-phi-maya-bay.jpg";
import phiPhiLagoonImg from "@/assets/phi-phi-lagoon.jpg";  
import phiPhiSunsetImg from "@/assets/phi-phi-sunset.jpg";
import phiPhiSpeedboatImg from "@/assets/phi-phi-speedboat.jpg";
import phiPhiSnorkelingImg from "@/assets/phi-phi-snorkeling.jpg";
import phiPhiMonkeyImg from "@/assets/phi-phi-monkey-beach.jpg";

const galleryImages = [
  phiPhiImg,
  phiPhiLagoonImg,
  phiPhiSunsetImg, 
  phiPhiSpeedboatImg,
  phiPhiSnorkelingImg,
  phiPhiMonkeyImg
];

export const Gallery = () => {
  return (
    <section className="py-20 bg-white">
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
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img 
                src={image} 
                alt={`Галерея ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Посмотреть фото</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
