import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { UniversalBookingModal } from "@/components/UniversalBookingModalWrapper";
import { ModalPortal } from "@/components/ModalPortal";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { TourRouteMap } from "@/components/TourRouteMap";
import type { TourData, RoutePoint } from "@/types/Tour";

// Haptic Feedback helper
const haptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
  try {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(style);
    }
  } catch (e) {}
};

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
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState<number>(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [sortedGallery, setSortedGallery] = useState<string[]>(tourData.gallery);
  const [isTelegram, setIsTelegram] = useState(false);

  // 📱 Telegram Mini App: Back Button и Main Button
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initData) {
      setIsTelegram(true);
      
      // === BACK BUTTON ===
      // Показываем кнопку "Назад" на страницах туров
      tg.BackButton.show();
      
      const handleBack = () => {
        haptic('light');
        navigate(-1);
      };
      
      tg.BackButton.onClick(handleBack);
      
      // === MAIN BUTTON (Забронировать) ===
      tg.MainButton.setParams({
        text: `Забронировать • ฿${tourData.priceAdult.toLocaleString()}`,
        color: '#007AFF',
        text_color: '#FFFFFF',
        is_active: true,
        is_visible: true
      });
      tg.MainButton.show();
      
      const handleMainButton = () => {
        haptic('medium');
        setShowBookingModal(true);
      };
      
      tg.MainButton.onClick(handleMainButton);
      
      // Cleanup
      return () => {
        tg.BackButton.offClick(handleBack);
        tg.BackButton.hide();
        tg.MainButton.offClick(handleMainButton);
        tg.MainButton.hide();
      };
    }
  }, [navigate, tourData.priceAdult]);

  // 📱 Telegram Mini App Share функция
  const handleShare = async () => {
    haptic('light'); // Haptic feedback при share
    const fullUrl = `https://phukeo.com${location.pathname}`;
    
    console.log('🔍 Share button clicked');
    console.log('📱 Telegram WebApp available:', !!window.Telegram?.WebApp);
    
    // Проверяем Telegram WebApp
    if (window.Telegram?.WebApp && window.Telegram.WebApp.initData) {
      try {
        console.log('✅ Using Telegram share');
        // ВАЖНО: отправляем ТОЛЬКО URL без текста - Telegram сам загрузит Open Graph!
        const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}`;
        window.Telegram.WebApp.openTelegramLink(tgShareUrl);
        return;
      } catch (error) {
        console.log('❌ Telegram share failed:', error);
      }
    }
    
    // Fallback: Web Share API
    if (navigator.share) {
      try {
        console.log('✅ Using Web Share API');
        await navigator.share({
          title: tourData.title,
          url: fullUrl,
        });
        console.log('✅ Share successful');
        return;
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.log('❌ Web Share failed:', error);
        } else {
          console.log('ℹ️ User cancelled share');
          return;
        }
      }
    }
    
    // Последний fallback: копирование в буфер
    try {
      console.log('✅ Using clipboard copy');
      await navigator.clipboard.writeText(fullUrl);
      alert('✅ Ссылка скопирована!\n\nВы можете поделиться ей в любом мессенджере:\n' + fullUrl);
    } catch (error) {
      console.log('❌ Clipboard failed:', error);
      // Показываем ссылку в prompt
      prompt('Скопируйте ссылку:', fullUrl);
    }
  };

  // 🎯 Сортировка галереи: сначала горизонтальные, потом вертикальные
  useEffect(() => {
    const sortGalleryByOrientation = async () => {
      const images = await Promise.all(
        tourData.gallery.map((src) => {
          return new Promise<{ src: string; isLandscape: boolean }>((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve({ src, isLandscape: img.width >= img.height });
            };
            img.onerror = () => {
              resolve({ src, isLandscape: true }); // default к landscape при ошибке
            };
            img.src = src;
          });
        })
      );
      
      // Сортируем: сначала горизонтальные (landscape), потом вертикальные (portrait)
      const sorted = images
        .sort((a, b) => (b.isLandscape ? 1 : 0) - (a.isLandscape ? 1 : 0))
        .map((img) => img.src);
      
      setSortedGallery(sorted);
    };

    sortGalleryByOrientation();
  }, [tourData.gallery]);

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
    setSelectedImage(sortedGallery[0]);
    setCurrentImageIndex(0);
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setShowFullGallery(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % sortedGallery.length;
      setSelectedImage(sortedGallery[nextIndex]);
      return nextIndex;
    });
  }, [sortedGallery]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const prevIndex = prev === 0 ? sortedGallery.length - 1 : prev - 1;
      setSelectedImage(sortedGallery[prevIndex]);
      return prevIndex;
    });
  }, [sortedGallery]);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(sortedGallery[index]);
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
      {/* 🎯 SEO Meta Tags для Telegram и соцсетей */}
      <SEO 
        title={`${tourData.title} - ПхукетGO`}
        description={tourData.description}
        image={tourData.mainImage}
        url={`https://phukeo.com${location.pathname}`}
        type="article"
        price={`${tourData.priceAdult}฿`}
        rating={tourData.rating.toString()}
        tourName={tourData.title}
      />
      
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
              src={sortedGallery[mobileGalleryIndex]} 
              alt={tourData.title}
              loading="eager"
              className="w-full h-full object-contain bg-gradient-to-b from-sky-100 to-blue-50" 
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
            {sortedGallery.map((_, index) => (
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
              className="w-full flex items-center justify-center gap-2 py-3 text-[15px] font-semibold rounded-2xl transition-all duration-150 active:scale-95" 
              style={{
              color: '#007AFF',
              background: 'rgba(0, 122, 255, 0.12)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 4px 16px rgba(0, 122, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(0, 122, 255, 0.2)',
              position: 'relative',
              zIndex: 10
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
                <div className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-[28px] bg-gradient-to-b from-sky-100 to-blue-50" onClick={() => openModal(sortedGallery[0], 0)} style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}>
                  <img src={sortedGallery[0]} alt="Main" loading="eager" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                  
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

                {sortedGallery.slice(1, 5).map((image, index) => (
                  <div key={index + 1} className="cursor-pointer group relative overflow-hidden rounded-2xl transition-all duration-300 bg-gradient-to-b from-sky-100 to-blue-50" onClick={() => index === 3 ? openGallery() : openModal(image, index + 1)}>
                    <img src={image} alt={`Gallery ${index + 2}`} loading="lazy" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                    {index === 3 && sortedGallery.length > 5 && (
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-300" style={{
                        background: 'rgba(0, 0, 0, 0.4)'
                      }}>
                        <div className="text-white text-center">
                          <div className="text-xl font-semibold">+{sortedGallery.length - 5}</div>
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
                          onClick={() => {
                            const tg = (window as any).Telegram?.WebApp;
                            if (tg?.HapticFeedback) {
                              tg.HapticFeedback.impactOccurred('medium');
                            }
                            if (tg) {
                              tg.openTelegramLink('https://t.me/Phuketga');
                            } else {
                              window.open('https://t.me/Phuketga', '_blank');
                            }
                          }} 
                          className="btn-telegram w-full"
                        >
                          <span className="flex flex-col items-center leading-tight">
                            <span>Написать</span>
                            <span>менеджеру</span>
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
          
          {/* 📱 Share Button - iOS 26 Style */}
          <div className="mb-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95"
              style={{
                background: 'rgba(0, 122, 255, 0.1)',
                border: '1px solid rgba(0, 122, 255, 0.2)',
                color: '#007AFF'
              }}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-[14px] font-semibold">Поделиться туром</span>
            </button>
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

          {/* Price Mobile - Premium CTA Card */}
          <div className="flex items-center justify-between p-4 rounded-2xl mb-3 md:hidden" style={{ 
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
            <div>
              <div className="text-gray-400 text-xs font-medium mb-0.5">Цена от</div>
              <div className="text-white text-[26px] font-bold tracking-tight flex items-baseline gap-1">
                {tourData.priceAdult.toLocaleString()}
                <span className="text-[16px] text-gray-400">฿</span>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                haptic('medium');
                setShowBookingModal(true);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                haptic('medium');
                setShowBookingModal(true);
              }}
              className="btn-booking active:scale-95"
            >
              Забронировать
            </button>
          </div>
          
          {/* Отступ для нижней панели на мобильных */}
          <div className="h-24 md:hidden"></div>
        </div>
      </section>

      {/* Rest of content from tourData - description, highlights, itinerary, etc */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Описание тура */}
          {tourData.description && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-3">Описание</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {tourData.description}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Highlights */}
          {tourData.highlights && tourData.highlights.length > 0 && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-3">Что входит в тур</h2>
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

          {/* Программа тура - iOS 26 Collapsible Timeline */}
          {tourData.schedule && tourData.schedule.length > 0 && (
            <Card className="mb-4 overflow-hidden" style={{
              background: 'white',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
            }}>
              <CardContent className="p-0">
                {/* Header with gradient */}
                <div className="p-4 flex items-center justify-between" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl">
                      📅
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Программа тура</h2>
                      <p className="text-white/80 text-xs">{tourData.schedule.length} остановок</p>
                    </div>
                  </div>
                </div>
                
                {/* Timeline - показываем первые 5, остальные скрыты */}
                <div className="p-4">
                  <div className="space-y-0">
                    {tourData.schedule.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex gap-4 pb-4 last:pb-0 relative">
                        {/* Timeline line */}
                        {index < Math.min(tourData.schedule.length, 5) - 1 && (
                          <div className="absolute left-[19px] top-10 w-0.5 h-[calc(100%-24px)]" 
                            style={{ background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' }} />
                        )}
                        
                        {/* Time bubble */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                          {index + 1}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                              {item.time}
                            </span>
                            {item.day && (
                              <span className="text-xs text-gray-500">{item.day}</span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Show more button */}
                  {tourData.schedule.length > 5 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-center py-3 text-purple-600 font-medium text-sm hover:text-purple-700 flex items-center justify-center gap-2">
                        <span>Показать всю программу ({tourData.schedule.length - 5} ещё)</span>
                        <span className="text-xs">▼</span>
                      </summary>
                      <div className="space-y-0 pt-4 border-t mt-2">
                        {tourData.schedule.slice(5).map((item, index) => (
                          <div key={index + 5} className="flex gap-4 pb-4 last:pb-0 relative animate-slide-up">
                            {index < tourData.schedule.length - 6 && (
                              <div className="absolute left-[19px] top-10 w-0.5 h-[calc(100%-24px)]" 
                                style={{ background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' }} />
                            )}
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                              {index + 6}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                                  {item.time}
                                </span>
                                {item.day && <span className="text-xs text-gray-500">{item.day}</span>}
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Что включено / не включено */}
          {(tourData.included || tourData.notIncluded) && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-3">Включено в стоимость</h2>
                <div className="grid md:grid-cols-2 gap-4">
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

          {/* Что взять с собой - iOS 26 Style */}
          {tourData.whatToBring && tourData.whatToBring.length > 0 && (
            <Card className="mb-4 overflow-hidden" style={{ 
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              border: 'none',
              boxShadow: '0 4px 16px rgba(0, 122, 255, 0.08)'
            }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}>
                    🎒
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Что взять с собой</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3 animate-stagger">
                  {tourData.whatToBring.map((item, index) => {
                    const icons: Record<string, string> = {
                      'купальн': '👙', 'солнцезащит': '🧴', 'крем': '🧴', 'головн': '🧢', 
                      'тапоч': '🩴', 'деньг': '💵', 'полотенц': '🏖️', 'фотоаппарат': '📸',
                      'очки': '🕶️', 'вода': '💧', 'медикамент': '💊', 'одежд': '👕'
                    };
                    const icon = Object.entries(icons).find(([key]) => 
                      item.toLowerCase().includes(key)
                    )?.[1] || '✨';
                    
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm"
                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                        <span className="text-lg">{icon}</span>
                        <span className="text-gray-700 text-sm font-medium">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Важная информация - iOS 26 Alert Style */}
          {tourData.importantInfo && tourData.importantInfo.length > 0 && (
            <Card className="mb-6 overflow-hidden" style={{ 
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: 'none',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.15)'
            }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                  }}>
                    ⚡
                  </div>
                  <h2 className="text-xl font-bold text-amber-900">Важно знать</h2>
                </div>
                <div className="space-y-3 animate-stagger">
                  {tourData.importantInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm"
                      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                      <span className="text-amber-600 text-lg mt-0.5">💡</span>
                      <span className="text-amber-900/90 text-sm leading-relaxed">{info}</span>
                    </div>
                  ))}
                </div>
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

      {/* Full Screen Gallery Modal - iOS 26 Light Blur */}
      {showFullGallery && selectedImage && (
        <ModalPortal>
          <div 
            className="fixed inset-0 z-50 flex flex-col animate-fade-in"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(242,242,247,0.98) 100%)',
              backdropFilter: 'blur(60px) saturate(200%)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)'
            }}
            onClick={closeModal}
          >
            {/* Toolbar - iOS 26 Glass */}
            <div className="flex items-center justify-between px-4 py-3" style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderBottom: '0.5px solid rgba(0, 0, 0, 0.08)'
            }}>
              <div className="flex items-center gap-3">
                <span className="text-gray-900 text-sm font-semibold">{currentImageIndex + 1} из {tourData.gallery.length}</span>
                <span className="text-gray-500 text-xs">📸 {tourData.title}</span>
              </div>
              <button onClick={closeModal} className="text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image with Shadow */}
            <div 
              className="flex-1 flex items-center justify-center relative px-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Gallery" 
                loading="lazy"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-scale-in"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
                draggable="false"
              />
              
              {/* Navigation Arrows - iOS Glass Style */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="hidden md:flex absolute left-6 p-3 rounded-full items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '0.5px solid rgba(0, 0, 0, 0.05)'
                }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="hidden md:flex absolute right-6 p-3 rounded-full items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '0.5px solid rgba(0, 0, 0, 0.05)'
                }}
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Thumbnails - iOS 26 Style */}
            <div className="flex justify-center items-center gap-1.5 py-4 px-4 overflow-x-auto" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '0.5px solid rgba(0, 0, 0, 0.05)'
            }}>
              {sortedGallery.slice(0, 12).map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); selectImage(index); }}
                  className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
                    index === currentImageIndex 
                      ? 'ring-2 ring-blue-500 ring-offset-2 scale-110' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              {sortedGallery.length > 12 && (
                <span className="text-xs text-gray-500 ml-2">+{sortedGallery.length - 12}</span>
              )}
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
