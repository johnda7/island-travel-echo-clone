
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Filter, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const BeachTours = () => {
  const beachTours = [
    {
      id: 1,
      slug: "phi-phi-islands-speedboat",
      title: "Phi Phi Islands by Speedboat",
      subtitle: "Острова Пхи-Пхи на скоростной лодке",
      price: "2,890",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 20 чел",
      rating: 4.8,
      reviewsCount: 245,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Бухта Майя", "Snorkeling", "Пляж Monkey Beach", "Обед на пляже"],
      popular: true
    },
    {
      id: 2,
      slug: "james-bond-island",
      title: "James Bond Island & Phang Nga Bay",
      subtitle: "Остров Джеймса Бонда",
      price: "2,190",
      currency: "₽",
      duration: "9 часов",
      groupSize: "до 18 чел",
      rating: 4.7,
      reviewsCount: 189,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["Остров Ко Тапу", "Пещеры", "Каноэ", "Плавучая деревня"]
    },
    {
      id: 3,
      slug: "coral-island-parasailing",
      title: "Coral Island + Parasailing",
      subtitle: "Коралловый остров с парасейлингом",
      price: "1,990",
      currency: "₽",
      duration: "7 часов",
      groupSize: "до 15 чел",
      rating: 4.6,
      reviewsCount: 167,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["Парасейлинг", "Водные виды спорта", "Белый песок", "Снорклинг"]
    },
    {
      id: 4,
      slug: "similan-islands-diving",
      title: "Similan Islands Diving",
      subtitle: "Дайвинг на Симиланских островах",
      price: "3,590",
      currency: "₽",
      duration: "12 часов",
      groupSize: "до 12 чел",
      rating: 4.9,
      reviewsCount: 98,
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80",
      highlights: ["Дайвинг", "Нетронутая природа", "Черепахи", "Коралловые рифы"]
    },
    {
      id: 5,
      slug: "krabi-four-islands",
      title: "Krabi Four Islands Tour",
      subtitle: "4 острова Краби",
      price: "2,390",
      currency: "₽",
      duration: "8 часов",
      groupSize: "до 16 чел",
      rating: 4.5,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Пляж Рейли", "Остров Poda", "Куриный остров", "Snorkeling"]
    },
    {
      id: 6,
      slug: "koh-samui-angthong",
      title: "Koh Samui to Ang Thong Marine Park",
      subtitle: "Морской парк Ангтхонг",
      price: "2,690",
      currency: "₽",
      duration: "10 часов",
      groupSize: "до 25 чел",
      rating: 4.7,
      reviewsCount: 134,
      image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80",
      highlights: ["Морской парк", "Каякинг", "Изумрудное озеро", "Смотровая площадка"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Waves className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Пляжные туры
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto mb-8">
            Исследуйте кристально чистые воды и белоснежные пляжи Тайланда. 
            Острова, снорклинг, дайвинг и незабываемые морские приключения.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="font-semibold">{beachTours.length} туров</span> • От 1,990 ₽
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
            <Button variant="outline">Все острова</Button>
            <Button variant="outline">Пхукет</Button>
            <Button variant="outline">Краби</Button>
            <Button variant="outline">Самуи</Button>
            <Button variant="outline">С дайвингом</Button>
            <div className="ml-auto text-gray-600">
              Сортировка: <Button variant="ghost" className="p-0 h-auto text-cyan-600">Популярные</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beachTours.map((tour) => (
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
                        <span key={index} className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full text-xs">
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
                        <span className="text-2xl font-bold text-cyan-600">
                          {tour.price} {tour.currency}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm">{tour.reviewsCount} отзывов</div>
                    </div>
                    <Link to={`/excursion/${tour.slug}`}>
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
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
      <section className="py-16 bg-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Хотите приватный тур?
          </h2>
          <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
            Организуем индивидуальные морские экскурсии с персональным гидом 
            и гибким маршрутом под ваши пожелания.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-cyan-600 hover:bg-gray-100">
              Получить консультацию
            </Button>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Приватный тур
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeachTours;
