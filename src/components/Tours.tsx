
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { BookingModal } from "./BookingModal";
import { PopularityBadge } from "./PopularityBadge";
import phiPhiMayaBay from "@/assets/phi-phi-maya-bay.jpg";
import { rachaCoralImages } from "@/assets/racha-coral/images";
import mayaBay1 from "@/assets/phi-phi-2days/maya-bay-1.jpg";

const tours = [
  {
    id: 1,
    slug: "phi-phi-islands-speedboat",
    title: "Острова Пхи Пхи на скоростной лодке",
    duration: "8 часов",
    group: "До 35 человек",
    date: "Круглый год",
    price: "2,490 ₽",
    image: phiPhiMayaBay,
    highlights: ["Майя Бэй", "Снорклинг", "Обед на пляже"],
    bookingsToday: 12,
    popular: true
  },
  {
    id: 2,
    slug: "james-bond-island",
    title: "Остров Джеймса Бонда",
    duration: "8 часов",
    group: "До 25 человек",
    date: "Октябрь - Май",
    price: "2,590 ₽",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Каноэ в пещерах", "Деревня на воде", "Морепродукты"],
    bookingsToday: 8
  },
  {
    id: 3,
    slug: "racha-coral",
    title: "Острова Рача и Корал",
    duration: "8 часов",
    group: "До 30 человек",
    date: "Круглый год",
    price: "2,290 ₽",
    image: rachaCoralImages.main,
    highlights: ["Coral Beach Club", "Снорклинг", "Парасейлинг"],
    bookingsToday: 9,
    popular: true
  },
  {
    id: 4,
    slug: "phi-phi-2-days-1-night",
    title: "Пхи-Пхи 2 дня / 1 ночь",
    duration: "2 дня",
    group: "До 30 человек",
    date: "Круглый год",
    price: "4,000 ฿",
    image: mayaBay1,
    highlights: ["Майя Бэй", "Ночь на острове", "Огненное шоу"],
    bookingsToday: 6,
    popular: true
  },
  {
    id: 5,
    slug: "11-islands-standard",
    title: "11 островов Стандарт",
    duration: "9 часов",
    group: "До 40 человек",
    date: "Ноябрь - Апрель",
    price: "2,690 ₽",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["11 островов", "Снорклинг", "Обед-барбекю"],
    bookingsToday: 15
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
                
                {tour.popular && <PopularityBadge bookingsToday={tour.bookingsToday} />}
                
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
                
                <div className="flex gap-2">
                  <BookingModal tourTitle={tour.title} tourPrice={tour.price}>
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                      Забронировать
                    </Button>
                  </BookingModal>
                  
                  <Link to={`/excursion/${tour.slug}`}>
                    <Button variant="outline" className="rounded-full">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            <Link to="/phi-phi-islands">
              <Button size="lg" className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-full">
                Все туры на Пхи-Пхи
              </Button>
            </Link>
            <Link to="/tours">
              <Button size="lg" variant="outline" className="w-full rounded-full">
                Смотреть все туры
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
