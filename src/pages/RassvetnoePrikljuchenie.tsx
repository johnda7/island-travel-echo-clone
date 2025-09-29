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
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { useTelegram } from "@/contexts/TelegramContext";
import { TelegramNav } from "@/components/TelegramNav";

// ИСПОЛЬЗУЕМ ЕДИНЫЙ ИСТОЧНИК ДАННЫХ
const excursion = rassvetnoePrikljuchenieTourData;

const RassvetnoePrikljuchenie = () => {
  const { isWebApp, user, hapticFeedback } = useTelegram();
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

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(excursion.gallery[index]);
    setShowThumbnails(false);
  };

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
    <div className={`min-h-screen bg-white overflow-x-hidden ${isWebApp ? 'pb-4' : 'pb-20 lg:pb-0'}`}>
      <Header />
      
      {/* Breadcrumbs - как на tisland.travel, только в браузере */}
      {!isWebApp && (
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
      )}

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

        {/* Десктопная версия */}
        <div className="container mx-auto px-4 hidden md:block">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Галерея - левая часть на десктопе */}
            <div className="lg:col-span-2">
              {/* Десктопная галерея как на tisland.travel */}
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-2 h-96">
                {/* Большое главное фото */}
                <div 
                  className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[0], 0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt={excursion.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Два средних фото справа сверху */}
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[1], 1)}
                >
                  <img 
                    src={excursion.gallery[1]} 
                    alt="Gallery 2"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[2], 2)}
                >
                  <img 
                    src={excursion.gallery[2]} 
                    alt="Gallery 3"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Два средних фото справа снизу */}
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[3], 3)}
                >
                  <img 
                    src={excursion.gallery[3]} 
                    alt="Gallery 4"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={openGallery}
                >
                  <img 
                    src={excursion.gallery[4]} 
                    alt="Gallery 5"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-semibold mb-1">+{excursion.gallery.length - 5}</div>
                      <div className="text-sm">фото</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* Кнопка показать все фото */}
              <div className="mt-4">
                <button
                  onClick={openGallery}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                  </svg>
                  Показать все {excursion.gallery.length} фото
                </button>
              </div>
            </div>

            {/* Desktop Booking Sidebar - справа от фото */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                <div className="bg-white shadow-lg border-0 rounded-lg">
                  <div className="p-4">
                    {/* Информация о туре */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{excursion.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{excursion.subtitle}</p>
                      
                      <div className="space-y-2 mb-4 text-sm text-left">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Продолжительность: {excursion.duration}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>Группа: {excursion.groupSize}</span>
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
                      
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-green-600">
                          от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                        </div>
                        <div className="text-sm text-gray-500">за взрослого</div>
                      </div>
                      
                      <div className="space-y-2">
                        <button 
                          onClick={() => setShowBookingModal(true)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold rounded-md transition-colors"
                        >
                          Забронировать тур
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags section - компактно под фото как на tisland.travel */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {excursion.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Title and meta info - после тегов */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            {excursion.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            {excursion.subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
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
            <span className="text-2xl font-bold text-green-600">
              от {excursion.priceAdult.toLocaleString()} {excursion.currency}
            </span>
          </div>
        </div>
      </section>

      {/* Tour info section - информация о туре */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Левая колонка - основная информация */}
            <div className="lg:col-span-2">

              {/* Краткое описание */}
              <div className="bg-gray-50 rounded-lg p-4 mb-8">/
                <h2 className="text-xl font-semibold text-gray-900 mb-4">О туре</h2>
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: excursion.description }} />
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Программа тура</h2>
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
              <div className="grid md:grid-cols-2 gap-4 mb-8">
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
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
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
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                      </div>
                      <div className="text-sm text-gray-500">за взрослого</div>
                    </div>

                    {/* Кнопка бронирования */}
                    <Button
                      size="lg"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                      onClick={() => setShowBookingModal(true)}
                    >
                      Забронировать тур
                    </Button>

                    {/* Telegram кнопка */}
                    <Button
                      variant="outline"
                      asChild
                      className="w-full py-3 border-gray-300 mt-3"
                    >
                      <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                        📱 Связаться в Telegram
                      </a>
                    </Button>

                    {/* Дополнительная информация */}
                    <div className="mt-6 space-y-2 text-sm text-gray-600">
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
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

      {/* Кнопка бронирования внизу для мобильных - как в эталоне */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-lg font-bold text-green-600">
              от {excursion.priceAdult} {excursion.currency}
            </div>
            <div className="text-xs text-gray-600">взрослый / {excursion.priceChild} {excursion.currency} детский</div>
          </div>
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Забронировать
          </Button>
        </div>
      </div>

      {/* Mobile-first Gallery Modal */}
      {selectedImage && showFullGallery && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Mobile-optimized Header */}
          <div className="flex items-center justify-between p-3 bg-black bg-opacity-90 safe-area-top">
            <div className="flex items-center space-x-3">
              <span className="text-white text-sm font-medium">
                {currentImageIndex + 1} из {excursion.gallery.length}
              </span>
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="text-white hover:text-gray-300 p-1.5 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors sm:hidden"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-300 p-1.5 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Mobile-optimized Image Area */}
          <div 
            className="flex-1 flex items-center justify-center relative px-2 py-4 gallery-modal"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image - Mobile optimized */}
            <img
              src={selectedImage}
              alt={`Галерея ${currentImageIndex + 1}`}
              className="max-w-full gallery-image object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            />

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile Navigation Dots - только первые несколько для компактности */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:hidden">
              {excursion.gallery.slice(0, Math.min(8, excursion.gallery.length)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Strip - Desktop/Tablet */}
          {showThumbnails && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 p-4 hidden sm:block">
              <div className="flex space-x-2 justify-center overflow-x-auto max-w-full">
                {excursion.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
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

      {/* Мобильная панель бронирования - показываем только в браузерном режиме */}
      {!isWebApp && (
        <MobileBookingBar
          priceAdult={excursion.priceAdult}
          priceChild={excursion.priceChild}
          currency={excursion.currency}
          onBookingClick={() => {
            hapticFeedback('light');
            setShowBookingModal(true);
          }}
        />
      )}

      {/* Footer показываем только в браузере */}
      {!isWebApp && <Footer />}
    </div>
  );
};

export default RassvetnoePrikljuchenie;