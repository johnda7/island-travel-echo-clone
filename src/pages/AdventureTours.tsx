import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Filter, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdventureTours = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const adventureTours = [
    {
      id: 1,
      slug: "elephant-sanctuary-visit",
      title: "Elephant Sanctuary Visit",
      subtitle: "Этичный слоновий заповедник",
      price: "3,290",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 12 чел",
      rating: 4.9,
      reviewsCount: 178,
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=800&q=80",
      highlights: ["Кормление слонов", "Купание со слонами", "Этичный туризм", "Традиционный обед"],
      category: "animals",
      popular: true
    },
    {
      id: 2,
      slug: "jungle-zipline-adventure",
      title: "Jungle Zipline Adventure",
      subtitle: "Зиплайн в джунглях",
      price: "2,790",
      currency: "₽",
      duration: "5 часов",
      groupSize: "до 15 чел",
      rating: 4.7,
      reviewsCount: 234,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      highlights: ["12 зиплайнов", "Прогулка по кронам", "Абсейлинг", "Обед в джунглях"],
      category: "extreme"
    },
    {
      id: 3,
      slug: "atv-jungle-expedition",
      title: "ATV Jungle Expedition",
      subtitle: "Квадроциклы в джунглях",
      price: "2,490",
      currency: "₽",
      duration: "4 часа",
      groupSize: "до 10 чел",
      rating: 4.6,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      highlights: ["Езда на квадроциклах", "Грязевые трассы", "Водопады", "Инструктаж"],
      category: "land"
    },
    {
      id: 4,
      slug: "rock-climbing-railay",
      title: "Rock Climbing at Railay Beach",
      subtitle: "Скалолазание на Рейли",
      price: "3,590",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 8 чел",
      rating: 4.8,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80",
      highlights: ["Скалолазание", "Профессиональный инструктор", "Снаряжение", "Пляж Рейли"],
      category: "extreme"
    },
    {
      id: 5,
      slug: "white-water-rafting",
      title: "White Water Rafting",
      subtitle: "Рафтинг по горным рекам",
      price: "2,890",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 16 чел",
      rating: 4.5,
      reviewsCount: 203,
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      highlights: ["Рафтинг 5-го уровня", "Профессиональные гиды", "Обед у реки", "Безопасность"],
      category: "water"
    },
    {
      id: 6,
      slug: "mountain-biking-doi-suthep",
      title: "Mountain Biking Doi Suthep",
      subtitle: "Горные велосипеды в Чиангмае",
      price: "2,190",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 10 чел",
      rating: 4.7,
      reviewsCount: 124,
      image: "https://images.unsplash.com/photo-1544191696-15693072b5a6?auto=format&fit=crop&w=800&q=80",
      highlights: ["Горный велосипед", "Дои Сутеп", "Горные тропы", "Видовые точки"],
      category: "land"
    },
    {
      id: 7,
      slug: "bungee-jumping-phuket",
      title: "Bungee Jumping Phuket",
      subtitle: "Банджи-джампинг в Пхукете",
      price: "3,890",
      currency: "₽",
      duration: "3 часа",
      groupSize: "до 6 чел",
      rating: 4.9,
      reviewsCount: 87,
      image: "https://images.unsplash.com/photo-1544734716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      highlights: ["Прыжок с 50 метров", "Сертификат", "Видеосъемка", "Страховка"],
      category: "extreme"
    },
    {
      id: 8,
      slug: "jungle-trekking-chiang-mai",
      title: "Jungle Trekking Chiang Mai",
      subtitle: "Треккинг в джунглях Чиангмая",
      price: "2,690",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 12 чел",
      rating: 4.6,
      reviewsCount: 145,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      highlights: ["Треккинг 12 км", "Водопады", "Деревни племен", "Обед в джунглях"],
      category: "land"
    },
    {
      id: 9,
      slug: "cave-diving-koh-tao",
      title: "Cave Diving Koh Tao",
      subtitle: "Дайвинг в пещерах Ко Тао",
      price: "4,290",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 8 чел",
      rating: 4.8,
      reviewsCount: 76,
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80",
      highlights: ["Подводные пещеры", "Сертифицированный инструктор", "Снаряжение", "2 погружения"],
      category: "water"
    },
    {
      id: 10,
      slug: "tiger-temple-visit",
      title: "Tiger Temple & Monkey Cave",
      subtitle: "Храм тигров и пещера обезьян",
      price: "2,390",
      currency: "₽",
      duration: "5 часов",
      groupSize: "до 15 чел",
      rating: 4.4,
      reviewsCount: 198,
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=800&q=80",
      highlights: ["Храм тигров", "Пещера обезьян", "1237 ступеней", "Панорамный вид"],
      category: "animals"
    }
  ];

  const categories = [
    { id: "all", name: "Все виды" },
    { id: "water", name: "Водные" },
    { id: "land", name: "Наземные" },
    { id: "extreme", name: "Экстрим" },
    { id: "animals", name: "Животные" }
  ];

  const sortOptions = [
    { id: "popular", name: "Популярные" },
    { id: "price-low", name: "Цена: низкая" },
    { id: "price-high", name: "Цена: высокая" },
    { id: "rating", name: "Рейтинг" }
  ];

  const filteredTours = adventureTours.filter(tour => 
    selectedFilter === "all" || tour.category === selectedFilter
  );

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
      case "price-high":
        return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviewsCount - a.reviewsCount;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Mountain className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Приключенческие туры
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Испытайте себя в экстремальных приключениях! Зиплайны, рафтинг, 
            скалолазание и встречи с дикой природой Тайланда.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="font-semibold">{adventureTours.length} приключений</span> • От 2,190 ₽
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Фильтры
            </Button>
            {categories.map((category) => (
              <Button 
                key={category.id}
                variant={selectedFilter === category.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(category.id)}
                className={selectedFilter === category.id ? "bg-green-600 text-white" : ""}
              >
                {category.name}
              </Button>
            ))}
            <div className="ml-auto text-gray-600 flex items-center gap-2">
              Сортировка: 
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1 text-green-600"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
              <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {tour.popular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Популярное
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-sm">{tour.rating}</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{tour.title}</h3>
                    <p className="text-sm text-gray-200">{tour.subtitle}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 2).map((highlight, index) => (
                        <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                          {highlight}
                        </span>
                      ))}
                      {tour.highlights.length > 2 && (
                        <span className="text-gray-500 text-xs">+{tour.highlights.length - 2} еще</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          {tour.price} {tour.currency}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm">{tour.reviewsCount} отзывов</div>
                    </div>
                    <Link to={`/excursion/${tour.slug}`}>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Подробнее
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы к экстремальным приключениям?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Наши опытные инструкторы обеспечат вашу безопасность во время 
            самых захватывающих приключений в Тайланде.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-green-600 hover:bg-gray-100">
              Получить консультацию
            </Button>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Экстрим тур
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdventureTours;
