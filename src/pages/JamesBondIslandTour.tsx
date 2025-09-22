import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { jamesBondIslandTourData } from "@/data/jamesBondIslandTour";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";

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

  const closeModal = () => {
    setSelectedImage(null);
    setShowFullGallery(false);
    setCurrentImageIndex(0);
    setShowThumbnails(false);
  };

  const nextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % excursion.gallery.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(excursion.gallery[nextIndex]);
  }, [currentImageIndex, excursion.gallery.length]);

  const prevImage = useCallback(() => {
    const prevIndex = currentImageIndex === 0 ? excursion.gallery.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(excursion.gallery[prevIndex]);
  }, [currentImageIndex, excursion.gallery.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(excursion.gallery[index]);
  };

  const nextMobileImage = () => {
    setMobileGalleryIndex((prev) => (prev + 1) % excursion.gallery.length);
  };

  const prevMobileImage = () => {
    setMobileGalleryIndex((prev) => prev === 0 ? excursion.gallery.length - 1 : prev - 1);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextMobileImage();
    }
    if (isRightSwipe) {
      prevMobileImage();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showFullGallery) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            prevImage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            nextImage();
            break;
          case 'Escape':
            e.preventDefault();
            closeModal();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullGallery, nextImage, prevImage]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={excursion.mainImage} 
          alt={excursion.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{excursion.title}</h1>
            <p className="text-lg md:text-xl opacity-90">{excursion.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{excursion.duration}</p>
                      <p className="text-sm text-gray-600">Длительность</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{excursion.groupSize}</p>
                      <p className="text-sm text-gray-600">Группа</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-semibold">{excursion.rating}</p>
                      <p className="text-sm text-gray-600">{excursion.reviewsCount} отзывов</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Пхукет</p>
                      <p className="text-sm text-gray-600">Старт</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Основные моменты</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {excursion.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Описание тура</h2>
                <div className="prose prose-gray max-w-none">
                  {excursion.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile Gallery */}
            <div className="block md:hidden">
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <div
                      className="relative h-64 overflow-hidden"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      <img
                        src={excursion.gallery[mobileGalleryIndex]}
                        alt={`${excursion.title} - фото ${mobileGalleryIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <button
                        onClick={prevMobileImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextMobileImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <button
                        onClick={openGallery}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <Grid3X3 className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {mobileGalleryIndex + 1} / {excursion.gallery.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Gallery Grid */}
            <div className="hidden md:block">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Фотогалерея</h2>
                    <Button variant="outline" onClick={openGallery}>
                      Смотреть все фото
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {excursion.gallery.slice(0, 8).map((image, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                        onClick={() => openModal(image, index)}
                      >
                        <img
                          src={image}
                          alt={`${excursion.title} - фото ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        {index === 7 && excursion.gallery.length > 8 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              +{excursion.gallery.length - 8}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Program */}
            {excursion.itinerary && excursion.itinerary.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Программа тура</h2>
                  <div className="space-y-6">
                    {excursion.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-gray-700">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {excursion.included && excursion.included.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-700">Включено в стоимость</h3>
                    <ul className="space-y-2">
                      {excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {excursion.excluded && excursion.excluded.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-red-700">Дополнительно оплачивается</h3>
                    <ul className="space-y-2">
                      {excursion.excluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Requirements */}
            {excursion.requirements && excursion.requirements.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Что взять с собой</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {excursion.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Important Info */}
            {excursion.importantInfo && excursion.importantInfo.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-orange-700">Важная информация</h3>
                  <ul className="space-y-2">
                    {excursion.importantInfo.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Booking */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {excursion.priceAdult} {excursion.currency}
                  </div>
                  <p className="text-gray-600">за взрослого</p>
                  {excursion.priceChild && (
                    <p className="text-sm text-gray-500 mt-1">
                      Дети: {excursion.priceChild} {excursion.currency}
                    </p>
                  )}
                </div>

                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={() => setShowBookingModal(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Забронировать тур
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <p>Бесплатная отмена за 24 часа</p>
                  <p>Оплата на месте или онлайн</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Нужна помощь?</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">WhatsApp / Telegram</p>
                    <p className="text-blue-600">+66 XX XXX XXXX</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-blue-600">info@phuket-tours.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Время работы</p>
                    <p className="text-gray-600">9:00 - 21:00 (ежедневно)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Full Gallery Modal */}
      {showFullGallery && (
        <ModalPortal>
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 rounded-full z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 rounded-full z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <div className="max-w-5xl max-h-full">
                <img
                  src={selectedImage || excursion.gallery[currentImageIndex]}
                  alt={`${excursion.title} - фото ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm"
              >
                {currentImageIndex + 1} / {excursion.gallery.length}
              </button>

              {showThumbnails && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/70 p-4 rounded-lg">
                  <div className="flex gap-2 max-w-sm overflow-x-auto">
                    {excursion.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-white' : 'border-transparent'
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
        </ModalPortal>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <ModalPortal>
          <UniversalBookingModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            tourData={excursion}
          />
        </ModalPortal>
      )}

      <Footer />
    </div>
  );
};

export default JamesBondIslandTour;