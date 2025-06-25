import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookingModal } from "@/components/BookingModal";

const toursData = [
  {
    id: 1,
    title: "Острова Пхи Пхи на скоростной лодке",
    location: "Пхукет, Таиланд",
    duration: "8 часов",
    group: "До 35 человек",
    dates: "Круглый год",
    price: "2,490 ₽",
    originalPrice: "2,990 ₽",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    highlights: ["Майя Бэй", "Снорклинг", "Обед на пляже", "Лагуна"],
    description: "Незабываемое путешествие к знаменитым островам Пхи Пхи с посещением Майя Бэй.",
    featured: true,
    category: "beach"
  },
  {
    id: 2,
    title: "Остров Джеймса Бонда",
    location: "Пханг Нга, Таиланд", 
    duration: "8 часов",
    group: "До 25 человек",
    dates: "Октябрь - Май",
    price: "2,590 ₽",
    originalPrice: "3,090 ₽",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    highlights: ["Каноэ в пещерах", "Деревня на воде", "Морепродукты", "Известняковые скалы"],
    description: "Исследование залива Пханг Нга с посещением знаменитого острова из фильма о Джеймсе Бонде.",
    featured: false,
    category: "beach"
  },
  {
    id: 3,
    title: "11 островов Стандарт",
    location: "Краби, Таиланд",
    duration: "9 часов", 
    group: "До 40 человек",
    dates: "Ноябрь - Апрель",
    price: "2,690 ₽",
    originalPrice: "3,190 ₽",
    rating: 5.0,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    highlights: ["11 островов", "Снорклинг", "Обед-барбекю", "Кристальная вода"],
    description: "Большое путешествие по 11 живописным островам с множеством активностей.",
    featured: true,
    category: "beach"
  },
  {
    id: 4,
    title: "Большой дворец Бангкока",
    location: "Бангкок, Таиланд",
    duration: "6 часов",
    group: "До 20 человек", 
    dates: "Круглый год",
    price: "1,890 ₽",
    originalPrice: "2,390 ₽",
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    highlights: ["Королевский дворец", "Храм Изумрудного Будды", "Речные каналы", "История"],
    description: "Погружение в королевскую историю Таиланда с посещением главных достопримечательностей Бангкока.",
    featured: false,
    category: "city"
  },
  {
    id: 5,
    title: "Треккинг к водопадам Чиангмая",
    location: "Чиангмай, Таиланд",
    duration: "7 часов",
    group: "До 12 человек",
    dates: "Октябрь - Март",
    price: "2,190 ₽",
    originalPrice: "2,690 ₽", 
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Водопады", "Джунгли", "Деревни племен", "Треккинг"],
    description: "Активное приключение в джунглях северного Таиланда с посещением традиционных деревень.",
    featured: false,
    category: "adventure"
  },
  {
    id: 6,
    title: "Групповой тур: Айюттхая и плавучие рынки",
    location: "Айюттхая, Таиланд",
    duration: "10 часов",
    group: "15-25 человек",
    dates: "Каждый день",
    price: "1,590 ₽",
    originalPrice: "1,990 ₽",
    rating: 4.5,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&q=80",
    highlights: ["Древние руины", "Плавучий рынок", "Обед", "Групповая скидка"],
    description: "Экономичный групповой тур к древней столице Сиама с посещением традиционных рынков.",
    featured: true,
    category: "group"
  }
];

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "Все туры" },
    { id: "beach", name: "Морские" },
    { id: "city", name: "Городские" },
    { id: "adventure", name: "Приключения" },
    { id: "group", name: "Групповые" }
  ];

  const filteredTours = toursData.filter(tour => 
    selectedCategory === "all" || tour.category === selectedCategory
  );

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
      case "price-high":
        return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

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
              Выберите идеальный тур из нашей коллекции тайских приключений.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button 
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-full px-4 py-2 text-blue-600"
              >
                <option value="popular">Популярные</option>
                <option value="price-low">Цена: низкая</option>
                <option value="price-high">Цена: высокая</option>
                <option value="rating">Рейтинг</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
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
                    <BookingModal tourTitle={tour.title} tourPrice={tour.price}>
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                        Забронировать
                      </Button>
                    </BookingModal>
                    <Link to={`/category/${tour.category}-tours`}>
                      <Button variant="outline" className="rounded-full">
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

      <Footer />
    </div>
  );
};

export default Tours;
