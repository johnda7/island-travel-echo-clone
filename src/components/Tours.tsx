import { useState, useEffect, useCallback, useMemo } from "react";
import { Clock, Users, Calendar, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversalBookingModal } from "@/components/UniversalBookingModalWrapper";
import { ModalPortal } from "@/components/ModalPortal";
import { useTours, TourWithMeta } from "@/hooks/useTours";
import { TOURS_REGISTRY } from "@/data/toursRegistry";
import { TourFilters, TourFilterOptions } from "@/components/TourFilters";
import type { TourData } from "@/types/Tour";
import fallbackImage from "@/assets/maya-bay-sunrise.jpg";

interface ToursProps {
  filteredTours?: TourWithMeta[];
}

export const Tours = ({ filteredTours }: ToursProps) => {
  const { popularTours, allTours, loading } = useTours();
  
  // Фильтрация туров
  const [filters, setFilters] = useState<TourFilterOptions>({
    priceRange: [0, 10000],
    duration: [],
    categories: []
  });

  // Базовые туры для отображения
  const baseTours = filteredTours || popularTours;

  // Применяем фильтры с useMemo для оптимизации
  const toursToShow = useMemo(() => {
    // Если нет активных фильтров - возвращаем все базовые туры
    const hasActiveFilters = 
      filters.categories.length > 0 || 
      filters.duration.length > 0 || 
      filters.priceRange[0] > 0 || 
      filters.priceRange[1] < 10000;
    
    if (!hasActiveFilters) {
      return baseTours;
    }
    
    return baseTours.filter(tour => {
      // Фильтр по категориям
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(tour.category)) {
          return false;
        }
      }
      
      // Фильтр по длительности (проверяем теги)
      if (filters.duration.length > 0) {
        const hasDuration = filters.duration.some(dur => {
          if (dur === '1 день') {
            // Все однодневные туры (НЕ содержат 2 дня/ночевка/многодневные)
            const isMultiDay = tour.tags.some(tag => 
              tag.includes('2 дня') || 
              tag.includes('многодневные') ||
              tag.includes('ночевка')
            );
            return !isMultiDay;
          }
          if (dur === '2 дня') {
            return tour.tags.some(tag => 
              tag.includes('2 дня') || 
              tag.includes('многодневные') ||
              tag.includes('ночевка')
            );
          }
          return false;
        });
        if (!hasDuration) return false;
      }
      
      // Фильтр по цене
      if (tour.data?.priceAdult) {
        if (filters.priceRange[0] > 0 && tour.data.priceAdult < filters.priceRange[0]) {
          return false;
        }
        if (filters.priceRange[1] < 10000 && tour.data.priceAdult > filters.priceRange[1]) {
          return false;
        }
      }
      
      return true;
    });
  }, [baseTours, filters]);
  
  // Состояние для модального окна бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null);
  const [isLoadingTour, setIsLoadingTour] = useState(false);
  const [preloadedTours, setPreloadedTours] = useState<Map<string, TourData>>(new Map());

  // ✅ Ленивая предзагрузка туров (не блокирует UI)
  useEffect(() => {
    let cancelled = false;
    
    const preloadToursLazy = async () => {
      const loaded = new Map<string, TourData>();
      
      // Загружаем по одному с небольшой задержкой чтобы не блокировать UI
      for (const tour of baseTours) {
        if (cancelled) break;
        
        try {
          const tourRegistry = TOURS_REGISTRY.find(t => t.id === tour.id);
          if (tourRegistry) {
            const tourData = await tourRegistry.data();
            loaded.set(tour.id, tourData);
            
            // Обновляем стейт после каждого тура
            if (!cancelled) {
              setPreloadedTours(new Map(loaded));
            }
          }
        } catch (error) {
          // Тихо игнорируем ошибки предзагрузки
        }
        
        // Микро-пауза между турами для отзывчивости UI
        await new Promise(r => setTimeout(r, 10));
      }
    };

    if (baseTours.length > 0) {
      // Запускаем предзагрузку с небольшой задержкой после монтирования
      const timer = setTimeout(preloadToursLazy, 500);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }
  }, [baseTours]);

  // Простая функция для определения пути тура
  const getDetailPath = (tour: TourWithMeta) => {
    // ✅ ВСЕ ТУРЫ используют унифицированный путь /tours/{id}
    return `/tours/${tour.id}`;
  };

  const handleBookingClick = useCallback(async (tour: TourWithMeta) => {
    console.log('🎯 handleBookingClick вызван для:', tour.id);
    
    // ✅ РЕШЕНИЕ: Проверяем сначала предзагруженные данные
    const preloadedData = preloadedTours.get(tour.id);
    if (preloadedData) {
      console.log('✅ Используем предзагруженные данные');
      // Используем requestAnimationFrame для гарантированного обновления
      requestAnimationFrame(() => {
        setSelectedTour(preloadedData);
        requestAnimationFrame(() => {
          setShowBookingModal(true);
        });
      });
      return;
    }
    
    // Если данные уже есть в tour.data
    if (tour.data) {
      console.log('✅ Данные тура уже загружены');
      requestAnimationFrame(() => {
        setSelectedTour(tour.data);
        requestAnimationFrame(() => {
          setShowBookingModal(true);
        });
      });
      return;
    }
    
    // Крайний случай - загружаем данные прямо сейчас
    if (isLoadingTour) {
      console.log('⏳ Уже загружаем тур, пропускаем клик');
      return;
    }
    
    console.log('🔄 Загружаем данные тура прямо сейчас');
    setIsLoadingTour(true);
    
    try {
      const tourRegistry = TOURS_REGISTRY.find(t => t.id === tour.id);
      
      if (tourRegistry) {
        const tourData = await tourRegistry.data();
        console.log('✅ Данные загружены успешно');
        requestAnimationFrame(() => {
          setSelectedTour(tourData);
          requestAnimationFrame(() => {
            setShowBookingModal(true);
            setIsLoadingTour(false);
          });
        });
      } else {
        console.error('❌ Тур не найден в реестре:', tour.id);
        alert('⚠️ Не удалось загрузить данные тура. Попробуйте ещё раз.');
        setIsLoadingTour(false);
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки данных тура:', error);
      alert('⚠️ Не удалось загрузить данные тура. Попробуйте ещё раз.');
      setIsLoadingTour(false);
    }
  }, [preloadedTours, isLoadingTour]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка туров...</p>
        </div>
      </div>
    );
  }

  return (
    <section 
      id="tours" 
      className="py-16 bg-gradient-to-b from-white via-blue-50/30 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {filteredTours ? 'Результаты поиска' : 'Популярные туры'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {filteredTours 
              ? `Найдено ${toursToShow.length} туров` 
              : 'Откройте для себя самые популярные направления Пхукета'
            }
          </p>
        </div>

        {/* Filters */}
        {!filteredTours && (
          <div className="mb-8">
            <TourFilters 
              onFilterChange={setFilters}
              tourCount={toursToShow.length}
            />
          </div>
        )}

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursToShow.map((tour, index) => (
            <TourCard 
              key={tour.id}
              tour={tour}
              index={index}
              getDetailPath={getDetailPath}
              onBook={() => handleBookingClick(tour)}
              isLoading={isLoadingTour}
            />
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
      </div>
    </section>
  );
};

// Выносим разметку карточки в отдельный компонент, чтобы избежать конфликтов JSX внутри map
function TourCard({
  tour,
  index,
  getDetailPath,
  onBook,
  isLoading,
}: {
  tour: TourWithMeta;
  index: number;
  getDetailPath: (t: TourWithMeta) => string;
  onBook: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      className="block"
      style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both` }}
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
        <Link to={getDetailPath(tour)} className="block">
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
        </Link>

        <div className="p-6">
          <div className="space-y-4">
            <p
              className="text-sm line-clamp-2"
              style={{ color: '#3C3C43', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '1.4' }}
            >
              {tour.data?.description || tour.data?.subtitle || 'Удивительный тур для незабываемых впечатлений'}
            </p>

            <div className="flex items-center space-x-4 text-sm" style={{ color: '#8E8E93' }}>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>{tour.data?.duration || '2 дня'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>{tour.data?.groupSize || 'До 15 чел'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>Ежедневно</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(tour.data?.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm" style={{ color: '#3C3C43', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontWeight: 600 }}>
                ({tour.data?.rating || 5.0})
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {tour.tags?.slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgba(0, 122, 255, 0.08)', color: '#007AFF', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontWeight: 600 }}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 mb-4" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div>
                <span className="text-2xl font-bold" style={{ color: '#34C759', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', letterSpacing: '-0.02em' }}>
                  от {tour.data?.currency || '₿'}{tour.data?.priceAdult?.toLocaleString() || '4,500'}
                </span>
                <span className="text-sm ml-1" style={{ color: '#8E8E93', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                  / чел
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs" style={{ color: '#8E8E93', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                  {tour.data?.priceChild && `Дети: ${tour.data.currency}${tour.data.priceChild.toLocaleString()}`}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Link 
                to={getDetailPath(tour)}
                className="w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 block text-center hover:bg-opacity-80" 
                style={{ 
                  background: 'rgba(0, 122, 255, 0.08)', 
                  color: '#007AFF', 
                  border: '1px solid rgba(0, 122, 255, 0.2)', 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' 
                }}
              >
                📖 Подробнее о туре
              </Link>
              <div>
                <button
                  type="button"
                  disabled={isLoading}
                  onPointerDown={(e) => {
                    // iOS-first tap reliability: react to pointerdown
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as any).stopImmediatePropagation?.();
                    onBook();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as any).stopImmediatePropagation?.();
                    onBook();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as any).stopImmediatePropagation?.();
                    onBook();
                  }}
                  className="w-full px-4 py-3 rounded-xl font-bold text-white text-sm transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isLoading ? '#8E8E93' : 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
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
                  {isLoading ? '⏳ Загрузка...' : '🏝️ Забронировать тур'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}