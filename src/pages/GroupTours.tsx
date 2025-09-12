import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Heart } from "lucide-react";

const groupTours = [
  {
    id: 1,
    title: "Свадебная церемония на закате",
    price: "25,000 ₽",
    duration: "4 часа",
    groupSize: "До 50 гостей",
    rating: 5.0,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    highlights: ["Выездная регистрация", "Фотосессия", "Банкет"],
    description: "Незабываемая свадебная церемония на пляже с захватывающим видом на закат."
  },
  {
    id: 2,
    title: "Корпоративный тимбилдинг",
    price: "4,500 ₽",
    duration: "8 часов",
    groupSize: "15-30 человек",
    rating: 4.8,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    highlights: ["Командные игры", "Квесты", "Барбекю"],
    description: "Эффективный тимбилдинг с профессиональными активностями для укрепления команды."
  }
];

const GroupTours = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-24 pb-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Users className="w-4 h-4 mr-2" />
              Групповые туры
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Групповые мероприятия
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Организуем незабываемые групповые мероприятия любого масштаба на Пхукете.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {groupTours.map((tour) => (
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
                    <span className="text-2xl font-bold text-purple-600">{tour.price}</span>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Заказать</Button>
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

export default GroupTours;