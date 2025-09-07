import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Waves, 
  Anchor, 
  Camera, 
  Calendar,
  ArrowRight,
  Palmtree,
  Fish,
  Mountain
} from "lucide-react";
import { Link } from "react-router-dom";

const PhiPhiIslands = () => {
  const phiPhiTours = [
    {
      id: 1,
      title: "Phi Phi Islands by Speedboat",
      subtitle: "Острова Пхи-Пхи на скоростной лодке",
      slug: "phi-phi-islands-speedboat",
      price: "2,890",
      originalPrice: "3,200",
      duration: "8 часов",
      groupSize: "до 20 человек",
      rating: 4.8,
      reviewsCount: 245,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      highlights: ["Бухта Майя", "Monkey Beach", "Снорклинг", "Обед на пляже"],
      tags: ["Популярный", "Скоростная лодка"],
      category: "premium",
      description: "Посетите знаменитые острова Пхи-Пхи на комфортной скоростной лодке. Бухта Майя, снорклинг и незабываемые виды!"
    },
    {
      id: 2,
      title: "Koh Phi Phi Leh Lagoon",
      subtitle: "Лагуна острова Пхи-Пхи Ле",
      slug: "koh-phi-phi-leh-lagoon",
      price: "2,490",
      originalPrice: "2,800",
      duration: "7 часов",
      groupSize: "до 20 человек",
      rating: 4.6,
      reviewsCount: 165,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=600&q=80",
      highlights: ["Закрытая лагуна", "Каякинг", "Пещеры", "Изумрудная вода"],
      tags: ["Каякинг", "Эко-тур"],
      category: "adventure",
      description: "Исследуйте секретную лагуну Пхи-Пхи Ле на каяке. Проплывите через пещеры к закрытой лагуне с изумрудной водой."
    },
    {
      id: 3,
      title: "Maya Bay Sunrise",
      subtitle: "Рассвет в бухте Майя",
      slug: "maya-bay-sunrise",
      price: "3,200",
      originalPrice: "3,600",
      duration: "6 часов",
      groupSize: "до 15 человек",
      rating: 4.9,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=600&q=80",
      highlights: ["Рассвет в Майя Бэй", "Без толп туристов", "Завтрак на пляже", "Йога на рассвете"],
      tags: ["Эксклюзив", "Рассвет"],
      category: "exclusive",
      description: "Встретьте рассвет в легендарной бухте Майя без толп туристов. Уникальная возможность увидеть это место в тишине."
    },
    {
      id: 4,
      title: "Phi Phi Big Boat Tour",
      subtitle: "Пхи-Пхи на большой лодке",
      slug: "big-boat-phi-phi",
      price: "1,890",
      originalPrice: "2,200",
      duration: "9 часов",
      groupSize: "до 40 человек",
      rating: 4.4,
      reviewsCount: 312,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
      highlights: ["Комфортная большая лодка", "Буфет на борту", "4 острова", "Снорклинг оборудование"],
      tags: ["Экономный", "Большая группа"],
      category: "budget",
      description: "Бюджетный тур на острова Пхи-Пхи на комфортной большой лодке с буфетом и остановками на 4 островах."
    },
    {
      id: 5,
      title: "Phi Phi Sunset & Plankton",
      subtitle: "Закат и светящийся планктон",
      slug: "phi-phi-sunset-plankton",
      price: "2,690",
      originalPrice: "3,000",
      duration: "8 часов",
      groupSize: "до 18 человек",
      rating: 4.7,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=600&q=80",
      highlights: ["Закат на Пхи-Пхи", "Светящийся планктон", "Ночное плавание", "Ужин на пляже"],
      tags: ["Романтик", "Планктон"],
      category: "romantic",
      description: "Романтический тур с закатом на Пхи-Пхи и уникальным плаванием со светящимся планктоном в темноте."
    },
    {
      id: 6,
      title: "Private Phi Phi Luxury",
      subtitle: "Приватный VIP тур на Пхи-Пхи",
      slug: "private-phi-phi-luxury",
      price: "12,500",
      originalPrice: "14,000",
      duration: "8 часов",
      groupSize: "до 8 человек",
      rating: 5.0,
      reviewsCount: 43,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      highlights: ["Приватная лодка", "Персональный гид", "Гурмэ обед", "Шампанское на закате"],
      tags: ["VIP", "Приватный"],
      category: "luxury",
      description: "Эксклюзивный приватный тур на роскошной лодке с персональным сервисом и гурмэ питанием."
    }
  ];

  const categories = [
    { id: "all", name: "Все туры", icon: Palmtree, count: 6 },
    { id: "premium", name: "Премиум", icon: Anchor, count: 1 },
    { id: "adventure", name: "Приключения", icon: Mountain, count: 1 },
    { id: "exclusive", name: "Эксклюзив", icon: Star, count: 1 },
    { id: "budget", name: "Эконом", icon: Users, count: 1 },
    { id: "romantic", name: "Романтик", icon: Fish, count: 1 },
    { id: "luxury", name: "Люкс", icon: Camera, count: 1 }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      premium: "bg-blue-100 text-blue-800",
      adventure: "bg-green-100 text-green-800",
      exclusive: "bg-purple-100 text-purple-800",
      budget: "bg-orange-100 text-orange-800",
      romantic: "bg-pink-100 text-pink-800",
      luxury: "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Острова • Пхукет
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Острова Пхи-Пхи
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Откройте для себя легендарные острова из фильма "Пляж". Кристально чистая вода, 
              белоснежные пляжи и незабываемые закаты ждут вас!
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>90 минут от Пхукета</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5" />
                <span>Андаманское море</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <span>Бухта Майя</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Выберите тип тура</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-teal-500">
                <CardContent className="p-4 text-center">
                  <category.icon className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                  <div className="font-semibold text-sm">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} туров</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Все туры на острова Пхи-Пхи</h2>
            <div className="text-gray-600">{phiPhiTours.length} туров найдено</div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {phiPhiTours.map((tour) => (
              <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md">
                <div className="relative overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(tour.category)}>
                      {tour.tags[0]}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{tour.rating}</span>
                  </div>
                  {tour.originalPrice && (
                    <div className="absolute bottom-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      Скидка {Math.round((1 - parseInt(tour.price) / parseInt(tour.originalPrice)) * 100)}%
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight group-hover:text-teal-600 transition-colors">
                    {tour.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{tour.subtitle}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {tour.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {tour.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{tour.highlights.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {tour.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {tour.originalPrice} ₽
                          </span>
                        )}
                        <span className="text-2xl font-bold text-teal-600">
                          {tour.price} ₽
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">за человека</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {tour.reviewsCount} отзывов
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      asChild 
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <Link to={`/excursion/${tour.slug}`}>
                        Подробнее
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-4 border-teal-600 text-teal-600 hover:bg-teal-50"
                    >
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Почему острова Пхи-Пхи так популярны?
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Острова Пхи-Пхи стали всемирно известными после выхода фильма "Пляж" с Леонардо ДиКаприо. 
                  Но их красота была очевидна задолго до этого.
                </p>
                <p>
                  Кристально чистая вода, белоснежные пляжи, живописные скалы и богатый подводный мир 
                  делают эти острова must-see местом для каждого туриста в Таиланде.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-teal-600">6</div>
                    <div className="text-sm text-gray-600">Островов в архипелаге</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-teal-600">90</div>
                    <div className="text-sm text-gray-600">Минут от Пхукета</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
                alt="Острова Пхи-Пхи"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-teal-600">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">4.8/5</span>
                </div>
                <div className="text-sm text-gray-600">Средний рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PhiPhiIslands;