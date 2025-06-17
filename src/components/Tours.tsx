
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Calendar } from "lucide-react";

const tours = [
  {
    id: 1,
    title: "Романтический тур на Санторини",
    duration: "7 дней",
    group: "2-4 человека",
    date: "Круглый год",
    price: "€1,299",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Закаты в Ие", "Дегустация вин", "Круиз по кальдере"]
  },
  {
    id: 2,
    title: "Приключения на Тенерифе",
    duration: "5 дней",
    group: "До 8 человек",
    date: "Март - Октябрь",
    price: "€899",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Подъем на Тейде", "Наблюдение за китами", "Лорелевый лес"]
  },
  {
    id: 3,
    title: "Релакс на Мальдивах",
    duration: "10 дней",
    group: "2 человека",
    date: "Ноябрь - Апрель",
    price: "€2,499",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Водная вилла", "Дайвинг", "Спа-процедуры"]
  }
];

export const Tours = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Наши туры
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Тщательно спланированные путешествия для создания незабываемых воспоминаний
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="font-bold text-blue-600">{tour.price}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{tour.title}</h3>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{tour.group}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{tour.date}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-800">В тур входит:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Забронировать
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
