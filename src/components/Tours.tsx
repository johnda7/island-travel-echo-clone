import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { useTours } from "@/hooks/useTours";
import { Badge } from "@/components/ui/badge";

export const Tours = () => {
  const { popularTours, loading } = useTours();
  
  // Состояние для модального окна бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  const handleBookingClick = (tour: any) => {
    if (tour.data) {
      setSelectedTour(tour.data);
      setShowBookingModal(true);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Загружаем туры...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Популярные туры</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите из нашей коллекции лучших экскурсий по островам Таиланда
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-48">
                <img
                  src={tour.data?.mainImage}
                  alt={tour.data?.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-blue-600 text-white">
                    {tour.category === 'islands' ? 'Морские' : tour.category}
                  </Badge>
                </div>
                {tour.data?.rating && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{tour.data.rating}</span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {tour.data?.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{tour.data?.subtitle}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.data?.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {tour.data?.groupSize}
                  </div>
                </div>

                {/* Ключевые особенности */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tour.data?.highlights?.slice(0, 3).map((highlight, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        {highlight}
                      </Badge>
                    ))}
                    {tour.data?.highlights && tour.data.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tour.data.highlights.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    от {tour.data?.priceAdult?.toLocaleString()} {tour.data?.currency}
                  </div>
                  
                  {tour.data?.reviewsCount && (
                    <div className="text-sm text-gray-500">
                      {tour.data.reviewsCount} отзывов
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Link to={tour.data?.route || `/tour/${tour.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Подробнее
                    </Button>
                  </Link>
                  
                  <Button 
                    className="flex-1"
                    onClick={() => handleBookingClick(tour)}
                    disabled={!tour.data}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Забронировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {popularTours.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Туры временно недоступны</h3>
            <p className="text-gray-500">Мы работаем над добавлением новых экскурсий</p>
          </div>
        )}
      </div>
      
      {/* Модальное окно бронирования */}
      {selectedTour && (
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={selectedTour}
        />
      )}
    </section>
  );
};
