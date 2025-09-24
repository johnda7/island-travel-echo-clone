import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { useTours, TourWithMeta } from "@/hooks/useTours";
import type { TourData } from "@/types/Tour";
import fallbackImage from "@/assets/maya-bay-sunrise.jpg";
import { Badge } from "@/components/ui/badge";

interface ToursProps {
  filteredTours?: TourWithMeta[];
}

export const Tours = ({ filteredTours }: ToursProps) => {
  const { popularTours, loading } = useTours();
  
  // Использовать переданные туры или популярные по умолчанию
  const toursToShow = filteredTours || popularTours;
  
  // Состояние для модального окна бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null);

  // Простая функция для определения пути тура
  const getDetailPath = (tour: TourWithMeta) => {
    // 🔄 ГИБРИДНАЯ МАРШРУТИЗАЦИЯ: Статические туры имеют специальные пути, CMS туры - динамические
    switch (tour.id) {
      case 'phi-phi-2days':
        return '/excursion/phi-phi-2-days-1-night';
      case 'pearls-andaman-sea':
        return '/excursion/pearls-andaman-sea';
      case 'dostoprimechatelnosti-phuketa':
        return '/excursion/dostoprimechatelnosti-phuketa';
      case 'rassvetnoe-prikljuchenie':
        return '/excursion/rassvetnoe-prikljuchenie';
      case 'avatar-plus-hangdong-adventure':
        return '/excursion/avatar-plus-hangdong-adventure';
      default:
        // ✅ ВСЕ CMS ТУРЫ И НОВЫЕ СТАТИЧЕСКИЕ ТУРЫ используют динамический роутинг
        return `/tours/${tour.id}`;
    }
  };

  const handleBookingClick = (tour: TourWithMeta) => {
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
              {/* ✅ СТАБИЛИЗИРОВАННОЕ ФОТО БЕЗ ДЕРГАНИЯ */}
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gray-100">
                  <img 
                    src={tour.data?.mainImage || tour.data?.gallery?.[0] || fallbackImage} 
                    alt={tour.data?.title || tour.name}
                    className="w-full h-full object-cover object-center"
                    width={400}
                    height={225}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>
                {tour.isPopular && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
                    🔥 Популярно
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">
                    {tour.data?.title || tour.name}
                  </h3>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* ✅ РЕАЛЬНОЕ ОПИСАНИЕ ИЗ ДАННЫХ */}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {tour.data?.description || tour.data?.subtitle || 'Удивительный тур для незабываемых впечатлений'}
                  </p>
                  
                  {/* ✅ РЕАЛЬНЫЕ ХАРАКТЕРИСТИКИ ИЗ ДАННЫХ */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.data?.duration || '2 дня'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.data?.groupSize || 'До 15 чел'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Ежедневно</span>
                    </div>
                  </div>
                  
                  {/* ✅ РЕАЛЬНЫЙ РЕЙТИНГ ИЗ ДАННЫХ */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(tour.data?.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({tour.data?.rating || 5.0})</span>
                    {tour.data?.reviewsCount && (
                      <span className="text-xs text-gray-400">({tour.data.reviewsCount} отзывов)</span>
                    )}
                  </div>
                  
                  {/* ✅ ЦЕНТРАЛИЗОВАННЫЕ ТЕГИ ИЗ ДАННЫХ */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.tags?.slice(0, 3).map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* ✅ РЕАЛЬНЫЕ ЦЕНЫ ИЗ ДАННЫХ */}
                  <div className="flex items-center justify-between pt-4 border-t mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        от {tour.data?.currency || '₿'}{tour.data?.priceAdult?.toLocaleString() || '4,500'}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/ чел</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">
                        {tour.data?.priceChild && `Дети: ${tour.data.currency}${tour.data.priceChild.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                  
                  {/* ✅ КНОПКИ ДЕЙСТВИЙ */}
                  <div className="space-y-2">
                    <Link to={getDetailPath(tour)} className="block">
                      <Button variant="outline" className="w-full">
                        📖 Подробнее о туре
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleBookingClick(tour)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                    >
                      🏝️ Забронировать тур
                    </Button>
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
        <ModalPortal>
          <UniversalBookingModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            tourData={selectedTour}
          />
        </ModalPortal>
      )}
    </section>
  );
};