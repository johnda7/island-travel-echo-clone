// 🚨 ВАЖНО: Этот файл создан по эталону PhiPhi2Days1Night.tsx
// Структура ТОЧНО копирует защищенный эталон. Канонический путь:
// /excursion/dostoprimechatelnosti-phuketa
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { dostoprimechatelnostiPhuketaTourData } from "@/data/dostoprimechatelnostiPhuketaTour";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";

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

  // Gallery functions - EXACT COPY from PhiPhi
  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % excursion.gallery.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(excursion.gallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? excursion.gallery.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(excursion.gallery[prevIndex]);
  };

  const openGallery = () => {
    setSelectedImage(excursion.gallery[0]);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero section */}
      <section className="relative h-64 lg:h-96 overflow-hidden">
        <img
          src={excursion.mainImage}
          alt={excursion.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">{excursion.title}</h1>
            <p className="text-lg lg:text-xl">{excursion.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Описание тура</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {excursion.description}
                  </p>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Что входит в программу</h2>
                  <ul className="space-y-2">
                    {excursion.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Gallery */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Фотогалерея</h2>
                    <Button
                      variant="outline"
                      onClick={openGallery}
                      className="flex items-center gap-2"
                    >
                      <Grid3X3 className="w-4 h-4" />
                      Все фото
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {excursion.gallery.slice(0, 8).map((image, index) => (
                      <div 
                        key={index}
                        className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => openModal(image, index)}
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Included / Not included */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-600">Включено в стоимость</h3>
                    <ul className="space-y-2">
                      {excursion.included && excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-red-600">Не включено в стоимость</h3>
                    <ul className="space-y-2">
                      {excursion.excluded && excursion.excluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">✕</span>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* What to bring */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Что взять с собой</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {excursion.requirements && excursion.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Important info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Важная информация</h3>
                  <ul className="space-y-2">
                    {excursion.importantInfo && excursion.importantInfo.map((info, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">⚠</span>
                        <span className="text-gray-700 text-sm">{info}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Price */}
                    <div className="text-center border-b pb-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        от {excursion.priceAdult.toLocaleString()} {excursion.currency}
                      </div>
                      <div className="text-gray-500 mb-6">за взрослого</div>
                      
                      <div className="space-y-3">
                        <Button 
                          onClick={() => setShowBookingModal(true)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                        >
                          Забронировать за {excursion.priceAdult.toLocaleString()} {excursion.currency}
                        </Button>
                        <Button variant="outline" asChild className="w-full py-3 border-gray-300">
                          <a href="https://t.me/Phuketga" target="_blank" rel="noopener noreferrer">
                            Задать вопрос в Telegram
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Tour details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{excursion.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{excursion.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-700">{excursion.rating} ({excursion.reviewsCount} отзывов)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">Трансфер включен</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile booking bar */}
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
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6"
          >
            Забронировать
          </Button>
        </div>
      </div>

      {/* Модальное окно бронирования */}
      <UniversalBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tourData={excursion}
      />

      {/* Image modal - EXACT COPY from PhiPhi */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {excursion.gallery.length}
            </div>
          </div>
        </div>
      )}

      {/* Gallery grid modal */}
      {showThumbnails && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-xl font-bold">Все фотографии</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeGallery}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {excursion.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => {
                    closeGallery();
                    openModal(image, index);
                  }}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DostoprimechatelnostiPhuketa;