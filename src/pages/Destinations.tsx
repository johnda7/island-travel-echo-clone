
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Thermometer } from "lucide-react";
import { Link } from "react-router-dom";
import phiPhiMayaBay from "@/assets/phi-phi-maya-bay.jpg";

const destinationsData = [
  {
    id: 1,
    name: "Санторини",
    country: "Греция",
    region: "Эгейское море",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    toursCount: 12,
    bestTime: "Апрель - Октябрь",
    climate: "25°C - 30°C",
    description: "Остров белоснежных домиков, романтических закатов и уникальной вулканической архитектуры.",
    highlights: ["Закаты в Ие", "Вулканические пляжи", "Древняя Акротири", "Дегустация вин"],
    featured: true
  },
  {
    id: 2,
    name: "Острова Пхи-Пхи",
    country: "Таиланд",
    region: "Андаманское море",
    image: phiPhiMayaBay,
    rating: 4.8,
    toursCount: 6,
    bestTime: "Ноябрь - Апрель",
    climate: "26°C - 32°C",
    description: "Легендарные острова из фильма 'Пляж' с кристально чистой водой и белоснежными пляжами.",
    highlights: ["Бухта Майя", "Снорклинг", "Скоростные лодки", "Закаты"],
    featured: true,
    link: "/phi-phi-islands"
  },
  {
    id: 3,
    name: "Мальдивы",
    country: "Мальдивская Республика",
    region: "Индийский океан",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    toursCount: 8,
    bestTime: "Ноябрь - Апрель",
    climate: "26°C - 30°C",
    description: "Райские острова с кристально чистой водой, коралловыми рифами и роскошными курортами.",
    highlights: ["Водные виллы", "Дайвинг", "Спа на воде", "Рыбалка"],
    featured: true
  },
  {
    id: 3,
    name: "Тенерифе",
    country: "Испания",
    region: "Канарские острова",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    toursCount: 15,
    bestTime: "Круглый год",
    climate: "18°C - 28°C",
    description: "Остров контрастов с вулканами, лесами, пустынями и прекрасными пляжами.",
    highlights: ["Вулкан Тейде", "Лоро-парк", "Анага", "Черные пляжи"],
    featured: false
  },
  {
    id: 4,
    name: "Сицилия",
    country: "Италия",
    region: "Средиземное море",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    toursCount: 10,
    bestTime: "Апрель - Октябрь",
    climate: "20°C - 32°C",
    description: "Крупнейший остров Средиземноморья с богатой историей, культурой и кулинарией.",
    highlights: ["Этна", "Таормина", "Агридженто", "Сицилийская кухня"],
    featured: false
  },
  {
    id: 5,
    name: "Ямайка",
    country: "Ямайка",
    region: "Карибское море",
    image: "https://images.unsplash.com/photo-1544276503-4f5c7f47c698?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    toursCount: 6,
    bestTime: "Декабрь - Апрель",
    climate: "24°C - 30°C",
    description: "Остров регги, ярких красок, дружелюбных людей и потрясающей природы.",
    highlights: ["Данс-Ривер", "Негрил", "Голубые горы", "Культура регги"],
    featured: false
  },
  {
    id: 6,
    name: "Мадейра",
    country: "Португалия",
    region: "Атлантический океан",
    image: "https://images.unsplash.com/photo-1530051633781-0b5e96b7b33e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    toursCount: 9,
    bestTime: "Круглый год",
    climate: "16°C - 25°C",
    description: "Остров вечной весны с левадами, экзотическими садами и мадерским вином.",
    highlights: ["Левады", "Фуншал", "Мыс Сан-Лоренсу", "Мадерское вино"],
    featured: true
  },
  {
    id: 7,
    name: "Бали",
    country: "Индонезия",
    region: "Индийский океан",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    toursCount: 14,
    bestTime: "Апрель - Октябрь",
    climate: "23°C - 31°C",
    description: "Остров богов с рисовыми террасами, храмами и духовными практиками.",
    highlights: ["Убуд", "Храмы", "Рисовые террасы", "Серфинг"],
    featured: false
  },
  {
    id: 8,
    name: "Крит",
    country: "Греция",
    region: "Средиземное море",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    toursCount: 11,
    bestTime: "Май - Октябрь",
    climate: "20°C - 29°C",
    description: "Колыбель минойской цивилизации с древними дворцами и прекрасными пляжами.",
    highlights: ["Кносский дворец", "Ханья", "Самарийское ущелье", "Критская кухня"],
    featured: false
  }
];

const Destinations = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Направления
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Откройте для себя самые красивые острова планеты. Каждое направление - 
              это уникальная история, культура и незабываемые впечатления.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="rounded-full">Все острова</Button>
              <Button variant="outline" className="rounded-full">Средиземное море</Button>
              <Button variant="outline" className="rounded-full">Карибы</Button>
              <Button variant="outline" className="rounded-full">Индийский океан</Button>
              <Button variant="outline" className="rounded-full">Атлантика</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Популярные направления
          </h2>
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {destinationsData.filter(dest => dest.featured).map((destination) => (
              <Card key={destination.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-2 ring-blue-500">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Популярное
                  </div>
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
                      <span className="text-sm">{destination.region}</span>
                    </div>
                    <h3 className="text-2xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.country}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>{destination.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span>{destination.climate}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-800">Основные достопримечательности:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                   <div className="flex justify-between items-center">
                     <span className="text-sm text-gray-500">{destination.toursCount} туров</span>
                     {destination.link ? (
                       <Button 
                         asChild 
                         className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full"
                       >
                         <Link to={destination.link}>
                           Выбрать тур
                         </Link>
                       </Button>
                     ) : (
                       <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full">
                         Выбрать тур
                       </Button>
                     )}
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Destinations */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Все направления
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinationsData.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="font-semibold text-xs">{destination.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-bold">{destination.name}</h3>
                    <p className="text-xs opacity-90">{destination.country}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{destination.toursCount} туров</span>
                    <span>{destination.bestTime}</span>
                  </div>
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full text-xs">
                    Смотреть туры
                  </Button>
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

export default Destinations;
