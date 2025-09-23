import { useState, useEffect, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { useCMSTours, CMSTour } from "@/hooks/useCMSTours";

const DynamicTourPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tours } = useCMSTours();
  
  // Получаем тур из уже загруженного списка - КАК В СТАТИЧЕСКИХ ТУРАХ
  const tour = tours.find(t => t.slug === slug);
  
  // Галерея состояния
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Состояние для модального окна бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Если тур не найден - редирект на 404 (КАК В СТАТИЧЕСКИХ ТУРАХ)
  if (!tour) {
    return <Navigate to="/404" replace />;
  }

  // Функции для галереи (такие же как в оригинальном компоненте)
  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowFullGallery(true);
  };

  const openGallery = () => {
    if (!tour?.gallery.length) return;
    setShowFullGallery(true);
    setSelectedImage(tour.gallery[0].image_url);
    setCurrentImageIndex(0);
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setShowFullGallery(false);
  }, []);

  const nextImage = useCallback(() => {
    if (!tour?.gallery) return;
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % tour.gallery.length;
      setSelectedImage(tour.gallery[nextIndex].image_url);
      return nextIndex;
    });
  }, [tour]);

  const prevImage = useCallback(() => {
    if (!tour?.gallery) return;
    setCurrentImageIndex((prev) => {
      const prevIndex = prev === 0 ? tour.gallery.length - 1 : prev - 1;
      setSelectedImage(tour.gallery[prevIndex].image_url);
      return prevIndex;
    });
  }, [tour]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showFullGallery) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullGallery, nextImage, prevImage, closeModal]);

  // Конвертируем тур в формат, совместимый с UniversalBookingModal - КАК В СТАТИЧЕСКИХ ТУРАХ
  const tourData = {
    id: tour.id,
    title: tour.title,
    subtitle: tour.subtitle,
    description: tour.description,
    priceAdult: tour.price_adult,
    priceChild: tour.price_child,
    currency: tour.currency,
    duration: tour.duration,
    groupSize: tour.group_size,
    gallery: tour.gallery.map(g => g.image_url),
    highlights: tour.highlights,
    included: tour.included,
    excluded: tour.excluded,
    requirements: tour.requirements,
    importantInfo: tour.important_info,
    tags: tour.tags,
    route: `/tours/${tour.slug}`,
    rating: 4.8,
    reviewsCount: 127,
    mainImage: tour.gallery[0]?.image_url || '/placeholder.jpg'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span>/</span>
          <Link to="/tours" className="hover:text-blue-600">Экскурсии</Link>
          <span>/</span>
          <span className="text-gray-900">{tour.title}</span>
        </div>
      </div>

      {/* Основной контент */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          
          {/* Мобильная галерея */}
          <div className="md:hidden mb-6">
            <div className="grid grid-cols-4 gap-2 h-64">
              {tour.gallery.slice(0, 5).map((image, index) => (
                <div 
                  key={image.id}
                  className={`cursor-pointer group relative overflow-hidden rounded-lg ${
                    index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                  onClick={() => index === 4 ? openGallery() : openModal(image.image_url, index)}
                >
                  <img 
                    src={image.image_url} 
                    alt={image.alt_text || tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {index === 4 && tour.gallery.length > 5 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg font-semibold mb-1">+{tour.gallery.length - 5}</div>
                        <div className="text-sm">фото</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={openGallery}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Показать все {tour.gallery.length} фото
              </button>
            </div>
          </div>

          {/* Десктопная компоновка */}
          <div className="hidden md:grid lg:grid-cols-3 gap-8">
            
            {/* Галерея - Левая сторона */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 gap-2 h-96">
                {tour.gallery.slice(0, 5).map((image, index) => (
                  <div 
                    key={image.id}
                    className={`cursor-pointer group relative overflow-hidden rounded-lg ${
                      index === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                    onClick={() => index === 4 ? openGallery() : openModal(image.image_url, index)}
                  >
                    <img 
                      src={image.image_url} 
                      alt={image.alt_text || tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {index === 4 && tour.gallery.length > 5 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-lg font-semibold mb-1">+{tour.gallery.length - 5}</div>
                          <div className="text-sm">фото</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={openGallery}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Показать все {tour.gallery.length} фото
                </button>
              </div>

              {/* Теги под галереей */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {tour.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Боковая панель бронирования */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tour.subtitle}</p>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>Продолжительность: {tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>Группа: {tour.group_size}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Ежедневно</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>Трансфер включен</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-green-600">
                      от {tour.price_adult.toLocaleString()} {tour.currency}
                    </div>
                    <div className="text-sm text-gray-500">за взрослого</div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                  >
                    Забронировать тур
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Мобильные теги */}
          <div className="md:hidden mt-6">
            <div className="flex flex-wrap gap-2">
              {tour.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Мобильная карточка бронирования */}
          <div className="md:hidden mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{tour.subtitle}</p>
            
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Продолжительность: {tour.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-gray-400" />
                <span>Группа: {tour.group_size}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Ежедневно</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Трансфер включен</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-green-600">
                от {tour.price_adult.toLocaleString()} {tour.currency}
              </div>
              <div className="text-sm text-gray-500">за взрослого</div>
            </div>
            
            <Button 
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
            >
              Забронировать тур
            </Button>
          </div>
        </div>
      </section>

      {/* Описание тура */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Описание</h2>
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line">{tour.description}</p>
            </div>
            
            {tour.highlights.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Особенности тура</h3>
                <ul className="space-y-2">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.included.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Включено в стоимость</h3>
                <ul className="space-y-2">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.excluded.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Не включено в стоимость</h3>
                <ul className="space-y-2">
                  {tour.excluded.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Полноэкранная галерея */}
      {selectedImage && showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-60"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Мобильная панель бронирования */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-lg font-bold text-green-600">
              от {tour.price_adult.toLocaleString()} {tour.currency}
            </div>
            <div className="text-xs text-gray-600">взрослый / {tour.price_child.toLocaleString()} {tour.currency} детский</div>
          </div>
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Забронировать
          </Button>
        </div>
      </div>

      {/* Отступ снизу */}
      <div className="h-20 lg:hidden" />

      {/* Модальное окно бронирования */}
      <ModalPortal>
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={tourData}
        />
      </ModalPortal>

      <Footer />
    </div>
  );
};

export default DynamicTourPage;