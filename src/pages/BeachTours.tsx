import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Waves } from "lucide-react";

const beachTours = [
  {
    id: 1,
    title: "Остров Рача Яй - белоснежные пляжи",
    price: "3,200 ₽",
    duration: "8 часов",
    groupSize: "До 25 человек",
    rating: 4.9,
    reviewsCount: 234,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Пляж Паток", "Снорклинг", "Обед на пляже"],
    description: "Проведите день на одном из самых красивых пляжей Таиланда с белоснежным песком."
  },
  {
    id: 2,
    title: "Коралловый остров с парасейлингом",
    price: "4,500 ₽",
    duration: "7 часов",
    groupSize: "До 20 человек",
    rating: 4.8,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Парасейлинг", "Банан-лодка", "Водные мотоциклы"],
    description: "Активный день на Коралловом острове с множеством водных развлечений."
  }
];

const BeachTours = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-24 pb-16 bg-gradient-to-b from-cyan-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-cyan-100 text-cyan-800">
              <Waves className="w-4 h-4 mr-2" />
              Пляжные туры
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Пляжные экскурсии
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Откройте для себя лучшие пляжи Пхукета и соседних островов.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {beachTours.map((tour) => (
              <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-sm">{tour.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-cyan-600">{tour.price}</span>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">Забронировать</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BeachTours;