// 🚨🚨🚨 КРИТИЧЕСКАЯ ЗАЩИТА - ЗАПРЕЩЕНО ЛЮБОЕ ИЗМЕНЕНИЕ! 🚨🚨🚨
// 🔒 ЭТОТ ФАЙЛ ЗАЩИЩЕН ОТ ИЗМЕНЕНИЙ AI АГЕНТАМИ
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: менять UniversalBookingModal
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: добавлять локальные калькуляторы
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: изменять формы бронирования
// ❌ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО: трогать showBookingModal состояние
// ✅ ЭТОТ ФАЙЛ - ЭТАЛОН ИСПОЛЬЗОВАНИЯ UniversalBookingModal!
// 🚨 ПРИ ПОПЫТКЕ ИЗМЕНИТЬ - НЕМЕДЛЕННО ОСТАНОВИТЬСЯ И СПРОСИТЬ ПОЛЬЗОВАТЕЛЯ!

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { raftingSpaAtvTourData as excursion } from "@/data/raftingSpaAtvTour";

const RaftingSpaAtvTour = () => {
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs - как в эталоне */}
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
              <span className="text-gray-700">Рафтинг + Слоновье СПА + ATV</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Main Content - Gallery + Booking Section */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          
          {/* Mobile Gallery */}
          <div className="md:hidden mb-6">
            <div className="grid grid-cols-4 gap-2 h-64">
              {/* Главное большое фото */}
              <div 
                className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => openModal(excursion.gallery[0], 0)}
              >
                <img 
                  src={excursion.gallery[0]} 
                  alt={excursion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Миниатюры справа */}
              <div 
                className="cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => openModal(excursion.gallery[1], 1)}
              >
                <img 
                  src={excursion.gallery[1]} 
                  alt="Gallery 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div 
                className="cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => openModal(excursion.gallery[2], 2)}
              >
                <img 
                  src={excursion.gallery[2]} 
                  alt="Gallery 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div 
                className="cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => openModal(excursion.gallery[3], 3)}
              >
                <img 
                  src={excursion.gallery[3]} 
                  alt="Gallery 4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div 
                className="cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={openGallery}
              >
                <img 
                  src={excursion.gallery[4]} 
                  alt="Gallery 5"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-lg font-semibold mb-1">+{excursion.gallery.length - 5}</div>
                    <div className="text-sm">фото</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Show All Photos Button */}
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

          {/* Desktop Layout - Gallery + Booking Sidebar */}
          <div className="hidden md:grid lg:grid-cols-3 gap-8">
            
            {/* Gallery - Left Side */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 gap-2 h-96">
                {/* Главное большое фото */}
                <div 
                  className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[0], 0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt={excursion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Миниатюры справа */}
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[1], 1)}
                >
                  <img 
                    src={excursion.gallery[1]} 
                    alt="Gallery 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[2], 2)}
                >
                  <img 
                    src={excursion.gallery[2]} 
                    alt="Gallery 3"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[3], 3)}
                >
                  <img 
                    src={excursion.gallery[3]} 
                    alt="Gallery 4"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={openGallery}
                >
                  <img 
                    src={excursion.gallery[4]} 
                    alt="Gallery 5"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-semibold mb-1">+{excursion.gallery.length - 5}</div>
                      <div className="text-sm">фото</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show All Photos Button */}
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

              {/* Tags под галереей */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {excursion.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{excursion.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{excursion.subtitle}</p>
                  
                  <div className="space-y-3 mb-6 text-sm">
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
                  
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-green-600">
                      от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                    </div>
                    <div className="text-sm text-gray-500">за взрослого</div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                  >
                    Забронировать тур
                  </Button>
                  
                  {/* Telegram кнопка - как в эталоне */}
                  <Button
                    variant="outline"
                    asChild
                    className="w-full py-3 border-gray-300 mt-3"
                  >
                    <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                      📱 Связаться в Telegram
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Tags - под галереей на мобильных */}
          <div className="md:hidden mt-6">
            <div className="flex flex-wrap gap-2">
              {excursion.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Booking Card */}
          <div className="md:hidden mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{excursion.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{excursion.subtitle}</p>
            
            <div className="space-y-3 mb-6 text-sm">
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
            
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-green-600">
                от {excursion.priceAdult.toLocaleString()} {excursion.currency}
              </div>
              <div className="text-sm text-gray-500">за взрослого</div>
            </div>
            
            <Button 
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
            >
              Забронировать тур
            </Button>
            
            {/* Telegram кнопка для мобильной карточки */}
            <Button
              variant="outline"
              asChild
              className="w-full py-3 border-gray-300 mt-3"
            >
              <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                📱 Связаться в Telegram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Title and Description */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            {excursion.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {excursion.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="font-semibold">{excursion.rating}</span>
              <span className="text-gray-500 ml-1">({excursion.reviewsCount} отзывов)</span>
            </div>
            <div className="text-gray-500">•</div>
            <div className="text-gray-600">{excursion.duration}</div>
            <div className="text-gray-500">•</div>
            <div className="text-gray-600">{excursion.groupSize}</div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {excursion.description}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Основные моменты</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {excursion.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Программа тура</h2>
          <div className="max-w-4xl mx-auto">
            {excursion.itinerary.map((item, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 text-right mr-6">
                  <div className="text-sm font-semibold text-green-600">{item.time}</div>
                </div>
                <div className="flex-shrink-0 w-px bg-gray-300 mr-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included/Excluded */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Included */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-green-600">Включено в стоимость</h3>
              <ul className="space-y-3">
                {excursion.included.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-red-600">Не включено в стоимость</h3>
              <ul className="space-y-3">
                {excursion.excluded.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Что взять с собой</h2>
          <div className="max-w-2xl mx-auto">
            <ul className="grid md:grid-cols-2 gap-4">
              {excursion.requirements.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="py-12 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Важная информация</h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4">
              {excursion.importantInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы к приключению?</h2>
          <p className="text-xl text-gray-600 mb-8">Забронируйте этот незабываемый тур уже сегодня!</p>
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
          >
            Забронировать тур
          </Button>
        </div>
      </section>

      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center"
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}>
            
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 rounded-lg px-3 py-2 text-white text-sm">
              {currentImageIndex + 1} / {excursion.gallery.length}
            </div>

            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedImage || excursion.gallery[0]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Thumbnails bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="bg-black bg-opacity-50 rounded-lg px-4 py-2 text-white text-sm hover:bg-opacity-75 transition-all flex items-center gap-2"
              >
                <Grid3X3 className="w-4 h-4" />
                {showThumbnails ? 'Скрыть' : 'Показать'} миниатюры
              </button>
            </div>

            {/* Thumbnails */}
            {showThumbnails && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 rounded-lg p-4">
                <div className="flex gap-2 max-w-screen-lg overflow-x-auto">
                  {excursion.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-white' 
                          : 'border-transparent hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* Mobile booking bar - фиксированная кнопка внизу */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-lg font-bold text-green-600">
              от {excursion.priceAdult.toLocaleString()} {excursion.currency}
            </div>
            <div className="text-xs text-gray-600">взрослый / {excursion.priceChild.toLocaleString()} {excursion.currency} детский</div>
          </div>
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Забронировать
          </Button>
        </div>
      </div>

      {/* Add bottom padding to prevent content hiding behind fixed button */}
      <div className="h-20 md:hidden" />

      {/* Модальное окно бронирования — ОБЯЗАТЕЛЬНО через портал */}
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

export default RaftingSpaAtvTour;