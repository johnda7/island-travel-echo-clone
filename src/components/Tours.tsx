import { useState } from "react";
import { Clock, Users, Calendar, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { useTours, TourWithMeta } from "@/hooks/useTours";
import { TOURS_REGISTRY } from "@/data/toursRegistry";
import type { TourData } from "@/types/Tour";
import fallbackImage from "@/assets/maya-bay-sunrise.jpg";

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
    // ✅ ВСЕ ТУРЫ используют унифицированный путь /tours/{id}
    return `/tours/${tour.id}`;
  };

  const handleBookingClick = async (tour: TourWithMeta) => {
    console.log('🎯 handleBookingClick вызван для:', tour.id, 'Данные есть:', !!tour.data);
    console.log('📦 Объект тура:', tour);
    
    // Если данные уже есть, открываем сразу
    if (tour.data) {
      console.log('✅ Данные тура уже загружены, открываем модал');
      console.log('📋 Данные тура:', tour.data);
      setSelectedTour(tour.data);
      setShowBookingModal(true);
      return;
    }
    
    // Если данных нет, принудительно загружаем их из реестра
    console.log('🔄 Данных нет, загружаем из реестра для:', tour.id);
    console.log('📚 Весь реестр:', TOURS_REGISTRY);
    try {
      const tourRegistry = TOURS_REGISTRY.find(t => t.id === tour.id);
      console.log('🔍 Поиск в реестре по id:', tour.id, 'Найдено:', !!tourRegistry);
      
      if (tourRegistry) {
        console.log('📦 Найден в реестре, загружаем данные...');
        const tourData = await tourRegistry.data();
        console.log('✅ Данные загружены успешно:', tourData);
        setSelectedTour(tourData);
        setShowBookingModal(true);
      } else {
        console.error('❌ Тур не найден в реестре:', tour.id);
        console.error('📋 Доступные ID в реестре:', TOURS_REGISTRY.map(t => t.id));
        alert('⚠️ Не удалось загрузить данные тура. Попробуйте ещё раз.');
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки данных тура:', error);
      alert('⚠️ Не удалось загрузить данные тура. Попробуйте ещё раз.');
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
    <section className="pt-4 pb-4" style={{ background: 'transparent' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursToShow.map((tour, index) => (
            <Link 
              key={tour.id} 
              to={getDetailPath(tour)}
              className="block"
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
              }}
            >
              <div 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                }}
              >
                {/* ✅ РЕАЛЬНОЕ ФОТО ИЗ ДАННЫХ ТУРА */}
                <div className="relative h-48 overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
                  <img 
                    src={tour.data?.mainImage || tour.data?.gallery?.[0] || fallbackImage} 
                    alt={tour.data?.title || tour.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                  {tour.isPopular && (
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(255, 149, 0, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        boxShadow: '0 2px 8px rgba(255, 149, 0, 0.4)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                      }}
                    >
                      🔥 Популярно
                    </div>
                  )}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%)'
                    }}
                  >
                    <h3 
                      className="text-white text-xl font-bold"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {tour.data?.title || tour.name}
                    </h3>
                  </div>
                </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* ✅ РЕАЛЬНОЕ ОПИСАНИЕ ИЗ ДАННЫХ */}
                  <p 
                    className="text-sm line-clamp-2"
                    style={{
                      color: '#3C3C43',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      lineHeight: '1.4'
                    }}
                  >
                    {tour.data?.description || tour.data?.subtitle || 'Удивительный тур для незабываемых впечатлений'}
                  </p>
                  
                  {/* ✅ РЕАЛЬНЫЕ ХАРАКТЕРИСТИКИ ИЗ ДАННЫХ */}
                  <div className="flex items-center space-x-4 text-sm" style={{ color: '#8E8E93' }}>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        {tour.data?.duration || '2 дня'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        {tour.data?.groupSize || 'До 15 чел'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        Ежедневно
                      </span>
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
                    <span 
                      className="text-sm"
                      style={{
                        color: '#3C3C43',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        fontWeight: 600
                      }}
                    >
                      ({tour.data?.rating || 5.0})
                    </span>
                  </div>
                  
                  {/* ✅ ЦЕНТРАЛИЗОВАННЫЕ ТЕГИ ИЗ ДАННЫХ */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.tags?.slice(0, 3).map((tag: string, index: number) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-md"
                        style={{
                          background: 'rgba(0, 122, 255, 0.08)',
                          color: '#007AFF',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          fontWeight: 600
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* ✅ РЕАЛЬНЫЕ ЦЕНЫ ИЗ ДАННЫХ */}
                  <div 
                    className="flex items-center justify-between pt-4 mb-4"
                    style={{
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div>
                      <span 
                        className="text-2xl font-bold"
                        style={{
                          color: '#34C759',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        от {tour.data?.currency || '₿'}{tour.data?.priceAdult?.toLocaleString() || '4,500'}
                      </span>
                      <span 
                        className="text-sm ml-1"
                        style={{
                          color: '#8E8E93',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                        }}
                      >
                        / чел
                      </span>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-xs"
                        style={{
                          color: '#8E8E93',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                        }}
                      >
                        {tour.data?.priceChild && `Дети: ${tour.data.currency}${tour.data.priceChild.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                  
                  {/* ✅ КНОПКИ ДЕЙСТВИЙ */}
                  <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150"
                      style={{
                        background: 'rgba(0, 122, 255, 0.08)',
                        color: '#007AFF',
                        border: '1px solid rgba(0, 122, 255, 0.2)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        pointerEvents: 'none'
                      }}
                    >
                      📖 Подробнее о туре
                    </button>
                    <div 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <button 
                        onClick={(e) => {
                          console.log('🖱️ CLICK на кнопку бронирования для тура:', tour.name, tour.id);
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          handleBookingClick(tour);
                          return false;
                        }}
                        onTouchEnd={(e) => {
                          console.log('👆 TOUCH END на кнопку бронирования для тура:', tour.name, tour.id);
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          handleBookingClick(tour);
                          return false;
                        }}
                        className="w-full px-4 py-3 rounded-xl font-bold text-white text-sm transition-all duration-150 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
                          boxShadow: '0 4px 12px rgba(52, 199, 89, 0.3)',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          letterSpacing: '-0.01em',
                          touchAction: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(52, 199, 89, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(52, 199, 89, 0.3)';
                        }}
                      >
                        🏝️ Забронировать тур
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
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