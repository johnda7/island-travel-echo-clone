import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { dostoprimechatelnostiPhuketaTourData } from "@/data/dostoprimechatelnostiPhuketaTour";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { MobileBookingBar } from "@/components/MobileBookingBar";

// ИСПОЛЬЗУЕМ ЕДИНЫЙ ИСТОЧНИК ДАННЫХ
const excursion = dostoprimechatelnostiPhuketaTourData;

const DostoprimechatelnostiPhuketa = () => {
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

  // Handle mobile gallery scroll
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
                <Link to="/tours?category=cultural" className="hover:text-green-600 transition-colors">Культурные экскурсии</Link>
                <span>›</span>
                <span className="text-gray-700">Достопримечательности Пхукета</span>
              </div>
            </nav>
          </div>
        </section>

      {/* Gallery section */}
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
                            Культурный
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
        
        {/* Десктопная версия */}
        <div className="container mx-auto px-4 hidden md:block">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Галерея - левая часть на десктопе */}
            <div className="lg:col-span-2">
              {/* Десктопная галерея как на tisland.travel */}
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-2 h-96">
                {/* Большое главное фото с бейджами как на tisland.travel */}
                <div 
                  className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[0], 0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt="Big Buddha"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Бейджи как у конкурентов - в левом верхнем углу */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md">
                      ХИТ
                    </span>
                    <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-md">
                      Культурный тур
                    </span>
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-md">
                      Семейный
                    </span>
                  </div>

                  {/* Рейтинг в правом верхнем углу */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{excursion.rating}</span>
                    <span className="text-xs text-gray-600">({excursion.reviewsCount})</span>
                  </div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Показать все {excursion.gallery.length} фото
                </button>
              </div>
            </div>

            {/* Desktop Booking Sidebar - справа от фото */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                <Card className="shadow-lg border-0">
                  <CardContent className="p-4">
                    {/* Информация о туре */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{excursion.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{excursion.subtitle}</p>
                      
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
                        <Button 
                          onClick={() => setShowBookingModal(true)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                        >
                          Забронировать тур
                        </Button>
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

      {/* Tags section - компактно под фото как на tisland.travel */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Большой Будда
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Ват Чалонг
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Старый город
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Мыс Промтеп
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Обзорная экскурсия
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Без шопинга
            </span>
          </div>
        </div>
      </section>

      {/* Title and meta info - после тегов */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">
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
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users className="w-4 h-4" />
              <span>{excursion.groupSize}</span>
            </div>
          </div>
          {/* Mobile price */}
          <div className="text-2xl font-bold text-green-600 mb-4 md:hidden">
            от {excursion.priceAdult} {excursion.currency} <span className="text-base font-normal text-gray-500">за взрослого</span>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Структурированное описание как у tisland.travel */}
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Описание</h2>
              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {excursion.description}
                </p>
              </div>

              {/* Программа по времени как у конкурентов */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Программа:</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  {excursion.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4 border-l-4 border-green-600 pl-4">
                      <div className="flex-shrink-0 w-16">
                        <span className="text-sm font-bold text-green-600">{item.time}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ключевые особенности */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Особенности тура</h3>
                <ul className="space-y-2 text-gray-700">
                  {excursion.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Включено / Не включено / Важно знать — как у конкурентов */}
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-green-600">В цену включено</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-red-600">Дополнительные расходы</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Секция "Взять с собой" как у конкурентов tisland.travel */}
                {excursion.whatToBring && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-600">Взять с собой</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.whatToBring.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Секция "Важно знать" */}
                <div>
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
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    index === currentImageIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-40'
                  }`}
                />
              ))}
              {excursion.gallery.length > 8 && (
                <span className="text-white text-xs opacity-60 ml-2">
                  +{excursion.gallery.length - 8}
                </span>
              )}
            </div>

            {/* Touch hint for mobile - показывается только первые несколько секунд */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-50 sm:hidden animate-pulse">
              ← Свайп для навигации →
            </div>
          </div>

          {/* Thumbnails */}
          {showThumbnails && (
            <div className="bg-black bg-opacity-90 p-4 max-h-32 overflow-hidden">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {excursion.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Миниатюра ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Navigation Bottom Bar */}
          <div className="flex justify-between items-center p-3 bg-black bg-opacity-90 sm:hidden safe-area-bottom">
            <button
              onClick={prevImage}
              className="flex-1 flex items-center justify-center p-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm">Назад</span>
            </button>
            
            <div className="flex-1 text-center">
              <span className="text-white text-sm font-medium">
                {currentImageIndex + 1} из {excursion.gallery.length}
              </span>
            </div>
            
            <button
              onClick={nextImage}
              className="flex-1 flex items-center justify-center p-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <span className="text-sm">Далее</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
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

export default DostoprimechatelnostiPhuketa;