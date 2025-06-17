
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Тенерифе",
    country: "Канарские острова",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "от €299",
    description: "Вулканические ландшафты и черные пляжи"
  },
  {
    id: 2,
    name: "Санторини",
    country: "Греция",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "от €450",
    description: "Белоснежные домики и бесконечное море"
  },
  {
    id: 3,
    name: "Мальдивы",
    country: "Индийский океан",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    price: "от €899",
    description: "Роскошные водные виллы и коралловые рифы"
  }
];

export const Destinations = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Популярные направления
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите из наших тщательно отобранных направлений для незабываемого отдыха
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-sm">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-300">
                    Узнать больше
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
