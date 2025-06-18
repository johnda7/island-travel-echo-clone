
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Filter, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";

const GroupTours = () => {
  const groupTours = [
    {
      id: 1,
      slug: "bangkok-pattaya-5-days",
      title: "Bangkok & Pattaya 5 Days",
      subtitle: "Бангкок и Паттайя за 5 дней",
      price: "15,990",
      currency: "₽",
      duration: "5 дней",
      groupSize: "15-25 чел",
      rating: 4.8,
      reviewsCount: 342,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      highlights: ["Отель 4*", "Все экскурсии", "Русский гид", "Трансферы"],
      popular: true
    },
    {
      id: 2,
      slug: "phuket-krabi-7-days",
      title: "Phuket & Krabi 7 Days",
      subtitle: "Пхукет и Краби за неделю",
      price: "24,990",
      currency: "₽",
      duration: "7 дней",
      groupSize: "12-20 чел",
      rating: 4.9,
      reviewsCount: 278,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      highlights: ["2 острова", "Пляжный отдых", "Экскурсии", "Морские прогулки"]
    },
    {
      id: 3,
      slug: "northern-thailand-adventure",
      title: "Northern Thailand Adventure",
      subtitle: "Приключения на севере Тайланда",
      price: "18,990",
      currency: "₽",
      duration: "6 дней",
      groupSize: "10-15 чел",
      rating: 4.7,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      highlights: ["Чиангмай", "Чианграй", "Золотой треугольник", "Горные племена"]
    },
    {
      id: 4,
      slug: "thailand-grand-tour",
      title: "Thailand Grand Tour",
      subtitle: "Большое путешествие по Тайланду",
      price: "39,990",
      currency: "₽",
      duration: "12 дней",
      groupSize: "15-25 чел",
      rating: 4.9,
      reviewsCount: 198,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      highlights: ["5 городов", "Все включено", "Гид-историк", "VIP трансфер"]
    },
    {
      id: 5,
      slug: "islands-hopping-10-days",
      title: "Islands Hopping 10 Days",
      subtitle: "Путешествие по островам",
      price: "32,990",
      currency: "₽",
      duration: "10 дней",
      groupSize: "8-16 чел",
      rating: 4.8,
      reviewsCount: 223,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      highlights: ["6 островов", "Яхта", "Снорклинг", "Романтические ужины"]
    },
    {
      id: 6,
      slug: "cultural-heritage-tour",
      title: "Cultural Heritage Tour",
      subtitle: "Культурное наследие Тайланда",
      price: "21,990",
      currency: "₽",
      duration: "8 дней",
      groupSize: "12-18 чел",
      rating: 4.6,
      reviewsCount: 134,
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80",
      highlights: ["Аюттхая", "Сукхотхай", "Древние храмы", "Культурные мастер-классы"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <UsersIcon className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Групповые туры
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Присоединяйтесь к организованным группам и познакомьтесь с 
            единомышленниками во время путешествия по самым красивым местам Тайланда.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="font-semibold">{groupTours.length} групповых туров</span> • От 15,990 ₽
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
            <Button variant="outline">Все туры</Button>
            <Button variant="outline">5-7 дней</Button>
            <Button variant="outline">8-10 дней</Button>
            <Button variant="outline">10+ дней</Button>
            <Button variant="outline">Эконом</Button>
            <div className="ml-auto text-gray-600">
              Сортировка: <Button variant="ghost" className="p-0 h-auto text-purple-600">Популярные</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupTours.map((tour) => (
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
            Хотите путешествовать в компании?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Групповые туры - это отличная возможность познакомиться с новыми людьми, 
            разделить впечатления и сэкономить на путешествии.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              Получить консультацию
            </Button>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Записаться в группу
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GroupTours;
