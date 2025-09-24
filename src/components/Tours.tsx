import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversalBookingModal } from "./UniversalBookingModal";

const tours = [
  {
    id: "phi-phi",
    title: "Острова Пхи Пхи",
    description: "Исследуйте знаменитые острова Пхи Пхи с кристально чистой водой",
    image: "/assets/phi-phi-maya-bay-LeJ2QhJv.jpg",
    duration: "8 часов",
    price: "2000 ฿",
    maxGuests: 12,
    isPopular: true,
    highlights: [
      "Остров Пхи Пхи Лей и бухта Майя Бей",
      "Снорклинг в лагуне Пилех",
      "Пляж Обезьян",
      "Обед на острове",
      "Трансфер из отеля"
    ]
  },
  {
    id: "james-bond-island",
    title: "Остров Джеймса Бонда",
    description: "Посетите легендарный остров из фильма о Джеймсе Бонде",
    image: "/assets/james-1-CrrUEsJ1.jpg",
    duration: "7 часов",
    price: "1800 ฿",
    maxGuests: 15,
    isPopular: true,
    highlights: [
      "Остров Джеймса Бонда (Ко Тапу)",
      "Морские пещеры на каяках",
      "Плавающая деревня",
      "Обед в ресторане на воде",
      "Трансфер из отеля"
    ]
  },
  {
    id: "racha-island",
    title: "Остров Рача",
    description: "Откройте для себя жемчужину Андаманского моря",
    image: "/assets/racha-1-DwZ8WjdT.jpg",
    duration: "6 часов",
    price: "1600 ฿",
    maxGuests: 10,
    isPopular: false,
    highlights: [
      "Белоснежные пляжи",
      "Снорклинг в прозрачной воде",
      "Тропический обед",
      "Релакс на пляже",
      "Трансфер из отеля"
    ]
  }
];

export const Tours = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Популярные экскурсии
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Тщательно спланированные морские путешествия для создания незабываемых воспоминаний
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {tour.isPopular && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Популярно
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="font-bold text-blue-600">{tour.price}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{tour.title}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>До {tour.maxGuests} чел</span>
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

                <div className="flex gap-2">
                  <UniversalBookingModal
                    tourTitle={tour.title}
                    tourPrice={tour.price}
                    trigger={
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                        Забронировать
                      </Button>
                    }
                  />

                  {tour.id === 'james-bond-island' && (
                    <Link to="/james-bond-island-tour">
                      <Button variant="outline" className="rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50">
                        Подробнее
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
