
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Filter, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

const AdventureTours = () => {
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
      highlights: ["12 зиплайнов", "Прогулка по кронам", "Абсейлинг", "Обед в джунглях"]
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
      highlights: ["Езда на квадроциклах", "Грязевые трассы", "Водопады", "Инструктаж"]
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
      highlights: ["Скалолазание", "Профессиональный инструктор", "Снаряжение", "Пляж Рейли"]
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
      highlights: ["Рафтинг 5-го уровня", "Профессиональные гиды", "Обед у реки", "Безопасность"]
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
      highlights: ["Горный велосипед", "Дои Сутеп", "Горные тропы", "Видовые точки"]
    }
  ];

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
            <Button variant="outline">Все виды</Button>
            <Button variant="outline">Водные</Button>
            <Button variant="outline">Наземные</Button>
            <Button variant="outline">Экстрим</Button>
            <Button variant="outline">Животные</Button>
            <div className="ml-auto text-gray-600">
              Сортировка: <Button variant="ghost" className="p-0 h-auto text-green-600">Популярные</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventureTours.map((tour) => (
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
