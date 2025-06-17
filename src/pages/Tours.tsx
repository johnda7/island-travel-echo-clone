
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, MapPin, Star } from "lucide-react";

const toursData = [
  {
    id: 1,
    title: "Романтический тур на Санторини",
    location: "Греция, Санторини",
    duration: "7 дней / 6 ночей",
    group: "2-4 человека",
    dates: "Круглый год",
    price: "€1,299",
    originalPrice: "€1,599",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Закаты в Ие", "Дегустация вин", "Круиз по кальдере", "Романтический ужин"],
    description: "Откройте для себя магию Санторини - острова белоснежных домиков и бесконечного моря.",
    featured: true
  },
  {
    id: 2,
    title: "Приключения на Тенерифе",
    location: "Канарские острова",
    duration: "5 дней / 4 ночи",
    group: "До 8 человек",
    dates: "Март - Октябрь",
    price: "€899",
    originalPrice: "€1,199",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc25ebb?auto=format&fit=crop&w=800&q=80",
    highlights: ["Подъем на Тейде", "Наблюдение за китами", "Лорелевый лес", "Вулканические пляжи"],
    description: "Активный отдых среди вулканических ландшафтов и уникальной природы Тенерифе.",
    featured: false
  },
  {
    id: 3,
    title: "Релакс на Мальдивах",
    location: "Мальдивские острова",
    duration: "10 дней / 9 ночей",
    group: "2 человека",
    dates: "Ноябрь - Апрель",
    price: "€2,499",
    originalPrice: "€2,999",
    rating: 5.0,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["Водная вилла", "Дайвинг", "Спа-процедуры", "Частный пляж"],
    description: "Роскошный отдых в водных виллах с видом на бирюзовые лагуны.",
    featured: true
  },
  {
    id: 4,
    title: "Открытие Сицилии",
    location: "Италия, Сицилия",
    duration: "8 дней / 7 ночей",
    group: "До 12 человек",
    dates: "Апрель - Сентябрь",
    price: "€1,199",
    originalPrice: "€1,499",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Этна экскурсия", "Сицилийская кухня", "Таормина", "Археологические памятники"],
    description: "Погружение в историю и культуру самого большого острова Средиземного моря.",
    featured: false
  },
  {
    id: 5,
    title: "Экзотическая Ямайка",
    location: "Карибы, Ямайка",
    duration: "9 дней / 8 ночей",
    group: "2-6 человек",
    dates: "Декабрь - Март",
    price: "€1,799",
    originalPrice: "€2,199",
    rating: 4.9,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1544276503-4f5c7f47c698?auto=format&fit=crop&w=800&q=80",
    highlights: ["Водопады Данс-Ривер", "Регги-туры", "Голубые горы", "Пляжи Негрил"],
    description: "Ощутите ритм Карибов и насладитесь райскими пляжами Ямайки.",
    featured: false
  },
  {
    id: 6,
    title: "Мистическая Мадейра",
    location: "Португалия, Мадейра",
    duration: "6 дней / 5 ночей",
    group: "До 10 человек",
    dates: "Круглый год",
    price: "€999",
    originalPrice: "€1,299",
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1530051633781-0b5e96b7b33e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Левады", "Мадерское вино", "Фуншал", "Ботанические сады"],
    description: "Откройте остров вечной весны с его уникальными ландшафтами и традициями.",
    featured: true
  }
];

const Tours = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Наши туры
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Тщательно спланированные путешествия для создания незабываемых воспоминаний. 
              Выберите идеальный тур из нашей коллекции островных приключений.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="rounded-full">Все туры</Button>
              <Button variant="outline" className="rounded-full">Романтические</Button>
              <Button variant="outline" className="rounded-full">Приключения</Button>
              <Button variant="outline" className="rounded-full">Релакс</Button>
              <Button variant="outline" className="rounded-full">Групповые</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {toursData.map((tour) => (
              <Card key={tour.id} className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${tour.featured ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="relative h-64 overflow-hidden">
                  {tour.featured && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Хит продаж
                    </div>
                  )}
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="font-bold text-blue-600">{tour.price}</span>
                    {tour.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{tour.originalPrice}</span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{tour.rating}</span>
                      </div>
                      <span className="text-sm">({tour.reviews} отзывов)</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{tour.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{tour.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.group}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{tour.dates}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-gray-800">В тур входит:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {tour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                      Забронировать
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Подробнее
                    </Button>
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

export default Tours;
