import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { TourRouteMap } from "@/components/TourRouteMap";
import type { TourData, RoutePoint } from "@/types/Tour";

interface TourPageTemplateProps {
  tourData: TourData;
  routePoints?: RoutePoint[];
  breadcrumbCategory?: string;
  breadcrumbCategoryLink?: string;
}

export const TourPageTemplate = ({ 
  tourData, 
  routePoints,
  breadcrumbCategory = "Туры",
  breadcrumbCategoryLink = "/tours"
}: TourPageTemplateProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState<number>(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowFullGallery(true);
  };

  const openGallery = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowFullGallery(true);
    setSelectedImage(tourData.gallery[0]);
    setCurrentImageIndex(0);
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setShowFullGallery(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % tourData.gallery.length;
      setSelectedImage(tourData.gallery[nextIndex]);
      return nextIndex;
    });
  }, [tourData.gallery]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const prevIndex = prev === 0 ? tourData.gallery.length - 1 : prev - 1;
      setSelectedImage(tourData.gallery[prevIndex]);
      return prevIndex;
    });
  }, [tourData.gallery]);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(tourData.gallery[index]);
  };

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

  // Wheel/Trackpad Support
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!selectedImage) return;
    e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30) nextImage();
      if (e.deltaX < -30) prevImage();
    } else {
      if (e.deltaY > 30) nextImage();
      if (e.deltaY < -30) prevImage();
    }
  }, [selectedImage, nextImage, prevImage]);

  useEffect(() => {
    if (!selectedImage) return;
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [selectedImage, handleWheel]);

  // Keyboard navigation
  useEffect(() => {
    if (!showFullGallery) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFullGallery, prevImage, nextImage, closeModal]);

  return (
    <div className="min-h-screen" style={{ background: 'rgb(242, 242, 247)' }}>
      <Header />
      
      {/* Breadcrumbs - iOS 26 compact */}
      <section className="pt-16 md:pt-20 pb-2 px-4 md:px-0">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-1.5 text-[13px] text-gray-500">
            <Link to="/" className="hover:text-[#007AFF] transition-colors">
              Главная
            </Link>
            <span className="text-gray-400">›</span>
            <Link to="/tours" className="hover:text-[#007AFF] transition-colors">
              {breadcrumbCategory}
            </Link>
            <span className="text-gray-400">›</span>
            <Link to={breadcrumbCategoryLink} className="hover:text-[#007AFF] transition-colors">
              Приключения
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium line-clamp-1">{tourData.title}</span>
          </nav>
        </div>
      </section>

      {/* Gallery section - iOS 26 Mobile */}
      <section className="pb-0">
        <div className="md:hidden">
          <div 
            className="relative aspect-[16/10] overflow-hidden mx-4 select-none" 
            style={{
              borderRadius: '20px',
              boxShadow: '0 2px 16px rgba(0, 0, 0, 0.12)'
            }}
            onTouchStart={(e) => {
              setTouchEnd(null);
              setTouchStart(e.targetTouches[0].clientX);
            }}
            onTouchMove={(e) => {
              setTouchEnd(e.targetTouches[0].clientX);
            }}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              const distance = touchStart - touchEnd;
              const isLeftSwipe = distance > 50;
              const isRightSwipe = distance < -50;
              if (isLeftSwipe) {
                const newIndex = (mobileGalleryIndex + 1) % tourData.gallery.length;
                setMobileGalleryIndex(newIndex);
              }
              if (isRightSwipe) {
                const newIndex = mobileGalleryIndex === 0 ? tourData.gallery.length - 1 : mobileGalleryIndex - 1;
                setMobileGalleryIndex(newIndex);
              }
            }}
          >
            <img 
              src={tourData.gallery[mobileGalleryIndex]} 
              alt={tourData.title}
              className="w-full h-full object-cover object-center" 
              draggable="false"
              style={{ userSelect: 'none' }}
            />

            {/* Badges - iOS 26 compact mobile */}
            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 text-white text-[10px] font-bold tracking-wider rounded-md backdrop-blur-xl" style={{
                background: 'rgba(255, 59, 48, 0.92)',
                textShadow: '0 1px 2px rgba(0,0,0,0.25)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
              }}>
                ХИТ
              </span>
              <span className="px-2 py-0.5 text-white text-[10px] font-bold tracking-wider rounded-md backdrop-blur-xl" style={{
                background: 'rgba(52, 199, 89, 0.92)',
                textShadow: '0 1px 2px rgba(0,0,0,0.25)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
              }}>
                ПРИРОДА
              </span>
            </div>

            {/* Rating - iOS 26 compact */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 backdrop-blur-xl px-1.5 py-0.5 rounded-md" style={{
              background: 'rgba(255, 255, 255, 0.92)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
            }}>
              <Star className="w-3 h-3 fill-[#FFCC00] text-[#FFCC00]" />
              <span className="text-[11px] font-bold text-gray-900" style={{ letterSpacing: '-0.02em' }}>{tourData.rating}</span>
            </div>
          </div>

          {/* Page indicators - iOS 26 style */}
          <div className="flex justify-center mt-3 gap-1.5 px-4">
            {tourData.gallery.map((_, index) => (
              <button 
                key={index} 
                className={`h-1.5 rounded-full transition-all duration-300 ease-out active:scale-90 ${
                  index === mobileGalleryIndex 
                    ? 'w-6 bg-gray-900 shadow-sm' 
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`} 
                onClick={() => setMobileGalleryIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Show all button */}
          <div className="mt-3 px-4 pb-4">
            <button 
              onClick={openGallery} 
              onTouchEnd={(e) => {
                e.preventDefault();
                openGallery(e);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-[15px] font-semibold rounded-2xl transition-all duration-150 active:scale-95" 
              style={{
              color: '#007AFF',
              background: 'rgba(0, 122, 255, 0.12)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 4px 16px rgba(0, 122, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(0, 122, 255, 0.2)'
            }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Посмотреть все {tourData.gallery.length} фото
            </button>
          </div>
        </div>

        {/* Desktop Gallery остаётся как было */}
        <div className="container mx-auto px-4 hidden md:block">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 gap-3 h-[480px]">
                <div className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-[28px]" onClick={() => openModal(tourData.gallery[0], 0)} style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}>
                  <img src={tourData.gallery[0]} alt="Main" className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
                  
                  {/* Desktop badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 text-white text-[11px] font-bold tracking-wider rounded-lg" style={{
                      background: 'rgba(255, 59, 48, 0.92)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.25)'
                    }}>
                      ХИТ
                    </span>
                    <span className="px-2.5 py-1 text-white text-[11px] font-bold tracking-wider rounded-lg" style={{
                      background: 'rgba(52, 199, 89, 0.92)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.25)'
                    }}>
                      ПРИРОДА
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 backdrop-blur-xl px-2 py-1 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)'
                  }}>
                    <Star className="w-3.5 h-3.5 fill-[#FFCC00] text-[#FFCC00]" />
                    <span className="text-xs font-bold text-gray-900">{tourData.rating}</span>
                  </div>
                </div>

                {tourData.gallery.slice(1, 5).map((image, index) => (
                  <div key={index + 1} className="cursor-pointer group relative overflow-hidden rounded-2xl transition-all duration-300" onClick={() => index === 3 ? openGallery() : openModal(image, index + 1)}>
                    <img src={image} alt={`Gallery ${index + 2}`} className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
                    {index === 3 && tourData.gallery.length > 5 && (
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-300" style={{
                        background: 'rgba(0, 0, 0, 0.4)'
                      }}>
                        <div className="text-white text-center">
                          <div className="text-xl font-semibold">+{tourData.gallery.length - 5}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <button onClick={openGallery} className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-gray-900 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Все {tourData.gallery.length} фото
                </button>
              </div>
            </div>

            {/* Desktop Booking Card */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                <Card className="shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{tourData.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{tourData.subtitle}</p>
                      
                      <div className="space-y-2 mb-4 text-sm text-left">
                        <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-gray-400" /><span>Продолжительность: {tourData.duration}</span></div>
                        <div className="flex items-center gap-3"><Users className="w-4 h-4 text-gray-400" /><span>Группа: {tourData.groupSize}</span></div>
                        <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-gray-400" /><span>Ежедневно</span></div>
                        <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gray-400" /><span>Трансфер включен</span></div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold" style={{ color: '#007AFF' }}>от {tourData.priceAdult.toLocaleString()} {tourData.currency}</div>
                        <div className="text-sm text-gray-500">за взрослого</div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          onClick={() => setShowBookingModal(true)} 
                          className="btn-booking w-full"
                        >
                          Забронировать тур
                        </Button>
                        <Button 
                          onClick={() => window.open('https://t.me/Phuketga', '_blank')} 
                          className="btn-telegram w-full"
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

      {/* Title and meta - iOS 26 App Store style */}
      <section className="py-2 pt-4 md:pt-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-[28px] md:text-4xl font-bold mb-1.5 text-gray-900 leading-[1.1] tracking-tight" style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            letterSpacing: '-0.02em'
          }}>
            {tourData.title}
          </h1>
          
          <div className="flex items-start gap-1.5 mb-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
            <p className="text-[15px] text-gray-600 leading-snug">{tourData.subtitle}</p>
          </div>
          
          {/* Meta info - iOS 26 horizontal scroll tags */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            <div className="flex gap-2 min-w-max">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap" style={{ 
                background: 'rgba(255, 204, 0, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 2px 8px rgba(255, 204, 0, 0.15)',
                border: '0.5px solid rgba(255, 204, 0, 0.25)'
              }}>
                <Star className="w-3.5 h-3.5 text-[#FFCC00] fill-[#FFCC00]" strokeWidth={2} />
                <span className="font-semibold text-[13px] text-gray-900">{tourData.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap" style={{ 
                background: 'rgba(142, 142, 147, 0.12)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '0.5px solid rgba(255, 255, 255, 0.18)'
              }}>
                <Clock className="w-3.5 h-3.5 text-gray-700" strokeWidth={2} />
                <span className="text-[13px] font-medium text-gray-900">{tourData.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap" style={{ 
                background: 'rgba(142, 142, 147, 0.12)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '0.5px solid rgba(255, 255, 255, 0.18)'
              }}>
                <Users className="w-3.5 h-3.5 text-gray-700" strokeWidth={2} />
                <span className="text-[13px] font-medium text-gray-900">{tourData.groupSize}</span>
              </div>
            </div>
          </div>

          {/* Price Mobile - iOS style CTA */}
          <div className="flex items-center justify-between p-4 rounded-2xl mb-3 md:hidden" style={{ 
            background: 'rgba(0, 122, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 122, 255, 0.4)'
          }}>
            <div>
              <div className="text-white text-opacity-90 text-xs font-medium mb-0.5">От</div>
              <div className="text-white text-[24px] font-bold tracking-tight">{tourData.priceAdult.toLocaleString()} ฿</div>
            </div>
            <button 
              onClick={() => setShowBookingModal(true)} 
              className="btn-booking"
            >
              Забронировать
            </button>
          </div>
        </div>
      </section>

      {/* Rest of content from tourData - description, highlights, itinerary, etc */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Описание тура */}
          {tourData.description && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Описание</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {tourData.description}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Highlights */}
          {tourData.highlights && tourData.highlights.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Что входит в тур</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tourData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Расписание */}
          {tourData.schedule && tourData.schedule.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Программа тура</h2>
                <div className="space-y-4">
                  {tourData.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4 border-l-2 border-blue-500 pl-4">
                      <div className="flex-shrink-0">
                        <div className="text-sm font-semibold text-blue-600">{item.time}</div>
                        {item.day && <div className="text-xs text-gray-500">{item.day}</div>}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Что включено / не включено */}
          {(tourData.included || tourData.notIncluded) && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Включено в стоимость</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {tourData.included && tourData.included.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-green-600 mb-3">Включено</h3>
                      <ul className="space-y-2">
                        {tourData.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tourData.notIncluded && tourData.notIncluded.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-red-600 mb-3">Не включено</h3>
                      <ul className="space-y-2">
                        {tourData.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Что взять с собой */}
          {tourData.whatToBring && tourData.whatToBring.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Что взять с собой</h2>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tourData.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Важная информация */}
          {tourData.importantInfo && tourData.importantInfo.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Важная информация</h2>
                <ul className="space-y-2">
                  {tourData.importantInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">⚠</span>
                      <span className="text-gray-700">{info}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Route Map если есть координаты */}
      {routePoints && routePoints.length > 0 && (
        <TourRouteMap 
          tourTitle={tourData.title}
          routePoints={routePoints}
        />
      )}

      <MobileBookingBar 
        priceAdult={tourData.priceAdult} 
        priceChild={tourData.priceChild} 
        currency={tourData.currency} 
        onBookingClick={() => setShowBookingModal(true)} 
      />

      {/* iOS 26 Gradient Divider before Footer */}
      <div className="relative h-16" style={{ 
        background: 'linear-gradient(180deg, rgba(242, 242, 247, 0) 0%, rgba(242, 242, 247, 0.3) 30%, rgba(242, 242, 247, 0.6) 60%, rgba(242, 242, 247, 1) 100%)'
      }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 122, 255, 0.15) 20%, rgba(0, 122, 255, 0.3) 50%, rgba(0, 122, 255, 0.15) 80%, transparent 100%)'
        }} />
      </div>

      <Footer />

      {/* Full Screen Gallery Modal - iOS 26 */}
      {showFullGallery && selectedImage && (
        <ModalPortal>
          <div 
            className="fixed inset-0 z-50 flex flex-col"
            style={{
              background: 'rgba(0, 0, 0, 0.98)',
              backdropFilter: 'blur(40px) saturate(180%)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)'
            }}
            onClick={closeModal}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3" style={{
              background: 'rgba(28, 28, 30, 0.8)',
              backdropFilter: 'blur(20px)',
              borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-medium">{currentImageIndex + 1} из {tourData.gallery.length}</span>
              </div>
              <button onClick={closeModal} className="text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image */}
            <div 
              className="flex-1 flex items-center justify-center relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Gallery" 
                className="max-w-[95%] max-h-[85vh] object-contain"
                draggable="false"
              />
              
              {/* Navigation Arrows - Desktop */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="hidden md:block absolute left-4 p-3 rounded-full backdrop-blur-xl"
                style={{
                  background: 'rgba(28, 28, 30, 0.6)',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="hidden md:block absolute right-4 p-3 rounded-full backdrop-blur-xl"
                style={{
                  background: 'rgba(28, 28, 30, 0.6)',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center items-center gap-1.5 py-4 px-4" style={{
              background: 'rgba(28, 28, 30, 0.5)',
              backdropFilter: 'blur(20px)'
            }}>
              {tourData.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); selectImage(index); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </ModalPortal>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <UniversalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tourData={tourData}
        />
      )}
    </div>
  );
};
