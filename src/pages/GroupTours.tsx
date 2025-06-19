
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Filter, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const GroupTours = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const groupTours = [
    {
      id: 1,
      slug: "group-phi-phi-adventure",
      title: "Group Phi Phi Islands Adventure",
      subtitle: "Групповое приключение на острова Пхи Пхи",
      price: "2,290",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 25 чел",
      rating: 4.8,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Майя Бэй", "Снорклинг", "Обед на пляже", "Лодка-экспресс"],
      category: "marine",
      popular: true
    },
    {
      id: 2,
      slug: "group-elephant-sanctuary",
      title: "Group Elephant Sanctuary Visit",
      subtitle: "Групповое посещение слоновьего заповедника",
      price: "2,790",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 20 чел",
      rating: 4.9,
      reviewsCount: 203,
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=800&q=80",
      highlights: ["Кормление слонов", "Купание со слонами", "Этичный туризм", "Традиционный обед"],
      category: "adventure"
    },
    {
      id: 3,
      slug: "group-bangkok-temples",
      title: "Group Bangkok Temples Tour",
      subtitle: "Групповая экскурсия по храмам Бангкока",
      price: "2,490",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 30 чел",
      rating: 4.7,
      reviewsCount: 134,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      highlights: ["Королевский дворец", "Храм Изумрудного Будды", "Речная прогулка", "Плавучий рынок"],
      category: "cultural"
    },
    {
      id: 4,
      slug: "group-krabi-island-hopping",
      title: "Group Krabi Island Hopping",
      subtitle: "Групповые прыжки по островам Краби",
      price: "2,190",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 35 чел",
      rating: 4.6,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Острова Хонг", "Лагуна изумрудная", "Пляж Прананг", "Обед на острове"],
      category: "marine"
    },
    {
      id: 5,
      slug: "group-chiang-mai-cooking",
      title: "Group Cooking Class Chiang Mai",
      subtitle: "Групповые кулинарные курсы в Чиангмае",
      price: "1,890",
      currency: "₽",
      duration: "5 часов",
      groupSize: "до 15 чел",
      rating: 4.8,
      reviewsCount: 167,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      highlights: ["Рынок свежих продуктов", "Приготовление 5 блюд", "Сертификат", "Дегустация"],
      category: "cultural"
    },
    {
      id: 6,
      slug: "group-james-bond-island",
      title: "Group James Bond Island Tour",
      subtitle: "Групповой тур на остров Джеймса Бонда",
      price: "2,590",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 28 чел",
      rating: 4.7,
      reviewsCount: 198,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Остров Джеймса Бонда", "Каноэ в пещерах", "Деревня на воде", "Обед морепродуктами"],
      category: "marine"
    },
    {
      id: 7,
      slug: "group-zipline-adventure",
      title: "Group Zipline Adventure",
      subtitle: "Групповое приключение на зиплайне",
      price: "2,390",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 18 чел",
      rating: 4.5,
      reviewsCount: 112,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      highlights: ["15 зиплайнов", "Прогулка по кронам", "Абсейлинг", "Обед в джунглях"],
      category: "adventure"
    },
    {
      id: 8,
      slug: "group-floating-market",
      title: "Group Floating Market Tour",
      subtitle: "Групповая экскурсия на плавучий рынок",
      price: "1,690",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 25 чел",
      rating: 4.4,
      reviewsCount: 145,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      highlights: ["Дамноен Садуак", "Лодочная прогулка", "Местная еда", "Железная дорога"],
      category: "cultural"
    },
    {
      id: 9,
      slug: "group-snorkeling-safari",
      title: "Group Snorkeling Safari",
      subtitle: "Групповое снорклинг-сафари",
      price: "2,890",
      currency: "₽",
      duration: "10 часов",
      groupSize: "до 40 чел",
      rating: 4.6,
      reviewsCount: 176,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      highlights: ["Симиланские острова", "3 точки снорклинга", "Морские черепахи", "Обед-барбекю"],
      category: "marine"
    },
    {
      id: 10,
      slug: "group-white-water-rafting",
      title: "Group White Water Rafting",
      subtitle: "Групповой рафтинг",
      price: "2,490",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 24 чел",
      rating: 4.3,
      reviewsCount: 98,
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      highlights: ["Рафтинг 5 км", "Профессиональные гиды", "Обед у реки", "Трансфер"],
      category: "adventure"
    }
  ];

  const categories = [
    { id: "all", name: "Все виды" },
    { id: "marine", name: "Морские" },
    { id: "adventure", name: "Приключения" },
    { id: "cultural", name: "Культурные" }
  ];

  const sortOptions = [
    { id: "popular", name: "Популярные" },
    { id: "price-low", name: "Цена: низкая" },
    { id: "price-high", name: "Цена: высокая" },
    { id: "rating", name: "Рейтинг" }
  ];

  const filteredTours = groupTours.filter(tour => 
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
      <section className="pt-20 pb-12 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <UsersIcon className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Групповые туры
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Присоединяйтесь к другим путешественникам в незабываемых групповых приключениях. 
            Новые знакомства, разделенные впечатления и доступные цены.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="font-semibold">{groupTours.length} групповых туров</span> • От 1,690 ₽
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
                className={selectedFilter === category.id ? "bg-purple-600 text-white" : ""}
              >
                {category.name}
              </Button>
            ))}
            <div className="ml-auto text-gray-600 flex items-center gap-2">
              Сортировка: 
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1 text-purple-600"
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
                        <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">
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
                        <span className="text-2xl font-bold text-purple-600">
                          {tour.price} {tour.currency}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm">{tour.reviewsCount} отзывов</div>
                    </div>
                    <Link to={`/excursion/${tour.slug}`}>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Найдите единомышленников!
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Групповые туры - отличный способ познакомиться с новыми людьми и 
            разделить незабываемые впечатления от путешествия по Тайланду.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              Получить консультацию
            </Button>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Присоединиться к группе
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GroupTours;
