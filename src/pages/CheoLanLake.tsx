import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { cheoLanLakeTourData } from "@/data/tours/cheow-lan-lake";
import { UniversalBookingModal } from "@/components/UniversalBookingModal";
import { ModalPortal } from "@/components/ModalPortal";
import { MobileBookingBar } from "@/components/MobileBookingBar";

const excursion = cheoLanLakeTourData;

const CheoLanLake = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
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

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  }, [selectedImage, nextImage, prevImage, closeModal]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!selectedImage) return;
    e.preventDefault();
    
    // Определяем направление прокрутки
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Горизонтальная прокрутка (свайп на тачпаде влево/вправо)
      if (e.deltaX > 30) nextImage();
      if (e.deltaX < -30) prevImage();
    } else {
      // Вертикальная прокрутка тоже работает
      if (e.deltaY > 30) nextImage();
      if (e.deltaY < -30) prevImage();
    }
  }, [selectedImage, nextImage, prevImage]);

  useEffect(() => {
    if (!selectedImage) return;
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [selectedImage, handleKeyPress, handleWheel]);

  const nextMobileImage = () => {
    const newIndex = (mobileGalleryIndex + 1) % excursion.gallery.length;
    setMobileGalleryIndex(newIndex);
  };

  const prevMobileImage = () => {
    const newIndex = mobileGalleryIndex === 0 ? excursion.gallery.length - 1 : mobileGalleryIndex - 1;
    setMobileGalleryIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] overflow-x-hidden pb-24 lg:pb-0">
      <Header />
      
      {/* iOS Navigation Bar - Mobile only */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 pt-safe" style={{
        background: 'rgba(242, 242, 247, 0.94)',
        backdropFilter: 'blur(20px)',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)'
      }}>
        <div className="flex items-center justify-between px-4 h-11 pt-2">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 text-[#007AFF] active:opacity-50 transition-opacity">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            <span className="text-[17px] font-normal">Назад</span>
          </button>
          <button className="text-[#007AFF] active:opacity-50 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Breadcrumbs - 4 уровня как в эталоне */}
      <section className="pt-20 md:pt-20 pb-4 px-4 md:px-0">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600 transition-colors">
              Главная
            </Link>
            <span>›</span>
            <Link to="/tours" className="hover:text-green-600 transition-colors">
              Туры
            </Link>
            <span>›</span>
            <Link to="/tours?category=adventure" className="hover:text-green-600 transition-colors">
              Приключения
            </Link>
            <span>›</span>
            <span className="text-gray-700 font-medium">{excursion.title}</span>
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
                const newIndex = (mobileGalleryIndex + 1) % excursion.gallery.length;
                setMobileGalleryIndex(newIndex);
              }
              if (isRightSwipe) {
                const newIndex = mobileGalleryIndex === 0 ? excursion.gallery.length - 1 : mobileGalleryIndex - 1;
                setMobileGalleryIndex(newIndex);
              }
            }}
          >
            <img 
              src={excursion.gallery[mobileGalleryIndex]} 
              alt={`Gallery ${mobileGalleryIndex + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-300"
              draggable="false"
            />
            
            {/* Badges - iOS 26 compact style */}
            <div className="absolute top-2.5 left-2.5 flex gap-1.5">
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
              <span className="text-[11px] font-bold text-gray-900" style={{ letterSpacing: '-0.02em' }}>{excursion.rating}</span>
            </div>

            {/* Nav buttons removed - iOS 26 uses swipe gestures */}
          </div>

          {/* Page indicators - iOS 26 style with smooth animations */}
          <div className="flex justify-center mt-3 gap-1.5 px-4">
            {excursion.gallery.map((_, index) => (
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
          
          {/* Show all button - Telegram/iOS жидкое стекло */}
          <div className="mt-3 px-4 pb-4">
            <button onClick={openGallery} className="w-full flex items-center justify-center gap-2 py-3 text-[15px] font-semibold rounded-2xl transition-all duration-150" style={{
              color: '#007AFF',
              background: 'rgba(0, 122, 255, 0.12)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 4px 16px rgba(0, 122, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(0, 122, 255, 0.2)'
            }} onMouseDown={(e) => {
              e.currentTarget.style.filter = 'brightness(0.85)';
              e.currentTarget.style.transform = 'scale(0.98)';
            }} onMouseUp={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
              e.currentTarget.style.transform = 'scale(1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
              e.currentTarget.style.transform = 'scale(1)';
            }} onTouchStart={(e) => {
              e.currentTarget.style.filter = 'brightness(0.85)';
              e.currentTarget.style.transform = 'scale(0.98)';
            }} onTouchEnd={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Посмотреть все {excursion.gallery.length} фото
            </button>
            
            {/* Photo Tags - Telegram/iOS жидкое стекло */}
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {['озеро', 'чео лан', 'природа', 'смотровая', 'самет нангше', 'джунгли', 'храм', 'банг тонг'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-xs font-medium text-gray-700 rounded-full transition-all duration-150 cursor-pointer select-none" style={{
                  background: 'rgba(142, 142, 147, 0.12)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }} onMouseDown={(e) => {
                  e.currentTarget.style.filter = 'brightness(0.85)';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }} onMouseUp={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }} onTouchStart={(e) => {
                  e.currentTarget.style.filter = 'brightness(0.85)';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }} onTouchEnd={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 hidden md:block">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 gap-3 h-[480px]">
                <div className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-[28px]" onClick={() => openModal(excursion.gallery[0], 0)} style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}>
                  <img src={excursion.gallery[0]} alt="Main" className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
                  
                  {/* Badges - iOS 26 compact desktop */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 text-white text-[11px] font-bold tracking-wider rounded-lg" style={{
                      background: 'rgba(255, 59, 48, 0.92)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: '0 2px 8px rgba(255, 59, 48, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.25)'
                    }}>
                      ХИТ
                    </span>
                    <span className="px-2.5 py-1 text-white text-[11px] font-bold tracking-wider rounded-lg" style={{
                      background: 'rgba(52, 199, 89, 0.92)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: '0 2px 8px rgba(52, 199, 89, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.25)'
                    }}>
                      ПРИРОДА
                    </span>
                  </div>

                  {/* Rating - iOS 26 compact desktop */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 backdrop-blur-xl px-2 py-1 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)'
                  }}>
                    <Star className="w-3.5 h-3.5 fill-[#FFCC00] text-[#FFCC00]" />
                    <span className="text-xs font-bold text-gray-900">{excursion.rating}</span>
                    <span className="text-[10px] font-medium text-gray-500">({excursion.reviewsCount})</span>
                  </div>
                </div>

                {excursion.gallery.slice(1, 5).map((image, index) => (
                  <div key={index + 1} className="cursor-pointer group relative overflow-hidden rounded-2xl transition-all duration-300" onClick={() => index === 3 ? openGallery() : openModal(image, index + 1)} style={{
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                  }}>
                    <img src={image} alt={`Gallery ${index + 2}`} className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
                    {index === 3 && excursion.gallery.length > 5 && (
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-300" style={{
                        background: 'rgba(0, 0, 0, 0.4)'
                      }}>
                        <div className="text-white text-center">
                          <div className="text-xl font-semibold">+{excursion.gallery.length - 5}</div>
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
                  Все {excursion.gallery.length} фото
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-4">
                <Card className="shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{excursion.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{excursion.subtitle}</p>
                      
                      <div className="space-y-2 mb-4 text-sm text-left">
                        <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-gray-400" /><span>Продолжительность: {excursion.duration}</span></div>
                        <div className="flex items-center gap-3"><Users className="w-4 h-4 text-gray-400" /><span>Группа: {excursion.groupSize}</span></div>
                        <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-gray-400" /><span>Ежедневно</span></div>
                        <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gray-400" /><span>Трансфер включен</span></div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold" style={{ color: '#007AFF' }}>от {excursion.priceAdult.toLocaleString()} {excursion.currency}</div>
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

      {/* Title and meta - iOS 26 compact */}
      <section className="py-3 pt-14 md:pt-3">
        <div className="container mx-auto px-4">
          <h1 className="text-[22px] md:text-3xl font-bold mb-1.5 text-gray-900 leading-tight tracking-tight">{excursion.title}</h1>
          <p className="text-sm text-gray-600 mb-3 leading-snug">{excursion.subtitle}</p>
          
          {/* Meta info - iOS 26 Glassmorphism Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ 
              background: 'rgba(255, 204, 0, 0.2)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 4px 16px rgba(255, 204, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 204, 0, 0.3)'
            }}>
              <Star className="w-4 h-4 text-[#FFCC00] fill-[#FFCC00] drop-shadow-sm" />
              <span className="font-semibold text-sm text-gray-900">{excursion.rating}</span>
              <span className="text-xs text-gray-600">({excursion.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ 
              background: 'rgba(142, 142, 147, 0.12)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
              <Clock className="w-4 h-4 text-gray-700" strokeWidth={2} />
              <span className="text-sm font-medium text-gray-900">{excursion.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ 
              background: 'rgba(142, 142, 147, 0.12)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
              <Users className="w-4 h-4 text-gray-700" strokeWidth={2} />
              <span className="text-sm font-medium text-gray-900">{excursion.groupSize}</span>
            </div>
          </div>
          
          {/* Price - iOS style with CTA */}
          <div className="flex items-center justify-between p-4 rounded-2xl mb-3 md:hidden" style={{ 
            background: 'rgba(0, 122, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div>
              <div className="text-white text-opacity-90 text-xs font-medium mb-0.5">От</div>
              <div className="text-white text-[24px] font-bold tracking-tight">{excursion.priceAdult.toLocaleString()} ฿</div>
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

      {/* Content - iOS 26 cards style */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-4">
              
              {/* Description card */}
              <div className="rounded-2xl p-6" style={{ 
                background: 'white', 
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                <h2 className="text-[22px] font-bold mb-4 text-gray-900 tracking-tight flex items-center gap-2.5">
                  <svg className="w-6 h-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Описание
                </h2>
                <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{excursion.description}</p>
              </div>

              {/* Schedule card */}
              {excursion.itinerary && excursion.itinerary.length > 0 && (
                <div className="rounded-2xl p-6" style={{ 
                  background: 'white', 
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.04)'
                }}>
                  <h3 className="text-[22px] font-bold mb-5 text-gray-900 tracking-tight flex items-center gap-2.5">
                    <svg className="w-6 h-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Программа дня
                  </h3>
                  <div className="space-y-3">
                    {excursion.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex-shrink-0 w-14 pt-0.5">
                          <span className="text-[13px] font-semibold text-[#007AFF]">{item.time}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[15px] font-semibold text-gray-900 mb-0.5">{item.activity}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights card */}
              {excursion.highlights && excursion.highlights.length > 0 && (
                <div className="rounded-2xl p-6" style={{ 
                  background: 'white', 
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.04)'
                }}>
                  <h3 className="text-[22px] font-bold mb-5 text-gray-900 tracking-tight flex items-center gap-2.5">
                    <svg className="w-6 h-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Что вас ждёт
                  </h3>
                  <ul className="space-y-2.5">
                    {excursion.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5 rounded-full" style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
                          <svg className="w-3 h-3" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="flex-1 text-[15px] text-gray-800 leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included/Excluded - iOS cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {excursion.included && excursion.included.length > 0 && (
                  <div className="rounded-2xl p-6" style={{ 
                    background: 'white', 
                    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.04)'
                  }}>
                    <h3 className="text-[17px] font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Включено в цену
                    </h3>
                    <ul className="space-y-2">
                      {excursion.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center mt-0.5 rounded-full" style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
                            <svg className="w-2.5 h-2.5" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-[14px] text-gray-800 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {excursion.excluded && excursion.excluded.length > 0 && (
                  <div className="rounded-2xl p-6" style={{ 
                    background: 'white', 
                    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.04)'
                  }}>
                    <h3 className="text-[17px] font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5" style={{ color: '#FF9500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Оплачивается отдельно
                    </h3>
                    <ul className="space-y-2">
                      {excursion.excluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center mt-0.5 rounded-full" style={{ background: 'rgba(255, 149, 0, 0.12)' }}>
                            <svg className="w-2.5 h-2.5" style={{ color: '#FF9500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </span>
                          <span className="text-[14px] text-gray-800 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Requirements */}
              {excursion.requirements && excursion.requirements.length > 0 && (
                <div className="rounded-2xl p-6" style={{ 
                  background: 'white', 
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.04)'
                }}>
                  <h3 className="text-[17px] font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Возьмите с собой
                  </h3>
                  <ul className="space-y-2">
                    {excursion.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="text-gray-400 text-sm mt-0.5">•</span>
                        <span className="text-[14px] text-gray-800 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Important info */}
              {excursion.importantInfo && excursion.importantInfo.length > 0 && (
                <div className="rounded-2xl p-5 md:p-6" style={{ 
                  background: 'rgba(255, 149, 0, 0.08)', 
                  border: '1px solid rgba(255, 149, 0, 0.15)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' 
                }}>
                  <h3 className="text-[17px] font-bold mb-4 flex items-center gap-2" style={{ color: '#FF9500' }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Важная информация
                  </h3>
                  <ul className="space-y-2">
                    {excursion.importantInfo.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center mt-0.5 rounded-full" style={{ background: 'rgba(255, 149, 0, 0.15)' }}>
                          <span style={{ color: '#FF9500', fontSize: '10px', fontWeight: 'bold' }}>!</span>
                        </span>
                        <span className="text-[14px] text-gray-800 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Trust & Guarantee */}
              <div className="rounded-2xl p-6 md:p-7" style={{ 
                background: 'white', 
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                  <h3 className="text-[22px] font-bold mb-5 text-gray-900 tracking-tight flex items-center gap-2.5">
                    <svg className="w-6 h-6" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Гарантии
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
                        <svg className="w-5 h-5" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-semibold text-gray-900">Безопасность</h4>
                        <p className="text-[13px] text-gray-600">Страхование включено</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 122, 255, 0.12)' }}>
                        <svg className="w-5 h-5 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-semibold text-gray-900">Поддержка 24/7</h4>
                        <p className="text-[13px] text-gray-600">На русском языке</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal - iOS 26 Style */}
      {selectedImage && showFullGallery && (
        <div 
          className="fixed inset-0 z-50 flex flex-col animate-in fade-in duration-300"
          style={{
            background: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)'
          }}
        >
          {/* iOS Toolbar - Top */}
          <div 
            className="flex items-center justify-between px-4 py-3 animate-in slide-in-from-top duration-300"
            style={{
              background: 'rgba(28, 28, 30, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-white text-[15px] font-semibold tracking-tight">
                {currentImageIndex + 1} из {excursion.gallery.length}
              </span>
              <button 
                onClick={() => setShowThumbnails(!showThumbnails)} 
                className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all active:scale-90 md:hidden"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={closeModal} 
              className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all active:scale-90"
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>

          {/* Image Container with Swipe */}
          <div 
            className="flex-1 flex items-center justify-center relative overflow-hidden"
            onTouchStart={handleTouchStart} 
            onTouchMove={handleTouchMove} 
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Navigation Buttons */}
            <button 
              onClick={prevImage} 
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full text-white transition-all active:scale-90"
              style={{
                background: 'rgba(28, 28, 30, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
            </button>

            {/* Main Image */}
            <img 
              src={selectedImage} 
              alt={`Gallery ${currentImageIndex + 1}`} 
              className="max-w-[95%] max-h-[85vh] object-contain animate-in zoom-in-95 fade-in duration-200 select-none"
              draggable="false"
              style={{
                filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5))'
              }}
            />

            <button 
              onClick={nextImage} 
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full text-white transition-all active:scale-90"
              style={{
                background: 'rgba(28, 28, 30, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            >
              <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>

          {/* iOS Page Indicators - Bottom */}
          <div 
            className="flex justify-center items-center gap-2 py-4 px-4 animate-in slide-in-from-bottom duration-300"
            style={{
              background: 'rgba(28, 28, 30, 0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '0.5px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {excursion.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => selectImage(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentImageIndex 
                    ? 'w-8 h-2 bg-white' 
                    : 'w-2 h-2 bg-gray-500 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails Grid - Optional Mobile View */}
          {showThumbnails && (
            <div 
              className="absolute inset-x-0 bottom-0 animate-in slide-in-from-bottom duration-300 md:hidden"
              style={{
                background: 'rgba(28, 28, 30, 0.95)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                maxHeight: '40vh',
                borderTop: '0.5px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="p-4 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2">
                  {excursion.gallery.map((image, index) => (
                    <button 
                      key={index} 
                      onClick={() => selectImage(index)} 
                      className={`aspect-square rounded-xl overflow-hidden transition-all ${
                        index === currentImageIndex 
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-95' 
                          : 'opacity-70 hover:opacity-100'
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
            </div>
          )}
        </div>
      )}

      <ModalPortal>
        <UniversalBookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} tourData={excursion} />
      </ModalPortal>

      {/* Quick Actions - iOS 26 floating buttons (desktop only) */}
      <div className="hidden md:block fixed bottom-24 right-6 z-40">
        <div className="flex flex-col gap-3">
          {/* WhatsApp */}
          <a 
            href="https://wa.me/66123456789" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full flex items-center justify-center active:scale-90 transition-all duration-200"
            style={{ 
              background: 'rgba(37, 211, 102, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          
          {/* Telegram */}
          <a 
            href="https://t.me/Phuketga" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full flex items-center justify-center active:scale-90 transition-all duration-200"
            style={{ 
              background: 'rgba(0, 136, 204, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 136, 204, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>
      </div>

      <MobileBookingBar priceAdult={excursion.priceAdult} priceChild={excursion.priceChild} currency={excursion.currency} onBookingClick={() => setShowBookingModal(true)} />

      {/* iOS 26 Gradient Divider before Footer */}
      <div className="relative h-16" style={{ 
        background: 'linear-gradient(180deg, rgba(242, 242, 247, 0) 0%, rgba(242, 242, 247, 0.3) 30%, rgba(242, 242, 247, 0.6) 60%, rgba(242, 242, 247, 1) 100%)'
      }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 122, 255, 0.15) 20%, rgba(0, 122, 255, 0.3) 50%, rgba(0, 122, 255, 0.15) 80%, transparent 100%)'
        }} />
      </div>

      <Footer />
    </div>
  );
};

export default CheoLanLake;
