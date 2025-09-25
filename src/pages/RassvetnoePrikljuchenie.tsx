import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { rassvetnoePrikljuchenieTourData } from '@/data/rassvetnoePrikljuchenieTour';
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";

// ИСПОЛЬЗУЕМ ЕДИНЫЙ ИСТОЧНИК ДАННЫХ
const excursion = rassvetnoePrikljuchenieTourData;

const RassvetnoePrikljuchenie = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState<number>(0);
  
  // Состояние для модального окна бронирования
  const [showBookingModal, setShowBookingModal] = useState(false);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowFullGallery(true);
  };

  const openGallery = () => {
    setShowFullGallery(true);
    setSelectedImage(excursion.gallery[0]);
    setCurrentImageIndex(0);
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setShowThumbnails(false);
    setShowFullGallery(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % excursion.gallery.length;
      setSelectedImage(excursion.gallery[nextIndex]);
      return nextIndex;
    });
  }, [excursion.gallery]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const prevIndex = (prev - 1 + excursion.gallery.length) % excursion.gallery.length;
      setSelectedImage(excursion.gallery[prevIndex]);
      return prevIndex;
    });
  }, [excursion.gallery]);

  // Touch handlers for mobile swipe
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
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  }, [selectedImage, nextImage, prevImage, closeModal]);

  // Add keyboard event listener
  useEffect(() => {
    if (!selectedImage) return;
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, handleKeyPress]);

  // Handle mobile gallery scroll
  const handleMobileGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setMobileGalleryIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      <Header />
      
      {/* Breadcrumbs - как на tisland.travel */}
      <section className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-green-600 transition-colors">Главная</Link>
              <span>›</span>
              <Link to="/tours" className="hover:text-green-600 transition-colors">Туры</Link>
              <span>›</span>
              <Link to="/tours?category=adventure" className="hover:text-green-600 transition-colors">Приключения</Link>
              <span>›</span>
              <span className="text-gray-700">Рассветное приключение</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Gallery section - сразу после хлебных крошек */}
      <section className="pb-2">
        {/* Мобильная карусель - во всю ширину экрана как на tisland.travel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Карусель с свайпом */}
            <div 
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              onScroll={handleMobileGalleryScroll}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {excursion.gallery.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full snap-start">
                  <img
                    src={image}
                    alt={`${excursion.title} - фото ${index + 1}`}
                    className="w-full h-[300px] object-cover"
                    onClick={() => openModal(image, index)}
                  />
                </div>
              ))}
            </div>

            {/* Индикаторы слайдов */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {excursion.gallery.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === mobileGalleryIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Кнопка открыть все фото */}
            <button
              onClick={openGallery}
              className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm flex items-center space-x-1 hover:bg-black/70 transition-colors"
            >
              <Grid3X3 className="w-4 h-4" />
              <span>Все фото</span>
            </button>
          </div>
        </div>

        {/* Десктопная галерея - сетка 2x2 как на tisland.travel */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-2 h-[400px]">
              {/* Большое главное фото */}
              <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => openModal(excursion.gallery[0], 0)}>
                <img
                  src={excursion.gallery[0]}
                  alt={`${excursion.title} - главное фото`}
                  className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                />
              </div>

              {/* Малые фото справа */}
              {excursion.gallery.slice(1, 5).map((image, index) => (
                <div 
                  key={index + 1} 
                  className="relative group cursor-pointer"
                  onClick={() => openModal(image, index + 1)}
                >
                  <img
                    src={image}
                    alt={`${excursion.title} - фото ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  {index === 3 && excursion.gallery.length > 5 && (
                    <div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg text-white font-semibold cursor-pointer hover:bg-black/60 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery();
                      }}
                    >
                      +{excursion.gallery.length - 5} фото
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tour info section - информация о туре */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Левая колонка - основная информация */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {excursion.rating} ({excursion.reviewsCount} отзывов)
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {excursion.duration}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Users className="w-3 h-3 mr-1" />
                    {excursion.groupSize}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{excursion.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{excursion.subtitle}</p>
              </div>

              {/* Краткое описание */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">О туре</h2>
                <p className="text-gray-700 leading-relaxed">{excursion.description}</p>
              </div>

              {/* Основные моменты */}
              {excursion.highlights && excursion.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Основные моменты</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {excursion.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Программа тура */}
              {excursion.itinerary && excursion.itinerary.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Программа тура</h2>
                  <div className="space-y-6">
                    {excursion.itinerary.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.time}</h3>
                          <p className="text-gray-600">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Что включено / не включено */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {excursion.included && excursion.included.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Включено в стоимость</h3>
                    <ul className="space-y-2">
                      {excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {excursion.excluded && excursion.excluded.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Не включено</h3>
                    <ul className="space-y-2">
                      {excursion.excluded.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                            <X className="w-3 h-3 text-red-500" />
                          </div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Важная информация */}
              {excursion.importantInfo && excursion.importantInfo.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-amber-800 mb-4">Важная информация</h3>
                  <ul className="space-y-2">
                    {excursion.importantInfo.map((info, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                        <span className="text-amber-700 text-sm">{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Требования */}
              {excursion.requirements && excursion.requirements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Требования к участникам</h3>
                  <ul className="space-y-2">
                    {excursion.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-700 text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Правая колонка - форма бронирования */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="sticky top-24">
                {/* Карточка с ценой */}
                <Card className="shadow-lg border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900">
                        от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                      </div>
                      <div className="text-sm text-gray-500">за взрослого</div>
                      {excursion.priceChild && (
                        <div className="text-lg text-gray-600 mt-1">
                          {excursion.priceChild.toLocaleString()} {excursion.currency} за ребенка
                        </div>
                      )}
                    </div>

                    {/* Кнопка бронирования */}
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      onClick={() => setShowBookingModal(true)}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Забронировать тур
                    </Button>

                    {/* Дополнительная информация */}
                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span>Продолжительность: {excursion.duration}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-4 h-4 text-green-500" />
                        <span>Размер группы: {excursion.groupSize}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>Встреча в отеле</span>
                      </div>
                    </div>

                    {/* Дополнительная карточка с быстрым бронированием */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Забронировать тур</h3>
                      <p className="text-sm text-gray-600 mb-4">Оставьте заявку и мы свяжемся с вами для подтверждения</p>
                      <Button
                        variant="outline"
                        className="w-full border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => setShowBookingModal(true)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Забронировать сейчас
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Кнопка бронирования внизу для мобильных */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-40">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 text-lg shadow-lg"
          onClick={() => setShowBookingModal(true)}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Забронировать
        </Button>
      </div>

      {/* Полноэкранная галерея */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Кнопка закрытия */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Счетчик фото */}
          <div className="absolute top-4 left-4 z-60 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {excursion.gallery.length}
          </div>

          {/* Главное изображение */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={selectedImage || excursion.gallery[0]}
              alt={`${excursion.title} - фото ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* Кнопки навигации */}
            {excursion.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Миниатюры внизу */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-[90vw] overflow-x-auto">
            {excursion.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImageIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                  index === currentImageIndex ? 'ring-2 ring-white opacity-100' : 'opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={image}
                  alt={`Миниатюра ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Модальное окно бронирования */}
      <ModalPortal>
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={excursion}
        />
      </ModalPortal>

      <Footer />
    </div>
  );
};

export default RassvetnoePrikljuchenie;