import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, MapPin, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CityTours = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const cityTours = [
    {
      id: 1,
      slug: "discovery-south-phuket",
      title: "Discovery South Phuket",
      subtitle: "Южная часть Пхукета",
      price: "1,890",
      originalPrice: "2,100",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 15 чел",
      rating: 4.9,
      reviewsCount: 127,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Big Buddha", "Храм Ват Чалонг", "Мыс Промтеп", "Пляжи Ката и Карон"],
      city: "phuket",
      popular: true
    },
    {
      id: 2,
      slug: "phuket-city-temples",
      title: "Phuket City & Temples",
      subtitle: "Город Пхукет и храмы",
      price: "1,590",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 12 чел",
      rating: 4.7,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      highlights: ["Старый город", "Храм Джуй Туй", "Чайна-таун", "Смотровая площадка"],
      city: "phuket"
    },
    {
      id: 3,
      slug: "bang-pa-in-palace",
      title: "Bang Pa-In Palace & Ayutthaya",
      subtitle: "Дворец и древняя столица",
      price: "2,290",
      currency: "₽", 
      duration: "10 часов",
      groupSize: "до 20 чел",
      rating: 4.8,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&q=80",
      highlights: ["Летний дворец", "Руины Аюттхаи", "Храм лежащего Будды", "Речная прогулка"],
      city: "bangkok"
    },
    {
      id: 4,
      slug: "bangkok-grand-palace",
      title: "Bangkok Grand Palace",
      subtitle: "Большой королевский дворец",
      price: "2,790",
      currency: "₽",
      duration: "8 часов", 
      groupSize: "до 18 чел",
      rating: 4.9,
      reviewsCount: 203,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      highlights: ["Королевский дворец", "Храм Изумрудного Будды", "Речные каналы", "Плавучий рынок"],
      city: "bangkok"
    },
    {
      id: 5,
      slug: "chiang-mai-old-city",
      title: "Chiang Mai Old City",
      subtitle: "Старый город Чиангмай",
      price: "1,990",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 15 чел", 
      rating: 4.6,
      reviewsCount: 74,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Храм Дой Сутеп", "Старый город", "Ночной базар", "Слоновья ферма"],
      city: "chiangmai"
    },
    {
      id: 6,
      slug: "pattaya-city-tour",
      title: "Pattaya City Highlights",
      subtitle: "Обзорная экскурсия по Паттайе",
      price: "1,390",
      currency: "₽",
      duration: "5 часов",
      groupSize: "до 16 чел",
      rating: 4.4,
      reviewsCount: 92,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Холм Большого Будды", "Храм Истины", "Смотровая площадка", "Плавучий рынок"],
      city: "pattaya"
    },
    {
      id: 7,
      slug: "floating-markets-bangkok",
      title: "Floating Markets Bangkok",
      subtitle: "Плавучие рынки Бангкока",
      price: "1,690",
      currency: "₽",
      duration: "6 часов",
      groupSize: "до 14 чел",
      rating: 4.5,
      reviewsCount: 118,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      highlights: ["Рынок Дамноен Садуак", "Лодочная прогулка", "Традиционная еда", "Железная дорога"],
      city: "bangkok"
    },
    {
      id: 8,
      slug: "sukhothai-historical-park",
      title: "Sukhothai Historical Park",
      subtitle: "Исторический парк Сукхотхай",
      price: "2,490",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 12 чел",
      rating: 4.7,
      reviewsCount: 65,
      image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80",
      highlights: ["Руины древних храмов", "Статуи Будды", "Исторический музей", "Велосипедная прогулка"],
      city: "sukhothai"
    },
    {
      id: 9,
      slug: "kanchanaburi-bridge-kwai",
      title: "Kanchanaburi & Bridge over River Kwai",
      subtitle: "Канчанабури и мост через реку Квай",
      price: "2,190",
      currency: "₽",
      duration: "10 часов",
      groupSize: "до 18 чел",
      rating: 4.6,
      reviewsCount: 134,
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?auto=format&fit=crop&w=800&q=80",
      highlights: ["Мост через реку Квай", "Музей войны", "Поездка на поезде", "Водопады Эраван"],
      city: "kanchanaburi"
    },
    {
      id: 10,
      slug: "hua-hin-royal-city",
      title: "Hua Hin Royal City Tour",
      subtitle: "Королевский город Хуа Хин",
      price: "1,790",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 16 чел",
      rating: 4.3,
      reviewsCount: 87,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      highlights: ["Королевский дворец", "Железнодорожная станция", "Ночной рынок", "Пляж Хуа Хин"],
      city: "huahin"
    }
  ];

  const categories = [
    { id: "all", name: "Все города" },
    { id: "phuket", name: "Пхукет" },
    { id: "bangkok", name: "Бангкок" },
    { id: "chiangmai", name: "Чиангмай" },
    { id: "pattaya", name: "Паттайя" }
  ];

  const sortOptions = [
    { id: "popular", name: "Популярные" },
    { id: "price-low", name: "Цена: низкая" },
    { id: "price-high", name: "Цена: высокая" },
    { id: "rating", name: "Рейтинг" }
  ];

  const filteredTours = cityTours.filter(tour => 
    selectedFilter === "all" || tour.city === selectedFilter
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
      <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Городские туры
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Откройте для себя богатую историю и культуру тайских городов. 
            От древних храмов до современных достопримечательностей.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="font-semibold">{cityTours.length} экскурсий</span> • От 1,390 ₽
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
                className={selectedFilter === category.id ? "bg-blue-600 text-white" : ""}
              >
                {category.name}
              </Button>
            ))}
            <div className="ml-auto text-gray-600 flex items-center gap-2">
              Сортировка: 
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1 text-blue-600"
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
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
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
                        <span className="text-2xl font-bold text-blue-600">
                          {tour.price} {tour.currency}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            {tour.originalPrice} {tour.currency}
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500 text-sm">{tour.reviewsCount} отзывов</div>
                    </div>
                    <Link to={`/excursion/${tour.slug}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Не нашли подходящий тур?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Мы поможем подобрать идеальную экскурсию под ваши интересы и бюджет. 
            Свяжитесь с нами для персональной консультации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              Получить консультацию
            </Button>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Индивидуальный тур
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CityTours;
