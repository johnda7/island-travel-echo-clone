import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Users, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const cityTours = [
  {
    id: 13,
    title: "Као Лак SAFARI 1 день",
    price: "1,700 ฿",
    duration: "1 день",
    groupSize: "Групповая экскурсия",
    rating: 4.7,
    reviewsCount: 89,
    image: "https://phuketgo.aaddaa.com/wp-content/uploads/2025/09/snimok-jekrana-2025-09-06-v-20.56.21.png",
    highlights: ["Храм с обезьянами", "Слоновье СПА", "Прогулка на плоту", "Зоопарк"],
    description: "Однодневное приключение в тропиках: джунгли, водопады и купание со слонами.",
    link: "/tours/kao-lak-safari-1-den"
  },
  {
    id: 1,
    title: "Обзорная экскурсия по Пхукет-Тауну",
    price: "1,500 ₽",
    duration: "4 часа",
    groupSize: "До 15 человек",
    rating: 4.8,
    reviewsCount: 127,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    highlights: ["Старый город", "Храм Ват Чалонг", "Смотровая площадка"],
    description: "Познакомьтесь с историей и культурой Пхукета в увлекательной пешеходной экскурсии по старому городу."
  },
  {
    id: 2,
    title: "Архитектурная прогулка по китайскому кварталу",
    price: "2,200 ₽",
    duration: "3 часа",
    groupSize: "До 12 человек",
    rating: 4.9,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?auto=format&fit=crop&w=800&q=80",
    highlights: ["Китайские особняки", "Уличное искусство", "Местная кухня"],
    description: "Исследуйте уникальную архитектуру китайского квартала с профессиональным гидом-историком."
  },
  {
    id: 3,
    title: "Достопримечательности Пхукета (без шопинга)",
    price: "2,190 ₽",
    duration: "8–9 часов",
    groupSize: "До 18 человек",
    rating: 4.9,
    reviewsCount: 168,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Большой Будда", "Ват Чалонг", "Старый город", "Karon Viewpoint", "Мыс Промтеп"],
    description: "Классическая обзорная экскурсия по Пхукету без посещения магазинов — топ‑локации за 1 день.",
    href: "/excursion/dostoprimechatelnosti-phuketa-1-den-obzornaja-jekskursija-bez-shopinga"
  }
];

const CityTours = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-24 pb-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-orange-100 text-orange-800">
              <Camera className="w-4 h-4 mr-2" />
              Городские туры
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Городские экскурсии
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Откройте для себя культуру, историю и современную жизнь Пхукета.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {cityTours.map((tour) => (
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
                    <span className="text-2xl font-bold text-orange-600">{tour.price}</span>
                    {"href" in tour ? (
                      <Link to={(tour as any).href}>
                        <Button className="bg-gradient-to-r from-orange-500 to-red-500">Подробнее</Button>
                      </Link>
                    ) : "link" in tour ? (
                      <Link to={(tour as any).link}>
                        <Button className="bg-gradient-to-r from-orange-500 to-red-500">Подробнее</Button>
                      </Link>
                    ) : (
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500">Забронировать</Button>
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

export default CityTours;