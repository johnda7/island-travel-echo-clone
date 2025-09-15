import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const adventureTours = [
  {
    id: 12,
    title: "Рафтинг + Слоновье СПА + ATV 1 день",
    price: "2,800 ฿",
    duration: "1 день",
    groupSize: "Групповая экскурсия",
    rating: 4.8,
    reviewsCount: 167,
    image: "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/rafting1-scaled.jpg",
    highlights: ["Рафтинг 5 км по горной реке", "Квадроциклы 250 СС", "Купание со слонами", "ZIP Line"],
    description: "Один день в джунглях без спешки: купание со слоном, рафтинг по реке, храм с обезьянами, водопад в лесу.",
    link: "/tours/rafting-slonove-spa-atv-1-den"
  },
  {
    id: 11,
    title: "Рассветное приключение: Стеклянный мост Beyond Skywalk",
    price: "2,900 ฿",
    duration: "1 день",
    groupSize: "Групповая экскурсия",
    rating: 4.9,
    reviewsCount: 124,
    image: "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/sky-walk-bridge-1.webp",
    highlights: ["Встреча рассвета на стеклянном мосту", "о. Джеймса Бонда", "Пляж с самолетами", "Кафе с кувшинками"],
    description: "Погрузитесь в утреннюю тишину и красоту Таиланда: рассвет на смотровой площадке, лодочная прогулка по таинственным пещерам.",
    link: "/tours/rassvetnoe-priklyuchenie-steklyannyj-most-beyond-skywalk"
  },
  {
    id: 1,
    title: "Зиплайн через джунгли Пхукета",
    price: "4,500 ₽",
    duration: "6 часов",
    groupSize: "До 12 человек",
    rating: 4.9,
    reviewsCount: 187,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    highlights: ["32 платформы", "Полет над джунглями", "Инструктаж"],
    description: "Почувствуйте адреналин, пролетая над тропическими джунглями на высоте до 60 метров."
  },
  {
    id: 2,
    title: "Рафтинг по горным рекам",
    price: "3,800 ₽",
    duration: "7 часов",
    groupSize: "До 8 человек",
    rating: 4.8,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    highlights: ["5 км по реке", "Пороги 2-3 класса", "Профессиональный гид"],
    description: "Захватывающий спуск по горной реке с порогами среди живописных джунглей."
  }
];

const AdventureTours = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Zap className="w-4 h-4 mr-2" />
              Приключения
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Приключенческие туры
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Почувствуйте вкус адреналина и откройте для себя дикую природу Пхукета.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {adventureTours.map((tour) => (
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
                    <span className="text-2xl font-bold text-green-600">{tour.price}</span>
                    {tour.link ? (
                      <Link to={tour.link}>
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-500">Подробнее</Button>
                      </Link>
                    ) : (
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500">Забронировать</Button>
                    )}
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

export default AdventureTours;