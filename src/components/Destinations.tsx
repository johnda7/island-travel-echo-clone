
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import phiPhiImg from "@/assets/phi-phi-maya-bay.jpg";
import patongImg from "@/assets/patong-beach.jpg";
import kataImg from "@/assets/kata-beach.jpg";

const destinations = [
  {
    id: 1,
    name: "Пхукет",
    country: "Таиланд",
    image: patongImg,
    rating: 4.9,
    price: "от 1,890 ₽",
    description: "Жемчужина Андаманского моря с белоснежными пляжами",
    attractions: 25,
    beaches: 13,
    link: "/category/plyazhi"
  },
  {
    id: 2,
    name: "Краби", 
    country: "Таиланд",
    image: kataImg,
    rating: 4.8,
    price: "от 2,190 ₽",
    description: "Известняковые скалы и изумрудные лагуны",
    attractions: 18,
    beaches: 8,
    link: "/tours"
  },
  {
    id: 3,
    name: "Острова Пхи Пхи",
    country: "Таиланд", 
    image: phiPhiImg,
    rating: 5.0,
    price: "от 2,490 ₽",
    description: "Райские острова с кристально чистой водой",
    attractions: 12,
    beaches: 6,
    link: "/phi-phi-islands"
  }
];

export const Destinations = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Популярные направления
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите из наших тщательно отобранных направлений для незабываемого отдыха в Таиланде
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white rounded-2xl">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold text-sm text-gray-800">{destination.rating}</span>
                </div>
                
                {/* Attractions Count */}
                <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold shadow-lg">
                  {destination.attractions} мест
                </div>
                
                {/* Location and Title */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{destination.country}</span>
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">{destination.name}</h3>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                
                {/* Stats */}
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {destination.beaches} пляжей
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {destination.attractions} мест
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {destination.price}
                  </span>
                  <Button 
                    onClick={() => navigate(destination.link)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      Узнать больше
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
