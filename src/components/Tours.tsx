import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { useTours } from "@/hooks/useTours";
import { Badge } from "@/components/ui/badge";

interface ToursProps {
  filteredTours?: any[];
}

export const Tours = ({ filteredTours }: ToursProps) => {
  const { popularTours, loading } = useTours();
  
  // Использовать переданные туры или популярные по умолчанию
  const toursToShow = filteredTours || popularTours;
  
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загружаем туры...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {filteredTours ? 'Результаты поиска' : 'Популярные туры'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {filteredTours 
              ? `Найдено туров: ${toursToShow.length}`
              : 'Выберите лучшее приключение для незабываемого отдыха в Таиланде'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursToShow.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-green-500">
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold text-center px-4">
                    {tour.name}
                  </h3>
                </div>
                {tour.isPopular && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
                    Популярно
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {tour.category === 'islands' ? 'Морские экскурсии и острова' : 'Экскурсионный тур'}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>2 дня</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>До 15 чел</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Ежедневно</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(5.0)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.tags?.slice(0, 3).map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-green-600">от ₿4,500</span>
                      <span className="text-sm text-gray-500 ml-1">/ чел</span>
                    </div>
                    <div className="space-x-2">
                      <Link to={`/${tour.id}`}>
                        <Button variant="outline" size="sm">
                          Подробнее
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookingClick(tour)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Забронировать
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {toursToShow.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Туры не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить критерии поиска или сбросить фильтры
            </p>
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