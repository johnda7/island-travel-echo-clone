import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Star, Calendar, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

// Import images - настоящие фото с оригинального сайта
import { fourPearlsImages, fourPearlsImageDescriptions } from "@/assets/four-pearls-andaman/images";

const excursion = {
  title: "4 жемчужины Андаманского моря",
  subtitle: "2 дня / 1 ночь - Эксклюзивное путешествие",
  price: "4,700 ฿ взр. / 4,200 ฿ дети 4-11 лет",
  currency: "฿", 
  duration: "2 дня / 1 ночь",
  groupSize: "до 25 человек",
  rating: 4.8,
  reviewsCount: 89,
  mainImage: fourPearlsImages.main,
  gallery: fourPearlsImages.gallery,
  description: `
4 ЖЕМЧУЖИНЫ АНДАМАНСКОГО МОРЯ - это роскошное двухдневное путешествие по самым красивым и нетронутым уголкам региона. Программа включает посещение четырех уникальных локаций с ночевкой на одном из райских островов.

Этот тур создан для тех, кто ценит комфорт, эксклюзивность и желает полностью погрузиться в красоту тропической природы, не торопясь насладиться каждым моментом путешествия.
`,
  highlights: [
    "Четыре эксклюзивные локации за два дня",
    "Ночевка в комфортном отеле на острове",
    "Небольшие группы - максимум комфорта", 
    "Снорклинг в кристально чистых водах",
    "Романтический ужин на закате",
    "Профессиональная фотосъемка",
    "VIP-сервис и персональный гид"
  ],
  included: [
    "VIP-трансфер из отеля и обратно",
    "Русскоговорящий персональный гид",
    "Полный пансион (завтрак, обед, ужин оба дня)",
    "Проживание в отеле 4* с видом на море",
    "Комфортабельный катер с кондиционером",
    "Входные билеты во все национальные парки",
    "Профессиональное снаряжение для снорклинга",
    "Подводная видеосъемка включена",
    "Спасательные жилеты и страховка",
    "Прохладительные напитки весь день",
    "Медицинская страховка premium",
    "Сувениры и подарки от организаторов"
  ],
  notIncluded: [
    "Алкогольные напитки премиум-класса",
    "Спа-процедуры в отеле",
    "Дополнительная профессиональная фотосъемка",
    "Личные расходы и дорогие сувениры",
    "Чаевые гиду (рекомендуемые)"
  ],
  schedule: [
    { day: "1-й день", time: "07:00-08:00", activity: "VIP-трансфер из отеля с комфортом" },
    { day: "1-й день", time: "08:30", activity: "Завтрак на пирсе в ресторане с видом на море" },
    { day: "1-й день", time: "09:30", activity: "Отправление к первой жемчужине на VIP-катере" },
    { day: "1-й день", time: "10:30", activity: "Первая жемчужина - скрытая лагуна с изумрудной водой" },
    { day: "1-й день", time: "12:00", activity: "Вторая жемчужина - снорклинг среди коралловых садов" },
    { day: "1-й день", time: "13:30", activity: "Обед на частном пляже с морепродуктами" },
    { day: "1-й день", time: "15:00", activity: "Заселение в отель, отдых и релакс" },
    { day: "1-й день", time: "18:00", activity: "Третья жемчужина - встреча заката на воде" },
    { day: "1-й день", time: "19:30", activity: "Романтический ужин на террасе отеля" },
    { day: "1-й день", time: "21:00", activity: "Свободное время, спа или прогулки по острову" },
    { day: "2-й день", time: "08:00", activity: "Завтрак с панорамным видом на океан" },
    { day: "2-й день", time: "09:30", activity: "Четвертая жемчужина - самая красивая локация" },
    { day: "2-й день", time: "11:00", activity: "Финальная фотосессия и подводная съемка" },
    { day: "2-й день", time: "13:00", activity: "Прощальный обед на катере" },
    { day: "2-й день", time: "15:00", activity: "Возвращение на Пхукет с комфортом" }
  ],
  whatToBring: [
    "Элегантную пляжную одежду",
    "Купальники/плавки (2-3 комплекта)",
    "Солнцезащитный крем SPF 50+",
    "Стильные солнечные очки",
    "Легкую обувь для прогулок", 
    "Камера для личных фото",
    "Вечерний наряд для ужина",
    "Документы и наличные"
  ],
  importantInfo: [
    "Тур рекомендуется для романтических пар",
    "Минимальный возраст участников - 12 лет",
    "При плохой погоде программа корректируется",
    "Вегетарианское меню доступно по запросу",
    "Возможна организация сюрпризов (по запросу)",
    "Тур проводится в небольших группах",
    "Профессиональный фотограф работает весь тур"
  ]
};

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowFullGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const openGallery = () => {
    setSelectedImage(excursion.gallery[4]);
    setCurrentImageIndex(4);
    setShowFullGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowFullGallery(false);
    setShowThumbnails(false);
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

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
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

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  // Keyboard navigation
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeModal();
  };

  // Add keyboard event listener
  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage]);

  // Handle mobile gallery scroll
  const handleMobileGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setMobileGalleryIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
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
              <span className="text-gray-700">4 жемчужины Андаманского моря</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Gallery section */}
      <section className="pb-2">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Галерея - левая часть на десктопе */}
            <div className="lg:col-span-2">
              {/* Десктопная галерея */}
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-2 h-96">
                {/* Большое главное фото */}
                <div 
                  className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => openModal(excursion.gallery[0], 0)}
                >
                  <img 
                    src={excursion.gallery[0]} 
                    alt="Andaman Sea Pearl"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                {/* Два средних фото справа снизу */}
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
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">+{excursion.gallery.length - 5}</div>
                      <div className="text-sm">фото</div>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Мобильная галерея */}
              <div className="md:hidden">
                <div 
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  onScroll={handleMobileGalleryScroll}
                >
                  {excursion.gallery.map((image, index) => (
                    <div 
                      key={index}
                      className="min-w-full snap-start cursor-pointer"
                      onClick={() => openModal(image, index)}
                    >
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Мобильные индикаторы */}
                <div className="flex justify-center mt-2 space-x-1">
                  {excursion.gallery.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === mobileGalleryIndex ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Информационная панель справа */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{excursion.title}</h1>
                  <p className="text-gray-600 mb-4">{excursion.subtitle}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{excursion.rating}</span>
                      <span className="text-gray-600 text-sm">({excursion.reviewsCount} отзывов)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="w-4 h-4 text-green-600" />
                      <span>{excursion.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>Андаманское море</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {excursion.price}
                    </div>
                    <div className="text-gray-600 text-sm">цены за человека</div>
                  </div>

                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Link to="/book/four-pearls-andaman/reserv">Забронировать тур</Link>
                  </Button>

                  <div className="mt-4 text-xs text-gray-500 text-center">
                    VIP-сервис • Бесплатная отмена за 48 часов
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Описание тура</h2>
                  <div className="prose prose-lg text-gray-700">
                    {excursion.description.split('\n').map((paragraph, index) => (
                      paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-green-600">Особенности тура</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {excursion.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 text-blue-600">Программа тура</h3>
                  <div className="space-y-4">
                    {excursion.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-right min-w-[100px]">
                          <div className="text-sm font-semibold text-blue-600">{item.day}</div>
                          <div className="text-xs text-gray-600">{item.time}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-800">{item.activity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-green-600">Включено</h3>
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
                    <h3 className="text-2xl font-bold mb-4 text-red-600">Не включено</h3>
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
                
                <div className="grid md:grid-cols-2 gap-12">
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
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-amber-600">Важно знать</h3>
                    <ul className="space-y-2 text-gray-700">
                      {excursion.importantInfo.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-amber-600 font-bold">!</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile booking bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-lg font-bold text-green-600">
              {excursion.price}
            </div>
            <div className="text-xs text-gray-600">цены за человека</div>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6">
            <Link to="/book/four-pearls-andaman/reserv">Забронировать</Link>
          </Button>
        </div>
      </div>

      {/* Gallery Modal - аналогично предыдущему компоненту */}
      {selectedImage && showFullGallery && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
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

          <div 
            className="flex-1 flex items-center justify-center relative px-2 py-4 gallery-modal"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
            />

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 z-10 bg-black bg-opacity-60 rounded-full hidden sm:block transition-all duration-200 hover:bg-opacity-80"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails for mobile */}
          {showThumbnails && (
            <div className="bg-black bg-opacity-90 p-4 sm:hidden">
              <div className="flex space-x-2 overflow-x-auto">
                {excursion.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedImage(image);
                      setShowThumbnails(false);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-green-500' : 'border-transparent'
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

          {/* Desktop thumbnails */}
          <div className="hidden sm:block bg-black bg-opacity-90 p-4">
            <div className="flex justify-center space-x-2">
              {excursion.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setSelectedImage(image);
                  }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-green-500' : 'border-transparent'
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

      <Footer />
    </div>
  );
};

export default PhotoGallery;