
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { BookingModal } from "./BookingModal";
import { PopularityBadge } from "./PopularityBadge";
import { tours, getFeaturedTours } from "@/data/tours";

// Получаем новые туры из централизованного источника данных
const featuredTours = getFeaturedTours();

export const Tours = () => {
  const formatPrice = (tour: any) => {
    const basePrice = tour.pricing?.base?.adult || 0;
    return `${basePrice.toLocaleString()} ฿`;
  };

  const getMainImage = (tour: any) => {
    return tour.images?.find((img: any) => img.category === "hero")?.url || 
           tour.images?.[0]?.url || 
           "/default-tour-image.jpg";
  };

  const getDurationText = (tour: any) => {
    const duration = tour.duration;
    if (duration?.days && duration?.nights) {
      return `${duration.days} ${duration.days === 1 ? 'день' : 'дня'} / ${duration.nights} ${duration.nights === 1 ? 'ночь' : 'ночи'}`;
    }
    return tour.duration || "1 день";
  };

  const getGroupSizeText = (tour: any) => {
    const groupSize = tour.groupSize;
    if (groupSize?.max) {
      return `До ${groupSize.max} человек`;
    }
    return "Группа";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Популярные экскурсии
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Тщательно спланированные морские путешествия для создания незабываемых воспоминаний
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={getMainImage(tour)} 
                  alt={tour.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {tour.featured && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                    ⭐ Популярно
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="font-bold text-blue-600">{formatPrice(tour)}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{tour.title}</h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{getDurationText(tour)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{getGroupSizeText(tour)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {tour.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-800">Особенности:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tour.tags?.slice(0, 3).map((tag: string, index: number) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <BookingModal tourTitle={tour.title} tourPrice={formatPrice(tour)}>
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                      Забронировать
                    </Button>
                  </BookingModal>
                  
                  <Link to={`/tours/${tour.slug}`}>
                    <Button variant="outline" className="rounded-full">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            <Link to="/phi-phi-islands">
              <Button size="lg" className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-full">
                Все туры на Пхи-Пхи
              </Button>
            </Link>
            <Link to="/tours">
              <Button size="lg" variant="outline" className="w-full rounded-full">
                Смотреть все туры
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
