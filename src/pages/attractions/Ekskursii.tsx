import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Clock, Users, Calendar, Search, Waves, Mountain, Building2, Compass } from "lucide-react";

interface Excursion {
  id: number;
  title: string;
  location: string;
  duration: string;
  group: string;
  dates: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  description: string;
  category: string;
  featured: boolean;
  difficulty?: string;
  includes: string[];
  tips?: string[];
}

const excursionsData: Excursion[] = [
  {
    id: 1,
    title: "Симиланские острова",
    location: "Пхукет, Таиланд",
    duration: "10 часов",
    group: "До 40 человек",
    dates: "Ноябрь - Апрель",
    price: "5,750 ₽",
    originalPrice: "6,250 ₽",
    rating: 5.0,
    reviews: 147,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["9 островов", "Кристально чистая вода", "Белоснежные пляжи", "Снорклинг"],
    description: "Самая яркая и незабываемая экскурсия на Пхукете. Эти 9 островов собрали в себе всю первозданную красоту тропической природы.",
    category: "Морские экскурсии",
    featured: true,
    difficulty: "Легкая",
    includes: ["Трансфер", "Обед", "Снорклинг оборудование", "Гид"]
  },
  {
    id: 2,
    title: "Острова Пхи-Пхи",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,750 ₽",
    originalPrice: "3,250 ₽",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Пляж Майя", "Бухты Samah и Pileh", "Остров обезьян", "Снорклинг"],
    description: "Экскурсия на знаменитые острова Пхи-Пхи с посещением пляжа Майя и красивых бухт.",
    category: "Морские экскурсии",
    featured: true,
    difficulty: "Легкая",
    includes: ["Лодка", "Обед", "Маски и ласты", "Гид", "Страховка"]
  },
  {
    id: 3,
    title: "Остров Джеймса Бонда",
    location: "Пханг Нга, Таиланд",
    duration: "8 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "3,250 ₽",
    originalPrice: "3,750 ₽",
    rating: 4.9,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["7 островов", "Каноэ в пещерах", "Деревня на воде", "Знаменитые скалы"],
    description: "Экскурсия в залив Пханг Нга с посещением 7 островов и прогулкой по лагунам на каноэ.",
    category: "Морские экскурсии",
    featured: true,
    difficulty: "Умеренная",
    includes: ["Каноэ", "Обед", "Трансфер", "Опытный гид", "Спасжилеты"]
  },
  {
    id: 4,
    title: "Обзорная экскурсия по Пхукету",
    location: "Пхукет, Таиланд",
    duration: "5 часов",
    group: "До 25 человек",
    dates: "Круглый год",
    price: "1,750 ₽",
    originalPrice: "2,250 ₽",
    rating: 4.8,
    reviews: 115,
    image: "https://images.unsplash.com/photo-1563492065-1a0eca7cdb7a?auto=format&fit=crop&w=800&q=80",
    highlights: ["Большой Будда", "Храмы Пхукета", "Смотровые площадки", "Мыс Промтеп"],
    description: "Среди главных достопримечательностей Пхукета статуя Большого Будды, храмы и обзорные площадки с потрясающими видами.",
    category: "Экскурсии по городу",
    featured: false,
    difficulty: "Легкая",
    includes: ["Автобус", "Гид", "Входные билеты", "Вода"]
  },
  {
    id: 5,
    title: "Рафтинг на реке",
    location: "Пхукет, Таиланд",
    duration: "7 часов",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "2,500 ₽",
    originalPrice: "3,000 ₽",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Безопасный сплав", "Джунгли", "Водопады", "Адреналин"],
    description: "Увлекательный и абсолютно безопасный сплав по реке. Рафтинг проводится в соседней провинции среди тропических джунглей.",
    category: "Активный отдых",
    featured: false,
    difficulty: "Умеренная",
    includes: ["Рафт", "Спасжилеты", "Инструктаж", "Обед", "Трансфер"]
  },
  {
    id: 6,
    title: "Сафари на слонах",
    location: "Пхукет, Таиланд",
    duration: "4 часа",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "2,200 ₽",
    originalPrice: "2,700 ₽",
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1551715133-8b2fc6ecbd75?auto=format&fit=crop&w=800&q=80",
    highlights: ["Катание на слонах", "Шоу слонов", "Кормление слонов", "Фото с животными"],
    description: "Встреча с удивительными слонами в их естественной среде. Катание, кормление и незабываемые фото.",
    category: "Активный отдых",
    featured: false,
    difficulty: "Легкая",
    includes: ["Трансфер", "Инструктаж", "Страховка", "Фрукты для слонов"]
  },
  {
    id: 7,
    title: "Дайвинг для начинающих",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 12 человек",
    dates: "Круглый год",
    price: "9,625 ₽",
    originalPrice: "10,125 ₽",
    rating: 4.6,
    reviews: 75,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Обучение дайвингу", "Подводный мир", "Инструктор", "Сертификат"],
    description: "Вы никогда не ныряли с аквалангом? Или даже не умеете плавать? У вас есть отличный шанс попробовать.",
    category: "Активный отдых",
    featured: false,
    difficulty: "Умеренная",
    includes: ["Полное оборудование", "Инструктор", "Обучение", "Сертификат", "Обед"]
  },
  {
    id: 8,
    title: "Морская рыбалка",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "3,500 ₽",
    originalPrice: "4,000 ₽",
    rating: 4.6,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    highlights: ["Глубоководная рыбалка", "Свежий улов", "Приготовление рыбы", "Снасти включены"],
    description: "Очень популярная экскурсия на Пхукете среди российских туристов. Настоящая морская рыбалка в Андаманском море.",
    category: "Морские экскурсии",
    featured: false,
    difficulty: "Легкая",
    includes: ["Лодка", "Снасти", "Наживка", "Приготовление улова", "Напитки"]
  },
  {
    id: 9,
    title: "VIP тур на яхте",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 30 человек",
    dates: "Круглый год",
    price: "11,000 ₽",
    originalPrice: "12,000 ₽",
    rating: 4.8,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1540946485063-548550789012?auto=format&fit=crop&w=800&q=80",
    highlights: ["Катамаран", "Под парусами", "Премиум сервис", "Закаты на море"],
    description: "Морская прогулка на огромном катамаране. Вы проведете под парусами целый день наслаждаясь морем и пейзажами.",
    category: "Морские экскурсии",
    featured: false,
    difficulty: "Легкая",
    includes: ["Яхта", "Экипаж", "Обед", "Напитки", "Музыка"]
  },
  {
    id: 10,
    title: "Краби с Пхукета",
    location: "Краби, Таиланд",
    duration: "10 часов",
    group: "До 40 человек",
    dates: "Круглый год",
    price: "6,000 ₽",
    originalPrice: "6,500 ₽",
    rating: 4.7,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Храмы Краби", "Горячие источники", "Изумрудный бассейн", "Автобус с комфортом"],
    description: "Поездка на автобусе с Пхукета в город Краби и его окрестности. Посещение храмов и природных достопримечательностей.",
    category: "Экскурсии по городу",
    featured: false,
    difficulty: "Легкая",
    includes: ["Автобус", "Гид", "Обед", "Входные билеты"]
  },
  {
    id: 11,
    title: "Водопады и джунгли",
    location: "Пхукет, Таиланд",
    duration: "6 часов",
    group: "До 20 человек",
    dates: "Круглый год",
    price: "2,400 ₽",
    originalPrice: "2,900 ₽",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1534284780352-81c9cce6e7b1?auto=format&fit=crop&w=800&q=80",
    highlights: ["Водопад Банг Пае", "Центр реабилитации гиббонов", "Трекинг в джунглях", "Природа"],
    description: "Исследование тропических джунглей Пхукета с посещением водопадов и центра защиты гиббонов.",
    category: "Природа и приключения",
    featured: false,
    difficulty: "Умеренная",
    includes: ["Трансфер", "Гид", "Входные билеты", "Вода", "Фрукты"]
  },
  {
    id: 12,
    title: "Ночная экскурсия по Патонгу",
    location: "Патонг, Пхукет",
    duration: "4 часа",
    group: "До 15 человек",
    dates: "Круглый год",
    price: "1,800 ₽",
    originalPrice: "2,300 ₽",
    rating: 4.4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Улица Бангла", "Тайский массаж", "Ночные рынки", "Бары и клубы"],
    description: "Знакомство с ночной жизнью Пхукета: шоу, бары, рынки и развлечения на знаменитой улице Бангла.",
    category: "Ночная жизнь",
    featured: false,
    difficulty: "Легкая",
    includes: ["Гид", "Карта районов", "Рекомендации мест"]
  }
];

const categories = [
  "Все категории",
  "Морские экскурсии",
  "Экскурсии по городу",
  "Активный отдых",
  "Природа и приключения",
  "Ночная жизнь"
];

const Ekskursii: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "duration">("rating");

  // Filter and sort excursions
  const filteredExcursions = useMemo(() => {
    let filtered = excursionsData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(excursion =>
        excursion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excursion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excursion.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excursion.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "Все категории") {
      filtered = filtered.filter(excursion => excursion.category === selectedCategory);
    }

    // Sort excursions
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price":
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case "duration":
          return parseInt(a.duration.replace(/[^\d]/g, '')) - parseInt(b.duration.replace(/[^\d]/g, ''));
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const featuredExcursions = excursionsData.filter(excursion => excursion.featured);

  return (
    <>
      <Helmet>
        <title>Экскурсии на Пхукете — морские, островные, джунгли, водопады</title>
        <meta name="description" content="Лучшие экскурсии по Пхукету и соседним островам: морские туры, поездки на Пхи-Пхи, Рача, Симиланские острова, сафари, джунгли, водопады." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Экскурсии на Пхукете
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Откройте для себя лучшие экскурсии: морские туры, поездки на острова, сафари, 
              джунгли, водопады и многое другое. Выберите свой идеальный маршрут!
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Compass className="w-4 h-4" />
                <span>{excursionsData.length} экскурсий</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>Проверенные гиды</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Группы и индивидуально</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Excursions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Популярные экскурсии</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredExcursions.map((excursion) => (
              <Card key={excursion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={excursion.image} 
                    alt={excursion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{excursion.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-600 text-white">Хит</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur rounded-lg p-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">{excursion.price}</span>
                        <span className="text-xs text-gray-500 line-through">{excursion.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{excursion.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{excursion.description}</p>
                  <div className="space-y-1 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{excursion.group}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {excursion.highlights.slice(0, 2).map((highlight) => (
                      <Badge key={highlight} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск экскурсий по названию, описанию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "price" | "duration")}
                className="px-3 py-2 border rounded-md"
              >
                <option value="rating">По рейтингу</option>
                <option value="price">По цене</option>
                <option value="duration">По длительности</option>
              </select>
            </div>
          </div>

          {/* Excursions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExcursions.map((excursion) => (
              <Card key={excursion.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                <div className="relative h-48">
                  <img 
                    src={excursion.image} 
                    alt={excursion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{excursion.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-600 text-white text-xs">{excursion.category}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur rounded-lg p-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">{excursion.price}</span>
                        <span className="text-xs text-gray-500 line-through">{excursion.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{excursion.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{excursion.description}</p>
                  
                  <div className="space-y-1 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{excursion.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{excursion.group}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {excursion.highlights.slice(0, 3).map((highlight) => (
                      <Badge key={highlight} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  {excursion.includes && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm mb-2">Включено:</h4>
                      <div className="text-xs text-gray-600">
                        {excursion.includes.slice(0, 3).join(" • ")}
                        {excursion.includes.length > 3 && "..."}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExcursions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Экскурсии не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Полезная информация</h2>
            
            <Tabs defaultValue="booking" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="booking">Бронирование</TabsTrigger>
                <TabsTrigger value="prepare">Подготовка</TabsTrigger>
                <TabsTrigger value="seasons">Сезоны</TabsTrigger>
                <TabsTrigger value="safety">Безопасность</TabsTrigger>
              </TabsList>
              
              <TabsContent value="booking" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Как забронировать экскурсию</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800">📞 Заказ</h4>
                        <p>Бронируйте за 1-3 дня. В высокий сезон — заранее. Популярные экскурсии быстро заканчиваются.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">💰 Оплата</h4>
                        <p>Предоплата обычно 500-1000฿, остальное в день экскурсии. Наличные или карта.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">🚌 Трансфер</h4>
                        <p>Обычно включен в стоимость. Забирают из отеля, время сообщают накануне.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prepare" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Что взять с собой</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🎒 Общее</h4>
                        <ul className="space-y-1">
                          <li>• Солнцезащитный крем SPF 50+</li>
                          <li>• Панама или кепка</li>
                          <li>• Вода (1-2 литра)</li>
                          <li>• Деньги на сувениры</li>
                          <li>• Водонепроницаемый чехол для телефона</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🏊 Для морских экскурсий</h4>
                        <ul className="space-y-1">
                          <li>• Купальник/плавки</li>
                          <li>• Быстросохнущее полотенце</li>
                          <li>• Рифовые тапочки</li>
                          <li>• Маска и трубка (по желанию)</li>
                          <li>• Сменная одежда</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seasons" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Сезоны и погода</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">🌞 Высокий сезон (ноябрь — апрель)</h4>
                        <p className="mb-2">Идеальная погода для всех экскурсий.</p>
                        <ul className="space-y-1">
                          <li>• Морские экскурсии: отлично</li>
                          <li>• Симиланы: только в этот сезон</li>
                          <li>• Цены: выше на 20-30%</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">🌧️ Низкий сезон (май — октябрь)</h4>
                        <p className="mb-2">Дожди, но многие экскурсии работают.</p>
                        <ul className="space-y-1">
                          <li>• Храмы и город: без ограничений</li>
                          <li>• Морские: зависит от погоды</li>
                          <li>• Цены: скидки до 40%</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Безопасность</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800">🦺 На воде</h4>
                        <p>Всегда используйте спасжилеты. Слушайте инструкции гида. При плохой погоде экскурсии отменяют.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">🐘 С животными</h4>
                        <p>Следуйте указаниям инструкторов. Не кормите диких животных. Держитесь на безопасном расстоянии.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">🏔️ В джунглях</h4>
                        <p>Не отходите от группы. Используйте репелленты. Закрытая обувь обязательна.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Ekskursii;
