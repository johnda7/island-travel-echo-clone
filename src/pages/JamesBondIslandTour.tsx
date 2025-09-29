import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { jamesBondIslandTourData } from '@/data/jamesBondIslandTour';
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { MobileBookingBar } from "@/components/MobileBookingBar";

// ИСПОЛЬЗУЕМ ЕДИНЫЙ ИСТОЧНИК ДАННЫХ
const excursion = jamesBondIslandTourData;

const JamesBondIslandTour = () => {
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
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const prevIndex = prev === 0 ? excursion.gallery.length - 1 : prev - 1;
      setSelectedImage(excursion.gallery[prevIndex]);
      return prevIndex;
    });
  }, []);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(excursion.gallery[index]);
    setShowThumbnails(false);
  };

  // Touch handlers for swipe
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

  // SEO meta tags
  useEffect(() => {
    document.title = "Остров Джеймса Бонда - экскурсия из Пхукета | Island Travel";
    
    // Remove existing meta tags
    const existingDescription = document.querySelector('meta[name="description"]');
    if (existingDescription) {
      existingDescription.remove();
    }
    
    // Add new meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Экскурсия на остров Джеймса Бонда из Пхукета. Залив Пханг Нга, каноэ в пещерах, плавучая деревня. Бронируйте онлайн!';
    document.head.appendChild(metaDescription);
    
    return () => {
      document.title = 'Island Travel - Экскурсии по островам Пхукета';
      if (metaDescription.parentNode) {
        metaDescription.parentNode.removeChild(metaDescription);
      }
    };
  }, []);

  // Mobile gallery scroll handler
  const handleMobileGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setMobileGalleryIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden pb-20 lg:pb-0">
      <Header />
      
      {/* Breadcrumbs */}
      <section className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-green-600 transition-colors">Главная</Link>
              <span>›</span>
              <Link to="/tours" className="hover:text-green-600 transition-colors">Туры</Link>
              <span>›</span>
              <Link to="/tours?category=islands" className="hover:text-green-600 transition-colors">Морские экскурсии</Link>
              <span>›</span>
              <span className="text-gray-700">Остров Джеймса Бонда</span>
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
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              onScroll={handleMobileGalleryScroll}
              style={{ scrollBehavior: 'smooth' }}
              id="mobile-gallery"
            >
              {excursion.gallery.slice(0, 6).map((image, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-full snap-center"
                  onClick={() => openModal(image, index)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Бейджи и рейтинг только на первом слайде */}
                    {index === 0 && (
                      <>
                        {/* Бейджи как у конкурентов */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md">
                            ХИТ
                          </span>
                          <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-md">
                            Острова
                          </span>
                        </div>

                        {/* Рейтинг в правом верхнем углу */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-md">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{excursion.rating}</span>
                        </div>
                      </>
                    )}
                    
                    {/* Overlay с количеством фото на последнем слайде */}
                    {index === 5 && excursion.gallery.length > 6 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-2xl font-bold mb-1">+{excursion.gallery.length - 6}</div>
                          <div className="text-sm">фото</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Точки индикации */}
            <div className="flex justify-center mt-4 space-x-2">
              {excursion.gallery.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === mobileGalleryIndex ? 'bg-green-600 scale-110' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setMobileGalleryIndex(index);
                    // Программный скролл к нужному слайду
                    const carousel = document.getElementById('mobile-gallery');
                    if (carousel) {
                      carousel.scrollTo({
                        left: index * carousel.clientWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                />
              ))}
            </div>
            
            {/* Кнопка показать все фото - только для мобильных */}
            <div className="mt-4 px-4">
              <button
                onClick={openGallery}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Показать все {excursion.gallery.length} фото
              </button>
            </div>
          </div>
        </div>

        {/* Десктопная галерея - сетка */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-2 h-[400px]">
              {/* Главное большое изображение */}
              <div className="col-span-2 row-span-2">
                <img
                  src={excursion.mainImage}
                  alt={excursion.title}
                  className="w-full h-full object-cover rounded-l-lg cursor-pointer hover:brightness-110 transition-all"
                  onClick={() => openModal(excursion.mainImage, 0)}
                />
              </div>
              
              {/* 4 маленьких изображения справа */}
              {excursion.gallery.slice(1, 5).map((image, index) => (
                <div key={index + 1} className="relative">
                  <img
                    src={image}
                    alt={`${excursion.title} - фото ${index + 2}`}
                    className={`w-full h-full object-cover cursor-pointer hover:brightness-110 transition-all ${
                      index === 1 ? 'rounded-tr-lg' : ''
                    } ${index === 3 ? 'rounded-br-lg' : ''}`}
                    onClick={() => openModal(image, index + 1)}
                  />
                  {/* Overlay "показать все фото" на последнем изображении */}
                  {index === 3 && excursion.gallery.length > 5 && (
                    <div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-br-lg text-white font-semibold cursor-pointer hover:bg-black/60 transition-colors"
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

      {/* Tags section - компактно под фото как на tisland.travel */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Джеймс Бонд
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Пханг Нга
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Каякинг
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Пещеры
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Плавучая деревня
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Лонгтейл
            </span>
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
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{excursion.rating}</span>
              <span className="text-gray-500 text-sm">({excursion.reviewsCount} отзывов)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{excursion.duration}</span>
            </div>
            {excursion.itinerary && excursion.itinerary.length > 0 && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Начало: {excursion.itinerary[0].time}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users className="w-4 h-4" />
              <span>{excursion.groupSize}</span>
            </div>
          </div>
          
          {/* Mobile price */}
          <div className="text-2xl font-bold text-green-600 mb-4 md:hidden">
            от {excursion.priceAdult} {excursion.currency} <span className="text-base font-normal text-gray-500">за взрослого</span>
          </div>

          {/* Mobile CTA Button - сразу на первом экране */}
          <div className="lg:hidden mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Забронировать тур</h3>
                <div className="text-2xl font-bold text-green-600 mb-4">
                  от {excursion.priceAdult} {excursion.currency}
                </div>
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Забронировать сейчас
                </Button>
                <p className="text-xs text-gray-500 mt-3">Бесплатная отмена за 24 часа</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Описание и highlights одним блоком */}
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Описание экскурсии</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  {excursion.description}
                </p>
                <ul className="mb-8 space-y-2 text-gray-700">
                  {excursion.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

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

              {/* Секция "Взять с собой" */}
              {excursion.requirements && excursion.requirements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">Взять с собой</h3>
                  <ul className="space-y-2 text-gray-700">
                    {excursion.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Секция "Важно знать" */}
              {excursion.importantInfo && excursion.importantInfo.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-amber-600">Важно знать</h3>
                  <ul className="space-y-2 text-gray-700">
                    {excursion.importantInfo.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-amber-600 font-bold">⚠️</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Правая колонка - форма бронирования как в эталоне */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-8">
                <Card className="shadow-lg">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="mb-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{excursion.rating} ({excursion.reviewsCount} отзывов)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{excursion.duration}</span>
                        </div>
                        {excursion.itinerary && excursion.itinerary.length > 0 && (
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>Начало: {excursion.itinerary[0].time}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{excursion.groupSize}</span>
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
                        <Button 
                          onClick={() => setShowBookingModal(true)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                        >
                          Забронировать тур
                        </Button>
                        
                        {/* Telegram кнопка - как в эталоне */}
                        <Button 
                          onClick={() => window.open('https://t.me/Phuketga', '_blank')}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 font-semibold"
                        >
                          <span className="flex flex-col items-center leading-tight">
                            <span>Написать</span>
                            <span>в Телеграм</span>
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile booking bar - фиксированная кнопка внизу как в эталоне */}
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
                {currentImageIndex + 1} / {excursion.gallery.length}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Показать миниатюры"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={closeModal}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Закрыть галерею"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div 
            className="flex-1 flex items-center justify-center relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 p-3 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors lg:block"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative max-w-full max-h-full">
              <img
                src={selectedImage}
                alt={`${excursion.title} - фото ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: 'calc(100vh - 160px)' }}
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 z-10 p-3 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors lg:block"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails Strip - показывается при клике на Grid3X3 */}
          {showThumbnails && (
            <div className="p-4 bg-black/90">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {excursion.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex 
                        ? 'ring-2 ring-white scale-110' 
                        : 'opacity-70 hover:opacity-100'
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

      {/* Модальное окно бронирования — ОБЯЗАТЕЛЬНО через портал */}
      <ModalPortal>
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={excursion}
        />
      </ModalPortal>

      {/* Мобильная панель бронирования */}
      <MobileBookingBar
        priceAdult={excursion.priceAdult}
        priceChild={excursion.priceChild}
        currency={excursion.currency}
        onBookingClick={() => {
          setShowBookingModal(true);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JamesBondIslandTour;