// ✅ ТУР "АВАТАР ПЛЮС" - ВОССТАНОВЛЕННАЯ СТРАНИЦА
// 📸 Создано на основе эталонного шаблона PearlsAndamanSea.tsx
// 🌿 Использует UniversalBookingModal для бронирования
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { avatarPlusTourData } from "@/data/avatarPlusTour";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";

// ИСПОЛЬЗУЕМ ЕДИНЫЙ ИСТОЧНИК ДАННЫХ
const excursion = avatarPlusTourData;

const AvatarPlusHangdongAdventure = () => {
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
    setMobileGalleryIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = useCallback(() => {
    if (excursion?.gallery) {
      const nextIndex = (currentImageIndex + 1) % excursion.gallery.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(excursion.gallery[nextIndex]);
      setMobileGalleryIndex(nextIndex);
    }
  }, [currentImageIndex, excursion?.gallery]);

  const prevImage = useCallback(() => {
    if (excursion?.gallery) {
      const prevIndex = currentImageIndex === 0 ? excursion.gallery.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(excursion.gallery[prevIndex]);
      setMobileGalleryIndex(prevIndex);
    }
  }, [currentImageIndex, excursion?.gallery]);

  const minSwipeDistance = 50;

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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage, nextImage, prevImage]);

  if (!excursion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6 flex items-center space-x-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/tours" className="hover:text-blue-600 transition-colors">Туры</Link>
            <span>/</span>
            <span className="text-gray-900">{excursion.title}</span>
          </nav>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="relative mb-4 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={excursion.mainImage} 
                  alt={excursion.title}
                  className="w-full h-80 lg:h-96 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openModal(excursion.mainImage, 0)}
                />
                {/* Mobile Gallery Navigation */}
                <div className="lg:hidden">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-lg p-2 flex items-center justify-between text-white text-sm">
                      <button 
                        onClick={prevImage}
                        className="p-1 hover:bg-white/20 rounded"
                        disabled={!excursion.gallery || excursion.gallery.length <= 1}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span>{mobileGalleryIndex + 1} / {excursion.gallery?.length || 1}</span>
                      <button 
                        onClick={nextImage}
                        className="p-1 hover:bg-white/20 rounded"
                        disabled={!excursion.gallery || excursion.gallery.length <= 1}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery for Desktop */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {excursion.gallery?.slice(1, 5).map((image, index) => (
                    <img 
                      key={index + 1} 
                      src={image} 
                      alt={`${excursion.title} ${index + 2}`}
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openModal(image, index + 1)}
                    />
                  ))}
                </div>
                
                {excursion.gallery && excursion.gallery.length > 5 && (
                  <button 
                    onClick={() => setShowFullGallery(true)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Grid3X3 className="w-4 h-4" />
                    <span>Показать все фото ({excursion.gallery.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Tour Info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{excursion.rating}</span>
                    </div>
                    <span className="text-gray-600">({excursion.reviewsCount} отзывов)</span>
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                    {excursion.title}
                  </h1>
                  
                  <p className="text-gray-600 mb-6 font-medium">{excursion.subtitle}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Группа {excursion.groupSize}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Пхукет, Таиланд</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Цена от</p>
                      <p className="text-3xl font-bold text-green-600">{excursion.priceAdult} {excursion.currency}</p>
                      <p className="text-sm text-gray-600">за взрослого</p>
                      <p className="text-sm text-gray-600 mt-2">Дети: {excursion.priceChild} {excursion.currency}</p>
                      <p className="text-sm text-gray-600">Младенцы: бесплатно</p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Забронировать тур
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Описание тура</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{excursion.description}</p>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Основные моменты</h3>
              <ul className="space-y-2 text-gray-700">
                {excursion.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Что включено</h3>
                <ul className="space-y-2 text-gray-700">
                  {excursion.included?.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Что не включено</h3>
                <ul className="space-y-2 text-gray-700">
                  {excursion.excluded?.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Itinerary Section */}
          {excursion.itinerary && excursion.itinerary.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Программа тура</h2>
              <div className="space-y-4">
                {excursion.itinerary.map((item, index) => (
                  <Card key={index} className={`shadow-md ${item.isHighlight ? 'border-l-4 border-l-blue-500 bg-blue-50' : 'bg-white'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                        <span className="text-blue-600 font-medium">{item.time}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      {item.activities && item.activities.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {item.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Important Info Section */}
          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Требования</h3>
              <ul className="space-y-2 text-gray-700">
                {excursion.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Важная информация</h3>
              <ul className="space-y-2 text-gray-700">
                {excursion.importantInfo?.map((info, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">!</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              disabled={!excursion.gallery || excursion.gallery.length <= 1}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              disabled={!excursion.gallery || excursion.gallery.length <= 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={selectedImage}
              alt="Tour gallery"
              className="max-w-full max-h-full object-contain"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
              {currentImageIndex + 1} / {excursion.gallery?.length || 1}
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default AvatarPlusHangdongAdventure;